import { LoaderFunctionArgs, json } from "@remix-run/node";
import { Outlet, useLoaderData, useOutletContext } from "@remix-run/react";
import MaterialSizeService from "~/models/MateriaSizeService.service";
import { authenticate } from "~/shopify.server";
import {
  ConfigCustomSize,
  ConfigSize,
  configSizeThickness,
} from "~/types/ConfigDataType";
import { ConfigurationType } from "~/types/ConfigurationType";
import { PRICING_PLANS } from "~/utils/pricing";

import MaterialSizeIndex from "./app.configuration.$configId.materials_.$mId.simple.size._index";

// export const loader = async ({ request, params }: LoaderFunctionArgs) => {
//   const { session, admin } = await authenticate.admin(request);
//   const configId = parseInt(params.configId ?? "");
//   const mId = parseInt(params.mId ?? "");
//   // console.log("configID materialID", configId, mId);

//   let materialSizes: {
//     customSize: ConfigCustomSize;
//     thickness: configSizeThickness;
//     allSizes: ConfigSize[];
//   } | null = null;

//   if (!Number.isNaN(configId) && !Number.isNaN(mId)) {
//     materialSizes = await MaterialSizeService.getAll(session.id, configId, mId);
//   }
//   const { customSize, allSizes, thickness } = materialSizes || {};
//   return json({ customSize, allSizes, thickness });
// };

interface MaterialSizesProps {
  configuration: ConfigurationType;
  plan: string;
  customSize: ConfigCustomSize;
  allSizes: ConfigSize[];
  thickness: configSizeThickness
  materialId: number | undefined,
  refreshMaterial: (key: string, data: object) => void;
}
export default function MaterialSizes({materialId, configuration, plan, customSize, allSizes, thickness, refreshMaterial} : MaterialSizesProps) {
  if (plan == PRICING_PLANS.STARTER) {
    allSizes =allSizes?.slice(0, PRICING_PLANS.STARTER_RULES.materialSizes)||[];
  }
  return <MaterialSizeIndex refreshMaterial={refreshMaterial} materialId={materialId} customSize={customSize} allSizes={allSizes} thickness={thickness} configuration={configuration} plan={plan} />;

}
