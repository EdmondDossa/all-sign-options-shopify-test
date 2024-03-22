
import { Form, Link, NavLink, Outlet, useLoaderData, useNavigate } from "@remix-run/react";
import { LoaderFunctionArgs, json } from "@remix-run/node";
import { authenticate } from "~/shopify.server";
import { FixingMethodType } from "~/types/SettingsType";
import SettingFixingMethodService from "~/models/SettingFixingMethod.service";

export const loader = async ({request}:LoaderFunctionArgs) => { 
  const { session, admin } = await authenticate.admin(request);

  const fixingMethods:FixingMethodType[]|null = await SettingFixingMethodService.get(session.id);
 
  return json({ fixingMethods })
}

export default function SettingFixingMethod() {
  const navigate = useNavigate();
  const { fixingMethods } = useLoaderData<typeof loader>();

  return (
    <Outlet context={{fixingMethods:fixingMethods}}/>
  );
}
