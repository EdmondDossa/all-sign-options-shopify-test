import { useEffect, useState } from "react";
import SpacingBackground from "./SpacingBackground";
import {
  Box,
  Button,
  Divider,
  Grid,
  InlineGrid,
  InlineStack,
  Modal,
  Select,
  Text,
  TextField,
} from "@shopify/polaris";
import { HelpLink, ToggleButton } from "../buttons";
import {
  BiSaveIcon,
  MoinsIcon,
  NextLtrIcon,
  PlusIcon,
  RayStartArrowIcon,
  ShippingConvertIcon,
} from "../icons";
import { Controller, useForm } from "react-hook-form";
import {
  Form,
  redirect,
  useNavigate,
  useNavigation,
  useOutletContext,
} from "@remix-run/react";
import { AdditionalPriceType } from "~/types/ConfigDataType";
import { TextColorField } from "../inputs";
import UploaderLayout from "./UploderLayout";
import AdditionalPriceLayout from "./AdditionalPriceLayout";

export interface RequiredColor {
  id: number | any;
  label: string;
  type: "simple" | "multi" | "flow" | string;
  codeHex: string[];
  minWidth: number;
  minHeight: number;
  isDefault: boolean;
  visibilityRule: string;
  previewImg: string;
  popupImg: string;
  price: AdditionalPriceType;
}

interface Props {
  color?: RequiredColor;
  isEditing?: boolean;
  currencySymbol?: string;
  onSubmit: (color: RequiredColor) => void;
  onClose: () => void;
}
export function ColorForm({
  color,
  isEditing,
  currencySymbol,
  onSubmit,
  onClose,
}: Props) {
  const defaultColor: RequiredColor = isEditing
    ? (color as RequiredColor)
    : {
        id: null,
        label: "",
        type: "simple",
        codeHex: ["#000000"],
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

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isValid },
    setValue,
    getValues,
    watch,
  } = useForm<RequiredColor>({
    defaultValues: defaultColor,
    mode: "onChange",
  });

  // On surveille directement les valeurs du formulaire
  const colorType = watch("type");
  const codeHex = watch("codeHex");
  const additionalPrice = watch("price");

  const navigation = useNavigation();
  let isSubmitting = navigation.state == "submitting";

  const handleGoBack = () => {
    onClose();
  };

  const handleChangeColorType = (val: string) => {
    setValue("type", val);

    // Si on passe à simple, on garde seulement la première couleur
    if (val === "simple") {
      setValue("codeHex", [codeHex[0] || "#000000"]);
    }
    // Si on était en simple et qu'on passe à multi/flow, on garde la couleur existante
    // mais pas besoin de changer le tableau car il contient déjà la couleur
  };

  const handleRemoveColorFromList = (index: number) => {
    const newColors = [...codeHex];
    newColors.splice(index, 1);
    setValue("codeHex", newColors);
  };

  const handleAddColorToList = () => {
    if (codeHex.length < 8) {
      setValue("codeHex", [...codeHex, "#000000"]);
    }
  };

  const handleChangeColors = (val: string, index: number) => {
    const newColors = [...codeHex];
    newColors[index] = val;
    setValue("codeHex", newColors);
  };

  const onInternalSubmit = (data: RequiredColor) => {
    try {
      onSubmit(data);
    } catch (e) {
      console.error("Error submitting form:", e);
    }
  };

  // On initialise le formulaire au chargement
  useEffect(() => {
    if (isEditing && color) {
      // Reset avec les valeurs existantes pour être sûr d'avoir les bonnes valeurs
      reset(color);
    }
  }, [isEditing, color, reset]);

  return (
    <>
      <Box paddingInline="300" paddingBlock="200" background="bg-surface">
        <InlineStack gap="300" align="space-between">
          <Box padding="300" background="bg-surface">
            <Text as="p" variant="headingMd">
              Colors <NextLtrIcon width={6} height={10} />{" "}
              {isEditing ? "Edit Color" : "Add new Color"}
            </Text>
          </Box>
          <InlineStack gap="300" align="center">
            <HelpLink
              url="https://docs.signsdesigner.us/docs/ncpc-documentation/configurations-9624/adding-color-for-neon-configurations-9711/"
              text="Get Help"
            />
          </InlineStack>
        </InlineStack>
      </Box>
      <Divider borderWidth="050" />
      <Form onSubmit={handleSubmit(onInternalSubmit)}>
        <Box paddingInline="300" paddingBlock="200" as="div">
          <SpacingBackground backgroundColor="#F8F9FB">
            <Box paddingInline="300" paddingBlock="100">
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
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 3, xl: 3 }}>
                  <Controller
                    name="type"
                    control={control}
                    render={({ field, fieldState }) => (
                      <Select
                        label="Color Type"
                        options={[
                          { label: "Simple", value: "simple" },
                          { label: "Multi", value: "multi" },
                          { label: "Flow", value: "flow" },
                        ]}
                        onChange={(val) => {
                          handleChangeColorType(val);
                        }}
                        value={field.value}
                        error={fieldState.error?.message}
                      />
                    )}
                  />
                </Grid.Cell>
              </Grid>
              <Divider borderWidth="100" />
              <Box padding={"150"} />
              <Grid
                gap={{ lg: "30px" }}
                columns={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 6 }}
              >
                {codeHex.map((hexColor: string, index: number) => (
                  <Grid.Cell
                    key={index}
                    columnSpan={{ xs: 6, sm: 6, md: 2, lg: 3, xl: 2 }}
                  >
                    {codeHex.length === 1 && (
                      <TextColorField
                        label="color"
                        color={hexColor}
                        setColor={(val) => handleChangeColors(val, index)}
                      />
                    )}
                    {codeHex.length > 1 && (
                      <TextColorField
                        label="color"
                        color={hexColor}
                        setColor={(val) => handleChangeColors(val, index)}
                        handleDelete={() => handleRemoveColorFromList(index)}
                      />
                    )}
                  </Grid.Cell>
                ))}
              </Grid>
              {colorType !== "simple" && codeHex.length < 8 && (
                <>
                  <Box padding={"150"} />
                  <button
                    type="button"
                    className="primary-btn"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      color: "white",
                    }}
                    onClick={handleAddColorToList}
                  >
                    <PlusIcon />
                    <Box paddingInline="100" />
                    Add More
                  </button>
                </>
              )}
              <Divider borderWidth="100" />
              <Box>
                <Box paddingBlock="150">
                  <Text as="h6" variant="headingMd">
                    Minimum Size (optional)
                  </Text>
                </Box>
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
                          helpText=""
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
                          helpText=""
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
              <Box padding={"150"} />
              <Divider borderWidth="100" />
              <Box>
                <Box paddingBlock="150">
                  <Text as="h6" variant="headingMd">
                    Rule
                  </Text>
                </Box>
                <Grid
                  gap={{ lg: "30px" }}
                  columns={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}
                >
                  <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 2, lg: 3, xl: 2 }}>
                    <Controller
                      name="visibilityRule"
                      control={control}
                      render={({ field, fieldState }) => (
                        <>
                          <Text as="span" variant="bodyMd">
                            Disable until both minimum values are reached
                          </Text>
                          <Box as="span" paddingInline="050" />
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
                        </>
                      )}
                    />
                  </Grid.Cell>
                  <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 2, lg: 3, xl: 2 }}>
                    <Controller
                      name="visibilityRule"
                      control={control}
                      render={({ field, fieldState }) => (
                        <>
                          <Text as="span" variant="bodyMd">
                            Disable until both minimum values are reached
                          </Text>
                          <Box as="span" paddingInline="050" />
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
                        </>
                      )}
                    />
                  </Grid.Cell>
                </Grid>
              </Box>
              <Box padding={"150"} />
              <Divider borderWidth="100" />
              <Box>
                <Grid
                  gap={{ lg: "30px" }}
                  columns={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}
                >
                  <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 2, lg: 3, xl: 2 }}>
                    <Controller
                      name="previewImg"
                      control={control}
                      render={({ field, fieldState }) => (
                        <UploaderLayout
                          label="Preview Image (optional)"
                          modalTitle="Upload Preview Image"
                          helperText="Upload an image to display the color or gradient. Adding an image will replace the preview color."
                          buttonText={"choose a picture"}
                          fileType={"image"}
                          value={field.value}
                          isSubmitting={false}
                          onChange={(val) => {
                            field.onChange(val);
                          }}
                        />
                      )}
                    />
                  </Grid.Cell>
                  <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 2, lg: 3, xl: 2 }}>
                    <Controller
                      name="popupImg"
                      control={control}
                      render={({ field, fieldState }) => (
                        <UploaderLayout
                          modalTitle="Upload Popup Image"
                          label="Popup Image (optional)"
                          buttonText={"choose a picture"}
                          helperText="Example Image - displayed as popup"
                          fileType={"image"}
                          value={field.value}
                          isSubmitting={false}
                          onChange={(val) => {
                            field.onChange(val);
                          }}
                        />
                      )}
                    />
                  </Grid.Cell>
                </Grid>
              </Box>
              <Box padding={"150"} />
              <Divider borderWidth="100" />
              <Box padding={"150"} />
              <Box>
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
              <Box padding={"150"} />
              <Divider borderWidth="100" />
            </Box>
          </SpacingBackground>
        </Box>
        <SpacingBackground
          backgroundColor="#F9F9F9"
          bottom="0"
          shadow="0px 0px 10px rgba(0, 0, 0, 0.1)"
          width="100%"
          zIndex={100}
        >
          <Box paddingInline="300" paddingBlock="200">
            <InlineStack align="end" gap="600">
              <button
                disabled={isSubmitting}
                className="back-large-btn"
                type="button"
                onClick={handleGoBack}
              >
                <Box paddingInline="1000">
                  <InlineStack gap="300">
                    <RayStartArrowIcon />{" "}
                    <span style={{ color: "black", fontWeight: "bold" }}>
                      {" "}
                      Back
                    </span>
                  </InlineStack>
                </Box>
              </button>

              <button
                disabled={isSubmitting}
                className="next-large-btn"
                type="submit"
              >
                <Box paddingInline="1000">
                  <InlineStack gap="300" blockAlign="center">
                    {isSubmitting && (
                      <img
                        width="22"
                        height="22"
                        src="/assets/loading/ic_loading_gray.svg"
                      />
                    )}
                    <span style={{ color: "white", fontWeight: "bold" }}>
                      {isEditing ? "Update" : "Save"}
                    </span>
                    {!isSubmitting && <BiSaveIcon />}
                  </InlineStack>
                </Box>
              </button>
            </InlineStack>
          </Box>
        </SpacingBackground>
      </Form>
    </>
  );
}
