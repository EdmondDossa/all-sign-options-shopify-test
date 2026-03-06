import {
  Box,
  Button,
  Card,
  Divider,
  Grid,
  InlineStack,
  Select,
  Text,
  TextField,
} from "@shopify/polaris";
import { Controller, useForm } from "react-hook-form";
import { Form, useNavigation } from "@remix-run/react";
import { HelpLink, ToggleButton } from "../buttons";

export interface ResizeSettingsFontSizeSettings {
  defaultFontSize: number;
  maxFontSize: number;
  minFontSize: number;
}

export interface ResizeSettings {
  autoResize: boolean;
  desktop: ResizeSettingsFontSizeSettings;
  mobile: ResizeSettingsFontSizeSettings;
}

export interface FixedWidthSizeType {
  id?: number | null;
  label: string;
  description: string;
  width: number;
  numberLines: number;
  minTextChar: number;
  maxLineChar: number;
  isDefault: boolean;
  resizeSettings: ResizeSettings;
}

export interface FixedHeightSizeType {
  id?: number | null;
  label: string;
  description: string;
  height: number;
  numberLines: number;
  minTextChar: number;
  maxLineChar: number;
  isDefault: boolean;
  resizeSettings: ResizeSettings;
}

export interface AdvancedSizeType {
  id?: number | null;
  label: string;
  scaleMultiplier: number;
  isDefault: boolean;
  resizeSettings: ResizeSettings;
}

interface Props {
  size?: FixedWidthSizeType | FixedHeightSizeType | AdvancedSizeType;
  isEditing?: boolean;
  pricingMode: string;
  onChange?: (
    size: FixedWidthSizeType | FixedHeightSizeType | AdvancedSizeType,
  ) => void;
  onSubmit: (
    size: FixedWidthSizeType | FixedHeightSizeType | AdvancedSizeType,
  ) => void;
  onClose: () => void;
}

const defaultResizeSettings: ResizeSettings = {
  autoResize: true,
  desktop: {
    defaultFontSize: 110,
    maxFontSize: 110,
    minFontSize: 30,
  },
  mobile: {
    defaultFontSize: 60,
    maxFontSize: 60,
    minFontSize: 30,
  },
};

const parseNumber = (value: string) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
};

const parseInteger = (value: string) => {
  const parsed = parseInt(value, 10);
  return Number.isFinite(parsed) ? parsed : 0;
};

export default function SizeForm({
  size,
  pricingMode,
  onSubmit,
  onClose,
  isEditing = false,
}: Props) {
  const sizeWithRightType =
    pricingMode === "advanced"
      ? {
          id: null,
          label: "",
          scaleMultiplier: 1,
          isDefault: false,
          resizeSettings: defaultResizeSettings,
        }
      : pricingMode === "fixed-height"
        ? {
            id: null,
            label: "",
            description: "",
            height: 10,
            numberLines: 1,
            minTextChar: 1,
            maxLineChar: 1,
            isDefault: false,
            resizeSettings: defaultResizeSettings,
          }
        : {
            id: null,
            label: "",
            description: "",
            width: 10,
            numberLines: 1,
            minTextChar: 1,
            maxLineChar: 1,
            isDefault: false,
            resizeSettings: defaultResizeSettings,
          };

  const defaultSize:
    | FixedWidthSizeType
    | FixedHeightSizeType
    | AdvancedSizeType
    | any = isEditing ? size : sizeWithRightType;

  const { handleSubmit, control } = useForm<
    FixedWidthSizeType | FixedHeightSizeType | AdvancedSizeType
  >({
    defaultValues: defaultSize,
    mode: "onChange",
  });

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const onInternalSubmit = (
    data: FixedWidthSizeType | FixedHeightSizeType | AdvancedSizeType,
  ) => {
    try {
      onSubmit(data);
    } catch (e) {
      console.error("Error submitting size form:", e);
    }
  };

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <Card>
        <Box padding="300">
          <InlineStack align="space-between" blockAlign="center">
            <div>
              <Text as="h2" variant="headingMd">
                Sizes
              </Text>
              <Text as="p" tone="subdued">
                {isEditing ? "Edit size" : "Add new size"}
              </Text>
            </div>
            <HelpLink
              url="https://docs.signsdesigner.us/docs/ncpc-documentation/configurations-9624/neon-simple-9626/adding-sizes-9663/"
              text="Get Help"
            />
          </InlineStack>
        </Box>
      </Card>

      <Form onSubmit={handleSubmit(onInternalSubmit)}>
        <div style={{ display: "grid", gap: 12 }}>
          <Card>
            <Box padding="300">
              <Text as="h3" variant="headingMd">
                Basic information
              </Text>
              <Box paddingBlockStart="200" />

              <Grid
                gap={{ lg: "30px" }}
                columns={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}
              >
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 3, xl: 3 }}>
                  <Controller
                    name="label"
                    control={control}
                    rules={{ required: "This field is required" }}
                    render={({ field, fieldState }) => (
                      <TextField
                        label="Label"
                        helpText="The name of the size (e.g. Small)"
                        value={String(field.value || "")}
                        onChange={field.onChange}
                        autoComplete="off"
                        error={fieldState.error?.message}
                      />
                    )}
                  />
                </Grid.Cell>

                {pricingMode !== "advanced" && (
                  <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 3, xl: 3 }}>
                    <Controller
                      name="description"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          label="Description"
                          helpText="e.g. Maximum 60cm (2ft) in length"
                          value={String(field.value || "")}
                          onChange={field.onChange}
                          autoComplete="off"
                        />
                      )}
                    />
                  </Grid.Cell>
                )}

                {pricingMode === "advanced" && (
                  <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 3, xl: 3 }}>
                    <Controller
                      name="scaleMultiplier"
                      control={control}
                      rules={{
                        required: "This field is required",
                        min: {
                          value: 1,
                          message: "Must be greater than 0",
                        },
                      }}
                      render={({ field, fieldState }) => (
                        <TextField
                          label="Text scale"
                          helpText="1 = 100% size, 2 = 200% size"
                          type="number"
                          value={String(field.value ?? 1)}
                          onChange={(value) => field.onChange(parseNumber(value))}
                          autoComplete="off"
                          error={fieldState.error?.message}
                        />
                      )}
                    />
                  </Grid.Cell>
                )}
              </Grid>

              {pricingMode !== "advanced" && (
                <>
                  <Box paddingBlockStart="300" />
                  <Divider borderWidth="100" />
                  <Box paddingBlockStart="300" />

                  <Text as="h3" variant="headingMd">
                    Size and lines of text
                  </Text>
                  <Box paddingBlockStart="200" />

                  <Grid
                    gap={{ lg: "30px" }}
                    columns={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}
                  >
                    {pricingMode === "fixed-height" && (
                      <Grid.Cell
                        columnSpan={{ xs: 6, sm: 6, md: 3, lg: 3, xl: 3 }}
                      >
                        <Controller
                          name="height"
                          control={control}
                          rules={{
                            required: "This field is required",
                            min: {
                              value: 1,
                              message: "Must be greater than 0",
                            },
                          }}
                          render={({ field, fieldState }) => (
                            <TextField
                              label="Height (centimeters)"
                              helpText="This size will always keep this height"
                              value={String(field.value ?? 0)}
                              type="number"
                              onChange={(value) => field.onChange(parseNumber(value))}
                              autoComplete="off"
                              error={fieldState.error?.message}
                            />
                          )}
                        />
                      </Grid.Cell>
                    )}

                    {pricingMode === "fixed-width" && (
                      <Grid.Cell
                        columnSpan={{ xs: 6, sm: 6, md: 3, lg: 3, xl: 3 }}
                      >
                        <Controller
                          name="width"
                          control={control}
                          rules={{
                            required: "This field is required",
                            min: {
                              value: 1,
                              message: "Must be greater than 0",
                            },
                          }}
                          render={({ field, fieldState }) => (
                            <TextField
                              label="Width (centimeters)"
                              helpText="This size will always keep this width"
                              value={String(field.value ?? 0)}
                              type="number"
                              onChange={(value) => field.onChange(parseNumber(value))}
                              autoComplete="off"
                              error={fieldState.error?.message}
                            />
                          )}
                        />
                      </Grid.Cell>
                    )}

                    <Grid.Cell
                      columnSpan={{ xs: 6, sm: 6, md: 3, lg: 3, xl: 3 }}
                    >
                      <Controller
                        name="numberLines"
                        control={control}
                        render={({ field }) => (
                          <Select
                            label="Maximum lines of text"
                            helpText="Maximum number of lines for this size"
                            value={String(field.value ?? 1)}
                            onChange={(value) => field.onChange(parseInteger(value))}
                            options={[
                              { label: "1", value: "1" },
                              { label: "2", value: "2" },
                              { label: "3", value: "3" },
                            ]}
                          />
                        )}
                      />
                    </Grid.Cell>
                  </Grid>

                  <Box paddingBlockStart="300" />
                  <Divider borderWidth="100" />
                  <Box paddingBlockStart="300" />

                  <Text as="h3" variant="headingMd">
                    Character limits
                  </Text>
                  <Box paddingBlockStart="200" />

                  <Grid
                    gap={{ lg: "30px" }}
                    columns={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}
                  >
                    <Grid.Cell
                      columnSpan={{ xs: 6, sm: 6, md: 3, lg: 3, xl: 3 }}
                    >
                      <Controller
                        name="minTextChar"
                        control={control}
                        rules={{
                          required: "This field is required",
                          min: {
                            value: 1,
                            message: "Must be greater than 0",
                          },
                        }}
                        render={({ field, fieldState }) => (
                          <TextField
                            label="Minimum text characters"
                            helpText="Minimum characters for the full sign"
                            value={String(field.value ?? 1)}
                            type="number"
                            onChange={(value) => field.onChange(parseNumber(value))}
                            autoComplete="off"
                            error={fieldState.error?.message}
                          />
                        )}
                      />
                    </Grid.Cell>

                    <Grid.Cell
                      columnSpan={{ xs: 6, sm: 6, md: 3, lg: 3, xl: 3 }}
                    >
                      <Controller
                        name="maxLineChar"
                        control={control}
                        rules={{
                          required: "This field is required",
                          min: {
                            value: 1,
                            message: "Must be greater than 0",
                          },
                        }}
                        render={({ field, fieldState }) => (
                          <TextField
                            label="Maximum text characters per line"
                            helpText="Maximum number of characters allowed per line"
                            value={String(field.value ?? 1)}
                            type="number"
                            onChange={(value) => field.onChange(parseNumber(value))}
                            autoComplete="off"
                            error={fieldState.error?.message}
                          />
                        )}
                      />
                    </Grid.Cell>
                  </Grid>
                </>
              )}

              <Box paddingBlockStart="300" />
              <Divider borderWidth="100" />
              <Box paddingBlockStart="300" />

              <Text as="h3" variant="headingMd">
                Resize settings
              </Text>
              <Box paddingBlockStart="200" />

              <Controller
                name="resizeSettings.autoResize"
                control={control}
                render={({ field }) => (
                  <>
                    <InlineStack gap="200" blockAlign="center">
                      <Text as="p" variant="bodyMd">
                        Auto resize
                      </Text>
                      <ToggleButton
                        id="autoResize"
                        checked={field.value}
                        onChange={(checked) => field.onChange(checked)}
                      />
                    </InlineStack>
                    <Text as="p" variant="bodySm" tone="subdued">
                      If enabled, the sign automatically resizes to better fit the text.
                    </Text>

                    <Box paddingBlockStart="200" />

                    <Grid
                      gap={{ lg: "30px" }}
                      columns={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}
                    >
                      <Grid.Cell
                        columnSpan={{ xs: 6, sm: 6, md: 3, lg: 3, xl: 3 }}
                      >
                        <Text as="h4" variant="headingSm">
                          Desktop
                        </Text>
                        <Box paddingBlockStart="100" />

                        {field.value && (
                          <Controller
                            name="resizeSettings.desktop.minFontSize"
                            control={control}
                            render={({ field }) => (
                              <TextField
                                label="Min font size"
                                helpText="Lowest size when auto-resizing"
                                value={String(field.value ?? 0)}
                                autoComplete="off"
                                type="number"
                                onChange={(value) => field.onChange(parseNumber(value))}
                              />
                            )}
                          />
                        )}

                        <Controller
                          name="resizeSettings.desktop.defaultFontSize"
                          control={control}
                          render={({ field }) => (
                            <TextField
                              label="Default font size"
                              helpText="Default size used initially"
                              value={String(field.value ?? 0)}
                              autoComplete="off"
                              type="number"
                              onChange={(value) => field.onChange(parseNumber(value))}
                            />
                          )}
                        />

                        {field.value && (
                          <Controller
                            name="resizeSettings.desktop.maxFontSize"
                            control={control}
                            render={({ field }) => (
                              <TextField
                                label="Max font size"
                                helpText="Highest size when auto-resizing"
                                value={String(field.value ?? 0)}
                                autoComplete="off"
                                type="number"
                                onChange={(value) => field.onChange(parseNumber(value))}
                              />
                            )}
                          />
                        )}
                      </Grid.Cell>

                      <Grid.Cell
                        columnSpan={{ xs: 6, sm: 6, md: 3, lg: 3, xl: 3 }}
                      >
                        <Text as="h4" variant="headingSm">
                          Mobile
                        </Text>
                        <Box paddingBlockStart="100" />

                        {field.value && (
                          <Controller
                            name="resizeSettings.mobile.minFontSize"
                            control={control}
                            render={({ field }) => (
                              <TextField
                                label="Min font size"
                                helpText="Lowest size when auto-resizing"
                                value={String(field.value ?? 0)}
                                autoComplete="off"
                                type="number"
                                onChange={(value) => field.onChange(parseNumber(value))}
                              />
                            )}
                          />
                        )}

                        <Controller
                          name="resizeSettings.mobile.defaultFontSize"
                          control={control}
                          render={({ field }) => (
                            <TextField
                              label="Default font size"
                              helpText="Default size used initially"
                              value={String(field.value ?? 0)}
                              autoComplete="off"
                              type="number"
                              onChange={(value) => field.onChange(parseNumber(value))}
                            />
                          )}
                        />

                        {field.value && (
                          <Controller
                            name="resizeSettings.mobile.maxFontSize"
                            control={control}
                            render={({ field }) => (
                              <TextField
                                label="Max font size"
                                helpText="Highest size when auto-resizing"
                                value={String(field.value ?? 0)}
                                autoComplete="off"
                                type="number"
                                onChange={(value) => field.onChange(parseNumber(value))}
                              />
                            )}
                          />
                        )}
                      </Grid.Cell>
                    </Grid>
                  </>
                )}
              />
            </Box>
          </Card>

          <Card>
            <Box padding="300">
              <InlineStack align="end" gap="300">
                <Button
                  disabled={isSubmitting}
                  variant="secondary"
                  onClick={onClose}
                >
                  Cancel
                </Button>
                <Button
                  submit
                  loading={isSubmitting}
                  disabled={isSubmitting}
                  variant="primary"
                >
                  {isEditing ? "Update" : "Save"}
                </Button>
              </InlineStack>
            </Box>
          </Card>
        </div>
      </Form>
    </div>
  );
}
