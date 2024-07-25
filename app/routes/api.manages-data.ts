import { LoaderFunctionArgs, json } from "@remix-run/node";
import ClipartsGroupService from "~/models/ClipartsGroup.service";
import FontService from "~/models/Font.service";
import SettingBorderService from "~/models/SettingBorder.service";
import SettingFixingMethodService from "~/models/SettingFixingMethod.service";
import SettingOutputService from "~/models/SettingOutput.service";
import SettingShapesService from "~/models/SettingShapes.service";
import { authenticate } from "~/shopify.server";
import { PRICING_PLANS, getPlanProxy, getPlanProxyPublic } from "~/utils/pricing";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  let asoAccessToken = request.headers.get("Aso-Access-Token") || "" ;
  let admin: any = null;
  let session: any = null;
  if (!asoAccessToken) {
      ({ admin, session } = await authenticate.public.appProxy(request));
  }

  if (!admin ) {
       session = await prisma.session.findFirst({ where: { accessToken: asoAccessToken } }) ;
      if (!session) {
        return json({ error: "Session not found" });
      }
  }
  
  let sessionId = session.id;
  // let data = await ConfigurationService.getConfigurations(sessionId);
  const outputOptions = await SettingOutputService.get(sessionId);
  let data = {
    fonts: (await FontService.getFonts(sessionId)) || [],
    cliparts: await ClipartsGroupService.getClipartsGroupsCliparts(sessionId) || [],
    borders: (await SettingBorderService.get(sessionId)) || [],
    pageSettings: { titleBalise: "h1" },
    allShapes: (await SettingShapesService.get(sessionId)) || [],
    allFixingMethod: (await SettingFixingMethodService.get(sessionId)) || [],
    allBorder: (await SettingBorderService.get(sessionId)) || [],
    outputOptions: { zipName: outputOptions.zipName, calculateOutput: outputOptions.calculateOutput },
  };

  let plan:string = "";


  if (admin) {
    console.log("use private plan ");
      plan = await getPlanProxy(admin);
  }else{
    console.log("use public plan ");
      plan = await getPlanProxyPublic(session.shop, session.accessToken);
  }

  if (plan =="free") {
      return json(null);
  }
  
  console.log(" le plan courant est ", plan);
  if (plan == PRICING_PLANS.STARTER) { 
    data.borders = data.borders.slice(0, PRICING_PLANS.STARTER_RULES.materialBorders);
    data.allBorder = data.allBorder.slice(0, PRICING_PLANS.STARTER_RULES.materialBorders);
    data.allShapes = data.allShapes.slice(0, PRICING_PLANS.STARTER_RULES.materialShapes);
    data.allFixingMethod = data.allFixingMethod.slice(0, PRICING_PLANS.STARTER_RULES.materialFixingMethods);
  }
    
  return json(data);
};
