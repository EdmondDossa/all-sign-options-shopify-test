import { useEffect } from "react";
import {
  Box,
  Card,
  Divider,
  Grid,
  InlineStack,
  Select,
  Text,
  TextField,
} from "@shopify/polaris";
import { BackBtn, BiSaveBtn, HelpLink, ToggleButton } from "../buttons";
import { Controller, useForm } from "react-hook-form";
import { Form, useNavigation } from "@remix-run/react";
import type { AdditionalPriceType } from "~/types/ConfigDataType";
import { TextColorField } from "../inputs";
import AdditionalPriceLayout from "./AdditionalPriceLayout";
import { FileInput } from "../inputs/FileInput";

export interface Texture {
  id: number | any;
  label: string;
  visualEffect?: string;
  pattern?: string;
  codeHex: string;
  minWidth: number;
  minHeight: number;
  isDefault: boolean;
  visibilityRule: string;
  previewImg: string;
  popupImg: string;
  price: AdditionalPriceType;
}

interface Props {
  color?: Texture;
  part?: string;
  isEditing?: boolean;
  currencySymbol?: string;
  onSubmit: (color: Texture) => void;
  onClose: () => void;
}
export function TextureForm({
  color,
  part,
  isEditing,
  currencySymbol,
  onSubmit,
  onClose,
}: Props) {
  const defaultColor: Texture = isEditing
    ? (color as Texture)
    : {
        id: null,
        label: "",
        codeHex: "#000000",
        ...(part == "face" ? { visualEffect: "acrylic" } : {}),
        ...(part == "face" ? { pattern: "" } : {}),
        minWidth: 0,
        minHeight: 0,
        isDefault: false,
        visibilityRule: "one-of-two",
        previewImg: "",
        popupImg: "",
        price: {
          type: "none",
          value: 0,
        },
      };

  const visualEffects = [
    { label: "Acrylic - Displays as single color", value: "acrylic" },
    { label: "Metallic - Adds a shine effect to the color", value: "metallic" },
    { label: "Wood", value: "wood" },
  ];

  const {
    handleSubmit,
    control,
    reset,
    setValue,
    watch,
  } = useForm<Texture>({
    defaultValues: defaultColor,
    mode: "onChange",
  });
  const additionalPrice = watch("price");

  const navigation = useNavigation();
  let isSubmitting = navigation.state == "submitting";

  const handleGoBack = () => {
    onClose();
  };

  const onInternalSubmit = (data: Texture) => {
    try {
      onSubmit(data);
    } catch (e) {
      console.error("Error submitting form:", e);
    }
  };
  useEffect(() => {
    if (isEditing && color) {
      reset(color);
    }
  }, [isEditing, color, reset]);

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <Card>
        <Box padding="300">
          <InlineStack align="space-between" blockAlign="center">
            <div>
              <Text as="h2" variant="headingMd">
                Texture
              </Text>
              <Text as="p" tone="subdued">
                {isEditing ? "Edit Color" : "Add New Color"}
              </Text>
            </div>
            <HelpLink
              url="https://docs.signsdesigner.us/docs/ncpc-documentation/configurations-9624/adding-color-for-neon-configurations-9711/"
              text="Get Help"
            />
          </InlineStack>
        </Box>
      </Card>

      <Form onSubmit={handleSubmit(onInternalSubmit)}>
        <div style={{ display: "grid", gap: 12 }}>
          <Card>
            <Box padding="300">
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
                        helpText="The name of the color (e.g. Black)."
                        value={field.value}
                        onChange={field.onChange}
                        autoComplete="off"
                        error={fieldState.error?.message}
                      />
                    )}
                  />
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 2, lg: 3, xl: 2 }}>
                  <Controller
                    name="codeHex"
                    control={control}
                    render={({ field }) => (
                      <TextColorField
                        label="Color"
                        color={field.value}
                        setColor={(val) => field.onChange(val)}
                      />
                    )}
                  />
                </Grid.Cell>
              </Grid>

              {part == "face" && (
                <>
                  <Box paddingBlock="150" />
                  <Divider borderWidth="100" />
                  <Box paddingBlockStart="150">
                    <Select
                      label="Visual Effect"
                      options={visualEffects}
                      onChange={(val) => {
                        setValue("visualEffect", val);
                      }}
                      helpText="Choose the visual effect for this letter part texture."
                      value={watch("visualEffect")}
                    />
                    {watch("visualEffect") == "wood" && (
                      <Box paddingBlockStart="150">
                        <Grid
                          gap={{ lg: "30px" }}
                          columns={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}
                        >
                          <Grid.Cell
                            columnSpan={{ xs: 6, sm: 6, md: 2, lg: 3, xl: 2 }}
                          >
                            <Controller
                              name="pattern"
                              control={control}
                              render={({ field }) => (
                                <FileInput
                                  title="Upload Wood Texture"
                                  type="image"
                                  helperText="The image uploaded here will replace the color on the face of the letter."
                                  buttonTitle="Choose a picture"
                                  path={field.value || ""}
                                  handlePath={(val: string) => field.onChange(val)}
                                />
                              )}
                            />
                          </Grid.Cell>
                        </Grid>
                      </Box>
                    )}
                  </Box>
                </>
              )}

              <Box paddingBlock="150" />
              <Divider borderWidth="100" />
              <Box paddingBlockStart="150">
                <Text as="h6" variant="headingMd">
                  Minimum Size (optional)
                </Text>
                <Box paddingBlockStart="150" />
                <Grid
                  gap={{ lg: "30px" }}
                  columns={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}
                >
                  <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 2, lg: 3, xl: 2 }}>
                    <Controller
                      name="minWidth"
                      control={control}
                      render={({ field, fieldState }) => (
                        <TextField
                          label="Minimum Width"
                          type="number"
                          value={field.value.toString()}
                          onChange={(val) => {
                            field.onChange(Number(val));
                          }}
                          min={0}
                          autoComplete="off"
                          error={fieldState.error?.message}
                        />
                      )}
                    />
                  </Grid.Cell>
                  <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 2, lg: 3, xl: 2 }}>
                    <Controller
                      name="minHeight"
                      control={control}
                      render={({ field, fieldState }) => (
                        <TextField
                          label="Minimum Height"
                          type="number"
                          value={field.value.toString()}
                          onChange={(val) => {
                            field.onChange(Number(val));
                          }}
                          min={0}
                          autoComplete="off"
                          error={fieldState.error?.message}
                        />
                      )}
                    />
                  </Grid.Cell>
                </Grid>
              </Box>

              <Box paddingBlock="150" />
              <Divider borderWidth="100" />
              <Box paddingBlockStart="150">
                <Text as="h6" variant="headingMd">
                  Rule
                </Text>
                <Box paddingBlockStart="150" />
                <Grid
                  gap={{ lg: "30px" }}
                  columns={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}
                >
                  <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 2, lg: 3, xl: 2 }}>
                    <Controller
                      name="visibilityRule"
                      control={control}
                      render={({ field }) => (
                        <InlineStack gap="200" blockAlign="center" align="space-between">
                          <Text as="span" variant="bodyMd">
                            Disable until one minimum value is reached
                          </Text>
                          <ToggleButton
                            id="vibilityRule1"
                            type="radio"
                            name="visibilityRule"
                            value="one-of-two"
                            checked={field.value == "one-of-two"}
                            onChange={(val) => {
                              field.onChange(val);
                            }}
                          />
                        </InlineStack>
                      )}
                    />
                  </Grid.Cell>
                  <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 2, lg: 3, xl: 2 }}>
                    <Controller
                      name="visibilityRule"
                      control={control}
                      render={({ field }) => (
                        <InlineStack gap="200" blockAlign="center" align="space-between">
                          <Text as="span" variant="bodyMd">
                            Disable until both minimum values are reached
                          </Text>
                          <ToggleButton
                            id="vibilityRule2"
                            type="radio"
                            name="visibilityRule"
                            value="both"
                            checked={field.value == "both"}
                            onChange={(val) => {
                              field.onChange(val);
                            }}
                          />
                        </InlineStack>
                      )}
                    />
                  </Grid.Cell>
                </Grid>
              </Box>

              <Box paddingBlock="150" />
              <Divider borderWidth="100" />
              <Box paddingBlockStart="150">
                <Grid
                  gap={{ lg: "30px" }}
                  columns={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}
                >
                  <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 2, lg: 3, xl: 2 }}>
                    <Controller
                      name="previewImg"
                      control={control}
                      render={({ field }) => (
                        <FileInput
                          title="Preview Image (optional)"
                          type="image"
                          helperText="Upload an image to display the color or gradient. Adding an image will replace the preview color."
                          buttonTitle="Choose a picture"
                          path={field.value || ""}
                          handlePath={(val: string) => field.onChange(val)}
                        />
                      )}
                    />
                  </Grid.Cell>
                  <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 2, lg: 3, xl: 2 }}>
                    <Controller
                      name="popupImg"
                      control={control}
                      render={({ field }) => (
                        <FileInput
                          title="Popup Image (optional)"
                          type="image"
                          helperText="Example Image - displayed as popup"
                          buttonTitle="Choose a picture"
                          path={field.value || ""}
                          handlePath={(val: string) => field.onChange(val)}
                        />
                      )}
                    />
                  </Grid.Cell>
                </Grid>
              </Box>

              <Box paddingBlock="150" />
              <Divider borderWidth="100" />
              <Box paddingBlockStart="150">
                <AdditionalPriceLayout
                  headerText="Pricing (optional)"
                  currencySymbol={currencySymbol}
                  type={additionalPrice.type}
                  value={additionalPrice.value}
                  onTypeChange={(val: string) => {
                    setValue("price.type", val);
                  }}
                  onValueChange={(val: number) => {
                    setValue("price.value", val);
                  }}
                />
              </Box>
            </Box>
          </Card>

          <Card>
            <Box padding="300">
              <InlineStack align="end" gap="600">
                <BackBtn
                  title="Back"
                  disabled={isSubmitting}
                  onClick={handleGoBack}
                />
                <BiSaveBtn
                  title={isEditing ? "Update" : "Save"}
                  isLoading={isSubmitting}
                />
              </InlineStack>
            </Box>
          </Card>
        </div>
      </Form>
    </div>
  );
}
