import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, Outlet, useLoaderData, useLocation } from "@remix-run/react";
import { Box, Button, Card, InlineStack, Text } from "@shopify/polaris";
import NextLtrIcon from "~/components/icons/NextLtrIcon";
import ClipartsGroupService from "~/models/ClipartsGroup.service";
import { authenticate } from "~/shopify.server";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const { session } = await authenticate.admin(request);
  const clipartGroup = await ClipartsGroupService.getClipartsGroup(
    parseInt(params.id || "0", 10),
    session.id,
  );

  return json({ clipartGroup });
};

export default function ManageClipartsGroupLayout() {
  const { clipartGroup } = useLoaderData<typeof loader>();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const returnTo = searchParams.get("returnTo") || "";

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <Card>
        <Box padding="300">
          <InlineStack align="space-between" blockAlign="center">
            <InlineStack gap="100" align="start" blockAlign="center">
              <Link className="link" to={returnTo || ".."}>
                <Text as="h2" variant="headingMd">
                  {returnTo ? "Back to configuration" : "Clipart groups"}
                </Text>
              </Link>
              <NextLtrIcon />
              <Text as="h2" variant="headingMd" tone="subdued">
                {clipartGroup?.title || "Clipart group"}
              </Text>
            </InlineStack>
            <InlineStack gap="200">
              <Button url="..">Back to clipart groups</Button>
              {returnTo ? <Button url={returnTo}>Back to configuration</Button> : null}
            </InlineStack>
          </InlineStack>
        </Box>
      </Card>

      <Outlet context={{ clipartGroup }} />
    </div>
  );
}
