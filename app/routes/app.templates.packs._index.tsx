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
  EmptyState,
} from "@shopify/polaris";
import { useLoaderData, useNavigate } from "@remix-run/react";
import { LoaderFunctionArgs, json } from "@remix-run/node";
import { authenticate } from "~/shopify.server";
import TemplatePackService from "~/models/TemplatePack.service";
import { SpacingBackground } from "~/components/layouts/SpacingBackground";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { session } = await authenticate.admin(request);
  const packs = await TemplatePackService.getAllPacks(session.id);

  return json({ packs });
};

export default function TemplatePacksGallery() {
  const { packs } = useLoaderData<typeof loader>();
  const navigate = useNavigate();

  const handlePackClick = (packId: number) => {
    navigate(`/app/templates/packs/${packId}`);
  };

  return (
    <Page
      title="Template Packs"
      primaryAction={{
        content: "Back to Templates",
        onAction: () => navigate("/app/templates/main"),
      }}
    >
      <SpacingBackground width="100%" height="auto" margin="16px 0px">
        {packs.length === 0 ? (
          <EmptyState
            heading="No template packs available"
            action={{
              content: "Back to Templates",
              onAction: () => navigate("/app/templates/main"),
            }}
            image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
          >
            <p>There are no template packs available at the moment.</p>
          </EmptyState>
        ) : (
          <Box padding="600">
            <Grid gap={{ xs: "400", sm: "400", md: "500", lg: "600" }}>
              {packs.map((pack: any) => (
                <Grid.Cell
                  columnSpan={{ xs: 6, sm: 3, md: 3, lg: 3, xl: 3 }}
                  key={pack.id}
                >
                  <Card>
                    <Box padding="400">
                      <div
                        style={{ cursor: "pointer" }}
                        onClick={() => handlePackClick(pack.id)}
                      >
                        <Thumbnail
                          source={pack.previewImg || "/aso_logo.png"}
                          alt={pack.name}
                          size="large"
                        />
                        <Box paddingBlockStart="400">
                          <InlineStack align="space-between" blockAlign="center">
                            <Text as="h3" variant="headingMd" fontWeight="bold">
                              {pack.name}
                            </Text>
                            {pack.isPurchased && (
                              <Badge tone="success">Purchased</Badge>
                            )}
                          </InlineStack>
                          <Box paddingBlockStart="200">
                            <Text as="p" variant="bodyMd" tone="subdued">
                              {pack.description || `${pack.category} templates`}
                            </Text>
                          </Box>
                          <Box paddingBlockStart="400">
                            <InlineStack align="space-between" blockAlign="center">
                              {pack.price === 0 ? (
                                <Badge tone="success">Free</Badge>
                              ) : (
                                <Text as="p" variant="headingSm" fontWeight="bold">
                                  ${pack.price.toFixed(2)}
                                </Text>
                              )}
                              <div onClick={(e) => e.stopPropagation()}>
                                <Button
                                  variant={
                                    pack.isPurchased ? "secondary" : "primary"
                                  }
                                  onClick={() => handlePackClick(pack.id)}
                                >
                                  {pack.isPurchased
                                    ? "View"
                                    : pack.price === 0
                                    ? "Get Free"
                                    : "Buy Now"}
                                </Button>
                              </div>
                            </InlineStack>
                          </Box>
                        </Box>
                      </div>
                    </Box>
                  </Card>
                </Grid.Cell>
              ))}
            </Grid>
          </Box>
        )}
      </SpacingBackground>
    </Page>
  );
}
