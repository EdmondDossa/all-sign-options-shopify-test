import {
    Box,
    Divider,
    InlineStack,
    Page,
    Text,
  } from "@shopify/polaris";
  
  import {Link, Outlet, useOutletContext, useParams} from "@remix-run/react";
  import { BoxBackground } from "~/components/layouts/BoxBackground";
  import NextLtrIcon from "~/components/icons/NextLtrIcon";
  import { Tabheader } from "~/components/layouts/TabHeader";
import { ConfigurationType } from "~/types/ConfigurationType";
import { AnyCnameRecord } from "dns";
  

export default function Materiels(){
  const { configuration } = useOutletContext<{ configuration: ConfigurationType; }>();
  const params = useParams();
  const material = configuration?.data?.materials?.find((currMaterial: any,index:number) => index === parseInt(params.mId ?? ""));
  console.log(' material configuration', configuration)

  return (<Page fullWidth>
    <BoxBackground>
      <Box paddingInline="300" paddingBlock="600">
        <InlineStack>
          <InlineStack gap="100" align="start">
            <Text as="h2" variant="headingMd">
              {configuration.name}
            </Text>
            <NextLtrIcon />
            <Link className="link" to="../../materials">
            <Text as="h2" variant="headingMd" tone="subdued">
              Materials
            </Text>
            </Link>
            <NextLtrIcon />
            <Text as="h2" variant="headingMd" tone="subdued">
              {material?.name}
            </Text>
          </InlineStack>
        </InlineStack>
      </Box>
      <Divider borderWidth="100" />
      <Tabheader />
    </BoxBackground>
    <Divider borderWidth="100" />
    <Outlet />
  </Page>);
}