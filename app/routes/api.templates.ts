import { LoaderFunctionArgs, json } from "@remix-run/node";
import SettingShapesService from "~/models/SettingShapes.service";
import TemplateService from "~/models/Template.service";
import { authenticate } from "~/shopify.server";
import { PRICING_PLANS, getPlanProxy } from "~/utils/pricing";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
    const { admin, session } = await authenticate.public.appProxy(request);
    if (!admin||!session) {
      return json({error:"shop  not found here"});
    }
  
    let data = await TemplateService.getTemplates(session.id);
    let plan:string = "";

  if (admin) {
    plan = await getPlanProxy(admin);
    if (plan == "free" || plan== PRICING_PLANS.STARTER) {
      return json(null);
    }
  }
    return json(data );

};
  