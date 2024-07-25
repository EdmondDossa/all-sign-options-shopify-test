import { LoaderFunctionArgs } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import {
  Box,
  InlineStack,
  Page,
  Text,
} from "@shopify/polaris";
import { BoxBackground } from "~/components/layouts/BoxBackground";
import { authenticate } from "~/shopify.server";
import { subscriptionRequired } from "~/utils/pricing";


export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { billing } = await authenticate.admin(request);
  
  await subscriptionRequired(billing);

  return null;

}

export default function ManageSize() {
  return (<Page fullWidth>
    <BoxBackground>
      <Box paddingInline="300" paddingBlock="600">
          <InlineStack gap="100" align="start">
            <Text as="h2" variant="headingMd">
              Manage Font
            </Text>
        </InlineStack>
      </Box>
    </BoxBackground>
    <Outlet/>
  </Page>);
}
