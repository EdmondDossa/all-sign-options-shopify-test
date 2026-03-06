import { BlockStack, Box, Grid, InlineStack, Text } from "@shopify/polaris";
import { useCallback, useState, useId } from "react";
import {
  Form,
  useActionData,
  useLoaderData,
  useNavigation,
  useSubmit,
} from "@remix-run/react";
import { BoxBackground, SpacingBackground } from "~/components/layouts";
import { ReactSwitchCustom } from "~/components/inputs";
import { z } from "zod";
import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import useHandleFlashMessage from "~/hooks/useHandleFlashMessage";
import { BiSaveBtn, ToggleButton } from "~/components/buttons";
import { booleanTransform } from "~/utils/transfomerZod";
import {
  settingAction,
  settingLoader,
} from "~/custom-action-loader/config-action-loader";

const settingParams: [string, string] = ["generals", "product"];
const formSchema = z.object({
  enableAddToCart: z.any().transform(booleanTransform).pipe(z.boolean()),
  redirectAfterAddToCart: z.any().transform(booleanTransform).pipe(z.boolean()),
  redirectToCheckOutPage: z.any().transform(booleanTransform).pipe(z.boolean()),
  displayRecapsOnCheckout: z
    .any()
    .transform(booleanTransform)
    .pipe(z.boolean()),
  hideAddToCartButtonCustomProducts: z
    .any()
    .transform(booleanTransform)
    .pipe(z.boolean()),
  hideDesignButtonsOnShopPage: z
    .any()
    .transform(booleanTransform)
    .pipe(z.boolean()),
  hideAddToCartButtonOnShopPage: z
    .any()
    .transform(booleanTransform)
    .pipe(z.boolean()),
});

export const loader = async (agrs: LoaderFunctionArgs) => {
  return await settingLoader(agrs, settingParams);
};

export const action = async (args: ActionFunctionArgs) => {
  return await settingAction(args, settingParams, formSchema);
};

export default function ConfigSettingsGeneral() {
  const submit = useSubmit();
  let { settingData } = useLoaderData<typeof loader>();
  useHandleFlashMessage();
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  let isSubmitting = navigation.state == "submitting";

  const [formData, setFormData] = useState<any>(
    settingData || {
      enableAddToCart: true,
      redirectAfterAddToCart: true,
      redirectToCheckOutPage: false,
      displayRecapsOnCheckout: false,
      hideAddToCartButtonCustomProducts: true,
      hideDesignButtonsOnShopPage: false,
      hideAddToCartButtonOnShopPage: true,
    },
  );

  const handleInputChange = (inputName: string, value: any) => {
    setFormData((prevData: any) => ({
      ...prevData,
      [inputName]: value,
    }));
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const data = { ...formData };

    submit(data, { method: "POST" });
  };

  return (
    <>
      <Form onSubmit={handleFormSubmit} method="POST">
        <SpacingBackground border="1px solid #DDDDDD">
          <BoxBackground>
            <Box paddingInline="300" paddingBlock="1000">
              <Grid gap={{ lg: "10px" }}>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 4, xl: 4 }}>
                  <ProductConfigItem
                    title="Activate Add to Cart"
                    checked={formData.enableAddToCart}
                    setChecked={(value) =>
                      handleInputChange("enableAddToCart", value)
                    }
                  >
                    This option allows customers to add their personalization to
                    the shopping cart for purchase.
                  </ProductConfigItem>
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 4, xl: 4 }}>
                  <ProductConfigItem
                    title="Redirect to cart after adding a custom design to the cart"
                    checked={formData.redirectAfterAddToCart}
                    setChecked={(value) => {
                      handleInputChange("redirectAfterAddToCart", value);
                      handleInputChange("redirectToCheckOutPage", !value);
                    }}
                  >
                    This options allow you to define what to do after adding a
                    design to the cart
                  </ProductConfigItem>
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 4, xl: 4 }}>
                  <ProductConfigItem
                    title="Redirect to checkout page after adding a custom design to the cart"
                    checked={formData.redirectToCheckOutPage}
                    setChecked={(value) => {
                      handleInputChange("redirectAfterAddToCart", !value);
                      handleInputChange("redirectToCheckOutPage", value);
                    }}
                  >
                    This options allow you to define what to do after adding a
                    design to the cart
                  </ProductConfigItem>
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 4, xl: 4 }}>
                  <ProductConfigItem
                    title="Hide add to cart button for custom on product detail page"
                    checked={formData.hideAddToCartButtonCustomProducts}
                    setChecked={(value) =>
                      handleInputChange(
                        "hideAddToCartButtonCustomProducts",
                        value,
                      )
                    }
                  >
                    This options allow you to define whether or not you want
                    hide the add to cart button for custom products on the
                    products page.
                  </ProductConfigItem>
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 4, xl: 4 }}>
                  <ProductConfigItem
                    title="Hide design buttons on shop page"
                    checked={formData.hideDesignButtonsOnShopPage}
                    setChecked={(value) =>
                      handleInputChange("hideDesignButtonsOnShopPage", value)
                    }
                  >
                    This options allow you to show/hidethe cart button on the
                    cart button on the customization page
                  </ProductConfigItem>
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 4, xl: 4 }}>
                  <ProductConfigItem
                    title="Hide add to cart buttons for custom product on shop"
                    checked={formData.hideAddToCartButtonOnShopPage}
                    setChecked={(value) =>
                      handleInputChange("hideAddToCartButtonOnShopPage", value)
                    }
                  >
                    This options allow you to show/hidethe cart button on the
                    cart button on the customization page
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
                <BiSaveBtn title="Save" />
              </InlineStack>
            </Box>
          </BoxBackground>
        </SpacingBackground>
      </Form>
    </>
  );
}

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
    <SpacingBackground
      height="100%"
      border="1px solid #DDDDDD"
      borderRadius="5px"
    >
      <BlockStack>
        <SpacingBackground borderBottom="1px  solid #DDDDDD">
          <Box padding="400">
            <InlineStack wrap={false} align="space-between">
              <Box>
                <Text as="strong">{title}</Text>
              </Box>
              <InlineStack wrap={false} blockAlign="center" gap="100">
                <Text as="span"> No</Text>
                <ToggleButton
                  id={`toggle-${useId()}`}
                  checked={checked}
                  onChange={handleChangeCheck}
                />
                <Text as="span"> Yes</Text>
              </InlineStack>
            </InlineStack>
          </Box>
        </SpacingBackground>
        <Box padding="400">
          <Text as="p">{children}</Text>
        </Box>
      </BlockStack>
    </SpacingBackground>
  );
};
