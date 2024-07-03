import { LoaderFunctionArgs, json } from "@remix-run/node";
import SettingShapesService from "~/models/SettingShapes.service";
import TemplateService from "~/models/Template.service";
import { authenticate } from "~/shopify.server";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
    const { admin, session } = await authenticate.public.appProxy(request);
    if (!admin||!session) {
      return json({error:"shop  not found here"});
    }
    let data = await TemplateService.getTemplates(session.id);
    
    return json(data );

};
  