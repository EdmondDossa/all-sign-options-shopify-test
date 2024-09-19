import {
  Box,
  InlineStack
} from "@shopify/polaris";
import {  Outlet, useLoaderData } from "@remix-run/react";
import { SpacingBackground } from "~/components/layouts/SpacingBackground";
import { SubTabItem } from "~/components/layouts/SubTabItem";
import { LoaderFunctionArgs, json } from "@remix-run/node";
import { authenticate } from "~/shopify.server";
import FontService from "~/models/Font.service";
import { ClipartsGroupType, ColorType, FontType } from "~/types/ManagePropertyType";
import { ShapeType } from "~/types/SettingsType";
import SettingShapesService from "~/models/SettingShapes.service";
import ClipartsGroupService from "~/models/ClipartsGroup.service";
import { getPlan } from "~/utils/pricing";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const { session, admin, billing } = await authenticate.admin(request);
  const configId = parseInt(params.configId ?? "");
  const mId = parseInt(params.mId ?? "");
  console.log('configID materialID', configId, mId);

  
 

  const manageFonts : FontType[] | null =  await FontService.getFonts(session.id)
  const manageShapes : ShapeType[] | null =  await SettingShapesService.get(session.id)
  const manageClipartGroups : ClipartsGroupType[] | null =  await ClipartsGroupService.getClipartsGroups(session.id)
  const plan =  await  getPlan(billing,session?.shop)

  
  return json({ manageFonts,manageShapes, manageClipartGroups, plan});
};

export default function ConfigSettingsGeneral() {
  let  { manageFonts, manageShapes, manageClipartGroups, plan } = useLoaderData<typeof loader>();

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

        <Outlet context={  { manageFonts ,manageShapes, manageClipartGroups, plan}}></Outlet>
    </>
  );
}

export const action = () => {
  return null;
};



