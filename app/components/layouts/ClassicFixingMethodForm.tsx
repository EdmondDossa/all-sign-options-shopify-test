import { Box, Button, Card, InlineStack, Select, Text, TextField } from "@shopify/polaris";
import { MultiCombobox } from "~/components/inputs/MultiCombobox";
import { FileInput } from "~/components/inputs/FileInput";
import { ToggleButton } from "~/components/buttons";
import { fileUrl } from "~/utils/fileUrl";
import type {
  RequiredFixingMethodItem,
  RequiredShapeItem,
  RequiredSizeOption,
  StructuralManagedOption,
} from "~/features/classic-required-structural.shared";

type Props = {
  item: RequiredFixingMethodItem;
  managedOptions: StructuralManagedOption[];
  unavailableManagedIds: number[];
  sizeOptions: RequiredSizeOption[];
  shapeItems: RequiredShapeItem[];
  isEditing: boolean;
  isSubmitting?: boolean;
  onChange: (next: RequiredFixingMethodItem) => void;
  onSave: () => void;
  onCancel: () => void;
};

export default function ClassicFixingMethodForm({
  item,
  managedOptions,
  unavailableManagedIds,
  sizeOptions,
  shapeItems,
  isEditing,
  isSubmitting = false,
  onChange,
  onSave,
  onCancel,
}: Props) {
  const hasManagedOptions = managedOptions.length > 0;
  const isCustomMode = item.mode === "custom";
  const availableOptions = managedOptions.filter(
    (option) => option.value === item.fixingMethodId || !unavailableManagedIds.includes(option.value),
  );
  const selectedFixingMethod = managedOptions.find((option) => option.value === item.fixingMethodId);
  const previewLabel = isCustomMode ? String(item.label || "Custom fixing method") : selectedFixingMethod?.label || "";
  const previewDescription = isCustomMode
    ? String(item.description || "This custom fixing method is stored only in this config.")
    : String(selectedFixingMethod?.description || "Preview of the fixing method selected for this config.");
  const previewImage = isCustomMode ? String(item.previewImg || "") : String(selectedFixingMethod?.image || "");

  const shapeOptions = shapeItems.map((shape) => ({
    label: shape.label,
    value: shape.id,
  }));
  const sizeComboboxOptions = sizeOptions.map((size) => ({
    label: size.label,
    value: size.id,
  }));
  const excludedSizeLabels = item.excludeSizes
    .map((value) => sizeComboboxOptions.find((option) => option.value === value)?.label)
    .filter(Boolean);
  const excludedShapeLabels = item.excludeShapes
    .map((value) => shapeOptions.find((option) => option.value === value)?.label)
    .filter(Boolean);

  return (
    <Card>
      <Box padding="300">
        <div style={{ display: "grid", gap: 16 }}>
          <Text as="h2" variant="headingMd">
            {isEditing ? "Edit fixing method" : "Add fixing method"}
          </Text>

          <div style={{ display: "grid", gap: 8 }}>
            <Text as="p" fontWeight="medium">
              Source
            </Text>
            <InlineStack gap="300" blockAlign="center">
              {hasManagedOptions ? (
                <InlineStack gap="150" blockAlign="center">
                  <Text as="span" tone="subdued">
                    Managed
                  </Text>
                  <ToggleButton
                    type="radio"
                    name="fixing-method-source"
                    value="managed"
                    checked={!isCustomMode}
                    onChange={() => {
                      const firstManagedOption = availableOptions[0] || managedOptions[0];
                      onChange({
                        ...item,
                        mode: "managed",
                        fixingMethodId: Number(firstManagedOption?.value ?? -1),
                        label: String(firstManagedOption?.label || ""),
                        previewImg: String(firstManagedOption?.image || ""),
                        description: String(firstManagedOption?.description || ""),
                      });
                    }}
                  />
                </InlineStack>
              ) : null}
              <InlineStack gap="150" blockAlign="center">
                <Text as="span" tone="subdued">
                  Custom
                </Text>
                <ToggleButton
                  type="radio"
                  name="fixing-method-source"
                  value="custom"
                  checked={isCustomMode}
                  onChange={() => {
                    onChange({
                      ...item,
                      mode: "custom",
                      fixingMethodId: -1,
                      label: item.mode === "custom" ? item.label : "",
                      previewImg: item.mode === "custom" ? String(item.previewImg || "") : "",
                      description: item.mode === "custom" ? String(item.description || "") : "",
                    });
                  }}
                />
              </InlineStack>
            </InlineStack>
          </div>

          {!isCustomMode && hasManagedOptions ? (
            <>
              <Select
                label="Fixing method"
                options={availableOptions.map((option) => ({
                  label: option.label,
                  value: String(option.value),
                }))}
                value={String(item.fixingMethodId)}
                onChange={(value) => {
                  const nextValue = Number(value);
                  const selectedOption = managedOptions.find((option) => option.value === nextValue);
                  onChange({
                    ...item,
                    fixingMethodId: nextValue,
                    label: String(selectedOption?.label || item.label),
                  });
                }}
              />

              <Text as="p" tone="subdued">
                Choose a fixing method from your managed fixing methods library. If the option is missing, add it in
                `Manage fixing methods` first.
              </Text>
              {availableOptions.length === 0 ? (
                <Text as="p" tone="subdued">
                  All managed fixing methods are already used in this config. Switch to `Custom` if you need another one
                  only for this config.
                </Text>
              ) : null}
            </>
          ) : !isCustomMode ? (
            <Box
              background="bg-surface-secondary"
              borderColor="border"
              borderRadius="300"
              borderWidth="025"
              padding="300"
            >
              <div style={{ display: "grid", gap: 12 }}>
                <div>
                  <Text as="p" fontWeight="semibold">
                    No managed fixing methods available
                  </Text>
                  <Text as="p" tone="subdued">
                    Fixing methods for this config must come from `Manage fixing methods`. Add them there first, then
                    come back to this screen.
                  </Text>
                </div>
                <InlineStack>
                  <Button url="/app/settings/fixing-method">Manage fixing methods</Button>
                </InlineStack>
              </div>
            </Box>
          ) : (
            <>
              <TextField
                label="Label"
                autoComplete="off"
                value={String(item.label || "")}
                onChange={(value) => onChange({ ...item, label: value })}
              />

              <TextField
                label="Description"
                autoComplete="off"
                value={String(item.description || "")}
                onChange={(value) => onChange({ ...item, description: value })}
              />

              <FileInput
                title="Upload preview image"
                type="image"
                path={String(item.previewImg || "")}
                handlePath={(value: string) => onChange({ ...item, previewImg: String(value || "") })}
                helperText="Optional preview image used only for this config."
              />
            </>
          )}

          {(isCustomMode ? item.label || item.previewImg || item.description : selectedFixingMethod) ? (
            <Box
              background="bg-surface-secondary"
              borderColor="border"
              borderRadius="300"
              borderWidth="025"
              padding="300"
            >
              <InlineStack gap="300" blockAlign="center">
                {previewImage ? (
                  <img
                    src={fileUrl(previewImage)}
                    alt={previewLabel}
                    style={{ width: 56, height: 56, objectFit: "contain", borderRadius: 8, background: "#fff" }}
                  />
                ) : null}
                <div style={{ display: "grid", gap: 4 }}>
                  <Text as="p" fontWeight="semibold">
                    {previewLabel}
                  </Text>
                  <Text as="p" tone="subdued">
                    {previewDescription}
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
            helpText="Hide this fixing method for selected sizes."
            data={sizeComboboxOptions}
            selectedOptions={item.excludeSizes}
            setSelectedOptions={(value: string[]) => onChange({ ...item, excludeSizes: value })}
          />
          <Text as="p" tone="subdued">
            {excludedSizeLabels.length > 0
              ? `Excluded sizes: ${excludedSizeLabels.join(", ")}`
              : "No sizes excluded."}
          </Text>

          <MultiCombobox
            label="Exclude shapes"
            placeholder="Select excluded shapes"
            helpText="Hide this fixing method for selected shapes."
            data={shapeOptions}
            selectedOptions={item.excludeShapes}
            setSelectedOptions={(value: string[]) => onChange({ ...item, excludeShapes: value })}
          />
          <Text as="p" tone="subdued">
            {excludedShapeLabels.length > 0
              ? `Excluded shapes: ${excludedShapeLabels.join(", ")}`
              : "No shapes excluded."}
          </Text>

          <InlineStack align="end" gap="200" blockAlign="center">
            <Button onClick={onCancel}>Back to fixing methods</Button>
            <Button
              variant="primary"
              tone="success"
              onClick={onSave}
              loading={isSubmitting}
              disabled={isCustomMode ? !String(item.label || "").trim() : !hasManagedOptions || !selectedFixingMethod}
            >
              {isEditing ? "Update fixing method" : "Save fixing method"}
            </Button>
          </InlineStack>
        </div>
      </Box>
    </Card>
  );
}
