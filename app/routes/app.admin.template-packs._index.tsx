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
import { fileUrl } from "~/utils/fileUrl";
import { Modal, TitleBar, useAppBridge } from "@shopify/app-bridge-react";

// Helper function to get the correct image URL
// Uses the same approach as in app.configuration._index.tsx
const getImageUrl = (url: string | null | undefined): string => {
  if (!url) return "/aso_logo.png";
  
  // Use fileUrl to transform the URL (same as in configuration list)
  let finalUrl = fileUrl(url);
  
  // The URL from the database has an encoded filename (e.g., periscope%20%281%29.png)
  // but the file on disk has the original filename (e.g., periscope (1).png)
  // We need to decode the filename in the path so the server can find it
  try {
    // If it's a relative path (starts with /), decode the filename part
    if (finalUrl.startsWith("/")) {
      const parts = finalUrl.split("/");
      const filename = parts[parts.length - 1];
      if (filename && filename.includes("%")) {
        // Decode the filename
        const decodedFilename = decodeURIComponent(filename);
        parts[parts.length - 1] = decodedFilename;
        return parts.join("/");
      }
    }
    // If it's still a full URL, decode the pathname
    if (finalUrl.startsWith("http://") || finalUrl.startsWith("https://")) {
      const urlObj = new URL(finalUrl);
      urlObj.pathname = decodeURIComponent(urlObj.pathname);
      return urlObj.toString();
    }
    return finalUrl;
  } catch (e) {
    // If decoding fails, return as is
    return finalUrl;
  }
};

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
  const previewImg = formData.get("previewImg");

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
  }

  return json({ success: true });
};

export default function AdminTemplatePacks() {
  const { packs } = useLoaderData<typeof loader>();
  const navigate = useNavigate();
  const submit = useSubmit();
  const shopify = useAppBridge();
  useHandleFlashMessage();
  
  const [selectedPack, setSelectedPack] = useState<any>(null);
  const [priceValue, setPriceValue] = useState("");
  const [previewImgValue, setPreviewImgValue] = useState("");

  const editModalId = useId();
  const deleteModalId = useId();
  const uploadModalId = useId();

  const handleToggle = (packId: number) => {
    submit({ packId: packId.toString(), action: "toggle" }, { method: "POST" });
  };

  const handleEdit = (pack: any) => {
    setSelectedPack(pack);
    setPriceValue(pack.price.toString());
    shopify.modal.show(editModalId);
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
      shopify.modal.hide(editModalId);
      setSelectedPack(null);
      setPriceValue("");
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
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "8px",
          padding: "16px",
          marginTop: "36px",
          marginBottom: "36px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2 style={{ margin: 0, fontSize: "20px", fontWeight: "bold" }}>
            Template Packs Management
          </h2>
          <div style={{ display: "flex", gap: "12px" }}>
            <button
              className="back-large-btn"
              type="button"
              onClick={() => navigate("/app/admin/templates/export")}
            >
              <div style={{ padding: "0 16px" }}>
                <span>Export Templates</span>
              </div>
            </button>
            <button
              className="primary-btn"
              type="button"
              onClick={() => {
                submit({ action: "import" }, { method: "POST" });
              }}
            >
              <div style={{ padding: "0 16px" }}>
                <span className="primary-btn-text">Import Packs from Scripts</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      <SpacingBackground width="100%" height="auto" margin="16px 0px">
        {packs.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "60px 20px",
              backgroundColor: "#F8F9FB",
            }}
          >
            <img
              src="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
              alt="Empty state"
              style={{ maxWidth: "200px", marginBottom: "20px" }}
            />
            <h3 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "10px" }}>
              No template packs
            </h3>
            <p style={{ marginBottom: "10px", color: "#6B7280" }}>
              No template packs have been imported yet.
            </p>
            <p style={{ marginBottom: "20px", color: "#6B7280" }}>
              Click "Import Packs from Scripts" to import all JSON files from
              the scripts directory.
            </p>
            <button
              className="primary-btn"
              type="button"
              onClick={() => {
                submit({ action: "import" }, { method: "POST" });
              }}
            >
              <div style={{ padding: "0 16px" }}>
                <span className="primary-btn-text">Import Packs from Scripts</span>
              </div>
            </button>
          </div>
        ) : (
          <SpacingBackground
            backgroundColor="#FFFFFF"
            borderRadius="8px"
            border="1px solid #E5E7EB"
          >
            <div style={{ padding: "24px", overflowX: "auto" }}>
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
                      Price
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
                        {pack.price === 0 ? (
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
                            Free
                          </span>
                        ) : (
                          `$${pack.price.toFixed(2)}`
                        )}
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
                            onClick={() => handleEdit(pack)}
                            style={{ padding: "6px 12px", fontSize: "12px" }}
                          >
                            Edit Price
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
          </SpacingBackground>
        )}
      </SpacingBackground>

      {/* Edit Price Modal */}
      <Modal variant="small" id={editModalId}>
        <div style={{ padding: "16px" }}>
          <div style={{ marginBottom: "16px" }}>
            <p style={{ margin: 0, fontSize: "14px", marginBottom: "16px" }}>
              Edit the price for <strong>{selectedPack?.name}</strong>
            </p>
            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontSize: "14px",
                  fontWeight: "500",
                }}
              >
                Price (USD)
              </label>
              <div style={{ position: "relative" }}>
                <span
                  style={{
                    position: "absolute",
                    left: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    fontSize: "14px",
                  }}
                >
                  $
                </span>
                <input
                  type="number"
                  value={priceValue}
                  onChange={(e) => setPriceValue(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "8px 8px 8px 24px",
                    border: "1px solid #D1D5DB",
                    borderRadius: "4px",
                    fontSize: "14px",
                    minHeight: "40px",
                  }}
                  autoComplete="off"
                />
              </div>
              <p
                style={{
                  margin: "8px 0 0 0",
                  fontSize: "12px",
                  color: "#6B7280",
                }}
              >
                Set price to 0 to make this pack free
              </p>
              {parseFloat(priceValue) === 0 && (
                <span
                  style={{
                    display: "inline-block",
                    marginTop: "8px",
                    backgroundColor: "#D1FAE5",
                    color: "#065F46",
                    padding: "4px 8px",
                    borderRadius: "4px",
                    fontSize: "12px",
                    fontWeight: "500",
                  }}
                >
                  This pack will be free
                </span>
              )}
            </div>
          </div>
        </div>
        <TitleBar title="Edit Pack Price">
          <button
            variant="primary"
            onClick={handleSavePrice}
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
              shopify.modal.hide(editModalId);
              setSelectedPack(null);
              setPriceValue("");
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
    </div>
  );
}
