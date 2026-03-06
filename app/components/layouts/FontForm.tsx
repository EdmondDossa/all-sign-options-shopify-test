import { useCallback, useEffect, useMemo, useState } from "react";
import SpacingBackground from "./SpacingBackground";
import {
  Autocomplete,
  Box,
  Divider,
  Grid,
  Icon,
  IndexTableSelectionType,
  InlineStack,
  Select,
  Text,
  TextField,
} from "@shopify/polaris";
import { SearchIcon } from "@shopify/polaris-icons";
import { HelpLink, ToggleButton } from "../buttons";
import { BiSaveIcon, NextLtrIcon, RayStartArrowIcon } from "../icons";
import { Controller, set, useForm } from "react-hook-form";
import { Form, useLoaderData, useNavigation } from "@remix-run/react";
import { LoaderFunction, json } from "@remix-run/node";
import ImageCardWithDeleteButton from "../cards/ImageCardWithDeleteButton";
import { FileInput, MultiCombobox } from "../inputs";
import { FileUploader } from "~/routes/app.upload";
import { fileUrl } from "~/utils/fileUrl";

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

export interface AdvancedFont {
  id: number | null;
  label: string;
  url: string;
  previewImg: string;
  pricing: number;
  isDefault: boolean;
  minHeightFontChar: {
    smallLetter: number;
    uppercaseLetter: number;
  };
  lineHeight: {
    type: string;
    value: number;
    calculHeight: number;
  };
  isGoogleFont: boolean;
}

export interface FixedFont {
  id: number | null;
  label: string;
  url: string;
  pricing: number;
  previewImg: string;
  isDefault: boolean;
  limitFont: number[];
  lineHeight: {
    type: string;
    value: number;
    calculHeight: number;
  };
  isGoogleFont: boolean;
}

interface Props {
  font?: FixedFont | AdvancedFont;
  pricings: any[];
  sizes: any[];
  googleFonts: any[];
  isEditing?: boolean;
  pricingMode: string;
  onChange?: (font: FixedFont | AdvancedFont) => void;
  onSubmit: (font: FixedFont | AdvancedFont) => void;
  onClose: () => void;
}

export default function FontForm({
  font,
  pricingMode,
  pricings,
  sizes,
  googleFonts,
  onChange,
  onSubmit,
  onClose,
  isEditing = false,
}: Props) {
  const fontWithRightType =
    pricingMode == "advanced"
      ? {
          id: null,
          label: "",
          url: "",
          previewImg: "",
          pricing: 0,
          isDefault: true,
          minHeightFontChar: {
            smallLetter: 6,
            uppercaseLetter: 10,
          },
          lineHeight: {
            type: "normal",
            value: 1,
            calculHeight: 0,
          },
          isGoogleFont: true,
        }
      : {
          id: null,
          label: "",
          url: "",
          pricing: 0,
          previewImg: "",
          isDefault: true,
          limitFont: [],
          lineHeight: {
            type: "normal",
            value: 1,
            calculHeight: 0,
          },
          isGoogleFont: true,
        };

  const defaultSize: FixedFont | AdvancedFont = isEditing
    ? (font as FixedFont | AdvancedFont)
    : fontWithRightType;
  const [hasError, setHasError] = useState(false);
  const [selectedGoogleFont, setSelectedGoogleFont] = useState<any>(null);
  const [selectedGoogleFontVariant, setSelectedGoogleFontVariant] =
    useState<string>("");

  const handleGoBack = () => {
    onClose();
  };

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isValid },
    watch,
    setValue,
    getValues,
    trigger,
  } = useForm<FixedFont | AdvancedFont>({
    defaultValues: defaultSize,
    mode: "onChange", // Active la validation au changement
  });

  const navigation = useNavigation();
  let isSubmitting = navigation.state == "submitting";
  const SelectedGoogleType = watch("isGoogleFont");
  const selectedLineType = watch("lineHeight.type");
  const selectedPreviewImage = watch("previewImg");
  const selectFontUrl = watch("url");

  const onInternalSubmit = (data: FixedFont | AdvancedFont) => {
    try {
      onSubmit(data);
    } catch (e) {
      console.error("Error submitting form:", e);
    }
  };

  const [googleFontsList, setGoogleFontsList] = useState<any[]>([]);

  const deselectedOptions = useMemo(
    () =>
      googleFonts?.map((font: any, index: number) => ({
        label: font.family,
        value: index.toString(),
      })),
    [googleFonts],
  );

  const [searchGoogleFontValue, setSearchGoogleFontValue] = useState("");

  const updateText = useCallback(
    (value: string) => {
      setSearchGoogleFontValue(value);

      if (value === "") {
        setGoogleFontsList(deselectedOptions);
        return;
      }

      const filterRegex = new RegExp(value, "i");
      const resultOptions = deselectedOptions.filter((option) =>
        option.label.match(filterRegex),
      );
      setGoogleFontsList(resultOptions);
    },
    [deselectedOptions],
  );

  const updateSelection = useCallback(
    (selected: string[]) => {
      const selectedValue = selected.map((selectedItem) => {
        const matchedOption = googleFontsList.find((option) => {
          return option.value === selectedItem;
        });
        return matchedOption && matchedOption.label;
      });
      setSearchGoogleFontValue(selectedValue[0]);
      const selectedFont = googleFonts[Number(selected[0])] || null;
      if (selectedFont) {
        setSelectedGoogleFont(selectedFont);
        setSelectedGoogleFontVariant(selectedFont.variants[0]);
        setValue("url", selectedFont.files[selectedFont.variants[0]]);
        if (getValues("label") == "") {
          setValue("label", selectedFont.family);
        }
      } else {
        setSelectedGoogleFontVariant("");
        setSelectedGoogleFont(null);
      }
    },
    [googleFontsList, googleFonts, selectedGoogleFontVariant],
  );

  const googleFontsTextField = (
    <Autocomplete.TextField
      label="Search Google Fonts"
      onChange={updateText}
      value={searchGoogleFontValue}
      prefix={<Icon source={SearchIcon} />}
      placeholder="Search"
      autoComplete="off"
    />
  );

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
              Fonts <NextLtrIcon width={6} height={10} />{" "}
              {isEditing ? "Edit Font" : "Add new Font"}
            </Text>
          </Box>
          <InlineStack gap="300" align="center">
            <HelpLink
              url="https://docs.signsdesigner.us/docs/ncpc-documentation/configurations-9624/adding-fonts-9726/"
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
              <Box padding="100" />
              <InlineStack gap="200">
                <Controller
                  name="isGoogleFont"
                  control={control}
                  render={({ field }) => (
                    <>
                      <Text as="span">Use Google Font</Text>
                      <ToggleButton
                        id="use-googleFont"
                        type="radio"
                        checked={field.value}
                        value={true}
                        name="fontType"
                        onChange={(val) => {
                          field.onChange(val);
                        }}
                      />
                    </>
                  )}
                />
                <Controller
                  name="isGoogleFont"
                  control={control}
                  render={({ field }) => (
                    <>
                      <Text as="span">Upload Your Own</Text>
                      <ToggleButton
                        id="upload-own"
                        type="radio"
                        name="fontType"
                        checked={!field.value}
                        value={false}
                        onChange={(val) => field.onChange(val)}
                      />
                    </>
                  )}
                />
              </InlineStack>
              {SelectedGoogleType && (
                <>
                  <Box paddingBlock="200">
                    <Autocomplete
                      options={googleFontsList}
                      selected={[font?.label || ""]}
                      onSelect={updateSelection}
                      textField={googleFontsTextField}
                    />
                  </Box>
                </>
              )}
              {SelectedGoogleType && selectedGoogleFont && (
                <>
                  <Select
                    label="Choose font variant(Required)"
                    options={selectedGoogleFont.variants.map(
                      (variant: any) => ({
                        label: variant,
                        value: variant,
                      }),
                    )}
                    onChange={(value) => {
                      setSelectedGoogleFontVariant(value);
                      setValue("url", selectedGoogleFont.files[value]);
                      if (getValues("label") == "") {
                        setValue("label", selectedGoogleFont.family);
                      }
                    }}
                  />
                </>
              )}
              <Box padding="100" />
              <Controller
                name="label"
                control={control}
                rules={{ required: "This field is required" }}
                render={({ field }) => (
                  <TextField
                    label="Label"
                    value={field.value}
                    onChange={field.onChange}
                    autoComplete="on"
                    error={errors.label?.message}
                  />
                )}
              />
              {!SelectedGoogleType && (
                <>
                  <Box padding="100" />
                  <Text as="h6" variant="headingMd">
                    Upload font
                  </Text>
                  <Text as="h6" variant="headingMd">
                    .ttf Font File Type (Required)
                  </Text>
                  <FileInput
                    type="font"
                    path={selectFontUrl}
                    handlePath={(files: any) => {
                      if (files?.trim() !== "") {
                        setValue("url", files);
                      }
                    }}
                  />
                  <Box padding="100" />
                </>
              )}
            </Box>
            <Box padding="200">
              <Box padding="150" />
              <Text as="h6" variant="bodyMd">
                Font Preview Image
              </Text>
              <Box padding="100" />
              <InlineStack gap="300">
                <FileUploader
                  type={"image"}
                  setFilesData={(files: any) => {
                    if (files?.trim() !== "") {
                      setValue("previewImg", files);
                    }
                  }}
                  title={"Upload Font Preview Image"}
                >
                  <button
                    disabled={isSubmitting}
                    type="button"
                    className="next-large-btn"
                  >
                    <Box paddingInline="1000">
                      <InlineStack gap="300" blockAlign="center">
                        <span style={{ color: "white", fontWeight: "bold" }}>
                          Choose font image
                        </span>
                        {!isSubmitting && <BiSaveIcon />}
                      </InlineStack>
                    </Box>
                  </button>
                </FileUploader>
                <ImageCardWithDeleteButton
                  imageSrc={fileUrl(selectedPreviewImage)}
                  onDelete={() => {
                    setValue("previewImg", "");
                  }}
                />
              </InlineStack>
            </Box>
            <Box padding="200">
              <Box padding="150" />
              <Text as="h6" variant="bodyMd">
                Pricing
              </Text>
              <Box padding="100" />
              <Controller
                name="pricing"
                control={control}
                rules={{ required: "This field is required" }}
                render={({ field }) => (
                  <Select
                    label="Pricing"
                    options={pricings?.map((pricing: any, index: number) => ({
                      label: pricing.label,
                      value: index.toString(),
                    }))}
                    onChange={(val) => {
                      field.onChange(Number(val));
                    }}
                    value={field.value.toString()}
                    error={errors.label?.message}
                  />
                )}
              />
              <Box padding="100" />
              {pricingMode !== "advanced" && (
                <>
                  <Controller
                    name="limitFont"
                    control={control}
                    render={({ field }) => (
                      <>
                        <MultiCombobox
                          label={
                            "Limit this font to a size and above (optional)"
                          }
                          placeholder={"Select Sizes"}
                          data={sizes?.map((size: any, index: number) => ({
                            label: size.label,
                            value: index,
                          }))}
                          selectedOptions={field.value}
                          setSelectedOptions={(data: any) => {
                            if (data) {
                              field.onChange(data);
                            }
                          }}
                        />
                      </>
                    )}
                  />
                  <Box padding="100" />
                </>
              )}
              {pricingMode == "advanced" && (
                <Grid
                  gap={{ lg: "30px" }}
                  columns={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}
                >
                  <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 3, xl: 3 }}>
                    <Controller
                      name="minHeightFontChar.smallLetter"
                      control={control}
                      rules={{ required: "This field is required" }}
                      render={({ field }) => (
                        <TextField
                          label="Minimum height for smallest letter"
                          helpText="The minimum height for smallest letter in centimeter (cm)."
                          value={field.value.toString()}
                          onChange={(val) => field.onChange(Number(val))}
                          autoComplete="off"
                          error={errors.label?.message}
                        />
                      )}
                    />
                  </Grid.Cell>
                  <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 3, xl: 3 }}>
                    <Controller
                      name="minHeightFontChar.uppercaseLetter"
                      control={control}
                      rules={{ required: "This field is required" }}
                      render={({ field }) => (
                        <TextField
                          label="The minimum height for uppercase letter in centimeter"
                          helpText="The minimum height for uppercase letter in centimeter (cm)."
                          value={field.value.toString()}
                          onChange={(val) => field.onChange(Number(val))}
                          autoComplete="off"
                          error={errors.label?.message}
                        />
                      )}
                    />
                  </Grid.Cell>
                </Grid>
              )}
            </Box>
            <Box paddingInline="300" paddingBlock="100">
              <Text as="h6" variant="headingMd">
                Font Style
              </Text>
              <Text as="h6" variant="bodySm">
                Line Height
              </Text>
              <Box padding="100" />
              <InlineStack gap="200">
                <Controller
                  name="lineHeight.type"
                  control={control}
                  render={({ field }) => (
                    <>
                      <Text as="span">Normal(default)</Text>
                      <ToggleButton
                        id="lineHeight1"
                        type="radio"
                        checked={field.value == "normal"}
                        value={"normal"}
                        name="lineHeight"
                        onChange={(val) => {
                          field.onChange(val);
                        }}
                      />
                    </>
                  )}
                />
                <Controller
                  name="lineHeight.type"
                  control={control}
                  render={({ field }) => (
                    <>
                      <Text as="span">Specific Line Height</Text>
                      <ToggleButton
                        id="lineHeight2"
                        type="radio"
                        checked={field.value == "custom"}
                        value={"custom"}
                        name="lineHeight"
                        onChange={(val) => {
                          field.onChange(val);
                        }}
                      />
                    </>
                  )}
                />
              </InlineStack>
              <Box padding="100" />
              {selectedLineType == "custom" && (
                <Grid
                  gap={{ lg: "30px" }}
                  columns={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}
                >
                  <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 3, xl: 3 }}>
                    <Controller
                      name="lineHeight.value"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          label=""
                          type="number"
                          value={field.value.toString()}
                          helpText="Adjust the space between each new line of text for this font in the configurator"
                          autoComplete="off"
                          onChange={(val) => {
                            field.onChange(Number(val));
                          }}
                        />
                      )}
                    />
                  </Grid.Cell>
                  <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 3, xl: 3 }}>
                    <Controller
                      name="lineHeight.calculHeight"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          label=""
                          type="number"
                          suffix="cm"
                          value={field.value.toString()}
                          helpText="Adjust the space between each new line of text for this font in the height calculation."
                          autoComplete="off"
                          onChange={(val) => {
                            field.onChange(Number(val));
                          }}
                        />
                      )}
                    />
                  </Grid.Cell>
                </Grid>
              )}
            </Box>
          </SpacingBackground>
        </Box>

        <SpacingBackground
          backgroundColor="#F9F9F9"
          position="relative"
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
