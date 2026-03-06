import {
  Box,
  Button,
  Card,
  Divider,
  IndexTable,
  InlineStack,
  Text,
  TextField,
} from "@shopify/polaris";
import { useNavigation, useSubmit } from "@remix-run/react";
import { useEffect, useMemo, useState } from "react";
import type { NcpcOptionGroup } from "~/types/NcpcDataType";
import { FileInput } from "~/components/inputs/FileInput";
import { DeleteIcon, EditIcon } from "@shopify/polaris-icons";
import { fileUrl } from "~/utils/fileUrl";
import NcpcOptionItemsManager from "~/components/ncpc/NcpcOptionItemsManager";
import NcpcRowActions from "~/components/ncpc/NcpcRowActions";
import { BackBtn, BiSaveBtn } from "~/components/buttons";

interface NcpcCustomGroupsManagerProps {
  groups: NcpcOptionGroup[];
}

const emptyGroup: NcpcOptionGroup = {
  title: "",
  description: "",
  icon: "",
  options: [],
};

export default function NcpcCustomGroupsManager({ groups }: NcpcCustomGroupsManagerProps) {
  const submit = useSubmit();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const [editorOpen, setEditorOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [selectedGroupIndex, setSelectedGroupIndex] = useState<number | null>(null);
  const [isClient, setIsClient] = useState(false);

  const [formData, setFormData] = useState<NcpcOptionGroup>(emptyGroup);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const submitOperation = (operation: string, payload: Record<string, string>) => {
    submit({ operation, ...payload }, { method: "POST" });
  };

  const openCreate = () => {
    setEditingIndex(null);
    setFormData({ ...emptyGroup });
    setEditorOpen(true);
  };

  const openEdit = (index: number) => {
    setEditingIndex(index);
    setFormData({ ...groups[index] });
    setEditorOpen(true);
  };

  const saveGroup = () => {
    const operation = editingIndex === null ? "add-group" : "update-group";
    const payload: Record<string, string> = {
      group: JSON.stringify(formData),
    };
    if (editingIndex !== null) payload.index = String(editingIndex);
    submitOperation(operation, payload);
    setEditorOpen(false);
  };

  const deleteGroup = (index: number) => {
    submitOperation("delete-group", { index: String(index) });
    if (selectedGroupIndex === index) {
      setSelectedGroupIndex(null);
    }
  };

  const rows = useMemo(
    () =>
      (groups || []).map((group, index) => {
        return (
          <IndexTable.Row id={`${index}`} key={`${index}`} position={index}>
            <IndexTable.Cell>{group.title}</IndexTable.Cell>
            <IndexTable.Cell>{group.description}</IndexTable.Cell>
            <IndexTable.Cell className="td-center">
              {group.icon ? (
                <img
                  src={fileUrl(group.icon)}
                  alt={group.title || "group icon"}
                  style={{ width: 26, height: 26, objectFit: "contain" }}
                />
              ) : (
                "-"
              )}
            </IndexTable.Cell>
            <IndexTable.Cell className="td-center">{group.options?.length || 0}</IndexTable.Cell>
            <IndexTable.Cell className="td-center">
              <InlineStack gap="200" align="center">
                <Button onClick={() => setSelectedGroupIndex(index)}>Manage Options</Button>
                <NcpcRowActions
                  actions={[
                    { content: "Edit", icon: EditIcon, onAction: () => openEdit(index) },
                    {
                      content: "Delete",
                      icon: DeleteIcon,
                      destructive: true,
                      onAction: () => deleteGroup(index),
                    },
                  ]}
                />
              </InlineStack>
            </IndexTable.Cell>
          </IndexTable.Row>
        );
      }),
    [groups, selectedGroupIndex],
  );

  const selectedGroup =
    selectedGroupIndex !== null && selectedGroupIndex >= 0
      ? groups[selectedGroupIndex]
      : null;

  return (
    <div style={{ display: "grid", gap: "12px" }}>
      <Card>
        <Box padding="300">
          <InlineStack align="space-between" blockAlign="center">
            <Text as="h2" variant="headingMd">
              Custom Additional Groups
            </Text>
            {!editorOpen && (
              <Button onClick={openCreate} variant="primary">
                Add Group
              </Button>
            )}
          </InlineStack>
        </Box>
        <Divider borderWidth="025" />

        {editorOpen ? (
          <>
            <Box padding="300">
              <div style={{ display: "grid", gap: "10px" }}>
                <TextField
                  label="Title"
                  value={String(formData.title || "")}
                  onChange={(value) => setFormData((curr) => ({ ...curr, title: value }))}
                  autoComplete="off"
                />
                <TextField
                  label="Description"
                  value={String(formData.description || "")}
                  onChange={(value) => setFormData((curr) => ({ ...curr, description: value }))}
                  autoComplete="off"
                />
                <div style={{ maxWidth: "380px" }}>
                  <FileInput
                    title="Icon"
                    path={String(formData.icon || "")}
                    handlePath={(value: string) =>
                      setFormData((curr) => ({ ...curr, icon: value }))
                    }
                  />
                </div>
              </div>
            </Box>
            <Divider borderWidth="025" />
            <Box padding="300">
              <InlineStack align="end" gap="200">
                <BackBtn
                  title="Cancel"
                  onClick={() => setEditorOpen(false)}
                  isLoading={isSubmitting}
                />
                <BiSaveBtn
                  title="Save Group"
                  onClick={saveGroup}
                  isLoading={isSubmitting}
                  type="button"
                />
              </InlineStack>
            </Box>
          </>
        ) : isClient ? (
          <IndexTable
            resourceName={{ singular: "Group", plural: "Groups" }}
            itemCount={groups?.length || 0}
            selectable={false}
            headings={[
              { title: "Title" },
              { title: "Description" },
              { title: "Icon", alignment: "center" },
              { title: "Options", alignment: "center" },
              { title: "Action", alignment: "center" },
            ]}
          >
            {rows}
          </IndexTable>
        ) : (
          <Box padding="300">
            <Text as="p" tone="subdued">
              Loading groups...
            </Text>
          </Box>
        )}
      </Card>

      {selectedGroup && (
        <NcpcOptionItemsManager
          title={`Options - ${selectedGroup.title}`}
          subtitle="Manage options inside this custom group"
          sectionPath={`additionalOptions.customAdditionalsOptions.${selectedGroupIndex}.options`}
          items={selectedGroup.options || []}
        />
      )}
    </div>
  );
}
