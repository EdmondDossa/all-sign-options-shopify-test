const normalizeText = (value: unknown) => String(value || "").trim();

export const getClassicDataMaterialType = (data: any) => {
  const directValue = normalizeText(data?.materialType);
  if (directValue) return directValue;

  const legacyMaterials = Array.isArray(data?.materials) ? data.materials : [];
  const legacyTypes = legacyMaterials
    .map((material: any) => normalizeText(material?.type).toLowerCase())
    .filter(Boolean);

  if (
    legacyTypes.some((type: any) => type === "advance" || type === "advanced")
  ) {
    return "advance";
  }

  if (legacyTypes.some((type: any) => type === "simple")) {
    return "simple";
  }

  return "";
};

export const getClassicDataProductType = (data: any) =>
  normalizeText(data?.productType);

export const getClassicDataProductFamily = (data: any) =>
  normalizeText(data?.productType || data?.productFamily);

export const getClassicDataPricingMode = (data: any) => {
  const directValue = normalizeText(data?.pricingMode);
  if (directValue) return directValue;
  return "frame-fit";
};

export const hasAdvancedClassicMaterials = (data: any) => {
  const materialType = getClassicDataMaterialType(data).toLowerCase();
  return materialType === "advance" || materialType === "advanced";
};

export const getClassicMaterialTypeLabel = (materialType: unknown) => {
  const normalized = normalizeText(materialType).toLowerCase();

  if (normalized === "simple") {
    return "Direct Options";
  }

  if (normalized === "advance" || normalized === "advanced") {
    return "Preset Components";
  }

  if (normalized === "layer") {
    return "Layered Setup";
  }

  return normalizeText(materialType) || "Standard";
};

export const getClassicMaterialTypeDescription = (materialType: unknown) => {
  const normalized = normalizeText(materialType).toLowerCase();

  if (normalized === "simple") {
    return "Customers choose the product options directly, like size, shape, color and add-ons.";
  }

  if (normalized === "advance" || normalized === "advanced") {
    return "Customers personalize text and images on predefined product components and presets.";
  }

  if (normalized === "layer") {
    return "Customers build the product through multiple structured layers.";
  }

  return "";
};

export const getClassicProductTypeLabel = (productType: unknown) => {
  const normalized = normalizeText(productType).toLowerCase();

  if (normalized === "signs-panels" || normalized === "signs & panels") {
    return "Signs & Panels";
  }

  if (normalized === "banners" || normalized === "banner") {
    return "Banners";
  }

  if (normalized === "stickers" || normalized === "sticker") {
    return "Stickers";
  }

  if (normalized === "lettering") {
    return "Lettering";
  }

  if (normalized === "neon") {
    return "Neon";
  }

  if (normalized === "channel") {
    return "Channel";
  }

  return normalizeText(productType) || "Signboard";
};
