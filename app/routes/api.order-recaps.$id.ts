import { LoaderFunctionArgs, json } from "@remix-run/node";
import DesignService from "~/models/Design.service";
import { ShopifyOrderService } from "~/models/ShopifyOrder.service";
import { ShopifyProductService } from "~/models/ShopifyProduct.service";
import { authenticate } from "~/shopify.server";


export const loader = async ({ request, params }:LoaderFunctionArgs) => {
    const { admin, session, cors } = await authenticate.admin(request);
  
    if (!params.id) {
      return cors(json({
        message: "id  de  la  commandes  est invalide",
        statut:"error"
      }))
    }
  
    const  order =  await ShopifyOrderService.getOrder(admin, parseInt( params.id) );
  
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