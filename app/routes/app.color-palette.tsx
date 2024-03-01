import {
  Card,
  Layout,
  Page,
  Text,
} from "@shopify/polaris";

export default function ColorPalette() {
  return (
    <Page fullWidth>
      <Layout>
        <Layout.Section>
          <Card>
          <Text as="h2" variant="headingSm">
           Color palette page
          </Text>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
