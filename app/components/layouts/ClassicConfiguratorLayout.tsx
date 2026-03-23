import { NavLink, Outlet, useLocation, useNavigate, useOutletContext } from "@remix-run/react";
import { useEffect, useMemo, useState } from "react";
import { Badge, Box, Card, Icon, InlineStack, Text, TextField } from "@shopify/polaris";
import {
  ArrowLeftIcon,
  CashDollarIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  ColorIcon,
  MeasurementSizeIcon,
  PlusCircleIcon,
  ProductIcon,
  SettingsIcon,
  StarFilledIcon,
  TextFontIcon,
  ViewIcon,
} from "@shopify/polaris-icons";

type ConfigurationOutletContext = {
  configuration: any;
  materials: any[];
};

type LayoutItem = {
  label: string;
  path: string;
  icon: any;
  keywords?: string[];
};

type LayoutGroup = {
  title: string;
  items: LayoutItem[];
};

const normalizePath = (value: string) => value.split("?")[0];

const normalizeSearchValue = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/\s+/g, " ");

const itemMatchesSearch = (item: LayoutItem, term: string) => {
  const normalizedTerm = normalizeSearchValue(term);
  if (!normalizedTerm) return true;

  const terms = normalizedTerm.split(" ").filter(Boolean);
  const haystack = normalizeSearchValue(
    [item.label, ...(item.keywords || [])].join(" "),
  );

  return terms.every((part) => haystack.includes(part));
};

const parseConfigData = (rawData: any) => {
  if (!rawData) return null;
  if (typeof rawData === "string") {
    try {
      const parsed = JSON.parse(rawData);
      return parsed && typeof parsed === "object" ? parsed : null;
    } catch {
      return null;
    }
  }
  return typeof rawData === "object" ? rawData : null;
};

export default function ClassicConfiguratorLayout() {
  const { configuration } = useOutletContext<ConfigurationOutletContext>();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchMenu, setSearchMenu] = useState("");

  const configId = String(configuration?.id || "");
  const search = location.search || "";
  const currentPath = location.pathname;
  const configData = useMemo(() => parseConfigData(configuration?.data) || {}, [configuration?.data]);
  const hasAdvancedMaterials = useMemo(() => {
    const metaType = String(configData?.simplifiedBuilder?.meta?.materialType || "")
      .trim()
      .toLowerCase();
    if (metaType === "advance" || metaType === "advanced") return true;

    const legacyMaterials = Array.isArray(configData?.materials) ? configData.materials : [];
    return legacyMaterials.some(
      (material: any) => String(material?.type || "").trim().toLowerCase() === "advance",
    );
  }, [configData]);

  const handlePreview = () => {
    const previewConfigId = parseInt(configId, 10);
    if (Number.isNaN(previewConfigId)) return;
    const returnTo = encodeURIComponent(`${location.pathname}${location.search}`);
    navigate(`/app/configuration/${previewConfigId}/preview?returnTo=${returnTo}`);
  };

  const groups = useMemo<LayoutGroup[]>(
    () => [
      {
        title: "Core Setup",
        items: [
          {
            label: "Sizes",
            path: `/app/configuration/${configId}/required-options/sizes${search}`,
            icon: MeasurementSizeIcon,
            keywords: ["size", "sizes", "dimension", "dimensions", "custom size", "thickness"],
          },
          {
            label: "Pricing",
            path: `/app/configuration/${configId}/required-options/pricing${search}`,
            icon: CashDollarIcon,
            keywords: ["pricing", "price", "prices", "custom pricing", "shipping"],
          },
          {
            label: "Fonts",
            path: `/app/configuration/${configId}/required-options/fonts${search}`,
            icon: TextFontIcon,
            keywords: ["font", "fonts", "text", "texts", "typography", "police", "polices"],
          },
          ...(!hasAdvancedMaterials
            ? [
                {
                  label: "Colors",
                  path: `/app/configuration/${configId}/required-options/colors${search}`,
                  icon: ColorIcon,
                  keywords: ["color", "colors", "colour", "colours", "text color", "image color"],
                } satisfies LayoutItem,
              ]
            : []),
          {
            label: "Fixing Methods",
            path: `/app/configuration/${configId}/required-options/fixing-methods${search}`,
            icon: StarFilledIcon,
            keywords: ["fixing", "method", "methods", "mounting", "mountings", "installation"],
          },
          {
            label: "Shapes",
            path: `/app/configuration/${configId}/required-options/shapes${search}`,
            icon: ProductIcon,
            keywords: ["shape", "shapes", "form", "forms", "outline"],
          },
          {
            label: "Borders",
            path: `/app/configuration/${configId}/required-options/borders${search}`,
            icon: ColorIcon,
            keywords: ["border", "borders", "trim", "outline"],
          },
          {
            label: "Components",
            path: `/app/configuration/${configId}/required-options/components${search}`,
            icon: ProductIcon,
            keywords: ["component", "components", "part", "parts", "module", "modules"],
          },
        ],
      },
      {
        title: "Design Setup",
        items: [
          {
            label: "Text Setup",
            path: `/app/configuration/${configId}/design-setup/text${search}`,
            icon: TextFontIcon,
            keywords: [
              "text",
              "texts",
              "font size",
              "text options",
              "bold",
              "underline",
              "italic",
              "alignment",
              "curved",
              "opacity",
              "text colors",
            ],
          },
          {
            label: "Image Setup",
            path: `/app/configuration/${configId}/design-setup/images${search}`,
            icon: ProductIcon,
            keywords: [
              "image",
              "images",
              "upload",
              "cutline",
              "cutlines",
              "scene",
              "scenes",
              "filter",
              "background",
            ],
          },
          {
            label: "Sign Part",
            path: `/app/configuration/${configId}/design-setup/sign-part${search}`,
            icon: ProductIcon,
            keywords: ["sign part", "double part", "double sided", "double-sided", "face a", "face b"],
          },
        ],
      },
      {
        title: "Additional Options",
        items: [
          {
            label: "Materials",
            path: `/app/configuration/${configId}/additional-options/materials${search}`,
            icon: ProductIcon,
            keywords: ["material", "materials", "substrate"],
          },
          {
            label: "Cliparts",
            path: `/app/configuration/${configId}/additional-options/cliparts${search}`,
            icon: ColorIcon,
            keywords: ["clipart", "cliparts", "art", "icons", "graphics"],
          },
          {
            label: "Additional Inputs",
            path: `/app/configuration/${configId}/additional-options/additional-inputs${search}`,
            icon: PlusCircleIcon,
            keywords: ["additional", "input", "inputs", "field", "fields", "option", "options", "form"],
          },
        ],
      },
      {
        title: "Settings",
        items: [
          {
            label: "General",
            path: `/app/configuration/${configId}/settings/general${search}`,
            icon: SettingsIcon,
            keywords: ["general", "product", "output", "upload design", "quantity", "quote", "mobile"],
          },
          {
            label: "Customizer Setup",
            path: `/app/configuration/${configId}/settings/customizer-sign${search}`,
            icon: ProductIcon,
            keywords: ["customizer", "config options", "option order", "measurement", "layout"],
          },
          {
            label: "Language & Images",
            path: `/app/configuration/${configId}/settings/language-text${search}`,
            icon: TextFontIcon,
            keywords: ["language", "languages", "labels", "texts", "visualizer", "images", "icons"],
          },
          {
            label: "Theme & Color",
            path: `/app/configuration/${configId}/settings/theme-color${search}`,
            icon: ColorIcon,
            keywords: ["theme", "themes", "color", "colors", "colour", "colours", "css", "skin"],
          },
        ],
      },
    ],
    [configId, hasAdvancedMaterials, search],
  );

  const directItems = useMemo<LayoutItem[]>(
    () => [
      {
        label: "Templates",
        path: `/app/configuration/${configId}/templates${search}`,
        icon: ViewIcon,
        keywords: [
          "template",
          "templates",
          "design",
          "preview",
          "mockup",
          "template list",
        ],
      },
    ],
    [configId, search],
  );

  const filteredGroups = useMemo(() => {
    const term = searchMenu.trim().toLowerCase();
    if (!term) return groups;

    return groups
      .map((group) => ({
        ...group,
        items: group.items.filter((item) => itemMatchesSearch(item, term)),
      }))
      .filter((group) => group.items.length > 0);
  }, [groups, searchMenu]);

  const filteredDirectItems = useMemo(() => {
    const term = searchMenu.trim().toLowerCase();
    if (!term) return directItems;
    return directItems.filter((item) => itemMatchesSearch(item, term));
  }, [directItems, searchMenu]);

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
                {configuration?.materialType ? <Badge>{configuration.materialType}</Badge> : null}
                {configuration?.productType ? <Badge tone="info">{configuration.productType}</Badge> : null}
              </InlineStack>
            </Box>

            <Box paddingBlockStart="200">
              <Text as="h3" variant="headingSm">
                Configurator Menu
              </Text>
            </Box>

            <Box paddingBlockStart="100">
              <TextField
                label="Search configurator items"
                labelHidden
                autoComplete="off"
                value={searchMenu}
                onChange={setSearchMenu}
                placeholder="Search configurator items..."
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
                <Box
                  key={group.title}
                  padding="250"
                >
                  <button
                    type="button"
                    onClick={() => setExpandedGroup((current) => (current === group.title ? "" : group.title))}
                    style={{
                      width: "100%",
                      display: "grid",
                      gridTemplateColumns: "minmax(0, 1fr) 20px",
                      alignItems: "center",
                      gap: 12,
                      background: groupIsExpanded || groupIsActive ? "#f3f4f6" : "#ffffff",
                      border: groupIsExpanded || groupIsActive ? "1px solid #d1d5db" : "1px solid transparent",
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
                        fontWeight={groupIsExpanded || groupIsActive ? "semibold" : "medium"}
                        tone="subdued"
                      >
                        {group.title}
                      </Text>
                    </div>
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                      <Icon
                        source={groupIsExpanded ? ChevronDownIcon : ChevronRightIcon}
                        tone="subdued"
                      />
                    </div>
                  </button>

                  {groupIsExpanded ? (
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
                                    <Text
                                      as="span"
                                      variant="bodyMd"
                                      fontWeight={active ? "semibold" : "regular"}
                                    >
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
                  ) : null}
                </Box>
                );
              })}

              {filteredDirectItems.map((item) => (
                <Box key={item.path} padding="250">
                  <NavLink to={item.path} style={{ textDecoration: "none" }}>
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
                            background: active ? "#eef2ff" : "#ffffff",
                            border: active ? "1px solid #c7d2fe" : "1px solid #e5e7eb",
                            color: "#111827",
                          }}
                        >
                          <InlineStack gap="200" blockAlign="center" wrap={false}>
                            <Icon source={item.icon} tone={active ? "base" : "subdued"} />
                            <Text
                              as="span"
                              variant="bodyMd"
                              fontWeight={active ? "semibold" : "medium"}
                            >
                              {item.label}
                            </Text>
                          </InlineStack>
                        </div>
                      );
                    }}
                  </NavLink>
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
