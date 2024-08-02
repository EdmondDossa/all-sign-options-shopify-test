import { LoaderFunctionArgs, json } from "@remix-run/node";
import { ShopifyShopService } from "~/models/ShopifyShop.service";
import { authenticate } from "~/shopify.server";


export const loader = async ({ request, params }:LoaderFunctionArgs) => {
    const { admin, session } = await authenticate.public.appProxy(request)
   
    const checkoutUrl: string| null = await ShopifyShopService.getCheckoutUrl(admin, `${params.id}`);
    return  json(checkoutUrl);
}