import { BlockStack, Box, InlineStack, Page, Text } from "@shopify/polaris";
import { BoxBackground } from "~/components/layouts/BoxBackground";
import { SpacingBackground } from "~/components/layouts/SpacingBackground";

export default function ConfigurationDemo() {
  return (
    <Page fullWidth>
      <SpacingBackground width="100%" height="00">
        <BoxBackground>
          <Box paddingBlock="2000"  >
            <BlockStack gap="2000">
              <BlockStack gap="150">
                <Text alignment="center" as="h2" variant="headingXl">
                  Include demo data?
                </Text>
                <Box paddingInline="2800" >
                <Text alignment="center" as="p"  tone="subdued">
                  To help you get started we can automatically add fonts,
                  colors, prices and sizes to your new configuration
                </Text>
                </Box>
              </BlockStack>
                <InlineStack align="center" gap="600">
                <button className="back-large-btn" type="button">
                    <Box paddingInline="1000">
                    <InlineStack gap="300">
                        <span style={{ color: "black", fontWeight: "bold" }}>
                        Include demo data{" "}
                        </span>
                    </InlineStack>
                    </Box>
                </button>
                <button className="next-large-btn" type="submit">
                    <Box paddingInline="1000">
                    <InlineStack gap="300">
                        <span style={{ color: "white", fontWeight: "bold" }}>
                        {" "}
                        No include demo data
                        </span>
                    </InlineStack>
                    </Box>
                </button>
                </InlineStack>
            </BlockStack>
          </Box>
        </BoxBackground>
      </SpacingBackground>
    </Page>
  );
}
