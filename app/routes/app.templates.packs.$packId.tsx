import { useLoaderData, useNavigate, useSubmit, useActionData } from "@remix-run/react";
import { useEffect } from "react";
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
  const { session, admin } = await authenticate.admin(request);
  const packId = parseInt(params.packId || "0");

  if (!packId) {
    throw new Response("Pack not found", { status: 404 });
  }

  // Check if this is a return from payment (has charge_id in query params)
  const url = new URL(request.url);
  const chargeId = url.searchParams.get("charge_id");
  
  if (chargeId) {
    // This is a return from payment approval - check status and finalize
    try {
      const chargeIdGid = `gid://shopify/AppPurchaseOneTime/${chargeId}`;
      const query = `
        query getAppPurchaseOneTime($id: ID!) {
          node(id: $id) {
            ... on AppPurchaseOneTime {
              id
              name
              status
              test
              price {
                amount
                currencyCode
              }
            }
          }
        }
      `;

      const response = await admin.graphql(query, {
        variables: { id: chargeIdGid },
      });

      const data = await response.json();

      if (!data.errors && data.data?.node) {
        const charge = data.data.node;
        const status = charge.status;

        // Finalize the purchase
        const result = await TemplatePackService.finalizePurchase(
          chargeIdGid,
          status,
          admin
        );

        if (result.success && (status === "active" || status === "accepted")) {
          // Payment successful - redirect to templates page
          return redirect(
            `/app/templates/main${flashMessage(result.message || "Pack purchased and imported successfully!")}`
          );
        }
      }
    } catch (error) {
      console.error("Error checking payment status:", error);
      // Continue to show pack page if error
    }
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
  // Create one-time charge using GraphQL mutation
  try {
    const { admin } = await authenticate.admin(request);
    
    // Build return URL - same route, Shopify will redirect here after approval
    const appUrl = process.env.SHOPIFY_APP_URL || "";
    const baseUrl = appUrl.replace(/\/$/, "");
    const returnUrl = `${baseUrl}/app/templates/packs/${packId}`;
    
    console.log("Return URL for payment:", returnUrl);

    const mutation = `
      mutation appPurchaseOneTimeCreate($name: String!, $price: MoneyInput!, $test: Boolean!, $returnUrl: URL!) {
        appPurchaseOneTimeCreate(
          name: $name
          price: $price
          test: $test
          returnUrl: $returnUrl
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
        amount: pack.price.toFixed(2), // Ensure 2 decimal places for Shopify
        currencyCode: "USD",
      },
      test: process.env.IS_TEST === "true" || false,
      returnUrl: returnUrl,
    };

    // Execute the GraphQL mutation
    const response = await admin.graphql(mutation, {
      variables,
    });

    const data = await response.json();

    // Check for GraphQL errors
    if (data.errors) {
      console.error("GraphQL errors:", data.errors);
      return json(
        { error: data.errors[0]?.message || "Error creating payment charge" },
        { status: 500 }
      );
    }

    // Check for user errors from the mutation
    if (data.data?.appPurchaseOneTimeCreate?.userErrors?.length > 0) {
      const userError = data.data.appPurchaseOneTimeCreate.userErrors[0];
      console.error("User errors:", userError);
      return json(
        { error: userError.message || "Error creating payment charge" },
        { status: 400 }
      );
    }

    const purchaseData = data.data?.appPurchaseOneTimeCreate;
    if (!purchaseData) {
      return json(
        { error: "No data returned from payment creation" },
        { status: 500 }
      );
    }

    const confirmationUrl = purchaseData.confirmationUrl;
    const chargeId = purchaseData.appPurchaseOneTime?.id;

    if (!confirmationUrl) {
      return json(
        { error: "No confirmation URL returned from payment creation" },
        { status: 500 }
      );
    }

    // Store purchase with pending status and charge ID
    // This will be updated to "active" when payment is confirmed via returnUrl
    await TemplatePackService.recordPurchaseWithCharge(
      session.id,
      packId,
      pack.price,
      chargeId || null,
      "pending"
    );

    // Return confirmation URL to client for redirect (can't use server redirect for external URLs in embedded app)
    return json({ confirmationUrl, success: true });
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
  const actionData = useActionData<typeof action>();
  const navigate = useNavigate();
  const submit = useSubmit();

  // Handle redirect to confirmation URL after purchase
  useEffect(() => {
    if (actionData?.confirmationUrl) {
      // Use window.top to break out of iframe for external redirect
      if (window.top) {
        window.top.location.href = actionData.confirmationUrl;
      } else {
        window.location.href = actionData.confirmationUrl;
      }
    }
  }, [actionData]);

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

      {/* Error message display */}
      {actionData?.error && (
        <div
          style={{
            backgroundColor: "#FEE2E2",
            border: "1px solid #FCA5A5",
            borderRadius: "8px",
            padding: "12px 16px",
            marginBottom: "16px",
            color: "#991B1B",
          }}
        >
          <strong>Erreur:</strong> {actionData.error}
        </div>
      )}

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
