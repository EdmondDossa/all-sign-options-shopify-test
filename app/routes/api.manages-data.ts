import { LoaderFunctionArgs, json } from "@remix-run/node";
import ClipartsGroupService from "~/models/ClipartsGroup.service";
import FontService from "~/models/Font.service";
import SettingBorderService from "~/models/SettingBorder.service";
import SettingFixingMethodService from "~/models/SettingFixingMethod.service";
import SettingOutputService from "~/models/SettingOutput.service";
import SettingShapesService from "~/models/SettingShapes.service";
import { authenticate } from "~/shopify.server";
import { PRICING_PLANS, getPlanProxy } from "~/utils/pricing";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  let { admin, session }:any = await authenticate.public.appProxy(request);
  if (!admin || !session) {
       session = await prisma.session.findFirst({ where: { accessToken: request.headers.get("Aso-Access-Token") || "" } }) ;
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

    plan = await getPlanProxy(admin);
    if (plan == "free") {
      return json(null);
    }
    if (plan == PRICING_PLANS.STARTER) { 
      data.borders = data.borders.slice(0, 2);
      data.allBorder = data.allBorder.slice(0, 2);
      data.allShapes = data.allShapes.slice(0, 5);
      data.allFixingMethod = data.allFixingMethod.slice(0, 5);
    }
  }
    
  return json(data);
};
