import {
    Box,
    Divider,
    InlineStack,
    Page,
    Text,
  } from "@shopify/polaris";
  
  import {Outlet} from "@remix-run/react";
  import { BoxBackground } from "~/components/layouts/BoxBackground";
  import NextLtrIcon from "~/components/icons/NextLtrIcon";
  import { Tabheader } from "~/components/layouts/TabHeader";
  

export default function Materiels(){
    
    return (<Page fullWidth>
        <BoxBackground>
          <Box paddingInline="300" paddingBlock="600">
            <InlineStack>
              <InlineStack gap="100" align="start">
                <Text as="h2" variant="headingMd">
                  Name config
                </Text>
                <NextLtrIcon />
                <Text as="h2" variant="headingMd" tone="subdued">
                  Material
                </Text>
               
              </InlineStack>
            </InlineStack>
          </Box>
        </BoxBackground>
  
        <Outlet/>
      </Page>)
}