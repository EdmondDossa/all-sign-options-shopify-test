import { Box, InlineStack, Page, Text } from "@shopify/polaris";

import { Outlet, useLoaderData, useOutletContext } from "@remix-run/react";
import { BoxBackground } from "~/components/layouts/BoxBackground";
import NextLtrIcon from "~/components/icons/NextLtrIcon";
import MaterialService from "~/models/Material.service";
import { ConfigAdditionalOption, Material } from "~/types/ConfigDataType";
import { LoaderFunctionArgs, json, redirect } from "@remix-run/node";
import { authenticate } from "~/shopify.server";
import { ConfigurationType } from "~/types/ConfigurationType";
import { PRICING_PLANS } from "~/utils/pricing";
import {  getPlan } from "~/utils/pricing-server.server";
import { FixingMethodType, ShapeType } from "~/types/SettingsType";
import SettingShapesService from "~/models/SettingShapes.service";
import SettingFixingMethodService from "~/models/SettingFixingMethod.service";
import SettingBorderService from "~/models/SettingBorder.service";
import MaterialAdditionalOptionService from "~/models/MaterialAdditionalOption.service";
import ConfigurationService from "~/models/Configuration.service";

const normalizeProductType = (value?: string | null) =>
  String(value || "")
    .trim()
    .toLowerCase();

const parseConfigData = (rawData: any) => {
  if (!rawData) return null;
  if (typeof rawData === "string") {
    try {
      const parsed = JSON.parse(rawData);
      return parsed && typeof parsed === "object" ? parsed : null;
    } catch {
      return null;
    }
  }
  return typeof rawData === "object" ? rawData : null;
};

const resolveNcpcProductType = (configuration: any): "neon" | "channel" | null => {
  const productType = normalizeProductType(configuration?.productType);
  if (productType === "neon" || productType === "channel") {
    return productType;
  }

  const data = parseConfigData(configuration?.data);
  const dataProductType = normalizeProductType(data?.productType);
  if (dataProductType === "neon" || dataProductType === "channel") {
    return dataProductType;
  }

  const wrappedNcpcData = parseConfigData(data?.ncpc);
  const wrappedProductType = normalizeProductType(wrappedNcpcData?.productType);
  if (wrappedProductType === "neon" || wrappedProductType === "channel") {
    return wrappedProductType;
  }
  return null;
};

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const { session, admin, billing } = await authenticate.admin(request);
  const configId = parseInt(params.configId ?? "");
  let materials: Material[] | null = null;

  const configuration = Number.isNaN(configId)
    ? null
    : await ConfigurationService.getConfiguration(configId, session.id);

  const ncpcProductType = resolveNcpcProductType(configuration);
  if (ncpcProductType) {
    throw redirect(`/app/ncpc/${configId}/required-options`);
  }

  if (configId) {
    materials = await MaterialService.getAll(session.id, configId);
  }

  const  plan = await getPlan(billing,session?.shop, admin);

  const manageFixingMethods: FixingMethodType[] | null = await SettingFixingMethodService.get(session.id);
  const manageShapes: ShapeType[] | null = await SettingShapesService.get( session.id,);
  const manageBorders = await SettingBorderService.get( session.id, );

  return json({ materials, plan, manageFixingMethods, manageShapes, manageBorders });
};

export default function Materiels() {
  let { materials, plan, manageFixingMethods, manageShapes, manageBorders } = useLoaderData<typeof loader>();
  const { configuration } = useOutletContext<{
    configuration: ConfigurationType;
  }>();

  // console.log(configuration, "77777")

  if (plan == PRICING_PLANS.STARTER && materials) {  
    materials = materials?.filter((m, i) => PRICING_PLANS.STARTER_RULES.materialTypes.includes(m.type))
      ?.slice(0, PRICING_PLANS.STARTER_RULES.materials) || [];
  }

  return (
    <Page fullWidth>
      {/* <BoxBackground>
        <Box padding="300">
          <InlineStack>
            <InlineStack gap="100" align="start">
              <Text as="h2" variant="headingMd">
                {configuration.name}
              </Text>
              <NextLtrIcon />

              <Text as="h2" variant="headingMd" tone="subdued">
                Materials
              </Text>
            </InlineStack>
          </InlineStack>
        </Box>
      </BoxBackground> */}

      <Outlet context={{ materials: materials , plan, manageFixingMethods, manageShapes, manageBorders, materialType: configuration?.materialType}} />
      {/* {console.log(materials)} */}
    </Page>
  );
}
