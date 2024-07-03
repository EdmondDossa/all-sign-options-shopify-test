import {
  BlockStack,
    Box,
    Divider,
    InlineStack,
    Page,
    Text,
  } from "@shopify/polaris";
  
  import {NavLink, Outlet, useOutletContext} from "@remix-run/react";
  import { BoxBackground } from "~/components/layouts/BoxBackground";
  import NextLtrIcon from "~/components/icons/NextLtrIcon";
import { ColorPaletteSvg } from "~/components/svgs/ColorPaletteSvg";
import { TextImageSvg } from "~/components/svgs/TextImageSvg";
import { RoundManageHistorySvg } from "~/components/svgs/RoundManageHistorySvg";
import { SpacingBackground } from "~/components/layouts/SpacingBackground";
import { ConfigurationType } from "~/types/ConfigurationType";
  

export default function Materiels(){
  const { configuration } = useOutletContext<{ configuration: ConfigurationType; }>();
    return (<Page fullWidth>
        <BoxBackground>
          <Box paddingInline="300" paddingBlock="600">
            <InlineStack>
              <InlineStack gap="100" align="start">
                <Text as="h2" variant="headingMd">
                  {configuration.name}
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
    <SpacingBackground width="100%" height="auto" border="1px solid #DDDDDD">
        <Box paddingInline="300" background="bg-surface">
        <InlineStack gap="100" align="center">
          <TabItems to="general">
            {" "}
            <RoundManageHistorySvg /> General
          </TabItems>
          <TabItems to="customizer-sign">
            {" "}
            <RoundManageHistorySvg /> Customizer sign 
          </TabItems>
          <TabItems to="language-text">
            {" "}
            <TextImageSvg /> Language & image
          </TabItems>
          <TabItems to="theme-color">
            {" "}
            <ColorPaletteSvg /> Theme & Color
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