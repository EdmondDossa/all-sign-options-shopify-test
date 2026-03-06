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
  Text,
  TextField,
} from "@shopify/polaris";
import {
  DeleteIcon,
  DragHandleIcon,
  EditIcon,
} from "@shopify/polaris-icons";
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigation, useOutletContext, useSubmit } from "@remix-run/react";
import Sortable from "~/utils/sortable-adapter";
import { ToggleButton } from "~/components/buttons";
import HelpLink from "~/components/buttons/HelpLink";
import AdditionalPriceField, {
  type AdditionalPriceMode,
} from "~/components/inputs/AdditionalPriceField";
import SelectCombobox from "~/components/inputs/SelectCombobox";
import { FileInput } from "~/components/inputs/FileInput";
import NcpcRowActions from "~/components/ncpc/NcpcRowActions";
import useHandleFlashMessage from "~/hooks/useHandleFlashMessage";
import NcpcConfigurationService from "~/models/NcpcConfiguration.service";
import { authenticate } from "~/shopify.server";
import type { NcpcRouteContext } from "~/types/NcpcRouteContext";
import { jFlashMessage } from "~/utils/message-flash";
import { fileUrl } from "~/utils/fileUrl";
import { truncateText } from "~/utils/truncate-text";

type PriceType = "none" | "base" | "multiplier";

type BackboardColorItem = {
  label: string;
  color: string;
  isDefault: boolean;
  default?: boolean;
  backboards: Array<number | string>;
  layers: Array<number | string>;
  minWidth: number;
  minHeight: number;
  visibilityRule: "one-of-two" | "both";
  previewImg: string;
  popupImg: string;
  pattern: string;
  usePattern: boolean;
  price: {
    type: PriceType;
    value: number;
  };
};

type BackboardColorSettings = {
  label: string;
  description: string;
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

const normalizePriceType = (value: unknown): PriceType => {
  const normalized = String(value || "").trim().toLowerCase();
  if (normalized === "base" || normalized === "multiplier") return normalized;
  return "none";
};

const normalizeBackboardIds = (values: unknown[]) =>
  values.map((entry) => {
    const parsed = Number(entry);
    return Number.isFinite(parsed) ? parsed : String(entry);
  });

const normalizeLayerIds = (values: unknown[]) =>
  values.map((entry) => String(entry)).filter(Boolean);

const normalizeBackboardColorItem = (item: any): BackboardColorItem => {
  const pattern = String(item?.pattern || "");
  const priceType = normalizePriceType(item?.price?.type);
  return {
    label: String(item?.label || item?.title || "").trim(),
    color: String(item?.color || "#000000"),
    isDefault: Boolean(item?.isDefault ?? item?.default),
    default: Boolean(item?.isDefault ?? item?.default),
    backboards: normalizeBackboardIds(toArray(item?.backboards)),
    layers: normalizeLayerIds(toArray(item?.layers)),
    minWidth: toNumber(item?.minWidth, 0),
    minHeight: toNumber(item?.minHeight, 0),
    visibilityRule:
      String(item?.visibilityRule || "one-of-two") === "both" ? "both" : "one-of-two",
    previewImg: String(item?.previewImg || item?.icon || ""),
    popupImg: String(item?.popupImg || item?.popImg || ""),
    pattern,
    usePattern: Boolean(item?.usePattern || pattern),
    price: {
      type: priceType,
      value: toNumber(item?.price?.value, 0),
    },
  };
};

const emptyBackboardColor = (): BackboardColorItem => ({
  label: "",
  color: "#000000",
  isDefault: false,
  default: false,
  backboards: [],
  layers: [],
  minWidth: 0,
  minHeight: 0,
  visibilityRule: "one-of-two",
  previewImg: "",
  popupImg: "",
  pattern: "",
  usePattern: false,
  price: {
    type: "none",
    value: 0,
  },
});

const ensureOneDefault = (
  rows: BackboardColorItem[],
  preferredIndex?: number,
) => {
  if (!Array.isArray(rows) || rows.length === 0) return [];

  const validPreferred =
    typeof preferredIndex === "number" &&
    preferredIndex >= 0 &&
    preferredIndex < rows.length
      ? preferredIndex
      : -1;

  const existingDefaultIndex = rows.findIndex(
    (row) => row?.isDefault || row?.default,
  );

  const targetIndex =
    validPreferred >= 0
      ? validPreferred
      : existingDefaultIndex >= 0
        ? existingDefaultIndex
        : 0;

  return rows.map((row, index) => ({
    ...row,
    isDefault: index === targetIndex,
    default: index === targetIndex,
  }));
};

const getBackboardColorContainer = (rawLegacy: any, rawNested: any) => {
  if (rawNested && typeof rawNested === "object") {
    const list = Array.isArray(rawNested.backboardColors)
      ? rawNested.backboardColors
      : [];
    return {
      label: String(rawNested.label || "Backboard Colors"),
      description: String(rawNested.description || ""),
      backboardColors: list.map(normalizeBackboardColorItem),
    };
  }

  if (Array.isArray(rawLegacy)) {
    return {
      label: "Backboard Colors",
      description: "",
      backboardColors: rawLegacy.map(normalizeBackboardColorItem),
    };
  }

  if (rawLegacy && typeof rawLegacy === "object") {
    const list = Array.isArray(rawLegacy.backboardColors)
      ? rawLegacy.backboardColors
      : [];
    return {
      label: String(rawLegacy.label || "Backboard Colors"),
      description: String(rawLegacy.description || ""),
      backboardColors: list.map(normalizeBackboardColorItem),
    };
  }

  return {
    label: "Backboard Colors",
    description: "",
    backboardColors: [],
  };
};

const setBackboardColorContainer = (draft: any, container: any) => {
  draft.additionalOptions.backboardColorsOptions = {
    label: String(container?.label || "Backboard Colors"),
    description: String(container?.description || ""),
    backboardColors: Array.isArray(container?.backboardColors)
      ? container.backboardColors.map(normalizeBackboardColorItem)
      : [],
  };
};

const getLayerOptions = (
  allBackboards: any[],
  selectedBackboards: Array<number | string>,
) => {
  const selectedSet = new Set(
    selectedBackboards.map((entry) => String(entry)),
  );

  return allBackboards.flatMap((backboard: any, backboardIndex: number) => {
    if (!selectedSet.has(String(backboardIndex))) return [];

    const layerConfig = backboard?.backboardLength?.layers;
    if (!layerConfig?.activate || !Array.isArray(layerConfig?.options)) return [];

    return layerConfig.options.map((layer: any, layerIndex: number) => ({
      label: `${String(backboard?.label || `Backboard ${backboardIndex + 1}`)} / ${String(layer?.label || `Layer ${layerIndex + 1}`)}`,
      value: `${backboardIndex}/${layerIndex}`,
    }));
  });
};

const getPreviewSource = (row: BackboardColorItem) => {
  const candidate = row.previewImg || (row.usePattern ? row.pattern : "");
  return String(fileUrl(candidate || "") || "");
};

export default function NcpcAdditionalBackboardColors() {
  const submit = useSubmit();
  const navigation = useNavigation();
  const { ncpcData } = useOutletContext<NcpcRouteContext>();
  const currencySymbol = (ncpcData as any)?.settings?.currencySymbol || "$";
  useHandleFlashMessage();

  const isSubmitting = navigation.state === "submitting";

  const container = getBackboardColorContainer(
    (ncpcData.additionalOptions as any)?.backboardColorOptions,
    (ncpcData.additionalOptions as any)?.backboardColorsOptions,
  );

  const [settings, setSettings] = useState<BackboardColorSettings>({
    label: container.label,
    description: container.description,
  });
  const [editorOpen, setEditorOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [formData, setFormData] = useState<BackboardColorItem>(emptyBackboardColor());
  const [rowsState, setRowsState] = useState<BackboardColorItem[]>(
    container.backboardColors,
  );

  const tableWrapperRef = useRef<HTMLDivElement | null>(null);
  const sortableRef = useRef<Sortable | null>(null);

  useEffect(() => {
    const latest = getBackboardColorContainer(
      (ncpcData.additionalOptions as any)?.backboardColorOptions,
      (ncpcData.additionalOptions as any)?.backboardColorsOptions,
    );
    setSettings({
      label: latest.label,
      description: latest.description,
    });
    setRowsState(latest.backboardColors);
  }, [
    JSON.stringify((ncpcData.additionalOptions as any)?.backboardColorOptions),
    JSON.stringify((ncpcData.additionalOptions as any)?.backboardColorsOptions),
  ]);

  useEffect(() => {
    if (!tableWrapperRef.current || editorOpen || rowsState.length <= 1) return;
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

        setRowsState((curr) => {
          const next = [...curr];
          const [moved] = next.splice(oldIndex, 1);
          next.splice(newIndex, 0, moved);

          submit(
            {
              operation: "reorder-backboard-colors",
              rows: JSON.stringify(next),
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
  }, [editorOpen, rowsState.length, submit]);

  const allBackboards = useMemo(() => {
    const raw = (ncpcData.additionalOptions as any)?.backboardOptions;
    if (Array.isArray(raw)) return raw;
    if (Array.isArray(raw?.backboards)) return raw.backboards;
    return [];
  }, [JSON.stringify((ncpcData.additionalOptions as any)?.backboardOptions)]);

  const backboardOptions = useMemo(
    () =>
      allBackboards.map((entry: any, index: number) => ({
        label: String(entry?.label || `Backboard ${index + 1}`),
        value: String(index),
      })),
    [allBackboards],
  );

  const layerOptions = useMemo(
    () => getLayerOptions(allBackboards, formData.backboards),
    [allBackboards, JSON.stringify(formData.backboards)],
  );

  const setArrayField =
    (field: "backboards" | "layers") =>
    (nextState: React.SetStateAction<any[]>) => {
      setFormData((curr) => ({
        ...curr,
        [field]:
          typeof nextState === "function"
            ? nextState((curr[field] || []) as any[])
            : nextState,
      }));
    };

  const openCreate = () => {
    setEditingIndex(null);
    setFormData(emptyBackboardColor());
    setEditorOpen(true);
  };

  const openEdit = (index: number) => {
    setEditingIndex(index);
    setFormData(normalizeBackboardColorItem(rowsState[index]));
    setEditorOpen(true);
  };

  const closeEditor = () => {
    if (isSubmitting) return;
    setEditingIndex(null);
    setFormData(emptyBackboardColor());
    setEditorOpen(false);
  };

  const saveItem = () => {
    if (!formData.label.trim()) return;

    const operation =
      editingIndex == null ? "add-backboard-color" : "update-backboard-color";
    const payload: Record<string, string> = {
      operation,
      row: JSON.stringify(formData),
    };
    if (editingIndex != null) payload.index = String(editingIndex);

    submit(payload, { method: "POST" });
    setEditorOpen(false);
  };

  const deleteItem = (index: number) => {
    submit(
      {
        operation: "delete-backboard-color",
        index: String(index),
      },
      { method: "POST" },
    );
  };

  const setDefault = (index: number) => {
    submit(
      {
        operation: "set-default-backboard-color",
        index: String(index),
      },
      { method: "POST" },
    );
  };

  const saveSettings = () => {
    submit(
      {
        operation: "save-backboard-color-settings",
        settings: JSON.stringify(settings),
      },
      { method: "POST" },
    );
  };

  const tableRows = rowsState.map((row, index) => (
    <IndexTable.Row id={`${index}`} key={`${index}`} position={index}>
      <IndexTable.Cell>
        <span className="drag-handle" style={{ cursor: "grab", display: "inline-flex" }}>
          <Icon source={DragHandleIcon} />
        </span>
      </IndexTable.Cell>
      <IndexTable.Cell>
        <Text as="span" variant="bodyMd" fontWeight="semibold">
          {truncateText(String(row.label || `Color ${index + 1}`), 26)}
        </Text>
      </IndexTable.Cell>
      <IndexTable.Cell className="td-center">
        <div
          style={{
            width: 52,
            height: 36,
            borderRadius: 6,
            border: "1px solid #d1d5db",
            overflow: "hidden",
            background: row.color || "#000000",
            display: "inline-flex",
          }}
        >
          {getPreviewSource(row) ? (
            <img
              src={getPreviewSource(row)}
              alt=""
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              onError={(event) => {
                event.currentTarget.style.display = "none";
              }}
            />
          ) : null}
        </div>
      </IndexTable.Cell>
      <IndexTable.Cell className="td-center">
        {row.price.type === "none"
          ? "none"
          : row.price.type === "base"
            ? `${currencySymbol}${row.price.value}`
            : `${row.price.value}%`}
      </IndexTable.Cell>
      <IndexTable.Cell className="td-center">
        <ToggleButton
          id={`default-backboard-color-${index}`}
          type="radio"
          name="defaultBackboardColor"
          value="true"
          checked={Boolean(row.isDefault || row.default)}
          onChange={() => setDefault(index)}
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
              onAction: () => deleteItem(index),
            },
          ]}
        />
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
                    Backboard Colors
                  </Text>
                  <Text as="p" tone="subdued">
                    Manage backboard color options and display logic.
                  </Text>
                </div>
                <InlineStack gap="200" align="end">
                  <HelpLink
                    url="https://docs.signsdesigner.us/docs/ncpc-documentation/advanced-tips-and-tricks-9638/adding-backboard-colors-9731/"
                    text="Get Help"
                  />
                  <Button onClick={openCreate} variant="primary">
                    Add Backboard Color
                  </Button>
                </InlineStack>
              </InlineStack>
            </Box>
          </Card>

          <Card>
            <Box padding="300">
              {rowsState.length === 0 ? (
                <Box paddingBlock="800">
                  <div style={{ display: "grid", placeItems: "center", gap: 10 }}>
                    <Text as="p" variant="headingMd">
                      No backboard color yet
                    </Text>
                    <Button onClick={openCreate} variant="primary">
                      Add first backboard color
                    </Button>
                  </div>
                </Box>
              ) : (
                <div ref={tableWrapperRef}>
                  <IndexTable
                    resourceName={{
                      singular: "Backboard Color",
                      plural: "Backboard Colors",
                    }}
                    itemCount={rowsState.length}
                    selectable={false}
                    headings={[
                      { title: "" },
                      { title: "Label" },
                      { title: "Preview", alignment: "center" },
                      { title: "Pricing", alignment: "center" },
                      { title: "Default", alignment: "center" },
                      { title: "Action", alignment: "center" },
                    ]}
                  >
                    {tableRows}
                  </IndexTable>
                </div>
              )}
            </Box>
          </Card>

          <Card>
            <Box padding="300">
              <Text as="h3" variant="headingSm">
                Backboard Colors Settings
              </Text>
              <Box paddingBlockStart="200" />
              <div style={{ display: "grid", gap: 10 }}>
                <TextField
                  label="Title"
                  value={settings.label}
                  autoComplete="off"
                  onChange={(value) => setSettings((curr) => ({ ...curr, label: value }))}
                />
                <TextField
                  label="Description"
                  value={settings.description}
                  autoComplete="off"
                  onChange={(value) =>
                    setSettings((curr) => ({ ...curr, description: value }))
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
                  {editingIndex == null
                    ? "Add Backboard Color"
                    : "Edit Backboard Color"}
                </Text>
                <HelpLink
                  url="https://docs.signsdesigner.us/docs/ncpc-documentation/advanced-tips-and-tricks-9638/adding-backboard-colors-9731/"
                  text="Get Help"
                />
              </InlineStack>
            </Box>
          </Card>

          <Card>
            <Box padding="300">
              <Text as="h3" variant="headingSm">
                1. Label
              </Text>
              <Box paddingBlockStart="200" />
              <div style={{ display: "grid", gap: 10 }}>
                <TextField
                  label="Label"
                  value={formData.label}
                  autoComplete="off"
                  error={!formData.label.trim() ? "Label is required" : undefined}
                  onChange={(value) => setFormData((curr) => ({ ...curr, label: value }))}
                />
              </div>
            </Box>
          </Card>

          <Card>
            <Box padding="300">
              <Text as="h3" variant="headingSm">
                2. Color / Texture
              </Text>
              <Box paddingBlockStart="200" />
              <div style={{ display: "grid", gap: 12 }}>
                <InlineStack gap="300" blockAlign="center" wrap={false}>
                  <Text as="span" variant="bodyMd">
                    Use texture pattern
                  </Text>
                  <ToggleButton
                    id="use-pattern-toggle"
                    type="checkbox"
                    checked={Boolean(formData.usePattern)}
                    onChange={(value) =>
                      setFormData((curr) => ({
                        ...curr,
                        usePattern: value,
                        pattern: value ? curr.pattern : "",
                      }))
                    }
                  />
                </InlineStack>

                {!formData.usePattern ? (
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "72px minmax(220px, 320px)",
                      alignItems: "end",
                      gap: 12,
                    }}
                  >
                    <div style={{ display: "grid", gap: 6 }}>
                      <Text as="span" variant="bodySm" tone="subdued">
                        Picker
                      </Text>
                      <input
                        type="color"
                        value={formData.color || "#000000"}
                        style={{
                          width: 56,
                          height: 40,
                          border: "1px solid #d1d5db",
                          borderRadius: 8,
                          padding: 2,
                          background: "#fff",
                          cursor: "pointer",
                        }}
                        onChange={(event) =>
                          setFormData((curr) => ({
                            ...curr,
                            color: event.target.value,
                          }))
                        }
                      />
                    </div>
                    <div>
                      <TextField
                        label="Hex color"
                        value={formData.color}
                        autoComplete="off"
                        onChange={(value) =>
                          setFormData((curr) => ({ ...curr, color: value }))
                        }
                      />
                    </div>
                  </div>
                ) : (
                  <div style={{ minWidth: 320 }}>
                    <FileInput
                      title="Pattern Image"
                      type="image"
                      path={String(formData.pattern || "")}
                      handlePath={(value: string) =>
                        setFormData((curr) => ({ ...curr, pattern: value }))
                      }
                    />
                  </div>
                )}
              </div>
            </Box>
          </Card>

          <Card>
            <Box padding="300">
              <Text as="h3" variant="headingSm">
                3. Scope and Layers
              </Text>
              <Box paddingBlockStart="200" />
              <div style={{ display: "grid", gap: 10 }}>
                <SelectCombobox
                  label="Backboards"
                  placeholder="Select backboards"
                  data={backboardOptions}
                  selectedOptions={formData.backboards.map(String)}
                  setSelectedOptions={setArrayField("backboards")}
                />

                {layerOptions.length > 0 ? (
                  <SelectCombobox
                    label="Layers"
                    placeholder="Select layers"
                    data={layerOptions}
                    selectedOptions={formData.layers.map(String)}
                    setSelectedOptions={setArrayField("layers")}
                  />
                ) : null}
              </div>
            </Box>
          </Card>

          <Card>
            <Box padding="300">
              <Text as="h3" variant="headingSm">
                4. Size and Visibility Rule
              </Text>
              <Box paddingBlockStart="200" />
              <div style={{ display: "grid", gap: 10 }}>
                <InlineStack gap="300" align="start">
                  <div style={{ minWidth: 220 }}>
                    <TextField
                      label="Min Width"
                      type="number"
                      value={String(formData.minWidth ?? 0)}
                      autoComplete="off"
                      onChange={(value) =>
                        setFormData((curr) => ({
                          ...curr,
                          minWidth: toNumber(value, 0),
                        }))
                      }
                    />
                  </div>
                  <div style={{ minWidth: 220 }}>
                    <TextField
                      label="Min Height"
                      type="number"
                      value={String(formData.minHeight ?? 0)}
                      autoComplete="off"
                      onChange={(value) =>
                        setFormData((curr) => ({
                          ...curr,
                          minHeight: toNumber(value, 0),
                        }))
                      }
                    />
                  </div>
                </InlineStack>

                <InlineStack gap="300" blockAlign="center" wrap={false}>
                  <Text as="span" variant="bodyMd">
                    One of two
                  </Text>
                  <ToggleButton
                    id="visibility-rule-one"
                    type="radio"
                    name="visibility-rule"
                    value="one-of-two"
                    checked={formData.visibilityRule === "one-of-two"}
                    onChange={() =>
                      setFormData((curr) => ({ ...curr, visibilityRule: "one-of-two" }))
                    }
                  />
                  <Text as="span" variant="bodyMd">
                    Both
                  </Text>
                  <ToggleButton
                    id="visibility-rule-both"
                    type="radio"
                    name="visibility-rule"
                    value="both"
                    checked={formData.visibilityRule === "both"}
                    onChange={() =>
                      setFormData((curr) => ({ ...curr, visibilityRule: "both" }))
                    }
                  />
                </InlineStack>
              </div>
            </Box>
          </Card>

          <Card>
            <Box padding="300">
              <Text as="h3" variant="headingSm">
                5. Images
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
                title="6. Additional Price"
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
                  onClick={saveItem}
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

  const formData = await request.formData();
  const operation = String(formData.get("operation") || "");
  const index = parseIndex(formData.get("index"));

  if (
    operation === "add-backboard-color" ||
    operation === "update-backboard-color"
  ) {
    const rawRow = parseJsonValue(formData.get("row"));
    const normalized = normalizeBackboardColorItem(rawRow);
    if (!normalized.label.trim()) {
      return json(
        { ...jFlashMessage("Backboard color label is required", "error") },
        { status: 400 },
      );
    }

    await NcpcConfigurationService.mutateNcpc(configId, session.id, (draft) => {
      const current = getBackboardColorContainer(
        (draft as any)?.additionalOptions?.backboardColorOptions,
        (draft as any)?.additionalOptions?.backboardColorsOptions,
      );
      let rows = [...current.backboardColors];
      if (operation === "add-backboard-color") {
        rows.push(normalized);
      } else if (index >= 0 && rows[index]) {
        rows[index] = normalized;
      }

      const preferredIndex =
        normalized.isDefault || normalized.default
          ? operation === "add-backboard-color"
            ? rows.length - 1
            : index
          : undefined;
      rows = ensureOneDefault(rows, preferredIndex);

      setBackboardColorContainer(draft, {
        ...current,
        backboardColors: rows,
      });
    });

    return json({
      ...jFlashMessage(
        operation === "add-backboard-color"
          ? "Backboard color added successfully"
          : "Backboard color updated successfully",
      ),
    });
  }

  if (operation === "delete-backboard-color") {
    if (index < 0) {
      return json(
        { ...jFlashMessage("Invalid backboard color index", "error") },
        { status: 400 },
      );
    }

    await NcpcConfigurationService.mutateNcpc(configId, session.id, (draft) => {
      const current = getBackboardColorContainer(
        (draft as any)?.additionalOptions?.backboardColorOptions,
        (draft as any)?.additionalOptions?.backboardColorsOptions,
      );
      let rows = current.backboardColors.filter(
        (_row: BackboardColorItem, rowIndex: number) => rowIndex !== index,
      );
      rows = ensureOneDefault(rows);
      setBackboardColorContainer(draft, {
        ...current,
        backboardColors: rows,
      });
    });

    return json({ ...jFlashMessage("Backboard color deleted successfully") });
  }

  if (operation === "set-default-backboard-color") {
    if (index < 0) {
      return json(
        { ...jFlashMessage("Invalid backboard color index", "error") },
        { status: 400 },
      );
    }

    await NcpcConfigurationService.mutateNcpc(configId, session.id, (draft) => {
      const current = getBackboardColorContainer(
        (draft as any)?.additionalOptions?.backboardColorOptions,
        (draft as any)?.additionalOptions?.backboardColorsOptions,
      );
      const rows = ensureOneDefault([...current.backboardColors], index);
      setBackboardColorContainer(draft, {
        ...current,
        backboardColors: rows,
      });
    });

    return json({ ...jFlashMessage("Default backboard color updated successfully") });
  }

  if (operation === "reorder-backboard-colors") {
    const rows = parseJsonValue(formData.get("rows"));
    if (!Array.isArray(rows)) {
      return json(
        { ...jFlashMessage("Invalid reorder payload", "error") },
        { status: 400 },
      );
    }

    await NcpcConfigurationService.mutateNcpc(configId, session.id, (draft) => {
      const current = getBackboardColorContainer(
        (draft as any)?.additionalOptions?.backboardColorOptions,
        (draft as any)?.additionalOptions?.backboardColorsOptions,
      );
      const normalizedRows = ensureOneDefault(rows.map(normalizeBackboardColorItem));
      setBackboardColorContainer(draft, {
        ...current,
        backboardColors: normalizedRows,
      });
    });

    return json({ ...jFlashMessage("Backboard colors order updated successfully") });
  }

  if (operation === "save-backboard-color-settings") {
    const settings = parseJsonValue(formData.get("settings"));
    if (!settings || typeof settings !== "object") {
      return json(
        { ...jFlashMessage("Invalid settings payload", "error") },
        { status: 400 },
      );
    }

    await NcpcConfigurationService.mutateNcpc(configId, session.id, (draft) => {
      const current = getBackboardColorContainer(
        (draft as any)?.additionalOptions?.backboardColorOptions,
        (draft as any)?.additionalOptions?.backboardColorsOptions,
      );
      setBackboardColorContainer(draft, {
        ...current,
        label: String((settings as any)?.label || "Backboard Colors"),
        description: String((settings as any)?.description || ""),
      });
    });

    return json({ ...jFlashMessage("Backboard color settings updated successfully") });
  }

  return json({ ...jFlashMessage("Invalid operation", "error") }, { status: 400 });
};
