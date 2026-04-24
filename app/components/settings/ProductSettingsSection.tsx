import { Box, Card, Grid, InlineStack, Text } from "@shopify/polaris";
import { useId } from "react";
import { SaveButton, ToggleButton } from "~/components/buttons";
import CollapsibleSectionCard from "~/components/settings/CollapsibleSectionCard";

type ProductSettings = {
  designFromScratch: boolean;
  redirectAfterAddingToCart: boolean;
  redirectToCheckOutPage: boolean;
  hideAddToCartButtonOnShopPage: boolean;
  hidePricing: boolean;
  showRecapAfterFinish: boolean;
  uploadFileOnFinish: boolean;
};

type ProductSettingsSectionProps = {
  value: ProductSettings;
  onChange: (value: ProductSettings) => void;
  onSave: () => void;
  saving?: boolean;
};

type ProductCardProps = {
  title: string;
  description: string;
  checked: boolean;
  onChange: (value: boolean) => void;
};

function ProductCard({
  title,
  description,
  checked,
  onChange,
}: ProductCardProps) {
  const toggleId = useId();

  return (
    <Card>
      <Box padding="400">
        <InlineStack align="space-between" blockAlign="start" gap="400">
          <Box>
            <Text as="h3" variant="headingSm">
              {title}
            </Text>
          </Box>
          <InlineStack blockAlign="center" gap="100" wrap={false}>
            <Text as="span" variant="bodySm">
              No
            </Text>
            <ToggleButton
              id={`product-toggle-${toggleId}`}
              checked={checked}
              onChange={onChange}
            />
            <Text as="span" variant="bodySm">
              Yes
            </Text>
          </InlineStack>
        </InlineStack>
        <Box paddingBlockStart="300">
          <Text as="p" tone="subdued">
            {description}
          </Text>
        </Box>
      </Box>
    </Card>
  );
}

export default function ProductSettingsSection({
  value,
  onChange,
  onSave,
  saving = false,
}: ProductSettingsSectionProps) {
  const patch = (partial: Partial<ProductSettings>) =>
    onChange({ ...value, ...partial });

  return (
    <CollapsibleSectionCard
      id="ncpc-settings-product"
      title="Product"
      description="Storefront and add-to-cart behavior, aligned with the standard ASO product settings."
    >
      <Grid>
        <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 4, xl: 4 }}>
          <ProductCard
            title="Enable design from scratch"
            checked={Boolean(value.designFromScratch)}
            onChange={(checked) => patch({ designFromScratch: checked })}
            description="Allow customers to create a design from scratch instead of limiting them to predefined templates."
          />
        </Grid.Cell>
        <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 4, xl: 4 }}>
          <ProductCard
            title="Redirect to cart after adding a custom design to the cart"
            checked={Boolean(value.redirectAfterAddingToCart)}
            onChange={(checked) =>
              patch({
                redirectAfterAddingToCart: checked,
                redirectToCheckOutPage: !checked,
              })
            }
            description="Define whether the customer should be redirected to the cart immediately after adding the design."
          />
        </Grid.Cell>
        <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 4, xl: 4 }}>
          <ProductCard
            title="Redirect to checkout page after adding a custom design to the cart"
            checked={Boolean(value.redirectToCheckOutPage)}
            onChange={(checked) =>
              patch({
                redirectToCheckOutPage: checked,
                redirectAfterAddingToCart: !checked,
              })
            }
            description="Redirect customers straight to checkout after the design has been added to the cart."
          />
        </Grid.Cell>
        <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 4, xl: 4 }}>
          <ProductCard
            title="Hide add to cart buttons for custom product on shop"
            checked={Boolean(value.hideAddToCartButtonOnShopPage)}
            onChange={(checked) =>
              patch({ hideAddToCartButtonOnShopPage: checked })
            }
            description="Hide add-to-cart buttons for configurable products on collection and shop listings."
          />
        </Grid.Cell>
        <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 4, xl: 4 }}>
          <ProductCard
            title="Hide sign pricing on design screen"
            checked={Boolean(value.hidePricing)}
            onChange={(checked) => patch({ hidePricing: checked })}
            description="Hide the live price from the design screen while the customer is customizing."
          />
        </Grid.Cell>
        <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 4, xl: 4 }}>
          <ProductCard
            title="Show recap after finish"
            checked={Boolean(value.showRecapAfterFinish)}
            onChange={(checked) =>
              patch({ showRecapAfterFinish: checked })
            }
            description="Show a recap screen before the customer adds the configured product to the cart."
          />
        </Grid.Cell>
        <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 4, xl: 4 }}>
          <ProductCard
            title="Upload file on finish"
            checked={Boolean(value.uploadFileOnFinish)}
            onChange={(checked) =>
              patch({ uploadFileOnFinish: checked })
            }
            description="Allow the final design file to be uploaded on completion so it can be attached to the product."
          />
        </Grid.Cell>
      </Grid>

      <Box paddingBlockStart="300">
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <SaveButton loading={saving} onClick={onSave}>
            Save Product
          </SaveButton>
        </div>
      </Box>
    </CollapsibleSectionCard>
  );
}
