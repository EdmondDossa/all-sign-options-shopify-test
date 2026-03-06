import { json } from "@remix-run/node";
import type { ActionFunctionArgs } from "@remix-run/node";
import { useNavigation, useOutletContext, useSubmit } from "@remix-run/react";
import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { Box, Button, Card, Text, TextField } from "@shopify/polaris";
import ConfigSettingsService from "~/models/ConfigSetttings.service";
import { TextColorField } from "~/components/inputs";
import { authenticate } from "~/shopify.server";
import { jFlashMessage } from "~/utils/message-flash";

const DEFAULT_THEME_COLORS: Record<string, string> = {
  backgroundColor: "#FFFFFF",
  titleColor: "#000000",
  descriptionColor: "#000000",
  buttonColor: "#FFFFFF",
  buttonHoverColor: "#f8fafc",
  buttonTextColor: "#000000",
  activeButtonColor: "#0e7490",
  activeButtonHoverColor: "#0891b2",
  activeButtonTextColor: "#FFFFFF",
  beforePriceColor: "#000000",
  priceBackgroundColor: "#FFFFFF",
  priceColor: "#000000",
  delPriceColor: "#878787",
  afterPriceColor: "#000000",
  optionsSectionBackgroundColor: "#fafafa",
  optionBorderColor: "#4b5563",
  activeOptionBackgroundColor: "#ffffff",
  optionTextColor: "#4b5563",
  colorOfMeasuringBarText: "#FFFFFF",
  colorMeasuringBar: "#FFFFFF",
  activeOptionBorderColor: "#0891b2",
  activeOptionTextColor: "#0891b2",
  formErrorBg: "#ff0000",
  formErrorText: "#000000",
  finishModalColor: "#000000",
  finishModalLoaderColor: "#ece8e8",
  finishButtonContainerColor: "#000000",
  finishButtonContainerPriceColor: "#FFFFFF",
  finishButtonContainerDiscountPriceColor: "#000000",
  shareButtonContainerColor: "#FFFFFF",
  shareButtonTextColor: "#000000",
  selectedTextBorderColor: "#000000",
  selectedTextBorderCornerColor: "#000000",
  darkBackgroundColor: "#1c1c1c",
  darkTitleColor: "#FFFFFF",
  darkDescriptionColor: "#FFFFFF",
  darkButtonColor: "#1c1c1c",
  darkButtonHoverColor: "#292929",
  darkButtonTextColor: "#FFFFFF",
  darkActiveButtonColor: "#292929",
  darkActiveButtonHoverColor: "#292929",
  darkActiveButtonTextColor: "#0e7490",
  darkBeforePriceColor: "#FFFFFF",
  darkPriceBackgroundColor: "#FFFFFF",
  darkPriceColor: "#1c1c1c",
  darkAfterPriceColor: "#FFFFFF",
  darkOptionsSectionBackgroundColor: "#292929",
  darkOptionBorderColor: "#6b7280",
  darkOptionTextColor: "#6b7280",
  darkActiveOptionBackgroundColor: "#000000",
  darkActiveOptionBorderColor: "#0891b2",
  darkActiveOptionTextColor: "#0891b2",
  darkFinishModalColor: "#ffffff",
  darkFinishModalLoaderColor: "#cccbc8",
};

const COLOR_FIELD_LABELS: Record<string, string> = {
  colorOfMeasuringBarText: "Color Of Measuring Bar Text",
  colorMeasuringBar: "Color Measuring Bar",
  finishButtonContainerPriceColor: "Finish Button Container Price Color",
  finishButtonContainerDiscountPriceColor:
    "Finish Button Container Discount Price Color",
};

const THEME_SKINS = [
  {
    title: "Default Skin",
    value: "default",
    img: "/images/settings/im_defaultSkin.png",
  },
  {
    title: "Mono Skin",
    value: "mono",
    img: "/images/settings/im_skinMono.png",
  },
  {
    title: "Zou Skin",
    value: "zou",
    img: "/images/settings/im_skinZou.png",
  },
];

const getFieldLabel = (key: string) => {
  if (COLOR_FIELD_LABELS[key]) return COLOR_FIELD_LABELS[key];
  const withSpaces = key.replace(/([a-z0-9])([A-Z])/g, "$1 $2");
  return withSpaces.charAt(0).toUpperCase() + withSpaces.slice(1);
};

function SectionShell({
  title,
  description,
  children,
  onSave,
  saving,
}: {
  title: string;
  description: string;
  children: ReactNode;
  onSave: () => void;
  saving: boolean;
}) {
  return (
    <Box paddingBlockStart="300">
      <Card>
        <Box padding="300">
          <Text as="h3" variant="headingMd">
            {title}
          </Text>
          <Box paddingBlockStart="100">
            <Text as="p" tone="subdued">
              {description}
            </Text>
          </Box>

          <Box paddingBlockStart="300">{children}</Box>

          <Box paddingBlockStart="300">
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button variant="primary" loading={saving} onClick={onSave}>
                Save {title}
              </Button>
            </div>
          </Box>
        </Box>
      </Card>
    </Box>
  );
}

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const { session } = await authenticate.admin(request);
  const configId = Number(params.configId || "");
  if (!Number.isFinite(configId)) {
    return json({ ok: false }, { status: 400 });
  }

  const formData = await request.formData();
  const section = String(formData.get("section") || "");
  const payloadRaw = formData.get("payload");

  if (typeof payloadRaw !== "string") {
    return json({ ok: false, error: "No payload provided" }, { status: 400 });
  }

  try {
    const payload = JSON.parse(payloadRaw);

    if (section === "themes") {
      await ConfigSettingsService.editMain(
        session.id,
        configId,
        "themes",
        payload,
      );
      return json({
        ok: true,
        ...jFlashMessage("Theme settings updated successfully"),
      });
    }

    if (section === "themeColors") {
      await ConfigSettingsService.editMain(
        session.id,
        configId,
        "themeColors",
        payload,
      );
      return json({
        ok: true,
        ...jFlashMessage("Custom CSS updated successfully"),
      });
    }

    return json({ ok: false, error: "Unknown section" }, { status: 400 });
  } catch (error) {
    return json({ ok: false, error: String(error) }, { status: 400 });
  }
};

export default function ConfigSettingsThemeColor() {
  const submit = useSubmit();
  const navigation = useNavigation();
  const { configuration } = useOutletContext<any>();
  const saving = navigation.state === "submitting";

  const [themes, setThemes] = useState<{
    skin: string;
    colors: Record<string, string>;
  }>({
    skin: "default",
    colors: { ...DEFAULT_THEME_COLORS },
  });
  const [customCss, setCustomCss] = useState("");

  useEffect(() => {
    const themeData = configuration?.data?.settings?.themes || {};
    const themeColorsData = configuration?.data?.settings?.themeColors || {};

    setThemes({
      skin: themeData.skin || "default",
      colors: {
        ...DEFAULT_THEME_COLORS,
        ...(themeData.colors || {}),
      },
    });

    setCustomCss(String(themeColorsData.customCss || ""));
  }, [configuration]);

  const colorKeys = useMemo(() => {
    const defaults = Object.keys(DEFAULT_THEME_COLORS);
    const extras = Object.keys(themes.colors || {}).filter(
      (key) => !defaults.includes(key),
    );
    return [...defaults, ...extras];
  }, [themes.colors]);

  const lightColorKeys = useMemo(
    () => colorKeys.filter((key) => !key.startsWith("dark")),
    [colorKeys],
  );
  const darkColorKeys = useMemo(
    () => colorKeys.filter((key) => key.startsWith("dark")),
    [colorKeys],
  );

  const saveThemes = () => {
    submit(
      {
        section: "themes",
        payload: JSON.stringify({
          skin: themes.skin,
          colors: themes.colors,
        }),
      },
      { method: "POST" },
    );
  };

  const saveCustomCss = () => {
    submit(
      {
        section: "themeColors",
        payload: JSON.stringify({
          customCss,
        }),
      },
      { method: "POST" },
    );
  };

  return (
    <Box paddingBlockEnd="400">
      <SectionShell
        title="Theme & Colors"
        description="Choose skin and edit all visual color tokens."
        onSave={saveThemes}
        saving={saving}
      >
        <Box paddingBlockEnd="300">
          <div
            style={{
              display: "grid",
              gap: "14px",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              maxWidth: "760px",
            }}
          >
            {THEME_SKINS.map((skin) => {
              const isActive = themes.skin === skin.value;
              return (
                <button
                  key={skin.value}
                  type="button"
                  onClick={() => setThemes((prev) => ({ ...prev, skin: skin.value }))}
                  style={{
                    width: "100%",
                    border: isActive ? "2px solid #2563eb" : "1px solid #d1d5db",
                    borderRadius: 12,
                    background: "#fff",
                    cursor: "pointer",
                    overflow: "hidden",
                    boxShadow: isActive
                      ? "0 0 0 3px rgba(37, 99, 235, 0.18)"
                      : "0 1px 2px rgba(15, 23, 42, 0.04)",
                    textAlign: "left",
                    transition: "all 160ms ease",
                  }}
                >
                  <div
                    style={{
                      height: 126,
                      background: "#f8fafc",
                      borderBottom: "1px solid #e5e7eb",
                    }}
                  >
                    <img
                      src={skin.img}
                      alt={skin.title}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                      }}
                      onError={(event) => {
                        const target = event.currentTarget as HTMLImageElement;
                        target.style.display = "none";
                      }}
                    />
                  </div>
                  <div style={{ padding: "12px 12px 11px" }}>
                    <Text as="p" variant="bodyMd" fontWeight="semibold">
                      {skin.title}
                    </Text>
                    <Box paddingBlockStart="050">
                      <Text as="p" tone={isActive ? "success" : "subdued"}>
                        {isActive ? "Selected" : "Click to select"}
                      </Text>
                    </Box>
                  </div>
                </button>
              );
            })}
          </div>
        </Box>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <Card>
            <Box padding="300">
              <Text as="h4" variant="headingSm">
                Light Theme Colors
              </Text>
              <Box paddingBlockStart="100">
                <Text as="p" tone="subdued">
                  Core colors used in light mode and shared UI surfaces.
                </Text>
              </Box>
              <Box paddingBlockStart="300">
                <div
                  style={{
                    display: "grid",
                    gap: "12px",
                    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                  }}
                >
                  {lightColorKeys.map((key) => (
                    <TextColorField
                      key={key}
                      label={getFieldLabel(key)}
                      color={themes.colors[key] || "#000000"}
                      setColor={(value: string) =>
                        setThemes((prev) => ({
                          ...prev,
                          colors: {
                            ...prev.colors,
                            [key]: value,
                          },
                        }))
                      }
                    />
                  ))}
                </div>
              </Box>
            </Box>
          </Card>

          <Card>
            <Box padding="300">
              <Text as="h4" variant="headingSm">
                Dark Theme Colors
              </Text>
              <Box paddingBlockStart="100">
                <Text as="p" tone="subdued">
                  Dedicated color tokens used when dark mode is active.
                </Text>
              </Box>
              <Box paddingBlockStart="300">
                <div
                  style={{
                    display: "grid",
                    gap: "12px",
                    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                  }}
                >
                  {darkColorKeys.map((key) => (
                    <TextColorField
                      key={key}
                      label={getFieldLabel(key)}
                      color={themes.colors[key] || "#000000"}
                      setColor={(value: string) =>
                        setThemes((prev) => ({
                          ...prev,
                          colors: {
                            ...prev.colors,
                            [key]: value,
                          },
                        }))
                      }
                    />
                  ))}
                </div>
              </Box>
            </Box>
          </Card>
        </div>
      </SectionShell>

      <SectionShell
        title="Custom CSS"
        description="Optional CSS overrides for advanced theming."
        onSave={saveCustomCss}
        saving={saving}
      >
        <TextField
          multiline={10}
          label="Custom CSS"
          type="text"
          value={customCss}
          onChange={setCustomCss}
          autoComplete="off"
        />
      </SectionShell>
    </Box>
  );
}
