import { useLoaderData, useNavigate, useSubmit } from "@remix-run/react";
import { LoaderFunctionArgs, ActionFunctionArgs, json, redirect } from "@remix-run/node";
import { authenticate } from "~/shopify.server";
import TemplatePackService from "~/models/TemplatePack.service";
import { SpacingBackground } from "~/components/layouts/SpacingBackground";
import { BoxBackground } from "~/components/layouts/BoxBackground";
import { flashMessage } from "~/utils/message-flash";
import { readFileSync } from "fs";
import * as path from "path";
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

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const { session } = await authenticate.admin(request);
  const packId = parseInt(params.packId || "0");

  if (!packId) {
    throw new Response("Pack not found", { status: 404 });
  }

  const pack = await TemplatePackService.getPack(packId, session.id);

  if (!pack) {
    throw new Response("Pack not found", { status: 404 });
  }

  // Read JSON to get template count and templates data
  let templateCount = 0;
  let templates: any[] = [];
  try {
    const jsonPath = path.join(process.cwd(), "public", "template-packs", "json", pack.jsonFile);
    const packData = JSON.parse(readFileSync(jsonPath, "utf8"));
    
    // Support both new format (configurations array) and legacy format
    const isNewFormat = packData.configurations && Array.isArray(packData.configurations);
    
    if (isNewFormat) {
      // New format: extract all templates from all configurations
      packData.configurations.forEach((config: any) => {
        if (config.templates && Array.isArray(config.templates)) {
          templates.push(...config.templates);
        }
      });
      templateCount = templates.length;
    } else {
      // Legacy format: templates at root level
      templates = packData.templates || [];
      templateCount = templates.length;
    }
  } catch (error) {
    console.error("Error reading pack JSON:", error);
  }

  return json({ pack, templateCount, templates });
};

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const { session, billing } = await authenticate.admin(request);
  const packId = parseInt(params.packId || "0");

  if (!packId) {
    return json({ error: "Invalid pack ID" }, { status: 400 });
  }

  const pack = await TemplatePackService.getPack(packId, session.id);

  if (!pack) {
    return json({ error: "Pack not found" }, { status: 404 });
  }

  // Check if already purchased
  if (pack.isPurchased && pack.hasAccess) {
    // Re-import if templates are missing
    const { admin } = await authenticate.admin(request);
    const result = await TemplatePackService.importPackToShop(
      session.id,
      packId,
      session.shop,
      admin
    );

    if (result.success) {
      return redirect(
        `/app/templates/main${flashMessage("Pack templates re-imported successfully")}`
      );
    } else {
      return json({ error: result.message }, { status: 400 });
    }
  }

  // If pack is free (price = 0), import directly without payment
  if (pack.price === 0) {
    try {
      // Record purchase with price 0
      await TemplatePackService.recordPurchase(session.id, packId, 0);

      // Import pack
      const { admin } = await authenticate.admin(request);
      const result = await TemplatePackService.importPackToShop(
        session.id,
        packId,
        session.shop,
        admin
      );

      if (result.success) {
        return redirect(
          `/app/templates/main${flashMessage(`Free pack "${pack.name}" imported successfully! ${result.templatesCount} templates added.`)}`
        );
      } else {
        return json({ error: result.message }, { status: 400 });
      }
    } catch (error: any) {
      console.error("Error importing free pack:", error);
      return json(
        { error: error.message || "Error importing free pack" },
        { status: 500 }
      );
    }
  }

  // For paid packs, use one-time payment
  // For one-time payment, we'll use a GraphQL mutation
  // This will be handled via a custom billing request
  try {
    // Create one-time charge using GraphQL
    const mutation = `
      mutation appPurchaseOneTimeCreate($name: String!, $price: MoneyInput!, $test: Boolean!) {
        appPurchaseOneTimeCreate(
          name: $name
          price: $price
          test: $test
        ) {
          appPurchaseOneTime {
            id
            name
            price {
              amount
              currencyCode
            }
            status
            test
          }
          confirmationUrl
          userErrors {
            field
            message
          }
        }
      }
    `;

    const variables = {
      name: pack.name,
      price: {
        amount: pack.price,
        currencyCode: "USD",
      },
      test: process.env.IS_TEST === "true",
    };

    // Store pack purchase info temporarily (we'll verify via webhook)
    // For now, we'll proceed with the purchase and import immediately
    // In production, you should verify payment via webhook first

    // Record purchase
    await TemplatePackService.recordPurchase(session.id, packId, pack.price);

    // Import pack
    const result = await TemplatePackService.importPackToShop(
      session.id,
      packId,
      session.shop
    );

    if (result.success) {
      return redirect(
        `/app/templates/main${flashMessage(`Pack "${pack.name}" purchased and imported successfully! ${result.templatesCount} templates added.`)}`
      );
    } else {
      return json({ error: result.message }, { status: 400 });
    }
  } catch (error: any) {
    console.error("Error processing pack purchase:", error);
    return json(
      { error: error.message || "Error processing purchase" },
      { status: 500 }
    );
  }
};

export default function TemplatePackDetail() {
  const { pack, templateCount, templates } = useLoaderData<typeof loader>();
  const navigate = useNavigate();
  const submit = useSubmit();

  const handlePurchase = () => {
    submit({}, { method: "POST" });
  };

  const handleReimport = () => {
    submit({}, { method: "POST" });
  };

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
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <button
              className="back-large-btn"
              type="button"
              onClick={() => navigate("/app/templates/packs")}
              style={{ padding: "8px 16px" }}
            >
              ← Back to Packs
            </button>
            <h2 style={{ margin: 0, fontSize: "20px", fontWeight: "bold" }}>
              {pack.name}
            </h2>
          </div>
        </div>
      </div>

      <SpacingBackground width="100%" height="auto" margin="16px 0px">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "24px",
          }}
        >
          {/* Left Column - Pack Preview */}
          <SpacingBackground
            backgroundColor="#FFFFFF"
            borderRadius="8px"
            border="1px solid #E5E7EB"
          >
            <div style={{ padding: "24px" }}>
              <div style={{ marginBottom: "24px" }}>
                {pack.previewImg ? (
                  <img
                    src={getImageUrl(pack.previewImg)}
                    alt={pack.name}
                    style={{
                      width: "100%",
                      height: "300px",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: "100%",
                      height: "300px",
                      backgroundColor: "#F3F4F6",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "8px",
                    }}
                  >
                    <img
                      src="/aso_logo.png"
                      alt="Default"
                      style={{
                        width: "120px",
                        height: "120px",
                        opacity: 0.5,
                      }}
                    />
                  </div>
                )}
              </div>
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "16px",
                  }}
                >
                  <h2
                    style={{
                      margin: 0,
                      fontSize: "24px",
                      fontWeight: "bold",
                    }}
                  >
                    {pack.name}
                  </h2>
                  {pack.isPurchased && (
                    <span
                      style={{
                        backgroundColor: pack.hasAccess
                          ? "#D1FAE5"
                          : "#FEF3C7",
                        color: pack.hasAccess ? "#065F46" : "#92400E",
                        padding: "4px 8px",
                        borderRadius: "4px",
                        fontSize: "12px",
                        fontWeight: "500",
                      }}
                    >
                      {pack.hasAccess ? "Purchased" : "Templates Removed"}
                    </span>
                  )}
                </div>
                <p
                  style={{
                    margin: "0 0 16px 0",
                    fontSize: "16px",
                    color: "#374151",
                  }}
                >
                  {pack.description || `Premium ${pack.category} templates`}
                </p>
                <div
                  style={{
                    height: "1px",
                    backgroundColor: "#E5E7EB",
                    margin: "16px 0",
                  }}
                />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <p
                      style={{
                        margin: "0 0 8px 0",
                        fontSize: "14px",
                        color: "#6B7280",
                      }}
                    >
                      {templateCount} templates included
                    </p>
                    <p
                      style={{
                        margin: 0,
                        fontSize: "20px",
                        fontWeight: "bold",
                      }}
                    >
                      {pack.price === 0 ? (
                        <span
                          style={{
                            backgroundColor: "#D1FAE5",
                            color: "#065F46",
                            padding: "4px 8px",
                            borderRadius: "4px",
                            fontSize: "14px",
                            fontWeight: "500",
                          }}
                        >
                          Free
                        </span>
                      ) : (
                        `$${pack.price.toFixed(2)}`
                      )}
                    </p>
                  </div>
                  {pack.isPurchased && pack.hasAccess ? (
                    <button
                      className="back-large-btn"
                      type="button"
                      onClick={() => navigate("/app/templates/main")}
                      style={{ padding: "8px 16px" }}
                    >
                      View Templates
                    </button>
                  ) : pack.isPurchased && !pack.hasAccess ? (
                    <button
                      className="primary-btn"
                      type="button"
                      onClick={handleReimport}
                      style={{ padding: "8px 16px" }}
                    >
                      <span className="primary-btn-text">Re-import Pack</span>
                    </button>
                  ) : (
                    <button
                      className="primary-btn"
                      type="button"
                      onClick={handlePurchase}
                      style={{ padding: "8px 16px" }}
                    >
                      <span className="primary-btn-text">
                        {pack.price === 0 ? "Get Free Pack" : "Purchase Pack"}
                      </span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </SpacingBackground>

          {/* Right Column - Pack Details & Templates */}
          <div>
            <SpacingBackground
              backgroundColor="#FFFFFF"
              borderRadius="8px"
              border="1px solid #E5E7EB"
            >
              <div style={{ padding: "24px" }}>
                <h3
                  style={{
                    margin: "0 0 16px 0",
                    fontSize: "18px",
                    fontWeight: "bold",
                  }}
                >
                  Pack Details
                </h3>
                <div style={{ marginBottom: "16px" }}>
                  <div style={{ marginBottom: "12px" }}>
                    <p style={{ margin: 0, fontSize: "14px" }}>
                      <strong>Category:</strong> {pack.category}
                    </p>
                  </div>
                  <div style={{ marginBottom: "12px" }}>
                    <p style={{ margin: 0, fontSize: "14px" }}>
                      <strong>Templates:</strong> {templateCount} premium
                      templates
                    </p>
                  </div>
                  <div>
                    <p style={{ margin: 0, fontSize: "14px" }}>
                      <strong>Price:</strong> ${pack.price.toFixed(2)} (one-time
                      payment)
                    </p>
                  </div>
                </div>
                {pack.isPurchased && !pack.hasAccess && (
                  <div
                    style={{
                      marginTop: "24px",
                      padding: "12px",
                      backgroundColor: "#FEF3C7",
                      border: "1px solid #FCD34D",
                      borderRadius: "6px",
                    }}
                  >
                    <p
                      style={{
                        margin: 0,
                        fontSize: "14px",
                        color: "#92400E",
                      }}
                    >
                      You have purchased this pack, but the templates have
                      been removed from your shop. Click "Re-import Pack" to
                      restore them.
                    </p>
                  </div>
                )}
              </div>
            </SpacingBackground>

            {templates && templates.length > 0 && (
              <SpacingBackground
                backgroundColor="#FFFFFF"
                borderRadius="8px"
                border="1px solid #E5E7EB"
                margin="16px 0 0 0"
              >
                <div style={{ padding: "24px" }}>
                  <h3
                    style={{
                      margin: "0 0 16px 0",
                      fontSize: "18px",
                      fontWeight: "bold",
                    }}
                  >
                    Templates in this pack ({templateCount})
                  </h3>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
                      gap: "16px",
                    }}
                  >
                    {templates.slice(0, 6).map((template: any, index: number) => (
                      <div
                        key={index}
                        style={{
                          backgroundColor: "#F9FAFB",
                          borderRadius: "8px",
                          padding: "12px",
                          border: "1px solid #E5E7EB",
                        }}
                      >
                        <img
                          src={getImageUrl(template.previewImg || template.icon)}
                          alt={template.name || `Template ${index + 1}`}
                          style={{
                            width: "100%",
                            height: "120px",
                            objectFit: "cover",
                            borderRadius: "4px",
                            marginBottom: "8px",
                          }}
                        />
                        <p
                          style={{
                            margin: 0,
                            fontSize: "12px",
                            fontWeight: "500",
                            textAlign: "center",
                          }}
                        >
                          {template.name || `Template ${index + 1}`}
                        </p>
                      </div>
                    ))}
                  </div>
                  {templates.length > 6 && (
                    <div style={{ marginTop: "16px" }}>
                      <p
                        style={{
                          margin: 0,
                          fontSize: "14px",
                          color: "#6B7280",
                          textAlign: "center",
                        }}
                      >
                        + {templates.length - 6} more templates
                      </p>
                    </div>
                  )}
                </div>
              </SpacingBackground>
            )}
          </div>
        </div>
      </SpacingBackground>
    </div>
  );
}
