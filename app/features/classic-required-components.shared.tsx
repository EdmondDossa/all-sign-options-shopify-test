import { ensureClassicSimplifiedBuilderData } from "~/utils/simplified-builder-data";
import {
  getClassicDataMaterialType,
  getClassicDataPricingMode,
  getClassicDataProductType,
} from "~/utils/classic-config-data";
import {
  getFixingMethodsState,
  getShapesState,
  getSizeOptions,
  type RequiredFixingMethodItem,
  type RequiredShapeItem,
  type RequiredSizeOption,
} from "~/features/classic-required-structural.shared";
import type { FixingMethodType, ShapeType } from "~/types/SettingsType";

export type RequiredComponentOptionItem = {
  id: string;
  label: string;
  description: string;
  icon: string;
  image: string;
  isDefault: boolean;
  selection: {
    sizeId: string;
    shapeId: string;
    fixingMethodIds: string[];
  };
  overrides: {
    additionalPrice: number | string;
  };
};

export type RequiredComponentItem = {
  id: string;
  label: string;
  description: string;
  icon: string;
  isDefault: boolean;
  options: RequiredComponentOptionItem[];
};

export type RequiredComponentsState = {
  label: string;
  description: string;
  items: RequiredComponentItem[];
};

const slugify = (value: unknown, fallback = "item") => {
  const normalized = String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  return normalized || fallback;
};

export const ensureOneDefault = <T extends { isDefault?: boolean }>(items: T[], preferredIndex?: number) => {
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

export const emptyComponentOption = (): RequiredComponentOptionItem => ({
  id: "",
  label: "",
  description: "",
  icon: "",
  image: "",
  isDefault: false,
  selection: {
    sizeId: "",
    shapeId: "",
    fixingMethodIds: [],
  },
  overrides: {
    additionalPrice: 0,
  },
});

export const emptyComponent = (): RequiredComponentItem => ({
  id: "",
  label: "",
  description: "",
  icon: "",
  isDefault: false,
  options: [emptyComponentOption()],
});

export const getPricingOptions = (data: any) => {
  const storedOptions = Array.isArray(data?.requiredOptions?.pricing?.priceOptions)
    ? data.requiredOptions.pricing.priceOptions
    : Array.isArray(data?.requiredOptions?.pricing?.items)
      ? data.requiredOptions.pricing.items
      : [];

  return storedOptions.map((item: any, index: number) => ({
    id: String(item?.id || `pricing-${slugify(item?.label || index, `p-${index}`)}`),
    label: String(item?.label || `Pricing ${index + 1}`),
  }));
};

const getSizeReferenceItems = (data: any): Array<RequiredSizeOption & { width?: number | string; height?: number | string }> => {
  const requiredSizes = Array.isArray(data?.requiredOptions?.sizes?.items)
    ? data.requiredOptions.sizes.items
    : [];

  if (requiredSizes.length > 0) {
    return requiredSizes.map((size: any, index: number) => ({
      id: String(size?.id || `size-${index}`),
      label: String(size?.label || `${size?.width}x${size?.height}`),
      width: size?.width,
      height: size?.height,
    }));
  }

  return [];
};

const resolveSizeId = (
  option: any,
  sizeReferences: Array<RequiredSizeOption & { width?: number | string; height?: number | string }>,
) => {
  const width = Number(option?.size?.width ?? -1);
  const height = Number(option?.size?.height ?? -1);
  const match = sizeReferences.find(
    (size) => Number(size.width ?? -2) === width && Number(size.height ?? -2) === height,
  );
  return match?.id || "";
};

const createComponentId = (material: any, component: any, index: number) =>
  String(
    component?.id ||
      `component-${slugify(material?.name || material?.label || "material")}-${slugify(component?.name || component?.label || index, `c-${index}`)}`,
  );

const createComponentOptionId = (componentId: string, option: any, index: number) =>
  String(option?.id || `${componentId}-option-${slugify(option?.name || option?.label || index, `o-${index}`)}`);

const normalizeOption = ({
  option,
  componentId,
  optionIndex,
  sizeReferences,
  shapeItems,
  fixingItems,
}: {
  option: any;
  componentId: string;
  optionIndex: number;
  sizeReferences: Array<RequiredSizeOption & { width?: number | string; height?: number | string }>;
  shapeItems: RequiredShapeItem[];
  fixingItems: RequiredFixingMethodItem[];
}): RequiredComponentOptionItem => ({
  id: createComponentOptionId(componentId, option, optionIndex),
  label: String(option?.label || option?.name || `Option ${optionIndex + 1}`),
  description: String(option?.description || ""),
  icon: String(option?.icon || ""),
  image: String(option?.image || ""),
  isDefault: Boolean(option?.isDefault),
  selection: {
    sizeId: String(option?.selection?.sizeId || resolveSizeId(option, sizeReferences)),
    shapeId: String(
      option?.selection?.shapeId ||
        shapeItems.find((shape) => Number(shape.shapeId) === Number(option?.shapeId ?? -1))?.id ||
        "",
    ),
    fixingMethodIds: Array.isArray(option?.selection?.fixingMethodIds)
      ? option.selection.fixingMethodIds.map(String)
      : Array.isArray(option?.fixingMethods)
        ? option.fixingMethods
            .map((fixingMethodId: number) =>
              fixingItems.find((item) => Number(item.fixingMethodId) === Number(fixingMethodId))?.id,
            )
            .filter(Boolean) as string[]
        : [],
  },
  overrides: {
    additionalPrice: Number(option?.overrides?.additionalPrice ?? option?.additionalPrice ?? 0),
  },
});

const normalizeComponent = ({
  item,
  sizeReferences,
  shapeItems,
  fixingItems,
  fallbackIdBase,
}: {
  item: any;
  sizeReferences: Array<RequiredSizeOption & { width?: number | string; height?: number | string }>;
  shapeItems: RequiredShapeItem[];
  fixingItems: RequiredFixingMethodItem[];
  fallbackIdBase?: string;
}): RequiredComponentItem => {
  const componentId = String(item?.id || fallbackIdBase || `component-${slugify(item?.label || item?.name || "component")}`);
  const options = Array.isArray(item?.options) ? item.options : [];

  return {
    id: componentId,
    label: String(item?.label || item?.name || "Component"),
    description: String(item?.description || ""),
    icon: String(item?.icon || ""),
    isDefault: Boolean(item?.isDefault),
    options: ensureOneDefault(
      options.map((option: any, optionIndex: number) =>
        normalizeOption({
          option,
          componentId,
          optionIndex,
          sizeReferences,
          shapeItems,
          fixingItems,
        }),
      ),
    ),
  };
};

export const getLegacyComponentsBundle = ({
  data,
  managedFixingMethods = [],
  managedShapes = [],
}: {
  data: any;
  managedFixingMethods?: FixingMethodType[];
  managedShapes?: ShapeType[];
}) => {
  const sizeReferences = getSizeReferenceItems(data);
  const shapeItems = getShapesState(data, managedShapes);
  const fixingItems = getFixingMethodsState(data, managedFixingMethods, getSizeOptions(data), shapeItems);
  const materials = Array.isArray(data?.materials) ? data.materials : [];
  const items: RequiredComponentItem[] = [];
  const componentMaterialMap: Record<string, string[]> = {};

  materials.forEach((material: any, materialIndex: number) => {
    if (String(material?.type || "").toLowerCase() !== "advance") return;
    const materialId = String(
      material?.id ||
        `material-${slugify(material?.name || material?.label || materialIndex, `m-${materialIndex}`)}`,
    );
    const components = Array.isArray(material?.data) ? material.data : [];

    components.forEach((component: any, componentIndex: number) => {
      const normalized = normalizeComponent({
        item: component,
        sizeReferences,
        shapeItems,
        fixingItems,
        fallbackIdBase: createComponentId(material, component, componentIndex),
      });
      items.push(normalized);
      componentMaterialMap[normalized.id] = [materialId];
    });
  });

  return {
    items: ensureOneDefault(items),
    componentMaterialMap,
  };
};

export const getComponentsState = ({
  data,
  managedFixingMethods = [],
  managedShapes = [],
}: {
  data: any;
  managedFixingMethods?: FixingMethodType[];
  managedShapes?: ShapeType[];
}): RequiredComponentsState => {
  const sizeReferences = getSizeReferenceItems(data);
  const shapeItems = getShapesState(data, managedShapes);
  const fixingItems = getFixingMethodsState(data, managedFixingMethods, getSizeOptions(data), shapeItems);
  const storedItems = Array.isArray(data?.requiredOptions?.components?.items)
    ? data.requiredOptions.components.items
    : [];

  if (storedItems.length > 0) {
    return {
      label: String(data?.requiredOptions?.components?.label || "Components"),
      description: String(data?.requiredOptions?.components?.description || ""),
      items: ensureOneDefault(
        storedItems.map((item: any, index: number) =>
          normalizeComponent({
            item,
            sizeReferences,
            shapeItems,
            fixingItems,
            fallbackIdBase: `component-${index}`,
          }),
        ),
      ),
    };
  }

  const legacy = getLegacyComponentsBundle({ data, managedFixingMethods, managedShapes });
  return {
    label: "Components",
    description: "",
    items: legacy.items,
  };
};

export const syncComponentsIntoData = (data: any, state: RequiredComponentsState) => {
  const nextData = ensureClassicSimplifiedBuilderData({
    data,
    materialType: getClassicDataMaterialType(data),
    productType: getClassicDataProductType(data),
    pricingMode: getClassicDataPricingMode(data),
  });

  const normalizedItems = ensureOneDefault(
    state.items.map((item, index) => ({
      id: String(item.id || `component-${index}`),
      label: String(item.label || "").trim(),
      description: String(item.description || ""),
      icon: String(item.icon || ""),
      isDefault: Boolean(item.isDefault),
      options: ensureOneDefault(
        (Array.isArray(item.options) ? item.options : []).map((option, optionIndex) => ({
          id: String(option.id || `component-${index}-option-${optionIndex}`),
          label: String(option.label || "").trim(),
          description: String(option.description || ""),
          icon: String(option.icon || ""),
          image: String(option.image || ""),
          isDefault: Boolean(option.isDefault),
          selection: {
            sizeId: String(option.selection?.sizeId || ""),
            shapeId: String(option.selection?.shapeId || ""),
            fixingMethodIds: Array.isArray(option.selection?.fixingMethodIds)
              ? option.selection.fixingMethodIds.map(String)
              : [],
          },
          overrides: {
            additionalPrice: Number(option.overrides?.additionalPrice || 0),
          },
        })),
      ),
    })),
  );

  nextData.requiredOptions = {
    ...(nextData.requiredOptions || {}),
    components: {
      label: String(state.label || "Components"),
      description: String(state.description || ""),
      items: normalizedItems,
    },
  };

  return nextData;
};
