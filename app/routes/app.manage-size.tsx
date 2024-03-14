import { Outlet } from "@remix-run/react";
import {
  Box,
  InlineStack,
  Page,
  Text,
} from "@shopify/polaris";
import { BoxBackground } from "~/components/layouts/BoxBackground";

export default function ManageSize() {
  return (<Page fullWidth>
    <BoxBackground>
      <Box paddingInline="300" paddingBlock="600">
          <InlineStack gap="100" align="start">
            <Text as="h2" variant="headingMd">
              Manage Size
            </Text>
        </InlineStack>
      </Box>
    </BoxBackground>
    <Outlet/>
  </Page>);
}
