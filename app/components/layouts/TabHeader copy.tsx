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
        <Box paddingInline="300" background="bg-surface">
          <InlineStack gap="100" align="center">
            <TabItems to="/app/configuration/materiels/size">
              {" "}
              <SizeSvg /> Size
            </TabItems>
            <TabItems to="/app/configuration/materiels/border">
              {" "}
              <BorderSvg /> Border
            </TabItems>
            <TabItems to="/app/configuration/materiels/color">
              {" "}
              <ColorPaletteSvg /> Material color
            </TabItems>
            <TabItems to="/app/configuration/materiels/fixing-method">
              {" "}
              <FixingMethodSvg /> Fixing method
            </TabItems>
            <TabItems to="/app/configuration/materiels/shape">
              {" "}
              <ShapeSvg /> Shape
            </TabItems>
            <TabItems to="/app/configuration/materiels/text-image">
              {" "}
              <TextImageSvg /> Text/Image
            </TabItems>
            <TabItems to="/app/configuration/materiels/additional-option">
              <AdditinalOptionSvg /> Additional Options
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
  