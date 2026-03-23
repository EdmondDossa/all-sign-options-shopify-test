import { Box, Button, Card, IndexTable, InlineGrid, InlineStack, Select, Text, TextField } from "@shopify/polaris";
import { DeleteIcon, EditIcon, PlusIcon } from "@shopify/polaris-icons";
import { useEffect, useMemo, useState } from "react";
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
  const patch = (next: Partial<RequiredComponentItem>) => onChange({ ...value, ...next });

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
    patch({
      options: [...value.options, { ...emptyComponentOption(), isDefault: value.options.length === 0 }],
    });
  };

  const removeOption = (optionIndex: number) => {
    patch({
      options: ensureOneDefault(value.options.filter((_option, index) => index !== optionIndex)),
    });
  };

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

          <div style={{ display: "grid", gap: 12 }}>
            {value.options.map((option, optionIndex) => (
              <Card key={option.id || optionIndex}>
                <Box padding="300">
                  <div style={{ display: "grid", gap: 12 }}>
                    <InlineStack align="space-between" blockAlign="center">
                      <Text as="h4" variant="headingSm">
                        {option.label || `Option ${optionIndex + 1}`}
                      </Text>
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
                      </InlineStack>
                    </InlineStack>

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
                  </div>
                </Box>
              </Card>
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
  const isSubmitting = navigation.state === "submitting";

  useEffect(() => {
    setShowForm(false);
    setEditingIndex(null);
    setEditingItem(emptyComponent());
  }, [configuration?.data]);

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
          <IndexTable
            resourceName={{ singular: "component", plural: "components" }}
            itemCount={state.items.length}
            selectable={false}
            headings={[
              { title: "Component" },
              { title: "Options" },
              { title: "Default" },
              { title: "Actions" },
            ]}
          >
            {state.items.map((item, index) => (
              <IndexTable.Row id={item.id || String(index)} key={item.id || String(index)} position={index}>
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
        </Box>
      </Card>
    </div>
  );
}

export default ClassicRequiredComponentsScreen;
