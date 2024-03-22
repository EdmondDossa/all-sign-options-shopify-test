

import { LoaderFunctionArgs, json } from "@remix-run/node";
import {Outlet, useLoaderData} from "@remix-run/react";
import ColorService from "~/models/Color.service";
import MaterialAdditionalOptionService from "~/models/MaterialAdditionalOption.service";
import MaterialAdditionalOptionItemService from "~/models/MaterialAdditionalOptionItem.service";
import MaterialColorService from "~/models/MaterialColors.service";
import { authenticate } from "~/shopify.server";
import { ConfigAdditionalOption, ConfigAdditionalOptionItem, ConfigBorder, ConfigColor, ConfigCustomSize, ConfigSize } from "~/types/ConfigDataType";
import { ColorType, SizeType } from "~/types/ManagePropertyType";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const { session, admin } = await authenticate.admin(request);
  const configId = parseInt(params.configId ?? "");
  const mId = parseInt(params.mId ?? "");
  const aId = parseInt(params.aId ?? "");
  console.log('configID materialID', configId, mId, aId);

  let additionalOptionItems: ConfigAdditionalOptionItem[] | null = null;

  if ( !Number.isNaN(configId)  && !Number.isNaN(mId) ) {
    additionalOptionItems = await MaterialAdditionalOptionItemService.getAll(session.id, configId, mId,aId);

  }
  
  return json({additionalOptionItems });
};

export default function MaterialAdditionalOptionIndex() {
  let  {additionalOptionItems } = useLoaderData<typeof loader>();
  return (
      <Outlet context={  {additionalOptionItems }}/>
  );
}
