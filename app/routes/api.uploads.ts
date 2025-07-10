import { ShopifyProductService } from './../models/ShopifyProduct.service';
import { nullable, z } from 'zod';
import { authenticate } from './../shopify.server';
import { ActionFunctionArgs, LoaderFunctionArgs, json } from "@remix-run/node";
import { parseWithZod } from '@conform-to/zod';
import { jsonTransform } from '~/utils/transfomerZod';
import { uploadBase64,  fileBuffer, calculateImagePlacement, getExtensionFromBase64 } from '~/utils/uploadBase64';

import DesignService from '~/models/Design.service';




const formSchema = z.object({
    productId: z.string({ required_error: 'Size is required' }).nullable(),
    configId: z.number().nullable().optional(),
    variantId: z.string().nullable().optional(),
    customerIp:z.string().nullable().optional(),
    files: z.any().transform(jsonTransform), 
  });

export const action = async ({ request, params }: ActionFunctionArgs) => {

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
      return  {message: "Data is not valid",statut: "error", error: submission.error}
    }
  
    const data = submission.value as {
        productId: string;
        configId?: number;
        variantId?: string;
        customerIp: string
        files: any;
    };
      
    let designImages =  data.files.map((file:any)=>{
      return uploadBase64(getExtensionFromBase64(file.data)||"", file.data,session.id)
    });

    return await DesignService.addDesign(
      {
        customerIp: data.customerIp,
        productId: data.productId,
        configId: data.configId,
        variantId: data.variantId,
        files: designImages, // make sure it's JSON-serializable
      },
      session?.id
    );
    
  } catch (error) {
    console.log("error  on getting add cart", error);
    return json({ error: "error  on getting add cart" });
  }
};


export const  loader = async ({ request }: LoaderFunctionArgs) => {
  return json({ error: "error  on getting add cart load" });
};

  