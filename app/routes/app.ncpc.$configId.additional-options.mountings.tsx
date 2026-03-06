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
import SelectCombobox from "~/components/inputs/SelectCombobox";
import { FileInput } from "~/components/inputs/FileInput";
import NcpcRowActions from "~/components/ncpc/NcpcRowActions";
import useHandleFlashMessage from "~/hooks/useHandleFlashMessage";
import NcpcConfigurationService from "~/models/NcpcConfiguration.service";
import { authenticate } from "~/shopify.server";
import type { NcpcRouteContext } from "~/types/NcpcRouteContext";
import { jFlashMessage } from "~/utils/message-flash";
import { truncateText } from "~/utils/truncate-text";

type MountingPriceType = "none" | "base" | "multiplier";

type MountingItem = {
  label: string;
  description: string;
  previewImg: string;
  popupImg: string;
  isDefault: boolean;
  default?: boolean;
  visualisation: string;
  excludedBackboards: Array<number | string>;
  excludedColors: Array<number | string>;
  excludedLetterTypeTextures: Array<number | string>;
  price: {
    type: MountingPriceType;
    value: number;
  };
};

type MountingSettings = {
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

const normalizePriceType = (value: unknown): MountingPriceType => {
  const normalized = String(value || "").trim().toLowerCase();
  if (normalized === "base" || normalized === "multiplier") return normalized;
  return "none";
};

const toNumber = (value: unknown, fallback = 0) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const toArray = (value: unknown) => (Array.isArray(value) ? value : []);
const normalizeIndexArray = (values: unknown[]) =>
  values.map((entry) => {
    if (typeof entry === "string" && entry.includes("/")) return entry;
    const parsed = Number(entry);
    return Number.isFinite(parsed) ? parsed : entry;
  });

const normalizeMountingItem = (item: any): MountingItem => ({
  label: String(item?.label || item?.title || "").trim(),
  description: String(item?.description || ""),
  previewImg: String(item?.previewImg || item?.icon || ""),
  popupImg: String(item?.popupImg || item?.popImg || ""),
  isDefault: Boolean(item?.isDefault ?? item?.default),
  default: Boolean(item?.isDefault ?? item?.default),
  visualisation: String(item?.visualisation || "none"),
  excludedBackboards: normalizeIndexArray(toArray(item?.excludedBackboards)),
  excludedColors: normalizeIndexArray(toArray(item?.excludedColors)),
  excludedLetterTypeTextures: toArray(item?.excludedLetterTypeTextures),
  price: {
    type: normalizePriceType(item?.price?.type),
    value: toNumber(item?.price?.value, 0),
  },
});

const emptyMounting = (): MountingItem => ({
  label: "",
  description: "",
  previewImg: "",
  popupImg: "",
  isDefault: false,
  default: false,
  visualisation: "none",
  excludedBackboards: [],
  excludedColors: [],
  excludedLetterTypeTextures: [],
  price: {
    type: "none",
    value: 0,
  },
});

const getMountingContainer = (rawMountingOptions: any) => {
  if (Array.isArray(rawMountingOptions)) {
    return {
      label: "Mountings",
      description: "",
      mountings: rawMountingOptions.map(normalizeMountingItem),
    };
  }

  if (rawMountingOptions && typeof rawMountingOptions === "object") {
    const mountings = Array.isArray(rawMountingOptions.mountings)
      ? rawMountingOptions.mountings
      : [];

    return {
      label: String(rawMountingOptions.label || "Mountings"),
      description: String(rawMountingOptions.description || ""),
      mountings: mountings.map(normalizeMountingItem),
    };
  }

  return {
    label: "Mountings",
    description: "",
    mountings: [],
  };
};

const setMountingContainer = (draft: any, container: any) => {
  const next = {
    label: String(container?.label || "Mountings"),
    description: String(container?.description || ""),
    mountings: Array.isArray(container?.mountings)
      ? container.mountings.map(normalizeMountingItem)
      : [],
  };

  draft.additionalOptions.mountingOptions = next;
};

const VISUALISATION_OPTIONS: Array<{ value: string; label: string }> = [
  { value: "none", label: "None" },
  { value: "screw", label: "Screw" },
  { value: "screw-cap", label: "Screw Cap" },
  { value: "flag", label: "Flag" },
  { value: "hanging", label: "Hanging" },
  { value: "key-ring", label: "Key Ring" },
];

const visualPreview = (type: string) => {
  const base = {
    width: 48,
    height: 48,
    borderRadius: 8,
    border: "1px solid #d1d5db",
    background: "#f8fafc",
    position: "relative",
  };

  if (type === "none") return <div style={base} />;

  if (type === "screw") {
    return (
      <div style={base}>
        {["6px 6px", "30px 6px", "6px 30px", "30px 30px"].map((pos) => (
          <span
            key={pos}
            style={{
              position: "absolute",
              left: pos.split(" ")[0],
              top: pos.split(" ")[1],
              width: 10,
              height: 10,
              borderRadius: "999px",
              background: "#94a3b8",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#111827",
              fontSize: 9,
            }}
          >
            +
          </span>
        ))}
      </div>
    );
  }

  if (type === "screw-cap") {
    return (
      <div style={base}>
        {["6px 6px", "30px 6px", "6px 30px", "30px 30px"].map((pos) => (
          <span
            key={pos}
            style={{
              position: "absolute",
              left: pos.split(" ")[0],
              top: pos.split(" ")[1],
              width: 10,
              height: 10,
              borderRadius: "999px",
              background: "radial-gradient(circle, #fff 0%, #9ca3af 45%, #e5e7eb 100%)",
            }}
          />
        ))}
      </div>
    );
  }

  if (type === "flag") {
    return (
      <div style={base}>
        <span style={{ position: "absolute", left: -8, top: 14, width: 14, height: 4, background: "#cbd5e1" }} />
        <span style={{ position: "absolute", left: -8, top: 26, width: 14, height: 4, background: "#cbd5e1" }} />
      </div>
    );
  }

  if (type === "hanging") {
    return (
      <div style={base}>
        <span style={{ position: "absolute", left: 7, top: 4, width: 8, height: 8, borderRadius: "999px", background: "#cbd5e1" }} />
        <span style={{ position: "absolute", right: 7, top: 4, width: 8, height: 8, borderRadius: "999px", background: "#cbd5e1" }} />
      </div>
    );
  }

  return (
    <div style={base}>
      <span style={{ position: "absolute", left: 6, top: 6, width: 10, height: 10, borderRadius: "999px", background: "#cbd5e1" }} />
    </div>
  );
};

export default function NcpcAdditionalMountings() {
  const submit = useSubmit();
  const navigation = useNavigation();
  const { ncpcData, productType } = useOutletContext<NcpcRouteContext>();
  const currencySymbol = (ncpcData as any)?.settings?.currencySymbol || "$";
  useHandleFlashMessage();

  const isSubmitting = navigation.state === "submitting";
  const mountingContainer = getMountingContainer(ncpcData.additionalOptions?.mountingOptions);

  const [settings, setSettings] = useState<MountingSettings>({
    label: mountingContainer.label,
    description: mountingContainer.description,
  });
  const [editorOpen, setEditorOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [formData, setFormData] = useState<MountingItem>(emptyMounting());
  const [mountingsState, setMountingsState] = useState<MountingItem[]>(mountingContainer.mountings);

  const sortableRef = useRef<Sortable | null>(null);
  const tableWrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const latest = getMountingContainer(ncpcData.additionalOptions?.mountingOptions);
    setSettings({
      label: latest.label,
      description: latest.description,
    });
    setMountingsState(latest.mountings);
  }, [JSON.stringify(ncpcData.additionalOptions?.mountingOptions)]);

  useEffect(() => {
    if (!tableWrapperRef.current || editorOpen || mountingsState.length <= 1) return;

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

        setMountingsState((curr) => {
          const next = [...curr];
          const [moved] = next.splice(oldIndex, 1);
          next.splice(newIndex, 0, moved);

          submit(
            {
              operation: "reorder-mountings",
              mountings: JSON.stringify(next),
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
  }, [editorOpen, mountingsState.length, submit]);

  const backboardOptions = useMemo(() => {
    const raw = ncpcData.additionalOptions?.backboardOptions;
    const items = Array.isArray(raw) ? raw : Array.isArray(raw?.backboards) ? raw.backboards : [];

    return items.map((entry: any, index: number) => ({
      label: String(entry?.label || `Backboard ${index + 1}`),
      value: String(index),
    }));
  }, [ncpcData.additionalOptions?.backboardOptions]);

  const neonColorOptions = useMemo(() => {
    const raw = ncpcData.requiredOptions?.colorOptions;
    const items = Array.isArray(raw?.colors) ? raw.colors : Array.isArray(raw?.allColors) ? raw.allColors : [];
    return items.map((entry: any, index: number) => ({
      label: String(entry?.label || entry?.name || `Color ${index + 1}`),
      value: String(index),
    }));
  }, [ncpcData.requiredOptions?.colorOptions]);

  const letterTypeTextureOptions = useMemo(() => {
    const letterTypes = Array.isArray((ncpcData as any)?.requiredOptions?.letterTypesOptions?.letterTypes)
      ? (ncpcData as any).requiredOptions.letterTypesOptions.letterTypes
      : [];

    return letterTypes.flatMap((letterType: any, letterTypeIndex: number) => {
      const parts = Array.isArray(letterType?.letterParts) ? letterType.letterParts : [];
      return parts.flatMap((part: any, partIndex: number) => {
        if (!part?.activate) return [];
        const colors = Array.isArray(part?.colors) ? part.colors : [];
        return colors.map((color: any, colorIndex: number) => ({
          label: `${String(letterType?.label || "Letter Type")} / ${String(part?.label || "Part")} / ${String(color?.label || "Color")}`,
          value: `${letterTypeIndex}/${partIndex}/${colorIndex}`,
        }));
      });
    });
  }, [JSON.stringify((ncpcData as any)?.requiredOptions?.letterTypesOptions?.letterTypes || [])]);

  const openCreate = () => {
    setEditingIndex(null);
    setFormData(emptyMounting());
    setEditorOpen(true);
  };

  const openEdit = (index: number) => {
    setEditingIndex(index);
    setFormData(normalizeMountingItem(mountingsState[index]));
    setEditorOpen(true);
  };

  const closeEditor = () => {
    if (isSubmitting) return;
    setEditingIndex(null);
    setFormData(emptyMounting());
    setEditorOpen(false);
  };

  const saveMounting = () => {
    if (!formData.label.trim()) {
      return;
    }

    const operation = editingIndex == null ? "add-mounting" : "update-mounting";
    const payload: Record<string, string> = {
      operation,
      mounting: JSON.stringify(formData),
    };

    if (editingIndex != null) {
      payload.index = String(editingIndex);
    }

    submit(payload, { method: "POST" });
    setEditorOpen(false);
  };

  const deleteMounting = (index: number) => {
    submit(
      {
        operation: "delete-mounting",
        index: String(index),
      },
      { method: "POST" },
    );
  };

  const setDefaultMounting = (index: number) => {
    submit(
      {
        operation: "set-default-mounting",
        index: String(index),
      },
      { method: "POST" },
    );
  };

  const saveSettings = () => {
    submit(
      {
        operation: "save-mounting-settings",
        settings: JSON.stringify(settings),
      },
      { method: "POST" },
    );
  };

  const updateArrayField =
    (field: "excludedBackboards" | "excludedColors" | "excludedLetterTypeTextures") =>
    (nextState: React.SetStateAction<any[]>) => {
      setFormData((curr) => ({
        ...curr,
        [field]:
          typeof nextState === "function"
            ? nextState((curr[field] || []) as any[])
            : nextState,
      }));
    };

  const rows = mountingsState.map((mounting, index) => (
    <IndexTable.Row id={`${index}`} key={`${index}`} position={index}>
      <IndexTable.Cell>
        <span className="drag-handle" style={{ cursor: "grab", display: "inline-flex" }}>
          <Icon source={DragHandleIcon} />
        </span>
      </IndexTable.Cell>
      <IndexTable.Cell>
        <InlineStack gap="200" blockAlign="center" wrap={false}>
          <Text as="span" variant="bodyMd" fontWeight="semibold">
            {truncateText(String(mounting.label || `Mounting ${index + 1}`), 28)}
          </Text>
          <Badge tone="info">{mounting.visualisation || "none"}</Badge>
        </InlineStack>
      </IndexTable.Cell>
      <IndexTable.Cell className="td-center">
        <ToggleButton
          id={`mounting-default-${index}`}
          type="radio"
          name="mountingDefault"
          value="true"
          checked={Boolean(mounting.isDefault || mounting.default)}
          onChange={() => setDefaultMounting(index)}
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
              onAction: () => deleteMounting(index),
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
                    Mountings
                  </Text>
                  <Text as="p" tone="subdued">
                    Manage mounting options and default behavior.
                  </Text>
                </div>
                <InlineStack gap="200" align="end">
                  <HelpLink
                    url="https://docs.signsdesigner.us/docs/ncpc-documentation/advanced-tips-and-tricks-9638/adding-mounting-options-9733/"
                    text="Get Help"
                  />
                  <Button onClick={openCreate} variant="primary">
                    Add Mounting
                  </Button>
                </InlineStack>
              </InlineStack>
            </Box>
          </Card>

          <Card>
            <Box padding="300">
              {mountingsState.length === 0 ? (
                <Box paddingBlock="800">
                  <div style={{ display: "grid", placeItems: "center", gap: 10 }}>
                    <Text as="p" variant="headingMd">
                      No mounting option yet
                    </Text>
                    <Button onClick={openCreate} variant="primary">
                      Add first mounting
                    </Button>
                  </div>
                </Box>
              ) : (
                <div ref={tableWrapperRef}>
                  <IndexTable
                    resourceName={{ singular: "Mounting", plural: "Mountings" }}
                    itemCount={mountingsState.length}
                    selectable={false}
                    headings={[
                      { title: "" },
                      { title: "Label" },
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
                Mounting Section Settings
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
                <Button onClick={saveSettings} variant="primary" loading={isSubmitting}>
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
                  {editingIndex == null ? "Add Mounting" : "Edit Mounting"}
                </Text>
                <HelpLink
                  url="https://docs.signsdesigner.us/docs/ncpc-documentation/advanced-tips-and-tricks-9638/adding-mounting-options-9733/"
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
                  onChange={(value) => setFormData((curr) => ({ ...curr, description: value }))}
                />
              </div>
            </Box>
          </Card>

          <Card>
            <Box padding="300">
              <Text as="h3" variant="headingSm">
                2. Visualisation
              </Text>
              <Text as="p" tone="subdued">
                Choose how this mounting appears in the configurator preview.
              </Text>
              <Box paddingBlockStart="200" />
              <InlineStack gap="200" wrap>
                {VISUALISATION_OPTIONS.map((entry) => {
                  const selected = formData.visualisation === entry.value;
                  return (
                    <button
                      key={entry.value}
                      type="button"
                      onClick={() => setFormData((curr) => ({ ...curr, visualisation: entry.value }))}
                      style={{
                        border: selected ? "2px solid #2563eb" : "1px solid #d1d5db",
                        borderRadius: 10,
                        padding: "10px",
                        background: "#ffffff",
                        minWidth: 96,
                        cursor: "pointer",
                      }}
                    >
                      <div style={{ display: "grid", gap: 8, placeItems: "center" }}>
                        {visualPreview(entry.value)}
                        <Text as="span" variant="bodySm">
                          {entry.label}
                        </Text>
                      </div>
                    </button>
                  );
                })}
              </InlineStack>
            </Box>
          </Card>

          <Card>
            <Box padding="300">
              <Text as="h3" variant="headingSm">
                3. Exclusions
              </Text>
              <Box paddingBlockStart="200" />
              <div style={{ display: "grid", gap: 10 }}>
                {productType === "neon" ? (
                  <SelectCombobox
                    label="Excluded Colors"
                    placeholder="Select colors"
                    data={neonColorOptions}
                    selectedOptions={formData.excludedColors.map(String)}
                    setSelectedOptions={updateArrayField("excludedColors")}
                  />
                ) : (
                  <SelectCombobox
                    label="Excluded Letter Type Textures"
                    placeholder="Select textures"
                    data={letterTypeTextureOptions}
                    selectedOptions={formData.excludedLetterTypeTextures.map(String)}
                    setSelectedOptions={updateArrayField("excludedLetterTypeTextures")}
                  />
                )}

                <SelectCombobox
                  label="Excluded Backboards"
                  placeholder="Select backboards"
                  data={backboardOptions}
                  selectedOptions={formData.excludedBackboards.map(String)}
                  setSelectedOptions={updateArrayField("excludedBackboards")}
                />
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
                  onClick={saveMounting}
                  variant="primary"
                  loading={isSubmitting}
                  disabled={!formData.label.trim()}
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

  if (request.method !== "POST") {
    return null;
  }

  const configId = parseInt(params.configId || "", 10);
  if (Number.isNaN(configId)) {
    return json({ ...jFlashMessage("Invalid configuration", "error") }, { status: 400 });
  }

  const formData = await request.formData();
  const operation = String(formData.get("operation") || "");
  const index = parseIndex(formData.get("index"));

  if (operation === "add-mounting" || operation === "update-mounting") {
    const mounting = parseJsonValue(formData.get("mounting"));
    const normalized = normalizeMountingItem(mounting);

    if (!normalized.label.trim()) {
      return json({ ...jFlashMessage("Mounting label is required", "error") }, { status: 400 });
    }

    await NcpcConfigurationService.mutateNcpc(configId, session.id, (draft) => {
      const container = getMountingContainer((draft as any)?.additionalOptions?.mountingOptions);
      const mountings = [...container.mountings];

      if (operation === "add-mounting") {
        if (mountings.length === 0) {
          normalized.isDefault = true;
          normalized.default = true;
        }
        mountings.push(normalized);
      } else if (index >= 0 && mountings[index]) {
        mountings[index] = normalized;
      }

      if (normalized.isDefault || normalized.default) {
        for (let i = 0; i < mountings.length; i += 1) {
          mountings[i].isDefault = i === (operation === "add-mounting" ? mountings.length - 1 : index);
          mountings[i].default = mountings[i].isDefault;
        }
      }

      setMountingContainer(draft, {
        ...container,
        mountings,
      });
    });

    return json({
      ...jFlashMessage(
        operation === "add-mounting"
          ? "Mounting added successfully"
          : "Mounting updated successfully",
      ),
    });
  }

  if (operation === "delete-mounting") {
    if (index < 0) {
      return json({ ...jFlashMessage("Invalid mounting index", "error") }, { status: 400 });
    }

    await NcpcConfigurationService.mutateNcpc(configId, session.id, (draft) => {
      const container = getMountingContainer((draft as any)?.additionalOptions?.mountingOptions);
      const mountings = container.mountings.filter(
        (_item: MountingItem, itemIndex: number) => itemIndex !== index,
      );

      if (mountings.length > 0 && !mountings.some((item) => item.isDefault || item.default)) {
        mountings[0].isDefault = true;
        mountings[0].default = true;
      }

      setMountingContainer(draft, {
        ...container,
        mountings,
      });
    });

    return json({ ...jFlashMessage("Mounting deleted successfully") });
  }

  if (operation === "set-default-mounting") {
    if (index < 0) {
      return json({ ...jFlashMessage("Invalid mounting index", "error") }, { status: 400 });
    }

    await NcpcConfigurationService.mutateNcpc(configId, session.id, (draft) => {
      const container = getMountingContainer((draft as any)?.additionalOptions?.mountingOptions);
      const mountings = container.mountings.map((item: MountingItem, itemIndex: number) => ({
        ...item,
        isDefault: itemIndex === index,
        default: itemIndex === index,
      }));

      setMountingContainer(draft, {
        ...container,
        mountings,
      });
    });

    return json({ ...jFlashMessage("Default mounting updated successfully") });
  }

  if (operation === "reorder-mountings") {
    const mountings = parseJsonValue(formData.get("mountings"));
    if (!Array.isArray(mountings)) {
      return json({ ...jFlashMessage("Invalid reorder payload", "error") }, { status: 400 });
    }

    await NcpcConfigurationService.mutateNcpc(configId, session.id, (draft) => {
      const container = getMountingContainer((draft as any)?.additionalOptions?.mountingOptions);
      setMountingContainer(draft, {
        ...container,
        mountings: mountings.map(normalizeMountingItem),
      });
    });

    return json({ ...jFlashMessage("Mountings order updated successfully") });
  }

  if (operation === "save-mounting-settings") {
    const settings = parseJsonValue(formData.get("settings"));
    if (!settings || typeof settings !== "object") {
      return json({ ...jFlashMessage("Invalid settings payload", "error") }, { status: 400 });
    }

    await NcpcConfigurationService.mutateNcpc(configId, session.id, (draft) => {
      const container = getMountingContainer((draft as any)?.additionalOptions?.mountingOptions);
      setMountingContainer(draft, {
        ...container,
        label: String((settings as any)?.label || "Mountings"),
        description: String((settings as any)?.description || ""),
      });
    });

    return json({ ...jFlashMessage("Mounting settings updated successfully") });
  }

  return json({ ...jFlashMessage("Invalid operation", "error") }, { status: 400 });
};
