import { LoaderFunctionArgs, json } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import MaterialShapeService from "~/models/MaterialShape.service";
import SettingShapesService from "~/models/SettingShapes.service";
import { authenticate } from "~/shopify.server";
import { ConfigShape } from "~/types/ConfigDataType";
import { ShapeType } from "~/types/SettingsType";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const { session, admin } = await authenticate.admin(request);
  const configId = parseInt(params.configId ?? "");
  const mId = parseInt(params.mId ?? "");
  console.log("configID materialID", configId, mId);

  let shapes: ConfigShape[] | null = null;

  const manageShapes: ShapeType[] | null = await SettingShapesService.get(
    session.id,
  );

  if (!Number.isNaN(configId) && !Number.isNaN(mId)) {
    shapes = await MaterialShapeService.getAll(session.id, configId, mId);
  }

  return json({ manageShapes, shapes });
};

export default function MaterialColors() {
  let { manageShapes, shapes } = useLoaderData<typeof loader>();
  return <Outlet context={{ manageShapes, shapes }} />;
}
