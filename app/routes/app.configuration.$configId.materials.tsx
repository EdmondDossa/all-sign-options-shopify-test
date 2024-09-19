import { Box, InlineStack, Page, Text } from "@shopify/polaris";

import { Outlet, useLoaderData, useOutletContext } from "@remix-run/react";
import { BoxBackground } from "~/components/layouts/BoxBackground";
import NextLtrIcon from "~/components/icons/NextLtrIcon";
import MaterialService from "~/models/Material.service";
import { Material } from "~/types/ConfigDataType";
import { LoaderFunctionArgs, json } from "@remix-run/node";
import { authenticate } from "~/shopify.server";
import { ConfigurationType } from "~/types/ConfigurationType";
import { PRICING_PLANS, getPlan } from "~/utils/pricing";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const { session, admin, billing } = await authenticate.admin(request);
  const configId = parseInt(params.configId ?? "");
  let materials: Material[] | null = null;

  if (configId) {
    materials = await MaterialService.getAll(session.id, configId);
  }

  const  plan = await getPlan(billing,session?.shop);

  return json({ materials, plan });
};

export default function Materiels() {
  let { materials, plan } = useLoaderData<typeof loader>();
  const { configuration } = useOutletContext<{
    configuration: ConfigurationType;
  }>();

  if (plan == PRICING_PLANS.STARTER && materials) {  
    materials = materials?.filter((m, i) => PRICING_PLANS.STARTER_RULES.materialTypes.includes(m.type))
      ?.slice(0, PRICING_PLANS.STARTER_RULES.materials) || [];
  }

  return (
    <Page fullWidth>
      <BoxBackground>
        <Box paddingInline="300" paddingBlock="600">
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
      </BoxBackground>

      <Outlet context={{ materials: materials , plan}} />
    </Page>
  );
}
