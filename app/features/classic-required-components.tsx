import { Box, Button, Card, Icon, IndexTable, InlineGrid, InlineStack, Select, Text, TextField } from "@shopify/polaris";
import { ChevronDownIcon, ChevronUpIcon, DeleteIcon, DragHandleIcon, EditIcon, PlusIcon } from "@shopify/polaris-icons";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLoaderData, useNavigation, useOutletContext, useSubmit } from "@remix-run/react";
import { MultiCombobox } from "~/components/inputs/MultiCombobox";
import { SaveButton, ToggleButton } from "~/components/buttons";
import { FileInput } from "~/components/inputs/FileInput";
import useHandleFlashMessage from "~/hooks/useHandleFlashMessage";
import {
  emptyComponent,
  emptyComponentOption,
  ensureOneDefault,
  getComponentsState,
  type RequiredComponentItem,
  type RequiredComponentOptionItem,
} from "~/features/classic-required-components.shared";
import { parseConfigData, getSizeOptions, getShapesState, getFixingMethodsState } from "~/features/classic-required-structural.shared";
import Sortable from "~/utils/sortable-adapter";

type LoaderData = {
  managedFixingMethods?: any[];
  managedShapes?: any[];
} | null;

function ComponentForm({
  value,
  sizeOptions,
  shapeOptions,
  fixingOptions,
  isEditing,
  isSubmitting,
  onChange,
  onSave,
  onCancel,
}: {
  value: RequiredComponentItem;
  sizeOptions: Array<{ label: string; value: string }>;
  shapeOptions: Array<{ label: string; value: string }>;
  fixingOptions: Array<{ label: string; value: string }>;
  isEditing: boolean;
  isSubmitting: boolean;
  onChange: (next: RequiredComponentItem) => void;
  onSave: () => void;
  onCancel: () => void;
}) {
  const [collapsedOptions, setCollapsedOptions] = useState<Record<string, boolean>>({});
  const optionsWrapperRef = useRef<HTMLDivElement | null>(null);
  const optionsSortableRef = useRef<Sortable | null>(null);

  const getOptionKey = (option: RequiredComponentOptionItem, optionIndex: number) =>
    String(option.id || `option-${optionIndex}`);

  const getOptionSummary = (option: RequiredComponentOptionItem) =>
    [
      option.selection.sizeId ? "size selected" : "no size",
      option.selection.shapeId ? "shape selected" : "no shape",
      `${option.selection.fixingMethodIds.length} fixing`,
    ].join(" · ");
  const allOptionsCollapsed =
    value.options.length > 1 &&
    value.options.every((option, optionIndex) => Boolean(collapsedOptions[getOptionKey(option, optionIndex)]));

  const patch = useCallback(
    (next: Partial<RequiredComponentItem>) => onChange({ ...value, ...next }),
    [onChange, value],
  );

  const patchOption = (optionIndex: number, next: Partial<RequiredComponentOptionItem>) => {
    const nextOptions = [...value.options];
    nextOptions[optionIndex] = { ...nextOptions[optionIndex], ...next };
    patch({ options: nextOptions });
  };

  const setDefaultOption = (optionIndex: number) => {
    patch({
      options: ensureOneDefault(value.options, optionIndex),
    });
  };

  const addOption = () => {
    const nextOption = { ...emptyComponentOption(), isDefault: value.options.length === 0 };
    patch({
      options: [...value.options, nextOption],
    });
    setCollapsedOptions((current) => ({
      ...current,
      [getOptionKey(nextOption, value.options.length)]: false,
    }));
  };

  const removeOption = (optionIndex: number) => {
    const optionKey = getOptionKey(value.options[optionIndex], optionIndex);
    patch({
      options: ensureOneDefault(value.options.filter((_option, index) => index !== optionIndex)),
    });
    setCollapsedOptions((current) => {
      const next = { ...current };
      delete next[optionKey];
      return next;
    });
  };

  useEffect(() => {
    if (!optionsWrapperRef.current || value.options.length <= 1 || !allOptionsCollapsed) return;

    optionsSortableRef.current?.destroy();
    optionsSortableRef.current = Sortable.create(optionsWrapperRef.current, {
      handle: ".option-drag-handle",
      animation: 120,
      draggable: ".component-option-card",
      onEnd: (evt) => {
        const oldIndex = evt.oldIndex ?? -1;
        const newIndex = evt.newIndex ?? -1;
        if (oldIndex < 0 || newIndex < 0 || oldIndex === newIndex) return;

        const orderedIds = Array.from(
          optionsWrapperRef.current?.querySelectorAll<HTMLElement>(".component-option-card") || [],
        )
          .map((element) => element.dataset.id)
          .filter((value): value is string => Boolean(value));

        if (orderedIds.length !== value.options.length) return;

        const optionsMap = new Map(
          value.options.map((option, optionIndex) => [getOptionKey(option, optionIndex), option]),
        );
        const nextOptions = orderedIds
          .map((id) => optionsMap.get(id))
          .filter((option): option is RequiredComponentOptionItem => Boolean(option));

        if (nextOptions.length !== value.options.length) return;
        patch({ options: nextOptions });
      },
    });

    return () => {
      optionsSortableRef.current?.destroy();
      optionsSortableRef.current = null;
    };
  }, [allOptionsCollapsed, patch, value.options]);

  return (
    <Card>
      <Box padding="300">
        <div style={{ display: "grid", gap: 16 }}>
          <Text as="h2" variant="headingMd">
            {isEditing ? "Edit component" : "Add component"}
          </Text>

          <InlineGrid columns={{ xs: 1, md: 2 }} gap="400">
            <TextField
              label="Label"
              autoComplete="off"
              value={String(value.label || "")}
              onChange={(nextValue) => patch({ label: nextValue })}
            />
            <FileInput
              title="Icon"
              type="image"
              path={String(value.icon || "")}
              handlePath={(nextValue: string) => patch({ icon: nextValue })}
            />
          </InlineGrid>

          <TextField
            label="Description"
            autoComplete="off"
            multiline={3}
            value={String(value.description || "")}
            onChange={(nextValue) => patch({ description: nextValue })}
          />

          <Text as="h3" variant="headingMd">
            Component options
          </Text>

          <div ref={optionsWrapperRef} style={{ display: "grid", gap: 12 }}>
            {value.options.map((option, optionIndex) => (
              <div
                key={option.id || optionIndex}
                className="component-option-card"
                data-id={getOptionKey(option, optionIndex)}
                data-collapsed={Boolean(collapsedOptions[getOptionKey(option, optionIndex)])}
              >
                <Card>
                <Box padding="300">
                  <div style={{ display: "grid", gap: 12 }}>
                    {(() => {
                      const optionKey = getOptionKey(option, optionIndex);
                      const isCollapsed = Boolean(collapsedOptions[optionKey]);
                      return (
                        <>
                    <InlineStack align="space-between" blockAlign="center">
                      <InlineStack gap="300" blockAlign="center">
                        {allOptionsCollapsed ? (
                          <div
                            className="option-drag-handle"
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              justifyContent: "center",
                              cursor: value.options.length > 1 ? "grab" : "default",
                              color: "#4B5563",
                              border: "1px solid #D0D5DD",
                              borderRadius: 999,
                              padding: "6px 10px",
                              background: "#F8F9FB",
                              flexShrink: 0,
                            }}
                          >
                            <Icon source={DragHandleIcon} />
                          </div>
                        ) : null}
                        <div style={{ display: "grid", gap: 4 }}>
                          <Text as="h4" variant="headingSm">
                            {option.label || `Option ${optionIndex + 1}`}
                          </Text>
                          <Text as="span" tone="subdued" variant="bodySm">
                            {getOptionSummary(option)}
                          </Text>
                        </div>
                      </InlineStack>
                      <InlineStack gap="200" blockAlign="center">
                        <Text as="span" tone="subdued">Default</Text>
                        <ToggleButton
                          type="radio"
                          name="component-options-default"
                          value={option.id || String(optionIndex)}
                          checked={Boolean(option.isDefault)}
                          onChange={() => setDefaultOption(optionIndex)}
                        />
                        <Button tone="critical" onClick={() => removeOption(optionIndex)}>
                          Remove
                        </Button>
                        <Button
                          icon={isCollapsed ? ChevronDownIcon : ChevronUpIcon}
                          onClick={() =>
                            setCollapsedOptions((current) => ({
                              ...current,
                              [optionKey]: !isCollapsed,
                            }))
                          }
                        >
                          {isCollapsed ? "Expand" : "Collapse"}
                        </Button>
                      </InlineStack>
                    </InlineStack>

                    {!isCollapsed ? (
                      <>
                    <InlineGrid columns={{ xs: 1, md: 2 }} gap="400">
                      <TextField
                        label="Label"
                        autoComplete="off"
                        value={String(option.label || "")}
                        onChange={(nextValue) => patchOption(optionIndex, { label: nextValue })}
                      />
                      <FileInput
                        title="Icon"
                        type="image"
                        path={String(option.icon || "")}
                        handlePath={(nextValue: string) => patchOption(optionIndex, { icon: nextValue })}
                      />
                    </InlineGrid>

                    <InlineGrid columns={{ xs: 1, md: 2 }} gap="400">
                      <TextField
                        label="Description"
                        autoComplete="off"
                        value={String(option.description || "")}
                        onChange={(nextValue) => patchOption(optionIndex, { description: nextValue })}
                      />
                      <FileInput
                        title="Background image"
                        type="image"
                        path={String(option.image || "")}
                        handlePath={(nextValue: string) => patchOption(optionIndex, { image: nextValue })}
                      />
                    </InlineGrid>

                    <InlineGrid columns={{ xs: 1, md: 2 }} gap="400">
                      <Select
                        label="Size"
                        options={[
                          { label: "Select size", value: "" },
                          ...sizeOptions,
                        ]}
                        value={option.selection.sizeId || ""}
                        onChange={(value) =>
                          patchOption(optionIndex, {
                            selection: { ...option.selection, sizeId: value },
                          })
                        }
                      />
                      <Select
                        label="Shape"
                        options={[
                          { label: "Select shape", value: "" },
                          ...shapeOptions,
                        ]}
                        value={option.selection.shapeId || ""}
                        onChange={(value) =>
                          patchOption(optionIndex, {
                            selection: { ...option.selection, shapeId: value },
                          })
                        }
                      />
                    </InlineGrid>

                    <MultiCombobox
                      label="Fixing methods"
                      placeholder="Select fixing methods"
                      data={fixingOptions}
                      selectedOptions={option.selection.fixingMethodIds}
                      setSelectedOptions={(nextValue: string[]) =>
                        patchOption(optionIndex, {
                          selection: { ...option.selection, fixingMethodIds: nextValue.map(String) },
                        })
                      }
                    />

                    <TextField
                      label="Additional price"
                      type="number"
                      autoComplete="off"
                      value={String(option.overrides.additionalPrice ?? 0)}
                      onChange={(nextValue) =>
                        patchOption(optionIndex, {
                          overrides: { additionalPrice: nextValue },
                        })
                      }
                      onBlur={() =>
                        patchOption(optionIndex, {
                          overrides: {
                            additionalPrice: parseFloat(String(option.overrides.additionalPrice || 0)) || 0,
                          },
                        })
                      }
                    />
                    </>
                  ) : null}
                        </>
                      );
                    })()}
                  </div>
                </Box>
                </Card>
              </div>
            ))}
          </div>

          <InlineStack align="start">
            <Button variant="primary" onClick={addOption}>
              Add option
            </Button>
          </InlineStack>

          <InlineStack align="end" gap="200" blockAlign="center">
            <Button onClick={onCancel}>Back to components</Button>
            <SaveButton onClick={onSave} loading={isSubmitting} disabled={!String(value.label || "").trim()}>
              {isEditing ? "Update component" : "Save component"}
            </SaveButton>
          </InlineStack>
        </div>
      </Box>
    </Card>
  );
}

export function ClassicRequiredComponentsScreen() {
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

  const state = useMemo(
    () => getComponentsState({ data, managedFixingMethods, managedShapes }),
    [data, managedFixingMethods, managedShapes],
  );

  const sizeOptions = useMemo(
    () => getSizeOptions(data).map((item) => ({ label: item.label, value: item.id })),
    [data],
  );
  const shapeOptions = useMemo(
    () =>
      getShapesState(data, managedShapes).map((item) => ({
        label: item.label,
        value: item.id,
      })),
    [data, managedShapes],
  );
  const fixingOptions = useMemo(
    () =>
      getFixingMethodsState(data, managedFixingMethods, getSizeOptions(data), getShapesState(data, managedShapes)).map((item) => ({
        label: item.label,
        value: item.id,
      })),
    [data, managedFixingMethods, managedShapes],
  );

  const [showForm, setShowForm] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingItem, setEditingItem] = useState<RequiredComponentItem>(emptyComponent());
  const [displayItems, setDisplayItems] = useState(state.items);
  const isSubmitting = navigation.state === "submitting";

  useEffect(() => {
    setShowForm(false);
    setEditingIndex(null);
    setEditingItem(emptyComponent());
  }, [configuration?.data]);

  useEffect(() => {
    setDisplayItems(state.items);
  }, [state.items]);

  useEffect(() => {
    if (!tableWrapperRef.current || showForm || displayItems.length <= 1) return;
    const tbody = tableWrapperRef.current.querySelector("tbody");
    if (!tbody) return;

    sortableRef.current?.destroy();
    sortableRef.current = Sortable.create(tbody, {
      handle: ".component-drag-handle",
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
            .filter((item): item is RequiredComponentItem => Boolean(item));

          if (nextItems.length !== current.length) return current;

          submit(
            {
              operation: "save-components",
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
  }, [displayItems, showForm, submit]);

  const openCreate = () => {
    setEditingIndex(null);
    setEditingItem({ ...emptyComponent(), isDefault: state.items.length === 0 });
    setShowForm(true);
  };

  const openEdit = (index: number) => {
    setEditingIndex(index);
    setEditingItem(state.items[index]);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingIndex(null);
    setEditingItem(emptyComponent());
  };

  const saveItem = () => {
    submit(
      {
        operation: editingIndex === null ? "add-components" : "update-components",
        ...(editingIndex !== null ? { index: String(editingIndex) } : {}),
        item: JSON.stringify(editingItem),
      },
      { method: "POST" },
    );
    closeForm();
  };

  const deleteItem = (index: number) => {
    submit({ operation: "delete-components", index: String(index) }, { method: "POST" });
  };

  const setDefault = (index: number) => {
    submit({ operation: "set-default-components", index: String(index) }, { method: "POST" });
  };

  if (showForm) {
    return (
      <ComponentForm
        value={editingItem}
        sizeOptions={sizeOptions}
        shapeOptions={shapeOptions}
        fixingOptions={fixingOptions}
        isEditing={editingIndex !== null}
        isSubmitting={isSubmitting}
        onChange={setEditingItem}
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
                Components
              </Text>
              <Text as="p" tone="subdued">
                Create reusable components and assign sizes, shapes and fixing methods from the global required options.
              </Text>
            </div>
            <Button icon={PlusIcon} variant="primary" tone="success" onClick={openCreate}>
              Add component
            </Button>
          </InlineStack>
        </Box>
      </Card>

      <Card>
        <Box padding="300">
          <div ref={tableWrapperRef}>
            <IndexTable
              resourceName={{ singular: "component", plural: "components" }}
              itemCount={displayItems.length}
              selectable={false}
              headings={[
                { title: "Move" },
                { title: "Component" },
                { title: "Options" },
                { title: "Default" },
                { title: "Actions" },
              ]}
            >
              {displayItems.map((item, index) => (
                <IndexTable.Row id={item.id || String(index)} key={item.id || String(index)} position={index} data-id={item.id || String(index)}>
                <IndexTable.Cell>
                  <div
                    className="component-drag-handle"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: displayItems.length > 1 ? "grab" : "default",
                      color: "#4B5563",
                      border: "1px solid #D0D5DD",
                      borderRadius: 999,
                      padding: "6px 8px",
                      background: "#F8F9FB",
                    }}
                  >
                    <Icon source={DragHandleIcon} />
                  </div>
                </IndexTable.Cell>
                <IndexTable.Cell>
                  <div style={{ display: "grid", gap: 6 }}>
                    <Text as="span" fontWeight="semibold">
                      {item.label}
                    </Text>
                    {item.description ? (
                      <Text as="span" tone="subdued" variant="bodySm">
                        {item.description}
                      </Text>
                    ) : null}
                  </div>
                </IndexTable.Cell>
                <IndexTable.Cell>{item.options.length}</IndexTable.Cell>
                <IndexTable.Cell>
                  <InlineStack gap="200" blockAlign="center">
                    <Text as="span" tone="subdued">No</Text>
                    <ToggleButton
                      type="radio"
                      name="components-default"
                      value={item.id || String(index)}
                      checked={Boolean(item.isDefault)}
                      onChange={() => setDefault(index)}
                    />
                    <Text as="span" tone="subdued">Yes</Text>
                  </InlineStack>
                </IndexTable.Cell>
                <IndexTable.Cell>
                  <InlineStack gap="200">
                    <Button icon={EditIcon} onClick={() => openEdit(index)}>
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
    </div>
  );
}

export default ClassicRequiredComponentsScreen;
