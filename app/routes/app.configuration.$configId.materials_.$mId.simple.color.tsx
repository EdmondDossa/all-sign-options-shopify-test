

import { LoaderFunctionArgs, json } from "@remix-run/node";
import {Outlet, useLoaderData} from "@remix-run/react";
import ColorService from "~/models/Color.service";
import MaterialBorderService from "~/models/MaterialBorderService.service";
import MaterialColorService from "~/models/MaterialColors.service";
import SettingBorderService from "~/models/SettingBorder.service";
import SizeService from "~/models/Size.service";
import { authenticate } from "~/shopify.server";
import { ConfigBorder, ConfigColor, ConfigCustomColor } from "~/types/ConfigDataType";
import { ColorType, SizeType } from "~/types/ManagePropertyType";
import { BorderType } from "~/types/SettingsType";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const { session, admin } = await authenticate.admin(request);
  const configId = parseInt(params.configId ?? "");
  const mId = parseInt(params.mId ?? "");
  console.log('configID materialID', configId, mId);

  let colors: {allColors: ConfigColor[], customColors: ConfigCustomColor} | null = null;
  
 
  const manageColors : ColorType[] | null =  await ColorService.getColors(session.id)

  if ( !Number.isNaN(configId)  && !Number.isNaN(mId) ) {
    colors = await MaterialColorService.getAll(session.id, configId, mId);

  }
  
  return json({manageColors, colors });
};

export default function MaterialColors() {
  let  {manageColors, colors } = useLoaderData<typeof loader>();
  return (
      <Outlet context={  {manageColors, colors: colors?.allColors, customColors: colors?.customColors }}/>
  );
}
