import {
  Autocomplete,
  Badge,
  Box,
  Button,
  Card,
  EmptyState,
  Icon,
  IndexTable,
  InlineStack,
  Select,
  Text,
  TextField,
} from "@shopify/polaris";
import { DeleteIcon, DragHandleIcon, PlusIcon, SearchIcon } from "@shopify/polaris-icons";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLoaderData, useNavigation, useOutletContext, useSubmit } from "@remix-run/react";
import { MultiCombobox } from "~/components/inputs/MultiCombobox";
import { FileInput } from "~/components/inputs/FileInput";
import { SaveButton, ToggleButton } from "~/components/buttons";
import useHandleFlashMessage from "~/hooks/useHandleFlashMessage";
import Sortable from "~/utils/sortable-adapter";
import {
  ensureSingleDefaultFont,
  getFontsState,
  parseConfigData,
  type ClassicRequiredFontItem,
  type ManagedFontOption,
} from "~/features/classic-required-fonts.shared";
import type { GoogleFontCatalogItem } from "~/utils/google-fonts.server";

const normalizeFontPreviewUrl = (value: string) => {
  const normalized = String(value || "").trim();
  if (!normalized) return "";
  const parts = normalized.split("/aso-proxy/");
  return parts.length > 1 ? `/${parts[1]}` : normalized;
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

const getPreviewFontFamily = (font: ClassicRequiredFontItem) =>
  `classic_required_font_${font.managedFontId}`;

type LoaderData = {
  managedFonts?: ManagedFontOption[];
  googleFonts?: GoogleFontCatalogItem[];
} | null;

type AddMode = "existing" | "google" | "upload";

export function ClassicRequiredFontsScreen() {
  const { configuration } = useOutletContext<{ configuration: any }>();
  const loaderData = useLoaderData<LoaderData>();
  const submit = useSubmit();
  const navigation = useNavigation();
  const tableWrapperRef = useRef<HTMLDivElement | null>(null);
  const sortableRef = useRef<Sortable | null>(null);

  useHandleFlashMessage();

  const managedFonts = useMemo(
    () =>
      Array.isArray(loaderData?.managedFonts)
        ? loaderData.managedFonts.map((font) => ({
            id: Number(font.id),
            label: String(font.label || ""),
            url: String(font.url || ""),
            isGoogleFont: Boolean(font.isGoogleFont),
          }))
        : [],
    [loaderData],
  );
  const googleFonts = useMemo(
    () => (Array.isArray(loaderData?.googleFonts) ? loaderData.googleFonts : []),
    [loaderData],
  );

  const data = useMemo(() => parseConfigData(configuration?.data) || {}, [configuration?.data]);
  const fontsState = useMemo(() => getFontsState(data, managedFonts), [data, managedFonts]);
  const managedFontsMap = useMemo(
    () => new Map(managedFonts.map((font) => [Number(font.id), font])),
    [managedFonts],
  );

  const [sectionState, setSectionState] = useState(fontsState);
  const [showAddForm, setShowAddForm] = useState(false);
  const [addMode, setAddMode] = useState<AddMode>("existing");
  const [selectedExistingFontIds, setSelectedExistingFontIds] = useState<string[]>([]);
  const [fontLabel, setFontLabel] = useState("");
  const [fontUrl, setFontUrl] = useState("");
  const [selectedGoogleFont, setSelectedGoogleFont] = useState<GoogleFontCatalogItem | null>(null);
  const [selectedGoogleFontVariant, setSelectedGoogleFontVariant] = useState<string>("");
  const [searchGoogleFontValue, setSearchGoogleFontValue] = useState("");

  const isSubmitting = navigation.state === "submitting";

  useEffect(() => {
    setSectionState(fontsState);
  }, [fontsState]);

  useEffect(() => {
    if (!tableWrapperRef.current || showAddForm || sectionState.items.length <= 1) return;
    const tbody = tableWrapperRef.current.querySelector("tbody");
    if (!tbody) return;

    sortableRef.current?.destroy();
    sortableRef.current = Sortable.create(tbody, {
      handle: ".drag-handle",
      animation: 120,
      onEnd: (evt) => {
        const oldIndex = evt.oldIndex ?? -1;
        const newIndex = evt.newIndex ?? -1;
        if (oldIndex < 0 || newIndex < 0 || oldIndex === newIndex) return;

        setSectionState((current) => {
          const orderedIds = Array.from(
            tbody.querySelectorAll<HTMLElement>("tr[data-id], tr[id]"),
          )
            .map((element) => element.dataset.id || element.getAttribute("id"))
            .filter((value): value is string => Boolean(value));

          if (orderedIds.length !== current.items.length) return current;

          const itemsMap = new Map(
            current.items.map((item, index) => [String(item.id || String(item.managedFontId) || String(index)), item]),
          );
          const nextItems = orderedIds
            .map((id) => itemsMap.get(id))
            .filter((item): item is typeof current.items[number] => Boolean(item));

          if (nextItems.length !== current.items.length) return current;
          const nextState = {
            ...current,
            items: nextItems,
          };

          submit(
            {
              operation: "save-fonts",
              state: JSON.stringify(nextState),
            },
            { method: "POST" },
          );

          return nextState;
        });
      },
    });

    return () => {
      sortableRef.current?.destroy();
      sortableRef.current = null;
    };
  }, [sectionState, showAddForm, submit]);

  const selectedCount = sectionState.items.length;

  const fontPreviewCss = useMemo(
    () =>
      sectionState.items
        .map((font) => {
          const managedFont = managedFontsMap.get(Number(font.managedFontId));
          const url = normalizeFontPreviewUrl(String(managedFont?.url || ""));
          if (!url || !font.label) return "";
          const format = getFontFormatFromUrl(url);
          const srcPart = format
            ? `url('${escapeCssValue(url)}') format('${format}')`
            : `url('${escapeCssValue(url)}')`;

          return `@font-face{font-family:'${escapeCssValue(
            getPreviewFontFamily(font),
          )}';src:${srcPart};font-display:swap;font-style:normal;font-weight:400;}`;
        })
        .filter(Boolean)
        .join("\n"),
    [sectionState.items, managedFontsMap],
  );

  const availableManagedFonts = useMemo(() => {
    const selectedIds = new Set(sectionState.items.map((item) => Number(item.managedFontId)));
    return managedFonts.filter((font) => !selectedIds.has(Number(font.id)));
  }, [managedFonts, sectionState.items]);

  const managedFontOptions = useMemo(
    () =>
      availableManagedFonts.map((font) => ({
        label: font.label,
        value: String(font.id),
      })),
    [availableManagedFonts],
  );

  const allGoogleOptions = useMemo(
    () =>
      googleFonts.map((googleFont, index) => ({
        label: googleFont.family,
        value: String(index),
      })),
    [googleFonts],
  );
  const [googleFontOptions, setGoogleFontOptions] = useState(allGoogleOptions.slice(0, 200));

  useEffect(() => {
    setGoogleFontOptions(allGoogleOptions.slice(0, 200));
  }, [allGoogleOptions]);

  const resetAddForm = () => {
    setShowAddForm(false);
    setAddMode("existing");
    setSelectedExistingFontIds([]);
    setFontLabel("");
    setFontUrl("");
    setSelectedGoogleFont(null);
    setSelectedGoogleFontVariant("");
    setSearchGoogleFontValue("");
  };

  const setDefaultFont = (fontId: number) => {
    setSectionState((current) => {
      const targetIndex = current.items.findIndex((item) => item.managedFontId === fontId);
      if (targetIndex < 0) return current;
      return {
        ...current,
        items: ensureSingleDefaultFont(current.items, targetIndex),
      };
    });
  };

  const saveFonts = () => {
    submit(
      {
        operation: "save-fonts",
        state: JSON.stringify(sectionState),
      },
      { method: "POST" },
    );
  };

  const addExistingFonts = () => {
    if (selectedExistingFontIds.length === 0) return;
    submit(
      {
        operation: "add-existing-fonts",
        fontIds: JSON.stringify(selectedExistingFontIds),
      },
      { method: "POST" },
    );
    resetAddForm();
  };

  const createAndAddFont = () => {
    if (!fontLabel.trim() || !fontUrl.trim()) return;
    submit(
      {
        operation: "create-font-and-add",
        font: JSON.stringify({
          label: fontLabel.trim(),
          url: fontUrl.trim(),
          isGoogleFont: addMode === "google",
        }),
      },
      { method: "POST" },
    );
    resetAddForm();
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
      const nextGoogleFont = googleFonts[selectedIndex] || null;
      if (!nextGoogleFont) return;

      const firstVariant = nextGoogleFont.variants?.[0] || "regular";
      const firstUrl = nextGoogleFont.files?.[firstVariant] || "";

      setSearchGoogleFontValue(selectedOption.label);
      setSelectedGoogleFont(nextGoogleFont);
      setSelectedGoogleFontVariant(firstVariant);
      setFontLabel(nextGoogleFont.family);
      setFontUrl(firstUrl);
    },
    [allGoogleOptions, googleFonts],
  );

  const googleFontsTextField = (
    <Autocomplete.TextField
      label="Search Google Fonts"
      onChange={updateGoogleSearch}
      value={searchGoogleFontValue}
      prefix={<Icon source={SearchIcon} />}
      placeholder="Search font"
      autoComplete="off"
    />
  );

  return (
    <div style={{ display: "grid", gap: 12 }}>
      {fontPreviewCss ? <style>{fontPreviewCss}</style> : null}

      {!showAddForm ? (
        <>
          <Card>
            <Box padding="300">
              <InlineStack align="space-between" blockAlign="center">
                <div>
                  <Text as="h2" variant="headingLg">
                    Fonts
                  </Text>
                  <Text as="p" tone="subdued">
                    These are the fonts available to customers in this config.
                  </Text>
                </div>
                <InlineStack gap="200" blockAlign="center">
                  <Badge tone="info">{selectedCount} selected</Badge>
                  <Button icon={PlusIcon} variant="primary" tone="success" onClick={() => setShowAddForm(true)}>
                    Add fonts
                  </Button>
                  <Button url="/app/manage-font">Manage fonts</Button>
                </InlineStack>
              </InlineStack>
            </Box>
          </Card>

          <Card>
            <Box padding="300">
              {sectionState.items.length === 0 ? (
                <EmptyState
                  heading="No fonts added to this config yet"
                  image=""
                  action={{ content: "Add fonts", onAction: () => setShowAddForm(true) }}
                >
                  <p>Add only the fonts this config should expose to customers.</p>
                </EmptyState>
              ) : (
                <>
                  <Text as="h3" variant="headingMd">
                    Fonts List
                  </Text>
                  <Box paddingBlockStart="200" />
                  <div ref={tableWrapperRef}>
                    <IndexTable
                      resourceName={{ singular: "font", plural: "fonts" }}
                      itemCount={sectionState.items.length}
                      selectable={false}
                      headings={[
                        { title: "" },
                        { title: "Preview" },
                        { title: "Label" },
                        { title: "Default" },
                        { title: "Actions" },
                      ]}
                    >
                      {sectionState.items.map((selectedItem, index) => (
                        <IndexTable.Row
                          id={String(selectedItem.managedFontId)}
                          key={selectedItem.id || String(selectedItem.managedFontId)}
                          position={index}
                          data-id={selectedItem.id || String(selectedItem.managedFontId)}
                        >
                          <IndexTable.Cell>
                            <div
                              className="drag-handle"
                              style={{
                                display: "inline-flex",
                                alignItems: "center",
                                justifyContent: "center",
                                cursor: sectionState.items.length > 1 ? "grab" : "default",
                                color: "#6B7280",
                              }}
                            >
                              <Icon source={DragHandleIcon} />
                            </div>
                          </IndexTable.Cell>
                          <IndexTable.Cell>
                            <div
                              style={{
                                width: "72px",
                                height: "44px",
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
                                  fontFamily: `'${escapeCssValue(getPreviewFontFamily(selectedItem))}'`,
                                  fontSize: "20px",
                                  lineHeight: "20px",
                                }}
                              >
                                Ag
                              </span>
                            </div>
                          </IndexTable.Cell>
                          <IndexTable.Cell>
                            <Text as="span" fontWeight="semibold">
                              {selectedItem.label}
                            </Text>
                          </IndexTable.Cell>
                          <IndexTable.Cell>
                            <InlineStack gap="200" blockAlign="center">
                              <Text as="span" tone="subdued">
                                No
                              </Text>
                              <ToggleButton
                                type="radio"
                                name="default-font"
                                value={selectedItem.managedFontId}
                                checked={Boolean(selectedItem.isDefault)}
                                onChange={() => setDefaultFont(Number(selectedItem.managedFontId))}
                              />
                              <Text as="span" tone="subdued">
                                Yes
                              </Text>
                            </InlineStack>
                          </IndexTable.Cell>
                          <IndexTable.Cell>
                            <Button
                              icon={DeleteIcon}
                              tone="critical"
                              onClick={() =>
                                setSectionState((current) => ({
                                  ...current,
                                  items: ensureSingleDefaultFont(
                                    current.items.filter(
                                      (item) =>
                                        item.managedFontId !== Number(selectedItem.managedFontId),
                                    ),
                                  ),
                                }))
                              }
                            >
                              Remove
                            </Button>
                          </IndexTable.Cell>
                        </IndexTable.Row>
                      ))}
                    </IndexTable>
                  </div>
                </>
              )}
            </Box>
          </Card>

          <Card>
            <Box padding="300">
              <div style={{ display: "grid", gap: 16 }}>
                <div>
                  <Text as="h3" variant="headingMd">
                    Fonts Settings
                  </Text>
                  <Text as="p" tone="subdued">
                    Keep the title and description used for the fonts section.
                  </Text>
                </div>

                <TextField
                  label="Label"
                  value={String(sectionState.label || "")}
                  onChange={(value) =>
                    setSectionState((current) => ({
                      ...current,
                      label: value,
                    }))
                  }
                  autoComplete="off"
                />

                <TextField
                  label="Description"
                  value={String(sectionState.description || "")}
                  onChange={(value) =>
                    setSectionState((current) => ({
                      ...current,
                      description: value,
                    }))
                  }
                  autoComplete="off"
                />

                <InlineStack align="end">
                  <SaveButton onClick={saveFonts} disabled={isSubmitting}>
                    Save fonts
                  </SaveButton>
                </InlineStack>
              </div>
            </Box>
          </Card>
        </>
      ) : (
        <>
          <Card>
            <Box padding="300">
              <InlineStack align="space-between" blockAlign="center">
                <div>
                  <Text as="h2" variant="headingLg">
                    Add Fonts
                  </Text>
                  <Text as="p" tone="subdued">
                    Add existing fonts from the shared library or create a new one here.
                  </Text>
                </div>
                <Button onClick={resetAddForm}>Back to fonts</Button>
              </InlineStack>
            </Box>
          </Card>

          <Card>
            <Box padding="300">
              <div style={{ display: "grid", gap: 20 }}>
                <div>
                  <Text as="h3" variant="headingMd">
                    Add existing fonts
                  </Text>
                  <Box paddingBlockStart="200" />
                  <MultiCombobox
                    label="Fonts"
                    placeholder="Select fonts"
                    data={managedFontOptions}
                    selectedOptions={selectedExistingFontIds}
                    setSelectedOptions={setSelectedExistingFontIds}
                    helpText="Add one or many fonts already available in your shared library."
                  />
                  <Box paddingBlockStart="300" />
                  <InlineStack align="end">
                    <Button
                      variant="primary"
                      tone="success"
                      onClick={addExistingFonts}
                      disabled={selectedExistingFontIds.length === 0 || isSubmitting}
                    >
                      Add selected fonts
                    </Button>
                  </InlineStack>
                </div>

                <div style={{ borderTop: "1px solid #E1E3E5", paddingTop: 20 }}>
                  <Text as="h3" variant="headingMd">
                    Create and add a new font
                  </Text>
                  <Box paddingBlockStart="200" />

                  <div style={{ display: "grid", gap: 12 }}>
                    <InlineStack gap="400" blockAlign="center">
                      <InlineStack gap="150" blockAlign="center">
                        <Text as="span">Google font</Text>
                        <ToggleButton
                          id="add-font-google"
                          type="radio"
                          checked={addMode === "google"}
                          value="google"
                          name="addFontMode"
                          onChange={(value) => {
                            setAddMode(String(value) === "google" ? "google" : "upload");
                            setFontUrl("");
                          }}
                        />
                      </InlineStack>
                      <InlineStack gap="150" blockAlign="center">
                        <Text as="span">Upload font</Text>
                        <ToggleButton
                          id="add-font-upload"
                          type="radio"
                          checked={addMode === "upload"}
                          value="upload"
                          name="addFontMode"
                          onChange={(value) => {
                            setAddMode(String(value) === "upload" ? "upload" : "google");
                            setSearchGoogleFontValue("");
                            setSelectedGoogleFont(null);
                            setSelectedGoogleFontVariant("");
                          }}
                        />
                      </InlineStack>
                    </InlineStack>

                    {addMode === "google" ? (
                      <>
                        <Autocomplete
                          options={googleFontOptions}
                          selected={[]}
                          onSelect={updateGoogleSelection}
                          textField={googleFontsTextField}
                        />

                        {selectedGoogleFont ? (
                          <Select
                            label="Font Variant"
                            options={selectedGoogleFont.variants.map((variant) => ({
                              label: variant,
                              value: variant,
                            }))}
                            value={selectedGoogleFontVariant}
                            onChange={(value) => {
                              setSelectedGoogleFontVariant(value);
                              setFontUrl(String(selectedGoogleFont.files?.[value] || ""));
                            }}
                          />
                        ) : null}
                      </>
                    ) : (
                      <FileInput
                        title="Upload font file"
                        type="font"
                        path={fontUrl}
                        handlePath={(value: string) => setFontUrl(String(value || ""))}
                        helperText=".ttf or .otf font file."
                      />
                    )}

                    <TextField
                      label="Label"
                      value={fontLabel}
                      onChange={setFontLabel}
                      autoComplete="off"
                    />

                    <InlineStack align="end">
                      <Button
                        variant="primary"
                        tone="success"
                        onClick={createAndAddFont}
                        disabled={!fontLabel.trim() || !fontUrl.trim() || isSubmitting}
                      >
                        Create and add font
                      </Button>
                    </InlineStack>
                  </div>
                </div>
              </div>
            </Box>
          </Card>
        </>
      )}
    </div>
  );
}

export default ClassicRequiredFontsScreen;
