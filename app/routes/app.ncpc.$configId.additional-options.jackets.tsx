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
import { useEffect, useMemo, useRef, useState } from "react";
import type { SetStateAction } from "react";
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
import { jFlashMessage } from "~/utils/message-flash";
import { truncateText } from "~/utils/truncate-text";

type JacketPriceType = "none" | "base" | "multiplier";

type JacketItem = {
  label: string;
  description: string;
  isDefault: boolean;
  default?: boolean;
  previewImg: string;
  popupImg: string;
  type: "white" | "colored";
  colorsExclusions: Array<number | string>;
  price: {
    type: JacketPriceType;
    value: number;
  };
};

type JacketSettings = {
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

const normalizePriceType = (value: unknown): JacketPriceType => {
  const normalized = String(value || "").trim().toLowerCase();
  if (normalized === "base" || normalized === "multiplier") return normalized;
  return "none";
};

const normalizeJacketType = (value: unknown): "white" | "colored" => {
  const normalized = String(value || "").trim().toLowerCase();
  return normalized === "colored" ? "colored" : "white";
};

const normalizeJacketItem = (item: any): JacketItem => {
  const fallbackPrice = toNumber(item?.additionalPrice, 0);
  const typeFromFallback: JacketPriceType = fallbackPrice > 0 ? "base" : "none";

  return {
    label: String(item?.label || item?.title || "").trim(),
    description: String(item?.description || ""),
    isDefault: Boolean(item?.isDefault ?? item?.default),
    default: Boolean(item?.isDefault ?? item?.default),
    previewImg: String(item?.previewImg || item?.icon || ""),
    popupImg: String(item?.popupImg || item?.popImg || ""),
    type: normalizeJacketType(item?.type),
    colorsExclusions: normalizeIndexArray(
      toArray(item?.colorsExclusions ?? item?.colorExclusions),
    ),
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

const emptyJacket = (): JacketItem => ({
  label: "",
  description: "",
  isDefault: false,
  default: false,
  previewImg: "",
  popupImg: "",
  type: "white",
  colorsExclusions: [],
  price: {
    type: "none",
    value: 0,
  },
});

const ensureOneDefault = (rows: JacketItem[], preferredIndex?: number) => {
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

const getJacketContainer = (rawJacketOptions: any) => {
  if (Array.isArray(rawJacketOptions)) {
    return {
      label: "Jackets",
      description: "",
      jackets: ensureOneDefault(rawJacketOptions.map(normalizeJacketItem)),
    };
  }

  if (rawJacketOptions && typeof rawJacketOptions === "object") {
    const list = Array.isArray(rawJacketOptions.jackets) ? rawJacketOptions.jackets : [];
    return {
      label: String(rawJacketOptions.label || "Jackets"),
      description: String(rawJacketOptions.description || ""),
      jackets: ensureOneDefault(list.map(normalizeJacketItem)),
    };
  }

  return {
    label: "Jackets",
    description: "",
    jackets: [],
  };
};

const setJacketContainer = (draft: any, container: any) => {
  draft.additionalOptions.jacketOptions = {
    label: String(container?.label || "Jackets"),
    description: String(container?.description || ""),
    jackets: Array.isArray(container?.jackets)
      ? ensureOneDefault(container.jackets.map(normalizeJacketItem))
      : [],
  };
};

export default function NcpcAdditionalJackets() {
  const submit = useSubmit();
  const navigation = useNavigation();
  const { productType, ncpcData } = useOutletContext<NcpcRouteContext>();
  const currencySymbol = (ncpcData as any)?.settings?.currencySymbol || "$";
  useHandleFlashMessage();

  const isSubmitting = navigation.state === "submitting";
  const jacketContainer = getJacketContainer(ncpcData.additionalOptions?.jacketOptions);

  const [settings, setSettings] = useState<JacketSettings>({
    label: jacketContainer.label,
    description: jacketContainer.description,
  });
  const [editorOpen, setEditorOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [formData, setFormData] = useState<JacketItem>(emptyJacket());
  const [jacketsState, setJacketsState] = useState<JacketItem[]>(jacketContainer.jackets);

  const sortableRef = useRef<Sortable | null>(null);
  const tableWrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const latest = getJacketContainer(ncpcData.additionalOptions?.jacketOptions);
    setSettings({
      label: latest.label,
      description: latest.description,
    });
    setJacketsState(latest.jackets);
  }, [JSON.stringify(ncpcData.additionalOptions?.jacketOptions)]);

  useEffect(() => {
    if (!tableWrapperRef.current || editorOpen || jacketsState.length <= 1) return;

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

        setJacketsState((curr) => {
          const next = [...curr];
          const [moved] = next.splice(oldIndex, 1);
          next.splice(newIndex, 0, moved);

          submit(
            {
              operation: "reorder-jackets",
              jackets: JSON.stringify(next),
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
  }, [editorOpen, jacketsState.length, submit]);

  const colorOptions = useMemo(() => {
    const raw = ncpcData.requiredOptions?.colorOptions;
    const items = Array.isArray(raw?.colors)
      ? raw.colors
      : Array.isArray(raw?.allColors)
        ? raw.allColors
        : [];

    return items.map((entry: any, index: number) => ({
      label: String(entry?.label || entry?.name || `Color ${index + 1}`),
      value: String(index),
    }));
  }, [ncpcData.requiredOptions?.colorOptions]);

  const openCreate = () => {
    setEditingIndex(null);
    setFormData(emptyJacket());
    setEditorOpen(true);
  };

  const openEdit = (index: number) => {
    setEditingIndex(index);
    setFormData(normalizeJacketItem(jacketsState[index]));
    setEditorOpen(true);
  };

  const closeEditor = () => {
    if (isSubmitting) return;
    setEditingIndex(null);
    setFormData(emptyJacket());
    setEditorOpen(false);
  };

  const saveJacket = () => {
    if (!formData.label.trim()) return;

    const operation = editingIndex == null ? "add-jacket" : "update-jacket";
    const payload: Record<string, string> = {
      operation,
      jacket: JSON.stringify(formData),
    };
    if (editingIndex != null) payload.index = String(editingIndex);

    submit(payload, { method: "POST" });
    setEditorOpen(false);
  };

  const deleteJacket = (index: number) => {
    submit(
      {
        operation: "delete-jacket",
        index: String(index),
      },
      { method: "POST" },
    );
  };

  const setDefaultJacket = (index: number) => {
    submit(
      {
        operation: "set-default-jacket",
        index: String(index),
      },
      { method: "POST" },
    );
  };

  const saveSettings = () => {
    submit(
      {
        operation: "save-jacket-settings",
        settings: JSON.stringify(settings),
      },
      { method: "POST" },
    );
  };

  const updateColorsExclusions = (nextState: SetStateAction<any[]>) => {
    setFormData((curr) => {
      const nextValue =
        typeof nextState === "function" ? nextState((curr.colorsExclusions || []) as any[]) : nextState;
      return {
        ...curr,
        colorsExclusions: nextValue,
      };
    });
  };

  const rows = jacketsState.map((jacket, index) => (
    <IndexTable.Row id={`${index}`} key={`${index}`} position={index}>
      <IndexTable.Cell>
        <span className="drag-handle" style={{ cursor: "grab", display: "inline-flex" }}>
          <Icon source={DragHandleIcon} />
        </span>
      </IndexTable.Cell>
      <IndexTable.Cell>
        <Text as="span" variant="bodyMd" fontWeight="semibold">
          {truncateText(String(jacket.label || `Jacket ${index + 1}`), 26)}
        </Text>
      </IndexTable.Cell>
      <IndexTable.Cell className="td-center">
        <Text as="span" tone="subdued">
          {jacket.type === "colored" ? "Colored" : "White"}
        </Text>
      </IndexTable.Cell>
      <IndexTable.Cell className="td-center">
        <ToggleButton
          id={`default-jacket-${index}`}
          type="radio"
          name="defaultJacket"
          value="true"
          checked={Boolean(jacket.isDefault || jacket.default)}
          onChange={() => setDefaultJacket(index)}
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
              onAction: () => deleteJacket(index),
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
            Jackets are only available for Neon configurations.
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
                    Jackets
                  </Text>
                  <Text as="p" tone="subdued">
                    Manage jacket options for neon signs.
                  </Text>
                </div>
                <InlineStack gap="200" align="end">
                  <HelpLink
                    url="https://docs.signsdesigner.us/docs/ncpc-documentation/advanced-tips-and-tricks-9638/adding-jackets-9750/"
                    text="Get Help"
                  />
                  <Button onClick={openCreate} variant="primary">
                    Add Jacket
                  </Button>
                </InlineStack>
              </InlineStack>
            </Box>
          </Card>

          <Card>
            <Box padding="300">
              {jacketsState.length === 0 ? (
                <Box paddingBlock="800">
                  <div style={{ display: "grid", placeItems: "center", gap: 10 }}>
                    <Text as="p" variant="headingMd">
                      No jacket yet
                    </Text>
                    <Button onClick={openCreate} variant="primary">
                      Add first jacket
                    </Button>
                  </div>
                </Box>
              ) : (
                <div ref={tableWrapperRef}>
                  <IndexTable
                    resourceName={{ singular: "Jacket", plural: "Jackets" }}
                    itemCount={jacketsState.length}
                    selectable={false}
                    headings={[
                      { title: "" },
                      { title: "Label" },
                      { title: "Type", alignment: "center" },
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
                Jacket Section Settings
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
                  {editingIndex == null ? "Add Jacket" : "Edit Jacket"}
                </Text>
                <HelpLink
                  url="https://docs.signsdesigner.us/docs/ncpc-documentation/advanced-tips-and-tricks-9638/adding-jackets-9750/"
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
                3. Type
              </Text>
              <Box paddingBlockStart="200" />
              <Select
                label="Type of jacket"
                helpText="The effect will apply to the visualizer when the sign light is turned off."
                options={[
                  { label: "White", value: "white" },
                  { label: "Colored", value: "colored" },
                ]}
                value={formData.type}
                onChange={(value) =>
                  setFormData((curr) => ({
                    ...curr,
                    type: normalizeJacketType(value),
                  }))
                }
              />
            </Box>
          </Card>

          <Card>
            <Box padding="300">
              <Text as="h3" variant="headingSm">
                4. Color Exclusions
              </Text>
              <Text as="p" tone="subdued">
                Select the colours that this jacket option will NOT be available for.
              </Text>
              <Box paddingBlockStart="200" />
              <SelectCombobox
                label="Excluded Colors"
                placeholder="Search colors"
                data={colorOptions}
                selectedOptions={formData.colorsExclusions.map(String)}
                setSelectedOptions={updateColorsExclusions}
              />
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
                  onClick={saveJacket}
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
      { ...jFlashMessage("Jackets are only available for Neon configurations.", "error") },
      { status: 403 },
    );
  }

  const formData = await request.formData();
  const operation = String(formData.get("operation") || "");
  const index = parseIndex(formData.get("index"));

  if (operation === "add-jacket" || operation === "update-jacket") {
    const rawJacket = parseJsonValue(formData.get("jacket"));
    const normalized = normalizeJacketItem(rawJacket);

    if (!normalized.label.trim()) {
      return json({ ...jFlashMessage("Jacket label is required", "error") }, { status: 400 });
    }

    await NcpcConfigurationService.mutateNcpc(configId, session.id, (draft) => {
      const container = getJacketContainer((draft as any)?.additionalOptions?.jacketOptions);
      let jackets = [...container.jackets];

      if (operation === "add-jacket") {
        if (jackets.length === 0) {
          normalized.isDefault = true;
          normalized.default = true;
        }
        jackets.push(normalized);
      } else if (index >= 0 && jackets[index]) {
        jackets[index] = normalized;
      }

      const preferredIndex =
        normalized.isDefault || normalized.default
          ? operation === "add-jacket"
            ? jackets.length - 1
            : index
          : undefined;

      jackets = ensureOneDefault(jackets, preferredIndex);
      setJacketContainer(draft, {
        ...container,
        jackets,
      });
    });

    return json({
      ...jFlashMessage(
        operation === "add-jacket" ? "Jacket added successfully" : "Jacket updated successfully",
      ),
    });
  }

  if (operation === "delete-jacket") {
    if (index < 0) {
      return json({ ...jFlashMessage("Invalid jacket index", "error") }, { status: 400 });
    }

    await NcpcConfigurationService.mutateNcpc(configId, session.id, (draft) => {
      const container = getJacketContainer((draft as any)?.additionalOptions?.jacketOptions);
      const jackets = ensureOneDefault(
        container.jackets.filter((_row: JacketItem, rowIndex: number) => rowIndex !== index),
      );

      setJacketContainer(draft, {
        ...container,
        jackets,
      });
    });

    return json({ ...jFlashMessage("Jacket deleted successfully") });
  }

  if (operation === "set-default-jacket") {
    if (index < 0) {
      return json({ ...jFlashMessage("Invalid jacket index", "error") }, { status: 400 });
    }

    await NcpcConfigurationService.mutateNcpc(configId, session.id, (draft) => {
      const container = getJacketContainer((draft as any)?.additionalOptions?.jacketOptions);
      const jackets = ensureOneDefault(container.jackets, index);
      setJacketContainer(draft, {
        ...container,
        jackets,
      });
    });

    return json({ ...jFlashMessage("Default jacket updated successfully") });
  }

  if (operation === "reorder-jackets") {
    const rawJackets = parseJsonValue(formData.get("jackets"));
    if (!Array.isArray(rawJackets)) {
      return json({ ...jFlashMessage("Invalid reorder payload", "error") }, { status: 400 });
    }

    await NcpcConfigurationService.mutateNcpc(configId, session.id, (draft) => {
      const container = getJacketContainer((draft as any)?.additionalOptions?.jacketOptions);
      const jackets = ensureOneDefault(rawJackets.map(normalizeJacketItem));
      setJacketContainer(draft, {
        ...container,
        jackets,
      });
    });

    return json({ ...jFlashMessage("Jackets order updated successfully") });
  }

  if (operation === "save-jacket-settings") {
    const settings = parseJsonValue(formData.get("settings"));
    if (!settings || typeof settings !== "object") {
      return json({ ...jFlashMessage("Invalid settings payload", "error") }, { status: 400 });
    }

    await NcpcConfigurationService.mutateNcpc(configId, session.id, (draft) => {
      const container = getJacketContainer((draft as any)?.additionalOptions?.jacketOptions);
      setJacketContainer(draft, {
        ...container,
        label: String((settings as any)?.label || "Jackets"),
        description: String((settings as any)?.description || ""),
      });
    });

    return json({ ...jFlashMessage("Jacket settings updated successfully") });
  }

  return json({ ...jFlashMessage("Invalid operation", "error") }, { status: 400 });
};
