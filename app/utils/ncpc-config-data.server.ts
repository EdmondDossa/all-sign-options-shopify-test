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

const DEFAULT_SCENE_IMAGES = Array.from(
  { length: 7 },
  (_item, index) => `/aso_default_files/scenes/${index + 1}.jpg`,
);

const normalizeDemoFontUrl = (input: unknown, isGoogleFont: boolean) => {
  const raw = String(input || "").trim();
  if (!raw || isGoogleFont) return raw;

  const normalized = raw.replace(/\\/g, "/");
  const directMatch = normalized.match(/\/aso_default_files\/fonts\/([^/?#]+)$/i);
  if (directMatch?.[1]) {
    return `/aso_default_files/fonts/${directMatch[1]}`;
  }

  const genericFontsMatch = normalized.match(/\/fonts\/([^/?#]+)$/i);
  if (genericFontsMatch?.[1]) {
    return `/aso_default_files/fonts/${genericFontsMatch[1]}`;
  }

  return raw;
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

  const sceneImages = (cleanData as any)?.settings?.languageImages?.images?.manageImages;
  const normalizedSceneImages = Array.isArray(sceneImages)
    ? sceneImages.map((img: any) => String(img || "").trim()).filter(Boolean)
    : [];

  const shouldFallbackToDefaultScenes =
    normalizedSceneImages.length === 0 ||
    normalizedSceneImages.every((img: string) => {
      const lower = img.toLowerCase();
      return (
        lower.includes("/images/include-imgs/") ||
        lower.includes("ncpc_assets_url")
      );
    });

  if ((cleanData as any)?.settings?.languageImages?.images) {
    (cleanData as any).settings.languageImages.images.manageImages =
      shouldFallbackToDefaultScenes
        ? [...DEFAULT_SCENE_IMAGES]
        : normalizedSceneImages;
  }

  const presetFonts = (cleanData as any)?.requiredOptions?.fontOptions?.fonts;
  if (Array.isArray(presetFonts)) {
    (cleanData as any).requiredOptions.fontOptions.fonts = presetFonts.map(
      (font: any) => {
        const isGoogleFont = Boolean(font?.isGoogleFont);
        return {
          ...(font || {}),
          url: normalizeDemoFontUrl(font?.url, isGoogleFont),
        };
      },
    );
  }

  return cleanData;
};
