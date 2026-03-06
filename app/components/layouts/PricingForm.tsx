import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
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
import { PlusIcon } from "@shopify/polaris-icons";
import { Controller, useForm } from "react-hook-form";
import {
  Form,
  useNavigate,
  useNavigation,
} from "@remix-run/react";

interface PriceOption {
  basicPrice: number;
  letterPrice: number;
  nbCharStartPrice?: number;
}

export interface FixedPricing {
  id?: number | null;
  label: string;
  prices: PriceOption[][];
}

interface FixedProps {
  pricing?: FixedPricing;
  sizes: any[];
  isEditing?: boolean;
  pricingMode: string;
  currencySymbol?: string;
  onChange?: (pricing: FixedPricing) => void;
  onSubmit: (pricing: FixedPricing) => void;
  onClose: () => void;
}

export function PricingSimpleForm({
  pricing,
  sizes,
  pricingMode,
  currencySymbol,
  onChange,
  onSubmit,
  onClose,
  isEditing = false,
}: FixedProps) {
  const pricingWithRightType = {
    id: null,
    label: "",
    prices: sizes.map((size) =>
      [...Array(size.numberLines)].map(() => ({
        basicPrice: 0,
        letterPrice: 0,
        nbCharStartPrice: 0,
      })),
    ),
  };

  const defaultPricing: FixedPricing = isEditing
    ? (pricing as FixedPricing)
    : pricingWithRightType;
  const navigate = useNavigate();
  const handleGoBack = () => {
    onClose();
  };

  const {
    handleSubmit,
    control,
  } = useForm<FixedPricing>({
    defaultValues: defaultPricing,
    mode: "onChange", // Active la validation au changement
  });

  const navigation = useNavigation();
  let isSubmitting = navigation.state == "submitting";

  const onInternalSubmit = (data: FixedPricing) => {
    try {
      onSubmit(data);
    } catch (e) {
      console.error("Error submitting form:", e);
    }
  };

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <Card>
        <Box padding="300">
          <InlineStack align="space-between" blockAlign="center">
            <div>
              <Text as="h2" variant="headingMd">
                Pricings
              </Text>
              <Text as="p" tone="subdued">
                {isEditing ? "Edit pricing" : "Add new pricing"}
              </Text>
            </div>
            <HelpLink
              url="https://docs.signsdesigner.us/docs/ncpc-documentation/configurations-9624/neon-simple-9626/adding-pricing-9671/"
              text="Get Help"
            />
          </InlineStack>
        </Box>
      </Card>

      <Form onSubmit={handleSubmit(onInternalSubmit)}>
        <div style={{ display: "grid", gap: 12 }}>
          <Card>
            <Box padding="300">
              <InlineStack align="space-between" blockAlign="start" wrap>
                <Box maxWidth="40rem">
                  <Text as="h3" variant="headingMd">
                    Pricing for each size
                  </Text>
                  <Text as="p" variant="bodyMd" tone="subdued">
                    {pricingMode === "fixed-height" ? "Height" : "Width"} (centimeters). Set line-based
                    pricing for each configured sign size.
                  </Text>
                </Box>
                <Button
                  icon={PlusIcon}
                  variant="primary"
                  tone="success"
                  onClick={() => navigate("../sizes")}
                >
                  Add More Size
                </Button>
              </InlineStack>

              <Box paddingBlockStart="200" />
              <Divider borderWidth="100" />
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
                        helpText="The label is not shown to the customer.(Required)"
                        value={field.value}
                        onChange={field.onChange}
                        autoComplete="on"
                        error={fieldState.error?.message}
                      />
                    )}
                  />
                </Grid.Cell>
              </Grid>

              <Box paddingBlockStart="200" />
              <Divider borderWidth="100" />

              {sizes.length > 0 &&
                sizes.map((size, index) => (
                  <Box key={`size-${index}`} paddingBlock="300">
                    <Box paddingBlockEnd="200">
                      <Text variant="headingMd" as="h2">
                        Size:{" "}
                        <Text variant="headingMd" as="span" tone="base">
                          {size?.label}
                        </Text>
                      </Text>
                    </Box>

                    {[...Array(size?.numberLines)].map((_, i) => (
                      <Box key={`size-${index}-line-${i}`} paddingBlock="300">
                        <Text variant="headingSm" as="h3">
                          Line {i + 1}
                        </Text>

                        <Box paddingBlockStart="150" />
                        <InlineGrid columns={{ xs: 1, sm: 2 }} gap="400">
                          <Controller
                            name={`prices.${index}.${i}.basicPrice`}
                            control={control}
                            rules={{
                              required: "This field is required",
                              min: {
                                value: 0,
                                message: "Must be greater than or equal to 0",
                              },
                            }}
                            render={({ field }) => (
                              <TextField
                                label="Base price"
                                type="number"
                                prefix={currencySymbol}
                                value={field.value?.toString()}
                                onChange={(value) => field.onChange(value)}
                                autoComplete="off"
                              />
                            )}
                          />
                          <Controller
                            name={`prices.${index}.${i}.letterPrice`}
                            control={control}
                            rules={{
                              required: "This field is required",
                              min: {
                                value: 0,
                                message: "Must be greater than or equal to 0",
                              },
                            }}
                            render={({ field }) => (
                              <TextField
                                label="Letter price"
                                type="number"
                                prefix={currencySymbol}
                                value={field.value?.toString()}
                                onChange={(value) => field.onChange(value)}
                                autoComplete="off"
                              />
                            )}
                          />
                        </InlineGrid>

                        <Box paddingBlockStart="200">
                          <Controller
                            name={`prices.${index}.${i}.nbCharStartPrice`}
                            control={control}
                            rules={{
                              required: "This field is required",
                              min: {
                                value: 0,
                                message: "Must be greater than or equal to 0",
                              },
                            }}
                            render={({ field }) => (
                              <TextField
                                label="Number of characters in Base Price"
                                type="number"
                                value={field.value?.toString()}
                                onChange={(value) => field.onChange(value)}
                                autoComplete="off"
                              />
                            )}
                          />
                        </Box>
                      </Box>
                    ))}

                    {index !== sizes.length - 1 ? <Divider borderWidth="100" /> : null}
                  </Box>
                ))}
            </Box>
          </Card>

          <Card>
            <Box padding="300">
              <InlineStack align="end" gap="300">
                <Button
                  disabled={isSubmitting}
                  variant="secondary"
                  onClick={handleGoBack}
                >
                  Cancel
                </Button>
                <Button
                  submit
                  loading={isSubmitting}
                  variant="primary"
                  disabled={isSubmitting}
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

interface PriceRange {
  maxSizeRange: number;
  widthModifier: number;
  heightModifier: number;
  length: number;
  pricePerSqCm: number;
  pricePerLetter: number;
  pricePerMaterialCost: number;
  startPrice: number;
}
interface PriceMeter {
  measurementSide: string;
  price: number;
  signPart: string;
  meter: number;
}
export interface AdvancedPriceType {
  id?: number | null;
  label: string;
  letterPricingMethod: string;
  priceMeter: PriceMeter;
  signPartForMaterialCost: string;
  shippingMethod: string;
  divisorVolumetric: number;
  prices: PriceRange[];
}

interface AdvancedProps {
  pricing?: AdvancedPriceType;
  isEditing?: boolean;
  currencySymbol?: string;
  measurementUnit?: string;
  onChange?: (pricing: AdvancedPriceType) => void;
  onSubmit: (pricing: AdvancedPriceType) => void;
  onClose: () => void;
}
export function PricingAdvancedForm({
  pricing,
  isEditing,
  currencySymbol,
  measurementUnit,
  onChange,
  onSubmit,
  onClose,
}: AdvancedProps) {
  const pricingWithRightType = {
    id: null,
    label: "",
    letterPricingMethod: "per-letter",
    priceMeter: {
      measurementSide: "width",
      price: 0,
      signPart: "all-text",
      meter: 1,
    },
    signPartForMaterialCost: "Surface(W*H)",
    shippingMethod: "per-surface",
    divisorVolumetric: 5000,
    prices: [
      {
        maxSizeRange: 0,
        widthModifier: 0,
        heightModifier: 0,
        length: 0,
        pricePerSqCm: 0,
        pricePerLetter: 0,
        pricePerMaterialCost: 0,
        startPrice: 0,
      },
    ],
  };

  const defaultPricing: AdvancedPriceType = isEditing
    ? (pricing as AdvancedPriceType)
    : pricingWithRightType;

  const {
    handleSubmit,
    control,
    setValue,
    watch,
  } = useForm<AdvancedPriceType>({
    defaultValues: defaultPricing,
    mode: "onChange",
  });
  const pricingMethods = [
    { label: "Fixed cost per letter", value: "per-letter" },
    { label: "Letter material cost", value: "material-cost" },
    {
      label: "Letter pricing method And letter material cost",
      value: "both",
    },
    /* { label: "Per x Meter", value: "per-meter" }, */
  ];

  const shippingMethods = [
    { label: "Surface (W*H)", value: "per-surface" },
    { label: "Weight (kg)", value: "per-weight" },
  ];

  // Utilisation de watch pour suivre les modifications dans 'shippingMethod'
  const shippingMethod = watch("shippingMethod");
  const letterPricingMethod = watch("letterPricingMethod");
  const divisorVolumetric = watch("divisorVolumetric");

  const navigation = useNavigation();
  let isSubmitting = navigation.state == "submitting";

  const [sizeRanges, setSizeRanges] = useState<PriceRange[]>([
    {
      maxSizeRange: 0,
      widthModifier: 0,
      heightModifier: 0,
      length: 0,
      pricePerSqCm: 0,
      pricePerLetter: 0,
      pricePerMaterialCost: 0,
      startPrice: 0,
    },
  ]);
  const [openConvertModal, setOpenConvertModal] = useState(false);
  const [editingRangeIndex, setEditingRangeIndex] = useState<number | null>(null);
  const [rangeDraft, setRangeDraft] = useState<PriceRange | null>(null);
  const [rangeEditorError, setRangeEditorError] = useState<string | null>(null);

  const handleGoBack = () => {
    onClose();
  };

  const shippingPriceConvectorSave = (shippingPrice: number) => {
    setRangeDraft((prev) =>
      prev
        ? {
            ...prev,
            pricePerSqCm: shippingPrice,
          }
        : prev,
    );
    setOpenConvertModal(false);
  };

  const handleAddSizeRange = () => {
    const newSizeRange = {
      maxSizeRange: sizeRanges[sizeRanges.length - 1]?.maxSizeRange + 1 || 60,
      pricePerLetter: 0,
      startPrice: 0,
      widthModifier: 0,
      heightModifier: 0,
      length: 0,
      pricePerSqCm: 0,
      pricePerMaterialCost: 0,
    };

    const updatedRanges = [...sizeRanges, newSizeRange];
    setSizeRanges(updatedRanges);
  };

  const handleRemoveSizeRange = (index: number) => {
    const updatedRanges = [...sizeRanges];
    updatedRanges.splice(index, 1);
    setSizeRanges(updatedRanges);
  };

  const openRangeEditor = (index: number) => {
    setEditingRangeIndex(index);
    setRangeDraft({ ...sizeRanges[index] });
    setRangeEditorError(null);
  };

  const closeRangeEditor = () => {
    setEditingRangeIndex(null);
    setRangeDraft(null);
    setRangeEditorError(null);
    setOpenConvertModal(false);
  };

  const updateRangeDraftField = (field: keyof PriceRange, value: number) => {
    setRangeDraft((prev) =>
      prev
        ? {
            ...prev,
            [field]: value,
          }
        : prev,
    );
  };

  const saveRangeDraft = () => {
    if (editingRangeIndex === null || !rangeDraft) return;

    const previousMax =
      editingRangeIndex > 0 ? sizeRanges[editingRangeIndex - 1]?.maxSizeRange ?? 0 : 0;
    const nextMax =
      editingRangeIndex < sizeRanges.length - 1
        ? sizeRanges[editingRangeIndex + 1]?.maxSizeRange
        : null;

    if (rangeDraft.maxSizeRange <= 0) {
      setRangeEditorError("Max Size Range must be greater than 0.");
      return;
    }

    if (editingRangeIndex > 0 && rangeDraft.maxSizeRange <= previousMax) {
      setRangeEditorError("Max Size Range must be greater than the previous range.");
      return;
    }

    if (nextMax != null && rangeDraft.maxSizeRange >= nextMax) {
      setRangeEditorError("Max Size Range must stay lower than the next range.");
      return;
    }

    const updatedRanges = [...sizeRanges];
    updatedRanges[editingRangeIndex] = rangeDraft;
    setSizeRanges(updatedRanges);
    closeRangeEditor();
  };

  const getShippingValue = (range: PriceRange) => {
    if (shippingMethod === "per-surface") {
      const area = range.maxSizeRange * range.maxSizeRange;
      const shippingCost = area * range.pricePerSqCm;
      return {
        value: shippingCost,
        message: (
          <>
            Given a sign's dimension of{" "}
            <Text as="strong">
              {range.maxSizeRange} {measurementUnit}
            </Text>{" "}
            x{" "}
            <Text as="strong">
              {range.maxSizeRange} {measurementUnit}
            </Text>{" "}
            and a unit price of <Text as="strong">{range.pricePerSqCm}</Text>{" "}
            per {measurementUnit}², the shipping cost would be{" "}
            <Text as="strong">
              {shippingCost} {currencySymbol}
            </Text>
            .
          </>
        ),
      };
    } else if (shippingMethod === "per-weight") {
      const shippingCost =
        (range.length *
          (range.widthModifier + range.maxSizeRange) *
          (range.heightModifier + range.maxSizeRange)) /
        divisorVolumetric;
      return {
        value: shippingCost,
        message: (
          <>
            Given a signs dimension of{" "}
            <Text as="strong">
              {" ("} {range.maxSizeRange} {measurementUnit} +{" "}
              {range.widthModifier} {measurementUnit} {")"} * {" ("}{" "}
              {range.maxSizeRange} {measurementUnit} + {range.heightModifier}{" "}
              {measurementUnit} {")"} * {range.length} {measurementUnit} /{" "}
              {divisorVolumetric}{" "}
            </Text>
            and unit price of{" "}
            <Text as="strong">
              {range.pricePerSqCm} {currencySymbol} + {}
            </Text>
            per kg the shipping cost would be
            <Text as="strong">
              {shippingCost} {currencySymbol}.
            </Text>
          </>
        ),
      };
    } else {
      return {
        value: 0,
        message: (
          <Text as="strong">
            Shipping method not supported or not selected.
          </Text>
        ),
      };
    }
  };

  const onInternalSubmit = (data: AdvancedPriceType) => {
    try {
      onSubmit(data);
    } catch (e) {
      console.error("Error submitting form:", e);
    }
  };

  useEffect(() => {
    if (isEditing) {
      if (pricing?.prices) {
        setSizeRanges([...pricing?.prices]);
      }
    }
  }, [isEditing, pricing?.prices]);

  useEffect(() => {
    setValue("prices", sizeRanges);
  }, [setValue, sizeRanges]);

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <Card>
        <Box padding="300">
          <InlineStack align="space-between" blockAlign="center">
            <div>
              <Text as="h2" variant="headingMd">
                Pricings
              </Text>
              <Text as="p" tone="subdued">
                {isEditing ? "Edit pricing" : "Add new pricing"}
              </Text>
            </div>
            <HelpLink
              url="https://docs.signsdesigner.us/docs/ncpc-documentation/configurations-9624/neon-simple-9626/adding-pricing-9671/"
              text="Get Help"
            />
          </InlineStack>
        </Box>
      </Card>
      <Form onSubmit={handleSubmit(onInternalSubmit)}>
        <div style={{ display: "grid", gap: 12 }}>
          <Card>
            <Box padding="300">
              <Controller
                name="label"
                control={control}
                rules={{ required: "This field is required" }}
                render={({ field, fieldState }) => (
                  <TextField
                    label="Label"
                    helpText="The label is not shown to the customer.(Required)"
                    value={field.value}
                    onChange={field.onChange}
                    autoComplete="off"
                    error={fieldState.error?.message}
                  />
                )}
              />
              <Divider borderWidth="100" />
              <Box padding="150">
                <Text variant="headingMd" as="h6">
                  Pricing Method
                </Text>
                <Box paddingBlock="150">
                  <InlineStack align="space-evenly">
                    {pricingMethods.map((method, index) => (
                      <Controller
                        key={index}
                        name="letterPricingMethod"
                        control={control}
                        rules={{ required: "This field is required" }}
                        render={({ field, fieldState }) => (
                          <Box paddingBlock="050">
                            <Text as="span">{method.label}</Text>
                            <Box padding="100" as="span" />
                            <ToggleButton
                              id={method.value}
                              checked={field.value === method.value}
                              type="radio"
                              value={method.value}
                              name="pricing-method"
                              onChange={(val) => {
                                field.onChange(val);
                              }}
                            />
                          </Box>
                        )}
                      />
                    ))}
                  </InlineStack>
                </Box>
              </Box>
              <Divider borderWidth="100" />
              <Box padding="150">
                <Text variant="headingMd" as="h6">
                  Shipping Method
                </Text>
                <Box paddingBlock="150">
                  <InlineStack align="start" gap="200">
                    {shippingMethods.map((method, index) => (
                      <Controller
                        key={index}
                        name="shippingMethod"
                        control={control}
                        render={({ field, fieldState }) => (
                          <Box paddingBlock="050">
                            <Text as="span">{method.label}</Text>
                            <Box padding="100" as="span" />
                            <ToggleButton
                              id={method.value}
                              checked={field.value === method.value}
                              type="radio"
                              value={method.value}
                              name="shipping-method"
                              onChange={(val) => {
                                field.onChange(val);
                              }}
                            />
                          </Box>
                        )}
                      />
                    ))}
                  </InlineStack>
                </Box>

                {shippingMethod === "per-weight" && (
                  <Box paddingBlock="150">
                    <Controller
                      name="divisorVolumetric"
                      control={control}
                      rules={{ required: "This field is required" }}
                      render={({ field, fieldState }) => (
                        <TextField
                          label="Volumetric Divisor"
                          helpText="Used by shipping providers to calculate the volumetric weight of a parcel."
                          value={field.value.toString()}
                          autoComplete="off"
                          type="number"
                          onChange={(value) => field.onChange(Number(value))}
                          error={fieldState?.error?.message}
                        />
                      )}
                    />
                  </Box>
                )}

                <Box padding="150" />
                {(letterPricingMethod == "material-cost" ||
                  letterPricingMethod == "both") && (
                  <Controller
                    name="signPartForMaterialCost"
                    control={control}
                    rules={{ required: "This field is required" }}
                    render={({ field, fieldState }) => (
                      <Select
                        label="Material Area For Cost"
                        options={[
                          { label: "Surface", value: "surface" },
                          { label: "Width", value: "width" },
                          { label: "Height", value: "height" },
                          { label: "Material Line", value: "material-line" },
                        ]}
                        onChange={(val) => {
                          field.onChange(val);
                        }}
                        value={field.value}
                      />
                    )}
                  />
                )}
              </Box>
              <Divider borderWidth="050" />
              <Box padding="150">
                <Text as="h6" variant="headingMd">
                  Price Formula
                </Text>
                <Text as="p">
                  Add additional size ranges to apply unique price calculations
                  for a given size range
                </Text>
              </Box>
              <Divider borderWidth="100" />
              <Box paddingBlock="200">
                <InlineStack align="space-between" blockAlign="center">
                  <Text as="h6" variant="headingMd">
                    Size Ranges
                  </Text>
                  <Button icon={PlusIcon} variant="primary" onClick={handleAddSizeRange}>
                    Add Size Range
                  </Button>
                </InlineStack>
              </Box>

              <InlineGrid columns={{ xs: 1, sm: 1, md: 1, lg: 1, xl: 1 }} gap="300">
                {sizeRanges.map((range, index) => {
                  const rangeStart = index === 0 ? 0 : sizeRanges[index - 1]?.maxSizeRange ?? 0;
                  const rangeEnd = range.maxSizeRange;
                  const shippingPreview = getShippingValue(range)?.value ?? 0;
                  const shippingUnit =
                    shippingMethod === "per-surface"
                      ? `per ${measurementUnit}²`
                      : `per ${measurementUnit}³`;

                  const summaryItems: { label: string; value: string }[] = [
                    {
                      label: "Max Size",
                      value: `${range.maxSizeRange} ${measurementUnit || ""}`.trim(),
                    },
                    {
                      label: "Start Price",
                      value: `${currencySymbol || ""}${range.startPrice}`,
                    },
                    {
                      label: "Shipping",
                      value: `${currencySymbol || ""}${range.pricePerSqCm} ${shippingUnit}`,
                    },
                    {
                      label: "Estimated Shipping",
                      value: `${currencySymbol || ""}${Number(shippingPreview).toFixed(2)}`,
                    },
                  ];

                  if (
                    letterPricingMethod === "per-letter" ||
                    letterPricingMethod === "both"
                  ) {
                    summaryItems.splice(1, 0, {
                      label: "Letter Price",
                      value: `${currencySymbol || ""}${range.pricePerLetter}`,
                    });
                  }

                  if (
                    letterPricingMethod === "material-cost" ||
                    letterPricingMethod === "both"
                  ) {
                    summaryItems.splice(2, 0, {
                      label: "Material Cost",
                      value: `${currencySymbol || ""}${range.pricePerMaterialCost}`,
                    });
                  }

                  return (
                    <Box
                      key={index}
                      borderWidth="025"
                      borderColor="border"
                      borderRadius="200"
                      background="bg-surface-secondary"
                      padding="300"
                    >
                      <InlineStack align="space-between" blockAlign="start">
                        <InlineStack gap="200" blockAlign="center" wrap>
                          <Text as="h6" variant="headingSm">
                            Range {index + 1}
                          </Text>
                          <Text as="p" tone="subdued" variant="bodySm">
                            Starts at {rangeStart}
                            {` - ends at ${rangeEnd}`}
                          </Text>
                        </InlineStack>
                      </InlineStack>

                      <Box paddingBlockStart="200">
                        <InlineGrid
                          columns={{ xs: 1, sm: 2, md: 3, lg: 3, xl: 3 }}
                          gap="200"
                        >
                          {summaryItems.map((item, itemIndex) => (
                            <Box key={`summary-${index}-${itemIndex}`} paddingInlineEnd="200">
                              <Text as="p" tone="subdued" variant="bodySm">
                                <Text as="span" variant="bodySm" fontWeight="medium">
                                  {item.label}:{" "}
                                </Text>
                                <Text as="span" variant="bodySm">
                                  {item.value}
                                </Text>
                              </Text>
                            </Box>
                          ))}
                        </InlineGrid>
                      </Box>

                      <Box paddingBlockStart="200">
                        <InlineStack align="end" gap="200">
                          {sizeRanges.length > 1 ? (
                            <Button
                              tone="critical"
                              variant="secondary"
                              onClick={() => handleRemoveSizeRange(index)}
                            >
                              Delete
                            </Button>
                          ) : null}
                          <Button variant="primary" onClick={() => openRangeEditor(index)}>
                            Edit
                          </Button>
                        </InlineStack>
                      </Box>
                    </Box>
                  );
                })}
              </InlineGrid>
            </Box>
          </Card>

          {editingRangeIndex !== null && rangeDraft ? (
            <Modal
              open
              onClose={closeRangeEditor}
              title={`Edit Size Range ${editingRangeIndex + 1}`}
              primaryAction={{
                content: "Save range",
                onAction: saveRangeDraft,
              }}
              secondaryActions={[
                {
                  content: "Cancel",
                  onAction: closeRangeEditor,
                },
              ]}
            >
              <Modal.Section>
                {rangeEditorError ? (
                  <Box paddingBlockEnd="200">
                    <Text as="p" tone="critical">
                      {rangeEditorError}
                    </Text>
                  </Box>
                ) : null}

                <Grid columns={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }} gap={{ lg: "300" }}>
                  <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 3, xl: 3 }}>
                    <TextField
                      label="Max Size Range"
                      type="number"
                      suffix={measurementUnit}
                      value={String(rangeDraft.maxSizeRange)}
                      onChange={(value) =>
                        updateRangeDraftField("maxSizeRange", Number(value || 0))
                      }
                      autoComplete="off"
                    />
                  </Grid.Cell>
                  <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 3, xl: 3 }}>
                    <TextField
                      label="Start Price (Optional)"
                      type="number"
                      prefix={currencySymbol}
                      value={String(rangeDraft.startPrice)}
                      onChange={(value) =>
                        updateRangeDraftField("startPrice", Number(value || 0))
                      }
                      autoComplete="off"
                    />
                  </Grid.Cell>

                  {(letterPricingMethod === "per-letter" || letterPricingMethod === "both") && (
                    <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 3, xl: 3 }}>
                      <TextField
                        label="Price Per Letter"
                        type="number"
                        prefix={currencySymbol}
                        value={String(rangeDraft.pricePerLetter)}
                        onChange={(value) =>
                          updateRangeDraftField("pricePerLetter", Number(value || 0))
                        }
                        autoComplete="off"
                      />
                    </Grid.Cell>
                  )}

                  {(letterPricingMethod === "material-cost" || letterPricingMethod === "both") && (
                    <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 3, xl: 3 }}>
                      <TextField
                        label="Letter Material Cost"
                        type="number"
                        prefix={currencySymbol}
                        suffix={measurementUnit}
                        value={String(rangeDraft.pricePerMaterialCost)}
                        onChange={(value) =>
                          updateRangeDraftField("pricePerMaterialCost", Number(value || 0))
                        }
                        autoComplete="off"
                      />
                    </Grid.Cell>
                  )}
                </Grid>

                <Box paddingBlockStart="300">
                  <Divider borderWidth="025" />
                </Box>

                <Box paddingBlockStart="300">
                  <Text as="h6" variant="headingSm">
                    Shipping
                  </Text>
                </Box>

                {shippingMethod === "per-surface" ? (
                  <Box paddingBlockStart="200">
                    <Grid columns={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }} gap={{ lg: "300" }}>
                      <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 3, xl: 3 }}>
                        <TextField
                          label="Shipping Price"
                          type="number"
                          prefix={currencySymbol}
                          suffix={`per ${measurementUnit}²`}
                          value={String(rangeDraft.pricePerSqCm)}
                          onChange={(value) =>
                            updateRangeDraftField("pricePerSqCm", Number(value || 0))
                          }
                          autoComplete="off"
                        />
                      </Grid.Cell>
                      <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 3, xl: 3 }}>
                        <TextField
                          label="Range Shipping"
                          prefix={currencySymbol}
                          suffix={`for size ${rangeDraft.maxSizeRange} ${measurementUnit} x ${rangeDraft.maxSizeRange} ${measurementUnit}`}
                          value={String(getShippingValue(rangeDraft)?.value ?? 0)}
                          autoComplete="off"
                          disabled
                        />
                      </Grid.Cell>
                    </Grid>
                    <Box paddingBlockStart="150">
                      <Button variant="secondary" onClick={() => setOpenConvertModal(true)}>
                        Convert Shipping Price
                      </Button>
                    </Box>
                  </Box>
                ) : (
                  <Box paddingBlockStart="200">
                    <Grid columns={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }} gap={{ lg: "300" }}>
                      <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 3, xl: 3 }}>
                        <TextField
                          label="Width Modifier"
                          type="number"
                          suffix={measurementUnit}
                          value={String(rangeDraft.widthModifier)}
                          onChange={(value) =>
                            updateRangeDraftField("widthModifier", Number(value || 0))
                          }
                          autoComplete="off"
                        />
                      </Grid.Cell>
                      <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 3, xl: 3 }}>
                        <TextField
                          label="Height Modifier"
                          type="number"
                          suffix={measurementUnit}
                          value={String(rangeDraft.heightModifier)}
                          onChange={(value) =>
                            updateRangeDraftField("heightModifier", Number(value || 0))
                          }
                          autoComplete="off"
                        />
                      </Grid.Cell>
                      <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 3, xl: 3 }}>
                        <TextField
                          label="Length"
                          type="number"
                          suffix={measurementUnit}
                          value={String(rangeDraft.length)}
                          onChange={(value) =>
                            updateRangeDraftField("length", Number(value || 0))
                          }
                          autoComplete="off"
                        />
                      </Grid.Cell>
                      <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 3, xl: 3 }}>
                        <TextField
                          label="Shipping Price"
                          type="number"
                          prefix={currencySymbol}
                          suffix={`per ${measurementUnit}³`}
                          value={String(rangeDraft.pricePerSqCm)}
                          onChange={(value) =>
                            updateRangeDraftField("pricePerSqCm", Number(value || 0))
                          }
                          autoComplete="off"
                        />
                      </Grid.Cell>
                    </Grid>
                  </Box>
                )}

                {openConvertModal ? (
                  <ShippingPriceConvertor
                    onClose={() => setOpenConvertModal(false)}
                    onSave={shippingPriceConvectorSave}
                    range={rangeDraft}
                    measurementUnit={measurementUnit as string}
                    currencySymbol={currencySymbol as string}
                  />
                ) : null}
              </Modal.Section>
            </Modal>
          ) : null}
          <Card>
            <Box padding="300">
              <InlineStack align="end" gap="300">
                <Button
                  disabled={isSubmitting}
                  variant="secondary"
                  onClick={handleGoBack}
                >
                  Cancel
                </Button>
                <Button
                  submit
                  loading={isSubmitting}
                  variant="primary"
                  disabled={isSubmitting}
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

const ShippingPriceConvertor = ({
  onClose,
  onSave,
  range,
  measurementUnit,
  currencySymbol,
}: {
  onClose: () => void;
  onSave: (shippingPrice: number) => void;
  range: PriceRange;
  measurementUnit: string;
  currencySymbol: string;
}) => {
  const [shippingCost, setShippingCost] = useState<number>(range.pricePerSqCm);
  const [convertedShippingCost, setConvertedShippingCost] = useState<number>(
    range.pricePerSqCm * range.maxSizeRange * range.maxSizeRange,
  );
  const handleChangeShippingCost = (val: string) => {
    setConvertedShippingCost(Number(val));
    const shippingCost = (
      Number(val) /
      (range.maxSizeRange * range.maxSizeRange)
    ).toFixed(3);
    setShippingCost(Number(shippingCost));
  };
  return (
    <Modal
      open
      onClose={onClose}
      title="Shipping Cost Calculator"
      primaryAction={{
        content: "Save",
        onAction: () => onSave(shippingCost),
      }}
      secondaryActions={[
        {
          content: "Back",
          onAction: onClose,
        },
      ]}
    >
      <Modal.Section>
        <Text as="p" variant="bodyMd">
          Easily convert your shipping cost to a cm² value using this
          calculator. Enter your current shipping cost for a 60cm x 60cm parcel,
          this cost can be found in your shipping cost matrix.
        </Text>
      </Modal.Section>
      <Modal.Section>
        <Grid
          gap={{ lg: "30px" }}
          columns={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}
        >
          <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 3, xl: 3 }}>
            <TextField
              label={`Shipping Cost for ${range.maxSizeRange}cm x ${range.maxSizeRange}cm`}
              value={convertedShippingCost.toString()}
              type="number"
              prefix={currencySymbol}
              suffix={`for ${range.maxSizeRange} ${measurementUnit} x ${range.maxSizeRange} ${measurementUnit}`}
              onChange={(val) => handleChangeShippingCost(val)}
              autoComplete="off"
            />
          </Grid.Cell>
          <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 3, xl: 3 }}>
            <TextField
              label="Shipping Cost for Converted Shipping Cost"
              value={shippingCost.toString()}
              prefix={currencySymbol}
              suffix={measurementUnit + "²"}
              autoComplete="off"
              disabled
            />
          </Grid.Cell>
        </Grid>
      </Modal.Section>
    </Modal>
  );
};
