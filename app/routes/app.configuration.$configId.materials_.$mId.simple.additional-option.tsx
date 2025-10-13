import { LoaderFunctionArgs, json } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import MaterialAdditionalOptionService from "~/models/MaterialAdditionalOption.service";
import { authenticate } from "~/shopify.server";
import { ConfigAdditionalOption } from "~/types/ConfigDataType";
import { proSubscriptionRequired } from "~/utils/pricing-server.server";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const { session, admin, billing } = await authenticate.admin(request);
  await proSubscriptionRequired(billing,session?.shop, admin);
  const configId = parseInt(params.configId ?? "");
  const mId = parseInt(params.mId ?? "");
  console.log("configID materialID", configId, mId);

  let additionalOptions: ConfigAdditionalOption[] | null = null;

  if (!Number.isNaN(configId) && !Number.isNaN(mId)) {
    additionalOptions = await MaterialAdditionalOptionService.getAll(
      session.id,
      configId,
      mId,
    );
  }

  return json({ additionalOptions });
};

interface MaterialAddOptionsProps{
  additionalOptions: ConfigAdditionalOption[]
}
export default function MaterialAdditionalOptionInd({additionalOptions}:MaterialAddOptionsProps) {
  // let { additionalOptions } = useLoaderData<typeof loader>();
  console.log(additionalOptions, "add options")
  return <Outlet context={{ additionalOptions }} />;
}
