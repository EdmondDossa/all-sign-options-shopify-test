import { z } from 'zod';
import { authenticate } from './../shopify.server';
import { ActionFunctionArgs, json } from "@remix-run/node";
import { parseWithZod } from '@conform-to/zod';

import DesignService from '~/models/Design.service';
import { unlink } from 'fs';
import GoogleService from '~/models/GoogleService';

const formSchema = z.object({
    productId: z.string({ required_error: 'Product ID is required' }),
    customerIp: z.string(),
    fileId: z.number() 
});

export const action = async ({ request, params }: ActionFunctionArgs) => {
    const { admin, session } = await authenticate.public.appProxy(request);
    if (!admin || !session) {
        return json({ error: "Shop not found" }, { status: 401 });
    }
   
    try {
        const jsonData = await request.json();
        const formData = new FormData();
        for (const key in jsonData) {
            formData.append(key, jsonData[key]);
        }
  
        const submission = parseWithZod(formData, { schema: formSchema });
  
        if (submission.status !== 'success') {
            return json({ 
                message: "Data is not valid", 
                status: "error", 
                error: submission.error 
            });
        }
  
        const data = submission.value as {
            productId: string;
            customerIp: string;
            fileId: number;
        };

        let  design =    await DesignService.getDesignUploaded(
            data.fileId, 
            session?.id || '', 
            data.productId, 
            data.customerIp
        );

        if (design?.storage  == "local") {
            unlink('public/'+design.fileUrl, (err) => {
                if (err) console.log('file was deleted');
              })
        }else if(design?.storage  == "drive"){
            let  fileId = (new URL(design.fileUrl)).searchParams.get("id") || "";
            await GoogleService.deleteFile(fileId);
            console.log("deleting file  from  google  drive", fileId);
        }

        console.log("design deleting ",design?.storage ,design.fileUrl )

      
        const isDeleted = await DesignService.designsDelete(
            data.fileId, 
            session?.id || '', 
            data.productId, 
            data.customerIp
        );

        if (isDeleted) {
            return json({
                message: "File successfully deleted",
                status: "success"
            });
        } else {
            return json({
                message: "Error deleting design file",
                status: "error"
            });
        }
    
    } catch (error) {
        console.error("Error deleting design file:", error);
        return json({ 
            message: "Error deleting design file", 
            status: "error" 
        });
    }
};