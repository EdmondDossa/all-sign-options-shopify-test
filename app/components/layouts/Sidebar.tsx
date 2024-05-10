import {
  Text,
  BlockStack,
  Box,
  Divider,
} from "@shopify/polaris";
import ManageFontIcon from "~/components/icons/ManageFontIcon";
import ManageClipartsIcon from "~/components/icons/ManageClipartsIcon";
import ColorPaletteIcon from "~/components/icons/ColorPaletteIcon";
import ManageSizeIcon from "~/components/icons/ManageSizeIcon";
import ConfigurationIcon from "~/components/icons/ConfigurationIcon";
import SettingsGeneralIcon from "~/components/icons/SettingsGeneralIcon";
import MessageIcon from "~/components/icons/MessageIcon";
import { NavLink } from "@remix-run/react";


export default function Sidebar() {
    return (
        <BoxSideBar>
        <Box paddingInline="400" paddingBlockStart="1600"  paddingBlockEnd="400">
          <BlockStack gap="200">
            <ItemSidebar title={"Manage font"} to="/app/manage-font">
              <ManageFontIcon />
            </ItemSidebar>
            <ItemSidebar title={"Manage Cliparts"} to="/app/manage-cliparts">
              <ManageClipartsIcon />
            </ItemSidebar>
          
          </BlockStack>
        </Box>
        <Divider borderColor="border-brand" />
        <Box paddingInline="150" paddingBlockStart="400"  paddingBlockEnd="2800">
          <BlockStack gap="200">
            <ItemSidebar title={"Configuration"} to="/app/configuration">
              <ConfigurationIcon />
            </ItemSidebar>
            <ItemSidebar title={"Settings general"} to="/app/settings">
              <SettingsGeneralIcon />
            </ItemSidebar>
            <ItemSidebar title={"Message"} to="/app/message" >
              <MessageIcon />
            </ItemSidebar>
          </BlockStack>
        </Box>
        <Box paddingBlock="1200"></Box>
      </BoxSideBar>
    );
}


export const ItemSidebar = ({
    title,
    to = "#",
    children,
  }: {
    title: String;
    to?: any;
    children: React.ReactNode;
  }) => {
  return (
      <NavLink className={({ isActive, isPending }) =>
      isActive
        ? "active navlink"
        : isPending
        ? "pending navlink"
        : "inactive navlink"
    } to={to}>
          <BlockStack gap="150">
            {children}
            <Text fontWeight="regular" alignment="center" as="span">
              {title}
            </Text>
          </BlockStack>
      </NavLink>
    );
  };
  
  export const BoxSideBar = ({
    width = "100%",
    children,
  }: {
    children: React.ReactNode;
    width?: any;
  }) => {
    return (
      <div
        style={{
          borderRadius: "11px",
          fontSize: "11px",
          color: "#FFFFFF",
          backgroundColor: "#016464",
          width: width,
        }}
      >
        {children}
      </div>
    );
  };
  
  export const TextOpaticity = ({
    active = false,
    children,
  }: {
    active?: Boolean;
    children: React.ReactNode;
  }) => {
    return <div style={{ opacity: active ? "100%" : "50%" }}> {children} </div>;
  };