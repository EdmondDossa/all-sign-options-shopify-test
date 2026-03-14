import { Box, Card, InlineStack, Select, Text } from "@shopify/polaris";
import { SaveButton, ToggleButton } from "~/components/buttons";

export type ModeSettingsValue = {
  type: "simple" | "multi";
  allowMultiFonts: boolean;
  allowMultiColors: boolean;
  shareAndSave: {
    allowShare: boolean;
    shareSignLocation: "options_review" | "review_only";
    allowSave: boolean;
  };
};

function ToggleField({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description?: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <div
      style={{
        display: "grid",
        gap: 6,
        padding: "12px 14px",
        border: "1px solid #e5e7eb",
        borderRadius: 12,
        background: "#ffffff",
      }}
    >
      <InlineStack align="space-between" blockAlign="center">
        <Text as="span" variant="bodyMd" fontWeight="semibold">
          {label}
        </Text>
        <InlineStack gap="150" blockAlign="center" wrap={false}>
          <Text as="span" variant="bodySm" tone="subdued">
            No
          </Text>
          <ToggleButton checked={checked} onChange={(value) => onChange(Boolean(value))} />
          <Text as="span" variant="bodySm" tone="subdued">
            Yes
          </Text>
        </InlineStack>
      </InlineStack>
      {description ? (
        <Text as="p" variant="bodySm" tone="subdued">
          {description}
        </Text>
      ) : null}
    </div>
  );
}

export default function ModeSettingsSection({
  value,
  saving,
  supportsMultiMode,
  title = "Mode",
  description = "Control customization mode and customer share/save capabilities.",
  onChange,
  onSave,
}: {
  value: ModeSettingsValue;
  saving: boolean;
  supportsMultiMode: boolean;
  title?: string;
  description?: string;
  onChange: (next: ModeSettingsValue) => void;
  onSave: () => void;
}) {
  return (
    <Card>
      <Box padding="300">
        <Text as="h3" variant="headingMd">
          {title}
        </Text>
        <Box paddingBlockStart="100">
          <Text as="p" tone="subdued">
            {description}
          </Text>
        </Box>

        <Box paddingBlockStart="300">
          <div style={{ display: "grid", gap: 12 }}>
            {supportsMultiMode ? (
              <Select
                label="Mode"
                helpText="Choose whether customers can apply multiple fonts or colors within one design."
                options={[
                  { label: "Simple", value: "simple" },
                  { label: "Multi", value: "multi" },
                ]}
                value={value.type || "simple"}
                onChange={(type) =>
                  onChange({
                    ...value,
                    type: type === "multi" ? "multi" : "simple",
                  })
                }
              />
            ) : null}

            {supportsMultiMode && value.type === "multi" ? (
              <div style={{ display: "grid", gap: 12 }}>
                <ToggleField
                  label="Allow Multi Fonts"
                  description="Allow customers to apply different fonts to different parts of their text."
                  checked={Boolean(value.allowMultiFonts)}
                  onChange={(checked) => onChange({ ...value, allowMultiFonts: checked })}
                />
                <ToggleField
                  label="Allow Multi Colors"
                  description="Allow customers to apply different colors to different parts of their text."
                  checked={Boolean(value.allowMultiColors)}
                  onChange={(checked) => onChange({ ...value, allowMultiColors: checked })}
                />
              </div>
            ) : null}

            <ToggleField
              label="Allow Share"
              description="Let customers share the configured sign."
              checked={Boolean(value?.shareAndSave?.allowShare)}
              onChange={(checked) =>
                onChange({
                  ...value,
                  shareAndSave: {
                    ...(value.shareAndSave || {}),
                    allowShare: checked,
                  },
                })
              }
            />

            <ToggleField
              label="Allow Save"
              description="Let customers save their configuration for later."
              checked={Boolean(value?.shareAndSave?.allowSave)}
              onChange={(checked) =>
                onChange({
                  ...value,
                  shareAndSave: {
                    ...(value.shareAndSave || {}),
                    allowSave: checked,
                  },
                })
              }
            />

            <Select
              label="Share Sign Location"
              options={[
                { label: "Options + Review", value: "options_review" },
                { label: "Review only", value: "review_only" },
              ]}
              value={
                value?.shareAndSave?.shareSignLocation === "review_only"
                  ? "review_only"
                  : "options_review"
              }
              onChange={(shareSignLocation) =>
                onChange({
                  ...value,
                  shareAndSave: {
                    ...(value.shareAndSave || {}),
                    shareSignLocation:
                      shareSignLocation === "review_only" ? "review_only" : "options_review",
                  },
                })
              }
            />
          </div>
        </Box>

        <Box paddingBlockStart="300">
          <InlineStack align="end">
            <SaveButton loading={saving} onClick={onSave}>
              Save Mode
            </SaveButton>
          </InlineStack>
        </Box>
      </Box>
    </Card>
  );
}
