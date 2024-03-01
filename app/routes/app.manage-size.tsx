import {
  Card,
  Layout,
  Page,
  Text,
} from "@shopify/polaris";

export default function ManageSize() {
  return (
    <Page fullWidth>
      <Layout>
        <Layout.Section>
          <Card>
          <Text as="h2" variant="headingSm">
           Manage size page
          </Text>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
