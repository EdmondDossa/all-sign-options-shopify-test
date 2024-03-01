import {
  BlockStack,
    Box,
    Divider,
    InlineStack,
    Page,
    Text,
  } from "@shopify/polaris";
  
  import {NavLink, Outlet} from "@remix-run/react";
  import { BoxBackground } from "~/components/layouts/BoxBackground";
  import NextLtrIcon from "~/components/icons/NextLtrIcon";
import { AdditinalOptionSvg } from "~/components/svgs/AdditinalOptionSvg";
import { ColorPaletteSvg } from "~/components/svgs/ColorPaletteSvg";
import { FixingMethodSvg } from "~/components/svgs/FixingMethodSvg";
import { ShapeSvg } from "~/components/svgs/ShapeSvg";
import { TextImageSvg } from "~/components/svgs/TextImageSvg";
import { BorderSvg } from "~/components/svgs/BorderSvg";
import { SizeSvg } from "~/components/svgs/SizeSvg";
import { RoundManageHistorySvg } from "~/components/svgs/RoundManageHistorySvg";
import { SpacingBackground } from "~/components/layouts/SpacingBackground";
  

export default function Materiels(){
    
    return (<Page fullWidth>
        <BoxBackground>
          <Box paddingInline="300" paddingBlock="600">
            <InlineStack>
              <InlineStack gap="100" align="start">
                <Text as="h2" variant="headingMd">
                  Name config
                </Text>
                <NextLtrIcon />
                <Text as="h2" variant="headingMd" tone="subdued">
                Settings
                </Text>
                
              </InlineStack>
            </InlineStack>
          </Box>
      </BoxBackground>
      <SpacingBackground width="100%" height="auto" margin="20px 0 0 0">
        <SettingTabheader />
        <Divider borderWidth="100" />
        <Outlet/>
      </SpacingBackground>
       
      </Page>)
}



export const SettingTabheader = () => {
    
  return (
      <Box paddingInline="300" background="bg-surface">
        <InlineStack gap="100" align="center">
          <TabItems to="general">
            {" "}
            <RoundManageHistorySvg /> General
          </TabItems>
          <TabItems to="/app/configuration/materiels/border">
            {" "}
            <RoundManageHistorySvg /> Customizer sign 
          </TabItems>
          <TabItems to="/app/configuration/materiels/color">
            {" "}
            <TextImageSvg /> Language & image
          </TabItems>
          <TabItems to="/app/configuration/materiels/fixing-method">
            {" "}
            <ColorPaletteSvg /> Theme & Color
          </TabItems>
        </InlineStack>
      </Box>)
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