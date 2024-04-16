import {
  BlockStack,
    Box,
    Divider,
    InlineStack,
    Page,
    Text,
  } from "@shopify/polaris";
  
  import {NavLink, Outlet, redirect} from "@remix-run/react";
  import { BoxBackground } from "~/components/layouts/BoxBackground";
import { FixingMethodSvg } from "~/components/svgs/FixingMethodSvg";
import { ShapeSvg } from "~/components/svgs/ShapeSvg";
import { TextImageSvg } from "~/components/svgs/TextImageSvg";
import { BorderSvg } from "~/components/svgs/BorderSvg";
import { RoundManageHistorySvg } from "~/components/svgs/RoundManageHistorySvg";
import { SpacingBackground } from "~/components/layouts/SpacingBackground";
import { LicenceSvg } from "~/components/svgs/LicenceSvg";
import { OutputSvg } from "~/components/svgs/OutputSvg";
  

export default function Settings(){
    
    return (<Page fullWidth>
        <BoxBackground>
          <Box paddingInline="300" paddingBlock="600">
            <InlineStack>
              <InlineStack gap="100" align="start">
                <Text as="h2" variant="headingMd">
                  Génarals Settings
                </Text>
              </InlineStack>
            </InlineStack>
          </Box>
      </BoxBackground>
      <SpacingBackground width="100%" height="auto" margin="20px 0 0 0">
        <SettingTabheader />
        <Outlet/>
      </SpacingBackground>
       
      </Page>)
}



export const SettingTabheader = () => {
    
  return (
    <SpacingBackground width="100%" height="auto" border="1px solid #DDDDDD">
        <Box paddingInline="100" background="bg-surface">
        <InlineStack gap="100" align="center">
          {/* <TabItems to="licence">
            <LicenceSvg /> Licence
          </TabItems>
          <TabItems to="configuration-page">
            {" "}
            <RoundManageHistorySvg /> Configuration page 
          </TabItems> */}
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