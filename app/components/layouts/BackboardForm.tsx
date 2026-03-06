import React, { useEffect, useState } from "react";
import SpacingBackground from "./SpacingBackground";
import {
  Box,
  Button,
  Divider,
  Grid,
  InlineStack,
  Select,
  Text,
  TextField,
} from "@shopify/polaris";
import { HelpLink, ToggleButton } from "../buttons";
import { BiSaveIcon, NextLtrIcon, RayStartArrowIcon } from "../icons";
import { Controller, useForm } from "react-hook-form";
import { Form, useNavigation } from "@remix-run/react";
import { AdditionalPriceType } from "~/types/ConfigDataType";
import AdditionalPriceLayout from "./AdditionalPriceLayout";
import UploaderLayout from "./UploderLayout";
import { MultiCombobox } from "../inputs";

interface Props {
  backboard?: BackboardType;
  productType: string;
  isEditing?: boolean;
  currencySymbol?: string;
  onChange?: (backboard: BackboardType) => void;
  onSubmit: (backboard: BackboardType) => void;
  onClose: () => void;
}
export interface LayerOption {
  label: string;
  description: string;
  length: number;
}

export interface BackboardLength {
  shapeLength: number;
  layers: {
    activate: boolean;
    options: LayerOption[];
  };
}

export interface BackboardType {
  id?: number;
  label: string;
  type:
    | "none"
    | "board"
    | "box"
    | "stand"
    | "raceway-double"
    | "raceway-one"
    | "cut-to-shape"
    | "cut-to-letter"
    | "custom-shape";
  description: string;
  customShapeFile: string;
  backboardLength: BackboardLength;
  popupImg: string;
  previewImg: string;
  isDefault: boolean;
  price: AdditionalPriceType;
}

export default function BackboardForm({
  backboard,
  currencySymbol,
  productType,
  onChange,
  onSubmit,
  onClose,
  isEditing = false,
}: Props) {
  // Préparer une structure de backboardLength par défaut
  const defaultBackboardLength = {
    shapeLength: 0,
    layers: {
      activate: false,
      options: [
        {
          label: "",
          description: "",
          length: 0,
        },
      ],
    },
  };

  // Si on est en mode édition et que backboard existe, on s'assure que backboardLength existe
  const editingBackboard =
    isEditing && backboard
      ? {
          ...backboard,
          backboardLength: backboard.backboardLength || defaultBackboardLength,
        }
      : null;

  const defaultSize: BackboardType | any = editingBackboard || {
    id: null,
    label: "",
    description: "",
    popupImg: "",
    previewImg: "",
    type: "none",
    backboardLength: defaultBackboardLength,
    isDefault: false,
    price: {
      type: "none",
      value: 0,
    },
  };

  const [hasError, setHasError] = useState(false);

  const Types = [
    { label: "None", value: "none" },
    { label: "Board", value: "board" },
    { label: "Box", value: "box" },
    { label: "Stand", value: "stand" },
    ...(productType === "channel"
      ? [
          { label: "Raceway Double", value: "raceway-double" },
          { label: "Raceway One", value: "raceway-one" },
        ]
      : []),
    { label: "Cut to shape", value: "cut-to-shape" },
    { label: "Cut to letter", value: "cut-to-letter" },
    { label: "Custom shape", value: "custom-shape" },
  ];

  const handleGoBack = () => {
    onClose();
  };

  const [layers, setLayers] = useState([
    {
      label: "",
      description: "",
      length: 0,
    },
  ]);

  const removeLayer = (index: number) => {
    const currentOptions = [...(watch("backboardLength.layers.options") || [])];
    if (index >= 0 && index < currentOptions.length) {
      currentOptions.splice(index, 1);
      setValue("backboardLength.layers.options", currentOptions);
    }
  };

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isValid },
    trigger,
    watch,
    setValue,
    getValues,
  } = useForm<BackboardType>({
    defaultValues: defaultSize,
    mode: "onChange", // Active la validation au changement
  });

  // Initialiser la structure backboardLength si nécessaire
  useEffect(() => {
    const currentValues = getValues();
    if (!currentValues.backboardLength) {
      setValue("backboardLength", defaultBackboardLength);
    } else if (!currentValues.backboardLength.layers) {
      setValue("backboardLength.layers", defaultBackboardLength.layers);
    } else if (!Array.isArray(currentValues.backboardLength.layers.options)) {
      setValue(
        "backboardLength.layers.options",
        defaultBackboardLength.layers.options,
      );
    }
  }, []);

  const navigation = useNavigation();
  let isSubmitting = navigation.state == "submitting";

  const handleMultiLayersChange = () => {};

  const onInternalSubmit = (data: BackboardType) => {
    try {
      // Assurez-vous que backboardLength existe avant de soumettre
      const submittingData = {
        ...data,
        backboardLength: data.backboardLength || defaultBackboardLength,
      };
      onSubmit(submittingData);
    } catch (e) {
      console.error("Error submitting form:", e);
    }
  };

  // Surveille les erreurs et met à jour l'état hasError
  useEffect(() => {
    const errorCount = Object.keys(errors).length;
    setHasError(errorCount > 0);
  }, [errors]);

  return (
    <>
      <Box paddingInline="300" paddingBlock="200" background="bg-surface">
        <InlineStack gap="300" align="space-between">
          <Box padding="300" background="bg-surface">
            <Text as="p" variant="headingMd">
              Backboards <NextLtrIcon width={6} height={10} />{" "}
              {isEditing ? "Edit Backboard" : "Add new Backboard"}
            </Text>
          </Box>
          <InlineStack gap="300" align="center">
            <HelpLink
              url="https://docs.signsdesigner.us/docs/ncpc-documentation/advanced-tips-and-tricks-9638/adding-backboard-colors-9731/"
              text="Get Help"
            />
          </InlineStack>
        </InlineStack>
      </Box>

      <Divider />

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
                        helpText=""
                        value={field.value}
                        onChange={field.onChange}
                        autoComplete="on"
                        error={fieldState.error?.message}
                      />
                    )}
                  />
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 3, xl: 3 }}>
                  <Controller
                    name="description"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        label="Description"
                        helpText=""
                        value={field.value}
                        onChange={(value) => field.onChange(value)}
                        autoComplete="on"
                      />
                    )}
                  />
                </Grid.Cell>
              </Grid>
            </Box>
            <Divider borderWidth="100" />
            <Box padding="150">
              <Text as="h6" variant="headingMd">
                Sign backboard visualization
              </Text>
              <Controller
                name="type"
                control={control}
                render={({ field }) => (
                  <Select
                    label="Backboard type - Select how your backboard will display on the customer facing visualizer."
                    helpText=""
                    options={Types}
                    onChange={(value) => {
                      field.onChange(value);
                    }}
                    value={field.value}
                  />
                )}
              />
            </Box>
            {watch("type").includes("cut-to") && (
              <Controller
                name="backboardLength.layers.activate"
                control={control}
                render={({ field }) => (
                  <Box padding="150">
                    <Text as="span" variant="bodyMd">
                      Enable Multi-layer Backboard
                    </Text>
                    <Box as="span" padding="050" />
                    <ToggleButton
                      id="multi-layer"
                      checked={field.value}
                      onChange={(value) => {
                        field.onChange(value);
                      }}
                    />
                    <Text as="p">
                      Show backboards with multiple layers, works best with 2D
                      channel letters.
                    </Text>
                  </Box>
                )}
              />
            )}
            {watch("type").includes("cut-to") &&
              !watch("backboardLength.layers.activate") && (
                <Box padding="150">
                  <Text as="h6" variant="headingMd">
                    Backboard Length
                  </Text>
                  <Controller
                    name="backboardLength.shapeLength"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        label="Backboard length from letter"
                        helpText="Display how much of the backboard extends from the letter on the visualizer."
                        type="number"
                        value={field?.value?.toString() || "0"}
                        suffix="px"
                        onChange={(value) => {
                          field.onChange(value);
                        }}
                        autoComplete="off"
                      />
                    )}
                  />
                </Box>
              )}
            {watch("type").includes("cut-to") &&
              watch("backboardLength.layers.activate") && (
                <Box padding="150">
                  {Array.isArray(watch("backboardLength.layers.options")) &&
                    watch("backboardLength.layers.options").map(
                      (layer, index) => (
                        <React.Fragment key={index}>
                          <Controller
                            name={`backboardLength.layers.options.${index}.label`}
                            control={control}
                            rules={{ required: "This field is required" }}
                            render={({ field, fieldState }) => (
                              <TextField
                                label="Label"
                                value={field?.value || ""}
                                onChange={(value) => {
                                  field.onChange(value);
                                }}
                                autoComplete="off"
                                error={fieldState.error?.message}
                              />
                            )}
                          />
                          <Controller
                            name={`backboardLength.layers.options.${index}.description`}
                            control={control}
                            render={({ field }) => (
                              <TextField
                                label="Description"
                                value={field?.value || ""}
                                onChange={(value) => {
                                  field.onChange(value);
                                }}
                                autoComplete="off"
                              />
                            )}
                          />
                          <Controller
                            name={`backboardLength.layers.options.${index}.length`}
                            control={control}
                            rules={{
                              required: "This field is required",
                              min: {
                                value: 0,
                                message: "Length must be at least 0",
                              },
                              validate: (value) => {
                                const previousValues = getValues();
                                const previousValue =
                                  previousValues?.backboardLength.layers
                                    ?.options?.[index - 1]?.length;

                                if (index > 0 && previousValue !== undefined) {
                                  return (
                                    Number(value) > previousValue ||
                                    `The value most be greater than ${previousValue}`
                                  );
                                }

                                return true;
                              },
                            }}
                            render={({ field, fieldState }) => (
                              <TextField
                                label="Length"
                                type="number"
                                helpText="Display how much of the backboard extends from the letter on the visualizer."
                                value={field?.value?.toString() || "0"}
                                suffix="px"
                                onChange={(value) => {
                                  field.onChange(value);
                                }}
                                min={0}
                                autoComplete="off"
                                error={fieldState.error?.message}
                              />
                            )}
                          />
                          <Box padding="150" />
                          <InlineStack align="end">
                            {watch("backboardLength.layers.options").length >
                              1 && (
                              <Button
                                variant="primary"
                                tone="critical"
                                onClick={() => {
                                  const currentOptions = [
                                    ...watch("backboardLength.layers.options"),
                                  ];
                                  currentOptions.splice(index, 1);
                                  setValue(
                                    "backboardLength.layers.options",
                                    currentOptions,
                                  );
                                }}
                              >
                                Remove Layer
                              </Button>
                            )}
                            <Box as="span" padding="100" />
                            {index ===
                              (watch("backboardLength.layers.options") || [])
                                .length -
                                1 && (
                              <Button
                                onClick={() => {
                                  const currentOptions =
                                    watch("backboardLength.layers.options") ||
                                    [];
                                  setValue("backboardLength.layers.options", [
                                    ...currentOptions,
                                    {
                                      label: "",
                                      description: "",
                                      length: 0,
                                    },
                                  ]);
                                }}
                              >
                                Add Layer
                              </Button>
                            )}
                          </InlineStack>
                        </React.Fragment>
                      ),
                    )}
                </Box>
              )}
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
                        helperText="Upload an image to display the backboard. Adding an image will replace the preview color."
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
            <Divider borderWidth="100" />
            <Box padding={"150"} />
            <Box>
              <AdditionalPriceLayout
                headerText="Pricing (optional)"
                currencySymbol={currencySymbol}
                type={watch("price.type")}
                value={watch("price.value")}
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
          </SpacingBackground>
        </Box>

        <SpacingBackground
          backgroundColor="#F9F9F9"
          position="sticky"
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
