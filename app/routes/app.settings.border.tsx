
import {  Outlet, useLoaderData, useNavigate, useOutletContext } from "@remix-run/react";
import { LoaderFunctionArgs, json } from "@remix-run/node";
import { authenticate } from "~/shopify.server";
import { BorderType } from "~/types/SettingsType";
import SettingBorderService from "~/models/SettingBorder.service";
import { PRICING_PLANS } from "~/utils/pricing";

export const loader = async ({request}:LoaderFunctionArgs) => { 
  const { session, admin } = await authenticate.admin(request);

  const borders:BorderType[]|null = await SettingBorderService.get(session.id);
 
  return  json({borders})
}
export default function MaterialFixingMethod() {
  let { borders } = useLoaderData<typeof loader>();
  const { plan } = useOutletContext<{ plan: string }>();
  if(plan ==PRICING_PLANS.STARTER){
    borders = borders?.slice(0, PRICING_PLANS.STARTER_RULES.materialBorders) || null;
  }


  return (
    <Outlet context={{borders:borders, plan:plan}}/>
  );
}
