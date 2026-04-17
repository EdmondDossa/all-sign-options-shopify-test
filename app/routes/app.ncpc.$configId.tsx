import { json, redirect } from "@remix-run/node";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { NavLink, Outlet, useLoaderData, useLocation, useNavigate } from "@remix-run/react";
import { useEffect, useMemo, useState } from "react";
import { Badge, Box, Card, Icon, InlineStack, Text, TextField } from "@shopify/polaris";
import {
  MeasurementSizeIcon,
  CashDollarIcon,
  TextFontIcon,
  ColorIcon,
  StarFilledIcon,
  ProductIcon,
  ImageIcon,
  PlusCircleIcon,
  SettingsIcon,
  ArrowLeftIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  ViewIcon,
} from "@shopify/polaris-icons";
import NcpcConfigurationService from "~/models/NcpcConfiguration.service";
import { authenticate } from "~/shopify.server";
import { getPlan } from "~/utils/pricing-server.server";
import type { NcpcRouteContext } from "~/types/NcpcRouteContext";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const { session, admin, billing } = await authenticate.admin(request);
  const configId = parseInt(params.configId || "", 10);
  if (Number.isNaN(configId)) {
    throw redirect("/app/configuration");
  }

  const context = await NcpcConfigurationService.getContext(configId, session.id);
  if (!context) {
    throw redirect("/app/configuration");
  }

  const plan = await getPlan(billing, session?.shop, admin);

  return json<NcpcRouteContext>({
    configuration: context.configuration,
    productType: context.productType,
    plan,
    ncpcData: context.ncpcData,
  });
};

type SidebarItem = {
  label: string;
  path: string;
  icon: any;
  badge?: string;
};

type SidebarGroup = {
  title: string;
  items: SidebarItem[];
};

const normalizePath = (value: string) => value.split("?")[0];

export default function NcpcConfigurationLayout() {
  const context = useLoaderData<typeof loader>();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchMenu, setSearchMenu] = useState("");

  const configId = String(context.configuration?.id || "");
  const search = location.search || "";
  const currentPath = location.pathname;

  const handlePreview = () => {
    const previewConfigId = parseInt(configId, 10);
    if (Number.isNaN(previewConfigId)) return;
    const returnTo = encodeURIComponent(`${location.pathname}${location.search}`);
    navigate(`/app/configuration/${previewConfigId}/preview?returnTo=${returnTo}`);
  };

  const backboardColorsCount = useMemo(() => {
    const nested =
      (context.ncpcData as any)?.additionalOptions?.backboardColorsOptions?.backboardColors;
    const legacy = (context.ncpcData as any)?.additionalOptions?.backboardColorOptions;
    if (Array.isArray(nested)) return nested.length;
    if (Array.isArray(legacy)) return legacy.length;
    return 0;
  }, [context.ncpcData]);

  const groups = useMemo<SidebarGroup[]>(() => {
    const coreSetup: SidebarItem[] = [
      {
        label: "Sizes",
        path: `/app/ncpc/${configId}/required-options/sizes${search}`,
        icon: MeasurementSizeIcon,
      },
      {
        label: "Pricing",
        path: `/app/ncpc/${configId}/required-options/pricings${search}`,
        icon: CashDollarIcon,
      },
      {
        label: "Fonts",
        path: `/app/ncpc/${configId}/required-options/fonts${search}`,
        icon: TextFontIcon,
      },
      ...(context.productType === "neon"
        ? [
            {
              label: "Colors",
              path: `/app/ncpc/${configId}/required-options/colors${search}`,
              icon: ColorIcon,
            },
          ]
        : [
            {
              label: "Letter Types",
              path: `/app/ncpc/${configId}/required-options/letter-types${search}`,
              icon: ProductIcon,
            },
          ]),
    ];

    const signExtras: SidebarItem[] = [
      ...(context.productType === "neon"
        ? [
            {
              label: "Materials",
              path: `/app/ncpc/${configId}/additional-options/materials${search}`,
              icon: ProductIcon,
            },
            {
              label: "Jackets",
              path: `/app/ncpc/${configId}/additional-options/jackets${search}`,
              icon: StarFilledIcon,
            },
          ]
        : []),
      {
        label: "Backboards",
        path: `/app/ncpc/${configId}/additional-options/backboards${search}`,
        icon: ImageIcon,
      },
      {
        label: "Backboard Colors",
        path: `/app/ncpc/${configId}/additional-options/backboards-colors${search}`,
        icon: ColorIcon,
        badge: backboardColorsCount > 0 ? String(backboardColorsCount) : undefined,
      },
      {
        label: "Mountings",
        path: `/app/ncpc/${configId}/additional-options/mountings${search}`,
        icon: PlusCircleIcon,
      },
      {
        label: "Additional Input Options",
        path: `/app/ncpc/${configId}/additional-options/custom-additionals-options${search}`,
        icon: PlusCircleIcon,
      },
    ];

    const settings: SidebarItem[] = [
      {
        label: "Generals",
        path: `/app/ncpc/${configId}/settings/generals${search}`,
        icon: SettingsIcon,
      },
      {
        label: "Language & Image",
        path: `/app/ncpc/${configId}/settings/language-text${search}`,
        icon: TextFontIcon,
      },
      {
        label: "Infos",
        path: `/app/ncpc/${configId}/settings/infos${search}`,
        icon: SettingsIcon,
      },
      {
        label: "Theme & Color",
        path: `/app/ncpc/${configId}/settings/theme-color${search}`,
        icon: ColorIcon,
      },
      {
        label: "Sort Options",
        path: `/app/ncpc/${configId}/settings/sort-options${search}`,
        icon: MeasurementSizeIcon,
      },
    ];

    return [
      { title: "Core Setup", items: coreSetup },
      { title: "Sign Extras", items: signExtras },
      { title: "Settings", items: settings },
    ];
  }, [configId, context.productType, search, backboardColorsCount]);

  const filteredGroups = useMemo(() => {
    const term = searchMenu.trim().toLowerCase();
    if (!term) return groups;

    return groups
      .map((group) => ({
        ...group,
        items: group.items.filter((item) => item.label.toLowerCase().includes(term)),
      }))
      .filter((group) => group.items.length > 0);
  }, [groups, searchMenu]);

  const isItemActive = (path: string) => {
    const basePath = normalizePath(path);
    return currentPath === basePath || currentPath.startsWith(`${basePath}/`);
  };

  const activeGroupTitle = useMemo(() => {
    const activeGroup = groups.find((group) =>
      group.items.some((item) => {
        const basePath = normalizePath(item.path);
        return currentPath === basePath || currentPath.startsWith(`${basePath}/`);
      }),
    );

    return activeGroup?.title || "";
  }, [groups, currentPath]);

  const [expandedGroup, setExpandedGroup] = useState(activeGroupTitle);

  useEffect(() => {
    setExpandedGroup(activeGroupTitle);
  }, [activeGroupTitle]);

  const sidebarActionButtonStyle = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    width: 30,
    height: 30,
    borderRadius: 8,
    border: "1px solid #d1d5db",
    background: "#fff",
    color: "#111827",
    textDecoration: "none",
  } as const;

  return (
    <div
      style={{
        display: "flex",
        gap: "32px",
        alignItems: "flex-start",
        padding: "12px 16px 0 16px",
        maxWidth: "1600px",
        margin: "0 auto",
      }}
    >
      <div
        style={{
          width: 240,
          position: "sticky",
          top: 12,
          maxHeight: "calc(100vh - 24px)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <Card>
          <Box padding="250">
            <InlineStack align="space-between" blockAlign="center">
              <InlineStack align="start" blockAlign="center" gap="100">
                <NavLink
                  to={`/app/configuration${search}`}
                  style={sidebarActionButtonStyle}
                >
                  <Icon source={ArrowLeftIcon} tone="subdued" />
                </NavLink>
              </InlineStack>
              <button
                type="button"
                aria-label="Preview configuration"
                onClick={handlePreview}
                style={sidebarActionButtonStyle}
              >
                <Icon source={ViewIcon} tone="subdued" />
              </button>
            </InlineStack>
            <Box paddingBlockStart="150">
              <Text as="h2" variant="headingLg">
                {String(context.configuration?.name || "Customiser")}
              </Text>
            </Box>
            <Box paddingBlockStart="050">
              <InlineStack gap="100">
                <Badge>ID: {context.configuration?.id}</Badge>
                <Badge>{(context.configuration as any)?.pricingMode || "-"}</Badge>
                <Badge>{context.productType}</Badge>
              </InlineStack>
            </Box>
            <Box paddingBlockStart="200">
              <Text as="h3" variant="headingSm">
                Customiser Menu
              </Text>
            </Box>
            <Box paddingBlockStart="100">
              <TextField
                label="Search menu items"
                labelHidden
                autoComplete="off"
                value={searchMenu}
                onChange={setSearchMenu}
                placeholder="Search menu items..."
              />
            </Box>
          </Box>
        </Card>

        <Box
          paddingBlockStart="200"
          className="aso-scrollbar-hidden"
          style={{
            flex: 1,
            minHeight: 0,
            overflowY: "auto",
            overscrollBehavior: "contain",
            paddingRight: 4,
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <Card>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                background: "#ffffff",
                borderRadius: "12px",
              }}
            >
              {filteredGroups.map((group) => {
                const groupIsActive = activeGroupTitle === group.title;
                const groupIsExpanded =
                  searchMenu.trim().length > 0 || expandedGroup === group.title;

                return (
                  <Box key={group.title} padding="250">
                    <button
                      type="button"
                      onClick={() =>
                        setExpandedGroup((current) =>
                          current === group.title ? "" : group.title,
                        )
                      }
                      style={{
                        width: "100%",
                        display: "grid",
                        gridTemplateColumns: "minmax(0, 1fr) 20px",
                        alignItems: "center",
                        gap: 12,
                        background:
                          groupIsExpanded || groupIsActive ? "#f3f4f6" : "#ffffff",
                        border:
                          groupIsExpanded || groupIsActive
                            ? "1px solid #d1d5db"
                            : "1px solid transparent",
                        borderRadius: "10px",
                        padding: "8px 10px",
                        boxSizing: "border-box",
                        cursor: "pointer",
                        textAlign: "left",
                      }}
                    >
                      <div style={{ minWidth: 0 }}>
                        <Text
                          as="span"
                          variant="bodyMd"
                          fontWeight={
                            groupIsExpanded || groupIsActive ? "semibold" : "medium"
                          }
                          tone="subdued"
                        >
                          {group.title}
                        </Text>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Icon
                          source={groupIsExpanded ? ChevronDownIcon : ChevronRightIcon}
                          tone="subdued"
                        />
                      </div>
                    </button>

                    {groupIsExpanded ? (
                      <Box paddingBlockStart="150">
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "4px",
                            marginLeft: "12px",
                            paddingLeft: "10px",
                            borderLeft: "1px solid #e5e7eb",
                          }}
                        >
                          {group.items.map((item) => (
                            <NavLink
                              key={item.path}
                              to={item.path}
                              style={{ textDecoration: "none" }}
                            >
                              {({ isActive }) => {
                                const active = isActive || isItemActive(item.path);
                                return (
                                  <div
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "space-between",
                                      gap: "12px",
                                      padding: "10px 12px",
                                      borderRadius: "10px",
                                      background: active ? "#eef2ff" : "transparent",
                                      border: active
                                        ? "1px solid #c7d2fe"
                                        : "1px solid transparent",
                                      color: "#111827",
                                    }}
                                  >
                                    <InlineStack gap="200" blockAlign="center" wrap={false}>
                                      <Icon
                                        source={item.icon}
                                        tone={active ? "base" : "subdued"}
                                      />
                                      <Text
                                        as="span"
                                        variant="bodyMd"
                                        fontWeight={active ? "semibold" : "regular"}
                                      >
                                        {item.label}
                                      </Text>
                                    </InlineStack>
                                    {item.badge ? <Badge tone="info">{item.badge}</Badge> : null}
                                  </div>
                                );
                              }}
                            </NavLink>
                          ))}
                        </div>
                      </Box>
                    ) : null}
                  </Box>
                );
              })}
            </div>
          </Card>
        </Box>
      </div>

      <div
        style={{
          flex: 1,
          minWidth: 0,
          padding: "8px 16px 0 4px",
        }}
      >
        <Outlet context={context} />
      </div>
    </div>
  );
}
