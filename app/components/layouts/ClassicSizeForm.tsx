import {
  BlockStack,
  Box,
  Button,
  Card,
  Divider,
  InlineGrid,
  InlineStack,
  TextField,
} from "@shopify/polaris";
import { SaveButton } from "~/components/buttons";

export type ClassicSizeFormItem = {
  id: string;
  label: string;
  width: number;
  height: number;
  textNumber: number;
  maxTextChar: number;
  charPrice: number;
  basePrice: number;
  startPriceAtChar: number;
  isDefault: boolean;
  excludeMaterials: string[];
};

type Props = {
  item: ClassicSizeFormItem;
  isEditing: boolean;
  isSubmitting: boolean;
  onChange: (next: ClassicSizeFormItem) => void;
  onSave: () => void;
  onCancel: () => void;
};

const toNumber = (value: unknown, fallback = 0) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

export default function ClassicSizeForm({
  item,
  isEditing,
  isSubmitting,
  onChange,
  onSave,
  onCancel,
}: Props) {
  const patch = (partial: Partial<ClassicSizeFormItem>) => {
    onChange({
      ...item,
      ...partial,
    });
  };

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <Card>
        <Box padding="300">
          <BlockStack gap="400">
            <InlineStack align="end" blockAlign="center">
              <Button onClick={onCancel}>Back to sizes</Button>
            </InlineStack>

            <TextField
              label="Label"
              value={item.label}
              onChange={(value) => patch({ label: value })}
              autoComplete="off"
              helpText="Internal and customer-facing name for this size."
            />

            <InlineGrid columns={{ xs: 1, md: 2 }} gap="400">
              <TextField
                label="Width"
                type="number"
                value={String(item.width)}
                onChange={(value) =>
                  patch({ width: toNumber(value, item.width) })
                }
                autoComplete="off"
              />
              <TextField
                label="Height"
                type="number"
                value={String(item.height)}
                onChange={(value) =>
                  patch({ height: toNumber(value, item.height) })
                }
                autoComplete="off"
              />
            </InlineGrid>

            <InlineGrid columns={{ xs: 1, md: 2 }} gap="400">
              <TextField
                label="Number of text lines"
                type="number"
                value={String(item.textNumber)}
                onChange={(value) =>
                  patch({ textNumber: toNumber(value, item.textNumber) })
                }
                autoComplete="off"
              />
              <TextField
                label="Max text chars"
                type="number"
                value={String(item.maxTextChar)}
                onChange={(value) =>
                  patch({ maxTextChar: toNumber(value, item.maxTextChar) })
                }
                autoComplete="off"
              />
            </InlineGrid>

            <Divider />

            <InlineStack align="end" gap="300">
              <Button onClick={onCancel}>Cancel</Button>
              <SaveButton
                onClick={onSave}
                disabled={!item.label.trim() || isSubmitting}
              >
                {isEditing ? "Update size" : "Save size"}
              </SaveButton>
            </InlineStack>
          </BlockStack>
        </Box>
      </Card>
    </div>
  );
}
