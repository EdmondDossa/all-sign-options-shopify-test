/**
 * Types de signes (catégories parent) utilisés à la création de configuration
 * et pour l'export des packs Template Library (Door signs, Name badges, etc.)
 */
export const PARENT_SIGN_TYPES = [
  "Door signs",
  "Name badges",
  "Acrylic signs",
  "Double-sided signs",
  "Wood signs",
  "Magnetic signs",
  "House signs",
  "Plastic signs",
  "Brass signs",
  "Stainless steel signs",
  "Labels and plates",
  "Banners signs",
  "Posters",
  "Pull-up banners",
  "Vinyl lettering",
  "Decals",
  "Contour-cut / die-cut",
] as const;

export type ParentSignType = (typeof PARENT_SIGN_TYPES)[number];
