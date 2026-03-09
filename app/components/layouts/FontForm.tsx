import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Autocomplete,
  Banner,
  Box,
  Button,
  Card,
  Divider,
  Grid,
  Icon,
  InlineStack,
  Select,
  Text,
  TextField,
} from "@shopify/polaris";
import { SearchIcon } from "@shopify/polaris-icons";
import { HelpLink, ToggleButton } from "../buttons";
import { Controller, useForm } from "react-hook-form";
import { Form, useNavigation } from "@remix-run/react";
import { FileInput, MultiCombobox } from "../inputs";
import UploaderLayout from "./UploderLayout";

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
  managedFontId?: number | null;
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
  managedFontId?: number | null;
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
  managedFonts: Array<{
    id: number;
    label: string;
    url: string;
    isGoogleFont: boolean;
  }>;
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
  managedFonts,
  onChange,
  onSubmit,
  onClose,
  isEditing = false,
}: Props) {
  const fontWithRightType =
    pricingMode == "advanced"
      ? {
          id: null,
          managedFontId: null,
          label: "",
          url: "",
          previewImg: "",
          pricing: 0,
          isDefault: false,
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
          managedFontId: null,
          label: "",
          url: "",
          pricing: 0,
          previewImg: "",
          isDefault: false,
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
  const [selectedGoogleFont, setSelectedGoogleFont] = useState<any>(null);
  const [selectedGoogleFontVariant, setSelectedGoogleFontVariant] =
    useState<string>("");

  const handleGoBack = () => {
    onClose();
  };

  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
    setValue,
    getValues,
  } = useForm<FixedFont | AdvancedFont>({
    defaultValues: defaultSize,
    mode: "onChange", // Active la validation au changement
  });

  const navigation = useNavigation();
  let isSubmitting = navigation.state == "submitting";
  const SelectedGoogleType = watch("isGoogleFont");
  const selectedLineType = watch("lineHeight.type");
  const selectFontUrl = watch("url");

  const onInternalSubmit = (data: FixedFont | AdvancedFont) => {
    try {
      onSubmit(data);
    } catch (e) {
      console.error("Error submitting form:", e);
    }
  };

  const [googleFontsList, setGoogleFontsList] = useState<any[]>([]);
  const [managedFontMode, setManagedFontMode] = useState<"existing" | "custom">(
    "existing",
  );
  const [managedFontSearchValue, setManagedFontSearchValue] = useState("");
  const allManagedFontOptions = useMemo(
    () =>
      managedFonts.map((managedFont) => ({
        label: `${managedFont.label} (${managedFont.isGoogleFont ? "Google" : "Uploaded"})`,
        value: String(managedFont.id),
      })),
    [managedFonts],
  );
  const [managedFontList, setManagedFontList] = useState<any[]>([]);

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
        setValue("managedFontId", null);
        if (getValues("label") == "") {
          setValue("label", String(selectedFont.family || "").trim());
        }
      } else {
        setSelectedGoogleFontVariant("");
        setSelectedGoogleFont(null);
      }
    },
    [googleFontsList, googleFonts, getValues, setValue],
  );

  const applyManagedFont = useCallback(
    (fontId: number | null) => {
      if (fontId == null) {
        setValue("managedFontId", null);
        return;
      }

      const matched = managedFonts.find((fontRow) => fontRow.id === fontId);
      if (!matched) return;

      setValue("managedFontId", matched.id);
      setValue("label", String(matched.label || "").trim());
      setValue("url", matched.url);
      setValue("isGoogleFont", !!matched.isGoogleFont);
      setSearchGoogleFontValue(matched.isGoogleFont ? matched.label : "");

      if (matched.isGoogleFont) {
        const matchedGoogleFont = googleFonts.find(
          (googleFont: any) => String(googleFont.family) === matched.label,
        );
        if (matchedGoogleFont) {
          setSelectedGoogleFont(matchedGoogleFont);
          const initialVariant =
            Object.entries(matchedGoogleFont.files || {}).find(
              ([, fileUrl]) => fileUrl === matched.url,
            )?.[0] || matchedGoogleFont.variants?.[0] || "";
          setSelectedGoogleFontVariant(initialVariant);
        }
      } else {
        setSelectedGoogleFont(null);
        setSelectedGoogleFontVariant("");
      }
    },
    [googleFonts, managedFonts, setValue],
  );

  const updateManagedFontSearch = useCallback(
    (value: string) => {
      setManagedFontSearchValue(value);

      if (value.trim() === "") {
        setManagedFontList(allManagedFontOptions);
        return;
      }

      const filterRegex = new RegExp(value, "i");
      setManagedFontList(
        allManagedFontOptions.filter((option) => option.label.match(filterRegex)),
      );
    },
    [allManagedFontOptions],
  );

  const updateManagedFontSelection = useCallback(
    (selected: string[]) => {
      const selectedId = selected[0];
      const selectedOption = managedFontList.find(
        (option) => option.value === selectedId,
      );
      if (!selectedOption) return;

      setManagedFontSearchValue(selectedOption.label);
      setManagedFontMode("existing");
      applyManagedFont(Number(selectedOption.value));
    },
    [managedFontList, applyManagedFont],
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

  useEffect(() => {
    setGoogleFontsList(deselectedOptions);
  }, [deselectedOptions]);

  useEffect(() => {
    setManagedFontList(allManagedFontOptions);
  }, [allManagedFontOptions]);

  useEffect(() => {
    const matchingManagedFont = managedFonts.find(
      (managedFont) =>
        managedFont.url === defaultSize.url ||
        managedFont.label.toLowerCase() === String(defaultSize.label || "").toLowerCase(),
    );

    if (matchingManagedFont) {
      setValue("managedFontId", matchingManagedFont.id);
      setManagedFontMode("existing");
      setManagedFontSearchValue(
        `${matchingManagedFont.label} (${matchingManagedFont.isGoogleFont ? "Google" : "Uploaded"})`,
      );
    } else {
      setManagedFontSearchValue("");
    }
  }, [defaultSize.label, defaultSize.url, managedFonts, setValue]);

  const managedFontsTextField = (
    <Autocomplete.TextField
      label="Search existing font"
      onChange={updateManagedFontSearch}
      value={managedFontSearchValue}
      prefix={<Icon source={SearchIcon} />}
      placeholder="Search in Manage Fonts"
      autoComplete="off"
    />
  );

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <Card>
        <Box padding="300">
          <InlineStack gap="300" align="space-between" blockAlign="start">
            <div>
              <Text as="h3" variant="headingSm">
                {isEditing ? "Edit font" : "Add new font"}
              </Text>
              <Box paddingBlockStart="150" />
              <Text as="p" tone="subdued">
                Configure font source, preview and sizing behavior.
              </Text>
            </div>
            <HelpLink
              url="https://docs.signsdesigner.us/docs/ncpc-documentation/configurations-9624/adding-fonts-9726/"
              text="Get Help"
            />
          </InlineStack>
        </Box>
      </Card>

      <Form onSubmit={handleSubmit(onInternalSubmit)}>
        <div style={{ display: "grid", gap: 12 }}>
          <Card>
            <Box padding="300">
              <Banner tone="info">
                Any font added or updated here is automatically synchronized to Manage Fonts.
              </Banner>
              <Box paddingBlockStart="300" />
              <Text as="h3" variant="headingMd">
                Font Library
              </Text>
              <Box paddingBlockStart="150" />
              <div style={{ display: "grid", gap: 8 }}>
                <Box
                  borderColor="border"
                  borderWidth="025"
                  borderRadius="200"
                  padding="200"
                  background={managedFontMode === "existing" ? "bg-surface-active" : "bg-surface"}
                >
                  <InlineStack align="space-between" blockAlign="center">
                    <div>
                      <Text as="p" variant="headingSm">
                        Choose an existing font
                      </Text>
                      <Text as="p" tone="subdued">
                        Recommended to keep fonts centralized in Manage Fonts.
                      </Text>
                    </div>
                    <ToggleButton
                      id="managed-existing"
                      type="radio"
                      checked={managedFontMode === "existing"}
                      value={"existing"}
                      name="managedFontMode"
                      onChange={(val) => {
                        setManagedFontMode(String(val) as "existing" | "custom");
                      }}
                    />
                  </InlineStack>
                </Box>
                <Box
                  borderColor="border"
                  borderWidth="025"
                  borderRadius="200"
                  padding="200"
                  background={managedFontMode === "custom" ? "bg-surface-active" : "bg-surface"}
                >
                  <InlineStack align="space-between" blockAlign="center">
                    <div>
                      <Text as="p" variant="headingSm">
                        Create / upload a font
                      </Text>
                      <Text as="p" tone="subdued">
                        Add a new font here, then it will also be saved to Manage Fonts.
                      </Text>
                    </div>
                    <ToggleButton
                      id="managed-custom"
                      type="radio"
                      checked={managedFontMode === "custom"}
                      value={"custom"}
                      name="managedFontMode"
                      onChange={(val) => {
                        setManagedFontMode(String(val) as "existing" | "custom");
                        setValue("managedFontId", null);
                        applyManagedFont(null);
                      }}
                    />
                  </InlineStack>
                </Box>
              </div>

              {managedFontMode === "existing" && (
                <Box paddingBlockStart="250">
                  <Autocomplete
                    options={managedFontList}
                    selected={[]}
                    onSelect={updateManagedFontSelection}
                    textField={managedFontsTextField}
                  />
                  <Box paddingBlockStart="100" />
                  <Text as="p" tone="subdued">
                    Select a font already available in Manage Fonts.
                  </Text>
                </Box>
              )}

              {managedFontMode === "custom" && (
                <>
                  <Box paddingBlockStart="300" />
                  <Text as="h3" variant="headingMd">
                    Font Source
                  </Text>
                  <Box paddingBlockStart="150" />

                  <Controller
                    name="isGoogleFont"
                    control={control}
                    render={({ field }) => (
                      <div style={{ display: "grid", gap: 8 }}>
                        <Box
                          borderColor="border"
                          borderWidth="025"
                          borderRadius="200"
                          padding="200"
                          background={field.value ? "bg-surface-active" : "bg-surface"}
                        >
                          <InlineStack align="space-between" blockAlign="center">
                            <div>
                              <Text as="p" variant="headingSm">
                                Google Font
                              </Text>
                              <Text as="p" tone="subdued">
                                Search and import from the Google Fonts catalog.
                              </Text>
                            </div>
                            <ToggleButton
                              id="use-googleFont"
                              type="radio"
                              checked={field.value}
                              value={true}
                              name="fontType"
                              onChange={(val) => {
                                setValue("managedFontId", null);
                                setManagedFontMode("custom");
                                field.onChange(val);
                              }}
                            />
                          </InlineStack>
                        </Box>
                        <Box
                          borderColor="border"
                          borderWidth="025"
                          borderRadius="200"
                          padding="200"
                          background={!field.value ? "bg-surface-active" : "bg-surface"}
                        >
                          <InlineStack align="space-between" blockAlign="center">
                            <div>
                              <Text as="p" variant="headingSm">
                                Upload your own
                              </Text>
                              <Text as="p" tone="subdued">
                                Upload a local `.ttf` file and reuse it across configurations.
                              </Text>
                            </div>
                            <ToggleButton
                              id="upload-own"
                              type="radio"
                              checked={!field.value}
                              value={false}
                              name="fontType"
                              onChange={(val) => {
                                setValue("managedFontId", null);
                                setManagedFontMode("custom");
                                field.onChange(val);
                              }}
                            />
                          </InlineStack>
                        </Box>
                      </div>
                    )}
                  />
                </>
              )}

              {managedFontMode === "custom" && SelectedGoogleType && (
                <Box paddingBlockStart="300">
                  <Autocomplete
                    options={googleFontsList}
                    selected={[]}
                    onSelect={updateSelection}
                    textField={googleFontsTextField}
                  />
                </Box>
              )}

              {managedFontMode === "custom" && SelectedGoogleType && selectedGoogleFont && (
                <Box paddingBlockStart="300">
                  <Select
                    label="Choose font variant (Required)"
                    options={selectedGoogleFont.variants.map((variant: any) => ({
                      label: variant,
                      value: variant,
                    }))}
                    value={selectedGoogleFontVariant}
                    onChange={(value) => {
                      setSelectedGoogleFontVariant(value);
                      setValue("url", selectedGoogleFont.files[value]);
                      if (getValues("label") === "") {
                        setValue("label", String(selectedGoogleFont.family || "").trim());
                      }
                    }}
                  />
                </Box>
              )}

              <Box paddingBlockStart="300" />
              <Controller
                name="label"
                control={control}
                rules={{ required: "This field is required" }}
                render={({ field }) => (
                  <TextField
                    label="Label"
                    value={field.value}
                    onChange={(value) => {
                      setValue("managedFontId", null);
                      setManagedFontMode("custom");
                      field.onChange(value);
                    }}
                    autoComplete="off"
                    error={errors.label?.message}
                  />
                )}
              />

              {managedFontMode === "custom" && !SelectedGoogleType && (
                <Box paddingBlockStart="300">
                  <Text as="h3" variant="headingMd">
                    Upload Font
                  </Text>
                  <Box paddingBlockStart="100" />
                  <Text as="p" tone="subdued">
                    .ttf Font File Type (Required)
                  </Text>
                  <Box paddingBlockStart="200" />
                  <FileInput
                    type="font"
                    path={selectFontUrl}
                    handlePath={(files: any) => {
                      if (files?.trim() !== "") {
                        setValue("managedFontId", null);
                        setValue("url", files);
                      }
                    }}
                  />
                </Box>
              )}
            </Box>
          </Card>

          <Card>
            <Box padding="300">
              <Text as="h3" variant="headingMd">
                Font Preview Image
              </Text>
              <Controller
                name="previewImg"
                control={control}
                render={({ field }) => (
                  <UploaderLayout
                    label="Preview Image (optional)"
                    modalTitle="Upload Font Preview Image"
                    helperText="Choose an image to represent this font in the configurator."
                    buttonText="Choose font image"
                    fileType="image"
                    value={field.value}
                    isSubmitting={isSubmitting}
                    onChange={(val) => field.onChange(val)}
                  />
                )}
              />
            </Box>
          </Card>

          <Card>
            <Box padding="300">
              <Text as="h3" variant="headingMd">
                Pricing & Style
              </Text>
              <Box paddingBlockStart="200" />
              <Divider borderWidth="100" />
              <Box paddingBlockStart="200" />

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

              <Box paddingBlockStart="200" />
              {pricingMode !== "advanced" && (
                <Controller
                  name="limitFont"
                  control={control}
                  render={({ field }) => (
                    <MultiCombobox
                      label={"Limit this font to a size and above (optional)"}
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
                  )}
                />
              )}

              {pricingMode === "advanced" && (
                <Grid gap={{ lg: "30px" }} columns={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
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
                          label="Minimum height for uppercase letter"
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

              <Box paddingBlockStart="300" />
              <Divider borderWidth="100" />
              <Box paddingBlockStart="200" />
              <Text as="h3" variant="headingMd">
                Line Height
              </Text>
              <Box paddingBlockStart="150" />
              <InlineStack gap="400">
                <Controller
                  name="lineHeight.type"
                  control={control}
                  render={({ field }) => (
                    <>
                      <InlineStack gap="150" blockAlign="center">
                        <Text as="span">Normal (default)</Text>
                        <ToggleButton
                          id="lineHeight1"
                          type="radio"
                          checked={field.value === "normal"}
                          value={"normal"}
                          name="lineHeight"
                          onChange={(val) => {
                            field.onChange(val);
                          }}
                        />
                      </InlineStack>
                      <InlineStack gap="150" blockAlign="center">
                        <Text as="span">Specific line height</Text>
                        <ToggleButton
                          id="lineHeight2"
                          type="radio"
                          checked={field.value === "custom"}
                          value={"custom"}
                          name="lineHeight"
                          onChange={(val) => {
                            field.onChange(val);
                          }}
                        />
                      </InlineStack>
                    </>
                  )}
                />
              </InlineStack>

              {selectedLineType === "custom" && (
                <Box paddingBlockStart="200">
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
                            label="Line height value"
                            type="number"
                            value={field.value.toString()}
                            helpText="Adjust the space between each new line of text for this font in the configurator."
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
                            label="Height calculation adjustment"
                            type="number"
                            suffix="cm"
                            value={field.value.toString()}
                            helpText="Adjust the space between each new line for height calculation."
                            autoComplete="off"
                            onChange={(val) => {
                              field.onChange(Number(val));
                            }}
                          />
                        )}
                      />
                    </Grid.Cell>
                  </Grid>
                </Box>
              )}
            </Box>
          </Card>

          <Card>
            <Box padding="300">
              <InlineStack align="end" gap="300">
                <Button onClick={handleGoBack} disabled={isSubmitting}>
                  Cancel
                </Button>
                <Button submit variant="primary" tone="success" loading={isSubmitting}>
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
