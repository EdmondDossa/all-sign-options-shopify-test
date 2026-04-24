import type { ConfigBorder, ConfigFixingMethod, ConfigShape } from "~/types/ConfigDataType";
import type { BorderType, FixingMethodType, ShapeType } from "~/types/SettingsType";

export type RequiredSizeOption = {
  id: string;
  label: string;
};

export type RequiredMaterialOption = {
  id: string;
  label: string;
};

export type StructuralSectionKey = "fixing-methods" | "shapes" | "borders";

export type StructuralManagedOption = {
  value: number;
  label: string;
  image?: string;
  description?: string;
};

export type RequiredFixingMethodItem = {
  id: string;
  fixingMethodId: number;
  mode?: "managed" | "custom";
  label: string;
  previewImg?: string;
  description?: string;
  additionalPrice: number | string;
  excludeMaterials: string[];
  excludeSizes: string[];
  excludeShapes: string[];
  isDefault: boolean;
  isVisible: boolean;
};

export type RequiredShapeItem = {
  id: string;
  shapeId: number;
  label: string;
  additionalPrice: number | string;
  excludeMaterials: string[];
  isDefault: boolean;
  enablePricingBySurface: boolean;
  surface: number | string;
  shapeSize: {
    small: number;
    medium: number;
    large: number;
  };
};

export type RequiredBorderItem = {
  id: string;
  manageBorderId: number;
  label: string;
  additionalPrice: number | string;
  excludeSizes: string[];
  excludeShapes: string[];
  isDefault: boolean;
};

export type RequiredBorderSettings = {
  colors: Array<{
    name: string;
    codeHex: string;
    additionalPrice: number | string;
  }>;
  enableBorderWidth: boolean;
  enableBorderColor: boolean;
  borderColorsLabel: string;
  customColorsPrevImg: string;
};

export const parseConfigData = (rawData: any) => {
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

export const parseJsonValue = (value: FormDataEntryValue | null) => {
  try {
    return JSON.parse(String(value || "null"));
  } catch {
    return null;
  }
};

export const parseIndex = (value: FormDataEntryValue | null) => {
  const parsed = parseInt(String(value || ""), 10);
  return Number.isNaN(parsed) ? -1 : parsed;
};

const slugify = (value: unknown, fallback = "item") => {
  const normalized = String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  return normalized || fallback;
};

const forEachLegacyAdvancedOption = (
  data: any,
  callback: (args: { materialId: string; component: any; option: any }) => void,
) => {
  const legacyMaterials = Array.isArray(data?.materials) ? data.materials : [];

  legacyMaterials.forEach((material: any, materialIndex: number) => {
    if (String(material?.type || "").toLowerCase() !== "advance") return;
    const materialId = String(material?.id || material?.name || `material-${materialIndex}`);
    const components = Array.isArray(material?.data) ? material.data : [];

    components.forEach((component: any) => {
      const options = Array.isArray(component?.options) ? component.options : [];
      options.forEach((option: any) => callback({ materialId, component, option }));
    });
  });
};

export const ensureOneDefault = <T extends { isDefault?: boolean }>(
  items: T[],
  preferredIndex?: number,
) => {
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

export const defaultBorderSettings = (): RequiredBorderSettings => ({
  colors: [],
  enableBorderWidth: true,
  enableBorderColor: true,
  borderColorsLabel: "Borders Colors",
  customColorsPrevImg: "",
});

export const getSizeOptions = (data: any): RequiredSizeOption[] => {
  const requiredSizes = Array.isArray(data?.requiredOptions?.sizes?.items)
    ? data.requiredOptions.sizes.items
    : [];

  if (requiredSizes.length > 0) {
    return requiredSizes.map((size: any, index: number) => ({
      id: String(size?.id || `size-${index}`),
      label: String(size?.label || `${size?.width}x${size?.height}`),
    }));
  }

  const legacyMaterials = Array.isArray(data?.materials) ? data.materials : [];
  const seen = new Set<string>();
  const options: RequiredSizeOption[] = [];

  legacyMaterials.forEach((material: any) => {
    const sizes = Array.isArray(material?.data?.sizes?.allSizes) ? material.data.sizes.allSizes : [];
    sizes.forEach((size: any) => {
      const id = `size-${slugify(size?.label || `${size?.width}x${size?.height}`)}`;
      if (seen.has(id)) return;
      seen.add(id);
      options.push({
        id,
        label: String(size?.label || `${size?.width}x${size?.height}`),
      });
    });
  });

  forEachLegacyAdvancedOption(data, ({ option }) => {
    const width = Number(option?.size?.width ?? NaN);
    const height = Number(option?.size?.height ?? NaN);
    if (!Number.isFinite(width) || !Number.isFinite(height)) return;

    const label = `${width}x${height}`;
    const id = `size-${slugify(label, "size")}`;
    if (seen.has(id)) return;
    seen.add(id);

    options.push({
      id,
      label,
    });
  });

  return options;
};

export const getMaterialOptions = (data: any): RequiredMaterialOption[] => {
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

export const getManagedFixingMethodOptions = (
  managedFixingMethods: FixingMethodType[] = [],
): StructuralManagedOption[] =>
  managedFixingMethods.map((item, index) => ({
    value: index,
    label: String(item?.name || `Fixing Method ${index + 1}`),
    image: String(item?.icon || item?.popImg || ""),
    description: String(item?.description || ""),
  }));

export const getManagedShapeOptions = (managedShapes: ShapeType[] = []): StructuralManagedOption[] =>
  managedShapes.map((item, index) => ({
    value: index,
    label: String(item?.name || `Shape ${index + 1}`),
    image: String(item?.icon || ""),
    description: String(item?.value || ""),
  }));

export const getManagedBorderOptions = (managedBorders: BorderType[] = []): StructuralManagedOption[] =>
  managedBorders.map((item, index) => ({
    value: index,
    label: String(item?.name || `Border ${index + 1}`),
    image: String(item?.icon || ""),
    description: String(item?.value || ""),
  }));

export const normalizeFixingMethod = (
  item: Partial<ConfigFixingMethod> & {
    id?: string;
    label?: string;
    previewImg?: string;
    description?: string;
    mode?: "managed" | "custom";
    excludeMaterials?: string[];
    excludeSizes?: string[];
    excludeShapes?: string[];
  },
  managedOptions: StructuralManagedOption[] = [],
  materialOptions: RequiredMaterialOption[] = [],
  sizeOptions: RequiredSizeOption[] = [],
  shapeItems: RequiredShapeItem[] = [],
): RequiredFixingMethodItem => ({
  id: String(item?.id || `fixing-method-${item?.fixingMethodId ?? 0}`),
  fixingMethodId: Number(item?.fixingMethodId ?? 0),
  mode: item?.mode === "custom" || Number(item?.fixingMethodId ?? 0) < 0 ? "custom" : "managed",
  label:
    String(item?.label || managedOptions.find((option) => option.value === Number(item?.fixingMethodId))?.label || ""),
  previewImg: String(item?.previewImg || managedOptions.find((option) => option.value === Number(item?.fixingMethodId))?.image || ""),
  description: String(item?.description || managedOptions.find((option) => option.value === Number(item?.fixingMethodId))?.description || ""),
  additionalPrice: Number(item?.additionalPrice || 0),
  excludeMaterials: Array.isArray((item as any)?.excludeMaterials)
    ? (item as any).excludeMaterials.every((value: any) => typeof value === "string")
      ? (item as any).excludeMaterials.map(String)
      : (item as any).excludeMaterials
          .map((value: any) => materialOptions[Number(value)]?.id)
          .filter(Boolean)
    : [],
  excludeSizes: Array.isArray(item?.excludeSizes)
    ? item.excludeSizes.map(String)
    : Array.isArray((item as any)?.excludeSizes)
      ? (item as any).excludeSizes
          .map((value: any) => sizeOptions[Number(value)]?.id)
          .filter(Boolean)
      : [],
  excludeShapes: Array.isArray(item?.excludeShapes)
    ? item.excludeShapes.map(String)
    : Array.isArray((item as any)?.excludeShapes)
      ? (item as any).excludeShapes
          .map((value: any) => shapeItems.find((shape) => shape.shapeId === Number(value))?.id)
          .filter(Boolean)
      : [],
  isDefault: Boolean(item?.isDefault),
  isVisible: item?.isVisible !== false,
});

export const normalizeShape = (
  item: Partial<ConfigShape> & { id?: string; label?: string; excludeMaterials?: string[] },
  managedOptions: StructuralManagedOption[] = [],
  materialOptions: RequiredMaterialOption[] = [],
): RequiredShapeItem => ({
  id: String(item?.id || `shape-${item?.shapeId ?? 0}`),
  shapeId: Number(item?.shapeId ?? 0),
  label: String(item?.label || managedOptions.find((option) => option.value === Number(item?.shapeId))?.label || ""),
  additionalPrice: Number(item?.additionalPrice || 0),
  excludeMaterials: Array.isArray((item as any)?.excludeMaterials)
    ? (item as any).excludeMaterials.every((value: any) => typeof value === "string")
      ? (item as any).excludeMaterials.map(String)
      : (item as any).excludeMaterials
          .map((value: any) => materialOptions[Number(value)]?.id)
          .filter(Boolean)
    : [],
  isDefault: Boolean(item?.isDefault),
  enablePricingBySurface: Boolean(item?.enablePricingBySurface),
  surface: Number(item?.surface || 0),
  shapeSize: {
    small: Number(item?.shapeSize?.small ?? 20),
    medium: Number(item?.shapeSize?.medium ?? 40),
    large: Number(item?.shapeSize?.large ?? 60),
  },
});

export const normalizeBorder = (
  item: Partial<ConfigBorder> & { id?: string; label?: string; excludeSizes?: string[]; excludeShapes?: string[] },
  managedOptions: StructuralManagedOption[] = [],
  sizeOptions: RequiredSizeOption[] = [],
  shapeItems: RequiredShapeItem[] = [],
): RequiredBorderItem => ({
  id: String(item?.id || `border-${item?.manageBorderId ?? 0}`),
  manageBorderId: Number(item?.manageBorderId ?? 0),
  label:
    String(item?.label || managedOptions.find((option) => option.value === Number(item?.manageBorderId))?.label || ""),
  additionalPrice: Number(item?.additionalPrice || 0),
  excludeSizes: Array.isArray(item?.excludeSizes)
    ? item.excludeSizes.map(String)
    : Array.isArray((item as any)?.excludeSizes)
      ? (item as any).excludeSizes
          .map((value: any) => sizeOptions[Number(value)]?.id)
          .filter(Boolean)
      : [],
  excludeShapes: Array.isArray(item?.excludeShapes)
    ? item.excludeShapes.map(String)
    : Array.isArray((item as any)?.excludeShapes)
      ? (item as any).excludeShapes
          .map((value: any) => shapeItems.find((shape) => shape.shapeId === Number(value))?.id)
          .filter(Boolean)
      : [],
  isDefault: Boolean(item?.isDefault),
});

export const getShapesState = (data: any, managedShapes: ShapeType[] = []): RequiredShapeItem[] => {
  const managedOptions = getManagedShapeOptions(managedShapes);
  const materialOptions = getMaterialOptions(data);
  const materialIds = materialOptions.map((item) => item.id);
  const requiredItems = Array.isArray(data?.requiredOptions?.shapes?.items)
    ? data.requiredOptions.shapes.items
    : [];

  if (requiredItems.length > 0) {
    return ensureOneDefault(
      requiredItems.map((item: any) => normalizeShape(item, managedOptions, materialOptions)),
    );
  }

  const legacyMaterials = Array.isArray(data?.materials) ? data.materials : [];
  const shapeMap = new Map<number, RequiredShapeItem & { __materials?: string[] }>();
  legacyMaterials.forEach((material: any, materialIndex: number) => {
    const materialId = String(material?.id || material?.name || `material-${materialIndex}`);
    const shapes = Array.isArray(material?.data?.shapes) ? material.data.shapes : [];
    shapes.forEach((shape: any) => {
      const shapeId = Number(shape?.shapeId ?? -1);
      if (shapeId < 0) return;
      if (!shapeMap.has(shapeId)) {
        shapeMap.set(shapeId, {
          ...normalizeShape(shape, managedOptions, materialOptions),
          __materials: [materialId],
        });
        return;
      }
      const current = shapeMap.get(shapeId)!;
      current.isDefault = current.isDefault || Boolean(shape?.isDefault);
      current.additionalPrice =
        Number(current.additionalPrice || 0) || Number(shape?.additionalPrice || 0);
      current.enablePricingBySurface =
        current.enablePricingBySurface || Boolean(shape?.enablePricingBySurface);
      current.surface = Number(current.surface || 0) || Number(shape?.surface || 0);
      current.__materials = Array.isArray(current.__materials)
        ? [...current.__materials, materialId]
        : [materialId];
    });
  });

  forEachLegacyAdvancedOption(data, ({ materialId, option }) => {
    const shapeId = Number(option?.shapeId ?? -1);
    if (shapeId < 0) return;

    if (!shapeMap.has(shapeId)) {
      shapeMap.set(shapeId, {
        ...normalizeShape({ shapeId }, managedOptions, materialOptions),
        __materials: [materialId],
      });
      return;
    }

    const current = shapeMap.get(shapeId)!;
    current.__materials = Array.isArray(current.__materials)
      ? Array.from(new Set([...current.__materials, materialId]))
      : [materialId];
  });

  return ensureOneDefault(
    Array.from(shapeMap.values()).map((item) => ({
      ...item,
      excludeMaterials: materialIds.filter(
        (materialId) => !Array.isArray(item.__materials) || !item.__materials.includes(materialId),
      ),
    })),
  );
};

export const getFixingMethodsState = (
  data: any,
  managedFixingMethods: FixingMethodType[] = [],
  sizeOptions: RequiredSizeOption[] = [],
  shapeItems: RequiredShapeItem[] = [],
): RequiredFixingMethodItem[] => {
  const managedOptions = getManagedFixingMethodOptions(managedFixingMethods);
  const materialOptions = getMaterialOptions(data);
  const materialIds = materialOptions.map((item) => item.id);
  const requiredItems = Array.isArray(data?.requiredOptions?.fixingMethods?.items)
    ? data.requiredOptions.fixingMethods.items
    : [];

  if (requiredItems.length > 0) {
    return ensureOneDefault(
      requiredItems.map((item: any) =>
        normalizeFixingMethod(item, managedOptions, materialOptions, sizeOptions, shapeItems),
      ),
    );
  }

  const legacyMaterials = Array.isArray(data?.materials) ? data.materials : [];
  const fixingMap = new Map<number, RequiredFixingMethodItem & { __materials?: string[] }>();
  legacyMaterials.forEach((material: any, materialIndex: number) => {
    const materialId = String(material?.id || material?.name || `material-${materialIndex}`);
    const fixingMethods = Array.isArray(material?.data?.fixingMethods)
      ? material.data.fixingMethods
      : [];
    fixingMethods.forEach((fixingMethod: any) => {
      const fixingMethodId = Number(fixingMethod?.fixingMethodId ?? -1);
      if (fixingMethodId < 0) return;
      if (!fixingMap.has(fixingMethodId)) {
        fixingMap.set(
          fixingMethodId,
          {
            ...normalizeFixingMethod(
              fixingMethod,
              managedOptions,
              materialOptions,
              sizeOptions,
              shapeItems,
            ),
            __materials: [materialId],
          },
        );
        return;
      }
      const current = fixingMap.get(fixingMethodId)!;
      current.isDefault = current.isDefault || Boolean(fixingMethod?.isDefault);
      current.isVisible = current.isVisible && fixingMethod?.isVisible !== false;
      current.additionalPrice =
        Number(current.additionalPrice || 0) || Number(fixingMethod?.additionalPrice || 0);
      current.__materials = Array.isArray(current.__materials)
        ? [...current.__materials, materialId]
        : [materialId];
    });
  });

  forEachLegacyAdvancedOption(data, ({ materialId, option }) => {
    const fixingMethodIds = Array.isArray(option?.fixingMethods) ? option.fixingMethods : [];

    fixingMethodIds.forEach((fixingMethodValue: any) => {
      const fixingMethodId = Number(fixingMethodValue ?? -1);
      if (fixingMethodId < 0) return;

      if (!fixingMap.has(fixingMethodId)) {
        fixingMap.set(fixingMethodId, {
          ...normalizeFixingMethod(
            { fixingMethodId },
            managedOptions,
            materialOptions,
            sizeOptions,
            shapeItems,
          ),
          __materials: [materialId],
        });
        return;
      }

      const current = fixingMap.get(fixingMethodId)!;
      current.__materials = Array.isArray(current.__materials)
        ? Array.from(new Set([...current.__materials, materialId]))
        : [materialId];
    });
  });

  return ensureOneDefault(
    Array.from(fixingMap.values()).map((item) => ({
      ...item,
      excludeMaterials: materialIds.filter(
        (materialId) => !Array.isArray(item.__materials) || !item.__materials.includes(materialId),
      ),
    })),
  );
};

export const getBordersState = (
  data: any,
  managedBorders: BorderType[] = [],
  sizeOptions: RequiredSizeOption[] = [],
  shapeItems: RequiredShapeItem[] = [],
): RequiredBorderItem[] => {
  const managedOptions = getManagedBorderOptions(managedBorders);
  const requiredItems = Array.isArray(data?.requiredOptions?.borders?.items)
    ? data.requiredOptions.borders.items
    : [];

  if (requiredItems.length > 0) {
    return ensureOneDefault(
      requiredItems.map((item: any) => normalizeBorder(item, managedOptions, sizeOptions, shapeItems)),
    );
  }

  const legacyMaterials = Array.isArray(data?.materials) ? data.materials : [];
  const borderMap = new Map<number, RequiredBorderItem>();
  legacyMaterials.forEach((material: any) => {
    const borders = Array.isArray(material?.data?.borders) ? material.data.borders : [];
    borders.forEach((border: any) => {
      const manageBorderId = Number(border?.manageBorderId ?? -1);
      if (manageBorderId < 0) return;
      if (!borderMap.has(manageBorderId)) {
        borderMap.set(
          manageBorderId,
          normalizeBorder(border, managedOptions, sizeOptions, shapeItems),
        );
        return;
      }
      const current = borderMap.get(manageBorderId)!;
      current.isDefault = current.isDefault || Boolean(border?.isDefault);
      current.additionalPrice =
        Number(current.additionalPrice || 0) || Number(border?.additionalPrice || 0);
    });
  });

  return ensureOneDefault(Array.from(borderMap.values()));
};

export const getBorderSettingsState = (data: any): RequiredBorderSettings => {
  const requiredSettings = data?.requiredOptions?.borders?.settings;
  if (requiredSettings && typeof requiredSettings === "object") {
    return {
      ...defaultBorderSettings(),
      ...requiredSettings,
      colors: Array.isArray(requiredSettings?.colors)
        ? requiredSettings.colors.map((color: any) => ({
            name: String(color?.name || ""),
            codeHex: String(color?.codeHex || "#FFFFFF"),
            additionalPrice: Number(color?.additionalPrice || 0),
          }))
        : [],
    };
  }

  const legacyMaterials = Array.isArray(data?.materials) ? data.materials : [];
  const legacySettings = legacyMaterials.find((material: any) => material?.data?.borders?.settings)
    ?.data?.borders?.settings;

  if (legacySettings && typeof legacySettings === "object") {
    return {
      ...defaultBorderSettings(),
      ...legacySettings,
      colors: Array.isArray(legacySettings?.colors)
        ? legacySettings.colors.map((color: any) => ({
            name: String(color?.name || ""),
            codeHex: String(color?.codeHex || "#FFFFFF"),
            additionalPrice: Number(color?.additionalPrice || 0),
          }))
        : [],
    };
  }

  return defaultBorderSettings();
};

export const syncStructuralIntoData = (
  data: any,
  section: StructuralSectionKey,
  items: RequiredFixingMethodItem[] | RequiredShapeItem[] | RequiredBorderItem[],
  options?: {
    borderSettings?: RequiredBorderSettings;
  },
) => {
  const safeData = data && typeof data === "object" ? { ...data } : {};
  safeData.requiredOptions = safeData.requiredOptions || {};

  if (section === "fixing-methods") {
    safeData.requiredOptions.fixingMethods = {
      items: ensureOneDefault(items as RequiredFixingMethodItem[]).map((item) => ({
        id: item.id,
        fixingMethodId: Number(item.fixingMethodId),
        mode: item.mode === "custom" ? "custom" : "managed",
        label: item.label,
        previewImg: String(item.previewImg || ""),
        description: String(item.description || ""),
        additionalPrice: Number(item.additionalPrice || 0),
        excludeMaterials: Array.isArray(item.excludeMaterials)
          ? item.excludeMaterials.map(String)
          : [],
        excludeSizes: Array.isArray(item.excludeSizes) ? item.excludeSizes.map(String) : [],
        excludeShapes: Array.isArray(item.excludeShapes) ? item.excludeShapes.map(String) : [],
        isDefault: Boolean(item.isDefault),
        isVisible: item.isVisible !== false,
      })),
    };
  }

  if (section === "shapes") {
    safeData.requiredOptions.shapes = {
      items: ensureOneDefault(items as RequiredShapeItem[]).map((item) => ({
        id: item.id,
        shapeId: Number(item.shapeId),
        label: item.label,
        additionalPrice: Number(item.additionalPrice || 0),
        excludeMaterials: Array.isArray(item.excludeMaterials)
          ? item.excludeMaterials.map(String)
          : [],
        isDefault: Boolean(item.isDefault),
        enablePricingBySurface: Boolean(item.enablePricingBySurface),
        surface: Number(item.surface || 0),
        shapeSize: {
          small: Number(item.shapeSize?.small ?? 20),
          medium: Number(item.shapeSize?.medium ?? 40),
          large: Number(item.shapeSize?.large ?? 60),
        },
      })),
    };
  }

  if (section === "borders") {
    safeData.requiredOptions.borders = {
      items: ensureOneDefault(items as RequiredBorderItem[]).map((item) => ({
        id: item.id,
        manageBorderId: Number(item.manageBorderId),
        label: item.label,
        additionalPrice: Number(item.additionalPrice || 0),
        excludeSizes: Array.isArray(item.excludeSizes) ? item.excludeSizes.map(String) : [],
        excludeShapes: Array.isArray(item.excludeShapes) ? item.excludeShapes.map(String) : [],
        isDefault: Boolean(item.isDefault),
      })),
      settings: {
        ...defaultBorderSettings(),
        ...(options?.borderSettings || getBorderSettingsState(safeData)),
        colors: Array.isArray(options?.borderSettings?.colors)
          ? options!.borderSettings!.colors.map((color) => ({
              name: String(color?.name || ""),
              codeHex: String(color?.codeHex || "#FFFFFF"),
              additionalPrice: Number(color?.additionalPrice || 0),
            }))
          : getBorderSettingsState(safeData).colors.map((color) => ({
              name: String(color?.name || ""),
              codeHex: String(color?.codeHex || "#FFFFFF"),
              additionalPrice: Number(color?.additionalPrice || 0),
            })),
      },
    };
  }

  return safeData;
};
