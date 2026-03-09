import fs from "node:fs/promises";
import path from "node:path";

export type GoogleFontCatalogItem = {
  family: string;
  category?: string;
  variants: string[];
  files: Record<string, string>;
};

let catalogCache: GoogleFontCatalogItem[] | null = null;

const normalizeCatalog = (raw: unknown): GoogleFontCatalogItem[] => {
  if (!Array.isArray(raw)) return [];

  return raw
    .map((item: any) => ({
      family: String(item?.family || "").trim(),
      category: item?.category ? String(item.category) : undefined,
      variants: Array.isArray(item?.variants)
        ? item.variants.map((v: unknown) => String(v)).filter(Boolean)
        : [],
      files:
        item?.files && typeof item.files === "object"
          ? Object.entries(item.files).reduce<Record<string, string>>((acc, [key, value]) => {
              const normalizedKey = String(key || "").trim();
              const normalizedValue = String(value || "").trim();
              if (normalizedKey && normalizedValue) acc[normalizedKey] = normalizedValue;
              return acc;
            }, {})
          : {},
    }))
    .filter(
      (item) =>
        item.family.length > 0 &&
        item.variants.length > 0 &&
        Object.keys(item.files).length > 0,
    );
};

export const loadGoogleFontsCatalog = async (): Promise<GoogleFontCatalogItem[]> => {
  if (catalogCache) return catalogCache;

  try {
    const filePath = path.join(process.cwd(), "app", "tools", "google-fonts.json");
    const file = await fs.readFile(filePath, "utf-8");
    const parsed = JSON.parse(file);
    catalogCache = normalizeCatalog(parsed);
    return catalogCache;
  } catch (error) {
    console.error("Failed to load google fonts catalog", error);
    return [];
  }
};
