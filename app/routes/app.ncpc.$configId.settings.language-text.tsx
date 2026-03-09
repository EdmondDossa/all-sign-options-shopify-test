import { json } from "@remix-run/node";
import type { ActionFunctionArgs } from "@remix-run/node";
import { useNavigation, useOutletContext, useSubmit } from "@remix-run/react";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  Divider,
  IndexTable,
  InlineStack,
  Modal,
  Select,
  Text,
  TextField,
} from "@shopify/polaris";
import ConfigSettingsService from "~/models/ConfigSetttings.service";
import { authenticate } from "~/shopify.server";
import { jFlashMessage } from "~/utils/message-flash";
import { FileUploader } from "~/routes/app.upload";
import { fileUrl } from "~/utils/fileUrl";

type YesNo = "true" | "false";

const boolOptions = [
  { label: "Yes", value: "true" },
  { label: "No", value: "false" },
];

const DEFAULT_SCENE_IMAGES = Array.from(
  { length: 7 },
  (_item, index) => `/aso_default_files/scenes/${index + 1}.jpg`,
);

const normalizeSceneImages = (value: unknown): string[] => {
  if (!Array.isArray(value)) return [];

  return value
    .map((item) => String(item || "").trim())
    .filter(Boolean);
};

const shouldFallbackToDefaultScenes = (images: string[]) => {
  if (images.length === 0) return true;

  return images.every((img) => {
    const lower = img.toLowerCase();
    return (
      lower.includes("/images/include-imgs/") ||
      lower.includes("ncpc_assets_url")
    );
  });
};

const resolveSceneImages = (value: unknown) => {
  const normalized = normalizeSceneImages(value);
  if (shouldFallbackToDefaultScenes(normalized)) {
    return [...DEFAULT_SCENE_IMAGES];
  }
  return normalized;
};

const toYesNo = (value: boolean): YesNo => (value ? "true" : "false");
const fromYesNo = (value: string): boolean => value === "true";

const getByPath = (obj: any, path: string) =>
  path.split(".").reduce((acc, key) => (acc == null ? undefined : acc[key]), obj);

const setByPath = (obj: any, path: string, value: any) => {
  const clone = JSON.parse(JSON.stringify(obj || {}));
  const keys = path.split(".");
  let cursor = clone;

  for (let i = 0; i < keys.length - 1; i += 1) {
    const key = keys[i];
    if (cursor[key] == null || typeof cursor[key] !== "object") {
      cursor[key] = {};
    }
    cursor = cursor[key];
  }

  cursor[keys[keys.length - 1]] = value;
  return clone;
};

const getFileExtension = (value: string) => {
  const clean = String(value || "").split("?")[0].split("#")[0];
  const parts = clean.split(".");
  if (parts.length < 2) return "";
  return String(parts.pop() || "").toLowerCase();
};

const getFileName = (value: string) => {
  const normalized = String(fileUrl(value) || "");
  if (!normalized) return "";
  if (normalized.startsWith("blob:")) return "Local upload (temporary)";

  try {
    if (normalized.startsWith("http://") || normalized.startsWith("https://")) {
      const pathname = new URL(normalized).pathname;
      const file = pathname.split("/").pop() || "";
      return decodeURIComponent(file);
    }
  } catch {
    // Ignore and fallback below
  }

  const file = normalized.split("/").pop() || "";
  try {
    return decodeURIComponent(file);
  } catch {
    return file;
  }
};

const getPreviewUrl = (value: string) => {
  const normalized = String(fileUrl(value) || "");
  if (!normalized) return "";
  if (normalized.startsWith("blob:")) return normalized;

  try {
    if (normalized.startsWith("http://") || normalized.startsWith("https://")) {
      const url = new URL(normalized);
      url.pathname = decodeURIComponent(url.pathname);
      return url.toString();
    }
  } catch {
    // Ignore and fallback below
  }

  try {
    if (normalized.startsWith("/")) {
      const chunks = normalized.split("/");
      const filename = chunks[chunks.length - 1];
      chunks[chunks.length - 1] = decodeURIComponent(filename || "");
      return chunks.join("/");
    }
  } catch {
    // Ignore and fallback below
  }

  return normalized;
};

const mainFields = [
  { key: "header", label: "Header", description: "" },
  { key: "textBoxLabel", label: "Text Box Label", description: "" },
  {
    key: "lineCount",
    label: "Line count",
    description: "Preceded by current lines over total allowable (e.g. 1/3).",
  },
  {
    key: "maxCharacters",
    label: "Max characters",
    description: "Maximum characters per line for current size.",
  },
  { key: "addingToCartButton", label: "Add to cart button", description: "" },
  { key: "requestAQuoteButton", label: "Get request a quote button", description: "" },
  { key: "email", label: "Email", description: "" },
  { key: "firstName", label: "First Name", description: "" },
  { key: "lastName", label: "Last Name", description: "" },
  { key: "phone", label: "Phone", description: "" },
  { key: "quoteAdditionalNotes", label: "Additional Notes", description: "" },
  { key: "quoteFilesFormats", label: "Files Formats", description: "" },
  { key: "quoteUploadFileTitle", label: "Upload File", description: "" },
  { key: "maxFileSize", label: "Max File Size", description: "" },
  { key: "buttonSendAQuoteFormLabel", label: "Submit", description: "" },
  { key: "emailError", label: "Email Error", description: "" },
  { key: "quoteThanksMessage", label: "Quote Thanks Message", description: "" },
  { key: "quoteModalTitle", label: "Quote Modal Title", description: "" },
  { key: "finishButton", label: "Finish button", description: "" },
  { key: "textBeforePriceValue", label: "Text before price", description: "" },
  { key: "textAfterPriceValue", label: "Text after price", description: "" },
  { key: "maxSignLabel", label: "Max Sign Label", description: "" },
  { key: "textAlignment", label: "Text Align", description: "" },
  { key: "textAlignmentValue.left", label: "Align Left", description: "" },
  { key: "textAlignmentValue.center", label: "Align Center", description: "" },
  { key: "textAlignmentValue.right", label: "Align Right", description: "" },
  { key: "maxSignModals.width", label: "Width Modal", description: "" },
  { key: "maxSignModals.height", label: "Height Modal", description: "" },
  { key: "maxSignModals.lines", label: "Lines Modal", description: "" },
  { key: "maxSignModals.characters", label: "Characters Modal", description: "" },
  { key: "measurementLabel.width", label: "Width Label", description: "" },
  { key: "measurementLabel.height", label: "Height Label", description: "" },
  { key: "summaryLabel", label: "Summary", description: "" },
  { key: "editLabel", label: "Edit", description: "" },
  { key: "sectionText", label: "Text Section", description: "" },
  { key: "sectionAdditionalOptions", label: "Additional Options Section", description: "" },
  { key: "charactersRemaining", label: "Remaining characters", description: "" },
  { key: "minimumCharacter", label: "Minimum character message", description: "" },
  { key: "selectableTextMessage", label: "Selectable Text Message", description: "" },
  { key: "applyToAll", label: "Apply To All Option Text", description: "" },
];

const visualizerFields = [
  { key: "defaultText", label: "Default Text", description: "" },
  { key: "textUnderneathPrice", label: "Text Under Price", description: "" },
  { key: "note", label: "Note", description: "" },
  { key: "visualizerOn", label: "Visualizer ON", description: "" },
  { key: "visualizerOff", label: "Visualizer OFF", description: "" },
  { key: "visualizerLight", label: "Visualizer Light", description: "" },
  { key: "visualizerDark", label: "Visualizer Dark", description: "" },
  { key: "textIcon", label: "Text Icon", description: "SVG code or path" },
  { key: "fontIcon", label: "Font Icon", description: "SVG code or path" },
  { key: "sizeIcon", label: "Size Icon", description: "SVG code or path" },
  { key: "colorIcon", label: "Color Icon", description: "SVG code or path" },
  { key: "letterTypeIcon", label: "Letter Type Icon", description: "SVG code or path" },
  { key: "materialIcon", label: "Material Icon", description: "SVG code or path" },
  { key: "jacketIcon", label: "Jacket Icon", description: "SVG code or path" },
  { key: "mountingIcon", label: "Mounting Icon", description: "SVG code or path" },
  { key: "backboardIcon", label: "Backboard Icon", description: "SVG code or path" },
  { key: "backboardColorIcon", label: "Backboard Color Icon", description: "SVG code or path" },
  { key: "additionalIcon", label: "Additional Icon", description: "SVG code or path" },
];

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const { session } = await authenticate.admin(request);
  const configId = Number(params.configId || "");

  if (!Number.isFinite(configId)) {
    return json({ ok: false }, { status: 400 });
  }

  const formData = await request.formData();
  const sections = ["main", "customDesign", "visualizer", "images", "icons"];

  for (const section of sections) {
    const raw = formData.get(section);
    if (!raw || typeof raw !== "string") continue;

    try {
      const value = JSON.parse(raw);
      await ConfigSettingsService.updateSettingsSection(
        configId,
        session.id,
        "languageImages",
        section,
        value,
      );
      return json({ ok: true, section, ...jFlashMessage(`${section} updated successfully`) });
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

export default function ConfigSettingsLanguageImages() {
  const submit = useSubmit();
  const navigation = useNavigation();
  const { configuration } = useOutletContext<any>();
  const saving = navigation.state === "submitting";

  const [main, setMain] = useState<any>({
    header: "CREATE YOUR SIGN",
    textBoxLabel: "Write your text",
    lineCount: "Lines",
    maxCharacters: "max characters per line for current size",
    addingToCartButton: "Add to the cart",
    requestAQuoteButton: "Get A Quote",
    buttonSendAQuoteFormLabel: "Submit",
    firstName: "First Name",
    lastName: "Last Name",
    email: "Email",
    phone: "Phone",
    quoteAdditionalNotes: "Additional Notes",
    quoteUploadFileTitle: "Upload your files",
    quoteFilesFormats: "Formats",
    maxFileSize: "Max File Size",
    emailError: "Please enter a valid email address",
    quoteThanksMessage: "Your quote has been sent successfully",
    quoteModalTitle: "Quote Request Submission",
    finishButton: "Finish",
    textBeforePriceValue: "",
    textAfterPriceValue: "Tax included",
    maxSignLabel: "the size exceeds the limit",
    textAlignment: "Text Align",
    textAlignmentValue: { left: "Left", center: "Center", right: "Right" },
    maxSignModals: {
      width: "Your sign has exceeded the maximum width",
      height: "Your sign has exceeded the maximum height",
      lines: "Your sign has exceeded the maximum number of lines",
      characters: "Your sign has exceeded the maximum number of characters",
    },
    measurementLabel: { width: "Width", height: "Height" },
    summaryLabel: "Summary",
    editLabel: "Edit",
    sectionText: "Text",
    sectionAdditionalOptions: "Additional Options",
    charactersRemaining: "Remaining characters",
    minimumCharacter: "or more characters are required, please add more characters.",
    selectableTextMessage: "Click on a word to begin customising it.",
    materialLineLength: "Material Line Length",
    applyToAll: "Apply to all",
  });

  const [customDesign, setCustomDesign] = useState<any>({
    link: {
      activate: false,
      link: "",
      phraseSubmitCustom: "Take a customization",
    },
    aiDesigner: {
      activate: false,
    },
    editorModes: {
      enableTextEditor: true,
    },
    screen: {
      activate: false,
      customDesignText: "To submit the personalized design, please click on this button before",
      buttonLabel: "Send Custom Design",
      phraseToLinkBackTextCustomiser: "Custom now",
      steps: {
        headers: "",
        data: [],
      },
    },
  });

  const [visualizer, setVisualizer] = useState<any>({
    defaultText: "Your Text",
    textUnderneathPrice: "",
    showNote: true,
    note: "",
    visualizerOn: "ON",
    visualizerOff: "OFF",
    visualizerLight: "Light",
    visualizerDark: "Dark",
    textIcon: "",
    fontIcon: "",
    sizeIcon: "",
    colorIcon: "",
    letterTypeIcon: "",
    materialIcon: "",
    jacketIcon: "",
    mountingIcon: "",
    backboardIcon: "",
    backboardColorIcon: "",
    additionalIcon: "",
    showTextEditorOverlay: false,
  });

  const [images, setImages] = useState<any>({
    previewImage: {
      activate: false,
      allowUpload: false,
      uploadText: "",
      displayDefaultBackgroundImage: false,
    },
    enableReviewImage: true,
    reviewScreenImages: {
      activate: false,
      displayDefaultBackgroundImage: false,
    },
    manageImages: [...DEFAULT_SCENE_IMAGES],
  });

  const [icons, setIcons] = useState<any>({
    title: "",
    description: "",
    pricing: -1,
    listIcons: [],
  });
  const [iconPreviewErrors, setIconPreviewErrors] = useState<Record<string, boolean>>({});
  const [iconModalOpen, setIconModalOpen] = useState(false);
  const [editingIconIndex, setEditingIconIndex] = useState<number | null>(null);
  const [iconDraft, setIconDraft] = useState<any>({
    name: "",
    preview: "",
    file: "",
    minHeight: 5,
    basePrice: 0,
  });

  useEffect(() => {
    const languageImages = configuration?.data?.settings?.languageImages || {};

    setMain((prev: any) => ({ ...prev, ...(languageImages.main || {}) }));
    setCustomDesign((prev: any) => ({ ...prev, ...(languageImages.customDesign || {}) }));
    setVisualizer((prev: any) => ({ ...prev, ...(languageImages.visualizer || {}) }));
    setImages((prev: any) => {
      const incoming = languageImages.images || {};
      return {
        ...prev,
        ...incoming,
        manageImages: resolveSceneImages(incoming.manageImages),
      };
    });
    setIcons((prev: any) => ({ ...prev, ...(languageImages.icons || {}) }));
  }, [configuration]);

  const submitSection = (section: string, value: any) => {
    submit({ [section]: JSON.stringify(value) }, { method: "POST" });
  };

  const persistIcons = (nextIcons: any) => {
    setIcons(nextIcons);
    submitSection("icons", nextIcons);
  };

  const openAddIconModal = () => {
    setEditingIconIndex(null);
    setIconDraft({
      name: "",
      preview: "",
      file: "",
      minHeight: 5,
      basePrice: 0,
    });
    setIconModalOpen(true);
  };

  const openEditIconModal = (icon: any, index: number) => {
    setEditingIconIndex(index);
    setIconDraft({
      name: icon?.name || "",
      preview: icon?.preview || "",
      file: icon?.file || "",
      minHeight: icon?.minHeight ?? 5,
      basePrice: icon?.basePrice ?? 0,
    });
    setIconModalOpen(true);
  };

  const closeIconModal = () => {
    setIconModalOpen(false);
    setEditingIconIndex(null);
  };

  const saveIconModal = () => {
    const iconName =
      String(iconDraft?.name || "").trim() ||
      String(iconDraft?.preview || "")
        .split("/")
        .pop()
        ?.split(".")[0] ||
      "Icon";

    const normalizedIcon = {
      ...iconDraft,
      name: iconName,
      minHeight: Number(iconDraft?.minHeight ?? 5),
      basePrice: Number(iconDraft?.basePrice ?? 0),
    };

    const currentIcons = Array.isArray(icons?.listIcons) ? [...icons.listIcons] : [];
    if (editingIconIndex == null) {
      currentIcons.push(normalizedIcon);
    } else {
      currentIcons[editingIconIndex] = normalizedIcon;
    }

    persistIcons({
      ...icons,
      listIcons: currentIcons,
    });
    closeIconModal();
  };

  const deleteIcon = (index: number) => {
    const currentIcons = Array.isArray(icons?.listIcons) ? [...icons.listIcons] : [];
    currentIcons.splice(index, 1);
    persistIcons({
      ...icons,
      listIcons: currentIcons,
    });
  };

  return (
    <Box paddingBlockEnd="400">
      <SectionShell
        title="Main"
        description="Main labels and texts of the customizer UI."
        saving={saving}
        onSave={() => submitSection("main", main)}
      >
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 12 }}>
          {mainFields.map((field) => (
            <TextField
              key={field.key}
              label={field.label}
              helpText={field.description}
              autoComplete="off"
              value={String(getByPath(main, field.key) || "")}
              onChange={(value) => setMain((prev: any) => setByPath(prev, field.key, value))}
            />
          ))}
        </div>
      </SectionShell>

      <SectionShell
        title="Custom Design"
        description="Link, AI designer and custom design mode options."
        saving={saving}
        onSave={() => submitSection("customDesign", customDesign)}
      >
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 12 }}>
          <Select
            label="Enable custom design link"
            options={boolOptions}
            value={toYesNo(Boolean(customDesign.link?.activate))}
            onChange={(value) =>
              setCustomDesign((prev: any) => setByPath(prev, "link.activate", fromYesNo(value)))
            }
          />
          <TextField
            label="Custom Design Link"
            autoComplete="off"
            value={String(customDesign.link?.link || "")}
            onChange={(value) => setCustomDesign((prev: any) => setByPath(prev, "link.link", value))}
          />
          <TextField
            label="Phrase Submit Custom"
            autoComplete="off"
            value={String(customDesign.link?.phraseSubmitCustom || "")}
            onChange={(value) =>
              setCustomDesign((prev: any) => setByPath(prev, "link.phraseSubmitCustom", value))
            }
          />
          <Select
            label="Enable AI Designer"
            options={boolOptions}
            value={toYesNo(Boolean(customDesign.aiDesigner?.activate))}
            onChange={(value) =>
              setCustomDesign((prev: any) => setByPath(prev, "aiDesigner.activate", fromYesNo(value)))
            }
          />
          <Select
            label="Enable Text Editor"
            options={boolOptions}
            value={toYesNo(Boolean(customDesign.editorModes?.enableTextEditor))}
            onChange={(value) =>
              setCustomDesign((prev: any) =>
                setByPath(prev, "editorModes.enableTextEditor", fromYesNo(value)),
              )
            }
          />
          <Select
            label="Enable custom design screen"
            options={boolOptions}
            value={toYesNo(Boolean(customDesign.screen?.activate))}
            onChange={(value) =>
              setCustomDesign((prev: any) => setByPath(prev, "screen.activate", fromYesNo(value)))
            }
          />
          <TextField
            label="Custom design text"
            autoComplete="off"
            value={String(customDesign.screen?.customDesignText || "")}
            onChange={(value) =>
              setCustomDesign((prev: any) => setByPath(prev, "screen.customDesignText", value))
            }
          />
          <TextField
            label="Button label"
            autoComplete="off"
            value={String(customDesign.screen?.buttonLabel || "")}
            onChange={(value) =>
              setCustomDesign((prev: any) => setByPath(prev, "screen.buttonLabel", value))
            }
          />
          <TextField
            label="Phrase to link back"
            autoComplete="off"
            value={String(customDesign.screen?.phraseToLinkBackTextCustomiser || "")}
            onChange={(value) =>
              setCustomDesign((prev: any) =>
                setByPath(prev, "screen.phraseToLinkBackTextCustomiser", value),
              )
            }
          />
        </div>
      </SectionShell>

      <SectionShell
        title="Visualizer"
        description="Visualizer labels and icon assets."
        saving={saving}
        onSave={() => submitSection("visualizer", visualizer)}
      >
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 12 }}>
          <Select
            label="Show note"
            options={boolOptions}
            value={toYesNo(Boolean(visualizer.showNote))}
            onChange={(value) => setVisualizer((prev: any) => ({ ...prev, showNote: fromYesNo(value) }))}
          />
          <Select
            label="Show text editor overlay"
            options={boolOptions}
            value={toYesNo(Boolean(visualizer.showTextEditorOverlay))}
            onChange={(value) =>
              setVisualizer((prev: any) => ({ ...prev, showTextEditorOverlay: fromYesNo(value) }))
            }
          />
          {visualizerFields.map((field) => (
            field.key.includes("Icon") ? (
              (() => {
                const rawValue = String(getByPath(visualizer, field.key) || "").trim();
                const hasValue = Boolean(rawValue);
                const fileName = getFileName(rawValue);
                const extension = getFileExtension(fileName || rawValue);
                const previewSrc = getPreviewUrl(rawValue);
                const hasPreviewError = Boolean(iconPreviewErrors[field.key]);

                return (
                  <Box
                    key={field.key}
                    borderColor="border"
                    borderWidth="025"
                    borderRadius="200"
                    padding="200"
                  >
                    <Text as="p" variant="bodyMd" fontWeight="medium">
                      {field.label}
                    </Text>
                    <Box paddingBlockStart="100">
                      <Text as="p" tone="subdued">
                        Upload SVG icon for this visualizer slot.
                      </Text>
                    </Box>
                    <Box paddingBlockStart="200">
                      <InlineStack gap="300" blockAlign="center">
                        <FileUploader
                          type="icon"
                          multiple={false}
                          title={`Upload ${field.label}`}
                          setFilesData={(file: string | string[]) => {
                            const selected = Array.isArray(file) ? file[0] : file;
                            if (!selected) return;
                            setIconPreviewErrors((prev) => ({ ...prev, [field.key]: false }));
                            setVisualizer((prev: any) => setByPath(prev, field.key, selected));
                          }}
                        >
                          <Button>Choose SVG</Button>
                        </FileUploader>
                        <Button
                          tone="critical"
                          variant="tertiary"
                          onClick={() => {
                            setIconPreviewErrors((prev) => ({ ...prev, [field.key]: false }));
                            setVisualizer((prev: any) => setByPath(prev, field.key, ""));
                          }}
                        >
                          Clear
                        </Button>
                      </InlineStack>
                    </Box>

                    <Box paddingBlockStart="150">
                      <Text as="p" tone={hasValue ? "success" : "subdued"}>
                        {hasValue
                          ? `Selected: ${fileName || "file"}${extension ? ` (.${extension})` : ""}`
                          : "No file selected"}
                      </Text>
                      {hasValue && extension && extension !== "svg" ? (
                        <Text as="p" tone="critical">
                          Use SVG for best rendering.
                        </Text>
                      ) : null}
                    </Box>

                    <Box paddingBlockStart="200">
                      <div
                        style={{
                          width: "76px",
                          height: "76px",
                          border: "1px solid #d1d5db",
                          borderRadius: "10px",
                          overflow: "hidden",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          background:
                            "linear-gradient(45deg, #f3f4f6 25%, transparent 25%), linear-gradient(-45deg, #f3f4f6 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #f3f4f6 75%), linear-gradient(-45deg, transparent 75%, #f3f4f6 75%)",
                          backgroundSize: "16px 16px",
                          backgroundPosition: "0 0, 0 8px, 8px -8px, -8px 0px",
                        }}
                      >
                        {hasValue && !hasPreviewError ? (
                          <img
                            src={previewSrc}
                            alt={field.label}
                            style={{ width: "100%", height: "100%", objectFit: "contain" }}
                            onLoad={() =>
                              setIconPreviewErrors((prev) => ({ ...prev, [field.key]: false }))
                            }
                            onError={() =>
                              setIconPreviewErrors((prev) => ({ ...prev, [field.key]: true }))
                            }
                          />
                        ) : null}
                        {hasValue && hasPreviewError ? (
                          <Text as="p" tone="critical">
                            Preview unavailable
                          </Text>
                        ) : null}
                      </div>
                    </Box>
                  </Box>
                );
              })()
            ) : (
              <TextField
                key={field.key}
                label={field.label}
                helpText={field.description}
                autoComplete="off"
                value={String(getByPath(visualizer, field.key) || "")}
                onChange={(value) =>
                  setVisualizer((prev: any) => setByPath(prev, field.key, value))
                }
              />
            )
          ))}
        </div>
      </SectionShell>

      <SectionShell
        title="Images"
        description="Background and review image behavior."
        saving={saving}
        onSave={() => submitSection("images", images)}
      >
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 12 }}>
          <Select
            label="Enable Preview Images"
            options={boolOptions}
            value={toYesNo(Boolean(images.previewImage?.activate))}
            onChange={(value) =>
              setImages((prev: any) => setByPath(prev, "previewImage.activate", fromYesNo(value)))
            }
          />
          <Select
            label="Display default preview background"
            options={boolOptions}
            value={toYesNo(Boolean(images.previewImage?.displayDefaultBackgroundImage))}
            onChange={(value) =>
              setImages((prev: any) =>
                setByPath(prev, "previewImage.displayDefaultBackgroundImage", fromYesNo(value)),
              )
            }
          />
          <Select
            label="Allow upload preview background"
            options={boolOptions}
            value={toYesNo(Boolean(images.previewImage?.allowUpload))}
            onChange={(value) =>
              setImages((prev: any) => setByPath(prev, "previewImage.allowUpload", fromYesNo(value)))
            }
          />
          <TextField
            label="Upload text"
            autoComplete="off"
            value={String(images.previewImage?.uploadText || "")}
            onChange={(value) =>
              setImages((prev: any) => setByPath(prev, "previewImage.uploadText", value))
            }
          />
          <Select
            label="Enable Review Image"
            options={boolOptions}
            value={toYesNo(Boolean(images.enableReviewImage))}
            onChange={(value) => setImages((prev: any) => ({ ...prev, enableReviewImage: fromYesNo(value) }))}
          />
          <Select
            label="Enable Review Screen Images"
            options={boolOptions}
            value={toYesNo(Boolean(images.reviewScreenImages?.activate))}
            onChange={(value) =>
              setImages((prev: any) => setByPath(prev, "reviewScreenImages.activate", fromYesNo(value)))
            }
          />
          <Select
            label="Display default review background"
            options={boolOptions}
            value={toYesNo(Boolean(images.reviewScreenImages?.displayDefaultBackgroundImage))}
            onChange={(value) =>
              setImages((prev: any) =>
                setByPath(prev, "reviewScreenImages.displayDefaultBackgroundImage", fromYesNo(value)),
              )
            }
          />
        </div>

        <Box paddingBlockStart="300">
          <Text as="h4" variant="headingSm">
            Manage Images
          </Text>
          <Box paddingBlockStart="100">
            <Text as="p" tone="subdued">
              Upload scene images displayed on the storefront visualizer.
            </Text>
          </Box>
          <Box paddingBlockStart="200">
            <InlineStack align="start">
              <FileUploader
                type="image"
                multiple={true}
                setFilesData={(files: string[]) => {
                  if (!Array.isArray(files) || files.length === 0) return;
                  setImages((prev: any) => ({
                    ...prev,
                    manageImages: Array.from(
                      new Set([...(prev?.manageImages || []), ...normalizeSceneImages(files)]),
                    ),
                  }));
                }}
                title="Upload scene images"
              >
                <button
                  type="button"
                  className="next-large-btn"
                  style={{ border: "none", cursor: "pointer" }}
                >
                  <Box paddingInline="1000">
                    <InlineStack gap="300" blockAlign="center">
                      <span style={{ color: "white", fontWeight: "bold" }}>Choose scenes</span>
                    </InlineStack>
                  </Box>
                </button>
              </FileUploader>
              <Box paddingInlineStart="200">
                <Button
                  type="button"
                  onClick={() =>
                    setImages((prev: any) => ({
                      ...prev,
                      manageImages: [...DEFAULT_SCENE_IMAGES],
                    }))
                  }
                >
                  Use default scenes
                </Button>
              </Box>
            </InlineStack>
          </Box>
          <Box paddingBlockStart="200">
            <Text as="p" tone="subdued">
              Default scenes path: <code>/public/aso_default_files/scenes</code>
            </Text>
          </Box>
          <Box paddingBlockStart="150">
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "12px",
              }}
            >
              {(images.manageImages || []).map((img: string, index: number) => (
                <div
                  key={`${img}-${index}`}
                  style={{
                    position: "relative",
                    width: "100px",
                    height: "100px",
                    borderRadius: "8px",
                    overflow: "hidden",
                    border: "1px solid #d1d5db",
                  }}
                >
                  <img
                    src={fileUrl(img)}
                    alt={`scene-${index}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setImages((prev: any) => ({
                        ...prev,
                        manageImages: (prev?.manageImages || []).filter(
                          (_item: string, itemIndex: number) => itemIndex !== index,
                        ),
                      }))
                    }
                    style={{
                      position: "absolute",
                      top: 4,
                      right: 4,
                      width: "20px",
                      height: "20px",
                      borderRadius: "999px",
                      border: "none",
                      background: "#ef4444",
                      color: "white",
                      cursor: "pointer",
                      fontWeight: 700,
                      lineHeight: "20px",
                      padding: 0,
                    }}
                    aria-label="Remove image"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </Box>
        </Box>
      </SectionShell>

      <SectionShell
        title="Icons"
        description="Icons list and pricing metadata."
        saving={saving}
        onSave={() => submitSection("icons", icons)}
      >
        <Box paddingBlockEnd="200">
          <InlineStack align="space-between" blockAlign="center">
            <Text as="h4" variant="headingSm">
              Icons List
            </Text>
            <Button onClick={openAddIconModal} variant="primary">
              Add new icon
            </Button>
          </InlineStack>
        </Box>
        <IndexTable
          resourceName={{ singular: "Icon", plural: "Icons" }}
          itemCount={Array.isArray(icons?.listIcons) ? icons.listIcons.length : 0}
          selectable={false}
          headings={[
            { title: "Label" },
            { title: "Min Height" },
            { title: "Base Price" },
            { title: "Action", alignment: "center" },
          ]}
        >
          {(Array.isArray(icons?.listIcons) ? icons.listIcons : []).map((icon: any, index: number) => (
            <IndexTable.Row
              id={`${index}`}
              key={`${icon?.name || "icon"}-${index}`}
              position={index}
              selected={false}
            >
              <IndexTable.Cell>
                <Text as="span" variant="bodyMd">
                  {icon?.name || `Icon ${index + 1}`}
                </Text>
              </IndexTable.Cell>
              <IndexTable.Cell>{String(icon?.minHeight ?? "-")}</IndexTable.Cell>
              <IndexTable.Cell>{String(icon?.basePrice ?? "-")}</IndexTable.Cell>
              <IndexTable.Cell>
                <ButtonGroup>
                  <Button onClick={() => openEditIconModal(icon, index)}>
                    Edit
                  </Button>
                  <Button tone="critical" onClick={() => deleteIcon(index)}>
                    Delete
                  </Button>
                </ButtonGroup>
              </IndexTable.Cell>
            </IndexTable.Row>
          ))}
        </IndexTable>

        <Box paddingBlockStart="300">
          <Text as="h4" variant="headingSm">
            Icon Settings
          </Text>
        </Box>
        <Box paddingBlockStart="200">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 12 }}>
          <TextField
            label="Title"
            autoComplete="off"
            value={String(icons.title || "")}
            onChange={(value) => setIcons((prev: any) => ({ ...prev, title: value }))}
          />
          <Select
            label="Pricing"
            options={[
              { label: "No choice made", value: "-1" },
              ...((configuration?.data?.requiredOptions?.priceOptions || []).map(
                (pr: any, index: number) => ({
                  label: pr?.label || `Pricing ${index + 1}`,
                  value: String(index),
                }),
              ) || []),
            ]}
            value={String(icons.pricing ?? -1)}
            onChange={(value) => setIcons((prev: any) => ({ ...prev, pricing: Number(value || -1) }))}
          />
          <TextField
            label="Description"
            autoComplete="off"
            multiline={3}
            value={String(icons.description || "")}
            onChange={(value) => setIcons((prev: any) => ({ ...prev, description: value }))}
          />
        </div>
        </Box>
      </SectionShell>

      <Modal
        open={iconModalOpen}
        onClose={closeIconModal}
        title={editingIconIndex == null ? "Add Icon" : "Edit Icon"}
        primaryAction={{
          content: editingIconIndex == null ? "Save" : "Update",
          onAction: saveIconModal,
        }}
        secondaryActions={[
          {
            content: "Cancel",
            onAction: closeIconModal,
          },
        ]}
      >
        <Modal.Section>
          <Box>
            <InlineStack gap="300">
              <FileUploader
                type="icon"
                multiple={false}
                setFilesData={(file: string | string[]) => {
                  const selected = Array.isArray(file) ? file[0] : file;
                  if (!selected) return;
                  setIconDraft((prev: any) => ({
                    ...prev,
                    preview: selected,
                    file: selected,
                    name:
                      String(prev?.name || "").trim() ||
                      selected.split("/").pop()?.split(".")[0] ||
                      "",
                  }));
                }}
                title="Upload icon"
              >
                <Button>Choose icon file</Button>
              </FileUploader>
              <div
                style={{
                  width: "64px",
                  height: "64px",
                  borderRadius: "8px",
                  border: "1px solid #d1d5db",
                  overflow: "hidden",
                  background: "#f8fafc",
                }}
              >
                {iconDraft?.preview ? (
                  <img
                    src={fileUrl(iconDraft.preview)}
                    alt="icon-preview"
                    style={{ width: "100%", height: "100%", objectFit: "contain" }}
                  />
                ) : null}
              </div>
            </InlineStack>
          </Box>
          <Box paddingBlockStart="300">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 12 }}>
              <TextField
                label="Icon name"
                autoComplete="off"
                value={String(iconDraft?.name || "")}
                onChange={(value) => setIconDraft((prev: any) => ({ ...prev, name: value }))}
              />
              <TextField
                label="Base Price"
                type="number"
                autoComplete="off"
                value={String(iconDraft?.basePrice ?? 0)}
                onChange={(value) =>
                  setIconDraft((prev: any) => ({ ...prev, basePrice: Number(value || 0) }))
                }
              />
              <TextField
                label="Minimum Height"
                type="number"
                autoComplete="off"
                value={String(iconDraft?.minHeight ?? 5)}
                onChange={(value) =>
                  setIconDraft((prev: any) => ({ ...prev, minHeight: Number(value || 0) }))
                }
              />
            </div>
          </Box>
        </Modal.Section>
      </Modal>

      <Box paddingBlockStart="300">
        <Divider borderWidth="025" />
      </Box>
    </Box>
  );
}
