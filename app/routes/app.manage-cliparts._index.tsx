import { json } from "@remix-run/node";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import {
  Box,
  Button,
  Card,
  IndexTable,
  InlineGrid,
  InlineStack,
  Text,
  TextField,
} from "@shopify/polaris";
import { PlusIcon } from "@shopify/polaris-icons";
import {
  useActionData,
  useLoaderData,
  useNavigate,
  useNavigation,
  useSubmit,
} from "@remix-run/react";
import { useEffect, useMemo, useState } from "react";
import ClipartsGroupService from "~/models/ClipartsGroup.service";
import { authenticate } from "~/shopify.server";
import useHandleFlashMessage from "~/hooks/useHandleFlashMessage";
import { jFlashMessage } from "~/utils/message-flash";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { session } = await authenticate.admin(request);
  const clipartsGroups = await ClipartsGroupService.getClipartsGroups(session.id);
  return json({ clipartsGroups: Array.isArray(clipartsGroups) ? clipartsGroups : [] });
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const { session } = await authenticate.admin(request);
  const formData = await request.formData();
  const operation = String(formData.get("operation") || "");
  const id = parseInt(String(formData.get("id") || ""), 10);

  if (request.method === "DELETE" && Number.isFinite(id)) {
    await ClipartsGroupService.deleteClipartsGroup(id, session.id);
    return json(jFlashMessage("Clipart group deleted successfully"));
  }

  if (operation === "save-group") {
    const title = String(formData.get("title") || "").trim();
    const description = String(formData.get("description") || "");

    if (!title) {
      return json(jFlashMessage("Title is required", "error"), { status: 400 });
    }

    if (Number.isFinite(id)) {
      await ClipartsGroupService.updateClipartsGroup(
        { id, title, description } as any,
        session.id,
      );
      return json(jFlashMessage("Clipart group updated successfully"));
    }

    await ClipartsGroupService.addClipartsGroup(
      { title, description } as any,
      session.id,
    );
    return json(jFlashMessage("Clipart group added successfully"));
  }

  return null;
};

export default function ManageClipartIndex() {
  const submit = useSubmit();
  const navigate = useNavigate();
  const navigation = useNavigation();
  const actionData = useActionData<typeof action>();
  const { clipartsGroups } = useLoaderData<typeof loader>();
  useHandleFlashMessage();

  const [editingId, setEditingId] = useState<string>("");
  const [isCreating, setIsCreating] = useState(false);
  const currentGroup = useMemo(
    () =>
      editingId
        ? clipartsGroups.find((entry: any) => String(entry?.id) === editingId) || null
        : null,
    [clipartsGroups, editingId],
  );

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (currentGroup) {
      setTitle(String(currentGroup.title || ""));
      setDescription(String(currentGroup.description || ""));
      return;
    }

    if (isCreating) {
      setTitle("");
      setDescription("");
    }
  }, [currentGroup, isCreating]);

  useEffect(() => {
    if (actionData && "messageFlash" in actionData && (actionData as any).messageFlash?.status !== "error") {
      setEditingId("");
      setIsCreating(false);
    }
  }, [actionData]);

  const isEditing = Boolean(currentGroup || isCreating);
  const isSubmitting = navigation.state === "submitting";
  const resourceName = {
    singular: "Clipart Group",
    plural: "Clipart Groups",
  };

  const openCreate = () => {
    setEditingId("");
    setIsCreating(true);
  };
  const openEdit = (id: number) => {
    setIsCreating(false);
    setEditingId(String(id));
  };
  const closeForm = () => {
    setEditingId("");
    setIsCreating(false);
  };

  const saveGroup = () => {
    submit(
      {
        operation: "save-group",
        id: currentGroup?.id ? String(currentGroup.id) : "",
        title,
        description,
      },
      { method: "POST" },
    );
  };

  if (isEditing) {
    return (
      <div style={{ display: "grid", gap: 12 }}>
        <Card>
          <Box padding="300">
            <Text as="h2" variant="headingLg">
              {currentGroup ? "Edit clipart group" : "Add clipart group"}
            </Text>
          </Box>
        </Card>

        <Card>
          <Box padding="300">
            <InlineGrid columns={{ xs: 1, md: 2 }} gap="400">
              <TextField
                label="Title"
                autoComplete="off"
                value={title}
                onChange={setTitle}
              />
              <TextField
                label="Description"
                autoComplete="off"
                value={description}
                onChange={setDescription}
              />
            </InlineGrid>
          </Box>
          <Box padding="300">
            <InlineStack align="end" gap="200">
              <Button onClick={closeForm}>Back</Button>
              <Button
                variant="primary"
                tone="success"
                loading={isSubmitting}
                onClick={saveGroup}
                disabled={!title.trim()}
              >
                Save
              </Button>
            </InlineStack>
          </Box>
        </Card>
      </div>
    );
  }

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <Card>
        <Box padding="300">
          <InlineStack align="space-between" blockAlign="center">
            <div>
              <Text as="h2" variant="headingLg">
                Clipart Groups
              </Text>
              <Text as="p" tone="subdued">
                Manage the reusable clipart groups used across configurations.
              </Text>
            </div>
            <Button icon={PlusIcon} variant="primary" tone="success" onClick={openCreate}>
              Add new clipart group
            </Button>
          </InlineStack>
        </Box>
      </Card>

      <Card>
        <Box padding="300">
          <IndexTable
            resourceName={resourceName}
            itemCount={clipartsGroups.length}
            headings={[
              { title: "Title" },
              { title: "Description" },
              { title: "Actions" },
            ]}
            selectable={false}
          >
            {clipartsGroups.map(({ id, title, description }: any, index: number) => (
              <IndexTable.Row id={String(id)} key={id} position={index}>
                <IndexTable.Cell>
                  <Text as="span" fontWeight="semibold">
                    {title || "Untitled"}
                  </Text>
                </IndexTable.Cell>
                <IndexTable.Cell>{description || "-"}</IndexTable.Cell>
                <IndexTable.Cell>
                  <InlineStack gap="200">
                    <Button onClick={() => navigate(`${id}/clipart`)}>Manage</Button>
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
