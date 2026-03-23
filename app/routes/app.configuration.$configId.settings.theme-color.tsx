import { json } from "@remix-run/node";
import type { ActionFunctionArgs } from "@remix-run/node";
import { Outlet, useLocation, useNavigation, useOutletContext, useParams, useSubmit } from "@remix-run/react";
import { useEffect, useId, useState } from "react";
import { BlockStack, Box, Button, Card, Collapsible, Grid, InlineStack, Text, TextField } from "@shopify/polaris";
import ConfigSettingsService from "~/models/ConfigSetttings.service";
import { TextColorField } from "~/components/inputs";
import { CheckSpan } from "~/components/inputs/CheckSpan";
import { authenticate } from "~/shopify.server";
import { jFlashMessage } from "~/utils/message-flash";

const DEFAULT_THEME_SETTINGS = {
  skin: "default",
  colors: {
    canvas: {
      backgroundColor: "#f4f8fa",
      borderColor: "#c3cfd6",
    },
    bars: {
      titleColor: "#000000",
      backgroundColor: "#ffffff",
      reset: {
        textColor: "#000000",
        hoverTextColor: "#dd3232",
        backgroundColor: "#ffffff",
        hoverBackgroundColor: "#f4f8fa",
        borderColor: "#ffffff",
        hoverBorderColor: "#f4f8fa",
        modalBackgroundColor: "#000000",
        modalContainerBackground: "#ffffff",
        modalTextColor: "#000000",
        modalYesButtonBackgroundColor: "#f4f8fa",
        modalYesButtonTextColor: "#000000",
        modalNoButtonBackgroundColor: "#dc2626",
        modalNoButtonTextColor: "#ffffff",
      },
      undoRedo: {
        textColor: "#000000",
        hoverTextColor: "#016464",
        backgroundColor: "#ffffff",
        hoverBackgroundColor: "#f4f8fa",
        borderColor: "#ffffff",
        hoverBorderColor: "#f4f8fa",
        disabledBackgroundColor: "#ffffff",
        disabledTextColor: "#c3cfd6",
      },
      preview: {
        textColor: "#000000",
        hoverTextColor: "#016464",
        backgroundColor: "#ffffff",
        hoverBackgroundColor: "#f4f8fa",
        borderColor: "#ffffff",
        hoverBorderColor: "#f4f8fa",
      },
      help: {
        textColor: "#ffffff",
        hoverTextColor: "#ffffff",
        backgroundColor: "#016464",
        hoverBackgroundColor: "#016464",
        borderColor: "#016464",
        hoverBorderColor: "#016464",
      },
      price: {
        backgroundColor: "#ffffff",
        textColor: "#000000",
        textAfterColor: "#000000",
        textBeforeColor: "#000000",
      },
    },
    optionsSideBar: {
      backgroundColor: "#eef3f6",
      scrollButtonsBackgroundColor: "#4a4a4a",
      scrollButtonsHoverBackgroundColor: "#74848d",
      scrollButtonsTextColor: "#ffffff",
      scrollButtonsHoverTextColor: "#ffffff",
      options: {
        buttons: {
          backgroundColor: "#ffffff",
          hoverBackgroundColor: "#ffffff",
          textColor: "#000000",
          hoverTextColor: "#016464",
          hovertextColor: "#016464",
        },
        modals: {
          headerBackgroundColor: "#016464",
          headerTextColor: "#ffffff",
          textColor: "#000000",
          option: {
            textColor: "#000000",
            hoverBackgroundColor: "#eef3f6",
            hoverTextColor: "#000000",
            activeTextColor: "#016464",
          },
          buttons: {
            backgroundColor: "#016464",
            hoverBackgroundColor: "#028383",
            textColor: "#ffffff",
            hoverTextColor: "#ffffff",
          },
          backgroundColor: "#ffffff",
        },
      },
    },
    objectsOptions: {
      backgroundColor: "#ffffff",
      edit: {
        buttonColor: "#ffffff",
        hoverButtonColor: "#787878",
        textColor: "#000000",
        hoverTextColor: "#ffffff",
      },
      clone: {
        buttonColor: "#ffffff",
        hoverButtonColor: "#787878",
        textColor: "#000000",
        hoverTextColor: "#ffffff",
      },
      delete: {
        buttonColor: "#ffffff",
        hoverButtonColor: "#787878",
        textColor: "#dd3232",
        hoverTextColor: "#dd3232",
      },
      center: {
        buttonColor: "#ffffff",
        hoverButtonColor: "#787878",
        textColor: "#000000",
        hoverTextColor: "#ffffff",
      },
    },
    recaps: {
      headerBackgroundColor: "#058585",
      headerTextColor: "#ffffff",
      backgroundColor: "#ffffff",
      optionTextColor: "#000000",
      optionHoverBackgroundColor: "#eef3f6",
      optionHoverTextColor: "#000000",
      optionBorderColor: "#eef3f6",
      optionHoverBorderColor: "#eef3f6",
      buttonFinishBackgroundColor: "#febd52",
      buttonFinishTextColor: "#14213d",
      buttonFinishHoverBackgroundColor: "#fcac29",
      buttonFinishHoverTextColor: "#313e52",
      buttonAddToCartBackgroundColor: "#febd52",
      buttonAddToCartHoverBackgroundColor: "#fcac29",
      buttonAddToCartTextColor: "#14213d",
      buttonAddToCartHoverTextColor: "#313e52",
      buttonEditBackgroundColor: "#016464",
      buttonEditHoverBackgroundColor: "#058585",
      buttonEditTextColor: "#ffffff",
      buttonEditHoverTextColor: "#f4f8fa",
    },
  },
  customCss: "",
};

const THEME_SKINS = [
  { title: "Default Skin", value: "default", img: "/theme-default.png" },
  { title: "Couffo Skin", value: "couffo", img: "/theme-couffo.png" },
];

const GROUPS: Array<{ key: string; title: string; fields: Array<{ label: string; path: string }> }> = [
  {
    key: "canvas",
    title: "Canvas, Header and Side Bars",
    fields: [
      { label: "Canvas background color", path: "colors.canvas.backgroundColor" },
      { label: "Canvas border color", path: "colors.canvas.borderColor" },
      { label: "Bars Background color", path: "colors.bars.backgroundColor" },
      { label: "Bars title color", path: "colors.bars.titleColor" },
    ],
  },
  {
    key: "price",
    title: "Price Section",
    fields: [
      { label: "Background color", path: "colors.bars.price.backgroundColor" },
      { label: "Text color", path: "colors.bars.price.textColor" },
      { label: "Text before price", path: "colors.bars.price.textBeforeColor" },
      { label: "Text after price", path: "colors.bars.price.textAfterColor" },
    ],
  },
  {
    key: "reset",
    title: "Reset button",
    fields: [
      { label: "Background color", path: "colors.bars.reset.backgroundColor" },
      { label: "Hover background color", path: "colors.bars.reset.hoverBackgroundColor" },
      { label: "Text color", path: "colors.bars.reset.textColor" },
      { label: "Hover text color", path: "colors.bars.reset.hoverTextColor" },
      { label: "Border color", path: "colors.bars.reset.borderColor" },
      { label: "Hover border color", path: "colors.bars.reset.hoverBorderColor" },
      { label: "Modal background color", path: "colors.bars.reset.modalBackgroundColor" },
      { label: "Container modal color", path: "colors.bars.reset.modalContainerBackground" },
      { label: "Modal text color", path: "colors.bars.reset.modalTextColor" },
      { label: "Yes background color", path: "colors.bars.reset.modalYesButtonBackgroundColor" },
      { label: "Yes text color", path: "colors.bars.reset.modalYesButtonTextColor" },
      { label: "No background color", path: "colors.bars.reset.modalNoButtonBackgroundColor" },
      { label: "No text color", path: "colors.bars.reset.modalNoButtonTextColor" },
    ],
  },
  {
    key: "undoRedo",
    title: "Undo and redo buttons",
    fields: [
      { label: "Background color", path: "colors.bars.undoRedo.backgroundColor" },
      { label: "Hover background color", path: "colors.bars.undoRedo.hoverBackgroundColor" },
      { label: "Text color", path: "colors.bars.undoRedo.textColor" },
      { label: "Hover text color", path: "colors.bars.undoRedo.hoverTextColor" },
      { label: "Border color", path: "colors.bars.undoRedo.borderColor" },
      { label: "Hover border color", path: "colors.bars.undoRedo.hoverBorderColor" },
      { label: "Disabled background color", path: "colors.bars.undoRedo.disabledBackgroundColor" },
      { label: "Disabled text color", path: "colors.bars.undoRedo.disabledTextColor" },
    ],
  },
  {
    key: "preview",
    title: "Preview buttons",
    fields: [
      { label: "Background color", path: "colors.bars.preview.backgroundColor" },
      { label: "Hover background color", path: "colors.bars.preview.hoverBackgroundColor" },
      { label: "Text color", path: "colors.bars.preview.textColor" },
      { label: "Hover text color", path: "colors.bars.preview.hoverTextColor" },
      { label: "Border color", path: "colors.bars.preview.borderColor" },
      { label: "Hover border color", path: "colors.bars.preview.hoverBorderColor" },
    ],
  },
  {
    key: "help",
    title: "Help buttons",
    fields: [
      { label: "Background color", path: "colors.bars.help.backgroundColor" },
      { label: "Hover background color", path: "colors.bars.help.hoverBackgroundColor" },
      { label: "Text color", path: "colors.bars.help.textColor" },
      { label: "Hover text color", path: "colors.bars.help.hoverTextColor" },
      { label: "Border color", path: "colors.bars.help.borderColor" },
      { label: "Hover border color", path: "colors.bars.help.hoverBorderColor" },
    ],
  },
  {
    key: "optionsSideBar",
    title: "Options SideBar",
    fields: [
      { label: "Background color", path: "colors.optionsSideBar.backgroundColor" },
      { label: "Scroll button background color", path: "colors.optionsSideBar.scrollButtonsBackgroundColor" },
      { label: "Scroll hover button background color", path: "colors.optionsSideBar.scrollButtonsHoverBackgroundColor" },
      { label: "Scroll button text color", path: "colors.optionsSideBar.scrollButtonsTextColor" },
      { label: "Scroll button text hover color", path: "colors.optionsSideBar.scrollButtonsHoverTextColor" },
      { label: "Options button background color", path: "colors.optionsSideBar.options.buttons.backgroundColor" },
      { label: "Options button hover background color", path: "colors.optionsSideBar.options.buttons.hoverBackgroundColor" },
      { label: "Options button text color", path: "colors.optionsSideBar.options.buttons.textColor" },
      { label: "Options button hover text color", path: "colors.optionsSideBar.options.buttons.hoverTextColor" },
    ],
  },
  {
    key: "optionsModal",
    title: "Options modals",
    fields: [
      { label: "Modal background color", path: "colors.optionsSideBar.options.modals.backgroundColor" },
      { label: "Modal text color", path: "colors.optionsSideBar.options.modals.textColor" },
      { label: "Modal header background color", path: "colors.optionsSideBar.options.modals.headerBackgroundColor" },
      { label: "Modal header text color", path: "colors.optionsSideBar.options.modals.headerTextColor" },
      { label: "Modal button background color", path: "colors.optionsSideBar.options.modals.buttons.backgroundColor" },
      { label: "Modal button hover background color", path: "colors.optionsSideBar.options.modals.buttons.hoverBackgroundColor" },
      { label: "Modal button text color", path: "colors.optionsSideBar.options.modals.buttons.textColor" },
      { label: "Modal button hover text color", path: "colors.optionsSideBar.options.modals.buttons.hoverTextColor" },
    ],
  },
  {
    key: "optionsInModal",
    title: "Options in modals",
    fields: [
      { label: "Modal option text color", path: "colors.optionsSideBar.options.modals.option.textColor" },
      { label: "Modal option hover text color", path: "colors.optionsSideBar.options.modals.option.hoverTextColor" },
      { label: "Modal option hover background color", path: "colors.optionsSideBar.options.modals.option.hoverBackgroundColor" },
      { label: "Modal option active text color", path: "colors.optionsSideBar.options.modals.option.activeTextColor" },
    ],
  },
  {
    key: "objectsOptions",
    title: "Objects options",
    fields: [
      { label: "Background color", path: "colors.objectsOptions.backgroundColor" },
      { label: "Edit button color", path: "colors.objectsOptions.edit.buttonColor" },
      { label: "Hover Edit button color", path: "colors.objectsOptions.edit.hoverButtonColor" },
      { label: "Edit button text color", path: "colors.objectsOptions.edit.textColor" },
      { label: "Hover Edit button text color", path: "colors.objectsOptions.edit.hoverTextColor" },
      { label: "Clone button color", path: "colors.objectsOptions.clone.buttonColor" },
      { label: "Hover Clone button color", path: "colors.objectsOptions.clone.hoverButtonColor" },
      { label: "Clone button text color", path: "colors.objectsOptions.clone.textColor" },
      { label: "Hover Clone button text color", path: "colors.objectsOptions.clone.hoverTextColor" },
      { label: "Delete button color", path: "colors.objectsOptions.delete.buttonColor" },
      { label: "Hover Delete button color", path: "colors.objectsOptions.delete.hoverButtonColor" },
      { label: "Delete button text color", path: "colors.objectsOptions.delete.textColor" },
      { label: "Hover Delete button text color", path: "colors.objectsOptions.delete.hoverTextColor" },
      { label: "Center button color", path: "colors.objectsOptions.center.buttonColor" },
      { label: "Hover Center button color", path: "colors.objectsOptions.center.hoverButtonColor" },
      { label: "Center button text color", path: "colors.objectsOptions.center.textColor" },
      { label: "Hover Center button text color", path: "colors.objectsOptions.center.hoverTextColor" },
    ],
  },
  {
    key: "recaps",
    title: "Recaps section",
    fields: [
      { label: "Background color", path: "colors.recaps.backgroundColor" },
      { label: "Header background color", path: "colors.recaps.headerBackgroundColor" },
      { label: "Header text color", path: "colors.recaps.headerTextColor" },
      { label: "Recaps option hover background color", path: "colors.recaps.optionHoverBackgroundColor" },
      { label: "Recaps option hover text color", path: "colors.recaps.optionHoverTextColor" },
      { label: "Recaps option text color", path: "colors.recaps.optionTextColor" },
      { label: "Recaps option border color", path: "colors.recaps.optionBorderColor" },
      { label: "Recaps option border hover color", path: "colors.recaps.optionHoverBorderColor" },
      { label: "Button Finish background color", path: "colors.recaps.buttonFinishBackgroundColor" },
      { label: "Button Finish hover background color", path: "colors.recaps.buttonFinishHoverBackgroundColor" },
      { label: "Button Finish text color", path: "colors.recaps.buttonFinishTextColor" },
      { label: "Button Finish text hover color", path: "colors.recaps.buttonFinishHoverTextColor" },
      { label: "Button AddToCart background color", path: "colors.recaps.buttonAddToCartBackgroundColor" },
      { label: "Button AddToCart hover background color", path: "colors.recaps.buttonAddToCartHoverBackgroundColor" },
      { label: "Button AddToCart text color", path: "colors.recaps.buttonAddToCartTextColor" },
      { label: "Button AddToCart text hover color", path: "colors.recaps.buttonAddToCartHoverTextColor" },
      { label: "Button Edit background color", path: "colors.recaps.buttonEditBackgroundColor" },
      { label: "Button Edit hover background color", path: "colors.recaps.buttonEditHoverBackgroundColor" },
      { label: "Button Edit text color", path: "colors.recaps.buttonEditTextColor" },
      { label: "Button Edit text hover color", path: "colors.recaps.buttonEditHoverTextColor" },
    ],
  },
];

const getValueAtPath = (object: Record<string, any>, path: string) =>
  path.split(".").reduce<any>((accumulator, key) => (accumulator == null ? undefined : accumulator[key]), object);

const setValueAtPath = (object: Record<string, any>, path: string, value: string) => {
  const clone = JSON.parse(JSON.stringify(object));
  const parts = path.split(".");
  let current: any = clone;
  for (let index = 0; index < parts.length - 1; index += 1) {
    const part = parts[index];
    current[part] = current[part] || {};
    current = current[part];
  }
  current[parts[parts.length - 1]] = value;
  return clone;
};

function AppearanceItem({ imgSrc, title, active, onChange }: { imgSrc: string; title?: string; active: boolean; onChange: () => void }) {
  return (
    <div style={{ border: "1px solid #E8E8E8", borderRadius: 8, overflow: "hidden", background: "#fff" }}>
      <button type="button" onClick={onChange} style={{ border: 0, background: "transparent", width: "100%", padding: 0, cursor: "pointer", textAlign: "left" }}>
        <div style={{ position: "relative" }}>
          <img src={imgSrc} alt={title} style={{ width: "100%", height: "auto", display: "block" }} />
          <div style={{ position: "absolute", bottom: 0, width: "100%", background: "rgba(255,255,255,0.95)" }}>
            <Box paddingInline="300" paddingBlock="200">
              <InlineStack align="space-between">
                <Text as="span" variant="bodyMd" fontWeight="bold">{title || "Default skin"}</Text>
                <InlineStack gap="200">
                  <Text as="span" tone="success">Select</Text>
                  <CheckSpan checked={active} />
                </InlineStack>
              </InlineStack>
            </Box>
          </div>
        </div>
      </button>
    </div>
  );
}

function ThemeGroup({ title, open, onToggle, children }: { title: string; open: boolean; onToggle: () => void; children: React.ReactNode }) {
  const id = useId();
  return (
    <Card>
      <Box padding="300">
        <InlineStack align="space-between">
          <Text as="strong" fontWeight="bold" variant="bodyLg">{title}</Text>
          <Button disclosure={open ? "up" : "down"} onClick={onToggle} ariaExpanded={open} ariaControls={id}>
            {open ? "Show less" : "Show more"}
          </Button>
        </InlineStack>
        <Collapsible open={open} id={id} transition={{ duration: "250ms", timingFunction: "ease-in-out" }} expandOnPrint>
          <Box paddingBlockStart="300">{children}</Box>
        </Collapsible>
      </Box>
    </Card>
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

    if (!["theme", "customCss"].includes(section)) {
      return json({ ok: false, error: "Unknown section" }, { status: 400 });
    }

    await ConfigSettingsService.editMain(session.id, configId, "themeColors", payload);

    return json({
      ok: true,
      ...jFlashMessage(section === "theme" ? "Theme settings updated successfully" : "Custom CSS updated successfully"),
    });
  } catch (error) {
    return json({ ok: false, error: String(error) }, { status: 400 });
  }
};

export default function ConfigSettingsThemeColor() {
  const submit = useSubmit();
  const navigation = useNavigation();
  const { configuration } = useOutletContext<any>();
  const location = useLocation();
  const params = useParams();
  const configId = String(params.configId || "");
  const basePath = `/app/configuration/${configId}/settings/theme-color`;
  const isRootPage = location.pathname === basePath;
  const saving = navigation.state === "submitting";
  const activeSection = String(navigation.formData?.get("section") || "");

  const [themeSettings, setThemeSettings] = useState(DEFAULT_THEME_SETTINGS);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    canvas: true,
    price: false,
    reset: false,
    undoRedo: false,
    preview: false,
    help: false,
    optionsSideBar: false,
    optionsModal: false,
    optionsInModal: false,
    objectsOptions: false,
    recaps: false,
  });

  useEffect(() => {
    const current = configuration?.data?.settings?.themeColors || {};
    setThemeSettings({
      ...DEFAULT_THEME_SETTINGS,
      ...current,
      colors: {
        ...DEFAULT_THEME_SETTINGS.colors,
        ...(current.colors || {}),
      },
      customCss: String(current.customCss || ""),
    });
  }, [configuration]);

  const submitSection = (section: "theme" | "customCss", payload: Record<string, any>) => {
    submit(
      {
        section,
        payload: JSON.stringify(payload),
      },
      { method: "POST" },
    );
  };

  if (!isRootPage) {
    return <Outlet />;
  }

  return (
    <Box paddingBlockEnd="400">
      <Card>
        <Box padding="400">
          <Text as="h1" variant="headingLg">Theme & Color</Text>
          <Box paddingBlockStart="100">
            <Text as="p" tone="subdued">
              Theme settings for classic configurations. Only classic fields are exposed here; no extra dark mode layer is added.
            </Text>
          </Box>
        </Box>
      </Card>

      <Box paddingBlockStart="300">
        <Card>
          <Box padding="300">
            <Text as="h3" variant="headingMd">Appearance</Text>
            <Box paddingBlockStart="100">
              <Text as="p" tone="subdued">Choose the classic skin and edit the classic color groups.</Text>
            </Box>
            <Box paddingBlockStart="300">
              <Grid gap={{ lg: "20px" }}>
                {THEME_SKINS.map((skin) => (
                  <Grid.Cell key={skin.value} columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
                    <AppearanceItem
                      imgSrc={skin.img}
                      title={skin.title}
                      active={themeSettings.skin === skin.value}
                      onChange={() => setThemeSettings((current) => ({ ...current, skin: skin.value }))}
                    />
                  </Grid.Cell>
                ))}
              </Grid>
            </Box>
          </Box>
        </Card>
      </Box>

      <Box paddingBlockStart="300">
        <BlockStack gap="300">
          {GROUPS.map((group) => (
            <ThemeGroup
              key={group.key}
              title={group.title}
              open={expanded[group.key]}
              onToggle={() => setExpanded((current) => ({ ...current, [group.key]: !current[group.key] }))}
            >
              <Grid gap={{ lg: "20px" }}>
                {group.fields.map((field) => (
                  <Grid.Cell key={field.path} columnSpan={{ xs: 6, sm: 6, md: 3, lg: 4, xl: 3 }}>
                    <TextColorField
                      label={field.label}
                      color={getValueAtPath(themeSettings, field.path) || "#000000"}
                      setColor={(value: string) =>
                        setThemeSettings((current) => setValueAtPath(current as unknown as Record<string, any>, field.path, value) as typeof DEFAULT_THEME_SETTINGS)
                      }
                    />
                  </Grid.Cell>
                ))}
              </Grid>
            </ThemeGroup>
          ))}
        </BlockStack>
      </Box>

      <Box paddingBlockStart="300">
        <Card>
          <Box padding="300">
            <Text as="h3" variant="headingMd">Custom CSS</Text>
            <Box paddingBlockStart="100">
              <Text as="p" tone="subdued">Optional CSS overrides stored in the classic `themeColors.customCss` field.</Text>
            </Box>
            <Box paddingBlockStart="300">
              <TextField
                multiline={10}
                label="Custom CSS"
                value={themeSettings.customCss}
                onChange={(value) => setThemeSettings((current) => ({ ...current, customCss: value }))}
                autoComplete="off"
              />
            </Box>
          </Box>
        </Card>
      </Box>

      <Box paddingBlockStart="300">
        <InlineStack align="end" gap="300">
          <Button
            variant="secondary"
            loading={saving && activeSection === "customCss"}
            onClick={() => submitSection("customCss", { customCss: themeSettings.customCss })}
          >
            Save Custom CSS
          </Button>
          <Button
            variant="primary"
            loading={saving && activeSection === "theme"}
            onClick={() =>
              submitSection("theme", {
                skin: themeSettings.skin,
                colors: themeSettings.colors,
              })
            }
          >
            Save Theme
          </Button>
        </InlineStack>
      </Box>
    </Box>
  );
}
