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
      return json({ message: "Data is not valid", status: "error", error: submission.error }, { status: 400 });
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
   

    const result = await DesignService.addManyDesigns( designImages, session?.id );
    if (result == null) {
      return json({ success: false, error: "Failed to save uploads" }, { status: 500 });
    }
    return json({ success: true, data: result });
  } catch (error) {
    console.log("error on uploads", error);
    return json({ success: false, error: "Error while uploading files" }, { status: 500 });
  }
};


export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  try {
    const { admin, session } = await authenticate.public.appProxy(request);
    if (!session) {
      return json({ data: [], message: "Session not found" }, { status: 401 });
    }
    const url = new URL(request.url);
    const productId = url.searchParams.get('productId');
    const customerIp = url.searchParams.get('customerIp');

    const data = await DesignService.getDesignsUploaded(session.id, productId || undefined, customerIp || undefined);
    return json({ data: data ?? [], message: "Files uploaded available" });
  } catch (error) {
    console.error("[api.uploads] loader error:", error);
    return json({ data: [], message: "Error loading uploads" }, { status: 500 });
  }
};

  