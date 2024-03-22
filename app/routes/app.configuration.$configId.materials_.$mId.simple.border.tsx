

import { LoaderFunctionArgs, json } from "@remix-run/node";
import {Outlet, useLoaderData} from "@remix-run/react";
import MaterialBorderService from "~/models/MaterialBorderService.service";
import SettingBorderService from "~/models/SettingBorder.service";
import SizeService from "~/models/Size.service";
import { authenticate } from "~/shopify.server";
import { ConfigBorder, ConfigCustomSize, ConfigSize } from "~/types/ConfigDataType";
import { SizeType } from "~/types/ManagePropertyType";
import { BorderType } from "~/types/SettingsType";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const { session, admin } = await authenticate.admin(request);
  const configId = parseInt(params.configId ?? "");
  const mId = parseInt(params.mId ?? "");
  console.log('configID materialID', configId, mId);

  let borders: ConfigBorder[] | null = null;
  
  const manageSizes: SizeType[] | null = await SizeService.getSizes(session.id)
  const manageBorders : BorderType[] | null =  await SettingBorderService.get(session.id)

  if ( !Number.isNaN(configId)  && !Number.isNaN(mId) ) {
    borders = await MaterialBorderService.getAll(session.id, configId, mId);

  }
  
  return json({manageSizes,manageBorders, borders });
};

export default function MaterialBorder() {
  let  {manageSizes,manageBorders, borders } = useLoaderData<typeof loader>();
  return (
      <Outlet context={  {manageSizes,manageBorders, borders }}/>
  );
}

