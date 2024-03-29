import { LoaderFunctionArgs, json } from "@remix-run/node";
import ClipartService from "~/models/Clipart.service";
import ClipartsGroupService from "~/models/ClipartsGroup.service";
import ConfigurationService from "~/models/Configuration.service";
import SettingShapesService from "~/models/SettingShapes.service";
import { authenticate } from "~/shopify.server";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
    // const { admin, session } = await authenticate.public.appProxy(request);
    // if (!admin||!session) {
    //   return json({error:"shop  not found here"});
    // }
    let sessionId = "offline_quickstart-5c91f330.myshopify.com";
    let data = await ClipartService.getClipartsBySessionID(sessionId);
    
    return json(data );

};
  