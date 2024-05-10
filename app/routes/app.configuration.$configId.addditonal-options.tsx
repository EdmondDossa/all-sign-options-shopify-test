import {
    Box,
    Divider,
    InlineStack,
    Page,
    Text,
  } from "@shopify/polaris";
  
  import {Link, Outlet, useLoaderData, useOutletContext} from "@remix-run/react";
  import { BoxBackground } from "~/components/layouts/BoxBackground";
  import NextLtrIcon from "~/components/icons/NextLtrIcon";
  import { Tabheader } from "~/components/layouts/TabHeader";
import MaterialService from "~/models/Material.service";
import { Material } from "~/types/ConfigDataType";
import { LoaderFunctionArgs, json } from "@remix-run/node";
import { authenticate } from "~/shopify.server";
import { ConfigurationType } from "~/types/ConfigurationType";
  export const loader = async ({ request, params }: LoaderFunctionArgs) => {
    const { session, admin } = await authenticate.admin(request);
    const configId = parseInt(params.configId ?? "");
    let materials: Material[] | null = null;
  
    if (configId) {
      materials = await MaterialService.getAll(session.id, configId);
    }
  
    return json({ materials });
  };

export default function Materiels(){
  let { materials } = useLoaderData<typeof loader>();
  const { configuration } = useOutletContext<{ configuration: ConfigurationType; }>();
  
    return (<Page fullWidth>
        <BoxBackground>
          <Box paddingInline="300" paddingBlock="600">
            <InlineStack>
            <InlineStack gap="100" align="start">
      
              
                <Text as="h2" variant="headingMd">
                  {configuration.name}
                </Text>
              <NextLtrIcon />
              
                <Text as="h2" variant="headingMd" tone="subdued">
                  Additionals options
                </Text>
               
              </InlineStack>
            </InlineStack>
          </Box>
        </BoxBackground>
  
      <Outlet context={{ materials:materials, additonalOptions:configuration.data.additionalOptions}}/>
      </Page>)
}