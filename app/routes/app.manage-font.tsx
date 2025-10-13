import { LoaderFunctionArgs } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import {
  Box,
  Card,
  InlineStack,
  Page,
  Text,
} from "@shopify/polaris";
import { BoxBackground } from "~/components/layouts/BoxBackground";
import { authenticate } from "~/shopify.server";
import { subscriptionRequired } from "~/utils/pricing-server.server";


export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { billing, session, admin } = await authenticate.admin(request);
  
  await subscriptionRequired(billing, session?.shop , admin);

  return null;

}

export default function ManageSize() {
  return (<Page fullWidth>
    <div>
      <Card>
          <InlineStack gap="100" align="start">
            <Text as="h2" variant="headingMd">
              Manage Font
            </Text>
        </InlineStack>
      </Card>
    </div>
    <Outlet/>
  </Page>);
}
