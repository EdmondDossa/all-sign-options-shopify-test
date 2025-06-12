import { ShopifyProductService } from './../models/ShopifyProduct.service';
import { z } from 'zod';
import { authenticate } from './../shopify.server';
import { ActionFunctionArgs, LoaderFunctionArgs, json } from "@remix-run/node";
import { parseWithZod } from '@conform-to/zod';
import { jsonTransform } from '~/utils/transfomerZod';
import { uploadBase64,  fileBuffer, calculateImagePlacement } from '~/utils/uploadBase64';
import { assignShopDesignPath } from '~/utils/fileUrl';
import { updateOrCreateJsonData } from '~/utils/jsonHandler';




const formSchema = z.object({
    productId: z.string({ required_error: 'Size is required' }),
    price: z.number({ required_error: 'Text number is required' }),
    option: z.any().transform(jsonTransform), 
  });

export const action = async ({ request, params }: ActionFunctionArgs) => {

   console.log("request header before authencate");
    const { admin, session } = await authenticate.public.appProxy(request);
    if (!admin||!session) {
        return json({ error: "shop  not found here" });
        
    }
   
  
  try {
    const jsonData = await request.json();
    var formData = new FormData();
    for (var key in jsonData) {
      formData.append(key, jsonData[key]);
    }
  
  
    const submission = parseWithZod(formData, {schema:formSchema});
  
    if (submission.status !== 'success') {
      console.log("request header after inssucess");
      return json({status:false,message:null,errors:submission.error})
    }
  
  
  
      const data = submission.value as {
          productId: string;
          price: number;
          option: any;
      };
        
      let optionName =  `Quantity: ${data.option.recaps.quantity} | ${data.option.recaps.material?.label} ${data.option.recaps.material?.value}, `
      let size = data.option.recaps.sign?.size
      optionName += `${size?.value?.width?.label} ${size?.value?.width.value}, `
      optionName += `${size?.value?.height?.label} ${size?.value?.height.value}, `
      if (size?.value?.thickness.value) {
        optionName += `${size?.value?.thickness?.label} ${size?.value?.thickness.value}, `
      }
  
    optionName += `${data.option.recaps.sign?.shape?.label} ${data.option.recaps.sign?.shape?.value || ''}, `
    
    if (data.option.recaps?.sign?.fixingMethod?.label) {
      optionName += `${data.option.recaps.sign?.fixingMethod?.label} ${data.option.recaps.sign?.fixingMethod?.value || ''}, `
    }
    if (data.option.recaps?.faces?.face1) {
        optionName += `${data.option.recaps?.faces?.face1} `;
        optionName += `${data.option.recaps.sign?.color?.label}  ${data.option.recaps.sign?.color.value?.face1?.name},`
        optionName += `${data.option.recaps.sign?.border?.label} ${data.option.recaps.sign?.border?.value?.face1?.type} `
        optionName += `${data.option.recaps.sign?.border?.value?.face1?.codeHex || ""}`
  
        optionName += `, ${data.option.recaps?.faces?.face2} `;
        optionName += `${data.option.recaps.sign?.color?.label} ${data.option.recaps.sign?.color?.value?.face2?.name}, `
        optionName += `${data.option.recaps.sign?.border?.label} ${data.option.recaps.sign?.border?.value?.face2?.type} `
        optionName += `${data.option.recaps.sign?.border?.value?.face2?.codeHex || ""}`
        
      }
      if (!data.option.recaps?.faces?.face1) {
        optionName += ` ${data.option.recaps.sign?.color?.label} ${data.option.recaps.sign?.color?.value.name} ${data.option.recaps.sign?.color?.value?.codeHex || ''}, `
        
        if (data.option.recaps.sign?.border?.value) {
          
          optionName += `${data.option.recaps.sign?.border?.label} ${data.option.recaps.sign?.border?.value?.type||''} ${data.option.recaps.sign?.border?.value?.codeHex}`
        }
      }
      let designImage = "";
      if(data?.option?.recaps?.faces?.face1){
        designImage = uploadBase64(data.option.recaps.designImages.face1[0].format, data.option.recaps.designImages.face1[0].url,session.id)
      }else{
        designImage = uploadBase64(data.option.recaps.designImages[0].format, data.option.recaps.designImages[0].url,session.id)
      }
    
    
      
      const product = await ShopifyProductService.create(
        data.option.recaps.configuration?.id,
        admin,
        `${data.option.recaps.configuration?.name}`
        ,
        optionName,
        `${process.env.SHOPIFY_APP_URL}/${designImage}`,
        optionName
      )
    
      await ShopifyProductService.publish(admin, product.id)
    const recapsPath = assignShopDesignPath(session.id, `recaps/${product.variants.edges[0].node.legacyResourceId}.json`)
    
    if (!updateOrCreateJsonData(recapsPath, data.option.recaps)) {
      return null;
    }

      const variant = await ShopifyProductService.updateVariant(
            admin,
            product.id,
            product.variants.edges[0].node.id,
            optionName,
            data.price,
            {recapsPath:recapsPath}
      )
      
    return json(variant);
  } catch (error) {
    console.log("error  on getting add cart", error);
    return json({ error: "error  on getting add cart" });
  }
};


export const  loader = async ({ request }: LoaderFunctionArgs) => {
  return json({ error: "error  on getting add cart load" });
};

  