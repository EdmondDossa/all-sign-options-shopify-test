import { Outlet } from "@remix-run/react";
import {
  Box,
  InlineStack,
  Page,
  Text,
} from "@shopify/polaris";
import { BoxBackground } from "~/components/layouts/BoxBackground";

export default function ColorPalette() {
  return (<Page fullWidth>
    <BoxBackground>
      <Box paddingInline="300" paddingBlock="600">
          <InlineStack gap="100" align="start">
            <Text as="h2" variant="headingMd">
            Color Palette
            </Text>
        </InlineStack>
      </Box>
    </BoxBackground>
    <Outlet/>
  </Page>);
}
