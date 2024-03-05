import { Outlet } from "@remix-run/react";
import {
  Box,
  Card,
  Divider,
  InlineStack,
  Layout,
  Page,
  Text,
} from "@shopify/polaris";
import NextLtrIcon from "~/components/icons/NextLtrIcon";
import { BoxBackground } from "~/components/layouts/BoxBackground";
import { Tabheader } from "~/components/layouts/TabHeader copy";

export default function ManageSize() {
  return (<Page fullWidth>
    <BoxBackground>
      <Box paddingInline="300" paddingBlock="600">
        <InlineStack>
          <InlineStack gap="100" align="start">
            <Text as="h2" variant="headingMd">
              Name config
            </Text>
            <NextLtrIcon />
            <Text as="h2" variant="headingMd" tone="subdued">
              Material
            </Text>
            <NextLtrIcon />
            <Text as="h2" variant="headingMd" tone="subdued">
              Plastic
            </Text>
          </InlineStack>
        </InlineStack>
      </Box>
      <Divider borderWidth="100" />
      
    </BoxBackground>
    <Divider borderWidth="100" />
    <Outlet/>
  </Page>);
}
