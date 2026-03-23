import { Box, Button, Card, InlineGrid, InlineStack, Select, Text, TextField } from "@shopify/polaris";
import { FileInput } from "~/components/inputs/FileInput";
import { MultiCombobox } from "~/components/inputs/MultiCombobox";
import { fileUrl } from "~/utils/fileUrl";
import type { MaterialItem } from "~/features/classic-additional-materials.shared";

type NamedOption = { id: string; label: string };

type Props = {
  item: MaterialItem;
  pricingOptions: NamedOption[];
  componentItems: NamedOption[];
  currencySymbol: string;
  isEditing: boolean;
  isSubmitting?: boolean;
  onChange: (next: MaterialItem) => void;
  onSave: () => void;
  onCancel: () => void;
};

export default function ClassicMaterialForm({
  item,
  pricingOptions,
  componentItems,
  currencySymbol,
  isEditing,
  isSubmitting = false,
  onChange,
  onSave,
  onCancel,
}: Props) {
  const patch = (next: Partial<MaterialItem>) => onChange({ ...item, ...next });

  const selectedComponentLabels = item.excludeComponentIds
    .map((value) => componentItems.find((component) => component.id === value)?.label)
    .filter(Boolean);

  return (
    <Card>
      <Box padding="300">
        <div style={{ display: "grid", gap: 16 }}>
          <Text as="h2" variant="headingMd">
            {isEditing ? "Edit material" : "Add material"}
          </Text>

          <InlineGrid columns={{ xs: 1, md: 2 }} gap="400">
            <TextField
              label="Label"
              autoComplete="off"
              value={String(item.label || "")}
              onChange={(value) => patch({ label: value })}
              helpText="Customer-facing material name."
            />
            <TextField
              label="Additional price"
              type="number"
              autoComplete="off"
              value={String(item.additionalPrice ?? 0)}
              onChange={(value) => patch({ additionalPrice: value })}
              onBlur={() => patch({ additionalPrice: parseFloat(String(item.additionalPrice || 0)) || 0 })}
              suffix={currencySymbol}
            />
          </InlineGrid>

          <TextField
            label="Description"
            autoComplete="off"
            multiline={3}
            value={String(item.description || "")}
            onChange={(value) => patch({ description: value })}
          />

          <InlineGrid columns={{ xs: 1, md: 2 }} gap="400">
            <FileInput
              title="Preview image"
              type="image"
              path={String(item.previewImg || "")}
              handlePath={(value: string) => patch({ previewImg: String(value || "") })}
              helperText="Used in the list and option previews."
            />
            <FileInput
              title="Popup image"
              type="image"
              path={String(item.popupImg || "")}
              handlePath={(value: string) => patch({ popupImg: String(value || "") })}
              helperText="Optional larger image for product details."
            />
          </InlineGrid>

          {item.previewImg || item.popupImg ? (
            <InlineStack gap="300" blockAlign="center">
              {item.previewImg ? (
                <img
                  src={fileUrl(item.previewImg)}
                  alt={item.label || "Material preview"}
                  style={{ width: 72, height: 72, objectFit: "contain", borderRadius: 10, border: "1px solid #d1d5db", background: "#fff" }}
                />
              ) : null}
              {item.popupImg ? (
                <img
                  src={fileUrl(item.popupImg)}
                  alt={item.label || "Material popup preview"}
                  style={{ width: 72, height: 72, objectFit: "contain", borderRadius: 10, border: "1px solid #d1d5db", background: "#fff" }}
                />
              ) : null}
            </InlineStack>
          ) : null}

          <Select
            label="Pricing used by this material"
            options={[
              { label: pricingOptions.length > 0 ? "Select pricing" : "No pricing available", value: "" },
              ...pricingOptions.map((option) => ({ label: option.label, value: option.id })),
            ]}
            value={String(item.pricingId || "")}
            onChange={(value) => patch({ pricingId: value })}
            helpText="This pricing profile is applied when this material is selected."
          />

          <div style={{ display: "grid", gap: 12 }}>
            <Text as="h3" variant="headingMd">
              Exclude components
            </Text>
            <Text as="p" tone="subdued">
              Hide any components that should not be available for this material.
            </Text>
          </div>

          <div style={{ display: "grid", gap: 8 }}>
            <MultiCombobox
              label="Components excluded for this material"
              placeholder="Select excluded components"
              helpText="Components selected here will be unavailable when this material is chosen."
              data={componentItems.map((item) => ({ label: item.label, value: item.id }))}
              selectedOptions={item.excludeComponentIds}
              setSelectedOptions={(value: string[]) => patch({ excludeComponentIds: value })}
            />
            <Text as="p" tone="subdued">
              {selectedComponentLabels.length > 0
                ? `Excluded components: ${selectedComponentLabels.join(", ")}`
                : "No components excluded."}
            </Text>
          </div>

          <InlineStack align="end" gap="200" blockAlign="center">
            <Button onClick={onCancel}>Back to materials</Button>
            <Button
              variant="primary"
              tone="success"
              onClick={onSave}
              loading={isSubmitting}
              disabled={!String(item.label || "").trim()}
            >
              {isEditing ? "Update material" : "Save material"}
            </Button>
          </InlineStack>
        </div>
      </Box>
    </Card>
  );
}
