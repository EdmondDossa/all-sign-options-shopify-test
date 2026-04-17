import { json } from "@remix-run/node";
import type { ActionFunctionArgs } from "@remix-run/node";
import {
  BlockStack,
  Box,
  Card,
  Grid,
  InlineStack,
  Text,
  TextField,
} from "@shopify/polaris";
import { Outlet, useLocation, useNavigation, useOutletContext, useParams, useSubmit } from "@remix-run/react";
import { useEffect, useState } from "react";
import SaveButton from "~/components/buttons/SaveButton";
import { ToggleButton } from "~/components/buttons";
import { FileInput } from "~/components/inputs/FileInput";
import { CustomTinymce } from "~/components/inputs/CustomTinymce";
import CollapsibleSectionCard from "~/components/settings/CollapsibleSectionCard";
import ConfigSettingsService from "~/models/ConfigSetttings.service";
import { authenticate } from "~/shopify.server";
import { jFlashMessage } from "~/utils/message-flash";

type UploadDesignState = {
  activate: boolean;
  link: string;
  phraseSubmitCustom: string;
  helpContent: string;
};

type VisualizerState = {
  textCanvasCenterH: string;
  textCanvasCenterV: string;
  textCanvasDelete: string;
  textCanvasEdit: string;
  textCanvasClone: string;
  textPosition: string;
  textAngle: string;
  textWidth: string;
  textHeight: string;
  textRight: string;
  textLeft: string;
  textTop: string;
  textBottom: string;
  titleHeader: string;
  textButtonRefresh: string;
  textButtonBack: string;
  textButtonNext: string;
  textButtonFinish: string;
  textPreview: string;
  textShare: string;
  textImport: string;
  textDownload: string;
  textSave: string;
  textHelp: string;
  textMaterial: string;
  textSize: string;
  textShape: string;
  textFixingMethods: string;
  textColor: string;
  textOptionText: string;
  textBorder: string;
  textProduct: string;
  textImage: string;
  phraseImageSizeRestrictionError: string;
  textAdditonnalOptionsHeader: string;
  textButtonAdditonnalOptions: string;
  customSize: string;
  customSizeButtonDone: string;
  thickness: string;
  textBeforePrice: string;
  textAfterPrice: string;
  textAddToCart: string;
};

type ImagesState = {
  resetAllIcon: string;
  undoIcon: string;
  redoIcon: string;
  cancelAnAction: string;
  changeIconHelp: string;
  changeIconPreview: string;
  changeIconImport: string;
  changeIconShare: string;
  changeIconSaveProject: string;
  changeIconShareSideBar: string;
  changeIconMaterial: string;
  changeIconShape: string;
  changeIconFixingMethod: string;
  changeIconProduct: string;
  changeIconSize: string;
  changeIconText: string;
  changeIconColor: string;
  changeIconDownload: string;
  changeIconBorder: string;
  changeIconImage: string;
};

const defaultUploadDesign = (): UploadDesignState => ({
  activate: false,
  link: "",
  phraseSubmitCustom: "Take a customization",
  helpContent: "",
});

const defaultVisualizer = (): VisualizerState => ({
  textCanvasCenterH: "Center H",
  textCanvasCenterV: "Center V",
  textCanvasDelete: "Delete",
  textCanvasEdit: "Edit",
  textCanvasClone: "Clone",
  textPosition: "Position",
  textAngle: "Angle",
  textWidth: "Width",
  textHeight: "Height",
  textRight: "Right",
  textLeft: "Left",
  textTop: "Top",
  textBottom: "Bottom",
  titleHeader: "Plastic Signs",
  textButtonRefresh: "Restart all",
  textButtonBack: "Undo",
  textButtonNext: "Redo",
  textBeforePrice: "",
  textAfterPrice: "VAT Included",
  textButtonFinish: "Finish",
  textAddToCart: "Add To Cart",
  textPreview: "Preview",
  textShare: "Share",
  textImport: "Import",
  textDownload: "Download",
  textSave: "Save",
  textHelp: "Help",
  textMaterial: "Material",
  textSize: "Size",
  textShape: "Shape",
  textFixingMethods: "Fixing Methods",
  textColor: "Color",
  textOptionText: "Text",
  textBorder: "Border",
  textProduct: "Product",
  textImage: "Image",
  phraseImageSizeRestrictionError: "The image size must be between",
  customSize: "Custom Size",
  customSizeButtonDone: "Done",
  thickness: "Thickness",
  textAdditonnalOptionsHeader: "Additional Options",
  textButtonAdditonnalOptions: "Add Option",
});

const defaultImages = (): ImagesState => ({
  resetAllIcon: "",
  undoIcon: "",
  redoIcon: "",
  cancelAnAction: "",
  changeIconHelp: "",
  changeIconPreview: "",
  changeIconImport: "",
  changeIconShare: "",
  changeIconSaveProject: "",
  changeIconShareSideBar: "",
  changeIconMaterial: "",
  changeIconShape: "",
  changeIconFixingMethod: "",
  changeIconProduct: "",
  changeIconSize: "",
  changeIconText: "",
  changeIconColor: "",
  changeIconDownload: "",
  changeIconBorder: "",
  changeIconImage: "",
});

const visualizerHeaderFields: Array<{ key: keyof VisualizerState; label: string }> = [
  { key: "titleHeader", label: "Title header" },
  { key: "textButtonRefresh", label: "Text button refresh" },
  { key: "textButtonBack", label: "Text button back" },
  { key: "textButtonNext", label: "Text button next" },
  { key: "textBeforePrice", label: "Text before price" },
  { key: "textAfterPrice", label: "Text after price" },
  { key: "textButtonFinish", label: "Text button finish" },
  { key: "textAddToCart", label: "Text button Add to cart" },
];

const visualizerContentFields: Array<{ key: keyof VisualizerState; label: string }> = [
  { key: "textWidth", label: "Text width" },
  { key: "textHeight", label: "Text height" },
  { key: "textPosition", label: "Text position" },
  { key: "textAngle", label: "Text angle" },
  { key: "textTop", label: "Text top" },
  { key: "textBottom", label: "Text bottom" },
  { key: "textLeft", label: "Text left" },
  { key: "textRight", label: "Text right" },
];

const visualizerCanvasFields: Array<{ key: keyof VisualizerState; label: string }> = [
  { key: "textCanvasEdit", label: "Canvas selected object edit button" },
  { key: "textCanvasDelete", label: "Canvas selected object delete button" },
  { key: "textCanvasCenterH", label: "Canvas selected object centerH button" },
  { key: "textCanvasCenterV", label: "Canvas selected object centerV button" },
  { key: "textCanvasClone", label: "Canvas selected object clone button" },
];

const visualizerSidebarFields: Array<{ key: keyof VisualizerState; label: string }> = [
  { key: "textPreview", label: "Preview text" },
  { key: "textShare", label: "Share text" },
  { key: "textImport", label: "Import text" },
  { key: "textDownload", label: "Download text" },
  { key: "textSave", label: "Save text" },
  { key: "textHelp", label: "Help text" },
];

const visualizerOptionFields: Array<{ key: keyof VisualizerState; label: string }> = [
  { key: "textMaterial", label: "Text material" },
  { key: "textSize", label: "Text size" },
  { key: "customSize", label: "Text custom size" },
  { key: "customSizeButtonDone", label: "Text custom size button done" },
  { key: "thickness", label: "Text thickness" },
  { key: "textShape", label: "Text shape" },
  { key: "textFixingMethods", label: "Text fixing methods" },
  { key: "textColor", label: "Text color" },
  { key: "textOptionText", label: "Text option text" },
  { key: "textBorder", label: "Text border" },
  { key: "textProduct", label: "Text product" },
  { key: "textImage", label: "Text image" },
  { key: "phraseImageSizeRestrictionError", label: "Error message for image size restriction" },
  { key: "textButtonAdditonnalOptions", label: "Text additonnal options" },
  { key: "textAdditonnalOptionsHeader", label: "Text additonnal options header" },
];

const imageCustomDesignFields: Array<{ key: keyof ImagesState; title: string }> = [
  { key: "resetAllIcon", title: "Reset All" },
  { key: "undoIcon", title: "Change Undo icon" },
  { key: "redoIcon", title: "Change Redo icon" },
];

const imageSidebarFields: Array<{ key: keyof ImagesState; title: string }> = [
  { key: "changeIconPreview", title: "Change Icon preview" },
  { key: "changeIconHelp", title: "Change help icon" },
  { key: "changeIconImport", title: "Change Icon Import" },
  { key: "changeIconShare", title: "Change Icon share" },
  { key: "changeIconSaveProject", title: "Change Icon save project" },
  { key: "changeIconShareSideBar", title: "Change Icon Share Side bar" },
];

const imageMenuFields: Array<{ key: keyof ImagesState; title: string }> = [
  { key: "changeIconMaterial", title: "Change Icon Material" },
  { key: "changeIconShape", title: "Change Icon shape" },
  { key: "changeIconFixingMethod", title: "Change Icon fixing method" },
  { key: "changeIconProduct", title: "Change Icon Product" },
  { key: "changeIconDownload", title: "Change download" },
  { key: "changeIconText", title: "Change Icon Text" },
  { key: "changeIconColor", title: "Change Icon color" },
  { key: "changeIconSize", title: "Change Icon size" },
  { key: "changeIconBorder", title: "Change Icon border" },
  { key: "changeIconImage", title: "Change Icon image" },
];

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

  if (!["uploadDesign", "visualizer", "images"].includes(section)) {
    return json({ ...jFlashMessage("Unsupported settings section", "error") }, { status: 400 });
  }

  const result = await ConfigSettingsService.updateSettingsSection(
    configId,
    session.id,
    "languageImages",
    section,
    parsed,
  );

  if (!result) {
    return json({ ...jFlashMessage("Unable to update settings", "error") }, { status: 500 });
  }

  return json({ ok: true, section, ...jFlashMessage(`${section} settings updated successfully`) });
};

function SectionSave({ loading, onClick, label }: { loading: boolean; onClick: () => void; label: string }) {
  return (
    <Box paddingBlockStart="300">
      <InlineStack align="end">
        <SaveButton loading={loading} onClick={onClick}>{label}</SaveButton>
      </InlineStack>
    </Box>
  );
}

function FieldGrid({ fields, values, onChange }: { fields: Array<{ key: keyof VisualizerState; label: string }>; values: VisualizerState; onChange: (key: keyof VisualizerState, value: string) => void }) {
  return (
    <Grid gap={{ lg: "20px" }}>
      {fields.map((field) => (
        <Grid.Cell key={String(field.key)} columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
          <TextField
            label={field.label}
            autoComplete="off"
            value={values[field.key]}
            onChange={(value) => onChange(field.key, value)}
          />
        </Grid.Cell>
      ))}
    </Grid>
  );
}

function ImageUploadGrid({ fields, values, onChange }: { fields: Array<{ key: keyof ImagesState; title: string }>; values: ImagesState; onChange: (key: keyof ImagesState, value: string) => void }) {
  return (
    <Grid gap={{ lg: "25px" }}>
      {fields.map((field) => (
        <Grid.Cell key={String(field.key)} columnSpan={{ xs: 6, sm: 6, md: 3, lg: 4, xl: 4 }}>
          <FileInput
            title={field.title}
            buttonTitle="Upload icon"
            path={values[field.key]}
            handlePath={(value: any) => onChange(field.key, String(value || ""))}
          />
        </Grid.Cell>
      ))}
    </Grid>
  );
}

export default function ConfigSettingsLanguageText() {
  const { configuration } = useOutletContext<any>();
  const location = useLocation();
  const navigation = useNavigation();
  const submit = useSubmit();
  const params = useParams();
  const configId = String(params.configId || "");
  const basePath = `/app/configuration/${configId}/settings/language-text`;
  const isRootPage = location.pathname === basePath;

  const [uploadDesign, setUploadDesign] = useState<UploadDesignState>(defaultUploadDesign());
  const [visualizer, setVisualizer] = useState<VisualizerState>(defaultVisualizer());
  const [images, setImages] = useState<ImagesState>(defaultImages());

  useEffect(() => {
    const settings = configuration?.data?.settings?.languageImages || {};
    setUploadDesign({ ...defaultUploadDesign(), ...(settings?.uploadDesign || {}) });
    setVisualizer({ ...defaultVisualizer(), ...(settings?.visualizer || {}) });
    setImages({ ...defaultImages(), ...(settings?.images || {}) });
  }, [configuration]);

  const activeSection = String(navigation.formData?.get("section") || "");

  const submitSection = (section: "uploadDesign" | "visualizer" | "images", value: unknown) => {
    const formData = new FormData();
    formData.append("section", section);
    formData.append("payload", JSON.stringify(value));
    submit(formData, { method: "POST" });
  };

  const sectionMenu = [
    { id: "upload-design", label: "Upload Design" },
    { id: "visualizer", label: "Visualizer" },
    { id: "images", label: "Images" },
  ];

  if (!isRootPage) {
    return <Outlet />;
  }

  return (
    <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) 220px", gap: 20, alignItems: "start" }}>
      <div style={{ display: "grid", gap: 16 }}>
        <Card>
          <Box padding="400">
            <Text as="h1" variant="headingLg">Language & Images</Text>
            <Box paddingBlockStart="100">
              <Text as="p" tone="subdued">
                Configure upload texts, visualizer wording and system images in one page, without switching between legacy child screens.
              </Text>
            </Box>
          </Box>
        </Card>

        <CollapsibleSectionCard
          id="upload-design"
          title="Upload Design"
          description="Texts and help content used for the upload design flow."
        >
          <Grid gap={{ lg: "25px" }}>
            <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
              <BlockStack gap="150">
                <Text as="strong" variant="bodyMd">Enable custom design link</Text>
                <InlineStack gap="250" blockAlign="center">
                  <Text as="span" tone="subdued">No</Text>
                  <ToggleButton checked={uploadDesign.activate} onChange={(value) => setUploadDesign((current) => ({ ...current, activate: Boolean(value) }))} />
                  <Text as="span" tone="subdued">Yes</Text>
                </InlineStack>
                <Text as="p" tone="subdued">Enable this to display a link redirecting customers to another page on your store for more complex design requests.</Text>
              </BlockStack>
            </Grid.Cell>
            {uploadDesign.activate ? (
              <>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
                  <TextField
                    label="Custom Design Link"
                    helpText="URL to redirect customers on your store that will allow for more complex graphic design quote submissions."
                    autoComplete="off"
                    value={uploadDesign.link}
                    onChange={(value) => setUploadDesign((current) => ({ ...current, link: value }))}
                  />
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
                  <TextField
                    label="Phrase for link to submit custom design page"
                    autoComplete="off"
                    value={uploadDesign.phraseSubmitCustom}
                    onChange={(value) => setUploadDesign((current) => ({ ...current, phraseSubmitCustom: value }))}
                  />
                </Grid.Cell>
              </>
            ) : null}
            <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
              <BlockStack gap="150">
                <Text as="strong" variant="bodyMd">Help content</Text>
                <CustomTinymce
                  title=""
                  value={uploadDesign.helpContent}
                  onEditorChange={(value: any) => setUploadDesign((current) => ({ ...current, helpContent: String(value || "") }))}
                />
              </BlockStack>
            </Grid.Cell>
          </Grid>
          <SectionSave
            loading={navigation.state === "submitting" && activeSection === "uploadDesign"}
            onClick={() => submitSection("uploadDesign", uploadDesign)}
            label="Save Upload Design"
          />
        </CollapsibleSectionCard>

        <CollapsibleSectionCard
          id="visualizer"
          title="Visualizer"
          description="Texts and labels used inside the visualizer interface."
        >
          <BlockStack gap="400">
            <Card>
              <Box padding="300">
                <BlockStack gap="250">
                  <Text as="strong" variant="bodyMd">Content Header</Text>
                  <FieldGrid fields={visualizerHeaderFields} values={visualizer} onChange={(key, value) => setVisualizer((current) => ({ ...current, [key]: value }))} />
                </BlockStack>
              </Box>
            </Card>
            <Card>
              <Box padding="300">
                <BlockStack gap="250">
                  <Text as="strong" variant="bodyMd">Content Text</Text>
                  <FieldGrid fields={visualizerContentFields} values={visualizer} onChange={(key, value) => setVisualizer((current) => ({ ...current, [key]: value }))} />
                </BlockStack>
              </Box>
            </Card>
            <Card>
              <Box padding="300">
                <BlockStack gap="250">
                  <Text as="strong" variant="bodyMd">Action on selected object in canvas</Text>
                  <FieldGrid fields={visualizerCanvasFields} values={visualizer} onChange={(key, value) => setVisualizer((current) => ({ ...current, [key]: value }))} />
                </BlockStack>
              </Box>
            </Card>
            <Card>
              <Box padding="300">
                <BlockStack gap="250">
                  <Text as="strong" variant="bodyMd">Content Sidebar</Text>
                  <FieldGrid fields={visualizerSidebarFields} values={visualizer} onChange={(key, value) => setVisualizer((current) => ({ ...current, [key]: value }))} />
                </BlockStack>
              </Box>
            </Card>
            <Card>
              <Box padding="300">
                <BlockStack gap="250">
                  <Text as="strong" variant="bodyMd">Button Options</Text>
                  <FieldGrid fields={visualizerOptionFields} values={visualizer} onChange={(key, value) => setVisualizer((current) => ({ ...current, [key]: value }))} />
                </BlockStack>
              </Box>
            </Card>
          </BlockStack>
          <SectionSave
            loading={navigation.state === "submitting" && activeSection === "visualizer"}
            onClick={() => submitSection("visualizer", visualizer)}
            label="Save Visualizer"
          />
        </CollapsibleSectionCard>

        <CollapsibleSectionCard
          id="images"
          title="Images"
          description="Icons and system images used across the configurator UI."
        >
          <BlockStack gap="400">
            <Card>
              <Box padding="300">
                <BlockStack gap="250">
                  <Text as="strong" variant="bodyMd">Custom design link</Text>
                  <ImageUploadGrid fields={imageCustomDesignFields} values={images} onChange={(key, value) => setImages((current) => ({ ...current, [key]: value }))} />
                </BlockStack>
              </Box>
            </Card>
            <Card>
              <Box padding="300">
                <BlockStack gap="250">
                  <Text as="strong" variant="bodyMd">Side bar</Text>
                  <ImageUploadGrid fields={imageSidebarFields} values={images} onChange={(key, value) => setImages((current) => ({ ...current, [key]: value }))} />
                </BlockStack>
              </Box>
            </Card>
            <Card>
              <Box padding="300">
                <BlockStack gap="250">
                  <Text as="strong" variant="bodyMd">Menu</Text>
                  <ImageUploadGrid fields={imageMenuFields} values={images} onChange={(key, value) => setImages((current) => ({ ...current, [key]: value }))} />
                </BlockStack>
              </Box>
            </Card>
          </BlockStack>
          <SectionSave
            loading={navigation.state === "submitting" && activeSection === "images"}
            onClick={() => submitSection("images", images)}
            label="Save Images"
          />
        </CollapsibleSectionCard>
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
