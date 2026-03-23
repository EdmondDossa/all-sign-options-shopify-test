import { Box, Button, Card, InlineStack, Select, Text, TextField } from "@shopify/polaris";
import { MultiCombobox } from "~/components/inputs/MultiCombobox";
import { fileUrl } from "~/utils/fileUrl";
import type {
  RequiredBorderItem,
  RequiredShapeItem,
  RequiredSizeOption,
  StructuralManagedOption,
} from "~/features/classic-required-structural.shared";

type Props = {
  item: RequiredBorderItem;
  managedOptions: StructuralManagedOption[];
  sizeOptions: RequiredSizeOption[];
  shapeItems: RequiredShapeItem[];
  isEditing: boolean;
  isSubmitting?: boolean;
  onChange: (next: RequiredBorderItem) => void;
  onSave: () => void;
  onCancel: () => void;
};

export default function ClassicBorderForm({
  item,
  managedOptions,
  sizeOptions,
  shapeItems,
  isEditing,
  isSubmitting = false,
  onChange,
  onSave,
  onCancel,
}: Props) {
  const selectedBorder = managedOptions.find((option) => option.value === item.manageBorderId);
  const sizeLabels = item.excludeSizes
    .map((value) => sizeOptions.find((size) => size.id === value)?.label)
    .filter(Boolean);
  const shapeLabels = item.excludeShapes
    .map((value) => shapeItems.find((shape) => shape.id === value)?.label)
    .filter(Boolean);

  return (
    <Card>
      <Box padding="300">
        <div style={{ display: "grid", gap: 16 }}>
          <Text as="h2" variant="headingMd">
            {isEditing ? "Edit border" : "Add border"}
          </Text>

          <Select
            label="Border"
            options={managedOptions.map((option) => ({
              label: option.label,
              value: String(option.value),
            }))}
            value={String(item.manageBorderId)}
            onChange={(value) => {
              const nextValue = Number(value);
              const selectedOption = managedOptions.find((option) => option.value === nextValue);
              onChange({
                ...item,
                manageBorderId: nextValue,
                label: String(selectedOption?.label || item.label),
              });
            }}
          />

          {selectedBorder ? (
            <Box
              background="bg-surface-secondary"
              borderColor="border"
              borderRadius="300"
              borderWidth="025"
              padding="300"
            >
              <InlineStack gap="300" blockAlign="center">
                {selectedBorder.image ? (
                  <img
                    src={fileUrl(selectedBorder.image)}
                    alt={selectedBorder.label}
                    style={{ width: 56, height: 56, objectFit: "contain", borderRadius: 8, background: "#fff" }}
                  />
                ) : null}
                <div style={{ display: "grid", gap: 4 }}>
                  <Text as="p" fontWeight="semibold">
                    {selectedBorder.label}
                  </Text>
                  <Text as="p" tone="subdued">
                    {selectedBorder.description || "Preview of the border selected for this config."}
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

          <MultiCombobox
            label="Exclude sizes"
            placeholder="Select excluded sizes"
            helpText="Hide this border for selected sizes."
            data={sizeOptions.map((size) => ({ label: size.label, value: size.id }))}
            selectedOptions={item.excludeSizes}
            setSelectedOptions={(value: string[]) => onChange({ ...item, excludeSizes: value })}
          />
          <Text as="p" tone="subdued">
            {sizeLabels.length > 0 ? `Excluded sizes: ${sizeLabels.join(", ")}` : "No sizes excluded."}
          </Text>

          <MultiCombobox
            label="Exclude shapes"
            placeholder="Select excluded shapes"
            helpText="Hide this border for shapes that do not support it."
            data={shapeItems.map((shape) => ({ label: shape.label, value: shape.id }))}
            selectedOptions={item.excludeShapes}
            setSelectedOptions={(value: string[]) => onChange({ ...item, excludeShapes: value })}
          />
          <Text as="p" tone="subdued">
            {shapeLabels.length > 0 ? `Excluded shapes: ${shapeLabels.join(", ")}` : "No shapes excluded."}
          </Text>

          <InlineStack align="end" gap="200" blockAlign="center">
            <Button onClick={onCancel}>Back to borders</Button>
            <Button variant="primary" tone="success" onClick={onSave} loading={isSubmitting}>
              {isEditing ? "Update border" : "Save border"}
            </Button>
          </InlineStack>
        </div>
      </Box>
    </Card>
  );
}
