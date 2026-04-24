import { Box, Button, Card, Divider, Icon, IndexTable, InlineStack, Text, TextField } from "@shopify/polaris";
import { DeleteIcon, DragHandleIcon, EditIcon, PlusIcon } from "@shopify/polaris-icons";
import { useEffect, useMemo, useRef, useState } from "react";
import { useLoaderData, useNavigation, useOutletContext, useSubmit } from "@remix-run/react";
import { ToggleButton } from "~/components/buttons";
import ClassicFixingMethodForm from "~/components/layouts/ClassicFixingMethodForm";
import ClassicShapeForm from "~/components/layouts/ClassicShapeForm";
import ClassicBorderForm from "~/components/layouts/ClassicBorderForm";
import { FileInput } from "~/components/inputs/FileInput";
import { TextColorField } from "~/components/inputs/TextColorField";
import useHandleFlashMessage from "~/hooks/useHandleFlashMessage";
import {
  defaultBorderSettings,
  getBorderSettingsState,
  getBordersState,
  getFixingMethodsState,
  getManagedBorderOptions,
  getManagedFixingMethodOptions,
  getManagedShapeOptions,
  getShapesState,
  getSizeOptions,
  parseConfigData,
  type RequiredBorderSettings,
  type RequiredBorderItem,
  type RequiredFixingMethodItem,
  type RequiredShapeItem,
  type StructuralSectionKey,
} from "~/features/classic-required-structural.shared";
import { fileUrl } from "~/utils/fileUrl";
import Sortable from "~/utils/sortable-adapter";

type LoaderData = {
  managedFixingMethods?: any[];
  managedShapes?: any[];
  managedBorders?: any[];
} | null;

type Props = {
  section: StructuralSectionKey;
};

const emptyFixingMethod = (): RequiredFixingMethodItem => ({
  id: "",
  fixingMethodId: 0,
  mode: "managed",
  label: "",
  previewImg: "",
  description: "",
  additionalPrice: 0,
  excludeMaterials: [],
  excludeSizes: [],
  excludeShapes: [],
  isDefault: false,
  isVisible: true,
});

const emptyShape = (): RequiredShapeItem => ({
  id: "",
  shapeId: 0,
  label: "",
  additionalPrice: 0,
  excludeMaterials: [],
  isDefault: false,
  enablePricingBySurface: false,
  surface: 0,
  shapeSize: {
    small: 20,
    medium: 40,
    large: 60,
  },
});

const emptyBorder = (): RequiredBorderItem => ({
  id: "",
  manageBorderId: 0,
  label: "",
  additionalPrice: 0,
  excludeSizes: [],
  excludeShapes: [],
  isDefault: false,
});

export function ClassicRequiredStructuralScreen({ section }: Props) {
  const { configuration } = useOutletContext<{ configuration: any }>();
  const loaderData = useLoaderData<LoaderData>();
  const submit = useSubmit();
  const navigation = useNavigation();
  const tableWrapperRef = useRef<HTMLDivElement | null>(null);
  const sortableRef = useRef<Sortable | null>(null);

  useHandleFlashMessage();

  const data = useMemo(() => parseConfigData(configuration?.data) || {}, [configuration?.data]);
  const managedFixingMethods = useMemo(
    () => (Array.isArray(loaderData?.managedFixingMethods) ? loaderData.managedFixingMethods : []),
    [loaderData],
  );
  const managedShapes = useMemo(
    () => (Array.isArray(loaderData?.managedShapes) ? loaderData.managedShapes : []),
    [loaderData],
  );
  const managedBorders = useMemo(
    () => (Array.isArray(loaderData?.managedBorders) ? loaderData.managedBorders : []),
    [loaderData],
  );

  const sizeOptions = useMemo(() => getSizeOptions(data), [data]);
  const shapeItems = useMemo(() => getShapesState(data, managedShapes), [data, managedShapes]);
  const fixingItems = useMemo(
    () => getFixingMethodsState(data, managedFixingMethods, sizeOptions, shapeItems),
    [data, managedFixingMethods, sizeOptions, shapeItems],
  );
  const borderItems = useMemo(
    () => getBordersState(data, managedBorders, sizeOptions, shapeItems),
    [data, managedBorders, sizeOptions, shapeItems],
  );

  const [showForm, setShowForm] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingFixingMethod, setEditingFixingMethod] = useState<RequiredFixingMethodItem>(emptyFixingMethod());
  const [editingShape, setEditingShape] = useState<RequiredShapeItem>(emptyShape());
  const [editingBorder, setEditingBorder] = useState<RequiredBorderItem>(emptyBorder());
  const [borderSettings, setBorderSettings] = useState<RequiredBorderSettings>(() =>
    getBorderSettingsState(data),
  );

  const isSubmitting = navigation.state === "submitting";

  const titleBySection: Record<StructuralSectionKey, string> = {
    "fixing-methods": "Fixing Methods",
    shapes: "Shapes",
    borders: "Borders",
  };

  const descriptionBySection: Record<StructuralSectionKey, string> = {
    "fixing-methods": "Manage the fixing methods available in this config.",
    shapes: "Manage the shapes available in this config.",
    borders: "Manage the borders available in this config and exclude incompatible shapes.",
  };

  const items = section === "fixing-methods" ? fixingItems : section === "shapes" ? shapeItems : borderItems;
  const [displayItems, setDisplayItems] = useState(items);
  const isSortableSection = section === "fixing-methods" || section === "shapes";
  const tableHeadings =
    section === "fixing-methods"
      ? [{ title: "" }, { title: "Preview" }, { title: "Label" }, { title: "Price" }, { title: "Default" }, { title: "Actions" }]
      : section === "shapes"
        ? [{ title: "" }, { title: "Preview" }, { title: "Label" }, { title: "Price" }, { title: "Default" }, { title: "Surface pricing" }, { title: "Actions" }]
        : [{ title: "Preview" }, { title: "Label" }, { title: "Price" }, { title: "Default" }, { title: "Actions" }];
  const fixingMethodManagedOptions = useMemo(
    () => getManagedFixingMethodOptions(managedFixingMethods),
    [managedFixingMethods],
  );
  const shapeManagedOptions = useMemo(() => getManagedShapeOptions(managedShapes), [managedShapes]);
  const borderManagedOptions = useMemo(() => getManagedBorderOptions(managedBorders), [managedBorders]);

  const getPreviewForItem = (item: any) => {
    if (String(item?.mode || "") === "custom" && item?.previewImg) {
      return String(item.previewImg);
    }
    if (section === "fixing-methods") {
      return fixingMethodManagedOptions.find((option) => option.value === Number(item.fixingMethodId))?.image || "";
    }
    if (section === "shapes") {
      return shapeManagedOptions.find((option) => option.value === Number(item.shapeId))?.image || "";
    }
    return borderManagedOptions.find((option) => option.value === Number(item.manageBorderId))?.image || "";
  };

  useEffect(() => {
    setShowForm(false);
    setEditingIndex(null);
  }, [section, configuration?.data]);

  useEffect(() => {
    setDisplayItems(items);
  }, [items]);

  useEffect(() => {
    if (section !== "borders") return;
    setBorderSettings(getBorderSettingsState(data));
  }, [data, section]);

  useEffect(() => {
    if (!isSortableSection || !tableWrapperRef.current || showForm || displayItems.length <= 1) return;
    const tbody = tableWrapperRef.current.querySelector("tbody");
    if (!tbody) return;

    sortableRef.current?.destroy();
    sortableRef.current = Sortable.create(tbody, {
      handle: ".drag-handle",
      animation: 120,
      onEnd: (evt) => {
        const oldIndex = evt.oldIndex ?? -1;
        const newIndex = evt.newIndex ?? -1;
        if (oldIndex < 0 || newIndex < 0 || oldIndex === newIndex) return;

        setDisplayItems((current) => {
          const orderedIds = Array.from(
            tbody.querySelectorAll<HTMLElement>("tr[data-id], tr[id]"),
          )
            .map((element) => element.dataset.id || element.getAttribute("id"))
            .filter((value): value is string => Boolean(value));

          if (orderedIds.length !== current.length) return current;

          const itemsMap = new Map(
            current.map((item, index) => [String(item.id || String(index)), item]),
          );
          const nextItems = orderedIds
            .map((id) => itemsMap.get(id))
            .filter((item): item is any => Boolean(item));

          if (nextItems.length !== current.length) return current;

          submit(
            {
              operation: `save-${section}`,
              items: JSON.stringify(nextItems),
            },
            { method: "POST" },
          );

          return nextItems;
        });
      },
    });

    return () => {
      sortableRef.current?.destroy();
      sortableRef.current = null;
    };
  }, [displayItems, isSortableSection, section, showForm, submit]);

  const openAddForm = () => {
    setEditingIndex(null);
    if (section === "fixing-methods") {
      const option = getManagedFixingMethodOptions(managedFixingMethods)[0];
      setEditingFixingMethod({
        ...emptyFixingMethod(),
        fixingMethodId: Number(option?.value ?? -1),
        mode: option ? "managed" : "custom",
        label: String(option?.label || ""),
        previewImg: String(option?.image || ""),
        description: String(option?.description || ""),
        isDefault: fixingItems.length === 0,
      });
    }
    if (section === "shapes") {
      const option = getManagedShapeOptions(managedShapes)[0];
      setEditingShape({
        ...emptyShape(),
        shapeId: Number(option?.value ?? 0),
        label: String(option?.label || ""),
        isDefault: shapeItems.length === 0,
      });
    }
    if (section === "borders") {
      const option = getManagedBorderOptions(managedBorders)[0];
      setEditingBorder({
        ...emptyBorder(),
        manageBorderId: Number(option?.value ?? 0),
        label: String(option?.label || ""),
        isDefault: borderItems.length === 0,
      });
    }
    setShowForm(true);
  };

  const openEditForm = (index: number) => {
    setEditingIndex(index);
    if (section === "fixing-methods") setEditingFixingMethod(fixingItems[index]);
    if (section === "shapes") setEditingShape(shapeItems[index]);
    if (section === "borders") setEditingBorder(borderItems[index]);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingIndex(null);
  };

  const saveItem = () => {
    const payload =
      section === "fixing-methods"
        ? editingFixingMethod
        : section === "shapes"
          ? editingShape
          : editingBorder;

    submit(
      {
        operation: editingIndex === null ? `add-${section}` : `update-${section}`,
        ...(editingIndex !== null ? { index: String(editingIndex) } : {}),
        item: JSON.stringify(payload),
      },
      { method: "POST" },
    );
    closeForm();
  };

  const deleteItem = (index: number) => {
    submit(
      {
        operation: `delete-${section}`,
        index: String(index),
      },
      { method: "POST" },
    );
  };

  const setDefaultItem = (index: number) => {
    submit(
      {
        operation: `set-default-${section}`,
        index: String(index),
      },
      { method: "POST" },
    );
  };

  const saveBorderSettings = () => {
    submit(
      {
        operation: "save-border-settings",
        settings: JSON.stringify(borderSettings),
      },
      { method: "POST" },
    );
  };

  const addBorderColor = () => {
    setBorderSettings((current) => ({
      ...current,
      colors: [
        ...current.colors,
        {
          name: "",
          codeHex: "#FFFFFF",
          additionalPrice: 0,
        },
      ],
    }));
  };

  const deleteBorderColor = (colorIndex: number) => {
    setBorderSettings((current) => ({
      ...current,
      colors: current.colors.filter((_color, index) => index !== colorIndex),
    }));
  };

  if (showForm) {
    if (section === "fixing-methods") {
      const unavailableManagedIds = fixingItems
        .filter((fixingMethod, currentIndex) => currentIndex !== editingIndex && fixingMethod.mode !== "custom")
        .map((fixingMethod) => Number(fixingMethod.fixingMethodId))
        .filter((value) => Number.isFinite(value) && value >= 0);
      return (
        <ClassicFixingMethodForm
          item={editingFixingMethod}
          managedOptions={getManagedFixingMethodOptions(managedFixingMethods)}
          unavailableManagedIds={unavailableManagedIds}
          sizeOptions={sizeOptions}
          shapeItems={shapeItems}
          isEditing={editingIndex !== null}
          isSubmitting={isSubmitting}
          onChange={setEditingFixingMethod}
          onSave={saveItem}
          onCancel={closeForm}
        />
      );
    }

    if (section === "shapes") {
      return (
        <ClassicShapeForm
          item={editingShape}
          managedOptions={getManagedShapeOptions(managedShapes)}
          isEditing={editingIndex !== null}
          isSubmitting={isSubmitting}
          onChange={setEditingShape}
          onSave={saveItem}
          onCancel={closeForm}
        />
      );
    }

    return (
      <ClassicBorderForm
        item={editingBorder}
        managedOptions={getManagedBorderOptions(managedBorders)}
        sizeOptions={sizeOptions}
        shapeItems={shapeItems}
        isEditing={editingIndex !== null}
        isSubmitting={isSubmitting}
        onChange={setEditingBorder}
        onSave={saveItem}
        onCancel={closeForm}
      />
    );
  }

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <Card>
        <Box padding="300">
          <InlineStack align="space-between" blockAlign="center">
            <div>
              <Text as="h2" variant="headingLg">
                {titleBySection[section]}
              </Text>
              <Text as="p" tone="subdued">
                {descriptionBySection[section]}
              </Text>
            </div>
            <InlineStack gap="200">
              {section === "fixing-methods" ? (
                <Button url="/app/settings/fixing-method">Manage fixing methods</Button>
              ) : null}
              <Button icon={PlusIcon} variant="primary" tone="success" onClick={openAddForm}>
                {section === "fixing-methods" ? "Add fixing method" : section === "shapes" ? "Add shape" : "Add border"}
              </Button>
            </InlineStack>
          </InlineStack>
        </Box>
      </Card>

      <Card>
        <Box padding="300">
          <Text as="h3" variant="headingMd">
            {titleBySection[section]} List
          </Text>
          <Box paddingBlockStart="200" />
          <div ref={tableWrapperRef}>
            <IndexTable
              resourceName={{ singular: titleBySection[section], plural: titleBySection[section] }}
              itemCount={displayItems.length}
              selectable={false}
              headings={tableHeadings}
            >
              {displayItems.map((item: any, index: number) => (
                <IndexTable.Row id={String(item.id || index)} key={String(item.id || index)} position={index} data-id={String(item.id || index)}>
                  {isSortableSection ? (
                    <IndexTable.Cell>
                      <div
                        className="drag-handle"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: displayItems.length > 1 ? "grab" : "default",
                          color: "#6B7280",
                        }}
                      >
                        <Icon source={DragHandleIcon} />
                      </div>
                    </IndexTable.Cell>
                  ) : null}
                  <IndexTable.Cell>
                  <div
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: 8,
                      border: "1px solid #D0D5DD",
                      background: "#F8F9FB",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      overflow: "hidden",
                    }}
                  >
                    {getPreviewForItem(item) ? (
                      <img
                        src={fileUrl(getPreviewForItem(item))}
                        alt={item.label}
                        style={{ width: "100%", height: "100%", objectFit: "contain" }}
                      />
                    ) : (
                      <Text as="span" tone="subdued">
                        -
                      </Text>
                    )}
                  </div>
                  </IndexTable.Cell>
                  <IndexTable.Cell>
                  <Text as="span" fontWeight="semibold">
                    {item.label}
                  </Text>
                  </IndexTable.Cell>
                  <IndexTable.Cell>{item.additionalPrice ?? 0}</IndexTable.Cell>
                  <IndexTable.Cell>
                  <InlineStack gap="200" blockAlign="center">
                    <Text as="span" tone="subdued">
                      No
                    </Text>
                    <ToggleButton
                      type="radio"
                      name={`${section}-default`}
                      value={String(item.id || index)}
                      checked={Boolean(item.isDefault)}
                      onChange={() => setDefaultItem(index)}
                    />
                    <Text as="span" tone="subdued">
                      Yes
                    </Text>
                  </InlineStack>
                  </IndexTable.Cell>
                  {section === "shapes" ? (
                    <IndexTable.Cell>{item.enablePricingBySurface ? `Yes (${item.surface || 0})` : "No"}</IndexTable.Cell>
                  ) : null}
                  <IndexTable.Cell>
                  <InlineStack gap="200">
                    <Button icon={EditIcon} onClick={() => openEditForm(index)}>
                      Edit
                    </Button>
                    <Button icon={DeleteIcon} tone="critical" onClick={() => deleteItem(index)}>
                      Delete
                    </Button>
                  </InlineStack>
                  </IndexTable.Cell>
                </IndexTable.Row>
              ))}
            </IndexTable>
          </div>
        </Box>
      </Card>

      {section === "borders" ? (
        <Card>
          <Box padding="300">
            <div style={{ display: "grid", gap: 16 }}>
              <div>
                <Text as="h3" variant="headingMd">
                  Border Settings
                </Text>
                <Text as="p" tone="subdued">
                  Control border width support and the border color palette shown in the configurator.
                </Text>
              </div>

              <InlineStack gap="600" wrap>
                <InlineStack gap="200" blockAlign="center">
                  <Text as="span">Enable border width</Text>
                  <ToggleButton
                    type="checkbox"
                    name="enable-border-width"
                    value="yes"
                    checked={Boolean(borderSettings.enableBorderWidth)}
                    onChange={() =>
                      setBorderSettings((current) => ({
                        ...current,
                        enableBorderWidth: !current.enableBorderWidth,
                      }))
                    }
                  />
                </InlineStack>
                <InlineStack gap="200" blockAlign="center">
                  <Text as="span">Enable border color</Text>
                  <ToggleButton
                    type="checkbox"
                    name="enable-border-color"
                    value="yes"
                    checked={Boolean(borderSettings.enableBorderColor)}
                    onChange={() =>
                      setBorderSettings((current) => ({
                        ...current,
                        enableBorderColor: !current.enableBorderColor,
                      }))
                    }
                  />
                </InlineStack>
              </InlineStack>

              {borderSettings.enableBorderColor ? (
                <>
                  <TextField
                    label="Border colors label"
                    autoComplete="off"
                    value={borderSettings.borderColorsLabel}
                    onChange={(value) =>
                      setBorderSettings((current) => ({
                        ...current,
                        borderColorsLabel: value,
                      }))
                    }
                  />

                  <FileInput
                    title="Custom color preview image"
                    buttonTitle="Upload image"
                    path={borderSettings.customColorsPrevImg}
                    handlePath={(value: string) =>
                      setBorderSettings((current) => ({
                        ...current,
                        customColorsPrevImg: String(value || ""),
                      }))
                    }
                  />

                  <Divider />

                  <div style={{ display: "grid", gap: 12 }}>
                    <InlineStack align="space-between" blockAlign="center">
                      <Text as="h4" variant="headingSm">
                        Border Colors
                      </Text>
                      <Button onClick={addBorderColor}>Add color</Button>
                    </InlineStack>

                    {borderSettings.colors.length === 0 ? (
                      <Text as="p" tone="subdued">
                        No border colors configured.
                      </Text>
                    ) : null}

                    {borderSettings.colors.map((color, colorIndex) => (
                      <Card key={`border-color-${colorIndex}`}>
                        <Box padding="300">
                          <div style={{ display: "grid", gap: 12 }}>
                            <TextField
                              label="Name"
                              autoComplete="off"
                              value={String(color.name || "")}
                              onChange={(value) =>
                                setBorderSettings((current) => ({
                                  ...current,
                                  colors: current.colors.map((entry, index) =>
                                    index === colorIndex
                                      ? { ...entry, name: value }
                                      : entry,
                                  ),
                                }))
                              }
                            />

                            <TextColorField
                              label="Color"
                              color={String(color.codeHex || "#FFFFFF")}
                              setColor={(value: string) =>
                                setBorderSettings((current) => ({
                                  ...current,
                                  colors: current.colors.map((entry, index) =>
                                    index === colorIndex
                                      ? { ...entry, codeHex: String(value || "#FFFFFF") }
                                      : entry,
                                  ),
                                }))
                              }
                            />

                            <TextField
                              label="Additional price"
                              type="number"
                              autoComplete="off"
                              value={String(color.additionalPrice ?? 0)}
                              onChange={(value) =>
                                setBorderSettings((current) => ({
                                  ...current,
                                  colors: current.colors.map((entry, index) =>
                                    index === colorIndex
                                      ? { ...entry, additionalPrice: value }
                                      : entry,
                                  ),
                                }))
                              }
                              onBlur={() =>
                                setBorderSettings((current) => ({
                                  ...current,
                                  colors: current.colors.map((entry, index) =>
                                    index === colorIndex
                                      ? {
                                          ...entry,
                                          additionalPrice:
                                            Number(entry.additionalPrice || 0) || 0,
                                        }
                                      : entry,
                                  ),
                                }))
                              }
                            />

                            <InlineStack align="end">
                              <Button tone="critical" onClick={() => deleteBorderColor(colorIndex)}>
                                Delete color
                              </Button>
                            </InlineStack>
                          </div>
                        </Box>
                      </Card>
                    ))}
                  </div>
                </>
              ) : null}

              <InlineStack align="end">
                <Button variant="primary" onClick={saveBorderSettings} loading={isSubmitting}>
                  Save settings
                </Button>
              </InlineStack>
            </div>
          </Box>
        </Card>
      ) : null}
    </div>
  );
}

export default ClassicRequiredStructuralScreen;
