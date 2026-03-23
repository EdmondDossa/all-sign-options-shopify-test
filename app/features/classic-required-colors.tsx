import {
  Box,
  Button,
  Card,
  IndexTable,
  InlineStack,
  Text,
  TextField,
} from "@shopify/polaris";
import { DeleteIcon, EditIcon, PlusIcon } from "@shopify/polaris-icons";
import { useEffect, useMemo, useState } from "react";
import { useNavigation, useOutletContext, useSubmit } from "@remix-run/react";
import ClassicColorForm from "~/components/layouts/ClassicColorForm";
import { FileInput } from "~/components/inputs/FileInput";
import { SaveButton, ToggleButton } from "~/components/buttons";
import useHandleFlashMessage from "~/hooks/useHandleFlashMessage";
import {
  emptyColor,
  getColorsState,
  parseConfigData,
  renderColorPreview,
  type ColorItem,
} from "~/features/classic-required-colors.shared";
import type { ConfigCustomColor } from "~/types/ConfigDataType";

export function ClassicRequiredColorsScreen() {
  const { configuration } = useOutletContext<{ configuration: any }>();
  const submit = useSubmit();
  const navigation = useNavigation();

  useHandleFlashMessage();

  const data = useMemo(() => parseConfigData(configuration?.data) || {}, [configuration?.data]);
  const colorsState = useMemo(() => getColorsState(data), [data]);
  const currencySymbol = String(data?.currencySymbol || data?.settings?.currencySymbol || "$");

  const [showForm, setShowForm] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingColor, setEditingColor] = useState<ColorItem>(emptyColor());
  const [customColorsState, setCustomColorsState] = useState<ConfigCustomColor>(
    colorsState.customColors,
  );
  const [itemsState, setItemsState] = useState<ColorItem[]>(colorsState.items);

  const isSubmitting = navigation.state === "submitting";

  useEffect(() => {
    setCustomColorsState(colorsState.customColors);
    setItemsState(colorsState.items);
  }, [colorsState]);

  const closeForm = () => {
    setShowForm(false);
    setEditingIndex(null);
    setEditingColor(emptyColor());
  };

  const openAddForm = () => {
    setEditingIndex(null);
    setEditingColor({
      ...emptyColor(),
      isDefault: itemsState.length === 0,
    });
    setShowForm(true);
  };

  const openEditForm = (index: number) => {
    setEditingIndex(index);
    setEditingColor(itemsState[index]);
    setShowForm(true);
  };

  const saveColor = () => {
    submit(
      {
        operation: editingIndex === null ? "add-color" : "update-color",
        ...(editingIndex !== null ? { index: String(editingIndex) } : {}),
        color: JSON.stringify(editingColor),
      },
      { method: "POST" },
    );
    closeForm();
  };

  const saveSettings = () => {
    submit(
      {
        operation: "save-settings",
        settings: JSON.stringify(customColorsState),
      },
      { method: "POST" },
    );
  };

  const handleDelete = (index: number) => {
    submit(
      {
        operation: "delete-color",
        index: String(index),
      },
      { method: "POST" },
    );
  };

  const setDefaultColor = (index: number) => {
    submit(
      {
        operation: "set-default-color",
        index: String(index),
      },
      { method: "POST" },
    );
  };

  return (
    <div style={{ display: "grid", gap: 12 }}>
      {!showForm ? (
        <Card>
          <Box padding="300">
            <InlineStack align="space-between" blockAlign="center">
              <div>
                <Text as="h2" variant="headingLg">
                  Colors
                </Text>
                <Text as="p" tone="subdued">
                  Manage the classic color records, then exclude them from materials when needed.
                </Text>
              </div>
              <Button icon={PlusIcon} variant="primary" tone="success" onClick={openAddForm}>
                Add new color
              </Button>
            </InlineStack>
          </Box>
        </Card>
      ) : null}

      {showForm ? (
        <ClassicColorForm
          item={editingColor}
          currencySymbol={currencySymbol}
          isEditing={editingIndex !== null}
          isSubmitting={isSubmitting}
          onChange={setEditingColor}
          onSave={saveColor}
          onCancel={closeForm}
        />
      ) : null}

      {!showForm ? (
        <>
          <Card>
            <Box padding="300">
              <Text as="h3" variant="headingMd">
                Colors List
              </Text>
              <Box paddingBlockStart="200" />
              <IndexTable
                resourceName={{ singular: "color", plural: "colors" }}
                itemCount={itemsState.length}
                selectable={false}
                headings={[
                  { title: "Preview" },
                  { title: "Name" },
                  { title: "Text color" },
                  { title: "Default" },
                  { title: "Actions" },
                ]}
              >
                {itemsState.map((item, index) => (
                  <IndexTable.Row
                    id={item.id || String(index)}
                    key={item.id || String(index)}
                    position={index}
                  >
                    <IndexTable.Cell>{renderColorPreview(item)}</IndexTable.Cell>
                    <IndexTable.Cell>
                      <Text as="span" fontWeight="semibold">
                        {item.name}
                      </Text>
                    </IndexTable.Cell>
                    <IndexTable.Cell>
                      {item.textColor.active ? item.textColor.name || "Enabled" : "Disabled"}
                    </IndexTable.Cell>
                    <IndexTable.Cell>
                      <InlineStack gap="200" blockAlign="center">
                        <Text as="span" tone="subdued">
                          No
                        </Text>
                        <ToggleButton
                          type="radio"
                          name="colors-default"
                          value={item.id || String(index)}
                          checked={Boolean(item.isDefault)}
                          onChange={() => setDefaultColor(index)}
                        />
                        <Text as="span" tone="subdued">
                          Yes
                        </Text>
                      </InlineStack>
                    </IndexTable.Cell>
                    <IndexTable.Cell>
                      <InlineStack gap="200">
                        <Button icon={EditIcon} onClick={() => openEditForm(index)}>
                          Edit
                        </Button>
                        <Button
                          tone="critical"
                          icon={DeleteIcon}
                          onClick={() => handleDelete(index)}
                        >
                          Delete
                        </Button>
                      </InlineStack>
                    </IndexTable.Cell>
                  </IndexTable.Row>
                ))}
              </IndexTable>
            </Box>
          </Card>

          <Card>
            <Box padding="300">
              <div style={{ display: "grid", gap: 16 }}>
                <div>
                  <Text as="h3" variant="headingMd">
                    Custom Colors
                  </Text>
                  <Text as="p" tone="subdued">
                    Keep the same classic fields used for custom color settings.
                  </Text>
                </div>

                <InlineStack align="space-between" blockAlign="center">
                  <div>
                    <Text as="span">Enable custom colors</Text>
                  </div>
                  <InlineStack gap="200" blockAlign="center">
                    <Text as="span" tone="subdued">
                      No
                    </Text>
                    <ToggleButton
                      checked={Boolean(customColorsState.active)}
                      onChange={(checked) =>
                        setCustomColorsState((current) => ({
                          ...current,
                          active: Boolean(checked),
                        }))
                      }
                    />
                    <Text as="span" tone="subdued">
                      Yes
                    </Text>
                  </InlineStack>
                </InlineStack>

                {customColorsState.active ? (
                  <>
                    <TextField
                      label="Label"
                      value={String(customColorsState.label || "")}
                      onChange={(value) =>
                        setCustomColorsState((current) => ({
                          ...current,
                          label: value,
                        }))
                      }
                      autoComplete="off"
                    />

                    <FileInput
                      title="Preview image"
                      type="image"
                      path={String(customColorsState.prevImg || "")}
                      handlePath={(value: string) =>
                        setCustomColorsState((current) => ({
                          ...current,
                          prevImg: value,
                        }))
                      }
                      helperText="Preview image for the custom colors option."
                    />
                  </>
                ) : null}

                <InlineStack align="end">
                  <SaveButton onClick={saveSettings} disabled={isSubmitting}>
                    Save settings
                  </SaveButton>
                </InlineStack>
              </div>
            </Box>
          </Card>
        </>
      ) : null}
    </div>
  );
}

export default ClassicRequiredColorsScreen;
