import { LoaderFunctionArgs, json } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { Box, Card, InlineStack, Text } from "@shopify/polaris";
import NextLtrIcon from "~/components/icons/NextLtrIcon";
import { BoxBackground } from "~/components/layouts/BoxBackground";
import ClipartService from "~/models/Clipart.service";
import ClipartsGroupService from "~/models/ClipartsGroup.service";
import { authenticate } from "~/shopify.server";


export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const { session, admin } = await authenticate.admin(request);
  const clipartGroup = await ClipartsGroupService.getClipartsGroup(parseInt(params.id || "0"), session.id);
  console.log(clipartGroup);
  return json({clipartGroup});
}


export default function ManageSize() {
  const { clipartGroup } = useLoaderData<typeof loader>();
  
  return (
    <>
      <Card>
        <InlineStack>
          <InlineStack gap="100" align="start">
            <Link className="link" to="..">
              <Text as="h2" variant="headingMd" >
              Clipart groups
              </Text>
            </Link>
            <NextLtrIcon />
            <Text as="h2" variant="headingMd" tone="subdued">
              {clipartGroup.title}
            </Text>
          </InlineStack>
        </InlineStack>
      </Card>
      <Outlet context={{clipartGroup}}/>
    </>
  );
}