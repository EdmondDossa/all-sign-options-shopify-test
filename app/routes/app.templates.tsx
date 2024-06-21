import {
  BlockStack,
    Box,
    InlineStack,
    Page,
  } from "@shopify/polaris";
  
  import {NavLink, Outlet, redirect} from "@remix-run/react";

import { SpacingBackground } from "~/components/layouts/SpacingBackground";
import { SubTabItem } from "~/components/layouts/SubTabItem";
  

export default function Settings(){
    
    return ( <Page fullWidth>

      <SpacingBackground width="100%" height="auto" margin="20px 0 0 0">
        <SettingTabheader />
        <Outlet/>
      </SpacingBackground>
    </Page>
    )
}



export const SettingTabheader = () => {
    
  return (
    <SpacingBackground
    backgroundColor="#F9F9F9"
    width="100%"
    height="auto"
    border="1px solid #DDDDDD"
  >
    <Box paddingBlock="200">
      <InlineStack gap="600" align="center">
        <SubTabItem to="main"> Templates</SubTabItem>
        <SubTabItem to="categories"> Categories</SubTabItem>
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