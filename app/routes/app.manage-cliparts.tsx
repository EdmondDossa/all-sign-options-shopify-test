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
  const { billing ,session, admin} = await authenticate.admin(request);
  
  await subscriptionRequired(billing, session?.shop, admin);

  return null;

}


export default function ManageClipart() {

  return (<Page fullWidth>
   
    <Outlet/>
  </Page>);
}
