import { NavLink } from "@remix-run/react";
import { BlockStack, Box, InlineStack } from "@shopify/polaris";
import { SizeSvg } from "~/components/svgs/SizeSvg";
import { BorderSvg } from "~/components/svgs/BorderSvg";
import { ColorPaletteSvg } from "~/components/svgs/ColorPaletteSvg";
import { FixingMethodSvg } from "~/components/svgs/FixingMethodSvg";
import { ShapeSvg } from "~/components/svgs/ShapeSvg";
import { TextImageSvg } from "~/components/svgs/TextImageSvg";
import { AdditinalOptionSvg } from "../svgs/AdditinalOptionSvg";

export const Tabheader = () => {
    
    return (
        <Box paddingInline="050" background="bg-surface">
          <InlineStack gap="100" align="center">
            <TabItems to="size">
            
              <SizeSvg /> Sizes
          </TabItems>
          <TabItems to="color">
            
            <ColorPaletteSvg />  colors
          </TabItems>
          <TabItems to="shape">
            
            <ShapeSvg /> Shapes
          </TabItems>
            <TabItems to="border">
            
              <BorderSvg /> Borders
            </TabItems>
           
            <TabItems to="fixing-method">
            
              <FixingMethodSvg /> Fixing methods
            </TabItems>
           
            <TabItems to="text-image">
            
              <TextImageSvg /> Text/Image
            </TabItems>
            <TabItems to="additional-option">
              <AdditinalOptionSvg /> Additional components
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
  