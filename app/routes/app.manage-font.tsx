import {
  Card,
  Layout,
  Page,
  Text,
} from "@shopify/polaris";

export default function ManageFont() {
  return (
    <Page fullWidth>
      <Layout>
        <Layout.Section>
          <Card>
          <Text as="h2" variant="headingSm">
           Manage font page
          </Text>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
