import {
  BlockStack,
  Box,
  Checkbox,
  Divider,
  Grid,
  InlineStack,
  Select,
  TextField,
  Text,
} from "@shopify/polaris";
import { useCallback, useState } from "react";
import { Form, NavLink, Outlet, redirect, useLoaderData, useNavigate } from "@remix-run/react";
import { BoxBackground } from "~/components/layouts/BoxBackground";
import { SpacingBackground } from "~/components/layouts/SpacingBackground";
import RayEndArrowIcon from "~/components/icons/RayEndArrowIcon";
import { ReactSwitchCustom } from "~/components/inputs/ReactSwitchCustom";
import { SubTabItem } from "~/components/layouts/SubTabItem";
import { LoaderFunctionArgs, json } from "@remix-run/node";
import { authenticate } from "~/shopify.server";
import ColorService from "~/models/Color.service";
import FontService from "~/models/Font.service";
import { ClipartsGroupType, ColorType, FontType } from "~/types/ManagePropertyType";
import { ShapeType } from "~/types/SettingsType";
import SettingShapesService from "~/models/SettingShapes.service";
import ClipartsGroupService from "~/models/ClipartsGroup.service";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const { session, admin } = await authenticate.admin(request);
  const configId = parseInt(params.configId ?? "");
  const mId = parseInt(params.mId ?? "");
  console.log('configID materialID', configId, mId);

  
 
  const manageColors: ColorType[] | null = await ColorService.getColors(session.id)
  const manageFonts : FontType[] | null =  await FontService.getFonts(session.id)
  const manageShapes : ShapeType[] | null =  await SettingShapesService.get(session.id)
  const manageClipartGroups : ClipartsGroupType[] | null =  await ClipartsGroupService.getClipartsGroups(session.id)
  

  
  return json({manageColors, manageFonts,manageShapes, manageClipartGroups });
};

export default function ConfigSettingsGeneral() {
  let  {manageColors, manageFonts, manageShapes, manageClipartGroups } = useLoaderData<typeof loader>();

  return (
    <>
      <SpacingBackground
        backgroundColor="#F4F4F4"
        width="100%"
        height="auto"
        border="1px solid #DDDDDD"
      >
        <Box paddingBlock="300">
          <InlineStack gap="400" align="center">
            <SubTabItem to="customizer-options"> Customizer options</SubTabItem>
            <SubTabItem to="sign-part"> Sign part</SubTabItem>
            <SubTabItem to="text">
              Text
            </SubTabItem>
            <SubTabItem to="image">
              Image
            </SubTabItem>
          </InlineStack>
        </Box>
      </SpacingBackground>

        <Outlet context={  {manageColors, manageFonts ,manageShapes, manageClipartGroups}}></Outlet>
    </>
  );
}

export const action = () => {
  return null;
};



