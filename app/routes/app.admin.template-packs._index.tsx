import {
  Box,
  Button,
  Card,
  DataTable,
  Page,
  Text,
  InlineStack,
  Badge,
  EmptyState,
  TextField,
  Modal,
  BlockStack,
} from "@shopify/polaris";
import { useState } from "react";
import { useLoaderData, useNavigate, useSubmit } from "@remix-run/react";
import { LoaderFunctionArgs, ActionFunctionArgs, json } from "@remix-run/node";
import { authenticate } from "~/shopify.server";
import TemplatePackService from "~/models/TemplatePack.service";
import { SpacingBackground } from "~/components/layouts/SpacingBackground";
import { flashMessage, jFlashMessage } from "~/utils/message-flash";
import useHandleFlashMessage from "~/hooks/useHandleFlashMessage";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { session } = await authenticate.admin(request);
  const packs = await TemplatePackService.getAllPacks();

  return json({ packs });
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const { session } = await authenticate.admin(request);
  const formData = await request.formData();
  const packId = formData.get("packId");
  const action = formData.get("action");
  const price = formData.get("price");

  if (action === "toggle") {
    const pack = await TemplatePackService.getPack(Number(packId));
    if (pack) {
      await TemplatePackService.updatePack(Number(packId), {
        isActive: !pack.isActive,
      });
    }
    return json({ ...jFlashMessage("Pack status updated successfully") });
  } else if (action === "delete") {
    await TemplatePackService.deletePack(Number(packId));
    return json({ ...jFlashMessage("Pack deleted successfully") });
  } else if (action === "update") {
    const priceValue = price ? parseFloat(price.toString()) : 0;
    await TemplatePackService.updatePack(Number(packId), {
      price: priceValue,
    });
    return json({ ...jFlashMessage("Pack price updated successfully") });
  } else if (action === "import") {
    const result = await TemplatePackService.importPacksFromScripts();
    if (result.success) {
      const message = result.errors.length > 0
        ? `${result.message} (${result.errors.length} error(s))`
        : result.message;
      return json({ ...jFlashMessage(message), importResult: result });
    } else {
      return json({ ...jFlashMessage(result.message), importResult: result });
    }
  }

  return json({ success: true });
};

export default function AdminTemplatePacks() {
  const { packs } = useLoaderData<typeof loader>();
  const navigate = useNavigate();
  const submit = useSubmit();
  useHandleFlashMessage();
  
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedPack, setSelectedPack] = useState<any>(null);
  const [priceValue, setPriceValue] = useState("");

  const handleToggle = (packId: number) => {
    submit({ packId: packId.toString(), action: "toggle" }, { method: "POST" });
  };

  const handleEdit = (pack: any) => {
    setSelectedPack(pack);
    setPriceValue(pack.price.toString());
    setEditModalOpen(true);
  };

  const handleSavePrice = () => {
    if (selectedPack) {
      const price = parseFloat(priceValue) || 0;
      submit(
        {
          packId: selectedPack.id.toString(),
          action: "update",
          price: price.toString(),
        },
        { method: "POST" }
      );
      setEditModalOpen(false);
      setSelectedPack(null);
      setPriceValue("");
    }
  };

  const handleDelete = (pack: any) => {
    setSelectedPack(pack);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedPack) {
      submit(
        {
          packId: selectedPack.id.toString(),
          action: "delete",
        },
        { method: "POST" }
      );
      setDeleteModalOpen(false);
      setSelectedPack(null);
    }
  };

  const rows = packs.map((pack: any) => [
    pack.name,
    pack.category,
    pack.price === 0 ? (
      <Badge tone="success">Free</Badge>
    ) : (
      `$${pack.price.toFixed(2)}`
    ),
    pack.jsonFile,
    pack.isActive ? (
      <Badge tone="success">Active</Badge>
    ) : (
      <Badge tone="critical">Inactive</Badge>
    ),
    <InlineStack gap="200">
      <Button
        size="slim"
        onClick={() => handleEdit(pack)}
        variant="secondary"
      >
        Edit Price
      </Button>
      <Button
        size="slim"
        onClick={() => handleToggle(pack.id)}
        variant={pack.isActive ? "secondary" : "primary"}
      >
        {pack.isActive ? "Deactivate" : "Activate"}
      </Button>
      <Button
        size="slim"
        onClick={() => handleDelete(pack)}
        variant="primary"
        tone="critical"
      >
        Delete
      </Button>
    </InlineStack>,
  ]);

  return (
    <Page
      title="Template Packs Management"
      primaryAction={{
        content: "Import Packs from Scripts",
        onAction: () => {
          submit({ action: "import" }, { method: "POST" });
        },
      }}
    >
      <SpacingBackground width="100%" height="auto" margin="16px 0px">
        {packs.length === 0 ? (
          <EmptyState
            heading="No template packs"
            action={{
              content: "Import Packs from Scripts",
              onAction: () => {
                submit({ action: "import" }, { method: "POST" });
              },
            }}
            image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
          >
            <p>No template packs have been imported yet.</p>
            <p>
              Click "Import Packs from Scripts" to import all JSON files from
              the scripts directory.
            </p>
          </EmptyState>
        ) : (
          <Card>
            <Box padding="600">
              <DataTable
                columnContentTypes={[
                  "text",
                  "text",
                  "numeric",
                  "text",
                  "text",
                  "text",
                ]}
                headings={[
                  "Name",
                  "Category",
                  "Price",
                  "JSON File",
                  "Status",
                  "Actions",
                ]}
                rows={rows}
              />
            </Box>
          </Card>
        )}
      </SpacingBackground>

      <Modal
        open={editModalOpen}
        onClose={() => {
          setEditModalOpen(false);
          setSelectedPack(null);
          setPriceValue("");
        }}
        title="Edit Pack Price"
        primaryAction={{
          content: "Save",
          onAction: handleSavePrice,
        }}
        secondaryActions={[
          {
            content: "Cancel",
            onAction: () => {
              setEditModalOpen(false);
              setSelectedPack(null);
              setPriceValue("");
            },
          },
        ]}
      >
        <Modal.Section>
          <BlockStack gap="400">
            <Text as="p" variant="bodyMd">
              Edit the price for <strong>{selectedPack?.name}</strong>
            </Text>
            <TextField
              label="Price (USD)"
              type="number"
              value={priceValue}
              onChange={setPriceValue}
              prefix="$"
              helpText="Set price to 0 to make this pack free"
              autoComplete="off"
            />
            {parseFloat(priceValue) === 0 && (
              <Badge tone="success">This pack will be free</Badge>
            )}
          </BlockStack>
        </Modal.Section>
      </Modal>

      <Modal
        open={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setSelectedPack(null);
        }}
        title="Delete Template Pack"
        primaryAction={{
          content: "Delete",
          onAction: confirmDelete,
          destructive: true,
        }}
        secondaryActions={[
          {
            content: "Cancel",
            onAction: () => {
              setDeleteModalOpen(false);
              setSelectedPack(null);
            },
          },
        ]}
      >
        <Modal.Section>
          <BlockStack gap="400">
            <Text as="p" variant="bodyMd">
              Are you sure you want to delete <strong>{selectedPack?.name}</strong>?
            </Text>
            <Text as="p" variant="bodyMd" tone="subdued">
              This action cannot be undone. This will remove the pack from the database, but it will not affect templates that have already been imported by merchants.
            </Text>
          </BlockStack>
        </Modal.Section>
      </Modal>
    </Page>
  );
}
