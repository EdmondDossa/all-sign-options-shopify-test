import { json, redirect } from "@remix-run/node";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { NavLink, Outlet, useLoaderData, useLocation, useNavigate } from "@remix-run/react";
import { useMemo, useState } from "react";
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

    navigate(`/app/configuration/${previewConfigId}/preview`, {
      state: { returnTo: `${location.pathname}${location.search}` },
    });
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
      <div style={{ width: 220, position: "sticky", top: 12 }}>
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

        <Box paddingBlockStart="200">
          <Card>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                background: "#ffffff",
                borderRadius: "12px",
              }}
            >
              {filteredGroups.map((group, groupIndex) => (
                <Box
                  key={group.title}
                  padding="250"
                  borderBlockStartWidth={groupIndex === 0 ? "0" : "025"}
                  borderColor="border"
                >
                  <Text as="h3" variant="headingSm" tone="subdued">
                    {group.title}
                  </Text>

                  <Box paddingBlockStart="150">
                    <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                      {group.items.map((item) => (
                        <NavLink key={item.path} to={item.path} style={{ textDecoration: "none" }}>
                          {({ isActive }) => {
                            const active = isActive || isItemActive(item.path);
                            return (
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "space-between",
                                  gap: "8px",
                                  borderRadius: "10px",
                                  padding: "8px 10px",
                                  background: active ? "#eef2ff" : "transparent",
                                  color: active ? "#1e3a8a" : "#4b5563",
                                  border: active ? "1px solid #c7d2fe" : "1px solid transparent",
                                }}
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "10px",
                                    minWidth: 0,
                                  }}
                                >
                                  <Icon source={item.icon} tone="subdued" />
                                  <Text as="span" variant="bodyMd" truncate>
                                    {item.label}
                                  </Text>
                                </div>
                                {item.badge ? <Badge tone="info">{item.badge}</Badge> : null}
                              </div>
                            );
                          }}
                        </NavLink>
                      ))}
                    </div>
                  </Box>
                </Box>
              ))}
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
