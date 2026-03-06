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
import type { ConfigColor, ConfigCustomColor } from "~/types/ConfigDataType";
import { ReactSwitchCustom } from "~/components/inputs/ReactSwitchCustom";
import { DeleteIcon, EditIcon } from "@shopify/polaris-icons";
import { FileInput } from "~/components/inputs/FileInput";
import NcpcRowActions from "~/components/ncpc/NcpcRowActions";
import { BackBtn, BiSaveBtn } from "~/components/buttons";

interface NcpcColorsManagerProps {
  colors: ConfigColor[];
  customColors: ConfigCustomColor;
}

interface ColorEditorState {
  name: string;
  codeHex: string;
  additionalPrice: number | string;
}

const emptyColor: ColorEditorState = {
  name: "",
  codeHex: "#000000",
  additionalPrice: 0,
};

export default function NcpcColorsManager({ colors, customColors }: NcpcColorsManagerProps) {
  const submit = useSubmit();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const [editorOpen, setEditorOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [formData, setFormData] = useState<ColorEditorState>(emptyColor);
  const [customState, setCustomState] = useState<ConfigCustomColor>(customColors);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const submitOperation = (operation: string, payload: Record<string, string>) => {
    submit({ operation, ...payload }, { method: "POST" });
  };

  const openCreate = () => {
    setEditingIndex(null);
    setFormData({ ...emptyColor });
    setEditorOpen(true);
  };

  const openEdit = (index: number) => {
    const color = colors[index];
    setEditingIndex(index);
    setFormData({
      name: color?.name || "",
      codeHex: color?.textColor?.codeHex || "#000000",
      additionalPrice: color?.additionalPrice || 0,
    });
    setEditorOpen(true);
  };

  const saveColor = () => {
    const operation = editingIndex === null ? "add-color" : "update-color";
    const payload: Record<string, string> = {
      color: JSON.stringify(formData),
    };
    if (editingIndex !== null) payload.index = String(editingIndex);
    submitOperation(operation, payload);
    setEditorOpen(false);
  };

  const deleteColor = (index: number) => {
    submitOperation("delete-color", { index: String(index) });
  };

  const setDefault = (index: number) => {
    submitOperation("set-default-color", { index: String(index) });
  };

  const saveCustomSettings = () => {
    submitOperation("save-custom-colors", {
      customColors: JSON.stringify(customState),
    });
  };

  const rows = useMemo(
    () =>
      (colors || []).map((color, index) => {
        return (
          <IndexTable.Row id={`${index}`} key={`${index}`} position={index}>
            <IndexTable.Cell>
              <InlineStack gap="200" blockAlign="center">
                <span
                  style={{
                    width: 16,
                    height: 16,
                    borderRadius: "100%",
                    backgroundColor: color?.textColor?.codeHex || "#000000",
                    border: "1px solid #d0d0d0",
                  }}
                />
                {color?.name}
              </InlineStack>
            </IndexTable.Cell>
            <IndexTable.Cell>{color?.textColor?.codeHex || "-"}</IndexTable.Cell>
            <IndexTable.Cell className="td-center">{`${color?.additionalPrice || 0}`}</IndexTable.Cell>
            <IndexTable.Cell className="td-center">
              <ReactSwitchCustom
                checked={Boolean(color?.isDefault)}
                setChecked={() => (!color?.isDefault ? setDefault(index) : "")}
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
                    onAction: () => deleteColor(index),
                  },
                ]}
              />
            </IndexTable.Cell>
          </IndexTable.Row>
        );
      }),
    [colors],
  );

  return (
    <div style={{ display: "grid", gap: "12px" }}>
      <Card>
        <Box padding="300">
          <InlineStack align="space-between" blockAlign="center">
            <Text as="h2" variant="headingMd">
              Colors
            </Text>
            {!editorOpen && (
              <Button onClick={openCreate} variant="primary">
                Add Color
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
                  label="Name"
                  value={String(formData.name || "")}
                  onChange={(value) => setFormData((curr) => ({ ...curr, name: value }))}
                  autoComplete="off"
                />
                <InlineStack gap="200" align="start">
                  <TextField
                    label="Hex color"
                    value={String(formData.codeHex || "")}
                    onChange={(value) => setFormData((curr) => ({ ...curr, codeHex: value }))}
                    autoComplete="off"
                  />
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
                </InlineStack>
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
                  title="Save"
                  onClick={saveColor}
                  isLoading={isSubmitting}
                  type="button"
                />
              </InlineStack>
            </Box>
          </>
        ) : isClient ? (
          <IndexTable
            resourceName={{ singular: "Color", plural: "Colors" }}
            itemCount={colors?.length || 0}
            selectable={false}
            headings={[
              { title: "Color" },
              { title: "Hex" },
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
              Loading colors...
            </Text>
          </Box>
        )}
      </Card>

      <Card>
        <Box padding="300">
          <Text as="h2" variant="headingMd">
            Custom Colors Settings
          </Text>
          <div style={{ marginTop: "10px", display: "grid", gap: "10px" }}>
            <InlineStack align="space-between" blockAlign="center">
              <Text as="span">Enable custom colors</Text>
              <ReactSwitchCustom
                checked={Boolean(customState?.active)}
                setChecked={() =>
                  setCustomState((curr) => ({
                    ...curr,
                    active: !Boolean(curr?.active),
                  }))
                }
              />
            </InlineStack>

            <TextField
              label="Custom colors label"
              value={String(customState?.label || "")}
              onChange={(value) =>
                setCustomState((curr) => ({
                  ...curr,
                  label: value,
                }))
              }
              autoComplete="off"
            />

            <div style={{ maxWidth: "380px" }}>
              <FileInput
                title="Preview image"
                path={String(customState?.prevImg || "")}
                handlePath={(value: string) =>
                  setCustomState((curr) => ({
                    ...curr,
                    prevImg: value,
                  }))
                }
              />
            </div>

            <InlineStack align="end">
              <BiSaveBtn
                title="Save Custom Settings"
                onClick={saveCustomSettings}
                isLoading={isSubmitting}
                type="button"
              />
            </InlineStack>
          </div>
        </Box>
      </Card>
    </div>
  );
}
