import { useState } from "react";
import { useLoaderData, useNavigate } from "@remix-run/react";
import { LoaderFunctionArgs, json } from "@remix-run/node";
import { authenticate } from "~/shopify.server";
import TemplatePackService from "~/models/TemplatePack.service";
import { SpacingBackground } from "~/components/layouts/SpacingBackground";
import { BoxBackground } from "~/components/layouts/BoxBackground";
import { fileUrl } from "~/utils/fileUrl";

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
  const url = new URL(request.url);
  const type = url.searchParams.get("type") as "PACK" | "TEMPLATE" | null;
  
  // Get packs and templates separately
  const packs = await TemplatePackService.getAllPacks(session.id, "PACK");
  const templates = await TemplatePackService.getAllPacks(session.id, "TEMPLATE");

  return json({ packs, templates, activeType: type || "PACK" });
};

export default function TemplatePacksGallery() {
  const { packs, templates, activeType } = useLoaderData<typeof loader>();
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState<"PACK" | "TEMPLATE">(activeType);

  const handlePackClick = (packId: number) => {
    navigate(`/app/templates/packs/${packId}`);
  };

  const displayItems = currentTab === "PACK" ? packs : templates;

  return (
    <div style={{ width: "100%", height: "auto", padding: "10px 0px" }}>
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "8px",
          padding: "16px",
          marginBottom: "16px",
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
            Template Marketplace
          </h2>
          <button
            className="primary-btn"
            type="button"
            onClick={() => navigate("/app/templates/main")}
          >
            <div style={{ padding: "0 16px" }}>
              <span className="primary-btn-text">Back to Templates</span>
            </div>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "8px",
          padding: "16px",
          marginBottom: "16px",
        }}
      >
        <div style={{ display: "flex", gap: "8px", borderBottom: "2px solid #E5E7EB" }}>
          <button
            type="button"
            onClick={() => setCurrentTab("PACK")}
            style={{
              padding: "12px 24px",
              border: "none",
              background: "none",
              borderBottom: currentTab === "PACK" ? "2px solid #3B82F6" : "2px solid transparent",
              color: currentTab === "PACK" ? "#3B82F6" : "#6B7280",
              fontWeight: currentTab === "PACK" ? "600" : "400",
              cursor: "pointer",
              marginBottom: "-2px",
            }}
          >
            Packs ({packs.length})
          </button>
          <button
            type="button"
            onClick={() => setCurrentTab("TEMPLATE")}
            style={{
              padding: "12px 24px",
              border: "none",
              background: "none",
              borderBottom: currentTab === "TEMPLATE" ? "2px solid #3B82F6" : "2px solid transparent",
              color: currentTab === "TEMPLATE" ? "#3B82F6" : "#6B7280",
              fontWeight: currentTab === "TEMPLATE" ? "600" : "400",
              cursor: "pointer",
              marginBottom: "-2px",
            }}
          >
            Individual Templates ({templates.length})
          </button>
        </div>
      </div>

      <SpacingBackground width="100%" height="auto" margin="16px 0px">
        {displayItems.length === 0 ? (
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
              No {currentTab === "PACK" ? "template packs" : "templates"} available
            </h3>
            <p style={{ marginBottom: "20px", color: "#6B7280" }}>
              There are no {currentTab === "PACK" ? "template packs" : "individual templates"} available at the moment.
            </p>
            <button
              className="primary-btn"
              type="button"
              onClick={() => navigate("/app/templates/main")}
            >
              <div style={{ padding: "0 16px" }}>
                <span className="primary-btn-text">Back to Templates</span>
              </div>
            </button>
          </div>
        ) : (
          <BoxBackground>
            <div
              style={{
                padding: "24px",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                gap: "24px",
              }}
            >
              {displayItems.map((pack: any) => (
                <SpacingBackground
                  key={pack.id}
                  backgroundColor="#FFFFFF"
                  borderRadius="8px"
                  border="1px solid #E5E7EB"
                >
                  <div
                    style={{
                      cursor: "pointer",
                      position: "relative",
                    }}
                    onClick={() => handlePackClick(pack.id)}
                  >
                    <div style={{ width: "100%", padding: 0 }}>
                      {pack.previewImg ? (
                        <img
                          src={getImageUrl(pack.previewImg)}
                          alt={pack.name}
                          style={{
                            width: "100%",
                            height: "200px",
                            objectFit: "cover",
                            borderRadius: "8px 8px 0 0",
                          }}
                        />
                      ) : (
                        <div
                          style={{
                            width: "100%",
                            height: "200px",
                            backgroundColor: "#F3F4F6",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: "8px 8px 0 0",
                          }}
                        >
                          <img
                            src="/aso_logo.png"
                            alt="Default"
                            style={{
                              width: "80px",
                              height: "80px",
                              opacity: 0.5,
                            }}
                          />
                        </div>
                      )}
                    </div>
                    <div style={{ padding: "16px" }}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginBottom: "8px",
                        }}
                      >
                        <h3
                          style={{
                            margin: 0,
                            fontSize: "16px",
                            fontWeight: "bold",
                          }}
                        >
                          {pack.name}
                        </h3>
                        {pack.isPurchased && (
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
                            Purchased
                          </span>
                        )}
                      </div>
                      <div style={{ marginBottom: "16px" }}>
                        <p
                          style={{
                            margin: 0,
                            fontSize: "14px",
                            color: "#6B7280",
                          }}
                        >
                          {pack.description || `${pack.category} templates`}
                        </p>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
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
                          <p
                            style={{
                              margin: 0,
                              fontSize: "16px",
                              fontWeight: "bold",
                            }}
                          >
                            ${pack.price.toFixed(2)}
                          </p>
                        )}
                        <div onClick={(e) => e.stopPropagation()}>
                          <button
                            className={pack.isPurchased ? "back-large-btn" : "primary-btn"}
                            type="button"
                            onClick={() => handlePackClick(pack.id)}
                            style={{
                              padding: pack.isPurchased ? "8px 16px" : "8px 16px",
                            }}
                          >
                            <span
                              className={
                                pack.isPurchased ? "" : "primary-btn-text"
                              }
                              style={{
                                color: pack.isPurchased ? "#000" : "white",
                                fontWeight: "bold",
                              }}
                            >
                              {pack.isPurchased
                                ? "View"
                                : pack.price === 0
                                ? "Get Free"
                                : "Buy Now"}
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </SpacingBackground>
              ))}
            </div>
          </BoxBackground>
        )}
      </SpacingBackground>
    </div>
  );
}
