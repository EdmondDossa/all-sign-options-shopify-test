import { NavLink, Outlet, useLocation, useNavigate, useOutletContext } from "@remix-run/react";
import { useMemo, useState } from "react";
import { Badge, Box, Card, Icon, InlineStack, Text, TextField } from "@shopify/polaris";
import {
  ArrowLeftIcon,
  CashDollarIcon,
  ColorIcon,
  MeasurementSizeIcon,
  PlusCircleIcon,
  ProductIcon,
  SettingsIcon,
  StarFilledIcon,
  TextFontIcon,
  ViewIcon,
} from "@shopify/polaris-icons";
import {
  SIMPLIFIED_BUILDER_GROUPS,
  type SimplifiedBuilderSectionKey,
} from "~/utils/simplified-builder";

type ConfigurationOutletContext = {
  configuration: any;
  materials: any[];
};

const normalizePath = (value: string) => value.split("?")[0];

const sectionIconByKey: Record<SimplifiedBuilderSectionKey, any> = {
  sizes: MeasurementSizeIcon,
  pricing: CashDollarIcon,
  fonts: TextFontIcon,
  colors: ColorIcon,
  materials: ProductIcon,
  "fixing-methods": StarFilledIcon,
  shapes: ProductIcon,
  borders: ColorIcon,
  "additional-inputs": PlusCircleIcon,
  general: SettingsIcon,
  "language-images": TextFontIcon,
  "theme-color": ColorIcon,
  "sort-options": MeasurementSizeIcon,
};

export default function SimplifiedClassicBuilderLayout() {
  const { configuration } = useOutletContext<ConfigurationOutletContext>();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchMenu, setSearchMenu] = useState("");

  const configId = String(configuration?.id || "");
  const search = location.search || "";
  const currentPath = location.pathname;

  const handlePreview = () => {
    const previewConfigId = parseInt(configId, 10);
    if (Number.isNaN(previewConfigId)) return;
    const returnTo = encodeURIComponent(`${location.pathname}${location.search}`);
    navigate(`/app/configuration/${previewConfigId}/preview?returnTo=${returnTo}`);
  };

  const materialType = String(configuration?.materialType || "").trim();
  const pricingMode = String(configuration?.pricingMode || "").trim();

  const groups = useMemo(() => {
    return SIMPLIFIED_BUILDER_GROUPS.map((group) => ({
      ...group,
      items: group.items.map((item) => ({
        ...item,
        path: `/app/configuration/${configId}/builder/${item.key}${search}`,
        icon: sectionIconByKey[item.key],
      })),
    }));
  }, [configId, search]);

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
      <div style={{ width: 240, position: "sticky", top: 12 }}>
        <Card>
          <Box padding="250">
            <InlineStack align="space-between" blockAlign="center">
              <NavLink to={`/app/configuration${search}`} style={sidebarActionButtonStyle}>
                <Icon source={ArrowLeftIcon} tone="subdued" />
              </NavLink>
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
                {String(configuration?.name || "Configuration")}
              </Text>
            </Box>

            <Box paddingBlockStart="050">
              <InlineStack gap="100">
                <Badge>ID: {configuration?.id}</Badge>
                {materialType ? <Badge>{materialType}</Badge> : null}
                {pricingMode ? <Badge tone="info">{pricingMode}</Badge> : null}
              </InlineStack>
            </Box>

            <Box paddingBlockStart="200">
              <Text as="h3" variant="headingSm">
                Builder Menu
              </Text>
            </Box>

            <Box paddingBlockStart="100">
              <TextField
                label="Search builder items"
                labelHidden
                autoComplete="off"
                value={searchMenu}
                onChange={setSearchMenu}
                placeholder="Search builder items..."
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
                                  gap: "12px",
                                  padding: "10px 12px",
                                  borderRadius: "10px",
                                  background: active ? "#eef2ff" : "transparent",
                                  border: active ? "1px solid #c7d2fe" : "1px solid transparent",
                                  color: "#111827",
                                }}
                              >
                                <InlineStack gap="200" blockAlign="center" wrap={false}>
                                  <Icon source={item.icon} tone={active ? "base" : "subdued"} />
                                  <Text as="span" variant="bodyMd" fontWeight={active ? "semibold" : "regular"}>
                                    {item.label}
                                  </Text>
                                </InlineStack>
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

      <div style={{ flex: 1, minWidth: 0, paddingBottom: 24 }}>
        <Outlet context={{ configuration }} />
      </div>
    </div>
  );
}
