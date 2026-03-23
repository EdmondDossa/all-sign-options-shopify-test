import { Box, Button, Card, InlineStack, Text } from "@shopify/polaris";
import { useOutletContext } from "@remix-run/react";

type OutletContext = {
  configuration: any;
};

export default function ConfigurationSettingsSortOptions() {
  const { configuration } = useOutletContext<OutletContext>();
  const sortOptions = Array.isArray(configuration?.data?.settings?.sortOptions)
    ? configuration.data.settings.sortOptions
    : [];

  return (
    <div style={{ display: "grid", gap: 12, marginTop: 10 }}>
      <Card>
        <Box padding="300">
          <InlineStack align="space-between" blockAlign="start">
            <div>
              <Text as="h2" variant="headingLg">
                Sort Options
              </Text>
              <Text as="p" tone="subdued">
                Control the customer-facing order of options from one place.
              </Text>
            </div>
            <Button disabled>Save ordering</Button>
          </InlineStack>
        </Box>
      </Card>

      <Card>
        <Box padding="300">
          <div style={{ display: "grid", gap: 12 }}>
            <Text as="h3" variant="headingMd">
              Current state
            </Text>
            <Text as="p" tone="subdued">
              This section is now part of the settings navigation. The actual drag and drop
              ordering screen is the next step to extract, after the other settings sections are
              aligned.
            </Text>
            <Text as="p" tone="subdued">
              Existing saved sort options: {sortOptions.length}
            </Text>
          </div>
        </Box>
      </Card>
    </div>
  );
}
