import { Text, BlockStack, Box, Divider } from "@shopify/polaris";
import ConfigurationIcon from "~/components/icons/ConfigurationIcon";
import { NavLink } from "@remix-run/react";
import { RequestAQuoteIcon } from "../icons";

export default function SideBar() {
  return (
    <BoxSideBar>
      <Box
        borderEndEndRadius="0"
        paddingInline="150"
        paddingBlockStart="400"
        paddingBlockEnd="2800"
      >
        <BlockStack gap="200">
          <ItemSideBar title={"Configuration"} to="/app/configuration">
            <ConfigurationIcon />
          </ItemSideBar>
          <ItemSideBar title={"Requeste a quote"} to="/app/request-quotes">
            <RequestAQuoteIcon />
          </ItemSideBar>
        </BlockStack>
      </Box>
    </BoxSideBar>
  );
}

export const ItemSideBar = ({
  title,
  to = "#",
  children,
}: {
  title: String;
  to?: any;
  children: React.ReactNode;
}) => {
  return (
    <NavLink
      className={({ isActive, isPending }) =>
        isActive
          ? "active navlink"
          : isPending
            ? "pending navlink"
            : "inactive navlink"
      }
      to={to}
    >
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
        background: "linear-gradient(to bottom, #1F123D 35%, #46115D 65%)",
        width: width,
        height: "100%",
        paddingTop: "5rem",
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
