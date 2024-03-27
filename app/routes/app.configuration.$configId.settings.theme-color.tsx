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
import { Form, NavLink, Outlet, redirect, useNavigate } from "@remix-run/react";
import { BoxBackground } from "~/components/layouts/BoxBackground";
import { SpacingBackground } from "~/components/layouts/SpacingBackground";
import RayEndArrowIcon from "~/components/icons/RayEndArrowIcon";
import { ReactSwitchCustom } from "~/components/inputs/ReactSwitchCustom";
import { SubTabItem } from "~/components/layouts/SubTabItem";

export default function ConfigSettingsGeneral() {

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
            <SubTabItem to=""> Choose your customizer appearance</SubTabItem>

          </InlineStack>
        </Box>
      </SpacingBackground>

        <Outlet></Outlet>
    </>
  );
}



