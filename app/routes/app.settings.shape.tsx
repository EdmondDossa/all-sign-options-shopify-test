import {
  Box,
  ButtonGroup,
  Divider,
  IndexTable,
  InlineStack,
  Text,
} from "@shopify/polaris";
import { EditIconBtn } from "~/components/buttons/EditIconBtn";
import { Form, Link, NavLink, Outlet, useLoaderData, useNavigate } from "@remix-run/react";
import { BoxBackground } from "~/components/layouts/BoxBackground";
import { SpacingBackground } from "~/components/layouts/SpacingBackground";
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
