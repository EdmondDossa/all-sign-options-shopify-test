import {
  BlockStack,
  Box,
  Button,
  Card,
  InlineGrid,
  InlineStack,
  Text,
  TextField,
} from "@shopify/polaris";
import { SaveButton, ToggleButton } from "~/components/buttons";
import { FileInput } from "~/components/inputs/FileInput";

export type ClassicColorFormItem = {
  id: string;
  name: string;
  additionalPrice: number;
  isDefault: boolean;
  textColor: {
    active: boolean;
    sameForBorder: boolean;
    codeHex: string;
    name: string;
  };
  pattern: {
    active: boolean;
    codeHex: string;
    url: string;
  };
  prevImg: string;
  excludeMaterials: string[];
};

type Props = {
  item: ClassicColorFormItem;
  currencySymbol: string;
  isEditing: boolean;
  isSubmitting: boolean;
  onChange: (next: ClassicColorFormItem) => void;
  onSave: () => void;
  onCancel: () => void;
};

const normalizeHex = (value: string) => {
  const trimmed = String(value || "").trim();
  if (!trimmed) return "#000000";
  return trimmed.startsWith("#") ? trimmed : `#${trimmed}`;
};

export default function ClassicColorForm({
  item,
  currencySymbol,
  isEditing,
  isSubmitting,
  onChange,
  onSave,
  onCancel,
}: Props) {
  const patch = (partial: Partial<ClassicColorFormItem>) => {
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
              <Button onClick={onCancel}>Back to colors</Button>
            </InlineStack>

            <InlineGrid columns={{ xs: 1, md: 2 }} gap="400">
              <TextField
                label="Name"
                value={item.name}
                onChange={(value) => patch({ name: value })}
                autoComplete="off"
                helpText="Customer-facing color name."
              />
              <FileInput
                title="Preview image"
                type="image"
                path={item.prevImg || ""}
                handlePath={(value: string) => patch({ prevImg: value })}
                helperText="Optional preview image used for this color."
              />
            </InlineGrid>

            <BlockStack gap="300">
              <InlineStack align="space-between" blockAlign="center">
                <div>
                  <Text as="h3" variant="headingMd">
                    Pattern
                  </Text>
                  <Text as="p" tone="subdued">
                    Choose between a flat background color or a pattern image.
                  </Text>
                </div>
                <InlineStack gap="200" blockAlign="center">
                  <Text as="span" tone="subdued">
                    Flat color
                  </Text>
                  <ToggleButton
                    checked={item.pattern.active}
                    onChange={(checked) =>
                      patch({
                        pattern: {
                          ...item.pattern,
                          active: Boolean(checked),
                        },
                      })
                    }
                  />
                  <Text as="span" tone="subdued">
                    Pattern image
                  </Text>
                </InlineStack>
              </InlineStack>

              {!item.pattern.active ? (
                <BlockStack gap="150">
                  <Text as="p" fontWeight="medium">
                    Material background color
                  </Text>
                  <div style={{ display: "grid", gridTemplateColumns: "48px minmax(0, 1fr)", gap: 12, alignItems: "end" }}>
                    <input
                      type="color"
                      value={normalizeHex(item.pattern.codeHex || "#000000")}
                      onChange={(event) =>
                        patch({
                          pattern: {
                            ...item.pattern,
                            codeHex: event.currentTarget.value,
                          },
                        })
                      }
                      style={{
                        width: 48,
                        height: 36,
                        border: "1px solid #d1d5db",
                        borderRadius: 8,
                        background: "#fff",
                        padding: 4,
                        marginBottom: 1,
                      }}
                    />
                    <TextField
                      label="Material background color"
                      labelHidden
                      value={item.pattern.codeHex || "#000000"}
                      onChange={(value) =>
                        patch({
                          pattern: {
                            ...item.pattern,
                            codeHex: normalizeHex(value),
                          },
                        })
                      }
                      autoComplete="off"
                    />
                  </div>
                </BlockStack>
              ) : (
                <FileInput
                  title="Pattern image"
                  type="image"
                  path={item.pattern.url || ""}
                  handlePath={(value: string) =>
                    patch({
                      pattern: {
                        ...item.pattern,
                        url: value,
                      },
                    })
                  }
                  helperText="Image used as the pattern background."
                />
              )}
            </BlockStack>

            <BlockStack gap="300">
              <InlineStack align="space-between" blockAlign="center">
                <div>
                  <Text as="h3" variant="headingMd">
                    Text color
                  </Text>
                  <Text as="p" tone="subdued">
                    Enable a dedicated text color for this color option.
                  </Text>
                </div>
                <InlineStack gap="200" blockAlign="center">
                  <Text as="span" tone="subdued">
                    No
                  </Text>
                  <ToggleButton
                    checked={item.textColor.active}
                    onChange={(checked) =>
                      patch({
                        textColor: {
                          ...item.textColor,
                          active: Boolean(checked),
                        },
                      })
                    }
                  />
                  <Text as="span" tone="subdued">
                    Yes
                  </Text>
                </InlineStack>
              </InlineStack>

              {item.textColor.active ? (
                <>
                  <InlineGrid columns={{ xs: 1, md: 2 }} gap="400">
                    <TextField
                      label="Text color name"
                      value={item.textColor.name}
                      onChange={(value) =>
                        patch({
                          textColor: {
                            ...item.textColor,
                            name: value,
                          },
                        })
                      }
                      autoComplete="off"
                    />
                    <BlockStack gap="150">
                      <Text as="p" fontWeight="medium">
                        Text color
                      </Text>
                      <div style={{ display: "grid", gridTemplateColumns: "48px minmax(0, 1fr)", gap: 12, alignItems: "end" }}>
                        <input
                          type="color"
                          value={normalizeHex(item.textColor.codeHex || "#000000")}
                          onChange={(event) =>
                            patch({
                              textColor: {
                                ...item.textColor,
                                codeHex: event.currentTarget.value,
                              },
                            })
                          }
                          style={{
                            width: 48,
                            height: 36,
                            border: "1px solid #d1d5db",
                            borderRadius: 8,
                            background: "#fff",
                            padding: 4,
                            marginBottom: 1,
                          }}
                        />
                        <TextField
                          label="Text color"
                          labelHidden
                          value={item.textColor.codeHex || "#000000"}
                          onChange={(value) =>
                            patch({
                              textColor: {
                                ...item.textColor,
                                codeHex: normalizeHex(value),
                              },
                            })
                          }
                          autoComplete="off"
                        />
                      </div>
                    </BlockStack>
                  </InlineGrid>

                  <InlineStack align="space-between" blockAlign="center">
                    <div>
                      <Text as="span">Use the same color for border</Text>
                      <Text as="p" tone="subdued">
                        Apply the text color to the border for this color option.
                      </Text>
                    </div>
                    <InlineStack gap="200" blockAlign="center">
                      <Text as="span" tone="subdued">
                        No
                      </Text>
                      <ToggleButton
                        checked={item.textColor.sameForBorder}
                        onChange={(checked) =>
                          patch({
                            textColor: {
                              ...item.textColor,
                              sameForBorder: Boolean(checked),
                            },
                          })
                        }
                      />
                      <Text as="span" tone="subdued">
                        Yes
                      </Text>
                    </InlineStack>
                  </InlineStack>
                </>
              ) : null}
            </BlockStack>

            <TextField
              label="Additional price"
              type="number"
              value={String(item.additionalPrice || 0)}
              onChange={(value) =>
                patch({
                  additionalPrice: Number(value || 0),
                })
              }
              autoComplete="off"
              suffix={currencySymbol}
            />

            <InlineStack align="end" gap="300">
              <Button onClick={onCancel}>Cancel</Button>
              <SaveButton onClick={onSave} disabled={!item.name.trim() || isSubmitting}>
                {isEditing ? "Update color" : "Save color"}
              </SaveButton>
            </InlineStack>
          </BlockStack>
        </Box>
      </Card>
    </div>
  );
}
