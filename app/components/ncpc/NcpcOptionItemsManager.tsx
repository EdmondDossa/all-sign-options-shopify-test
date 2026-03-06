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
import type { NcpcOptionItem } from "~/types/NcpcDataType";
import { FileInput } from "~/components/inputs/FileInput";
import { ReactSwitchCustom } from "~/components/inputs/ReactSwitchCustom";
import { DeleteIcon, EditIcon } from "@shopify/polaris-icons";
import { fileUrl } from "~/utils/fileUrl";
import NcpcRowActions from "~/components/ncpc/NcpcRowActions";
import { BackBtn, BiSaveBtn } from "~/components/buttons";

interface NcpcOptionItemsManagerProps {
  title: string;
  subtitle?: string;
  sectionPath: string;
  items: any[];
}

const emptyItem: NcpcOptionItem = {
  title: "",
  description: "",
  icon: "",
  popImg: "",
  additionalPrice: 0,
  isDefault: false,
};

export default function NcpcOptionItemsManager({
  title,
  subtitle,
  sectionPath,
  items,
}: NcpcOptionItemsManagerProps) {
  const submit = useSubmit();
  const navigation = useNavigation();

  const [editorOpen, setEditorOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [isClient, setIsClient] = useState(false);

  const [formData, setFormData] = useState<NcpcOptionItem>(emptyItem);

  const toFormItem = (item: any): NcpcOptionItem => ({
    title: String(item?.title ?? item?.label ?? ""),
    description: String(item?.description ?? ""),
    icon: String(item?.icon ?? item?.previewImg ?? ""),
    popImg: String(item?.popImg ?? item?.popupImg ?? ""),
    additionalPrice:
      item?.additionalPrice != null
        ? item.additionalPrice
        : Number(item?.price?.value || 0),
    isDefault: Boolean(item?.isDefault ?? item?.default),
  });

  const toStoredItem = (value: NcpcOptionItem, existing?: any) => {
    const isCustomGroupPath = sectionPath.includes("customAdditionalsOptions");
    const isNestedNcpcOptionPath = /(\.materials|\.jackets|\.backboards|\.backboardColors|\.mountings)$/.test(
      sectionPath,
    );
    const hasLabelShape = !isCustomGroupPath && Boolean(existing?.label || existing?.price);

    if (hasLabelShape) {
      return {
        ...existing,
        label: String(value.title || ""),
        description: String(value.description || ""),
        previewImg: String(value.icon || ""),
        popupImg: String(value.popImg || ""),
        isDefault: Boolean(existing?.isDefault ?? existing?.default ?? false),
        default: Boolean(existing?.default ?? existing?.isDefault ?? false),
        price: {
          ...(existing?.price || {}),
          type:
            existing?.price?.type ||
            (Number(value.additionalPrice || 0) > 0 ? "base" : "none"),
          value: Number(value.additionalPrice || 0),
        },
      };
    }

    if (!isCustomGroupPath && !existing && isNestedNcpcOptionPath) {
      return {
        label: String(value.title || ""),
        description: String(value.description || ""),
        previewImg: String(value.icon || ""),
        popupImg: String(value.popImg || ""),
        isDefault: false,
        default: false,
        price: {
          type: Number(value.additionalPrice || 0) > 0 ? "base" : "none",
          value: Number(value.additionalPrice || 0),
        },
      };
    }

    return {
      ...existing,
      title: String(value.title || ""),
      description: String(value.description || ""),
      icon: String(value.icon || ""),
      popImg: String(value.popImg || ""),
      additionalPrice: Number(value.additionalPrice || 0),
      isDefault: Boolean(existing?.isDefault ?? false),
      default: Boolean(existing?.default ?? false),
    };
  };

  const isSubmitting = navigation.state === "submitting";

  useEffect(() => {
    setIsClient(true);
  }, []);

  const openCreate = () => {
    setEditingIndex(null);
    setFormData({ ...emptyItem });
    setEditorOpen(true);
  };

  const openEdit = (index: number) => {
    setEditingIndex(index);
    setFormData(toFormItem(items[index]));
    setEditorOpen(true);
  };

  const closeEditor = () => {
    if (isSubmitting) return;
    setEditorOpen(false);
  };

  const submitOperation = (operation: string, payload: Record<string, string>) => {
    submit(
      {
        operation,
        sectionPath,
        ...payload,
      },
      { method: "POST" },
    );
  };

  const saveItem = () => {
    const operation = editingIndex === null ? "add-item" : "update-item";
    const currentItem = editingIndex !== null ? items[editingIndex] : undefined;
    const payload: Record<string, string> = {
      item: JSON.stringify(toStoredItem(formData, currentItem)),
    };

    if (editingIndex !== null) {
      payload.index = String(editingIndex);
    }

    submitOperation(operation, payload);
    setEditorOpen(false);
  };

  const deleteItem = (index: number) => {
    submitOperation("delete-item", { index: String(index) });
  };

  const setDefault = (index: number) => {
    submitOperation("set-default-item", { index: String(index) });
  };

  const rows = useMemo(
    () =>
      (items || []).map((item, index) => {
        const itemTitle = String(item?.title ?? item?.label ?? "");
        const itemDescription = String(item?.description ?? "");
        const itemIcon = String(item?.icon ?? item?.previewImg ?? "");
        const itemPrice =
          item?.additionalPrice != null ? item.additionalPrice : Number(item?.price?.value || 0);
        const itemDefault = Boolean(item?.isDefault ?? item?.default);
        return (
          <IndexTable.Row id={`${index}`} key={`${index}`} position={index}>
            <IndexTable.Cell>{itemTitle}</IndexTable.Cell>
            <IndexTable.Cell>{itemDescription}</IndexTable.Cell>
            <IndexTable.Cell className="td-center">
              {itemIcon ? (
                <img
                  src={fileUrl(itemIcon)}
                  alt={itemTitle || "option icon"}
                  style={{ width: 26, height: 26, objectFit: "contain" }}
                />
              ) : (
                "-"
              )}
            </IndexTable.Cell>
            <IndexTable.Cell className="td-center">{`${itemPrice}`}</IndexTable.Cell>
            <IndexTable.Cell className="td-center">
              <ReactSwitchCustom
                checked={itemDefault}
                setChecked={() => (!itemDefault ? setDefault(index) : "")}
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
                    onAction: () => deleteItem(index),
                  },
                ]}
              />
            </IndexTable.Cell>
          </IndexTable.Row>
        );
      }),
    [items],
  );

  return (
    <Card>
      <Box padding="300">
        <InlineStack align="space-between" blockAlign="center">
          <div>
            <Text as="h2" variant="headingMd">
              {title}
            </Text>
            {subtitle ? (
              <Text as="p" tone="subdued">
                {subtitle}
              </Text>
            ) : null}
          </div>
          {!editorOpen && (
            <Button onClick={openCreate} variant="primary">
              Add Option
            </Button>
          )}
        </InlineStack>
      </Box>
      <Divider borderWidth="025" />

      {editorOpen ? (
        <>
          <Box padding="300">
            <InlineStack gap="300" align="space-between">
              <Text as="h3" variant="headingSm">
                {editingIndex === null ? "Create option" : "Update option"}
              </Text>
            </InlineStack>
            <div style={{ marginTop: "10px", display: "grid", gap: "10px" }}>
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
              <InlineStack gap="300" align="start">
                <div style={{ minWidth: "260px" }}>
                  <FileInput
                    title="Icon"
                    path={String(formData.icon || "")}
                    handlePath={(value: string) =>
                      setFormData((curr) => ({ ...curr, icon: value }))
                    }
                  />
                </div>
                <div style={{ minWidth: "260px" }}>
                  <FileInput
                    title="Popup Image"
                    path={String(formData.popImg || "")}
                    handlePath={(value: string) =>
                      setFormData((curr) => ({ ...curr, popImg: value }))
                    }
                  />
                </div>
              </InlineStack>
              <TextField
                label="Additional Price"
                type="number"
                value={String(formData.additionalPrice || 0)}
                onChange={(value) =>
                  setFormData((curr) => ({ ...curr, additionalPrice: value }))
                }
                onBlur={() =>
                  setFormData((curr) => ({
                    ...curr,
                    additionalPrice: parseFloat(String(curr.additionalPrice || 0)) || 0,
                  }))
                }
                autoComplete="off"
              />
            </div>
          </Box>
          <Divider borderWidth="025" />
          <Box padding="300">
            <InlineStack align="end" gap="200">
              <BackBtn title="Cancel" onClick={closeEditor} isLoading={isSubmitting} />
              <BiSaveBtn
                title="Save"
                onClick={saveItem}
                isLoading={isSubmitting}
                type="button"
              />
            </InlineStack>
          </Box>
        </>
      ) : isClient ? (
        <IndexTable
          resourceName={{ singular: "Option", plural: "Options" }}
          itemCount={items?.length || 0}
          selectable={false}
          headings={[
            { title: "Title" },
            { title: "Description" },
            { title: "Icon", alignment: "center" },
            { title: "Price", alignment: "center" },
            { title: "Default", alignment: "center" },
            { title: "Action", alignment: "center" },
          ]}
        >
          {rows}
        </IndexTable>
      ) : (
        <Box padding="300">
          <Text as="p" tone="subdued">
            Loading options...
          </Text>
        </Box>
      )}
    </Card>
  );
}
