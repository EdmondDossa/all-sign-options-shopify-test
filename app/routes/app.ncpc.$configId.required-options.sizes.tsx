import {
  Button,
  Box,
  Card,
  Divider,
  Icon,
  IndexTable,
  InlineGrid,
  InlineStack,
  Page,
  Text,
  TextField,
} from "@shopify/polaris";
import { json } from "@remix-run/node";
import type { ActionFunctionArgs } from "@remix-run/node";
import { DeleteIcon, DragHandleIcon, EditIcon, PlusIcon } from "@shopify/polaris-icons";
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigation, useOutletContext, useSubmit } from "@remix-run/react";
import Sortable from "~/utils/sortable-adapter";
import { ToggleButton } from "~/components/buttons";
import SizeForm, {
  type AdvancedSizeType,
  type FixedHeightSizeType,
  type FixedWidthSizeType,
} from "~/components/layouts/SizeForm";
import NcpcRowActions from "~/components/ncpc/NcpcRowActions";
import useHandleFlashMessage from "~/hooks/useHandleFlashMessage";
import NcpcConfigurationService from "~/models/NcpcConfiguration.service";
import { authenticate } from "~/shopify.server";
import type { NcpcRouteContext } from "~/types/NcpcRouteContext";
import { jFlashMessage } from "~/utils/message-flash";
import { truncateText } from "~/utils/truncate-text";

type UiSize = FixedWidthSizeType | FixedHeightSizeType | AdvancedSizeType;

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

const normalizePricingMode = (value: unknown) => {
  const normalized = String(value || "")
    .trim()
    .toLowerCase();

  if (normalized === "fixing-height") return "fixed-height";
  if (normalized === "fixing-width") return "fixed-width";
  return normalized || "fixed-height";
};

const toBoolean = (value: unknown, fallback = false) => {
  if (typeof value === "boolean") return value;
  if (value === "true") return true;
  if (value === "false") return false;
  return fallback;
};

const toNumber = (value: unknown, fallback: number) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const getSizeOptions = (data: any) => data?.requiredOptions?.sizeOptions || {};

const getSizesKey = (sizeOptions: any) =>
  Array.isArray(sizeOptions?.sizes) ? "sizes" : "allSizes";

const getStoredSizes = (sizeOptions: any) => {
  if (Array.isArray(sizeOptions?.sizes)) return sizeOptions.sizes;
  if (Array.isArray(sizeOptions?.allSizes)) return sizeOptions.allSizes;
  return [];
};

const ensureOneDefault = (rows: UiSize[], preferredIndex?: number) => {
  if (!Array.isArray(rows) || rows.length === 0) return [];

  const validPreferred =
    typeof preferredIndex === "number" &&
    preferredIndex >= 0 &&
    preferredIndex < rows.length
      ? preferredIndex
      : -1;
  const existingDefault = rows.findIndex(
    (row) => Boolean((row as any)?.isDefault ?? (row as any)?.default),
  );
  const targetIndex =
    validPreferred >= 0 ? validPreferred : existingDefault >= 0 ? existingDefault : 0;

  return rows.map((row, index) => ({
    ...(row as any),
    isDefault: index === targetIndex,
    default: index === targetIndex,
  }));
};

const getInitialSizeSetting = (sizeOptions: any, pricingMode: string) => {
  const base = {
    label: String(sizeOptions?.label || ""),
    description: String(sizeOptions?.description || ""),
    autoSwitching: Boolean(sizeOptions?.autoSwitching),
  };

  if (pricingMode !== "advanced") return base;

  return {
    ...base,
    minTextChar: String(sizeOptions?.minTextChar ?? 1),
    maxSignWidth: {
      unlimited: toBoolean(sizeOptions?.maxSignWidth?.unlimited, true),
      value: String(sizeOptions?.maxSignWidth?.value ?? 300),
    },
    maxSignHeight: {
      unlimited: toBoolean(sizeOptions?.maxSignHeight?.unlimited, true),
      value: String(sizeOptions?.maxSignHeight?.value ?? 300),
    },
    customSize: {
      activate: toBoolean(sizeOptions?.customSize?.activate, false),
      customs: {
        label: String(sizeOptions?.customSize?.customs?.label || "Custom"),
        maxRange: String(sizeOptions?.customSize?.customs?.maxRange ?? 300),
        step: String(sizeOptions?.customSize?.customs?.step ?? 2),
      },
    },
  };
};

const defaultResizeSettings = {
  autoResize: true,
  desktop: {
    defaultFontSize: 110,
    maxFontSize: 110,
    minFontSize: 30,
  },
  mobile: {
    defaultFontSize: 60,
    maxFontSize: 60,
    minFontSize: 30,
  },
};

const toUiSize = (storedSize: any, pricingMode: string, index: number): UiSize => {
  const isDefault = Boolean(storedSize?.isDefault ?? storedSize?.default);

  if (pricingMode === "advanced") {
    return {
      id: index,
      label: String(storedSize?.label || ""),
      scaleMultiplier: Number(storedSize?.scaleMultiplier ?? 1),
      isDefault,
      resizeSettings: storedSize?.resizeSettings || defaultResizeSettings,
    };
  }

  const numberLines = Number(storedSize?.numberLines ?? storedSize?.textNumber ?? 1);
  const minTextChar = Number(storedSize?.minTextChar ?? 1);
  const maxLineChar = Number(storedSize?.maxLineChar ?? storedSize?.maxTextChar ?? 1);

  if (pricingMode === "fixed-height") {
    return {
      id: index,
      label: String(storedSize?.label || ""),
      description: String(storedSize?.description || ""),
      height: Number(storedSize?.height ?? 0),
      numberLines,
      minTextChar,
      maxLineChar,
      isDefault,
      resizeSettings: storedSize?.resizeSettings || defaultResizeSettings,
    };
  }

  return {
    id: index,
    label: String(storedSize?.label || ""),
    description: String(storedSize?.description || ""),
    width: Number(storedSize?.width ?? 0),
    numberLines,
    minTextChar,
    maxLineChar,
    isDefault,
    resizeSettings: storedSize?.resizeSettings || defaultResizeSettings,
  };
};

const toStoredSize = (uiSize: UiSize, pricingMode: string, storeKey: string) => {
  const common = {
    label: (uiSize as any).label,
    isDefault: Boolean((uiSize as any).isDefault),
    default: Boolean((uiSize as any).isDefault),
  } as any;

  if (storeKey === "sizes") {
    return {
      ...uiSize,
      id: undefined,
      ...common,
    };
  }

  if (pricingMode === "advanced") {
    return {
      ...common,
      scaleMultiplier: Number((uiSize as any).scaleMultiplier || 1),
      resizeSettings: (uiSize as any).resizeSettings || defaultResizeSettings,
    };
  }

  if (pricingMode === "fixed-height") {
    return {
      ...common,
      description: String((uiSize as any).description || ""),
      width: 0,
      height: Number((uiSize as any).height || 0),
      textNumber: Number((uiSize as any).numberLines || 1),
      maxTextChar: Number((uiSize as any).maxLineChar || 1),
      minTextChar: Number((uiSize as any).minTextChar || 1),
      basePrice: Number((uiSize as any).basePrice || 0),
      charPrice: Number((uiSize as any).charPrice || 0),
      startPriceAtChar: Number((uiSize as any).startPriceAtChar || 0),
      resizeSettings: (uiSize as any).resizeSettings || defaultResizeSettings,
    };
  }

  return {
    ...common,
    description: String((uiSize as any).description || ""),
    width: Number((uiSize as any).width || 0),
    height: 0,
    textNumber: Number((uiSize as any).numberLines || 1),
    maxTextChar: Number((uiSize as any).maxLineChar || 1),
    minTextChar: Number((uiSize as any).minTextChar || 1),
    basePrice: Number((uiSize as any).basePrice || 0),
    charPrice: Number((uiSize as any).charPrice || 0),
    startPriceAtChar: Number((uiSize as any).startPriceAtChar || 0),
    resizeSettings: (uiSize as any).resizeSettings || defaultResizeSettings,
  };
};

export default function NcpcRequiredSizes() {
  const submit = useSubmit();
  const navigation = useNavigation();
  const { configuration, ncpcData } = useOutletContext<NcpcRouteContext>();

  useHandleFlashMessage();

  const pricingMode = normalizePricingMode(
    (configuration as any)?.pricingMode || (ncpcData as any)?.pricingMode,
  );

  const sizeOptions = getSizeOptions(ncpcData);
  const storedSizes = getStoredSizes(sizeOptions);
  const uiSizes = useMemo(
    () => storedSizes.map((item: any, index: number) => toUiSize(item, pricingMode, index)),
    [storedSizes, pricingMode],
  );

  const [size, setSize] = useState<UiSize | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [sizeSetting, setSizeSetting] = useState<any>(
    getInitialSizeSetting(sizeOptions, pricingMode),
  );
  const [sizesState, setSizesState] = useState<UiSize[]>(uiSizes);

  const isSubmitting = navigation.state === "submitting";
  const sortableRef = useRef<Sortable | null>(null);
  const tableWrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setSizeSetting(getInitialSizeSetting(sizeOptions, pricingMode));
  }, [sizeOptions, pricingMode]);

  useEffect(() => {
    setSizesState((previous) => {
      const previousKey = JSON.stringify(previous);
      const nextKey = JSON.stringify(uiSizes);
      return previousKey === nextKey ? previous : uiSizes;
    });
  }, [uiSizes]);

  useEffect(() => {
    if (!tableWrapperRef.current || showForm || sizesState.length <= 1) return;

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

        setSizesState((curr) => {
          const next = [...curr];
          const [moved] = next.splice(oldIndex, 1);
          next.splice(newIndex, 0, moved);

          submit(
            {
              operation: "reorder-sizes",
              sizes: JSON.stringify(next),
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
  }, [showForm, sizesState.length, submit]);

  const addNewSize = () => {
    setSize(null);
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    submit({ operation: "delete-size", index: String(id) }, { method: "POST" });
  };

  const handleEdit = (nextSize: UiSize) => {
    setSize(nextSize);
    setShowForm(true);
  };

  const handleSubmitForm = (formData: UiSize) => {
    const index = (formData as any)?.id;
    const payload = { ...formData } as any;
    delete payload.id;

    if (index == null) {
      submit({ operation: "add-size", size: JSON.stringify(payload) }, { method: "POST" });
    } else {
      submit(
        {
          operation: "update-size",
          index: String(index),
          size: JSON.stringify(payload),
        },
        { method: "POST" },
      );
    }

    setShowForm(false);
  };

  const handleSelectDefault = (index: number) => {
    submit({ operation: "set-default-size", index: String(index) }, { method: "POST" });
  };

  const handleSaveSizeSettings = () => {
    submit(
      {
        operation: "save-size-settings",
        sizeSetting: JSON.stringify(sizeSetting),
      },
      { method: "POST" },
    );
  };

  const resourceName = {
    singular: "Size",
    plural: "sizes",
  };

  const tableRows = sizesState.map((currentSize: UiSize, index: number) => (
    <IndexTable.Row id={index + ""} key={index} position={index} selected={false}>
      <IndexTable.Cell>
        <span className="drag-handle" style={{ cursor: "grab", display: "inline-flex" }}>
          <Icon source={DragHandleIcon} />
        </span>
      </IndexTable.Cell>
      <IndexTable.Cell>
        <Text as="strong" variant="bodyMd" tone="subdued">
          {truncateText((currentSize as any).label, 20)}
        </Text>
      </IndexTable.Cell>

      {pricingMode === "advanced" ? (
        <IndexTable.Cell>
          <Text as="span" variant="bodyMd" tone="subdued">
            {Number((currentSize as any).scaleMultiplier || 1).toFixed(2)}
          </Text>
        </IndexTable.Cell>
      ) : (
        <>
          <IndexTable.Cell>
            <Text as="span" variant="bodyMd" tone="subdued">
              {pricingMode === "fixed-height"
                ? String((currentSize as any).height || 0)
                : String((currentSize as any).width || 0)}
            </Text>
          </IndexTable.Cell>
          <IndexTable.Cell>
            <Text as="span" variant="bodyMd" tone="subdued">
              {String((currentSize as any).minTextChar || 1)}
            </Text>
          </IndexTable.Cell>
          <IndexTable.Cell>
            <Text as="span" variant="bodyMd" tone="subdued">
              {String((currentSize as any).maxLineChar || 1)}
            </Text>
          </IndexTable.Cell>
          <IndexTable.Cell>
            <Text as="span" variant="bodyMd" tone="subdued">
              {String((currentSize as any).numberLines || 1)}
            </Text>
          </IndexTable.Cell>
        </>
      )}

      <IndexTable.Cell>
        <ToggleButton
          id={index + "_default"}
          type="radio"
          name="defaultSize"
          value="true"
          checked={Boolean((currentSize as any).isDefault)}
          onChange={() => handleSelectDefault(index)}
        />
      </IndexTable.Cell>

      <IndexTable.Cell>
        <NcpcRowActions
          actions={[
            {
              content: "Edit",
              icon: EditIcon,
              onAction: () => handleEdit({ ...(currentSize as any), id: index }),
            },
            {
              content: "Delete",
              icon: DeleteIcon,
              destructive: true,
              onAction: () => handleDelete(index),
            },
          ]}
        />
      </IndexTable.Cell>
    </IndexTable.Row>
  ));

  return (
    <Page fullWidth>
      {!showForm && (
        <>
          <Card>
            <Box padding="300">
              <InlineStack align="space-between" blockAlign="center">
                <div>
                  <Text as="h2" variant="headingMd">
                    Sizes list
                  </Text>
                  <Text as="p" tone="subdued">
                    Manage all available NCPC sizes and choose the default one.
                  </Text>
                </div>
                <Button icon={PlusIcon} variant="primary" tone="success" onClick={addNewSize}>
                  Add new size
                </Button>
              </InlineStack>
            </Box>

            <Divider borderWidth="025" />

            <div ref={tableWrapperRef}>
              <IndexTable
                resourceName={resourceName}
                itemCount={sizesState.length}
                selectable={false}
                headings={
                  pricingMode === "advanced"
                    ? [
                        { title: "" },
                        { title: "Label" },
                        { title: "Size Scale Multiplier" },
                        { title: "Default" },
                        { title: "Action" },
                      ]
                    : [
                        { title: "" },
                        { title: "Label" },
                        { title: pricingMode === "fixed-height" ? "Height" : "Width" },
                        { title: "Min Char" },
                        { title: "Max Char" },
                        { title: "Line Limit" },
                        { title: "Default" },
                        { title: "Action" },
                      ]
                }
              >
                {tableRows}
              </IndexTable>
            </div>
          </Card>

          <Box paddingBlockStart="300" />

          <Card>
            <Box padding="300">
              <Text as="h2" variant="headingMd">
                Size settings
              </Text>
              <Text as="p" tone="subdued">
                Configure labels, limits and sizing behavior used in the customizer.
              </Text>

              <Box paddingBlockStart="200" />

              <InlineGrid columns={{ xs: 1, md: 2 }} gap="400">
                <TextField
                  label="Label"
                  value={sizeSetting?.label}
                  onChange={(value) => {
                    setSizeSetting({ ...sizeSetting, label: value });
                  }}
                  autoComplete="off"
                />
                <TextField
                  label="Description"
                  value={sizeSetting?.description}
                  onChange={(value) => {
                    setSizeSetting({ ...sizeSetting, description: value });
                  }}
                  autoComplete="off"
                />
              </InlineGrid>

              {pricingMode !== "advanced" && (
                <>
                  <Box paddingBlockStart="200" />
                  <Divider borderWidth="100" />
                  <Box paddingBlockStart="200" />

                  <InlineStack gap="200" blockAlign="center">
                    <Text as="p" variant="headingSm">
                      Prevent automatic size switching
                    </Text>
                    <ToggleButton
                      id="preventAutoSwitch"
                      type="checkbox"
                      checked={Boolean(sizeSetting?.autoSwitching)}
                      onChange={(val) => {
                        setSizeSetting({ ...sizeSetting, autoSwitching: val });
                      }}
                    />
                  </InlineStack>
                  <Text as="p" tone="subdued">
                    When customer text exceeds the character limit of the current size, the app
                    can auto-switch to the next size. Disable this behavior if needed.
                  </Text>
                </>
              )}

              {pricingMode === "advanced" && (
                <>
                  <Box paddingBlockStart="200" />
                  <Divider borderWidth="100" />
                  <Box paddingBlockStart="200" />

                  <Text variant="headingMd" as="h3">
                    Character and sign dimension limits
                  </Text>
                  <Box paddingBlockStart="100" />
                  <TextField
                    label="Minimum Text Characters"
                    type="number"
                    autoComplete="off"
                    value={sizeSetting?.minTextChar}
                    onChange={(value) => {
                      setSizeSetting({
                        ...sizeSetting,
                        minTextChar: value,
                      });
                    }}
                    helpText="The minimum number of text characters for the sign."
                  />

                  <Box paddingBlockStart="200" />
                  <Text variant="headingSm" as="h4">
                    Maximum sign width
                  </Text>
                  <Box paddingBlockStart="100" />
                  <InlineStack gap="200" blockAlign="center">
                    <Text as="span">Unlimited Width</Text>
                    <ToggleButton
                      id="unlimitedWidth"
                      type="radio"
                      checked={sizeSetting?.maxSignWidth?.unlimited}
                      name="unlimitedWidth"
                      value={true}
                      onChange={(val) =>
                        setSizeSetting({
                          ...sizeSetting,
                          maxSignWidth: {
                            ...sizeSetting?.maxSignWidth,
                            unlimited: val,
                          },
                        })
                      }
                    />
                    <Text as="span">Limited Width</Text>
                    <ToggleButton
                      id="limitedWidth"
                      type="radio"
                      name="unlimitedWidth"
                      checked={!sizeSetting?.maxSignWidth?.unlimited}
                      value={false}
                      onChange={(val) =>
                        setSizeSetting({
                          ...sizeSetting,
                          maxSignWidth: {
                            ...sizeSetting?.maxSignWidth,
                            unlimited: val,
                          },
                        })
                      }
                    />
                  </InlineStack>

                  {!sizeSetting?.maxSignWidth?.unlimited && (
                    <Box paddingBlockStart="100">
                      <TextField
                        label="Maximum width (cm)"
                        type="number"
                        autoComplete="off"
                        value={sizeSetting?.maxSignWidth?.value}
                        onChange={(value) =>
                          setSizeSetting({
                            ...sizeSetting,
                            maxSignWidth: {
                              ...sizeSetting?.maxSignWidth,
                              value,
                            },
                          })
                        }
                        helpText="A popup appears if the sign exceeds this width."
                      />
                    </Box>
                  )}

                  <Box paddingBlockStart="200" />
                  <Text variant="headingSm" as="h4">
                    Maximum sign height
                  </Text>
                  <Box paddingBlockStart="100" />
                  <InlineStack gap="200" blockAlign="center">
                    <Text as="span">Unlimited Height</Text>
                    <ToggleButton
                      id="unlimitedHeight"
                      type="radio"
                      checked={sizeSetting?.maxSignHeight?.unlimited}
                      value={true}
                      name="unlimitedHeight"
                      onChange={(val) => {
                        setSizeSetting({
                          ...sizeSetting,
                          maxSignHeight: {
                            ...sizeSetting?.maxSignHeight,
                            unlimited: val,
                          },
                        });
                      }}
                    />
                    <Text as="span">Limited Height</Text>
                    <ToggleButton
                      id="limitedHeight"
                      type="radio"
                      name="unlimitedHeight"
                      checked={!sizeSetting?.maxSignHeight?.unlimited}
                      value={false}
                      onChange={(val) =>
                        setSizeSetting({
                          ...sizeSetting,
                          maxSignHeight: {
                            ...sizeSetting?.maxSignHeight,
                            unlimited: val,
                          },
                        })
                      }
                    />
                  </InlineStack>

                  {!sizeSetting?.maxSignHeight?.unlimited && (
                    <Box paddingBlockStart="100">
                      <TextField
                        label="Maximum height (cm)"
                        type="number"
                        autoComplete="off"
                        value={sizeSetting?.maxSignHeight?.value}
                        onChange={(value) =>
                          setSizeSetting({
                            ...sizeSetting,
                            maxSignHeight: {
                              ...sizeSetting?.maxSignHeight,
                              value,
                            },
                          })
                        }
                        helpText="A popup appears if the sign exceeds this height."
                      />
                    </Box>
                  )}

                  <Box paddingBlockStart="200" />
                  <Divider borderWidth="100" />
                  <Box paddingBlockStart="200" />

                  <Text variant="headingMd" as="h3">
                    Custom sizing
                  </Text>
                  <Text as="p" tone="subdued">
                    Add an optional size slider for customers.
                  </Text>
                  <Box paddingBlockStart="100" />
                  <InlineStack gap="200" blockAlign="center">
                    <Text as="span">Disable Custom Sizing</Text>
                    <ToggleButton
                      id="customSize1"
                      type="radio"
                      checked={!sizeSetting?.customSize?.activate}
                      value={false}
                      name="customSize"
                      onChange={(val) => {
                        setSizeSetting({
                          ...sizeSetting,
                          customSize: {
                            ...sizeSetting?.customSize,
                            activate: val,
                          },
                        });
                      }}
                    />
                    <Text as="span">Enable Custom Sizing</Text>
                    <ToggleButton
                      id="customSize2"
                      type="radio"
                      name="customSize"
                      checked={sizeSetting?.customSize?.activate}
                      value={true}
                      onChange={(val) =>
                        setSizeSetting({
                          ...sizeSetting,
                          customSize: {
                            ...sizeSetting?.customSize,
                            activate: val,
                          },
                        })
                      }
                    />
                  </InlineStack>

                  {sizeSetting?.customSize?.activate && (
                    <Box paddingBlockStart="100">
                      <InlineGrid columns={{ xs: 1, md: 3 }} gap="400">
                        <TextField
                          label="Title"
                          value={sizeSetting?.customSize?.customs?.label}
                          onChange={(val) =>
                            setSizeSetting({
                              ...sizeSetting,
                              customSize: {
                                ...sizeSetting?.customSize,
                                customs: {
                                  ...sizeSetting?.customSize?.customs,
                                  label: val,
                                },
                              },
                            })
                          }
                          autoComplete="off"
                        />
                        <TextField
                          label="Maximum Range in centimeters"
                          helpText="Defaults to 300cm if empty."
                          value={sizeSetting?.customSize?.customs?.maxRange}
                          onChange={(val) =>
                            setSizeSetting({
                              ...sizeSetting,
                              customSize: {
                                ...sizeSetting?.customSize,
                                customs: {
                                  ...sizeSetting?.customSize?.customs,
                                  maxRange: val,
                                },
                              },
                            })
                          }
                          type="number"
                          autoComplete="off"
                        />
                        <TextField
                          label="Step"
                          helpText="Increment step for the custom range slider."
                          value={sizeSetting?.customSize?.customs?.step}
                          onChange={(val) =>
                            setSizeSetting({
                              ...sizeSetting,
                              customSize: {
                                ...sizeSetting?.customSize,
                                customs: {
                                  ...sizeSetting?.customSize?.customs,
                                  step: val,
                                },
                              },
                            })
                          }
                          type="number"
                          autoComplete="off"
                        />
                      </InlineGrid>
                    </Box>
                  )}
                </>
              )}

              <Box paddingBlockStart="300" />
              <InlineStack align="end">
                <Button
                  onClick={handleSaveSizeSettings}
                  loading={isSubmitting}
                  disabled={isSubmitting}
                  variant="primary"
                >
                  Save settings
                </Button>
              </InlineStack>
            </Box>
          </Card>
        </>
      )}

      {showForm && (
        <SizeForm
          size={size || undefined}
          pricingMode={pricingMode}
          isEditing={(size as any)?.id != null}
          onSubmit={handleSubmitForm}
          onClose={() => {
            setSize(null);
            setShowForm(false);
          }}
        />
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
  const context = await NcpcConfigurationService.getContext(configId, session.id);
  const contextPricingMode = normalizePricingMode(
    (context?.configuration as any)?.pricingMode || (context?.ncpcData as any)?.pricingMode,
  );

  if (["add-size", "update-size"].includes(operation)) {
    let size: UiSize | null = null;
    try {
      size = JSON.parse(String(formData.get("size") || "{}"));
    } catch {
      size = null;
    }

    if (!size || typeof size !== "object") {
      return json({ ...jFlashMessage("Invalid size payload", "error") }, { status: 400 });
    }

    await NcpcConfigurationService.mutateNcpc(configId, session.id, (draft) => {
      const sizeOptions = getSizeOptions(draft);
      const key = getSizesKey(sizeOptions);
      const current = getStoredSizes(sizeOptions);

      if (operation === "add-size") {
        sizeOptions[key] = [...current, toStoredSize(size, contextPricingMode, key)];
      } else if (index >= 0 && current[index] != null) {
        const next = [...current];
        next[index] = toStoredSize(size, contextPricingMode, key);
        sizeOptions[key] = next;
      }
    });

    return json({ ...jFlashMessage("Size saved successfully") });
  }

  if (operation === "delete-size") {
    await NcpcConfigurationService.mutateNcpc(configId, session.id, (draft) => {
      const sizeOptions = getSizeOptions(draft);
      const key = getSizesKey(sizeOptions);
      const current = getStoredSizes(sizeOptions);
      sizeOptions[key] = current.filter((_size: any, sizeIndex: number) => sizeIndex !== index);
    });

    return json({ ...jFlashMessage("Size deleted successfully") });
  }

  if (operation === "set-default-size") {
    await NcpcConfigurationService.mutateNcpc(configId, session.id, (draft) => {
      const sizeOptions = getSizeOptions(draft);
      const key = getSizesKey(sizeOptions);
      const current = getStoredSizes(sizeOptions);
      sizeOptions[key] = current.map((item: any, itemIndex: number) => ({
        ...item,
        isDefault: itemIndex === index,
        default: itemIndex === index,
      }));
    });

    return json({ ...jFlashMessage("Default size updated successfully") });
  }

  if (operation === "reorder-sizes") {
    const rawSizes = parseJsonValue(formData.get("sizes"));
    if (!Array.isArray(rawSizes)) {
      return json({ ...jFlashMessage("Invalid reorder payload", "error") }, { status: 400 });
    }

    await NcpcConfigurationService.mutateNcpc(configId, session.id, (draft) => {
      const sizeOptions = getSizeOptions(draft);
      const key = getSizesKey(sizeOptions);
      const normalizedUiSizes = ensureOneDefault(
        rawSizes.map((item: any) => ({
          ...item,
          isDefault: Boolean(item?.isDefault ?? item?.default),
          default: Boolean(item?.isDefault ?? item?.default),
        })) as UiSize[],
      );

      sizeOptions[key] = normalizedUiSizes.map((item) =>
        toStoredSize(item, contextPricingMode, key),
      );
    });

    return json({ ...jFlashMessage("Sizes order updated successfully") });
  }

  if (operation === "save-size-settings") {
    let settings: any = null;
    try {
      settings = JSON.parse(String(formData.get("sizeSetting") || "{}"));
    } catch {
      settings = null;
    }

    if (!settings || typeof settings !== "object") {
      return json({ ...jFlashMessage("Invalid settings payload", "error") }, { status: 400 });
    }

    await NcpcConfigurationService.mutateNcpc(configId, session.id, (draft) => {
      const sizeOptions = getSizeOptions(draft);
      sizeOptions.label = String(settings?.label || "");
      sizeOptions.description = String(settings?.description || "");

      if (contextPricingMode !== "advanced") {
        sizeOptions.autoSwitching = Boolean(settings?.autoSwitching);
        return;
      }

      sizeOptions.minTextChar = toNumber(
        settings?.minTextChar,
        toNumber(sizeOptions?.minTextChar, 1),
      );

      sizeOptions.maxSignWidth = {
        ...(sizeOptions?.maxSignWidth || {}),
        unlimited: toBoolean(settings?.maxSignWidth?.unlimited, true),
        value: toNumber(
          settings?.maxSignWidth?.value,
          toNumber(sizeOptions?.maxSignWidth?.value, 300),
        ),
      };

      sizeOptions.maxSignHeight = {
        ...(sizeOptions?.maxSignHeight || {}),
        unlimited: toBoolean(settings?.maxSignHeight?.unlimited, true),
        value: toNumber(
          settings?.maxSignHeight?.value,
          toNumber(sizeOptions?.maxSignHeight?.value, 300),
        ),
      };

      sizeOptions.customSize = {
        ...(sizeOptions?.customSize || {}),
        activate: toBoolean(settings?.customSize?.activate, false),
        customs: {
          ...(sizeOptions?.customSize?.customs || {}),
          label: String(
            settings?.customSize?.customs?.label ||
              sizeOptions?.customSize?.customs?.label ||
              "Custom",
          ),
          maxRange: toNumber(
            settings?.customSize?.customs?.maxRange,
            toNumber(sizeOptions?.customSize?.customs?.maxRange, 300),
          ),
          step: toNumber(
            settings?.customSize?.customs?.step,
            toNumber(sizeOptions?.customSize?.customs?.step, 2),
          ),
        },
      };
    });

    return json({ ...jFlashMessage("Size settings updated successfully") });
  }

  return json({ ...jFlashMessage("Invalid operation", "error") }, { status: 400 });
};
