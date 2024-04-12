import { LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useAppBridge } from "@shopify/app-bridge-react";
import {
  Box,
  Card,
  Layout,
  Link,
  List,
  Page,
  Text,
  BlockStack,
  Button,
  TextField,
} from "@shopify/polaris";
import { useState } from "react";
import { ShopifyProductService } from "~/models/ShopifyProduct.service";
import { authenticate } from "~/shopify.server";


export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { admin } = await authenticate.admin(request);

  const metafieldId  = await  ShopifyProductService.getMetafieldID(admin, "gid://shopify/Product/7875608215707")
  
  const product  =  await  ShopifyProductService.createVariant(admin,"gid://shopify/Product/7875608215707",   'all  sign product 1', 100, 'https://images.pexels.com/photos/459335/pexels-photo-459335.jpeg')
  return json({product:product });

  return  json({id:metafieldId });
};

export default function AdditionalPage() {
  
  const [productId, setProductId] = useState<string>('');
  const  product  = useLoaderData<typeof loader>();

  const shopify = useAppBridge();


  console.log("product", product);
  return (
    <Page>
      <Layout>
        <Layout.Section>
          <Card>
            <BlockStack gap="300">
             
              <SelectProducField label="product"  onSelectProductID={(value:any)=>{ console.log("Product ID ",value)}} selectProductId={""} />

              <Text as="p" variant="bodyMd">
                The app template comes with an additional page which
                demonstrates how to create multiple pages within app navigation
                using{" "}
                <Link
                  url="https://shopify.dev/docs/apps/tools/app-bridge"
                  target="_blank"
                  removeUnderline
                >
                  App Bridge
                </Link>
                .
              </Text>
              <Text as="p" variant="bodyMd">
                To create your own page and have it show up in the app
                navigation, add a page inside <Code>app/routes</Code>, and a
                link to it in the <Code>&lt;ui-nav-menu&gt;</Code> component
                found in <Code>app/routes/app.jsx</Code>.
              </Text>
            </BlockStack>
          </Card>
        </Layout.Section>
        <Layout.Section>
          <Card>
            <BlockStack gap="300">
              <Text as="p" variant="bodyMd">
                The app template comes with an additional page which
                demonstrates how to create multiple pages within app navigation
                using{" "}
                <Link
                  url="https://shopify.dev/docs/apps/tools/app-bridge"
                  target="_blank"
                  removeUnderline
                >
                  App Bridge
                </Link>
                .
              </Text>
              <Text as="p" variant="bodyMd">
                To create your own page and have it show up in the app
                navigation, add a page inside <Code>app/routes</Code>, and a
                link to it in the <Code>&lt;ui-nav-menu&gt;</Code> component
                found in <Code>app/routes/app.jsx</Code>.
              </Text>
            </BlockStack>
          </Card>
        </Layout.Section>
      
      </Layout>
    </Page>
  );
}

function Code({ children }: { children: React.ReactNode }) {
  return (
    <Box
      as="span"
      padding="025"
      paddingInlineStart="100"
      paddingInlineEnd="100"
      background="bg-surface-active"
      borderWidth="025"
      borderColor="border"
      borderRadius="100"
    >
      <code>{children}</code>
    </Box>
  );
}


const SelectProducField = ({ label, onSelectProductID, selectProductId }: {
  label: string;
  onSelectProductID: Function;
  selectProductId: any;
}) => {
  const shopify = useAppBridge();
  const [productName, setProductName] = useState<string>('');

  return <TextField prefix={<Button onClick={async () => {
    const  productPicker = await shopify.resourcePicker({ type: 'product',selectionIds: selectProductId ? [selectProductId] : [] })
    console.log("productPicker productPicker", productPicker?.[0].id);    
    if(productPicker && productPicker?.[0].id) {
      onSelectProductID(productPicker?.[0].id)
      setProductName(productPicker?.[0].title)
    }

  } }>Select</Button>} label={label} autoComplete="off" value={productName} />
  
}