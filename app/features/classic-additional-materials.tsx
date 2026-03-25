import { Box, Button, Card, Icon, IndexTable, InlineStack, Text } from "@shopify/polaris";
import { DeleteIcon, DragHandleIcon, EditIcon, PlusIcon } from "@shopify/polaris-icons";
import { useEffect, useMemo, useRef, useState } from "react";
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
import Sortable from "~/utils/sortable-adapter";

type LoaderData = {
  managedFixingMethods?: any[];
  managedShapes?: any[];
} | null;

export function ClassicAdditionalMaterialsScreen() {
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
  const [displayItems, setDisplayItems] = useState(materialState.items);

  const isSubmitting = navigation.state === "submitting";
  const currencySymbol = String(data?.currencySymbol || data?.settings?.currencySymbol || "$");

  useEffect(() => {
    setShowForm(false);
    setEditingIndex(null);
    setEditingMaterial(emptyMaterial());
  }, [configuration?.data]);

  useEffect(() => {
    setDisplayItems(materialState.items);
  }, [materialState.items]);

  useEffect(() => {
    if (!tableWrapperRef.current || showForm || displayItems.length <= 1) return;
    const tbody = tableWrapperRef.current.querySelector("tbody");
    if (!tbody) return;

    sortableRef.current?.destroy();
    sortableRef.current = Sortable.create(tbody, {
      handle: ".material-drag-handle",
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
            .filter((item): item is MaterialItem => Boolean(item));

          if (nextItems.length !== current.length) return current;

          submit(
            {
              operation: "save-materials",
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
          <div ref={tableWrapperRef}>
            <IndexTable
              resourceName={{ singular: "material", plural: "materials" }}
              itemCount={displayItems.length}
              selectable={false}
              headings={[
                { title: "Move" },
                { title: "Preview" },
                { title: "Label" },
                { title: "Price" },
                { title: "Pricing" },
                { title: "Default" },
                { title: "Actions" },
              ]}
            >
            {displayItems.map((item, index) => (
              <IndexTable.Row id={item.id || String(index)} key={item.id || String(index)} position={index} data-id={item.id || String(index)}>
                <IndexTable.Cell>
                  <div
                    className="material-drag-handle"
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
          </div>
        </Box>
      </Card>
    </div>
  );
}

export default ClassicAdditionalMaterialsScreen;
