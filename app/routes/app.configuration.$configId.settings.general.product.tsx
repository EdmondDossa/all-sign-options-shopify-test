import {
  BlockStack,
  Box,
  Grid,
  InlineStack,
  Text,
} from "@shopify/polaris";
import { useCallback, useState } from "react";
import { Form, NavLink, redirect, useNavigate } from "@remix-run/react";
import { BoxBackground } from "~/components/layouts/BoxBackground";
import { SpacingBackground } from "~/components/layouts/SpacingBackground";
import RayEndArrowIcon from "~/components/icons/RayEndArrowIcon";
import { ReactSwitchCustom } from "~/components/inputs/ReactSwitchCustom";

export default function ConfigSettingsGeneral() {
  const [checked, setChecked] = useState(false);


  const [value, setValue] = useState("");
  const handleChange = useCallback(
    (newValue: string) => setValue(newValue),
    [],
  );
  const navigate = useNavigate();
  const onBack = () => {
    navigate("..");
  };

  return (
    <>
      <Form method="POST">
        <SpacingBackground border="1px solid #DDDDDD">
          <BoxBackground>
            <Box paddingInline="300" paddingBlock="1000">
              <Grid gap={{ lg: "10px" }}>
                <Grid.Cell
                  columnSpan={{ xs: 2, sm: 2, md: 2, lg: 4, xl: 4 }}
                >
                  <ProductConfigItem title="Enable design from scratch" checked={checked} setChecked={setChecked
                  }>
                  Would you like to allow your clients to design  the product from scratch? Or do you prefer allowing the customization only for templates assigned to the custom product ?
                  </ProductConfigItem>
                </Grid.Cell>
                <Grid.Cell
                  columnSpan={{ xs: 2, sm: 2, md: 2, lg: 4, xl: 4 }}
                >
                  <ProductConfigItem title="Redirect after adding a custom design to the cart" checked={checked} setChecked={setChecked
                  }>
                  This options allow  you to define what to do after adding a design to the cart
                  </ProductConfigItem>
                </Grid.Cell>
                <Grid.Cell
                  columnSpan={{ xs: 2, sm: 2, md: 2, lg: 4, xl: 4 }}
                >
                  <ProductConfigItem title="Hide add to cart button for custom on product detail page" checked={checked} setChecked={setChecked
                  }>
                  This options allow  you to define whether or not you want hide the add to cart button for custom products on the products page.
                  </ProductConfigItem>
                </Grid.Cell>
                <Grid.Cell
                  columnSpan={{ xs: 2, sm: 2, md: 2, lg: 4, xl: 4 }}
                >
                  <ProductConfigItem title="Hide design buttons on shop page" checked={checked} setChecked={setChecked
                  }>
                    This options allow  you to show/hidethe cart button on the cart button on the customization page
                  </ProductConfigItem>
                </Grid.Cell>
                <Grid.Cell
                  columnSpan={{ xs: 2, sm: 2, md: 2, lg: 4, xl: 4 }}
                >
                  <ProductConfigItem title="hide to cart buttons for custom product on shop" checked={checked} setChecked={setChecked
                  }>
                    This options allow  you to show/hidethe cart button on the cart button on the customization page
                  </ProductConfigItem>
                </Grid.Cell>
                
              </Grid>
            </Box>
          </BoxBackground>
        </SpacingBackground>

        <SpacingBackground width="100%" height="auto" margin="3px 0 0 0">
          <BoxBackground>
            <Box paddingInline="300" paddingBlock="300">
              <InlineStack align="end" gap="600">
                <button className="next-large-btn" type="submit">
                  <Box paddingInline="1000">
                    <InlineStack gap="300">
                      <span style={{ color: "white", fontWeight: "bold" }}>
                        {" "}
                        Save
                      </span>
                      <RayEndArrowIcon />
                    </InlineStack>
                  </Box>
                </button>
              </InlineStack>
            </Box>
          </BoxBackground>
        </SpacingBackground>
      </Form>
    </>
  );
}

export const action = () => {
  return null;
};


export const ProductConfigItem = ({
  title,
  children,
  checked,
  setChecked,
}: {
    title: string;
    children?: string;
    checked: boolean;
    setChecked: React.Dispatch<React.SetStateAction<boolean>>;
}) => {


  const handleChangeCheck = useCallback(
    (newChecked: boolean) => setChecked(newChecked),
    [],
  );

  return (
    <SpacingBackground height="100%" border="1px solid #DDDDDD" borderRadius="5px">
      <BlockStack>
        <SpacingBackground borderBottom="1px  solid #DDDDDD">
          <Box padding="400">
            <InlineStack wrap={false} align="space-between">
              <Box>
                <Text as="strong">{title}</Text>
              </Box>
              <InlineStack wrap={false} blockAlign="center" gap="100">
                <Text as="span"> Yes</Text>
                <ReactSwitchCustom checked={checked} setChecked={handleChangeCheck} />
                <Text as="span"> No</Text>
              </InlineStack>
            </InlineStack>
          </Box>
        </SpacingBackground>
        <Box padding="400">
          <Text as="p">
            {children}
          </Text>
        </Box>
      </BlockStack>
    </SpacingBackground>
  );
};
