import { Outlet, useLoaderData, useNavigate, useOutletContext } from "@remix-run/react";
import { LoaderFunctionArgs, json } from "@remix-run/node";
import { authenticate } from "~/shopify.server";
import SettingShapesService from "~/models/SettingShapes.service";
import { ShapeType } from "~/types/SettingsType";
import { PRICING_PLANS } from "~/utils/pricing";

export const loader = async ({request}:LoaderFunctionArgs) => { 
  const { session, admin } = await authenticate.admin(request);

  const shapes:ShapeType[] = await SettingShapesService.get(session.id);
 
  return  json({shapes})
}

export default function MaterialFixingMethod() {
 
  let { shapes} = useLoaderData<typeof loader>();
  const { plan } = useOutletContext<{ plan: string }>();

  if(plan==PRICING_PLANS.STARTER){
    shapes = shapes.slice(0,PRICING_PLANS.STARTER_RULES.materialShapes)
  }

  return (
    <Outlet context={{shapes:shapes, plan:plan}}/>
  );
}
