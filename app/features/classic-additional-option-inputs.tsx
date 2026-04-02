import { useMemo, useState } from "react";
import { useOutletContext, useSubmit } from "@remix-run/react";
import { Badge, Box, Button, Card, IndexTable, InlineStack, Text } from "@shopify/polaris";
import { DeleteIcon, EditIcon, PlusIcon } from "@shopify/polaris-icons";
import { CustomAdditionalOptionsForm } from "~/components/layouts";
import useHandleFlashMessage from "~/hooks/useHandleFlashMessage";
import {
  emptyClassicCustomInput,
  getClassicCustomInputsState,
  type ClassicCustomInputItem,
} from "~/features/classic-additional-option-inputs.shared";

const normalizeType = (value: unknown) => {
  const type = String(value || "").trim();
  return type || "yes/no";
};

export function ClassicAdditionalOptionInputsScreen() {
  const { configuration } = useOutletContext<{ configuration: any }>();
  const submit = useSubmit();
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

  const state = useMemo(() => getClassicCustomInputsState(data), [data]);
  const [showForm, setShowForm] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingItem, setEditingItem] = useState<ClassicCustomInputItem>(emptyClassicCustomInput());

  const openCreate = () => {
    setEditingIndex(null);
    setEditingItem(emptyClassicCustomInput());
    setShowForm(true);
  };

  const openEdit = (index: number) => {
    setEditingIndex(index);
    setEditingItem({ id: index, ...state.items[index] });
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingIndex(null);
    setEditingItem(emptyClassicCustomInput());
  };

  const saveItem = (item: ClassicCustomInputItem) => {
    submit(
      {
        operation: editingIndex === null ? "add-input" : "update-input",
        ...(editingIndex !== null ? { index: String(editingIndex) } : {}),
        item: JSON.stringify(item),
      },
      { method: "POST" },
    );
    closeForm();
  };

  const deleteItem = (index: number) => {
    submit(
      {
        operation: "delete-input",
        index: String(index),
      },
      { method: "POST" },
    );
  };

  if (showForm) {
    return (
      <CustomAdditionalOptionsForm
        customOption={editingItem}
        isEditing={editingIndex !== null}
        onSubmit={saveItem}
        onClose={closeForm}
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
                Inputs
              </Text>
              <Text as="p" tone="subdued">
                Manage standalone customer inputs using the NCPC-style input builder.
              </Text>
            </div>
            <Button icon={PlusIcon} variant="primary" tone="success" onClick={openCreate}>
              Add input
            </Button>
          </InlineStack>
        </Box>
      </Card>

      <Card>
        <Box padding="300">
          {state.items.length === 0 ? (
            <Box paddingBlock="600">
              <Text as="p" tone="subdued">
                No inputs yet.
              </Text>
            </Box>
          ) : (
            <IndexTable
              resourceName={{ singular: "input", plural: "inputs" }}
              itemCount={state.items.length}
              selectable={false}
              headings={[
                { title: "Label" },
                { title: "Type" },
                { title: "Actions" },
              ]}
            >
              {state.items.map((item, index) => (
                <IndexTable.Row id={String(index)} key={String(index)} position={index}>
                  <IndexTable.Cell>
                    <div style={{ display: "grid", gap: 4 }}>
                      <Text as="span" variant="bodyMd" fontWeight="semibold">
                        {String(item?.label || item?.title || `Input ${index + 1}`)}
                      </Text>
                      <Text as="span" tone="subdued">
                        {String(item?.description || "No description")}
                      </Text>
                    </div>
                  </IndexTable.Cell>
                  <IndexTable.Cell>
                    <Badge>{normalizeType(item?.type)}</Badge>
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
