import ConfigurationService from "~/models/Configuration.service";
import type { ConfigurationType } from "~/types/ConfigurationType";
import type { NcpcData } from "~/types/NcpcDataType";
import { getDefaultNcpcPresetKey, getDefaultNcpcPricingMode } from "~/utils/ncpc-presets";

const RESERVED_GROUP_TITLES = new Set([
  "letter type",
  "material",
  "materials",
  "jacket",
  "backboard",
  "backboard color",
  "backboards color",
  "backboards colors",
  "mounting",
]);

const deepClone = <T>(value: T): T =>
  JSON.parse(JSON.stringify(value ?? null));

const normalizeProductType = (value: unknown): "neon" | "channel" => {
  const normalized = String(value || "")
    .trim()
    .toLowerCase();

  return normalized === "channel" ? "channel" : "neon";
};

const normalizePricingMode = (value: unknown) => {
  const normalized = String(value || "")
    .trim()
    .toLowerCase();

  if (normalized === "fixing-height") return "fixed-height";
  if (normalized === "fixing-width") return "fixed-width";
  return normalized;
};

const hasDirectNcpcShape = (data: any) => {
  if (!data || typeof data !== "object") return false;
  return Boolean(data.requiredOptions || data.additionalOptions || data.settings);
};

const getDirectNcpcData = (configuration: any): NcpcData | null => {
  const rawData = configuration?.data;

  if (hasDirectNcpcShape(rawData)) {
    return deepClone(rawData) as NcpcData;
  }

  if (rawData?.ncpc && typeof rawData.ncpc === "object") {
    return deepClone(rawData.ncpc) as NcpcData;
  }

  return null;
};

const withDirectNcpcData = (configuration: any, ncpcData: NcpcData) => ({
  ...configuration,
  data: deepClone(ncpcData),
});

export default class NcpcConfigurationService {
  static normalizeProductType = normalizeProductType;

  static ensureNcpcData(configuration: any): NcpcData {
    const data = getDirectNcpcData(configuration);

    if (data) {
      const draft = deepClone(data) as any;
      draft.requiredOptions = draft.requiredOptions || {};
      draft.requiredOptions.sizeOptions = draft.requiredOptions.sizeOptions || {
        allSizes: [],
        customSize: {
          active: false,
          width: { label: "Custom width", min: 0, max: 0 },
          height: { label: "Custom height", min: 0, max: 0 },
          pricings: {
            type: "unit",
            rangePricingPerUnit: false,
            range: [],
            unit: {
              basePrice: 0,
              surface: 0,
              charPrice: 0,
            },
          },
        },
        thickness: {
          active: false,
          values: [],
        },
      };
      draft.requiredOptions.priceOptions = Array.isArray(draft.requiredOptions.priceOptions)
        ? draft.requiredOptions.priceOptions
        : [];
      draft.requiredOptions.fontOptions = draft.requiredOptions.fontOptions || {
        label: "",
        description: "",
        fonts: [],
      };
      draft.requiredOptions.colorOptions = draft.requiredOptions.colorOptions || {
        allColors: [],
      };
      draft.requiredOptions.letterTypeOptions = Array.isArray(draft.requiredOptions.letterTypeOptions)
        ? draft.requiredOptions.letterTypeOptions
        : [];
      draft.additionalOptions = draft.additionalOptions || {
        materialOptions: [],
        jacketOptions: [],
        backboardOptions: [],
        backboardColorOptions: [],
        mountingOptions: [],
        customAdditionalsOptions: [],
      };
      draft.settings = draft.settings || {
        generals: {},
        languageImages: {},
        infos: {},
        themes: {},
        themeColors: {},
        sortOptions: [],
      };
      return draft as NcpcData;
    }

    return {
      requiredOptions: {
        sizeOptions: {
          allSizes: [],
          customSize: {
            active: false,
            width: { label: "Custom width", min: 0, max: 0 },
            height: { label: "Custom height", min: 0, max: 0 },
            pricings: {
              type: "unit",
              rangePricingPerUnit: false,
              range: [],
              unit: {
                basePrice: 0,
                surface: 0,
                charPrice: 0,
              },
            },
          },
          thickness: {
            active: false,
            values: [],
          },
        },
        priceOptions: [],
        fontOptions: {
          label: "",
          description: "",
          fonts: [],
        },
        colorOptions: {
          allColors: [],
        },
        letterTypeOptions: [],
      },
      additionalOptions: {
        materialOptions: [],
        jacketOptions: [],
        backboardOptions: [],
        backboardColorOptions: [],
        mountingOptions: [],
        customAdditionalsOptions: [],
      },
      settings: {
        generals: {},
        languageImages: {},
        infos: {},
        themes: {},
        themeColors: {},
        sortOptions: [],
      },
    } as NcpcData;
  }

  static async getContext(configId: number, sessionId: string) {
    const configuration = await ConfigurationService.getConfiguration(configId, sessionId);
    if (!configuration) return null;

    const currentData = configuration?.data;
    const hasLegacyNcpcWrapper = Boolean(currentData?.ncpc && typeof currentData.ncpc === "object");

    if (hasLegacyNcpcWrapper) {
      configuration.data = deepClone(currentData.ncpc);
      await ConfigurationService.updateConfiguration(configuration as ConfigurationType, sessionId);
    }

    const ncpcData = this.ensureNcpcData(configuration);
    const productType = normalizeProductType(configuration?.productType);
    const currentPricingMode =
      normalizePricingMode((configuration as any)?.pricingMode) ||
      normalizePricingMode((ncpcData as any)?.pricingMode);
    const defaultPricingMode = getDefaultNcpcPricingMode(
      productType,
      getDefaultNcpcPresetKey(productType),
    );
    const pricingMode = currentPricingMode || defaultPricingMode;

    const hasMetaMismatch =
      normalizeProductType(configuration?.productType) !== productType ||
      normalizePricingMode((configuration as any)?.pricingMode) !== pricingMode;

    if (hasMetaMismatch) {
      configuration.productType = productType;
      (configuration as any).pricingMode = pricingMode;
      await ConfigurationService.updateConfiguration(
        configuration as ConfigurationType,
        sessionId,
      );
    }

    return {
      configuration,
      productType,
      ncpcData,
    };
  }

  static async mutateNcpc(
    configId: number,
    sessionId: string,
    mutator: (draft: NcpcData) => void,
  ) {
    const context = await this.getContext(configId, sessionId);
    if (!context) return null;

    const draft = deepClone(context.ncpcData);
    mutator(draft);

    context.configuration.data = withDirectNcpcData(context.configuration, draft).data;

    const updated = await ConfigurationService.updateConfiguration(
      context.configuration as ConfigurationType,
      sessionId,
    );

    return {
      configuration: updated || context.configuration,
      productType: normalizeProductType((updated || context.configuration)?.productType),
      ncpcData: draft,
    };
  }

  static getByPath(data: NcpcData, path: string) {
    return path.split(".").reduce((acc: any, key) => {
      if (acc == null) return undefined;
      return acc[key];
    }, data as any);
  }

  static setByPath(data: NcpcData, path: string, value: any) {
    const keys = path.split(".");
    let cursor: any = data;

    for (let i = 0; i < keys.length - 1; i += 1) {
      const key = keys[i];
      const nextKey = keys[i + 1];
      const nextIsIndex = /^\d+$/.test(nextKey);

      if (cursor[key] == null) {
        cursor[key] = nextIsIndex ? [] : {};
      }

      cursor = cursor[key];
    }

    cursor[keys[keys.length - 1]] = value;
  }

  static reservedGroupTitles = RESERVED_GROUP_TITLES;
}
