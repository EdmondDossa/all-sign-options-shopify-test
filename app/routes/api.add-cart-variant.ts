import { ShopifyProductService } from './../models/ShopifyProduct.service';
import { z } from 'zod';
import { authenticate } from './../shopify.server';
import { ActionFunctionArgs, json } from "@remix-run/node";
import { parseWithZod } from '@conform-to/zod';



const formSchema = z.object({
    productId: z.string({ required_error: 'Size is required' }),
    price: z.number({ required_error: 'Text number is required' }),
    option: z.string({ required_error: 'Max Text char is required' }), 
  });

export const action = async ({ request, params }: ActionFunctionArgs) => {


    const { admin, session } = await authenticate.public.appProxy(request);
    if (!admin||!session) {
        return json({ error: "shop  not found here" });
        
    }
  
  const jsonData = await request.json();
  var formData = new FormData();
  for (var key in jsonData) {
    formData.append(key, jsonData[key]);
  }


  const submission = parseWithZod(formData, {schema:formSchema});

  if (submission.status !== 'success') {
    return json({status:false,message:null,errors:submission.error})
  }



    const data = submission.value as {
        productId: string;
        price: number;
        option: string;
    };



    const variant = await ShopifyProductService.createVariant(
        admin,
        data.productId,
        data.option,
        data.price,
        ""
    )
    
    return json(variant);
};
  