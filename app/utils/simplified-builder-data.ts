import { getAsoClassicFamilyForProductType } from "~/models/asoClassicCreationCatalog";

type BuilderMaterial = {
  id: string;
  sourceIndex: number;
  label: string;
  description: string;
  image: string;
  popupImage: string;
  type: string;
  active: boolean;
  additionalPrice?: number | string;
  pricingId?: string;
  excludeComponentIds?: string[];
  isDefault?: boolean;
};

type RequiredSizeItem = {
  id: string;
  label: string;
  width: number | string;
  height: number | string;
  textNumber: number | string;
  maxTextChar: number | string;
  charPrice: number | string;
  basePrice: number | string;
  startPriceAtChar: number | string;
  isDefault: boolean;
  excludeMaterials: string[];
};

type RequiredSizeSettings = {
  label: string;
  description: string;
  thickness: {
    active: boolean;
    values: Array<{
      label: string;
      value: number | string;
      pricingType: "additional" | "multiplier";
      additionalPrice: number | string;
      multiplier: number | string;
    }>;
  };
  customSize: {
    active: boolean;
    hideSizes?: boolean;
    width: {
      label: string;
      min: number | string;
      max: number | string;
    };
    height: {
      label: string;
      min: number | string;
      max: number | string;
    };
    pricings: {
      type: "unit" | "range";
      rangePricingPerUnit: boolean;
      unit: {
        basePrice: number | string;
        surface: number | string;
        charPrice: number | string;
      };
      range: Array<{
        basePrice: number | string;
        surface: number | string;
        charPrice: number | string;
      }>;
    };
  };
};

type BuilderColorRule = {
  enabled: boolean;
  isDefault: boolean;
  additionalPrice: number | string;
  previewImage: string;
  textColor: any;
  pattern: any;
};

type BuilderFixingMethodRule = {
  enabled: boolean;
  isDefault: boolean;
  isVisible: boolean;
  additionalPrice: number | string;
  excludeSizes: string[];
  excludeShapes: string[];
};

type BuilderShapeRule = {
  enabled: boolean;
  isDefault: boolean;
  additionalPrice: number | string;
  enablePricingBySurface: boolean;
  surface: number | string;
  shapeSize: any;
};

type BuilderBorderRule = {
  enabled: boolean;
  isDefault: boolean;
  additionalPrice: number | string;
  excludeSizes: string[];
  excludeShapes: string[];
};

type BuilderAdditionalInputRule = {
  enabled: boolean;
};

export type SimplifiedBuilderData = {
  version: 1;
  mode: "option-centric";
  migratedFromLegacy: boolean;
  meta: {
    materialType: string;
    productType: string;
    pricingMode: string | null;
  };
  coreSetup: {
    pricing: {
      mode: string | null;
    };
    sizes: {
      settings: RequiredSizeSettings;
      items: RequiredSizeItem[];
    };
    fonts: {
      label?: string;
      description?: string;
      items: any[];
    };
    components: {
      label?: string;
      description?: string;
      items: any[];
    };
    colors: {
      customColors?: {
        active: boolean;
        label: string;
        prevImg?: string;
      };
      items: Array<{
        id: string;
        label?: string;
        name?: string;
        codeHex?: string;
        additionalPrice?: number | string;
        isDefault?: boolean;
        textColor?: any;
        pattern?: any;
        prevImg?: string;
        rulesByMaterial: Record<string, BuilderColorRule>;
      }>;
    };
  };
  customizationOptions: {
    materials: {
      items: BuilderMaterial[];
    };
    fixingMethods: {
      items: Array<{
        id: string;
        fixingMethodId: number | string;
        rulesByMaterial: Record<string, BuilderFixingMethodRule>;
      }>;
    };
    shapes: {
      items: Array<{
        id: string;
        shapeId: number | string;
        rulesByMaterial: Record<string, BuilderShapeRule>;
      }>;
    };
    borders: {
      items: Array<{
        id: string;
        borderId: number | string;
        rulesByMaterial: Record<string, BuilderBorderRule>;
      }>;
    };
    components: {
      items: Array<{
        id: string;
        title: string;
        description: string;
        icon: string;
        options: any[];
        rulesByMaterial: Record<string, BuilderAdditionalInputRule>;
      }>;
    };
    inputs: {
      label?: string;
      description?: string;
      items: any[];
    };
  };
};

const extractScalarText = (value: unknown): string => {
  if (value == null) return "";
  if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
    return String(value).trim();
  }
  if (Array.isArray(value)) {
    return extractScalarText(value[0]);
  }
  if (typeof value === "object") {
    const record = value as Record<string, unknown>;
    const candidates = [
      record.value,
      record.label,
      record.name,
      record.key,
      record.type,
      record.id,
      record.slug,
    ];
    for (const candidate of candidates) {
      const normalized = extractScalarText(candidate);
      if (normalized) return normalized;
    }
  }
  return "";
};

const normalizeText = (value: unknown) => extractScalarText(value);

const slugify = (value: unknown, fallback = "item") => {
  const normalized = normalizeText(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  return normalized || fallback;
};

const cloneObject = <T>(value: T): T => JSON.parse(JSON.stringify(value));

const createMaterialId = (material: any, index: number) =>
  `material-${slugify(material?.name || material?.id || index, `m-${index}`)}`;

const createSizeId = (size: any) =>
  `size-${slugify(size?.label || `${size?.width}x${size?.height}`, "size")}-${slugify(
    `${size?.width}-${size?.height}`,
    "dimensions",
  )}`;

const createColorId = (color: any) =>
  `color-${slugify(color?.name || color?.label || color?.textColor?.codeHex || "color")}`;

const createFixingMethodId = (fixingMethod: any) =>
  `fixing-method-${slugify(fixingMethod?.fixingMethodId || fixingMethod?.name || "method")}`;

const createShapeId = (shape: any) =>
  `shape-${slugify(shape?.shapeId || shape?.name || "shape")}`;

const createBorderId = (border: any) =>
  `border-${slugify(border?.manageBorderId || border?.name || "border")}`;

const createAdditionalInputId = (option: any) =>
  `additional-input-${slugify(option?.title || option?.name || "input")}`;

const createDefaultRequiredSizeSettings = (): RequiredSizeSettings => ({
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

const createDefaultClassicCustomizerConfigOptions = () => [
  { type: "materials", active: true },
  { type: "sizes", active: true },
  { type: "shapes", active: true },
  { type: "fixing-methodes", active: true },
  { type: "borders", active: true },
  { type: "colors", active: true },
  { type: "texts", active: true },
  { type: "qrcodes", active: true },
  { type: "images", active: true },
  { type: "additional-options", active: true },
  { type: "additional-components", active: true },
];

const createDefaultClassicCustomizerSignSettings = () => ({
  text: {
    colors: [
      { name: "black", codeHex: "#000000" },
      { name: "White", codeHex: "#FFFFFF" },
      { name: "Blue", codeHex: "#004f86" },
      { name: "Red", codeHex: "#c4271d" },
      { name: "Pink", codeHex: "#eb3f77" },
      { name: "Green", codeHex: "#009251" },
      { name: "Yellow", codeHex: "#fee900" },
      { name: "Gray", codeHex: "#4f575b" },
      { name: "Orange", codeHex: "#e15616" },
      { name: "Purple", codeHex: "#554585" },
      { name: "Brown", codeHex: "#523d2a" },
    ],
    enableBold: true,
    colorsLabel: "Text  Colors",
    enableBorder: true,
    enableItalic: true,
    enableStrike: true,
    colorsPrevImg: "",
    enableOpacity: true,
    selectedFonts: [],
    enableCurvedUp: false,
    enableFontSize: {
      active: true,
      defaultFontSize: 16,
      maximumFontSize: 100,
      minimumFontSize: 4,
    },
    enableOverline: true,
    enableUnderline: true,
    enableCurvedDown: false,
    enableCustomColor: true,
    enableTextAlignment: true,
    textType: "normal",
  },
  images: {
    colors: [],
    filter: {
      active: true,
      enableBlur: true,
      enableSepia: true,
      enableEmbross: true,
      enableOpacity: true,
      enableSharpen: true,
      enableGreyscale: false,
    },
    colorsLabel: "Image Colors",
    colorsPrevImg: "",
    enableClipart: {
      active: true,
      selectClipartGroups: [1],
    },
    fileUploadScript: {
      uploadMaxWidth: 200,
      uploadMinWidth: 10,
      customWithGraphical: false,
      enableSizeRestriction: false,
      allowedUploadsExtentions: ["png"],
    },
    enableCustomColor: true,
    enableUploadImage: true,
    enableDownloadImage: true,
    scenes: [],
  },
  signPart: {
    doublePart: {
      label: "Switch Face",
      part1: "Face A",
      part2: "Face B",
      active: false,
      enableCopyDesignFromSide: true,
    },
  },
  configOptions: createDefaultClassicCustomizerConfigOptions(),
  customizerOptions: {
    measurementUnit: "mm",
    desktopColumnOrder: "right",
    showHideMeasurements: "both",
    decimalFormatMeasurements: "with-decimal",
    finishButtonPosition: "bottom",
    allowNextButton: false,
    showThicknessPricing: false,
    expandThicknessByDefault: false,
    expandPredefinedSizesByDefault: false,
  },
});

const normalizeClassicCustomizerConfigOptions = (value: any) => {
  if (!Array.isArray(value) || value.length === 0) {
    return createDefaultClassicCustomizerConfigOptions();
  }

  const normalized = value
    .filter((item) => item && typeof item === "object")
    .map((item) => ({
      type: normalizeText(item?.type),
      active: item?.active !== false,
    }))
    .filter((item) => item.type);

  return normalized.length > 0
    ? normalized
    : createDefaultClassicCustomizerConfigOptions();
};

const normalizeClassicCustomizerSignSettings = (value: any = {}) => {
  const defaults = createDefaultClassicCustomizerSignSettings();
  const safeValue = value && typeof value === "object" ? value : {};

  return {
    ...defaults,
    ...safeValue,
    text: {
      ...defaults.text,
      ...(safeValue?.text || {}),
      colors: Array.isArray(safeValue?.text?.colors)
        ? safeValue.text.colors
        : defaults.text.colors,
      selectedFonts: Array.isArray(safeValue?.text?.selectedFonts)
        ? safeValue.text.selectedFonts
        : defaults.text.selectedFonts,
      enableFontSize: {
        ...defaults.text.enableFontSize,
        ...(safeValue?.text?.enableFontSize || {}),
      },
    },
    images: {
      ...defaults.images,
      ...(safeValue?.images || {}),
      colors: Array.isArray(safeValue?.images?.colors)
        ? safeValue.images.colors
        : defaults.images.colors,
      scenes: Array.isArray(safeValue?.images?.scenes)
        ? safeValue.images.scenes
        : defaults.images.scenes,
      filter: {
        ...defaults.images.filter,
        ...(safeValue?.images?.filter || {}),
      },
      enableClipart: {
        ...defaults.images.enableClipart,
        ...(safeValue?.images?.enableClipart || {}),
        selectClipartGroups: Array.isArray(
          safeValue?.images?.enableClipart?.selectClipartGroups,
        )
          ? safeValue.images.enableClipart.selectClipartGroups
          : defaults.images.enableClipart.selectClipartGroups,
      },
      fileUploadScript: {
        ...defaults.images.fileUploadScript,
        ...(safeValue?.images?.fileUploadScript || {}),
        allowedUploadsExtentions: Array.isArray(
          safeValue?.images?.fileUploadScript?.allowedUploadsExtentions,
        )
          ? safeValue.images.fileUploadScript.allowedUploadsExtentions
          : defaults.images.fileUploadScript.allowedUploadsExtentions,
      },
    },
    signPart: {
      ...defaults.signPart,
      ...(safeValue?.signPart || {}),
      doublePart: {
        ...defaults.signPart.doublePart,
        ...(safeValue?.signPart?.doublePart || {}),
      },
    },
    configOptions: normalizeClassicCustomizerConfigOptions(
      safeValue?.configOptions,
    ),
    customizerOptions: {
      ...defaults.customizerOptions,
      ...(safeValue?.customizerOptions || {}),
    },
  };
};

const normalizeStructuredBlock = (
  value: any,
  {
    label,
    description = "",
    items = [],
  }: {
    label: string;
    description?: string;
    items?: any[];
  },
) => ({
  label,
  description,
  ...(value && typeof value === "object" ? value : {}),
  items: Array.isArray(value?.items) ? value.items : items,
});

const normalizeStructuredPricingBlock = (
  value: any,
  normalizedPricingMode: string,
) => ({
  label: "Pricing",
  description: "",
  ...(value && typeof value === "object" ? value : {}),
  mode: normalizeText(value?.mode) || normalizedPricingMode,
  priceOptions: Array.isArray(value?.priceOptions) ? value.priceOptions : [],
  items: Array.isArray(value?.items) ? value.items : [],
});

const normalizeStructuredColorsBlock = (value: any) => ({
  label: "Colors",
  description: "",
  ...(value && typeof value === "object" ? value : {}),
  customColors: {
    active: false,
    label: "Custom Colors",
    prevImg: "",
    ...(value?.customColors || {}),
  },
  items: Array.isArray(value?.items) ? value.items : [],
});

export const createEmptySimplifiedBuilderData = ({
  materialType = "",
  productFamily = "",
  productType = "",
  pricingMode = "frame-fit",
}: {
  materialType?: string | null;
  productFamily?: string | null;
  productType?: string | null;
  pricingMode?: string | null;
} = {}): SimplifiedBuilderData => ({
  version: 1,
  mode: "option-centric",
  migratedFromLegacy: false,
  meta: {
    materialType: normalizeText(materialType),
    productType: normalizeText(productType),
    pricingMode: pricingMode ? normalizeText(pricingMode) : null,
  },
  coreSetup: {
    pricing: {
      mode: pricingMode ? normalizeText(pricingMode) : null,
    },
    sizes: {
      settings: createDefaultRequiredSizeSettings(),
      items: [],
    },
    fonts: {
      items: [],
    },
    components: {
      items: [],
    },
    colors: {
      customColors: {
        active: false,
        label: "Custom Colors",
        prevImg: "",
      },
      items: [],
    },
  },
  customizationOptions: {
    materials: {
      items: [],
    },
    fixingMethods: {
      items: [],
    },
    shapes: {
      items: [],
    },
    borders: {
      items: [],
    },
    components: {
      items: [],
    },
    inputs: {
      label: "Inputs",
      description: "",
      items: [],
    },
  },
});

export const migrateLegacyClassicDataToSimplifiedBuilder = ({
  data,
  materialType = "",
  productType = "",
  pricingMode = null,
}: {
  data: any;
  materialType?: string | null;
  productType?: string | null;
  pricingMode?: string | null;
}): SimplifiedBuilderData => {
  const base = createEmptySimplifiedBuilderData({ materialType, productType, pricingMode });
  const materials = Array.isArray(data?.materials) ? data.materials : [];
  const firstMaterialSizes = materials[0]?.data?.sizes;
  const firstMaterialColors = materials[0]?.data?.colors;

  if (firstMaterialSizes && typeof firstMaterialSizes === "object") {
    base.coreSetup.sizes.settings = {
      ...base.coreSetup.sizes.settings,
      thickness: {
        ...base.coreSetup.sizes.settings.thickness,
        ...(firstMaterialSizes?.thickness || {}),
        values: Array.isArray(firstMaterialSizes?.thickness?.values)
          ? firstMaterialSizes.thickness.values.map((item: any) => ({
              label: normalizeText(item?.label),
              value: item?.value ?? 0,
              pricingType: item?.pricingType === "multiplier" ? "multiplier" : "additional",
              additionalPrice: item?.additionalPrice ?? 0,
              multiplier: item?.multiplier ?? 1,
            }))
          : [],
      },
      customSize: {
        ...base.coreSetup.sizes.settings.customSize,
        ...(firstMaterialSizes?.customSize || {}),
        hideSizes: Boolean(firstMaterialSizes?.customSize?.hideSizes),
        width: {
          ...base.coreSetup.sizes.settings.customSize.width,
          ...(firstMaterialSizes?.customSize?.width || {}),
        },
        height: {
          ...base.coreSetup.sizes.settings.customSize.height,
          ...(firstMaterialSizes?.customSize?.height || {}),
        },
        pricings: {
          ...base.coreSetup.sizes.settings.customSize.pricings,
          ...(firstMaterialSizes?.customSize?.pricings || {}),
          unit: {
            ...base.coreSetup.sizes.settings.customSize.pricings.unit,
            ...(firstMaterialSizes?.customSize?.pricings?.unit || {}),
          },
          range: Array.isArray(firstMaterialSizes?.customSize?.pricings?.range)
            ? firstMaterialSizes.customSize.pricings.range.map((item: any) => ({
                basePrice: item?.basePrice ?? 0,
                surface: item?.surface ?? 0,
                charPrice: item?.charPrice ?? 0,
              }))
            : [],
        },
      },
    };
  }

  if (firstMaterialColors && typeof firstMaterialColors === "object") {
    base.coreSetup.colors.customColors = {
      ...base.coreSetup.colors.customColors,
      ...(firstMaterialColors?.customColors || {}),
      active: Boolean(firstMaterialColors?.customColors?.active),
      label: normalizeText(firstMaterialColors?.customColors?.label || "Custom Colors"),
      prevImg: normalizeText(firstMaterialColors?.customColors?.prevImg),
    };
  }

  const sizeMap = new Map<string, SimplifiedBuilderData["coreSetup"]["sizes"]["items"][number]>();
  const colorMap = new Map<string, SimplifiedBuilderData["coreSetup"]["colors"]["items"][number]>();
  const fixingMethodMap = new Map<
    string,
    SimplifiedBuilderData["customizationOptions"]["fixingMethods"]["items"][number]
  >();
  const shapeMap = new Map<
    string,
    SimplifiedBuilderData["customizationOptions"]["shapes"]["items"][number]
  >();
  const borderMap = new Map<
    string,
    SimplifiedBuilderData["customizationOptions"]["borders"]["items"][number]
  >();
  const additionalInputMap = new Map<
    string,
    SimplifiedBuilderData["customizationOptions"]["components"]["items"][number]
  >();

  materials.forEach((material: any, materialIndex: number) => {
    const materialId = createMaterialId(material, materialIndex);
    base.customizationOptions.materials.items.push({
      id: materialId,
      sourceIndex: materialIndex,
      label: normalizeText(material?.name || `Material ${materialIndex + 1}`),
      description: normalizeText(material?.description),
      image: normalizeText(material?.icon),
      popupImage: normalizeText(material?.popImg),
      type: normalizeText(material?.type || "simple"),
      active: material?.active !== false,
    });

    const materialData = material?.data || {};
    const allSizes = Array.isArray(materialData?.sizes?.allSizes)
      ? materialData.sizes.allSizes
      : [];
    allSizes.forEach((size: any) => {
      const sizeId = createSizeId(size);
      if (!sizeMap.has(sizeId)) {
        sizeMap.set(sizeId, {
          id: sizeId,
          label: normalizeText(size?.label || `${size?.width}x${size?.height}`),
          width: size?.width ?? "",
          height: size?.height ?? "",
          textNumber: 0,
          maxTextChar: 0,
          charPrice: 0,
          basePrice: 0,
          startPriceAtChar: 0,
          isDefault: false,
          excludeMaterials: [],
        });
      }
      const currentSize = sizeMap.get(sizeId)! as any;
      currentSize.textNumber = size?.textNumber ?? currentSize.textNumber ?? 0;
      currentSize.maxTextChar = size?.maxTextChar ?? currentSize.maxTextChar ?? 0;
      currentSize.charPrice = size?.charPrice ?? currentSize.charPrice ?? 0;
      currentSize.basePrice = size?.basePrice ?? currentSize.basePrice ?? 0;
      currentSize.startPriceAtChar =
        size?.startPriceAtChar ?? currentSize.startPriceAtChar ?? 0;
      currentSize.isDefault = currentSize.isDefault || Boolean(size?.isDefault);
      currentSize.__materials = Array.isArray(currentSize.__materials)
        ? [...currentSize.__materials, materialId]
        : [materialId];
    });

    const rawColors =
      Array.isArray(materialData?.colors?.allColors)
        ? materialData.colors.allColors
        : Array.isArray(materialData?.colors)
          ? materialData.colors
          : [];
    const allColors = rawColors;
    allColors.forEach((color: any) => {
      const colorId = createColorId(color);
      if (!colorMap.has(colorId)) {
        colorMap.set(colorId, {
          id: colorId,
          label: normalizeText(color?.name || color?.label || "Color"),
          name: normalizeText(color?.name || color?.label || "Color"),
          codeHex: normalizeText(color?.textColor?.codeHex || color?.pattern?.codeHex),
          additionalPrice: color?.additionalPrice ?? 0,
          isDefault: Boolean(color?.isDefault),
          textColor: cloneObject(color?.textColor || {}),
          pattern: cloneObject(color?.pattern || {}),
          prevImg: normalizeText(color?.prevImg),
          rulesByMaterial: {},
        });
      }

      const currentColor = colorMap.get(colorId)!;
      currentColor.additionalPrice = color?.additionalPrice ?? currentColor.additionalPrice ?? 0;
      currentColor.isDefault = Boolean(currentColor.isDefault) || Boolean(color?.isDefault);
      currentColor.textColor =
        Object.keys(currentColor.textColor || {}).length > 0
          ? currentColor.textColor
          : cloneObject(color?.textColor || {});
      currentColor.pattern =
        Object.keys(currentColor.pattern || {}).length > 0
          ? currentColor.pattern
          : cloneObject(color?.pattern || {});
      currentColor.prevImg =
        normalizeText(currentColor.prevImg) || normalizeText(color?.prevImg);

      currentColor.rulesByMaterial[materialId] = {
        enabled: true,
        isDefault: Boolean(color?.isDefault),
        additionalPrice: color?.additionalPrice ?? 0,
        previewImage: normalizeText(color?.prevImg),
        textColor: cloneObject(color?.textColor || {}),
        pattern: cloneObject(color?.pattern || {}),
      };
    });

    const fixingMethods = Array.isArray(materialData?.fixingMethods)
      ? materialData.fixingMethods
      : [];
    fixingMethods.forEach((fixingMethod: any) => {
      const fixingMethodId = createFixingMethodId(fixingMethod);
      if (!fixingMethodMap.has(fixingMethodId)) {
        fixingMethodMap.set(fixingMethodId, {
          id: fixingMethodId,
          fixingMethodId: fixingMethod?.fixingMethodId ?? "",
          rulesByMaterial: {},
        });
      }

      fixingMethodMap.get(fixingMethodId)!.rulesByMaterial[materialId] = {
        enabled: true,
        isDefault: Boolean(fixingMethod?.isDefault),
        isVisible: fixingMethod?.isVisible !== false,
        additionalPrice: fixingMethod?.additionalPrice ?? 0,
        excludeSizes: Array.isArray(fixingMethod?.excludeSizes)
          ? fixingMethod.excludeSizes.map(String)
          : [],
        excludeShapes: Array.isArray(fixingMethod?.excludeShapes)
          ? fixingMethod.excludeShapes.map(String)
          : [],
      };
    });

    const shapes = Array.isArray(materialData?.shapes) ? materialData.shapes : [];
    shapes.forEach((shape: any) => {
      const shapeId = createShapeId(shape);
      if (!shapeMap.has(shapeId)) {
        shapeMap.set(shapeId, {
          id: shapeId,
          shapeId: shape?.shapeId ?? "",
          rulesByMaterial: {},
        });
      }

      shapeMap.get(shapeId)!.rulesByMaterial[materialId] = {
        enabled: true,
        isDefault: Boolean(shape?.isDefault),
        additionalPrice: shape?.additionalPrice ?? 0,
        enablePricingBySurface: Boolean(shape?.enablePricingBySurface),
        surface: shape?.surface ?? 0,
        shapeSize: cloneObject(shape?.shapeSize || {}),
      };
    });

    const borders = Array.isArray(materialData?.borders?.allBorders)
      ? materialData.borders.allBorders
      : [];
    borders.forEach((border: any) => {
      const borderId = createBorderId(border);
      if (!borderMap.has(borderId)) {
        borderMap.set(borderId, {
          id: borderId,
          borderId: border?.manageBorderId ?? "",
          rulesByMaterial: {},
        });
      }

      borderMap.get(borderId)!.rulesByMaterial[materialId] = {
        enabled: true,
        isDefault: Boolean(border?.isDefault),
        additionalPrice: border?.additionalPrice ?? 0,
        excludeSizes: Array.isArray(border?.excludeSizes)
          ? border.excludeSizes.map(String)
          : [],
        excludeShapes: Array.isArray(border?.excludeShapes)
          ? border.excludeShapes.map(String)
          : [],
      };
    });

    const additionalOptions = Array.isArray(materialData?.additionalOptions)
      ? materialData.additionalOptions
      : [];
    additionalOptions.forEach((option: any) => {
      const optionId = createAdditionalInputId(option);
      if (!additionalInputMap.has(optionId)) {
        additionalInputMap.set(optionId, {
          id: optionId,
          title: normalizeText(option?.title || "Additional input"),
          description: normalizeText(option?.description),
          icon: normalizeText(option?.icon),
          options: cloneObject(Array.isArray(option?.options) ? option.options : []),
          rulesByMaterial: {},
        });
      }

      additionalInputMap.get(optionId)!.rulesByMaterial[materialId] = {
        enabled: true,
      };
    });
  });

  const materialIds = base.customizationOptions.materials.items.map((item) => item.id);
  base.migratedFromLegacy = true;
  base.coreSetup.sizes.items = Array.from(sizeMap.values()).map((item: any) => ({
    id: item.id,
    label: item.label,
    width: item.width,
    height: item.height,
    textNumber: item.textNumber,
    maxTextChar: item.maxTextChar,
    charPrice: item.charPrice,
    basePrice: item.basePrice,
    startPriceAtChar: item.startPriceAtChar,
    isDefault: Boolean(item.isDefault),
    excludeMaterials: materialIds.filter(
      (materialId) => !Array.isArray(item.__materials) || !item.__materials.includes(materialId),
    ),
  }));
  base.coreSetup.colors.items = Array.from(colorMap.values());
  base.customizationOptions.fixingMethods.items = Array.from(fixingMethodMap.values());
  base.customizationOptions.shapes.items = Array.from(shapeMap.values());
  base.customizationOptions.borders.items = Array.from(borderMap.values());
  base.customizationOptions.components.items = Array.from(additionalInputMap.values());

  return base;
};

export const ensureClassicSimplifiedBuilderData = ({
  data,
  materialType = "",
  productFamily = "",
  productType = "",
  pricingMode = null,
}: {
  data: any;
  materialType?: string | null;
  productFamily?: string | null;
  productType?: string | null;
  pricingMode?: string | null;
}) => {
  const safeData = data && typeof data === "object" ? cloneObject(data) : {};
  const {
    simplifiedBuilder: _simplifiedBuilder,
    productFamily: _legacyProductFamily,
    ...safeDataWithoutBuilder
  } = safeData || {};
  const candidateProductType = normalizeText(
    productType || safeDataWithoutBuilder?.productType,
  );
  const normalizedProductFamily = normalizeText(
    productFamily ||
      safeDataWithoutBuilder?.productFamily ||
      getAsoClassicFamilyForProductType(candidateProductType)?.key,
  );
  const existing = safeData?.simplifiedBuilder;
  const isAdvancedMaterialType = (value: unknown) => {
    const normalized = normalizeText(value).toLowerCase();
    return normalized === "advance" || normalized === "advanced";
  };
  const hasStructuredClassicBlocks =
    Boolean(safeDataWithoutBuilder?.requiredOptions) ||
    Boolean(safeDataWithoutBuilder?.additionalOptions) ||
    String(safeDataWithoutBuilder?.configuratorMeta?.structure || "")
      .trim()
      .toLowerCase() === "modular-classic";

  if (existing && typeof existing === "object") {
    const normalizedMetaMaterialType = normalizeText(
      materialType || existing?.meta?.materialType,
    );
    const normalizedMetaProductType = normalizeText(
      productType || existing?.meta?.productType,
    );
    const normalizedMetaPricingMode =
      pricingMode != null
        ? normalizeText(pricingMode)
        : existing?.meta?.pricingMode || "frame-fit";
    const normalizedBuilder = {
      ...existing,
      version: 1,
      mode: "option-centric",
      coreSetup: {
        ...(existing?.coreSetup || {}),
        sizes: {
          settings: {
            ...createDefaultRequiredSizeSettings(),
            ...(existing?.coreSetup?.sizes?.settings || {}),
            thickness: {
              ...createDefaultRequiredSizeSettings().thickness,
              ...(existing?.coreSetup?.sizes?.settings?.thickness || {}),
              values: Array.isArray(existing?.coreSetup?.sizes?.settings?.thickness?.values)
                ? existing.coreSetup.sizes.settings.thickness.values
                : [],
            },
            customSize: {
              ...createDefaultRequiredSizeSettings().customSize,
              ...(existing?.coreSetup?.sizes?.settings?.customSize || {}),
              width: {
                ...createDefaultRequiredSizeSettings().customSize.width,
                ...(existing?.coreSetup?.sizes?.settings?.customSize?.width || {}),
              },
              height: {
                ...createDefaultRequiredSizeSettings().customSize.height,
                ...(existing?.coreSetup?.sizes?.settings?.customSize?.height || {}),
              },
              pricings: {
                ...createDefaultRequiredSizeSettings().customSize.pricings,
                ...(existing?.coreSetup?.sizes?.settings?.customSize?.pricings || {}),
                unit: {
                  ...createDefaultRequiredSizeSettings().customSize.pricings.unit,
                  ...(existing?.coreSetup?.sizes?.settings?.customSize?.pricings?.unit || {}),
                },
                range: Array.isArray(
                  existing?.coreSetup?.sizes?.settings?.customSize?.pricings?.range,
                )
                  ? existing.coreSetup.sizes.settings.customSize.pricings.range
                  : [],
              },
            },
          },
          items: Array.isArray(existing?.coreSetup?.sizes?.items)
            ? existing.coreSetup.sizes.items
            : [],
        },
      },
      meta: {
        ...(existing?.meta || {}),
        materialType: normalizedMetaMaterialType,
        productType: normalizedMetaProductType,
        pricingMode: normalizedMetaPricingMode,
      },
    };
    const normalizedMaterialType = normalizeText(
      materialType || normalizedBuilder?.meta?.materialType,
    );
    const exposeComponents = !isAdvancedMaterialType(normalizedMaterialType);

    return {
      ...safeDataWithoutBuilder,
      materialType: normalizedMetaMaterialType,
      productType: normalizedMetaProductType,
      pricingMode: normalizedMetaPricingMode,
      settings: {
        ...(safeDataWithoutBuilder?.settings || {}),
        customizerSign: normalizeClassicCustomizerSignSettings(
          safeDataWithoutBuilder?.settings?.customizerSign,
        ),
      },
      requiredOptions: {
        ...(safeDataWithoutBuilder?.requiredOptions || {}),
        pricing: normalizedBuilder.coreSetup.pricing,
        sizes: normalizedBuilder.coreSetup.sizes,
        fonts: normalizedBuilder.coreSetup.fonts,
        colors: normalizedBuilder.coreSetup.colors,
      },
      additionalOptions: {
        ...(safeDataWithoutBuilder?.additionalOptions || {}),
        materials: normalizedBuilder.customizationOptions.materials,
        fixingMethods: normalizedBuilder.customizationOptions.fixingMethods,
        shapes: normalizedBuilder.customizationOptions.shapes,
        borders: normalizedBuilder.customizationOptions.borders,
        ...(exposeComponents
          ? {
              components:
                normalizedBuilder.customizationOptions.components ||
                normalizedBuilder.customizationOptions.additionalInputs,
            }
          : {}),
        inputs: normalizedBuilder.customizationOptions.inputs,
      },
      configuratorMeta: {
        version: 1,
        structure: "modular-classic",
      },
    };
  }

  if (hasStructuredClassicBlocks) {
    const normalizedMaterialType = normalizeText(
      materialType || safeDataWithoutBuilder?.materialType,
    );
    const normalizedProductType = normalizeText(
      productType || safeDataWithoutBuilder?.productType,
    );
    const normalizedPricingMode =
      pricingMode != null
        ? normalizeText(pricingMode)
        : normalizeText(
            safeDataWithoutBuilder?.pricingMode ||
              safeDataWithoutBuilder?.requiredOptions?.pricing?.mode,
          ) || "frame-fit";
    const exposeComponents = !isAdvancedMaterialType(normalizedMaterialType);

    return {
      ...safeDataWithoutBuilder,
      materialType: normalizedMaterialType,
      productType: normalizedProductType,
      pricingMode: normalizedPricingMode,
      settings: {
        ...(safeDataWithoutBuilder?.settings || {}),
        customizerSign: normalizeClassicCustomizerSignSettings(
          safeDataWithoutBuilder?.settings?.customizerSign,
        ),
      },
      requiredOptions: {
        pricing: normalizeStructuredPricingBlock(
          safeDataWithoutBuilder?.requiredOptions?.pricing,
          normalizedPricingMode,
        ),
        sizes: normalizeStructuredBlock(
          safeDataWithoutBuilder?.requiredOptions?.sizes,
          { label: "Sizes" },
        ),
        fixingMethods: normalizeStructuredBlock(
          safeDataWithoutBuilder?.requiredOptions?.fixingMethods,
          { label: "Fixing Methods" },
        ),
        shapes: normalizeStructuredBlock(
          safeDataWithoutBuilder?.requiredOptions?.shapes,
          { label: "Shapes" },
        ),
        borders: normalizeStructuredBlock(
          safeDataWithoutBuilder?.requiredOptions?.borders,
          { label: "Borders" },
        ),
        fonts: normalizeStructuredBlock(
          safeDataWithoutBuilder?.requiredOptions?.fonts,
          { label: "Fonts" },
        ),
        colors: normalizeStructuredColorsBlock(
          safeDataWithoutBuilder?.requiredOptions?.colors,
        ),
        ...(exposeComponents
          ? {}
          : {
              components: normalizeStructuredBlock(
                safeDataWithoutBuilder?.requiredOptions?.components,
                { label: "Components" },
              ),
            }),
      },
      additionalOptions: {
        materials: normalizeStructuredBlock(
          safeDataWithoutBuilder?.additionalOptions?.materials,
          { label: "Materials" },
        ),
        fixingMethods: normalizeStructuredBlock(
          safeDataWithoutBuilder?.additionalOptions?.fixingMethods,
          { label: "Fixing Methods" },
        ),
        shapes: normalizeStructuredBlock(
          safeDataWithoutBuilder?.additionalOptions?.shapes,
          { label: "Shapes" },
        ),
        borders: normalizeStructuredBlock(
          safeDataWithoutBuilder?.additionalOptions?.borders,
          { label: "Borders" },
        ),
        ...(exposeComponents
          ? {
              components: normalizeStructuredBlock(
                safeDataWithoutBuilder?.additionalOptions?.components,
                { label: "Additional Components" },
              ),
            }
          : {}),
        inputs: normalizeStructuredBlock(
          safeDataWithoutBuilder?.additionalOptions?.inputs,
          { label: "Inputs" },
        ),
      },
      configuratorMeta: {
        version: 1,
        structure: "modular-classic",
        ...(safeDataWithoutBuilder?.configuratorMeta || {}),
      },
    };
  }

  const migratedBuilder = migrateLegacyClassicDataToSimplifiedBuilder({
    data: safeData,
    materialType,
    productType,
    pricingMode,
  });
  const normalizedMaterialType = normalizeText(
    materialType || migratedBuilder?.meta?.materialType,
  );
  const normalizedProductType = normalizeText(
    productType || migratedBuilder?.meta?.productType,
  );
  const normalizedPricingMode =
    pricingMode != null
      ? normalizeText(pricingMode)
      : migratedBuilder?.meta?.pricingMode || "frame-fit";
  const exposeComponents = !isAdvancedMaterialType(normalizedMaterialType);

  return {
    ...safeDataWithoutBuilder,
    materialType: normalizedMaterialType,
    productType: normalizedProductType,
    pricingMode: normalizedPricingMode,
    settings: {
      ...(safeDataWithoutBuilder?.settings || {}),
      customizerSign: normalizeClassicCustomizerSignSettings(
        safeDataWithoutBuilder?.settings?.customizerSign,
      ),
    },
    requiredOptions: {
      ...(safeDataWithoutBuilder?.requiredOptions || {}),
      pricing: migratedBuilder.coreSetup.pricing,
      sizes: migratedBuilder.coreSetup.sizes,
      fonts: migratedBuilder.coreSetup.fonts,
      colors: migratedBuilder.coreSetup.colors,
    },
    additionalOptions: {
      ...(safeDataWithoutBuilder?.additionalOptions || {}),
      materials: migratedBuilder.customizationOptions.materials,
      fixingMethods: migratedBuilder.customizationOptions.fixingMethods,
      shapes: migratedBuilder.customizationOptions.shapes,
      borders: migratedBuilder.customizationOptions.borders,
      ...(exposeComponents
        ? {
            components:
              migratedBuilder.customizationOptions.components ||
              migratedBuilder.customizationOptions.additionalInputs,
          }
        : {}),
      inputs: migratedBuilder.customizationOptions.inputs,
    },
    configuratorMeta: {
      version: 1,
      structure: "modular-classic",
    },
  };
};
