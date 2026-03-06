import fs from "node:fs/promises";
import path from "node:path";
import vm from "node:vm";

export type NcpcProductType = "neon" | "channel";

type NcpcConfigEntry = {
  type?: string;
  name?: string;
  data?: Record<string, any>;
};

const PRESET_NAME_BY_KEY: Record<string, string> = {
  "neon-letter-signs": "Neon Letter Signs",
  "neon-logo-signs": "Neon Logo Signs",
  "acrylic-letter-signs": "Acrylic Letter Signs",
  "metal-letter-signs": "Metal Letter Signs",
  "wood-letter-signs": "Wood Letter Signs",
};

const deepClone = <T>(value: T): T =>
  JSON.parse(JSON.stringify(value ?? null));

const normalizePricingMode = (value?: string | null) => {
  const normalized = String(value || "")
    .trim()
    .toLowerCase();

  if (normalized === "fixing-height") return "fixed-height";
  if (normalized === "fixing-width") return "fixed-width";
  return normalized;
};

const getPricingModeCandidates = (value?: string | null) => {
  const normalized = normalizePricingMode(value);

  if (!normalized) return [];

  if (normalized === "fixed-height") {
    return ["fixed-height", "fixing-height"];
  }

  if (normalized === "fixed-width") {
    return ["fixed-width", "fixing-width"];
  }

  return [normalized];
};

let cachedConfigData: { configs: NcpcConfigEntry[] } | null = null;

const loadNcpcConfigData = async () => {
  if (cachedConfigData) {
    return cachedConfigData;
  }

  const filePath = path.resolve(process.cwd(), "app/utils/config-data.js");
  const sourceFile = await fs.readFile(filePath, "utf8");

  const executableSource = sourceFile
    .replace(/export\s+\{[^}]+\};?/g, "")
    .replace(/export\s+default\s+[^;]+;?/g, "");

  const context = {
    ncpcData: {
      ncpc_assets_url: "",
      ncpc_translate_text: {},
    },
    result: {
      configs: [] as NcpcConfigEntry[],
    },
  };

  vm.createContext(context);
  vm.runInContext(
    `${executableSource}\nresult.configs = Array.isArray(configs) ? configs : [];`,
    context,
    {
      filename: "config-data.js",
    },
  );

  cachedConfigData = {
    configs: Array.isArray(context.result.configs) ? context.result.configs : [],
  };

  return cachedConfigData;
};

const pickPresetConfig = (
  configs: NcpcConfigEntry[],
  productType: NcpcProductType,
  presetKey?: string | null,
) => {
  const targetName = PRESET_NAME_BY_KEY[String(presetKey || "").trim()];

  if (targetName) {
    const byName = configs.find((entry) => String(entry?.name || "").trim() === targetName);
    if (byName) {
      return byName;
    }
  }

  const byType = configs.find(
    (entry) => String(entry?.type || "").trim().toLowerCase() === productType,
  );

  return byType || null;
};

const pickPricingData = (
  preset: NcpcConfigEntry,
  pricingMode?: string | null,
) => {
  const pricingData = preset?.data && typeof preset.data === "object" ? preset.data : null;
  if (!pricingData) return null;

  const entries = Object.entries(pricingData);
  if (!entries.length) return null;

  const candidates = getPricingModeCandidates(pricingMode);

  const matched = entries.find(([key, value]) => {
    const normalizedKey = normalizePricingMode(key);
    const normalizedValue = normalizePricingMode(value?.pricingMode);

    if (candidates.includes(normalizedKey)) return true;
    if (candidates.includes(normalizedValue)) return true;

    return false;
  });

  return (matched ? matched[1] : entries[0][1]) || null;
};

export const getNcpcPresetConfigurationData = async ({
  productType,
  presetKey,
  pricingMode,
}: {
  productType: NcpcProductType;
  presetKey?: string | null;
  pricingMode?: string | null;
}) => {
  const { configs } = await loadNcpcConfigData();
  const preset = pickPresetConfig(configs, productType, presetKey);

  if (!preset) {
    return null;
  }

  const selectedPricing = pickPricingData(preset, pricingMode);
  if (!selectedPricing) {
    return null;
  }

  const rawData =
    selectedPricing?.data && typeof selectedPricing.data === "object"
      ? selectedPricing.data
      : selectedPricing;

  if (!rawData || typeof rawData !== "object") {
    return null;
  }

  const cleanData = deepClone(rawData as Record<string, any>);
  delete (cleanData as any).productType;
  delete (cleanData as any).pricingMode;
  return cleanData;
};
