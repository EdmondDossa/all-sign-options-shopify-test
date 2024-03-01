import {
  Card,
  Layout,
  Page,
  Text,
} from "@shopify/polaris";

export default function Settings() {
  return (
    <Page fullWidth>
      <Layout>
        <Layout.Section>
          <Card>
          <Text as="h2" variant="headingSm">
           Settings page
          </Text>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}

