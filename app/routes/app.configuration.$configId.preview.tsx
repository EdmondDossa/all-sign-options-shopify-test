import { Box, InlineStack, Page, Text } from "@shopify/polaris";

import { useLoaderData, useNavigate, useOutletContext } from "@remix-run/react";
import { BoxBackground } from "~/components/layouts/BoxBackground";
import NextLtrIcon from "~/components/icons/NextLtrIcon";
import MaterialService from "~/models/Material.service";
import { Material } from "~/types/ConfigDataType";
import { LoaderFunctionArgs, json } from "@remix-run/node";
import { authenticate } from "~/shopify.server";
import { ConfigurationType } from "~/types/ConfigurationType";
import { Modal, TitleBar, useAppBridge } from "@shopify/app-bridge-react";
import { useMemo } from "react";


export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const { session, admin } = await authenticate.admin(request);
  const configId = parseInt(params.configId ?? "");
  let materials: Material[] | null = null;

  if (configId) {
    materials = await MaterialService.getAll(session.id, configId);
  }

  return json({ materials,token:session.accessToken });
};

export default function Preview() {
  const navigate = useNavigate();
  let { materials, token } = useLoaderData<typeof loader>();
  const { configuration } = useOutletContext<{
    configuration: ConfigurationType;
  }>();
  const shopify = useAppBridge();
  const cacheBuster = useMemo(() => Date.now(), []);

  return (
    <Page fullWidth>
      <Modal
        id="my-modal"
        open={true}
        variant="max"
        onHide={() => navigate(-1)}
      >
        <iframe
          name={JSON.stringify({
            configId: configuration.id,
            templateId: "",
            token:token
          })}
          src={`/preview.html?v=${cacheBuster}`}
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
