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
    
  return (
    <>
       <BoxBackground>
          <Box paddingInline="300" paddingBlock="600">
            <InlineStack align="start">
              <InlineStack gap="100" align="start" blockAlign="start">
                <Text as="h2" variant="headingMd">
                  Name config
                </Text>
                <NextLtrIcon />
                <Text as="h2" variant="headingMd" tone="subdued">
                  Material
                </Text>
                <NextLtrIcon />
                <Text as="h2" variant="headingMd" tone="subdued">
                  Plastic
              </Text>
              <NextLtrIcon />
                <Text as="h2" variant="headingMd" tone="subdued">
                  components
              </Text>
              <NextLtrIcon />
                <Text as="h2" variant="headingMd" tone="subdued">
                  options
                </Text>
              </InlineStack>
            </InlineStack>
          </Box>
          <Divider borderWidth="100" />
        </BoxBackground>
        <Divider borderWidth="100" />
        <Outlet/>
      </>
      )
}