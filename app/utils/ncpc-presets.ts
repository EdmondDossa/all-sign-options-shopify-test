import type {
  ConfigColor,
  ConfigCustomSize,
  ConfigSize,
} from "~/types/ConfigDataType";
import type {
  NcpcData,
  NcpcOptionGroup,
  NcpcOptionItem,
} from "~/types/NcpcDataType";

export type NcpcProductType = "neon" | "channel";
export type NcpcPricingMode =
  | "fixed-width"
  | "fixed-height"
  | "advanced"
  | "frame-fit";
export type NcpcPresetKey =
  | "neon-letter-signs"
  | "neon-logo-signs"
  | "acrylic-letter-signs"
  | "metal-letter-signs"
  | "wood-letter-signs";

export interface NcpcPricingOption {
  value: NcpcPricingMode;
  name: string;
  description: string;
}

export const NCPC_PRICING_OPTIONS: NcpcPricingOption[] = [
  {
    value: "fixed-height",
    name: "Fixed height per size",
    description: "Letter height is fixed per size tier.",
  },
  {
    value: "fixed-width",
    name: "Fixed width per size",
    description: "Letter width is fixed per size tier.",
  },
  {
    value: "advanced",
    name: "Price by material length",
    description: "Advanced pricing by size range and character count.",
  },
  {
    value: "frame-fit",
    name: "Price per square meter/foot",
    description: "Area-based pricing for frame-focused signs.",
  },
];

const DEFAULT_RANGE_PRICING = [
  { surface: 60, basePrice: 0, charPrice: 5 },
  { surface: 90, basePrice: 0, charPrice: 10 },
  { surface: 120, basePrice: 0, charPrice: 15 },
  { surface: 150, basePrice: 0, charPrice: 20 },
];

const DEFAULT_SCENE_IMAGES = Array.from(
  { length: 7 },
  (_item, index) => `/aso_default_files/scenes/${index + 1}.jpg`,
);

export const DEFAULT_THEME_COLORS = {
  backgroundColor: "#FFFFFF",
  titleColor: "#000000",
  descriptionColor: "#000000",
  buttonColor: "#FFFFFF",
  buttonHoverColor: "#f8fafc",
  buttonTextColor: "#000000",
  activeButtonColor: "#0e7490",
  activeButtonHoverColor: "#0891b2",
  activeButtonTextColor: "#FFFFFF",
  beforePriceColor: "#000000",
  priceBackgroundColor: "#FFFFFF",
  priceColor: "#000000",
  delPriceColor: "#878787",
  afterPriceColor: "#000000",
  optionsSectionBackgroundColor: "#fafafa",
  optionBorderColor: "#4b5563",
  activeOptionBackgroundColor: "#ffffff",
  optionTextColor: "#4b5563",
  colorOfMeasuringBarText: "#FFFFFF",
  colorMeasuringBar: "#FFFFFF",
  activeOptionBorderColor: "#0891b2",
  activeOptionTextColor: "#0891b2",
  formErrorBg: "#ff0000",
  formErrorText: "#000000",
  finishModalColor: "#000000",
  finishModalLoaderColor: "#ece8e8",
  finishButtonContainerColor: "#000000",
  finishButtonContainerPriceColor: "#FFFFFF",
  finishButtonContainerDiscountPriceColor: "#000000",
  shareButtonContainerColor: "#FFFFFF",
  shareButtonTextColor: "#000000",
  selectedTextBorderColor: "#000000",
  selectedTextBorderCornerColor: "#000000",
  darkBackgroundColor: "#1c1c1c",
  darkTitleColor: "#FFFFFF",
  darkDescriptionColor: "#FFFFFF",
  darkButtonColor: "#1c1c1c",
  darkButtonHoverColor: "#292929",
  darkButtonTextColor: "#FFFFFF",
  darkActiveButtonColor: "#292929",
  darkActiveButtonHoverColor: "#292929",
  darkActiveButtonTextColor: "#0e7490",
  darkBeforePriceColor: "#FFFFFF",
  darkPriceBackgroundColor: "#FFFFFF",
  darkPriceColor: "#1c1c1c",
  darkAfterPriceColor: "#FFFFFF",
  darkOptionsSectionBackgroundColor: "#292929",
  darkOptionBorderColor: "#6b7280",
  darkOptionTextColor: "#6b7280",
  darkActiveOptionBackgroundColor: "#000000",
  darkActiveOptionBorderColor: "#0891b2",
  darkActiveOptionTextColor: "#0891b2",
  darkFinishModalColor: "#ffffff",
  darkFinishModalLoaderColor: "#cccbc8",
};

const getDefaultOutputTemplate = (productType: NcpcProductType) =>
  productType === "neon"
    ? "{{#product}}<p><b>Text:</b> {{ncpc_text}}</p>{{/products}}"
    : "{{#product}}<p><b>Text:</b> {{ncpc_text}}</p>{{/products}}";

export const getDefaultNcpcSortOptions = (productType: NcpcProductType) => {
  if (productType === "neon") {
    return [
      "text-form",
      "fonts",
      "sizes",
      "colors",
      "materials",
      "jackets",
      "mountings",
      "backboards",
      "backboard-colors",
      "additionals-options",
    ];
  }

  return [
    "text-form",
    "fonts",
    "sizes",
    "letter-types",
    "mountings",
    "backboards",
    "backboard-colors",
    "additionals-options",
  ];
};

export const createDefaultNcpcSettings = (productType: NcpcProductType) => ({
  generals: {
    customizer: {
      measurementUnit: "cm",
      showHideMeasurements: "both",
      decimalFormatMeasurements: "no-decimal",
      fontFamilyName: "",
      priceStartOptions: "at-zero",
      priceMeasurementAnimation: "on",
      destokColumnOrder: "right",
      glowSwitch: "glow-only",
      discount: "none",
      displayOptions: "name",
      useExampleIcon: true,
      shadowSwitch: true,
      exampleText: "Example",
      showExampleOnHover: false,
      discountValue: 0,
      showDayNightButton: true,
      displayPriceBeforeFinishBotton: "hide",
      textAlignment: "display-alignment",
    },
    mobile: {
      showNavigatorMenu: "off",
      showNavigationMenuFirst: "yes",
      mobileSelectionOptionsDisplay: "horizontally-stack",
    },
    output: {
      fileFormat: "svg",
      manufacturerEmail: {
        sendDesignByEmail: true,
        receiverEmail: [],
        subject: "New order for Manufacturer",
        emailTemplate: getDefaultOutputTemplate(productType),
      },
    },
    product: {
      enableAddToCart: true,
      redirectAfterAddToCart: true,
      redirectToCheckOutPage: false,
      displayRecapsOnCheckout: false,
      hideAddToCartButtonCustomProducts: true,
      hideDesignButtonsOnShopPage: false,
      hideAddToCartButtonOnShopPage: true,
    },
    requestQuote: {
      enableRequestQuote: false,
      receiversEmail: [],
      sendToCustomer: false,
      allowUploadFiles: false,
      acceptExtensions: [".jpg", ".png", ".svg", ".pdf"],
      maxFileSize: 10,
      maxFilesNumber: 5,
      emailSubject: "Request A Quote",
    },
    mode: {
      type: "simple",
      allowMultiFonts: false,
      allowMultiColors: false,
    },
  },
  languageImages: {
    customDesign: {
      link: {
        activate: false,
        link: "",
        phraseSubmitCustom: "Take a customization",
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
    },
    icons: {
      title: "",
      description: "",
      pricing: -1,
      listIcons: [],
    },
    images: {
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
    },
    main: {
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
      textAlignmentValue: {
        left: "Left",
        center: "Center",
        right: "Right",
      },
      maxSignModals: {
        width: "Your sign has exceeded the maximum width",
        height: "Your sign has exceeded the maximum height",
        lines: "Your sign has exceeded the maximum number of lines",
        characters: "Your sign has exceeded the maximum number of characters",
      },
      measurementLabel: {
        width: "Width",
        height: "Height",
      },
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
    },
    visualizer: {
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
    },
  },
  infos: {
    sizes: "",
    backboards: "",
    mountings: "",
    colors: "",
    materials: "",
    jackets: "",
    letterTypes: "",
    extras: [],
  },
  themes: {
    skin: "default",
    colors: { ...DEFAULT_THEME_COLORS },
  },
  themeColors: {
    customCss: "",
  },
  sortOptions: getDefaultNcpcSortOptions(productType),
});

const getPriceOptionsForPricingMode = (pricingMode: NcpcPricingMode) => {
  const byMode: Record<NcpcPricingMode, string> = {
    "fixed-height": "Simple",
    "fixed-width": "Simple",
    advanced: "Basic",
    "frame-fit": "Basic",
  };

  return [{ label: byMode[pricingMode], prices: [] as unknown[] }];
};

const toOption = (
  title: string,
  description: string,
  additionalPrice = 0,
  isDefault = false,
): NcpcOptionItem => ({
  title,
  description,
  icon: "",
  popImg: "",
  additionalPrice,
  isDefault,
});

const toColor = (
  name: string,
  codeHex: string,
  additionalPrice = 0,
  isDefault = false,
): ConfigColor => ({
  name,
  additionalPrice,
  isDefault,
  textColor: {
    active: true,
    sameForBorder: false,
    codeHex,
    name,
  },
  pattern: {
    active: false,
    codeHex: "",
    url: "",
  },
  prevImg: "",
});

const createEmptyNcpcData = (productType: NcpcProductType): NcpcData => ({
  version: 1,
  requiredOptions: {
    sizeOptions: {
      allSizes: [],
      customSize: {
        active: false,
        width: { label: "Custom width", min: 0, max: 300 },
        height: { label: "Custom height", min: 0, max: 300 },
        pricings: {
          type: "unit",
          rangePricingPerUnit: false,
          range: [],
          unit: {
            basePrice: 0,
            surface: 0,
            charPrice: 0,
          },
        },
      },
      thickness: {
        active: false,
        values: [],
      },
    },
    priceOptions: [],
    colorOptions: {
      allColors: [],
      customColors: {
        active: false,
        label: "Custom Colors",
        prevImg: "",
      },
    },
    letterTypeOptions: [],
  },
  additionalOptions: {
    materialOptions: [],
    jacketOptions: [],
    backboardOptions: [],
    backboardColorOptions: [],
    mountingOptions: [],
    customAdditionalsOptions: [],
  },
  settings: createDefaultNcpcSettings(productType),
});

const getAllowedPricingModesByPreset = (
  presetKey: NcpcPresetKey,
): NcpcPricingMode[] => {
  if (presetKey === "neon-logo-signs") {
    return ["frame-fit"];
  }
  return ["fixed-height", "fixed-width", "advanced", "frame-fit"];
};

export const getAllowedNcpcPricingModes = (
  productType: NcpcProductType,
  presetKey?: string | null,
): NcpcPricingMode[] => {
  if (!presetKey) {
    return productType === "neon"
      ? ["fixed-height", "fixed-width", "advanced", "frame-fit"]
      : ["fixed-height", "fixed-width", "advanced", "frame-fit"];
  }

  return getAllowedPricingModesByPreset(presetKey as NcpcPresetKey);
};

export const getDefaultNcpcPresetKey = (
  productType: NcpcProductType,
): NcpcPresetKey => {
  return productType === "neon" ? "neon-letter-signs" : "acrylic-letter-signs";
};

export const getDefaultNcpcPricingMode = (
  productType: NcpcProductType,
  presetKey?: string | null,
): NcpcPricingMode => {
  const allowed = getAllowedNcpcPricingModes(productType, presetKey);
  return allowed[0] || "fixed-height";
};

const getSizesForPricingMode = (pricingMode: NcpcPricingMode): ConfigSize[] => {
  if (pricingMode === "fixed-width") {
    return [
      {
        label: "Small",
        width: 60,
        height: 0,
        textNumber: 2,
        maxTextChar: 10,
        charPrice: 7,
        basePrice: 250,
        startPriceAtChar: 0,
        isDefault: true,
      },
      {
        label: "Standard",
        width: 90,
        height: 0,
        textNumber: 2,
        maxTextChar: 14,
        charPrice: 8,
        basePrice: 350,
        startPriceAtChar: 0,
        isDefault: false,
      },
      {
        label: "Medium",
        width: 120,
        height: 0,
        textNumber: 3,
        maxTextChar: 18,
        charPrice: 12,
        basePrice: 500,
        startPriceAtChar: 0,
        isDefault: false,
      },
      {
        label: "Large",
        width: 150,
        height: 0,
        textNumber: 3,
        maxTextChar: 22,
        charPrice: 17,
        basePrice: 600,
        startPriceAtChar: 0,
        isDefault: false,
      },
    ];
  }

  if (pricingMode === "fixed-height") {
    return [
      {
        label: "Small",
        width: 0,
        height: 60,
        textNumber: 2,
        maxTextChar: 10,
        charPrice: 7,
        basePrice: 250,
        startPriceAtChar: 0,
        isDefault: true,
      },
      {
        label: "Standard",
        width: 0,
        height: 90,
        textNumber: 2,
        maxTextChar: 14,
        charPrice: 8,
        basePrice: 350,
        startPriceAtChar: 0,
        isDefault: false,
      },
      {
        label: "Medium",
        width: 0,
        height: 120,
        textNumber: 3,
        maxTextChar: 18,
        charPrice: 12,
        basePrice: 500,
        startPriceAtChar: 0,
        isDefault: false,
      },
      {
        label: "Large",
        width: 0,
        height: 150,
        textNumber: 3,
        maxTextChar: 22,
        charPrice: 17,
        basePrice: 600,
        startPriceAtChar: 0,
        isDefault: false,
      },
    ];
  }

  if (pricingMode === "frame-fit") {
    return [
      {
        label: "50CM",
        width: 50,
        height: 50,
        textNumber: 0,
        maxTextChar: 0,
        charPrice: 5,
        basePrice: 0,
        startPriceAtChar: 0,
        isDefault: true,
      },
      {
        label: "75CM",
        width: 75,
        height: 75,
        textNumber: 0,
        maxTextChar: 0,
        charPrice: 10,
        basePrice: 0,
        startPriceAtChar: 0,
        isDefault: false,
      },
      {
        label: "100CM",
        width: 100,
        height: 100,
        textNumber: 0,
        maxTextChar: 0,
        charPrice: 15,
        basePrice: 0,
        startPriceAtChar: 0,
        isDefault: false,
      },
    ];
  }

  return [
    {
      label: "Small",
      width: 60,
      height: 40,
      textNumber: 0,
      maxTextChar: 0,
      charPrice: 5,
      basePrice: 0,
      startPriceAtChar: 0,
      isDefault: true,
    },
    {
      label: "Medium",
      width: 90,
      height: 60,
      textNumber: 0,
      maxTextChar: 0,
      charPrice: 10,
      basePrice: 0,
      startPriceAtChar: 0,
      isDefault: false,
    },
    {
      label: "Large",
      width: 120,
      height: 80,
      textNumber: 0,
      maxTextChar: 0,
      charPrice: 15,
      basePrice: 0,
      startPriceAtChar: 0,
      isDefault: false,
    },
  ];
};

const getCustomSizeForPricingMode = (
  pricingMode: NcpcPricingMode,
): ConfigCustomSize => {
  const active = pricingMode === "advanced" || pricingMode === "frame-fit";

  return {
    active,
    width: {
      label: "Custom width",
      min: 50,
      max: 300,
    },
    height: {
      label: "Custom height",
      min: 50,
      max: 300,
    },
    pricings: {
      type: active ? "range" : "unit",
      rangePricingPerUnit: false,
      range: active ? DEFAULT_RANGE_PRICING : [],
      unit: {
        basePrice: 0,
        surface: 0,
        charPrice: 0,
      },
    },
  };
};

const NEON_COLORS: ConfigColor[] = [
  toColor("Orange", "#FFA500", 0, true),
  toColor("Green", "#41F63F", 10),
  toColor("Yellow", "#F7CC19"),
  toColor("Red", "#EB3F34"),
  toColor("Blue", "#54B5F6"),
];

const CHANNEL_FACE_COLORS: ConfigColor[] = [
  toColor("White", "#FFFFFF", 0, true),
  toColor("Green", "#417505"),
  toColor("Pink", "#FF9CE8"),
];

const CHANNEL_LETTER_TYPES: NcpcOptionItem[] = [
  toOption("2D non-lit", "Flat acrylic letters, non-illuminated.", 0, true),
  toOption(
    "3D illuminated (face/side/back-lit)",
    "Three-dimensional illuminated letters.",
    0,
  ),
];

const NEON_BACKBOARDS: NcpcOptionItem[] = [
  toOption("None", "No visible backboard.", 0),
  toOption("Cut To Shape", "Backboard follows the text contour.", 0, true),
  toOption("Board", "Rectangle backboard around wording.", 0),
  toOption("Box", "Sign inside a 6-sided perspex box.", 0),
  toOption("Raceway", "Self-supporting raceway option.", 0),
  toOption("Stand", "Self-supporting stand for desks/tabletops.", 0),
];

const CHANNEL_BACKBOARDS: NcpcOptionItem[] = [
  toOption("None", "No visible backboard.", 0),
  toOption("Board", "Rectangle backboard around wording.", 0, true),
  toOption("Box", "Sign inside a 6-sided perspex box.", 0),
  toOption("Raceway", "Self-supporting raceway option.", 0),
  toOption("Stand", "Self-supporting stand for desks/tabletops.", 0),
];

const BACKBOARD_COLORS: NcpcOptionItem[] = [
  toOption("Clear Acrylic", "Transparent acrylic backboard.", 0, true),
  toOption("Black", "Black acrylic finish.", 10),
  toOption("Gold", "Gold acrylic finish.", 10),
];

const MATERIALS: NcpcOptionItem[] = [
  toOption("Indoor (Free)", "For indoor use only.", 0, true),
  toOption("Waterproof", "Outdoor waterproof sign.", 0),
];

const MOUNTINGS: NcpcOptionItem[] = [
  toOption(
    "Wall Mounting Kit",
    "Screws and spacers for wall mounting.",
    0,
    true,
  ),
  toOption("Hanging Kit", "Wire hanging kit and screws.", 0),
];

const JACKETS: NcpcOptionItem[] = [
  toOption("White", "Sign appears white when turned off.", 0, true),
  toOption("Colored", "Tube appears colored when turned off.", 19),
];

const CUSTOM_ADDITIONAL_GROUPS: NcpcOptionGroup[] = [
  {
    title: "Remote control (Dimmer)",
    description: "A remote control can be added for dimming.",
    icon: "",
    options: [
      toOption("Yes", "Include remote control.", 0, true),
      toOption("No", "No remote control.", 0),
    ],
  },
  {
    title: "Plug Type",
    description: "Choose the right plug for your country.",
    icon: "",
    options: [
      toOption("USA/CAN", "", 0, true),
      toOption("AU/NZ", "", 0),
      toOption("EU", "", 0),
      toOption("UK", "", 0),
      toOption("JAP", "", 0),
      toOption("HK", "", 0),
    ],
  },
  {
    title: "Cable colour",
    description: "Choose your cable color.",
    icon: "",
    options: [toOption("Black", "", 0, true), toOption("White", "", 0)],
  },
  {
    title: "Any other special requests",
    description: "Leave additional notes for production.",
    icon: "",
    options: [toOption("Customer note", "Free-form customer note.", 0, true)],
  },
];

export const buildNcpcPresetData = ({
  productType,
  presetKey,
  pricingMode,
  includeMeta,
}: {
  productType: NcpcProductType;
  presetKey?: string | null;
  pricingMode?: string | null;
  includeMeta?: boolean;
}): NcpcData => {
  const data = createEmptyNcpcData(productType);

  if (!includeMeta) {
    return data;
  }

  const safePreset = (presetKey ||
    getDefaultNcpcPresetKey(productType)) as NcpcPresetKey;
  const allowedPricingModes = getAllowedNcpcPricingModes(
    productType,
    safePreset,
  );
  const safePricingMode =
    (pricingMode as NcpcPricingMode) ||
    getDefaultNcpcPricingMode(productType, safePreset);
  const normalizedPricingMode = allowedPricingModes.includes(safePricingMode)
    ? safePricingMode
    : allowedPricingModes[0];

  data.requiredOptions.sizeOptions.allSizes = getSizesForPricingMode(
    normalizedPricingMode,
  );
  data.requiredOptions.sizeOptions.customSize = getCustomSizeForPricingMode(
    normalizedPricingMode,
  );
  data.requiredOptions.priceOptions = getPriceOptionsForPricingMode(
    normalizedPricingMode,
  );
  data.requiredOptions.colorOptions.allColors =
    productType === "channel" ? CHANNEL_FACE_COLORS : NEON_COLORS;

  if (productType === "channel") {
    data.requiredOptions.letterTypeOptions = CHANNEL_LETTER_TYPES;
  }

  data.additionalOptions.materialOptions = MATERIALS;
  data.additionalOptions.backboardOptions =
    productType === "channel" ? CHANNEL_BACKBOARDS : NEON_BACKBOARDS;
  data.additionalOptions.backboardColorOptions = BACKBOARD_COLORS;
  data.additionalOptions.mountingOptions = MOUNTINGS;
  data.additionalOptions.customAdditionalsOptions = CUSTOM_ADDITIONAL_GROUPS;

  if (productType === "neon") {
    data.additionalOptions.jacketOptions = JACKETS;
  }

  return data;
};
