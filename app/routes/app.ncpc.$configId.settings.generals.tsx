import { json } from "@remix-run/node";
import type { ActionFunctionArgs } from "@remix-run/node";
import { useNavigation, useOutletContext, useSubmit } from "@remix-run/react";
import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { Box, Button, Card, Divider, Select, Text, TextField } from "@shopify/polaris";
import ConfigSettingsService from "~/models/ConfigSetttings.service";
import { authenticate } from "~/shopify.server";
import { jFlashMessage } from "~/utils/message-flash";

type YesNo = "true" | "false";

const toYesNo = (value: boolean): YesNo => (value ? "true" : "false");
const fromYesNo = (value: string): boolean => value === "true";

const boolOptions = [
  { label: "Yes", value: "true" },
  { label: "No", value: "false" },
];

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
  const sections = ["customizer", "product", "output", "mobile", "requestQuote", "mode"];

  for (const section of sections) {
    const raw = formData.get(section);
    if (!raw || typeof raw !== "string") continue;

    try {
      const value = JSON.parse(raw);
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
      return json({ ok: false, section, error: String(error) }, { status: 400 });
    }
  }

  return json({ ok: false, error: "No section payload received" }, { status: 400 });
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
  const { configuration } = useOutletContext<any>();
  const saving = navigation.state === "submitting";
  const productType = configuration?.productType === "channel" ? "channel" : "neon";

  const defaultManufacturerTemplate = useMemo(() => {
    if (productType === "neon") {
      return '{{#product}}\n<p><br>\n<b>Text:</b> {{ncpc_text}}<br>\n<b>Alignment:</b> {{ncpc_text_align}}<br>\n<b>Font:</b> {{ncpc_font_family}}<br>\n<b>Size:</b> {{ncpc_size}}<br>\n<b>Colour:</b> {{ncpc_neon_color}}<br>\n<b>Backboard:</b> {{ncpc_backboard}}<br>\n<b>Backboard Colour:</b> {{ncpc_backboard_color}}<br>\n<b>Material:</b> {{ncpc_material}}<br>\n<b>Jacket:</b> {{ncpc_jacket}}<br>\n<b>Mounting:</b> {{ncpc_mounting}}<br>\n{{#additional_options}}<b>{{label}}:</b> {{value}}<br>{{/additional_options}}\n <img src="{{ncpc_preview_img}}"><br><br>\n{{#svgPreviewLink}}\n<b>SVG:</b> <a href="{{ncpc_svg_data}}" target="_blank">Link</a><br>\n{{/svgPreviewLink}}</p>\n{{/products}}<br><b>Name:</b> {{shipping_adddress.name}} <br>\n<b>Phone:</b> {{shipping_adddress.phone}} <br>\n<b>Address:</b> {{shipping_adddress.address1}} {{shipping_adddress.address2}} {{shipping_adddress.city}} {{shipping_adddress.country}} <br>\n<b>Shipping option:</b> {{shippingLine}} <br>\n<b>Email:</b> {{email}} <br>';
    }

    return '{{#product}}\n<p><br>\n<b>Text:</b> {{ncpc_text}}<br>\n<b>Alignment:</b> {{ncpc_text_align}}<br>\n<b>Font:</b> {{ncpc_font_family}}<br>\n<b>Size:</b> {{ncpc_size}}<br>\n<b>Letter Type:</b> {{ncpc_letter_type}}<br>\n<b>Face Color:</b> {{ncpc_face}}<br>\n<br>\n<b>Trim Color:</b> {{ncpc_trim}}<br>\n<br>\n<b>Side Color:</b> {{ncpc_side}}<br>\n<br>\n<b>Back Lit Color:</b> {{ncpc_back_lit}}<br>\n<br>\n<b>Backboard:</b> {{ncpc_backboard}}<br>\n<b>Backboard Colour:</b> {{ncpc_backboard_color}}<br>\n<b>Material:</b> {{ncpc_material}}<br>\n<b>Jacket:</b> {{ncpc_jacket}}<br>\n<b>Mounting:</b> {{ncpc_mounting}}<br>\n{{#additional_options}}<b>{{label}}:</b> {{value}}<br>\n{{/additional_options}} <img src="{{ncpc_preview_img}}"><br>\n<br>\n{{#svgPreviewLink}}<b>SVG:</b> <a href="{{ncpc_svg_data}}" target="_blank">Link</a><br>\n{{/svgPreviewLink}}</p>{{/products}}<br>\n<b>Name:</b> {{shipping_adddress.name}} <br>\n<b>Phone:</b> {{shipping_adddress.phone}} <br>\n<b>Address:</b> {{shipping_adddress.address1}} {{shipping_adddress.address2}} {{shipping_adddress.city}} {{shipping_adddress.country}} <br>\n<b>Shipping option:</b> {{shippingLine}} <br>\n<b>Email:</b> {{email}} <br>\n{{/product}}';
  }, [productType]);

  const [customizer, setCustomizer] = useState<any>({
    measurementUnit: "cm",
    showHideMeasurements: "both",
    decimalFormatMeasurements: "no-decimal",
    fontFamilyName: "",
    priceStartOptions: "at-zero",
    priceMeasurementAnimation: "on",
    destokColumnOrder: "right",
    glowSwitch: "glow-only",
    displayOptions: "name",
    shadowSwitch: true,
    showDayNightButton: true,
    useExampleIcon: true,
    exampleText: "Example",
    showExampleOnHover: false,
    discount: "none",
    discountValue: 0,
    displayPriceBeforeFinishBotton: "hide",
    textAlignment: "display-alignment",
  });

  const [product, setProduct] = useState<any>({
    enableAddToCart: true,
    redirectAfterAddToCart: true,
    redirectToCheckOutPage: false,
    displayRecapsOnCheckout: false,
    hideAddToCartButtonCustomProducts: true,
    hideDesignButtonsOnShopPage: false,
    hideAddToCartButtonOnShopPage: true,
  });

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

    setCustomizer((prev: any) => ({ ...prev, ...(generals.customizer || {}) }));
    setProduct((prev: any) => ({ ...prev, ...(generals.product || {}) }));
    setOutput((prev: any) => ({ ...prev, ...(generals.output || {}) }));
    setMobile((prev: any) => ({ ...prev, ...(generals.mobile || {}) }));
    setRequestQuote((prev: any) => ({ ...prev, ...(generals.requestQuote || {}) }));
    setMode((prev: any) => ({ ...prev, ...normalizeModeSettings(generals.mode || {}) }));
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
    submit({ [section]: JSON.stringify(value) }, { method: "POST" });
  };

  return (
    <Box paddingBlockEnd="400">
      <SectionShell
        title="Customizer"
        description="General behavior, measurements and display controls."
        saving={saving}
        onSave={() => submitSection("customizer", customizer)}
      >
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 12 }}>
          <Select
            label="Measurement Unit"
            options={[
              { label: "Centimeters", value: "cm" },
              { label: "Inches", value: "in" },
              { label: "Both", value: "both" },
            ]}
            value={customizer.measurementUnit || "cm"}
            onChange={(value) => setCustomizer((prev: any) => ({ ...prev, measurementUnit: value }))}
          />
          <Select
            label="Show/Hide Measurements"
            options={[
              { label: "show both width and height", value: "both" },
              { label: "Do not show measurements", value: "nothing" },
              { label: "Only show height", value: "only-height" },
              { label: "Only show width", value: "only-width" },
            ]}
            value={customizer.showHideMeasurements || "both"}
            onChange={(value) =>
              setCustomizer((prev: any) => ({ ...prev, showHideMeasurements: value }))
            }
          />
          <Select
            label="Decimal Format Measurements"
            options={[
              { label: "Decimal", value: "decimal" },
              { label: "No Decimal", value: "no-decimal" },
            ]}
            value={customizer.decimalFormatMeasurements || "no-decimal"}
            onChange={(value) =>
              setCustomizer((prev: any) => ({ ...prev, decimalFormatMeasurements: value }))
            }
          />
          <Select
            label="Desktop Column Order"
            options={[
              { label: "Right", value: "right" },
              { label: "Left", value: "left" },
            ]}
            value={customizer.destokColumnOrder || "right"}
            onChange={(value) => setCustomizer((prev: any) => ({ ...prev, destokColumnOrder: value }))}
          />
          <Select
            label="Display Options"
            options={[
              { label: "Option Name", value: "name" },
              { label: "Option image and name", value: "both" },
            ]}
            value={customizer.displayOptions || "name"}
            onChange={(value) => setCustomizer((prev: any) => ({ ...prev, displayOptions: value }))}
          />
          <Select
            label="Discount"
            options={[
              { label: "None", value: "none" },
              { label: "Percentage", value: "percent" },
              { label: "Fixed", value: "fixed" },
            ]}
            value={customizer.discount || "none"}
            onChange={(value) => setCustomizer((prev: any) => ({ ...prev, discount: value }))}
          />
          {(customizer.discount || "none") !== "none" ? (
            <TextField
              label="Discount Value"
              type="number"
              autoComplete="off"
              value={String(customizer.discountValue ?? 0)}
              onChange={(value) =>
                setCustomizer((prev: any) => ({ ...prev, discountValue: Number(value || 0) }))
              }
            />
          ) : (
            <div />
          )}
          <TextField
            label="Example Text"
            autoComplete="off"
            value={String(customizer.exampleText || "")}
            onChange={(value) => setCustomizer((prev: any) => ({ ...prev, exampleText: value }))}
          />
          <Select
            label="Shadow Button Switch"
            options={boolOptions}
            value={toYesNo(Boolean(customizer.shadowSwitch))}
            onChange={(value) =>
              setCustomizer((prev: any) => ({ ...prev, shadowSwitch: fromYesNo(value) }))
            }
          />
          <Select
            label="Show Day/Night Button"
            options={boolOptions}
            value={toYesNo(Boolean(customizer.showDayNightButton))}
            onChange={(value) =>
              setCustomizer((prev: any) => ({ ...prev, showDayNightButton: fromYesNo(value) }))
            }
          />
          <Select
            label="Display Example Icon"
            options={boolOptions}
            value={toYesNo(Boolean(customizer.useExampleIcon))}
            onChange={(value) =>
              setCustomizer((prev: any) => ({ ...prev, useExampleIcon: fromYesNo(value) }))
            }
          />
          <Select
            label="Show Example On Hover"
            options={boolOptions}
            value={toYesNo(Boolean(customizer.showExampleOnHover))}
            onChange={(value) =>
              setCustomizer((prev: any) => ({ ...prev, showExampleOnHover: fromYesNo(value) }))
            }
          />
          <Select
            label="Display Price Before Finish Button"
            options={[
              { label: "Hide", value: "hide" },
              { label: "Show", value: "show" },
            ]}
            value={customizer.displayPriceBeforeFinishBotton || "hide"}
            onChange={(value) =>
              setCustomizer((prev: any) => ({ ...prev, displayPriceBeforeFinishBotton: value }))
            }
          />
        </div>
      </SectionShell>

      <SectionShell
        title="Product"
        description="Add-to-cart and storefront behavior settings."
        saving={saving}
        onSave={() => submitSection("product", product)}
      >
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 12 }}>
          <Select
            label="Enable Add To Cart"
            options={boolOptions}
            value={toYesNo(Boolean(product.enableAddToCart))}
            onChange={(value) =>
              setProduct((prev: any) => ({ ...prev, enableAddToCart: fromYesNo(value) }))
            }
          />
          <Select
            label="Redirect After Add To Cart"
            options={boolOptions}
            value={toYesNo(Boolean(product.redirectAfterAddToCart))}
            onChange={(value) =>
              setProduct((prev: any) => ({ ...prev, redirectAfterAddToCart: fromYesNo(value) }))
            }
          />
          <Select
            label="Redirect To Checkout"
            options={boolOptions}
            value={toYesNo(Boolean(product.redirectToCheckOutPage))}
            onChange={(value) =>
              setProduct((prev: any) => ({ ...prev, redirectToCheckOutPage: fromYesNo(value) }))
            }
          />
          <Select
            label="Display Recaps On Checkout"
            options={boolOptions}
            value={toYesNo(Boolean(product.displayRecapsOnCheckout))}
            onChange={(value) =>
              setProduct((prev: any) => ({ ...prev, displayRecapsOnCheckout: fromYesNo(value) }))
            }
          />
          <Select
            label="Hide Add To Cart (Custom Products)"
            options={boolOptions}
            value={toYesNo(Boolean(product.hideAddToCartButtonCustomProducts))}
            onChange={(value) =>
              setProduct((prev: any) => ({
                ...prev,
                hideAddToCartButtonCustomProducts: fromYesNo(value),
              }))
            }
          />
          <Select
            label="Hide Design Buttons On Shop"
            options={boolOptions}
            value={toYesNo(Boolean(product.hideDesignButtonsOnShopPage))}
            onChange={(value) =>
              setProduct((prev: any) => ({ ...prev, hideDesignButtonsOnShopPage: fromYesNo(value) }))
            }
          />
          <Select
            label="Hide Add To Cart On Shop"
            options={boolOptions}
            value={toYesNo(Boolean(product.hideAddToCartButtonOnShopPage))}
            onChange={(value) =>
              setProduct((prev: any) => ({ ...prev, hideAddToCartButtonOnShopPage: fromYesNo(value) }))
            }
          />
        </div>
      </SectionShell>

      <SectionShell
        title="Output"
        description="Output files and manufacturer email behavior."
        saving={saving}
        onSave={() => submitSection("output", output)}
      >
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 12 }}>
          <Select
            label="Output File Format"
            options={[{ label: "SVG", value: "svg" }]}
            value={output.fileFormat || "svg"}
            onChange={(value) => setOutput((prev: any) => ({ ...prev, fileFormat: value }))}
          />
          <Select
            label="Send Design By Email"
            options={boolOptions}
            value={toYesNo(Boolean(output.manufacturerEmail?.sendDesignByEmail))}
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
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 12 }}>
          <Select
            label="Show Navigation Menu"
            options={[
              { label: "Off", value: "off" },
              { label: "On", value: "on" },
            ]}
            value={mobile.showNavigatorMenu || "off"}
            onChange={(value) => setMobile((prev: any) => ({ ...prev, showNavigatorMenu: value }))}
          />
          <Select
            label="Show Navigation Menu First"
            options={[
              { label: "Yes", value: "yes" },
              { label: "No", value: "no" },
            ]}
            value={mobile.showNavigationMenuFirst || "yes"}
            onChange={(value) =>
              setMobile((prev: any) => ({ ...prev, showNavigationMenuFirst: value }))
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
              setMobile((prev: any) => ({ ...prev, mobileSelectionOptionsDisplay: value }))
            }
          />
        </div>
      </SectionShell>

      <SectionShell
        title="Request A Quote"
        description="Request quote flow and upload constraints."
        saving={saving}
        onSave={() => submitSection("requestQuote", requestQuote)}
      >
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 12 }}>
          <Select
            label="Enable Request Quote"
            options={boolOptions}
            value={toYesNo(Boolean(requestQuote.enableRequestQuote))}
            onChange={(value) =>
              setRequestQuote((prev: any) => ({ ...prev, enableRequestQuote: fromYesNo(value) }))
            }
          />
          <Select
            label="Send To Customer"
            options={boolOptions}
            value={toYesNo(Boolean(requestQuote.sendToCustomer))}
            onChange={(value) =>
              setRequestQuote((prev: any) => ({ ...prev, sendToCustomer: fromYesNo(value) }))
            }
          />
          <Select
            label="Allow Upload Files"
            options={boolOptions}
            value={toYesNo(Boolean(requestQuote.allowUploadFiles))}
            onChange={(value) =>
              setRequestQuote((prev: any) => ({ ...prev, allowUploadFiles: fromYesNo(value) }))
            }
          />
          <TextField
            label="Email Subject"
            autoComplete="off"
            value={String(requestQuote.emailSubject || "")}
            onChange={(value) => setRequestQuote((prev: any) => ({ ...prev, emailSubject: value }))}
          />
          <TextField
            label="Receivers Email(s)"
            autoComplete="off"
            value={(requestQuote.receiversEmail || []).join(", ")}
            onChange={(value) =>
              setRequestQuote((prev: any) => ({
                ...prev,
                receiversEmail: value
                  .split(",")
                  .map((item) => item.trim())
                  .filter(Boolean),
              }))
            }
          />
          <TextField
            label="Accepted Extensions"
            autoComplete="off"
            value={(requestQuote.acceptExtensions || []).join(", ")}
            onChange={(value) =>
              setRequestQuote((prev: any) => ({
                ...prev,
                acceptExtensions: value
                  .split(",")
                  .map((item) => item.trim())
                  .filter(Boolean),
              }))
            }
          />
          <TextField
            label="Max File Size"
            type="number"
            autoComplete="off"
            value={String(requestQuote.maxFileSize ?? 10)}
            onChange={(value) =>
              setRequestQuote((prev: any) => ({ ...prev, maxFileSize: Number(value || 0) }))
            }
          />
          <TextField
            label="Max Files Number"
            type="number"
            autoComplete="off"
            value={String(requestQuote.maxFilesNumber ?? 5)}
            onChange={(value) =>
              setRequestQuote((prev: any) => ({ ...prev, maxFilesNumber: Number(value || 0) }))
            }
          />
        </div>
      </SectionShell>

      <SectionShell
        title="Mode"
        description="Editor behavior and multi-color/font mode."
        saving={saving}
        onSave={() => submitSection("mode", mode)}
      >
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 12 }}>
          <Select
            label="Mode"
            options={[
              { label: "Simple", value: "simple" },
              { label: "Multi", value: "multi" },
            ]}
            value={mode.type || "simple"}
            onChange={(value) =>
              setMode((prev: any) => ({
                ...prev,
                type: value,
              }))
            }
          />

          {mode.type === "multi" ? (
            <Select
              label="Allow Multi Fonts"
              options={boolOptions}
              value={toYesNo(Boolean(mode.allowMultiFonts))}
              onChange={(value) =>
                setMode((prev: any) => ({ ...prev, allowMultiFonts: fromYesNo(value) }))
              }
            />
          ) : (
            <div />
          )}

          {mode.type === "multi" ? (
            <Select
              label="Allow Multi Colors"
              options={boolOptions}
              value={toYesNo(Boolean(mode.allowMultiColors))}
              onChange={(value) =>
                setMode((prev: any) => ({ ...prev, allowMultiColors: fromYesNo(value) }))
              }
            />
          ) : (
            <div />
          )}

          <Select
            label="Allow Share"
            options={boolOptions}
            value={toYesNo(Boolean(mode?.shareAndSave?.allowShare))}
            onChange={(value) =>
              setMode((prev: any) => ({
                ...prev,
                shareAndSave: {
                  ...(prev.shareAndSave || {}),
                  allowShare: fromYesNo(value),
                },
              }))
            }
          />

          <Select
            label="Allow Save"
            options={boolOptions}
            value={toYesNo(Boolean(mode?.shareAndSave?.allowSave))}
            onChange={(value) =>
              setMode((prev: any) => ({
                ...prev,
                shareAndSave: {
                  ...(prev.shareAndSave || {}),
                  allowSave: fromYesNo(value),
                },
              }))
            }
          />

          <Select
            label="Share Sign Location"
            options={[
              { label: "Options + Review", value: "options_review" },
              { label: "Review only", value: "review_only" },
            ]}
            value={
              mode?.shareAndSave?.shareSignLocation === "review_only"
                ? "review_only"
                : "options_review"
            }
            onChange={(value) =>
              setMode((prev: any) => ({
                ...prev,
                shareAndSave: {
                  ...(prev.shareAndSave || {}),
                  shareSignLocation: value === "review_only" ? "review_only" : "options_review",
                },
              }))
            }
          />
        </div>
      </SectionShell>

      <Box paddingBlockStart="300">
        <Divider borderWidth="025" />
      </Box>
    </Box>
  );
}
