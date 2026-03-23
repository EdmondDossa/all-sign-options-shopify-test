import { json } from "@remix-run/node";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import {
  Box,
  Button,
  Card,
  Grid,
  Icon,
  InlineStack,
  Select,
  Text,
} from "@shopify/polaris";
import { DragHandleIcon, HideIcon, ViewIcon } from "@shopify/polaris-icons";
import { Outlet, useLoaderData, useLocation, useNavigation, useOutletContext, useParams, useSubmit } from "@remix-run/react";
import { useEffect, useRef, useState } from "react";
import SaveButton from "~/components/buttons/SaveButton";
import { ToggleButton } from "~/components/buttons";
import { AdditinalOptionSvg } from "~/components/svgs/AdditinalOptionSvg";
import { BorderSvg } from "~/components/svgs/BorderSvg";
import { ColorPaletteSvg } from "~/components/svgs/ColorPaletteSvg";
import { FixingMethodSvg } from "~/components/svgs/FixingMethodSvg";
import { MaterialSvg } from "~/components/svgs/MaterialSvg";
import { QrSvg } from "~/components/svgs/QrSvg";
import { ShapeSvg } from "~/components/svgs/ShapeSvg";
import { SizeSvg } from "~/components/svgs/SizeSvg";
import { ImageSvg } from "~/components/svgs/ImageSvg ";
import { TextImageSvg } from "~/components/svgs/TextImageSvg";
import TemplatesIcon from "~/components/icons/TemplatesIcon";
import { AdditionalComponentSvg } from "~/components/svgs/AdditionalComponentSvg";
import Sortable from "~/utils/sortable-adapter";
import ClipartsGroupService from "~/models/ClipartsGroup.service";
import ConfigSettingsService from "~/models/ConfigSetttings.service";
import FontService from "~/models/Font.service";
import SettingShapesService from "~/models/SettingShapes.service";
import { authenticate } from "~/shopify.server";
import type { ClipartsGroupType, FontType } from "~/types/ManagePropertyType";
import type { ShapeType } from "~/types/SettingsType";
import { getPlan } from "~/utils/pricing-server.server";
import { jFlashMessage } from "~/utils/message-flash";

type ConfigOption = { type: string; active: boolean };

type CustomizerOptionsState = {
  measurementUnit: string;
  showHideMeasurements: string;
  decimalFormatMeasurements: string;
  desktopColumnOrder: string;
  finishButtonPosition: string | null;
  allowNextButton: boolean;
  showThicknessPricing: boolean;
};

const defaultConfigOptions = (): ConfigOption[] => [
  { type: "materials", active: true },
  { type: "sizes", active: true },
  { type: "shapes", active: true },
  { type: "fixing-methodes", active: true },
  { type: "borders", active: true },
  { type: "colors", active: true },
  { type: "texts", active: true },
  { type: "qrcodes", active: true },
  { type: "images", active: true },
  { type: "additional-options", active: true },
  { type: "additional-components", active: true },
];

const defaultCustomizerOptions = (): CustomizerOptionsState => ({
  measurementUnit: "mm",
  showHideMeasurements: "both",
  decimalFormatMeasurements: "with-decimal",
  desktopColumnOrder: "left",
  finishButtonPosition: "bottom",
  allowNextButton: false,
  showThicknessPricing: false,
});

const optionsIcon = (type: string) => {
  const configOptions = [
    { type: "materials", icon: <MaterialSvg /> },
    { type: "sizes", icon: <SizeSvg /> },
    { type: "shapes", icon: <ShapeSvg /> },
    { type: "fixing-methodes", icon: <FixingMethodSvg /> },
    { type: "borders", icon: <BorderSvg /> },
    { type: "colors", icon: <ColorPaletteSvg /> },
    { type: "texts", icon: <TextImageSvg /> },
    { type: "qrcodes", icon: <QrSvg /> },
    { type: "images", icon: <ImageSvg /> },
    { type: "additional-options", icon: <AdditinalOptionSvg /> },
    { type: "templates", icon: <TemplatesIcon /> },
    { type: "additional-components", icon: <AdditionalComponentSvg /> },
  ];

  return configOptions.find((item) => item.type === type)?.icon ?? null;
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { session, admin, billing } = await authenticate.admin(request);
  const manageFonts: FontType[] | null = await FontService.getFonts(session.id);
  const manageShapes: ShapeType[] | null = await SettingShapesService.get(session.id);
  const manageClipartGroups: ClipartsGroupType[] | null =
    await ClipartsGroupService.getClipartsGroups(session.id);
  const plan = await getPlan(billing, session?.shop, admin);

  return json({ manageFonts, manageShapes, manageClipartGroups, plan });
};

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const { session } = await authenticate.admin(request);
  const configId = parseInt(params.configId ?? "", 10);

  if (!Number.isFinite(configId)) {
    return json({ ...jFlashMessage("Invalid configuration", "error") }, { status: 400 });
  }

  const formData = await request.formData();
  const section = String(formData.get("section") || "").trim();
  const rawPayload = String(formData.get("payload") || "");

  if (!section || !rawPayload) {
    return json({ ...jFlashMessage("Missing settings payload", "error") }, { status: 400 });
  }

  let parsed: any;
  try {
    parsed = JSON.parse(rawPayload);
  } catch {
    return json({ ...jFlashMessage("Invalid settings payload", "error") }, { status: 400 });
  }

  const sectionMap: Record<string, { key: string; value: any }> = {
    configOptions: { key: "", value: { configOptions: Array.isArray(parsed) ? parsed : defaultConfigOptions() } },
    customizerOptions: { key: "customizerOptions", value: parsed },
    text: { key: "text", value: parsed },
    images: { key: "images", value: parsed },
  };

  const target = sectionMap[section];
  if (!target) {
    return json({ ...jFlashMessage("Unsupported settings section", "error") }, { status: 400 });
  }

  let result = null;
  if (target.key === "") {
    result = await ConfigSettingsService.editMain(session.id, configId, "customizerSign", target.value);
  } else {
    result = await ConfigSettingsService.updateSettingsSection(configId, session.id, "customizerSign", target.key, target.value);
  }

  if (!result) {
    return json({ ...jFlashMessage("Unable to update settings", "error") }, { status: 500 });
  }

  return json({ ok: true, section, ...jFlashMessage(`${section} settings updated successfully`) });
};

function SectionCard({ id, title, description, children }: { id: string; title: string; description: string; children: React.ReactNode }) {
  return (
    <section id={id} style={{ scrollMarginTop: 16 }}>
      <Card>
        <Box padding="300">
          <Text as="h3" variant="headingMd">{title}</Text>
          <Box paddingBlockStart="100">
            <Text as="p" tone="subdued">{description}</Text>
          </Box>
          <Box paddingBlockStart="300">{children}</Box>
        </Box>
      </Card>
    </section>
  );
}

function SectionSave({ loading, onClick, label }: { loading: boolean; onClick: () => void; label: string }) {
  return (
    <Box paddingBlockStart="300">
      <InlineStack align="end">
        <SaveButton loading={loading} onClick={onClick}>{label}</SaveButton>
      </InlineStack>
    </Box>
  );
}

export default function ConfigSettingsCustomizerSign() {
  const loaderData = useLoaderData<typeof loader>();
  const { configuration } = useOutletContext<any>();
  const location = useLocation();
  const navigation = useNavigation();
  const submit = useSubmit();
  const params = useParams();
  const configId = String(params.configId || "");
  const basePath = `/app/configuration/${configId}/settings/customizer-sign`;
  const isRootPage = location.pathname === basePath;

  const [configOptions, setConfigOptions] = useState<ConfigOption[]>(defaultConfigOptions());
  const [customizerOptions, setCustomizerOptions] = useState<CustomizerOptionsState>(defaultCustomizerOptions());
  const configOptionsListRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = configuration?.data?.settings?.customizerSign || {};
    setConfigOptions(Array.isArray(section?.configOptions) ? section.configOptions : defaultConfigOptions());
    setCustomizerOptions({ ...defaultCustomizerOptions(), ...(section?.customizerOptions || {}) });
  }, [configuration]);

  useEffect(() => {
    if (!isRootPage) return;
    const element = configOptionsListRef.current;
    if (!element) return;
    const sortable = new Sortable(element, {
      draggable: ".config-option-row",
      handle: ".drag-handle",
      onEnd: () => {
        const rows = Array.from(element.querySelectorAll<HTMLElement>(".config-option-row"));
        const next = rows
          .map((row) => {
            const optionType = row.dataset.optionType;
            return configOptions.find((item) => item.type === optionType);
          })
          .filter(Boolean) as ConfigOption[];

        if (next.length === configOptions.length) {
          setConfigOptions(next);
        }
      },
    });
    return () => sortable.destroy?.();
  }, [isRootPage, configOptions]);

  const activeSection = String(navigation.formData?.get("section") || "");

  const submitSection = (section: string, value: any) => {
    const formData = new FormData();
    formData.append("section", section);
    formData.append("payload", JSON.stringify(value));
    submit(formData, { method: "POST" });
  };

  const getSortedConfigOptions = () => {
    const container = configOptionsListRef.current;
    if (!container) return configOptions;
    const rows = Array.from(container.querySelectorAll<HTMLElement>(".config-option-row"));
    const sorted = rows
      .map((row) => configOptions.find((item) => item.type === row.dataset.optionType))
      .filter(Boolean) as ConfigOption[];
    return sorted.length > 0 ? sorted : configOptions;
  };

  const measurementUnitOptions = [
    { label: "Centimeters", value: "cm" },
    { label: "inches", value: "in" },
    { label: "Milimetres", value: "mm" },
    { label: "Mètre", value: "m" },
    { label: "Feet", value: "ft" },
  ];
  const showMeasurementOptions = [
    { label: "show both width and height", value: "both" },
    { label: "Do not show measurements", value: "none" },
    { label: "show only height", value: "height" },
    { label: "show only width", value: "width" },
  ];
  const measurementDecimalFormatOptions = [
    { label: "with decimal ", value: "with-decimal" },
    { label: "No decimal", value: "no-decimal" },
  ];
  const positionOptions = [
    { label: "Right", value: "right" },
    { label: "Left", value: "left" },
  ];
  const finishButtonPositions = [
    { label: "Top", value: "top" },
    { label: "Bottom", value: "bottom" },
  ];
  const allowNextButtons = [
    { label: "Yes", value: "yes" },
    { label: "No", value: "no" },
  ];
  const sectionMenu = [
    { id: "config-options", label: "Config Options" },
    { id: "customizer-options", label: "Customizer Options" },
  ];

  if (!isRootPage) {
    return <Outlet context={{ manageFonts: loaderData.manageFonts, manageShapes: loaderData.manageShapes, manageClipartGroups: loaderData.manageClipartGroups, plan: loaderData.plan }} />;
  }

  return (
    <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) 220px", gap: 20, alignItems: "start" }}>
      <div style={{ display: "grid", gap: 16 }}>
        <Card>
          <Box padding="400">
            <Text as="h1" variant="headingLg">Customizer Setup</Text>
            <Box paddingBlockStart="100">
              <Text as="p" tone="subdued">
                Configure the classic customizer behavior in one page, without switching between second-level settings tabs.
              </Text>
            </Box>
          </Box>
        </Card>

        <SectionCard
          id="config-options"
          title="Config Options"
          description="Show, hide and order configuration blocks displayed in the customizer."
        >
          <Box paddingBlockEnd="250">
            <Text as="p" tone="subdued">
              The list order below is the display order used in the customizer. Move items up or down by dragging the rows, then save.
            </Text>
          </Box>
          <div ref={configOptionsListRef} className="config-options-list" style={{ display: "grid", gap: 10 }}>
            {configOptions.map((configOption, index) => (
              <div
                key={configOption.type}
                className="config-option-row"
                data-option-type={configOption.type}
              >
                <Card>
                  <Box padding="300">
                    <InlineStack align="space-between" blockAlign="center" wrap={false}>
                      <InlineStack blockAlign="center" gap="200" wrap={false}>
                        <span
                          className="drag-handle"
                          style={{
                            cursor: "grab",
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: 32,
                            height: 32,
                            borderRadius: 8,
                            border: "1px solid #d1d5db",
                            background: "#ffffff",
                            color: "#6b7280",
                            flexShrink: 0,
                          }}
                          aria-label="Drag to reorder"
                          title="Drag to reorder"
                        >
                          <Icon source={DragHandleIcon} />
                        </span>
                        {optionsIcon(configOption.type)}
                        <div>
                          <Text as="strong" fontWeight="bold" variant="bodyLg">
                            {configOption.type.replace("-", " ").toUpperCase()}
                          </Text>
                          <Text as="p" tone="subdued" variant="bodySm">
                            {configOption.active ? "Visible in the customizer" : "Hidden from the customizer"}
                          </Text>
                        </div>
                      </InlineStack>
                      <Button
                        textAlign="left"
                        icon={<Icon source={configOption.active ? ViewIcon : HideIcon} tone="base" />}
                        onClick={() => {
                          const next = [...configOptions];
                          next[index] = { ...configOption, active: !configOption.active };
                          setConfigOptions(next);
                        }}
                      >
                        {configOption.active ? "Hide option" : "Show option"}
                      </Button>
                    </InlineStack>
                  </Box>
                </Card>
              </div>
            ))}
          </div>
          <SectionSave
            loading={navigation.state === "submitting" && activeSection === "configOptions"}
            onClick={() => submitSection("configOptions", getSortedConfigOptions())}
            label="Save Config Options"
          />
        </SectionCard>

        <SectionCard
          id="customizer-options"
          title="Customizer Options"
          description="Measurement, layout and flow options for the classic customizer."
        >
          <Grid gap={{ lg: "30px" }}>
            <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
              <Select label="Measurement Unit" options={measurementUnitOptions} value={customizerOptions.measurementUnit} onChange={(value) => setCustomizerOptions((current) => ({ ...current, measurementUnit: value }))} />
            </Grid.Cell>
            <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
              <Select label="Show/hide Measurements" options={showMeasurementOptions} value={customizerOptions.showHideMeasurements} onChange={(value) => setCustomizerOptions((current) => ({ ...current, showHideMeasurements: value }))} />
            </Grid.Cell>
            <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
              <Select label="Decimal Format of Measurements" options={measurementDecimalFormatOptions} value={customizerOptions.decimalFormatMeasurements} onChange={(value) => setCustomizerOptions((current) => ({ ...current, decimalFormatMeasurements: value }))} />
            </Grid.Cell>
            <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
              <Select label="Desktop Column Order" options={positionOptions} value={customizerOptions.desktopColumnOrder} onChange={(value) => setCustomizerOptions((current) => ({ ...current, desktopColumnOrder: value }))} />
            </Grid.Cell>
            <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
              <Select label="Finish button position" options={finishButtonPositions} value={customizerOptions.finishButtonPosition || "bottom"} onChange={(value) => setCustomizerOptions((current) => ({ ...current, finishButtonPosition: value }))} />
            </Grid.Cell>
            <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
              <Select label="Allow next button" options={allowNextButtons} value={customizerOptions.allowNextButton ? "yes" : "no"} onChange={(value) => setCustomizerOptions((current) => ({ ...current, allowNextButton: value === "yes" }))} />
            </Grid.Cell>
            <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
              <InlineStack blockAlign="center" gap="200">
                <Text as="p" variant="bodyMd">Show thickness pricing labels in configurator</Text>
                <ToggleButton checked={customizerOptions.showThicknessPricing} onChange={(value) => setCustomizerOptions((current) => ({ ...current, showThicknessPricing: Boolean(value) }))} />
              </InlineStack>
            </Grid.Cell>
          </Grid>
          <SectionSave
            loading={navigation.state === "submitting" && activeSection === "customizerOptions"}
            onClick={() => submitSection("customizerOptions", customizerOptions)}
            label="Save Customizer Options"
          />
        </SectionCard>

      </div>

      <div style={{ position: "sticky", top: 12 }}>
        <Card>
          <Box padding="250">
            <Text as="h2" variant="headingMd">Section Menu</Text>
            <Box paddingBlockStart="150">
              <div style={{ display: "grid", gap: 8 }}>
                {sectionMenu.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    style={{
                      textDecoration: "none",
                      color: "#111827",
                      border: "1px solid #e5e7eb",
                      borderRadius: 10,
                      padding: "8px 10px",
                      background: "#ffffff",
                      fontSize: 13,
                      fontWeight: 600,
                      lineHeight: 1.2,
                      textAlign: "left",
                      cursor: "pointer",
                      display: "block",
                    }}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </Box>
          </Box>
        </Card>
      </div>
    </div>
  );
}
