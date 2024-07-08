import { LoaderFunctionArgs, json } from "@remix-run/node";
import { Outlet, useLoaderData, useOutletContext } from "@remix-run/react";
import MaterialColorService from "~/models/MaterialColors.service";

import { authenticate } from "~/shopify.server";
import { ConfigColor, ConfigCustomColor } from "~/types/ConfigDataType";
import { PRICING_PLANS } from "~/utils/pricing";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const { session, admin } = await authenticate.admin(request);
  const configId = parseInt(params.configId ?? "");
  const mId = parseInt(params.mId ?? "");
  console.log("configID materialID", configId, mId);

  let colors: {
    allColors: ConfigColor[];
    customColors: ConfigCustomColor;
  } | null = null;

  if (!Number.isNaN(configId) && !Number.isNaN(mId)) {
    colors = await MaterialColorService.getAll(session.id, configId, mId);
  }

  return json({ colors });
};

export default function MaterialColors() {
  const {  plan } = useOutletContext<{

    plan: string;
  }>();
  let { colors } = useLoaderData<typeof loader>();

  if (plan == PRICING_PLANS.STARTER && colors) {
    colors.allColors =colors.allColors?.slice(0, 10);
  }
  return (
    <Outlet
      context={{
        colors: colors?.allColors,
        customColors: colors?.customColors,
        plan: plan
      }}
    />
  );
}
