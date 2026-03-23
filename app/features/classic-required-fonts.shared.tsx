export type ManagedFontOption = {
  id: number;
  label: string;
  url: string;
  isGoogleFont?: boolean;
};

export type ClassicRequiredFontItem = {
  id: string;
  managedFontId: number;
  label: string;
  isDefault: boolean;
};

export type FontSectionState = {
  label: string;
  description: string;
  items: ClassicRequiredFontItem[];
};

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

export const normalizeFontItem = (
  font: any,
  managedFont?: ManagedFontOption | null,
): ClassicRequiredFontItem => {
  const managedFontId = Number(font?.managedFontId ?? managedFont?.id ?? 0);
  const label = String(font?.label || managedFont?.label || "").trim();
  const isDefault = Boolean(font?.isDefault ?? font?.default);

  return {
    id: String(font?.id || `font-${managedFontId || label || "item"}`),
    managedFontId,
    label,
    isDefault,
  };
};

export const ensureSingleDefaultFont = (
  items: ClassicRequiredFontItem[],
  preferredIndex?: number,
) => {
  if (!items.length) return [];

  const existingDefaultIndex = items.findIndex((item) => item.isDefault);
  const targetDefaultIndex =
    typeof preferredIndex === "number" &&
    preferredIndex >= 0 &&
    preferredIndex < items.length
      ? preferredIndex
      : existingDefaultIndex >= 0
        ? existingDefaultIndex
        : 0;

  return items.map((item, index) => ({
    ...item,
    isDefault: index === targetDefaultIndex,
  }));
};

export const getFontsState = (
  data: any,
  managedFonts: ManagedFontOption[],
): FontSectionState => {
  const managedFontMap = new Map<number, ManagedFontOption>();
  managedFonts.forEach((font) => {
    if (Number.isFinite(Number(font?.id))) {
      managedFontMap.set(Number(font.id), font);
    }
  });

  const requiredFonts = data?.requiredOptions?.fonts;
  const builderFonts = data?.simplifiedBuilder?.coreSetup?.fonts;
  const storedFontBlock =
    requiredFonts && typeof requiredFonts === "object"
      ? requiredFonts
      : builderFonts && typeof builderFonts === "object"
        ? builderFonts
        : {};

  const selectedFontIds = Array.isArray(data?.settings?.customizerSign?.text?.selectedFonts)
    ? data.settings.customizerSign.text.selectedFonts
        .map((value: any) => Number(value))
        .filter((value: number) => Number.isFinite(value) && value > 0)
    : [];

  const storedItems = Array.isArray(storedFontBlock?.items)
    ? storedFontBlock.items
    : Array.isArray(storedFontBlock?.fonts)
      ? storedFontBlock.fonts
      : [];

  const orderedIds: number[] = [];
  const pushId = (value: any) => {
    const parsed = Number(value);
    if (!Number.isFinite(parsed) || parsed <= 0 || orderedIds.includes(parsed)) return;
    orderedIds.push(parsed);
  };

  storedItems.forEach((item: any) => pushId(item?.managedFontId ?? item?.id));
  selectedFontIds.forEach(pushId);

  const items = orderedIds
    .map((fontId) => {
      const managedFont = managedFontMap.get(fontId);
      const storedItem = storedItems.find(
        (item: any) => Number(item?.managedFontId ?? item?.id) === fontId,
      );
      if (!managedFont && !storedItem) return null;
      return normalizeFontItem(storedItem || {}, managedFont || undefined);
    })
    .filter(Boolean) as ClassicRequiredFontItem[];

  return {
    label: String(storedFontBlock?.label || "Fonts"),
    description: String(storedFontBlock?.description || ""),
    items: ensureSingleDefaultFont(items),
  };
};

export const syncFontsIntoData = (data: any, state: FontSectionState) => {
  const safeData = data && typeof data === "object" ? { ...data } : {};
  const normalizedItems = ensureSingleDefaultFont(
    (Array.isArray(state?.items) ? state.items : [])
      .map((item) => normalizeFontItem(item))
      .filter((item) => item.managedFontId > 0 && item.label),
  );

  safeData.settings = safeData.settings || {};
  safeData.settings.customizerSign = safeData.settings.customizerSign || {};
  safeData.settings.customizerSign.text = safeData.settings.customizerSign.text || {};
  safeData.settings.customizerSign.text.selectedFonts = normalizedItems.map(
    (item) => item.managedFontId,
  );

  safeData.requiredOptions = safeData.requiredOptions || {};
  safeData.requiredOptions.fonts = {
    label: String(state?.label || "Fonts"),
    description: String(state?.description || ""),
    items: normalizedItems,
  };

  safeData.simplifiedBuilder = safeData.simplifiedBuilder || {};
  safeData.simplifiedBuilder.coreSetup = safeData.simplifiedBuilder.coreSetup || {};
  safeData.simplifiedBuilder.coreSetup.fonts = {
    label: String(state?.label || "Fonts"),
    description: String(state?.description || ""),
    items: normalizedItems,
  };

  return safeData;
};
