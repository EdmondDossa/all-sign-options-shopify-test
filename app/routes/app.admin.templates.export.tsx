import { useState, useId } from "react";
import { useLoaderData, useSubmit } from "@remix-run/react";
import { LoaderFunctionArgs, ActionFunctionArgs, json } from "@remix-run/node";
import { authenticate } from "~/shopify.server";
import TemplatePackService from "~/models/TemplatePack.service";
import TemplateService from "~/models/Template.service";
import { SpacingBackground } from "~/components/layouts/SpacingBackground";
import { BoxBackground } from "~/components/layouts/BoxBackground";
import { flashMessage, jFlashMessage } from "~/utils/message-flash";
import useHandleFlashMessage from "~/hooks/useHandleFlashMessage";
import { fileUrl } from "~/utils/fileUrl";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { session } = await authenticate.admin(request);
  const templates = await TemplatePackService.getTemplatesForSelection(session.id);

  return json({ templates });
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const { session } = await authenticate.admin(request);
  const formData = await request.formData();
  const action = formData.get("action");

  if (action === "export") {
    const selectedTemplateIds = formData.getAll("templateIds").map((id) => Number(id));
    const exportType = formData.get("exportType") as "PACK" | "TEMPLATE";
    const packName = formData.get("packName")?.toString();

    if (selectedTemplateIds.length === 0) {
      return json({ ...jFlashMessage("Please select at least one template", "error") });
    }

    if (exportType === "PACK" && !packName) {
      return json({ ...jFlashMessage("Pack name is required", "error") });
    }

    const result = await TemplatePackService.exportSelectedTemplates(
      session.id,
      selectedTemplateIds,
      exportType,
      packName || undefined
    );

    if (result.success) {
      return json({
        ...jFlashMessage(result.message),
        exportedFile: result.jsonFile,
      });
    } else {
      return json({ ...jFlashMessage(result.message, "error") });
    }
  }

  return json({ success: true });
};

export default function AdminTemplatesExport() {
  const { templates } = useLoaderData<typeof loader>();
  const submit = useSubmit();
  useHandleFlashMessage();

  const [selectedTemplateIds, setSelectedTemplateIds] = useState<Set<number>>(new Set());
  const [exportType, setExportType] = useState<"PACK" | "TEMPLATE">("PACK");
  const [packName, setPackName] = useState("");
  const [showExportModal, setShowExportModal] = useState(false);

  const toggleTemplateSelection = (templateId: number) => {
    const newSelection = new Set(selectedTemplateIds);
    if (newSelection.has(templateId)) {
      newSelection.delete(templateId);
    } else {
      newSelection.add(templateId);
    }
    setSelectedTemplateIds(newSelection);
  };

  const handleExport = () => {
    if (selectedTemplateIds.size === 0) {
      alert("Please select at least one template");
      return;
    }

    if (exportType === "PACK" && !packName.trim()) {
      alert("Please enter a pack name");
      return;
    }

    const formData = new FormData();
    formData.append("action", "export");
    formData.append("exportType", exportType);
    if (packName) {
      formData.append("packName", packName);
    }
    selectedTemplateIds.forEach((id) => {
      formData.append("templateIds", id.toString());
    });

    submit(formData, { method: "POST" });
    setShowExportModal(false);
    setSelectedTemplateIds(new Set());
    setPackName("");
  };

  // Group templates by category
  const templatesByCategory = templates.reduce((acc: any, template: any) => {
    const category = template.categoryName;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(template);
    return acc;
  }, {});

  return (
    <div style={{ width: "100%", height: "auto", padding: "10px 0px" }}>
      <SpacingBackground width="100%" height="auto" margin="16px 0px">
        <div style={{ padding: "24px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "24px",
            }}
          >
            <h1 style={{ margin: 0, fontSize: "24px", fontWeight: "bold" }}>
              Export Templates
            </h1>
            <div style={{ display: "flex", gap: "12px" }}>
              <button
                className="back-large-btn"
                type="button"
                onClick={() => (window.location.href = "/app/admin/template-packs")}
                style={{ padding: "8px 16px" }}
              >
                ← Back to Packs
              </button>
              {selectedTemplateIds.size > 0 && (
                <button
                  className="primary-btn"
                  type="button"
                  onClick={() => setShowExportModal(true)}
                  style={{ padding: "8px 16px" }}
                >
                  <span className="primary-btn-text">
                    Export {selectedTemplateIds.size} Template(s)
                  </span>
                </button>
              )}
            </div>
          </div>

          <div style={{ marginBottom: "16px", padding: "12px", backgroundColor: "#F3F4F6", borderRadius: "8px" }}>
            <p style={{ margin: 0, fontSize: "14px" }}>
              <strong>Instructions:</strong> Select templates to export as a pack or individually. 
              Selected templates: <strong>{selectedTemplateIds.size}</strong>
            </p>
          </div>

          {/* Templates grouped by category */}
          {Object.entries(templatesByCategory).map(([categoryName, categoryTemplates]: [string, any]) => (
            <BoxBackground
              key={categoryName}
              backgroundColor="#FFFFFF"
              borderRadius="8px"
              border="1px solid #E5E7EB"
              margin="16px 0"
            >
              <div style={{ padding: "16px" }}>
                <h2 style={{ margin: "0 0 16px 0", fontSize: "18px", fontWeight: "bold" }}>
                  {categoryName} ({categoryTemplates.length} template(s))
                </h2>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                    gap: "16px",
                  }}
                >
                  {categoryTemplates.map((template: any) => (
                    <div
                      key={template.id}
                      style={{
                        border: selectedTemplateIds.has(template.id)
                          ? "2px solid #3B82F6"
                          : "1px solid #E5E7EB",
                        borderRadius: "8px",
                        padding: "12px",
                        cursor: "pointer",
                        backgroundColor: selectedTemplateIds.has(template.id)
                          ? "#EFF6FF"
                          : "#FFFFFF",
                      }}
                      onClick={() => toggleTemplateSelection(template.id)}
                    >
                      <div style={{ position: "relative" }}>
                        <img
                          src={fileUrl(template.realImg || template.prevImg)}
                          alt={template.name}
                          style={{
                            width: "100%",
                            height: "150px",
                            objectFit: "cover",
                            borderRadius: "4px",
                            marginBottom: "8px",
                          }}
                        />
                        {selectedTemplateIds.has(template.id) && (
                          <div
                            style={{
                              position: "absolute",
                              top: "8px",
                              right: "8px",
                              backgroundColor: "#3B82F6",
                              color: "white",
                              borderRadius: "50%",
                              width: "24px",
                              height: "24px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: "14px",
                              fontWeight: "bold",
                            }}
                          >
                            ✓
                          </div>
                        )}
                      </div>
                      <p
                        style={{
                          margin: 0,
                          fontSize: "14px",
                          fontWeight: "500",
                          textAlign: "center",
                        }}
                      >
                        {template.name}
                      </p>
                      <p
                        style={{
                          margin: "4px 0 0 0",
                          fontSize: "12px",
                          color: "#6B7280",
                          textAlign: "center",
                        }}
                      >
                        {template.configurationName}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </BoxBackground>
          ))}

          {templates.length === 0 && (
            <div style={{ textAlign: "center", padding: "48px" }}>
              <p style={{ fontSize: "16px", color: "#6B7280" }}>
                No templates found. Create templates first in the templates section.
              </p>
            </div>
          )}
        </div>
      </SpacingBackground>

      {/* Export Modal */}
      {showExportModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
          onClick={() => setShowExportModal(false)}
        >
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "8px",
              padding: "24px",
              maxWidth: "500px",
              width: "90%",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{ margin: "0 0 16px 0", fontSize: "20px", fontWeight: "bold" }}>
              Export Templates
            </h2>

            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", marginBottom: "8px", fontWeight: "500" }}>
                Export Type:
              </label>
              <select
                value={exportType}
                onChange={(e) => setExportType(e.target.value as "PACK" | "TEMPLATE")}
                style={{
                  width: "100%",
                  padding: "8px",
                  borderRadius: "4px",
                  border: "1px solid #E5E7EB",
                }}
              >
                <option value="PACK">Pack (Multiple Templates)</option>
                <option value="TEMPLATE">Individual Template</option>
              </select>
            </div>

            {exportType === "PACK" && (
              <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", marginBottom: "8px", fontWeight: "500" }}>
                  Pack Name:
                </label>
                <input
                  type="text"
                  value={packName}
                  onChange={(e) => setPackName(e.target.value)}
                  placeholder="e.g., Christmas Pack"
                  style={{
                    width: "100%",
                    padding: "8px",
                    borderRadius: "4px",
                    border: "1px solid #E5E7EB",
                  }}
                />
              </div>
            )}

            <div style={{ marginBottom: "16px" }}>
              <p style={{ margin: 0, fontSize: "14px", color: "#6B7280" }}>
                {exportType === "PACK"
                  ? `This will create a pack containing ${selectedTemplateIds.size} template(s).`
                  : `This will export ${selectedTemplateIds.size === 1 ? "the selected template" : `${selectedTemplateIds.size} templates individually`}.`}
              </p>
            </div>

            <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}>
              <button
                className="back-large-btn"
                type="button"
                onClick={() => setShowExportModal(false)}
                style={{ padding: "8px 16px" }}
              >
                Cancel
              </button>
              <button
                className="primary-btn"
                type="button"
                onClick={handleExport}
                style={{ padding: "8px 16px" }}
              >
                <span className="primary-btn-text">Export</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
