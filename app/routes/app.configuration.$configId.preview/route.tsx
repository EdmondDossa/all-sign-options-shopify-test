import {
    Box,
    Divider,
    InlineStack,
    Page,
    Text,
  } from "@shopify/polaris";
  
  import {Link, Outlet, Scripts, useLoaderData, useOutletContext} from "@remix-run/react";
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
// import './assets/shopify'
// import './assets/fabric'
// import './assets/editor.script'
// import './assets/index'


// export let handle: ExternalScriptsHandle = {
//   scripts: [
//     {
//       src: "/assets-preview/shopify.js",
//       crossOrigin: 'anonymous',
//       preload: true
//     },
//     {
//       src: "/assets-preview/editor.script.js",
//       crossOrigin: 'anonymous',
//       preload: true
//     },
//     {
//       src: "/assets-preview/fabric.js",
//       crossOrigin: 'anonymous',
//       preload: true
//     },
//     {
//       src: "/assets-preview/index.js",
//       preload: true,
//       crossOrigin: 'anonymous',
//     }
//   ],
// };

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
  useEffect(() => {
    const script = document.createElement('script');
    script.src = '/assets-preview/index.js';
    script.async = true;
    script.onload = () => console.log('Le script a été chargé avec succès.');
    script.onerror = () => console.error('Une erreur est survenue lors du chargement du script.');
    document.body.appendChild(script);

    // Fonction de nettoyage pour supprimer le script lors du démontage du composant
    return () => {
      document.body.removeChild(script);
    }
  }, []);
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
                  Preview
                </Text>
               
              </InlineStack>
            </InlineStack>
          </Box>
      </BoxBackground>
      <SpacingBackground>
      <div id="app">
        
      <h1> All  signs options    </h1>    
      </div>
      </SpacingBackground>
  
  
      </Page>)
}