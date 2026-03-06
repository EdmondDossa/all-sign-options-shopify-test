import { Box, InlineStack, Text, TextField } from "@shopify/polaris";
import { useId } from "react";
import { ToggleButton } from "~/components/buttons";

export type AdditionalPriceMode = "none" | "base" | "multiplier";

interface AdditionalPriceFieldProps {
  title?: string;
  description?: string;
  mode: string;
  value: number;
  currencySymbol?: string;
  groupName?: string;
  onModeChange: (mode: AdditionalPriceMode) => void;
  onValueChange: (value: number) => void;
}

const PRICE_MODES: Array<{ label: string; value: AdditionalPriceMode }> = [
  { label: "None", value: "none" },
  { label: "Base Price", value: "base" },
  { label: "Multiplier", value: "multiplier" },
];

export default function AdditionalPriceField({
  title = "Additional Price",
  description,
  mode,
  value,
  currencySymbol,
  groupName,
  onModeChange,
  onValueChange,
}: AdditionalPriceFieldProps) {
  const generatedGroup = useId();
  const currentMode: AdditionalPriceMode =
    mode === "base" || mode === "multiplier" ? mode : "none";
  const resolvedGroupName = groupName || `additional-price-mode-${generatedGroup}`;

  return (
    <div style={{ display: "grid", gap: "12px" }}>
      <Text as="h3" variant="headingSm">
        {title}
      </Text>
      {description ? (
        <Text as="p" tone="subdued">
          {description}
        </Text>
      ) : null}

      <InlineStack gap="300" blockAlign="center" wrap>
        {PRICE_MODES.map((entry) => (
          <InlineStack
            key={entry.value}
            gap="100"
            blockAlign="center"
            wrap={false}
          >
            <Text as="span" variant="bodyMd">
              {entry.label}
            </Text>
            <ToggleButton
              id={`${resolvedGroupName}-${entry.value}`}
              checked={currentMode === entry.value}
              type="radio"
              name={resolvedGroupName}
              value={entry.value}
              onChange={(nextValue) => onModeChange(nextValue as AdditionalPriceMode)}
            />
          </InlineStack>
        ))}
      </InlineStack>

      {currentMode !== "none" ? (
        <Box maxWidth="240px">
          <TextField
            label={currentMode === "base" ? "Price value" : "Multiplier value"}
            type="number"
            autoComplete="off"
            value={String(Number.isFinite(value) ? value : 0)}
            prefix={currentMode === "base" ? currencySymbol || "$" : undefined}
            suffix={currentMode === "multiplier" ? "%" : undefined}
            onChange={(nextValue) => {
              const parsed = parseFloat(nextValue || "0");
              onValueChange(Number.isFinite(parsed) ? parsed : 0);
            }}
          />
        </Box>
      ) : null}
    </div>
  );
}
