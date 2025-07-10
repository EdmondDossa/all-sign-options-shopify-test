import { LoaderFunctionArgs, json } from "@remix-run/node";
import DesignService from "~/models/Design.service";
import { ShopifyOrderService } from "~/models/ShopifyOrder.service";
import { authenticate } from "~/shopify.server";


export const loader = async ({ request, params }:LoaderFunctionArgs) => {
    const { admin, session, cors } = await authenticate.admin(request);
   
    if (!params.id) {
      return cors(json({
        message: "id  de  la  commandes  est invalide",
        statut:"error"
      }))
    }
  
    const  order:any =  await ShopifyOrderService.getOrder(admin, parseInt(params.id) );
    const designs =  await DesignService.getDesignByOrderId(`${params.id}`, session.id)
  
    return  cors(json({
      designs : designs,
      order:  order,
    }));
    
}