import { LoaderFunctionArgs, json } from "@remix-run/node";
import SettingShapesService from "~/models/SettingShapes.service";
import TemplateService from "~/models/Template.service";
import { authenticate } from "~/shopify.server";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
    // const { admin, session } = await authenticate.public.appProxy(request);
    // if (!admin||!session) {
    //   return json({error:"shop  not found here"});
    // }
    // let sessionId = session.id;
    let sessionId = "offline_quickstart-5c91f330.myshopify.com";

    let data = await TemplateService.getTemplate(parseInt(`${params.id}`),sessionId);
    
    return json(data );

};
  