import { LoaderFunctionArgs, json } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import MaterialSizeService from "~/models/MateriaSizeService.service";
import MaterialFixingMethodService from "~/models/MaterialFixingMethod.service";
import SettingFixingMethodService from "~/models/SettingFixingMethod.service";
import SettingShapesService from "~/models/SettingShapes.service";
import { authenticate } from "~/shopify.server";
import { ConfigFixingMethod, ConfigSize } from "~/types/ConfigDataType";
import { FixingMethodType, ShapeType } from "~/types/SettingsType";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const { session, admin } = await authenticate.admin(request);
  const configId = parseInt(params.configId ?? "");
  const mId = parseInt(params.mId ?? "");
  console.log("configID materialID", configId, mId);

  let fixingMethods: ConfigFixingMethod[] | null = null;
  let configSizes: ConfigSize[] = [];

  const manageFixingMethods: FixingMethodType[] | null =
    await SettingFixingMethodService.get(session.id);
  const manageShapes: ShapeType[] | null = await SettingShapesService.get(
    session.id,
  );

  if (!Number.isNaN(configId) && !Number.isNaN(mId)) {
    fixingMethods = await MaterialFixingMethodService.getAll(
      session.id,
      configId,
      mId,
    );
    let materialSizes = await MaterialSizeService.getAll(
      session.id,
      configId,
      mId,
    );
    configSizes = materialSizes?.allSizes || [];
  }

  return json({
    manageFixingMethods,
    fixingMethods,
    manageShapes,
    configSizes,
  });
};

export default function MaterialFixingMethodsIndex() {
  let { manageFixingMethods, fixingMethods, manageShapes, configSizes } =
    useLoaderData<typeof loader>();
  return (
    <Outlet
      context={{
        manageFixingMethods,
        fixingMethods,
        manageShapes,
        configSizes,
      }}
    />
  );
}
