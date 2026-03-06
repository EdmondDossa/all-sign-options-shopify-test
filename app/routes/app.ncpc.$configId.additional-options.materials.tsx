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
import SelectCombobox from "~/components/inputs/SelectCombobox";
import NcpcRowActions from "~/components/ncpc/NcpcRowActions";
import useHandleFlashMessage from "~/hooks/useHandleFlashMessage";
import NcpcConfigurationService from "~/models/NcpcConfiguration.service";
import { authenticate } from "~/shopify.server";
import type { NcpcRouteContext } from "~/types/NcpcRouteContext";
import { fileUrl } from "~/utils/fileUrl";
import { jFlashMessage } from "~/utils/message-flash";
import { truncateText } from "~/utils/truncate-text";

type MaterialPriceType = "none" | "base" | "multiplier";

type MaterialItem = {
  label: string;
  description: string;
  isDefault: boolean;
  default?: boolean;
  excludedBackboards: Array<number | string>;
  excludedMountings: Array<number | string>;
  popupImg: string;
  previewImg: string;
  price: {
    type: MaterialPriceType;
    value: number;
  };
};

type MaterialSettings = {
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
const normalizeIndexArray = (values: unknown[]) =>
  values.map((entry) => {
    const parsed = Number(entry);
    return Number.isFinite(parsed) ? parsed : String(entry);
  });

const normalizePriceType = (value: unknown): MaterialPriceType => {
  const normalized = String(value || "").trim().toLowerCase();
  if (normalized === "base" || normalized === "multiplier") return normalized;
  return "none";
};

const normalizeMaterialItem = (item: any): MaterialItem => {
  const fallbackPrice = toNumber(item?.additionalPrice, 0);
  const typeFromFallback: MaterialPriceType = fallbackPrice > 0 ? "base" : "none";
  const excludedBackboards = normalizeIndexArray(toArray(item?.excludedBackboards));
  const excludedMountings = normalizeIndexArray(toArray(item?.excludedMountings));

  return {
    label: String(item?.label || item?.title || "").trim(),
    description: String(item?.description || ""),
    isDefault: Boolean(item?.isDefault ?? item?.default),
    default: Boolean(item?.isDefault ?? item?.default),
    excludedBackboards,
    excludedMountings,
    popupImg: String(item?.popupImg || item?.popImg || ""),
    previewImg: String(item?.previewImg || item?.icon || ""),
    price: {
      type:
        item?.price && typeof item.price === "object"
          ? normalizePriceType(item.price.type)
          : typeFromFallback,
      value:
        item?.price && typeof item.price === "object"
          ? toNumber(item.price.value, 0)
          : fallbackPrice,
    },
  };
};

const emptyMaterial = (): MaterialItem => ({
  label: "",
  description: "",
  isDefault: false,
  default: false,
  excludedBackboards: [],
  excludedMountings: [],
  popupImg: "",
  previewImg: "",
  price: {
    type: "none",
    value: 0,
  },
});

const ensureOneDefault = (rows: MaterialItem[], preferredIndex?: number) => {
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

const getMaterialContainer = (rawMaterialOptions: any) => {
  if (Array.isArray(rawMaterialOptions)) {
    return {
      label: "Material",
      description: "",
      materials: ensureOneDefault(rawMaterialOptions.map(normalizeMaterialItem)),
    };
  }

  if (rawMaterialOptions && typeof rawMaterialOptions === "object") {
    const list = Array.isArray(rawMaterialOptions.materials)
      ? rawMaterialOptions.materials
      : [];
    return {
      label: String(rawMaterialOptions.label || "Material"),
      description: String(rawMaterialOptions.description || ""),
      materials: ensureOneDefault(list.map(normalizeMaterialItem)),
    };
  }

  return {
    label: "Material",
    description: "",
    materials: [],
  };
};

const setMaterialContainer = (draft: any, container: any) => {
  draft.additionalOptions.materialOptions = {
    label: String(container?.label || "Material"),
    description: String(container?.description || ""),
    materials: Array.isArray(container?.materials)
      ? ensureOneDefault(container.materials.map(normalizeMaterialItem))
      : [],
  };
};

export default function NcpcAdditionalMaterials() {
  const submit = useSubmit();
  const navigation = useNavigation();
  const { ncpcData, productType } = useOutletContext<NcpcRouteContext>();
  const currencySymbol = (ncpcData as any)?.settings?.currencySymbol || "$";
  useHandleFlashMessage();

  const isSubmitting = navigation.state === "submitting";
  const container = getMaterialContainer(ncpcData.additionalOptions?.materialOptions);

  const [settings, setSettings] = useState<MaterialSettings>({
    label: container.label,
    description: container.description,
  });
  const [editorOpen, setEditorOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [formData, setFormData] = useState<MaterialItem>(emptyMaterial());
  const [materialsState, setMaterialsState] = useState<MaterialItem[]>(container.materials);

  const sortableRef = useRef<Sortable | null>(null);
  const tableWrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const latest = getMaterialContainer(ncpcData.additionalOptions?.materialOptions);
    setSettings({
      label: latest.label,
      description: latest.description,
    });
    setMaterialsState(latest.materials);
  }, [JSON.stringify(ncpcData.additionalOptions?.materialOptions)]);

  useEffect(() => {
    if (!tableWrapperRef.current || editorOpen || materialsState.length <= 1) return;

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

        setMaterialsState((curr) => {
          const next = [...curr];
          const [moved] = next.splice(oldIndex, 1);
          next.splice(newIndex, 0, moved);

          submit(
            {
              operation: "reorder-materials",
              materials: JSON.stringify(next),
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
  }, [editorOpen, materialsState.length, submit]);

  const backboardOptions = useMemo(() => {
    const raw = ncpcData.additionalOptions?.backboardOptions;
    const items = Array.isArray(raw)
      ? raw
      : Array.isArray(raw?.backboards)
        ? raw.backboards
        : [];

    return items.map((entry: any, index: number) => ({
      label: String(entry?.label || `Backboard ${index + 1}`),
      value: String(index),
    }));
  }, [ncpcData.additionalOptions?.backboardOptions]);

  const mountingOptions = useMemo(() => {
    const raw = ncpcData.additionalOptions?.mountingOptions;
    const items = Array.isArray(raw)
      ? raw
      : Array.isArray(raw?.mountings)
        ? raw.mountings
        : [];

    return items.map((entry: any, index: number) => ({
      label: String(entry?.label || `Mounting ${index + 1}`),
      value: String(index),
    }));
  }, [ncpcData.additionalOptions?.mountingOptions]);

  const openCreate = () => {
    setEditingIndex(null);
    setFormData(emptyMaterial());
    setEditorOpen(true);
  };

  const openEdit = (index: number) => {
    setEditingIndex(index);
    setFormData(normalizeMaterialItem(materialsState[index]));
    setEditorOpen(true);
  };

  const closeEditor = () => {
    if (isSubmitting) return;
    setEditingIndex(null);
    setFormData(emptyMaterial());
    setEditorOpen(false);
  };

  const saveMaterial = () => {
    if (!formData.label.trim()) return;

    const operation = editingIndex == null ? "add-material" : "update-material";
    const payload: Record<string, string> = {
      operation,
      material: JSON.stringify(formData),
    };
    if (editingIndex != null) payload.index = String(editingIndex);

    submit(payload, { method: "POST" });
    setEditorOpen(false);
  };

  const deleteMaterial = (index: number) => {
    submit(
      {
        operation: "delete-material",
        index: String(index),
      },
      { method: "POST" },
    );
  };

  const setDefaultMaterial = (index: number) => {
    submit(
      {
        operation: "set-default-material",
        index: String(index),
      },
      { method: "POST" },
    );
  };

  const saveSettings = () => {
    submit(
      {
        operation: "save-material-settings",
        settings: JSON.stringify(settings),
      },
      { method: "POST" },
    );
  };

  const updateArrayField =
    (field: "excludedBackboards" | "excludedMountings") =>
    (nextState: React.SetStateAction<any[]>) => {
      setFormData((curr) => {
        const nextValue =
          typeof nextState === "function"
            ? nextState((curr[field] || []) as any[])
            : nextState;
        return {
          ...curr,
          [field]: nextValue,
        };
      });
    };

  const rows = materialsState.map((material, index) => (
    <IndexTable.Row id={`${index}`} key={`${index}`} position={index}>
      <IndexTable.Cell>
        <span className="drag-handle" style={{ cursor: "grab", display: "inline-flex" }}>
          <Icon source={DragHandleIcon} />
        </span>
      </IndexTable.Cell>
      <IndexTable.Cell>
        <Text as="span" variant="bodyMd" fontWeight="semibold">
          {truncateText(String(material.label || `Material ${index + 1}`), 26)}
        </Text>
      </IndexTable.Cell>
      <IndexTable.Cell className="td-center">
        {material.popupImg ? (
          <img
            src={String(fileUrl(material.popupImg || "") || "")}
            alt=""
            style={{
              width: 52,
              height: 36,
              borderRadius: 6,
              objectFit: "cover",
              border: "1px solid #d1d5db",
            }}
          />
        ) : (
          <Text as="span" tone="subdued">
            No popup image
          </Text>
        )}
      </IndexTable.Cell>
      <IndexTable.Cell className="td-center">
        {material.price.type === "none"
          ? "none"
          : material.price.type === "base"
            ? `${currencySymbol}${material.price.value}`
            : `${material.price.value}%`}
      </IndexTable.Cell>
      <IndexTable.Cell className="td-center">
        <ToggleButton
          id={`default-material-${index}`}
          type="radio"
          name="defaultMaterial"
          value="true"
          checked={Boolean(material.isDefault || material.default)}
          onChange={() => setDefaultMaterial(index)}
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
              onAction: () => deleteMaterial(index),
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
            Materials are only available for Neon configurations.
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
                    Materials
                  </Text>
                  <Text as="p" tone="subdued">
                    Manage material options, images and additional pricing.
                  </Text>
                </div>
                <InlineStack gap="200" align="end">
                  <HelpLink
                    url="https://docs.signsdesigner.us/docs/ncpc-documentation/advanced-tips-and-tricks-9638/adding-materials-9748/"
                    text="Get Help"
                  />
                  <Button onClick={openCreate} variant="primary">
                    Add Material
                  </Button>
                </InlineStack>
              </InlineStack>
            </Box>
          </Card>

          <Card>
            <Box padding="300">
              {materialsState.length === 0 ? (
                <Box paddingBlock="800">
                  <div style={{ display: "grid", placeItems: "center", gap: 10 }}>
                    <Text as="p" variant="headingMd">
                      No material yet
                    </Text>
                    <Button onClick={openCreate} variant="primary">
                      Add first material
                    </Button>
                  </div>
                </Box>
              ) : (
                <div ref={tableWrapperRef}>
                  <IndexTable
                    resourceName={{ singular: "Material", plural: "Materials" }}
                    itemCount={materialsState.length}
                    selectable={false}
                    headings={[
                      { title: "" },
                      { title: "Label" },
                      { title: "Popup Image", alignment: "center" },
                      { title: "Additional Pricing", alignment: "center" },
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
                Material Section Settings
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
                  {editingIndex == null ? "Add Material" : "Edit Material"}
                </Text>
                <HelpLink
                  url="https://docs.signsdesigner.us/docs/ncpc-documentation/advanced-tips-and-tricks-9638/adding-materials-9748/"
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
                  value={formData.label}
                  autoComplete="off"
                  error={!formData.label.trim() ? "Label is required" : undefined}
                  onChange={(value) => setFormData((curr) => ({ ...curr, label: value }))}
                />
                <TextField
                  label="Description"
                  value={formData.description}
                  autoComplete="off"
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
                2. Images
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
              <Text as="h3" variant="headingSm">
                3. Exclusions
              </Text>
              <Text as="p" tone="subdued">
                Select where this material should not be available.
              </Text>
              <Box paddingBlockStart="200" />
              <div style={{ display: "grid", gap: 10 }}>
                <SelectCombobox
                  label="Backboard Exclusions"
                  placeholder="Search Backboards"
                  helpText="Select the backboards that this material will NOT be available for."
                  data={backboardOptions}
                  selectedOptions={formData.excludedBackboards.map(String)}
                  setSelectedOptions={updateArrayField("excludedBackboards")}
                />
                <SelectCombobox
                  label="Mounting Exclusions"
                  placeholder="Search Mountings"
                  helpText="Select the mountings that this material will NOT be available for."
                  data={mountingOptions}
                  selectedOptions={formData.excludedMountings.map(String)}
                  setSelectedOptions={updateArrayField("excludedMountings")}
                />
              </div>
            </Box>
          </Card>

          <Card>
            <Box padding="300">
              <AdditionalPriceField
                title="4. Additional Price"
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
                  onClick={saveMaterial}
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
      { ...jFlashMessage("Materials are only available for Neon configurations.", "error") },
      { status: 403 },
    );
  }

  const formData = await request.formData();
  const operation = String(formData.get("operation") || "");
  const index = parseIndex(formData.get("index"));

  if (operation === "add-material" || operation === "update-material") {
    const rawMaterial = parseJsonValue(formData.get("material"));
    const normalized = normalizeMaterialItem(rawMaterial);

    if (!normalized.label.trim()) {
      return json({ ...jFlashMessage("Material label is required", "error") }, { status: 400 });
    }

    await NcpcConfigurationService.mutateNcpc(configId, session.id, (draft) => {
      const container = getMaterialContainer((draft as any)?.additionalOptions?.materialOptions);
      let materials = [...container.materials];

      if (operation === "add-material") {
        if (materials.length === 0) {
          normalized.isDefault = true;
          normalized.default = true;
        }
        materials.push(normalized);
      } else if (index >= 0 && materials[index]) {
        materials[index] = normalized;
      }

      const preferredIndex =
        normalized.isDefault || normalized.default
          ? operation === "add-material"
            ? materials.length - 1
            : index
          : undefined;

      materials = ensureOneDefault(materials, preferredIndex);
      setMaterialContainer(draft, {
        ...container,
        materials,
      });
    });

    return json({
      ...jFlashMessage(
        operation === "add-material"
          ? "Material added successfully"
          : "Material updated successfully",
      ),
    });
  }

  if (operation === "delete-material") {
    if (index < 0) {
      return json({ ...jFlashMessage("Invalid material index", "error") }, { status: 400 });
    }

    await NcpcConfigurationService.mutateNcpc(configId, session.id, (draft) => {
      const container = getMaterialContainer((draft as any)?.additionalOptions?.materialOptions);
      const materials = ensureOneDefault(
        container.materials.filter(
          (_row: MaterialItem, rowIndex: number) => rowIndex !== index,
        ),
      );
      setMaterialContainer(draft, {
        ...container,
        materials,
      });
    });

    return json({ ...jFlashMessage("Material deleted successfully") });
  }

  if (operation === "set-default-material") {
    if (index < 0) {
      return json({ ...jFlashMessage("Invalid material index", "error") }, { status: 400 });
    }

    await NcpcConfigurationService.mutateNcpc(configId, session.id, (draft) => {
      const container = getMaterialContainer((draft as any)?.additionalOptions?.materialOptions);
      const materials = ensureOneDefault(container.materials, index);
      setMaterialContainer(draft, {
        ...container,
        materials,
      });
    });

    return json({ ...jFlashMessage("Default material updated successfully") });
  }

  if (operation === "reorder-materials") {
    const rawMaterials = parseJsonValue(formData.get("materials"));
    if (!Array.isArray(rawMaterials)) {
      return json({ ...jFlashMessage("Invalid reorder payload", "error") }, { status: 400 });
    }

    await NcpcConfigurationService.mutateNcpc(configId, session.id, (draft) => {
      const container = getMaterialContainer((draft as any)?.additionalOptions?.materialOptions);
      const materials = ensureOneDefault(rawMaterials.map(normalizeMaterialItem));
      setMaterialContainer(draft, {
        ...container,
        materials,
      });
    });

    return json({ ...jFlashMessage("Materials order updated successfully") });
  }

  if (operation === "save-material-settings") {
    const settings = parseJsonValue(formData.get("settings"));
    if (!settings || typeof settings !== "object") {
      return json({ ...jFlashMessage("Invalid settings payload", "error") }, { status: 400 });
    }

    await NcpcConfigurationService.mutateNcpc(configId, session.id, (draft) => {
      const container = getMaterialContainer((draft as any)?.additionalOptions?.materialOptions);
      setMaterialContainer(draft, {
        ...container,
        label: String((settings as any)?.label || "Material"),
        description: String((settings as any)?.description || ""),
      });
    });

    return json({ ...jFlashMessage("Material settings updated successfully") });
  }

  return json({ ...jFlashMessage("Invalid operation", "error") }, { status: 400 });
};
