import { json } from "@remix-run/node";
import type { ActionFunctionArgs } from "@remix-run/node";
import {
  BlockStack,
  Box,
  Button,
  Card,
  Divider,
  IndexTable,
  InlineStack,
  Page,
  Text,
  TextField,
} from "@shopify/polaris";
import { DeleteIcon, EditIcon } from "@shopify/polaris-icons";
import { useEffect, useMemo, useState } from "react";
import { useNavigation, useOutletContext, useSubmit } from "@remix-run/react";
import FontForm from "~/components/layouts/FontForm";
import type { AdvancedFont, FixedFont } from "~/components/layouts/FontForm";
import PlusIcon from "~/components/icons/PlusIcon";
import NcpcRowActions from "~/components/ncpc/NcpcRowActions";
import NcpcConfigurationService from "~/models/NcpcConfiguration.service";
import { authenticate } from "~/shopify.server";
import type { NcpcRouteContext } from "~/types/NcpcRouteContext";
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

export default function NcpcRequiredFonts() {
  const submit = useSubmit();
  const navigation = useNavigation();
  const { configuration, ncpcData } = useOutletContext<NcpcRouteContext>();

  const pricingMode = normalizePricingMode(
    (configuration as any)?.pricingMode || (ncpcData as any)?.pricingMode,
  );

  const fontOptions = (ncpcData as any)?.requiredOptions?.fontOptions || emptyFontSettings;
  const fonts = Array.isArray(fontOptions?.fonts) ? fontOptions.fonts : [];
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
  const [isClient, setIsClient] = useState(false);

  const isSubmitting = navigation.state === "submitting";

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleDelete = (index: number) => {
    submit(
      {
        operation: "delete-font",
        index: String(index),
      },
      { method: "POST" },
    );
  };

  const handleSetDefault = (index: number) => {
    submit(
      {
        operation: "set-default-font",
        index: String(index),
      },
      { method: "POST" },
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
      { method: "POST" },
    );

    setShowForm(false);
    setEditingFont(null);
  };

  const rows = fonts.map((font: any, index: number) => (
    <IndexTable.Row id={`${index}`} key={`${index}`} position={index}>
      <IndexTable.Cell>
        <Text as="span" variant="bodyMd">
          {truncateText(String(font?.label || `Font ${index + 1}`), 20)}
        </Text>
      </IndexTable.Cell>
      <IndexTable.Cell>
        <Text as="span" tone="subdued">
          {String(font?.url || "-")}
        </Text>
      </IndexTable.Cell>
      <IndexTable.Cell className="td-center">
        {font?.isDefault ? "Yes" : "No"}
      </IndexTable.Cell>
      <IndexTable.Cell className="td-center">
        <InlineStack gap="200" align="end">
          {!font?.isDefault ? (
            <Button onClick={() => handleSetDefault(index)}>Set default</Button>
          ) : null}
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
        </InlineStack>
      </IndexTable.Cell>
    </IndexTable.Row>
  ));

  return (
    <Page fullWidth>
      {!showForm && (
        <>
          <Card>
            <BlockStack gap="200">
              <InlineStack align="space-between" blockAlign="center">
                <Text as="h2" variant="headingMd">
                  Fonts List
                </Text>
                <button
                  className="primary-btn"
                  type="button"
                  onClick={() => {
                    setEditingFont(null);
                    setShowForm(true);
                  }}
                >
                  <Box paddingInline="300">
                    <InlineStack gap="300">
                      <PlusIcon />
                      <span className="primary-btn-text"> Add new font</span>
                    </InlineStack>
                  </Box>
                </button>
              </InlineStack>
            </BlockStack>
            <Divider borderWidth="025" />
            {isClient ? (
              <IndexTable
                resourceName={{ singular: "Font", plural: "Fonts" }}
                itemCount={fonts.length}
                selectable={false}
                headings={[
                  { title: "Label" },
                  { title: "URL" },
                  { title: "Default", alignment: "center" },
                  { title: "Action", alignment: "center" },
                ]}
              >
                {rows}
              </IndexTable>
            ) : (
              <Box padding="300">
                <Text as="p" tone="subdued">
                  Loading fonts...
                </Text>
              </Box>
            )}
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
                  onChange={(value) => setFontSettings((curr) => ({ ...curr, label: value }))}
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
                  <button
                    disabled={isSubmitting}
                    className="next-large-btn"
                    onClick={() =>
                      submit(
                        {
                          operation: "save-font-settings",
                          settings: JSON.stringify(fontSettings),
                        },
                        { method: "POST" },
                      )
                    }
                  >
                    <Box paddingInline="1000">
                      <InlineStack gap="300" blockAlign="center">
                        {isSubmitting && (
                          <img width="22" height="22" src="/assets/loading/ic_loading_gray.svg" />
                        )}
                        <span style={{ color: "white", fontWeight: "bold" }}>Save</span>
                      </InlineStack>
                    </Box>
                  </button>
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
          googleFonts={[]}
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
    return json({ ...jFlashMessage("Invalid configuration", "error") }, { status: 400 });
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
      return json({ ...jFlashMessage("Invalid settings payload", "error") }, { status: 400 });
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
      return json({ ...jFlashMessage("Invalid font payload", "error") }, { status: 400 });
    }

    await NcpcConfigurationService.mutateNcpc(configId, session.id, (draft) => {
      const requiredOptions = (draft as any).requiredOptions || {};
      const current = requiredOptions.fontOptions || emptyFontSettings;
      const fonts = Array.isArray(current?.fonts) ? [...current.fonts] : [];

      if (operation === "add-font") {
        fonts.push(font);
      } else if (index >= 0 && fonts[index] != null) {
        fonts[index] = font;
      }

      requiredOptions.fontOptions = {
        ...current,
        fonts,
      };
      (draft as any).requiredOptions = requiredOptions;
    });

    return json({ ...jFlashMessage("Font saved successfully") });
  }

  if (operation === "delete-font") {
    if (index < 0) {
      return json({ ...jFlashMessage("Invalid font index", "error") }, { status: 400 });
    }

    await NcpcConfigurationService.mutateNcpc(configId, session.id, (draft) => {
      const requiredOptions = (draft as any).requiredOptions || {};
      const current = requiredOptions.fontOptions || emptyFontSettings;
      const fonts = Array.isArray(current?.fonts) ? current.fonts : [];

      requiredOptions.fontOptions = {
        ...current,
        fonts: fonts.filter((_font: any, fontIndex: number) => fontIndex !== index),
      };
      (draft as any).requiredOptions = requiredOptions;
    });

    return json({ ...jFlashMessage("Font deleted successfully") });
  }

  if (operation === "set-default-font") {
    if (index < 0) {
      return json({ ...jFlashMessage("Invalid font index", "error") }, { status: 400 });
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
        })),
      };
      (draft as any).requiredOptions = requiredOptions;
    });

    return json({ ...jFlashMessage("Default font updated successfully") });
  }

  return json({ ...jFlashMessage("Invalid operation", "error") }, { status: 400 });
};
