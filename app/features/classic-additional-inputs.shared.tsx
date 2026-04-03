import { ensureClassicSimplifiedBuilderData } from "~/utils/simplified-builder-data";
import { parseConfigData } from "~/features/classic-required-colors.shared";

export type AdditionalInputOptionItem = {
  title: string;
  description: string;
  icon: string;
  image: string;
  popupImg: string;
  excludeColors: Array<number | string>;
  additionalPrice: number | string;
  isDefault: boolean;
  enablePricingBySurface: boolean;
  surface: number | string;
};

export type AdditionalInputItem = {
  id: string;
  title: string;
  description: string;
  icon: string;
  options: AdditionalInputOptionItem[];
  rulesByMaterial: Record<string, { enabled: boolean }>;
};

export type AdditionalInputsSectionState = {
  label: string;
  description: string;
  items: AdditionalInputItem[];
};

const slugify = (value: unknown, fallback = "item") => {
  const normalized = String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  return normalized || fallback;
};

const normalizeNumber = (value: unknown, fallback = 0) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

export const emptyAdditionalInputOption = (): AdditionalInputOptionItem => ({
  title: "",
  description: "",
  icon: "",
  image: "",
  popupImg: "",
  excludeColors: [],
  additionalPrice: 0,
  isDefault: false,
  enablePricingBySurface: false,
  surface: 0,
});

export const emptyAdditionalInput = (): AdditionalInputItem => ({
  id: "",
  title: "",
  description: "",
  icon: "",
  options: [emptyAdditionalInputOption()],
  rulesByMaterial: {},
});

export const ensureOneDefaultOption = (options: AdditionalInputOptionItem[]) => {
  if (!options.length) return [];
  const existingIndex = options.findIndex((option) => Boolean(option.isDefault));
  const targetIndex = existingIndex >= 0 ? existingIndex : 0;

  return options.map((option, index) => ({
    ...option,
    isDefault: index === targetIndex,
  }));
};

const createAdditionalInputId = (item: any, index: number) =>
  String(item?.id || `additional-input-${slugify(item?.title || index, `i-${index}`)}`);

const normalizeOption = (option: any, index: number): AdditionalInputOptionItem => ({
  title: String(option?.title || option?.label || `Option ${index + 1}`),
  description: String(option?.description || ""),
  icon: String(option?.icon || ""),
  image: String(option?.image || option?.previewImg || ""),
  popupImg: String(option?.popupImg || option?.popImg || ""),
  excludeColors: Array.isArray(option?.excludeColors)
    ? option.excludeColors.map((entry: any) => String(entry))
    : [],
  additionalPrice: normalizeNumber(option?.additionalPrice ?? option?.price?.value ?? 0),
  isDefault: Boolean(option?.isDefault),
  enablePricingBySurface: Boolean(option?.enablePricingBySurface),
  surface: normalizeNumber(option?.surface ?? 0),
});

const normalizeItem = ({
  item,
  index,
  materialIds,
}: {
  item: any;
  index: number;
  materialIds: string[];
}): AdditionalInputItem => {
  const rulesByMaterial =
    item?.rulesByMaterial && typeof item.rulesByMaterial === "object"
      ? item.rulesByMaterial
      : {};

  const normalizedRules = materialIds.reduce<Record<string, { enabled: boolean }>>(
    (acc, materialId) => {
      acc[materialId] = {
        enabled: rulesByMaterial?.[materialId]?.enabled !== false,
      };
      return acc;
    },
    {},
  );

  const rawOptions = Array.isArray(item?.options) ? item.options : [];

  return {
    id: createAdditionalInputId(item, index),
    title: String(item?.title || `Additional input ${index + 1}`),
    description: String(item?.description || ""),
    icon: String(item?.icon || ""),
    options: ensureOneDefaultOption(rawOptions.map(normalizeOption)),
    rulesByMaterial: normalizedRules,
  };
};

const getMaterialEntries = (data: any) => {
  const modularMaterials = Array.isArray(data?.additionalOptions?.materials?.items)
    ? data.additionalOptions.materials.items
    : Array.isArray(data?.simplifiedBuilder?.customizationOptions?.materials?.items)
      ? data.simplifiedBuilder.customizationOptions.materials.items
      : [];

  if (modularMaterials.length > 0) {
    return modularMaterials.map((item: any, index: number) => ({
      id: String(item?.id || `material-${index}`),
      sourceIndex: Number.isFinite(Number(item?.sourceIndex)) ? Number(item.sourceIndex) : index,
    }));
  }

  const legacyMaterials = Array.isArray(data?.materials) ? data.materials : [];
  return legacyMaterials.map((item: any, index: number) => ({
    id: String(item?.id || `material-${index}`),
    sourceIndex: index,
  }));
};

const getLegacyAdditionalInputs = ({
  materials,
  materialEntries,
}: {
  materials: any[];
  materialEntries: Array<{ id: string; sourceIndex: number }>;
}): AdditionalInputItem[] => {
  const registry = new Map<string, AdditionalInputItem>();

  materials.forEach((material, materialIndex) => {
    const materialId =
      materialEntries.find((entry) => entry.sourceIndex === materialIndex)?.id ||
      String(material?.id || `material-${materialIndex}`);
    const additionalOptions = Array.isArray(material?.data?.additionalOptions)
      ? material.data.additionalOptions
      : [];

    additionalOptions.forEach((item: any, itemIndex: number) => {
      const keyBase =
        String(item?.title || item?.label || "").trim() ||
        String(item?.description || "").trim() ||
        `additional-input-${itemIndex}`;
      const key = slugify(keyBase, `legacy-additional-input-${itemIndex}`);
      const existing = registry.get(key);

      if (existing) {
        existing.rulesByMaterial[materialId] = { enabled: true };
        return;
      }

      const normalized = normalizeItem({
        item: {
          ...item,
          id: String(item?.id || key),
          rulesByMaterial: {
            [materialId]: { enabled: true },
          },
        },
        index: itemIndex,
        materialIds: materialEntries.map((entry) => entry.id),
      });

      normalized.rulesByMaterial = materialEntries.reduce<
        Record<string, { enabled: boolean }>
      >((acc, entry) => {
        acc[entry.id] = { enabled: entry.id === materialId };
        return acc;
      }, {});

      registry.set(key, normalized);
    });
  });

  return Array.from(registry.values());
};

export const getAdditionalInputsState = (rawData: any): AdditionalInputsSectionState => {
  const parsed = parseConfigData(rawData) || {};
  const data = ensureClassicSimplifiedBuilderData({
    data: parsed,
    materialType: parsed?.simplifiedBuilder?.meta?.materialType || "",
    productType: parsed?.simplifiedBuilder?.meta?.productType || "",
    pricingMode: parsed?.simplifiedBuilder?.meta?.pricingMode || null,
  });

  const materialEntries = getMaterialEntries(data);
  const materialIds = materialEntries.map((entry) => entry.id);
  const additionalInputs = Array.isArray(data?.additionalOptions?.components?.items)
    ? data.additionalOptions.components.items
    : Array.isArray(data?.simplifiedBuilder?.customizationOptions?.components?.items)
      ? data.simplifiedBuilder.customizationOptions.components.items
      : Array.isArray(data?.additionalOptions?.additionalInputs?.items)
        ? data.additionalOptions.additionalInputs.items
        : Array.isArray(data?.simplifiedBuilder?.customizationOptions?.additionalInputs?.items)
          ? data.simplifiedBuilder.customizationOptions.additionalInputs.items
      : [];
  const legacyInputs =
    additionalInputs.length > 0
      ? []
      : getLegacyAdditionalInputs({
          materials: Array.isArray(data?.materials) ? data.materials : [],
          materialEntries,
        });

  return {
    label: String(
      data?.additionalOptions?.components?.label ||
        data?.additionalOptions?.additionalInputs?.label ||
        "Additional Components",
    ),
    description: String(
      data?.additionalOptions?.components?.description ||
      data?.additionalOptions?.additionalInputs?.description ||
        "Manage the reusable additional components offered in this configuration.",
    ),
    items:
      additionalInputs.length > 0
        ? additionalInputs.map((item: any, index: number) =>
            normalizeItem({ item, index, materialIds }),
          )
        : legacyInputs,
  };
};

export const syncAdditionalInputsIntoData = ({
  data,
  state,
}: {
  data: any;
  state: AdditionalInputsSectionState;
}) => {
  const nextData = ensureClassicSimplifiedBuilderData({
    data,
    materialType: data?.simplifiedBuilder?.meta?.materialType || "",
    productType: data?.simplifiedBuilder?.meta?.productType || "",
    pricingMode: data?.simplifiedBuilder?.meta?.pricingMode || null,
  });

  const materialEntries = getMaterialEntries(nextData);
  const materialIds = materialEntries.map((entry) => entry.id);

  const normalizedItems = state.items.map((item, index) => ({
    id: String(item.id || createAdditionalInputId(item, index)),
    title: String(item.title || `Additional input ${index + 1}`).trim(),
    description: String(item.description || ""),
    icon: String(item.icon || ""),
    options: ensureOneDefaultOption(
      Array.isArray(item.options)
        ? item.options.map((option, optionIndex) => ({
            ...emptyAdditionalInputOption(),
            ...option,
            title: String(option?.title || `Option ${optionIndex + 1}`).trim(),
            description: String(option?.description || ""),
            icon: String(option?.icon || ""),
            image: String(option?.image || ""),
            popupImg: String(option?.popupImg || ""),
            excludeColors: Array.isArray(option?.excludeColors)
              ? option.excludeColors.map((entry: any) => String(entry))
              : [],
            additionalPrice: normalizeNumber(option?.additionalPrice ?? 0),
            isDefault: Boolean(option?.isDefault),
            enablePricingBySurface: Boolean(option?.enablePricingBySurface),
            surface: normalizeNumber(option?.surface ?? 0),
          }))
        : [emptyAdditionalInputOption()],
    ),
    rulesByMaterial: materialIds.reduce<Record<string, { enabled: boolean }>>((acc, materialId) => {
      acc[materialId] = {
        enabled: item?.rulesByMaterial?.[materialId]?.enabled !== false,
      };
      return acc;
    }, {}),
  }));

  nextData.additionalOptions = {
    ...(nextData.additionalOptions || {}),
    components: {
      label: String(state.label || "Additional Components"),
      description: String(state.description || ""),
      items: normalizedItems,
    },
  };

  nextData.simplifiedBuilder = {
    ...(nextData.simplifiedBuilder || {}),
    customizationOptions: {
      ...(nextData.simplifiedBuilder?.customizationOptions || {}),
      components: {
        label: String(state.label || "Additional Components"),
        description: String(state.description || ""),
        items: normalizedItems,
      },
    },
  };

  if (Array.isArray(nextData.materials)) {
    nextData.materials = nextData.materials.map((material: any, index: number) => {
      const materialEntry = materialEntries.find((entry) => entry.sourceIndex === index);
      const materialId = materialEntry?.id || `material-${index}`;
      const legacyAdditionalInputs = normalizedItems
        .filter((item) => item.rulesByMaterial?.[materialId]?.enabled !== false)
        .map((item) => ({
          title: item.title,
          description: item.description,
          icon: item.icon,
          options: item.options.map((option) => ({
            title: option.title,
            description: option.description,
            icon: option.icon,
            image: option.image,
            popupImg: option.popupImg,
            excludeColors: option.excludeColors.map((entry) => Number(entry)).filter(Number.isFinite),
            isDefault: Boolean(option.isDefault),
            additionalPrice: normalizeNumber(option.additionalPrice),
            enablePricingBySurface: Boolean(option.enablePricingBySurface),
            surface: normalizeNumber(option.surface),
          })),
        }));

      return {
        ...material,
        data: {
          ...(material?.data || {}),
          additionalOptions: legacyAdditionalInputs,
        },
      };
    });
  }

  return nextData;
};
