

import { LoaderFunctionArgs, json } from "@remix-run/node";
import {Outlet, useLoaderData} from "@remix-run/react";
import MaterialSizeService from "~/models/MateriaSizeService.service";
import SizeService from "~/models/Size.service";
import { authenticate } from "~/shopify.server";
import { ConfigCustomSize, ConfigSize } from "~/types/ConfigDataType";
import { SizeType } from "~/types/ManagePropertyType";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const { session, admin } = await authenticate.admin(request);
  const configId = parseInt(params.configId ?? "");
  const mId = parseInt(params.mId ?? "");
  console.log('configID materialID', configId, mId);

  let materialSizes:{
    customSize: ConfigCustomSize;
    allSizes: ConfigSize[];
  } | null = null;
  
  const manageSizes:SizeType[]|null =  await SizeService.getSizes(session.id)

  if (!Number.isNaN(configId)  && !Number.isNaN(mId)) {
    materialSizes = await MaterialSizeService.getAll(session.id, configId, mId);

  }
  const {customSize,allSizes} = materialSizes||{}
  return json({customSize, allSizes, manageSizes });
};

export default function MaterialSizes() {
  let  {customSize, allSizes, manageSizes } = useLoaderData<typeof loader>();
  return (
      <Outlet context={  {customSize, allSizes, manageSizes } }/>
  );
}

