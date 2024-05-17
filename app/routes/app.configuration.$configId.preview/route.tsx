import {
    Box,
    Divider,
    InlineStack,
    Page,
    Text,
  } from "@shopify/polaris";
  
  import {Link, Outlet, Scripts, useLoaderData, useNavigate, useOutletContext} from "@remix-run/react";
  import { BoxBackground } from "~/components/layouts/BoxBackground";
  import NextLtrIcon from "~/components/icons/NextLtrIcon";
  import { Tabheader } from "~/components/layouts/TabHeader";
import MaterialService from "~/models/Material.service";
import { Material } from "~/types/ConfigDataType";
import { LoaderFunctionArgs, json } from "@remix-run/node";
import { authenticate } from "~/shopify.server";
import { ConfigurationType } from "~/types/ConfigurationType";
import { SpacingBackground } from "~/components/layouts/SpacingBackground";
import previewStyle from "./assets/index.css";
import { ExternalScriptsHandle } from "remix-utils/external-scripts";
import { useEffect } from "react";
import { Modal, TitleBar, useAppBridge } from "@shopify/app-bridge-react";


export const links = () => [{ rel: "stylesheet", href: previewStyle }];
export const loader = async ({ request, params }: LoaderFunctionArgs) => {
    const { session, admin } = await authenticate.admin(request);
    const configId = parseInt(params.configId ?? "");
    let materials: Material[] | null = null;
  
    if (configId) {
      materials = await MaterialService.getAll(session.id, configId);
    }
  
    return json({ materials });
  };

export default function Preview() {
  const navigate = useNavigate();
  let { materials } = useLoaderData<typeof loader>();
  const { configuration } = useOutletContext<{ configuration: ConfigurationType; }>();
  const shopify = useAppBridge();
  
  return (<Page fullWidth>

      <Modal id="my-modal" open={true} variant="max" onHide={() => navigate(`../..`)}>
        <iframe name={`configId_${configuration.id}`} src="/preview.html" className="aso-preview">
      </iframe>
      <TitleBar title={configuration.name}>
         
          
        </TitleBar>
      </Modal>
        <BoxBackground>
          <Box paddingInline="300" paddingBlock="600">
            <InlineStack>
            <InlineStack gap="100" align="start">
      
              
                <Text as="h2" variant="headingMd">
                  {configuration.name}
                </Text>
              <NextLtrIcon />
              
                <Text as="h2" variant="headingMd" tone="subdued">
                  Preview
                </Text>
               
              </InlineStack>
            </InlineStack>
          </Box>
      </BoxBackground>
   
  
  
      </Page>)
}