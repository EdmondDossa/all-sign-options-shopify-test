import { json } from "@remix-run/node";
import type { ActionFunctionArgs } from "@remix-run/node";
import {
  Box,
  Button,
  Card,
  Divider,
  IndexTable,
  InlineGrid,
  InlineStack,
  Text,
  TextField,
} from "@shopify/polaris";
import { DeleteIcon, DuplicateIcon, EditIcon, PlusIcon } from "@shopify/polaris-icons";
import { useEffect, useMemo, useState } from "react";
import { useNavigation, useOutletContext, useSubmit } from "@remix-run/react";
import { SaveButton, ToggleButton } from "~/components/buttons";
import useHandleFlashMessage from "~/hooks/useHandleFlashMessage";
import ConfigurationService from "~/models/Configuration.service";
import { authenticate } from "~/shopify.server";
import { ensureClassicSimplifiedBuilderData } from "~/utils/simplified-builder-data";
import { jFlashMessage } from "~/utils/message-flash";

type ClassicCustomPricing = {
  type: "unit" | "range";
  rangePricingPerUnit: boolean;
  shippingMethod: "per-surface" | "per-weight";
  divisorVolumetric: number;
  unit: {
    surface: number;
    basePrice: number;
    charPrice: number;
  };
  range: Array<{
    surface: number;
    basePrice: number;
    charPrice: number;
    shippingPrice: number;
    widthModifier: number;
    heightModifier: number;
    length: number;
  }>;
};

type ClassicPricingOption = {
  id?: number | null;
  label: string;
  customPricing: ClassicCustomPricing;
};

type PricingSectionSettings = {
  label: string;
  description: string;
  priceOptions: ClassicPricingOption[];
};

const defaultPricingSettings = (): PricingSectionSettings => ({
  label: "Pricing",
  description: "",
  priceOptions: [],
});

const parseConfigData = (rawData: any) => {
  if (!rawData) return null;
  if (typeof rawData === "string") {
    try {
      const parsed = JSON.parse(rawData);
      return parsed && typeof parsed === "object" ? parsed : null;
    } catch {
      return null;
    }
  }
  return typeof rawData === "object" ? rawData : null;
};

const parseJsonValue = (value: FormDataEntryValue | null) => {
  try {
    return JSON.parse(String(value || "null"));
  } catch {
    return null;
  }
};

const parseIndex = (value: FormDataEntryValue | null) => {
  const parsed = parseInt(String(value || ""), 10);
  return Number.isNaN(parsed) ? -1 : parsed;
};

const toNumber = (value: unknown, fallback = 0) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const getCustomSizeConfig = (data: any) => {
  return (
    data?.requiredOptions?.sizes?.customSize ||
    data?.requiredOptions?.sizes?.settings?.customSize ||
    data?.simplifiedBuilder?.coreSetup?.sizes?.settings?.customSize ||
    null
  );
};

const normalizeCustomPricing = (value: any): ClassicCustomPricing => ({
  type: value?.type === "range" ? "range" : "unit",
  rangePricingPerUnit: Boolean(value?.rangePricingPerUnit),
  shippingMethod: value?.shippingMethod === "per-weight" ? "per-weight" : "per-surface",
  divisorVolumetric: toNumber(value?.divisorVolumetric, 5000),
  unit: {
    surface: toNumber(value?.unit?.surface, 0),
    basePrice: toNumber(value?.unit?.basePrice, 0),
    charPrice: toNumber(value?.unit?.charPrice, 0),
  },
  range: Array.isArray(value?.range)
    ? value.range.map((item: any) => ({
        surface: toNumber(item?.surface, 0),
        basePrice: toNumber(item?.basePrice, 0),
        charPrice: toNumber(item?.charPrice, 0),
        shippingPrice: toNumber(item?.shippingPrice ?? item?.pricePerSqCm, 0),
        widthModifier: toNumber(item?.widthModifier, 0),
        heightModifier: toNumber(item?.heightModifier, 0),
        length: toNumber(item?.length, 0),
      }))
    : [],
});

const normalizePricingOption = (pricing: any): ClassicPricingOption => {
  return {
    id: pricing?.id ?? null,
    label: String(pricing?.label || ""),
    customPricing: normalizeCustomPricing(
      pricing?.customPricing || pricing?.customSizePricing || pricing?.customSize?.pricings,
    ),
  };
};

const buildFallbackPricingOption = (data: any): ClassicPricingOption => {
  return {
    label: "Default pricing",
    customPricing: normalizeCustomPricing(getCustomSizeConfig(data)?.pricings),
  };
};

const getPricingSettings = (data: any): PricingSectionSettings => {
  const defaults = defaultPricingSettings();
  const fallbackOption = buildFallbackPricingOption(data);
  const storedPricing = data?.requiredOptions?.pricing;

  if (storedPricing && typeof storedPricing === "object") {
    const storedOptions = Array.isArray(storedPricing?.priceOptions)
      ? storedPricing.priceOptions
      : Array.isArray(storedPricing?.items)
        ? storedPricing.items
        : [];

    return {
      ...defaults,
      label: String(storedPricing?.label || defaults.label),
      description: String(storedPricing?.description || ""),
      priceOptions:
        storedOptions.length > 0
          ? storedOptions.map((item: any) => normalizePricingOption(item))
          : [fallbackOption],
    };
  }

  return {
    ...defaults,
    priceOptions: [fallbackOption],
  };
};

const validateCustomPricing = (pricing: ClassicCustomPricing): string | null => {
  if (pricing.type !== "range") return null;

  let previousSurface = -Infinity;
  for (const range of pricing.range) {
    if (range.surface <= previousSurface) {
      return "Custom size ranges must use increasing surface values.";
    }
    previousSurface = range.surface;
  }

  return null;
};

const syncPricingIntoData = (data: any, pricingSettings: PricingSectionSettings) => {
  const nextData = ensureClassicSimplifiedBuilderData({
    data,
    materialType: data?.simplifiedBuilder?.meta?.materialType || "",
    productType: data?.simplifiedBuilder?.meta?.productType || "",
    pricingMode: data?.simplifiedBuilder?.meta?.pricingMode || null,
  });

  const primaryPricing = pricingSettings.priceOptions[0] || buildFallbackPricingOption(nextData);

  nextData.requiredOptions = {
    ...(nextData.requiredOptions || {}),
    sizes: {
      ...(nextData.requiredOptions?.sizes || {}),
      customSize: {
        ...(nextData.requiredOptions?.sizes?.customSize || {}),
        pricings: primaryPricing.customPricing,
      },
      settings: {
        ...(nextData.requiredOptions?.sizes?.settings || {}),
        customSize: {
          ...(nextData.requiredOptions?.sizes?.settings?.customSize || {}),
          pricings: primaryPricing.customPricing,
        },
      },
    },
    pricing: {
      label: pricingSettings.label,
      description: pricingSettings.description,
      priceOptions: pricingSettings.priceOptions,
    },
  };

  nextData.simplifiedBuilder = {
    ...(nextData.simplifiedBuilder || {}),
    coreSetup: {
      ...(nextData.simplifiedBuilder?.coreSetup || {}),
      sizes: {
        ...(nextData.simplifiedBuilder?.coreSetup?.sizes || {}),
        settings: {
          ...(nextData.simplifiedBuilder?.coreSetup?.sizes?.settings || {}),
          customSize: {
            ...(nextData.simplifiedBuilder?.coreSetup?.sizes?.settings?.customSize || {}),
            pricings: primaryPricing.customPricing,
          },
        },
      },
      pricing: {
        ...(nextData.simplifiedBuilder?.coreSetup?.pricing || {}),
        label: pricingSettings.label,
        description: pricingSettings.description,
        priceOptions: pricingSettings.priceOptions,
      },
    },
  };

  return nextData;
};

function ClassicPricingOptionForm({
  pricing,
  measurementUnit,
  currencySymbol,
  isSubmitting,
  onChange,
  onSave,
  onCancel,
}: {
  pricing: ClassicPricingOption;
  measurementUnit: string;
  currencySymbol: string;
  isSubmitting: boolean;
  onChange: (next: ClassicPricingOption) => void;
  onSave: () => void;
  onCancel: () => void;
}) {
  const surfaceUnitLabel = `${measurementUnit}²`;

  const patch = (partial: Partial<ClassicPricingOption>) => {
    onChange({
      ...pricing,
      ...partial,
    });
  };

  const patchCustomUnit = (
    field: "surface" | "basePrice" | "charPrice",
    value: string,
  ) => {
    patch({
      customPricing: {
        ...pricing.customPricing,
        unit: {
          ...pricing.customPricing.unit,
          [field]: toNumber(value, 0),
        },
      },
    });
  };

  const addCustomRange = () => {
    const lastSurface =
      pricing.customPricing.range.length > 0
        ? pricing.customPricing.range[pricing.customPricing.range.length - 1].surface
        : 0;
    patch({
      customPricing: {
        ...pricing.customPricing,
        range: [
          ...pricing.customPricing.range,
          {
            surface: lastSurface + 1,
            basePrice: 0,
            charPrice: 0,
            shippingPrice: 0,
            widthModifier: 0,
            heightModifier: 0,
            length: 0,
          },
        ],
      },
    });
  };

  const updateCustomRange = (
    index: number,
    field:
      | "surface"
      | "basePrice"
      | "charPrice"
      | "shippingPrice"
      | "widthModifier"
      | "heightModifier"
      | "length",
    value: string,
  ) => {
    const nextRange = [...pricing.customPricing.range];
    nextRange[index] = {
      ...nextRange[index],
      [field]: toNumber(value, 0),
    };
    patch({
      customPricing: {
        ...pricing.customPricing,
        range: nextRange,
      },
    });
  };

  const removeCustomRange = (index: number) => {
    patch({
      customPricing: {
        ...pricing.customPricing,
        range: pricing.customPricing.range.filter((_, currentIndex) => currentIndex !== index),
      },
    });
  };

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <Card>
        <Box padding="300">
          <InlineStack align="end" blockAlign="center">
            <Button onClick={onCancel}>Back to pricings</Button>
          </InlineStack>
        </Box>
      </Card>

      <Card>
        <Box padding="300">
          <div style={{ display: "grid", gap: 16 }}>
            <TextField
              label="Label"
              value={pricing.label}
              onChange={(value) => patch({ label: value })}
              autoComplete="off"
              helpText="Internal name used to identify this pricing profile."
            />

            <Divider />

            <div style={{ display: "grid", gap: 12 }}>
              <InlineStack align="space-between" blockAlign="center">
                <div>
                  <Text as="h3" variant="headingMd">
                    Custom size pricing
                  </Text>
                  <Text as="p" tone="subdued">
                    Keep the setup simple: first choose whether custom sizes use one unit rule or
                    pricing ranges.
                  </Text>
                </div>
              </InlineStack>

              <Card>
                <Box padding="300">
                  <div style={{ display: "grid", gap: 12 }}>
                    <InlineStack align="space-between" blockAlign="center">
                      <div>
                        <Text as="h4" variant="headingSm">
                          Use range pricing
                        </Text>
                        <Text as="p" tone="subdued">
                          Turn this on if custom sizes should fall into pricing brackets instead of
                          using one single unit formula.
                        </Text>
                      </div>
                      <InlineStack gap="200" blockAlign="center">
                        <Text as="span" tone="subdued">
                          No
                        </Text>
                        <ToggleButton
                          checked={pricing.customPricing.type === "range"}
                          onChange={(checked) =>
                            patch({
                              customPricing: {
                                ...pricing.customPricing,
                                type: checked ? "range" : "unit",
                              },
                            })
                          }
                        />
                        <Text as="span" tone="subdued">
                          Yes
                        </Text>
                      </InlineStack>
                    </InlineStack>

                    {pricing.customPricing.type === "range" ? (
                      <>
                        <Divider />
                        <InlineStack align="space-between" blockAlign="center">
                          <div>
                            <Text as="h4" variant="headingSm">
                              Price per unit inside ranges
                            </Text>
                            <Text as="p" tone="subdued">
                              If enabled, each range charges by {surfaceUnitLabel}. If disabled, the
                              range applies one flat amount.
                            </Text>
                          </div>
                          <InlineStack gap="200" blockAlign="center">
                            <Text as="span" tone="subdued">
                              No
                            </Text>
                            <ToggleButton
                              checked={pricing.customPricing.rangePricingPerUnit}
                              onChange={(checked) =>
                                patch({
                                  customPricing: {
                                    ...pricing.customPricing,
                                    rangePricingPerUnit: Boolean(checked),
                                  },
                                })
                              }
                            />
                            <Text as="span" tone="subdued">
                              Yes
                            </Text>
                          </InlineStack>
                        </InlineStack>

                        <Divider />
                        <InlineStack align="space-between" blockAlign="center">
                          <div>
                            <Text as="h4" variant="headingSm">
                              Shipping by weight
                            </Text>
                            <Text as="p" tone="subdued">
                              If enabled, shipping uses volumetric weight. If disabled, shipping is
                              calculated from surface.
                            </Text>
                          </div>
                          <InlineStack gap="200" blockAlign="center">
                            <Text as="span" tone="subdued">
                              No
                            </Text>
                            <ToggleButton
                              checked={pricing.customPricing.shippingMethod === "per-weight"}
                              onChange={(checked) =>
                                patch({
                                  customPricing: {
                                    ...pricing.customPricing,
                                    shippingMethod: checked ? "per-weight" : "per-surface",
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
                  </div>
                </Box>
              </Card>

              {pricing.customPricing.type === "unit" ? (
                <div style={{ display: "grid", gap: 12 }}>
                  <Text as="p" tone="subdued">
                    The customer price is calculated from a single surface rule. Example: if the
                    shop uses {measurementUnit}, the pricing unit is {surfaceUnitLabel}.
                  </Text>
                  <InlineGrid columns={{ xs: 1, md: 3 }} gap="400">
                    <TextField
                      label={`Surface (${surfaceUnitLabel})`}
                      type="number"
                      value={String(pricing.customPricing.unit.surface)}
                      onChange={(value) => patchCustomUnit("surface", value)}
                      autoComplete="off"
                      suffix={surfaceUnitLabel}
                      helpText={`Reference surface used to calculate the unit price in ${surfaceUnitLabel}.`}
                    />
                    <TextField
                      label={`Base price per ${surfaceUnitLabel}`}
                      type="number"
                      value={String(pricing.customPricing.unit.basePrice)}
                      onChange={(value) => patchCustomUnit("basePrice", value)}
                      autoComplete="off"
                      suffix={currencySymbol}
                      helpText="Fixed amount applied for the configured unit surface."
                    />
                    <TextField
                      label="Char price"
                      type="number"
                      value={String(pricing.customPricing.unit.charPrice)}
                      onChange={(value) => patchCustomUnit("charPrice", value)}
                      autoComplete="off"
                      suffix={`${currencySymbol}/char`}
                      helpText="Additional amount charged for each character."
                    />
                  </InlineGrid>
                </div>
              ) : (
                <div style={{ display: "grid", gap: 12 }}>
                  <Text as="p" tone="subdued">
                    Range pricing lets you define brackets by surface. The selected range can
                    either apply one flat amount or a price per surface unit.
                  </Text>

                  <Text as="p" tone="subdued">
                    Shipping is currently set to{" "}
                    {pricing.customPricing.shippingMethod === "per-weight"
                      ? "volumetric weight"
                      : "surface"}{" "}
                    and range pricing is{" "}
                    {pricing.customPricing.rangePricingPerUnit ? "per unit" : "flat by range"}.
                  </Text>

                  {pricing.customPricing.shippingMethod === "per-weight" ? (
                    <TextField
                      label="Volumetric divisor"
                      type="number"
                      value={String(pricing.customPricing.divisorVolumetric)}
                      onChange={(value) =>
                        patch({
                          customPricing: {
                            ...pricing.customPricing,
                            divisorVolumetric: toNumber(value, 5000),
                          },
                        })
                      }
                      autoComplete="off"
                      suffix="cm3/kg"
                      helpText="Used to convert parcel dimensions into volumetric weight for shipping."
                    />
                  ) : null}

                  {pricing.customPricing.range.map((range, index) => (
                    <Card key={`range-${index}`}>
                      <Box padding="300">
                        <div style={{ display: "grid", gap: 12 }}>
                          <InlineStack align="space-between" blockAlign="center">
                            <Text as="h4" variant="headingSm">
                              Range {index + 1}
                            </Text>
                            <Button tone="critical" onClick={() => removeCustomRange(index)}>
                              Remove
                            </Button>
                          </InlineStack>

                          <InlineGrid
                            columns={{
                              xs: 1,
                              md: 2,
                              lg:
                                pricing.customPricing.shippingMethod === "per-weight" ? 3 : 4,
                            }}
                            gap="400"
                          >
                            <TextField
                              label={`Surface (${surfaceUnitLabel})`}
                              type="number"
                              value={String(range.surface)}
                              onChange={(value) => updateCustomRange(index, "surface", value)}
                              autoComplete="off"
                              suffix={surfaceUnitLabel}
                              helpText="Maximum surface covered by this range."
                            />
                            <TextField
                              label={
                                pricing.customPricing.rangePricingPerUnit
                                  ? `Base price per ${surfaceUnitLabel}`
                                  : "Base price"
                              }
                              type="number"
                              value={String(range.basePrice)}
                              onChange={(value) => updateCustomRange(index, "basePrice", value)}
                              autoComplete="off"
                              suffix={
                                pricing.customPricing.rangePricingPerUnit
                                  ? `${currencySymbol}/${surfaceUnitLabel}`
                                  : currencySymbol
                              }
                              helpText={
                                pricing.customPricing.rangePricingPerUnit
                                  ? "Amount charged for each surface unit inside this range."
                                  : "Flat amount applied when the customer falls into this range."
                              }
                            />
                            <TextField
                              label="Char price"
                              type="number"
                              value={String(range.charPrice)}
                              onChange={(value) => updateCustomRange(index, "charPrice", value)}
                              autoComplete="off"
                              suffix={`${currencySymbol}/char`}
                              helpText="Additional amount charged for each character."
                            />
                            {pricing.customPricing.shippingMethod === "per-weight" ? (
                              <>
                                <TextField
                                  label={`Width modifier (${measurementUnit})`}
                                  type="number"
                                  value={String(range.widthModifier)}
                                  onChange={(value) =>
                                    updateCustomRange(index, "widthModifier", value)
                                  }
                                  autoComplete="off"
                                  suffix={measurementUnit}
                                  helpText="Extra width added for shipping package calculation."
                                />
                                <TextField
                                  label={`Height modifier (${measurementUnit})`}
                                  type="number"
                                  value={String(range.heightModifier)}
                                  onChange={(value) =>
                                    updateCustomRange(index, "heightModifier", value)
                                  }
                                  autoComplete="off"
                                  suffix={measurementUnit}
                                  helpText="Extra height added for shipping package calculation."
                                />
                                <TextField
                                  label={`Length (${measurementUnit})`}
                                  type="number"
                                  value={String(range.length)}
                                  onChange={(value) =>
                                    updateCustomRange(index, "length", value)
                                  }
                                  autoComplete="off"
                                  suffix={measurementUnit}
                                  helpText="Package length used with modifiers for volumetric weight."
                                />
                              </>
                            ) : null}
                            <TextField
                              label={
                                pricing.customPricing.shippingMethod === "per-weight"
                                  ? "Shipping price per kg"
                                  : pricing.customPricing.rangePricingPerUnit
                                    ? `Shipping per ${measurementUnit}²`
                                    : "Shipping price"
                              }
                              type="number"
                              value={String(range.shippingPrice)}
                              onChange={(value) => updateCustomRange(index, "shippingPrice", value)}
                              autoComplete="off"
                              suffix={
                                pricing.customPricing.shippingMethod === "per-weight"
                                  ? `${currencySymbol}/kg`
                                  : pricing.customPricing.rangePricingPerUnit
                                    ? `${currencySymbol}/${surfaceUnitLabel}`
                                    : currencySymbol
                              }
                              helpText={
                                pricing.customPricing.shippingMethod === "per-weight"
                                  ? "Shipping amount charged for each calculated kilogram."
                                  : pricing.customPricing.rangePricingPerUnit
                                    ? "Shipping amount charged for each surface unit in this range."
                                    : "Flat shipping amount applied for this range."
                              }
                            />
                          </InlineGrid>
                        </div>
                      </Box>
                    </Card>
                  ))}

                  <InlineStack align="start">
                    <Button onClick={addCustomRange}>Add range</Button>
                  </InlineStack>
                </div>
              )}
            </div>

            <InlineStack align="end" gap="300">
              <Button onClick={onCancel}>Cancel</Button>
              <SaveButton onClick={onSave} disabled={!pricing.label.trim() || isSubmitting}>
                Save pricing
              </SaveButton>
            </InlineStack>
          </div>
        </Box>
      </Card>
    </div>
  );
}

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const { session } = await authenticate.admin(request);
  const configId = parseInt(params.configId || "", 10);
  const formData = await request.formData();
  const operation = String(formData.get("operation") || "");
  const index = parseIndex(formData.get("index"));

  if (Number.isNaN(configId)) {
    return json(jFlashMessage("Invalid configuration", "error"), { status: 400 });
  }

  const configuration = await ConfigurationService.getConfiguration(configId, session.id);
  if (!configuration) {
    return json(jFlashMessage("Configuration not found", "error"), { status: 404 });
  }

  const data = parseConfigData(configuration.data) || {};
  const pricingSettings = getPricingSettings(data);

  if (operation === "add-pricing" || operation === "update-pricing") {
    const nextPricing = parseJsonValue(formData.get("pricing"));
    if (!nextPricing || typeof nextPricing !== "object") {
      return json(jFlashMessage("Invalid pricing payload", "error"), { status: 400 });
    }

    const normalizedPricing = normalizePricingOption(nextPricing);
    const customPricingError = validateCustomPricing(normalizedPricing.customPricing);
    if (customPricingError) {
      return json(jFlashMessage(customPricingError, "error"), { status: 400 });
    }

    if (operation === "add-pricing") {
      pricingSettings.priceOptions.push(normalizedPricing);
    } else if (index >= 0 && pricingSettings.priceOptions[index] != null) {
      pricingSettings.priceOptions[index] = normalizedPricing;
    } else {
      return json(jFlashMessage("Invalid pricing index", "error"), { status: 400 });
    }
  } else if (operation === "delete-pricing") {
    if (index < 0 || pricingSettings.priceOptions[index] == null) {
      return json(jFlashMessage("Invalid pricing index", "error"), { status: 400 });
    }
    pricingSettings.priceOptions = pricingSettings.priceOptions.filter(
      (_item, itemIndex) => itemIndex !== index,
    );
  } else if (operation === "duplicate-pricing") {
    if (index < 0 || pricingSettings.priceOptions[index] == null) {
      return json(jFlashMessage("Invalid pricing index", "error"), { status: 400 });
    }
    const clonedPricing = JSON.parse(JSON.stringify(pricingSettings.priceOptions[index]));
    const sourceLabel = String(clonedPricing?.label || "").trim();
    clonedPricing.label = sourceLabel ? `${sourceLabel} (copy)` : `Pricing ${pricingSettings.priceOptions.length + 1}`;
    pricingSettings.priceOptions.splice(index + 1, 0, clonedPricing);
  } else {
    return json(jFlashMessage("Unsupported operation", "error"), { status: 400 });
  }

  if (pricingSettings.priceOptions.length === 0) {
    pricingSettings.priceOptions = [buildFallbackPricingOption(data)];
  }

  const nextData = syncPricingIntoData(data, pricingSettings);
  await ConfigurationService.updateConfiguration(
    {
      ...(configuration as any),
      products: Array.isArray((configuration as any)?.product)
        ? (configuration as any).product
        : Array.isArray((configuration as any)?.products)
          ? (configuration as any).products
          : [],
      data: nextData,
    },
    session.id,
  );

  return json(jFlashMessage("Pricing updated successfully"));
};

export default function ClassicRequiredPricingRoute() {
  const { configuration } = useOutletContext<{ configuration: any }>();
  const submit = useSubmit();
  const navigation = useNavigation();

  useHandleFlashMessage();

  const data = useMemo(() => parseConfigData(configuration?.data) || {}, [configuration?.data]);
  const pricingSettings = useMemo(() => getPricingSettings(data), [data]);
  const measurementUnit = String(
    data?.settings?.customizerSign?.customizerOptions?.measurementUnit ||
      data?.customizerSign?.customizerOptions?.measurementUnit ||
      "mm",
  );
  const currencySymbol = String(
    data?.currencySymbol || data?.settings?.currencySymbol || "$",
  );

  const [showForm, setShowForm] = useState(false);
  const [editingPricing, setEditingPricing] = useState<ClassicPricingOption | null>(null);
  const [pricingState, setPricingState] = useState<PricingSectionSettings>(pricingSettings);

  const isSubmitting = navigation.state === "submitting";

  useEffect(() => {
    setPricingState(pricingSettings);
  }, [pricingSettings]);

  const closeForm = () => {
    setShowForm(false);
    setEditingPricing(null);
  };

  const savePricing = () => {
    if (!editingPricing) return;

    submit(
      {
        operation: editingPricing.id != null ? "update-pricing" : "add-pricing",
        ...(editingPricing.id != null ? { index: String(editingPricing.id) } : {}),
        pricing: JSON.stringify({
          ...editingPricing,
          id: undefined,
        }),
      },
      { method: "POST" },
    );
    closeForm();
  };

  const handleDelete = (index: number) => {
    submit(
      {
        operation: "delete-pricing",
        index: String(index),
      },
      { method: "POST" },
    );
  };

  const handleDuplicate = (index: number) => {
    submit(
      {
        operation: "duplicate-pricing",
        index: String(index),
      },
      { method: "POST" },
    );
  };

  return (
    <div style={{ display: "grid", gap: 12 }}>
      {!showForm ? (
        <Card>
          <Box padding="300">
            <InlineStack align="space-between" blockAlign="center">
              <div>
                <Text as="h2" variant="headingLg">
                  Pricing
                </Text>
                <Text as="p" tone="subdued">
                  Create pricing profiles for custom size rules only. Regular sizes keep their own
                  pricing in the size records.
                </Text>
              </div>
              <Button
                icon={PlusIcon}
                variant="primary"
                tone="success"
                onClick={() => {
                  setEditingPricing({
                    ...buildFallbackPricingOption(data),
                    label: "",
                  });
                  setShowForm(true);
                }}
              >
                Add new pricing
              </Button>
            </InlineStack>
          </Box>
        </Card>
      ) : null}

      {showForm && editingPricing ? (
        <ClassicPricingOptionForm
          pricing={editingPricing}
          measurementUnit={measurementUnit}
          currencySymbol={currencySymbol}
          isSubmitting={isSubmitting}
          onChange={setEditingPricing}
          onSave={savePricing}
          onCancel={closeForm}
        />
      ) : null}

      {!showForm ? (
        <Card>
          <Box padding="300">
            <Text as="h3" variant="headingMd">
              Pricing List
            </Text>
            <Box paddingBlockStart="200" />
            <IndexTable
              resourceName={{ singular: "pricing", plural: "pricings" }}
              itemCount={pricingState.priceOptions.length}
              selectable={false}
              headings={[
                { title: "Label" },
                { title: "Custom Size" },
                { title: "Shipping" },
                { title: "Actions" },
              ]}
            >
              {pricingState.priceOptions.map((pricing, index) => (
                <IndexTable.Row id={`${index}`} key={`${index}`} position={index}>
                  <IndexTable.Cell>
                    <Text as="span" fontWeight="semibold">
                      {pricing.label || `Pricing ${index + 1}`}
                    </Text>
                  </IndexTable.Cell>
                  <IndexTable.Cell>
                    {pricing.customPricing.type === "range" ? "Range" : "Unit"}
                  </IndexTable.Cell>
                  <IndexTable.Cell>
                    {pricing.customPricing.type === "range"
                      ? pricing.customPricing.shippingMethod === "per-weight"
                        ? "Weight"
                        : "Surface"
                      : "-"}
                  </IndexTable.Cell>
                  <IndexTable.Cell>
                    <InlineStack gap="200">
                      <Button
                        icon={EditIcon}
                        onClick={() => {
                          setEditingPricing({ ...pricing, id: index });
                          setShowForm(true);
                        }}
                      >
                        Edit
                      </Button>
                      <Button icon={DuplicateIcon} onClick={() => handleDuplicate(index)}>
                        Duplicate
                      </Button>
                      <Button tone="critical" icon={DeleteIcon} onClick={() => handleDelete(index)}>
                        Delete
                      </Button>
                    </InlineStack>
                  </IndexTable.Cell>
                </IndexTable.Row>
              ))}
            </IndexTable>
          </Box>
        </Card>
      ) : null}
    </div>
  );
}
