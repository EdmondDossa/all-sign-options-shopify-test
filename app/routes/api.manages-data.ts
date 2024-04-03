import { LoaderFunctionArgs, json } from "@remix-run/node";
import ClipartsGroupService from "~/models/ClipartsGroup.service";
import ColorService from "~/models/Color.service";
import ConfigurationService from "~/models/Configuration.service";
import FontService from "~/models/Font.service";
import SettingBorderService from "~/models/SettingBorder.service";
import SettingFixingMethodService from "~/models/SettingFixingMethod.service";
import SettingShapesService from "~/models/SettingShapes.service";
import SizeService from "~/models/Size.service";
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
    colors: (await ColorService.getColors(sessionId)) || [
      {
        name: "Evil purple",
        textColor: { active: true, codeHex: "#f9a71a" },
        backgroundColor: "#942ab2",
      },
    ],
    manageSize: (await SizeService.getSizes(sessionId)) || [
      {
        label: "25x10_thick",
        width: 25,
        height: 10,
        thickness: { active: true, value: 1 },
      },
    ],
    allShapes: (await SettingShapesService.get(sessionId)) || [
      { name: "Oval", icon: "", value: "oval" },
    ],
    allFixingMethod: (await SettingFixingMethodService.get(sessionId)) || [
      { name: "None", description: "", icon: "", popImg: "", type: "none" },
    ],
    allBorder: (await SettingBorderService.get(sessionId)) || [],
    outputOptions: [],
  };
    
  return json(data);
};
