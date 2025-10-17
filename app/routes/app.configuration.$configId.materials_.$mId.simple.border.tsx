import { LoaderFunctionArgs, json } from "@remix-run/node";
import { Outlet, useLoaderData, useOutletContext } from "@remix-run/react";
import MaterialSizeService from "~/models/MateriaSizeService.service";
import MaterialBorderService from "~/models/MaterialBorderService.service";

import SettingBorderService from "~/models/SettingBorder.service";
import SettingShapesService from "~/models/SettingShapes.service";
import { authenticate } from "~/shopify.server";
import { ConfigBorder, ConfigSize } from "~/types/ConfigDataType";
import { BorderType, ShapeType } from "~/types/SettingsType";
import { PRICING_PLANS } from "~/utils/pricing";

import MaterialBorderIndex from "./app.configuration.$configId.materials_.$mId.simple.border._index"

// export const loader = async ({ request, params }: LoaderFunctionArgs) => {
//   const { session, admin } = await authenticate.admin(request);
//   const configId = parseInt(params.configId ?? "");
//   const mId = parseInt(params.mId ?? "");
//   console.log("configID materialID", configId, mId);

//   // let borders:ConfigBorder[] | null = null;
//   let borders = null;

//   let borderSetting = null;

//   let configSizes: ConfigSize[] = [];
//   // const manageBorders: BorderType[] | null = await SettingBorderService.get(
//   //   session.id,
//   // );
//   const manageBorders = await SettingBorderService.get(
//     session.id,
//   );
//   const manageShapes: ShapeType[] | null = await SettingShapesService.get(
//     session.id,
//   );

//   if (!Number.isNaN(configId) && !Number.isNaN(mId)) {
//     const bordersResponse = await MaterialBorderService.getAll(
//       session.id,
//       configId,
//       mId,
//     );
//     // borders = bordersResponse?.allBorders||[];
//     borders = bordersResponse?.allBorders;
//     borderSetting = bordersResponse?.settings;
//     let materialSizes = await MaterialSizeService.getAll(
//       session.id,
//       configId,
//       mId,
//     );
//     configSizes = materialSizes?.allSizes || [];
//   }

//   return json({
//     configSizes,
//     manageBorders,
//     // borders,
//     manageShapes,
//     // borderSetting,
//   });
// };

interface MaterialBordersProps {
  manageBorders: BorderType[];
  manageShapes: ShapeType[],
  borders: ConfigBorder[];
  borderSetting: any;
  configSizes: ConfigSize[],
  plan: string,
} 
export default function MaterialBorder({ manageBorders, manageShapes, configSizes, borders, borderSetting, plan }: MaterialBordersProps) {
  if (plan == PRICING_PLANS.STARTER) {
    manageShapes = manageShapes?.slice(0, PRICING_PLANS.STARTER_RULES.materialShapes) || [];
    configSizes = configSizes?.slice(0, PRICING_PLANS.STARTER_RULES.materialSizes) || [];
    manageBorders = manageBorders?.slice(0, PRICING_PLANS.STARTER_RULES.materialBorders) || [];
    borders = borders?.filter(curr => curr.manageBorderId < PRICING_PLANS.STARTER_RULES.materialBorders ) .slice(0, PRICING_PLANS.STARTER_RULES.materialBorders) || [];
  }
  return <MaterialBorderIndex manageShapes={manageShapes} configSizes={configSizes} manageBorders={manageBorders} borders={borders} borderSetting={borderSetting} plan={plan} />
}
