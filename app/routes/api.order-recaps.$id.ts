import { LoaderFunctionArgs, json } from "@remix-run/node";
import { ShopifyOrderService } from "~/models/ShopifyOrder.service";
import { ShopifyProductService } from "~/models/ShopifyProduct.service";
import { authenticate } from "~/shopify.server";


export const loader = async ({ request, params }:LoaderFunctionArgs) => {
    const { admin, session, cors } = await authenticate.admin(request);
   
  
    const  order =  await ShopifyOrderService.getOrder(admin, session, parseInt( params.id||"0") );
  
    const variantsData:any =  []
    if (order) {
      for(const line_item of order.line_items){
        let variantMetaData :any = await ShopifyProductService.getVariantRecap(admin,`gid://shopify/ProductVariant/${line_item.variant_id}`)
        if (variantMetaData) {
       
          variantMetaData.line_item = line_item;
          variantMetaData.orderNumber = order.name;
          variantsData.push(variantMetaData)
        }
      }
    
    }
 

    return  cors(json(variantsData));
    
}