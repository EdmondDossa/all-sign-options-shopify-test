import { LoaderFunctionArgs, json } from "@remix-run/node";
import { NavLink, useLoaderData, useNavigate } from "@remix-run/react";
import {
  Badge,
  Banner,
  BlockStack,
  Box,
  Button,
  ButtonGroup,
  CalloutCard,
  Card,
  Divider,
  ExceptionList,
  Grid,
  Icon,
  InlineStack,
  Layout,
  Link,
  List,
  Page,
  PageActions,
  Text,
  Thumbnail,
} from "@shopify/polaris";
import {
  StoreIcon,
  ExternalIcon,
  ChartHistogramFirstLastIcon,
  PhoneIcon,
  PlanIcon,
  ChatIcon,
  EmailIcon,
  NoteIcon,
  ChevronRightIcon,
  SettingsIcon,
  LayoutRows2Icon,
  ThumbsDownIcon,
  ThumbsUpIcon,
  BillIcon,
  ViewIcon,
} from "@shopify/polaris-icons";

import { LinksConfirmBtn } from "~/components/buttons/LinksConfirmBtn";
import ConceptSharingIcon from "~/components/icons/ConceptSharingIcon";
import ConfigurationBlackIcon from "~/components/icons/ConfigurationBlackIcon";

import SupportAgentIcon from "~/components/icons/SupportAgentIcon";
import { SpacingBackground } from "~/components/layouts/SpacingBackground";
import { ShopifyShopService } from "~/models/ShopifyShop.service.server";
import { authenticate } from "~/shopify.server";
import { AlertCircleIcon } from "@shopify/polaris-icons";
import ConfigurationService from "~/models/Configuration.service";
import { ConfigurationType } from "~/types/ConfigurationType";
import { Crisp } from "crisp-sdk-web";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { session, admin } = await authenticate.admin(request);
  let templateUrl = "";
  let configurationUrl = "";
  let configurations;
  try {
    const shop = await ShopifyShopService.getShop(admin);

    templateUrl = `https://${shop.myshopifyDomain}/admin/themes/current/editor?template=${"product"}&addAppBlockId=${process.env.SHOPIFY_ALL_SIGNS_OPTIONS_FRONTEND_ID}/${"all-signs-option-template"}&target=newAppsSection`;
    configurationUrl = `https://${shop.myshopifyDomain}/admin/themes/current/editor?template=${"product"}&addAppBlockId=${process.env.SHOPIFY_ALL_SIGNS_OPTIONS_FRONTEND_ID}/${"all-signs-options"}&target=newAppsSection`;

    configurations = await ConfigurationService.getConfigurations(session.id);
    // console.log("log log", LATEST_API_VERSION);
  } catch (error) {
    console.log("error getting shop  domain", error);
  }

  return json({
    templateUrl,
    configurationUrl,
    configurations,
  });
};

export default function Index() {
  const { templateUrl, configurationUrl, configurations } =
    useLoaderData<typeof loader>();
  const navigate = useNavigate();

  // let lastconfigs = [
  //   { id: 7420, name: 'Neon Sign Customiser', status: 'Now', type: 'simple' },
  //   { id: 7406, name: 'Wood Sign Customiser', status: 'New', type: 'advance' },
  //   { id: 6583, name: 'Acrylic Sign Customiser', status: 'Acrylic', type: 'layers' }
  // ];

  let lastconfigs = [];

  function getLastThree(
    arr: Array<ConfigurationType | any | null | undefined>,
  ) {
    return arr.slice(-3);
  }
  lastconfigs = getLastThree(configurations ?? []);
  console.log(configurations, "77777", lastconfigs);

  const handleMaterials = (id: number) => {
    navigate(`configuration/${id}/materials`);
  };

  const updates = [
    {
      date: "05/07/2025",
      title: "Enhanced Order and Manufacturer Email Templates",
    },
    {
      date: "18/06/2025",
      title: "Improved Fixed Height Strategy for Simple Model",
    },
    { date: "29/04/2025", title: "Oval Lightbox Support" },
  ];

  const usefulLinks = [
    { title: "Browse Demos", icon: ViewIcon, url: "https://all-signs-options.myshopify.com/password" },
    { title: "Learning Center", icon: PhoneIcon, url: "https://docs.signsdesigner.us/docs/aso-wp-documentation/" },
    // { title: 'Manufacturers', icon: StoreIcon },
    { title: "Pricing", icon: BillIcon, url: "/pricing" },
    // { title: "Share Feedback", icon: ChatIcon, url: "" },
    { title: "Get in touch", icon: EmailIcon, url: "" },
  ];

  return (
    <Page fullWidth>
      <PageActions
        primaryAction={{
          content: "Create configuration",
          onAction: () => {
            navigate("/app/configuration/create");
          },
        }}
      />
      <Layout>
        {/* Header avec métriques */}
        <Layout.Section>
          <Card>
            <Box padding="400">
              <Box>
                <InlineStack gap="800">
                  <Box>
                    <Text as="h2" variant="heading2xl">
                      0
                    </Text>
                    <Text as="p">Products Created</Text>
                  </Box>
                  <Box>
                    <Text as="h2" variant="heading2xl">
                      0%
                    </Text>
                    <Text as="p">Conversion Rate</Text>
                  </Box>
                  <Box>
                    <Text as="h2" variant="heading2xl">
                      0
                    </Text>
                    <Text as="p">Orders</Text>
                  </Box>
                </InlineStack>
              </Box>
            </Box>
          </Card>

          <Box width="100%" paddingBlockStart="300">
            <BlockStack gap="300">
              {/* Main Menu */}
              <div
                style={{
                  backgroundColor: "rgba(1, 100, 100, 0.15)",
                  padding: "10px",
                  borderRadius: "12px",
                  borderWidth: "2px",
                }}
              >
                <Box padding="300">
                  <Box width="fit-content">
                    <InlineStack gap="200" align="start" blockAlign="center">
                      <Icon source={StoreIcon} />
                      <Text as="h2" variant="headingMd">
                        Main Menu
                      </Text>
                    </InlineStack>
                  </Box>

                  <Box paddingBlockStart="400">
                    <Box>
                      <div
                        style={{
                          cursor: "pointer",
                          width: "100%",
                          padding: "10px",
                        }}
                        onClick={() => navigate("configuration")}
                      >
                        <InlineStack
                          as="div"
                          align="space-between"
                          blockAlign="center"
                          gap="300"
                        >
                          <InlineStack gap="200">
                            <Thumbnail
                              source={NoteIcon}
                              size="medium"
                              alt="Small document"
                            />
                            <Box>
                              <Text as="h4" variant="headingSm">
                                Configurations
                              </Text>
                              <Text as="p">
                                Manage your sign cuonfigurationss
                              </Text>
                            </Box>
                          </InlineStack>

                          <Box width="fit-content">
                            <Icon source={ChevronRightIcon} />
                          </Box>
                        </InlineStack>
                      </div>

                      <Divider />

                      <div
                        style={{
                          cursor: "pointer",
                          width: "100%",
                          padding: "10px",
                        }}
                        onClick={() => navigate("templates")}
                      >
                        <InlineStack
                          as="div"
                          align="space-between"
                          blockAlign="center"
                          gap="300"
                        >
                          <InlineStack gap="200">
                            <Thumbnail
                              source={NoteIcon}
                              size="medium"
                              alt="Small document"
                            />
                            <Box>
                              <Text as="h4" variant="headingSm">
                                Templates
                              </Text>
                              <Text as="p">Manage your sign templates</Text>
                            </Box>
                          </InlineStack>

                          <Box width="fit-content">
                            <Icon source={ChevronRightIcon} />
                          </Box>
                        </InlineStack>
                      </div>

                      <Divider />

                      <div
                        style={{
                          cursor: "pointer",
                          width: "100%",
                          padding: "10px",
                        }}
                        onClick={() => navigate("settings")}
                      >
                        <InlineStack
                          as="div"
                          align="space-between"
                          blockAlign="center"
                          gap="300"
                        >
                          <InlineStack gap="200">
                            <Thumbnail
                              source={SettingsIcon}
                              size="medium"
                              alt="Small document"
                            />
                            <Box>
                              <Text as="h4" variant="headingSm">
                                Global Settings
                              </Text>
                              <Text as="p">
                                Manage your sign global setting
                              </Text>
                            </Box>
                          </InlineStack>

                          <Box width="fit-content">
                            <Icon source={ChevronRightIcon} />
                          </Box>
                        </InlineStack>
                      </div>

                      <Divider />

                      <div
                        style={{
                          cursor: "pointer",
                          width: "100%",
                          padding: "10px",
                        }}
                        onClick={() => navigate("manage-font")}
                      >
                        <InlineStack
                          as="div"
                          align="space-between"
                          blockAlign="center"
                          gap="300"
                        >
                          <InlineStack gap="200">
                            <Thumbnail
                              source={LayoutRows2Icon}
                              size="medium"
                              alt="Small document"
                            />
                            <Box>
                              <Text as="h4" variant="headingSm">
                                Library
                              </Text>
                              <Text as="p">Manage your sign library</Text>
                            </Box>
                          </InlineStack>

                          <Box width="fit-content">
                            <Icon source={ChevronRightIcon} />
                          </Box>
                        </InlineStack>
                      </div>
                    </Box>
                  </Box>
                </Box>
              </div>

              {/* Help center*/}
              <Card>
                <Box padding="400">
                  <Box width="fit-content">
                    <InlineStack gap="200" align="start" blockAlign="center">
                      <Icon source={ExternalIcon} />
                      <Text as="h3" variant="headingMd">
                        Learning center
                      </Text>
                    </InlineStack>
                  </Box>

                  <Box paddingBlockStart="400">
                    <InlineStack gap="200">
                      <Card>
                        <div style={{ padding: "5px" }}>
                          <BlockStack gap="100">
                            <Text as="h3" variant="headingSm">
                              Browse demo
                            </Text>
                            <Text as="p">
                              Explore live examples of sign lastconfigs in
                              action.
                            </Text>
                          </BlockStack>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <Button onClick={() => window.open("https://all-signs-options.myshopify.com/password", "_blank")}>View demos</Button>
                        <span style={{ fontSize: "14px", color: "#555" }}>
                          The password to access to demo is: <strong>aso</strong>
                        </span>
                      </div>
                      </Card>

                      <Card>
                        <div style={{ padding: "5px" }}>
                          <BlockStack gap="100">
                            <Text as="h3" variant="headingSm">
                              Documentation
                            </Text>
                            <Text as="p">
                              Explore the app documentation
                            </Text>
                          </BlockStack>
                        </div>
                        <Button onClick={() => window.open("https://docs.signsdesigner.us/docs/aso-wp-documentation/", "_blank")}>View docs</Button>
                      </Card>
                    </InlineStack>
                  </Box>
                </Box>
              </Card>

              {/* Recent Updates */}
              {/* <div
                style={{
                  backgroundColor: "rgba(212, 99, 15, 0.15)",
                  padding: "10px",
                  borderRadius: "12px",
                  borderWidth: "2px",
                }}
              >
                <Box padding="400">
                  <Text as="h3" variant="headingMd">
                    Recent Updates
                  </Text>

                  <Box paddingBlockStart="400">
                    <BlockStack gap="300">
                      {updates.map((update, index) => (
                        <Box key={index}>
                          <InlineStack
                            gap="400"
                            align="start"
                            blockAlign="center"
                          >
                            <Box>
                              <Badge tone="warning">{update.date}</Badge>
                            </Box>
                            <Box>
                              <Text as="p">{update.title}</Text>
                            </Box>
                            <Button size="micro">Learn more</Button>
                          </InlineStack>
                        </Box>
                      ))}
                    </BlockStack>
                  </Box>
                </Box>
              </div> */}
            </BlockStack>
          </Box>
        </Layout.Section>

        <Layout.Section variant="oneThird">
          <InlineStack gap="400" align="start">
            {/* Colonne droite */}
            <Box width="100%">
              <BlockStack gap="400">
                {/* Recent LastConfigs */}
                <Card>
                  <Box padding="400">
                    <Text as="h3" variant="headingMd">
                      Recent Configurations
                    </Text>

                    <Box paddingBlockStart="400">
                      <BlockStack gap="300">
                        {lastconfigs.map((customiser, index) => (
                          <div
                            key={index}
                            onClick={() => handleMaterials(customiser.id)}
                          >
                            <div
                              style={{
                                display: "flex",
                                gap: "5px",
                                justifyContent: "space-between",
                                alignItems: "center",
                                cursor: "pointer",
                              }}
                            >
                              <Box>
                                <Text as="p" variant="bodySm">
                                  ID {customiser.id}
                                </Text>
                                <Text as="h4" variant="headingSm">
                                  {customiser.name}
                                </Text>
                              </Box>
                              <Box>
                                <Badge size="small" tone="info">
                                  {/* {customiser.type} */}
                                  simple
                                </Badge>
                              </Box>
                            </div>
                          </div>
                        ))}
                      </BlockStack>
                    </Box>
                  </Box>
                </Card>

                {/* sharefeedback */}
                <Card>
                  <div style={{ padding: "5px" }}>
                    <BlockStack gap="100">
                      <Text as="h3" variant="headingSm">
                        Share your feedback
                      </Text>
                      <Text as="p">
                        How would you describe your experience using Sign
                        Customiser?
                      </Text>
                    </BlockStack>
                  </div>
                  <ButtonGroup gap="tight">
                    <Button icon={ThumbsUpIcon}>Yes</Button>
                    <Button icon={ThumbsDownIcon}>No</Button>
                  </ButtonGroup>
                </Card>

                {/* Useful Links */}
                <Card>
                  <Box padding="300">
                    <Text as="h3" variant="headingMd">
                      Useful Links
                    </Text>

                    <Box paddingBlockStart="300">
                      <BlockStack gap="200">
                        {usefulLinks.map((link, index) => (
                          <Box key={index} width="fit-content">
                            {(link.title == 'Browse Demos') && 
                              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                <Button
                                  icon={link.icon}
                                  onClick={() => window.open(`${link.url}`, "_blank")}
                                >
                                  {link.title}
                                </Button>
                                <span style={{ fontSize: "14px", color: "#555" }}>
                                  The password to access to demo is: <strong>aso</strong>
                                </span>
                              </div>
                            }
                            {link.title == 'Learning Center' && (
                              <Button
                                icon={link.icon}
                                onClick={() => window.open(`${link.url}`, "_blank")}
                              >
                                {link.title}
                              </Button>
                            )}
                            {link.title == 'Pricing' && 
                              <Button icon={link.icon} onClick={() => navigate("/app/pricing")}>
                                {link.title}
                              </Button>
                            }
                            {link.title == 'Get in touch' && 
                              <Button onClick={() => Crisp.chat.open()} icon={link.icon}>
                                {link.title}
                              </Button>
                            }
                          </Box>
                        ))}
                      </BlockStack>
                    </Box>
                  </Box>
                </Card>
              </BlockStack>
            </Box>
          </InlineStack>
        </Layout.Section>
      </Layout>
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

export const LinkButton = ({
  to = "#",
  children,
}: {
  to?: any;
  children: React.ReactNode;
}) => {
  return (
    // <NavLink className={({ isActive, isPending }) =>
    //   isActive ? "active navlink" : isPending ? "pending navlink" : "inactive navlink" }
    //   to={to}
    // >
    // </NavLink>
    <a
      style={{
        textDecoration: "none",
        color: "#1B1B1B",
      }}
      href={to}
    >
      <BlockStack gap="150">{children}</BlockStack>
    </a>
  );
};