

import { LoaderFunctionArgs, json } from "@remix-run/node";
import {Outlet, useLoaderData} from "@remix-run/react";
import ColorService from "~/models/Color.service";
import MaterialAdditionalOptionService from "~/models/MaterialAdditionalOption.service";
import MaterialColorService from "~/models/MaterialColors.service";
import { authenticate } from "~/shopify.server";
import { ConfigAdditionalOption, ConfigBorder, ConfigColor, ConfigCustomSize, ConfigSize } from "~/types/ConfigDataType";
import { ColorType, SizeType } from "~/types/ManagePropertyType";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const { session, admin } = await authenticate.admin(request);
  const configId = parseInt(params.configId ?? "");
  const mId = parseInt(params.mId ?? "");
  console.log('configID materialID', configId, mId);

  let additionalOptions: ConfigAdditionalOption[] | null = null;

  if ( !Number.isNaN(configId)  && !Number.isNaN(mId) ) {
    additionalOptions = await MaterialAdditionalOptionService.getAll(session.id, configId, mId);

  }
  
  return json({additionalOptions });
};

export default function MaterialAdditionalOptionIndex() {
  let  {additionalOptions } = useLoaderData<typeof loader>();
  return (
      <Outlet context={  {additionalOptions }}/>
  );
}
