import { ensureClassicSimplifiedBuilderData } from "~/utils/simplified-builder-data";
import { parseConfigData } from "~/features/classic-required-structural.shared";
import {
  getLegacyComponentsBundle,
  getPricingOptions,
  type RequiredComponentsState,
} from "~/features/classic-required-components.shared";
import type { FixingMethodType, ShapeType } from "~/types/SettingsType";
import {
  getClassicDataMaterialType,
  getClassicDataPricingMode,
  getClassicDataProductType,
} from "~/utils/classic-config-data";

export type MaterialItem = {
  id: string;
  sourceIndex?: number;
  label: string;
  description: string;
  previewImg: string;
  popupImg: string;
  additionalPrice: number | string;
  pricingId: string;
  isDefault: boolean;
  active: boolean;
  excludeComponentIds: string[];
};

export type MaterialSectionState = {
  label: string;
  description: string;
  items: MaterialItem[];
};

const slugify = (value: unknown, fallback = "item") => {
  const normalized = String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  return normalized || fallback;
};

export const emptyMaterial = (): MaterialItem => ({
  id: "",
  sourceIndex: undefined,
  label: "",
  description: "",
  previewImg: "",
  popupImg: "",
  additionalPrice: 0,
  pricingId: "",
  isDefault: false,
  active: true,
  excludeComponentIds: [],
});

export const ensureOneDefault = (items: MaterialItem[], preferredIndex?: number) => {
  if (!items.length) return [];

  const existingIndex = items.findIndex((item) => Boolean(item.isDefault));
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

const createMaterialId = (item: any, index: number) =>
  String(item?.id || `material-${slugify(item?.label || item?.name || index, `m-${index}`)}`);

const normalizeMaterialItem = ({
  item,
  index,
  pricingFallbackId,
  allComponentIds,
  legacyComponentMaterialMap,
}: {
  item: any;
  index: number;
  pricingFallbackId: string;
  allComponentIds: string[];
  legacyComponentMaterialMap: Record<string, string[]>;
}): MaterialItem => {
  const materialId = createMaterialId(item, index);

  const storedExcludeComponentIds = Array.isArray(item?.excludeComponentIds)
    ? item.excludeComponentIds.map(String)
    : [];

  const ownedLegacyComponentIds = allComponentIds.filter((componentId) =>
    Array.isArray(legacyComponentMaterialMap[componentId]) &&
    legacyComponentMaterialMap[componentId].includes(materialId),
  );

  const derivedExcludeComponentIds =
    storedExcludeComponentIds.length > 0
      ? storedExcludeComponentIds
      : allComponentIds.length > 0
        ? allComponentIds.filter((componentId) => !ownedLegacyComponentIds.includes(componentId))
        : [];

  return {
    id: materialId,
    sourceIndex: Number.isFinite(Number(item?.sourceIndex)) ? Number(item.sourceIndex) : index,
    label: String(item?.label || item?.name || `Material ${index + 1}`),
    description: String(item?.description || ""),
    previewImg: String(item?.previewImg || item?.image || item?.icon || ""),
    popupImg: String(item?.popupImg || item?.popupImage || item?.popImg || ""),
    additionalPrice: Number(item?.additionalPrice || item?.price?.value || 0),
    pricingId: String(item?.pricingId || pricingFallbackId || ""),
    isDefault: Boolean(item?.isDefault ?? item?.default),
    active: item?.active !== false,
    excludeComponentIds: Array.from(new Set(derivedExcludeComponentIds.map(String))),
  };
};

const getBaseMaterials = ({
  data,
  pricingFallbackId,
  allComponentIds,
  legacyComponentMaterialMap,
}: {
  data: any;
  pricingFallbackId: string;
  allComponentIds: string[];
  legacyComponentMaterialMap: Record<string, string[]>;
}): MaterialItem[] => {
  const modularItems = Array.isArray(data?.additionalOptions?.materials?.items)
    ? data.additionalOptions.materials.items
    : [];

  if (modularItems.length > 0) {
    return ensureOneDefault(
      modularItems.map((item: any, index: number) =>
        normalizeMaterialItem({
          item,
          index,
          pricingFallbackId,
          allComponentIds,
          legacyComponentMaterialMap,
        }),
      ),
    );
  }

  const legacyMaterials = Array.isArray(data?.materials) ? data.materials : [];
  return ensureOneDefault(
    legacyMaterials.map((item: any, index: number) =>
      normalizeMaterialItem({
        item,
        index,
        pricingFallbackId,
        allComponentIds,
        legacyComponentMaterialMap,
      }),
    ),
  );
};

export const getMaterialsState = ({
  data,
  managedFixingMethods = [],
  managedShapes = [],
}: {
  data: any;
  managedFixingMethods?: FixingMethodType[];
  managedShapes?: ShapeType[];
}): MaterialSectionState => {
  const pricingOptions = getPricingOptions(data);
  const pricingFallbackId = pricingOptions[0]?.id || "";
  const legacyBundle = getLegacyComponentsBundle({
    data,
    managedFixingMethods,
    managedShapes,
  });
  const allComponentIds = legacyBundle.items.map((item) => item.id);

  return {
    label: String(data?.additionalOptions?.materials?.label || "Materials"),
    description: String(data?.additionalOptions?.materials?.description || ""),
    items: getBaseMaterials({
      data,
      pricingFallbackId,
      allComponentIds,
      legacyComponentMaterialMap: legacyBundle.componentMaterialMap,
    }),
  };
};

export const syncMaterialsIntoData = ({
  data,
  state,
}: {
  data: any;
  state: MaterialSectionState;
}) => {
  const nextData = ensureClassicSimplifiedBuilderData({
    data,
    materialType: getClassicDataMaterialType(data),
    productType: getClassicDataProductType(data),
    pricingMode: getClassicDataPricingMode(data),
  });

  const normalizedItems = ensureOneDefault(
    state.items.map((item, index) => ({
      ...item,
      id: String(item.id || createMaterialId(item, index)),
      label: String(item.label || "").trim(),
      description: String(item.description || ""),
      previewImg: String(item.previewImg || ""),
      popupImg: String(item.popupImg || ""),
      additionalPrice: Number(item.additionalPrice || 0),
      pricingId: String(item.pricingId || ""),
      active: item.active !== false,
      excludeComponentIds: Array.from(new Set((Array.isArray(item.excludeComponentIds) ? item.excludeComponentIds : []).map(String))),
      sourceIndex: Number.isFinite(Number(item.sourceIndex)) ? Number(item.sourceIndex) : index,
    })),
  );

  nextData.additionalOptions = {
    ...(nextData.additionalOptions || {}),
    materials: {
      label: String(state.label || "Materials"),
      description: String(state.description || ""),
      items: normalizedItems,
    },
  };

  const legacyMaterials = Array.isArray(nextData?.materials) ? nextData.materials : [];
  nextData.materials = normalizedItems.map((item, index) => {
    const legacyMaterial =
      legacyMaterials[item.sourceIndex ?? -1] ||
      legacyMaterials.find(
        (entry: any) => String(entry?.id || "") === item.id || String(entry?.name || "") === item.label,
      ) ||
      {};

    return {
      ...legacyMaterial,
      id: item.id,
      name: item.label,
      description: item.description,
      icon: item.previewImg,
      popImg: item.popupImg,
      type: String(legacyMaterial?.type || "simple"),
      active: item.active !== false,
      additionalPrice: Number(item.additionalPrice || 0),
      pricingId: item.pricingId,
      excludeComponentIds: item.excludeComponentIds,
      isDefault: Boolean(item.isDefault),
      data:
        legacyMaterial?.data ||
        {
          sizes: {
            customSize: null,
            allSizes: [],
          },
          borders: [],
          shapes: [],
          textImages: {
            enableText: true,
            enableImage: true,
            enableQrCode: true,
          },
          fixingMethods: [],
          colors: {
            allColors: [],
            customColors: {
              active: false,
              label: "Custom Colors",
              prevImg: "",
            },
          },
          additionalOptions: [],
        },
      sourceIndex: item.sourceIndex ?? index,
    };
  });

  return nextData;
};

export { getPricingOptions, parseConfigData, type RequiredComponentsState };
