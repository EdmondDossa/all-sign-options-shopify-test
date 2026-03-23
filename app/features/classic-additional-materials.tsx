import { Box, Button, Card, IndexTable, InlineStack, Text } from "@shopify/polaris";
import { DeleteIcon, EditIcon, PlusIcon } from "@shopify/polaris-icons";
import { useEffect, useMemo, useState } from "react";
import { useLoaderData, useNavigation, useOutletContext, useSubmit } from "@remix-run/react";
import { ToggleButton } from "~/components/buttons";
import ClassicMaterialForm from "~/components/layouts/ClassicMaterialForm";
import useHandleFlashMessage from "~/hooks/useHandleFlashMessage";
import { fileUrl } from "~/utils/fileUrl";
import {
  parseConfigData,
} from "~/features/classic-required-structural.shared";
import {
  emptyMaterial,
  getPricingOptions,
  getMaterialsState,
  type MaterialItem,
} from "~/features/classic-additional-materials.shared";
import { getComponentsState } from "~/features/classic-required-components.shared";

type LoaderData = {
  managedFixingMethods?: any[];
  managedShapes?: any[];
} | null;

export function ClassicAdditionalMaterialsScreen() {
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
  const materialState = useMemo(
    () =>
      getMaterialsState({
        data,
        managedFixingMethods,
        managedShapes,
      }),
    [data, managedFixingMethods, managedShapes],
  );
  const pricingOptions = useMemo(() => getPricingOptions(data), [data]);
  const componentItems = useMemo(
    () =>
      getComponentsState({ data, managedFixingMethods, managedShapes }).items.map((item) => ({
        id: item.id,
        label: item.label,
      })),
    [data, managedFixingMethods, managedShapes],
  );

  const [showForm, setShowForm] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingMaterial, setEditingMaterial] = useState<MaterialItem>(emptyMaterial());

  const isSubmitting = navigation.state === "submitting";
  const currencySymbol = String(data?.currencySymbol || data?.settings?.currencySymbol || "$");

  useEffect(() => {
    setShowForm(false);
    setEditingIndex(null);
    setEditingMaterial(emptyMaterial());
  }, [configuration?.data]);

  const openAddForm = () => {
    setEditingIndex(null);
    setEditingMaterial({
      ...emptyMaterial(),
      pricingId: pricingOptions[0]?.id || "",
      isDefault: materialState.items.length === 0,
    });
    setShowForm(true);
  };

  const openEditForm = (index: number) => {
    setEditingIndex(index);
    setEditingMaterial(materialState.items[index]);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingIndex(null);
    setEditingMaterial(emptyMaterial());
  };

  const saveMaterial = () => {
    submit(
      {
        operation: editingIndex === null ? "add-material" : "update-material",
        ...(editingIndex !== null ? { index: String(editingIndex) } : {}),
        material: JSON.stringify(editingMaterial),
      },
      { method: "POST" },
    );
    closeForm();
  };

  const deleteMaterial = (index: number) => {
    submit(
      {
        operation: "delete-material",
        index: String(index),
      },
      { method: "POST" },
    );
  };

  const setDefaultMaterial = (index: number) => {
    submit(
      {
        operation: "set-default-material",
        index: String(index),
      },
      { method: "POST" },
    );
  };

  if (showForm) {
    return (
      <ClassicMaterialForm
        item={editingMaterial}
        pricingOptions={pricingOptions}
        componentItems={componentItems}
        currencySymbol={currencySymbol}
        isEditing={editingIndex !== null}
        isSubmitting={isSubmitting}
        onChange={setEditingMaterial}
        onSave={saveMaterial}
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
                Materials
              </Text>
              <Text as="p" tone="subdued">
                Manage the materials available in this config, assign the pricing used by each one and exclude components when needed.
              </Text>
            </div>
            <Button icon={PlusIcon} variant="primary" tone="success" onClick={openAddForm}>
              Add material
            </Button>
          </InlineStack>
        </Box>
      </Card>

      <Card>
        <Box padding="300">
          <Text as="h3" variant="headingMd">
            Materials List
          </Text>
          <Box paddingBlockStart="200" />
          <IndexTable
            resourceName={{ singular: "material", plural: "materials" }}
            itemCount={materialState.items.length}
            selectable={false}
            headings={[
              { title: "Preview" },
              { title: "Label" },
              { title: "Price" },
              { title: "Pricing" },
              { title: "Default" },
              { title: "Actions" },
            ]}
          >
            {materialState.items.map((item, index) => (
              <IndexTable.Row id={item.id || String(index)} key={item.id || String(index)} position={index}>
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
                    {item.previewImg ? (
                      <img
                        src={fileUrl(item.previewImg)}
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
                  {pricingOptions.find((entry) => entry.id === item.pricingId)?.label || "-"}
                </IndexTable.Cell>
                <IndexTable.Cell>
                  <InlineStack gap="200" blockAlign="center">
                    <Text as="span" tone="subdued">
                      No
                    </Text>
                    <ToggleButton
                      type="radio"
                      name="materials-default"
                      value={item.id || String(index)}
                      checked={Boolean(item.isDefault)}
                      onChange={() => setDefaultMaterial(index)}
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
                    <Button icon={DeleteIcon} tone="critical" onClick={() => deleteMaterial(index)}>
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

export default ClassicAdditionalMaterialsScreen;
