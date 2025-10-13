import { LoaderFunctionArgs, json } from "@remix-run/node";
import { Outlet, useLoaderData, useOutletContext } from "@remix-run/react";
import MaterialShapeService from "~/models/MaterialShape.service";
import SettingShapesService from "~/models/SettingShapes.service";
import { authenticate } from "~/shopify.server";
import { ConfigShape } from "~/types/ConfigDataType";
import { ShapeType } from "~/types/SettingsType";
import { PRICING_PLANS } from "~/utils/pricing";

import MaterialShapeIndex from "./app.configuration.$configId.materials_.$mId.simple.shape._index";


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

  console.log(manageShapes, '999')

  return json( manageShapes );
  // return manageShapes;
};

interface MaterialShapeProps {
  plan: string;
  shapes: ConfigShape[];
  manageShapes: ShapeType[], 
  materialId: number | undefined, 
}

export default function MaterialShapes({materialId, plan, shapes, manageShapes}: MaterialShapeProps) {
  // let manageShapes = useLoaderData<typeof loader>();
  // const {  plan } = useOutletContext<{
  //   plan: string;
  // }>();
  if (plan == PRICING_PLANS.STARTER && manageShapes) {
    manageShapes = manageShapes.slice(0, PRICING_PLANS.STARTER_RULES.materialShapes);
    shapes = shapes?.filter(curr => curr.shapeId < PRICING_PLANS.STARTER_RULES.materialShapes)
      ?.slice(0, PRICING_PLANS.STARTER_RULES.materialShapes) || [];
  }

  // return <Outlet context={{ manageShapes, shapes, plan }} />;
  return <MaterialShapeIndex materialId={materialId} plan={plan} manageShapes={manageShapes} shapes={shapes} />;

}
