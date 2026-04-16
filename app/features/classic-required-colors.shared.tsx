import type { ConfigColor, ConfigCustomColor } from "~/types/ConfigDataType";
import type {
  ClassicColorFormItem,
  ClassicColorMaterialOption,
} from "~/components/layouts/ClassicColorForm";
import { ensureClassicSimplifiedBuilderData } from "~/utils/simplified-builder-data";
import {
  getClassicDataMaterialType,
  getClassicDataPricingMode,
  getClassicDataProductType,
} from "~/utils/classic-config-data";

export type MaterialOption = ClassicColorMaterialOption;
export type ColorItem = ClassicColorFormItem;

export type ColorSectionState = {
  customColors: ConfigCustomColor;
  items: ColorItem[];
};

export const defaultCustomColors = (): ConfigCustomColor => ({
  active: false,
  label: "Custom Colors",
  prevImg: "",
});

export const emptyColor = (): ColorItem => ({
  id: "",
  name: "",
  additionalPrice: 0,
  isDefault: false,
  textColor: {
    active: false,
    sameForBorder: false,
    codeHex: "#000000",
    name: "",
  },
  pattern: {
    active: false,
    codeHex: "#000000",
    url: "",
  },
  prevImg: "",
  excludeMaterials: [],
});

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

export const normalizeHex = (value: unknown): string => {
  const raw = String(value || "").trim();
  if (!raw) return "#000000";
  return raw.startsWith("#") ? raw : `#${raw}`;
};

export const createColorId = (name: string, colorHex: string) => {
  const slug = String(name || colorHex || "color")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  return `color-${slug || "item"}`;
};

export const ensureOneDefault = (items: ColorItem[], preferredIndex?: number) => {
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

export const getMaterialOptions = (data: any): MaterialOption[] => {
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

export const normalizeLegacyColor = (
  item: Partial<ConfigColor> & { id?: string; excludeMaterials?: string[] },
): ColorItem => ({
  id: String(
    item?.id || createColorId(String(item?.name || ""), String(item?.textColor?.codeHex || "")),
  ),
  name: String(item?.name || ""),
  additionalPrice: Number(item?.additionalPrice || 0),
  isDefault: Boolean(item?.isDefault),
  textColor: {
    active: Boolean(item?.textColor?.active),
    sameForBorder: Boolean(item?.textColor?.sameForBorder),
    codeHex: normalizeHex(item?.textColor?.codeHex || "#000000"),
    name: String(item?.textColor?.name || ""),
  },
  pattern: {
    active: Boolean(item?.pattern?.active),
    codeHex: normalizeHex(item?.pattern?.codeHex || "#000000"),
    url: String(item?.pattern?.url || ""),
  },
  prevImg: String(item?.prevImg || ""),
  excludeMaterials: Array.isArray(item?.excludeMaterials) ? item.excludeMaterials.map(String) : [],
});

export const getColorsState = (data: any): ColorSectionState => {
  const materialIds = getMaterialOptions(data).map((item) => item.id);
  const requiredColors = data?.requiredOptions?.colors;

  if (requiredColors && Array.isArray(requiredColors?.items)) {
    return {
      customColors: {
        ...defaultCustomColors(),
        ...(requiredColors?.customColors || {}),
      },
      items: ensureOneDefault(requiredColors.items.map(normalizeLegacyColor)),
    };
  }

  const legacyMaterials = Array.isArray(data?.materials) ? data.materials : [];
  if (legacyMaterials.length > 0) {
    const colorMap = new Map<string, ColorItem & { __materials?: string[] }>();
    const materialOptions = getMaterialOptions(data);

    legacyMaterials.forEach((material: any, index: number) => {
      const materialId = materialOptions[index]?.id || `material-${index}`;
      const legacyColors = Array.isArray(material?.data?.colors?.allColors)
        ? material.data.colors.allColors
        : Array.isArray(material?.data?.colors)
          ? material.data.colors
          : [];

      legacyColors.forEach((color: any) => {
        const normalizedColor = normalizeLegacyColor(color);
        const colorId =
          normalizedColor.id ||
          createColorId(normalizedColor.name, normalizedColor.textColor.codeHex);

        if (!colorMap.has(colorId)) {
          colorMap.set(colorId, {
            ...normalizedColor,
            id: colorId,
            __materials: [materialId],
          });
          return;
        }

        const existing = colorMap.get(colorId)!;
        existing.isDefault = existing.isDefault || normalizedColor.isDefault;
        existing.additionalPrice =
          Number(existing.additionalPrice || 0) || Number(normalizedColor.additionalPrice || 0);
        existing.prevImg = existing.prevImg || normalizedColor.prevImg;
        existing.__materials = Array.isArray(existing.__materials)
          ? [...existing.__materials, materialId]
          : [materialId];
      });
    });

    const items = ensureOneDefault(
      Array.from(colorMap.values()).map((item) => ({
        ...item,
        excludeMaterials: materialIds.filter(
          (materialId) => !Array.isArray(item.__materials) || !item.__materials.includes(materialId),
        ),
      })),
    );

    return {
      customColors: {
        ...defaultCustomColors(),
        ...(legacyMaterials[0]?.data?.colors?.customColors || {}),
      },
      items,
    };
  }

  return {
    customColors: defaultCustomColors(),
    items: [],
  };
};

export const validateColor = (item: ColorItem, items: ColorItem[], editingIndex: number) => {
  if (!String(item.name || "").trim()) {
    return "Color name is required.";
  }

  const normalizedName = item.name.trim().toLowerCase();
  const hasDuplicateName = items.some((entry, index) => {
    if (index === editingIndex) return false;
    return String(entry?.name || "").trim().toLowerCase() === normalizedName;
  });

  if (hasDuplicateName) {
    return "Color names must be unique.";
  }

  return null;
};

export const syncColorsIntoData = (
  data: any,
  state: ColorSectionState,
) => {
  const nextData = ensureClassicSimplifiedBuilderData({
    data,
    materialType: getClassicDataMaterialType(data),
    productType: getClassicDataProductType(data),
    pricingMode: getClassicDataPricingMode(data),
  });

  const normalizedItems = ensureOneDefault(
    state.items.map((item) => ({
      ...item,
      name: String(item.name || "").trim(),
      additionalPrice: Number(item.additionalPrice || 0),
      textColor: {
        ...item.textColor,
        codeHex: normalizeHex(item.textColor?.codeHex || "#000000"),
      },
      pattern: {
        ...item.pattern,
        codeHex: normalizeHex(item.pattern?.codeHex || "#000000"),
      },
      excludeMaterials: Array.from(new Set(item.excludeMaterials)),
    })),
  );

  const nextRequiredColors = {
    customColors: {
      active: Boolean(state.customColors.active),
      label: String(state.customColors.label || "Custom Colors"),
      prevImg: String(state.customColors.prevImg || ""),
    },
    items: normalizedItems,
  };

  nextData.requiredOptions = {
    ...(nextData.requiredOptions || {}),
    colors: nextRequiredColors,
  };

  return nextData;
};

export const renderColorPreview = (item: ColorItem) => {
  if (item.prevImg) {
    return (
      <img
        src={item.prevImg}
        alt=""
        style={{
          width: 40,
          height: 40,
          borderRadius: 10,
          objectFit: "cover",
          border: "1px solid #d1d5db",
        }}
      />
    );
  }

  if (item.pattern.active && item.pattern.url) {
    return (
      <img
        src={item.pattern.url}
        alt=""
        style={{
          width: 40,
          height: 40,
          borderRadius: 10,
          objectFit: "cover",
          border: "1px solid #d1d5db",
        }}
      />
    );
  }

  return (
    <div
      style={{
        width: 40,
        height: 40,
        borderRadius: 10,
        border: "1px solid #d1d5db",
        background: item.pattern.codeHex || "#000000",
      }}
    />
  );
};
