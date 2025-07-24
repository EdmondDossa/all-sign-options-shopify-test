import { LoaderFunctionArgs, json } from "@remix-run/node";
import DesignService from "~/models/Design.service";
import { ShopifyOrderService } from "~/models/ShopifyOrder.service";
import { authenticate } from "~/shopify.server";
import { sendUploadfile } from "~/webhooks/OrderCreateWebhook";


export const loader = async ({ request, params }:LoaderFunctionArgs) => {
    const { admin, session, cors } = await authenticate.admin(request);
    let  data  = await sendUploadfile(admin, session.id, params.id);
    if (!params.id) {
      return cors(json({
        message: "Order ID is invalid",
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