import { LoaderFunctionArgs, json } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import MaterialSizeService from "~/models/MateriaSizeService.service";
import { authenticate } from "~/shopify.server";
import {
  ConfigCustomSize,
  ConfigSize,
  configSizeThickness,
} from "~/types/ConfigDataType";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const { session, admin } = await authenticate.admin(request);
  const configId = parseInt(params.configId ?? "");
  const mId = parseInt(params.mId ?? "");
  console.log("configID materialID", configId, mId);

  let materialSizes: {
    customSize: ConfigCustomSize;
    thickness: configSizeThickness;
    allSizes: ConfigSize[];
  } | null = null;

  if (!Number.isNaN(configId) && !Number.isNaN(mId)) {
    materialSizes = await MaterialSizeService.getAll(session.id, configId, mId);
  }
  const { customSize, allSizes, thickness } = materialSizes || {};
  return json({ customSize, allSizes, thickness });
};

export default function MaterialSizes() {
  let { customSize, allSizes, thickness } = useLoaderData<typeof loader>();
  return <Outlet context={{ customSize, allSizes, thickness }} />;
}
