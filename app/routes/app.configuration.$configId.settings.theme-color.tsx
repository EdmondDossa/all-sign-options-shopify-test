import { Box, InlineStack } from "@shopify/polaris";
import { Outlet } from "@remix-run/react";
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
            <SubTabItem to="theme">
            
              Choose your customizer appearance
            </SubTabItem>
            <SubTabItem to="custom-css"> Custom CSS </SubTabItem>
          </InlineStack>
        </Box>
      </SpacingBackground>

      <Outlet></Outlet>
    </>
  );
}
