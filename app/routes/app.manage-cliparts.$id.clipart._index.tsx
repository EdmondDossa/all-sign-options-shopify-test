import { json, redirect } from "@remix-run/node";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import {
  Box,
  Button,
  Card,
  Checkbox,
  IndexTable,
  InlineGrid,
  InlineStack,
  Select,
  Text,
  TextField,
} from "@shopify/polaris";
import { PlusIcon } from "@shopify/polaris-icons";
import {
  useLoaderData,
  useLocation,
  useNavigate,
  useNavigation,
  useSearchParams,
  useSubmit,
} from "@remix-run/react";
import { useEffect, useState } from "react";
import { FileInput } from "~/components/inputs/FileInput";
import { ToggleButton } from "~/components/buttons";
import useHandleFlashMessage from "~/hooks/useHandleFlashMessage";
import { authenticate } from "~/shopify.server";
import ClipartService from "~/models/Clipart.service";
import { jFlashMessage } from "~/utils/message-flash";
import { fileUrl } from "~/utils/fileUrl";
import { readJsonField } from "~/utils/readJsonField";

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

type ClipartDraft = {
  title: string;
  url: string;
  additionalPrice: number | string;
};

const emptyDraft = (): ClipartDraft => ({
  title: "",
  url: "",
  additionalPrice: 0,
});

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const { session } = await authenticate.admin(request);
  const clipartsGroupId = parseInt(params.id || "0", 10);
  const url = new URL(request.url);
  const editId = parseInt(url.searchParams.get("id") || "", 10);
  const cliparts = await ClipartService.getCliparts(clipartsGroupId);
  const clipart = Number.isFinite(editId)
    ? await ClipartService.getClipart(editId, clipartsGroupId)
    : null;
  const clipartsResources = readJsonField("public/aso-cliparts/cliparts.json");

  return json({
    cliparts: Array.isArray(cliparts) ? cliparts : [],
    clipart,
    clipartsResources,
    shop: session.shop,
  });
};

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const { session } = await authenticate.admin(request);
  const clipartsGroupId = parseInt(params.id || "0", 10);
  const formData = await request.formData();
  const url = new URL(request.url);
  const operation = String(formData.get("operation") || "");
  const id = parseInt(String(formData.get("id") || ""), 10);
  const returnTo = url.searchParams.get("returnTo");
  const buildRedirectUrl = (message: string) => {
    const redirectUrl = new URL(url.pathname, url.origin);
    if (returnTo) {
      redirectUrl.searchParams.set("returnTo", returnTo);
    }
    redirectUrl.searchParams.set(
      "messageFlash",
      encodeURIComponent(JSON.stringify({ msg: message, status: "success" })),
    );
    return `${redirectUrl.pathname}?${redirectUrl.searchParams.toString()}`;
  };

  if (request.method === "DELETE" && Number.isFinite(id)) {
    await ClipartService.deleteClipart(id, clipartsGroupId, session.id);
    return json(jFlashMessage("Clipart deleted successfully"));
  }

  if (operation === "save-cliparts") {
    const payload = JSON.parse(String(formData.get("cliparts") || "[]"));
    const cliparts = Array.isArray(payload)
      ? payload
          .map((entry: any) => ({
            title: String(entry?.title || "").trim(),
            url: String(entry?.url || "").trim(),
            additionalPrice: Number(entry?.additionalPrice || 0),
          }))
          .filter((entry: any) => entry.url)
      : [];

    if (cliparts.length === 0) {
      return json(jFlashMessage("Add at least one clipart image", "error"), { status: 400 });
    }

    if (Number.isFinite(id)) {
      const clipart = cliparts[0];
      await ClipartService.updateClipart(
        {
          id,
          title: clipart.title,
          url: clipart.url,
          additionalPrice: clipart.additionalPrice,
        } as any,
        clipartsGroupId,
      );
      return redirect(buildRedirectUrl("Clipart updated successfully"));
    }

    for (const clipart of cliparts) {
      await ClipartService.addClipart(
        {
          title: clipart.title,
          url: clipart.url,
          additionalPrice: clipart.additionalPrice,
        } as any,
        clipartsGroupId,
      );
    }

    return redirect(buildRedirectUrl("Clipart added successfully"));
  }

  return null;
};

export default function ManageClipartsGroupIndex() {
  const submit = useSubmit();
  const navigate = useNavigate();
  const navigation = useNavigation();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { cliparts, clipart, clipartsResources, shop } = useLoaderData<typeof loader>();
  useHandleFlashMessage();

  const editingId = searchParams.get("id");
  const isCreating = searchParams.get("new") === "1";
  const isEditing = Boolean(editingId || isCreating);
  const isSubmitting = navigation.state === "submitting";
  const [drafts, setDrafts] = useState<ClipartDraft[]>([emptyDraft()]);
  const [isApiUsed, setIsApiUsed] = useState(false);
  const [apiGroupKey, setApiGroupKey] = useState("animals");
  const [selectedApiCliparts, setSelectedApiCliparts] = useState<string[]>([]);

  useEffect(() => {
    if (clipart && editingId) {
      setDrafts([
        {
          title: String(clipart.title || ""),
          url: String(clipart.url || ""),
          additionalPrice: Number(clipart.additionalPrice || 0),
        },
      ]);
      setIsApiUsed(false);
      setSelectedApiCliparts([]);
      return;
    }

    if (isCreating) {
      setDrafts([emptyDraft()]);
      setIsApiUsed(false);
      setSelectedApiCliparts([]);
    }
  }, [clipart, editingId, isCreating]);

  const resourceName = {
    singular: "Clipart",
    plural: "Cliparts",
  };

  const closeForm = () => {
    const params = new URLSearchParams(location.search);
    params.delete("id");
    params.delete("new");
    navigate({
      pathname: ".",
      search: params.toString() ? `?${params.toString()}` : "",
    });
  };

  const openCreate = () => {
    const params = new URLSearchParams(location.search);
    params.delete("id");
    params.set("new", "1");
    navigate({
      pathname: ".",
      search: `?${params.toString()}`,
    });
  };

  const openEdit = (id: number) => {
    const params = new URLSearchParams(location.search);
    params.delete("new");
    params.set("id", String(id));
    navigate({
      pathname: ".",
      search: `?${params.toString()}`,
    });
  };

  const updateDraft = (index: number, patch: Partial<ClipartDraft>) => {
    setDrafts((current) =>
      current.map((entry, currentIndex) =>
        currentIndex === index ? { ...entry, ...patch } : entry,
      ),
    );
  };

  const addDraft = () => setDrafts((current) => [...current, emptyDraft()]);

  const removeDraft = (index: number) => {
    setDrafts((current) =>
      current.length > 1 ? current.filter((_entry, currentIndex) => currentIndex !== index) : current,
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
    setSelectedApiCliparts(checked ? [...(clipartsResources?.[apiGroupKey] || [])] : []);
  };

  const materializeApiSelection = () => {
    setDrafts(
      selectedApiCliparts.map((value) => ({
        title: value.split("/").pop()?.split(".")?.shift() || "Clipart",
        url: shop ? `https://${shop}/apps/aso-proxy${value}` : value,
        additionalPrice: 0,
      })),
    );
  };

  const saveCliparts = () => {
    submit(
      {
        operation: "save-cliparts",
        id: editingId || "",
        cliparts: JSON.stringify(drafts),
      },
      { method: "POST" },
    );
  };

  if (isEditing) {
    return (
      <div style={{ display: "grid", gap: 12, margin: "10px 0px" }}>
        <Card>
          <Box padding="300">
            <Text as="h2" variant="headingLg">
              {editingId ? "Edit clipart" : "Add clipart"}
            </Text>
          </Box>
        </Card>

        <Card>
          <Box padding="300">
            <div style={{ display: "grid", gap: 16 }}>
              {!editingId ? (
                <InlineStack gap="300" blockAlign="center">
                  <InlineStack gap="150" blockAlign="center">
                    <Text as="span" tone="subdued">
                      Upload
                    </Text>
                    <ToggleButton
                      type="radio"
                      name="clipart-source"
                      value="upload"
                      checked={!isApiUsed}
                      onChange={() => setIsApiUsed(false)}
                    />
                  </InlineStack>
                  <InlineStack gap="150" blockAlign="center">
                    <Text as="span" tone="subdued">
                      API
                    </Text>
                    <ToggleButton
                      type="radio"
                      name="clipart-source"
                      value="api"
                      checked={isApiUsed}
                      onChange={() => setIsApiUsed(true)}
                    />
                  </InlineStack>
                </InlineStack>
              ) : null}

              {!editingId && isApiUsed ? (
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
                        <Checkbox
                          checked={
                            (clipartsResources?.[apiGroupKey] || []).length > 0 &&
                            selectedApiCliparts.length ===
                              (clipartsResources?.[apiGroupKey] || []).length
                          }
                          label="Select all"
                          onChange={selectAllApiCliparts}
                        />
                      </InlineStack>
                    </div>
                  </InlineGrid>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fill, minmax(96px, 1fr))",
                      gap: 12,
                    }}
                  >
                    {(clipartsResources?.[apiGroupKey] || []).map((resource: string) => {
                      const selected = selectedApiCliparts.includes(resource);
                      return (
                        <button
                          key={resource}
                          type="button"
                          onClick={() => toggleApiClipart(resource)}
                          style={{
                            border: selected ? "2px solid #007f7a" : "1px solid #d1d5db",
                            borderRadius: 10,
                            background: "#fff",
                            padding: 8,
                            cursor: "pointer",
                          }}
                        >
                          <img
                            src={fileUrl(resource)}
                            alt=""
                            style={{ width: "100%", height: 80, objectFit: "contain" }}
                          />
                        </button>
                      );
                    })}
                  </div>

                  <InlineStack align="end" gap="200">
                    <Button onClick={closeForm}>Back</Button>
                    <Button
                      variant="primary"
                      tone="success"
                      onClick={materializeApiSelection}
                      disabled={selectedApiCliparts.length === 0}
                    >
                      Add selected cliparts
                    </Button>
                  </InlineStack>
                </div>
              ) : (
                <>
                  <div style={{ display: "grid", gap: 12 }}>
                    {drafts.map((draft, index) => (
                      <Card key={`clipart-draft-${index}`}>
                        <Box padding="300">
                          <div style={{ display: "grid", gap: 12 }}>
                            <InlineStack align="space-between" blockAlign="center">
                              <Text as="span" fontWeight="semibold">
                                Clipart {index + 1}
                              </Text>
                              {!editingId && drafts.length > 1 ? (
                                <Button tone="critical" onClick={() => removeDraft(index)}>
                                  Remove
                                </Button>
                              ) : null}
                            </InlineStack>
                            <InlineGrid columns={{ xs: 1, md: 2 }} gap="400">
                              <TextField
                                label="Label"
                                autoComplete="off"
                                value={draft.title}
                                onChange={(value) => updateDraft(index, { title: value })}
                              />
                              <TextField
                                label="Additional price"
                                type="number"
                                autoComplete="off"
                                value={String(draft.additionalPrice || 0)}
                                onChange={(value) =>
                                  updateDraft(index, {
                                    additionalPrice: parseFloat(String(value || 0)) || 0,
                                  })
                                }
                              />
                            </InlineGrid>
                            <FileInput
                              title="Clipart image"
                              type="image"
                              path={draft.url}
                              handlePath={(value: string) => updateDraft(index, { url: value })}
                            />
                            {draft.url ? (
                              <img
                                src={fileUrl(draft.url)}
                                alt={draft.title || `Clipart ${index + 1}`}
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
                    {!editingId ? (
                      <InlineStack align="start">
                        <Button onClick={addDraft}>Add clipart</Button>
                      </InlineStack>
                    ) : null}
                  </div>

                  <InlineStack align="end" gap="200">
                    <Button onClick={closeForm}>Back</Button>
                    <Button
                      variant="primary"
                      tone="success"
                      loading={isSubmitting}
                      onClick={saveCliparts}
                      disabled={!drafts.some((entry) => String(entry.url || "").trim())}
                    >
                      Save
                    </Button>
                  </InlineStack>
                </>
              )}
            </div>
          </Box>
        </Card>
      </div>
    );
  }

  return (
    <div style={{ display: "grid", gap: 12, margin: "10px 0px" }}>
      <Card>
        <Box padding="300">
          <InlineStack align="space-between" blockAlign="center">
            <div>
              <Text as="h3" variant="headingMd">
                Cliparts
              </Text>
              <Text as="p" tone="subdued">
                Manage the cliparts inside this group.
              </Text>
            </div>
            <Button
              icon={PlusIcon}
              variant="primary"
              tone="success"
              onClick={openCreate}
            >
              Add new clipart
            </Button>
          </InlineStack>
        </Box>
      </Card>

      <Card>
        <Box padding="300">
          <IndexTable
            resourceName={resourceName}
            itemCount={cliparts.length}
            headings={[
              { title: "Preview" },
              { title: "Title" },
              { title: "Additional Price" },
              { title: "Actions" },
            ]}
            selectable={false}
          >
            {cliparts.map(({ id, title, url, additionalPrice }: any, index: number) => (
              <IndexTable.Row id={String(id)} key={id} position={index}>
                <IndexTable.Cell>
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 8,
                      border: "1px solid #D0D5DD",
                      background: "#F8F9FB",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      overflow: "hidden",
                    }}
                  >
                    {url ? (
                      <img
                        src={fileUrl(url)}
                        alt={title || "Clipart"}
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
                    {title || "Untitled"}
                  </Text>
                </IndexTable.Cell>
                <IndexTable.Cell>{additionalPrice ?? 0}</IndexTable.Cell>
                <IndexTable.Cell>
                  <InlineStack gap="200">
                    <Button onClick={() => openEdit(id)}>Edit</Button>
                    <Button
                      tone="critical"
                      onClick={() => submit({ id: String(id) }, { method: "DELETE" })}
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
    </div>
  );
}
