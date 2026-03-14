import { json } from "@remix-run/node";
import type { ActionFunctionArgs } from "@remix-run/node";
import { useFetcher, useNavigation, useOutletContext, useSubmit } from "@remix-run/react";
import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import {
  Box,
  Button,
  Card,
  Divider,
  Icon,
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
import { fileUrl, getShopPath } from "~/utils/fileUrl";
import { ToggleButton } from "~/components/buttons";
import { convertSvgUrlToSinglePath } from "~/utils/svgUtils";

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

  return value.map((item) => String(item || "").trim()).filter(Boolean);
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
  path
    .split(".")
    .reduce((acc, key) => (acc == null ? undefined : acc[key]), obj);

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

const defaultCustomDesignSettings = () => ({
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
    customDesignText:
      "To submit the personalized design, please click on this button before",
    buttonLabel: "Send Custom Design",
    phraseToLinkBackTextCustomiser: "Custom now",
    steps: {
      headers: "",
      data: [],
    },
  },
});

const sanitizeCustomDesignSettings = (raw: any = {}) => {
  const defaults = defaultCustomDesignSettings();
  const merged = {
    ...defaults,
    ...raw,
    link: {
      ...defaults.link,
      ...(raw?.link || {}),
    },
    aiDesigner: {
      ...defaults.aiDesigner,
      ...(raw?.aiDesigner || {}),
    },
    editorModes: {
      ...defaults.editorModes,
      ...(raw?.editorModes || {}),
    },
    screen: {
      ...defaults.screen,
      ...(raw?.screen || {}),
      steps: {
        ...defaults.screen.steps,
        ...(raw?.screen?.steps || {}),
      },
    },
  };

  merged.aiDesigner.activate = false;
  merged.editorModes.enableTextEditor = true;

  return merged;
};

const isValidHttpUrl = (value: string) => {
  const trimmed = String(value || "").trim();
  if (!trimmed) return false;

  try {
    const url = new URL(trimmed);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
};

const getFileExtension = (value: string) => {
  const clean = String(value || "")
    .split("?")[0]
    .split("#")[0];
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

const buildSvgIconSource = (value: string) => {
  const trimmed = String(value || "").trim();
  if (!trimmed) return "";
  if (trimmed.startsWith("<svg")) return trimmed;
  if (trimmed.startsWith("<path")) {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">${trimmed}</svg>`;
  }
  return trimmed;
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
  {
    key: "requestAQuoteButton",
    label: "Get request a quote button",
    description: "",
  },
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
  {
    key: "maxSignModals.characters",
    label: "Characters Modal",
    description: "",
  },
  { key: "measurementLabel.width", label: "Width Label", description: "" },
  { key: "measurementLabel.height", label: "Height Label", description: "" },
  { key: "summaryLabel", label: "Summary", description: "" },
  { key: "editLabel", label: "Edit", description: "" },
  { key: "sectionText", label: "Text Section", description: "" },
  {
    key: "sectionAdditionalOptions",
    label: "Additional Options Section",
    description: "",
  },
  {
    key: "charactersRemaining",
    label: "Remaining characters",
    description: "",
  },
  {
    key: "minimumCharacter",
    label: "Minimum character message",
    description: "",
  },
  {
    key: "selectableTextMessage",
    label: "Selectable Text Message",
    description: "",
  },
  { key: "applyToAll", label: "Apply To All Option Text", description: "" },
];

const visualizerFields = [
  { key: "defaultText", label: "Default Text", description: "" },
  { key: "textUnderneathPrice", label: "Text Under Price", description: "" },
  { key: "visualizerOn", label: "Visualizer ON", description: "" },
  { key: "visualizerOff", label: "Visualizer OFF", description: "" },
  { key: "visualizerLight", label: "Visualizer Light", description: "" },
  { key: "visualizerDark", label: "Visualizer Dark", description: "" },
  { key: "textIcon", label: "Text Icon", description: "SVG code or path" },
  { key: "fontIcon", label: "Font Icon", description: "SVG code or path" },
  { key: "sizeIcon", label: "Size Icon", description: "SVG code or path" },
  { key: "colorIcon", label: "Color Icon", description: "SVG code or path" },
  {
    key: "letterTypeIcon",
    label: "Letter Type Icon",
    description: "SVG code or path",
  },
  {
    key: "materialIcon",
    label: "Material Icon",
    description: "SVG code or path",
  },
  { key: "jacketIcon", label: "Jacket Icon", description: "SVG code or path" },
  {
    key: "mountingIcon",
    label: "Mounting Icon",
    description: "SVG code or path",
  },
  {
    key: "backboardIcon",
    label: "Backboard Icon",
    description: "SVG code or path",
  },
  {
    key: "backboardColorIcon",
    label: "Backboard Color Icon",
    description: "SVG code or path",
  },
  {
    key: "additionalIcon",
    label: "Additional Icon",
    description: "SVG code or path",
  },
];

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const { session } = await authenticate.admin(request);
  const configId = Number(params.configId || "");

  if (!Number.isFinite(configId)) {
    return json({ ok: false }, { status: 400 });
  }

  const formData = await request.formData();
  const iconPayloadRaw = formData.get("iconPayload");
  const iconsRaw = formData.get("icons");
  const sections = ["main", "customDesign", "visualizer", "images", "icons"];

  if (
    iconPayloadRaw &&
    typeof iconPayloadRaw === "string" &&
    iconsRaw &&
    typeof iconsRaw === "string"
  ) {
    const fs = await import("fs/promises");
    const path = await import("path");
    const payload = JSON.parse(iconPayloadRaw);
    const iconsSettings = JSON.parse(iconsRaw);
    const listIcons = Array.isArray(iconsSettings?.listIcons)
      ? [...iconsSettings.listIcons]
      : [];

    const generateUniqueFileName = (extension: string) => {
      const timestamp = Date.now();
      const random = Math.floor(Math.random() * 10000);
      return `icon_${timestamp}_${random}.${extension}`;
    };

    const outputDir = path.join(
      process.cwd(),
      `./public/uploads/${getShopPath(session.id)}/icons`,
    );

    await fs.mkdir(outputDir, { recursive: true });

    const svgFileName = generateUniqueFileName("svg");
    const svgMarkup = buildSvgIconSource(String(payload?.file || ""));
    await fs.writeFile(path.join(outputDir, svgFileName), svgMarkup, "utf8");

    let fontFile = String(payload?.fontFile || "");
    if (payload?.fontDataBase64) {
      const fontFileName = generateUniqueFileName("ttf");
      const base64 = String(payload.fontDataBase64).replace(
        /^data:font\/ttf;base64,/,
        "",
      );
      await fs.writeFile(
        path.join(outputDir, fontFileName),
        Buffer.from(base64, "base64"),
      );
      fontFile = `/uploads/${getShopPath(session.id)}/icons/${fontFileName}`;
    }

    const normalizedIcon = {
      ...payload,
      file: `/uploads/${getShopPath(session.id)}/icons/${svgFileName}`,
      fontFile,
    };

    delete normalizedIcon.fontDataBase64;

    if (payload?.id === null || payload?.id === undefined) {
      listIcons.push(normalizedIcon);
    } else {
      listIcons[Number(payload.id)] = normalizedIcon;
    }

    const nextIconsSettings = {
      ...iconsSettings,
      listIcons,
    };

    await ConfigSettingsService.updateSettingsSection(
      configId,
      session.id,
      "languageImages",
      "icons",
      nextIconsSettings,
    );

    return json({
      ok: true,
      section: "icons",
      iconsSettings: nextIconsSettings,
      ...jFlashMessage("Icon saved successfully"),
    });
  }

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
      return json({
        ok: true,
        section,
        ...jFlashMessage(`${section} updated successfully`),
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

export default function ConfigSettingsLanguageImages() {
  const submit = useSubmit();
  const iconSaveFetcher = useFetcher<typeof action>();
  const navigation = useNavigation();
  const { configuration } = useOutletContext<any>();
  const saving = navigation.state === "submitting";
  const loadedPreviewFonts = useRef(new Set<string>());

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
    minimumCharacter:
      "or more characters are required, please add more characters.",
    selectableTextMessage: "Click on a word to begin customising it.",
    materialLineLength: "Material Line Length",
    applyToAll: "Apply to all",
  });

  const [customDesign, setCustomDesign] = useState<any>(
    defaultCustomDesignSettings(),
  );

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
  const [iconPreviewErrors, setIconPreviewErrors] = useState<
    Record<string, boolean>
  >({});
  const [iconModalOpen, setIconModalOpen] = useState(false);
  const [editingIconIndex, setEditingIconIndex] = useState<number | null>(null);
  const [iconDraftProcessing, setIconDraftProcessing] = useState(false);
  const [iconDraft, setIconDraft] = useState<any>({
    name: "",
    preview: "",
    file: "",
    minHeight: 5,
    basePrice: 0,
    fontFile: "",
    fontFamily: "",
    glyph: "",
    codepoint: "",
    fontDataBase64: "",
  });

  useEffect(() => {
    const languageImages = configuration?.data?.settings?.languageImages || {};

    setMain((prev: any) => ({ ...prev, ...(languageImages.main || {}) }));
    setCustomDesign(
      sanitizeCustomDesignSettings(languageImages.customDesign || {}),
    );
    setVisualizer((prev: any) => ({
      ...prev,
      ...(languageImages.visualizer || {}),
    }));
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

  useEffect(() => {
    if (iconSaveFetcher.data?.iconsSettings) {
      setIcons(iconSaveFetcher.data.iconsSettings);
      closeIconModal();
    }
  }, [iconSaveFetcher.data]);

  useEffect(() => {
    (async () => {
      for (const currentIcon of Array.isArray(icons?.listIcons)
        ? icons.listIcons
        : []) {
        if (currentIcon?.fontFamily && currentIcon?.fontFile) {
          await loadPreviewFont(currentIcon.fontFamily, currentIcon.fontFile);
        }
      }
    })();
  }, [icons]);

  const submitSection = (section: string, value: any) => {
    const sanitizedValue =
      section === "customDesign" ? sanitizeCustomDesignSettings(value) : value;

    submit({ [section]: JSON.stringify(sanitizedValue) }, { method: "POST" });
  };

  const isCustomLinkValid = isValidHttpUrl(customDesign.link?.link || "");
  const isCustomLinkInvalid =
    Boolean(customDesign.link?.activate) &&
    String(customDesign.link?.link || "").trim().length > 0 &&
    !isCustomLinkValid;

  const resetCustomDesign = () => {
    const languageImages = configuration?.data?.settings?.languageImages || {};
    setCustomDesign(
      sanitizeCustomDesignSettings(languageImages.customDesign || {}),
    );
  };

  const testCustomDesignUrl = () => {
    if (!isCustomLinkValid) return;

    window.open(
      String(customDesign.link?.link || "").trim(),
      "_blank",
      "noopener,noreferrer",
    );
  };

  const loadPreviewFont = async (
    fontFamily: string,
    fontSource: string,
    isBase64 = false,
  ) => {
    if (!fontFamily || !fontSource || typeof window === "undefined") return;

    const fontFaceSource = isBase64
      ? `url(data:font/ttf;base64,${fontSource})`
      : `url(${fileUrl(fontSource)})`;
    const cacheKey = `${fontFamily}|${fontFaceSource}`;

    if (loadedPreviewFonts.current.has(cacheKey)) {
      return;
    }

    try {
      const fontFace = new FontFace(fontFamily, fontFaceSource);
      await fontFace.load();
      document.fonts.add(fontFace);
      loadedPreviewFonts.current.add(cacheKey);
    } catch (error) {
      console.error("Unable to load icon preview font", error);
    }
  };

  const getNextIconCodepoint = () => {
    const usedCodepoints = (icons?.listIcons || [])
      .map((currentIcon: any) => {
        const rawCodepoint = String(currentIcon?.codepoint || "").replace(
          /^U\+/i,
          "",
        );
        const parsed = parseInt(rawCodepoint, 16);
        return Number.isFinite(parsed) ? parsed : null;
      })
      .filter((value: number | null) => value !== null) as number[];

    const maxCodepoint = usedCodepoints.length
      ? Math.max(...usedCodepoints)
      : 0xe001 - 1;
    const nextCodepoint = maxCodepoint + 1;
    return nextCodepoint > 0xf8ff ? 0xe001 : nextCodepoint;
  };

  const buildIconFontPayload = async (
    svgUrl: string,
    iconLabel = "icon",
  ) => {
    const [{ default: svgpath }, opentypeModule] = await Promise.all([
      import("svgpath"),
      import("opentype.js"),
    ]);
    const { Font, Glyph, Path } = opentypeModule;

    const svgString = await fetch(fileUrl(svgUrl)).then((response) =>
      response.text(),
    );
    const doc = new DOMParser().parseFromString(svgString, "image/svg+xml");
    const singlePathSvg = await convertSvgUrlToSinglePath(fileUrl(svgUrl));
    const singlePathDoc = new DOMParser().parseFromString(
      `<svg xmlns="http://www.w3.org/2000/svg">${singlePathSvg}</svg>`,
      "image/svg+xml",
    );
    const pathElement = singlePathDoc.querySelector("path");
    const pathData = pathElement?.getAttribute("d") || "";

    if (!pathData.trim()) {
      return null;
    }

    const rawViewBox = doc.documentElement.getAttribute("viewBox");
    const [viewBoxX, viewBoxY, viewBoxWidth, viewBoxHeight] = String(
      rawViewBox || "0 0 100 100",
    )
      .trim()
      .split(/[\s,]+/)
      .map((item) => Number(item));

    const safeWidth = Number.isFinite(viewBoxWidth) ? viewBoxWidth : 100;
    const safeHeight = Number.isFinite(viewBoxHeight) ? viewBoxHeight : 100;
    const safeX = Number.isFinite(viewBoxX) ? viewBoxX : 0;
    const safeY = Number.isFinite(viewBoxY) ? viewBoxY : 0;
    const unitsPerEm = 1000;
    const ascender = 850;
    const descender = -150;
    const drawableHeight = ascender - descender;
    const drawableWidth = unitsPerEm * 0.9;
    const scale = Math.min(
      drawableHeight / Math.max(1, safeHeight),
      drawableWidth / Math.max(1, safeWidth),
    );
    const scaledWidth = safeWidth * scale;
    const scaledHeight = safeHeight * scale;
    const xOffset = (unitsPerEm - scaledWidth) / 2;
    const yOffset = (drawableHeight - scaledHeight) / 2;

    const glyphPath = new Path();
    const mapToFontCoordinates = (xValue: number, yValue: number) => ({
      x: xOffset + (xValue - safeX) * scale,
      y: ascender - yOffset - (yValue - safeY) * scale,
    });

    svgpath(pathData)
      .abs()
      .unarc()
      .unshort()
      .iterate((segment: any, _index: number, currentX: number, currentY: number) => {
        const command = segment[0];
        switch (command) {
          case "M": {
            const point = mapToFontCoordinates(segment[1], segment[2]);
            glyphPath.moveTo(point.x, point.y);
            break;
          }
          case "L": {
            const point = mapToFontCoordinates(segment[1], segment[2]);
            glyphPath.lineTo(point.x, point.y);
            break;
          }
          case "H": {
            const point = mapToFontCoordinates(segment[1], currentY);
            glyphPath.lineTo(point.x, point.y);
            break;
          }
          case "V": {
            const point = mapToFontCoordinates(currentX, segment[1]);
            glyphPath.lineTo(point.x, point.y);
            break;
          }
          case "C": {
            const c1 = mapToFontCoordinates(segment[1], segment[2]);
            const c2 = mapToFontCoordinates(segment[3], segment[4]);
            const end = mapToFontCoordinates(segment[5], segment[6]);
            glyphPath.curveTo(c1.x, c1.y, c2.x, c2.y, end.x, end.y);
            break;
          }
          case "Q": {
            const control = mapToFontCoordinates(segment[1], segment[2]);
            const end = mapToFontCoordinates(segment[3], segment[4]);
            glyphPath.quadTo(control.x, control.y, end.x, end.y);
            break;
          }
          case "Z":
            glyphPath.closePath();
            break;
          default:
            break;
        }

        return segment;
      });

    if (glyphPath.commands.length === 0) {
      return null;
    }

    const codepoint = getNextIconCodepoint();
    const fontFamily = `ncpc-icon-${Date.now()}-${Math.floor(Math.random() * 100000)}`;
    const glyph = new Glyph({
      name: String(iconLabel || "icon")
        .replace(/[^a-zA-Z0-9-_]/g, "-")
        .replace(/-{2,}/g, "-")
        .toLowerCase(),
      unicode: codepoint,
      advanceWidth: unitsPerEm,
      path: glyphPath,
    });
    const notDef = new Glyph({
      name: ".notdef",
      unicode: 0,
      advanceWidth: unitsPerEm / 2,
      path: new Path(),
    });
    const font = new Font({
      familyName: fontFamily,
      styleName: "Regular",
      unitsPerEm,
      ascender,
      descender,
      glyphs: [notDef, glyph],
    });

    const buffer = font.toArrayBuffer();
    const base64 = btoa(
      Array.from(new Uint8Array(buffer))
        .map((byte) => String.fromCharCode(byte))
        .join(""),
    );

    const processedSvgMarkup = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${safeX} ${safeY} ${safeWidth} ${safeHeight}" fill="currentColor">${singlePathSvg}</svg>`;

    return {
      fontDataBase64: base64,
      fontFamily,
      glyph: String.fromCodePoint(codepoint),
      codepoint: codepoint.toString(16).toUpperCase(),
      processedSvg: processedSvgMarkup,
    };
  };

  const persistIcons = (nextIcons: any) => {
    setIcons(nextIcons);
    submitSection("icons", nextIcons);
  };

  const openAddIconModal = () => {
    setEditingIconIndex(null);
    setIconDraftProcessing(false);
    setIconDraft({
      name: "",
      preview: "",
      file: "",
      minHeight: 5,
      basePrice: 0,
      fontFile: "",
      fontFamily: "",
      glyph: "",
      codepoint: "",
      fontDataBase64: "",
    });
    setIconModalOpen(true);
  };

  const openEditIconModal = (icon: any, index: number) => {
    setEditingIconIndex(index);
    setIconDraftProcessing(false);
    setIconDraft({
      name: icon?.name || "",
      preview: icon?.preview || "",
      file: icon?.file || "",
      minHeight: icon?.minHeight ?? 5,
      basePrice: icon?.basePrice ?? 0,
      fontFile: icon?.fontFile || "",
      fontFamily: icon?.fontFamily || "",
      glyph: icon?.glyph || "",
      codepoint: icon?.codepoint || "",
      fontDataBase64: "",
    });
    if (icon?.fontFamily && icon?.fontFile) {
      loadPreviewFont(icon.fontFamily, icon.fontFile);
    }
    setIconModalOpen(true);
  };

  const closeIconModal = () => {
    setIconModalOpen(false);
    setEditingIconIndex(null);
    setIconDraftProcessing(false);
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

    const shouldPersistThroughUpload =
      String(normalizedIcon.file || "")
        .trim()
        .startsWith("<svg") || Boolean(normalizedIcon.fontDataBase64);

    if (shouldPersistThroughUpload) {
      iconSaveFetcher.submit(
        {
          icons: JSON.stringify(icons),
          iconPayload: JSON.stringify({
            ...normalizedIcon,
            id: editingIconIndex,
          }),
        },
        { method: "POST" },
      );
      return;
    }

    const currentIcons = Array.isArray(icons?.listIcons)
      ? [...icons.listIcons]
      : [];
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
    const currentIcons = Array.isArray(icons?.listIcons)
      ? [...icons.listIcons]
      : [];
    currentIcons.splice(index, 1);
    persistIcons({
      ...icons,
      listIcons: currentIcons,
    });
  };

  const handleSelectIconFile = async (file: string | string[]) => {
    const selected = Array.isArray(file) ? file[0] : file;
    if (!selected) return;

    const nextName =
      selected.split("/").pop()?.split(".")[0] || iconDraft?.name || "Icon";

    setIconDraft((prev: any) => ({
      ...prev,
      preview: selected,
      name: String(prev?.name || "").trim() || nextName,
    }));

    if (!selected.toLowerCase().endsWith(".svg")) {
      setIconDraft((prev: any) => ({ ...prev, file: selected }));
      return;
    }

    setIconDraftProcessing(true);
    try {
      const fontPayload = await buildIconFontPayload(selected, nextName);
      if (!fontPayload) {
        throw new Error("Unable to generate icon font");
      }
      await loadPreviewFont(fontPayload.fontFamily, fontPayload.fontDataBase64, true);
      setIconDraft((prev: any) => ({
        ...prev,
        preview: selected,
        file: fontPayload.processedSvg,
        name: String(prev?.name || "").trim() || nextName,
        fontFile: "",
        fontFamily: fontPayload.fontFamily,
        glyph: fontPayload.glyph,
        codepoint: fontPayload.codepoint,
        fontDataBase64: fontPayload.fontDataBase64,
      }));
    } catch (error) {
      console.error("Unable to prepare icon font", error);
    } finally {
      setIconDraftProcessing(false);
    }
  };

  return (
    <Box paddingBlockEnd="400">
      <SectionShell
        title="Main"
        description="Main labels and texts of the customizer UI."
        saving={saving}
        onSave={() => submitSection("main", main)}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gap: 12,
          }}
        >
          {mainFields.map((field) => (
            <TextField
              key={field.key}
              label={field.label}
              helpText={field.description}
              autoComplete="off"
              value={String(getByPath(main, field.key) || "")}
              onChange={(value) =>
                setMain((prev: any) => setByPath(prev, field.key, value))
              }
            />
          ))}
        </div>
      </SectionShell>

      <SectionShell
        title="Custom Design"
        description="For more complex sign designs, define how customers can submit custom design requests."
        saving={saving}
        onSave={() => submitSection("customDesign", customDesign)}
      >
        <div style={{ display: "grid", gap: 16 }}>
          <Card>
            <Box padding="400">
              <div
                style={{
                  marginBottom: 16,
                  border: "1px solid #FCD34D",
                  background: "#FFFBEB",
                  color: "#92400E",
                  borderRadius: 12,
                  padding: 12,
                  fontSize: 12,
                }}
              >
                AI Sign Designer is currently in development and not available
                yet.
              </div>
              <Card>
                <Box padding="400">
                  <InlineStack
                    align="space-between"
                    blockAlign="start"
                    gap="300"
                  >
                    <Box>
                      <Text as="h3" variant="headingSm">
                        AI Sign Designer
                      </Text>
                      <Box paddingBlockStart="100">
                        <Text as="p" tone="subdued">
                          Upload JPG, PNG, or SVG images and transform them into
                          production-ready sign designs.
                        </Text>
                      </Box>
                    </Box>
                    <div
                      style={{
                        borderRadius: 999,
                        background: "#E4E4E7",
                        color: "#3F3F46",
                        padding: "2px 8px",
                        fontSize: 11,
                        fontWeight: 600,
                        whiteSpace: "nowrap",
                      }}
                    >
                      Coming Soon
                    </div>
                  </InlineStack>
                  <Box paddingBlockStart="300">
                    <div
                      style={{
                        borderRadius: 12,
                        background: "#F8FAFC",
                        padding: 16,
                      }}
                    >
                      <Text as="p" variant="bodySm" fontWeight="semibold">
                        Key Benefits:
                      </Text>
                      <ul
                        style={{
                          margin: "8px 0 0 18px",
                          padding: 0,
                          color: "#52525B",
                          fontSize: 12,
                        }}
                      >
                        <li>
                          Automatically convert customer images into editable
                          sign designs
                        </li>
                        <li>
                          Complete creative control with sizing and pricing
                        </li>
                        <li>
                          Production-ready output for immediate manufacturing
                        </li>
                      </ul>
                    </div>
                  </Box>
                  <Box paddingBlockStart="300">
                    <InlineStack blockAlign="center" gap="300">
                      <ToggleButton
                        id="custom-design-ai-lock"
                        checked={false}
                        disabled
                      />
                      <Text as="p" variant="bodySm" fontWeight="medium">
                        Enable AI Image Designer (Coming Soon)
                      </Text>
                    </InlineStack>
                  </Box>
                </Box>
              </Card>
              <div
                style={{
                  marginTop: 16,
                  border: "1px solid #FCD34D",
                  background: "#FFFBEB",
                  color: "#92400E",
                  borderRadius: 12,
                  padding: 12,
                  fontSize: 12,
                }}
              >
                This feature will be enabled in a future update.
              </div>
            </Box>
          </Card>

          <Card>
            <Box padding="400">
              <Text as="h3" variant="headingSm">
                Editor Modes
              </Text>
              <Box paddingBlockStart="100">
                <Text as="p" tone="subdued">
                  Control which editor interfaces are available to your
                  customers. You can keep the standard text editor enabled while
                  the advanced custom design flow evolves.
                </Text>
              </Box>
              <Box paddingBlockStart="300">
                <div
                  style={{
                    border: "1px solid #E4E4E7",
                    background: "#FAFAFA",
                    borderRadius: 12,
                    padding: 16,
                  }}
                >
                  <InlineStack blockAlign="center" gap="300">
                    <ToggleButton
                      id="custom-design-editor-lock"
                      checked
                      disabled
                    />
                    <Text as="p" variant="bodySm" fontWeight="medium">
                      Enable Text Editor (Always On)
                    </Text>
                  </InlineStack>
                  <Box paddingBlockStart="200">
                    <Text as="p" variant="bodySm" tone="subdued">
                      This option is temporarily locked and always enabled.
                    </Text>
                  </Box>
                </div>
              </Box>
              <div
                style={{
                  marginTop: 12,
                  border: "1px solid #BFDBFE",
                  background: "#EFF6FF",
                  color: "#1D4ED8",
                  borderRadius: 12,
                  padding: 12,
                  fontSize: 12,
                }}
              >
                Text Editor remains enabled for now. A future update will allow
                switching editor modes.
              </div>
            </Box>
          </Card>

          <Card>
            <Box padding="400">
              <Text as="h3" variant="headingSm">
                Custom Design Link
              </Text>
              <Box paddingBlockStart="100">
                <Text as="p" tone="subdued">
                  Display a custom link for customers who need a more complex
                  sign or quote workflow than the standard text customizer.
                </Text>
              </Box>
              <Box paddingBlockStart="300">
                <InlineStack blockAlign="center" gap="300">
                  <Text as="span" variant="bodySm" fontWeight="medium">
                    Enable
                  </Text>
                  <ToggleButton
                    id="custom-design-link-toggle"
                    checked={Boolean(customDesign.link?.activate)}
                    onChange={(checked) =>
                      setCustomDesign((prev: any) =>
                        setByPath(prev, "link.activate", checked),
                      )
                    }
                  />
                </InlineStack>
              </Box>

              {customDesign.link?.activate ? (
                <Box paddingBlockStart="300">
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "minmax(0, 1fr)",
                      gap: 12,
                    }}
                  >
                    <TextField
                      label="Custom Design URL"
                      autoComplete="off"
                      value={String(customDesign.link?.link || "")}
                      onChange={(value) =>
                        setCustomDesign((prev: any) =>
                          setByPath(prev, "link.link", value),
                        )
                      }
                      helpText={
                        isCustomLinkInvalid
                          ? "Please enter a valid URL starting with http:// or https://."
                          : "URL to redirect customers to a more advanced custom design or quote page."
                      }
                      error={isCustomLinkInvalid ? "Invalid URL" : undefined}
                      connectedRight={
                        <Button
                          onClick={testCustomDesignUrl}
                          disabled={!isCustomLinkValid}
                        >
                          Test URL
                        </Button>
                      }
                    />
                    <TextField
                      label="Link Phrase"
                      autoComplete="off"
                      value={String(
                        customDesign.link?.phraseSubmitCustom || "",
                      )}
                      onChange={(value) =>
                        setCustomDesign((prev: any) =>
                          setByPath(prev, "link.phraseSubmitCustom", value),
                        )
                      }
                      helpText="Text shown to customers for the custom design action."
                    />
                  </div>
                </Box>
              ) : null}

              <Box paddingBlockStart="300">
                <InlineStack align="end">
                  <Button onClick={resetCustomDesign}>Reset All</Button>
                </InlineStack>
              </Box>
            </Box>
          </Card>
        </div>
      </SectionShell>

      <SectionShell
        title="Visualizer"
        description="Visualizer labels and icon assets."
        saving={saving}
        onSave={() => submitSection("visualizer", visualizer)}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            gap: 12,
          }}
        >
          {visualizerFields.map((field) =>
            field.key.includes("Icon") ? (
              (() => {
                const rawValue = String(
                  getByPath(visualizer, field.key) || "",
                ).trim();
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
                            const selected = Array.isArray(file)
                              ? file[0]
                              : file;
                            if (!selected) return;
                            setIconPreviewErrors((prev) => ({
                              ...prev,
                              [field.key]: false,
                            }));
                            setVisualizer((prev: any) =>
                              setByPath(prev, field.key, selected),
                            );
                          }}
                        >
                          <Button>Choose SVG</Button>
                        </FileUploader>
                        <Button
                          tone="critical"
                          variant="tertiary"
                          onClick={() => {
                            setIconPreviewErrors((prev) => ({
                              ...prev,
                              [field.key]: false,
                            }));
                            setVisualizer((prev: any) =>
                              setByPath(prev, field.key, ""),
                            );
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
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "contain",
                            }}
                            onLoad={() =>
                              setIconPreviewErrors((prev) => ({
                                ...prev,
                                [field.key]: false,
                              }))
                            }
                            onError={() =>
                              setIconPreviewErrors((prev) => ({
                                ...prev,
                                [field.key]: true,
                              }))
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
                  setVisualizer((prev: any) =>
                    setByPath(prev, field.key, value),
                  )
                }
              />
            ),
          )}
        </div>
      </SectionShell>

      <SectionShell
        title="Images"
        description="Background and review image behavior."
        saving={saving}
        onSave={() => submitSection("images", images)}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            gap: 12,
          }}
        >
          <Select
            label="Enable Preview Images"
            options={boolOptions}
            value={toYesNo(Boolean(images.previewImage?.activate))}
            onChange={(value) =>
              setImages((prev: any) =>
                setByPath(prev, "previewImage.activate", fromYesNo(value)),
              )
            }
          />
          <Select
            label="Display default preview background"
            options={boolOptions}
            value={toYesNo(
              Boolean(images.previewImage?.displayDefaultBackgroundImage),
            )}
            onChange={(value) =>
              setImages((prev: any) =>
                setByPath(
                  prev,
                  "previewImage.displayDefaultBackgroundImage",
                  fromYesNo(value),
                ),
              )
            }
          />
          <Select
            label="Allow upload preview background"
            options={boolOptions}
            value={toYesNo(Boolean(images.previewImage?.allowUpload))}
            onChange={(value) =>
              setImages((prev: any) =>
                setByPath(prev, "previewImage.allowUpload", fromYesNo(value)),
              )
            }
          />
          <TextField
            label="Upload text"
            autoComplete="off"
            value={String(images.previewImage?.uploadText || "")}
            onChange={(value) =>
              setImages((prev: any) =>
                setByPath(prev, "previewImage.uploadText", value),
              )
            }
          />
          <Select
            label="Enable Review Image"
            options={boolOptions}
            value={toYesNo(Boolean(images.enableReviewImage))}
            onChange={(value) =>
              setImages((prev: any) => ({
                ...prev,
                enableReviewImage: fromYesNo(value),
              }))
            }
          />
          <Select
            label="Enable Review Screen Images"
            options={boolOptions}
            value={toYesNo(Boolean(images.reviewScreenImages?.activate))}
            onChange={(value) =>
              setImages((prev: any) =>
                setByPath(
                  prev,
                  "reviewScreenImages.activate",
                  fromYesNo(value),
                ),
              )
            }
          />
          <Select
            label="Display default review background"
            options={boolOptions}
            value={toYesNo(
              Boolean(images.reviewScreenImages?.displayDefaultBackgroundImage),
            )}
            onChange={(value) =>
              setImages((prev: any) =>
                setByPath(
                  prev,
                  "reviewScreenImages.displayDefaultBackgroundImage",
                  fromYesNo(value),
                ),
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
                      new Set([
                        ...(prev?.manageImages || []),
                        ...normalizeSceneImages(files),
                      ]),
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
                      <span style={{ color: "white", fontWeight: "bold" }}>
                        Choose scenes
                      </span>
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
                          (_item: string, itemIndex: number) =>
                            itemIndex !== index,
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
          itemCount={
            Array.isArray(icons?.listIcons) ? icons.listIcons.length : 0
          }
          selectable={false}
          headings={[
            { title: "Preview" },
            { title: "Label" },
            { title: "Min Height" },
            { title: "Base Price" },
            { title: "Action" },
          ]}
        >
          {(Array.isArray(icons?.listIcons) ? icons.listIcons : []).map(
            (icon: any, index: number) => (
              <IndexTable.Row
                id={`${index}`}
                key={`${icon?.name || "icon"}-${index}`}
              position={index}
              selected={false}
            >
                <IndexTable.Cell>
                  <div
                    style={{
                      width: 52,
                      height: 52,
                      borderRadius: 10,
                      border: "1px solid #d4d4d8",
                      background: "#fafafa",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      overflow: "hidden",
                    }}
                  >
                    {icon?.glyph && (icon?.fontFamily || icon?.fontFile) ? (
                      <span
                        className="ncpc-icon-font-preview"
                        style={{
                          fontFamily: `'${String(icon.fontFamily || "")}'`,
                          fontSize: 28,
                          lineHeight: 1,
                        }}
                      >
                        {String(icon.glyph)}
                      </span>
                    ) : String(icon?.file || "")
                        .trim()
                        .startsWith("<") ? (
                      <Icon source={buildSvgIconSource(String(icon?.file || ""))} />
                    ) : icon?.preview || icon?.file ? (
                      <img
                        src={fileUrl(String(icon?.preview || icon?.file || ""))}
                        alt={String(icon?.name || `icon-${index + 1}`)}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                        }}
                      />
                    ) : null}
                  </div>
                </IndexTable.Cell>
                <IndexTable.Cell>
                  <Text as="span" variant="bodyMd">
                    {icon?.name || `Icon ${index + 1}`}
                  </Text>
                </IndexTable.Cell>
                <IndexTable.Cell>
                  {String(icon?.minHeight ?? "-")}
                </IndexTable.Cell>
                <IndexTable.Cell>
                  {String(icon?.basePrice ?? "-")}
                </IndexTable.Cell>
                <IndexTable.Cell>
                  <InlineStack gap="200" align="start">
                    <Button onClick={() => openEditIconModal(icon, index)}>
                      Edit
                    </Button>
                    <Button tone="critical" onClick={() => deleteIcon(index)}>
                      Delete
                    </Button>
                  </InlineStack>
                </IndexTable.Cell>
              </IndexTable.Row>
            ),
          )}
        </IndexTable>

        <Box paddingBlockStart="300">
          <Text as="h4" variant="headingSm">
            Icon Settings
          </Text>
        </Box>
        <Box paddingBlockStart="200">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
              gap: 12,
            }}
          >
            <TextField
              label="Title"
              autoComplete="off"
              value={String(icons.title || "")}
              onChange={(value) =>
                setIcons((prev: any) => ({ ...prev, title: value }))
              }
            />
            <Select
              label="Pricing"
              options={[
                { label: "No choice made", value: "-1" },
                ...((
                  configuration?.data?.requiredOptions?.priceOptions || []
                ).map((pr: any, index: number) => ({
                  label: pr?.label || `Pricing ${index + 1}`,
                  value: String(index),
                })) || []),
              ]}
              value={String(icons.pricing ?? -1)}
              onChange={(value) =>
                setIcons((prev: any) => ({
                  ...prev,
                  pricing: Number(value || -1),
                }))
              }
            />
            <TextField
              label="Description"
              autoComplete="off"
              multiline={3}
              value={String(icons.description || "")}
              onChange={(value) =>
                setIcons((prev: any) => ({ ...prev, description: value }))
              }
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
          loading: iconSaveFetcher.state === "submitting",
          disabled:
            iconDraftProcessing ||
            iconSaveFetcher.state === "submitting" ||
            String(iconDraft?.name || "").trim().length === 0 ||
            String(iconDraft?.preview || "").trim().length === 0,
        }}
        secondaryActions={[
          {
            content: "Cancel",
            onAction: closeIconModal,
          },
        ]}
      >
        <Modal.Section>
          <div style={{ display: "grid", gap: 16 }}>
            <InlineStack align="space-between" blockAlign="center" gap="300">
              <InlineStack blockAlign="center" gap="300">
                <FileUploader
                  type="icon"
                  multiple={false}
                  setFilesData={handleSelectIconFile}
                  title="Upload icon"
                >
                  <Button>Choose icon file</Button>
                </FileUploader>
                <Text as="p" tone={iconDraft?.preview ? "base" : "subdued"}>
                  {iconDraft?.preview
                    ? getFileName(String(iconDraft.preview))
                    : "No file selected"}
                </Text>
              </InlineStack>
              <Text
                as="p"
                tone={
                  iconDraftProcessing
                    ? "subdued"
                    : iconDraft?.glyph
                      ? "success"
                      : "subdued"
                }
              >
                {iconDraftProcessing
                  ? "Processing..."
                  : iconDraft?.glyph
                    ? "Ready"
                    : ""}
              </Text>
            </InlineStack>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                gap: 16,
              }}
            >
              <div
                style={{
                  border: "1px solid #E4E4E7",
                  borderRadius: 12,
                  padding: 16,
                  background: "#FFFFFF",
                }}
              >
                <Text as="p" variant="bodySm" fontWeight="medium">
                  Original
                </Text>
                <div
                  style={{
                    marginTop: 12,
                    width: "100%",
                    minHeight: "140px",
                    borderRadius: "10px",
                    border: "1px solid #d1d5db",
                    overflow: "hidden",
                    background: "#f8fafc",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 12,
                  }}
                >
                  {iconDraft?.preview ? (
                    <img
                      src={fileUrl(iconDraft.preview)}
                      alt="icon-original-preview"
                      style={{
                        width: "100%",
                        height: "116px",
                        objectFit: "contain",
                      }}
                    />
                  ) : (
                    <Text as="p" tone="subdued" variant="bodySm">
                      No preview
                    </Text>
                  )}
                </div>
              </div>

              <div
                style={{
                  border: "1px solid #E4E4E7",
                  borderRadius: 12,
                  padding: 16,
                  background: "#FFFFFF",
                }}
              >
                <Text as="p" variant="bodySm" fontWeight="medium">
                  Processed
                </Text>
                <div
                  style={{
                    marginTop: 12,
                    width: "100%",
                    minHeight: "140px",
                    borderRadius: "10px",
                    border: "1px solid #d1d5db",
                    overflow: "hidden",
                    background: "#f8fafc",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 12,
                  }}
                >
                  {iconDraftProcessing ? (
                    <Text as="p" tone="subdued" variant="bodySm">
                      Processing...
                    </Text>
                  ) : iconDraft?.glyph && iconDraft?.fontFamily ? (
                    <span
                      className="ncpc-icon-font-preview"
                      style={{
                        fontFamily: `'${String(iconDraft.fontFamily || "")}'`,
                        fontSize: 56,
                        lineHeight: 1,
                      }}
                    >
                      {String(iconDraft.glyph || "")}
                    </span>
                  ) : String(iconDraft?.file || "")
                      .trim()
                      .startsWith("<") ? (
                    <Icon source={buildSvgIconSource(String(iconDraft?.file || ""))} />
                  ) : iconDraft?.file ? (
                    <img
                      src={fileUrl(iconDraft.file)}
                      alt="icon-processed-preview"
                      style={{
                        width: "100%",
                        height: "116px",
                        objectFit: "contain",
                      }}
                    />
                  ) : (
                    <Text as="p" tone="subdued" variant="bodySm">
                      No preview
                    </Text>
                  )}
                </div>
              </div>
            </div>

            <div
              style={{
                border: "1px solid #E4E4E7",
                background: "#FAFAFA",
                borderRadius: 12,
                padding: 12,
              }}
            >
              <Text as="p" tone="subdued" variant="bodySm">
                SVGs are processed before save to keep them compatible with the
                NCPC icon system.
              </Text>
            </div>

          <Box paddingBlockStart="400">
            <Text as="h3" variant="headingSm">
              Icon Settings
            </Text>
          </Box>
          <Box paddingBlockStart="200">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                gap: 12,
              }}
            >
              <TextField
                label="Icon name"
                autoComplete="off"
                value={String(iconDraft?.name || "")}
                onChange={(value) =>
                  setIconDraft((prev: any) => ({ ...prev, name: value }))
                }
              />
              <TextField
                label="Base Price"
                type="number"
                autoComplete="off"
                value={String(iconDraft?.basePrice ?? 0)}
                onChange={(value) =>
                  setIconDraft((prev: any) => ({
                    ...prev,
                    basePrice: Number(value || 0),
                  }))
                }
              />
              <TextField
                label="Minimum Height"
                type="number"
                autoComplete="off"
                value={String(iconDraft?.minHeight ?? 5)}
                onChange={(value) =>
                  setIconDraft((prev: any) => ({
                    ...prev,
                    minHeight: Number(value || 0),
                  }))
                }
              />
            </div>
          </Box>
          </div>
        </Modal.Section>
      </Modal>

      <Box paddingBlockStart="300">
        <Divider borderWidth="025" />
      </Box>
    </Box>
  );
}
