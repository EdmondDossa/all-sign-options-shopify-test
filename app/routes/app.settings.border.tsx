
import {  Outlet, useLoaderData, useNavigate } from "@remix-run/react";
import { LoaderFunctionArgs, json } from "@remix-run/node";
import { authenticate } from "~/shopify.server";
import { BorderType } from "~/types/SettingsType";
import SettingBorderService from "~/models/SettingBorder.service";

export const loader = async ({request}:LoaderFunctionArgs) => { 
  const { session, admin } = await authenticate.admin(request);

  const borders:BorderType[]|null = await SettingBorderService.get(session.id);
 
  return  json({borders})
}
export default function MaterialFixingMethod() {
  const { borders } = useLoaderData<typeof loader>();

  return (
    <Outlet context={{borders:borders}}/>
  );
}
