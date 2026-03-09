import { json } from "@remix-run/node";
import type { ActionFunctionArgs } from "@remix-run/node";
import {
  Box,
  Button,
  Card,
  Icon,
  IndexTable,
  InlineStack,
  Page,
  Select,
  Text,
  TextField,
} from "@shopify/polaris";
import { DeleteIcon, DragHandleIcon, EditIcon } from "@shopify/polaris-icons";
import { useEffect, useRef, useState } from "react";
import { useNavigation, useOutletContext, useSubmit } from "@remix-run/react";
import Sortable from "~/utils/sortable-adapter";
import { ToggleButton } from "~/components/buttons";
import HelpLink from "~/components/buttons/HelpLink";
import AdditionalPriceField, {
  type AdditionalPriceMode,
} from "~/components/inputs/AdditionalPriceField";
import { FileInput } from "~/components/inputs/FileInput";
import NcpcRowActions from "~/components/ncpc/NcpcRowActions";
import useHandleFlashMessage from "~/hooks/useHandleFlashMessage";
import NcpcConfigurationService from "~/models/NcpcConfiguration.service";
import { authenticate } from "~/shopify.server";
import type { NcpcRouteContext } from "~/types/NcpcRouteContext";
import { fileUrl } from "~/utils/fileUrl";
import { jFlashMessage } from "~/utils/message-flash";
import { truncateText } from "~/utils/truncate-text";

type ColorPriceType = "none" | "base" | "multiplier";
type ColorKind = "simple" | "multi" | "flow";
type VisibilityRule = "one-of-two" | "both";

type RequiredColor = {
  label: string;
  type: ColorKind;
  codeHex: string[];
  minWidth: number;
  minHeight: number;
  isDefault: boolean;
  default?: boolean;
  visibilityRule: VisibilityRule;
  previewImg: string;
  popupImg: string;
  price: {
    type: ColorPriceType;
    value: number;
  };
};

type ColorSettings = {
  label: string;
  description: string;
  glowEffect: "light-color" | "same-color" | "text-color";
};

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

const toArray = (value: unknown): unknown[] => (Array.isArray(value) ? value : []);
const toStringArray = (value: unknown): string[] =>
  toArray(value)
    .map((entry) => String(entry || "").trim())
    .filter(Boolean);

const normalizePriceType = (value: unknown): ColorPriceType => {
  const normalized = String(value || "").trim().toLowerCase();
  if (normalized === "base" || normalized === "multiplier") return normalized;
  return "none";
};

const normalizeColorType = (value: unknown): ColorKind => {
  const normalized = String(value || "").trim().toLowerCase();
  if (normalized === "multi" || normalized === "flow") return normalized;
  return "simple";
};

const normalizeVisibilityRule = (value: unknown): VisibilityRule => {
  const normalized = String(value || "").trim().toLowerCase();
  return normalized === "both" ? "both" : "one-of-two";
};

const normalizeHex = (value: unknown): string => {
  const raw = String(value || "").trim();
  if (!raw) return "#000000";
  return raw.startsWith("#") ? raw : `#${raw}`;
};

const getColorOptions = (data: any) => data?.requiredOptions?.colorOptions || {};
const ensureColorOptions = (data: any) => {
  const requiredOptions = data?.requiredOptions || (data.requiredOptions = {});
  return requiredOptions.colorOptions || (requiredOptions.colorOptions = {});
};

const getColorsKey = (colorOptions: any) =>
  Array.isArray(colorOptions?.colors) ? "colors" : "allColors";

const getStoredColors = (colorOptions: any) => {
  if (Array.isArray(colorOptions?.colors)) return colorOptions.colors;
  if (Array.isArray(colorOptions?.allColors)) return colorOptions.allColors;
  return [];
};

const ensureOneDefault = (rows: RequiredColor[], preferredIndex?: number) => {
  if (!Array.isArray(rows) || rows.length === 0) return [];

  const validPreferred =
    typeof preferredIndex === "number" &&
    preferredIndex >= 0 &&
    preferredIndex < rows.length
      ? preferredIndex
      : -1;
  const existingDefault = rows.findIndex((row) => row?.isDefault || row?.default);
  const targetIndex =
    validPreferred >= 0 ? validPreferred : existingDefault >= 0 ? existingDefault : 0;

  return rows.map((row, index) => ({
    ...row,
    isDefault: index === targetIndex,
    default: index === targetIndex,
  }));
};

const normalizeUiColor = (input: any): RequiredColor => {
  const fallbackPrice = toNumber(input?.additionalPrice, 0);
  const typeFromFallback: ColorPriceType = fallbackPrice > 0 ? "base" : "none";
  const rawHex =
    Array.isArray(input?.codeHex) && input.codeHex.length > 0
      ? input.codeHex
      : [input?.textColor?.codeHex || "#000000"];
  const colorType = normalizeColorType(input?.type);
  const codeHex = toStringArray(rawHex).map(normalizeHex);
  const resolvedHex = colorType === "simple" ? [codeHex[0] || "#000000"] : codeHex;

  return {
    label: String(input?.label || input?.name || "").trim(),
    type: colorType,
    codeHex: resolvedHex.length > 0 ? resolvedHex.slice(0, 8) : ["#000000"],
    minWidth: toNumber(input?.minWidth, 0),
    minHeight: toNumber(input?.minHeight, 0),
    isDefault: Boolean(input?.isDefault ?? input?.default),
    default: Boolean(input?.isDefault ?? input?.default),
    visibilityRule: normalizeVisibilityRule(input?.visibilityRule),
    previewImg: String(input?.previewImg || input?.prevImg || ""),
    popupImg: String(input?.popupImg || ""),
    price: {
      type:
        input?.price && typeof input.price === "object"
          ? normalizePriceType(input.price.type)
          : typeFromFallback,
      value:
        input?.price && typeof input.price === "object"
          ? toNumber(input.price.value, 0)
          : fallbackPrice,
    },
  };
};

const toUiColor = (storedColor: any, key: string): RequiredColor => {
  if (key === "colors") {
    return normalizeUiColor(storedColor);
  }

  return normalizeUiColor({
    name: String(storedColor?.name || ""),
    additionalPrice: Number(storedColor?.additionalPrice || 0),
    isDefault: Boolean(storedColor?.isDefault ?? storedColor?.default),
    default: Boolean(storedColor?.isDefault ?? storedColor?.default),
    textColor: {
      codeHex: String(storedColor?.textColor?.codeHex || "#000000"),
    },
    prevImg: String(storedColor?.prevImg || ""),
  });
};

const toStoredColor = (uiColor: RequiredColor, key: string) => {
  if (key === "colors") {
    return {
      label: uiColor.label,
      type: uiColor.type,
      codeHex: uiColor.type === "simple" ? [uiColor.codeHex[0] || "#000000"] : uiColor.codeHex,
      minWidth: Number(uiColor.minWidth || 0),
      minHeight: Number(uiColor.minHeight || 0),
      isDefault: Boolean(uiColor.isDefault),
      default: Boolean(uiColor.isDefault),
      visibilityRule: uiColor.visibilityRule || "one-of-two",
      previewImg: uiColor.previewImg || "",
      popupImg: uiColor.popupImg || "",
      price: {
        type: uiColor?.price?.type || "none",
        value: Number(uiColor?.price?.value || 0),
      },
    };
  }

  return {
    name: uiColor.label,
    additionalPrice:
      uiColor?.price?.type === "none" ? 0 : Number(uiColor?.price?.value || 0),
    isDefault: Boolean(uiColor.isDefault),
    default: Boolean(uiColor.isDefault),
    textColor: {
      active: true,
      sameForBorder: false,
      codeHex: String(uiColor.codeHex?.[0] || "#000000"),
      name: uiColor.label,
    },
    pattern: {
      active: false,
      codeHex: "",
      url: "",
    },
    prevImg: String(uiColor.previewImg || ""),
  };
};

const emptyColor = (): RequiredColor => ({
  label: "",
  type: "simple",
  codeHex: ["#000000"],
  minWidth: 0,
  minHeight: 0,
  isDefault: false,
  default: false,
  visibilityRule: "one-of-two",
  previewImg: "",
  popupImg: "",
  price: {
    type: "none",
    value: 0,
  },
});

const previewSwatch = (color: RequiredColor) => {
  if (color.previewImg) {
    return (
      <img
        src={fileUrl(color.previewImg)}
        alt=""
        style={{
          width: 46,
          height: 30,
          objectFit: "cover",
          borderRadius: 6,
          border: "1px solid #d1d5db",
        }}
      />
    );
  }

  const cssColor =
    color.type === "simple"
      ? color.codeHex[0] || "#000000"
      : `linear-gradient(to right, ${color.codeHex.join(", ")})`;

  return (
    <div
      style={{
        width: 28,
        height: 28,
        borderRadius: "999px",
        border: "1px solid #d1d5db",
        background: cssColor,
      }}
    />
  );
};

export default function NcpcRequiredColors() {
  const submit = useSubmit();
  const navigation = useNavigation();
  const { ncpcData, productType } = useOutletContext<NcpcRouteContext>();
  const currencySymbol = (ncpcData as any)?.settings?.currencySymbol || "$";
  useHandleFlashMessage();

  const colorOptions = getColorOptions(ncpcData);
  const colorKey = getColorsKey(colorOptions);
  const storedColors = getStoredColors(colorOptions);
  const uiColors = storedColors.map((item: any) => toUiColor(item, colorKey));

  const [editorOpen, setEditorOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [formData, setFormData] = useState<RequiredColor>(emptyColor());
  const [colorsState, setColorsState] = useState<RequiredColor[]>(uiColors);
  const [settings, setSettings] = useState<ColorSettings>({
    label: String(colorOptions?.label || ""),
    description: String(colorOptions?.description || ""),
    glowEffect: String(colorOptions?.glowEffect || "light-color") as ColorSettings["glowEffect"],
  });

  const isSubmitting = navigation.state === "submitting";
  const sortableRef = useRef<Sortable | null>(null);
  const tableWrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const latestColorOptions = getColorOptions(ncpcData);
    const latestKey = getColorsKey(latestColorOptions);
    const latestUiColors = getStoredColors(latestColorOptions).map((item: any) =>
      toUiColor(item, latestKey),
    );

    setSettings({
      label: String(latestColorOptions?.label || ""),
      description: String(latestColorOptions?.description || ""),
      glowEffect: String(latestColorOptions?.glowEffect || "light-color") as ColorSettings["glowEffect"],
    });
    setColorsState(latestUiColors);
  }, [JSON.stringify(ncpcData.requiredOptions?.colorOptions)]);

  useEffect(() => {
    if (!tableWrapperRef.current || editorOpen || colorsState.length <= 1) return;

    const tbody = tableWrapperRef.current.querySelector("tbody");
    if (!tbody) return;

    sortableRef.current?.destroy();
    sortableRef.current = Sortable.create(tbody, {
      handle: ".drag-handle",
      animation: 120,
      chosenClass: "sortable-chosen",
      ghostClass: "sortable-ghost",
      onEnd: (evt) => {
        const oldIndex = evt.oldIndex ?? -1;
        const newIndex = evt.newIndex ?? -1;
        if (oldIndex < 0 || newIndex < 0 || oldIndex === newIndex) return;

        setColorsState((curr) => {
          const next = [...curr];
          const [moved] = next.splice(oldIndex, 1);
          next.splice(newIndex, 0, moved);

          submit(
            {
              operation: "reorder-colors",
              colors: JSON.stringify(next),
            },
            { method: "POST" },
          );

          return next;
        });
      },
    });

    return () => {
      sortableRef.current?.destroy();
      sortableRef.current = null;
    };
  }, [editorOpen, colorsState.length, submit]);

  const openCreate = () => {
    setEditingIndex(null);
    setFormData(emptyColor());
    setEditorOpen(true);
  };

  const openEdit = (index: number) => {
    setEditingIndex(index);
    setFormData(normalizeUiColor(colorsState[index]));
    setEditorOpen(true);
  };

  const closeEditor = () => {
    if (isSubmitting) return;
    setEditingIndex(null);
    setFormData(emptyColor());
    setEditorOpen(false);
  };

  const setDefaultColor = (index: number) => {
    submit(
      {
        operation: "set-default-color",
        index: String(index),
      },
      { method: "POST" },
    );
  };

  const deleteColor = (index: number) => {
    submit(
      {
        operation: "delete-color",
        index: String(index),
      },
      { method: "POST" },
    );
  };

  const saveSettings = () => {
    submit(
      {
        operation: "save-color-settings",
        colorSettings: JSON.stringify(settings),
      },
      { method: "POST" },
    );
  };

  const saveColor = () => {
    if (!formData.label.trim()) return;

    const normalized = normalizeUiColor(formData);
    const operation = editingIndex == null ? "add-color" : "update-color";
    const payload: Record<string, string> = {
      operation,
      color: JSON.stringify(normalized),
    };
    if (editingIndex != null) payload.index = String(editingIndex);

    submit(payload, { method: "POST" });
    setEditorOpen(false);
  };

  const updateHexAt = (index: number, value: string) => {
    setFormData((curr) => {
      const next = [...curr.codeHex];
      next[index] = normalizeHex(value);
      return {
        ...curr,
        codeHex: next,
      };
    });
  };

  const addHex = () => {
    setFormData((curr) => {
      if (curr.codeHex.length >= 8) return curr;
      return {
        ...curr,
        codeHex: [...curr.codeHex, "#000000"],
      };
    });
  };

  const removeHex = (index: number) => {
    setFormData((curr) => {
      if (curr.codeHex.length <= 1) return curr;
      const next = [...curr.codeHex];
      next.splice(index, 1);
      return {
        ...curr,
        codeHex: next,
      };
    });
  };

  const rows = colorsState.map((currentColor, index) => (
    <IndexTable.Row id={`${index}`} key={`${index}`} position={index}>
      <IndexTable.Cell>
        <span className="drag-handle" style={{ cursor: "grab", display: "inline-flex" }}>
          <Icon source={DragHandleIcon} />
        </span>
      </IndexTable.Cell>
      <IndexTable.Cell>{previewSwatch(currentColor)}</IndexTable.Cell>
      <IndexTable.Cell>
        <Text as="span" variant="bodyMd" fontWeight="semibold">
          {truncateText(currentColor.label, 26)}
        </Text>
      </IndexTable.Cell>
      <IndexTable.Cell className="td-center">{currentColor.type}</IndexTable.Cell>
      <IndexTable.Cell className="td-center">
        <ToggleButton
          id={`default-color-${index}`}
          type="radio"
          name="defaultColor"
          value="true"
          checked={Boolean(currentColor.isDefault || currentColor.default)}
          onChange={() => setDefaultColor(index)}
        />
      </IndexTable.Cell>
      <IndexTable.Cell className="td-center">
        <NcpcRowActions
          actions={[
            { content: "Edit", icon: EditIcon, onAction: () => openEdit(index) },
            {
              content: "Delete",
              icon: DeleteIcon,
              destructive: true,
              onAction: () => deleteColor(index),
            },
          ]}
        />
      </IndexTable.Cell>
    </IndexTable.Row>
  ));

  if (productType !== "neon") {
    return (
      <Card>
        <Box padding="400">
          <Text as="h2" variant="headingMd">
            Colors are only available for Neon configurations.
          </Text>
        </Box>
      </Card>
    );
  }

  return (
    <Page fullWidth>
      {!editorOpen ? (
        <div style={{ display: "grid", gap: 12 }}>
          <Card>
            <Box padding="300">
              <InlineStack align="space-between" blockAlign="center">
                <div>
                  <Text as="h2" variant="headingMd">
                    Colors
                  </Text>
                  <Text as="p" tone="subdued">
                    Manage neon colors, gradients and related display rules.
                  </Text>
                </div>
                <InlineStack gap="200" align="end">
                  <HelpLink
                    url="https://docs.signsdesigner.us/docs/ncpc-documentation/configurations-9624/neon-simple-9626/adding-color-for-neon-configurations-9711/"
                    text="Get Help"
                  />
                  <Button onClick={openCreate} variant="primary">
                    Add new color
                  </Button>
                </InlineStack>
              </InlineStack>
            </Box>
          </Card>

          <Card>
            <Box padding="300">
              {colorsState.length === 0 ? (
                <Box paddingBlock="800">
                  <div style={{ display: "grid", placeItems: "center", gap: 10 }}>
                    <Text as="p" variant="headingMd">
                      No colors found
                    </Text>
                    <Button onClick={openCreate} variant="primary">
                      Add first color
                    </Button>
                  </div>
                </Box>
              ) : (
                <div ref={tableWrapperRef}>
                  <IndexTable
                    resourceName={{ singular: "Color", plural: "Colors" }}
                    itemCount={colorsState.length}
                    selectable={false}
                    headings={[
                      { title: "" },
                      { title: "Color" },
                      { title: "Label" },
                      { title: "Type", alignment: "center" },
                      { title: "Default", alignment: "center" },
                      { title: "Actions", alignment: "center" },
                    ]}
                  >
                    {rows}
                  </IndexTable>
                </div>
              )}
            </Box>
          </Card>

          <Card>
            <Box padding="300">
              <Text as="h3" variant="headingSm">
                Color Settings
              </Text>
              <Box paddingBlockStart="200" />
              <div style={{ display: "grid", gap: 10 }}>
                <TextField
                  label="Title"
                  autoComplete="off"
                  value={settings.label}
                  onChange={(value) => setSettings((curr) => ({ ...curr, label: value }))}
                />
                <TextField
                  label="Description"
                  autoComplete="off"
                  helpText="Provide further details about your colors."
                  value={settings.description}
                  onChange={(value) =>
                    setSettings((curr) => ({ ...curr, description: value }))
                  }
                />
                <Select
                  label="Glow Effect"
                  options={[
                    { label: "Light Color", value: "light-color" },
                    { label: "Same Color", value: "same-color" },
                    { label: "Text color", value: "text-color" },
                  ]}
                  value={settings.glowEffect}
                  onChange={(value) =>
                    setSettings((curr) => ({
                      ...curr,
                      glowEffect: value as ColorSettings["glowEffect"],
                    }))
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
      ) : (
        <div style={{ display: "grid", gap: 12 }}>
          <Card>
            <Box padding="300">
              <InlineStack align="space-between" blockAlign="center">
                <Text as="h2" variant="headingMd">
                  {editingIndex == null ? "Add Color" : "Edit Color"}
                </Text>
                <HelpLink
                  url="https://docs.signsdesigner.us/docs/ncpc-documentation/configurations-9624/neon-simple-9626/adding-color-for-neon-configurations-9711/"
                  text="Get Help"
                />
              </InlineStack>
            </Box>
          </Card>

          <Card>
            <Box padding="300">
              <Text as="h3" variant="headingSm">
                1. Basic Info
              </Text>
              <Box paddingBlockStart="200" />
              <div style={{ display: "grid", gap: 10 }}>
                <TextField
                  label="Label"
                  autoComplete="off"
                  error={!formData.label.trim() ? "Label is required" : undefined}
                  value={formData.label}
                  onChange={(value) => setFormData((curr) => ({ ...curr, label: value }))}
                />
                <Select
                  label="Color Type"
                  options={[
                    { label: "Simple Color", value: "simple" },
                    { label: "Mixed Color", value: "multi" },
                    { label: "Flow Color", value: "flow" },
                  ]}
                  value={formData.type}
                  onChange={(value) =>
                    setFormData((curr) => {
                      const nextType = normalizeColorType(value);
                      return {
                        ...curr,
                        type: nextType,
                        codeHex:
                          nextType === "simple"
                            ? [curr.codeHex[0] || "#000000"]
                            : curr.codeHex.length > 0
                              ? curr.codeHex
                              : ["#000000"],
                      };
                    })
                  }
                />
              </div>
            </Box>
          </Card>

          <Card>
            <Box padding="300">
              <Text as="h3" variant="headingSm">
                2. Color Values
              </Text>
              <Box paddingBlockStart="200" />
              {formData.type === "simple" ? (
                <InlineStack gap="200" blockAlign="center" wrap={false}>
                  <input
                    type="color"
                    value={normalizeHex(formData.codeHex[0] || "#000000")}
                    onChange={(event) => updateHexAt(0, event.target.value)}
                    style={{
                      width: 44,
                      height: 36,
                      border: "1px solid #d1d5db",
                      borderRadius: 8,
                      background: "#fff",
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <TextField
                      label="Hex color"
                      labelHidden
                      autoComplete="off"
                      value={normalizeHex(formData.codeHex[0] || "#000000")}
                      onChange={(value) => updateHexAt(0, value)}
                    />
                  </div>
                </InlineStack>
              ) : (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                    gap: 12,
                  }}
                >
                  {formData.codeHex.map((hex, index) => (
                    <div key={`${hex}-${index}`}>
                      <InlineStack gap="200" blockAlign="center" wrap={false}>
                        <input
                          type="color"
                          value={normalizeHex(hex)}
                          onChange={(event) => updateHexAt(index, event.target.value)}
                          style={{
                            width: 44,
                            height: 36,
                            border: "1px solid #d1d5db",
                            borderRadius: 8,
                            background: "#fff",
                          }}
                        />
                        <div style={{ flex: 1 }}>
                          <TextField
                            label="Hex color"
                            labelHidden
                            autoComplete="off"
                            value={normalizeHex(hex)}
                            onChange={(value) => updateHexAt(index, value)}
                          />
                        </div>
                        {formData.codeHex.length > 1 ? (
                          <Button tone="critical" onClick={() => removeHex(index)}>
                            Remove
                          </Button>
                        ) : null}
                      </InlineStack>
                    </div>
                  ))}
                </div>
              )}
              {formData.type !== "simple" && formData.codeHex.length < 8 ? (
                <>
                  <Box paddingBlockStart="200" />
                  <Button onClick={addHex}>Add Color</Button>
                </>
              ) : null}
            </Box>
          </Card>

          <Card>
            <Box padding="300">
              <Text as="h3" variant="headingSm">
                3. Limits and Visibility
              </Text>
              <Box paddingBlockStart="200" />
              <div style={{ display: "grid", gap: 10 }}>
                <InlineStack gap="200" align="start" wrap>
                  <div style={{ minWidth: 260 }}>
                    <TextField
                      label="Minimum Width"
                      type="number"
                      autoComplete="off"
                      value={String(formData.minWidth)}
                      onChange={(value) =>
                        setFormData((curr) => ({ ...curr, minWidth: toNumber(value, 0) }))
                      }
                    />
                  </div>
                  <div style={{ minWidth: 260 }}>
                    <TextField
                      label="Minimum Height"
                      type="number"
                      autoComplete="off"
                      value={String(formData.minHeight)}
                      onChange={(value) =>
                        setFormData((curr) => ({ ...curr, minHeight: toNumber(value, 0) }))
                      }
                    />
                  </div>
                </InlineStack>
                <InlineStack gap="300" blockAlign="center" wrap>
                  <InlineStack gap="100" blockAlign="center" wrap={false}>
                    <Text as="span" variant="bodyMd">
                      One of two
                    </Text>
                    <ToggleButton
                      id="visibility-rule-one"
                      type="radio"
                      name="visibility-rule"
                      value="one-of-two"
                      checked={formData.visibilityRule === "one-of-two"}
                      onChange={(value) =>
                        setFormData((curr) => ({
                          ...curr,
                          visibilityRule: normalizeVisibilityRule(value),
                        }))
                      }
                    />
                  </InlineStack>
                  <InlineStack gap="100" blockAlign="center" wrap={false}>
                    <Text as="span" variant="bodyMd">
                      Both
                    </Text>
                    <ToggleButton
                      id="visibility-rule-both"
                      type="radio"
                      name="visibility-rule"
                      value="both"
                      checked={formData.visibilityRule === "both"}
                      onChange={(value) =>
                        setFormData((curr) => ({
                          ...curr,
                          visibilityRule: normalizeVisibilityRule(value),
                        }))
                      }
                    />
                  </InlineStack>
                </InlineStack>
              </div>
            </Box>
          </Card>

          <Card>
            <Box padding="300">
              <Text as="h3" variant="headingSm">
                4. Images
              </Text>
              <Box paddingBlockStart="200" />
              <InlineStack gap="400" align="start" wrap>
                <div style={{ minWidth: 320 }}>
                  <FileInput
                    title="Preview Image"
                    type="image"
                    path={String(formData.previewImg || "")}
                    handlePath={(value: string) =>
                      setFormData((curr) => ({ ...curr, previewImg: value }))
                    }
                  />
                </div>
                <div style={{ minWidth: 320 }}>
                  <FileInput
                    title="Popup Image"
                    type="image"
                    path={String(formData.popupImg || "")}
                    handlePath={(value: string) =>
                      setFormData((curr) => ({ ...curr, popupImg: value }))
                    }
                  />
                </div>
              </InlineStack>
            </Box>
          </Card>

          <Card>
            <Box padding="300">
              <AdditionalPriceField
                title="5. Additional Price"
                mode={formData.price.type}
                value={formData.price.value}
                currencySymbol={currencySymbol}
                onModeChange={(mode: AdditionalPriceMode) =>
                  setFormData((curr) => ({
                    ...curr,
                    price: {
                      ...curr.price,
                      type: mode,
                    },
                  }))
                }
                onValueChange={(value) =>
                  setFormData((curr) => ({
                    ...curr,
                    price: {
                      ...curr.price,
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
                  Back
                </Button>
                <Button
                  variant="primary"
                  loading={isSubmitting}
                  disabled={!formData.label.trim()}
                  onClick={saveColor}
                >
                  Save
                </Button>
              </InlineStack>
            </Box>
          </Card>
        </div>
      )}
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
  if (context.productType !== "neon") {
    return json(
      { ...jFlashMessage("Colors are only available for Neon configurations.", "error") },
      { status: 403 },
    );
  }

  const formData = await request.formData();
  const operation = String(formData.get("operation") || "");
  const index = parseIndex(formData.get("index"));

  if (operation === "add-color" || operation === "update-color") {
    const rawColor = parseJsonValue(formData.get("color"));
    const color = normalizeUiColor(rawColor);

    if (!color.label.trim()) {
      return json({ ...jFlashMessage("Color label is required", "error") }, { status: 400 });
    }

    await NcpcConfigurationService.mutateNcpc(configId, session.id, (draft) => {
      const colorOptions = ensureColorOptions(draft as any);
      const key = getColorsKey(colorOptions);
      const currentUi = getStoredColors(colorOptions).map((entry: any) => toUiColor(entry, key));
      let nextUi = [...currentUi];

      if (operation === "add-color") {
        if (nextUi.length === 0) {
          color.isDefault = true;
          color.default = true;
        }
        nextUi.push(color);
      } else if (index >= 0 && nextUi[index]) {
        nextUi[index] = color;
      }

      const preferredIndex =
        color.isDefault || color.default
          ? operation === "add-color"
            ? nextUi.length - 1
            : index
          : undefined;

      nextUi = ensureOneDefault(nextUi, preferredIndex);
      colorOptions[key] = nextUi.map((entry) => toStoredColor(entry, key));
    });

    return json({ ...jFlashMessage("Color saved successfully") });
  }

  if (operation === "delete-color") {
    if (index < 0) {
      return json({ ...jFlashMessage("Invalid color index", "error") }, { status: 400 });
    }

    await NcpcConfigurationService.mutateNcpc(configId, session.id, (draft) => {
      const colorOptions = ensureColorOptions(draft);
      const key = getColorsKey(colorOptions);
      const currentUi = getStoredColors(colorOptions).map((entry: any) => toUiColor(entry, key));
      const nextUi = ensureOneDefault(
        currentUi.filter((_entry: RequiredColor, currentIndex: number) => currentIndex !== index),
      );

      colorOptions[key] = nextUi.map((entry) => toStoredColor(entry, key));
    });

    return json({ ...jFlashMessage("Color deleted successfully") });
  }

  if (operation === "set-default-color") {
    if (index < 0) {
      return json({ ...jFlashMessage("Invalid color index", "error") }, { status: 400 });
    }

    await NcpcConfigurationService.mutateNcpc(configId, session.id, (draft) => {
      const colorOptions = ensureColorOptions(draft);
      const key = getColorsKey(colorOptions);
      const currentUi = getStoredColors(colorOptions).map((entry: any) => toUiColor(entry, key));
      const nextUi = ensureOneDefault(currentUi, index);
      colorOptions[key] = nextUi.map((entry) => toStoredColor(entry, key));
    });

    return json({ ...jFlashMessage("Default color updated successfully") });
  }

  if (operation === "reorder-colors") {
    const rawColors = parseJsonValue(formData.get("colors"));
    if (!Array.isArray(rawColors)) {
      return json({ ...jFlashMessage("Invalid reorder payload", "error") }, { status: 400 });
    }

    await NcpcConfigurationService.mutateNcpc(configId, session.id, (draft) => {
      const colorOptions = ensureColorOptions(draft);
      const key = getColorsKey(colorOptions);
      const nextUi = ensureOneDefault(rawColors.map(normalizeUiColor));
      colorOptions[key] = nextUi.map((entry) => toStoredColor(entry, key));
    });

    return json({ ...jFlashMessage("Colors order updated successfully") });
  }

  if (operation === "save-color-settings") {
    const settings = parseJsonValue(formData.get("colorSettings"));
    if (!settings || typeof settings !== "object") {
      return json({ ...jFlashMessage("Invalid settings payload", "error") }, { status: 400 });
    }

    await NcpcConfigurationService.mutateNcpc(configId, session.id, (draft) => {
      const colorOptions = ensureColorOptions(draft);
      colorOptions.label = String((settings as any)?.label || "");
      colorOptions.description = String((settings as any)?.description || "");
      colorOptions.glowEffect = String((settings as any)?.glowEffect || "light-color");
      if ("customColors" in colorOptions) {
        delete colorOptions.customColors;
      }
    });

    return json({ ...jFlashMessage("Color settings updated successfully") });
  }

  return json({ ...jFlashMessage("Invalid operation", "error") }, { status: 400 });
};
