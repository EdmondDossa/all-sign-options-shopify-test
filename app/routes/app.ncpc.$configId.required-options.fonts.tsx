import { json } from "@remix-run/node";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import {
  Banner,
  BlockStack,
  Box,
  Button,
  Card,
  Divider,
  Icon,
  IndexTable,
  InlineStack,
  Page,
  Text,
  TextField,
} from "@shopify/polaris";
import {
  DeleteIcon,
  DragHandleIcon,
  EditIcon,
  PlusIcon,
} from "@shopify/polaris-icons";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  useLoaderData,
  useLocation,
  useNavigation,
  useOutletContext,
  useSubmit,
} from "@remix-run/react";
import FontForm from "~/components/layouts/FontForm";
import type { AdvancedFont, FixedFont } from "~/components/layouts/FontForm";
import { ToggleButton } from "~/components/buttons";
import NcpcRowActions from "~/components/ncpc/NcpcRowActions";
import FontService from "~/models/Font.service";
import NcpcConfigurationService from "~/models/NcpcConfiguration.service";
import { authenticate } from "~/shopify.server";
import type { FontType } from "~/types/ManagePropertyType";
import type { NcpcRouteContext } from "~/types/NcpcRouteContext";
import { loadGoogleFontsCatalog } from "~/utils/google-fonts.server";
import { fileUrl } from "~/utils/fileUrl";
import { jFlashMessage } from "~/utils/message-flash";
import { truncateText } from "~/utils/truncate-text";

type FontItem = FixedFont | AdvancedFont;

const parseIndex = (value: FormDataEntryValue | null) => {
  const parsed = parseInt(String(value || ""), 10);
  return Number.isNaN(parsed) ? -1 : parsed;
};

const normalizePricingMode = (value: unknown) => {
  const normalized = String(value || "")
    .trim()
    .toLowerCase();

  if (normalized === "fixing-height") return "fixed-height";
  if (normalized === "fixing-width") return "fixed-width";
  return normalized || "fixed-height";
};

const toFormSizes = (rawSizes: any[] = []) =>
  rawSizes.map((size: any) => ({
    ...size,
    numberLines: Number(size?.numberLines ?? size?.textNumber ?? 1),
  }));

const emptyFontSettings = {
  label: "",
  description: "",
  fonts: [] as any[],
};

const normalizeStoredFont = (input: any) => {
  const isDefault = Boolean(input?.isDefault ?? input?.default);
  return {
    ...(input || {}),
    isDefault,
    default: isDefault,
  };
};

const ensureSingleDefaultFont = (rows: any[] = []) => {
  const fonts = rows.map((row) => normalizeStoredFont(row));
  if (fonts.length === 0) return fonts;

  const defaultIndexes = fonts
    .map((font, index) => (font.isDefault ? index : -1))
    .filter((index) => index >= 0);

  const targetDefaultIndex = defaultIndexes.length > 0 ? defaultIndexes[0] : 0;

  return fonts.map((font, index) => ({
    ...font,
    isDefault: index === targetDefaultIndex,
    default: index === targetDefaultIndex,
  }));
};

const getFontFormatFromUrl = (url: string) => {
  const cleanUrl = String(url || "")
    .split("?")[0]
    .toLowerCase();
  if (cleanUrl.endsWith(".woff2")) return "woff2";
  if (cleanUrl.endsWith(".woff")) return "woff";
  if (cleanUrl.endsWith(".ttf")) return "truetype";
  if (cleanUrl.endsWith(".otf")) return "opentype";
  return "";
};

const escapeCssValue = (value: string) =>
  String(value || "")
    .replace(/\\/g, "\\\\")
    .replace(/'/g, "\\'");

const toCssFontSourceUrl = (url: string) => {
  const normalized = String(fileUrl(url) || "").trim();
  if (!normalized) return "";
  return encodeURI(normalized);
};

const getPreviewFontFamily = (label: string, index: number) =>
  `ncpc_preview_${String(label || "")
    .trim()
    .replace(/[\s-]+/g, "_")
    .replace(/[^a-zA-Z0-9_]/g, "")
    .replace(/_+/g, "_")}_${index}`;

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { session } = await authenticate.admin(request);

  const [managedFonts, googleFonts] = await Promise.all([
    FontService.getFonts(session.id),
    loadGoogleFontsCatalog(),
  ]);

  return json({
    managedFonts: Array.isArray(managedFonts) ? managedFonts : [],
    googleFonts,
  });
};

export default function NcpcRequiredFonts() {
  const submit = useSubmit();
  const location = useLocation();
  const navigation = useNavigation();
  const { managedFonts, googleFonts } = useLoaderData<typeof loader>();
  const { configuration, ncpcData } = useOutletContext<NcpcRouteContext>();

  const pricingMode = normalizePricingMode(
    (configuration as any)?.pricingMode || (ncpcData as any)?.pricingMode,
  );

  const fontOptions =
    (ncpcData as any)?.requiredOptions?.fontOptions || emptyFontSettings;
  const fonts = useMemo(
    () => (Array.isArray(fontOptions?.fonts) ? fontOptions.fonts : []),
    [fontOptions?.fonts],
  );
  const [fontSettings, setFontSettings] = useState({
    label: String(fontOptions?.label || ""),
    description: String(fontOptions?.description || ""),
  });

  useEffect(() => {
    setFontSettings({
      label: String(fontOptions?.label || ""),
      description: String(fontOptions?.description || ""),
    });
  }, [fontOptions?.label, fontOptions?.description]);

  const sizes = useMemo(() => {
    const sizeOptions = (ncpcData as any)?.requiredOptions?.sizeOptions || {};
    const rawSizes = Array.isArray(sizeOptions?.sizes)
      ? sizeOptions.sizes
      : Array.isArray(sizeOptions?.allSizes)
        ? sizeOptions.allSizes
        : [];

    return toFormSizes(rawSizes);
  }, [ncpcData]);

  const pricings = useMemo(() => {
    const options = (ncpcData as any)?.requiredOptions?.priceOptions;
    return Array.isArray(options) ? options : [];
  }, [ncpcData]);

  const [showForm, setShowForm] = useState(false);
  const [editingFont, setEditingFont] = useState<FontItem | null>(null);
  const dragDropRef = useRef<{
    destroy: () => void;
  } | null>(null);
  const tableWrapperRef = useRef<HTMLDivElement | null>(null);

  const isSubmitting = navigation.state === "submitting";
  const actionTarget = `${location.pathname}${location.search}`;

  useEffect(() => {
    if (!tableWrapperRef.current || showForm || fonts.length <= 1) return;

    const tbody = tableWrapperRef.current.querySelector("tbody");
    if (!tbody) return;

    let mounted = true;
    let dragDropInstance: any = null;
    const cleanup = () => {
      dragDropRef.current?.destroy();
      dragDropRef.current = null;
    };

    void (async () => {
      const draggableModule = await import("@shopify/draggable");
      if (!mounted) return;

      dragDropInstance = new draggableModule.Sortable(tbody, {
        draggable: "tr",
        handle: ".drag-handle",
      });

      const onStop = (evt: any) => {
        const oldIndex = Number.isFinite(evt?.oldIndex) ? evt.oldIndex : -1;
        const newIndex = Number.isFinite(evt?.newIndex) ? evt.newIndex : -1;
        if (oldIndex < 0 || newIndex < 0 || oldIndex === newIndex) return;

        const nextFonts = [...fonts];
        const [moved] = nextFonts.splice(oldIndex, 1);
        nextFonts.splice(newIndex, 0, moved);

        submit(
          {
            operation: "reorder-fonts",
            fonts: JSON.stringify(nextFonts),
          },
          { method: "POST", action: actionTarget },
        );
      };

      dragDropInstance.on("sortable:stop", onStop);
      dragDropRef.current = {
        destroy: () => {
          dragDropInstance?.off?.("sortable:stop", onStop);
          dragDropInstance?.destroy?.();
        },
      };
    })();

    return () => {
      mounted = false;
      cleanup();
    };
  }, [showForm, fonts, submit, actionTarget]);

  const handleDelete = (index: number) => {
    submit(
      {
        operation: "delete-font",
        index: String(index),
      },
      { method: "POST", action: actionTarget },
    );
  };

  const handleSetDefault = (index: number) => {
    const current = fonts[index];
    if (current && Boolean(current?.isDefault ?? current?.default)) return;

    submit(
      {
        operation: "set-default-font",
        index: String(index),
      },
      { method: "POST", action: actionTarget },
    );
  };

  const handleSubmitForm = (font: FontItem) => {
    const isEditing = font?.id != null;
    const index = isEditing ? Number(font.id) : -1;
    const payload = { ...font } as any;
    delete payload.id;

    submit(
      {
        operation: isEditing ? "update-font" : "add-font",
        ...(isEditing ? { index: String(index) } : {}),
        font: JSON.stringify(payload),
      },
      { method: "POST", action: actionTarget },
    );

    setShowForm(false);
    setEditingFont(null);
  };

  const fontPreviewCss = useMemo(
    () =>
      fonts
        .map((font: any, index: number) => {
          const url = toCssFontSourceUrl(String(font?.url || ""));
          const label = String(font?.label || "").trim();
          if (!url || !label) return "";
          const familyName = getPreviewFontFamily(label, index);

          const format = getFontFormatFromUrl(url);
          const srcPart = format
            ? `url('${escapeCssValue(url)}') format('${format}')`
            : `url('${escapeCssValue(url)}')`;

          return `@font-face{font-family:'${escapeCssValue(familyName)}';src:${srcPart};font-display:swap;font-style:normal;font-weight:400;}`;
        })
        .filter(Boolean)
        .join("\n"),
    [fonts],
  );

  const rows = fonts.map((font: any, index: number) => (
    <IndexTable.Row id={`${index}`} key={`${index}`} position={index}>
      <IndexTable.Cell>
        <span
          className="drag-handle"
          style={{ cursor: "grab", display: "inline-flex" }}
        >
          <Icon source={DragHandleIcon} />
        </span>
      </IndexTable.Cell>
      <IndexTable.Cell>
        <Text as="span" variant="bodyMd" fontWeight="medium">
          {truncateText(String(font?.label || `Font ${index + 1}`), 20)}
        </Text>
      </IndexTable.Cell>
      <IndexTable.Cell>
        {font?.previewImg ? (
          <img
            src={String(fileUrl(font.previewImg) || "")}
            alt={`${font?.label || "Font"} preview`}
            style={{
              width: "68px",
              height: "42px",
              objectFit: "cover",
              borderRadius: "8px",
              border: "1px solid #D0D5DD",
            }}
          />
        ) : (
          <Box
            as="div"
            style={{
              width: "68px",
              height: "42px",
              borderRadius: "8px",
              border: "1px solid #D0D5DD",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#F8F9FB",
            }}
          >
            <span
              style={{
                fontFamily: `'${escapeCssValue(getPreviewFontFamily(String(font?.label || ""), index))}'`,
                fontSize: "20px",
                lineHeight: "20px",
              }}
            >
              Ag
            </span>
          </Box>
        )}
      </IndexTable.Cell>
      <IndexTable.Cell className="td-center">
        <InlineStack align="center">
          <div
            role="button"
            tabIndex={0}
            onClick={() => handleSetDefault(index)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                handleSetDefault(index);
              }
            }}
            style={{ display: "inline-flex", cursor: "pointer" }}
          >
            <ToggleButton
              type="radio"
              name="default-font"
              value={index}
              checked={Boolean(font?.isDefault ?? font?.default)}
              disabled={isSubmitting}
            />
          </div>
        </InlineStack>
      </IndexTable.Cell>
      <IndexTable.Cell className="td-center">
        <NcpcRowActions
          actions={[
            {
              content: "Edit",
              icon: EditIcon,
              onAction: () => {
                setEditingFont({ ...font, id: index });
                setShowForm(true);
              },
            },
            {
              content: "Delete",
              icon: DeleteIcon,
              destructive: true,
              onAction: () => handleDelete(index),
            },
          ]}
        />
      </IndexTable.Cell>
    </IndexTable.Row>
  ));

  return (
    <Page fullWidth>
      {fontPreviewCss ? <style>{fontPreviewCss}</style> : null}
      {!showForm && (
        <>
          <Card>
            <Box padding="300">
              <Banner tone="info">
                Fonts added or updated here are automatically synchronized to
                Manage Fonts.
              </Banner>
            </Box>
          </Card>

          <Box paddingBlockStart="300" />

          <Card>
            <BlockStack gap="200">
              <InlineStack align="space-between" blockAlign="center">
                <Text as="h2" variant="headingMd">
                  Fonts List
                </Text>
                <Button
                  icon={PlusIcon}
                  variant="primary"
                  tone="success"
                  onClick={() => {
                    setEditingFont(null);
                    setShowForm(true);
                  }}
                >
                  Add new font
                </Button>
              </InlineStack>
            </BlockStack>
            <Divider borderWidth="025" />
            <div ref={tableWrapperRef}>
              <IndexTable
                resourceName={{ singular: "Font", plural: "Fonts" }}
                itemCount={fonts.length}
                selectable={false}
                headings={[
                  { title: "" },
                  { title: "Label" },
                  { title: "Preview" },
                  { title: "Default", alignment: "center" },
                  { title: "Actions", alignment: "center" },
                ]}
              >
                {rows}
              </IndexTable>
            </div>
          </Card>

          <Box paddingBlockStart="300" />

          <Card>
            <Box padding="300">
              <Text as="h3" variant="headingMd">
                Fonts Settings
              </Text>
              <Box paddingBlockStart="200" />
              <div style={{ display: "grid", gap: "10px" }}>
                <TextField
                  label="Title"
                  autoComplete="off"
                  value={fontSettings.label}
                  onChange={(value) =>
                    setFontSettings((curr) => ({ ...curr, label: value }))
                  }
                />
                <TextField
                  label="Description"
                  autoComplete="off"
                  value={fontSettings.description}
                  onChange={(value) =>
                    setFontSettings((curr) => ({ ...curr, description: value }))
                  }
                />
              </div>
              <Box paddingBlockStart="300">
                <InlineStack align="end">
                  <Button
                    loading={isSubmitting}
                    variant="primary"
                    tone="success"
                    onClick={() =>
                      submit(
                        {
                          operation: "save-font-settings",
                          settings: JSON.stringify(fontSettings),
                        },
                        { method: "POST", action: actionTarget },
                      )
                    }
                  >
                    Save
                  </Button>
                </InlineStack>
              </Box>
            </Box>
          </Card>
        </>
      )}

      {showForm && (
        <FontForm
          font={(editingFont as FontItem) || undefined}
          pricings={pricings}
          sizes={sizes}
          googleFonts={googleFonts}
          managedFonts={managedFonts}
          pricingMode={pricingMode}
          isEditing={editingFont?.id != null}
          onSubmit={handleSubmitForm}
          onClose={() => {
            setShowForm(false);
            setEditingFont(null);
          }}
        />
      )}
    </Page>
  );
}

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const { session } = await authenticate.admin(request);

  if (request.method !== "POST") return null;

  const configId = parseInt(params.configId || "", 10);
  if (Number.isNaN(configId)) {
    return json(
      { ...jFlashMessage("Invalid configuration", "error") },
      { status: 400 },
    );
  }

  const formData = await request.formData();
  const operation = String(formData.get("operation") || "");
  const index = parseIndex(formData.get("index"));

  if (operation === "save-font-settings") {
    let settings: any = null;
    try {
      settings = JSON.parse(String(formData.get("settings") || "{}"));
    } catch {
      settings = null;
    }

    if (!settings || typeof settings !== "object") {
      return json(
        { ...jFlashMessage("Invalid settings payload", "error") },
        { status: 400 },
      );
    }

    await NcpcConfigurationService.mutateNcpc(configId, session.id, (draft) => {
      const requiredOptions = (draft as any).requiredOptions || {};
      const current = requiredOptions.fontOptions || emptyFontSettings;
      requiredOptions.fontOptions = {
        ...current,
        label: String(settings?.label || ""),
        description: String(settings?.description || ""),
        fonts: Array.isArray(current?.fonts) ? current.fonts : [],
      };
      (draft as any).requiredOptions = requiredOptions;
    });

    return json({ ...jFlashMessage("Fonts settings updated successfully") });
  }

  if (operation === "add-font" || operation === "update-font") {
    let font: any = null;
    try {
      font = JSON.parse(String(formData.get("font") || "{}"));
    } catch {
      font = null;
    }

    if (!font || typeof font !== "object") {
      return json(
        { ...jFlashMessage("Invalid font payload", "error") },
        { status: 400 },
      );
    }

    const normalizedFont = { ...font } as any;
    const incomingLabel = String(normalizedFont?.label || "").trim();
    const incomingUrl = String(normalizedFont?.url || "").trim();
    const incomingIsGoogle = Boolean(normalizedFont?.isGoogleFont);
    const managedFontId = Number(normalizedFont?.managedFontId);

    if (!incomingLabel || !incomingUrl) {
      return json(
        { ...jFlashMessage("Label and URL are required", "error") },
        { status: 400 },
      );
    }

    const existingManagedFonts = (await FontService.getFonts(session.id)) || [];
    let linkedManagedFont =
      Number.isFinite(managedFontId) && managedFontId > 0
        ? existingManagedFonts.find(
            (managedFont: any) => managedFont.id === managedFontId,
          )
        : null;

    if (!linkedManagedFont) {
      linkedManagedFont = existingManagedFonts.find(
        (managedFont: any) =>
          String(managedFont.url || "").trim() === incomingUrl,
      );
    }

    if (!linkedManagedFont) {
      linkedManagedFont = existingManagedFonts.find(
        (managedFont: any) =>
          String(managedFont.label || "")
            .trim()
            .toLowerCase() === incomingLabel.toLowerCase() &&
          Boolean(managedFont.isGoogleFont) === incomingIsGoogle,
      );
    }

    if (!linkedManagedFont) {
      linkedManagedFont = await FontService.addFont(
        {
          label: incomingLabel,
          url: incomingUrl,
          isGoogleFont: incomingIsGoogle,
        } as FontType,
        session.id,
      );
    }

    if (!linkedManagedFont) {
      return json(
        {
          ...jFlashMessage("Unable to link this font to Manage Fonts", "error"),
        },
        { status: 500 },
      );
    }

    normalizedFont.label = String(linkedManagedFont.label || incomingLabel);
    normalizedFont.url = String(linkedManagedFont.url || incomingUrl);
    normalizedFont.isGoogleFont = Boolean(linkedManagedFont.isGoogleFont);
    normalizedFont.managedFontId = Number(linkedManagedFont.id);
    normalizedFont.isDefault = Boolean(
      normalizedFont?.isDefault ?? normalizedFont?.default,
    );
    normalizedFont.default = normalizedFont.isDefault;

    await NcpcConfigurationService.mutateNcpc(configId, session.id, (draft) => {
      const requiredOptions = (draft as any).requiredOptions || {};
      const current = requiredOptions.fontOptions || emptyFontSettings;
      const fonts = Array.isArray(current?.fonts)
        ? current.fonts.map((item: any) => normalizeStoredFont(item))
        : [];

      if (operation === "add-font") {
        fonts.push(normalizedFont);
      } else if (index >= 0 && fonts[index] != null) {
        fonts[index] = normalizedFont;
      }

      const nextFonts = ensureSingleDefaultFont(fonts);

      requiredOptions.fontOptions = {
        ...current,
        fonts: nextFonts,
      };
      (draft as any).requiredOptions = requiredOptions;
    });

    return json({ ...jFlashMessage("Font saved successfully") });
  }

  if (operation === "delete-font") {
    if (index < 0) {
      return json(
        { ...jFlashMessage("Invalid font index", "error") },
        { status: 400 },
      );
    }

    await NcpcConfigurationService.mutateNcpc(configId, session.id, (draft) => {
      const requiredOptions = (draft as any).requiredOptions || {};
      const current = requiredOptions.fontOptions || emptyFontSettings;
      const fonts = Array.isArray(current?.fonts) ? current.fonts : [];
      const remainingFonts = fonts.filter(
        (_font: any, fontIndex: number) => fontIndex !== index,
      );

      requiredOptions.fontOptions = {
        ...current,
        fonts: ensureSingleDefaultFont(remainingFonts),
      };
      (draft as any).requiredOptions = requiredOptions;
    });

    return json({ ...jFlashMessage("Font deleted successfully") });
  }

  if (operation === "set-default-font") {
    if (index < 0) {
      return json(
        { ...jFlashMessage("Invalid font index", "error") },
        { status: 400 },
      );
    }

    await NcpcConfigurationService.mutateNcpc(configId, session.id, (draft) => {
      const requiredOptions = (draft as any).requiredOptions || {};
      const current = requiredOptions.fontOptions || emptyFontSettings;
      const fonts = Array.isArray(current?.fonts) ? current.fonts : [];

      requiredOptions.fontOptions = {
        ...current,
        fonts: fonts.map((font: any, fontIndex: number) => ({
          ...font,
          isDefault: fontIndex === index,
          default: fontIndex === index,
        })),
      };
      (draft as any).requiredOptions = requiredOptions;
    });

    return json({ ...jFlashMessage("Default font updated successfully") });
  }

  if (operation === "reorder-fonts") {
    let rawFonts: any = null;
    try {
      rawFonts = JSON.parse(String(formData.get("fonts") || "[]"));
    } catch {
      rawFonts = null;
    }

    if (!Array.isArray(rawFonts)) {
      return json(
        { ...jFlashMessage("Invalid reorder payload", "error") },
        { status: 400 },
      );
    }

    await NcpcConfigurationService.mutateNcpc(configId, session.id, (draft) => {
      const requiredOptions = (draft as any).requiredOptions || {};
      const current = requiredOptions.fontOptions || emptyFontSettings;
      const nextFonts = ensureSingleDefaultFont(rawFonts);

      requiredOptions.fontOptions = {
        ...current,
        fonts: nextFonts,
      };
      (draft as any).requiredOptions = requiredOptions;
    });

    return json({ ...jFlashMessage("Fonts order updated successfully") });
  }

  return json(
    { ...jFlashMessage("Invalid operation", "error") },
    { status: 400 },
  );
};
