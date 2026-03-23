import { json, redirect } from "@remix-run/node";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import {
  Autocomplete,
  Box,
  Button,
  Card,
  Grid,
  Icon,
  IndexTable,
  InlineStack,
  Select,
  Text,
  TextField,
} from "@shopify/polaris";
import { PlusIcon, SearchIcon } from "@shopify/polaris-icons";
import {
  useActionData,
  useLoaderData,
  useNavigate,
  useNavigation,
  useSearchParams,
  useSubmit,
} from "@remix-run/react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { authenticate } from "~/shopify.server";
import FontService from "~/models/Font.service";
import { jFlashMessage, flashMessage } from "~/utils/message-flash";
import useHandleFlashMessage from "~/hooks/useHandleFlashMessage";
import type { FontType } from "~/types/ManagePropertyType";
import { FileInput } from "~/components/inputs/FileInput";
import { ToggleButton } from "~/components/buttons";
import {
  loadGoogleFontsCatalog,
  type GoogleFontCatalogItem,
} from "~/utils/google-fonts.server";
import { getError } from "~/utils/error-getting";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { session } = await authenticate.admin(request);
  const fonts = await FontService.getFonts(session.id);
  const googleFonts = await loadGoogleFontsCatalog();
  return json({
    fonts: Array.isArray(fonts) ? fonts : [],
    googleFonts,
  });
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const { session } = await authenticate.admin(request);
  const formData = await request.formData();
  const operation = String(formData.get("operation") || "");
  const id = parseInt(String(formData.get("id") || ""), 10);

  if (request.method === "DELETE" && Number.isFinite(id)) {
    await FontService.deleteFont(id, session.id);
    return json(jFlashMessage("Font deleted successfully"));
  }

  if (operation === "save-font") {
    const payload: FontType = {
      label: String(formData.get("label") || "").trim(),
      url: String(formData.get("url") || "").trim(),
      isGoogleFont: String(formData.get("isGoogleFont") || "") === "true",
    };

    if (!payload.label) {
      return json({ status: false, message: null, errors: { label: ["Label is required"] } }, { status: 400 });
    }

    if (!payload.url) {
      return json({ status: false, message: null, errors: { url: ["URL is required"] } }, { status: 400 });
    }

    if (Number.isFinite(id)) {
      payload.id = id;
      await FontService.updateFont(payload, session.id);
      return redirect(`.${flashMessage("Font updated successfully")}`);
    }

    await FontService.addFont(payload, session.id);
    return redirect(`.${flashMessage("Font added successfully")}`);
  }

  return null;
};

export default function ManageFontIndex() {
  const submit = useSubmit();
  const navigate = useNavigate();
  const navigation = useNavigation();
  const actionData = useActionData<typeof action>();
  const [searchParams] = useSearchParams();
  const { fonts, googleFonts } = useLoaderData<typeof loader>();
  useHandleFlashMessage();

  const editingId = searchParams.get("id");
  const isCreating = searchParams.get("new") === "1";
  const currentFont = useMemo(
    () =>
      editingId
        ? fonts.find((entry: any) => String(entry?.id) === editingId) || null
        : null,
    [fonts, editingId],
  );

  const [formData, setFormData] = useState<FontType>({
    label: "",
    isGoogleFont: false,
    url: "",
  });
  const [sourceType, setSourceType] = useState<"google" | "upload">("upload");
  const [selectedGoogleFont, setSelectedGoogleFont] =
    useState<GoogleFontCatalogItem | null>(null);
  const [selectedGoogleFontVariant, setSelectedGoogleFontVariant] = useState("");
  const [searchGoogleFontValue, setSearchGoogleFontValue] = useState("");

  useEffect(() => {
    if (currentFont) {
      const next = {
        label: String(currentFont.label || ""),
        url: String(currentFont.url || ""),
        isGoogleFont: Boolean(currentFont.isGoogleFont),
      };
      setFormData(next);
      setSourceType(next.isGoogleFont ? "google" : "upload");
      return;
    }

    if (isCreating) {
      setFormData({
        label: "",
        url: "",
        isGoogleFont: false,
      });
      setSourceType("upload");
      setSelectedGoogleFont(null);
      setSelectedGoogleFontVariant("");
      setSearchGoogleFontValue("");
    }
  }, [currentFont, isCreating]);

  useEffect(() => {
    if (sourceType !== "google") return;

    const matched = googleFonts.find(
      (entry: GoogleFontCatalogItem) =>
        entry.family.toLowerCase() === String(formData.label || "").toLowerCase(),
    );

    if (!matched) return;

    setSelectedGoogleFont(matched);
    setSearchGoogleFontValue(matched.family);

    const variantFromUrl = Object.entries(matched.files).find(
      ([, fileUrl]) => fileUrl === formData.url,
    )?.[0];

    setSelectedGoogleFontVariant(variantFromUrl || matched.variants[0] || "regular");
  }, [sourceType, googleFonts, formData.label, formData.url]);

  const isEditing = Boolean(currentFont || isCreating);
  const isSubmitting = navigation.state === "submitting";

  const allGoogleOptions = useMemo(
    () =>
      googleFonts.map((googleFont: GoogleFontCatalogItem, index: number) => ({
        label: googleFont.family,
        value: String(index),
      })),
    [googleFonts],
  );
  const [googleFontOptions, setGoogleFontOptions] = useState(
    allGoogleOptions.slice(0, 200),
  );

  useEffect(() => {
    setGoogleFontOptions(allGoogleOptions.slice(0, 200));
  }, [allGoogleOptions]);

  const updateGoogleSearch = useCallback(
    (value: string) => {
      setSearchGoogleFontValue(value);
      if (!value.trim()) {
        setGoogleFontOptions(allGoogleOptions.slice(0, 200));
        return;
      }
      const regex = new RegExp(value, "i");
      setGoogleFontOptions(
        allGoogleOptions.filter((option) => regex.test(option.label)).slice(0, 200),
      );
    },
    [allGoogleOptions],
  );

  const updateGoogleSelection = useCallback(
    (selected: string[]) => {
      const selectedId = selected[0];
      const selectedOption = allGoogleOptions.find((option) => option.value === selectedId);
      if (!selectedOption) return;

      const selectedFont = googleFonts[Number(selectedId)] || null;
      if (!selectedFont) return;

      const firstVariant = selectedFont.variants?.[0] || "regular";
      const firstUrl = selectedFont.files?.[firstVariant] || "";

      setSearchGoogleFontValue(selectedOption.label);
      setSelectedGoogleFont(selectedFont);
      setSelectedGoogleFontVariant(firstVariant);
      setFormData({
        label: selectedFont.family,
        url: firstUrl,
        isGoogleFont: true,
      });
    },
    [allGoogleOptions, googleFonts],
  );

  const handleGoogleVariantChange = (value: string) => {
    setSelectedGoogleFontVariant(value);
    if (!selectedGoogleFont) return;
    setFormData((curr) => ({
      ...curr,
      label: selectedGoogleFont.family,
      url: selectedGoogleFont.files?.[value] || "",
      isGoogleFont: true,
    }));
  };

  const googleFontsTextField = (
    <Autocomplete.TextField
      label="Search Google Fonts"
      onChange={updateGoogleSearch}
      value={searchGoogleFontValue}
      prefix={<Icon source={SearchIcon} />}
      placeholder="Search"
      autoComplete="off"
    />
  );

  const openCreate = () => navigate("?new=1");
  const openEdit = (id: number) => navigate(`?id=${id}`);
  const closeForm = () => navigate(".");

  const saveFont = () => {
    submit(
      {
        operation: "save-font",
        id: currentFont?.id ? String(currentFont.id) : "",
        label: formData.label,
        url: formData.url,
        isGoogleFont: String(sourceType === "google"),
      },
      { method: "POST" },
    );
  };

  const resourceName = {
    singular: "Font",
    plural: "Fonts",
  };

  if (isEditing) {
    return (
      <div style={{ display: "grid", gap: 12, margin: "10px 0px" }}>
        <Card>
          <Box padding="300">
            <Text as="h2" variant="headingLg">
              {currentFont ? "Edit font" : "Add new font"}
            </Text>
          </Box>
        </Card>

        <Card>
          <Box padding="300">
            <Grid gap={{ lg: "30px" }}>
              <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
                <Text as="p" variant="bodyMd" fontWeight="medium">
                  Font Source
                </Text>
                <Box paddingBlockStart="200">
                  <div style={{ display: "grid", gap: 8 }}>
                    <InlineStack align="space-between" blockAlign="center">
                      <Text as="span" variant="bodyMd">
                        Google Fonts
                      </Text>
                      <ToggleButton
                        checked={sourceType === "google"}
                        name="font-source"
                        type="radio"
                        value="google"
                        onChange={(value) =>
                          setSourceType(String(value) === "google" ? "google" : "upload")
                        }
                      />
                    </InlineStack>
                    <InlineStack align="space-between" blockAlign="center">
                      <Text as="span" variant="bodyMd">
                        Upload Font File
                      </Text>
                      <ToggleButton
                        checked={sourceType === "upload"}
                        name="font-source"
                        type="radio"
                        value="upload"
                        onChange={(value) =>
                          setSourceType(String(value) === "google" ? "google" : "upload")
                        }
                      />
                    </InlineStack>
                  </div>
                </Box>
              </Grid.Cell>

              {sourceType === "google" ? (
                <>
                  <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
                    <Autocomplete
                      options={googleFontOptions}
                      selected={[]}
                      onSelect={updateGoogleSelection}
                      textField={googleFontsTextField}
                    />
                  </Grid.Cell>

                  {selectedGoogleFont ? (
                    <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
                      <Select
                        label="Font Variant"
                        options={selectedGoogleFont.variants.map((variant) => ({
                          label: variant,
                          value: variant,
                        }))}
                        value={selectedGoogleFontVariant}
                        onChange={handleGoogleVariantChange}
                      />
                    </Grid.Cell>
                  ) : null}
                </>
              ) : (
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
                  <FileInput
                    type="font"
                    helperText=".ttf, .otf Font File Type (Required)"
                    error={getError(actionData, "url")}
                    title="Upload font file"
                    path={formData.url}
                    handlePath={(value: string) =>
                      setFormData((curr) => ({ ...curr, url: value }))
                    }
                  />
                </Grid.Cell>
              )}

              <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
                <TextField
                  label="Label"
                  value={String(formData.label || "")}
                  onChange={(value) =>
                    setFormData((curr) => ({
                      ...curr,
                      label: value,
                      isGoogleFont: sourceType === "google",
                    }))
                  }
                  autoComplete="off"
                  error={getError(actionData, "label")}
                />
              </Grid.Cell>

              <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
                <TextField
                  label="URL"
                  value={String(formData.url || "")}
                  onChange={(value) =>
                    setFormData((curr) => ({
                      ...curr,
                      url: value,
                      isGoogleFont: sourceType === "google",
                    }))
                  }
                  autoComplete="off"
                  error={getError(actionData, "url")}
                />
              </Grid.Cell>
            </Grid>
          </Box>

          <Box padding="300">
            <InlineStack align="end" gap="200">
              <Button onClick={closeForm}>Back</Button>
              <Button
                variant="primary"
                tone="success"
                loading={isSubmitting}
                onClick={saveFont}
                disabled={!formData.label.trim() || !formData.url.trim()}
              >
                Save
              </Button>
            </InlineStack>
          </Box>
        </Card>
      </div>
    );
  }

  return (
    <div style={{ width: "100%", height: "auto", margin: "10px 0px", display: "grid", gap: 12 }}>
      <Card>
        <Box padding="300">
          <InlineStack align="space-between" blockAlign="center">
            <div>
              <Text as="h2" variant="headingLg">
                Fonts
              </Text>
              <Text as="p" tone="subdued">
                Manage the fonts available to configurations.
              </Text>
            </div>
            <Button icon={PlusIcon} variant="primary" tone="success" onClick={openCreate}>
              Add new font
            </Button>
          </InlineStack>
        </Box>
      </Card>

      <Card>
        <Box padding="300">
          <IndexTable
            resourceName={resourceName}
            itemCount={fonts.length}
            headings={[
              { title: "Label" },
              { title: "Actions" },
            ]}
            selectable={false}
          >
            {fonts.map(({ id, label }: any, index: number) => (
              <IndexTable.Row id={String(id)} key={id} position={index}>
                <IndexTable.Cell>
                  <Text as="span" fontWeight="semibold">
                    {label || "Untitled"}
                  </Text>
                </IndexTable.Cell>
                <IndexTable.Cell>
                  <InlineStack gap="200">
                    <Button onClick={() => openEdit(id)}>Edit</Button>
                    <Button
                      tone="critical"
                      onClick={() => submit({ id: String(id) }, { method: "DELETE" })}
                    >
                      Delete
                    </Button>
                  </InlineStack>
                </IndexTable.Cell>
              </IndexTable.Row>
            ))}
          </IndexTable>
        </Box>
      </Card>
    </div>
  );
}
