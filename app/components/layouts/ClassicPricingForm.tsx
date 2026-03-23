import {
  BlockStack,
  Box,
  Button,
  Card,
  Divider,
  InlineGrid,
  InlineStack,
  Text,
  TextField,
} from "@shopify/polaris";
import { SaveButton } from "~/components/buttons";

export type ClassicSizePricingItem = {
  sizeId: string;
  label: string;
  width: number;
  height: number;
  basePrice: number;
  charPrice: number;
  startPriceAtChar: number;
};

export type ClassicCustomSizePricing = {
  type: "unit" | "range";
  rangePricingPerUnit: boolean;
  unit: {
    surface: number;
    basePrice: number;
    charPrice: number;
  };
  range: Array<{
    surface: number;
    basePrice: number;
    charPrice: number;
  }>;
};

type SizePricingProps = {
  item: ClassicSizePricingItem;
  isSubmitting: boolean;
  onChange: (next: ClassicSizePricingItem) => void;
  onSave: () => void;
  onCancel: () => void;
};

type CustomSizePricingProps = {
  item: ClassicCustomSizePricing;
  isSubmitting: boolean;
  onChange: (next: ClassicCustomSizePricing) => void;
  onSave: () => void;
  onCancel: () => void;
};

const toNumber = (value: unknown, fallback = 0) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

export function ClassicSizePricingForm({
  item,
  isSubmitting,
  onChange,
  onSave,
  onCancel,
}: SizePricingProps) {
  const patch = (partial: Partial<ClassicSizePricingItem>) => {
    onChange({
      ...item,
      ...partial,
    });
  };

  return (
    <Card>
      <Box padding="300">
        <BlockStack gap="400">
          <InlineStack align="space-between" blockAlign="center">
            <Button onClick={onCancel}>Back to pricings</Button>
          </InlineStack>

          <BlockStack gap="050">
            <Text as="h3" variant="headingMd">
              Edit pricing
            </Text>
            <Text as="p" tone="subdued">
              {item.label} - {item.width} x {item.height}
            </Text>
          </BlockStack>

          <InlineGrid columns={{ xs: 1, md: 3 }} gap="400">
            <TextField
              label="Base price"
              type="number"
              value={String(item.basePrice)}
              onChange={(value) => patch({ basePrice: toNumber(value, item.basePrice) })}
              autoComplete="off"
            />
            <TextField
              label="Char price"
              type="number"
              value={String(item.charPrice)}
              onChange={(value) => patch({ charPrice: toNumber(value, item.charPrice) })}
              autoComplete="off"
            />
            <TextField
              label="Start price at char"
              type="number"
              value={String(item.startPriceAtChar)}
              onChange={(value) =>
                patch({ startPriceAtChar: toNumber(value, item.startPriceAtChar) })
              }
              autoComplete="off"
            />
          </InlineGrid>

          <InlineStack align="end" gap="300">
            <Button onClick={onCancel}>Cancel</Button>
            <SaveButton onClick={onSave} disabled={isSubmitting}>
              Save pricing
            </SaveButton>
          </InlineStack>
        </BlockStack>
      </Box>
    </Card>
  );
}

export function ClassicCustomSizePricingForm({
  item,
  isSubmitting,
  onChange,
  onSave,
  onCancel,
}: CustomSizePricingProps) {
  const patch = (partial: Partial<ClassicCustomSizePricing>) => {
    onChange({
      ...item,
      ...partial,
    });
  };

  const patchUnit = (partial: Partial<ClassicCustomSizePricing["unit"]>) => {
    onChange({
      ...item,
      unit: {
        ...item.unit,
        ...partial,
      },
    });
  };

  const addRange = () => {
    const lastSurface = item.range.length > 0 ? item.range[item.range.length - 1].surface : 0;
    patch({
      range: [
        ...item.range,
        {
          surface: lastSurface + 1,
          basePrice: 0,
          charPrice: 0,
        },
      ],
    });
  };

  const updateRange = (
    index: number,
    field: "surface" | "basePrice" | "charPrice",
    value: string,
  ) => {
    const nextRange = [...item.range];
    nextRange[index] = {
      ...nextRange[index],
      [field]: toNumber(value, 0),
    };
    patch({ range: nextRange });
  };

  const removeRange = (index: number) => {
    patch({
      range: item.range.filter((_, currentIndex) => currentIndex !== index),
    });
  };

  return (
    <Card>
      <Box padding="300">
        <BlockStack gap="400">
          <InlineStack align="space-between" blockAlign="center">
            <Button onClick={onCancel}>Back to pricings</Button>
          </InlineStack>

          <BlockStack gap="050">
            <Text as="h3" variant="headingMd">
              Edit custom size pricing
            </Text>
            <Text as="p" tone="subdued">
              Set how custom width and height should be priced.
            </Text>
          </BlockStack>

          <InlineStack gap="300">
            <Button
              pressed={item.type === "unit"}
              onClick={() =>
                patch({
                  type: "unit",
                })
              }
            >
              Unit pricing
            </Button>
            <Button
              pressed={item.type === "range"}
              onClick={() =>
                patch({
                  type: "range",
                })
              }
            >
              Range pricing
            </Button>
          </InlineStack>

          {item.type === "unit" ? (
            <InlineGrid columns={{ xs: 1, md: 3 }} gap="400">
              <TextField
                label="Surface"
                type="number"
                value={String(item.unit.surface)}
                onChange={(value) => patchUnit({ surface: toNumber(value, item.unit.surface) })}
                autoComplete="off"
              />
              <TextField
                label="Base price"
                type="number"
                value={String(item.unit.basePrice)}
                onChange={(value) => patchUnit({ basePrice: toNumber(value, item.unit.basePrice) })}
                autoComplete="off"
              />
              <TextField
                label="Char price"
                type="number"
                value={String(item.unit.charPrice)}
                onChange={(value) => patchUnit({ charPrice: toNumber(value, item.unit.charPrice) })}
                autoComplete="off"
              />
            </InlineGrid>
          ) : (
            <BlockStack gap="300">
              <InlineStack gap="300">
                <Button
                  pressed={!item.rangePricingPerUnit}
                  onClick={() =>
                    patch({
                      rangePricingPerUnit: false,
                    })
                  }
                >
                  Price by range
                </Button>
                <Button
                  pressed={item.rangePricingPerUnit}
                  onClick={() =>
                    patch({
                      rangePricingPerUnit: true,
                    })
                  }
                >
                  Price per unit
                </Button>
              </InlineStack>

              {item.range.map((range, index) => (
                <Card key={`custom-size-range-${index}`}>
                  <Box padding="300">
                    <BlockStack gap="300">
                      <InlineStack align="space-between" blockAlign="center">
                        <Text as="h4" variant="headingSm">
                          Range {index + 1}
                        </Text>
                        <Button tone="critical" onClick={() => removeRange(index)}>
                          Remove
                        </Button>
                      </InlineStack>

                      <InlineGrid columns={{ xs: 1, md: 3 }} gap="400">
                        <TextField
                          label="Surface"
                          type="number"
                          value={String(range.surface)}
                          onChange={(value) => updateRange(index, "surface", value)}
                          autoComplete="off"
                        />
                        <TextField
                          label={item.rangePricingPerUnit ? "Base price per unit" : "Base price"}
                          type="number"
                          value={String(range.basePrice)}
                          onChange={(value) => updateRange(index, "basePrice", value)}
                          autoComplete="off"
                        />
                        <TextField
                          label="Char price"
                          type="number"
                          value={String(range.charPrice)}
                          onChange={(value) => updateRange(index, "charPrice", value)}
                          autoComplete="off"
                        />
                      </InlineGrid>
                    </BlockStack>
                  </Box>
                </Card>
              ))}

              <InlineStack align="start">
                <Button onClick={addRange}>Add range</Button>
              </InlineStack>
            </BlockStack>
          )}

          <Divider />

          <InlineStack align="end" gap="300">
            <Button onClick={onCancel}>Cancel</Button>
            <SaveButton onClick={onSave} disabled={isSubmitting}>
              Save pricing
            </SaveButton>
          </InlineStack>
        </BlockStack>
      </Box>
    </Card>
  );
}
