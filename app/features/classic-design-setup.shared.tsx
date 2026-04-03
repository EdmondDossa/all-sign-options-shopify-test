import * as React from "react";
import {
  BlockStack,
  Box,
  Button,
  Card,
  Grid,
  Icon,
  InlineStack,
  Select,
  Text,
  TextField,
  Thumbnail,
} from "@shopify/polaris";
import { ChevronDownIcon, ChevronRightIcon } from "@shopify/polaris-icons";
import SaveButton from "~/components/buttons/SaveButton";
import { ToggleButton } from "~/components/buttons";
import { DeleteNowIconBtn } from "~/components/buttons/DeleteNowIconBtn";
import { FileInput } from "~/components/inputs/FileInput";
import { MultiCombobox } from "~/components/inputs/MultiCombobox";
import { TextColorField } from "~/components/inputs/TextColorField";
import { ActivatabaleItem } from "~/components/inputs/ActivatabaleItem";
import { BoldSvg } from "~/components/svgs/BoldSvg";
import { UnderlineSvg } from "~/components/svgs/UnderlineSvg";
import { OverlineSvg } from "~/components/svgs/OverlineSvg";
import { StrikeThroughSvg } from "~/components/svgs/StrikeThroughSvg";
import { ItalicOutlinedSvg } from "~/components/svgs/ItalicOutlinedSvg";
import { OpacitySvg } from "~/components/svgs/OpacitySvg";
import { ShapeBorderTopSvg } from "~/components/svgs/ShapeBorderTopSvg";
import { TextAlignmentSvg } from "~/components/svgs/TextAlignmentSvg";
import { WaterOpacitySvg } from "~/components/svgs/WaterOpacitySvg";
import { BlurSvg } from "~/components/svgs/BlurSvg";
import { SharpenSvg } from "~/components/svgs/SharpenSvg";
import { EmbossSvg } from "~/components/svgs/EmbossSvg";
import { FileUploader } from "~/routes/app.upload";
import { fileUrl } from "~/utils/fileUrl";
import { PRICING_PLANS } from "~/utils/pricing";

export type TextSettingsState = {
  active: boolean;
  enableQrCode: boolean;
  textType: string;
  colorsLabel: string;
  colorsPrevImg: string;
  colors: Array<{ name: string; codeHex: string }>;
  enableCustomColor: boolean;
  enableFontSize: {
    active: boolean;
    minimumFontSize: number | string;
    maximumFontSize: number | string;
    defaultFontSize: number | string;
  };
  enableBold: boolean;
  enableUnderline: boolean;
  enableOverline: boolean;
  enableStrike: boolean;
  enableItalic: boolean;
  enableOpacity: boolean;
  enableBorder: boolean;
  enableTextAlignment: boolean;
  enableCurvedUp: boolean;
  enableCurvedDown: boolean;
};

export type ImageSettingsState = {
  active: boolean;
  enableUploadImage: boolean;
  enableDownloadImage: boolean;
  colorsLabel: string;
  colorsPrevImg: string;
  colors: Array<{ name: string; codeHex: string }>;
  enableCustomColor: boolean;
  fileUploadScript: {
    customWithGraphical: boolean;
    enableSizeRestriction: boolean;
    uploadMinWidth: number;
    uploadMaxWidth: number;
    allowedUploadsExtentions: string[];
  };
  selectedCutline: string;
  cutlines: {
    first: { borderSize: number; color: string };
    second: {
      color: string;
      size: number;
      borderColor: string;
      borderSize: number;
    };
  };
  filter: {
    active: boolean;
    enableGreyscale: boolean;
    enableOpacity: boolean;
    enableEmbross: boolean;
    enableBlur: boolean;
    enableSepia: boolean;
    enableSharpen: boolean;
    enableGreenify: boolean;
    enablePinkify: boolean;
    enableOrangeify: boolean;
    enableBlueify: boolean;
  };
  scenes: string[];
};

export const defaultTextSettings = (): TextSettingsState => ({
  active: true,
  enableQrCode: false,
  textType: "normal",
  colorsLabel: "Texts Colors",
  colorsPrevImg: "",
  colors: [],
  enableCustomColor: true,
  enableFontSize: {
    active: true,
    minimumFontSize: 12,
    maximumFontSize: 30,
    defaultFontSize: 16,
  },
  enableBold: true,
  enableUnderline: true,
  enableOverline: true,
  enableStrike: true,
  enableItalic: true,
  enableOpacity: true,
  enableBorder: true,
  enableTextAlignment: true,
  enableCurvedUp: true,
  enableCurvedDown: true,
});

export const defaultImageSettings = (): ImageSettingsState => ({
  active: true,
  enableUploadImage: true,
  enableDownloadImage: true,
  colorsLabel: "Image Colors",
  colorsPrevImg: "",
  colors: [],
  enableCustomColor: true,
  fileUploadScript: {
    customWithGraphical: false,
    enableSizeRestriction: false,
    uploadMinWidth: 100,
    uploadMaxWidth: 200,
    allowedUploadsExtentions: ["png"],
  },
  selectedCutline: "none",
  cutlines: {
    first: { borderSize: 4, color: "#FFF10E" },
    second: {
      color: "#5EEC92",
      size: 10,
      borderColor: "#4A65F9",
      borderSize: 4,
    },
  },
  filter: {
    active: true,
    enableGreyscale: false,
    enableOpacity: true,
    enableEmbross: true,
    enableBlur: true,
    enableSepia: true,
    enableSharpen: true,
    enableGreenify: false,
    enablePinkify: false,
    enableOrangeify: false,
    enableBlueify: false,
  },
  scenes: [],
});

export const resolveLegacyTextImages = (
  data: any,
): { enableText: boolean; enableImage: boolean; enableQrCode: boolean } => {
  const materials = Array.isArray(data?.materials) ? data.materials : [];
  const source =
    materials.find((item: any) => Boolean(item?.isDefault)) || materials[0] || {};
  const textImages = source?.data?.textImages || {};

  return {
    enableText: textImages.enableText !== false,
    enableImage: textImages.enableImage !== false,
    enableQrCode: Boolean(textImages.enableQrCode),
  };
};

export const mergeTextSettings = (
  loaded: any,
  legacy?: { enableText: boolean; enableImage: boolean; enableQrCode: boolean },
): TextSettingsState => {
  const defaults = defaultTextSettings();
  return {
    ...defaults,
    ...(loaded || {}),
    active:
      typeof loaded?.active === "boolean"
        ? loaded.active
        : (legacy?.enableText ?? defaults.active),
    enableQrCode:
      typeof loaded?.enableQrCode === "boolean"
        ? loaded.enableQrCode
        : (legacy?.enableQrCode ?? defaults.enableQrCode),
    colors: Array.isArray(loaded?.colors) ? loaded.colors : defaults.colors,
    enableFontSize: {
      ...defaults.enableFontSize,
      ...(loaded?.enableFontSize || {}),
    },
  };
};

export const mergeImageSettings = (
  loaded: any,
  legacy?: { enableText: boolean; enableImage: boolean; enableQrCode: boolean },
): ImageSettingsState => {
  const defaults = defaultImageSettings();
  return {
    ...defaults,
    ...(loaded || {}),
    active:
      typeof loaded?.active === "boolean"
        ? loaded.active
        : (legacy?.enableImage ?? defaults.active),
    colors: Array.isArray(loaded?.colors) ? loaded.colors : defaults.colors,
    fileUploadScript: {
      ...defaults.fileUploadScript,
      ...(loaded?.fileUploadScript || {}),
      allowedUploadsExtentions: Array.isArray(
        loaded?.fileUploadScript?.allowedUploadsExtentions,
      )
        ? loaded.fileUploadScript.allowedUploadsExtentions
        : defaults.fileUploadScript.allowedUploadsExtentions,
    },
    cutlines: {
      first: {
        ...defaults.cutlines.first,
        ...(loaded?.cutlines?.first || {}),
      },
      second: {
        ...defaults.cutlines.second,
        ...(loaded?.cutlines?.second || {}),
      },
    },
    filter: {
      ...defaults.filter,
      ...(loaded?.filter || {}),
    },
    scenes: Array.isArray(loaded?.scenes) ? loaded.scenes : defaults.scenes,
  };
};

function SectionSave({
  loading,
  onClick,
  label,
}: {
  loading: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <Box paddingBlockStart="300">
      <InlineStack align="end">
        <SaveButton loading={loading} onClick={onClick}>
          {label}
        </SaveButton>
      </InlineStack>
    </Box>
  );
}

function FoldableCardSection({
  title,
  description,
  defaultOpen = true,
  children,
}: {
  title: string;
  description?: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = React.useState(defaultOpen);

  return (
    <Card>
      <Box padding="300">
        <button
          type="button"
          onClick={() => setOpen((current) => !current)}
          style={{
            width: "100%",
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr) 20px",
            alignItems: "center",
            gap: 12,
            padding: 0,
            background: "transparent",
            border: "none",
            cursor: "pointer",
            textAlign: "left",
          }}
        >
          <div style={{ minWidth: 0 }}>
            <Text as="h3" variant="headingMd">
              {title}
            </Text>
            {description ? (
              <Box paddingBlockStart="100">
                <Text as="p" tone="subdued">
                  {description}
                </Text>
              </Box>
            ) : null}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Icon source={open ? ChevronDownIcon : ChevronRightIcon} tone="subdued" />
          </div>
        </button>

        {open ? <Box paddingBlockStart="300">{children}</Box> : null}
      </Box>
    </Card>
  );
}

const textTypeOptions = [
  {
    label: "NORMAL",
    value: "normal",
    image: "/assets/images/text-types/text-normal.png",
  },
  {
    label: "NEON",
    value: "neon",
    image: "/assets/images/text-types/text-neon.png",
  },
  { label: "3D", value: "3D", image: "/assets/images/text-types/text-3d.png" },
];

const uploadExtensionOptions = [
  { label: "PNG", value: "png" },
  { label: "JPEG", value: "jpeg" },
  { label: "SVG", value: "svg" },
  { label: "WEBP", value: "webp" },
  { label: "GIF", value: "gif" },
];

const cutlineOptions = ["none", "1x", "2x"];

export function TextSetupSection({
  textSettings,
  setTextSettings,
  plan,
  loading,
  onSave,
}: {
  textSettings: TextSettingsState;
  setTextSettings: React.Dispatch<React.SetStateAction<TextSettingsState>>;
  plan: string;
  loading: boolean;
  onSave: () => void;
}) {
  const addTextColor = () =>
    setTextSettings((current) => ({
      ...current,
      colors: [...current.colors, { name: "", codeHex: "#FFFFFF" }],
    }));
  const removeTextColor = (index: number) =>
    setTextSettings((current) => ({
      ...current,
      colors: current.colors.filter(
        (_, currentIndex) => currentIndex !== index,
      ),
    }));

  return (
    <section style={{ scrollMarginTop: 16 }}>
      <BlockStack gap="300">
        <FoldableCardSection
          title="Text Access"
          description="Decide whether this configuration should expose text customization."
        >
          <InlineStack gap="250" blockAlign="center">
            <Text as="span" tone="subdued">
              No
            </Text>
            <ToggleButton
              checked={textSettings.active}
              onChange={(value) =>
                setTextSettings((current) => ({
                  ...current,
                  active: Boolean(value),
                }))
              }
            />
            <Text as="span" tone="subdued">
              Yes
            </Text>
          </InlineStack>
        </FoldableCardSection>

        <FoldableCardSection
          title="QR Code"
          description="Control whether QR code customization is available in this configuration."
          defaultOpen={false}
        >
          <InlineStack gap="250" blockAlign="center">
            <Text as="span" tone="subdued">
              No
            </Text>
            <ToggleButton
              checked={textSettings.enableQrCode}
              onChange={(value) =>
                setTextSettings((current) => ({
                  ...current,
                  enableQrCode: Boolean(value),
                }))
              }
            />
            <Text as="span" tone="subdued">
              Yes
            </Text>
          </InlineStack>
        </FoldableCardSection>

        {textSettings.active ? (
          <>
        <FoldableCardSection
          title="Text Type"
          description="Choose the main text rendering mode used by the configurator."
        >
          <Grid gap={{ lg: "20px" }}>
            {textTypeOptions.map((textType) => (
              <Grid.Cell
                key={textType.value}
                columnSpan={{ xs: 6, sm: 3, md: 3, lg: 4, xl: 4 }}
              >
                <Card>
                  <Box padding="300">
                    <InlineStack
                      align="space-between"
                      blockAlign="center"
                      wrap={false}
                    >
                      <InlineStack gap="300" blockAlign="center">
                        <Thumbnail
                          size="large"
                          source={textType.image}
                          alt={textType.label}
                        />
                        <Text as="strong" variant="bodyMd">
                          {textType.label}
                        </Text>
                      </InlineStack>
                      <ToggleButton
                        checked={textSettings.textType === textType.value}
                        type="radio"
                        name="text-type"
                        value={textType.value}
                        onChange={(value) =>
                          setTextSettings((current) => ({
                            ...current,
                            textType: String(value),
                          }))
                        }
                      />
                    </InlineStack>
                  </Box>
                </Card>
              </Grid.Cell>
            ))}
          </Grid>
        </FoldableCardSection>

        <FoldableCardSection
          title="Text Colors"
          description="Manage predefined text colors and the optional custom color flow."
        >
          <Grid gap={{ lg: "25px" }}>
            <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
              <BlockStack gap="300">
                <Box maxWidth="320px">
                  <TextField
                    label="Label"
                    autoComplete="off"
                    value={textSettings.colorsLabel}
                    onChange={(value) =>
                      setTextSettings((current) => ({
                        ...current,
                        colorsLabel: value,
                      }))
                    }
                  />
                </Box>
                <Grid gap={{ lg: "16px" }}>
                  {textSettings.colors
                    .filter((_, index) =>
                      plan === PRICING_PLANS.STARTER
                        ? index < PRICING_PLANS.STARTER_RULES.textColors
                        : true,
                    )
                    .map((color, index) => (
                      <Grid.Cell
                        key={`text-color-${index}`}
                        columnSpan={{ xs: 6, sm: 6, md: 6, lg: 4, xl: 4 }}
                      >
                        <Card>
                          <Box padding="250">
                            <BlockStack gap="200">
                              <InlineStack
                                align="space-between"
                                blockAlign="center"
                              >
                                <Text
                                  as="strong"
                                  variant="bodySm"
                                >{`Color ${index + 1}`}</Text>
                                <DeleteNowIconBtn
                                  onClick={() => removeTextColor(index)}
                                />
                              </InlineStack>
                              <InlineStack gap="200" blockAlign="end" wrap={false}>
                                <div style={{ flex: 1 }}>
                                  <TextField
                                    label="Color name"
                                    labelHidden
                                    placeholder="Name"
                                    autoComplete="off"
                                    value={color.name}
                                    onChange={(value) => {
                                      const next = [...textSettings.colors];
                                      next[index] = { ...color, name: value };
                                      setTextSettings((current) => ({
                                        ...current,
                                        colors: next,
                                      }));
                                    }}
                                  />
                                </div>
                                <div style={{ width: 120 }}>
                                  <TextColorField
                                    label="Color"
                                    color={color.codeHex}
                                    setColor={(value: string) => {
                                      const next = [...textSettings.colors];
                                      next[index] = { ...color, codeHex: value };
                                      setTextSettings((current) => ({
                                        ...current,
                                        colors: next,
                                      }));
                                    }}
                                  />
                                </div>
                              </InlineStack>
                            </BlockStack>
                          </Box>
                        </Card>
                      </Grid.Cell>
                    ))}
                </Grid>
                {(
                  plan === PRICING_PLANS.STARTER
                    ? textSettings.colors.length <
                      PRICING_PLANS.STARTER_RULES.textColors
                    : true
                ) ? (
                  <Box maxWidth="220px">
                    <Button variant="secondary" onClick={addTextColor}>
                      Add text color
                    </Button>
                  </Box>
                ) : null}
              </BlockStack>
            </Grid.Cell>

            {(
              plan === PRICING_PLANS.STARTER
                ? PRICING_PLANS.STARTER_RULES.textCustomColors
                : true
            ) ? (
              <>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 3, xl: 3 }}>
                  <BlockStack gap="150">
                    <Text as="strong" variant="bodyMd">
                      Enable Custom color
                    </Text>
                    <InlineStack gap="250" blockAlign="center">
                      <Text as="span" tone="subdued">
                        No
                      </Text>
                      <ToggleButton
                        checked={textSettings.enableCustomColor}
                        onChange={(value) =>
                          setTextSettings((current) => ({
                            ...current,
                            enableCustomColor: Boolean(value),
                          }))
                        }
                      />
                      <Text as="span" tone="subdued">
                        Yes
                      </Text>
                    </InlineStack>
                  </BlockStack>
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 9, xl: 9 }}>
                  <FileInput
                    title="Custom color preview image"
                    buttonTitle="upload image"
                    path={textSettings.colorsPrevImg}
                    handlePath={(value: any) =>
                      setTextSettings((current) => ({
                        ...current,
                        colorsPrevImg: value,
                      }))
                    }
                  />
                </Grid.Cell>
              </>
            ) : null}
          </Grid>
        </FoldableCardSection>

        <FoldableCardSection
          title="Font Size"
          description="Configure whether the customer can change size and define the allowed bounds."
        >
          <Grid gap={{ lg: "25px" }}>
            <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
              <BlockStack gap="150">
                <Text as="strong" variant="bodyMd">
                  Enable font size
                </Text>
                <InlineStack gap="250" blockAlign="center">
                  <Text as="span" tone="subdued">
                    No
                  </Text>
                  <ToggleButton
                    checked={textSettings.enableFontSize.active}
                    onChange={(value) =>
                      setTextSettings((current) => ({
                        ...current,
                        enableFontSize: {
                          ...current.enableFontSize,
                          active: Boolean(value),
                        },
                      }))
                    }
                  />
                  <Text as="span" tone="subdued">
                    Yes
                  </Text>
                </InlineStack>
              </BlockStack>
            </Grid.Cell>

            {textSettings.enableFontSize.active ? (
              <>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 4, xl: 4 }}>
                  <TextField
                    label="Minimun font size"
                    autoComplete="off"
                    value={`${textSettings.enableFontSize.minimumFontSize ?? ""}`}
                    onChange={(value) =>
                      setTextSettings((current) => ({
                        ...current,
                        enableFontSize: {
                          ...current.enableFontSize,
                          minimumFontSize: value,
                        },
                      }))
                    }
                  />
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 4, xl: 4 }}>
                  <TextField
                    label="Maximum font size"
                    autoComplete="off"
                    value={`${textSettings.enableFontSize.maximumFontSize ?? ""}`}
                    onChange={(value) =>
                      setTextSettings((current) => ({
                        ...current,
                        enableFontSize: {
                          ...current.enableFontSize,
                          maximumFontSize: value,
                        },
                      }))
                    }
                  />
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 4, xl: 4 }}>
                  <TextField
                    label="Default size"
                    autoComplete="off"
                    value={`${textSettings.enableFontSize.defaultFontSize ?? ""}`}
                    onChange={(value) =>
                      setTextSettings((current) => ({
                        ...current,
                        enableFontSize: {
                          ...current.enableFontSize,
                          defaultFontSize: value,
                        },
                      }))
                    }
                  />
                </Grid.Cell>
              </>
            ) : null}
          </Grid>
        </FoldableCardSection>

        <FoldableCardSection
          title="Text Options"
          description="Enable or disable the formatting tools available to the customer."
        >
          <InlineStack gap="600" blockAlign="start">
            <ActivatabaleItem
              fillIcon
              title="Bold"
              status={textSettings.enableBold}
              toggleStatus={(value: boolean) =>
                setTextSettings((current) => ({
                  ...current,
                  enableBold: value,
                }))
              }
            >
              <BoldSvg />
            </ActivatabaleItem>
            <ActivatabaleItem
              title="Underline"
              status={textSettings.enableUnderline}
              toggleStatus={(value: boolean) =>
                setTextSettings((current) => ({
                  ...current,
                  enableUnderline: value,
                }))
              }
            >
              <UnderlineSvg />
            </ActivatabaleItem>
            <ActivatabaleItem
              title="Overline"
              status={textSettings.enableOverline}
              toggleStatus={(value: boolean) =>
                setTextSettings((current) => ({
                  ...current,
                  enableOverline: value,
                }))
              }
            >
              <OverlineSvg />
            </ActivatabaleItem>
            <ActivatabaleItem
              title="Strike through"
              status={textSettings.enableStrike}
              toggleStatus={(value: boolean) =>
                setTextSettings((current) => ({
                  ...current,
                  enableStrike: value,
                }))
              }
            >
              <StrikeThroughSvg />
            </ActivatabaleItem>
            <ActivatabaleItem
              title="Italic"
              status={textSettings.enableItalic}
              toggleStatus={(value: boolean) =>
                setTextSettings((current) => ({
                  ...current,
                  enableItalic: value,
                }))
              }
            >
              <ItalicOutlinedSvg />
            </ActivatabaleItem>
            <ActivatabaleItem
              title="Opacity"
              status={textSettings.enableOpacity}
              toggleStatus={(value: boolean) =>
                setTextSettings((current) => ({
                  ...current,
                  enableOpacity: value,
                }))
              }
            >
              <OpacitySvg />
            </ActivatabaleItem>
            <ActivatabaleItem
              title="Bolder"
              status={textSettings.enableBorder}
              toggleStatus={(value: boolean) =>
                setTextSettings((current) => ({
                  ...current,
                  enableBorder: value,
                }))
              }
            >
              <ShapeBorderTopSvg />
            </ActivatabaleItem>
            <ActivatabaleItem
              title="Text Alignment"
              status={textSettings.enableTextAlignment}
              toggleStatus={(value: boolean) =>
                setTextSettings((current) => ({
                  ...current,
                  enableTextAlignment: value,
                }))
              }
            >
              <TextAlignmentSvg />
            </ActivatabaleItem>
          </InlineStack>
        </FoldableCardSection>
          </>
        ) : null}
      </BlockStack>
      <SectionSave loading={loading} onClick={onSave} label="Save Text" />
    </section>
  );
}

export function ImageSetupSection({
  imageSettings,
  setImageSettings,
  plan,
  loading,
  onSave,
}: {
  imageSettings: ImageSettingsState;
  setImageSettings: React.Dispatch<React.SetStateAction<ImageSettingsState>>;
  plan: string;
  loading: boolean;
  onSave: () => void;
}) {
  const addImageColor = () =>
    setImageSettings((current) => ({
      ...current,
      colors: [...current.colors, { name: "", codeHex: "#FFFFFF" }],
    }));
  const removeImageColor = (index: number) =>
    setImageSettings((current) => ({
      ...current,
      colors: current.colors.filter(
        (_, currentIndex) => currentIndex !== index,
      ),
    }));
  const removeScene = (scene: string) =>
    setImageSettings((current) => ({
      ...current,
      scenes: current.scenes.filter((item) => item !== scene),
    }));

  return (
    <section style={{ scrollMarginTop: 16 }}>
      <BlockStack gap="300">
        <FoldableCardSection
          title="Image Access"
          description="Control whether customers can upload or download images in the editor."
        >
          <Grid gap={{ lg: "25px" }}>
            <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
              <BlockStack gap="150">
                <Text as="strong" variant="bodyMd">
                  Enable Image
                </Text>
                <InlineStack gap="250" blockAlign="center">
                  <Text as="span" tone="subdued">
                    No
                  </Text>
                  <ToggleButton
                    checked={imageSettings.active}
                    onChange={(value) =>
                      setImageSettings((current) => ({
                        ...current,
                        active: Boolean(value),
                      }))
                    }
                  />
                  <Text as="span" tone="subdued">
                    Yes
                  </Text>
                </InlineStack>
              </BlockStack>
            </Grid.Cell>
            <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
              <BlockStack gap="150">
                <Text as="strong" variant="bodyMd">
                  Enable Download Image
                </Text>
                <InlineStack gap="250" blockAlign="center">
                  <Text as="span" tone="subdued">
                    No
                  </Text>
                  <ToggleButton
                    checked={imageSettings.enableDownloadImage}
                    onChange={(value) =>
                      setImageSettings((current) => ({
                        ...current,
                        enableDownloadImage: Boolean(value),
                      }))
                    }
                  />
                  <Text as="span" tone="subdued">
                    Yes
                  </Text>
                </InlineStack>
              </BlockStack>
            </Grid.Cell>
            <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
              <BlockStack gap="150">
                <Text as="strong" variant="bodyMd">
                  Enable upload Image
                </Text>
                <InlineStack gap="250" blockAlign="center">
                  <Text as="span" tone="subdued">
                    No
                  </Text>
                  <ToggleButton
                    checked={imageSettings.enableUploadImage}
                    onChange={(value) =>
                      setImageSettings((current) => ({
                        ...current,
                        enableUploadImage: Boolean(value),
                      }))
                    }
                  />
                  <Text as="span" tone="subdued">
                    Yes
                  </Text>
                </InlineStack>
              </BlockStack>
            </Grid.Cell>
          </Grid>
        </FoldableCardSection>

        {imageSettings.active ? (
          <>
        <FoldableCardSection
          title="Image Colors"
          description="Manage predefined image colors and the optional custom color preview."
        >
          <Grid gap={{ lg: "25px" }}>
            <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
              <BlockStack gap="300">
                <Box maxWidth="360px">
                  <TextField
                    label="Label"
                    autoComplete="off"
                    value={imageSettings.colorsLabel}
                    onChange={(value) =>
                      setImageSettings((current) => ({
                        ...current,
                        colorsLabel: value,
                      }))
                    }
                  />
                </Box>
                <Grid gap={{ lg: "25px" }}>
                  {imageSettings.colors
                    .filter((_, index) =>
                      plan === PRICING_PLANS.STARTER
                        ? index < PRICING_PLANS.STARTER_RULES.imageColors
                        : true,
                    )
                    .map((color, index) => (
                      <Grid.Cell
                        key={`image-color-${index}`}
                        columnSpan={{ xs: 6, sm: 3, md: 3, lg: 4, xl: 4 }}
                      >
                        <InlineStack gap="300" blockAlign="end" wrap={false}>
                          <TextField
                            label="Name"
                            autoComplete="off"
                            value={color.name}
                            onChange={(value) => {
                              const next = [...imageSettings.colors];
                              next[index] = { ...color, name: value };
                              setImageSettings((current) => ({
                                ...current,
                                colors: next,
                              }));
                            }}
                          />
                          <InlineStack
                            gap="300"
                            blockAlign="center"
                            wrap={false}
                          >
                            <TextColorField
                              color={color.codeHex}
                              setColor={(value: string) => {
                                const next = [...imageSettings.colors];
                                next[index] = { ...color, codeHex: value };
                                setImageSettings((current) => ({
                                  ...current,
                                  colors: next,
                                }));
                              }}
                            />
                            <DeleteNowIconBtn
                              onClick={() => removeImageColor(index)}
                            />
                          </InlineStack>
                        </InlineStack>
                      </Grid.Cell>
                    ))}
                </Grid>
                {(
                  plan === PRICING_PLANS.STARTER
                    ? imageSettings.colors.length <
                      PRICING_PLANS.STARTER_RULES.imageColors
                    : true
                ) ? (
                  <Box maxWidth="180px">
                    <Button variant="secondary" onClick={addImageColor}>
                      Add more colors
                    </Button>
                  </Box>
                ) : null}
              </BlockStack>
            </Grid.Cell>

            {(
              plan === PRICING_PLANS.STARTER
                ? PRICING_PLANS.STARTER_RULES.imageCustomColors
                : true
            ) ? (
              <>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 3, xl: 3 }}>
                  <BlockStack gap="150">
                    <Text as="strong" variant="bodyMd">
                      Enable Custom color
                    </Text>
                    <InlineStack gap="250" blockAlign="center">
                      <Text as="span" tone="subdued">
                        No
                      </Text>
                      <ToggleButton
                        checked={imageSettings.enableCustomColor}
                        onChange={(value) =>
                          setImageSettings((current) => ({
                            ...current,
                            enableCustomColor: Boolean(value),
                          }))
                        }
                      />
                      <Text as="span" tone="subdued">
                        Yes
                      </Text>
                    </InlineStack>
                  </BlockStack>
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 9, xl: 9 }}>
                  <FileInput
                    title="Custom color preview image"
                    buttonTitle="upload image"
                    path={imageSettings.colorsPrevImg}
                    handlePath={(value: any) =>
                      setImageSettings((current) => ({
                        ...current,
                        colorsPrevImg: value,
                      }))
                    }
                  />
                </Grid.Cell>
              </>
            ) : null}
          </Grid>
        </FoldableCardSection>

        <FoldableCardSection
          title="Upload Script"
          description="Define the upload behavior, size limits and allowed extensions."
        >
          <Grid gap={{ lg: "25px" }}>
            <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
              <InlineStack gap="300" blockAlign="center">
                <Text as="strong" tone="subdued" variant="bodyMd">
                  Normal
                </Text>
                <ToggleButton
                  checked={imageSettings.fileUploadScript.customWithGraphical}
                  onChange={(value) =>
                    setImageSettings((current) => ({
                      ...current,
                      fileUploadScript: {
                        ...current.fileUploadScript,
                        customWithGraphical: Boolean(value),
                      },
                    }))
                  }
                />
                <Text as="strong" tone="subdued" variant="bodyMd">
                  Custom with graphical enchacements
                </Text>
              </InlineStack>
            </Grid.Cell>

            <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
              <BlockStack gap="150">
                <InlineStack gap="300" blockAlign="center">
                  <Text as="strong" variant="bodyMd">
                    Restrict uploaded image sizes
                  </Text>
                  <Text as="span" tone="subdued">
                    No
                  </Text>
                  <ToggleButton
                    checked={imageSettings.fileUploadScript.enableSizeRestriction}
                    onChange={(value) =>
                      setImageSettings((current) => ({
                        ...current,
                        fileUploadScript: {
                          ...current.fileUploadScript,
                          enableSizeRestriction: Boolean(value),
                        },
                      }))
                    }
                  />
                  <Text as="span" tone="subdued">
                    Yes
                  </Text>
                </InlineStack>
                <Text as="p" tone="subdued">
                  Enable this to enforce minimum and maximum width on uploaded images.
                </Text>
              </BlockStack>
            </Grid.Cell>

            {imageSettings.fileUploadScript.enableSizeRestriction ? (
              <>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
                  <TextField
                    label="Upload min width (px)"
                    autoComplete="off"
                    value={`${imageSettings.fileUploadScript.uploadMinWidth}`}
                    onChange={(value) =>
                      setImageSettings((current) => ({
                        ...current,
                        fileUploadScript: {
                          ...current.fileUploadScript,
                          uploadMinWidth: Number(value) || 0,
                        },
                      }))
                    }
                  />
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
                  <TextField
                    label="Upload Max width (px)"
                    autoComplete="off"
                    value={`${imageSettings.fileUploadScript.uploadMaxWidth}`}
                    onChange={(value) =>
                      setImageSettings((current) => ({
                        ...current,
                        fileUploadScript: {
                          ...current.fileUploadScript,
                          uploadMaxWidth: Number(value) || 0,
                        },
                      }))
                    }
                  />
                </Grid.Cell>
              </>
            ) : null}

            <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
              <MultiCombobox
                label="Select allow extension"
                placeholder="select extension"
                data={uploadExtensionOptions}
                selectedOptions={
                  imageSettings.fileUploadScript.allowedUploadsExtentions
                }
                setSelectedOptions={(value: any) => {
                  if (!Array.isArray(value)) return;
                  setImageSettings((current) => ({
                    ...current,
                    fileUploadScript: {
                      ...current.fileUploadScript,
                      allowedUploadsExtentions: value,
                    },
                  }));
                }}
              />
            </Grid.Cell>
          </Grid>
        </FoldableCardSection>

        <FoldableCardSection
          title="Cutlines"
          description="Configure the first and second cutline only when they are enabled."
        >
          <Grid gap={{ lg: "25px" }}>
            <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
              <Select
                label="Cutline Type"
                options={cutlineOptions}
                value={imageSettings.selectedCutline}
                onChange={(value) =>
                  setImageSettings((current) => ({
                    ...current,
                    selectedCutline: value,
                  }))
                }
              />
            </Grid.Cell>

            {imageSettings.selectedCutline === "1x" ||
            imageSettings.selectedCutline === "2x" ? (
              <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
                <Card>
                  <Box padding="300">
                    <BlockStack gap="300">
                      <Text as="strong" variant="bodyMd">
                        First Cutline
                      </Text>
                      <Grid gap={{ lg: "25px" }}>
                        <Grid.Cell
                          columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}
                        >
                          <TextField
                            label="Border Size (for print ready file)"
                            autoComplete="off"
                            suffix="px"
                            value={`${imageSettings.cutlines.first.borderSize}`}
                            onChange={(value) =>
                              setImageSettings((current) => ({
                                ...current,
                                cutlines: {
                                  ...current.cutlines,
                                  first: {
                                    ...current.cutlines.first,
                                    borderSize: Number(value) || 0,
                                  },
                                },
                              }))
                            }
                          />
                        </Grid.Cell>
                        <Grid.Cell
                          columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}
                        >
                          <BlockStack gap="100">
                            <Text as="strong" variant="bodyMd">
                              Color
                            </Text>
                            <TextColorField
                              color={imageSettings.cutlines.first.color}
                              setColor={(value: string) =>
                                setImageSettings((current) => ({
                                  ...current,
                                  cutlines: {
                                    ...current.cutlines,
                                    first: {
                                      ...current.cutlines.first,
                                      color: value,
                                    },
                                  },
                                }))
                              }
                            />
                          </BlockStack>
                        </Grid.Cell>
                      </Grid>
                    </BlockStack>
                  </Box>
                </Card>
              </Grid.Cell>
            ) : null}

            {imageSettings.selectedCutline === "2x" ? (
              <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
                <Card>
                  <Box padding="300">
                    <BlockStack gap="300">
                      <Text as="strong" variant="bodyMd">
                        Second Cutline
                      </Text>
                      <Grid gap={{ lg: "25px" }}>
                        <Grid.Cell
                          columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}
                        >
                          <TextField
                            label="Size between Two Cutlines border"
                            autoComplete="off"
                            suffix="px"
                            value={`${imageSettings.cutlines.second.size}`}
                            onChange={(value) =>
                              setImageSettings((current) => ({
                                ...current,
                                cutlines: {
                                  ...current.cutlines,
                                  second: {
                                    ...current.cutlines.second,
                                    size: Number(value) || 0,
                                  },
                                },
                              }))
                            }
                          />
                        </Grid.Cell>
                        <Grid.Cell
                          columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}
                        >
                          <BlockStack gap="100">
                            <Text as="strong" variant="bodyMd">
                              Color
                            </Text>
                            <TextColorField
                              color={imageSettings.cutlines.second.color}
                              setColor={(value: string) =>
                                setImageSettings((current) => ({
                                  ...current,
                                  cutlines: {
                                    ...current.cutlines,
                                    second: {
                                      ...current.cutlines.second,
                                      color: value,
                                    },
                                  },
                                }))
                              }
                            />
                          </BlockStack>
                        </Grid.Cell>
                        <Grid.Cell
                          columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}
                        >
                          <TextField
                            label="Border Size (for print ready file)"
                            autoComplete="off"
                            suffix="px"
                            value={`${imageSettings.cutlines.second.borderSize}`}
                            onChange={(value) =>
                              setImageSettings((current) => ({
                                ...current,
                                cutlines: {
                                  ...current.cutlines,
                                  second: {
                                    ...current.cutlines.second,
                                    borderSize: Number(value) || 0,
                                  },
                                },
                              }))
                            }
                          />
                        </Grid.Cell>
                        <Grid.Cell
                          columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}
                        >
                          <BlockStack gap="100">
                            <Text as="strong" variant="bodyMd">
                              Border Color
                            </Text>
                            <TextColorField
                              color={imageSettings.cutlines.second.borderColor}
                              setColor={(value: string) =>
                                setImageSettings((current) => ({
                                  ...current,
                                  cutlines: {
                                    ...current.cutlines,
                                    second: {
                                      ...current.cutlines.second,
                                      borderColor: value,
                                    },
                                  },
                                }))
                              }
                            />
                          </BlockStack>
                        </Grid.Cell>
                      </Grid>
                    </BlockStack>
                  </Box>
                </Card>
              </Grid.Cell>
            ) : null}
          </Grid>
        </FoldableCardSection>

        <FoldableCardSection
          title="Filters"
          description="Control which image effects are available in the editor."
        >
          <BlockStack gap="300">
            <InlineStack gap="250" blockAlign="center">
              <Text as="strong" variant="bodyMd">
                Filter
              </Text>
              <ToggleButton
                checked={imageSettings.filter.active}
                onChange={(value) =>
                  setImageSettings((current) => ({
                    ...current,
                    filter: { ...current.filter, active: Boolean(value) },
                  }))
                }
              />
            </InlineStack>
            {imageSettings.filter.active ? (
              <InlineStack gap="600" blockAlign="start">
                <ActivatabaleItem
                  fillIcon
                  noTrokeIcon
                  title="Greyscale"
                  status={imageSettings.filter.enableGreyscale}
                  toggleStatus={(value: boolean) =>
                    setImageSettings((current) => ({
                      ...current,
                      filter: { ...current.filter, enableGreyscale: value },
                    }))
                  }
                >
                  <WaterOpacitySvg />
                </ActivatabaleItem>
                <ActivatabaleItem
                  fillIcon
                  noTrokeIcon
                  title="Greenify"
                  status={imageSettings.filter.enableGreenify}
                  toggleStatus={(value: boolean) =>
                    setImageSettings((current) => ({
                      ...current,
                      filter: { ...current.filter, enableGreenify: value },
                    }))
                  }
                >
                  <WaterOpacitySvg />
                </ActivatabaleItem>
                <ActivatabaleItem
                  fillIcon
                  noTrokeIcon
                  title="Pinkify"
                  status={imageSettings.filter.enablePinkify}
                  toggleStatus={(value: boolean) =>
                    setImageSettings((current) => ({
                      ...current,
                      filter: { ...current.filter, enablePinkify: value },
                    }))
                  }
                >
                  <WaterOpacitySvg />
                </ActivatabaleItem>
                <ActivatabaleItem
                  fillIcon
                  noTrokeIcon
                  title="Orangeify"
                  status={imageSettings.filter.enableOrangeify}
                  toggleStatus={(value: boolean) =>
                    setImageSettings((current) => ({
                      ...current,
                      filter: { ...current.filter, enableOrangeify: value },
                    }))
                  }
                >
                  <WaterOpacitySvg />
                </ActivatabaleItem>
                <ActivatabaleItem
                  fillIcon
                  noTrokeIcon
                  title="Blueify"
                  status={imageSettings.filter.enableBlueify}
                  toggleStatus={(value: boolean) =>
                    setImageSettings((current) => ({
                      ...current,
                      filter: { ...current.filter, enableBlueify: value },
                    }))
                  }
                >
                  <WaterOpacitySvg />
                </ActivatabaleItem>
                <ActivatabaleItem
                  fillIcon
                  noTrokeIcon
                  title="Opacity"
                  status={imageSettings.filter.enableOpacity}
                  toggleStatus={(value: boolean) =>
                    setImageSettings((current) => ({
                      ...current,
                      filter: { ...current.filter, enableOpacity: value },
                    }))
                  }
                >
                  <WaterOpacitySvg />
                </ActivatabaleItem>
                <ActivatabaleItem
                  fillIcon
                  noTrokeIcon
                  title="Blur"
                  status={imageSettings.filter.enableBlur}
                  toggleStatus={(value: boolean) =>
                    setImageSettings((current) => ({
                      ...current,
                      filter: { ...current.filter, enableBlur: value },
                    }))
                  }
                >
                  <BlurSvg />
                </ActivatabaleItem>
                <ActivatabaleItem
                  fillIcon
                  noTrokeIcon
                  title="Sepia"
                  status={imageSettings.filter.enableSepia}
                  toggleStatus={(value: boolean) =>
                    setImageSettings((current) => ({
                      ...current,
                      filter: { ...current.filter, enableSepia: value },
                    }))
                  }
                >
                  <SharpenSvg />
                </ActivatabaleItem>
                <ActivatabaleItem
                  title="sharpen"
                  status={imageSettings.filter.enableSharpen}
                  toggleStatus={(value: boolean) =>
                    setImageSettings((current) => ({
                      ...current,
                      filter: { ...current.filter, enableSharpen: value },
                    }))
                  }
                >
                  <SharpenSvg />
                </ActivatabaleItem>
                <ActivatabaleItem
                  title="Emboss"
                  status={imageSettings.filter.enableEmbross}
                  toggleStatus={(value: boolean) =>
                    setImageSettings((current) => ({
                      ...current,
                      filter: { ...current.filter, enableEmbross: value },
                    }))
                  }
                >
                  <EmbossSvg />
                </ActivatabaleItem>
              </InlineStack>
            ) : null}
          </BlockStack>
        </FoldableCardSection>

        <FoldableCardSection
          title="Scenes"
          description="Choose the background scenes used for image preview."
        >
          <BlockStack gap="300">
            <InlineStack align="center">
              <FileUploader
                multiple={true}
                type="image"
                fileData={imageSettings.scenes}
                setFilesData={(values: string[]) =>
                  setImageSettings((current) => ({
                    ...current,
                    scenes: values,
                  }))
                }
                title="Upload background scenes images"
              >
                <button
                  type="button"
                  className="next-large-btn"
                  disabled={loading}
                >
                  <Box paddingInline="1000">
                    <InlineStack gap="300" blockAlign="center">
                      <span style={{ color: "white", fontWeight: "bold" }}>
                        Choose the scenes
                      </span>
                    </InlineStack>
                  </Box>
                </button>
              </FileUploader>
            </InlineStack>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "center",
                gap: 16,
              }}
            >
              {imageSettings.scenes.map((scene) => (
                <SceneItem
                  key={scene}
                  imgSrc={scene}
                  onDelete={() => removeScene(scene)}
                />
              ))}
            </div>
          </BlockStack>
        </FoldableCardSection>
          </>
        ) : null}
      </BlockStack>
      <SectionSave loading={loading} onClick={onSave} label="Save Image" />
    </section>
  );
}

function SceneItem({
  imgSrc,
  onDelete,
}: {
  imgSrc: string;
  onDelete: () => void;
}) {
  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        width: 100,
        border: "1px solid white",
        borderRadius: 6,
        overflow: "hidden",
      }}
    >
      <div style={{ position: "relative", width: 100, height: 100 }}>
        <img
          src={fileUrl(imgSrc)}
          alt=""
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>
      <button
        type="button"
        onClick={onDelete}
        style={{
          backgroundColor: "#ef4444",
          position: "absolute",
          top: 0,
          right: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          width: 20,
          height: 20,
          borderRadius: 6,
          boxShadow: "0 10px 15px -3px rgba(113, 113, 122, 0.4)",
          fontWeight: 500,
          border: "none",
          cursor: "pointer",
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          style={{ width: 12, height: 12 }}
        >
          <path
            fillRule="evenodd"
            d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm3 10.5a.75.75 0 000-1.5H9a.75.75 0 000 1.5h6z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
}
