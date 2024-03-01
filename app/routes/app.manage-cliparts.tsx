import {
  Card,
  Layout,
  Page,
  Text,
} from "@shopify/polaris";

export default function ManageCliparts() {
  return (
    <Page fullWidth>
      <Layout>
        <Layout.Section>
          <Card>
          <Text as="h2" variant="headingSm">
           Manage cliparts page
          </Text>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
