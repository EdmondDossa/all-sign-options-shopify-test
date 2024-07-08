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

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const { session, admin } = await authenticate.admin(request);
  const configId = parseInt(params.configId ?? "");
  const mId = parseInt(params.mId ?? "");
  console.log("configID materialID", configId, mId);

  let borders:ConfigBorder[] | null = null;

  let borderSetting = null;

  let configSizes: ConfigSize[] = [];
  const manageBorders: BorderType[] | null = await SettingBorderService.get(
    session.id,
  );
  const manageShapes: ShapeType[] | null = await SettingShapesService.get(
    session.id,
  );

  if (!Number.isNaN(configId) && !Number.isNaN(mId)) {
    const bordersResponse = await MaterialBorderService.getAll(
      session.id,
      configId,
      mId,
    );
    borders = bordersResponse?.allBorders||[];
    borderSetting = bordersResponse?.settings;
    let materialSizes = await MaterialSizeService.getAll(
      session.id,
      configId,
      mId,
    );
    configSizes = materialSizes?.allSizes || [];
  }

  return json({
    configSizes,
    manageBorders,
    borders,
    manageShapes,
    borderSetting,
  });
};

export default function MaterialBorder() {
  let { configSizes, manageBorders, borders, manageShapes, borderSetting } =
    useLoaderData<typeof loader>();
    const {  plan } = useOutletContext<{
      plan: string;
    }>();
    if (plan == PRICING_PLANS.STARTER) {
      manageShapes = manageShapes?.slice(0, 5) || [];
      configSizes = configSizes?.slice(0, 10) || [];
      manageBorders = manageBorders?.slice(0, 2) || [];
      borders = borders?.filter(curr => curr.manageBorderId < 2 ) .slice(0, 2) || [];
    }
  return (
    <Outlet
      context={{
        configSizes,
        manageBorders,
        borders,
        manageShapes,
        borderSetting,
        plan
      }}
    />
  );
}
