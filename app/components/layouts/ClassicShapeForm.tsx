import { Box, Button, Card, InlineStack, Select, Text, TextField } from "@shopify/polaris";
import { ToggleButton } from "~/components/buttons";
import { fileUrl } from "~/utils/fileUrl";
import type {
  RequiredShapeItem,
  StructuralManagedOption,
} from "~/features/classic-required-structural.shared";

type Props = {
  item: RequiredShapeItem;
  managedOptions: StructuralManagedOption[];
  isEditing: boolean;
  isSubmitting?: boolean;
  onChange: (next: RequiredShapeItem) => void;
  onSave: () => void;
  onCancel: () => void;
};

export default function ClassicShapeForm({
  item,
  managedOptions,
  isEditing,
  isSubmitting = false,
  onChange,
  onSave,
  onCancel,
}: Props) {
  const selectedShape = managedOptions.find((option) => option.value === item.shapeId);

  return (
    <Card>
      <Box padding="300">
        <div style={{ display: "grid", gap: 16 }}>
          <Text as="h2" variant="headingMd">
            {isEditing ? "Edit shape" : "Add shape"}
          </Text>

          <Select
            label="Shape"
            options={managedOptions.map((option) => ({
              label: option.label,
              value: String(option.value),
            }))}
            value={String(item.shapeId)}
            onChange={(value) => {
              const nextValue = Number(value);
              const selectedOption = managedOptions.find((option) => option.value === nextValue);
              onChange({
                ...item,
                shapeId: nextValue,
                label: String(selectedOption?.label || item.label),
              });
            }}
          />

          {selectedShape ? (
            <Box
              background="bg-surface-secondary"
              borderColor="border"
              borderRadius="300"
              borderWidth="025"
              padding="300"
            >
              <InlineStack gap="300" blockAlign="center">
                {selectedShape.image ? (
                  <img
                    src={fileUrl(selectedShape.image)}
                    alt={selectedShape.label}
                    style={{ width: 56, height: 56, objectFit: "contain", borderRadius: 8, background: "#fff" }}
                  />
                ) : null}
                <div style={{ display: "grid", gap: 4 }}>
                  <Text as="p" fontWeight="semibold">
                    {selectedShape.label}
                  </Text>
                  <Text as="p" tone="subdued">
                    {selectedShape.description || "Preview of the shape selected for this config."}
                  </Text>
                </div>
              </InlineStack>
            </Box>
          ) : null}

          <TextField
            label="Additional price"
            type="number"
            autoComplete="off"
            value={String(item.additionalPrice ?? 0)}
            onChange={(value) => onChange({ ...item, additionalPrice: value })}
            onBlur={() =>
              onChange({
                ...item,
                additionalPrice: parseFloat(String(item.additionalPrice || 0)) || 0,
              })
            }
          />

          <InlineStack gap="150" blockAlign="center">
            <Text as="span">Pricing by surface</Text>
            <ToggleButton
              checked={Boolean(item.enablePricingBySurface)}
              onChange={(checked) =>
                onChange({ ...item, enablePricingBySurface: Boolean(checked) })
              }
            />
          </InlineStack>

          {item.enablePricingBySurface ? (
            <>
              <TextField
                label="Surface"
                type="number"
                autoComplete="off"
                value={String(item.surface ?? 0)}
                onChange={(value) => onChange({ ...item, surface: value })}
                onBlur={() =>
                  onChange({
                    ...item,
                    surface: parseFloat(String(item.surface || 0)) || 0,
                  })
                }
              />

              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 12 }}>
                <TextField
                  label="Small size"
                  type="number"
                  autoComplete="off"
                  value={String(item.shapeSize.small)}
                  onChange={(value) =>
                    onChange({
                      ...item,
                      shapeSize: { ...item.shapeSize, small: parseFloat(value) || 0 },
                    })
                  }
                />
                <TextField
                  label="Medium size"
                  type="number"
                  autoComplete="off"
                  value={String(item.shapeSize.medium)}
                  onChange={(value) =>
                    onChange({
                      ...item,
                      shapeSize: { ...item.shapeSize, medium: parseFloat(value) || 0 },
                    })
                  }
                />
                <TextField
                  label="Large size"
                  type="number"
                  autoComplete="off"
                  value={String(item.shapeSize.large)}
                  onChange={(value) =>
                    onChange({
                      ...item,
                      shapeSize: { ...item.shapeSize, large: parseFloat(value) || 0 },
                    })
                  }
                />
              </div>
            </>
          ) : null}

          <InlineStack align="end" gap="200" blockAlign="center">
            <Button onClick={onCancel}>Back to shapes</Button>
            <Button variant="primary" tone="success" onClick={onSave} loading={isSubmitting}>
              {isEditing ? "Update shape" : "Save shape"}
            </Button>
          </InlineStack>
        </div>
      </Box>
    </Card>
  );
}
