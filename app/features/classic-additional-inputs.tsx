import { useMemo, useState } from "react";
import { useNavigation, useOutletContext, useSubmit } from "@remix-run/react";
import {
  Badge,
  Box,
  Button,
  Card,
  Divider,
  IndexTable,
  InlineGrid,
  InlineStack,
  Text,
  TextField,
} from "@shopify/polaris";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  DeleteIcon,
  EditIcon,
  PlusIcon,
} from "@shopify/polaris-icons";
import { FileInput } from "~/components/inputs/FileInput";
import { MultiCombobox } from "~/components/inputs/MultiCombobox";
import { ToggleButton } from "~/components/buttons";
import useHandleFlashMessage from "~/hooks/useHandleFlashMessage";
import { getColorsState } from "~/features/classic-required-colors.shared";
import {
  emptyAdditionalInput,
  emptyAdditionalInputOption,
  ensureOneDefaultOption,
  getAdditionalInputsState,
  type AdditionalInputItem,
  type AdditionalInputOptionItem,
} from "~/features/classic-additional-inputs.shared";
import { fileUrl } from "~/utils/fileUrl";

const optionSummary = (option: AdditionalInputOptionItem) => {
  const parts = [
    option.excludeColors.length > 0 ? `${option.excludeColors.length} color exclusion${option.excludeColors.length > 1 ? "s" : ""}` : "no color exclusion",
    option.enablePricingBySurface ? "surface pricing" : "flat pricing",
  ];

  return parts.join(" · ");
};

function AdditionalInputForm({
  item,
  colorOptions,
  isEditing,
  isSubmitting,
  onChange,
  onSave,
  onCancel,
}: {
  item: AdditionalInputItem;
  colorOptions: Array<{ label: string; value: string }>;
  isEditing: boolean;
  isSubmitting: boolean;
  onChange: (value: AdditionalInputItem) => void;
  onSave: () => void;
  onCancel: () => void;
}) {
  const [expandedOptions, setExpandedOptions] = useState<Record<number, boolean>>({ 0: true });

  const updateOption = (index: number, patch: Partial<AdditionalInputOptionItem>) => {
    onChange({
      ...item,
      options: item.options.map((option, optionIndex) =>
        optionIndex === index ? { ...option, ...patch } : option,
      ),
    });
  };

  const addOption = () => {
    const nextOptions = ensureOneDefaultOption([...item.options, emptyAdditionalInputOption()]);
    onChange({ ...item, options: nextOptions });
    setExpandedOptions((current) => ({ ...current, [nextOptions.length - 1]: true }));
  };

  const removeOption = (index: number) => {
    const nextOptions = item.options.filter((_option, optionIndex) => optionIndex !== index);
    onChange({
      ...item,
      options: ensureOneDefaultOption(nextOptions.length ? nextOptions : [emptyAdditionalInputOption()]),
    });
    setExpandedOptions((current) => {
      const next = { ...current };
      delete next[index];
      return next;
    });
  };

  const setDefaultOption = (targetIndex: number) => {
    onChange({
      ...item,
      options: item.options.map((option, index) => ({
        ...option,
        isDefault: index === targetIndex,
      })),
    });
  };

  const toggleExpanded = (index: number) => {
    setExpandedOptions((current) => ({ ...current, [index]: !current[index] }));
  };

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <Card>
        <Box padding="300">
          <InlineStack align="space-between" blockAlign="center">
            <div>
              <Text as="h2" variant="headingLg">
                {isEditing ? "Edit additional component" : "Add additional component"}
              </Text>
              <Text as="p" tone="subdued">
                Define the component and the options customers can choose from.
              </Text>
            </div>
          </InlineStack>
        </Box>
      </Card>

      <Card>
        <Box padding="300">
          <InlineGrid columns={{ xs: 1, md: 2 }} gap="400">
            <TextField
              label="Title"
              value={item.title}
              autoComplete="off"
              onChange={(value) => onChange({ ...item, title: value })}
            />
            <FileInput
              title="Group icon"
              buttonTitle="Upload icon"
              path={item.icon}
              handlePath={(value: string) => onChange({ ...item, icon: value })}
            />
          </InlineGrid>
          <Box paddingBlockStart="300" />
          <TextField
            label="Description"
            value={item.description}
            autoComplete="off"
            onChange={(value) => onChange({ ...item, description: value })}
          />
        </Box>
      </Card>

      <Card>
        <Box padding="300">
          <InlineStack align="space-between" blockAlign="center">
            <div>
              <Text as="h3" variant="headingMd">
                Options
              </Text>
              <Text as="p" tone="subdued">
                Add the values available for this additional component.
              </Text>
            </div>
          </InlineStack>
          <Box paddingBlockStart="300" />
          <div style={{ display: "grid", gap: 12 }}>
            {item.options.map((option, index) => {
              const expanded = Boolean(expandedOptions[index]);
              return (
                <Card key={`${index}-${option.title || "option"}`}>
                  <Box padding="300">
                    <div style={{ display: "grid", gap: 12 }}>
                      <InlineStack align="space-between" blockAlign="center">
                        <div>
                          <Text as="h4" variant="headingMd">
                            {option.title || `Option ${index + 1}`}
                          </Text>
                          <Text as="p" tone="subdued">
                            {optionSummary(option)}
                          </Text>
                        </div>
                        <InlineStack gap="300" blockAlign="center">
                          <InlineStack gap="100" blockAlign="center">
                            <Text as="span" variant="bodySm">
                              Default
                            </Text>
                            <ToggleButton
                              id={`additional-input-default-${index}`}
                              type="radio"
                              name="additional-input-default"
                              value={String(index)}
                              checked={Boolean(option.isDefault)}
                              onChange={() => setDefaultOption(index)}
                            />
                          </InlineStack>
                          <Button icon={DeleteIcon} tone="critical" variant="tertiary" onClick={() => removeOption(index)}>
                            Remove
                          </Button>
                          <Button
                            icon={expanded ? ChevronUpIcon : ChevronDownIcon}
                            variant="secondary"
                            onClick={() => toggleExpanded(index)}
                          >
                            {expanded ? "Collapse" : "Expand"}
                          </Button>
                        </InlineStack>
                      </InlineStack>

                      {expanded ? (
                        <>
                          <Divider />
                          <InlineGrid columns={{ xs: 1, md: 2 }} gap="400">
                            <TextField
                              label="Title"
                              value={option.title}
                              autoComplete="off"
                              onChange={(value) => updateOption(index, { title: value })}
                            />
                            <TextField
                              label="Description"
                              value={option.description}
                              autoComplete="off"
                              onChange={(value) => updateOption(index, { description: value })}
                            />
                          </InlineGrid>
                          <InlineGrid columns={{ xs: 1, md: 2 }} gap="400">
                            <FileInput
                              title="Option icon"
                              buttonTitle="Upload icon"
                              path={option.icon}
                              handlePath={(value: string) => updateOption(index, { icon: value })}
                            />
                            <FileInput
                              title="Popup image"
                              buttonTitle="Upload image"
                              path={option.popupImg}
                              handlePath={(value: string) => updateOption(index, { popupImg: value })}
                            />
                          </InlineGrid>
                          <InlineGrid columns={{ xs: 1, md: 2 }} gap="400">
                            <FileInput
                              title="Preview image"
                              buttonTitle="Upload preview"
                              path={option.image}
                              handlePath={(value: string) => updateOption(index, { image: value })}
                            />
                            <TextField
                              label="Additional price"
                              type="number"
                              autoComplete="off"
                              value={String(option.additionalPrice)}
                              onChange={(value) => updateOption(index, { additionalPrice: Number(value || 0) })}
                            />
                          </InlineGrid>
                          <InlineGrid columns={{ xs: 1, md: 2 }} gap="400">
                            <MultiCombobox
                              label="Exclude colors"
                              placeholder="Search colors"
                              data={colorOptions}
                              selectedOptions={option.excludeColors.map(String)}
                              setSelectedOptions={(value: string[]) => updateOption(index, { excludeColors: value })}
                            />
                            <div style={{ display: "grid", gap: 8 }}>
                              <InlineStack gap="200" blockAlign="center">
                                <Text as="span">Enable pricing by surface</Text>
                                <ToggleButton
                                  id={`additional-input-surface-${index}`}
                                  checked={Boolean(option.enablePricingBySurface)}
                                  onChange={(checked: boolean) =>
                                    updateOption(index, { enablePricingBySurface: checked })
                                  }
                                />
                              </InlineStack>
                              <TextField
                                label="Surface"
                                type="number"
                                autoComplete="off"
                                value={String(option.surface)}
                                onChange={(value) => updateOption(index, { surface: Number(value || 0) })}
                                disabled={!option.enablePricingBySurface}
                              />
                            </div>
                          </InlineGrid>
                        </>
                      ) : null}
                    </div>
                  </Box>
                </Card>
              );
            })}
          </div>
          <Box paddingBlockStart="300">
            <Button icon={PlusIcon} onClick={addOption}>
              Add option
            </Button>
          </Box>
        </Box>
      </Card>

      <InlineStack align="end" gap="300">
        <Button onClick={onCancel}>Back to additional components</Button>
        <Button variant="primary" tone="success" loading={isSubmitting} onClick={onSave}>
          Save additional component
        </Button>
      </InlineStack>
    </div>
  );
}

export function ClassicAdditionalInputsScreen() {
  const { configuration } = useOutletContext<{ configuration: any }>();
  const submit = useSubmit();
  const navigation = useNavigation();
  useHandleFlashMessage();

  const data = useMemo(() => {
    if (!configuration?.data) return {};
    if (typeof configuration.data === "string") {
      try {
        return JSON.parse(configuration.data);
      } catch {
        return {};
      }
    }
    return configuration.data || {};
  }, [configuration?.data]);

  const sectionState = useMemo(() => getAdditionalInputsState(data), [data]);
  const colorOptions = useMemo(
    () =>
      getColorsState(data).items.map((color, index) => ({
        label: color.name || `Color ${index + 1}`,
        value: String(index),
      })),
    [data],
  );

  const [showForm, setShowForm] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingItem, setEditingItem] = useState<AdditionalInputItem>(emptyAdditionalInput());

  const isSubmitting = navigation.state === "submitting";

  const openCreate = () => {
    setEditingIndex(null);
    setEditingItem(emptyAdditionalInput());
    setShowForm(true);
  };

  const openEdit = (index: number) => {
    setEditingIndex(index);
    setEditingItem(sectionState.items[index]);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingIndex(null);
    setEditingItem(emptyAdditionalInput());
  };

  const saveItem = () => {
    submit(
      {
        operation: editingIndex === null ? "add-additional-input" : "update-additional-input",
        ...(editingIndex !== null ? { index: String(editingIndex) } : {}),
        item: JSON.stringify(editingItem),
      },
      { method: "POST" },
    );
    closeForm();
  };

  const deleteItem = (index: number) => {
    submit(
      {
        operation: "delete-additional-input",
        index: String(index),
      },
      { method: "POST" },
    );
  };

  if (showForm) {
    return (
      <AdditionalInputForm
        item={editingItem}
        colorOptions={colorOptions}
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
                Additional Components
              </Text>
              <Text as="p" tone="subdued">
                Manage the reusable additional components offered in this configuration.
              </Text>
            </div>
            <Button icon={PlusIcon} variant="primary" tone="success" onClick={openCreate}>
              Add additional component
            </Button>
          </InlineStack>
        </Box>
      </Card>

      <Card>
        <Box padding="300">
          {sectionState.items.length === 0 ? (
            <Box paddingBlock="600">
              <Text as="p" tone="subdued">
                No additional components yet.
              </Text>
            </Box>
          ) : (
            <IndexTable
              resourceName={{ singular: "additional component", plural: "additional components" }}
              itemCount={sectionState.items.length}
              selectable={false}
              headings={[
                { title: "Icon" },
                { title: "Title" },
                { title: "Options" },
                { title: "Actions" },
              ]}
            >
              {sectionState.items.map((item, index) => (
                <IndexTable.Row
                  id={item.id || String(index)}
                  key={item.id || String(index)}
                  position={index}
                >
                  <IndexTable.Cell>
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: 10,
                        border: "1px solid #E3E7EC",
                        background: "#F8FAFC",
                        display: "grid",
                        placeItems: "center",
                        overflow: "hidden",
                      }}
                    >
                      {item.icon ? (
                        <img
                          src={fileUrl(item.icon)}
                          alt={item.title}
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                      ) : (
                        <Text as="span" tone="subdued">-</Text>
                      )}
                    </div>
                  </IndexTable.Cell>
                  <IndexTable.Cell>
                    <div style={{ display: "grid", gap: 4 }}>
                      <Text as="span" variant="bodyMd" fontWeight="semibold">
                        {item.title}
                      </Text>
                      <Text as="span" tone="subdued">
                        {item.description || "No description"}
                      </Text>
                    </div>
                  </IndexTable.Cell>
                  <IndexTable.Cell>
                    <InlineStack gap="200" wrap>
                      <Badge>{item.options.length} option{item.options.length > 1 ? "s" : ""}</Badge>
                    </InlineStack>
                  </IndexTable.Cell>
                  <IndexTable.Cell>
                    <InlineStack gap="200">
                      <Button icon={EditIcon} onClick={() => openEdit(index)}>
                        Edit
                      </Button>
                      <Button icon={DeleteIcon} tone="critical" variant="tertiary" onClick={() => deleteItem(index)}>
                        Delete
                      </Button>
                    </InlineStack>
                  </IndexTable.Cell>
                </IndexTable.Row>
              ))}
            </IndexTable>
          )}
        </Box>
      </Card>
    </div>
  );
}
