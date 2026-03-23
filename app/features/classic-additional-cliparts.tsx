import {
  Box,
  Button,
  Card,
  IndexTable,
  InlineGrid,
  InlineStack,
  Select,
  Text,
  TextField,
} from "@shopify/polaris";
import { DeleteIcon, PlusIcon } from "@shopify/polaris-icons";
import { useEffect, useMemo, useState } from "react";
import {
  useLoaderData,
  useNavigation,
  useOutletContext,
  useSubmit,
} from "@remix-run/react";
import { FileInput } from "~/components/inputs/FileInput";
import { ToggleButton } from "~/components/buttons";
import useHandleFlashMessage from "~/hooks/useHandleFlashMessage";
import { fileUrl } from "~/utils/fileUrl";
import {
  defaultClipartDraft,
  getClipartsState,
  type ClipartDraftItem,
  type ManagedClipartGroup,
} from "~/features/classic-additional-cliparts.shared";

type LoaderData = {
  managedClipartGroups?: ManagedClipartGroup[];
  clipartsResources?: Record<string, string[]>;
  shop?: string;
} | null;

type AddMode = "existing" | "create";
type CreateSource = "upload" | "api";

const apiClipartGroups = [
  { label: "Animals", value: "animals" },
  { label: "Arrows", value: "arrows" },
  { label: "Decoration Festivities", value: "decorationFestivities" },
  { label: "Emojis Flags", value: "emojisFlags" },
  { label: "Foods Drinks", value: "foodsDrinks" },
  { label: "Health care", value: "healthcare" },
  { label: "Household Tools", value: "householdTools" },
  { label: "Most Popular", value: "mostPopular" },
  { label: "Others", value: "others" },
  { label: "Peoples", value: "peoples" },
  { label: "Plants Nature", value: "plantsNature" },
  { label: "Prohibitions Warnings", value: "prohibitionsWarnings" },
  { label: "Shapes", value: "shapes" },
  { label: "Sport Activities", value: "sportActivities" },
  { label: "Symbols Markings", value: "symbolsMarkings" },
  { label: "Vehicles Traffic", value: "vehiclesTraffic" },
];

export function ClassicAdditionalClipartsScreen() {
  const { configuration } = useOutletContext<{ configuration: any }>();
  const loaderData = useLoaderData<LoaderData>();
  const submit = useSubmit();
  const navigation = useNavigation();
  useHandleFlashMessage();

  const managedClipartGroups = useMemo(
    () =>
      Array.isArray(loaderData?.managedClipartGroups)
        ? loaderData.managedClipartGroups
        : [],
    [loaderData],
  );
  const clipartsResources = useMemo(
    () =>
      loaderData?.clipartsResources &&
      typeof loaderData.clipartsResources === "object"
        ? loaderData.clipartsResources
        : {},
    [loaderData],
  );
  const shop = String(loaderData?.shop || "");
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

  const clipartsState = useMemo(
    () => getClipartsState(data, managedClipartGroups),
    [data, managedClipartGroups],
  );

  const [active, setActive] = useState<boolean>(Boolean(clipartsState.active));
  const [showForm, setShowForm] = useState(false);
  const [addMode, setAddMode] = useState<AddMode>("existing");
  const [createSource, setCreateSource] = useState<CreateSource>("upload");
  const [selectedGroupId, setSelectedGroupId] = useState<string>("");
  const [groupTitle, setGroupTitle] = useState("");
  const [groupDescription, setGroupDescription] = useState("");
  const [clipartDrafts, setClipartDrafts] = useState<ClipartDraftItem[]>([
    defaultClipartDraft(),
  ]);
  const [apiGroupKey, setApiGroupKey] = useState("animals");
  const [selectedApiCliparts, setSelectedApiCliparts] = useState<string[]>([]);

  const isSubmitting = navigation.state === "submitting";
  const manageClipartsReturnTo = useMemo(() => {
    const configId = Number(configuration?.id || 0);
    return configId > 0
      ? encodeURIComponent(
          `/app/configuration/${configId}/additional-options/cliparts`,
        )
      : "";
  }, [configuration?.id]);
  const selectedGroupIds = useMemo(
    () => clipartsState.items.map((item) => Number(item.clipartsGroupId)),
    [clipartsState.items],
  );
  const availableGroups = useMemo(
    () =>
      managedClipartGroups.filter((group) => {
        const groupId = Number(group?.id || 0);
        return groupId > 0 && !selectedGroupIds.includes(groupId);
      }),
    [managedClipartGroups, selectedGroupIds],
  );

  useEffect(() => {
    setActive(Boolean(clipartsState.active));
  }, [clipartsState.active]);

  useEffect(() => {
    if (availableGroups.length === 0) {
      setAddMode("create");
      setSelectedGroupId("");
      return;
    }

    setSelectedGroupId(
      (current) => current || String(availableGroups[0]?.id || ""),
    );
  }, [availableGroups]);

  const resetForm = () => {
    setShowForm(false);
    setAddMode(availableGroups.length > 0 ? "existing" : "create");
    setCreateSource("upload");
    setSelectedGroupId(String(availableGroups[0]?.id || ""));
    setGroupTitle("");
    setGroupDescription("");
    setClipartDrafts([defaultClipartDraft()]);
    setApiGroupKey("animals");
    setSelectedApiCliparts([]);
  };

  const saveSettings = () => {
    submit(
      {
        operation: "save-cliparts-settings",
        state: JSON.stringify({
          active,
          items: clipartsState.items,
        }),
      },
      { method: "POST" },
    );
  };

  const addExistingGroup = () => {
    submit(
      {
        operation: "add-existing-clipart-group",
        clipartsGroupId: String(selectedGroupId || ""),
      },
      { method: "POST" },
    );
    resetForm();
  };

  const createGroupAndAdd = () => {
    const clipartsPayload =
      createSource === "api"
        ? selectedApiCliparts.map((value) => ({
            title: value.split("/").pop()?.split(".")?.shift() || "Clipart",
            url: shop ? `https://${shop}/apps/aso-proxy${value}` : value,
            additionalPrice: 0,
          }))
        : clipartDrafts;

    submit(
      {
        operation: "create-clipart-group-and-add",
        group: JSON.stringify({
          title: groupTitle,
          description: groupDescription,
        }),
        cliparts: JSON.stringify(clipartsPayload),
      },
      { method: "POST" },
    );
    resetForm();
  };

  const removeGroup = (index: number) => {
    submit(
      {
        operation: "remove-clipart-group",
        index: String(index),
      },
      { method: "POST" },
    );
  };

  const updateDraft = (index: number, patch: Partial<ClipartDraftItem>) => {
    setClipartDrafts((current) =>
      current.map((entry, entryIndex) =>
        entryIndex === index ? { ...entry, ...patch } : entry,
      ),
    );
  };

  const addDraft = () => {
    setClipartDrafts((current) => [...current, defaultClipartDraft()]);
  };

  const removeDraft = (index: number) => {
    setClipartDrafts((current) =>
      current.length > 1 ? current.filter((_entry, i) => i !== index) : current,
    );
  };

  const toggleApiClipart = (value: string) => {
    setSelectedApiCliparts((current) =>
      current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value],
    );
  };

  const selectAllApiCliparts = (checked: boolean) => {
    setSelectedApiCliparts(
      checked ? [...(clipartsResources[apiGroupKey] || [])] : [],
    );
  };

  return (
    <div style={{ display: "grid", gap: 12 }}>
      {!showForm ? (
        <>
          <Card>
            <Box padding="300">
              <InlineStack align="space-between" blockAlign="center">
                <div>
                  <Text as="h2" variant="headingLg">
                    Cliparts
                  </Text>
                  <Text as="p" tone="subdued">
                    Select existing clipart groups for this config or create a
                    new group and save it into Manage cliparts.
                  </Text>
                </div>
                <InlineStack gap="200">
                  <Button url="/app/manage-cliparts">Manage cliparts</Button>
                  <Button
                    icon={PlusIcon}
                    variant="primary"
                    tone="success"
                    onClick={() => setShowForm(true)}
                  >
                    Add clipart group
                  </Button>
                </InlineStack>
              </InlineStack>
            </Box>
          </Card>
        </>
      ) : null}

      {showForm ? (
        <Card>
          <Box padding="300">
            <div style={{ display: "grid", gap: 16 }}>
              <Text as="h3" variant="headingMd">
                Add clipart group
              </Text>

              <InlineStack gap="300" blockAlign="center">
                {availableGroups.length > 0 ? (
                  <InlineStack gap="150" blockAlign="center">
                    <Text as="span" tone="subdued">
                      Existing
                    </Text>
                    <ToggleButton
                      type="radio"
                      name="clipart-source"
                      value="existing"
                      checked={addMode === "existing"}
                      onChange={() => setAddMode("existing")}
                    />
                  </InlineStack>
                ) : null}
                <InlineStack gap="150" blockAlign="center">
                  <Text as="span" tone="subdued">
                    Create new
                  </Text>
                  <ToggleButton
                    type="radio"
                    name="clipart-source"
                    value="create"
                    checked={addMode === "create"}
                    onChange={() => setAddMode("create")}
                  />
                </InlineStack>
              </InlineStack>

              {addMode === "existing" && availableGroups.length > 0 ? (
                <>
                  <Select
                    label="Clipart group"
                    options={availableGroups.map((group) => ({
                      label: `${group.title || "Untitled"} (${Array.isArray(group.cliparts) ? group.cliparts.length : 0})`,
                      value: String(group.id || ""),
                    }))}
                    value={String(selectedGroupId || "")}
                    onChange={setSelectedGroupId}
                  />
                  <Text as="p" tone="subdued">
                    Reuse an existing group from Manage cliparts.
                  </Text>
                </>
              ) : (
                <>
                  <InlineGrid columns={{ xs: 1, md: 2 }} gap="400">
                    <TextField
                      label="Group title"
                      autoComplete="off"
                      value={groupTitle}
                      onChange={setGroupTitle}
                    />
                    <TextField
                      label="Description"
                      autoComplete="off"
                      value={groupDescription}
                      onChange={setGroupDescription}
                    />
                  </InlineGrid>

                  <InlineStack gap="300" blockAlign="center">
                    <InlineStack gap="150" blockAlign="center">
                      <Text as="span" tone="subdued">
                        Upload
                      </Text>
                      <ToggleButton
                        type="radio"
                        name="clipart-create-source"
                        value="upload"
                        checked={createSource === "upload"}
                        onChange={() => setCreateSource("upload")}
                      />
                    </InlineStack>
                    <InlineStack gap="150" blockAlign="center">
                      <Text as="span" tone="subdued">
                        API
                      </Text>
                      <ToggleButton
                        type="radio"
                        name="clipart-create-source"
                        value="api"
                        checked={createSource === "api"}
                        onChange={() => setCreateSource("api")}
                      />
                    </InlineStack>
                  </InlineStack>

                  <div style={{ display: "grid", gap: 12 }}>
                    <InlineStack align="space-between" blockAlign="center">
                      <Text as="h4" variant="headingSm">
                        {createSource === "api" ? "API cliparts" : "Cliparts"}
                      </Text>
                    </InlineStack>

                    {createSource === "api" ? (
                      <div style={{ display: "grid", gap: 12 }}>
                        <InlineGrid columns={{ xs: 1, md: 2 }} gap="400">
                          <Select
                            label="API group"
                            options={apiClipartGroups}
                            value={apiGroupKey}
                            onChange={(value) => {
                              setApiGroupKey(value);
                              setSelectedApiCliparts([]);
                            }}
                          />
                          <div style={{ display: "grid", alignContent: "end" }}>
                            <InlineStack gap="200" blockAlign="center">
                              <Text as="span" tone="subdued">
                                Select all
                              </Text>
                              <ToggleButton
                                checked={
                                  (clipartsResources[apiGroupKey] || [])
                                    .length > 0 &&
                                  selectedApiCliparts.length ===
                                    (clipartsResources[apiGroupKey] || [])
                                      .length
                                }
                                onChange={(checked) =>
                                  selectAllApiCliparts(Boolean(checked))
                                }
                              />
                            </InlineStack>
                          </div>
                        </InlineGrid>

                        <div
                          style={{
                            display: "grid",
                            gridTemplateColumns:
                              "repeat(auto-fill, minmax(96px, 1fr))",
                            gap: 12,
                          }}
                        >
                          {(clipartsResources[apiGroupKey] || []).map(
                            (resource) => {
                              const selected =
                                selectedApiCliparts.includes(resource);
                              const previewUrl = fileUrl(resource);
                              return (
                                <button
                                  key={resource}
                                  type="button"
                                  onClick={() => toggleApiClipart(resource)}
                                  style={{
                                    border: selected
                                      ? "2px solid #007f7a"
                                      : "1px solid #d1d5db",
                                    borderRadius: 10,
                                    background: "#fff",
                                    padding: 8,
                                    cursor: "pointer",
                                  }}
                                >
                                  <img
                                    src={previewUrl}
                                    alt=""
                                    style={{
                                      width: "100%",
                                      height: 80,
                                      objectFit: "contain",
                                    }}
                                  />
                                </button>
                              );
                            },
                          )}
                        </div>

                        <Text as="p" tone="subdued">
                          {selectedApiCliparts.length > 0
                            ? `${selectedApiCliparts.length} clipart(s) selected from API resources.`
                            : "Select the cliparts you want to save into the new group."}
                        </Text>
                      </div>
                    ) : (
                      <div style={{ display: "grid", gap: 12 }}>
                        {clipartDrafts.map((clipart, index) => (
                          <Card key={`clipart-draft-${index}`}>
                            <Box padding="300">
                              <div style={{ display: "grid", gap: 12 }}>
                                <InlineStack
                                  align="space-between"
                                  blockAlign="center"
                                >
                                  <Text as="span" fontWeight="semibold">
                                    Clipart {index + 1}
                                  </Text>
                                  {clipartDrafts.length > 1 ? (
                                    <Button
                                      tone="critical"
                                      onClick={() => removeDraft(index)}
                                    >
                                      Remove
                                    </Button>
                                  ) : null}
                                </InlineStack>
                                <InlineGrid columns={{ xs: 1, md: 2 }} gap="400">
                                  <TextField
                                    label="Title"
                                    autoComplete="off"
                                    value={clipart.title}
                                    onChange={(value) =>
                                      updateDraft(index, { title: value })
                                    }
                                  />
                                  <TextField
                                    label="Additional price"
                                    type="number"
                                    autoComplete="off"
                                    value={String(clipart.additionalPrice || 0)}
                                    onChange={(value) =>
                                      updateDraft(index, {
                                        additionalPrice:
                                          parseFloat(String(value || 0)) || 0,
                                      })
                                    }
                                  />
                                </InlineGrid>
                                <FileInput
                                  title="Clipart image"
                                  type="image"
                                  path={clipart.url}
                                  handlePath={(value: string) =>
                                    updateDraft(index, { url: value })
                                  }
                                  helperText="This image will be saved into the new clipart group."
                                />
                                {clipart.url ? (
                                  <img
                                    src={fileUrl(clipart.url)}
                                    alt={clipart.title || `Clipart ${index + 1}`}
                                    style={{
                                      width: 72,
                                      height: 72,
                                      objectFit: "contain",
                                      border: "1px solid #d1d5db",
                                      borderRadius: 10,
                                      background: "#fff",
                                    }}
                                  />
                                ) : null}
                              </div>
                            </Box>
                          </Card>
                        ))}
                        <InlineStack align="start">
                          <Button onClick={addDraft}>Add clipart</Button>
                        </InlineStack>
                      </div>
                    )}
                  </div>
                </>
              )}

              <InlineStack align="end" gap="200">
                <Button onClick={resetForm}>Back to cliparts</Button>
                <Button
                  variant="primary"
                  tone="success"
                  onClick={
                    addMode === "existing"
                      ? addExistingGroup
                      : createGroupAndAdd
                  }
                  loading={isSubmitting}
                  disabled={
                    addMode === "existing"
                      ? !selectedGroupId
                      : !groupTitle.trim() ||
                        (createSource === "api"
                          ? selectedApiCliparts.length === 0
                          : !clipartDrafts.some((clipart) =>
                              String(clipart.url || "").trim(),
                            ))
                  }
                >
                  {addMode === "existing"
                    ? "Add group"
                    : "Create group and add"}
                </Button>
              </InlineStack>
            </div>
          </Box>
        </Card>
      ) : null}

      {!showForm ? (
        <>
          <Card>
            <Box padding="300">
              <Text as="h3" variant="headingMd">
                Selected groups
              </Text>
              <Box paddingBlockStart="200" />
              <IndexTable
                resourceName={{
                  singular: "clipart group",
                  plural: "clipart groups",
                }}
                itemCount={clipartsState.items.length}
                selectable={false}
                headings={[
                  { title: "Preview" },
                  { title: "Title" },
                  { title: "Cliparts" },
                  { title: "Actions" },
                ]}
              >
                {clipartsState.items.map((item, index) => (
                  <IndexTable.Row
                    id={item.id || String(index)}
                    key={item.id || String(index)}
                    position={index}
                  >
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
                            alt={item.title}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "contain",
                            }}
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
                        {item.title}
                      </Text>
                    </IndexTable.Cell>
                    <IndexTable.Cell>{item.clipartsCount}</IndexTable.Cell>
                    <IndexTable.Cell>
                      <InlineStack gap="200">
                        <Button
                          url={`/app/manage-cliparts/${item.clipartsGroupId}/clipart${manageClipartsReturnTo ? `?returnTo=${manageClipartsReturnTo}` : ""}`}
                        >
                          Manage
                        </Button>
                        <Button
                          icon={DeleteIcon}
                          tone="critical"
                          onClick={() => removeGroup(index)}
                        >
                          Remove
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
                <InlineStack align="space-between" blockAlign="center">
                  <div>
                    <Text as="h3" variant="headingMd">
                      Clipart settings
                    </Text>
                    <Text as="p" tone="subdued">
                      Enable or disable cliparts for this config.
                    </Text>
                  </div>
                  <InlineStack gap="200" blockAlign="center">
                    <Text as="span" tone="subdued">
                      No
                    </Text>
                    <ToggleButton
                      checked={active}
                      onChange={(checked) => setActive(Boolean(checked))}
                    />
                    <Text as="span" tone="subdued">
                      Yes
                    </Text>
                  </InlineStack>
                </InlineStack>
                <InlineStack align="end">
                  <Button
                    variant="primary"
                    tone="success"
                    onClick={saveSettings}
                    loading={isSubmitting}
                  >
                    Save settings
                  </Button>
                </InlineStack>
              </div>
            </Box>
          </Card>
        </>
      ) : null}
    </div>
  );
}

export default ClassicAdditionalClipartsScreen;
