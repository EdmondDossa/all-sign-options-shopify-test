

import { LoaderFunctionArgs, json } from "@remix-run/node";
import {Outlet, useLoaderData} from "@remix-run/react";
import ColorService from "~/models/Color.service";
import MaterialColorService from "~/models/MaterialColors.service";
import MaterialFixingMethodService from "~/models/MaterialFixingMethod.service";
import SettingFixingMethodService from "~/models/SettingFixingMethod.service";
import { authenticate } from "~/shopify.server";
import { ConfigBorder, ConfigColor, ConfigCustomSize, ConfigFixingMethod, ConfigSize } from "~/types/ConfigDataType";
import { ColorType, SizeType } from "~/types/ManagePropertyType";
import { FixingMethodType } from "~/types/SettingsType";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const { session, admin } = await authenticate.admin(request);
  const configId = parseInt(params.configId ?? "");
  const mId = parseInt(params.mId ?? "");
  console.log('configID materialID', configId, mId);

  let fixingMethods: ConfigFixingMethod[] | null = null;
  
 
  const manageFixingMethods : FixingMethodType[] | null =  await SettingFixingMethodService.get(session.id)

  if ( !Number.isNaN(configId)  && !Number.isNaN(mId) ) {
    fixingMethods = await MaterialFixingMethodService.getAll(session.id, configId, mId);

  }
  
  return json({manageFixingMethods, fixingMethods });
};

export default function MaterialFixingMethodsIndex() {
  let  {manageFixingMethods, fixingMethods } = useLoaderData<typeof loader>();
  return (
      <Outlet context={  {manageFixingMethods, fixingMethods }}/>
  );
}


