import { PRICING_PLANS } from "./pricing";

export   const configFilter = (config: any) => { 
    if (config?.data?.materials?.length) {
        let materials = config.data.materials.filter((material: any) => PRICING_PLANS.STARTER_RULES.materialTypes.includes(material.type))?.slice(0, PRICING_PLANS.STARTER_RULES.materials);
        config.data.materials = [];
        for (let material of materials) { 
            if (material?.data?.sizes?.allSizes?.length) {
                material.data.sizes.allSizes = material.data.sizes.allSizes.slice(0, PRICING_PLANS.STARTER_RULES.materialSizes);
            }

            if (material?.data?.sizes?.customSize?.active) {
                material.data.sizes.customSize.active = PRICING_PLANS.STARTER_RULES.materialCustomSizes;
            }


            if (material?.data?.colors?.allColors?.length) {
                material.data.colors.allColors = material.data.colors.allColors.slice(0, PRICING_PLANS.STARTER_RULES.materialColors);
            }

            if (material?.data?.colors?.customColors?.active) {
                material.data.colors.customColors.active = PRICING_PLANS.STARTER_RULES.materialCustomColors;
            }

            if (material?.data?.shapes?.length) {
                material.data.shapes = material.data.shapes
                    .filter((shape: any) => shape.shapeId < PRICING_PLANS.STARTER_RULES.materialShapes)
                    .slice(0, PRICING_PLANS.STARTER_RULES.materialShapes);
            }

            if (material?.data?.borders?.allBorders?.length) {
                material.data.borders.allBorders = material.data.borders.allBorders
                    .filter((border: any) => border.manageBorderId < PRICING_PLANS.STARTER_RULES.materialBorders)
                    .slice(0,PRICING_PLANS.STARTER_RULES.materialBorders);
            }

            if (material?.data?.fixingMethods?.length) {
                material.data.fixingMethods = material.data.fixingMethods
                    .filter((fixingMethod: any) => fixingMethod.fixingMethodId < PRICING_PLANS.STARTER_RULES.materialFixingMethods )
                    .slice(0, PRICING_PLANS.STARTER_RULES.materialFixingMethods);
            }

            

            if (material?.data?.additionalOptions?.length) { 
                material.data.additionalOptions = [];
            }

            config.data.materials.push(material);
        }
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

    return config
}