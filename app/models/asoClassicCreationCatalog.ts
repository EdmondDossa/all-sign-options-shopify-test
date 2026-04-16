export type AsoClassicFamilyKey =
  | "signs-panels"
  | "banners"
  | "stickers"
  | "lettering";

export type AsoClassicConfigModelKey = "simple" | "advance";

export type AsoClassicMaterialKey =
  | "acrylic"
  | "aluminium"
  | "brass"
  | "eco-friendly"
  | "magnet"
  | "photo-paper"
  | "plastic"
  | "stainless-steel"
  | "vinyl"
  | "wood"
  | "fabric"
  | "mesh"
  | "paper"
  | "pvc"
  | "film"
  | "metal"
  | "neon";

export type AsoClassicMaterialDefinition = {
  key: AsoClassicMaterialKey;
  label: string;
  image: string;
  previewImages?: string[];
};

export type AsoClassicFamilyDefinition = {
  key: AsoClassicFamilyKey;
  label: string;
  description: string;
  tags: string[];
  previewImages: string[];
  materials: AsoClassicMaterialDefinition[];
  availableConfigModels: AsoClassicConfigModelKey[];
};

export type AsoClassicConfigModelDefinition = {
  key: AsoClassicConfigModelKey;
  label: string;
  description: string;
};

const MATERIAL_IMAGE_BASE = "/images/material-catalog";
const MATERIAL_PREVIEW_BASE = "/images/material-previews";

export const ASO_CLASSIC_CONFIG_MODELS: AsoClassicConfigModelDefinition[] = [
  {
    key: "simple",
    label: "Build by Options",
    description:
      "Customers choose product options directly like size, shape, material and extras.",
  },
  {
    key: "advance",
    label: "Build from Presets",
    description:
      "Customers personalize predefined product components and ready-made structures.",
  },
];

export const ASO_CLASSIC_FAMILIES: AsoClassicFamilyDefinition[] = [
  {
    key: "signs-panels",
    label: "Signs & Panels",
    description:
      "Rigid signage products like office signs, plaques, engraved panels and general display boards.",
    tags: ["Office", "Outdoor", "Plaques", "Display"],
    previewImages: [
      `${MATERIAL_IMAGE_BASE}/aluminium.webp`,
      `${MATERIAL_IMAGE_BASE}/acrylic.webp`,
      `${MATERIAL_IMAGE_BASE}/wood.webp`,
    ],
    materials: [
      {
        key: "acrylic",
        label: "Acrylic",
        image: `${MATERIAL_PREVIEW_BASE}/signs-panels/acrylic/01.jpg`,
        previewImages: [
          `${MATERIAL_PREVIEW_BASE}/signs-panels/acrylic/01.jpg`,
          `${MATERIAL_PREVIEW_BASE}/signs-panels/acrylic/02.jpg`,
          `${MATERIAL_PREVIEW_BASE}/signs-panels/acrylic/03.jpg`,
        ],
      },
      {
        key: "aluminium",
        label: "Aluminium",
        image: `${MATERIAL_PREVIEW_BASE}/signs-panels/aluminium/01.jpg`,
        previewImages: [
          `${MATERIAL_PREVIEW_BASE}/signs-panels/aluminium/01.jpg`,
          `${MATERIAL_PREVIEW_BASE}/signs-panels/aluminium/02.jpg`,
          `${MATERIAL_PREVIEW_BASE}/signs-panels/aluminium/03.jpg`,
        ],
      },
      {
        key: "brass",
        label: "Brass",
        image: `${MATERIAL_PREVIEW_BASE}/signs-panels/brass/01.jpg`,
        previewImages: [
          `${MATERIAL_PREVIEW_BASE}/signs-panels/brass/01.jpg`,
          `${MATERIAL_PREVIEW_BASE}/signs-panels/brass/02.jpg`,
          `${MATERIAL_PREVIEW_BASE}/signs-panels/brass/03.jpg`,
        ],
      },
      {
        key: "eco-friendly",
        label: "Eco friendly",
        image: `${MATERIAL_PREVIEW_BASE}/signs-panels/eco-friendly/01.jpg`,
        previewImages: [
          `${MATERIAL_PREVIEW_BASE}/signs-panels/eco-friendly/01.jpg`,
          `${MATERIAL_PREVIEW_BASE}/signs-panels/eco-friendly/02.jpg`,
          `${MATERIAL_PREVIEW_BASE}/signs-panels/eco-friendly/03.jpg`,
        ],
      },
      {
        key: "magnet",
        label: "Magnet",
        image: `${MATERIAL_PREVIEW_BASE}/signs-panels/magnet/01.jpg`,
        previewImages: [
          `${MATERIAL_PREVIEW_BASE}/signs-panels/magnet/01.jpg`,
          `${MATERIAL_PREVIEW_BASE}/signs-panels/magnet/02.jpg`,
          `${MATERIAL_PREVIEW_BASE}/signs-panels/magnet/03.jpg`,
        ],
      },
      {
        key: "photo-paper",
        label: "Photo paper",
        image: `${MATERIAL_PREVIEW_BASE}/signs-panels/photo-paper/01.jpg`,
        previewImages: [
          `${MATERIAL_PREVIEW_BASE}/signs-panels/photo-paper/01.jpg`,
          `${MATERIAL_PREVIEW_BASE}/signs-panels/photo-paper/02.jpg`,
          `${MATERIAL_PREVIEW_BASE}/signs-panels/photo-paper/03.jpg`,
        ],
      },
      {
        key: "plastic",
        label: "Plastic",
        image: `${MATERIAL_PREVIEW_BASE}/signs-panels/plastic/01.jpg`,
        previewImages: [
          `${MATERIAL_PREVIEW_BASE}/signs-panels/plastic/01.jpg`,
          `${MATERIAL_PREVIEW_BASE}/signs-panels/plastic/02.jpg`,
          `${MATERIAL_PREVIEW_BASE}/signs-panels/plastic/03.jpg`,
        ],
      },
      {
        key: "stainless-steel",
        label: "Stainless steel",
        image: `${MATERIAL_PREVIEW_BASE}/signs-panels/stainless-steel/01.jpg`,
        previewImages: [
          `${MATERIAL_PREVIEW_BASE}/signs-panels/stainless-steel/01.jpg`,
          `${MATERIAL_PREVIEW_BASE}/signs-panels/stainless-steel/02.jpg`,
          `${MATERIAL_PREVIEW_BASE}/signs-panels/stainless-steel/03.jpg`,
        ],
      },
      {
        key: "vinyl",
        label: "Vinyl",
        image: `${MATERIAL_PREVIEW_BASE}/signs-panels/vinyl/01.jpg`,
        previewImages: [
          `${MATERIAL_PREVIEW_BASE}/signs-panels/vinyl/01.jpg`,
          `${MATERIAL_PREVIEW_BASE}/signs-panels/vinyl/02.jpg`,
          `${MATERIAL_PREVIEW_BASE}/signs-panels/vinyl/03.jpg`,
        ],
      },
      {
        key: "wood",
        label: "Wood",
        image: `${MATERIAL_PREVIEW_BASE}/signs-panels/wood/01.jpg`,
        previewImages: [
          `${MATERIAL_PREVIEW_BASE}/signs-panels/wood/01.jpg`,
          `${MATERIAL_PREVIEW_BASE}/signs-panels/wood/02.jpg`,
          `${MATERIAL_PREVIEW_BASE}/signs-panels/wood/03.jpg`,
        ],
      },
    ],
    availableConfigModels: ["simple", "advance"],
  },
  {
    key: "banners",
    label: "Banners",
    description:
      "Flexible printed products for events, retail and promotional display.",
    tags: ["Indoor", "Outdoor", "Large format"],
    previewImages: [
      `${MATERIAL_IMAGE_BASE}/fabric.webp`,
      `${MATERIAL_IMAGE_BASE}/mesh.webp`,
      `${MATERIAL_IMAGE_BASE}/vinyl.webp`,
    ],
    materials: [
      {
        key: "fabric",
        label: "Fabric",
        image: `${MATERIAL_PREVIEW_BASE}/banners/fabric/01.jpg`,
        previewImages: [
          `${MATERIAL_PREVIEW_BASE}/banners/fabric/01.jpg`,
          `${MATERIAL_PREVIEW_BASE}/banners/fabric/02.jpg`,
          `${MATERIAL_PREVIEW_BASE}/banners/fabric/03.jpg`,
        ],
      },
      {
        key: "mesh",
        label: "Mesh",
        image: `${MATERIAL_PREVIEW_BASE}/banners/mesh/01.jpg`,
        previewImages: [
          `${MATERIAL_PREVIEW_BASE}/banners/mesh/01.jpg`,
          `${MATERIAL_PREVIEW_BASE}/banners/mesh/02.jpg`,
          `${MATERIAL_PREVIEW_BASE}/banners/mesh/03.jpg`,
        ],
      },
      {
        key: "vinyl",
        label: "Vinyl",
        image: `${MATERIAL_PREVIEW_BASE}/banners/vinyl/01.jpg`,
        previewImages: [
          `${MATERIAL_PREVIEW_BASE}/banners/vinyl/01.jpg`,
          `${MATERIAL_PREVIEW_BASE}/banners/vinyl/02.jpg`,
          `${MATERIAL_PREVIEW_BASE}/banners/vinyl/03.jpg`,
        ],
      },
    ],
    availableConfigModels: ["simple"],
  },
  {
    key: "stickers",
    label: "Stickers",
    description: "Adhesive products for windows, packaging, walls and floors.",
    tags: ["Adhesive", "Decals", "Labels"],
    previewImages: [
      `${MATERIAL_IMAGE_BASE}/stickers-main.png`,
      `${MATERIAL_IMAGE_BASE}/vinyl.webp`,
      `${MATERIAL_IMAGE_BASE}/film.webp`,
      `${MATERIAL_IMAGE_BASE}/paper.webp`,
    ],
    materials: [
      {
        key: "paper",
        label: "Paper",
        image: `${MATERIAL_PREVIEW_BASE}/stickers/paper/01.jpg`,
        previewImages: [
          `${MATERIAL_PREVIEW_BASE}/stickers/paper/01.jpg`,
          `${MATERIAL_PREVIEW_BASE}/stickers/paper/02.jpg`,
          `${MATERIAL_PREVIEW_BASE}/stickers/paper/03.jpg`,
        ],
      },
      {
        key: "pvc",
        label: "PVC",
        image: `${MATERIAL_PREVIEW_BASE}/stickers/pvc/01.jpg`,
        previewImages: [
          `${MATERIAL_PREVIEW_BASE}/stickers/pvc/01.jpg`,
          `${MATERIAL_PREVIEW_BASE}/stickers/pvc/02.jpg`,
          `${MATERIAL_PREVIEW_BASE}/stickers/pvc/03.jpg`,
        ],
      },
      {
        key: "vinyl",
        label: "Vinyl",
        image: `${MATERIAL_PREVIEW_BASE}/stickers/vinyl/01.jpg`,
        previewImages: [
          `${MATERIAL_PREVIEW_BASE}/stickers/vinyl/01.jpg`,
          `${MATERIAL_PREVIEW_BASE}/stickers/vinyl/02.jpg`,
          `${MATERIAL_PREVIEW_BASE}/stickers/vinyl/03.jpg`,
        ],
      },
      {
        key: "film",
        label: "Film",
        image: `${MATERIAL_PREVIEW_BASE}/stickers/film/01.jpg`,
        previewImages: [
          `${MATERIAL_PREVIEW_BASE}/stickers/film/01.jpg`,
          `${MATERIAL_PREVIEW_BASE}/stickers/film/02.jpg`,
          `${MATERIAL_PREVIEW_BASE}/stickers/film/03.jpg`,
        ],
      },
    ],
    availableConfigModels: ["simple"],
  },
  {
    key: "lettering",
    label: "Lettering",
    description:
      "Text-based illuminated or fabricated signs built around letter forms and logos.",
    tags: ["Neon", "Channel", "Letters", "Logos"],
    previewImages: [
      "/images/configuration-examples/lettering/lettering-neon-effect-1.jpg",
      "/images/configuration-examples/lettering/lettering-neon-script.jpg",
      "/images/configuration-examples/lettering/lettering-neon-retro.jpg",
      "/images/configuration-examples/lettering/lettering-neon-nightclub.jpg",
    ],
    materials: [
      {
        key: "neon",
        label: "Neon",
        image: "/images/configuration-examples/neon.webp",
      },
      {
        key: "acrylic",
        label: "Acrylic",
        image: "/images/configuration-examples/acrylic.webp",
      },
      {
        key: "metal",
        label: "Metal",
        image: "/images/configuration-examples/metal.webp",
      },
      {
        key: "wood",
        label: "Wood",
        image: "/images/configuration-examples/wood.webp",
      },
    ],
    availableConfigModels: ["advance"],
  },
];

export const ASO_CLASSIC_FAMILY_BY_PRODUCT_TYPE: Record<
  string,
  AsoClassicFamilyKey
> = {
  signboard: "signs-panels",
  banner: "banners",
  sticker: "stickers",
  neon: "lettering",
  channel: "lettering",
};

export function getAsoClassicFamilyByKey(key?: string | null) {
  return ASO_CLASSIC_FAMILIES.find((family) => family.key === key) || null;
}

export function getAsoClassicFamilyForProductType(productType?: string | null) {
  const familyKey =
    ASO_CLASSIC_FAMILY_BY_PRODUCT_TYPE[String(productType || "")];
  return getAsoClassicFamilyByKey(familyKey);
}

export function getAsoClassicMaterialsForFamily(familyKey?: string | null) {
  return getAsoClassicFamilyByKey(familyKey)?.materials || [];
}

export function getAsoClassicMaterialsForProductType(
  productType?: string | null,
) {
  return getAsoClassicFamilyForProductType(productType)?.materials || [];
}

export function getAsoClassicConfigModelsForFamily(familyKey?: string | null) {
  const family = getAsoClassicFamilyByKey(familyKey);
  if (!family) return [];
  return ASO_CLASSIC_CONFIG_MODELS.filter((model) =>
    family.availableConfigModels.includes(model.key),
  );
}

export function getAsoClassicConfigModelsForProductType(
  productType?: string | null,
) {
  const family = getAsoClassicFamilyForProductType(productType);
  if (!family) return [];
  return getAsoClassicConfigModelsForFamily(family.key);
}
