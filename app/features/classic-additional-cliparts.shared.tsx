import { ensureClassicSimplifiedBuilderData } from "~/utils/simplified-builder-data";

export type ManagedClipart = {
  id?: number;
  title?: string;
  url?: string;
  additionalPrice?: number | string;
};

export type ManagedClipartGroup = {
  id?: number;
  title?: string;
  description?: string;
  cliparts?: ManagedClipart[];
};

export type ClipartSelectionItem = {
  id: string;
  clipartsGroupId: number;
  title: string;
  description: string;
  clipartsCount: number;
  previewImg: string;
};

export type ClipartDraftItem = {
  title: string;
  url: string;
  additionalPrice: number | string;
};

export type ClipartsSectionState = {
  active: boolean;
  items: ClipartSelectionItem[];
};

export const defaultClipartDraft = (): ClipartDraftItem => ({
  title: "",
  url: "",
  additionalPrice: 0,
});

const normalizeSelectionItem = (
  item: any,
  managedGroup?: ManagedClipartGroup | null,
): ClipartSelectionItem => ({
  id: String(item?.id || `clipart-group-${managedGroup?.id || item?.clipartsGroupId || 0}`),
  clipartsGroupId: Number(item?.clipartsGroupId || managedGroup?.id || 0),
  title: String(item?.title || managedGroup?.title || ""),
  description: String(item?.description || managedGroup?.description || ""),
  clipartsCount: Number(
    item?.clipartsCount ??
      managedGroup?.cliparts?.length ??
      0,
  ),
  previewImg: String(item?.previewImg || managedGroup?.cliparts?.[0]?.url || ""),
});

export const getClipartsState = (data: any, managedGroups: ManagedClipartGroup[] = []): ClipartsSectionState => {
  const enabledCliparts = data?.settings?.customizerSign?.images?.enableClipart || {};
  const storedSelection = Array.isArray(data?.additionalOptions?.cliparts?.items)
    ? data.additionalOptions.cliparts.items
    : [];

  if (storedSelection.length > 0) {
    return {
      active: enabledCliparts?.active !== false,
      items: storedSelection
        .map((item: any) =>
          normalizeSelectionItem(
            item,
            managedGroups.find((group) => Number(group?.id) === Number(item?.clipartsGroupId)),
          ),
        )
        .filter((item: ClipartSelectionItem) => item.clipartsGroupId > 0),
    };
  }

  const selectedGroupIds = Array.isArray(enabledCliparts?.selectClipartGroups)
    ? enabledCliparts.selectClipartGroups.map((value: any) => Number(value)).filter((value: number) => Number.isFinite(value) && value > 0)
    : [];

  return {
    active: enabledCliparts?.active !== false,
    items: selectedGroupIds
      .map((groupId: number) =>
        normalizeSelectionItem(
          { clipartsGroupId: groupId },
          managedGroups.find((group) => Number(group?.id) === groupId),
        ),
      )
      .filter((item) => item.clipartsGroupId > 0),
  };
};

export const syncClipartsIntoData = (data: any, state: ClipartsSectionState) => {
  const nextData = ensureClassicSimplifiedBuilderData({
    data,
    materialType: data?.simplifiedBuilder?.meta?.materialType || "",
    productType: data?.simplifiedBuilder?.meta?.productType || "",
    pricingMode: data?.simplifiedBuilder?.meta?.pricingMode || null,
  });

  const normalizedItems = state.items
    .map((item) => normalizeSelectionItem(item))
    .filter((item) => item.clipartsGroupId > 0);

  nextData.additionalOptions = {
    ...(nextData.additionalOptions || {}),
    cliparts: {
      active: Boolean(state.active),
      items: normalizedItems,
    },
  };

  nextData.settings = {
    ...(nextData.settings || {}),
    customizerSign: {
      ...(nextData.settings?.customizerSign || {}),
      images: {
        ...(nextData.settings?.customizerSign?.images || {}),
        enableClipart: {
          ...(nextData.settings?.customizerSign?.images?.enableClipart || {}),
          active: Boolean(state.active),
          selectClipartGroups: normalizedItems.map((item) => Number(item.clipartsGroupId)),
        },
      },
    },
  };

  return nextData;
};
