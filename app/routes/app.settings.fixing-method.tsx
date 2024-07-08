
import {  Outlet, useLoaderData, useNavigate, useOutletContext } from "@remix-run/react";
import { LoaderFunctionArgs, json } from "@remix-run/node";
import { authenticate } from "~/shopify.server";
import { FixingMethodType } from "~/types/SettingsType";
import SettingFixingMethodService from "~/models/SettingFixingMethod.service";
import { PRICING_PLANS } from "~/utils/pricing";

export const loader = async ({request}:LoaderFunctionArgs) => { 
  const { session, admin } = await authenticate.admin(request);

  const fixingMethods:FixingMethodType[]|null = await SettingFixingMethodService.get(session.id);
 
  return json({ fixingMethods })
}

export default function SettingFixingMethod() {
  let { fixingMethods } = useLoaderData<typeof loader>();
  const { plan } = useOutletContext<{ plan: string }>();

  if(plan==PRICING_PLANS.STARTER){
    fixingMethods = fixingMethods?.slice(0, 5) || null;
  }


  return (
    <Outlet context={{fixingMethods:fixingMethods, plan:plan}}/>
  );
}
