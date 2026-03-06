import { json } from "@remix-run/node";
import type { ActionFunctionArgs } from "@remix-run/node";
import {
  Badge,
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
import { useEffect, useMemo, useRef, useState } from "react";
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

type BackboardPriceType = "none" | "base" | "multiplier";

type BackboardLayer = {
  label: string;
  description: string;
  length: number;
};

type BackboardItem = {
  label: string;
  description: string;
  type: string;
  isDefault: boolean;
  default?: boolean;
  customShapeFile: string;
  previewImg: string;
  popupImg: string;
  backboardLength: {
    shapeLength: number;
    layers: {
      activate: boolean;
      options: BackboardLayer[];
    };
  };
  price: {
    type: BackboardPriceType;
    value: number;
  };
};

type BackboardSettings = {
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

const normalizePriceType = (value: unknown): BackboardPriceType => {
  const normalized = String(value || "").trim().toLowerCase();
  if (normalized === "base" || normalized === "multiplier") return normalized;
  return "none";
};

const normalizeLayer = (layer: any): BackboardLayer => ({
  label: String(layer?.label || "").trim(),
  description: String(layer?.description || ""),
  length: toNumber(layer?.length, 8),
});

const normalizeLayers = (layers: any): BackboardLayer[] => {
  const normalized = toArray(layers).map(normalizeLayer);
  if (normalized.length > 0) return normalized;
  return [{ label: "", description: "", length: 8 }];
};

const normalizeBackboardType = (value: unknown) => {
  const normalized = String(value || "").trim().toLowerCase();
  return normalized || "none";
};

const normalizeBackboardItem = (item: any): BackboardItem => {
  const layers = item?.backboardLength?.layers;
  return {
    label: String(item?.label || item?.title || "").trim(),
    description: String(item?.description || ""),
    type: normalizeBackboardType(item?.type),
    isDefault: Boolean(item?.isDefault ?? item?.default),
    default: Boolean(item?.isDefault ?? item?.default),
    customShapeFile: String(item?.customShapeFile || ""),
    previewImg: String(item?.previewImg || item?.icon || ""),
    popupImg: String(item?.popupImg || item?.popImg || ""),
    backboardLength: {
      shapeLength: toNumber(item?.backboardLength?.shapeLength, 8),
      layers: {
        activate: Boolean(layers?.activate),
        options: normalizeLayers(layers?.options),
      },
    },
    price: {
      type: normalizePriceType(item?.price?.type),
      value: toNumber(item?.price?.value, 0),
    },
  };
};

const emptyBackboard = (): BackboardItem => ({
  label: "",
  description: "",
  type: "none",
  isDefault: false,
  default: false,
  customShapeFile: "",
  previewImg: "",
  popupImg: "",
  backboardLength: {
    shapeLength: 8,
    layers: {
      activate: false,
      options: [{ label: "", description: "", length: 8 }],
    },
  },
  price: {
    type: "none",
    value: 0,
  },
});

const ensureOneDefault = (rows: BackboardItem[], preferredIndex?: number) => {
  if (!Array.isArray(rows) || rows.length === 0) return [];

  const validPreferred =
    typeof preferredIndex === "number" &&
    preferredIndex >= 0 &&
    preferredIndex < rows.length
      ? preferredIndex
      : -1;
  const existing = rows.findIndex((row) => row?.isDefault || row?.default);
  const target = validPreferred >= 0 ? validPreferred : existing >= 0 ? existing : 0;

  return rows.map((row, index) => ({
    ...row,
    isDefault: index === target,
    default: index === target,
  }));
};

const getBackboardContainer = (rawBackboardOptions: any) => {
  if (Array.isArray(rawBackboardOptions)) {
    return {
      label: "Backboard",
      description: "",
      backboards: ensureOneDefault(rawBackboardOptions.map(normalizeBackboardItem)),
    };
  }

  if (rawBackboardOptions && typeof rawBackboardOptions === "object") {
    const list = Array.isArray(rawBackboardOptions.backboards)
      ? rawBackboardOptions.backboards
      : [];
    return {
      label: String(rawBackboardOptions.label || "Backboard"),
      description: String(rawBackboardOptions.description || ""),
      backboards: ensureOneDefault(list.map(normalizeBackboardItem)),
    };
  }

  return {
    label: "Backboard",
    description: "",
    backboards: [],
  };
};

const setBackboardContainer = (draft: any, container: any) => {
  draft.additionalOptions.backboardOptions = {
    label: String(container?.label || "Backboard"),
    description: String(container?.description || ""),
    backboards: Array.isArray(container?.backboards)
      ? ensureOneDefault(container.backboards.map(normalizeBackboardItem))
      : [],
  };
};

const getLayerLabelErrors = (item: BackboardItem) => {
  if (!item.type.includes("cut-to") || !item.backboardLength.layers.activate) return [];
  return item.backboardLength.layers.options
    .map((layer, index) => (layer.label.trim() ? -1 : index))
    .filter((index) => index >= 0);
};

const getLayerLengthErrors = (item: BackboardItem) => {
  if (!item.type.includes("cut-to") || !item.backboardLength.layers.activate) return [];
  const layers = item.backboardLength.layers.options;
  return layers.reduce<number[]>((acc, curr, index) => {
    if (index === 0) return acc;
    const prev = layers[index - 1];
    if (!(toNumber(curr.length, 0) > toNumber(prev.length, 0))) {
      acc.push(index);
    }
    return acc;
  }, []);
};

const backboardTypeOptions = (productType: "neon" | "channel") => {
  const base = [
    { label: "None", value: "none" },
    { label: "Board", value: "board" },
    { label: "Box", value: "box" },
    { label: "Stand", value: "stand" },
    { label: "Raceway Double", value: "raceway-double" },
  ];

  if (productType === "channel") {
    base.push({ label: "Raceway One", value: "raceway-one" });
  }

  return [
    ...base,
    { label: "Cut To Shape", value: "cut-to-shape" },
    { label: "Cut To Letter", value: "cut-to-letter" },
    { label: "Custom Shape", value: "custom-shape" },
  ];
};

export default function NcpcAdditionalBackboards() {
  const submit = useSubmit();
  const navigation = useNavigation();
  const { ncpcData, productType } = useOutletContext<NcpcRouteContext>();
  const currencySymbol = (ncpcData as any)?.settings?.currencySymbol || "$";
  useHandleFlashMessage();

  const isSubmitting = navigation.state === "submitting";
  const container = getBackboardContainer(ncpcData.additionalOptions?.backboardOptions);

  const [settings, setSettings] = useState<BackboardSettings>({
    label: container.label,
    description: container.description,
  });
  const [editorOpen, setEditorOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [formData, setFormData] = useState<BackboardItem>(emptyBackboard());
  const [backboardsState, setBackboardsState] = useState<BackboardItem[]>(
    container.backboards,
  );

  const sortableRef = useRef<Sortable | null>(null);
  const tableWrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const latest = getBackboardContainer(ncpcData.additionalOptions?.backboardOptions);
    setSettings({
      label: latest.label,
      description: latest.description,
    });
    setBackboardsState(latest.backboards);
  }, [JSON.stringify(ncpcData.additionalOptions?.backboardOptions)]);

  useEffect(() => {
    if (!tableWrapperRef.current || editorOpen || backboardsState.length <= 1) return;

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

        setBackboardsState((curr) => {
          const next = [...curr];
          const [moved] = next.splice(oldIndex, 1);
          next.splice(newIndex, 0, moved);

          submit(
            {
              operation: "reorder-backboards",
              backboards: JSON.stringify(next),
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
  }, [editorOpen, backboardsState.length, submit]);

  const typeOptions = useMemo(() => backboardTypeOptions(productType), [productType]);
  const layerLabelErrors = useMemo(() => getLayerLabelErrors(formData), [formData]);
  const layerLengthErrors = useMemo(() => getLayerLengthErrors(formData), [formData]);
  const hasBlockingErrors =
    layerLabelErrors.length > 0 || layerLengthErrors.length > 0;

  const openCreate = () => {
    setEditingIndex(null);
    setFormData(emptyBackboard());
    setEditorOpen(true);
  };

  const openEdit = (index: number) => {
    setEditingIndex(index);
    setFormData(normalizeBackboardItem(backboardsState[index]));
    setEditorOpen(true);
  };

  const closeEditor = () => {
    if (isSubmitting) return;
    setEditingIndex(null);
    setFormData(emptyBackboard());
    setEditorOpen(false);
  };

  const saveBackboard = () => {
    if (!formData.label.trim() || hasBlockingErrors) return;

    const operation = editingIndex == null ? "add-backboard" : "update-backboard";
    const payload: Record<string, string> = {
      operation,
      backboard: JSON.stringify(formData),
    };
    if (editingIndex != null) {
      payload.index = String(editingIndex);
    }

    submit(payload, { method: "POST" });
    setEditorOpen(false);
  };

  const deleteBackboard = (index: number) => {
    submit(
      {
        operation: "delete-backboard",
        index: String(index),
      },
      { method: "POST" },
    );
  };

  const setDefaultBackboard = (index: number) => {
    submit(
      {
        operation: "set-default-backboard",
        index: String(index),
      },
      { method: "POST" },
    );
  };

  const saveSettings = () => {
    submit(
      {
        operation: "save-backboard-settings",
        settings: JSON.stringify(settings),
      },
      { method: "POST" },
    );
  };

  const addLayer = () => {
    setFormData((curr) => ({
      ...curr,
      backboardLength: {
        ...curr.backboardLength,
        layers: {
          ...curr.backboardLength.layers,
          options: [
            ...curr.backboardLength.layers.options,
            { label: "", description: "", length: 8 },
          ],
        },
      },
    }));
  };

  const removeLayer = (index: number) => {
    setFormData((curr) => {
      const layers = [...curr.backboardLength.layers.options];
      layers.splice(index, 1);
      return {
        ...curr,
        backboardLength: {
          ...curr.backboardLength,
          layers: {
            ...curr.backboardLength.layers,
            options: layers.length > 0 ? layers : [{ label: "", description: "", length: 8 }],
          },
        },
      };
    });
  };

  const rows = backboardsState.map((item, index) => (
    <IndexTable.Row id={`${index}`} key={`${index}`} position={index}>
      <IndexTable.Cell>
        <span className="drag-handle" style={{ cursor: "grab", display: "inline-flex" }}>
          <Icon source={DragHandleIcon} />
        </span>
      </IndexTable.Cell>
      <IndexTable.Cell>
        <InlineStack gap="200" blockAlign="center" wrap={false}>
          <Text as="span" variant="bodyMd" fontWeight="semibold">
            {truncateText(String(item.label || `Backboard ${index + 1}`), 30)}
          </Text>
          <Badge tone="info">{item.type || "none"}</Badge>
        </InlineStack>
      </IndexTable.Cell>
      <IndexTable.Cell>
        {item.previewImg ? (
          <img
            src={String(fileUrl(item.previewImg || "") || "")}
            alt=""
            style={{
              width: 52,
              height: 36,
              borderRadius: 6,
              border: "1px solid #d1d5db",
              objectFit: "cover",
            }}
          />
        ) : (
          <Text as="span" tone="subdued">
            -
          </Text>
        )}
      </IndexTable.Cell>
      <IndexTable.Cell className="td-center">
        <ToggleButton
          id={`default-backboard-${index}`}
          type="radio"
          name="defaultBackboard"
          value="true"
          checked={Boolean(item.isDefault || item.default)}
          onChange={() => setDefaultBackboard(index)}
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
              onAction: () => deleteBackboard(index),
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
                    Backboards
                  </Text>
                  <Text as="p" tone="subdued">
                    Manage backboard options, default value and advanced cut rules.
                  </Text>
                </div>
                <InlineStack gap="200" align="end">
                  <HelpLink
                    url="https://docs.signsdesigner.us/docs/ncpc-documentation/advanced-tips-and-tricks-9638/adding-backboards-9729/"
                    text="Get Help"
                  />
                  <Button onClick={openCreate} variant="primary">
                    Add Backboard
                  </Button>
                </InlineStack>
              </InlineStack>
            </Box>
          </Card>

          <Card>
            <Box padding="300">
              {backboardsState.length === 0 ? (
                <Box paddingBlock="800">
                  <div style={{ display: "grid", placeItems: "center", gap: 10 }}>
                    <Text as="p" variant="headingMd">
                      No backboard yet
                    </Text>
                    <Button onClick={openCreate} variant="primary">
                      Add first backboard
                    </Button>
                  </div>
                </Box>
              ) : (
                <div ref={tableWrapperRef}>
                  <IndexTable
                    resourceName={{ singular: "Backboard", plural: "Backboards" }}
                    itemCount={backboardsState.length}
                    selectable={false}
                    headings={[
                      { title: "" },
                      { title: "Label" },
                      { title: "Preview" },
                      { title: "Default", alignment: "center" },
                      { title: "Action", alignment: "center" },
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
                Backboard Section Settings
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
                  value={settings.description}
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
                  {editingIndex == null ? "Add Backboard" : "Edit Backboard"}
                </Text>
                <HelpLink
                  url="https://docs.signsdesigner.us/docs/ncpc-documentation/advanced-tips-and-tricks-9638/adding-backboards-9729/"
                  text="Get Help"
                />
              </InlineStack>
            </Box>
          </Card>

          <Card>
            <Box padding="300">
              <Text as="h3" variant="headingSm">
                1. Label and Description
              </Text>
              <Box paddingBlockStart="200" />
              <div style={{ display: "grid", gap: 10 }}>
                <TextField
                  label="Label"
                  autoComplete="off"
                  value={formData.label}
                  error={!formData.label.trim() ? "Label is required" : undefined}
                  onChange={(value) => setFormData((curr) => ({ ...curr, label: value }))}
                />
                <TextField
                  label="Description"
                  autoComplete="off"
                  value={formData.description}
                  onChange={(value) =>
                    setFormData((curr) => ({ ...curr, description: value }))
                  }
                />
              </div>
            </Box>
          </Card>

          <Card>
            <Box padding="300">
              <Text as="h3" variant="headingSm">
                2. Sign Backboard
              </Text>
              <Box paddingBlockStart="200" />
              <div style={{ display: "grid", gap: 12 }}>
                <Select
                  label="Backboard Type"
                  options={typeOptions}
                  value={formData.type}
                  onChange={(value) =>
                    setFormData((curr) => ({
                      ...curr,
                      type: value,
                    }))
                  }
                />

                {formData.type.includes("cut-to") ? (
                  <div style={{ display: "grid", gap: 10 }}>
                    <InlineStack gap="300" blockAlign="center" wrap={false}>
                      <Text as="span" variant="bodyMd">
                        Activate layers
                      </Text>
                      <ToggleButton
                        id="backboard-layers-activate"
                        type="checkbox"
                        checked={Boolean(formData.backboardLength.layers.activate)}
                        onChange={(checked) =>
                          setFormData((curr) => ({
                            ...curr,
                            backboardLength: {
                              ...curr.backboardLength,
                              layers: {
                                ...curr.backboardLength.layers,
                                activate: Boolean(checked),
                              },
                            },
                          }))
                        }
                      />
                    </InlineStack>

                    {!formData.backboardLength.layers.activate ? (
                      <div style={{ maxWidth: 260 }}>
                        <TextField
                          label="Backboard length"
                          type="number"
                          autoComplete="off"
                          suffix="px"
                          value={String(toNumber(formData.backboardLength.shapeLength, 8))}
                          onChange={(value) =>
                            setFormData((curr) => ({
                              ...curr,
                              backboardLength: {
                                ...curr.backboardLength,
                                shapeLength: toNumber(value, 8),
                              },
                            }))
                          }
                        />
                      </div>
                    ) : (
                      <div style={{ display: "grid", gap: 10 }}>
                        {formData.backboardLength.layers.options.map((layer, index) => (
                          <Box
                            key={`layer-${index}`}
                            borderWidth="025"
                            borderColor="border-secondary"
                            borderRadius="200"
                            padding="300"
                          >
                            <div style={{ display: "grid", gap: 10 }}>
                              <InlineStack align="space-between" blockAlign="center">
                                <Text as="h4" variant="headingSm">
                                  Layer {index + 1}
                                </Text>
                                <InlineStack gap="200">
                                  {formData.backboardLength.layers.options.length > 1 ? (
                                    <Button
                                      tone="critical"
                                      variant="plain"
                                      onClick={() => removeLayer(index)}
                                    >
                                      Remove
                                    </Button>
                                  ) : null}
                                  {index === formData.backboardLength.layers.options.length - 1 ? (
                                    <Button variant="plain" onClick={addLayer}>
                                      Add Layer
                                    </Button>
                                  ) : null}
                                </InlineStack>
                              </InlineStack>

                              <TextField
                                label="Layer Label"
                                autoComplete="off"
                                value={layer.label}
                                error={
                                  layerLabelErrors.includes(index)
                                    ? "Layer label is required"
                                    : undefined
                                }
                                onChange={(value) =>
                                  setFormData((curr) => {
                                    const nextLayers = [...curr.backboardLength.layers.options];
                                    nextLayers[index] = { ...nextLayers[index], label: value };
                                    return {
                                      ...curr,
                                      backboardLength: {
                                        ...curr.backboardLength,
                                        layers: {
                                          ...curr.backboardLength.layers,
                                          options: nextLayers,
                                        },
                                      },
                                    };
                                  })
                                }
                              />
                              <TextField
                                label="Layer Description"
                                autoComplete="off"
                                value={layer.description}
                                onChange={(value) =>
                                  setFormData((curr) => {
                                    const nextLayers = [...curr.backboardLength.layers.options];
                                    nextLayers[index] = {
                                      ...nextLayers[index],
                                      description: value,
                                    };
                                    return {
                                      ...curr,
                                      backboardLength: {
                                        ...curr.backboardLength,
                                        layers: {
                                          ...curr.backboardLength.layers,
                                          options: nextLayers,
                                        },
                                      },
                                    };
                                  })
                                }
                              />
                              <TextField
                                label="Layer Length"
                                type="number"
                                autoComplete="off"
                                suffix="px"
                                value={String(toNumber(layer.length, 8))}
                                error={
                                  layerLengthErrors.includes(index)
                                    ? "Length must be greater than previous layer"
                                    : undefined
                                }
                                onChange={(value) =>
                                  setFormData((curr) => {
                                    const nextLayers = [...curr.backboardLength.layers.options];
                                    nextLayers[index] = {
                                      ...nextLayers[index],
                                      length: toNumber(value, 8),
                                    };
                                    return {
                                      ...curr,
                                      backboardLength: {
                                        ...curr.backboardLength,
                                        layers: {
                                          ...curr.backboardLength.layers,
                                          options: nextLayers,
                                        },
                                      },
                                    };
                                  })
                                }
                              />
                            </div>
                          </Box>
                        ))}
                      </div>
                    )}
                  </div>
                ) : null}
              </div>
            </Box>
          </Card>

          {formData.type === "custom-shape" ? (
            <Card>
              <Box padding="300">
                <Text as="h3" variant="headingSm">
                  3. Custom Shape File
                </Text>
                <Box paddingBlockStart="200" />
                <div style={{ maxWidth: 360 }}>
                  <FileInput
                    title="Custom Shape (SVG)"
                    type="icon"
                    path={String(formData.customShapeFile || "")}
                    handlePath={(value: string) =>
                      setFormData((curr) => ({ ...curr, customShapeFile: value }))
                    }
                    helperText="Upload an SVG file used for custom-shape backboards."
                  />
                </div>
              </Box>
            </Card>
          ) : null}

          <Card>
            <Box padding="300">
              <Text as="h3" variant="headingSm">
                {formData.type === "custom-shape" ? "4. Images" : "3. Images"}
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
                title={formData.type === "custom-shape" ? "5. Additional Price" : "4. Additional Price"}
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
                  disabled={!formData.label.trim() || hasBlockingErrors}
                  onClick={saveBackboard}
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

  if (operation === "add-backboard" || operation === "update-backboard") {
    const rawBackboard = parseJsonValue(formData.get("backboard"));
    const normalized = normalizeBackboardItem(rawBackboard);

    if (!normalized.label.trim()) {
      return json({ ...jFlashMessage("Backboard label is required", "error") }, { status: 400 });
    }

    const layerLabelErrors = getLayerLabelErrors(normalized);
    const layerLengthErrors = getLayerLengthErrors(normalized);
    if (layerLabelErrors.length > 0 || layerLengthErrors.length > 0) {
      return json(
        { ...jFlashMessage("Invalid cut-to layers configuration", "error") },
        { status: 400 },
      );
    }

    await NcpcConfigurationService.mutateNcpc(configId, session.id, (draft) => {
      const container = getBackboardContainer((draft as any)?.additionalOptions?.backboardOptions);
      let backboards = [...container.backboards];

      if (operation === "add-backboard") {
        if (backboards.length === 0) {
          normalized.isDefault = true;
          normalized.default = true;
        }
        backboards.push(normalized);
      } else if (index >= 0 && backboards[index]) {
        backboards[index] = normalized;
      }

      const preferredIndex =
        normalized.isDefault || normalized.default
          ? operation === "add-backboard"
            ? backboards.length - 1
            : index
          : undefined;

      backboards = ensureOneDefault(backboards, preferredIndex);
      setBackboardContainer(draft, {
        ...container,
        backboards,
      });
    });

    return json({
      ...jFlashMessage(
        operation === "add-backboard"
          ? "Backboard added successfully"
          : "Backboard updated successfully",
      ),
    });
  }

  if (operation === "delete-backboard") {
    if (index < 0) {
      return json({ ...jFlashMessage("Invalid backboard index", "error") }, { status: 400 });
    }

    await NcpcConfigurationService.mutateNcpc(configId, session.id, (draft) => {
      const container = getBackboardContainer((draft as any)?.additionalOptions?.backboardOptions);
      const backboards = ensureOneDefault(
        container.backboards.filter(
          (_row: BackboardItem, rowIndex: number) => rowIndex !== index,
        ),
      );
      setBackboardContainer(draft, {
        ...container,
        backboards,
      });
    });

    return json({ ...jFlashMessage("Backboard deleted successfully") });
  }

  if (operation === "set-default-backboard") {
    if (index < 0) {
      return json({ ...jFlashMessage("Invalid backboard index", "error") }, { status: 400 });
    }

    await NcpcConfigurationService.mutateNcpc(configId, session.id, (draft) => {
      const container = getBackboardContainer((draft as any)?.additionalOptions?.backboardOptions);
      const backboards = ensureOneDefault(container.backboards, index);
      setBackboardContainer(draft, {
        ...container,
        backboards,
      });
    });

    return json({ ...jFlashMessage("Default backboard updated successfully") });
  }

  if (operation === "reorder-backboards") {
    const rawBackboards = parseJsonValue(formData.get("backboards"));
    if (!Array.isArray(rawBackboards)) {
      return json({ ...jFlashMessage("Invalid reorder payload", "error") }, { status: 400 });
    }

    await NcpcConfigurationService.mutateNcpc(configId, session.id, (draft) => {
      const container = getBackboardContainer((draft as any)?.additionalOptions?.backboardOptions);
      const backboards = ensureOneDefault(rawBackboards.map(normalizeBackboardItem));
      setBackboardContainer(draft, {
        ...container,
        backboards,
      });
    });

    return json({ ...jFlashMessage("Backboards order updated successfully") });
  }

  if (operation === "save-backboard-settings") {
    const settings = parseJsonValue(formData.get("settings"));
    if (!settings || typeof settings !== "object") {
      return json({ ...jFlashMessage("Invalid settings payload", "error") }, { status: 400 });
    }

    await NcpcConfigurationService.mutateNcpc(configId, session.id, (draft) => {
      const container = getBackboardContainer((draft as any)?.additionalOptions?.backboardOptions);
      setBackboardContainer(draft, {
        ...container,
        label: String((settings as any)?.label || "Backboard"),
        description: String((settings as any)?.description || ""),
      });
    });

    return json({ ...jFlashMessage("Backboard settings updated successfully") });
  }

  return json({ ...jFlashMessage("Invalid operation", "error") }, { status: 400 });
};
