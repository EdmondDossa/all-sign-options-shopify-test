import { LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData, useNavigate } from "@remix-run/react";
import {
  Banner,
  BlockStack,
  Box,
  ExceptionList,
  Grid,
  Link,
  List,
  Page,
  Text,
} from "@shopify/polaris";
import { LinksConfirmBtn } from "~/components/buttons/LinksConfirmBtn";
import ConceptSharingIcon from "~/components/icons/ConceptSharingIcon";
import ConfigurationBlackIcon from "~/components/icons/ConfigurationBlackIcon";

import SupportAgentIcon from "~/components/icons/SupportAgentIcon";
import { SpacingBackground } from "~/components/layouts/SpacingBackground";
import { ShopifyShopService } from "~/models/ShopifyShop.service";
import { authenticate } from "~/shopify.server";
import {
  AlertCircleIcon
} from '@shopify/polaris-icons';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { session, admin } = await authenticate.admin(request);
  let templateUrl = "";
  let configurationUrl = "";
  try {
    const shop = await ShopifyShopService.getShop(admin, session);
    
    templateUrl = `https://${shop.myshopify_domain}/admin/themes/current/editor?template=${"product"}&addAppBlockId=${process.env.SHOPIFY_ALL_SIGNS_OPTIONS_FRONTEND_ID}/${"all-signs-option-template"}&target=newAppsSection`;
      configurationUrl = `https://${shop.myshopify_domain}/admin/themes/current/editor?template=${"product"}&addAppBlockId=${process.env.SHOPIFY_ALL_SIGNS_OPTIONS_FRONTEND_ID}/${"all-signs-options"}&target=newAppsSection`;
  } catch (error) {
    console.log('error getting shop  domain', error )
  }

  return json({
    templateUrl,
    configurationUrl,
  });
};

export default function Index() {
  const { templateUrl, configurationUrl } = useLoaderData<typeof loader>();
  const navigate = useNavigate();

  return (
    <Page fullWidth>
      <Box width="100%" minHeight="100%" padding="300">

        {templateUrl && configurationUrl && <Box paddingBlock="300">
          <Grid>
            
            <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
            <Banner>
                Click
              <LinksConfirmBtn
                  url={configurationUrl}
                  modalTitle="Configuration Design Screen Block"
                  title={"here to install configuration screen"}>
                 
                      <ExceptionList
                        
                        items={[
                          {
                            icon: AlertCircleIcon,
                            status: "warning",
                            description:
                              `Note that in the online store, the configuration design screen is still disabled
                              if it doesn't have any product assigned to it, either by default or dynamically,
                               such as on the product detail page.
                              
                              `,
                          
                          },
                        ]}
                   />
               
                    <Text as="h6" variant="bodyMd" fontWeight="bold">
                      Block Embed Instructions In Theme Editor
                    </Text>
                      <List type="bullet">
                        <List.Item>Select a product assigned to a configuration in the block settings. </List.Item>
                        <List.Item>Save the theme edition</List.Item>
                      </List>
                </LinksConfirmBtn> {" "}
             in your online store
          
          </Banner>
            </Grid.Cell>
            <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
            <Banner>
            Click{" "}

            {" "} <LinksConfirmBtn
                  url={templateUrl}
                  modalTitle="Templates List Block"
                  title={"here to add template screen"}>
                    <ExceptionList
                        
                        items={[
                          {
                            icon: AlertCircleIcon,
                            status:"critical",
                            description:
                              `Only  available for premium subscriptions.
                              `,
                          
                          },
                        ]}
                   />
               <ExceptionList
                        
                        items={[
                          {
                            icon: AlertCircleIcon,
                            status:"warning",
                            description:
                              `Note that in the online store, this block will show all available templates
                              but if it doesn't have any template, it will be empty.
                              `,
                          
                          },
                        ]}
                   />
               
                    <Text as="h6" variant="bodyMd" fontWeight="bold">
                    Block Embed Instructions In Theme Editor
                    </Text>
                      <List type="bullet">
                        <List.Item>Select the page that contains the design configuration screen  block on the block setting.</List.Item>
                        <List.Item>Save the theme edition</List.Item>
                      </List>
                </LinksConfirmBtn> {" "}
            to your online store
          </Banner>
              </Grid.Cell>
        </Grid>

        </Box>
}
        <SpacingBackground backgroundColor="#FFFFFF">
          <BlockStack gap="300">
            <div className="aso-card-welcome">
              <Grid>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
                  <Box padding="400" width="97%">
                    <BlockStack gap="400">
                      <Text as="span" fontWeight="semibold" variant="bodyLg">
                        Welcome to ASO configurator
                      </Text>
                      <Text as="h2" fontWeight="bold" variant="headingXl">
                        All Signs Options
                      </Text>

                      <Text as="p" variant="bodyMd">
                        Thank you for installing the ASO configurator 
                        ! Everything in ASO is streamlined to make
                        your custom sign selling experience as simple and
                        intuitive as possible for you and your customers. We
                        hope you'll turn it into a powerful marketing asset that
                        brings customers to your digital doorstep.
                      </Text>
                      <button
                        onClick={() => navigate("/app/configuration")}
                        className="aso-welcome-btn"
                      >
                        Create configuration, Get started
                      </button>
                    </BlockStack>
                  </Box>
                </Grid.Cell>

                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
                  <img src="/aso_welcom.png" className="aso-welcome-img" />
                </Grid.Cell>
              </Grid>
            </div>
            <Box paddingInline="600" paddingBlock="400">
              <Text as="span" fontWeight="bold" variant="headingLg">
                {" "}
                What may be interested in{" "}
              </Text>
            </Box>

            <Box paddingInline="600" paddingBlock="400">
              <Grid>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 4, xl: 4 }}>
                  <WelcomeCard
                    icon={<SupportAgentIcon />}
                    title="Get Support"
                    description="Start the conversation from our site via the chat button and we'll get back to you"
                    background="linear-gradient(175deg, #229d6e 46%, #133e2e 95%)"
                  />
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 4, xl: 4 }}>
                  <WelcomeCard
                    icon={<ConceptSharingIcon />}
                    title="Knowledgebase"
                    description="Cut your learning curve and get started with ASO in no time!"
                    background="linear-gradient(175deg, #9d7b22 46%, #2f361d 95%)"
                  />
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 4, xl: 4 }}>
                  <WelcomeCard
                    onClik={() => navigate("/app/configuration")}
                    icon={<ConfigurationBlackIcon />}
                    title="Suggest a Feature"
                    description="We're always working to improve ASO, so we'd love to hear how       we can do better"
                    background="linear-gradient(175deg, #a871ec 46%, #33344c 95%)"
                  />
                </Grid.Cell>
              </Grid>
            </Box>
          </BlockStack>
        </SpacingBackground>
      </Box>
    </Page>
  );
}

const WelcomeCard = ({
  title,
  description,
  icon,
  onClik,
  background,
}: {
  title: string;
  description?: string;
  icon?: any;
  onClik?: any;
  background: string;
}) => {
  return (
    <div
      className="aso-welcome-card"
      style={{ background: background }}
      onClick={() => {
        onClik && onClik();
      }}
    >
      <div className="aso-welcome-icon">{icon || ""}</div>
      <div>
        <Text as="span" fontWeight="bold" variant="bodyMd">
          {title}{" "}
        </Text>
        <Text as="p" variant="bodySm">
          {description || ""}{" "}
        </Text>
      </div>
    </div>
  );
};
