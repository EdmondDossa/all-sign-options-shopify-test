import { Box, InlineStack, Page, Text } from "@shopify/polaris";

import { useLoaderData, useNavigate, useOutletContext, useSearchParams } from "@remix-run/react";
import { BoxBackground } from "~/components/layouts/BoxBackground";
import NextLtrIcon from "~/components/icons/NextLtrIcon";
import { json } from "@remix-run/node";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { authenticate } from "~/shopify.server";
import type { ConfigurationType } from "~/types/ConfigurationType";
import { Modal, TitleBar } from "@shopify/app-bridge-react";


export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const { session } = await authenticate.admin(request);
  return json({ token: session.accessToken, configId: parseInt(params.configId ?? "") || 0 });
};

export default function Preview() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { token } = useLoaderData<typeof loader>();
  const { configuration } = useOutletContext<{
    configuration: ConfigurationType;
  }>();
  const returnTo = searchParams.get("returnTo") || "";

  return (
    <Page fullWidth>
      <Modal
        id="my-modal"
        open={true}
        variant="max"
        onHide={() => navigate(returnTo || `/app/configuration/${configuration.id}/materials`)}
      >
        <iframe
          title={configuration?.name ? `${configuration.name} preview` : "Configuration preview"}
          name={JSON.stringify({
            configId: configuration.id,
            templateId: "",
            token,
          })}
          src="/preview.html"
          className="aso-preview"
        ></iframe>
        <TitleBar title={configuration.name}></TitleBar>
      </Modal>
      <BoxBackground>
        <Box paddingInline="300" paddingBlock="600">
          <InlineStack>
            <InlineStack gap="100" align="start">
              <Text as="h2" variant="headingMd">
                {configuration.name}
              </Text>
              <NextLtrIcon />

              <Text as="h2" variant="headingMd" tone="subdued">
                Preview
              </Text>
            </InlineStack>
          </InlineStack>
        </Box>
      </BoxBackground>
    </Page>
  );
}
