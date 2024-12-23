import {
  BlockStack,
    Box,
    InlineStack,
    Page,
    Text,
  } from "@shopify/polaris";
  
  import {NavLink, Outlet, redirect, useLoaderData} from "@remix-run/react";
  import { BoxBackground } from "~/components/layouts/BoxBackground";
import { FixingMethodSvg } from "~/components/svgs/FixingMethodSvg";
import { ShapeSvg } from "~/components/svgs/ShapeSvg";
import { BorderSvg } from "~/components/svgs/BorderSvg";
import { SpacingBackground } from "~/components/layouts/SpacingBackground";
import { OutputSvg } from "~/components/svgs/OutputSvg";
import { LoaderFunctionArgs, json } from "@remix-run/node";
import { authenticate } from "~/shopify.server";
import { getPlan, subscriptionRequired } from "~/utils/pricing";


export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { billing, session , admin} = await authenticate.admin(request);
  
  await subscriptionRequired(billing,session?.shop, admin);

  let plan = await getPlan(billing,session?.shop, admin);

  return json({ plan });

}

  

export default function Settings() {

    const { plan } = useLoaderData<typeof loader>();
    
    return (<Page fullWidth>
        <BoxBackground>
          <Box paddingInline="300" paddingBlock="600">
            <InlineStack>
              <InlineStack gap="100" align="start">
                <Text as="h2" variant="headingMd">
                  Global Settings
                </Text>
              </InlineStack>
            </InlineStack>
          </Box>
      </BoxBackground>
      <SpacingBackground width="100%" height="auto" margin="20px 0 0 0">
        <SettingTabheader />
        <Outlet context={{plan}}/>
      </SpacingBackground>
       
      </Page>)
}



export const SettingTabheader = () => {
    
  return (
    <SpacingBackground width="100%" height="auto" border="1px solid #DDDDDD">
        <Box paddingInline="100" background="bg-surface">
        <InlineStack gap="100" align="center">
          <TabItems to="output">
            {" "}
            <OutputSvg /> Output
          </TabItems>
          <TabItems to="shape">
            {" "}
            <ShapeSvg/> Shapes
          </TabItems>
          <TabItems to="fixing-method">
            {" "}
            <FixingMethodSvg /> Fixing method
          </TabItems>
          <TabItems to="border">
            {" "}
            <BorderSvg /> Border
          </TabItems>
        </InlineStack>
      </Box>
    </SpacingBackground>
      )
};


export const TabItems = ({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}) => {
  return (
    <NavLink
      className={({ isActive, isPending }) =>
        isActive ? "tab-items active" : "tab-items"
      }
      to={to}
    >
      <BlockStack align="center">
        <InlineStack align="center" gap="200">
          {children}
        </InlineStack>
      </BlockStack>
    </NavLink>
  );
};