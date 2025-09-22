import {

  Box,

  InlineStack,
} from "@shopify/polaris";

import {  Outlet } from "@remix-run/react";
import { SpacingBackground } from "~/components/layouts/SpacingBackground";
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
            <SubTabItem to="product"> Produit</SubTabItem>
            <SubTabItem to="output"> output</SubTabItem>
            <SubTabItem to="quantity-limits">
              Quantity Limits
            </SubTabItem>
            <SubTabItem to="mobile-option">
              Mobile Option
            </SubTabItem>
            <SubTabItem to="upload">
              Upload Design
            </SubTabItem>
          </InlineStack>
        </Box>
      </SpacingBackground>

        <Outlet></Outlet>
    </>
  );
}

export const action = () => {
  return null;
};



