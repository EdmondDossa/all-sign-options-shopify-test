import { LoaderFunctionArgs, json } from "@remix-run/node";
import ClipartsGroupService from "~/models/ClipartsGroup.service";
import FontService from "~/models/Font.service";
import SettingBorderService from "~/models/SettingBorder.service";
import SettingFixingMethodService from "~/models/SettingFixingMethod.service";
import SettingShapesService from "~/models/SettingShapes.service";
import { authenticate } from "~/shopify.server";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  // const { admin, session } = await authenticate.public.appProxy(request);
  // if (!admin||!session) {
  //   return json({error:"shop  not found here"});
  // }
  let sessionId = "offline_quickstart-5c91f330.myshopify.com";
  // let data = await ConfigurationService.getConfigurations(sessionId);
  let data = {
    fonts: (await FontService.getFonts(sessionId)) || [],
    cliparts: await ClipartsGroupService.getClipartsGroupsCliparts(sessionId) || [],
    borders: (await SettingBorderService.get(sessionId)) || [],
    pageSettings: { titleBalise: "h1" },
    allShapes: (await SettingShapesService.get(sessionId)) || [],
    allFixingMethod: (await SettingFixingMethodService.get(sessionId)) || [],
    allBorder: (await SettingBorderService.get(sessionId)) || [],
    outputOptions: [],
  };
    
  return json(data);
};
