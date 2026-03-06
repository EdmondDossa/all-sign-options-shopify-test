import { NavLink } from "@remix-run/react";
import { BlockStack, InlineStack } from "@shopify/polaris";

const SubTabItem = ({
    to,
    children,
  }: {
    to: string;
    children: React.ReactNode;
  }) => {
    return (
      <NavLink
        className={({ isActive, isPending }) =>
          isActive ? "sub-tab-items active" : "sub-tab-items"
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

export { SubTabItem };
export default SubTabItem;
