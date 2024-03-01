import {
  Card,
  Layout,
  Page,
  Text,
} from "@shopify/polaris";

export default function Message() {
  return (
    <Page fullWidth>
      <Layout>
        <Layout.Section>
          <Card>
          <Text as="h2" variant="headingSm">
           Message page
          </Text>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
