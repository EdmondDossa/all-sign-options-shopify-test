import { useEffect, useState } from "react";
import SpacingBackground from "./SpacingBackground";
import {
  Box,
  Divider,
  Grid,
  InlineStack,
  Select,
  Text,
  TextField,
} from "@shopify/polaris";
import { HelpLink, ToggleButton } from "../buttons";
import { BiSaveIcon, NextLtrIcon, RayStartArrowIcon } from "../icons";
import { Controller, set, useForm } from "react-hook-form";
import { Form, useNavigation } from "@remix-run/react";
import { AdditionalPriceType } from "~/types/ConfigDataType";
import AdditionalPriceLayout from "./AdditionalPriceLayout";
import UploaderLayout from "./UploderLayout";
import { MultiCombobox, TextColorField } from "../inputs";

interface Props {
  backboardColor?: BackboardColorType;
  isEditing?: boolean;
  backboards: any[];
  currencySymbol?: string;
  onChange?: (backboardColor: BackboardColorType) => void;
  onSubmit: (backboardColor: BackboardColorType) => void;
  onClose: () => void;
}
export interface BackboardColorType {
  id?: number;
  label: string;
  color: string;
  backboardColorVisualization: boolean;
  backboards: number[];
  layers: string[];
  minWidth: number;
  minHeight: number;
  visibilityRule: "one-of-two" | "both";
  previewImg: string;
  popupImg: string;
  pattern: string;
  usePattern: boolean;
  price: AdditionalPriceType;
}

export default function BackboardColorForm({
  backboardColor,
  currencySymbol,
  backboards,
  onChange,
  onSubmit,
  onClose,
  isEditing = false,
}: Props) {
  const defaultSize: BackboardColorType | any = isEditing
    ? backboardColor
    : {
        label: "",
        color: "#000000",
        backboardColorVisualization: true,
        backboards: [],
        layers: [],
        minWidth: 0,
        minHeight: 0,
        visibilityRule: "one-of-two",
        previewImg: "",
        popupImg: "",
        pattern: "",
        usePattern: false,
        price: {
          type: "none",
          value: 0,
        },
      };

  const [hasError, setHasError] = useState(false);
  const [layers, setLayers] = useState<any>([]);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isValid },
    trigger,
    watch,
    getValues,
    setValue,
  } = useForm<BackboardColorType>({
    defaultValues: defaultSize,
    mode: "onChange",
  });

  const navigation = useNavigation();
  let isSubmitting = navigation.state == "submitting";

  // Watch pour la sélection des backboards
  const selectedBackboards = watch("backboards");
  const selectedLayers = watch("layers");

  // Fonction pour calculer les layers disponibles
  const calculateAvailableLayers = (selectedBackboardIndexes: number[]) => {
    const layersAt: any = [];

    selectedBackboardIndexes.forEach((backboardIndex) => {
      const backboard = backboards[backboardIndex];
      if (backboard) {
        // Correction du typo: backboardLenght -> backboardLength
        if (backboard.backboardLength?.layers?.activate) {
          backboard.backboardLength.layers.options.forEach(
            (layer: any, layerIndex: number) => {
              layersAt.push({
                label: `${backboard.label} - ${layer.label}`,
                value: `${backboardIndex}/${layerIndex}`,
              });
            },
          );
        }
      }
    });

    return layersAt;
  };

  // Effect pour mettre à jour les layers quand la sélection des backboards change
  useEffect(() => {
    const availableLayers = calculateAvailableLayers(selectedBackboards || []);
    setLayers(availableLayers);

    // Filtrer les layers sélectionnés pour ne garder que ceux qui sont encore disponibles
    if (selectedLayers && selectedLayers.length > 0) {
      const availableLayerValues = availableLayers.map(
        (layer: any) => layer.value,
      );
      const filteredLayers = selectedLayers.filter((layerValue) =>
        availableLayerValues.includes(layerValue),
      );

      // Si certains layers ne sont plus disponibles, mettre à jour la sélection
      if (filteredLayers.length !== selectedLayers.length) {
        setValue("layers", filteredLayers);
      }
    }
  }, [selectedBackboards, backboards, setValue]);

  // Surveille les erreurs et met à jour l'état hasError
  useEffect(() => {
    const errorCount = Object.keys(errors).length;
    setHasError(errorCount > 0);
  }, [errors]);

  const handleGoBack = () => {
    onClose();
  };

  const onInternalSubmit = (data: BackboardColorType) => {
    try {
      onSubmit(data);
    } catch (e) {
      console.error("Error submitting form:", e);
    }
  };

  return (
    <>
      <Box paddingInline="300" paddingBlock="200" background="bg-surface">
        <InlineStack gap="300" align="space-between">
          <Box padding="300" background="bg-surface">
            <Text as="p" variant="headingMd">
              Backboard Colors <NextLtrIcon width={6} height={10} />{" "}
              {isEditing ? "Edit Backboard Color" : "Add new Backboard Color"}
            </Text>
          </Box>
          <InlineStack gap="300" align="center">
            <HelpLink
              url="https://docs.signsdesigner.us/docs/ncpc-documentation/advanced-tips-and-tricks-9638/adding-jackets-9748/"
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
              </Grid>
            </Box>
            <Divider borderWidth="100" />
            <Box padding={"150"} />
            <Box padding="150">
              <Controller
                name="usePattern"
                control={control}
                render={({ field, fieldState }) => (
                  <>
                    <Text as="span" variant="bodyMd">
                      {"Use texture"}
                    </Text>
                    <Box as="span" padding="050" />
                    <ToggleButton
                      id={"pattern"}
                      checked={field.value}
                      onChange={(val) => {
                        field.onChange(val);
                      }}
                    />
                  </>
                )}
              />
              {!watch("usePattern") && (
                <Controller
                  name="color"
                  control={control}
                  render={({ field, fieldState }) => (
                    <TextColorField
                      label="color"
                      color={field.value}
                      setColor={(val) => field.onChange(val)}
                    />
                  )}
                />
              )}
              {watch("usePattern") && (
                <Controller
                  name="pattern"
                  control={control}
                  render={({ field, fieldState }) => (
                    <UploaderLayout
                      label=""
                      modalTitle="Please set BackBoard Color Pattern picture"
                      helperText="Texture Image - image fits the space of the backboard"
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
              )}
            </Box>
            <Box padding={"150"} />
            <Divider borderWidth="100" />
            <Box padding={"150"} />
            <Box padding="150">
              <Controller
                name="backboards"
                control={control}
                rules={{
                  validate: (value) => {
                    if (layers.length > 0 && (!value || value.length === 0)) {
                      return "You must select at least one layer when layers are available";
                    }
                    return true;
                  },
                }}
                render={({ field, fieldState }) => (
                  <MultiCombobox
                    label={"Sign backboard visualization"}
                    placeholder="Select backboards"
                    helpText="Select the backboard that this backboards option will NOT be available for."
                    data={backboards.map((color: any, index: number) => ({
                      label: color.label,
                      value: index,
                    }))}
                    selectedOptions={field.value || []}
                    setSelectedOptions={(val: any) => {
                      field.onChange(val);
                    }}
                    error={fieldState.error?.message}
                  />
                )}
              />
              {layers.length > 0 && (
                <Controller
                  name="layers"
                  control={control}
                  render={({ field }) => (
                    <MultiCombobox
                      label={"Assign to a layer"}
                      placeholder="Select layer"
                      helpText="Select the backboard layers that this colors option will NOT be available for."
                      data={layers}
                      selectedOptions={field.value || []}
                      setSelectedOptions={field.onChange}
                    />
                  )}
                />
              )}
            </Box>
            <Box padding={"150"} />
            <Divider borderWidth="100" />
            <Box padding="150">
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
            <Box padding={"150"} />
            <Box padding="150">
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
                        helperText="Upload an image to display the jacket. Adding an image will replace the preview color."
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
            <Box padding="150">
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
