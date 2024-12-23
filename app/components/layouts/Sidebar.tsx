import {
  Text,
  BlockStack,
  Box,
  Divider,
} from "@shopify/polaris";
import ManageFontIcon from "~/components/icons/ManageFontIcon";
import ManageClipartsIcon from "~/components/icons/ManageClipartsIcon";
import ConfigurationIcon from "~/components/icons/ConfigurationIcon";
import SettingsGeneralIcon from "~/components/icons/SettingsGeneralIcon";
import { NavLink } from "@remix-run/react";
import TemplatesIcon from "../icons/TemplatesIcon";


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
            <ItemSidebar title={"Templates"} to="/app/templates" >
              <TemplatesIcon />
            </ItemSidebar>
            <ItemSidebar title={"Global settings"} to="/app/settings">
              <SettingsGeneralIcon />
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
          height: '100%',
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