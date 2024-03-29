import { LoaderFunctionArgs, json } from "@remix-run/node";
import ConfigurationService from "~/models/Configuration.service";
import SettingFixingMethodService from "~/models/SettingFixingMethod.service";
import { authenticate } from "~/shopify.server";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
    // const { admin, session } = await authenticate.public.appProxy(request);
    // if (!admin||!session) {
    //   return json({error:"shop  not found here"});
    // }
    let sessionId = "offline_quickstart-5c91f330.myshopify.com";
    let data = await SettingFixingMethodService.get(sessionId);
    
    return json(data );

};
  