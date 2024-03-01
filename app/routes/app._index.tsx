import { FunctionComponent, useEffect } from "react";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { redirect, useActionData, useNavigation, useSubmit } from "@remix-run/react";
import {
  Page,
  Layout,
  Text,
  Card,
  Button,
  BlockStack,
  Box,
  List,
  InlineStack,
  Grid,
  LegacyCard,
  Icon,
  Divider,
  InlineGrid,
  TextField,
} from "@shopify/polaris";
import { PlusIcon } from "@shopify/polaris-icons";
import { authenticate } from "../shopify.server";
import ManageFontIcon from "~/components/icons/ManageFontIcon";
import ManageClipartsIcon from "~/components/icons/ManageClipartsIcon";
import ColorPaletteIcon from "~/components/icons/ColorPaletteIcon";
import ManageSizeIcon from "~/components/icons/ManageSizeIcon";
import ConfigurationIcon from "~/components/icons/ConfigurationIcon";
import SettingsGeneralIcon from "~/components/icons/SettingsGeneralIcon";
import MessageIcon from "~/components/icons/MessageIcon";



export default function Index() {
  return (
    <Page fullWidth>
      <Layout>
        <Layout.Section>
           <CardConfig />
        </Layout.Section>
      </Layout>
    </Page>
  );
}

export const Placeholder = ({ height = "auto" }) => {
  return (
    <div
      style={{
        background: "var(--p-color-text-info)",
        padding: "14px var(--p-space-200)",
        height: height,
        width: "100%",
      }}
    />
  );
};



export const CardConfig = () => {
  return (
    <Card roundedAbove="sm">
      <BlockStack gap="600">
        <InlineGrid columns="1fr auto">
          <Text as="h2" variant="headingSm">
            List of configurations
          </Text>
          <Text as="span" variant="bodyMd">
            11 configurations
          </Text>
        </InlineGrid>
        <InlineGrid gap="300" columns={4}>
          <TextField
            placeholder="Example: North America, Europe"
            autoComplete="off"
          />
          <TextField
            placeholder="Example: North America, Europe"
            autoComplete="off"
          />
          <TextField
            placeholder="Example: North America, Europe"
            autoComplete="off"
          />
          <Button icon={PlusIcon} tone="success" variant="primary">
            Add new configuration
          </Button>
        </InlineGrid>
        <Text as="p" variant="bodyMd">
          Add variants if this product comes in multiple versions, like
          different sizes or colors.
        </Text>
      </BlockStack>
    </Card>
  );
};
