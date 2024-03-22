

import { LoaderFunctionArgs, json } from "@remix-run/node";
import {Outlet, useLoaderData} from "@remix-run/react";
import ColorService from "~/models/Color.service";
import MaterialBorderService from "~/models/MaterialBorderService.service";
import MaterialColorService from "~/models/MaterialColors.service";
import MaterialShapeService from "~/models/MaterialShape.service";
import SettingBorderService from "~/models/SettingBorder.service";
import SettingShapesService from "~/models/SettingShapes.service";
import SizeService from "~/models/Size.service";
import { authenticate } from "~/shopify.server";
import { ConfigBorder, ConfigShape, ConfigCustomSize, ConfigSize } from "~/types/ConfigDataType";
import { ColorType, SizeType } from "~/types/ManagePropertyType";
import { BorderType, ShapeType } from "~/types/SettingsType";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const { session, admin } = await authenticate.admin(request);
  const configId = parseInt(params.configId ?? "");
  const mId = parseInt(params.mId ?? "");
  console.log('configID materialID', configId, mId);

  let shapes: ConfigShape[] | null = null;
  
 
  const manageShapes : ShapeType[] | null =  await SettingShapesService.get(session.id)

  if ( !Number.isNaN(configId)  && !Number.isNaN(mId) ) {
    shapes = await MaterialShapeService.getAll(session.id, configId, mId);

  }
  
  return json({manageShapes, shapes });
};

export default function MaterialColors() {
  let  {manageShapes, shapes } = useLoaderData<typeof loader>();
  return (
      <Outlet context={  {manageShapes, shapes }}/>
  );
}
