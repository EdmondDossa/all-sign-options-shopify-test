import {
  Box,
  Button,
  Card,
  Divider,
  IndexTable,
  InlineStack,
  Select,
  Text,
  TextField,
} from "@shopify/polaris";
import { useNavigation, useSubmit } from "@remix-run/react";
import { useEffect, useMemo, useState } from "react";
import type {
  ConfigCustomSize,
  ConfigSize,
  configSizeThickness,
  ThicknessValue,
} from "~/types/ConfigDataType";
import { ReactSwitchCustom } from "~/components/inputs/ReactSwitchCustom";
import { DeleteIcon, EditIcon } from "@shopify/polaris-icons";
import NcpcRowActions from "~/components/ncpc/NcpcRowActions";
import { BackBtn, BiSaveBtn } from "~/components/buttons";

interface NcpcSizesManagerProps {
  sizes: ConfigSize[];
  customSize: ConfigCustomSize;
  thickness: configSizeThickness;
}

const emptySize: ConfigSize = {
  label: "",
  width: 0,
  height: 0,
  textNumber: 0,
  maxTextChar: 0,
  charPrice: 0,
  basePrice: 0,
  startPriceAtChar: 0,
  isDefault: false,
};

export default function NcpcSizesManager({
  sizes,
  customSize,
  thickness,
}: NcpcSizesManagerProps) {
  const submit = useSubmit();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const [editorOpen, setEditorOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [formData, setFormData] = useState<ConfigSize>(emptySize);
  const [isClient, setIsClient] = useState(false);

  const [customState, setCustomState] = useState<ConfigCustomSize>(customSize);
  const [thicknessState, setThicknessState] = useState<configSizeThickness>(thickness);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const submitOperation = (operation: string, payload: Record<string, string>) => {
    submit({ operation, ...payload }, { method: "POST" });
  };

  const openCreate = () => {
    setEditingIndex(null);
    setFormData({ ...emptySize });
    setEditorOpen(true);
  };

  const openEdit = (index: number) => {
    setEditingIndex(index);
    setFormData({ ...sizes[index] });
    setEditorOpen(true);
  };

  const saveSize = () => {
    const operation = editingIndex === null ? "add-size" : "update-size";
    const payload: Record<string, string> = {
      size: JSON.stringify(formData),
    };
    if (editingIndex !== null) payload.index = String(editingIndex);

    submitOperation(operation, payload);
    setEditorOpen(false);
  };

  const deleteSize = (index: number) => {
    submitOperation("delete-size", { index: String(index) });
  };

  const setDefault = (index: number) => {
    submitOperation("set-default-size", { index: String(index) });
  };

  const saveCustomAndThickness = () => {
    submitOperation("save-custom-size", {
      customSize: JSON.stringify(customState),
      thickness: JSON.stringify(thicknessState),
    });
  };

  const addThicknessValue = () => {
    const nextValue: ThicknessValue = {
      label: "",
      value: 0,
      pricingType: "additional",
      additionalPrice: 0,
      multiplier: 1,
    };

    setThicknessState((curr) => ({
      ...curr,
      values: [...(curr?.values || []), nextValue],
    }));
  };

  const rows = useMemo(
    () =>
      (sizes || []).map((size, index) => {
        return (
          <IndexTable.Row id={`${index}`} key={`${index}`} position={index}>
            <IndexTable.Cell>{size.label}</IndexTable.Cell>
            <IndexTable.Cell>{`${size.width} x ${size.height}`}</IndexTable.Cell>
            <IndexTable.Cell className="td-center">{`${size.basePrice}`}</IndexTable.Cell>
            <IndexTable.Cell className="td-center">
              <ReactSwitchCustom
                checked={Boolean(size.isDefault)}
                setChecked={() => (!size.isDefault ? setDefault(index) : "")}
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
                    onAction: () => deleteSize(index),
                  },
                ]}
              />
            </IndexTable.Cell>
          </IndexTable.Row>
        );
      }),
    [sizes],
  );

  return (
    <div style={{ display: "grid", gap: "12px" }}>
      <Card>
        <Box padding="300">
          <InlineStack align="space-between" blockAlign="center">
            <Text as="h2" variant="headingMd">
              Sizes
            </Text>
            {!editorOpen && (
              <Button onClick={openCreate} variant="primary">
                Add Size
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
                  label="Label"
                  value={String(formData.label || "")}
                  onChange={(value) => setFormData((curr) => ({ ...curr, label: value }))}
                  autoComplete="off"
                />
                <InlineStack gap="200" align="start">
                  <TextField
                    label="Width"
                    type="number"
                    value={String(formData.width || 0)}
                    onChange={(value) => setFormData((curr) => ({ ...curr, width: value }))}
                    onBlur={() =>
                      setFormData((curr) => ({
                        ...curr,
                        width: parseFloat(String(curr.width || 0)) || 0,
                      }))
                    }
                    autoComplete="off"
                  />
                  <TextField
                    label="Height"
                    type="number"
                    value={String(formData.height || 0)}
                    onChange={(value) => setFormData((curr) => ({ ...curr, height: value }))}
                    onBlur={() =>
                      setFormData((curr) => ({
                        ...curr,
                        height: parseFloat(String(curr.height || 0)) || 0,
                      }))
                    }
                    autoComplete="off"
                  />
                </InlineStack>
                <InlineStack gap="200" align="start">
                  <TextField
                    label="Base Price"
                    type="number"
                    value={String(formData.basePrice || 0)}
                    onChange={(value) => setFormData((curr) => ({ ...curr, basePrice: value }))}
                    onBlur={() =>
                      setFormData((curr) => ({
                        ...curr,
                        basePrice: parseFloat(String(curr.basePrice || 0)) || 0,
                      }))
                    }
                    autoComplete="off"
                  />
                  <TextField
                    label="Char Price"
                    type="number"
                    value={String(formData.charPrice || 0)}
                    onChange={(value) => setFormData((curr) => ({ ...curr, charPrice: value }))}
                    onBlur={() =>
                      setFormData((curr) => ({
                        ...curr,
                        charPrice: parseFloat(String(curr.charPrice || 0)) || 0,
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
                  onClick={saveSize}
                  isLoading={isSubmitting}
                  type="button"
                />
              </InlineStack>
            </Box>
          </>
        ) : isClient ? (
          <IndexTable
            resourceName={{ singular: "Size", plural: "Sizes" }}
            itemCount={sizes?.length || 0}
            selectable={false}
            headings={[
              { title: "Label" },
              { title: "Dimensions" },
              { title: "Base Price", alignment: "center" },
              { title: "Default", alignment: "center" },
              { title: "Action", alignment: "center" },
            ]}
          >
            {rows}
          </IndexTable>
        ) : (
          <Box padding="300">
            <Text as="p" tone="subdued">
              Loading sizes...
            </Text>
          </Box>
        )}
      </Card>

      <Card>
        <Box padding="300">
          <Text as="h2" variant="headingMd">
            Custom Size & Thickness
          </Text>
          <div style={{ marginTop: "10px", display: "grid", gap: "10px" }}>
            <InlineStack align="space-between" blockAlign="center">
              <Text as="span">Enable custom size</Text>
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

            <InlineStack gap="200" align="start">
              <TextField
                label="Width label"
                value={String(customState?.width?.label || "")}
                onChange={(value) =>
                  setCustomState((curr) => ({
                    ...curr,
                    width: { ...(curr.width || { min: 0, max: 0, label: "" }), label: value },
                  }))
                }
                autoComplete="off"
              />
              <TextField
                label="Height label"
                value={String(customState?.height?.label || "")}
                onChange={(value) =>
                  setCustomState((curr) => ({
                    ...curr,
                    height: { ...(curr.height || { min: 0, max: 0, label: "" }), label: value },
                  }))
                }
                autoComplete="off"
              />
            </InlineStack>

            <InlineStack align="space-between" blockAlign="center">
              <Text as="span">Enable thickness</Text>
              <ReactSwitchCustom
                checked={Boolean(thicknessState?.active)}
                setChecked={() =>
                  setThicknessState((curr) => ({
                    ...curr,
                    active: !Boolean(curr?.active),
                  }))
                }
              />
            </InlineStack>

            {Array.isArray(thicknessState?.values) &&
              thicknessState.values.map((entry: any, index) => (
                <Card key={`thickness-${index}`}>
                  <Box padding="200">
                    <InlineStack gap="200" align="space-between" blockAlign="center">
                      <Text as="span" variant="bodyMd">
                        Thickness #{index + 1}
                      </Text>
                      <Button
                        variant="plain"
                        tone="critical"
                        onClick={() =>
                          setThicknessState((curr) => ({
                            ...curr,
                            values: (curr.values || []).filter((_, i) => i !== index),
                          }))
                        }
                      >
                        Remove
                      </Button>
                    </InlineStack>
                    <div style={{ display: "grid", gap: "8px", marginTop: "8px" }}>
                      <TextField
                        label="Label"
                        value={String(entry?.label || "")}
                        onChange={(value) =>
                          setThicknessState((curr) => ({
                            ...curr,
                            values: (curr.values || []).map((v: any, i: number) =>
                              i === index ? { ...v, label: value } : v,
                            ),
                          }))
                        }
                        autoComplete="off"
                      />
                      <InlineStack gap="200" align="start">
                        <TextField
                          label="Value"
                          type="number"
                          value={String(entry?.value || 0)}
                          onChange={(value) =>
                            setThicknessState((curr) => ({
                              ...curr,
                              values: (curr.values || []).map((v: any, i: number) =>
                                i === index ? { ...v, value } : v,
                              ),
                            }))
                          }
                          autoComplete="off"
                        />
                        <Select
                          label="Pricing Type"
                          options={[
                            { label: "Additional", value: "additional" },
                            { label: "Multiplier", value: "multiplier" },
                          ]}
                          value={String(entry?.pricingType || "additional")}
                          onChange={(value) =>
                            setThicknessState((curr) => ({
                              ...curr,
                              values: (curr.values || []).map((v: any, i: number) =>
                                i === index ? { ...v, pricingType: value } : v,
                              ),
                            }))
                          }
                        />
                      </InlineStack>
                    </div>
                  </Box>
                </Card>
              ))}

            <InlineStack align="space-between" blockAlign="center">
              <Button onClick={addThicknessValue}>Add Thickness Value</Button>
              <BiSaveBtn
                title="Save Custom Settings"
                onClick={saveCustomAndThickness}
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
