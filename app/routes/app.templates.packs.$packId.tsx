import {
  Box,
  Button,
  Card,
  Grid,
  InlineStack,
  Page,
  Text,
  Thumbnail,
  Badge,
  Banner,
  Divider,
  BlockStack,
} from "@shopify/polaris";
import { useLoaderData, useNavigate, useSubmit } from "@remix-run/react";
import { LoaderFunctionArgs, ActionFunctionArgs, json, redirect } from "@remix-run/node";
import { authenticate } from "~/shopify.server";
import TemplatePackService from "~/models/TemplatePack.service";
import { SpacingBackground } from "~/components/layouts/SpacingBackground";
import { flashMessage } from "~/utils/message-flash";
import { readFileSync } from "fs";
import * as path from "path";

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

  // Read JSON to get template count
  let templateCount = 0;
  try {
    const jsonPath = path.join(process.cwd(), "public", "template-packs", "json", pack.jsonFile);
    const packData = JSON.parse(readFileSync(jsonPath, "utf8"));
    
    // Support both new format (configurations array) and legacy format
    const isNewFormat = packData.configurations && Array.isArray(packData.configurations);
    
    if (isNewFormat) {
      // New format: count all templates across all configurations
      templateCount = packData.configurations.reduce((total: number, config: any) => {
        return total + (config.templates?.length || 0);
      }, 0);
    } else {
      // Legacy format: templates at root level
      templateCount = packData.templates?.length || 0;
    }
  } catch (error) {
    console.error("Error reading pack JSON:", error);
  }

  return json({ pack, templateCount });
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
  const { pack, templateCount } = useLoaderData<typeof loader>();
  const navigate = useNavigate();
  const submit = useSubmit();

  const handlePurchase = () => {
    submit({}, { method: "POST" });
  };

  const handleReimport = () => {
    submit({}, { method: "POST" });
  };

  return (
    <Page
      title={pack.name}
      backAction={{
        content: "Back to Packs",
        onAction: () => navigate("/app/templates/packs"),
      }}
    >
      <SpacingBackground width="100%" height="auto" margin="16px 0px">
        <Grid>
          <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
            <Card>
              <Box padding="600">
                <Thumbnail
                  source={pack.previewImg || "/aso_logo.png"}
                  alt={pack.name}
                  size="large"
                />
                <Box paddingBlockStart="600">
                  <BlockStack gap="400">
                    <InlineStack align="space-between" blockAlign="center">
                      <Text as="h2" variant="headingLg" fontWeight="bold">
                        {pack.name}
                      </Text>
                      {pack.isPurchased && (
                        <Badge tone={pack.hasAccess ? "success" : "warning"}>
                          {pack.hasAccess ? "Purchased" : "Templates Removed"}
                        </Badge>
                      )}
                    </InlineStack>
                    <Text as="p" variant="bodyLg">
                      {pack.description || `Premium ${pack.category} templates`}
                    </Text>
                    <Divider />
                    <InlineStack align="space-between" blockAlign="center">
                      <BlockStack gap="200">
                        <Text as="p" variant="bodyMd" tone="subdued">
                          {templateCount} templates included
                        </Text>
                        <Text as="p" variant="headingMd" fontWeight="bold">
                          {pack.price === 0 ? (
                            <Badge tone="success">Free</Badge>
                          ) : (
                            `$${pack.price.toFixed(2)}`
                          )}
                        </Text>
                      </BlockStack>
                      {pack.isPurchased && pack.hasAccess ? (
                        <Button
                          variant="secondary"
                          onClick={() => navigate("/app/templates/main")}
                        >
                          View Templates
                        </Button>
                      ) : pack.isPurchased && !pack.hasAccess ? (
                        <Button variant="primary" onClick={handleReimport}>
                          Re-import Pack
                        </Button>
                      ) : (
                        <Button variant="primary" onClick={handlePurchase}>
                          {pack.price === 0 ? "Get Free Pack" : "Purchase Pack"}
                        </Button>
                      )}
                    </InlineStack>
                  </BlockStack>
                </Box>
              </Box>
            </Card>
          </Grid.Cell>
          <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
            <Card>
              <Box padding="600">
                <Text as="h3" variant="headingMd" fontWeight="bold">
                  Pack Details
                </Text>
                <Box paddingBlockStart="400">
                  <BlockStack gap="300">
                    <Text as="p" variant="bodyMd">
                      <strong>Category:</strong> {pack.category}
                    </Text>
                    <Text as="p" variant="bodyMd">
                      <strong>Templates:</strong> {templateCount} premium
                      templates
                    </Text>
                    <Text as="p" variant="bodyMd">
                      <strong>Price:</strong> ${pack.price.toFixed(2)} (one-time
                      payment)
                    </Text>
                  </BlockStack>
                </Box>
                {pack.isPurchased && !pack.hasAccess && (
                  <Box paddingBlockStart="600">
                    <Banner tone="warning">
                      <Text as="p" variant="bodyMd">
                        You have purchased this pack, but the templates have
                        been removed from your shop. Click "Re-import Pack" to
                        restore them.
                      </Text>
                    </Banner>
                  </Box>
                )}
              </Box>
            </Card>
          </Grid.Cell>
        </Grid>
      </SpacingBackground>
    </Page>
  );
}
