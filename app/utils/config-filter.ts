import { PRICING_PLANS } from "./pricing";

export const configFilter = (config: any) => {
  const data = config?.data;
  if (!data) {
    return config;
  }

  const materialType = data?.materialType;
  const materialsContainer = data?.additionalOptions?.materials;
  const materials = Array.isArray(materialsContainer?.items) ? materialsContainer.items : [];

  if (materials.length) {
    const filteredMaterials = materials
      .filter((material: any) => PRICING_PLANS.STARTER_RULES.materialTypes.includes(materialType || material?.type || ""))
      .slice(0, PRICING_PLANS.STARTER_RULES.materials);

    if (materialsContainer) {
      materialsContainer.items = filteredMaterials;
    }
  }

  if (Array.isArray(data?.requiredOptions?.sizes?.items)) {
    data.requiredOptions.sizes.items = data.requiredOptions.sizes.items.slice(0, PRICING_PLANS.STARTER_RULES.materialSizes);
  }

  if (data?.requiredOptions?.sizes?.customSize) {
    data.requiredOptions.sizes.customSize.active = PRICING_PLANS.STARTER_RULES.materialCustomSizes;
  }

  if (Array.isArray(data?.requiredOptions?.colors?.items)) {
    data.requiredOptions.colors.items = data.requiredOptions.colors.items.slice(0, PRICING_PLANS.STARTER_RULES.materialColors);
  }

  if (data?.requiredOptions?.colors?.customColor) {
    data.requiredOptions.colors.customColor.active = PRICING_PLANS.STARTER_RULES.materialCustomColors;
  }

  if (Array.isArray(data?.requiredOptions?.shapes?.items)) {
    data.requiredOptions.shapes.items = data.requiredOptions.shapes.items.slice(0, PRICING_PLANS.STARTER_RULES.materialShapes);
  }

  if (Array.isArray(data?.requiredOptions?.borders?.items)) {
    data.requiredOptions.borders.items = data.requiredOptions.borders.items.slice(0, PRICING_PLANS.STARTER_RULES.materialBorders);
  }

  if (Array.isArray(data?.requiredOptions?.fixingMethods?.items)) {
    data.requiredOptions.fixingMethods.items = data.requiredOptions.fixingMethods.items.slice(0, PRICING_PLANS.STARTER_RULES.materialFixingMethods);
  }

  if (config?.data?.settings?.customizerSign?.signPart?.doublePart?.active) {
    config.data.settings.customizerSign.signPart.doublePart.active = PRICING_PLANS.STARTER_RULES.doublePart;
  }

  if (config?.data?.settings?.customizerSign?.images?.enableCustomColor) {
    config.data.settings.customizerSign.images.enableCustomColor = PRICING_PLANS.STARTER_RULES.imageCustomColors;
  }

  if (config?.data?.settings?.customizerSign?.images?.colors?.length) {
    config.data.settings.customizerSign.images.colors = config.data.settings.customizerSign.images.colors.slice(0, PRICING_PLANS.STARTER_RULES.imageColors);
  }

  if (config?.data?.settings?.customizerSign?.text) {
    config.data.settings.customizerSign.text.enableCustomColor = PRICING_PLANS.STARTER_RULES.textCustomColors;
  }

  if (config?.data?.settings?.customizerSign?.text?.colors?.length) {
    config.data.settings.customizerSign.text.colors = config.data.settings.customizerSign.text.colors.slice(0, PRICING_PLANS.STARTER_RULES.textColors);
  }

  return config;
};
