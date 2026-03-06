import type {
  ConfigColor,
  ConfigCustomSize,
  ConfigSize,
  configSizeThickness,
} from "~/types/ConfigDataType";

export interface NcpcOptionItem {
  title: string;
  description: string;
  icon: string;
  popImg: string;
  additionalPrice: number | string;
  isDefault?: boolean;
}

export interface NcpcOptionGroup {
  title: string;
  description: string;
  icon: string;
  options: NcpcOptionItem[];
}

export interface NcpcRequiredOptions {
  sizeOptions: {
    allSizes?: ConfigSize[];
    sizes?: Array<Record<string, unknown>>;
    customSize: ConfigCustomSize;
    thickness: configSizeThickness;
  };
  priceOptions: Array<{
    label: string;
    prices: unknown[];
  }>;
  fontOptions?: {
    label?: string;
    description?: string;
    fonts: Array<Record<string, unknown>>;
  };
  colorOptions: {
    allColors?: ConfigColor[];
    colors?: Array<Record<string, unknown>>;
  };
  letterTypeOptions?: NcpcOptionItem[];
  letterTypesOptions?: {
    letterTypes: Array<Record<string, unknown>>;
  };
}

export interface NcpcAdditionalOptions {
  materialOptions: NcpcOptionItem[];
  jacketOptions: NcpcOptionItem[];
  backboardOptions: NcpcOptionItem[];
  backboardColorOptions: NcpcOptionItem[];
  mountingOptions: NcpcOptionItem[];
  customAdditionalsOptions: NcpcOptionGroup[];
}

export interface NcpcSettings {
  generals: Record<string, unknown>;
  languageImages: Record<string, unknown>;
  infos: Record<string, unknown>;
  themes: Record<string, unknown>;
  themeColors: Record<string, unknown>;
  sortOptions: string[];
}

export interface NcpcData {
  version?: number;
  productType?: "neon" | "channel";
  pricingMode?: "fixed-height" | "fixed-width" | "advanced" | "frame-fit";
  requiredOptions: NcpcRequiredOptions;
  additionalOptions: NcpcAdditionalOptions;
  settings: NcpcSettings;
}
