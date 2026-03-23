import { Box, InlineStack, Page, Text } from "@shopify/polaris";

import { useLoaderData, useNavigate, useSearchParams } from "@remix-run/react";
import { BoxBackground } from "~/components/layouts/BoxBackground";
import NextLtrIcon from "~/components/icons/NextLtrIcon";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { authenticate } from "~/shopify.server";
import { Modal, TitleBar } from "@shopify/app-bridge-react";
import TemplateService from "~/models/Template.service";
import useHandleFlashMessage from "~/hooks/useHandleFlashMessage";


export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const { session } = await authenticate.admin(request);
  const id = parseInt(params.id ?? "");
  let template = null;

  if (id) {
    template = await TemplateService.getTemplate(id,session.id);
  }

 
  return json({ template, token:session.accessToken });
};

export default function Preview() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  let { template , token} = useLoaderData<typeof loader>();
  const returnTo = searchParams.get("returnTo");

  useHandleFlashMessage();
  



  return (
    <Page fullWidth>
      <Modal
        id="my-modal"
        open={true}
        variant="max"
        onHide={() => navigate(returnTo || `../..`)}
      >
        <iframe
          title={template?.name ? `${template.name} preview` : "Template preview"}
          name={JSON.stringify({
            configId: template?.configurationId,
            templateId: template?.id,
            token: token
          })}
          src="/preview.html"
          className="aso-preview"
          sandbox="allow-scripts allow-same-origin allow-forms"
        ></iframe>
        <TitleBar title={template.name}></TitleBar>
      </Modal>
      <BoxBackground>
        <Box paddingInline="300" paddingBlock="600">
          <InlineStack>
            <InlineStack gap="100" align="start">
              <Text as="h2" variant="headingMd">
                {template.name}
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
