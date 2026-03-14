import { json } from "@remix-run/node";
import type { ActionFunctionArgs } from "@remix-run/node";
import { useNavigation, useOutletContext, useSubmit } from "@remix-run/react";
import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import {
  Box,
  Button,
  Card,
  Divider,
  Select,
  Text,
  TextField,
} from "@shopify/polaris";
import ConfigSettingsService from "~/models/ConfigSetttings.service";
import { authenticate } from "~/shopify.server";
import { jFlashMessage } from "~/utils/message-flash";
import RequestQuoteSettingsSection from "~/components/settings/RequestQuoteSettingsSection";
import ModeSettingsSection from "~/components/settings/ModeSettingsSection";
import ProductSettingsSection from "~/components/settings/ProductSettingsSection";

type YesNo = "true" | "false";

const toYesNo = (value: boolean): YesNo => (value ? "true" : "false");
const fromYesNo = (value: string): boolean => value === "true";

const boolOptions = [
  { label: "Yes", value: "true" },
  { label: "No", value: "false" },
];

const sanitizeCustomizerSettings = (raw: any = {}) => {
  const measurementUnit = ["cm", "in", "both"].includes(raw?.measurementUnit)
    ? raw.measurementUnit
    : "cm";
  const showHideMeasurements = [
    "both",
    "nothing",
    "only-height",
    "only-width",
  ].includes(raw?.showHideMeasurements)
    ? raw.showHideMeasurements
    : "both";
  const decimalFormatMeasurements = ["decimal", "no-decimal"].includes(
    raw?.decimalFormatMeasurements,
  )
    ? raw.decimalFormatMeasurements
    : "no-decimal";
  const destokColumnOrder = ["right", "left"].includes(raw?.destokColumnOrder)
    ? raw.destokColumnOrder
    : "right";
  const displayOptions = ["name", "both"].includes(raw?.displayOptions)
    ? raw.displayOptions
    : "name";
  const discount = ["none", "percent", "fixed"].includes(raw?.discount)
    ? raw.discount
    : "none";
  const defaultTextAlign = ["left", "center", "right"].includes(
    raw?.defaultTextAlign,
  )
    ? raw.defaultTextAlign
    : "center";
  const displayPriceBeforeFinishBotton = ["hide", "show"].includes(
    raw?.displayPriceBeforeFinishBotton,
  )
    ? raw.displayPriceBeforeFinishBotton
    : "hide";
  const discountValue = Number(raw?.discountValue);

  return {
    measurementUnit,
    showHideMeasurements,
    decimalFormatMeasurements,
    destokColumnOrder,
    shadowSwitch:
      raw?.shadowSwitch === undefined ? true : Boolean(raw.shadowSwitch),
    defaultGlowSwitch: raw?.defaultGlowSwitch === "off" ? "off" : "on",
    showDayNightButton:
      raw?.showDayNightButton === undefined
        ? true
        : Boolean(raw.showDayNightButton),
    useExampleIcon:
      raw?.useExampleIcon === undefined ? true : Boolean(raw.useExampleIcon),
    exampleText:
      typeof raw?.exampleText === "string" && raw.exampleText.length > 0
        ? raw.exampleText
        : "Example",
    showExampleOnHover: Boolean(raw?.showExampleOnHover),
    showColorNameOnHover: Boolean(raw?.showColorNameOnHover),
    discount,
    discountValue: Number.isFinite(discountValue) ? discountValue : 0,
    displayOptions,
    displayPriceBeforeFinishBotton,
    showNumberedSelections: Boolean(raw?.showNumberedSelections),
    showTextAlign:
      raw?.showTextAlign === undefined ? true : Boolean(raw.showTextAlign),
    defaultTextAlign,
  };
};

const sanitizeProductSettings = (raw: any = {}) => ({
  designFromScratch:
    raw?.designFromScratch === undefined ? true : Boolean(raw.designFromScratch),
  redirectAfterAddingToCart:
    raw?.redirectAfterAddingToCart !== undefined
      ? Boolean(raw.redirectAfterAddingToCart)
      : raw?.redirectAfterAddToCart !== undefined
        ? Boolean(raw.redirectAfterAddToCart)
        : true,
  redirectToCheckOutPage: Boolean(raw?.redirectToCheckOutPage),
  hideAddToCartButtonOnShopPage: Boolean(raw?.hideAddToCartButtonOnShopPage),
  hidePricing: Boolean(raw?.hidePricing),
  showRecapAfterFinish:
    raw?.showRecapAfterFinish === undefined
      ? true
      : Boolean(raw.showRecapAfterFinish),
  uploadFileOnFinish: Boolean(raw?.uploadFileOnFinish),
});

const normalizeModeSettings = (raw: any) => {
  const type = raw?.type === "multi" ? "multi" : "simple";
  const shareAndSave = {
    allowShare: Boolean(raw?.shareAndSave?.allowShare),
    allowSave: Boolean(raw?.shareAndSave?.allowSave),
    shareSignLocation:
      raw?.shareAndSave?.shareSignLocation === "review_only"
        ? "review_only"
        : "options_review",
  };

  return {
    type,
    allowMultiFonts: Boolean(raw?.allowMultiFonts),
    allowMultiColors: Boolean(raw?.allowMultiColors),
    shareAndSave,
  };
};

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const { session } = await authenticate.admin(request);
  const configId = Number(params.configId || "");

  if (!Number.isFinite(configId)) {
    return json({ ok: false }, { status: 400 });
  }

  const formData = await request.formData();
  const sections = [
    "customizer",
    "product",
    "output",
    "mobile",
    "requestQuote",
    "mode",
  ];

  for (const section of sections) {
    const raw = formData.get(section);
    if (!raw || typeof raw !== "string") continue;

    try {
      const parsedValue = JSON.parse(raw);
      const value =
        section === "customizer"
          ? sanitizeCustomizerSettings(parsedValue)
          : section === "product"
            ? sanitizeProductSettings(parsedValue)
          : parsedValue;
      await ConfigSettingsService.updateSettingsSection(
        configId,
        session.id,
        "generals",
        section,
        value,
      );

      return json({
        ok: true,
        section,
        ...jFlashMessage(`${section} settings updated successfully`),
      });
    } catch (error) {
      return json(
        { ok: false, section, error: String(error) },
        { status: 400 },
      );
    }
  }

  return json(
    { ok: false, error: "No section payload received" },
    { status: 400 },
  );
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

export default function ConfigSettingsGeneral() {
  const submit = useSubmit();
  const navigation = useNavigation();
  const { configuration, ncpcData } = useOutletContext<any>();
  const saving = navigation.state === "submitting";
  const productType =
    configuration?.productType === "channel" ? "channel" : "neon";
  const currencySymbol =
    ncpcData?.currencySymbol ||
    ncpcData?.settings?.currencySymbol ||
    configuration?.data?.currencySymbol ||
    "$";

  const defaultManufacturerTemplate = useMemo(() => {
    if (productType === "neon") {
      return '{{#product}}\n<p><br>\n<b>Text:</b> {{ncpc_text}}<br>\n<b>Alignment:</b> {{ncpc_text_align}}<br>\n<b>Font:</b> {{ncpc_font_family}}<br>\n<b>Size:</b> {{ncpc_size}}<br>\n<b>Colour:</b> {{ncpc_neon_color}}<br>\n<b>Backboard:</b> {{ncpc_backboard}}<br>\n<b>Backboard Colour:</b> {{ncpc_backboard_color}}<br>\n<b>Material:</b> {{ncpc_material}}<br>\n<b>Jacket:</b> {{ncpc_jacket}}<br>\n<b>Mounting:</b> {{ncpc_mounting}}<br>\n{{#additional_options}}<b>{{label}}:</b> {{value}}<br>{{/additional_options}}\n <img src="{{ncpc_preview_img}}"><br><br>\n{{#svgPreviewLink}}\n<b>SVG:</b> <a href="{{ncpc_svg_data}}" target="_blank">Link</a><br>\n{{/svgPreviewLink}}</p>\n{{/products}}<br><b>Name:</b> {{shipping_adddress.name}} <br>\n<b>Phone:</b> {{shipping_adddress.phone}} <br>\n<b>Address:</b> {{shipping_adddress.address1}} {{shipping_adddress.address2}} {{shipping_adddress.city}} {{shipping_adddress.country}} <br>\n<b>Shipping option:</b> {{shippingLine}} <br>\n<b>Email:</b> {{email}} <br>';
    }

    return '{{#product}}\n<p><br>\n<b>Text:</b> {{ncpc_text}}<br>\n<b>Alignment:</b> {{ncpc_text_align}}<br>\n<b>Font:</b> {{ncpc_font_family}}<br>\n<b>Size:</b> {{ncpc_size}}<br>\n<b>Letter Type:</b> {{ncpc_letter_type}}<br>\n<b>Face Color:</b> {{ncpc_face}}<br>\n<br>\n<b>Trim Color:</b> {{ncpc_trim}}<br>\n<br>\n<b>Side Color:</b> {{ncpc_side}}<br>\n<br>\n<b>Back Lit Color:</b> {{ncpc_back_lit}}<br>\n<br>\n<b>Backboard:</b> {{ncpc_backboard}}<br>\n<b>Backboard Colour:</b> {{ncpc_backboard_color}}<br>\n<b>Material:</b> {{ncpc_material}}<br>\n<b>Jacket:</b> {{ncpc_jacket}}<br>\n<b>Mounting:</b> {{ncpc_mounting}}<br>\n{{#additional_options}}<b>{{label}}:</b> {{value}}<br>\n{{/additional_options}} <img src="{{ncpc_preview_img}}"><br>\n<br>\n{{#svgPreviewLink}}<b>SVG:</b> <a href="{{ncpc_svg_data}}" target="_blank">Link</a><br>\n{{/svgPreviewLink}}</p>{{/products}}<br>\n<b>Name:</b> {{shipping_adddress.name}} <br>\n<b>Phone:</b> {{shipping_adddress.phone}} <br>\n<b>Address:</b> {{shipping_adddress.address1}} {{shipping_adddress.address2}} {{shipping_adddress.city}} {{shipping_adddress.country}} <br>\n<b>Shipping option:</b> {{shippingLine}} <br>\n<b>Email:</b> {{email}} <br>\n{{/product}}';
  }, [productType]);

  const [customizer, setCustomizer] = useState<any>(sanitizeCustomizerSettings());

  const [product, setProduct] = useState<any>(sanitizeProductSettings());

  const [output, setOutput] = useState<any>({
    fileFormat: "svg",
    manufacturerEmail: {
      sendDesignByEmail: true,
      receiverEmail: [],
      subject: "New order for Manufacturer",
      emailTemplate: "",
    },
  });

  const [mobile, setMobile] = useState<any>({
    showNavigatorMenu: "off",
    showNavigationMenuFirst: "yes",
    mobileSelectionOptionsDisplay: "horizontally-stack",
  });

  const [requestQuote, setRequestQuote] = useState<any>({
    enableRequestQuote: false,
    receiversEmail: [],
    sendToCustomer: false,
    allowUploadFiles: false,
    acceptExtensions: [".jpg", ".png", ".svg", ".pdf"],
    maxFileSize: 10,
    maxFilesNumber: 5,
    emailSubject: "Request A Quote",
  });

  const [mode, setMode] = useState<any>({
    type: "simple",
    allowMultiFonts: false,
    allowMultiColors: false,
    shareAndSave: {
      allowShare: false,
      shareSignLocation: "options_review",
      allowSave: false,
    },
  });

  useEffect(() => {
    const generals = configuration?.data?.settings?.generals || {};

    setCustomizer(sanitizeCustomizerSettings(generals.customizer || {}));
    setProduct(sanitizeProductSettings(generals.product || {}));
    setOutput((prev: any) => ({ ...prev, ...(generals.output || {}) }));
    setMobile((prev: any) => ({ ...prev, ...(generals.mobile || {}) }));
    setRequestQuote((prev: any) => ({
      ...prev,
      ...(generals.requestQuote || {}),
    }));
    setMode((prev: any) => ({
      ...prev,
      ...normalizeModeSettings(generals.mode || {}),
    }));
  }, [configuration]);

  useEffect(() => {
    setOutput((prev: any) => ({
      ...prev,
      manufacturerEmail: {
        ...(prev.manufacturerEmail || {}),
        emailTemplate:
          prev.manufacturerEmail?.emailTemplate || defaultManufacturerTemplate,
      },
    }));
  }, [defaultManufacturerTemplate]);

  const submitSection = (section: string, value: any) => {
    const sanitizedValue =
      section === "customizer"
        ? sanitizeCustomizerSettings(value)
        : section === "product"
          ? sanitizeProductSettings(value)
          : value;

    submit({ [section]: JSON.stringify(sanitizedValue) }, { method: "POST" });
  };

  const customizerGridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: 12,
  } as const;

  return (
    <Box paddingBlockEnd="400">
      <SectionShell
        title="Customizer"
        description="General behavior, measurements and display controls."
        saving={saving}
        onSave={() => submitSection("customizer", customizer)}
      >
        <div style={customizerGridStyle}>
          <Select
            label="Measurement Unit"
            helpText="Choose the measurement unit used by the customizer."
            options={[
              { label: "Centimeters", value: "cm" },
              { label: "Inches", value: "in" },
              { label: "Both Centimeters and Inches", value: "both" },
            ]}
            value={customizer.measurementUnit || "cm"}
            onChange={(value) =>
              setCustomizer((prev: any) => ({
                ...prev,
                measurementUnit: value,
              }))
            }
          />
          <Select
            label="Show/Hide Measurements"
            helpText="Control whether width, height or both measurements are shown."
            options={[
              { label: "Show both width and height", value: "both" },
              { label: "Do not show measurements", value: "nothing" },
              { label: "Only show height", value: "only-height" },
              { label: "Only show width", value: "only-width" },
            ]}
            value={customizer.showHideMeasurements || "both"}
            onChange={(value) =>
              setCustomizer((prev: any) => ({
                ...prev,
                showHideMeasurements: value,
              }))
            }
          />
          <Select
            label="Decimal Format Measurements"
            helpText="Choose whether measurements should include decimals."
            options={[
              { label: "With decimal", value: "decimal" },
              { label: "No Decimal", value: "no-decimal" },
            ]}
            value={customizer.decimalFormatMeasurements || "no-decimal"}
            onChange={(value) =>
              setCustomizer((prev: any) => ({
                ...prev,
                decimalFormatMeasurements: value,
              }))
            }
          />
          <Select
            label="Desktop Column Order"
            helpText="Choose whether the option panel should sit on the left or right on desktop."
            options={[
              { label: "Right", value: "right" },
              { label: "Left", value: "left" },
            ]}
            value={customizer.destokColumnOrder || "right"}
            onChange={(value) =>
              setCustomizer((prev: any) => ({
                ...prev,
                destokColumnOrder: value,
              }))
            }
          />
          <Select
            label="Shadow Switch"
            helpText="Display a switch to turn shadow on or off on the sign."
            options={boolOptions}
            value={toYesNo(Boolean(customizer.shadowSwitch))}
            onChange={(value) =>
              setCustomizer((prev: any) => ({
                ...prev,
                shadowSwitch: fromYesNo(value),
              }))
            }
          />
          <Select
            label="Default Glow Switch Value"
            helpText="Set the glow switch state when the customizer first loads."
            options={[
              { label: "On", value: "on" },
              { label: "Off", value: "off" },
            ]}
            value={customizer.defaultGlowSwitch || "on"}
            onChange={(value) =>
              setCustomizer((prev: any) => ({
                ...prev,
                defaultGlowSwitch: value,
              }))
            }
          />
          <Select
            label="Show Day/Night Button"
            helpText="Display a switch to toggle the default background between day and night."
            options={boolOptions}
            value={toYesNo(Boolean(customizer.showDayNightButton))}
            onChange={(value) =>
              setCustomizer((prev: any) => ({
                ...prev,
                showDayNightButton: fromYesNo(value),
              }))
            }
          />
          <Select
            label="Display Example Icon"
            helpText="Choose whether the example entry should be displayed as an icon or text."
            options={boolOptions}
            value={toYesNo(Boolean(customizer.useExampleIcon))}
            onChange={(value) =>
              setCustomizer((prev: any) => ({
                ...prev,
                useExampleIcon: fromYesNo(value),
              }))
            }
          />
          {!customizer.useExampleIcon ? (
            <TextField
              label="Example Text"
              autoComplete="off"
              helpText="Text to display when the example icon is disabled."
              value={String(customizer.exampleText || "")}
              onChange={(value) =>
                setCustomizer((prev: any) => ({ ...prev, exampleText: value }))
              }
            />
          ) : (
            <div />
          )}
          <Select
            label="Show Example On Hover"
            helpText="Display the example preview only when the customer hovers the trigger."
            options={boolOptions}
            value={toYesNo(Boolean(customizer.showExampleOnHover))}
            onChange={(value) =>
              setCustomizer((prev: any) => ({
                ...prev,
                showExampleOnHover: fromYesNo(value),
              }))
            }
          />
          <Select
            label="Show Color Name On Hover"
            helpText="Display the color name tooltip only on hover."
            options={boolOptions}
            value={toYesNo(Boolean(customizer.showColorNameOnHover))}
            onChange={(value) =>
              setCustomizer((prev: any) => ({
                ...prev,
                showColorNameOnHover: fromYesNo(value),
              }))
            }
          />
          <Select
            label="Display Options"
            helpText="Choose how option values are displayed inside the customizer."
            options={[
              { label: "Option Name", value: "name" },
              { label: "Option image and name", value: "both" },
            ]}
            value={customizer.displayOptions || "name"}
            onChange={(value) =>
              setCustomizer((prev: any) => ({ ...prev, displayOptions: value }))
            }
          />
          <Select
            label="Discount"
            helpText="Apply a discount to the total product price."
            options={[
              { label: "None", value: "none" },
              { label: "Percentage", value: "percent" },
              { label: "Fixed", value: "fixed" },
            ]}
            value={customizer.discount || "none"}
            onChange={(value) =>
              setCustomizer((prev: any) => ({ ...prev, discount: value }))
            }
          />
          {(customizer.discount || "none") !== "none" ? (
            <TextField
              label={
                (customizer.discount || "none") === "percent"
                  ? "Discount Percentage"
                  : "Discount Fixed Amount"
              }
              type="number"
              autoComplete="off"
              prefix={(customizer.discount || "none") === "fixed" ? currencySymbol : undefined}
              suffix={(customizer.discount || "none") === "percent" ? "%" : undefined}
              value={String(customizer.discountValue ?? 0)}
              onChange={(value) =>
                setCustomizer((prev: any) => ({
                  ...prev,
                  discountValue: Number(value || 0),
                }))
              }
            />
          ) : (
            <div />
          )}
          <Select
            label="Default Text Align"
            helpText="Choose the default text alignment on first load."
            options={[
              { label: "Left", value: "left" },
              { label: "Center", value: "center" },
              { label: "Right", value: "right" },
            ]}
            value={customizer.defaultTextAlign || "center"}
            onChange={(value) =>
              setCustomizer((prev: any) => ({
                ...prev,
                defaultTextAlign: value,
              }))
            }
          />
          <Select
            label="Show Text Align"
            helpText="Show or hide the text alignment control in the customizer."
            options={boolOptions}
            value={toYesNo(
              customizer.showTextAlign === undefined ? true : Boolean(customizer.showTextAlign),
            )}
            onChange={(value) =>
              setCustomizer((prev: any) => ({
                ...prev,
                showTextAlign: fromYesNo(value),
              }))
            }
          />
          <Select
            label="Display Price Before Finish Button"
            helpText="Show the price block before the finish button."
            options={[
              { label: "Hide", value: "hide" },
              { label: "Show", value: "show" },
            ]}
            value={customizer.displayPriceBeforeFinishBotton || "hide"}
            onChange={(value) =>
              setCustomizer((prev: any) => ({
                ...prev,
                displayPriceBeforeFinishBotton: value,
              }))
            }
          />
          <Select
            label="Show Numbered Selections"
            helpText="Display numbered steps or selections inside the customizer."
            options={boolOptions}
            value={toYesNo(Boolean(customizer.showNumberedSelections))}
            onChange={(value) =>
              setCustomizer((prev: any) => ({
                ...prev,
                showNumberedSelections: fromYesNo(value),
              }))
            }
          />
        </div>
      </SectionShell>

      <ProductSettingsSection
        value={product}
        onChange={setProduct}
        saving={saving}
        onSave={() => submitSection("product", product)}
      />

      <SectionShell
        title="Output"
        description="Output files and manufacturer email behavior."
        saving={saving}
        onSave={() => submitSection("output", output)}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            gap: 12,
          }}
        >
          <Select
            label="Output File Format"
            options={[
              { label: "SVG", value: "svg" },
              { label: "DXF", value: "dxf" },
              { label: "SVG+DXF", value: "svg+dxf" },
            ]}
            value={output.fileFormat || "svg"}
            onChange={(value) =>
              setOutput((prev: any) => ({ ...prev, fileFormat: value }))
            }
          />
          <Select
            label="Send Design By Email"
            options={boolOptions}
            value={toYesNo(
              Boolean(output.manufacturerEmail?.sendDesignByEmail),
            )}
            onChange={(value) =>
              setOutput((prev: any) => ({
                ...prev,
                manufacturerEmail: {
                  ...(prev.manufacturerEmail || {}),
                  sendDesignByEmail: fromYesNo(value),
                },
              }))
            }
          />
          <TextField
            label="Receiver Email(s)"
            autoComplete="off"
            value={(output.manufacturerEmail?.receiverEmail || []).join(", ")}
            onChange={(value) =>
              setOutput((prev: any) => ({
                ...prev,
                manufacturerEmail: {
                  ...(prev.manufacturerEmail || {}),
                  receiverEmail: value
                    .split(",")
                    .map((item) => item.trim())
                    .filter(Boolean),
                },
              }))
            }
          />
          <TextField
            label="Email Subject"
            autoComplete="off"
            value={String(output.manufacturerEmail?.subject || "")}
            onChange={(value) =>
              setOutput((prev: any) => ({
                ...prev,
                manufacturerEmail: {
                  ...(prev.manufacturerEmail || {}),
                  subject: value,
                },
              }))
            }
          />
        </div>
        <Box paddingBlockStart="200">
          <TextField
            label="Manufacturer Email Template"
            autoComplete="off"
            multiline={6}
            value={String(output.manufacturerEmail?.emailTemplate || "")}
            onChange={(value) =>
              setOutput((prev: any) => ({
                ...prev,
                manufacturerEmail: {
                  ...(prev.manufacturerEmail || {}),
                  emailTemplate: value,
                },
              }))
            }
          />
        </Box>
      </SectionShell>

      <SectionShell
        title="Mobile"
        description="Mobile navigation and selection layout."
        saving={saving}
        onSave={() => submitSection("mobile", mobile)}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            gap: 12,
          }}
        >
          <Select
            label="Show Navigation Menu"
            options={[
              { label: "Off", value: "off" },
              { label: "On", value: "on" },
            ]}
            value={mobile.showNavigatorMenu || "off"}
            onChange={(value) =>
              setMobile((prev: any) => ({ ...prev, showNavigatorMenu: value }))
            }
          />
          <Select
            label="Show Navigation Menu First"
            options={[
              { label: "Yes", value: "yes" },
              { label: "No", value: "no" },
            ]}
            value={mobile.showNavigationMenuFirst || "yes"}
            onChange={(value) =>
              setMobile((prev: any) => ({
                ...prev,
                showNavigationMenuFirst: value,
              }))
            }
          />
          <Select
            label="Mobile Selection Options Display"
            options={[
              { label: "Horizontally Stack", value: "horizontally-stack" },
              { label: "Scroll", value: "scroll" },
            ]}
            value={mobile.mobileSelectionOptionsDisplay || "horizontally-stack"}
            onChange={(value) =>
              setMobile((prev: any) => ({
                ...prev,
                mobileSelectionOptionsDisplay: value,
              }))
            }
          />
        </div>
      </SectionShell>

      <Box paddingBlockStart="300">
        <RequestQuoteSettingsSection
          value={requestQuote}
          saving={saving}
          onChange={setRequestQuote}
          onSave={() => submitSection("requestQuote", requestQuote)}
        />
      </Box>

      <Box paddingBlockStart="300">
        <ModeSettingsSection
          value={mode}
          saving={saving}
          supportsMultiMode={productType === "neon" || productType === "channel"}
          onChange={setMode}
          onSave={() => submitSection("mode", mode)}
        />
      </Box>

      <Box paddingBlockStart="300">
        <Divider borderWidth="025" />
      </Box>
    </Box>
  );
}
