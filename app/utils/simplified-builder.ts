export type SimplifiedBuilderSectionKey =
  | "sizes"
  | "pricing"
  | "fonts"
  | "colors"
  | "materials"
  | "fixing-methods"
  | "shapes"
  | "borders"
  | "additional-inputs"
  | "general"
  | "language-images"
  | "theme-color"
  | "sort-options";

type SimplifiedBuilderGroup = {
  title: string;
  items: Array<{
    key: SimplifiedBuilderSectionKey;
    label: string;
  }>;
};

type SimplifiedBuilderSectionContent = {
  title: string;
  description: string;
  items: string[];
};

export const SIMPLIFIED_BUILDER_GROUPS: SimplifiedBuilderGroup[] = [
  {
    title: "Core Setup",
    items: [
      { key: "sizes", label: "Sizes" },
      { key: "pricing", label: "Pricing" },
      { key: "fonts", label: "Fonts" },
      { key: "colors", label: "Colors" },
    ],
  },
  {
    title: "Customization Options",
    items: [
      { key: "materials", label: "Materials" },
      { key: "fixing-methods", label: "Fixing Methods" },
      { key: "shapes", label: "Shapes" },
      { key: "borders", label: "Borders" },
      { key: "additional-inputs", label: "Additional Inputs" },
    ],
  },
  {
    title: "Settings",
    items: [
      { key: "general", label: "General" },
      { key: "language-images", label: "Language & Images" },
      { key: "theme-color", label: "Theme & Color" },
      { key: "sort-options", label: "Sort Options" },
    ],
  },
];

export const SIMPLIFIED_BUILDER_SECTIONS: Record<
  SimplifiedBuilderSectionKey,
  SimplifiedBuilderSectionContent
> = {
  sizes: {
    title: "Sizes",
    description:
      "This screen will become the simplified manager for available product sizes, defaults and exclusions.",
    items: [
      "Reuse the existing classic size data as the source of truth.",
      "Expose only the size controls needed by the merchant.",
      "Prepare exclusions so other options can disable incompatible sizes.",
    ],
  },
  pricing: {
    title: "Pricing",
    description:
      "This screen will centralize pricing mode selection and the main price rules used by the simplified builder.",
    items: [
      "Keep support for existing classic pricing modes.",
      "Show only the pricing inputs relevant to the selected mode.",
      "Serve as the shared pricing source for options that add surcharges.",
    ],
  },
  fonts: {
    title: "Fonts",
    description:
      "This screen will reuse the managed font workflow and expose only the fonts customers can actually select.",
    items: [
      "Keep managed fonts as the canonical source.",
      "Support ordering, defaults and preview in one place.",
      "Prepare exclusions when a material or shape cannot use a font.",
    ],
  },
  colors: {
    title: "Colors",
    description:
      "This screen will gather the customer-facing color choices for simplified classic configurations.",
    items: [
      "Use the same table and form patterns already standardized elsewhere.",
      "Support defaults, ordering and optional surcharge pricing.",
      "Prepare exclusions for materials, shapes and fixing methods.",
    ],
  },
  materials: {
    title: "Materials",
    description:
      "Materials will become simple selectable options instead of deep configuration entry points.",
    items: [
      "Each material should have label, description, image, pricing and default state.",
      "No more material-centric sub-routes for common merchant tasks.",
      "Use exclusions to disable incompatible sizes, colors, shapes or fixing methods.",
    ],
  },
  "fixing-methods": {
    title: "Fixing Methods",
    description:
      "This screen will expose fixing methods as merchant-friendly options in the simplified builder.",
    items: [
      "Reuse existing fixing method data where possible.",
      "Allow lightweight pricing and default selection.",
      "Support exclusions against sizes, materials and shapes.",
    ],
  },
  shapes: {
    title: "Shapes",
    description:
      "Shapes stay available, but through a simpler management screen aligned with the new builder.",
    items: [
      "Keep the current classic shape capability.",
      "Make the setup merchant-facing rather than technical.",
      "Support pricing and compatibility exclusions cleanly.",
    ],
  },
  borders: {
    title: "Borders",
    description:
      "Borders remain optional customization choices inside the simplified classic builder.",
    items: [
      "Use the same simple list and edit patterns as other options.",
      "Allow merchants to enable only the borders they want to sell.",
      "Connect border availability to sizes or shapes through exclusions.",
    ],
  },
  "additional-inputs": {
    title: "Additional Inputs",
    description:
      "Additional inputs stay available for special merchant needs without forcing complex routing.",
    items: [
      "Keep custom questions and merchant-defined inputs in one manager.",
      "Use simple visibility and requirement controls.",
      "Allow later linkage to materials or fixing methods if needed.",
    ],
  },
  general: {
    title: "General",
    description:
      "General settings will mirror the classic configuration style while staying focused on simplified builder needs.",
    items: [
      "Reuse the shared settings sections already aligned across the app.",
      "Keep only merchant-facing fields that matter for this builder.",
      "Avoid introducing neon or channel-specific concepts here.",
    ],
  },
  "language-images": {
    title: "Language & Images",
    description:
      "Language, labels and imagery will be grouped in the same simplified route family as the rest of the builder.",
    items: [
      "Reuse current language and image structures where possible.",
      "Keep scene, icon and upload management merchant-friendly.",
      "Avoid exposing unnecessary technical fields.",
    ],
  },
  "theme-color": {
    title: "Theme & Color",
    description:
      "Theme colors stay configurable, but inside the new builder navigation and data model.",
    items: [
      "Keep shared theme tokens as the source of truth.",
      "Ensure creation presets stay aligned with edited values.",
      "Avoid hidden theme keys that are not represented in the UI.",
    ],
  },
  "sort-options": {
    title: "Sort Options",
    description:
      "Sort options stay available so merchants can control the customer-facing order of choices.",
    items: [
      "Support global ordering of option groups.",
      "Keep drag and drop aligned with Polaris patterns.",
      "Use the builder as the primary merchant entry point for ordering.",
    ],
  },
};

export const isSimplifiedBuilderSection = (
  value?: string | null,
): value is SimplifiedBuilderSectionKey =>
  Boolean(value) && value in SIMPLIFIED_BUILDER_SECTIONS;
