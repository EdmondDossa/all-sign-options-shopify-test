import { Outlet, useLoaderData, useNavigate } from "@remix-run/react";
import { LoaderFunctionArgs, json } from "@remix-run/node";
import { authenticate } from "~/shopify.server";
import SettingShapesService from "~/models/SettingShapes.service";
import { ShapeType } from "~/types/SettingsType";

export const loader = async ({request}:LoaderFunctionArgs) => { 
  const { session, admin } = await authenticate.admin(request);

  const shapes:ShapeType[] = await SettingShapesService.get(session.id);
 
  return  json({shapes})
}

export default function MaterialFixingMethod() {
  const navigate = useNavigate();
  const { shapes } = useLoaderData<typeof loader>();

  return (
    <Outlet context={{shapes:shapes}}/>
  );
}
