import { json } from "@remix-run/node";
import type { ActionFunctionArgs } from "@remix-run/node";
import {
  Box,
  Button,
  Card,
  Divider,
  Icon,
  IndexTable,
  InlineGrid,
  InlineStack,
  Select,
  Text,
  TextField,
} from "@shopify/polaris";
import { DeleteIcon, DragHandleIcon, EditIcon, PlusIcon } from "@shopify/polaris-icons";
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigation, useOutletContext, useSubmit } from "@remix-run/react";
import ClassicSizeForm, {
  type ClassicSizeFormItem,
  type ClassicSizeMaterialOption,
} from "~/components/layouts/ClassicSizeForm";
import { SaveButton, ToggleButton } from "~/components/buttons";
import useHandleFlashMessage from "~/hooks/useHandleFlashMessage";
import ConfigurationService from "~/models/Configuration.service";
import { authenticate } from "~/shopify.server";
import Sortable from "~/utils/sortable-adapter";
import { ensureClassicSimplifiedBuilderData } from "~/utils/simplified-builder-data";
import { jFlashMessage } from "~/utils/message-flash";
import {
  getClassicDataMaterialType,
  getClassicDataPricingMode,
  getClassicDataProductType,
} from "~/utils/classic-config-data";

type MaterialOption = ClassicSizeMaterialOption;
type SizeItem = ClassicSizeFormItem;

type SizeSectionSettings = {
  label: string;
  description: string;
  thickness: {
    active: boolean;
    values: Array<{
      label: string;
      value: number;
      pricingType: "additional" | "multiplier";
      additionalPrice: number;
      multiplier: number;
    }>;
  };
  customSize: {
    active: boolean;
    hideSizes?: boolean;
    width: {
      label: string;
      min: number;
      max: number;
    };
    height: {
      label: string;
      min: number;
      max: number;
    };
    pricings: {
      type: "unit" | "range";
      rangePricingPerUnit: boolean;
      unit: {
        basePrice: number;
        surface: number;
        charPrice: number;
      };
      range: Array<{
        basePrice: number;
        surface: number;
        charPrice: number;
      }>;
    };
  };
};

const defaultSizeSectionSettings = (): SizeSectionSettings => ({
  label: "Sizes",
  description: "",
  thickness: {
    active: false,
    values: [],
  },
  customSize: {
    active: false,
    hideSizes: false,
    width: {
      label: "Width",
      min: 0,
      max: 1000,
    },
    height: {
      label: "Height",
      min: 0,
      max: 1000,
    },
    pricings: {
      type: "unit",
      rangePricingPerUnit: false,
      unit: {
        basePrice: 0,
        surface: 0,
        charPrice: 0,
      },
      range: [],
    },
  },
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

const createSizeId = (label: string, width: number, height: number) => {
  const slug = String(label || `${width}x${height}`)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  return `size-${slug || "item"}-${width}-${height}`;
};

const ensureOneDefault = (items: SizeItem[], preferredIndex?: number) => {
  if (!items.length) return [];

  const existingIndex = items.findIndex((item) => item.isDefault);
  const targetIndex =
    typeof preferredIndex === "number" && preferredIndex >= 0 && preferredIndex < items.length
      ? preferredIndex
      : existingIndex >= 0
        ? existingIndex
        : 0;

  return items.map((item, index) => ({
    ...item,
    isDefault: index === targetIndex,
  }));
};

const getMaterialOptions = (data: any): MaterialOption[] => {
  const modularMaterials = Array.isArray(data?.additionalOptions?.materials?.items)
    ? data.additionalOptions.materials.items
    : [];

  if (modularMaterials.length > 0) {
    return modularMaterials.map((material: any, index: number) => ({
      id: String(material?.id || `material-${index}`),
      label: String(material?.label || material?.name || `Material ${index + 1}`),
    }));
  }

  const legacyMaterials = Array.isArray(data?.materials) ? data.materials : [];
  return legacyMaterials.map((material: any, index: number) => ({
    id: String(material?.id || material?.name || `material-${index}`),
    label: String(material?.name || `Material ${index + 1}`),
  }));
};

const getLegacyAdvancedSizes = (data: any, materialOptions: MaterialOption[]): SizeItem[] => {
  const legacyMaterials = Array.isArray(data?.materials) ? data.materials : [];
  const seen = new Set<string>();
  const items: SizeItem[] = [];
  const allMaterialIds = materialOptions.map((item) => item.id);

  legacyMaterials.forEach((material: any, materialIndex: number) => {
    if (String(material?.type || "").toLowerCase() !== "advance") return;

    const materialId = String(material?.id || material?.name || `material-${materialIndex}`);
    const components = Array.isArray(material?.data) ? material.data : [];

    components.forEach((component: any) => {
      const options = Array.isArray(component?.options) ? component.options : [];

      options.forEach((option: any) => {
        const width = toNumber(option?.size?.width, NaN);
        const height = toNumber(option?.size?.height, NaN);
        if (!Number.isFinite(width) || !Number.isFinite(height)) return;

        const id = createSizeId(option?.size?.label || `${width}x${height}`, width, height);
        if (seen.has(id)) return;
        seen.add(id);

        items.push({
          id,
          label: String(option?.size?.label || `${width}x${height}`),
          width,
          height,
          textNumber: 0,
          maxTextChar: toNumber(option?.size?.maxTextChar, 0),
          charPrice: toNumber(option?.size?.charPrice, 0),
          basePrice: toNumber(option?.size?.basePrice, 0),
          startPriceAtChar: toNumber(option?.size?.startPriceAtChar, 0),
          isDefault: Boolean(option?.isDefault),
          excludeMaterials: allMaterialIds.filter((id) => id !== materialId),
        });
      });
    });
  });

  return ensureOneDefault(items);
};

const getSizesSettings = (data: any): SizeSectionSettings => {
  const defaults = defaultSizeSectionSettings();
  const requiredOptionsSettings = data?.requiredOptions?.sizes;
  if (requiredOptionsSettings && typeof requiredOptionsSettings === "object") {
    return {
      ...defaults,
      ...requiredOptionsSettings,
      label: String(requiredOptionsSettings?.label || defaults.label),
      description: String(requiredOptionsSettings?.description || ""),
      thickness: {
        ...defaults.thickness,
        ...(requiredOptionsSettings?.thickness || {}),
        values: Array.isArray(requiredOptionsSettings?.thickness?.values)
          ? requiredOptionsSettings.thickness.values.map((item: any) => ({
              label: String(item?.label || ""),
              value: toNumber(item?.value, 0),
              pricingType: item?.pricingType === "multiplier" ? "multiplier" : "additional",
              additionalPrice: toNumber(item?.additionalPrice, 0),
              multiplier: toNumber(item?.multiplier, 1),
            }))
          : [],
      },
      customSize: {
        ...defaults.customSize,
        ...(requiredOptionsSettings?.customSize || {}),
        hideSizes: Boolean(requiredOptionsSettings?.customSize?.hideSizes),
        width: {
          ...defaults.customSize.width,
          ...(requiredOptionsSettings?.customSize?.width || {}),
          min: toNumber(requiredOptionsSettings?.customSize?.width?.min, defaults.customSize.width.min),
          max: toNumber(requiredOptionsSettings?.customSize?.width?.max, defaults.customSize.width.max),
        },
        height: {
          ...defaults.customSize.height,
          ...(requiredOptionsSettings?.customSize?.height || {}),
          min: toNumber(requiredOptionsSettings?.customSize?.height?.min, defaults.customSize.height.min),
          max: toNumber(requiredOptionsSettings?.customSize?.height?.max, defaults.customSize.height.max),
        },
        pricings: {
          ...defaults.customSize.pricings,
          ...(requiredOptionsSettings?.customSize?.pricings || {}),
          unit: {
            ...defaults.customSize.pricings.unit,
            ...(requiredOptionsSettings?.customSize?.pricings?.unit || {}),
            basePrice: toNumber(
              requiredOptionsSettings?.customSize?.pricings?.unit?.basePrice,
              defaults.customSize.pricings.unit.basePrice,
            ),
            surface: toNumber(
              requiredOptionsSettings?.customSize?.pricings?.unit?.surface,
              defaults.customSize.pricings.unit.surface,
            ),
            charPrice: toNumber(
              requiredOptionsSettings?.customSize?.pricings?.unit?.charPrice,
              defaults.customSize.pricings.unit.charPrice,
            ),
          },
          range: Array.isArray(requiredOptionsSettings?.customSize?.pricings?.range)
            ? requiredOptionsSettings.customSize.pricings.range.map((item: any) => ({
                basePrice: toNumber(item?.basePrice, 0),
                surface: toNumber(item?.surface, 0),
                charPrice: toNumber(item?.charPrice, 0),
              }))
            : [],
        },
      },
    };
  }

  const legacyMaterial = Array.isArray(data?.materials) ? data.materials[0] : null;
  return {
    ...defaults,
    thickness: {
      ...defaults.thickness,
      ...(legacyMaterial?.data?.sizes?.thickness || {}),
      values: Array.isArray(legacyMaterial?.data?.sizes?.thickness?.values)
        ? legacyMaterial.data.sizes.thickness.values.map((item: any) => ({
            label: String(item?.label || ""),
            value: toNumber(item?.value, 0),
            pricingType: item?.pricingType === "multiplier" ? "multiplier" : "additional",
            additionalPrice: toNumber(item?.additionalPrice, 0),
            multiplier: toNumber(item?.multiplier, 1),
          }))
        : [],
    },
    customSize: {
      ...defaults.customSize,
      ...(legacyMaterial?.data?.sizes?.customSize || {}),
      hideSizes: Boolean(legacyMaterial?.data?.sizes?.customSize?.hideSizes),
      width: {
        ...defaults.customSize.width,
        ...(legacyMaterial?.data?.sizes?.customSize?.width || {}),
        min: toNumber(
          legacyMaterial?.data?.sizes?.customSize?.width?.min,
          defaults.customSize.width.min,
        ),
        max: toNumber(
          legacyMaterial?.data?.sizes?.customSize?.width?.max,
          defaults.customSize.width.max,
        ),
      },
      height: {
        ...defaults.customSize.height,
        ...(legacyMaterial?.data?.sizes?.customSize?.height || {}),
        min: toNumber(
          legacyMaterial?.data?.sizes?.customSize?.height?.min,
          defaults.customSize.height.min,
        ),
        max: toNumber(
          legacyMaterial?.data?.sizes?.customSize?.height?.max,
          defaults.customSize.height.max,
        ),
      },
      pricings: {
        ...defaults.customSize.pricings,
        ...(legacyMaterial?.data?.sizes?.customSize?.pricings || {}),
        unit: {
          ...defaults.customSize.pricings.unit,
          ...(legacyMaterial?.data?.sizes?.customSize?.pricings?.unit || {}),
          basePrice: toNumber(
            legacyMaterial?.data?.sizes?.customSize?.pricings?.unit?.basePrice,
            defaults.customSize.pricings.unit.basePrice,
          ),
          surface: toNumber(
            legacyMaterial?.data?.sizes?.customSize?.pricings?.unit?.surface,
            defaults.customSize.pricings.unit.surface,
          ),
          charPrice: toNumber(
            legacyMaterial?.data?.sizes?.customSize?.pricings?.unit?.charPrice,
            defaults.customSize.pricings.unit.charPrice,
          ),
        },
        range: Array.isArray(legacyMaterial?.data?.sizes?.customSize?.pricings?.range)
          ? legacyMaterial.data.sizes.customSize.pricings.range.map((item: any) => ({
              basePrice: toNumber(item?.basePrice, 0),
              surface: toNumber(item?.surface, 0),
              charPrice: toNumber(item?.charPrice, 0),
            }))
          : [],
      },
    },
  };
};

const getStoredSizes = (data: any, materialOptions: MaterialOption[]): SizeItem[] => {
  const stored = data?.requiredOptions?.sizes?.items;
  if (Array.isArray(stored) && stored.length > 0) {
    return ensureOneDefault(
      stored.map((item: any) => ({
        id: String(
          item?.id || createSizeId(item?.label, toNumber(item?.width), toNumber(item?.height)),
        ),
        label: String(item?.label || ""),
        width: toNumber(item?.width),
        height: toNumber(item?.height),
        textNumber: toNumber(item?.textNumber, 0),
        maxTextChar: toNumber(item?.maxTextChar, 0),
        charPrice: toNumber(item?.charPrice, 0),
        basePrice: toNumber(item?.basePrice, 0),
        startPriceAtChar: toNumber(item?.startPriceAtChar, 0),
        isDefault: Boolean(item?.isDefault),
        excludeMaterials: Array.isArray(item?.excludeMaterials)
          ? item.excludeMaterials.map(String)
          : [],
      })),
    );
  }

  return getLegacyAdvancedSizes(data, materialOptions);
};

const createEmptySize = (isDefault = false): SizeItem => ({
  id: "",
  label: "",
  width: 100,
  height: 50,
  textNumber: 0,
  maxTextChar: 0,
  charPrice: 0,
  basePrice: 0,
  startPriceAtChar: 0,
  isDefault,
  excludeMaterials: [],
});

const normalizeThicknessValues = (
  values: SizeSectionSettings["thickness"]["values"] = [],
): SizeSectionSettings["thickness"]["values"] =>
  values.map((item) => ({
    label: String(item?.label || "").trim(),
    value: toNumber(item?.value, 0),
    pricingType: item?.pricingType === "multiplier" ? "multiplier" : "additional",
    additionalPrice: toNumber(item?.additionalPrice, 0),
    multiplier: toNumber(item?.multiplier, 1),
  }));

const validateThicknessValues = (
  values: SizeSectionSettings["thickness"]["values"] = [],
): string | null => {
  const normalized = normalizeThicknessValues(values);
  const seenLabels = new Set<string>();
  const seenValues = new Set<string>();

  for (const item of normalized) {
    if (!item.label) {
      return "Each thickness must have a label.";
    }

    const labelKey = item.label.toLowerCase();
    if (seenLabels.has(labelKey)) {
      return "Thickness labels must be unique.";
    }
    seenLabels.add(labelKey);

    const valueKey = String(item.value);
    if (seenValues.has(valueKey)) {
      return "Thickness values must be unique.";
    }
    seenValues.add(valueKey);
  }

  return null;
};

const syncSizesIntoData = (data: any, settings: SizeSectionSettings, sizes: SizeItem[]) => {
  const nextData = ensureClassicSimplifiedBuilderData({
    data,
    materialType: getClassicDataMaterialType(data),
    productType: getClassicDataProductType(data),
    pricingMode: getClassicDataPricingMode(data),
  });

  nextData.requiredOptions = {
    ...(nextData.requiredOptions || {}),
    sizes: {
      ...(nextData.requiredOptions?.sizes || {}),
      label: settings.label,
      description: settings.description,
      thickness: settings.thickness,
      customSize: settings.customSize,
      items: sizes,
    },
  };

  return nextData;
};

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const { session } = await authenticate.admin(request);
  const configId = parseInt(params.configId || "", 10);
  const formData = await request.formData();
  const operation = String(formData.get("operation") || "");

  if (Number.isNaN(configId)) {
    return json(jFlashMessage("Invalid configuration", "error"), { status: 400 });
  }

  const configuration = await ConfigurationService.getConfiguration(configId, session.id);
  if (!configuration) {
    return json(jFlashMessage("Configuration not found", "error"), { status: 404 });
  }

  const data = parseConfigData(configuration.data) || {};
  const materialOptions = getMaterialOptions(data);
  const currentSettings = getSizesSettings(data);
  let sizes = getStoredSizes(data, materialOptions);

  if (operation === "save-size") {
    const nextSize = parseJsonValue(formData.get("size"));
    const editIndex = parseIndex(formData.get("index"));
    if (!nextSize) {
      return json(jFlashMessage("Invalid size data", "error"), { status: 400 });
    }

    const normalizedSize: SizeItem = {
      id: String(
        nextSize.id || createSizeId(nextSize.label, toNumber(nextSize.width), toNumber(nextSize.height)),
      ),
      label: String(nextSize.label || ""),
      width: toNumber(nextSize.width),
      height: toNumber(nextSize.height),
      textNumber: toNumber(nextSize.textNumber, 0),
      maxTextChar: toNumber(nextSize.maxTextChar, 0),
      charPrice: toNumber(nextSize.charPrice, 0),
      basePrice: toNumber(nextSize.basePrice, 0),
      startPriceAtChar: toNumber(nextSize.startPriceAtChar, 0),
      isDefault: Boolean(nextSize.isDefault),
      excludeMaterials: Array.isArray(nextSize.excludeMaterials)
        ? nextSize.excludeMaterials.map(String)
        : [],
    };

    if (editIndex >= 0 && editIndex < sizes.length) {
      sizes[editIndex] = normalizedSize;
    } else {
      sizes.push(normalizedSize);
    }

    sizes = ensureOneDefault(sizes, normalizedSize.isDefault ? sizes.findIndex((item) => item.id === normalizedSize.id) : undefined);
  } else if (operation === "delete-size") {
    const index = parseIndex(formData.get("index"));
    sizes = sizes.filter((_, currentIndex) => currentIndex !== index);
    sizes = ensureOneDefault(sizes);
  } else if (operation === "set-default-size") {
    const index = parseIndex(formData.get("index"));
    sizes = ensureOneDefault(sizes, index);
  } else if (operation === "reorder-sizes") {
    const nextSizes = parseJsonValue(formData.get("sizes"));
    if (!Array.isArray(nextSizes)) {
      return json(jFlashMessage("Invalid sizes order", "error"), { status: 400 });
    }
    sizes = ensureOneDefault(
      nextSizes.map((item: any) => ({
        id: String(item?.id || createSizeId(item?.label, toNumber(item?.width), toNumber(item?.height))),
        label: String(item?.label || ""),
        width: toNumber(item?.width),
        height: toNumber(item?.height),
        textNumber: toNumber(item?.textNumber, 0),
        maxTextChar: toNumber(item?.maxTextChar, 0),
        charPrice: toNumber(item?.charPrice, 0),
        basePrice: toNumber(item?.basePrice, 0),
        startPriceAtChar: toNumber(item?.startPriceAtChar, 0),
        isDefault: Boolean(item?.isDefault),
        excludeMaterials: Array.isArray(item?.excludeMaterials)
          ? item.excludeMaterials.map(String)
          : [],
      })),
    );
  } else if (operation === "save-size-settings") {
    const nextSettings = parseJsonValue(formData.get("settings"));
    if (!nextSettings || typeof nextSettings !== "object") {
      return json(jFlashMessage("Invalid size settings", "error"), { status: 400 });
    }
    const normalizedThicknessValues = normalizeThicknessValues(nextSettings?.thickness?.values);
    const thicknessError = nextSettings?.thickness?.active
      ? validateThicknessValues(normalizedThicknessValues)
      : null;
    if (thicknessError) {
      return json(jFlashMessage(thicknessError, "error"), { status: 400 });
    }
    currentSettings.label = String(nextSettings.label || "Sizes");
    currentSettings.description = String(nextSettings.description || "");
    currentSettings.thickness = {
      active: Boolean(nextSettings?.thickness?.active),
      values: normalizedThicknessValues,
    };
    currentSettings.customSize = {
      active: Boolean(nextSettings?.customSize?.active),
      hideSizes: Boolean(nextSettings?.customSize?.hideSizes),
      width: {
        label: String(nextSettings?.customSize?.width?.label || "Width"),
        min: toNumber(nextSettings?.customSize?.width?.min, 0),
        max: toNumber(nextSettings?.customSize?.width?.max, 1000),
      },
      height: {
        label: String(nextSettings?.customSize?.height?.label || "Height"),
        min: toNumber(nextSettings?.customSize?.height?.min, 0),
        max: toNumber(nextSettings?.customSize?.height?.max, 1000),
      },
      pricings: {
        type: nextSettings?.customSize?.pricings?.type === "range" ? "range" : "unit",
        rangePricingPerUnit: Boolean(nextSettings?.customSize?.pricings?.rangePricingPerUnit),
        unit: {
          basePrice: toNumber(nextSettings?.customSize?.pricings?.unit?.basePrice, 0),
          surface: toNumber(nextSettings?.customSize?.pricings?.unit?.surface, 0),
          charPrice: toNumber(nextSettings?.customSize?.pricings?.unit?.charPrice, 0),
        },
        range: Array.isArray(nextSettings?.customSize?.pricings?.range)
          ? nextSettings.customSize.pricings.range.map((item: any) => ({
              basePrice: toNumber(item?.basePrice, 0),
              surface: toNumber(item?.surface, 0),
              charPrice: toNumber(item?.charPrice, 0),
            }))
          : [],
      },
    };
  } else {
    return json(jFlashMessage("Unsupported operation", "error"), { status: 400 });
  }

  const nextData = syncSizesIntoData(data, currentSettings, sizes);
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

  return json(jFlashMessage("Sizes updated successfully"));
};

export default function ClassicRequiredSizesRoute() {
  const { configuration } = useOutletContext<{ configuration: any }>();
  const submit = useSubmit();
  const navigation = useNavigation();
  const tableWrapperRef = useRef<HTMLDivElement | null>(null);
  const sortableRef = useRef<Sortable | null>(null);

  useHandleFlashMessage();

  const data = useMemo(() => parseConfigData(configuration?.data) || {}, [configuration?.data]);
  const materialOptions = useMemo(() => getMaterialOptions(data), [data]);
  const storedSettings = useMemo(() => getSizesSettings(data), [data]);
  const storedSizes = useMemo(() => getStoredSizes(data, materialOptions), [data, materialOptions]);

  const [sizesSettings, setSizesSettings] = useState<SizeSectionSettings>(storedSettings);
  const [sizesState, setSizesState] = useState<SizeItem[]>(storedSizes);
  const [showForm, setShowForm] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [formState, setFormState] = useState<SizeItem>(createEmptySize(storedSizes.length === 0));
  const [settingsError, setSettingsError] = useState<string | null>(null);

  const isSubmitting = navigation.state === "submitting";

  useEffect(() => {
    setSizesSettings(storedSettings);
  }, [storedSettings]);

  useEffect(() => {
    setSizesState(storedSizes);
  }, [storedSizes]);

  useEffect(() => {
    if (!tableWrapperRef.current || showForm || sizesState.length <= 1) return;
    const tbody = tableWrapperRef.current.querySelector("tbody");
    if (!tbody) return;

    sortableRef.current?.destroy();
    sortableRef.current = Sortable.create(tbody, {
      handle: ".drag-handle",
      animation: 120,
      onEnd: (evt) => {
        const oldIndex = evt.oldIndex ?? -1;
        const newIndex = evt.newIndex ?? -1;
        if (oldIndex < 0 || newIndex < 0 || oldIndex === newIndex) return;

        setSizesState((current) => {
          const next = [...current];
          const [moved] = next.splice(oldIndex, 1);
          next.splice(newIndex, 0, moved);
          submit(
            {
              operation: "reorder-sizes",
              sizes: JSON.stringify(next),
            },
            { method: "POST" },
          );
          return next;
        });
      },
    });

    return () => {
      sortableRef.current?.destroy();
      sortableRef.current = null;
    };
  }, [showForm, sizesState, submit]);

  const openNewForm = () => {
    setEditingIndex(null);
    setFormState(createEmptySize(sizesState.length === 0));
    setShowForm(true);
  };

  const openEditForm = (index: number) => {
    setEditingIndex(index);
    setFormState(sizesState[index]);
    setShowForm(true);
  };

  const closeForm = () => {
    setEditingIndex(null);
    setFormState(createEmptySize(sizesState.length === 0));
    setShowForm(false);
  };

  const saveSize = () => {
    const normalized: SizeItem = {
      ...formState,
      id: formState.id || createSizeId(formState.label, formState.width, formState.height),
      label: String(formState.label || "").trim(),
      width: toNumber(formState.width),
      height: toNumber(formState.height),
      textNumber: toNumber(formState.textNumber, 0),
      maxTextChar: toNumber(formState.maxTextChar, 0),
      charPrice: toNumber(formState.charPrice, 0),
      basePrice: toNumber(formState.basePrice, 0),
      startPriceAtChar: toNumber(formState.startPriceAtChar, 0),
      excludeMaterials: [...formState.excludeMaterials],
    };

    if (!normalized.label) return;

    setSizesState((current) => {
      const next = [...current];
      if (editingIndex !== null && editingIndex >= 0) {
        next[editingIndex] = normalized;
      } else {
        next.push(normalized);
      }
      return ensureOneDefault(
        next,
        normalized.isDefault ? next.findIndex((item) => item.id === normalized.id) : undefined,
      );
    });

    submit(
      {
        operation: "save-size",
        index: editingIndex !== null ? String(editingIndex) : "",
        size: JSON.stringify(normalized),
      },
      { method: "POST" },
    );
    closeForm();
  };

  const setDefault = (index: number) => {
    setSizesState((current) => ensureOneDefault(current, index));
    submit(
      {
        operation: "set-default-size",
        index: String(index),
      },
      { method: "POST" },
    );
  };

  const deleteSize = (index: number) => {
    setSizesState((current) => ensureOneDefault(current.filter((_, currentIndex) => currentIndex !== index)));
    submit(
      {
        operation: "delete-size",
        index: String(index),
      },
      { method: "POST" },
    );
  };

  const saveSettings = () => {
    const thicknessError = sizesSettings.thickness.active
      ? validateThicknessValues(sizesSettings.thickness.values)
      : null;
    if (thicknessError) {
      setSettingsError(thicknessError);
      return;
    }

    setSettingsError(null);
    submit(
      {
        operation: "save-size-settings",
        settings: JSON.stringify(sizesSettings),
      },
      { method: "POST" },
    );
  };

  const addThicknessValue = () => {
    setSizesSettings((current) => ({
      ...current,
      thickness: {
        ...current.thickness,
        values: [
          ...current.thickness.values,
          {
            label: "",
            value: 0,
            pricingType: "additional",
            additionalPrice: 0,
            multiplier: 1,
          },
        ],
      },
    }));
  };

  const updateThicknessValue = (
    index: number,
    field: "label" | "value" | "pricingType" | "additionalPrice" | "multiplier",
    value: string,
  ) => {
    setSizesSettings((current) => {
      const nextValues = [...current.thickness.values];
      const currentValue = nextValues[index];
      nextValues[index] = {
        ...currentValue,
        [field]:
          field === "label"
            ? value
            : field === "pricingType"
              ? (value as "additional" | "multiplier")
              : toNumber(value, field === "multiplier" ? 1 : 0),
      };
      return {
        ...current,
        thickness: {
          ...current.thickness,
          values: nextValues,
        },
      };
    });
  };

  const removeThicknessValue = (index: number) => {
    setSizesSettings((current) => ({
      ...current,
      thickness: {
        ...current.thickness,
        values: current.thickness.values.filter((_, currentIndex) => currentIndex !== index),
      },
    }));
  };

  return (
    <div style={{ display: "grid", gap: 12 }}>
      {!showForm ? (
        <Card>
          <Box padding="300">
            <InlineStack align="space-between" blockAlign="center">
              <div>
                <Text as="h2" variant="headingLg">
                  Sizes
                </Text>
                <Text as="p" tone="subdued">
                  Create sizes as standalone options, then exclude them from materials when needed.
                </Text>
              </div>
              <Button variant="primary" tone="success" icon={PlusIcon} onClick={openNewForm}>
                Add new size
              </Button>
            </InlineStack>
          </Box>
        </Card>
      ) : null}

      {showForm ? (
        <ClassicSizeForm
          item={formState}
          isEditing={editingIndex !== null}
          isSubmitting={isSubmitting}
          onChange={setFormState}
          onSave={saveSize}
          onCancel={closeForm}
        />
      ) : null}

      {!showForm ? (
        <>
          <Card>
            <Box padding="300">
              <Text as="h3" variant="headingMd">
                Sizes List
              </Text>
              <Box paddingBlockStart="200" />
              {sizesState.length === 0 ? (
                <Box paddingBlock="600">
                  <InlineStack align="center">
                    <Text as="p" tone="subdued">
                      No sizes added yet.
                    </Text>
                  </InlineStack>
                </Box>
              ) : (
                <div ref={tableWrapperRef}>
                  <IndexTable
                    resourceName={{ singular: "size", plural: "sizes" }}
                    itemCount={sizesState.length}
                    selectable={false}
                    headings={[
                      { title: "" },
                      { title: "Label" },
                      { title: "Dimensions" },
                      { title: "Default" },
                      { title: "Actions" },
                    ]}
                  >
                    {sizesState.map((size, index) => (
                      <IndexTable.Row id={size.id} key={size.id} position={index}>
                        <IndexTable.Cell>
                          <span
                            className="drag-handle"
                            style={{ cursor: "grab", display: "inline-flex" }}
                          >
                            <Icon source={DragHandleIcon} />
                          </span>
                        </IndexTable.Cell>
                        <IndexTable.Cell>
                          <Text as="span" fontWeight="semibold">
                            {size.label}
                          </Text>
                        </IndexTable.Cell>
                        <IndexTable.Cell>
                          <Text as="span">
                            {size.width} x {size.height}
                          </Text>
                        </IndexTable.Cell>
                        <IndexTable.Cell>
                          <ToggleButton
                            checked={size.isDefault}
                            type="radio"
                            name="default-size"
                            value={index}
                            onChange={() => setDefault(index)}
                          />
                        </IndexTable.Cell>
                        <IndexTable.Cell>
                          <InlineStack gap="200">
                            <Button icon={EditIcon} onClick={() => openEditForm(index)}>
                              Edit
                            </Button>
                            <Button
                              icon={DeleteIcon}
                              tone="critical"
                              onClick={() => deleteSize(index)}
                            >
                              Delete
                            </Button>
                          </InlineStack>
                        </IndexTable.Cell>
                      </IndexTable.Row>
                    ))}
                  </IndexTable>
                </div>
              )}
            </Box>
          </Card>

          <Card>
            <Box padding="300">
              <div style={{ display: "grid", gap: 16 }}>
                <Text as="h3" variant="headingMd">
                  Size Settings
                </Text>
                <Text as="p" tone="subdued">
                  Configure how the size option is presented in the customizer.
                </Text>
                {settingsError ? (
                  <Text as="p" tone="critical">
                    {settingsError}
                  </Text>
                ) : null}
                <TextField
                  label="Title"
                  value={sizesSettings.label}
                  onChange={(value) =>
                    setSizesSettings((current) => ({ ...current, label: value }))
                  }
                  autoComplete="off"
                />
                <TextField
                  label="Description"
                  value={sizesSettings.description}
                  onChange={(value) =>
                    setSizesSettings((current) => ({ ...current, description: value }))
                  }
                  autoComplete="off"
                />

                <Divider />

                <div style={{ display: "grid", gap: 12 }}>
                  <InlineStack align="space-between" blockAlign="center">
                    <div>
                      <Text as="h4" variant="headingSm">
                        Thickness
                      </Text>
                      <Text as="p" tone="subdued" variant="bodySm">
                        Enable thickness choices for this configuration.
                      </Text>
                    </div>
                    <ToggleButton
                      checked={sizesSettings.thickness.active}
                      onChange={(checked) =>
                        setSizesSettings((current) => ({
                          ...current,
                          thickness: {
                            ...current.thickness,
                            active: Boolean(checked),
                          },
                        }))
                      }
                    />
                  </InlineStack>

                  {sizesSettings.thickness.active ? (
                    <div style={{ display: "grid", gap: 12 }}>
                      {sizesSettings.thickness.values.map((item, index) => (
                        <Card key={`thickness-${index}`}>
                          <Box padding="300">
                            <div style={{ display: "grid", gap: 12 }}>
                              <InlineStack align="space-between" blockAlign="center">
                                <Text as="h5" variant="headingSm">
                                  Thickness {index + 1}
                                </Text>
                                <Button tone="critical" onClick={() => removeThicknessValue(index)}>
                                  Remove
                                </Button>
                              </InlineStack>
                              <InlineGrid columns={{ xs: 1, md: 2, lg: 3 }} gap="400">
                                <TextField
                                  label="Label"
                                  value={item.label}
                                  onChange={(value) => {
                                    setSettingsError(null);
                                    updateThicknessValue(index, "label", value);
                                  }}
                                  autoComplete="off"
                                />
                                <TextField
                                  label="Value"
                                  type="number"
                                  value={String(item.value)}
                                  onChange={(value) => {
                                    setSettingsError(null);
                                    updateThicknessValue(index, "value", value);
                                  }}
                                  autoComplete="off"
                                />
                                <Select
                                  label="Pricing type"
                                  options={[
                                    { label: "Additional price", value: "additional" },
                                    { label: "Multiplier", value: "multiplier" },
                                  ]}
                                  value={item.pricingType}
                                  onChange={(value) => {
                                    setSettingsError(null);
                                    updateThicknessValue(index, "pricingType", value);
                                  }}
                                />
                                {item.pricingType === "additional" ? (
                                  <TextField
                                    label="Additional price"
                                    type="number"
                                    value={String(item.additionalPrice)}
                                    onChange={(value) => {
                                      setSettingsError(null);
                                      updateThicknessValue(index, "additionalPrice", value);
                                    }}
                                    autoComplete="off"
                                  />
                                ) : (
                                  <TextField
                                    label="Multiplier"
                                    type="number"
                                    value={String(item.multiplier)}
                                    onChange={(value) => {
                                      setSettingsError(null);
                                      updateThicknessValue(index, "multiplier", value);
                                    }}
                                    autoComplete="off"
                                  />
                                )}
                              </InlineGrid>
                            </div>
                          </Box>
                        </Card>
                      ))}

                      <InlineStack align="start">
                        <Button onClick={addThicknessValue}>Add thickness</Button>
                      </InlineStack>
                    </div>
                  ) : null}
                </div>

                <Divider />

                <div style={{ display: "grid", gap: 12 }}>
                  <InlineStack align="space-between" blockAlign="center">
                    <div>
                      <Text as="h4" variant="headingSm">
                        Custom Size
                      </Text>
                      <Text as="p" tone="subdued" variant="bodySm">
                        Enable custom width and height entry with allowed limits.
                      </Text>
                    </div>
                    <ToggleButton
                      checked={sizesSettings.customSize.active}
                      onChange={(checked) =>
                        setSizesSettings((current) => ({
                          ...current,
                          customSize: {
                            ...current.customSize,
                            active: Boolean(checked),
                          },
                        }))
                      }
                    />
                  </InlineStack>

                  {sizesSettings.customSize.active ? (
                    <div style={{ display: "grid", gap: 12 }}>
                      <InlineStack align="space-between" blockAlign="center">
                        <div>
                          <Text as="h5" variant="headingSm">
                            Predefined Sizes Visibility
                          </Text>
                          <Text as="p" tone="subdued" variant="bodySm">
                            Choose whether predefined sizes stay visible in the configurator when custom size is enabled.
                          </Text>
                        </div>
                        <ToggleButton
                          checked={!sizesSettings.customSize.hideSizes}
                          onChange={(checked) =>
                            setSizesSettings((current) => ({
                              ...current,
                              customSize: {
                                ...current.customSize,
                                hideSizes: !checked,
                              },
                            }))
                          }
                        />
                      </InlineStack>
                      <InlineGrid columns={{ xs: 1, md: 2, lg: 3 }} gap="400">
                        <TextField
                          label="Width label"
                          value={sizesSettings.customSize.width.label}
                          onChange={(value) =>
                            setSizesSettings((current) => ({
                              ...current,
                              customSize: {
                                ...current.customSize,
                                width: {
                                  ...current.customSize.width,
                                  label: value,
                                },
                              },
                            }))
                          }
                          autoComplete="off"
                        />
                        <TextField
                          label="Width min"
                          type="number"
                          value={String(sizesSettings.customSize.width.min)}
                          onChange={(value) =>
                            setSizesSettings((current) => ({
                              ...current,
                              customSize: {
                                ...current.customSize,
                                width: {
                                  ...current.customSize.width,
                                  min: toNumber(value, current.customSize.width.min),
                                },
                              },
                            }))
                          }
                          autoComplete="off"
                        />
                        <TextField
                          label="Width max"
                          type="number"
                          value={String(sizesSettings.customSize.width.max)}
                          onChange={(value) =>
                            setSizesSettings((current) => ({
                              ...current,
                              customSize: {
                                ...current.customSize,
                                width: {
                                  ...current.customSize.width,
                                  max: toNumber(value, current.customSize.width.max),
                                },
                              },
                            }))
                          }
                          autoComplete="off"
                        />
                        <TextField
                          label="Height label"
                          value={sizesSettings.customSize.height.label}
                          onChange={(value) =>
                            setSizesSettings((current) => ({
                              ...current,
                              customSize: {
                                ...current.customSize,
                                height: {
                                  ...current.customSize.height,
                                  label: value,
                                },
                              },
                            }))
                          }
                          autoComplete="off"
                        />
                        <TextField
                          label="Height min"
                          type="number"
                          value={String(sizesSettings.customSize.height.min)}
                          onChange={(value) =>
                            setSizesSettings((current) => ({
                              ...current,
                              customSize: {
                                ...current.customSize,
                                height: {
                                  ...current.customSize.height,
                                  min: toNumber(value, current.customSize.height.min),
                                },
                              },
                            }))
                          }
                          autoComplete="off"
                        />
                        <TextField
                          label="Height max"
                          type="number"
                          value={String(sizesSettings.customSize.height.max)}
                          onChange={(value) =>
                            setSizesSettings((current) => ({
                              ...current,
                              customSize: {
                                ...current.customSize,
                                height: {
                                  ...current.customSize.height,
                                  max: toNumber(value, current.customSize.height.max),
                                },
                              },
                            }))
                          }
                          autoComplete="off"
                        />
                      </InlineGrid>
                    </div>
                  ) : null}
                </div>

                <InlineStack align="end">
                  <SaveButton onClick={saveSettings} disabled={isSubmitting} loading={isSubmitting}>
                    Save settings
                  </SaveButton>
                </InlineStack>
              </div>
            </Box>
          </Card>
        </>
      ) : null}
    </div>
  );
}
