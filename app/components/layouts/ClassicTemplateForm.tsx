import { Box, Button, Card, InlineGrid, InlineStack, Text, TextField } from "@shopify/polaris";
import { FileInput } from "~/components/inputs/FileInput";
import { ComboxSelect } from "~/components/inputs/ComboxSelect";
import { ToggleButton } from "~/components/buttons/ToggleButton";

export type ClassicTemplateFormValue = {
  id?: number;
  name: string;
  prevImg: string;
  realImg: string;
  basePrice: number | string;
  enabledAutoImgUpdate: boolean;
  enabledAddToCart: boolean;
  categoryId: number;
};

type CategoryOption = {
  id: number;
  name: string;
};

type Props = {
  value: ClassicTemplateFormValue;
  categories: CategoryOption[];
  isEditing: boolean;
  isSubmitting?: boolean;
  errors?: Record<string, string>;
  categoryButton?: React.ReactNode;
  onChange: (next: ClassicTemplateFormValue) => void;
  onSave: () => void;
  onCancel: () => void;
};

export default function ClassicTemplateForm({
  value,
  categories,
  isEditing,
  isSubmitting = false,
  errors,
  categoryButton,
  onChange,
  onSave,
  onCancel,
}: Props) {
  const patch = (next: Partial<ClassicTemplateFormValue>) => onChange({ ...value, ...next });

  return (
    <Card>
      <Box padding="300">
        <div style={{ display: "grid", gap: 16 }}>
          <Text as="h2" variant="headingMd">
            {isEditing ? "Edit template" : "Add template"}
          </Text>

          <InlineGrid columns={{ xs: 1, md: 2 }} gap="400">
            <TextField
              label="Name"
              autoComplete="off"
              value={String(value.name || "")}
              onChange={(nextValue) => patch({ name: nextValue })}
              error={errors?.name}
            />

            <ComboxSelect
              label="Select category"
              placeholder="search category"
              selectedOption={value.categoryId ? String(value.categoryId) : ""}
              data={categories.map((category) => ({
                label: category.name,
                value: String(category.id),
              }))}
              setSelectedOption={(nextValue: string) => patch({ categoryId: parseInt(nextValue, 10) || 0 })}
              button={categoryButton}
            />
          </InlineGrid>

          {errors?.categoryId ? (
            <Text as="p" tone="critical" variant="bodySm">
              {errors.categoryId}
            </Text>
          ) : null}

          <InlineGrid columns={{ xs: 1, md: 2 }} gap="400">
            <FileInput
              title="Upload preview image"
              type="image"
              path={String(value.prevImg || "")}
              handlePath={(nextValue: string) => patch({ prevImg: String(nextValue || "") })}
            />
            <FileInput
              title="Upload real image"
              type="image"
              path={String(value.realImg || "")}
              handlePath={(nextValue: string) => patch({ realImg: String(nextValue || "") })}
            />
          </InlineGrid>

          <InlineGrid columns={{ xs: 1, md: 2 }} gap="400">
            <TextField
              label="Base price"
              type="number"
              autoComplete="off"
              value={String(value.basePrice ?? 0)}
              onChange={(nextValue) => patch({ basePrice: nextValue })}
              onBlur={() => patch({ basePrice: parseFloat(String(value.basePrice || 0)) || 0 })}
            />

            <div style={{ display: "grid", gap: 12 }}>
              <InlineStack gap="300" blockAlign="center">
                <Text as="span" variant="bodyMd">
                  Enable auto-update for the preview image
                </Text>
                <InlineStack gap="100" blockAlign="center">
                  <Text as="span" tone="subdued">
                    No
                  </Text>
                  <ToggleButton
                    checked={Boolean(value.enabledAutoImgUpdate)}
                    onChange={(nextValue) => patch({ enabledAutoImgUpdate: Boolean(nextValue) })}
                  />
                  <Text as="span" tone="subdued">
                    Yes
                  </Text>
                </InlineStack>
              </InlineStack>

              <InlineStack gap="300" blockAlign="center">
                <Text as="span" variant="bodyMd">
                  Enable add to cart
                </Text>
                <InlineStack gap="100" blockAlign="center">
                  <Text as="span" tone="subdued">
                    No
                  </Text>
                  <ToggleButton
                    checked={Boolean(value.enabledAddToCart)}
                    onChange={(nextValue) => patch({ enabledAddToCart: Boolean(nextValue) })}
                  />
                  <Text as="span" tone="subdued">
                    Yes
                  </Text>
                </InlineStack>
              </InlineStack>
            </div>
          </InlineGrid>

          <InlineStack align="end" gap="200" blockAlign="center">
            <Button onClick={onCancel}>Back to templates</Button>
            <Button
              variant="primary"
              tone="success"
              onClick={onSave}
              loading={isSubmitting}
              disabled={!String(value.name || "").trim() || categories.length === 0}
            >
              {isEditing ? "Update template" : "Save template"}
            </Button>
          </InlineStack>
        </div>
      </Box>
    </Card>
  );
}
