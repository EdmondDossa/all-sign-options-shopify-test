import { json } from "@remix-run/node";
import type { ActionFunctionArgs } from "@remix-run/node";
import {
  Banner,
  Box,
  Button,
  Card,
  Icon,
  IndexTable,
  InlineStack,
  Modal,
  Page,
  Text,
  TextField,
} from "@shopify/polaris";
import { DeleteIcon, DragHandleIcon, EditIcon } from "@shopify/polaris-icons";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigation, useOutletContext, useSubmit } from "@remix-run/react";
import { ToggleButton } from "~/components/buttons";
import HelpLink from "~/components/buttons/HelpLink";
import AdditionalPriceField, {
  type AdditionalPriceMode,
} from "~/components/inputs/AdditionalPriceField";
import { FileInput } from "~/components/inputs/FileInput";
import { TextureForm, type Texture } from "~/components/layouts/TextureForm";
import useHandleFlashMessage from "~/hooks/useHandleFlashMessage";
import NcpcConfigurationService from "~/models/NcpcConfiguration.service";
import { authenticate } from "~/shopify.server";
import type { NcpcRouteContext } from "~/types/NcpcRouteContext";
import Sortable from "~/utils/sortable-adapter";
import { fileUrl } from "~/utils/fileUrl";
import { jFlashMessage } from "~/utils/message-flash";
import { truncateText } from "~/utils/truncate-text";

type PriceType = "none" | "base" | "multiplier";
type VisibilityRule = "one-of-two" | "both";
type VisualEffect = "acrylic" | "metallic" | "wood";
type LetterPartType = "face" | "trim" | "side" | "back-lit";

type LetterTexture = {
  label: string;
  codeHex: string;
  visualEffect?: VisualEffect;
  pattern?: string;
  minWidth: number;
  minHeight: number;
  isDefault: boolean;
  default?: boolean;
  visibilityRule: VisibilityRule;
  previewImg: string;
  popupImg: string;
  price: {
    type: PriceType;
    value: number;
  };
};

type LetterPart = {
  type: LetterPartType;
  activate: boolean;
  label: string;
  description: string;
  glowing?: boolean;
  colors: LetterTexture[];
};

type LetterTypeItem = {
  label: string;
  description: string;
  isDefault: boolean;
  default?: boolean;
  popupImg: string;
  previewImg: string;
  price: {
    type: PriceType;
    value: number;
  };
  letterParts: LetterPart[];
};

type LetterTypesContainer = {
  label: string;
  description: string;
  letterTypes: LetterTypeItem[];
};

const HELP_URL =
  "https://docs.signsdesigner.us/docs/ncpc-documentation/configurations-9624/neon-simple-9626/adding-letter-types-for-channel-configurations-9713/";

const parseIndex = (value: FormDataEntryValue | null) => {
  const parsed = parseInt(String(value || ""), 10);
  return Number.isNaN(parsed) ? -1 : parsed;
};

const parseJsonValue = (value: FormDataEntryValue | null) => {
  try {
    return JSON.parse(String(value || "null"));
  } catch (_error) {
    return null;
  }
};

const toNumber = (value: unknown, fallback = 0) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const normalizeHex = (value: unknown) => {
  const raw = String(value || "").trim();
  if (!raw) return "#000000";
  return raw.startsWith("#") ? raw.toUpperCase() : `#${raw.toUpperCase()}`;
};

const normalizePriceType = (value: unknown): PriceType => {
  const normalized = String(value || "").trim().toLowerCase();
  if (normalized === "base" || normalized === "multiplier") return normalized;
  return "none";
};

const normalizeVisibilityRule = (value: unknown): VisibilityRule =>
  String(value || "").trim().toLowerCase() === "both" ? "both" : "one-of-two";

const normalizeVisualEffect = (value: unknown): VisualEffect => {
  const normalized = String(value || "").trim().toLowerCase();
  if (normalized === "metallic" || normalized === "wood") return normalized;
  return "acrylic";
};

const PART_TEMPLATES: LetterPart[] = [
  {
    type: "face",
    activate: true,
    label: "Face",
    description: "",
    glowing: false,
    colors: [],
  },
  {
    type: "trim",
    activate: true,
    label: "Trim",
    description: "",
    colors: [],
  },
  {
    type: "side",
    activate: true,
    label: "Side",
    description: "",
    colors: [],
  },
  {
    type: "back-lit",
    activate: true,
    label: "Back Lit",
    description: "",
    colors: [],
  },
];

const clone = <T,>(value: T): T => JSON.parse(JSON.stringify(value));

const emptyLetterType = (): LetterTypeItem => ({
  label: "",
  description: "",
  isDefault: false,
  default: false,
  popupImg: "",
  previewImg: "",
  price: {
    type: "none",
    value: 0,
  },
  letterParts: clone(PART_TEMPLATES),
});

const normalizeTexture = (rawTexture: any, partType: LetterPartType): LetterTexture => {
  const fallbackPrice = toNumber(rawTexture?.additionalPrice, 0);
  const fallbackType: PriceType = fallbackPrice > 0 ? "base" : "none";
  const normalized: LetterTexture = {
    label: String(rawTexture?.label || rawTexture?.title || "").trim(),
    codeHex: normalizeHex(
      Array.isArray(rawTexture?.codeHex) ? rawTexture.codeHex[0] : rawTexture?.codeHex,
    ),
    minWidth: toNumber(rawTexture?.minWidth, 0),
    minHeight: toNumber(rawTexture?.minHeight, 0),
    isDefault: Boolean(rawTexture?.isDefault ?? rawTexture?.default),
    default: Boolean(rawTexture?.isDefault ?? rawTexture?.default),
    visibilityRule: normalizeVisibilityRule(rawTexture?.visibilityRule),
    previewImg: String(rawTexture?.previewImg || ""),
    popupImg: String(rawTexture?.popupImg || ""),
    price: {
      type:
        rawTexture?.price && typeof rawTexture.price === "object"
          ? normalizePriceType(rawTexture.price.type)
          : fallbackType,
      value:
        rawTexture?.price && typeof rawTexture.price === "object"
          ? toNumber(rawTexture.price.value, 0)
          : fallbackPrice,
    },
  };

  if (partType === "face") {
    normalized.visualEffect = normalizeVisualEffect(rawTexture?.visualEffect);
    normalized.pattern = String(rawTexture?.pattern || "");
  }

  return normalized;
};

const ensureOneDefaultTextures = (rows: LetterTexture[], preferredIndex?: number) => {
  if (!rows.length) return [];

  const safePreferred =
    typeof preferredIndex === "number" && preferredIndex >= 0 && preferredIndex < rows.length
      ? preferredIndex
      : -1;
  const existingDefault = rows.findIndex((row) => row?.isDefault || row?.default);
  const targetIndex =
    safePreferred >= 0 ? safePreferred : existingDefault >= 0 ? existingDefault : 0;

  return rows.map((row, index) => ({
    ...row,
    isDefault: index === targetIndex,
    default: index === targetIndex,
  }));
};

const normalizePartType = (value: unknown): LetterPartType | null => {
  const normalized = String(value || "").trim().toLowerCase();
  if (normalized === "face" || normalized === "trim" || normalized === "side") {
    return normalized;
  }
  if (normalized === "back-lit" || normalized === "backlit") {
    return "back-lit";
  }
  return null;
};

const normalizePart = (rawPart: any, template: LetterPart): LetterPart => {
  const colorsRaw = Array.isArray(rawPart?.colors) ? rawPart.colors : [];
  const normalizedColors = ensureOneDefaultTextures(
    colorsRaw.map((entry: any) => normalizeTexture(entry, template.type)),
  );

  return {
    type: template.type,
    activate: template.type === "face" ? true : Boolean(rawPart?.activate ?? template.activate),
    label: String(rawPart?.label || template.label),
    description: String(rawPart?.description || ""),
    ...(template.type === "face" ? { glowing: Boolean(rawPart?.glowing) } : {}),
    colors: normalizedColors,
  };
};

const ensureParts = (rawParts: any): LetterPart[] => {
  const sourceParts = Array.isArray(rawParts) ? rawParts : [];

  return PART_TEMPLATES.map((template, index) => {
    const byType = sourceParts.find(
      (part: any) => normalizePartType(part?.type) === template.type,
    );
    const fallback = sourceParts[index];
    return normalizePart(byType || fallback || {}, template);
  });
};

const normalizeLetterType = (rawItem: any): LetterTypeItem => {
  const fallbackPrice = toNumber(rawItem?.additionalPrice, 0);
  const fallbackType: PriceType = fallbackPrice > 0 ? "base" : "none";

  return {
    label: String(rawItem?.label || rawItem?.title || "").trim(),
    description: String(rawItem?.description || ""),
    isDefault: Boolean(rawItem?.isDefault ?? rawItem?.default),
    default: Boolean(rawItem?.isDefault ?? rawItem?.default),
    popupImg: String(rawItem?.popupImg || rawItem?.popImg || ""),
    previewImg: String(rawItem?.previewImg || rawItem?.icon || ""),
    price: {
      type:
        rawItem?.price && typeof rawItem.price === "object"
          ? normalizePriceType(rawItem.price.type)
          : fallbackType,
      value:
        rawItem?.price && typeof rawItem.price === "object"
          ? toNumber(rawItem.price.value, 0)
          : fallbackPrice,
    },
    letterParts: ensureParts(rawItem?.letterParts),
  };
};

const ensureOneDefaultLetterTypes = (rows: LetterTypeItem[], preferredIndex?: number) => {
  if (!rows.length) return [];

  const safePreferred =
    typeof preferredIndex === "number" && preferredIndex >= 0 && preferredIndex < rows.length
      ? preferredIndex
      : -1;
  const existingDefault = rows.findIndex((row) => row?.isDefault || row?.default);
  const targetIndex =
    safePreferred >= 0 ? safePreferred : existingDefault >= 0 ? existingDefault : 0;

  return rows.map((row, index) => ({
    ...row,
    isDefault: index === targetIndex,
    default: index === targetIndex,
  }));
};

const getLetterTypesContainer = (ncpcData: any): LetterTypesContainer => {
  const requiredOptions = ncpcData?.requiredOptions || {};
  const nested = requiredOptions?.letterTypesOptions;

  if (nested && typeof nested === "object") {
    return {
      label: String(nested?.label || "Letter Types"),
      description: String(nested?.description || ""),
      letterTypes: ensureOneDefaultLetterTypes(
        (Array.isArray(nested?.letterTypes) ? nested.letterTypes : []).map(normalizeLetterType),
      ),
    };
  }

  const legacyItems = Array.isArray(requiredOptions?.letterTypeOptions)
    ? requiredOptions.letterTypeOptions
    : [];

  return {
    label: "Letter Types",
    description: "",
    letterTypes: ensureOneDefaultLetterTypes(legacyItems.map(normalizeLetterType)),
  };
};

const toLegacyLetterTypeOption = (item: LetterTypeItem) => ({
  title: String(item.label || ""),
  description: String(item.description || ""),
  icon: String(item.previewImg || ""),
  popImg: String(item.popupImg || ""),
  additionalPrice: item.price.type === "none" ? 0 : Number(item.price.value || 0),
  isDefault: Boolean(item.isDefault),
  default: Boolean(item.isDefault),
});

const setLetterTypesContainer = (draft: any, container: LetterTypesContainer) => {
  const requiredOptions = draft.requiredOptions || (draft.requiredOptions = {});
  const normalizedTypes = ensureOneDefaultLetterTypes(
    (Array.isArray(container.letterTypes) ? container.letterTypes : []).map(normalizeLetterType),
  );

  requiredOptions.letterTypesOptions = {
    label: String(container.label || "Letter Types"),
    description: String(container.description || ""),
    letterTypes: normalizedTypes,
  };
  requiredOptions.letterTypeOptions = normalizedTypes.map(toLegacyLetterTypeOption);
};

const getPartImage = (partType: LetterPartType) => {
  if (partType === "face") return "/images/lettertype-face.png";
  if (partType === "trim") return "/images/lettertype-trim.png";
  if (partType === "side") return "/images/lettertype-side.png";
  return "/images/lettertype-back-lit.png";
};

const getTexturePreviewStyle = (partType: LetterPartType, texture: LetterTexture) => {
  if (partType === "face" && texture.visualEffect === "wood" && texture.pattern) {
    return {
      backgroundImage: `url(${fileUrl(texture.pattern)})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    } as const;
  }

  return {
    background: normalizeHex(texture.codeHex),
  } as const;
};

export default function NcpcRequiredLetterTypes() {
  const submit = useSubmit();
  const navigation = useNavigation();
  const { productType, ncpcData } = useOutletContext<NcpcRouteContext>();
  useHandleFlashMessage();

  const isSubmitting = navigation.state === "submitting";
  const currencySymbol = (ncpcData as any)?.settings?.currencySymbol || "$";
  const container = getLetterTypesContainer(ncpcData);

  const [settings, setSettings] = useState({
    label: container.label,
    description: container.description,
  });
  const [letterTypesState, setLetterTypesState] = useState<LetterTypeItem[]>(
    container.letterTypes,
  );
  const [editorOpen, setEditorOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [letterTypeForm, setLetterTypeForm] = useState<LetterTypeItem>(emptyLetterType());
  const [partEditorIndex, setPartEditorIndex] = useState<number | null>(null);
  const [textureEditorIndex, setTextureEditorIndex] = useState<number | null>(null);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);
  const [editorNotice, setEditorNotice] = useState<{
    tone: "success" | "warning";
    text: string;
  } | null>(null);

  const listTableRef = useRef<HTMLDivElement | null>(null);
  const textureTableRef = useRef<HTMLDivElement | null>(null);
  const listSortableRef = useRef<Sortable | null>(null);
  const textureSortableRef = useRef<Sortable | null>(null);

  const persistExistingLetterType = useCallback((snapshot: LetterTypeItem, successText: string) => {
    if (editingIndex == null) {
      setEditorNotice({
        tone: "warning",
        text: "Save the letter type first before managing its parts and textures.",
      });
      return false;
    }

    const normalized = normalizeLetterType(snapshot);

    setLetterTypesState((current) => {
      if (!current[editingIndex]) return current;

      const next = [...current];
      next[editingIndex] = normalized;
      const preferredIndex =
        normalized.isDefault || normalized.default ? editingIndex : undefined;

      return ensureOneDefaultLetterTypes(next, preferredIndex);
    });

    submit(
      {
        operation: "update-letter-type",
        index: String(editingIndex),
        letterType: JSON.stringify(normalized),
      },
      { method: "POST" },
    );

    setEditorNotice({
      tone: "success",
      text: successText,
    });

    return true;
  }, [editingIndex, submit]);

  useEffect(() => {
    const latest = getLetterTypesContainer(ncpcData);
    setSettings({
      label: latest.label,
      description: latest.description,
    });
    setLetterTypesState(latest.letterTypes);
  }, [ncpcData]);

  useEffect(() => {
    if (!listTableRef.current || editorOpen || letterTypesState.length <= 1) return;

    const tbody = listTableRef.current.querySelector("tbody");
    if (!tbody) return;

    listSortableRef.current?.destroy();
    listSortableRef.current = Sortable.create(tbody, {
      handle: ".drag-handle",
      animation: 120,
      chosenClass: "sortable-chosen",
      ghostClass: "sortable-ghost",
      onEnd: (evt) => {
        const oldIndex = evt.oldIndex ?? -1;
        const newIndex = evt.newIndex ?? -1;
        if (oldIndex < 0 || newIndex < 0 || oldIndex === newIndex) return;

        setLetterTypesState((current) => {
          const next = [...current];
          const [moved] = next.splice(oldIndex, 1);
          next.splice(newIndex, 0, moved);

          submit(
            {
              operation: "reorder-letter-types",
              letterTypes: JSON.stringify(next),
            },
            { method: "POST" },
          );

          return next;
        });
      },
    });

    return () => {
      listSortableRef.current?.destroy();
      listSortableRef.current = null;
    };
  }, [editorOpen, letterTypesState.length, submit]);

  const activePart = useMemo(() => {
    if (partEditorIndex == null) return null;
    return letterTypeForm.letterParts[partEditorIndex] || null;
  }, [partEditorIndex, letterTypeForm.letterParts]);

  useEffect(() => {
    if (
      !textureTableRef.current ||
      !editorOpen ||
      partEditorIndex == null ||
      textureEditorIndex != null ||
      !activePart ||
      activePart.colors.length <= 1
    ) {
      textureSortableRef.current?.destroy();
      textureSortableRef.current = null;
      return;
    }

    const tbody = textureTableRef.current.querySelector("tbody");
    if (!tbody) return;

    textureSortableRef.current?.destroy();
    textureSortableRef.current = Sortable.create(tbody, {
      handle: ".drag-handle",
      animation: 120,
      chosenClass: "sortable-chosen",
      ghostClass: "sortable-ghost",
      onEnd: (evt) => {
        const oldIndex = evt.oldIndex ?? -1;
        const newIndex = evt.newIndex ?? -1;
        if (oldIndex < 0 || newIndex < 0 || oldIndex === newIndex) return;
        let nextSnapshot: LetterTypeItem | null = null;

        setLetterTypeForm((current) => {
          const next = clone(current);
          const part = next.letterParts[partEditorIndex];
          if (!part) return current;

          const colors = [...part.colors];
          const [moved] = colors.splice(oldIndex, 1);
          colors.splice(newIndex, 0, moved);
          part.colors = ensureOneDefaultTextures(colors);
          nextSnapshot = normalizeLetterType(next);
          return nextSnapshot;
        });

        if (nextSnapshot) {
          persistExistingLetterType(nextSnapshot, "Texture order saved successfully.");
        }
      },
    });

    return () => {
      textureSortableRef.current?.destroy();
      textureSortableRef.current = null;
    };
  }, [
    activePart,
    activePart?.colors.length,
    editorOpen,
    partEditorIndex,
    persistExistingLetterType,
    textureEditorIndex,
  ]);

  if (productType !== "channel") {
    return (
      <Card>
        <Box padding="400">
          <Text as="h2" variant="headingMd">
            Letter Types are only available for Channel configurations.
          </Text>
        </Box>
      </Card>
    );
  }

  const openCreate = () => {
    setEditingIndex(null);
    setLetterTypeForm(emptyLetterType());
    setPartEditorIndex(null);
    setTextureEditorIndex(null);
    setEditorNotice(null);
    setEditorOpen(true);
  };

  const openEdit = (index: number) => {
    setEditingIndex(index);
    setLetterTypeForm(normalizeLetterType(letterTypesState[index]));
    setPartEditorIndex(null);
    setTextureEditorIndex(null);
    setEditorNotice(null);
    setEditorOpen(true);
  };

  const closeEditor = () => {
    if (isSubmitting) return;
    setPartEditorIndex(null);
    setTextureEditorIndex(null);
    setEditorOpen(false);
    setEditingIndex(null);
    setLetterTypeForm(emptyLetterType());
    setEditorNotice(null);
  };

  const saveSettings = () => {
    submit(
      {
        operation: "save-letter-types-settings",
        settings: JSON.stringify(settings),
      },
      { method: "POST" },
    );
  };

  const saveLetterType = () => {
    if (!letterTypeForm.label.trim()) return;

    const normalized = normalizeLetterType(letterTypeForm);
    const isCreate = editingIndex == null;
    const operation = isCreate ? "add-letter-type" : "update-letter-type";
    const payload: Record<string, string> = {
      operation,
      letterType: JSON.stringify(normalized),
    };
    if (editingIndex != null) {
      payload.index = String(editingIndex);
    }

    setLetterTypesState((current) => {
      const next = [...current];
      if (isCreate) {
        if (!next.length) {
          normalized.isDefault = true;
          normalized.default = true;
        }
        next.push(normalized);
      } else if (next[editingIndex]) {
        next[editingIndex] = normalized;
      }

      const preferredIndex =
        normalized.isDefault || normalized.default
          ? editingIndex == null
            ? next.length - 1
            : editingIndex
          : undefined;

      return ensureOneDefaultLetterTypes(next, preferredIndex);
    });

    if (isCreate) {
      setEditingIndex(letterTypesState.length);
    }

    submit(payload, { method: "POST" });
    setEditorNotice({
      tone: "success",
      text: isCreate
        ? "Letter type saved. You can now manage its textures."
        : "Letter type saved. Use Back to letter types when you want to leave this editor.",
    });
  };

  const deleteLetterType = (index: number) => {
    setLetterTypesState((current) =>
      ensureOneDefaultLetterTypes(current.filter((_entry, currentIndex) => currentIndex !== index)),
    );
    submit(
      {
        operation: "delete-letter-type",
        index: String(index),
      },
      { method: "POST" },
    );
  };

  const setDefaultLetterType = (index: number) => {
    setLetterTypesState((current) => ensureOneDefaultLetterTypes(current, index));
    submit(
      {
        operation: "set-default-letter-type",
        index: String(index),
      },
      { method: "POST" },
    );
  };

  const openPartEditor = (partIndex: number) => {
    if (editingIndex == null) {
      setEditorNotice({
        tone: "warning",
        text: "Save the letter type first before managing its parts and textures.",
      });
      return;
    }

    setEditorNotice(null);
    setPartEditorIndex(partIndex);
    setTextureEditorIndex(null);
  };

  const closePartEditor = () => {
    setTextureEditorIndex(null);
    setPartEditorIndex(null);
  };

  const updatePart = (
    updater: (part: LetterPart) => LetterPart,
    options?: { persist?: boolean; successText?: string },
  ) => {
    if (partEditorIndex == null) return;
    let nextSnapshot: LetterTypeItem | null = null;

    setLetterTypeForm((current) => {
      const next = clone(current);
      const part = next.letterParts[partEditorIndex];
      if (!part) return current;
      next.letterParts[partEditorIndex] = normalizePart(
        updater(part),
        PART_TEMPLATES[partEditorIndex],
      );
      nextSnapshot = normalizeLetterType(next);
      return nextSnapshot;
    });

    if (options?.persist && nextSnapshot) {
      persistExistingLetterType(nextSnapshot, options.successText || "Face changes saved.");
    }
  };

  const setTextureDefault = (index: number) => {
    updatePart(
      (part) => ({
        ...part,
        colors: ensureOneDefaultTextures(part.colors, index),
      }),
      { persist: true, successText: "Default texture updated successfully." },
    );
  };

  const deleteTexture = (index: number) => {
    updatePart(
      (part) => ({
        ...part,
        colors: ensureOneDefaultTextures(
          part.colors.filter((_entry, currentIndex) => currentIndex !== index),
        ),
      }),
      { persist: true, successText: "Texture deleted successfully." },
    );
  };

  const openTextureCreate = () => {
    setTextureEditorIndex(-1);
  };

  const openTextureEdit = (index: number) => {
    setTextureEditorIndex(index);
  };

  const handleTextureSubmit = (textureValue: Texture) => {
    const normalizedTexture = normalizeTexture(textureValue, activePart?.type || "face");
    const isCreate = textureEditorIndex == null || textureEditorIndex < 0;

    updatePart(
      (part) => {
        const colors = [...part.colors];

        if (isCreate) {
          if (colors.length === 0) {
            normalizedTexture.isDefault = true;
            normalizedTexture.default = true;
          }
          colors.push(normalizedTexture);
        } else if (colors[textureEditorIndex]) {
          colors[textureEditorIndex] = normalizedTexture;
        }

        const preferredIndex =
          normalizedTexture.isDefault || normalizedTexture.default
            ? isCreate
              ? colors.length - 1
              : textureEditorIndex
            : undefined;

        return {
          ...part,
          colors: ensureOneDefaultTextures(colors, preferredIndex),
        };
      },
      {
        persist: true,
        successText: isCreate
          ? "Texture added and saved successfully."
          : "Texture updated and saved successfully.",
      },
    );

    setTextureEditorIndex(null);
  };

  const letterRows = letterTypesState.map((item, index) => (
    <IndexTable.Row id={`${index}`} key={`${item.label}-${index}`} position={index}>
      <IndexTable.Cell>
        <span className="drag-handle" style={{ cursor: "grab", display: "inline-flex" }}>
          <Icon source={DragHandleIcon} />
        </span>
      </IndexTable.Cell>
      <IndexTable.Cell>
        <InlineStack gap="200" blockAlign="center" wrap={false}>
          {item.previewImg ? (
            <img
              src={fileUrl(item.previewImg)}
              alt={item.label || "letter type"}
              style={{
                width: 36,
                height: 36,
                objectFit: "cover",
                borderRadius: 8,
                border: "1px solid #d1d5db",
              }}
            />
          ) : (
            <img
              src={getPartImage("face")}
              alt=""
              style={{
                width: 36,
                height: 36,
                objectFit: "cover",
                borderRadius: 8,
                border: "1px solid #d1d5db",
              }}
            />
          )}
          <Text as="span" variant="bodyMd" fontWeight="semibold">
            {truncateText(item.label || "-", 32)}
          </Text>
        </InlineStack>
      </IndexTable.Cell>
      <IndexTable.Cell className="td-center">
        <ToggleButton
          id={`default-letter-type-${index}`}
          type="radio"
          name="default-letter-type"
          value="true"
          checked={Boolean(item.isDefault || item.default)}
          onChange={() => setDefaultLetterType(index)}
        />
      </IndexTable.Cell>
      <IndexTable.Cell className="td-center">
        <InlineStack gap="100" wrap={false}>
          <Button icon={EditIcon} onClick={() => openEdit(index)} />
          <Button icon={DeleteIcon} tone="critical" onClick={() => setDeleteIndex(index)} />
        </InlineStack>
      </IndexTable.Cell>
    </IndexTable.Row>
  ));

  const partRows = letterTypeForm.letterParts.map((part, index) => (
    <IndexTable.Row id={`${part.type}-${index}`} key={`${part.type}-${index}`} position={index}>
      <IndexTable.Cell>
        <InlineStack gap="200" blockAlign="center" wrap={false}>
          <img
            src={getPartImage(part.type)}
            alt={part.type}
            style={{
              width: 72,
              height: 52,
              objectFit: "cover",
              borderRadius: 8,
              border: "1px solid #d1d5db",
            }}
          />
          <Text as="span" variant="bodyMd" fontWeight="semibold">
            {truncateText(part.label || "-", 24)}
          </Text>
        </InlineStack>
      </IndexTable.Cell>
      <IndexTable.Cell className="td-center">
        <Text as="span" variant="bodyMd">
          {part.type}
        </Text>
      </IndexTable.Cell>
      <IndexTable.Cell className="td-center">
        <Text as="span" variant="bodyMd" fontWeight="semibold">
          {part.colors.length}
        </Text>
      </IndexTable.Cell>
      <IndexTable.Cell className="td-center">
        {index === 0 ? (
          <Text as="span" variant="bodyMd" fontWeight="semibold">
            Required
          </Text>
        ) : (
          <ToggleButton
            id={`part-activate-${index}`}
            checked={Boolean(part.activate)}
            onChange={(value) =>
              setLetterTypeForm((current) => {
                const next = clone(current);
                next.letterParts[index].activate = Boolean(value);
                return next;
              })
            }
          />
        )}
      </IndexTable.Cell>
      <IndexTable.Cell className="td-center">
        <Button onClick={() => openPartEditor(index)}>Manage textures</Button>
      </IndexTable.Cell>
    </IndexTable.Row>
  ));

  const textureRows = (activePart?.colors || []).map((texture, index) => (
    <IndexTable.Row
      id={`${texture.label}-${index}`}
      key={`${texture.label}-${index}`}
      position={index}
    >
      <IndexTable.Cell>
        <span className="drag-handle" style={{ cursor: "grab", display: "inline-flex" }}>
          <Icon source={DragHandleIcon} />
        </span>
      </IndexTable.Cell>
      <IndexTable.Cell>
        <InlineStack gap="200" blockAlign="center" wrap={false}>
          <div
            style={{
              width: 18,
              height: 18,
              borderRadius: 4,
              border: "1px solid #d1d5db",
              ...getTexturePreviewStyle(activePart?.type || "face", texture),
            }}
          />
          <Text as="span" variant="bodyMd" fontWeight="semibold">
            {truncateText(texture.label || "-", 30)}
          </Text>
        </InlineStack>
      </IndexTable.Cell>
      <IndexTable.Cell className="td-center">
        {normalizeHex(texture.codeHex)}
      </IndexTable.Cell>
      {activePart?.type === "face" ? (
        <IndexTable.Cell className="td-center">{texture.visualEffect || "acrylic"}</IndexTable.Cell>
      ) : null}
      <IndexTable.Cell className="td-center">
        <ToggleButton
          id={`default-texture-${index}`}
          type="radio"
          name="default-texture"
          value="true"
          checked={Boolean(texture.isDefault || texture.default)}
          onChange={() => setTextureDefault(index)}
        />
      </IndexTable.Cell>
      <IndexTable.Cell className="td-center">
        <InlineStack gap="100" wrap={false}>
          <Button icon={EditIcon} onClick={() => openTextureEdit(index)} />
          <Button icon={DeleteIcon} tone="critical" onClick={() => deleteTexture(index)} />
        </InlineStack>
      </IndexTable.Cell>
    </IndexTable.Row>
  ));

  return (
    <Page fullWidth>
      {!editorOpen ? (
        <div style={{ display: "grid", gap: 12 }}>
          <Card>
            <Box padding="300">
              <InlineStack align="space-between" blockAlign="center">
                <div>
                  <Text as="h2" variant="headingMd">
                    Letter Types
                  </Text>
                  <Text as="p" tone="subdued">
                    Manage letter types and their Face / Trim / Side / Back Lit textures.
                  </Text>
                </div>
                <InlineStack gap="200" align="end">
                  <HelpLink url={HELP_URL} text="Get Help" />
                  <Button onClick={openCreate} variant="primary">
                    Add new letter type
                  </Button>
                </InlineStack>
              </InlineStack>
            </Box>
          </Card>

          <Card>
            <Box padding="300">
              {letterTypesState.length === 0 ? (
                <Box paddingBlock="800">
                  <div style={{ display: "grid", placeItems: "center", gap: 10 }}>
                    <Text as="p" variant="headingMd">
                      No letter types found
                    </Text>
                    <Button onClick={openCreate} variant="primary">
                      Add first letter type
                    </Button>
                  </div>
                </Box>
              ) : (
                <div ref={listTableRef}>
                  <IndexTable
                    resourceName={{ singular: "Letter Type", plural: "Letter Types" }}
                    itemCount={letterTypesState.length}
                    selectable={false}
                    headings={[
                      { title: "" },
                      { title: "Example" },
                      { title: "Default", alignment: "center" },
                      { title: "Actions", alignment: "center" },
                    ]}
                  >
                    {letterRows}
                  </IndexTable>
                </div>
              )}
            </Box>
          </Card>

          <Card>
            <Box padding="300">
              <Text as="h3" variant="headingSm">
                Letter Type Settings
              </Text>
              <Box paddingBlockStart="200" />
              <div style={{ display: "grid", gap: 10 }}>
                <TextField
                  label="Title"
                  autoComplete="off"
                  value={settings.label}
                  onChange={(value) => setSettings((current) => ({ ...current, label: value }))}
                />
                <TextField
                  label="Description"
                  autoComplete="off"
                  helpText="Provide further details about letter types."
                  value={settings.description}
                  onChange={(value) =>
                    setSettings((current) => ({ ...current, description: value }))
                  }
                />
              </div>
              <Box paddingBlockStart="300" />
              <InlineStack align="end">
                <Button variant="primary" loading={isSubmitting} onClick={saveSettings}>
                  Save Settings
                </Button>
              </InlineStack>
            </Box>
          </Card>
        </div>
      ) : partEditorIndex == null ? (
        <div style={{ display: "grid", gap: 12 }}>
          {editorNotice ? (
            <Banner
              tone={editorNotice.tone}
              onDismiss={() => setEditorNotice(null)}
            >
              <p>{editorNotice.text}</p>
            </Banner>
          ) : null}

          <Card>
            <Box padding="300">
              <InlineStack align="space-between" blockAlign="center">
                <Text as="h2" variant="headingMd">
                  {editingIndex == null ? "Create Letter Type" : "Edit Letter Type"}
                </Text>
                <HelpLink url={HELP_URL} text="Get Help" />
              </InlineStack>
            </Box>
          </Card>

          <Card>
            <Box padding="300">
              <Text as="h3" variant="headingSm">
                1. Letter Parts
              </Text>
              <Box paddingBlockStart="200" />
              <IndexTable
                resourceName={{ singular: "Part", plural: "Parts" }}
                itemCount={letterTypeForm.letterParts.length}
                selectable={false}
                headings={[
                  { title: "Example" },
                  { title: "Type", alignment: "center" },
                  { title: "Textures", alignment: "center" },
                  { title: "Active", alignment: "center" },
                  { title: "Actions", alignment: "center" },
                ]}
              >
                {partRows}
              </IndexTable>
            </Box>
          </Card>

          <Card>
            <Box padding="300">
              <Text as="h3" variant="headingSm">
                2. Letter Type Info
              </Text>
              <Box paddingBlockStart="200" />
              <div style={{ display: "grid", gap: 10 }}>
                <TextField
                  label="Label"
                  autoComplete="off"
                  error={!letterTypeForm.label.trim() ? "Label is required" : undefined}
                  value={letterTypeForm.label}
                  onChange={(value) =>
                    setLetterTypeForm((current) => ({ ...current, label: value }))
                  }
                />
                <TextField
                  label="Description"
                  autoComplete="off"
                  value={letterTypeForm.description}
                  onChange={(value) =>
                    setLetterTypeForm((current) => ({ ...current, description: value }))
                  }
                />
              </div>
            </Box>
          </Card>

          <Card>
            <Box padding="300">
              <Text as="h3" variant="headingSm">
                3. Images
              </Text>
              <Box paddingBlockStart="200" />
              <InlineStack gap="400" align="start" wrap>
                <div style={{ minWidth: 320 }}>
                  <FileInput
                    title="Preview Image"
                    type="image"
                    path={String(letterTypeForm.previewImg || "")}
                    handlePath={(value: string) =>
                      setLetterTypeForm((current) => ({ ...current, previewImg: value }))
                    }
                  />
                </div>
                <div style={{ minWidth: 320 }}>
                  <FileInput
                    title="Popup Image"
                    type="image"
                    path={String(letterTypeForm.popupImg || "")}
                    handlePath={(value: string) =>
                      setLetterTypeForm((current) => ({ ...current, popupImg: value }))
                    }
                  />
                </div>
              </InlineStack>
            </Box>
          </Card>

          <Card>
            <Box padding="300">
              <AdditionalPriceField
                title="4. Additional Price"
                mode={letterTypeForm.price.type}
                value={letterTypeForm.price.value}
                currencySymbol={currencySymbol}
                onModeChange={(mode: AdditionalPriceMode) =>
                  setLetterTypeForm((current) => ({
                    ...current,
                    price: {
                      ...current.price,
                      type: mode,
                    },
                  }))
                }
                onValueChange={(value) =>
                  setLetterTypeForm((current) => ({
                    ...current,
                    price: {
                      ...current.price,
                      value,
                    },
                  }))
                }
              />
            </Box>
          </Card>

          <Card>
            <Box padding="300">
              <InlineStack align="end" gap="200">
                <Button onClick={closeEditor} disabled={isSubmitting}>
                  Back to letter types
                </Button>
                <Button
                  variant="primary"
                  loading={isSubmitting}
                  disabled={!letterTypeForm.label.trim()}
                  onClick={saveLetterType}
                >
                  Save
                </Button>
              </InlineStack>
            </Box>
          </Card>
        </div>
      ) : null}

      {editorOpen && partEditorIndex != null && activePart ? (
        textureEditorIndex === -1 ? (
          <TextureForm
            key={`texture-form-${activePart.type}-new`}
            part={activePart.type}
            isEditing={false}
            currencySymbol={currencySymbol}
            onClose={() => setTextureEditorIndex(null)}
            onSubmit={handleTextureSubmit}
          />
        ) : textureEditorIndex != null && textureEditorIndex >= 0 ? (
          activePart.colors[textureEditorIndex] ? (
            <TextureForm
              key={`texture-form-${activePart.type}-${textureEditorIndex}`}
              part={activePart.type}
              color={activePart.colors[textureEditorIndex] as Texture}
              isEditing
              currencySymbol={currencySymbol}
              onClose={() => setTextureEditorIndex(null)}
              onSubmit={handleTextureSubmit}
            />
          ) : null
        ) : (
          <div style={{ display: "grid", gap: 12 }}>
            {editorNotice ? (
              <Banner
                tone={editorNotice.tone}
                onDismiss={() => setEditorNotice(null)}
              >
                <p>{editorNotice.text}</p>
              </Banner>
            ) : null}

            <Card>
              <Box padding="300">
                <InlineStack align="space-between" blockAlign="center">
                  <div>
                    <Text as="h2" variant="headingMd">
                      {activePart.label || activePart.type}
                    </Text>
                    <Text as="p" tone="subdued">
                      Manage textures for this part.
                    </Text>
                  </div>
                  <InlineStack gap="200">
                    <HelpLink url={HELP_URL} text="Get Help" />
                    <Button onClick={openTextureCreate} variant="primary">
                      Add new texture
                    </Button>
                  </InlineStack>
                </InlineStack>
              </Box>
            </Card>

            <Card>
              <Box padding="300">
                {(activePart.colors || []).length === 0 ? (
                  <Box paddingBlock="800">
                    <div style={{ display: "grid", placeItems: "center", gap: 10 }}>
                      <Text as="p" variant="headingMd">
                        No textures found
                      </Text>
                      <Button onClick={openTextureCreate} variant="primary">
                        Add first texture
                      </Button>
                    </div>
                  </Box>
                ) : (
                  <div ref={textureTableRef}>
                    <IndexTable
                      resourceName={{ singular: "Texture", plural: "Textures" }}
                      itemCount={activePart.colors.length}
                      selectable={false}
                      headings={[
                        { title: "" },
                        { title: "Label" },
                        { title: "Hex", alignment: "center" },
                        ...(activePart.type === "face"
                          ? [{ title: "Visual Effect", alignment: "center" as const }]
                          : []),
                        { title: "Default", alignment: "center" },
                        { title: "Actions", alignment: "center" },
                      ]}
                    >
                      {textureRows}
                    </IndexTable>
                  </div>
                )}
              </Box>
            </Card>

            <Card>
              <Box padding="300">
                <Text as="h3" variant="headingSm">
                  Part Settings
                </Text>
                <Box paddingBlockStart="200" />
                <div style={{ display: "grid", gap: 10 }}>
                  {activePart.type === "face" ? (
                    <InlineStack gap="100" blockAlign="center" wrap={false}>
                      <Text as="span" variant="bodyMd">
                        Make it glow
                      </Text>
                      <ToggleButton
                        id="face-glowing"
                        checked={Boolean(activePart.glowing)}
                        onChange={(value) =>
                          updatePart((part) => ({
                            ...part,
                            glowing: Boolean(value),
                          }))
                        }
                      />
                    </InlineStack>
                  ) : null}
                  <TextField
                    label="Title"
                    autoComplete="off"
                    value={activePart.label}
                    onChange={(value) =>
                      updatePart((part) => ({
                        ...part,
                        label: value,
                      }))
                    }
                  />
                  <TextField
                    label="Description"
                    autoComplete="off"
                    value={activePart.description}
                    onChange={(value) =>
                      updatePart((part) => ({
                        ...part,
                        description: value,
                      }))
                    }
                  />
                </div>
                <Box paddingBlockStart="200" />
                <Text as="p" tone="subdued">
                  Texture add, edit, delete and default changes are saved immediately. Use Save
                  face changes for the part settings below.
                </Text>
              </Box>
            </Card>

            <Card>
              <Box padding="300">
                <InlineStack align="end" gap="200">
                  <Button onClick={closePartEditor} disabled={isSubmitting}>
                    Back to letter type
                  </Button>
                  <Button
                    onClick={() =>
                      persistExistingLetterType(
                        letterTypeForm,
                        `${activePart.label || "Face"} settings saved successfully.`,
                      )
                    }
                    disabled={isSubmitting}
                  >
                    Save face changes
                  </Button>
                  <Button variant="primary" onClick={openTextureCreate} disabled={isSubmitting}>
                    Add texture
                  </Button>
                </InlineStack>
              </Box>
            </Card>
          </div>
        )
      ) : null}

      <Modal
        open={deleteIndex != null}
        onClose={() => setDeleteIndex(null)}
        title="Delete letter type"
        primaryAction={{
          content: "Delete",
          destructive: true,
          onAction: () => {
            if (deleteIndex == null) return;
            deleteLetterType(deleteIndex);
            setDeleteIndex(null);
          },
        }}
        secondaryActions={[
          {
            content: "Cancel",
            onAction: () => setDeleteIndex(null),
          },
        ]}
      >
        <Modal.Section>
          <Text as="p">
            Are you sure you want to delete this letter type?
          </Text>
        </Modal.Section>
      </Modal>
    </Page>
  );
}

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const { session } = await authenticate.admin(request);
  if (request.method !== "POST") return null;

  const configId = parseInt(params.configId || "", 10);
  if (Number.isNaN(configId)) {
    return json({ ...jFlashMessage("Invalid configuration", "error") }, { status: 400 });
  }

  const context = await NcpcConfigurationService.getContext(configId, session.id);
  if (!context) {
    return json({ ...jFlashMessage("Configuration not found", "error") }, { status: 404 });
  }
  if (context.productType !== "channel") {
    return json(
      { ...jFlashMessage("Letter Types are only available for Channel configurations.", "error") },
      { status: 403 },
    );
  }

  const formData = await request.formData();
  const operation = String(formData.get("operation") || "");
  const index = parseIndex(formData.get("index"));

  if (operation === "save-letter-types-settings") {
    const rawSettings = parseJsonValue(formData.get("settings"));
    if (!rawSettings || typeof rawSettings !== "object") {
      return json({ ...jFlashMessage("Invalid settings payload", "error") }, { status: 400 });
    }

    await NcpcConfigurationService.mutateNcpc(configId, session.id, (draft) => {
      const container = getLetterTypesContainer(draft);
      container.label = String((rawSettings as any)?.label || "Letter Types");
      container.description = String((rawSettings as any)?.description || "");
      setLetterTypesContainer(draft, container);
    });

    return json({ ...jFlashMessage("Letter type settings updated successfully") });
  }

  if (operation === "add-letter-type" || operation === "update-letter-type") {
    const rawLetterType = parseJsonValue(formData.get("letterType"));
    if (!rawLetterType || typeof rawLetterType !== "object") {
      return json({ ...jFlashMessage("Invalid letter type payload", "error") }, { status: 400 });
    }

    const letterType = normalizeLetterType(rawLetterType);
    if (!letterType.label.trim()) {
      return json(
        { ...jFlashMessage("The letter type label is required", "error") },
        { status: 400 },
      );
    }

    await NcpcConfigurationService.mutateNcpc(configId, session.id, (draft) => {
      const container = getLetterTypesContainer(draft);
      const next = [...container.letterTypes];

      if (operation === "add-letter-type") {
        if (next.length === 0) {
          letterType.isDefault = true;
          letterType.default = true;
        }
        next.push(letterType);
      } else if (index >= 0 && next[index]) {
        next[index] = letterType;
      }

      const preferredIndex =
        letterType.isDefault || letterType.default
          ? operation === "add-letter-type"
            ? next.length - 1
            : index
          : undefined;

      container.letterTypes = ensureOneDefaultLetterTypes(next, preferredIndex);
      setLetterTypesContainer(draft, container);
    });

    return json({ ...jFlashMessage("Letter type saved successfully") });
  }

  if (operation === "delete-letter-type") {
    if (index < 0) {
      return json({ ...jFlashMessage("Invalid letter type index", "error") }, { status: 400 });
    }

    await NcpcConfigurationService.mutateNcpc(configId, session.id, (draft) => {
      const container = getLetterTypesContainer(draft);
      container.letterTypes = ensureOneDefaultLetterTypes(
        container.letterTypes.filter((_item, itemIndex) => itemIndex !== index),
      );
      setLetterTypesContainer(draft, container);
    });

    return json({ ...jFlashMessage("Letter type deleted successfully") });
  }

  if (operation === "set-default-letter-type") {
    if (index < 0) {
      return json({ ...jFlashMessage("Invalid letter type index", "error") }, { status: 400 });
    }

    await NcpcConfigurationService.mutateNcpc(configId, session.id, (draft) => {
      const container = getLetterTypesContainer(draft);
      container.letterTypes = ensureOneDefaultLetterTypes(container.letterTypes, index);
      setLetterTypesContainer(draft, container);
    });

    return json({ ...jFlashMessage("Default letter type updated successfully") });
  }

  if (operation === "reorder-letter-types") {
    const rawItems = parseJsonValue(formData.get("letterTypes"));
    if (!Array.isArray(rawItems)) {
      return json({ ...jFlashMessage("Invalid reorder payload", "error") }, { status: 400 });
    }

    await NcpcConfigurationService.mutateNcpc(configId, session.id, (draft) => {
      const container = getLetterTypesContainer(draft);
      container.letterTypes = ensureOneDefaultLetterTypes(rawItems.map(normalizeLetterType));
      setLetterTypesContainer(draft, container);
    });

    return json({ ...jFlashMessage("Letter types order updated successfully") });
  }

  return json({ ...jFlashMessage("Invalid operation", "error") }, { status: 400 });
};
