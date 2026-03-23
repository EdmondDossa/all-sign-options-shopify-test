import {
  Badge,
  BlockStack,
  Box,
  Button,
  Card,
  Grid,
  InlineStack,
  List,
  Text,
} from "@shopify/polaris";

export default function SimplifiedBuilderPlaceholder({
  title,
  description,
  items,
  stats = [],
  legacyLabel,
  legacyUrl,
  note,
}: {
  title: string;
  description: string;
  items: string[];
  stats?: Array<{
    label: string;
    value: string;
    tone?: "info" | "success" | "warning" | "attention";
  }>;
  legacyLabel?: string;
  legacyUrl?: string;
  note?: string;
}) {
  return (
    <BlockStack gap="400">
      <Card>
        <Box padding="400">
          <BlockStack gap="250">
            <InlineStack align="space-between" blockAlign="start">
              <BlockStack gap="100">
                <InlineStack gap="200" blockAlign="center">
                  <Text as="h2" variant="headingLg">
                    {title}
                  </Text>
                  <Badge tone="info">Builder MVP</Badge>
                </InlineStack>
                <Text as="p" tone="subdued">
                  {description}
                </Text>
              </BlockStack>

              {legacyLabel && legacyUrl ? (
                <Button url={legacyUrl} variant="primary" tone="success">
                  {legacyLabel}
                </Button>
              ) : null}
            </InlineStack>

            {note ? (
              <Box
                background="bg-surface-secondary"
                padding="300"
                borderRadius="300"
                borderWidth="025"
                borderColor="border"
              >
                <Text as="p" tone="subdued">
                  {note}
                </Text>
              </Box>
            ) : null}
          </BlockStack>
        </Box>
      </Card>

      {stats.length > 0 ? (
        <Grid columns={{ xs: 1, sm: 2, md: 4, lg: 4, xl: 4 }}>
          {stats.map((stat) => (
            <Grid.Cell key={stat.label}>
              <Card>
                <Box padding="300">
                  <BlockStack gap="100">
                    <Text as="span" tone="subdued" variant="bodySm">
                      {stat.label}
                    </Text>
                    <InlineStack align="space-between" blockAlign="center">
                      <Text as="p" variant="headingLg">
                        {stat.value}
                      </Text>
                      {stat.tone ? <Badge tone={stat.tone}>{stat.label}</Badge> : null}
                    </InlineStack>
                  </BlockStack>
                </Box>
              </Card>
            </Grid.Cell>
          ))}
        </Grid>
      ) : null}

      <Grid columns={{ xs: 1, sm: 1, md: 2, lg: 2, xl: 2 }}>
        <Grid.Cell>
          <Card>
            <Box padding="400">
              <BlockStack gap="250">
                <Text as="h3" variant="headingMd">
                  Screen Scope
                </Text>
                <List type="bullet">
                  {items.map((item) => (
                    <List.Item key={item}>{item}</List.Item>
                  ))}
                </List>
              </BlockStack>
            </Box>
          </Card>
        </Grid.Cell>

        <Grid.Cell>
          <Card>
            <Box padding="400">
              <BlockStack gap="250">
                <Text as="h3" variant="headingMd">
                  Current Direction
                </Text>
                <Text as="p" tone="subdued">
                  This screen is the simplified builder entry point. The goal is to stop forcing
                  merchants into deep material-driven routes and replace that with option-focused
                  screens.
                </Text>
                {legacyLabel && legacyUrl ? (
                  <InlineStack align="start">
                    <Button url={legacyUrl}>Open current legacy flow</Button>
                  </InlineStack>
                ) : (
                  <Text as="p" tone="subdued">
                    This section does not have a dedicated legacy manager yet. The simplified
                    builder will become the primary entry point here.
                  </Text>
                )}
              </BlockStack>
            </Box>
          </Card>
        </Grid.Cell>
      </Grid>
    </BlockStack>
  );
}
