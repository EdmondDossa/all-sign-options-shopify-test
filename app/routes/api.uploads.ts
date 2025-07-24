import { ShopifyProductService } from './../models/ShopifyProduct.service';
import { nullable, z } from 'zod';
import { authenticate } from './../shopify.server';
import { ActionFunctionArgs, LoaderFunctionArgs, json } from "@remix-run/node";
import { parseWithZod } from '@conform-to/zod';
import { jsonTransform } from '~/utils/transfomerZod';
import { uploadBase64,  fileBuffer, calculateImagePlacement, getExtensionFromBase64 } from '~/utils/uploadBase64';

import DesignService from '~/models/Design.service';
import { DesignType } from '~/types/ManagePropertyType';




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
      
    let designImages =  data.files.map((file:any): DesignType|any =>{
      let url = "";
      if (!file.url) {
         url =  uploadBase64(getExtensionFromBase64(file.data)||"", file.data,session.id);
         console.log("file  uplaoded", url)     }

      return   {
        customerIp: data.customerIp,
        productId: data.productId,
        configId: data.configId,
        variantId: data.variantId, 
        fileName:   file.name,
        fileSize:   file.size,
        fileType:   file.type,
        fileUrl:    file.url ? file.url :url ,
        storage:    file.url ? "drive" : 'local'
      };
    });  
   

    return await DesignService.addManyDesigns( designImages, 
    
      session?.id
    );
    
  } catch (error) {
    console.log("error  on getting add cart", error);
    return json({ error: "error  on getting add cart" });
  }
};


export const  loader = async ({ request, params }: LoaderFunctionArgs) => {

  const { admin, session } = await authenticate.public.appProxy(request);
  const url = new URL(request.url);
  const query = url.searchParams.get('q');
  
  const productId = url.searchParams.get('productId');
  const customerIp =  url.searchParams.get('customerIp');

  const data = await DesignService.getDesignsUploaded(session?.id||'', productId||'', customerIp||'')
  
  return json({ data:data, message: "Files  uploaded  available"  });
};

  