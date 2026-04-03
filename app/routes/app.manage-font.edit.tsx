import {
  Autocomplete,
  Box,
  Card,
  Divider,
  Grid,
  Icon,
  InlineStack,
  Select,
  Text,
  TextField,
} from "@shopify/polaris";
import { SearchIcon } from "@shopify/polaris-icons";
import { useCallback, useEffect, useMemo, useState, type FormEvent } from "react";
import {
  Form,
  useActionData,
  useLoaderData,
  useNavigation,
  useSubmit,
} from "@remix-run/react";
import { z } from "zod";
import { json, redirect } from "@remix-run/node";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { parseWithZod } from "@conform-to/zod";

import FontService from "~/models/Font.service";
import { authenticate } from "~/shopify.server";
import type { FontType } from "~/types/ManagePropertyType";
import { flashMessage, jFlashMessage } from "~/utils/message-flash";
import useHandleFlashMessage from "~/hooks/useHandleFlashMessage";
import { getError } from "~/utils/error-getting";
import { FileInput } from "~/components/inputs/FileInput";
import { BiSaveBtn } from "~/components/buttons/BiSaveBtn";
import { BackBtn } from "~/components/buttons/BackBtn";
import { ToggleButton } from "~/components/buttons";
import {
  loadGoogleFontsCatalog,
  type GoogleFontCatalogItem,
} from "~/utils/google-fonts.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { session } = await authenticate.admin(request);
  const url = new URL(request.url);
  const id = url.searchParams.get("id");

  let font = null;
  if (id) {
    font = await FontService.getFont(parseInt(id, 10), session.id);
  }

  const googleFonts = await loadGoogleFontsCatalog();

  return json({
    font,
    googleFonts,
  });
};

export default function ManageFontCreate() {
  const submit = useSubmit();
  const navigation = useNavigation();
  const actionData = useActionData<typeof action>();
  useHandleFlashMessage();

  const { font, googleFonts } = useLoaderData<typeof loader>();

  const [formData, setFormData] = useState<FontType>(
    (font as FontType) || {
      label: "",
      isGoogleFont: false,
      url: "",
    },
  );

  const [sourceType, setSourceType] = useState<"google" | "upload">(
    formData?.isGoogleFont ? "google" : "upload",
  );

  const [selectedGoogleFont, setSelectedGoogleFont] =
    useState<GoogleFontCatalogItem | null>(null);
  const [selectedGoogleFontVariant, setSelectedGoogleFontVariant] = useState<string>("");
  const [searchGoogleFontValue, setSearchGoogleFontValue] = useState("");

  const isLoading = navigation.state === "loading";
  const isSubmitting = navigation.state === "submitting";

  const allGoogleOptions = useMemo(
    () =>
      googleFonts.map((googleFont: GoogleFontCatalogItem, index: number) => ({
        label: googleFont.family,
        value: String(index),
      })),
    [googleFonts],
  );

  const [googleFontOptions, setGoogleFontOptions] = useState(allGoogleOptions.slice(0, 200));

  useEffect(() => {
    setGoogleFontOptions(allGoogleOptions.slice(0, 200));
  }, [allGoogleOptions]);

  useEffect(() => {
    if (sourceType !== "google") return;

    const matched = googleFonts.find(
      (entry: GoogleFontCatalogItem) => entry.family.toLowerCase() === formData.label.toLowerCase(),
    );

    if (!matched) return;

    setSelectedGoogleFont(matched);
    setSearchGoogleFontValue(matched.family);

    const variantFromUrl = Object.entries(matched.files).find(
      ([, fileUrl]) => fileUrl === formData.url,
    )?.[0];

    const fallbackVariant = matched.variants[0] || "regular";
    setSelectedGoogleFontVariant(variantFromUrl || fallbackVariant);
  }, [sourceType, googleFonts, formData.label, formData.url]);

  const handleLabel = (value: string) =>
    setFormData((curr) => ({ ...curr, label: value, isGoogleFont: sourceType === "google" }));

  const handleUrl = (value: string) =>
    setFormData((curr) => ({ ...curr, url: value, isGoogleFont: sourceType === "google" }));

  const handleSourceChange = (value: string) => {
    const nextSource = value === "google" ? "google" : "upload";
    setSourceType(nextSource);
    setFormData((curr) => ({
      ...curr,
      isGoogleFont: nextSource === "google",
    }));
  };

  const updateGoogleSearch = useCallback(
    (value: string) => {
      setSearchGoogleFontValue(value);

      if (value.trim() === "") {
        setGoogleFontOptions(allGoogleOptions.slice(0, 200));
        return;
      }

      const regex = new RegExp(value, "i");
      setGoogleFontOptions(allGoogleOptions.filter((option) => regex.test(option.label)).slice(0, 200));
    },
    [allGoogleOptions],
  );

  const updateGoogleSelection = useCallback(
    (selected: string[]) => {
      const selectedId = selected[0];
      const selectedOption = allGoogleOptions.find((option) => option.value === selectedId);
      if (!selectedOption) return;

      const selectedIndex = Number(selectedId);
      const selectedFont = googleFonts[selectedIndex] || null;
      if (!selectedFont) return;

      const firstVariant = selectedFont.variants?.[0] || "regular";
      const firstUrl = selectedFont.files?.[firstVariant] || "";

      setSearchGoogleFontValue(selectedOption.label);
      setSelectedGoogleFont(selectedFont);
      setSelectedGoogleFontVariant(firstVariant);

      setFormData((curr) => ({
        ...curr,
        label: selectedFont.family,
        url: firstUrl,
        isGoogleFont: true,
      }));
    },
    [allGoogleOptions, googleFonts],
  );

  const handleGoogleVariantChange = (value: string) => {
    setSelectedGoogleFontVariant(value);
    if (!selectedGoogleFont) return;
    const selectedUrl = selectedGoogleFont.files?.[value] || "";

    setFormData((curr) => ({
      ...curr,
      label: selectedGoogleFont.family,
      url: selectedUrl,
      isGoogleFont: true,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    submit(
      {
        ...formData,
        isGoogleFont: String(sourceType === "google"),
      },
      { method: "POST" },
    );
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

  const isGoogleSource = sourceType === "google";

  return (
    <div style={{ width: "100%", height: "auto", margin: "10px 0px" }}>
      <Card>
        <Form onSubmit={handleSubmit} method="POST">
          <Box paddingInline="100" paddingBlock="200">
            <Text as="h6" variant="bodyMd" fontWeight="bold">
              {font ? "Update font" : "Add new font"}
            </Text>
          </Box>

          <Divider borderWidth="100" />

          <Box paddingInline="300" paddingBlock="1000">
            <Grid gap={{ lg: "30px" }}>
              <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
                <Text as="p" variant="bodyMd" fontWeight="medium">
                  Font Source
                </Text>
                <Box paddingBlockStart="200">
                  <div style={{ display: "grid", gap: "8px" }}>
                    <InlineStack align="space-between" blockAlign="center">
                      <Text as="span" variant="bodyMd">
                        Google Fonts
                      </Text>
                      <ToggleButton
                        checked={sourceType === "google"}
                        name="font-source"
                        type="radio"
                        value="google"
                        onChange={(value) => handleSourceChange(String(value))}
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
                        onChange={(value) => handleSourceChange(String(value))}
                      />
                    </InlineStack>
                  </div>
                </Box>
              </Grid.Cell>

              {sourceType === "google" && (
                <>
                  <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
                    <Autocomplete
                      options={googleFontOptions}
                      selected={[]}
                      onSelect={updateGoogleSelection}
                      textField={googleFontsTextField}
                    />
                  </Grid.Cell>

                  {selectedGoogleFont && (
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
                  )}
                </>
              )}

              <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
                <TextField
                  label="Label"
                  value={String(formData.label || "")}
                  onChange={handleLabel}
                  autoComplete="off"
                  error={getError(actionData, "label")}
                />
              </Grid.Cell>

              {isGoogleSource ? (
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
                  <TextField
                    label="URL"
                    value={String(formData.url || "")}
                    onChange={() => {}}
                    autoComplete="off"
                    error={getError(actionData, "url")}
                    readOnly
                    helpText="This URL is generated automatically from the selected Google Font and variant."
                  />
                </Grid.Cell>
              ) : (
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
                  <FileInput
                    type="font"
                    helperText=".ttf, .otf Font File Type (Required)"
                    error={getError(actionData, "url")}
                    title="Upload font file"
                    path={formData.url}
                    handlePath={(value: string) => {
                      handleUrl(value);
                    }}
                  />
                </Grid.Cell>
              )}
            </Grid>
          </Box>

          <Divider borderWidth="100" />

          <Box paddingInline="300" paddingBlock="300">
            <InlineStack align="end" gap="600">
              <BackBtn isLoading={isLoading} title="Back" />
              <BiSaveBtn isLoading={isSubmitting} title="Save" />
            </InlineStack>
          </Box>
        </Form>
      </Card>
    </div>
  );
}

const formSchema = z.object({
  label: z
    .string({ required_error: "Label is required" })
    .min(3, "Label is too short")
    .max(100, "Label is too long"),
  url: z
    .string({ required_error: "Font URL is required" })
    .min(1, "Font URL is required")
    .refine((value) => {
      const normalized = String(value || "").trim().toLowerCase();
      return (
        normalized.endsWith(".ttf") ||
        normalized.endsWith(".otf") ||
        normalized.includes("fonts.gstatic.com")
      );
    }, "Font file must be .ttf or .otf file type"),
  isGoogleFont: z
    .any()
    .transform((val) => `${val}`.toLowerCase() === "true")
    .pipe(z.boolean()),
});

export const action = async ({ request }: ActionFunctionArgs) => {
  const { session } = await authenticate.admin(request);

  const formData = await request.formData();
  const url = new URL(request.url);
  const id = url.searchParams.get("id");

  const submission = parseWithZod(formData, { schema: formSchema });

  if (submission.status !== "success") {
    return json({ status: false, message: null, errors: submission.error });
  }

  const font: FontType = submission.value as FontType;

  if (id) {
    font.id = parseInt(id, 10);
    const res = await FontService.updateFont(font, session.id);
    return res
      ? redirect(`..${flashMessage("Font updated successfully")}`)
      : json({ ...jFlashMessage("Error on font updating", "error") });
  }

  const res = await FontService.addFont(font, session.id);
  return res
    ? redirect(`..${flashMessage("Font added successfully")}`)
    : json({ ...jFlashMessage("Error on font adding", "error") });
};
