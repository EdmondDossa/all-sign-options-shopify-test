import { useState, useId } from "react";
import { useLoaderData, useNavigate, useSubmit } from "@remix-run/react";
import { LoaderFunctionArgs, ActionFunctionArgs, json } from "@remix-run/node";
import { authenticate } from "~/shopify.server";
import TemplatePackService from "~/models/TemplatePack.service";
import { SpacingBackground } from "~/components/layouts/SpacingBackground";
import { BoxBackground } from "~/components/layouts/BoxBackground";
import { flashMessage, jFlashMessage } from "~/utils/message-flash";
import useHandleFlashMessage from "~/hooks/useHandleFlashMessage";
import { FileInput } from "~/components/inputs/FileInput";
import { getImageUrl } from "~/utils/fileUrl";
import { Modal, TitleBar, useAppBridge } from "@shopify/app-bridge-react";
import { PARENT_SIGN_TYPES } from "~/utils/parent-sign-types";
import { Box, Card, Text, BlockStack, InlineStack, Badge, TextField, Select, Button, Divider } from "@shopify/polaris";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { session } = await authenticate.admin(request);
  const [packs, templates] = await Promise.all([
    TemplatePackService.getAllPacks(),
    TemplatePackService.getTemplatesForExport(session.id),
  ]);

  return json({ packs, templates, parentSignTypes: PARENT_SIGN_TYPES });
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const { session } = await authenticate.admin(request);
  const formData = await request.formData();
  const packId = formData.get("packId");
  const action = formData.get("action");
  const plan = formData.get("plan")?.toString()?.trim() ?? null;
  const previewImg = formData.get("previewImg");
  const parentCategoryName = formData.get("parentCategoryName")?.toString()?.trim() || undefined;
  const packPlanRaw = formData.get("packPlan")?.toString()?.trim()?.toLowerCase();
  const packPlan: "free" | "basic" | "pro" =
    packPlanRaw === "pro" ? "pro" : packPlanRaw === "basic" ? "basic" : "free";

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
  } else if (action === "updatePlan") {
    const planValue = plan === "basic" || plan === "pro" ? plan : "free";
    await TemplatePackService.updatePack(Number(packId), {
      plans: planValue,
    });
    return json({ ...jFlashMessage("Plan du pack mis à jour") });
  } else if (action === "updatePreview") {
    await TemplatePackService.updatePack(Number(packId), {
      previewImg: previewImg?.toString() || "",
    });
    return json({ ...jFlashMessage("Pack preview image updated successfully") });
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
  } else if (action === "exportPack") {
    const packName = formData.get("packName")?.toString()?.trim();
    const templateIds = formData.getAll("templateIds").map((id) => Number(id)).filter(Boolean);

    if (!packName) {
      return json({ ...jFlashMessage("Le nom du pack est requis", "error") });
    }
    if (templateIds.length === 0) {
      return json({ ...jFlashMessage("Sélectionnez au moins un template", "error") });
    }

    const result = await TemplatePackService.exportTemplatesAsPack(
      session.id,
      templateIds,
      packName,
      parentCategoryName,
      packPlan
    );

    if (result.success) {
      return json({ ...jFlashMessage(result.message), exportResult: result });
    } else {
      return json({ ...jFlashMessage(result.message, "error") });
    }
  }

  return json({ success: true });
};

const PACK_PLAN_OPTIONS = ["free", "basic", "pro"] as const;

export default function AdminTemplatePacks() {
  const { packs, templates, parentSignTypes } = useLoaderData<typeof loader>();
  const navigate = useNavigate();
  const submit = useSubmit();
  const shopify = useAppBridge();
  useHandleFlashMessage();
  
  const [selectedPack, setSelectedPack] = useState<any>(null);
  const [planValue, setPlanValue] = useState<string>("free");
  const [previewImgValue, setPreviewImgValue] = useState("");
  const [exportPackName, setExportPackName] = useState("");
  const [exportParentCategoryName, setExportParentCategoryName] = useState("");
  const [exportPackPlan, setExportPackPlan] = useState<string>("free");
  const [exportSelectedIds, setExportSelectedIds] = useState<Set<number>>(new Set());
  const [customParentTypes, setCustomParentTypes] = useState<string[]>([]);
  const [newTypeName, setNewTypeName] = useState("");

  const editPlanModalId = useId();
  const deleteModalId = useId();
  const uploadModalId = useId();
  const exportModalId = useId();
  const addTypeModalId = useId();

  const handleToggle = (packId: number) => {
    submit({ packId: packId.toString(), action: "toggle" }, { method: "POST" });
  };

  const handleEditPlan = (pack: any) => {
    setSelectedPack(pack);
    const p = pack.plans?.trim().toLowerCase();
    setPlanValue(p === "basic" || p === "pro" ? p : "free");
    shopify.modal.show(editPlanModalId);
  };

  const handleSavePlan = () => {
    if (selectedPack) {
      submit(
        {
          packId: selectedPack.id.toString(),
          action: "updatePlan",
          plan: planValue,
        },
        { method: "POST" }
      );
      shopify.modal.hide(editPlanModalId);
      setSelectedPack(null);
      setPlanValue("free");
    }
  };

  const handleUploadImages = (pack: any) => {
    setSelectedPack(pack);
    setPreviewImgValue(pack.previewImg || "");
    shopify.modal.show(uploadModalId);
  };

  const handleSavePreview = () => {
    if (selectedPack) {
      submit(
        {
          packId: selectedPack.id.toString(),
          action: "updatePreview",
          previewImg: previewImgValue,
        },
        { method: "POST" }
      );
      shopify.modal.hide(uploadModalId);
      setSelectedPack(null);
      setPreviewImgValue("");
    }
  };

  const handleDelete = (pack: any) => {
    setSelectedPack(pack);
    shopify.modal.show(deleteModalId);
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
      shopify.modal.hide(deleteModalId);
      setSelectedPack(null);
    }
  };

  return (
    <div style={{ width: "100%", height: "auto", padding: "10px 0px" }}>
      <SpacingBackground width="100%" height="auto" margin="24px 0px">
        <Card>
          <Box padding="400">
            <BlockStack gap="400">
              <InlineStack align="space-between" blockAlign="center" wrap={false}>
                <Text as="h1" variant="headingLg" fontWeight="bold">
                  Template Packs Management
                </Text>
                <InlineStack gap="300">
                  <button
                    className="back-large-btn"
                    type="button"
                    onClick={() => {
                      setExportPackName("");
                      setExportSelectedIds(new Set());
                      shopify.modal.show(exportModalId);
                    }}
                    style={{
                      padding: "10px 18px",
                      borderRadius: "8px",
                      border: "1px solid #D1D5DB",
                      fontWeight: "600",
                      cursor: "pointer",
                    }}
                  >
                    Export template pack
                  </button>
                  <button
                    className="primary-btn"
                    type="button"
                    onClick={() => {
                      submit({ action: "import" }, { method: "POST" });
                    }}
                    style={{
                      padding: "10px 18px",
                      borderRadius: "8px",
                      backgroundColor: "rgba(1, 100, 100, 0.9)",
                      color: "white",
                      fontWeight: "600",
                      cursor: "pointer",
                      border: "none",
                    }}
                  >
                    <span className="primary-btn-text">Import Packs from Scripts</span>
                  </button>
                </InlineStack>
              </InlineStack>
            </BlockStack>
          </Box>
        </Card>
      </SpacingBackground>

      <SpacingBackground width="100%" height="auto" margin="16px 0px">
        {packs.length === 0 ? (
          <Card>
            <Box padding="800">
              <BlockStack gap="400">
                <div style={{ textAlign: "center" }}>
                  <div
                    style={{
                      width: "120px",
                      height: "120px",
                      margin: "0 auto 24px",
                      borderRadius: "16px",
                      background: "linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 100%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <span style={{ fontSize: "48px" }}>📦</span>
                  </div>
                  <Text as="h2" variant="headingMd" fontWeight="bold">
                    No template packs
                  </Text>
                  <BlockStack gap="200">
                    <Text as="p" variant="bodyMd" tone="subdued">
                      No template packs have been imported yet.
                    </Text>
                    <Text as="p" variant="bodyMd" tone="subdued">
                      Click &quot;Import Packs from Scripts&quot; to import all JSON files from the scripts directory.
                    </Text>
                  </BlockStack>
                  <Box paddingBlockStart="400">
                    <button
                      className="primary-btn"
                      type="button"
                      onClick={() => submit({ action: "import" }, { method: "POST" })}
                      style={{
                        padding: "12px 24px",
                        borderRadius: "8px",
                        backgroundColor: "rgba(1, 100, 100, 0.9)",
                        color: "white",
                        fontWeight: "600",
                        cursor: "pointer",
                        border: "none",
                      }}
                    >
                      <span className="primary-btn-text">Import Packs from Scripts</span>
                    </button>
                  </Box>
                </div>
              </BlockStack>
            </Box>
          </Card>
        ) : (
          <Card>
            <Box padding="400">
            <div style={{ overflowX: "auto" }}>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                }}
              >
                <thead>
                  <tr style={{ borderBottom: "1px solid #E5E7EB" }}>
                    <th
                      style={{
                        textAlign: "left",
                        padding: "12px",
                        fontWeight: "bold",
                        fontSize: "14px",
                      }}
                    >
                      Pack
                    </th>
                    <th
                      style={{
                        textAlign: "left",
                        padding: "12px",
                        fontWeight: "bold",
                        fontSize: "14px",
                      }}
                    >
                      Category
                    </th>
                    <th
                      style={{
                        textAlign: "left",
                        padding: "12px",
                        fontWeight: "bold",
                        fontSize: "14px",
                      }}
                    >
                      Plan(s)
                    </th>
                    <th
                      style={{
                        textAlign: "left",
                        padding: "12px",
                        fontWeight: "bold",
                        fontSize: "14px",
                      }}
                    >
                      JSON File
                    </th>
                    <th
                      style={{
                        textAlign: "left",
                        padding: "12px",
                        fontWeight: "bold",
                        fontSize: "14px",
                      }}
                    >
                      Status
                    </th>
                    <th
                      style={{
                        textAlign: "left",
                        padding: "12px",
                        fontWeight: "bold",
                        fontSize: "14px",
                      }}
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {packs.map((pack: any) => (
                    <tr
                      key={pack.id}
                      style={{
                        borderBottom: "1px solid #E5E7EB",
                        transition: "background-color 0.15s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "#F9FAFB";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "transparent";
                      }}
                    >
                      <td style={{ padding: "12px" }}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                          }}
                        >
                          {pack.previewImg && (
                            <img
                              src={getImageUrl(pack.previewImg)}
                              alt={pack.name}
                              style={{
                                width: "40px",
                                height: "40px",
                                objectFit: "cover",
                                borderRadius: "4px",
                              }}
                            />
                          )}
                          <span style={{ fontSize: "14px", fontWeight: "500" }}>
                            {pack.name}
                          </span>
                        </div>
                      </td>
                      <td style={{ padding: "12px", fontSize: "14px" }}>
                        {pack.category}
                      </td>
                      <td style={{ padding: "12px", fontSize: "14px" }}>
                        <span
                          style={{
                            display: "inline-block",
                            padding: "2px 8px",
                            borderRadius: "4px",
                            fontSize: "12px",
                            fontWeight: "500",
                            backgroundColor: pack.plans === "pro" ? "#F3E8FF" : pack.plans === "basic" ? "#DBEAFE" : "#D1FAE5",
                            color: pack.plans === "pro" ? "#6B21A8" : pack.plans === "basic" ? "#1E40AF" : "#065F46",
                          }}
                        >
                          {pack.plans === "pro" ? "Pro" : pack.plans === "basic" ? "Basic" : "Free"}
                        </span>
                      </td>
                      <td style={{ padding: "12px", fontSize: "14px" }}>
                        {pack.jsonFile}
                      </td>
                      <td style={{ padding: "12px" }}>
                        {pack.isActive ? (
                          <span
                            style={{
                              backgroundColor: "#D1FAE5",
                              color: "#065F46",
                              padding: "4px 8px",
                              borderRadius: "4px",
                              fontSize: "12px",
                              fontWeight: "500",
                            }}
                          >
                            Active
                          </span>
                        ) : (
                          <span
                            style={{
                              backgroundColor: "#FEE2E2",
                              color: "#991B1B",
                              padding: "4px 8px",
                              borderRadius: "4px",
                              fontSize: "12px",
                              fontWeight: "500",
                            }}
                          >
                            Inactive
                          </span>
                        )}
                      </td>
                      <td style={{ padding: "12px" }}>
                        <div
                          style={{
                            display: "flex",
                            gap: "8px",
                            flexWrap: "wrap",
                          }}
                        >
                          <button
                            className="back-large-btn"
                            type="button"
                            onClick={() => handleUploadImages(pack)}
                            style={{ padding: "6px 12px", fontSize: "12px" }}
                          >
                            Upload Images
                          </button>
                          <button
                            className="back-large-btn"
                            type="button"
                            onClick={() => handleEditPlan(pack)}
                            style={{ padding: "6px 12px", fontSize: "12px" }}
                          >
                            Edit Plan
                          </button>
                          <button
                            className={
                              pack.isActive ? "back-large-btn" : "primary-btn"
                            }
                            type="button"
                            onClick={() => handleToggle(pack.id)}
                            style={{ padding: "6px 12px", fontSize: "12px" }}
                          >
                            <span
                              className={
                                pack.isActive ? "" : "primary-btn-text"
                              }
                              style={{
                                color: pack.isActive ? "#000" : "white",
                                fontWeight: "bold",
                              }}
                            >
                              {pack.isActive ? "Deactivate" : "Activate"}
                            </span>
                          </button>
                          <button
                            className="primary-btn"
                            type="button"
                            onClick={() => handleDelete(pack)}
                            style={{
                              padding: "6px 12px",
                              fontSize: "12px",
                              backgroundColor: "#DC2626",
                              borderColor: "#DC2626",
                            }}
                          >
                            <span
                              className="primary-btn-text"
                              style={{ color: "white", fontWeight: "bold" }}
                            >
                              Delete
                            </span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            </Box>
          </Card>
        )}
      </SpacingBackground>

      {/* Edit Plan Modal */}
      <Modal variant="small" id={editPlanModalId}>
        <div style={{ padding: "16px" }}>
          <div style={{ marginBottom: "16px" }}>
            <p style={{ margin: 0, fontSize: "14px", marginBottom: "16px" }}>
              Accessible à partir du plan pour <strong>{selectedPack?.name}</strong>
            </p>
            <div>
              <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: "500" }}>
                Plan d&apos;accès
              </label>
              <select
                value={planValue}
                onChange={(e) => setPlanValue(e.target.value)}
                style={{
                  width: "100%",
                  padding: "8px 12px",
                  border: "1px solid #D1D5DB",
                  borderRadius: "4px",
                  fontSize: "14px",
                  minHeight: "40px",
                }}
              >
                <option value="free">Free — accessible par tous (free, basic, pro)</option>
                <option value="basic">Basic — accessible par Basic et Pro uniquement</option>
                <option value="pro">Pro — accessible par Pro uniquement</option>
              </select>
              <p style={{ margin: "8px 0 0 0", fontSize: "12px", color: "#6B7280" }}>
                Un pack Free est visible par tous. Un pack Basic par Basic et Pro. Un pack Pro par Pro uniquement.
              </p>
            </div>
          </div>
        </div>
        <TitleBar title="Edit Pack Plan">
          <button
            variant="primary"
            onClick={handleSavePlan}
            style={{
              backgroundColor: "rgb(1, 100, 100)",
              color: "white",
              border: "none",
              padding: "8px 16px",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Save
          </button>
          <button
            onClick={() => {
              shopify.modal.hide(editPlanModalId);
              setSelectedPack(null);
              setPlanValue("free");
            }}
            style={{
              backgroundColor: "transparent",
              border: "1px solid #D1D5DB",
              padding: "8px 16px",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
        </TitleBar>
      </Modal>

      {/* Delete Modal */}
      <Modal variant="small" id={deleteModalId}>
        <div style={{ padding: "16px" }}>
          <div style={{ marginBottom: "16px" }}>
            <p style={{ margin: 0, fontSize: "14px", marginBottom: "8px" }}>
              Are you sure you want to delete <strong>{selectedPack?.name}</strong>?
            </p>
            <p style={{ margin: 0, fontSize: "14px", color: "#6B7280" }}>
              This action cannot be undone. This will remove the pack from the database, but it will not affect templates that have already been imported by merchants.
            </p>
          </div>
        </div>
        <TitleBar title="Delete Template Pack">
          <button
            variant="primary"
            tone="critical"
            onClick={confirmDelete}
            style={{
              backgroundColor: "#DC2626",
              color: "white",
              border: "none",
              padding: "8px 16px",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Delete
          </button>
          <button
            onClick={() => {
              shopify.modal.hide(deleteModalId);
              setSelectedPack(null);
            }}
            style={{
              backgroundColor: "transparent",
              border: "1px solid #D1D5DB",
              padding: "8px 16px",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
        </TitleBar>
      </Modal>

      {/* Upload Images Modal */}
      <Modal variant="large" id={uploadModalId}>
        <div style={{ padding: "16px" }}>
          <div style={{ marginBottom: "16px" }}>
            <p style={{ margin: 0, fontSize: "14px", marginBottom: "16px" }}>
              Upload preview images for <strong>{selectedPack?.name}</strong>
            </p>
            <div style={{ marginBottom: "16px" }}>
              <FileInput
                title="Pack Preview Image"
                type="image"
                path={previewImgValue}
                handlePath={setPreviewImgValue}
                buttonTitle="Upload Pack Preview"
                onBeforeOpen={() => {
                  // Close the parent modal before opening FileUploader modal
                  shopify.modal.hide(uploadModalId);
                }}
                onAfterSelect={() => {
                  // Reopen the parent modal after selecting an image
                  shopify.modal.show(uploadModalId);
                }}
              />
            </div>
            {selectedPack && (
              <div>
                <h3
                  style={{
                    margin: "0 0 8px 0",
                    fontSize: "16px",
                    fontWeight: "600",
                  }}
                >
                  Templates in this pack
                </h3>
                <p
                  style={{
                    margin: 0,
                    fontSize: "14px",
                    color: "#6B7280",
                  }}
                >
                  Template preview images are stored in the JSON file. To update template images, edit the JSON file directly.
                </p>
              </div>
            )}
          </div>
        </div>
        <TitleBar title="Upload Preview Images">
          <button
            variant="primary"
            onClick={handleSavePreview}
            style={{
              backgroundColor: "rgb(1, 100, 100)",
              color: "white",
              border: "none",
              padding: "8px 16px",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Save
          </button>
          <button
            onClick={() => {
              shopify.modal.hide(uploadModalId);
              setSelectedPack(null);
              setPreviewImgValue("");
            }}
            style={{
              backgroundColor: "transparent",
              border: "1px solid #D1D5DB",
              padding: "8px 16px",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
        </TitleBar>
      </Modal>

      {/* Export template pack Modal — interface alignée Template Library / création config */}
      <Modal variant="max" id={exportModalId}>
        <form
          method="post"
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData();
            formData.set("action", "exportPack");
            formData.set("packName", exportPackName);
            if (exportParentCategoryName) formData.set("parentCategoryName", exportParentCategoryName);
            // Toujours envoyer le plan choisi (free | basic | pro) pour éviter qu'il soit perdu
            formData.set("packPlan", exportPackPlan || "free");
            exportSelectedIds.forEach((id) => formData.append("templateIds", String(id)));
            submit(formData, { method: "POST" });
            shopify.modal.hide(exportModalId);
            setExportPackName("");
            setExportParentCategoryName("");
            setExportPackPlan("free");
            setExportSelectedIds(new Set());
          }}
        >
          <Box padding="400" minHeight="360px">
            <BlockStack gap="400">
              <BlockStack gap="200">
                <Text as="h2" variant="headingMd" fontWeight="bold">
                  Export template pack
                </Text>
                <Text as="p" variant="bodyMd" tone="subdued">
                  Choose the templates (Templates/Main) to include in the pack. A JSON file will be generated with configurations, fonts and data, then saved to <code style={{ fontSize: "11px", background: "#F3F4F6", padding: "2px 6px", borderRadius: "4px" }}>public/template-packs/json</code> and the pack will be added to the list.
                </Text>
              </BlockStack>

              <Divider />

              {/* Section 1: Pack information */}
              <Card roundedAbove="sm">
                <Box padding="400">
                  <BlockStack gap="400">
                    <Text as="h3" variant="headingSm" fontWeight="semibold">
                      1. Pack information
                    </Text>
                    <InlineStack gap="400" wrap={false}>
                      <Box paddingInlineEnd="400" paddingBlockEnd="400" minWidth={0} style={{ flex: "1 1 0" }}>
                        <TextField
                          label="Pack name"
                          value={exportPackName}
                          onChange={setExportPackName}
                          placeholder="e.g. Signs Pack"
                          autoComplete="off"
                        />
                      </Box>
                      <Box paddingInlineEnd="400" paddingBlockEnd="400" minWidth={0} style={{ flex: "1 1 0" }}>
                        <Box paddingBlockEnd="200">
                          <Button size="slim" onClick={() => shopify.modal.show(addTypeModalId)}>
                            Add a new type
                          </Button>
                        </Box>
                        <Select
                          label="Sign type (parent category)"
                          options={[
                            { label: "— Choose a type (Door signs, Name badges, etc.) —", value: "" },
                            ...(parentSignTypes || []).map((name: string) => ({ label: name, value: name })),
                            ...customParentTypes.filter((n) => !(parentSignTypes || []).includes(n)).map((name: string) => ({ label: name, value: name })),
                          ]}
                          value={exportParentCategoryName}
                          onChange={setExportParentCategoryName}
                        />
                        <Box paddingBlockStart="100">
                          <Text as="p" variant="bodySm" tone="subdued">
                            Sign type under which the pack will be displayed in the Template Library.
                          </Text>
                        </Box>
                      </Box>
                      <Box paddingBlockEnd="400" minWidth={0} style={{ flex: "1 1 0" }}>
                        <Select
                          label="Access plan"
                          options={[
                            { label: "Free — accessible to all", value: "free" },
                            { label: "Basic — accessible to Basic and Pro", value: "basic" },
                            { label: "Pro — accessible to Pro only", value: "pro" },
                          ]}
                          value={exportPackPlan}
                          onChange={setExportPackPlan}
                        />
                        <Box paddingBlockStart="100">
                          <Text as="p" variant="bodySm" tone="subdued">
                            From which plan merchants can access this pack.
                          </Text>
                        </Box>
                      </Box>
                    </InlineStack>
                  </BlockStack>
                </Box>
              </Card>

              <Divider />

              {/* Section 2: Sélection des templates */}
              <Card roundedAbove="sm">
                <Box padding="400">
                  <BlockStack gap="400">
                    <InlineStack align="space-between" blockAlign="center" wrap>
                      <Text as="h3" variant="headingSm" fontWeight="semibold">
                        2. Select templates
                      </Text>
                      <InlineStack gap="300" blockAlign="center">
                        <Button
                          size="slim"
                          onClick={() => {
                            if (exportSelectedIds.size === templates.length) {
                              setExportSelectedIds(new Set());
                            } else {
                              setExportSelectedIds(new Set(templates.map((t: any) => t.id)));
                            }
                          }}
                        >
                          {exportSelectedIds.size === templates.length ? "Deselect all" : "Select all"}
                        </Button>
                        <Badge tone="info" size="large">
                          {exportSelectedIds.size} template{exportSelectedIds.size !== 1 ? "s" : ""} selected
                        </Badge>
                      </InlineStack>
                    </InlineStack>

                    {templates.length === 0 ? (
                      <Box padding="800" background="bg-surface-secondary" borderRadius="200" borderWidth="025" borderColor="border">
                        <BlockStack gap="200">
                          <Text as="p" variant="bodyMd" tone="subdued">
                            No templates in this store.
                          </Text>
                          <Text as="p" variant="bodySm" tone="subdued">
                            Create templates in Templates/Main first.
                          </Text>
                        </BlockStack>
                      </Box>
                    ) : (
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
                          gap: "14px",
                          maxHeight: "320px",
                          overflowY: "auto",
                          padding: "4px",
                        }}
                      >
                        {templates.map((t: any) => {
                          const isSelected = exportSelectedIds.has(t.id);
                          return (
                            <div
                              key={t.id}
                              role="button"
                              tabIndex={0}
                              onClick={() => {
                                const next = new Set(exportSelectedIds);
                                if (next.has(t.id)) next.delete(t.id);
                                else next.add(t.id);
                                setExportSelectedIds(next);
                              }}
                              onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                  e.preventDefault();
                                  const next = new Set(exportSelectedIds);
                                  if (next.has(t.id)) next.delete(t.id);
                                  else next.add(t.id);
                                  setExportSelectedIds(next);
                                }
                              }}
                              style={{
                                cursor: "pointer",
                                borderRadius: "12px",
                                border: isSelected ? "2px solid rgb(1, 100, 100)" : "1px solid #E5E7EB",
                                overflow: "hidden",
                                background: isSelected ? "#F0FDFA" : "#FFFFFF",
                                transition: "all 0.15s ease",
                                boxShadow: isSelected ? "0 2px 8px rgba(1, 100, 100, 0.15)" : "0 1px 3px rgba(0,0,0,0.06)",
                              }}
                            >
                              <div style={{ position: "relative", aspectRatio: "1", background: "#F3F4F6" }}>
                                {t.prevImg ? (
                                  <img
                                    src={getImageUrl(t.prevImg)}
                                    alt={t.name}
                                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                  />
                                ) : (
                                  <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <img src="/aso_logo.png" alt="" style={{ width: "48px", height: "48px", opacity: 0.4 }} />
                                  </div>
                                )}
                                <div
                                  style={{
                                    position: "absolute",
                                    top: "8px",
                                    right: "8px",
                                    width: "22px",
                                    height: "22px",
                                    borderRadius: "6px",
                                    border: "2px solid " + (isSelected ? "rgb(1, 100, 100)" : "#D1D5DB"),
                                    background: isSelected ? "rgb(1, 100, 100)" : "#FFFFFF",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                  }}
                                >
                                  {isSelected && (
                                    <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M1 5L4.5 8.5L11 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                  )}
                                </div>
                              </div>
                              <div style={{ padding: "10px" }}>
                                <Text as="p" variant="bodySm" fontWeight="semibold" truncate>
                                  {t.name}
                                </Text>
                                <Text as="p" variant="bodySm" tone="subdued">
                                  {t.configurationName}
                                </Text>
                                <Badge size="small" tone="info">
                                  {t.categoryName}
                                </Badge>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </BlockStack>
                </Box>
              </Card>

              <Divider />

              {/* Footer */}
              <Box paddingBlockStart="200" paddingBlockEnd="0">
                <InlineStack align="space-between" blockAlign="center" wrap gap="300">
                  <Text as="p" variant="bodySm" tone="subdued">
                    {exportSelectedIds.size > 0 && exportPackName.trim()
                      ? `The pack "${exportPackName.trim()}" will contain ${exportSelectedIds.size} template(s).`
                      : "Select at least one template and give the pack a name."}
                  </Text>
                  <Button
                    variant="primary"
                    size="medium"
                    submit
                    disabled={exportSelectedIds.size === 0 || !exportPackName.trim()}
                  >
                    Generate pack
                  </Button>
                </InlineStack>
              </Box>
            </BlockStack>
          </Box>

          <TitleBar title="Export template pack">
            <button
              type="submit"
              disabled={exportSelectedIds.size === 0 || !exportPackName.trim()}
              style={{
                backgroundColor: exportSelectedIds.size === 0 || !exportPackName.trim() ? "#9CA3AF" : "rgb(1, 100, 100)",
                color: "white",
                border: "none",
                padding: "8px 16px",
                borderRadius: "8px",
                fontWeight: "600",
                cursor: exportSelectedIds.size === 0 || !exportPackName.trim() ? "not-allowed" : "pointer",
              }}
            >
              Generate pack
            </button>
            <Button
              variant="plain"
              onClick={() => {
                shopify.modal.hide(exportModalId);
                setExportPackName("");
                setExportParentCategoryName("");
                setExportPackPlan("free");
                setExportSelectedIds(new Set());
              }}
            >
              Cancel
            </Button>
          </TitleBar>
        </form>
      </Modal>

      {/* Mini modal: Add a new type (parent category) */}
      <Modal id={addTypeModalId}>
        <Box padding="400">
          <BlockStack gap="400">
            <Text as="h2" variant="headingMd" fontWeight="bold">
              Add a new type
            </Text>
            <TextField
              label="Name type"
              value={newTypeName}
              onChange={setNewTypeName}
              placeholder="e.g. Custom signs"
              autoComplete="off"
            />
            <InlineStack gap="300">
              <Button
                variant="primary"
                onClick={() => {
                  const name = newTypeName.trim();
                  if (name) {
                    setCustomParentTypes((prev) => (prev.includes(name) ? prev : [...prev, name]));
                    setExportParentCategoryName(name);
                    setNewTypeName("");
                    shopify.modal.hide(addTypeModalId);
                  }
                }}
                disabled={!newTypeName.trim()}
              >
                Add type
              </Button>
              <Button variant="plain" onClick={() => { setNewTypeName(""); shopify.modal.hide(addTypeModalId); }}>
                Cancel
              </Button>
            </InlineStack>
          </BlockStack>
        </Box>
      </Modal>
    </div>
  );
}
