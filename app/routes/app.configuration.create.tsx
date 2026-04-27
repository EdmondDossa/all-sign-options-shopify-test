import {
  Badge,
  Banner,
  BlockStack,
  Box,
  Button,
  Card,
  Divider,
  Grid,
  Icon,
  InlineGrid,
  InlineStack,
  Layout,
  LegacyCard,
  Link,
  Modal,
  Page,
  Spinner,
  Text,
  TextField,
  Thumbnail,
} from "@shopify/polaris";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import {
  Form,
  json,
  redirect,
  useActionData,
  useLoaderData,
  useNavigate,
  useNavigation,
  useOutletContext,
  useSubmit,
} from "@remix-run/react";
import { SpacingBackground } from "~/components/layouts/SpacingBackground";
import RayStartArrowIcon from "~/components/icons/RayStartArrowIcon";
import RayEndArrowIcon from "~/components/icons/RayEndArrowIcon";
import { FileInput } from "~/components/inputs/FileInput";
import { authenticate } from "~/shopify.server";
import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { ConfigurationType } from "~/types/ConfigurationType";
import ConfigurationService from "~/models/Configuration.service";
import z from "zod";
import { parseWithZod } from "@conform-to/zod";
import { flashMessage } from "~/utils/message-flash";
import { ShopifyProductService } from "~/models/ShopifyProduct.service";
import { jsonTransform, stringTransform } from "~/utils/transfomerZod";
import { CustomTinymce } from "~/components/inputs/CustomTinymce";
import prisma from "~/db.server";
import { BoxBackground } from "~/components/layouts/BoxBackground";
import {
  classicBuildByOptionsStarterData,
  classicStarterFamilyContent,
  classicPresetComponentsStarterData,
  configurationDemoData,
} from "~/models/demoData";
import { PRICING_PLANS } from "~/utils/pricing";
import {
  ImageIcon,
  LayoutColumns3Icon,
  NoteIcon,
  SearchIcon,
  ViewIcon,
} from "@shopify/polaris-icons";
import { AppearanceItem } from "./app.configuration.$id.demo";
import { BackBtn } from "~/components/buttons/BackBtn";
import { BiSaveBtn } from "~/components/buttons/BiSaveBtn";
import { getPlan } from "~/utils/pricing-server.server";
import { MultiProductSelectField } from "~/components/inputs/MultiProductSelectField";
import {
  createEmptyNcpcData,
  getAllowedNcpcPricingModes,
  getDefaultNcpcPresetKey,
  getDefaultNcpcPricingMode,
  NCPC_PRICING_OPTIONS,
} from "~/utils/ncpc-presets";
import {
  ASO_CLASSIC_CONFIG_MODELS,
  ASO_CLASSIC_FAMILIES,
  getAsoClassicConfigModelsForFamily,
  getAsoClassicFamilyByKey,
  getAsoClassicFamilyForProductType,
  getAsoClassicMaterialsForFamily,
} from "~/models/asoClassicCreationCatalog";
import {
  getClassicDataProductFamily,
  getClassicDataMaterialType,
  getClassicMaterialTypeDescription,
  getClassicMaterialTypeLabel,
} from "~/utils/classic-config-data";

import { ArrowLeftIcon, ArrowRightIcon } from "@shopify/polaris-icons";
import { getNcpcPresetConfigurationData } from "~/utils/ncpc-config-data.server";

const LETTERING_CATEGORY_TYPE = "lettering";
const LETTERING_PRODUCT_TYPES = ["neon", "channel"] as const;

const CARD_DEFAULT_BORDER = "1px solid #DDE5EC";
const CARD_DEFAULT_SHADOW = "0 10px 24px rgba(15, 23, 42, 0.05)";
const CARD_SELECTED_SHADOW =
  "0 0 0 2px rgba(148, 163, 184, 0.18), 0 16px 34px rgba(15, 23, 42, 0.10)";
const CARD_IMAGE_SELECTED_SHADOW =
  "0 0 0 2px rgba(148, 163, 184, 0.22), inset 0 0 0 1px rgba(255,255,255,0.45)";

function PreviewAction({ onClick }: { onClick: (event: any) => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Open preview"
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: "28px",
        height: "28px",
        borderRadius: "999px",
        border: "1px solid #D6DEE3",
        background: "#F8FAFC",
        color: "#4B5563",
        cursor: "pointer",
        padding: 0,
      }}
    >
      <Icon source={ViewIcon} />
    </button>
  );
}

function StepThreeInfoIllustration() {
  const items = [
    {
      title: "Identity",
      text: "Name the configuration clearly.",
      icon: NoteIcon,
      tone: "#E7F0FF",
    },
    {
      title: "Description",
      text: "Explain what this setup is for.",
      icon: LayoutColumns3Icon,
      tone: "#FCEFD8",
    },
    {
      title: "Icon",
      text: "Add a visual marker for admins.",
      icon: ImageIcon,
      tone: "#E7F8F1",
    },
    {
      title: "Products",
      text: "Attach the Shopify products to use it on.",
      icon: SearchIcon,
      tone: "#F3EBFF",
    },
  ];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "minmax(0, 1.3fr) minmax(240px, 0.9fr)",
        gap: "16px",
        padding: "18px",
        background:
          "linear-gradient(135deg, rgba(248,250,252,1) 0%, rgba(239,244,248,1) 100%)",
        border: "1px solid #DDE5EC",
        borderRadius: "18px",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <Text as="h3" variant="headingMd">
          What you define in this step
        </Text>
        <Text as="p" tone="subdued">
          This final screen gives your configuration a clear identity and links
          it to the products that should use it.
        </Text>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            gap: "10px",
          }}
        >
          {items.map((item) => (
            <div
              key={item.title}
              style={{
                display: "flex",
                gap: "10px",
                alignItems: "flex-start",
                padding: "12px",
                borderRadius: "14px",
                background: "#FFFFFF",
                border: "1px solid #E3E8EE",
              }}
            >
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "10px",
                  background: item.tone,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Icon source={item.icon} />
              </div>
              <div style={{ minWidth: 0 }}>
                <p style={{ fontSize: "13px", fontWeight: 700 }}>
                  {item.title}
                </p>
                <p style={{ fontSize: "12px", color: "#5F6368" }}>
                  {item.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        style={{
          minHeight: "100%",
          borderRadius: "16px",
          border: "1px solid #D6DEE3",
          background:
            "radial-gradient(circle at top left, rgba(255,255,255,0.95), rgba(231,238,244,0.95))",
          padding: "16px",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "70%",
            height: "10px",
            borderRadius: "999px",
            background: "#D7E0E8",
          }}
        />
        <div
          style={{
            display: "flex",
            gap: "12px",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "52px",
              height: "52px",
              borderRadius: "14px",
              background: "#DCEBFF",
              border: "1px solid #C5D7F2",
            }}
          />
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "8px" }}>
            <div
              style={{
                height: "12px",
                borderRadius: "999px",
                background: "#A9B6C3",
                width: "62%",
              }}
            />
            <div
              style={{
                height: "10px",
                borderRadius: "999px",
                background: "#D7E0E8",
                width: "85%",
              }}
            />
            <div
              style={{
                height: "10px",
                borderRadius: "999px",
                background: "#D7E0E8",
                width: "74%",
              }}
            />
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gap: "8px",
            marginTop: "4px",
          }}
        >
          {["Product A", "Product B", "Product C"].map((product) => (
            <div
              key={product}
              style={{
                padding: "8px 10px",
                borderRadius: "12px",
                background: "#FFFFFF",
                border: "1px solid #DCE4EA",
                fontSize: "11px",
                fontWeight: 600,
                color: "#475467",
                textAlign: "center",
              }}
            >
              {product}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const { session, admin } = await authenticate.admin(request);
  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  let configuration = null;

  if (id) {
    configuration = await prisma.configuration.findUnique({
      where: { id: parseInt(id), sessionId: session.id },
    });
  }

  if (configuration) {
    // Source de vérité principale : les produits stockés en base de données (sélectionnés lors de la création)
    const dbProducts = Array.isArray(configuration.product)
      ? configuration.product
      : [];

    // Vérifier dans Shopify si les produits de la DB existent toujours et récupérer leurs titres à jour
    let finalProducts = dbProducts;

    if (dbProducts.length > 0) {
      try {
        // Pour chaque produit de la DB, vérifier qu'il existe toujours dans Shopify et récupérer son titre
        const verifiedProducts = await Promise.all(
          dbProducts.map(async (product: any) => {
            try {
              // Si le produit a déjà un id et un title, on le garde tel quel
              if (product && product.id && product.title) {
                return product;
              }

              // Sinon, essayer de récupérer depuis Shopify
              // Si product est un string (ID), on peut essayer de récupérer le produit
              if (typeof product === "string" || (product && product.id)) {
                const productId =
                  typeof product === "string" ? product : product.id;
                // Note: On garde le produit tel quel car on ne peut pas facilement récupérer le titre ici
                // Le titre sera mis à jour lors de la sélection dans le picker
                return { id: productId, title: product.title || "Product" };
              }

              return product;
            } catch (error) {
              console.log("Error verifying product:", error);
              return product;
            }
          }),
        );

        finalProducts = verifiedProducts.filter(
          (p: any) => p !== null && p !== undefined,
        );
      } catch (error) {
        console.log("Error verifying products from Shopify:", error);
        // En cas d'erreur, utiliser les produits de la DB tels quels
        finalProducts = dbProducts;
      }
    }

    (configuration as any).products = finalProducts;

    // Ne pas exposer le champ product (legacy) au frontend
    delete (configuration as any).product;

    console.log("Loader - DB products:", dbProducts);
    console.log("Loader - Final configuration.products:", finalProducts);
  }

  return json({ configuration });
};

export default function ConfigurationEdit() {
  const submit = useSubmit();
  const navigation = useNavigation();
  const actionData = useActionData<typeof action>();
  let { configuration } = useLoaderData<typeof loader>();

  const [formData, setFormData] = useState<ConfigurationType>(
    (configuration as ConfigurationType) || {
      name: "",
      description: "",
      icon: "",
      popupImg: "",
      products: [],
    },
  );

  // Mettre à jour formData quand la configuration change (important pour l'édition)
  useEffect(() => {
    if (configuration) {
      const configData = configuration as ConfigurationType;
      const products = configData.products || [];
      console.log("useEffect - Configuration products:", products);
      setFormData({
        name: configData.name || "",
        description: configData.description || "",
        icon: configData.icon || "",
        popupImg: configData.popupImg || "",
        products: products,
      });
      console.log("useEffect - formData.products set to:", products);
    }
  }, [configuration]);

  let isLoading = navigation.state == "loading";
  let isSubmitting = navigation.state == "submitting";

  const handleName = (value: string) =>
    setFormData({ ...formData, name: value });

  const handleDescription = (value: string) =>
    setFormData({ ...formData, description: value });

  const handleIcon = (value: string) =>
    setFormData({ ...formData, icon: value });

  const handlePopupImg = (value: string) =>
    setFormData({ ...formData, popupImg: value });

  const handleProducts = (value: any) =>
    setFormData({ ...formData, products: value });

  const navigate = useNavigate();
  const onBack = () => {
    navigate("..");
  };

  let signageOption = {
    name: "Signage",
    type: "signage",
    productCategories: [
      {
        name: "Signboard",
        type: "signboard",
        description:
          "Rigid panels (PVC, Alu, Wood, Acrylic) for permanent display.",
        demoLink:
          "https://demos.signsdesigner.us/aso-templates-page/asowp-templates/196/#/",
        productGroups: [
          {
            name: "Business & Office",
            products: [
              {
                name: "Door signs",
                image: [
                  "https://signsdesigner.us/app/aso_products_preview/door_signs/image_1.webp",
                  "https://signsdesigner.us/app/aso_products_preview/door_signs/image_2.webp",
                  "https://signsdesigner.us/app/aso_products_preview/door_signs/image_3.webp",
                ],
                description: "Office doors, meeting rooms, name plates.",
                type: "door-sign",
                demoData: "",
                materialType: "simple",
              },
              {
                name: "Name badges",
                description: "Name tags for staff and reception.",
                image: [
                  "https://signsdesigner.us/app/aso_products_preview/name_badges/image_1.webp",
                  "https://signsdesigner.us/app/aso_products_preview/name_badges/image_2.webp",
                  "https://signsdesigner.us/app/aso_products_preview/name_badges/image_3.webp",
                  "https://signsdesigner.us/app/aso_products_preview/name_badges/image_4.webp",
                ],
                type: "name-badge",
                demoData: "",
                materialType: "simple",
              },
              {
                name: "Acrylic signs",
                description: "Premium plexiglass plates for offices.",
                image: [
                  "https://signsdesigner.us/app/aso_products_preview/acrylic_signs/image_1.webp",
                  "https://signsdesigner.us/app/aso_products_preview/acrylic_signs/image_2.webp",
                  "https://signsdesigner.us/app/aso_products_preview/acrylic_signs/image_3.webp",
                  "https://signsdesigner.us/app/aso_products_preview/acrylic_signs/image_4.webp",
                ],
                type: "acrylic-sign",
                demoData: "",
                materialType: "simple",
              },
              {
                name: "Double-sided signs",
                description: "Hanging or projecting double-sided panels.",
                image: [
                  "https://signsdesigner.us/app/aso_products_preview/double_sided_signs/image_1.webp",
                  "https://signsdesigner.us/app/aso_products_preview/double_sided_signs/image_2.webp",
                ],
                type: "double-sided-sign",
                demoData: "",
                materialType: "simple",
              },
            ],
          },
          {
            name: "Retail & Outdoor",
            products: [
              {
                name: "Wood signs",
                description: "Decorative wood boards for cafés & shops.",
                image: [
                  "https://signsdesigner.us/app/aso_products_preview/wood_signs/image_1.webp",
                  "https://signsdesigner.us/app/aso_products_preview/wood_signs/image_2.webp",
                  "https://signsdesigner.us/app/aso_products_preview/wood_signs/image_3.webp",
                ],
                type: "wood-sign",
                demoData: "",
                materialType: "simple",
              },
              {
                name: "Magnetic signs",
                description: "Removable magnetic panels for vehicles.",
                image: [
                  "https://signsdesigner.us/app/aso_products_preview/magnetic_signs/image_1.webp",
                ],
                type: "magnetic-sign",
                demoData: "",
                materialType: "simple",
              },
              {
                name: "House signs",
                description: "Outdoor house numbers and name plaques.",
                image: [
                  "https://signsdesigner.us/app/aso_products_preview/house_signs/image_1.webp",
                  "https://signsdesigner.us/app/aso_products_preview/house_signs/image_2.webp",
                ],
                type: "house-sign",
                demoData: "",
                materialType: "simple",
              },
              {
                name: "Plastic signs",
                description: "PVC / Eco board signs for shops and events.",
                image: [
                  "https://signsdesigner.us/app/aso_products_preview/plastic_signs/image_1.webp",
                  "https://signsdesigner.us/app/aso_products_preview/plastic_signs/image_2.webp",
                  "https://signsdesigner.us/app/aso_products_preview/plastic_signs/image_3.webp",
                  "https://signsdesigner.us/app/aso_products_preview/plastic_signs/image_4.webp",
                  "https://signsdesigner.us/app/aso_products_preview/plastic_signs/image_5.webp",
                ],
                type: "gate-sign",
                demoData: "",
                materialType: "simple",
              },
            ],
          },
          {
            name: "Specialized & Industrial",
            products: [
              {
                name: "Brass signs",
                description: "Engraved brass plates for professionals.",
                image: [
                  "https://signsdesigner.us/app/aso_products_preview/brass_signs/image_1.webp",
                  "https://signsdesigner.us/app/aso_products_preview/brass_signs/image_2.webp",
                  "https://signsdesigner.us/app/aso_products_preview/brass_signs/image_3.webp",
                ],
                type: "plastic-sign",
                demoData: "",
                materialType: "advance",
              },
              {
                name: "Stainless steel signs",
                description: "Durable plates for factories & technical areas.",
                image: [
                  "https://signsdesigner.us/app/aso_products_preview/stainless_steel_signs/image_1.webp",
                  "https://signsdesigner.us/app/aso_products_preview/stainless_steel_signs/image_2.webp",
                ],
                type: "warning-sign",
                demoData: "",
                materialType: "advance",
              },
              {
                name: "Labels and plates",
                description: "Small information or identification plates.",
                image: [
                  "https://signsdesigner.us/app/aso_products_preview/name_badges/image_1.webp",
                  "https://signsdesigner.us/app/aso_products_preview/name_badges/image_2.webp",
                  "https://signsdesigner.us/app/aso_products_preview/name_badges/image_3.webp",
                  "https://signsdesigner.us/app/aso_products_preview/name_badges/image_4.webp",
                ],
                type: "brass-sign",
                demoData: "",
                materialType: "simple",
              },
            ],
          },
        ],
      },
      {
        name: "Banners",
        type: "banner",
        description: "Flexible large-format printing for events and promos.",
        demoLink:
          "https://demos.signsdesigner.us/aso-templates-page/asowp-templates/196/#/",
        productGroups: [
          {
            name: "Standard banners",
            products: [
              {
                name: "Banners signs",
                description: "Standard promotional banners (indoor / outdoor).",
                image: [
                  "https://signsdesigner.us/app/aso_products_preview/banners_signs/image_1.webp",
                  "https://signsdesigner.us/app/aso_products_preview/banners_signs/image_2.webp",
                  "https://signsdesigner.us/app/aso_products_preview/banners_signs/image_3.webp",
                  "https://signsdesigner.us/app/aso_products_preview/banners_signs/image_4.webp",
                ],
                type: "roll-up",
                demoData: "",
                materialType: "simple",
              },
              {
                name: "Posters",
                description:
                  "Large format posters used like lightweight banners.",
                image: [
                  "https://signsdesigner.us/app/aso_products_preview/posters/image_1.webp",
                  "https://signsdesigner.us/app/aso_products_preview/posters/image_2.webp",
                  "https://signsdesigner.us/app/aso_products_preview/posters/image_3.webp",
                ],
                type: "roll-up",
                demoData: "",
                materialType: "simple",
              },
            ],
          },
          {
            name: "With structure",
            products: [
              {
                name: "Roll-up banners",
                description: "Roll-up banners with cassette and stand.",
                image: [
                  "https://signsdesigner.us/app/aso_products_preview/pull-up_banners/image_1.webp",
                  "https://signsdesigner.us/app/aso_products_preview/pull-up_banners/image_2.webp",
                  "https://signsdesigner.us/app/aso_products_preview/pull-up_banners/image_3.webp",
                ],
                type: "vinyl-banner",
                demoData: "",
                materialType: "simple",
              },
            ],
          },
        ],
      },
      {
        name: "Stickers",
        type: "sticker",
        description: "Adhesive vinyls and decals for smooth surfaces.",
        demoLink:
          "https://demos.signsdesigner.us/aso-templates-page/asowp-templates/196/#/",
        productGroups: [
          {
            name: "General stickers",
            products: [
              {
                name: "Vinyl lettering",
                description: "Cut vinyl text for windows, doors, or walls",
                image: [
                  "https://signsdesigner.us/app/aso_products_preview/vinyl_lettering/image_1.webp",
                  "https://signsdesigner.us/app/aso_products_preview/vinyl_lettering/image_2.webp",
                  "https://signsdesigner.us/app/aso_products_preview/vinyl_lettering/image_3.webp",
                ],
                type: "vinyl-lettering",
                demoData: "",
                materialType: "simple",
              },
              {
                name: "Decals",
                description: "Printed decals for logos, products, or branding.",
                image: [
                  "https://signsdesigner.us/app/aso_products_preview/decals/image_1.webp",
                ],
                type: "decal",
                demoData: "",
                materialType: "simple",
              },
            ],
          },
          {
            name: "Cut & special use",
            products: [
              {
                name: "Contour-cut / die-cut",
                description:
                  "Stickers following the exact shape of the design.",
                image: [
                  "https://signsdesigner.us/app/aso_products_preview/contour-cut/image_1.webp",
                  "https://signsdesigner.us/app/aso_products_preview/contour-cut/image_2webp",
                  "https://signsdesigner.us/app/aso_products_preview/contour-cut/image_3.webp",
                ],
                type: "label",
                demoData: "",
                materialType: "simple",
              },
              {
                name: "Floor / wall stickers",
                description:
                  "Non-slip or large surface stickers for floors and walls.",
                image: [
                  "https://signsdesigner.us/app/aso_products_preview/floor_decals/image_1.webp",
                ],
                type: "cable-label",
                demoData: "",
                materialType: "simple",
              },
            ],
          },
        ],
      },
      {
        name: "Neon",
        type: "neon",
        description: "LED / flex neon illuminated signs.",
        demoLink: "",
        productGroups: [
          {
            name: "Most popular",
            products: [
              {
                name: "Neon Letter Signs",
                description: "Neon and Flex LED Neon Letter Signs.",
                image: [],
                type: "neon-letter-signs",
                demoData: "",
                materialType: "all",
              },
              {
                name: "Neon Logo Signs",
                description: "AI-powered custom logo signs.",
                image: [],
                type: "neon-logo-signs",
                demoData: "",
                materialType: "all",
              },
            ],
          },
        ],
      },
      {
        name: "Channel",
        type: "channel",
        description: "2D / 3D channel letter signage.",
        demoLink: "",
        productGroups: [
          {
            name: "Most popular",
            products: [
              {
                name: "Acrylic Letter Signs",
                description: "2D / 3D acrylic letter signs.",
                image: [],
                type: "acrylic-letter-signs",
                demoData: "",
                materialType: "all",
              },
              {
                name: "Metal Letter Signs",
                description: "2D / 3D metal letter signs.",
                image: [],
                type: "metal-letter-signs",
                demoData: "",
                materialType: "all",
              },
              {
                name: "Wood Letter Signs",
                description: "Flat or 3D wood letter signs.",
                image: [],
                type: "wood-letter-signs",
                demoData: "",
                materialType: "all",
              },
            ],
          },
        ],
      },
    ],
  };

  const PRODUCT_IMAGE_MAP: Record<string, string> = {
    "neon-letter-signs": "/images/configuration-examples/neon.webp",
    "neon-logo-signs": "/images/configuration-examples/ai-design.webp",
    "acrylic-letter-signs": "/images/configuration-examples/acrylic.webp",
    "metal-letter-signs": "/images/configuration-examples/metal.webp",
    "wood-letter-signs": "/images/configuration-examples/wood.webp",
  };

  const PRICING_PREVIEW_MAP: Record<
    string,
    { image: string; tag: string; hint: string }
  > = {
    "fixed-height": {
      image: "/images/configuration-examples/pricing-previews/fixed-height.svg",
      tag: "Simple",
      hint: "Best for standard height constraints.",
    },
    "fixed-width": {
      image: "/images/configuration-examples/pricing-previews/fixed-witdh.svg",
      tag: "Simple",
      hint: "Best for standard width constraints.",
    },
    advanced: {
      image: "/images/configuration-examples/pricing-previews/advanced.svg",
      tag: "Advanced",
      hint: "Most accurate for neon and LED tube signs.",
    },
    "frame-fit": {
      image: "/images/configuration-examples/pricing-previews/frame-fit.svg",
      tag: "Frame Fit",
      hint: "Best for frame-focused signs.",
    },
  };

  const DEFAULT_PRODUCT_IMAGE = "/images/configuration-examples/acrylic.webp";

  const toImageArray = (imageValue: unknown) => {
    if (typeof imageValue === "string") {
      return imageValue.trim() ? [imageValue] : [];
    }
    if (Array.isArray(imageValue)) {
      return imageValue
        .map((entry) => (typeof entry === "string" ? entry.trim() : ""))
        .filter(Boolean);
    }
    return [];
  };

  const getProductCardImage = (product: any) => {
    const images = toImageArray(product?.image);
    if (images.length > 0) return images[0];
    return PRODUCT_IMAGE_MAP[product?.type] || DEFAULT_PRODUCT_IMAGE;
  };

  const dedupeItems = (
    items: any[],
    getKey: (item: any, index: number) => string,
  ) => {
    const seen = new Set<string>();
    return (Array.isArray(items) ? items : []).filter((item, index) => {
      const key = getKey(item, index) || `idx-${index}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  };

  const getDomainIcon = (domainKey: string) => {
    if (domainKey === "apparel") {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"></path>
        </svg>
      );
    }

    if (domainKey === "object") {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="m6 8 1.75 12.28a2 2 0 0 0 2 1.72h4.54a2 2 0 0 0 2-1.72L18 8"></path>
          <path d="M5 8h14"></path>
          <path d="M7 15a6.47 6.47 0 0 1 5 0 6.47 6.47 0 0 0 5 0"></path>
          <path d="m12 8 1-6h2"></path>
        </svg>
      );
    }

    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect width="20" height="14" x="2" y="3" rx="2"></rect>
        <line x1="8" x2="16" y1="21" y2="21"></line>
        <line x1="12" x2="12" y1="17" y2="21"></line>
      </svg>
    );
  };

  const [step, setStep] = useState(configuration ? 3 : 0);

  const [formDatas, setFormDatas] = useState({
    name: "",
    email: "",
    age: "",
    comment: "",
  });

  //selectionner la catégorie
  const [productCategorie, setProductCategorie] = useState<any>(
    configuration ? null : signageOption,
  );
  const selectProductCategorie = (data: object) => {
    setProductCategorie(data);
    console.log(data, "product categorie");
  };

  const initialClassicFamily = configuration
    ? getClassicDataProductFamily((configuration as any)?.data) ||
      getAsoClassicFamilyForProductType((configuration as any)?.productType)
        ?.key ||
      null
    : null;

  const [selectedClassicFamilyKey, setSelectedClassicFamilyKey] = useState<
    string | null
  >(initialClassicFamily);
  const [selectedClassicMaterialKeys, setSelectedClassicMaterialKeys] =
    useState<string[]>([]);
  const selectedClassicFamilyKeyRef = useRef(selectedClassicFamilyKey);
  const selectedClassicMaterialKeysRef = useRef<string[]>(
    selectedClassicMaterialKeys,
  );

  const selectedClassicFamily = useMemo(
    () => getAsoClassicFamilyByKey(selectedClassicFamilyKey),
    [selectedClassicFamilyKey],
  );

  const classicMaterials = useMemo(
    () => getAsoClassicMaterialsForFamily(selectedClassicFamilyKey),
    [selectedClassicFamilyKey],
  );
  const selectedClassicMaterials = useMemo(
    () =>
      classicMaterials.filter((material) =>
        selectedClassicMaterialKeys.includes(material.key),
      ),
    [classicMaterials, selectedClassicMaterialKeys],
  );

  // FIX: isLetteringFamily is derived strictly from selectedClassicFamilyKey,
  // not from productType state which can be stale/desynchronised.
  const isLetteringFamily = selectedClassicFamilyKey === "lettering";
  useEffect(() => {
    selectedClassicFamilyKeyRef.current = selectedClassicFamilyKey;
  }, [selectedClassicFamilyKey]);
  useEffect(() => {
    selectedClassicMaterialKeysRef.current = selectedClassicMaterialKeys;
  }, [selectedClassicMaterialKeys]);

  const classicConfigModels = useMemo(
    () =>
      isLetteringFamily
        ? getAsoClassicConfigModelsForFamily(selectedClassicFamilyKey)
        : ASO_CLASSIC_CONFIG_MODELS,
    [isLetteringFamily, selectedClassicFamilyKey],
  );
  const orderedClassicConfigModels = useMemo(
    () =>
      [...classicConfigModels].sort((left, right) => {
        if (left.key === right.key) return 0;
        if (left.key === "advance") return -1;
        if (right.key === "advance") return 1;
        return 0;
      }),
    [classicConfigModels],
  );

  const selectClassicFamily = (familyKey: string) => {
    selectedClassicFamilyKeyRef.current = familyKey;
    selectedClassicMaterialKeysRef.current = [];
    setSelectedClassicFamilyKey(familyKey);
    setSelectedClassicMaterialKeys([]);
    setDemoId(null);
    setDemoName("");
    includeStarterDataChoiceRef.current = false;
    setIncludeStarterDataChoice(false);
    setValidDemoData(false);

    const family = getAsoClassicFamilyByKey(familyKey);
    const models = getAsoClassicConfigModelsForFamily(familyKey);

    if (models.length === 1) {
      materialTypeRef.current = models[0].key;
      setMaterialType(models[0].key);
    }

    if (familyKey === "lettering") {
      const defaultLetteringType = letteringProductCategories[0] || null;
      productTypeRef.current = defaultLetteringType;
      productDataRef.current = null;
      setProductType(defaultLetteringType);
      setProductGroup(defaultLetteringType?.productGroups?.[0] || null);
      setProductData(null);
      return;
    }

    // FIX: Reset productType to a non-lettering value when switching away from lettering
    const nextProductType = {
      type: family?.key,
      name: family?.label,
      productGroups: [],
    };
    productTypeRef.current = nextProductType;
    productDataRef.current = null;
    setProductType(nextProductType);
    setProductGroup(null);
    setProductData(null);
  };

  const selectClassicMaterial = (materialKey: string) => {
    setSelectedClassicMaterialKeys((prev) => {
      const next = prev.includes(materialKey)
        ? prev.filter((key) => key !== materialKey)
        : [...prev, materialKey];
      selectedClassicMaterialKeysRef.current = next;
      return next;
    });
  };

  // selection du type produit
  const initialProductType =
    signageOption.productCategories.find(
      (category: any) => category.type === (configuration as any)?.productType,
    ) ||
    signageOption.productCategories[0] ||
    null;

  const [productType, setProductType] = useState<any>(initialProductType);
  const selectProductType = (data: any) => {
    productTypeRef.current = data;
    productDataRef.current = null;
    setProductType(data);
    setProductData(null);
    if (data.productGroups.length > 0) {
      setProductGroup(data.productGroups[0]);
    }
  };

  // FIX: isNcpcProductType now additionally checks isLetteringFamily to prevent
  // false positives when productType state still holds a stale neon/channel value
  // after the user switched to a non-lettering family.
  const isNcpcProductType =
    isLetteringFamily &&
    LETTERING_PRODUCT_TYPES.includes(
      (productType?.type || "") as (typeof LETTERING_PRODUCT_TYPES)[number],
    );

  const [productGroup, setProductGroup] = useState<any>(
    initialProductType?.productGroups?.[0] || null,
  );

  const visibleProductCategories = useMemo(
    () =>
      dedupeItems(productCategorie?.productCategories || [], (item) =>
        String(item?.type || item?.name || ""),
      ),
    [productCategorie],
  );

  const letteringProductCategories = useMemo(
    () =>
      visibleProductCategories.filter((category: any) =>
        LETTERING_PRODUCT_TYPES.includes(
          (category?.type || "") as (typeof LETTERING_PRODUCT_TYPES)[number],
        ),
      ),
    [visibleProductCategories],
  );

  const primaryProductCategories = useMemo(() => {
    const nonLetteringCategories = visibleProductCategories.filter(
      (category: any) =>
        !LETTERING_PRODUCT_TYPES.includes(
          (category?.type || "") as (typeof LETTERING_PRODUCT_TYPES)[number],
        ),
    );

    if (!letteringProductCategories.length) return nonLetteringCategories;

    return [
      ...nonLetteringCategories,
      {
        name: "Lettering",
        type: LETTERING_CATEGORY_TYPE,
        description: "Neon and Channel letter signs.",
      },
    ];
  }, [visibleProductCategories, letteringProductCategories]);

  const selectedPrimaryCategoryLabel = useMemo(() => {
    if (isNcpcProductType) return "Lettering";
    return productType?.name || "Signboard";
  }, [isNcpcProductType, productType?.name]);

  const visibleProductGroups = useMemo(
    () =>
      dedupeItems(productType?.productGroups || [], (item) =>
        String(item?.name || ""),
      ),
    [productType],
  );

  const productGroupsToDisplay = useMemo(
    () =>
      visibleProductGroups.filter(
        (group: any) =>
          String(group?.name || "")
            .trim()
            .toLowerCase() !== "most popular",
      ),
    [visibleProductGroups],
  );

  const shouldShowProductGroupTabs = useMemo(
    () => productGroupsToDisplay.length > 0,
    [productGroupsToDisplay],
  );

  const visibleProducts = useMemo(
    () =>
      dedupeItems(productGroup?.products || [], (item) =>
        String(item?.type || item?.name || ""),
      ),
    [productGroup],
  );

  const letteringProducts = useMemo(() => {
    return letteringProductCategories.flatMap((category: any) =>
      (category?.productGroups || []).flatMap((group: any) =>
        (group?.products || []).map((product: any) => ({
          ...product,
          categoryType: category.type,
          categoryName: category.name,
        })),
      ),
    );
  }, [letteringProductCategories]);

  //selectionner le produit
  const [productData, setProductData] = useState<any>(null);
  const selectProductData = (data: any) => {
    productDataRef.current = data;
    materialTypeRef.current = data.materialType;
    setProductData(data);
    setMaterialType(data.materialType);
  };

  const selectLetteringProduct = (product: any) => {
    const matchingCategory =
      letteringProductCategories.find(
        (category: any) => category.type === product.categoryType,
      ) || null;

    if (matchingCategory) {
      productTypeRef.current = matchingCategory;
      setProductType(matchingCategory);
      setProductGroup(matchingCategory.productGroups?.[0] || null);
    }

    productDataRef.current = product;
    materialTypeRef.current = "advance";
    setProductData(product);
    setMaterialType("advance");
  };

  // State pour la prévisualisation
  const [previewProduct, setPreviewProduct] = useState<any>(null);

  // État pour l'index de l'image dans la modale
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Préparation des URLs d'images (pour gérer le string ou le tableau)
  const imageUrls = useMemo(() => {
    if (!previewProduct) return [];
    const productImages = toImageArray(previewProduct?.image);
    if (productImages.length > 0) return productImages;
    return [PRODUCT_IMAGE_MAP[previewProduct?.type] || DEFAULT_PRODUCT_IMAGE];
  }, [previewProduct]);

  // Réinitialiser l'index lorsque le produit change ou la modale s'ouvre/ferme
  useEffect(() => {
    if (currentImageIndex >= imageUrls.length) {
      setCurrentImageIndex(0);
    }
    if (!previewProduct) {
      setCurrentImageIndex(0);
    }
  }, [previewProduct, imageUrls.length, currentImageIndex]);

  const [isImageLoading, setIsImageLoading] = useState(true);

  // Réinitialiser le loading quand on change d'image ou de produit
  useEffect(() => {
    setIsImageLoading(true);
  }, [currentImageIndex, previewProduct]);

  const handleImageLoad = () => {
    setIsImageLoading(false);
  };

  const handleNextImage = useCallback(() => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
  }, [imageUrls.length]);

  const handlePreviousImage = useCallback(() => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + imageUrls.length) % imageUrls.length,
    );
  }, [imageUrls.length]);

  // selection du type de materiel
  const [materialType, setMaterialType] = useState<string>(
    (configuration as any)?.materialType || "simple",
  );
  const selectMaterialType = (type: string) => {
    materialTypeRef.current = type;
    setMaterialType(type);
    console.log(type, "material type");
  };

  // Starter selection
  const [includeStarterDataChoice, setIncludeStarterDataChoice] =
    useState<boolean>(false);
  const includeStarterDataChoiceRef = useRef(includeStarterDataChoice);
  const [validDemoData, setValidDemoData] = useState<boolean>(false);
  const [demoId, setDemoId] = useState<any>(null);
  const [demoName, setDemoName] = useState<any>("");
  const [includeNcpcMeta, setIncludeNcpcMeta] = useState<boolean>(true);
  const includeNcpcMetaRef = useRef(includeNcpcMeta);
  const [ncpcPricingMode, setNcpcPricingMode] = useState<string>(
    (configuration as any)?.pricingMode || "",
  );
  const materialTypeRef = useRef(materialType);
  const ncpcPricingModeRef = useRef(ncpcPricingMode);
  const productTypeRef = useRef<any>(productType);
  const productDataRef = useRef<any>(productData);
  const allowedNcpcPricingModes = useMemo(
    () =>
      getAllowedNcpcPricingModes(
        productType?.type === "channel" ? "channel" : "neon",
        productData?.type || null,
      ),
    [productType?.type, productData?.type],
  );

  useEffect(() => {
    includeStarterDataChoiceRef.current = includeStarterDataChoice;
  }, [includeStarterDataChoice]);
  useEffect(() => {
    includeNcpcMetaRef.current = includeNcpcMeta;
  }, [includeNcpcMeta]);
  useEffect(() => {
    materialTypeRef.current = materialType;
  }, [materialType]);
  useEffect(() => {
    ncpcPricingModeRef.current = ncpcPricingMode;
  }, [ncpcPricingMode]);
  useEffect(() => {
    productTypeRef.current = productType;
  }, [productType]);
  useEffect(() => {
    productDataRef.current = productData;
  }, [productData]);

  useEffect(() => {
    if (!isNcpcProductType) return;
    if (!allowedNcpcPricingModes.length) return;

    if (
      !ncpcPricingMode ||
      !allowedNcpcPricingModes.includes(ncpcPricingMode as any)
    ) {
      const nextPricingMode = getDefaultNcpcPricingMode(
        productType?.type === "channel" ? "channel" : "neon",
        productData?.type || null,
      );
      ncpcPricingModeRef.current = nextPricingMode;
      setNcpcPricingMode(nextPricingMode);
    }
  }, [
    isNcpcProductType,
    allowedNcpcPricingModes,
    ncpcPricingMode,
    productType?.type,
    productData?.type,
  ]);

  const resolvedSetupModel = isLetteringFamily ? "advance" : materialType;
  const getNcpcPricingModeLabel = (value?: string | null) =>
    NCPC_PRICING_OPTIONS.find((option) => option.value === value)?.name ||
    value ||
    "-";

  // ─────────────────────────────────────────────────────────────────────────────
  // FIX: handleSubmit now uses `isActuallyLettering` derived directly from
  // `selectedClassicFamilyKey` (the single source of truth) instead of the
  // derived booleans `isLetteringFamily` / `isNcpcProductType` which can be
  // stale when the user navigates between families without fully resetting state.
  // This prevents non-lettering configurations from being saved as neon/channel.
  // ─────────────────────────────────────────────────────────────────────────────
  const handleSubmit = () => {
    const currentFamilyKey = selectedClassicFamilyKeyRef.current || "";
    const currentSelectedMaterialKeys = selectedClassicMaterialKeysRef.current || [];
    const currentIncludeStarterData = includeStarterDataChoiceRef.current;
    const currentIncludeNcpcMeta = includeNcpcMetaRef.current;
    const currentMaterialType = materialTypeRef.current || "";
    const currentNcpcPricingMode = ncpcPricingModeRef.current || "";
    const currentProductType = productTypeRef.current;
    const currentProductData = productDataRef.current;

    // Ground truth: is the selected family actually "lettering"?
    const isActuallyLettering = currentFamilyKey === "lettering";

    // Ground truth: is the selected product type a valid NCPC type AND are we in lettering?
    const isActuallyNcpc =
      isActuallyLettering &&
      LETTERING_PRODUCT_TYPES.includes(
        (currentProductType?.type || "") as (typeof LETTERING_PRODUCT_TYPES)[number],
      );

    const submitData = new FormData();
    submitData.set("name", String(formData.name || ""));
    submitData.set("description", String(formData.description || ""));
    submitData.set("icon", String(formData.icon || ""));
    submitData.set("popupImg", String(formData.popupImg || ""));
    submitData.set("products", JSON.stringify(formData.products || []));
    submitData.set(
      "materialType",
      String(isActuallyLettering ? "advance" : currentMaterialType || ""),
    );
    submitData.set(
      "selectedMaterialKeys",
      JSON.stringify(currentSelectedMaterialKeys),
    );
    submitData.set("productFamily", String(currentFamilyKey));
    submitData.set(
      "productType",
      String(
        isActuallyLettering
          ? currentProductType?.type || ""
          : currentFamilyKey,
      ),
    );
    submitData.set(
      "includeStarterData",
      currentIncludeStarterData ? "true" : "false",
    );

    // FIX: Only attach NCPC fields when we are genuinely in a lettering+ncpc context.
    // Previously this block ran whenever isNcpcProductType was true, which could
    // be a stale value after switching families.
    if (isActuallyNcpc) {
      submitData.set("ncpcPresetKey", String(currentProductData?.type || ""));
      submitData.set("ncpcPricingMode", String(currentNcpcPricingMode || ""));
      submitData.set(
        "ncpcIncludeMeta",
        currentIncludeStarterData && currentIncludeNcpcMeta ? "true" : "false",
      );
    }

    if (demoId !== null && demoId !== undefined && demoId !== "") {
      submitData.set("demoId", `${parseInt(`${demoId}`, 10)}`);
    }

    submit(submitData, { method: "POST" });
  };

  const allowDemoData = (statut: boolean) => {
    includeStarterDataChoiceRef.current = statut;
    setIncludeStarterDataChoice(statut);
    if (!statut) {
      setValidDemoData(false);
      setDemoId(null);
      setDemoName("");
      return;
    }

    if (isLetteringFamily) {
      setValidDemoData(true);
      setDemoId(null);
      setDemoName(productData?.name || "Lettering starter data");
      return;
    }
    setValidDemoData(true);
    setDemoId(null);
    setDemoName("Generated starter data");
  };

  // modal de selection de demo data associé
  const [showDemoData, setShowDemoData] = useState(false);
  const DemoList = ({
    handleOnBack,
    handleDemoId,
  }: {
    handleOnBack: any;
    handleDemoId: any;
  }) => {
    const [selectData, setSelectData] = useState("");
    const [searchTag, setSearchTag] = useState("");

    const navigation = useNavigation();
    const plan = "pro";

    let data: Array<{
      label: string;
      value: any;
      description: string;
      image: string;
      hide: boolean;
    }> = configurationDemoData.map((item, index) => {
      return {
        label: item.name,
        value: `${index}`,
        description: item.description,
        image: item.icon,
        hide:
          !PRICING_PLANS.STARTER_RULES.materialTypes.includes(
            getClassicDataMaterialType(item.data) || "",
          ) && plan == PRICING_PLANS.STARTER
            ? true
            : false,
      };
    });

    data = data.filter((item) => {
      return !item.hide;
    });

    data = data.filter((item) => {
      return item.label.toLowerCase().includes(searchTag.toLowerCase());
    });

    let isSubmitting = navigation.state == "submitting";

    return (
      <Page fullWidth>
        <SpacingBackground width="100%" height="auto" margin="10px 0px ">
          <BoxBackground>
            <Box paddingInline="300" paddingBlock="300">
              <InlineStack gap="100" align="space-between" blockAlign="center">
                <Text as="h2" variant="headingMd">
                  List of demo data
                </Text>
                <TextField
                  prefix={<Icon source={SearchIcon} />}
                  value={searchTag}
                  label="Search demo data"
                  onChange={setSearchTag}
                  autoComplete="on"
                  labelHidden
                />
              </InlineStack>
            </Box>
          </BoxBackground>

          <SpacingBackground
            width="100%"
            height="auto"
            margin="5px 0px"
            backgroundColor="#F8F9FB"
          >
            <Box paddingInline="300" paddingBlock="300">
              <Grid gap={{ lg: "20px" }}>
                {data.map((demoData: any) => {
                  return (
                    <Grid.Cell
                      columnSpan={{ xs: 6, sm: 3, md: 2, lg: 4, xl: 3 }}
                    >
                      <AppearanceItem
                        title={demoData.label}
                        description={demoData.description}
                        imgSrc={demoData.image}
                        active={demoData.value == demoId}
                        onChange={(value: any) => {
                          setSelectData(demoData.value);
                          handleDemoId(demoData.value, demoData.label);
                        }}
                      />
                    </Grid.Cell>
                  );
                })}
              </Grid>
            </Box>
          </SpacingBackground>

          <SpacingBackground backgroundColor="#F9F9F9">
            <Form onSubmit={handleSubmit}>
              <Box paddingInline="300" paddingBlock="300">
                <InlineStack align="end" gap="600"></InlineStack>
              </Box>
            </Form>
          </SpacingBackground>
        </SpacingBackground>
      </Page>
    );
  };

  //modal de recapitulatif
  const [showConfigRecap, setShowConfigRecap] = useState(false);
  const [previewFamily, setPreviewFamily] = useState<any>(null);
  const [previewMaterial, setPreviewMaterial] = useState<any>(null);

  const openCreationRecap = () => {
    setShowConfigRecap(true);
  };

  const canFinalizeCreation = true;

  const canProceedStep = useMemo(() => {
    if (!configuration && step === 0) {
      return Boolean(selectedClassicFamilyKey);
    }

    if (step === 1) {
      if (isLetteringFamily) {
        return productData != null;
      }
      return selectedClassicMaterialKeys.length > 0;
    }

    if (step === 2) {
      if (isLetteringFamily && isNcpcProductType) {
        return Boolean(ncpcPricingMode);
      }
      return Boolean(materialType);
    }

    return true;
  }, [
    configuration,
    step,
    selectedClassicFamilyKey,
    isLetteringFamily,
    productData,
    selectedClassicMaterialKeys,
    isNcpcProductType,
    ncpcPricingMode,
    materialType,
  ]);

  // navigation entre les steps
  function nextStep() {
    if (!canProceedStep) return;
    setStep((prev) => Math.min(prev + 1, 3));
  }

  const prevStep = () => setStep((prev) => Math.max(prev - 1, 0));

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <Box>
            <div
              style={{
                paddingBottom: "25px",
                display: "flex",
                flexDirection: "column",
                gap: "5px",
              }}
            >
              <Text as="h2" variant="headingLg" fontWeight="bold">
                What type of product do you want to sell?
              </Text>
              <p>
                Choose the product family first. We will then show the matching
                materials and configuration setup.
              </p>
            </div>

            <Grid columns={{ xs: 1, sm: 2, md: 2, lg: 2, xl: 2 }}>
              {ASO_CLASSIC_FAMILIES.map((family) => {
                const selected = selectedClassicFamilyKey === family.key;
                const cardImage =
                  family.previewImages?.[0] || DEFAULT_PRODUCT_IMAGE;
                return (
                  <Grid.Cell key={family.key}>
                    <div
                      onClick={() => {
                        selectClassicFamily(family.key);
                      }}
                      style={{
                        width: "100%",
                        cursor: "pointer",
                        backgroundColor: "#FFFFFF",
                        color: "black",
                        borderRadius: "16px",
                        border: CARD_DEFAULT_BORDER,
                        boxShadow: selected
                          ? CARD_SELECTED_SHADOW
                          : CARD_DEFAULT_SHADOW,
                        transition: "all 180ms",
                        overflow: "hidden",
                        minHeight: "100%",
                        position: "relative",
                        padding: "14px",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          gap: "14px",
                          alignItems: "flex-start",
                          flex: 1,
                        }}
                      >
                        <div
                          style={{
                            width: "62px",
                            height: "62px",
                            borderRadius: "12px",
                            backgroundColor: "#EEF3F6",
                            border: "1px solid #D6DEE3",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            overflow: "hidden",
                            flexShrink: 0,
                            boxShadow: selected
                              ? CARD_IMAGE_SELECTED_SHADOW
                              : "inset 0 0 0 1px rgba(255,255,255,0.45)",
                          }}
                        >
                          <img
                            src={cardImage}
                            alt={`${family.label} example`}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              objectPosition: "center",
                            }}
                          />
                        </div>

                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "6px",
                            flex: 1,
                            minWidth: 0,
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              gap: "8px",
                              alignItems: "center",
                            }}
                          >
                            <p
                              style={{
                                fontSize: "17px",
                                fontWeight: 700,
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                            >
                              {family.label}
                            </p>
                            {selected && (
                              <span
                                style={{
                                      display: "flex",
                                      width: "fit-content",
                                  background: "#EEF2F6",
                                  color: "#475467",
                                  fontSize: "10px",
                                  borderRadius: "20px",
                                  padding: "1px 7px",
                                  height: "fit-content",
                                  flexShrink: 0,
                                }}
                              >
                                selected
                              </span>
                            )}
                          </div>

                          <p
                            style={{
                              color: "#5F6368",
                              fontSize: "14px",
                              marginTop: "1px",
                              display: "-webkit-box",
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                            }}
                          >
                            {family.description}
                          </p>

                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              marginTop: "auto",
                            }}
                          >
                            <p
                              style={{
                                color: "#9EA6AD",
                                fontSize: "12px",
                                fontWeight: 500,
                              }}
                            >
                              Click to select
                            </p>

                            <PreviewAction
                              onClick={(event) => {
                                event.stopPropagation();
                                setPreviewFamily(family);
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Grid.Cell>
                );
              })}
            </Grid>
          </Box>
        );
      case 1:
        return (
          <Box>
            {!isLetteringFamily && selectedClassicFamily ? (
              <>
                <div
                  style={{
                    paddingBottom: "20px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "5px",
                  }}
                >
                  <Text as="h2" variant="headingLg" fontWeight="bold">
                    Choose the material for{" "}
                    <Badge size="large">{selectedClassicFamily.label}</Badge>
                  </Text>
                  <p>
                    Select one or more materials your merchants will sell. You
                    will choose how the configurator behaves in the next step.
                  </p>
                </div>

                <Grid columns={{ xs: 1, sm: 2, md: 2, lg: 2, xl: 2 }}>
                  {classicMaterials.map((material) => {
                    const isSelected = selectedClassicMaterialKeys.includes(
                      material.key,
                    );
                    return (
                      <Grid.Cell key={material.key}>
                        <div
                          onClick={() => selectClassicMaterial(material.key)}
                          style={{
                            cursor: "pointer",
                            background: "#FFFFFF",
                            color: "black",
                            borderRadius: "16px",
                            border: CARD_DEFAULT_BORDER,
                            boxShadow: isSelected
                              ? CARD_SELECTED_SHADOW
                              : CARD_DEFAULT_SHADOW,
                            transition: "all 180ms",
                            padding: "14px",
                            display: "flex",
                            flexDirection: "column",
                            minHeight: "100%",
                            position: "relative",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              gap: "14px",
                              alignItems: "flex-start",
                              flex: 1,
                            }}
                          >
                            <div
                              style={{
                                width: "62px",
                                height: "62px",
                                borderRadius: "12px",
                                backgroundColor: "#EEF3F6",
                                border: "1px solid #D6DEE3",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                overflow: "hidden",
                                flexShrink: 0,
                                boxShadow: isSelected
                                  ? CARD_IMAGE_SELECTED_SHADOW
                                  : "inset 0 0 0 1px rgba(255,255,255,0.45)",
                              }}
                            >
                              <img
                                src={material.image}
                                alt={`${material.label} material`}
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "cover",
                                  objectPosition: "center",
                                }}
                              />
                            </div>

                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "6px",
                                flex: 1,
                                minWidth: 0,
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  gap: "8px",
                                  alignItems: "center",
                                }}
                              >
                                <p
                                  style={{
                                    fontSize: "17px",
                                    fontWeight: 700,
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                  }}
                                >
                                  {material.label}
                                </p>
                                {isSelected && (
                                  <span
                                    style={{
                                      display: "flex",
                                      width: "fit-content",
                                      background: "#EEF2F6",
                                      color: "#475467",
                                      fontSize: "10px",
                                      borderRadius: "20px",
                                      padding: "1px 7px",
                                      height: "fit-content",
                                      flexShrink: 0,
                                    }}
                                  >
                                    selected
                                  </span>
                                )}
                              </div>

                              <p
                                style={{
                                  color: "#5F6368",
                                  fontSize: "14px",
                                  marginTop: "1px",
                                  display: "-webkit-box",
                                  WebkitLineClamp: 2,
                                  WebkitBoxOrient: "vertical",
                                  overflow: "hidden",
                                }}
                              >
                                Include {material.label.toLowerCase()} in this{" "}
                                {selectedClassicFamily?.label?.toLowerCase() ||
                                  "product"}{" "}
                                setup.
                              </p>

                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                  marginTop: "auto",
                                }}
                              >
                                <p
                                  style={{
                                    color: "#9EA6AD",
                                    fontSize: "12px",
                                    fontWeight: 500,
                                  }}
                                >
                                  Click to toggle
                                </p>

                                <PreviewAction
                                  onClick={(event) => {
                                    event.stopPropagation();
                                    setPreviewMaterial(material);
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </Grid.Cell>
                    );
                  })}
                </Grid>
              </>
            ) : (
              <>
                <div
                  style={{
                    paddingBottom: "20px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "5px",
                  }}
                >
                  <Text as="h2" variant="headingLg" fontWeight="bold">
                    What lettering product would you like to sell?{" "}
                    <Badge size="large">
                      {selectedClassicFamily?.label || "Lettering"}
                    </Badge>
                  </Text>
                  <p>
                    Choose the lettering product directly. We no longer split
                    this step into separate Neon and Channel categories.
                  </p>
                </div>

                <Grid columns={{ xs: 1, sm: 2, md: 2, lg: 2, xl: 2 }}>
                  {letteringProducts.map((product: any) => {
                    const cardImage = getProductCardImage(product);
                    const isSelected = productData?.name === product?.name;
                    return (
                      <Grid.Cell key={product?.type || product?.name}>
                        <div
                          onClick={() => selectLetteringProduct(product)}
                          style={{
                            cursor: "pointer",
                            background: "#FFFFFF",
                            color: "black",
                            borderRadius: "16px",
                            border: CARD_DEFAULT_BORDER,
                            boxShadow: isSelected
                              ? CARD_SELECTED_SHADOW
                              : CARD_DEFAULT_SHADOW,
                            transition: "all 180ms",
                            padding: "14px",
                            minHeight: "100%",
                            position: "relative",
                            overflow: "hidden",
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              gap: "14px",
                              alignItems: "flex-start",
                              flex: 1,
                            }}
                          >
                            <div
                              style={{
                                width: "62px",
                                height: "62px",
                                borderRadius: "12px",
                                backgroundColor: "#EEF3F6",
                                border: "1px solid #D6DEE3",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                overflow: "hidden",
                                flexShrink: 0,
                                boxShadow: isSelected
                                  ? CARD_IMAGE_SELECTED_SHADOW
                                  : "inset 0 0 0 1px rgba(255,255,255,0.45)",
                              }}
                            >
                              <img
                                src={cardImage}
                                alt={`${product?.name} example`}
                                onError={(event) => {
                                  event.currentTarget.src =
                                    DEFAULT_PRODUCT_IMAGE;
                                }}
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "contain",
                                  objectPosition: "center",
                                }}
                              />
                            </div>

                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "6px",
                                flex: 1,
                                minWidth: 0,
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  gap: "8px",
                                  alignItems: "center",
                                }}
                              >
                                <p
                                  style={{
                                    fontSize: "17px",
                                    fontWeight: 700,
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                  }}
                                >
                                  {product.name}
                                </p>
                                <InlineStack gap="100" blockAlign="center">
                                  <Badge tone="info">
                                    {product.categoryName}
                                  </Badge>
                                  {isSelected && (
                                    <span
                                      style={{
                                        display: "flex",
                                        width: "fit-content",
                                        background: "#EEF2F6",
                                        color: "#475467",
                                        fontSize: "10px",
                                        borderRadius: "20px",
                                        padding: "1px 7px",
                                        height: "fit-content",
                                        flexShrink: 0,
                                      }}
                                    >
                                      selected
                                    </span>
                                  )}
                                </InlineStack>
                              </div>

                              <p
                                style={{
                                  color: "#5F6368",
                                  fontSize: "14px",
                                  marginTop: "1px",
                                  display: "-webkit-box",
                                  WebkitLineClamp: 2,
                                  WebkitBoxOrient: "vertical",
                                  overflow: "hidden",
                                }}
                              >
                                {product?.description}
                              </p>

                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                  marginTop: "auto",
                                }}
                              >
                                <p
                                  style={{
                                    color: "#9EA6AD",
                                    fontSize: "12px",
                                    fontWeight: 500,
                                  }}
                                >
                                  Click to select
                                </p>

                                <PreviewAction
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setPreviewProduct(product);
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </Grid.Cell>
                    );
                  })}
                </Grid>

                {/* --- MODAL DE PREVIEW --- */}
                {previewProduct && (
                  <Modal
                    open={!!previewProduct}
                    onClose={() => setPreviewProduct(null)}
                    title={previewProduct.name}
                    primaryAction={{
                      content: "Close",
                      onAction: () => setPreviewProduct(null),
                    }}
                    secondaryActions={[
                      {
                        content: "Select",
                        onAction: () => selectLetteringProduct(previewProduct),
                      },
                    ]}
                  >
                    <Modal.Section>
                      <BlockStack gap="200">
                        <Text as="p" tone="subdued">
                          {previewProduct.description}
                        </Text>

                        <div
                          style={{
                            position: "relative",
                            display: "flex",
                            width: "100%",
                            height: "100%",
                          }}
                        >
                          <span
                            style={{
                              position: "absolute",
                              top: "50%",
                              left: "1%",
                              translate: "0% -50%",
                            }}
                          >
                            <Button
                              icon={<Icon source={ArrowLeftIcon} />}
                              onClick={handlePreviousImage}
                              disabled={imageUrls.length <= 1}
                            />
                          </span>

                          <div
                            style={{
                              width: "100%",
                              height: "200px",
                              backgroundColor: "#F0F4F8",
                              border: "1px dashed #B0BEC5",
                              borderRadius: "8px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: "#637381",
                              overflow: "hidden",
                            }}
                          >
                            {imageUrls.length > 0 ? (
                              <>
                                <div
                                  style={{
                                    position: "absolute",
                                    top: "50%",
                                    translate:
                                      "var(--tw-translate-x) -50%, -50% var(--tw-translate-y)",
                                    left: "50%",
                                  }}
                                >
                                  {isImageLoading && (
                                    <Spinner
                                      accessibilityLabel="Loading image"
                                      size="small"
                                    />
                                  )}
                                </div>
                                <img
                                  src={imageUrls[currentImageIndex]}
                                  onError={(event) => {
                                    event.currentTarget.src =
                                      DEFAULT_PRODUCT_IMAGE;
                                  }}
                                  onLoad={handleImageLoad}
                                  alt={`Aperçu ${currentImageIndex + 1}`}
                                  style={{
                                    maxHeight: "100%",
                                    maxWidth: "100%",
                                    objectFit: "contain",
                                  }}
                                />
                              </>
                            ) : (
                              <Text as="span" variant="bodyMd">
                                No image available
                              </Text>
                            )}
                          </div>

                          <span
                            style={{
                              position: "absolute",
                              top: "50%",
                              right: "1%",
                              translate: "0% -50%",
                            }}
                          >
                            <Button
                              icon={<Icon source={ArrowRightIcon} />}
                              onClick={handleNextImage}
                              disabled={imageUrls.length <= 1}
                            />
                          </span>
                        </div>

                        {imageUrls.length > 1 && (
                          <Text
                            alignment="center"
                            tone="subdued"
                            as="p"
                            variant="bodySm"
                          >
                            {`${currentImageIndex + 1} / ${imageUrls.length}`}
                          </Text>
                        )}

                        <InlineStack gap="200" blockAlign="center">
                          {isLetteringFamily ? (
                            <Text as="span" tone="subdued">
                              Pricing mode is selected in the next step.
                            </Text>
                          ) : (
                            <>
                              <Text as="span" tone="subdued">
                                Suggested interaction mode for this product:
                              </Text>
                              <Text as="span" fontWeight="bold">
                                {getClassicMaterialTypeLabel(
                                  previewProduct.materialType,
                                )}
                              </Text>
                            </>
                          )}
                        </InlineStack>
                      </BlockStack>
                    </Modal.Section>
                  </Modal>
                )}
              </>
            )}
          </Box>
        );
      case 2:
        return (
          <Box>
            <div
              style={{
                paddingBottom: "20px",
                display: "flex",
                flexDirection: "column",
                gap: "5px",
              }}
            >
              <Text as="h2" variant="headingLg" fontWeight="bold">
                {isLetteringFamily && isNcpcProductType
                  ? "Choose a pricing mode"
                  : "Choose a configuration model"}{" "}
                <Badge size="large">
                  {selectedClassicFamily?.label ||
                    productCategorie?.name ||
                    "Signage"}
                </Badge>
                {!isLetteringFamily && selectedClassicMaterials.length > 0 ? (
                  <Badge tone="success" size="large">
                    {selectedClassicMaterials
                      .map((material) => material.label)
                      .join(", ") || "-"}
                  </Badge>
                ) : null}
                {isLetteringFamily && productType?.name ? (
                  <Badge tone="success" size="large">
                    {productType?.name}
                  </Badge>
                ) : null}
              </Text>
              <p>
                {isLetteringFamily && isNcpcProductType
                  ? "Choose how this lettering configuration should be priced. Starter data can be decided in the final review."
                  : "Choose how customers will build this product. Starter data will be decided in the final review."}
              </p>
            </div>

            {isLetteringFamily && isNcpcProductType ? (
              <>
                <div
                  style={{
                    backgroundColor: "#F5F5F5",
                    color: "black",
                    borderRadius: "16px",
                    border: "0.07em solid #BDBDBD",
                    padding: "20px",
                  }}
                >
                  <p
                    style={{
                      fontSize: "16px",
                      fontWeight: "600",
                      marginBottom: "10px",
                    }}
                  >
                    How do you price your signs?
                  </p>
                  <p
                    style={{
                      fontSize: "14px",
                      color: "#616161",
                      marginBottom: "14px",
                    }}
                  >
                    Choose a pricing model for this NCPC configuration.
                  </p>
                  <Grid columns={{ xs: 1, sm: 2, md: 2, lg: 2, xl: 2 }}>
                    {NCPC_PRICING_OPTIONS.filter((option) =>
                      allowedNcpcPricingModes.includes(option.value),
                    ).map((option) => {
                      const isSelected = ncpcPricingMode === option.value;
                      const preview = PRICING_PREVIEW_MAP[option.value] || {
                        image:
                          "/images/configuration-examples/pricing-previews/sizes.svg",
                        tag: "Option",
                        hint: "",
                      };

                      return (
                        <Grid.Cell key={option.value}>
                          <div
                            onClick={() => setNcpcPricingMode(option.value)}
                            style={{
                              cursor: "pointer",
                              background: isSelected
                                ? "linear-gradient(160deg, #F9FEFD 0%, #F2F8F8 100%)"
                                : "#FFFFFF",
                              borderRadius: "14px",
                              border: isSelected
                                ? "2px solid rgba(1, 100, 100, 0.8)"
                                : "1px solid #D6DEE3",
                              boxShadow: isSelected
                                ? "0 10px 22px rgba(15, 23, 42, 0.08), 0 0 0 2px rgba(1, 100, 100, 0.15)"
                                : "0 3px 10px rgba(15, 23, 42, 0.04)",
                              padding: "14px 16px",
                              minHeight: "98px",
                              transition: "all 160ms ease",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                gap: "14px",
                                alignItems: "center",
                              }}
                            >
                              <div
                                style={{
                                  width: "54px",
                                  height: "54px",
                                  borderRadius: "10px",
                                  background: "#F3F6F8",
                                  border: "1px solid #D8E0E6",
                                  overflow: "hidden",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  flexShrink: 0,
                                }}
                              >
                                <img
                                  src={preview.image}
                                  alt={`${option.name} preview`}
                                  onError={(event) => {
                                    event.currentTarget.src =
                                      "/images/configuration-examples/pricing-previews/sizes.svg";
                                  }}
                                  style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "contain",
                                    objectPosition: "center",
                                  }}
                                />
                              </div>

                              <div style={{ flex: 1, minWidth: 0 }}>
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "8px",
                                    marginBottom: "2px",
                                  }}
                                >
                                  <p
                                    style={{
                                      fontSize: "14px",
                                      fontWeight: 700,
                                    }}
                                  >
                                    {option.name}
                                  </p>
                                  <span
                                    style={{
                                      fontSize: "11px",
                                      lineHeight: 1,
                                      padding: "4px 7px",
                                      borderRadius: "999px",
                                      background: isSelected
                                        ? "rgba(1, 100, 100, 0.15)"
                                        : "#F0F2F4",
                                      color: isSelected
                                        ? "rgba(1, 100, 100, 0.85)"
                                        : "#5F6368",
                                      fontWeight: 700,
                                      whiteSpace: "nowrap",
                                    }}
                                  >
                                    {preview.tag}
                                  </span>
                                </div>

                                <p
                                  style={{ fontSize: "12px", color: "#5F6368" }}
                                >
                                  {option.description}
                                </p>
                                {preview.hint ? (
                                  <p
                                    style={{
                                      fontSize: "12px",
                                      color: "#3B4146",
                                      marginTop: "6px",
                                    }}
                                  >
                                    {preview.hint}
                                  </p>
                                ) : null}
                              </div>
                            </div>
                          </div>
                        </Grid.Cell>
                      );
                    })}
                  </Grid>
                </div>
              </>
            ) : (
              <>
                <div
                  style={{
                    display: selectedClassicFamily ? "flex" : "none",
                    flexDirection: "column",
                    gap: "10px",
                    paddingTop: "20px",
                  }}
                >
                  <p style={{ fontSize: "16px", fontWeight: "600" }}>
                    Choose how customers will build this product
                  </p>
                  <p style={{ fontSize: "14px", color: "#616161" }}>
                    Both setup models are available. Pick the customer journey
                    first, then decide in the final review whether to inject
                    starter data or keep the configuration blank.
                  </p>

                  <Grid columns={{ xs: 1, sm: 2, md: 2, lg: 2, xl: 2 }}>
                    {orderedClassicConfigModels.map((model) => {
                      const isSelected = materialType === model.key;
                      const preview =
                        model.key === "simple"
                          ? {
                              image:
                                "/images/configuration-examples/pricing-previews/fixed-width.svg",
                              tag: "Flexible",
                            }
                          : {
                              image:
                                "/images/configuration-examples/pricing-previews/advanced.svg",
                              tag: "Structured",
                            };
                      const bulletPoints =
                        model.key === "simple"
                          ? [
                              "Customers choose size, shape, color and extras directly.",
                              "Best for flexible catalogs with straightforward options.",
                              "Good when each order is built from choices made one by one.",
                            ]
                          : [
                              "Customers start from predefined components or presets.",
                              "Best for guided products with prepared combinations.",
                              "Good when you want more control over the final structure.",
                            ];

                      return (
                        <Grid.Cell key={model.key}>
                          <div
                            onClick={() => selectMaterialType(model.key)}
                            style={{
                              cursor: "pointer",
                              background: "#FFFFFF",
                              color: "black",
                              borderRadius: "18px",
                              border: CARD_DEFAULT_BORDER,
                              boxShadow: isSelected
                                ? CARD_SELECTED_SHADOW
                                : CARD_DEFAULT_SHADOW,
                              padding: "18px",
                              minHeight: "100%",
                              display: "flex",
                              flexDirection: "column",
                              gap: "14px",
                              transition: "all 160ms ease",
                              position: "relative",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                gap: "14px",
                                alignItems: "flex-start",
                              }}
                            >
                              <div
                                style={{
                                  width: "62px",
                                  height: "62px",
                                  borderRadius: "12px",
                                  backgroundColor: "#EEF3F6",
                                  border: "1px solid #D6DEE3",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  overflow: "hidden",
                                  flexShrink: 0,
                                  boxShadow: isSelected
                                    ? CARD_IMAGE_SELECTED_SHADOW
                                    : "inset 0 0 0 1px rgba(255,255,255,0.45)",
                                }}
                              >
                                <img
                                  src={preview.image}
                                  alt={`${model.label} preview`}
                                  style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "contain",
                                    objectPosition: "center",
                                  }}
                                />
                              </div>

                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  gap: "6px",
                                  flex: 1,
                                  minWidth: 0,
                                }}
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    gap: "8px",
                                    alignItems: "center",
                                  }}
                                >
                                  <p
                                    style={{
                                      fontSize: "17px",
                                      fontWeight: 700,
                                      whiteSpace: "nowrap",
                                      overflow: "hidden",
                                      textOverflow: "ellipsis",
                                    }}
                                  >
                                    {model.label}
                                  </p>
                                  <InlineStack gap="100" blockAlign="center">
                                    <Badge tone="info">{preview.tag}</Badge>
                                    {isSelected && (
                                      <span
                                        style={{
                                          display: "flex",
                                          width: "fit-content",
                                          background: "#EEF2F6",
                                          color: "#475467",
                                          fontSize: "10px",
                                          borderRadius: "20px",
                                          padding: "1px 7px",
                                          height: "fit-content",
                                          flexShrink: 0,
                                        }}
                                      >
                                        selected
                                      </span>
                                    )}
                                  </InlineStack>
                                </div>

                                <p
                                  style={{
                                    color: "#5F6368",
                                    fontSize: "14px",
                                    marginTop: "1px",
                                  }}
                                >
                                  {model.description}
                                </p>
                              </div>
                            </div>

                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "10px",
                                marginTop: "4px",
                              }}
                            >
                              {bulletPoints.map((bullet) => (
                                <div
                                  key={`${model.key}-${bullet}`}
                                  style={{
                                    display: "flex",
                                    gap: "10px",
                                    alignItems: "flex-start",
                                  }}
                                >
                                  <span
                                    style={{
                                      width: "8px",
                                      height: "8px",
                                      borderRadius: "999px",
                                      background: "rgba(1, 100, 100, 0.75)",
                                      marginTop: "7px",
                                      flexShrink: 0,
                                    }}
                                  />
                                  <p
                                    style={{
                                      fontSize: "14px",
                                      color: "#344054",
                                    }}
                                  >
                                    {bullet}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </Grid.Cell>
                      );
                    })}
                  </Grid>
                </div>
              </>
            )}
          </Box>
        );
      case 3:
        return (
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <StepThreeInfoIllustration />

            <div style={{ display: "flex", gap: "10px" }}>
            <div
              style={{
                width: "70%",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                  padding: "16px",
                  backgroundColor: "#F5F5F5",
                  border: "1px solid #E0E0E0",
                  borderRadius: "14px",
                }}
              >
                <TextField
                  label="Name configuration"
                  value={formData.name}
                  onChange={handleName}
                  autoComplete="on"
                  error={
                    formData.name === "" ? "configuration name required" : ""
                  }
                />
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                  padding: "16px",
                  backgroundColor: "#F5F5F5",
                  border: "1px solid #E0E0E0",
                  borderRadius: "14px",
                }}
              >
                <TextField
                  label="Description"
                  value={formData.description}
                  onChange={handleDescription}
                  autoComplete="on"
                  error={
                    actionData?.errors &&
                    typeof actionData.errors === "object" &&
                    "description" in actionData.errors
                      ? (actionData.errors as Record<string, string[] | null>)
                          .description?.[0] || ""
                      : ""
                  }
                />
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                  padding: "16px",
                  backgroundColor: "#F5F5F5",
                  border: "1px solid #E0E0E0",
                  borderRadius: "14px",
                }}
              >
                <FileInput
                  error={
                    actionData?.errors &&
                    typeof actionData.errors === "object" &&
                    "icon" in actionData.errors
                      ? (actionData.errors as Record<string, string[] | null>)
                          .icon?.[0] || ""
                      : ""
                  }
                  title="Upload image"
                  path={formData.icon}
                  handlePath={handleIcon}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                  padding: "16px",
                  backgroundColor: "#F5F5F5",
                  border: "1px solid #E0E0E0",
                  borderRadius: "14px",
                }}
              >
                <MultiProductSelectField
                  label="Products associated with configuration"
                  buttonTitle="select"
                  selectedProducts={formData.products || []}
                  onSelectProducts={(value: any) => {
                    console.log("Client - Products selected:", value);
                    handleProducts(value);
                  }}
                  productTitles={(formData.products || []).map((p) => p.title)}
                />
              </div>
            </div>

            <div
              style={{ width: "30%", display: configuration ? "none" : "flex" }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  gap: "8px",
                  padding: "16px",
                  backgroundColor: "#F5F5F5",
                  border: "1px solid #E0E0E0",
                  borderRadius: "14px",
                }}
              >
                <p style={{ fontWeight: "700", paddingBottom: "10px" }}>
                  Summary
                </p>

                {selectedClassicFamily?.label && (
                  <p style={{ color: "#757575" }}>
                    Product family:{" "}
                    <span style={{ color: "#424242", fontWeight: "600" }}>
                      {" "}
                      {selectedClassicFamily.label}{" "}
                    </span>
                  </p>
                )}
                {!isLetteringFamily && selectedClassicMaterials.length > 0 && (
                  <p style={{ color: "#757575" }}>
                    Material:{" "}
                    <span style={{ color: "#424242", fontWeight: "600" }}>
                      {selectedClassicMaterials
                        .map((material) => material.label)
                        .join(", ") || "-"}
                    </span>
                  </p>
                )}
                {isLetteringFamily && productType?.name && (
                  <p style={{ color: "#757575" }}>
                    Lettering type:{" "}
                    <span style={{ color: "#424242", fontWeight: "600" }}>
                      {" "}
                      {productType.name}{" "}
                    </span>
                  </p>
                )}
                {isLetteringFamily && isNcpcProductType ? (
                  <>
                    <p style={{ color: "#757575" }}>
                      Pricing mode:{" "}
                      <span style={{ color: "#424242", fontWeight: "600" }}>
                        {getNcpcPricingModeLabel(ncpcPricingMode)}
                      </span>
                    </p>
                  </>
                ) : (
                  <>
                    <p style={{ color: "#757575" }}>
                      Configuration model:{" "}
                      <span style={{ color: "#424242", fontWeight: "600" }}>
                        {" "}
                        {getClassicMaterialTypeLabel(resolvedSetupModel)}{" "}
                      </span>
                    </p>
                    <p style={{ color: "#757575" }}>
                      {isLetteringFamily
                        ? "Starter data: "
                        : "Starter template: "}
                      <span style={{ color: "#424242", fontWeight: "600" }}>
                        {" "}
                {includeStarterDataChoice ? "Yes" : "No"}{" "}
                        {includeStarterDataChoice && demoName != ""
                          ? `(${demoName})`
                          : ""}{" "}
                      </span>
                    </p>
                  </>
                )}

                <p style={{ color: "#757575" }}>
                  Name:{" "}
                  <span style={{ color: "#424242", fontWeight: "600" }}>
                    {" "}
                    {formData.name}{" "}
                  </span>
                </p>
                {formData.description != "" && (
                  <p style={{ color: "#757575" }}>
                    Description:{" "}
                    <span style={{ color: "#424242", fontWeight: "600" }}>
                      {" "}
                      {formData.description}{" "}
                    </span>
                  </p>
                )}
                {formData.products && formData.products.length > 0 && (
                  <p style={{ color: "#757575" }}>
                    Associated products:{" "}
                    <span style={{ color: "#424242", fontWeight: "600" }}>
                      {" "}
                      {formData.products
                        .map((p: any) => p.title)
                        .join(", ")}{" "}
                    </span>
                  </p>
                )}
              </div>
            </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const stepLabels = [
    "Product family",
    "Material",
    isLetteringFamily ? "Pricing mode" : "Setup model",
    "Product info",
  ];

  return (
    <Page fullWidth>
      <div
        style={{
          minHeight: "100%",
          padding: "28px 20px 36px",
        }}
      >
        <div style={{ maxWidth: "1180px", margin: "0 auto" }}>
          <div
            style={{
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <Text as="h1" variant="heading2xl">
              {configuration
                ? "Update Product Configuration"
                : "Create Product Configuration"}
            </Text>
            <Text as="p" tone="subdued">
              Follow the steps to define the product, how customers will
              configure it, and how your setup should start.
            </Text>
          </div>

          {actionData?.status === false && actionData?.message && (
            <div style={{ marginBottom: "16px" }}>
              <Banner tone="critical" onDismiss={() => {}}>
                {actionData.message}
              </Banner>
            </div>
          )}

          {!configuration && (
            <div
              style={{
                position: "sticky",
                top: "0px",
                zIndex: 20,
                display: "flex",
                justifyContent: "center",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                padding: "4px 0 10px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "8px",
                  width: "100%",
                  maxWidth: "760px",
                  background: "#ffffff",
                  border: "1px solid #e3e8ef",
                  borderRadius: "999px",
                  padding: "6px 12px",
                  boxShadow: "0 6px 16px rgba(15, 23, 42, 0.05)",
                }}
              >
                {stepLabels.map((label, index) => {
                  const active = index === step;
                  const showConnector = index < stepLabels.length - 1;
                  return (
                    <div
                      key={label}
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "8px",
                        flexShrink: 0,
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                          padding: active ? "7px 14px" : "2px 0",
                          borderRadius: "999px",
                          border: active
                            ? "2px solid #38b2ac"
                            : "2px solid transparent",
                          background: "#ffffff",
                          color: active ? "#244054" : "#98a2b3",
                          whiteSpace: "nowrap",
                          flexShrink: 0,
                        }}
                      >
                        <span
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "18px",
                            height: "18px",
                            borderRadius: "999px",
                            background: active ? "#eefcf9" : "#f6f7f9",
                            color: active ? "#244054" : "#a6b0bb",
                            fontSize: "9px",
                            fontWeight: 600,
                          }}
                        >
                          {index + 1}
                        </span>
                        <span
                          style={{
                            fontSize: active ? "13px" : "12px",
                            fontWeight: active ? 700 : 500,
                            color: active ? "#244054" : "#98a2b3",
                          }}
                        >
                          {active
                            ? `Step ${index + 1}: ${label}`
                            : `Step ${index + 1}`}
                        </span>
                      </div>
                      {showConnector && (
                        <span
                          style={{
                            color: "#c4ccd6",
                            fontSize: "16px",
                            lineHeight: 1,
                            flexShrink: 0,
                          }}
                        >
                          ›
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div
            style={{
              background: "#ffffff",
              borderRadius: "24px",
              border: "1px solid rgba(204, 214, 224, 0.9)",
              boxShadow: "0 18px 48px rgba(15, 23, 42, 0.08)",
              padding: "26px",
            }}
          >
            {renderStep()}

            <div
              style={{
                marginTop: "24px",
                paddingTop: "18px",
                borderTop: "1px solid #e6ebf1",
                display: "flex",
                justifyContent: "space-between",
                gap: "16px",
                alignItems: "center",
              }}
            >
              <div style={{ color: "#667085", fontSize: "14px" }}>
                {step == 0 && (
                  <p>
                    Start with the product family. We will narrow the experience
                    in the next step.
                  </p>
                )}
                {step == 1 && (
                  <p>
                    Choose the right material first, then define how the
                    configurator should be structured.
                  </p>
                )}
                {step == 2 && (
                  <p>
                    {isLetteringFamily
                      ? "Choose the pricing mode now. Starter data can be decided in the final review."
                      : "Pick the setup model now. Starter template selection happens in the final review."}
                  </p>
                )}
                {step == 3 && (
                  <p>
                    Finish the configuration details, then create it and
                    continue in the full editor.
                  </p>
                )}
              </div>

              <div style={{ display: "flex", gap: "12px", flexShrink: 0 }}>
                {((!configuration && step == 0) || configuration) && (
                  <Button onClick={onBack} size="large">
                    Back
                  </Button>
                )}
                {!configuration && step > 0 && (
                  <Button onClick={prevStep} size="large">
                    Back
                  </Button>
                )}

                {step < 3 ? (
                  <button
                    onClick={nextStep}
                    disabled={!canProceedStep}
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(1, 100, 100, 0.95), rgba(2, 128, 128, 0.86))",
                      color: "white",
                      borderRadius: "12px",
                      padding: "10px 18px",
                      fontWeight: "700",
                      cursor: canProceedStep ? "pointer" : "not-allowed",
                      opacity: canProceedStep ? 1 : 0.55,
                      border: "none",
                      minWidth: "120px",
                    }}
                  >
                    Next
                  </button>
                ) : (
                  <button
                    disabled={isLoading || formData.name == ""}
                    type="button"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(1, 100, 100, 0.95), rgba(2, 128, 128, 0.86))",
                      color: "white",
                      borderRadius: "12px",
                      padding: "10px 18px",
                      fontWeight: "700",
                      cursor: formData.name != "" ? "pointer" : "not-allowed",
                      border: "none",
                      minWidth: "140px",
                      opacity: formData.name != "" ? 1 : 0.55,
                    }}
                    onClick={openCreationRecap}
                  >
                    <InlineStack gap="300" blockAlign="center" align="center">
                      {isSubmitting && (
                        <img
                          width="18"
                          height="18"
                          src="/loading/ic_loading_gray.svg"
                        />
                      )}
                      <span style={{ color: "white", fontWeight: "bold" }}>
                        {configuration ? "Save" : "Create"}
                      </span>
                    </InlineStack>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        size="large"
        open={Boolean(previewFamily)}
        onClose={() => setPreviewFamily(null)}
        title={
          previewFamily ? `${previewFamily.label} previews` : "Product previews"
        }
      >
        <Modal.Section>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "14px",
            }}
          >
            {(previewFamily?.previewImages || []).map(
              (imageSrc: string, index: number) => (
                <div
                  key={`${previewFamily?.key || "family"}-preview-modal-${index}`}
                  style={{
                    borderRadius: "16px",
                    overflow: "hidden",
                    border: "1px solid #E4E7EC",
                    background: "#F8FAFC",
                  }}
                >
                  <img
                    src={imageSrc}
                    alt={`${previewFamily?.label || "Product"} preview ${index + 1}`}
                    style={{
                      width: "100%",
                      height: "220px",
                      objectFit: "cover",
                      objectPosition: "center",
                    }}
                  />
                </div>
              ),
            )}
          </div>
        </Modal.Section>
      </Modal>

      <Modal
        size="large"
        open={Boolean(previewMaterial)}
        onClose={() => setPreviewMaterial(null)}
        title={
          previewMaterial
            ? `${previewMaterial.label} previews`
            : "Material previews"
        }
      >
        <Modal.Section>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "14px",
            }}
          >
            {(previewMaterial?.previewImages || [previewMaterial?.image || ""])
              .filter(Boolean)
              .map((imageSrc: string, index: number) => (
                <div
                  key={`${previewMaterial?.key || "material"}-preview-${index}`}
                  style={{
                    borderRadius: "16px",
                    overflow: "hidden",
                    border: "1px solid #E4E7EC",
                    background: "#F8FAFC",
                  }}
                >
                  <img
                    src={imageSrc}
                    alt={`${previewMaterial?.label || "Material"} preview ${index + 1}`}
                    style={{
                      width: "100%",
                      height: "220px",
                      objectFit: "cover",
                      objectPosition: "center",
                    }}
                  />
                </div>
              ))}
          </div>
        </Modal.Section>
      </Modal>

      <Modal
        size="large"
        open={showDemoData}
        onClose={() => setShowDemoData(false)}
        title={
          isLetteringFamily
            ? "Select starter data"
            : "Select a starter template"
        }
        primaryAction={{
          content: "Done",
          onAction: () => setShowDemoData(false),
        }}
      >
        <Modal.Section>
          <DemoList
            handleOnBack={() => setShowDemoData(false)}
            handleDemoId={(nextDemoId: string, nextDemoName: string) => {
              setDemoId(nextDemoId);
              setDemoName(nextDemoName);
            }}
          />
        </Modal.Section>
      </Modal>

      <Modal
        size="large"
        open={showConfigRecap}
        onClose={() => setShowConfigRecap(false)}
        title="Review configuration before creation"
        primaryAction={{
          content: configuration
            ? "Save configuration"
            : "Create configuration",
          onAction: () => {
            handleSubmit();
            setShowConfigRecap(false);
          },
          disabled: !canFinalizeCreation || formData.name === "",
        }}
        secondaryActions={[
          {
            content: "Back",
            onAction: () => setShowConfigRecap(false),
          },
        ]}
      >
        <Modal.Section>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "18px" }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1.4fr 1fr",
                gap: "16px",
              }}
            >
              <div
                style={{
                  background: "#f7f9fc",
                  border: "1px solid #dbe3ea",
                  borderRadius: "16px",
                  padding: "18px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <Text as="h3" variant="headingMd">
                  Configuration summary
                </Text>
                {selectedClassicFamily?.label && (
                  <p style={{ color: "#667085" }}>
                    Product family:{" "}
                    <span style={{ color: "#101828", fontWeight: 600 }}>
                      {selectedClassicFamily.label}
                    </span>
                  </p>
                )}
                {!isLetteringFamily && selectedClassicMaterials.length > 0 && (
                  <p style={{ color: "#667085" }}>
                    Material:{" "}
                    <span style={{ color: "#101828", fontWeight: 600 }}>
                      {selectedClassicMaterials
                        .map((material) => material.label)
                        .join(", ") || "-"}
                    </span>
                  </p>
                )}
                {isLetteringFamily && productData?.name && (
                  <p style={{ color: "#667085" }}>
                    Lettering product:{" "}
                    <span style={{ color: "#101828", fontWeight: 600 }}>
                      {productData.name}
                    </span>
                  </p>
                )}
                <p style={{ color: "#667085" }}>
                  {isLetteringFamily ? "Pricing mode: " : "Setup model: "}
                  <span style={{ color: "#101828", fontWeight: 600 }}>
                    {isLetteringFamily
                      ? getNcpcPricingModeLabel(ncpcPricingMode)
                      : getClassicMaterialTypeLabel(resolvedSetupModel)}
                  </span>
                </p>
                <p style={{ color: "#667085" }}>
                  Configuration name:{" "}
                  <span style={{ color: "#101828", fontWeight: 600 }}>
                    {formData.name || "-"}
                  </span>
                </p>
                {formData.products && formData.products.length > 0 && (
                  <p style={{ color: "#667085" }}>
                    Linked products:{" "}
                    <span style={{ color: "#101828", fontWeight: 600 }}>
                      {formData.products.map((p: any) => p.title).join(", ")}
                    </span>
                  </p>
                )}
              </div>

              <div
                style={{
                  background: "#f7f9fc",
                  border: "1px solid #dbe3ea",
                  borderRadius: "16px",
                  padding: "18px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "14px",
                }}
              >
                <Text as="h3" variant="headingMd">
                  {isLetteringFamily ? "Starter data" : "Starter template"}
                </Text>
                <Text as="p" tone="subdued">
                  {isLetteringFamily
                    ? "Decide if you want to pre-fill the lettering configuration with starter data or keep it blank."
                    : "Decide if you want to start from a ready template or create the configuration from a blank setup."}
                </Text>

                <InlineStack gap="200">
                  <button
                    type="button"
                    onClick={() => {
                      allowDemoData(false);
                      if (isLetteringFamily) {
                        setIncludeNcpcMeta(false);
                      }
                    }}
                    style={{
                      border: !includeStarterDataChoice
                        ? "2px solid rgba(1, 100, 100, 0.7)"
                        : "1px solid #b7c2cc",
                      background: !includeStarterDataChoice
                        ? "rgba(1, 100, 100, 0.08)"
                        : "#ffffff",
                      color: !includeStarterDataChoice
                        ? "rgba(1, 100, 100, 0.9)"
                        : "#475467",
                      padding: "8px 14px",
                      borderRadius: "10px",
                      fontWeight: 700,
                    }}
                  >
                    Start blank
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      allowDemoData(true);
                      if (isLetteringFamily) {
                        setIncludeNcpcMeta(true);
                      }
                    }}
                    style={{
                      border: includeStarterDataChoice
                        ? "2px solid rgba(1, 100, 100, 0.7)"
                        : "1px solid #b7c2cc",
                      background: includeStarterDataChoice
                        ? "rgba(1, 100, 100, 0.08)"
                        : "#ffffff",
                      color: includeStarterDataChoice
                        ? "rgba(1, 100, 100, 0.9)"
                        : "#475467",
                      padding: "8px 14px",
                      borderRadius: "10px",
                      fontWeight: 700,
                    }}
                  >
                    {isLetteringFamily
                      ? "Include starter data"
                      : "Include starter template"}
                  </button>
                </InlineStack>

                {includeStarterDataChoice ? (
                  <div
                    style={{
                      background: "#ffffff",
                      border: "1px solid #dbe3ea",
                      borderRadius: "14px",
                      padding: "12px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "8px",
                    }}
                  >
                    <p style={{ fontSize: "13px", color: "#667085" }}>
                      {isLetteringFamily
                        ? "Selected starter data"
                        : "Selected template"}
                    </p>
                    <p style={{ fontWeight: 700, color: "#101828" }}>
                      {demoName ||
                        (isLetteringFamily
                          ? "Choose starter data"
                          : "Choose a template")}
                    </p>
                    {isLetteringFamily ? (
                      <>
                        <div
                          style={{
                            marginTop: "4px",
                            display: "flex",
                            flexDirection: "column",
                            gap: "8px",
                          }}
                        >
                          <p style={{ fontSize: "13px", color: "#667085" }}>
                            Pre-fill colors, sizes and options from the selected
                            lettering starter preset.
                          </p>
                          <p
                            style={{
                              fontSize: "13px",
                              color: "rgba(1, 100, 100, 0.9)",
                              fontWeight: 700,
                            }}
                          >
                            Starter data will be included.
                          </p>
                        </div>
                      </>
                    ) : (
                      <p style={{ fontSize: "13px", color: "#667085" }}>
                        Automatically selected from your product family,
                        material and setup model.
                      </p>
                    )}
                  </div>
                ) : (
                  <p style={{ fontSize: "13px", color: "#667085" }}>
                    {isLetteringFamily
                      ? "No starter data will be imported. The configuration will be created from your selected pricing mode and settings only."
                      : "No starter template will be imported. The configuration will be created from your selected setup only."}
                  </p>
                )}
              </div>
            </div>
          </div>
        </Modal.Section>
      </Modal>
    </Page>
  );
}

const formSchema = z.object({
  name: z.preprocess(
    (value) => (value === "" ? undefined : value),
    z
      .string({ required_error: "Name is required" })
      .min(3, "Name is too short")
      .max(100, "Name is too long"),
  ),
  description: z.string().nullish().transform(stringTransform),
  icon: z.string().nullish().transform(stringTransform),
  popupImg: z.string().nullish().transform(stringTransform),
  productFamily: z.string().nullish().transform(stringTransform),
  productType: z.string().nullish().transform(stringTransform),
  materialType: z.string().nullish().transform(stringTransform),
  selectedMaterialKeys: z.any().transform(jsonTransform),
  demoId: z.number().nullish().nullable(),
  includeStarterData: z.string().nullish().transform(stringTransform),
  ncpcPresetKey: z.string().nullish().transform(stringTransform),
  ncpcPricingMode: z.string().nullish().transform(stringTransform),
  ncpcIncludeMeta: z.string().nullish().transform(stringTransform),
  products: z.any().transform(jsonTransform),
});

export const action = async ({ request }: ActionFunctionArgs) => {
  const { billing, session, admin } = await authenticate.admin(request);
  const plan = await getPlan(billing, session?.shop, admin);

  const formData = await request.formData();
  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  const forwardedSearchParams = new URLSearchParams();
  ["shop", "host", "embedded", "locale", "session"].forEach((key) => {
    const value = url.searchParams.get(key);
    if (value) forwardedSearchParams.set(key, value);
  });
  const forwardedSearch = forwardedSearchParams.toString()
    ? `?${forwardedSearchParams.toString()}`
    : "";
  const submission = parseWithZod(formData, { schema: formSchema });
  let demoId = null;

  if (submission.status !== "success") {
    return json({ status: false, message: null, errors: submission.error });
  }

  let configuration: any = submission.value as ConfigurationType & {
    selectedMaterialKeys?: string[];
    includeStarterData?: string;
    ncpcPresetKey?: string;
    ncpcPricingMode?: string;
    ncpcIncludeMeta?: string;
  };
  const rawSelectedMaterialKeys = formData.get("selectedMaterialKeys");
  const parsedSelectedMaterialKeys = (() => {
    if (Array.isArray(configuration.selectedMaterialKeys)) {
      return configuration.selectedMaterialKeys.map((value: any) =>
        String(value || "").trim(),
      ).filter(Boolean);
    }

    if (typeof rawSelectedMaterialKeys === "string") {
      try {
        const parsed = JSON.parse(rawSelectedMaterialKeys);
        if (Array.isArray(parsed)) {
          return parsed
            .map((value) => String(value || "").trim())
            .filter(Boolean);
        }
      } catch {}
    }

    return formData
      .getAll("selectedMaterialKeys")
      .map((value) => String(value || "").trim())
      .filter(Boolean);
  })();
  const selectedMaterialKeys = parsedSelectedMaterialKeys;
  const includeStarterData =
    configuration.includeStarterData === "true" ||
    String(formData.get("includeStarterData") || "").trim().toLowerCase() ===
      "true";
  const ncpcPresetKey = configuration.ncpcPresetKey || "";
  const ncpcPricingMode = configuration.ncpcPricingMode || "";
  const ncpcIncludeMeta = configuration.ncpcIncludeMeta === "true";
  const normalizeNcpcPricingMode = (value?: string | null) => {
    const normalized = String(value || "")
      .trim()
      .toLowerCase();
    if (normalized === "fixing-height") return "fixed-height";
    if (normalized === "fixing-width") return "fixed-width";
    return normalized;
  };

  delete configuration.ncpcPresetKey;
  delete configuration.ncpcPricingMode;
  delete configuration.ncpcIncludeMeta;
  delete configuration.includeStarterData;
  delete configuration.selectedMaterialKeys;

  const normalizedProductFamily = String(configuration.productFamily || "")
    .trim()
    .toLowerCase();
  const isLetteringCreation = normalizedProductFamily === "lettering";

  if (normalizedProductFamily && !isLetteringCreation) {
    configuration.productType = normalizedProductFamily;
    configuration.pricingMode = "frame-fit";
  }

  if (
    configuration.demoId !== null &&
    configuration.demoId !== undefined &&
    !isNaN(configuration.demoId)
  ) {
    demoId = configuration.demoId;
  }
  delete configuration.demoId;

  // FIX (server-side guard): Only treat as lettering/NCPC if productFamily is
  // explicitly "lettering". This prevents any client-side slip-through where
  // ncpcPresetKey or ncpcPricingMode was sent for a non-lettering family.
  if (
    isLetteringCreation &&
    (configuration.productType === "neon" ||
      configuration.productType === "channel")
  ) {
    const normalizedProductType =
      configuration.productType === "channel" ? "channel" : "neon";
    const normalizedPricingMode =
      normalizeNcpcPricingMode(ncpcPricingMode) || "fixed-height";
    configuration.productType = normalizedProductType;
    configuration.pricingMode = normalizedPricingMode;
  } else {
    // Ensure pricingMode and productType are never set to neon/channel values
    // for non-lettering families, regardless of what was submitted.
    configuration.pricingMode = "frame-fit";
    if (!isLetteringCreation) {
      // productType was already set above to normalizedProductFamily for non-lettering
      // Double-check: if somehow productType is still neon/channel, override it.
      const submittedPT = String(configuration.productType || "").toLowerCase();
      if (submittedPT === "neon" || submittedPT === "channel") {
        configuration.productType = normalizedProductFamily;
      }
    }
  }

  if (id) {
    configuration.id = parseInt(id);

    if (
      isLetteringCreation &&
      (configuration.productType === "neon" ||
        configuration.productType === "channel")
    ) {
      configuration.productType =
        configuration.productType === "channel" ? "channel" : "neon";
    }

    // Récupérer les anciens produits associés depuis Shopify
    const oldShopifyProducts =
      await ShopifyProductService.getProductsByConfiguration(
        admin,
        configuration.id,
      );

    // Normaliser les produits avant de sauvegarder en base de données
    let newProducts: any[] = [];
    if (configuration.products) {
      if (Array.isArray(configuration.products)) {
        newProducts = configuration.products;
      } else if (typeof configuration.products === "string") {
        try {
          const parsed = JSON.parse(configuration.products);
          newProducts = Array.isArray(parsed) ? parsed : [];
        } catch (e) {
          newProducts = [];
        }
      }
    }
    configuration.products = newProducts;

    let configurationObject: any;
    try {
      configurationObject = await ConfigurationService.updateConfiguration(
        configuration,
        session.id,
      );
    } catch (err: any) {
      const msg =
        err?.message || "Erreur lors de la mise à jour de la configuration.";
      return json({ status: false, message: msg, errors: {} });
    }

    const normalizeId = (id: string) => String(id).trim();

    const newProductIds = new Set(
      newProducts.map((p: any) => normalizeId(p.id)),
    );
    const oldProductIds = new Set(
      oldShopifyProducts.map((p: any) => normalizeId(p.id)),
    );

    console.log("DEBUG - New products IDs:", Array.from(newProductIds));
    console.log("DEBUG - Old products IDs:", Array.from(oldProductIds));

    const productsToAdd = newProducts.filter(
      (p: any) => !oldProductIds.has(normalizeId(p.id)),
    );

    const productsToRemove = oldShopifyProducts.filter(
      (p: any) => !newProductIds.has(normalizeId(p.id)),
    );

    console.log("DEBUG - Products to add:", productsToAdd);
    console.log("DEBUG - Products to remove:", productsToRemove);

    if (productsToAdd.length > 0) {
      console.log("Action - Adding products to configuration:", productsToAdd);
      await ShopifyProductService.updateMultipleProducts(
        admin,
        productsToAdd,
        configurationObject.id,
      );
    }

    if (productsToRemove.length > 0) {
      console.log(
        "Action - Removing products from configuration:",
        productsToRemove,
      );
      const productIdsToRemove = productsToRemove.map((p: any) => p.id);
      await ShopifyProductService.removeConfigurationFromProducts(
        admin,
        productIdsToRemove,
      );
    }

    if (newProducts.length === 0 && oldShopifyProducts.length > 0) {
      console.log(
        "Action - All products removed, ensuring no products are associated",
      );
      const allProductIds = oldShopifyProducts.map((p: any) => p.id);
      await ShopifyProductService.removeConfigurationFromProducts(
        admin,
        allProductIds,
      );
    }

    return redirect(
      `/app/configuration${flashMessage("Configuration updated successfully")}`,
    );
  } else {
    let newProducts: any[] = [];
    if (configuration.products) {
      if (Array.isArray(configuration.products)) {
        newProducts = configuration.products;
      } else if (typeof configuration.products === "string") {
        try {
          const parsed = JSON.parse(configuration.products);
          newProducts = Array.isArray(parsed) ? parsed : [];
        } catch (e) {
          newProducts = [];
        }
      }
    }
    configuration.products = newProducts;

    console.log(
      "Action - Creating configuration with products count:",
      newProducts.length,
    );
    console.log("Action - Products to save:", newProducts);

    let configurationObject: any;
    try {
      configurationObject = await ConfigurationService.addConfiguration(
        configuration,
        session.id,
      );
    } catch (err: any) {
      const msg =
        err?.message || "Erreur lors de la création de la configuration.";
      return json({ status: false, message: msg, errors: {} });
    }

    if (configurationObject && newProducts.length > 0) {
      console.log(
        "Action - Creating new configuration with products:",
        newProducts,
      );
      await ShopifyProductService.updateMultipleProducts(
        admin,
        newProducts,
        configurationObject.id,
      );
    }

    const configId = Number(configurationObject?.id);
    if (!configId || isNaN(configId)) {
      console.error("Invalid configuration ID:", configurationObject?.id);
      return json({
        status: false,
        message: "Failed to create configuration",
        errors: {},
      });
    }

    if (
      isLetteringCreation &&
      (configuration.productType === "neon" ||
        configuration.productType === "channel")
    ) {
      const ncpcProductType =
        configuration.productType === "channel" ? "channel" : "neon";
      const safePresetKey =
        ncpcPresetKey || getDefaultNcpcPresetKey(ncpcProductType);
      const requestedPricingMode =
        ncpcPricingMode ||
        getDefaultNcpcPricingMode(ncpcProductType, safePresetKey);
      const safePricingMode =
        requestedPricingMode === "fixing-height"
          ? "fixed-height"
          : requestedPricingMode === "fixing-width"
            ? "fixed-width"
            : requestedPricingMode;

      const createdConfiguration = await ConfigurationService.getConfiguration(
        configId,
        session.id,
      );

      if (createdConfiguration) {
        createdConfiguration.products = Array.isArray(
          createdConfiguration.product,
        )
          ? createdConfiguration.product
          : [];
        createdConfiguration.productType = ncpcProductType;
        createdConfiguration.pricingMode = safePricingMode;
        createdConfiguration.data = ncpcIncludeMeta
          ? await getNcpcPresetConfigurationData({
              productType: ncpcProductType,
              presetKey: safePresetKey,
              pricingMode: safePricingMode,
            })
          : createEmptyNcpcData(ncpcProductType);

        if (!createdConfiguration.data || !createdConfiguration.data.settings) {
          return json(
            {
              status: false,
              message: "NCPC starter data is invalid",
              errors: {},
            },
            { status: 400 },
          );
        }

        await ConfigurationService.updateConfiguration(
          createdConfiguration as ConfigurationType,
          session.id,
        );
      }

      return redirect(
        `/app/ncpc/${configId}/required-options${forwardedSearch}`,
      );
    }

    const classicStarterData = includeStarterData
      ? createClassicStarterDataFromSelection({
          productFamily: configuration.productFamily,
          productType: configuration.productType,
          materialType: configuration.materialType,
          selectedMaterialKeys,
        })
      : null;

    const classicData = buildClassicConfigurationDataFromSelection({
      baseData: configurationObject?.data,
      starterData: classicStarterData,
      productFamily: configuration.productFamily,
      productType: configuration.productType,
      materialType: configuration.materialType,
      selectedMaterialKeys: includeStarterData ? selectedMaterialKeys : [],
    });

    await prisma.configuration.update({
      where: {
        id: configId,
        sessionId: session.id,
      },
      data: {
        data: classicData,
        product: newProducts,
        materialType: configuration.materialType || null,
        productType:
          configuration.productType ||
          (normalizedProductFamily && normalizedProductFamily !== "lettering"
            ? normalizedProductFamily
            : null),
        pricingMode: "frame-fit",
      },
    });

    return redirect(
      `/app/configuration/${configId}/required-options/sizes${forwardedSearch}`,
    );
  }
};

const cloneDeep = <T,>(value: T): T =>
  JSON.parse(JSON.stringify(value ?? null));

const normalizeSelectionValue = (value: unknown) =>
  String(value || "")
    .trim()
    .toLowerCase();

const resolveMaterialPricingId = ({
  productFamily,
  materialKey,
  pricingOptions,
}: {
  productFamily?: string | null;
  materialKey?: string | null;
  pricingOptions?: any[];
}) => {
  const normalizedFamily = normalizeSelectionValue(productFamily);
  const normalizedMaterialKey = normalizeSelectionValue(materialKey);
  const options = Array.isArray(pricingOptions) ? pricingOptions : [];
  const optionIds = options.map((option) => String(option?.id || ""));

  const firstOptionId = optionIds.find(Boolean) || "";

  if (!normalizedFamily || !normalizedMaterialKey) {
    return firstOptionId;
  }

  const familyPricingMap: Record<string, Record<string, string>> = {
    "signs-panels": {
      acrylic: "pricing-signs-acrylic",
      aluminium: "pricing-signs-metal",
      brass: "pricing-signs-metal",
      "stainless-steel": "pricing-signs-metal",
      metal: "pricing-signs-metal",
      wood: "pricing-signs-wood",
      vinyl: "pricing-signs-standard",
      plastic: "pricing-signs-standard",
      "eco-friendly": "pricing-signs-standard",
      magnet: "pricing-signs-standard",
      "photo-paper": "pricing-signs-standard",
    },
    banners: {
      mesh: "pricing-banners-mesh",
      fabric: "pricing-banners-fabric",
      vinyl: "pricing-banners-standard",
    },
    stickers: {
      vinyl: "pricing-stickers-vinyl",
      pvc: "pricing-stickers-premium",
      paper: "pricing-stickers-standard",
      film: "pricing-stickers-laminated",
    },
  };

  const mappedId =
    familyPricingMap[normalizedFamily]?.[normalizedMaterialKey] || firstOptionId;

  return optionIds.includes(mappedId) ? mappedId : firstOptionId;
};

const filterRulesByAllowedMaterials = (
  rulesByMaterial: Record<string, any> | undefined,
  allowedMaterialIds: string[],
) => {
  if (!rulesByMaterial || typeof rulesByMaterial !== "object") {
    return rulesByMaterial;
  }

  if (!allowedMaterialIds.length) {
    return cloneDeep(rulesByMaterial);
  }

  return Object.fromEntries(
    Object.entries(rulesByMaterial).filter(([materialId]) =>
      allowedMaterialIds.includes(String(materialId)),
    ),
  );
};

const pruneItemsByAllowedMaterials = (
  items: any[],
  allowedMaterialIds: string[],
) => {
  if (!Array.isArray(items)) return [];
  if (!allowedMaterialIds.length) return cloneDeep(items);

  return items
    .map((item) => {
      const nextItem = cloneDeep(item);

      if (
        nextItem?.rulesByMaterial &&
        typeof nextItem.rulesByMaterial === "object"
      ) {
        nextItem.rulesByMaterial = filterRulesByAllowedMaterials(
          nextItem.rulesByMaterial,
          allowedMaterialIds,
        );

        if (Object.keys(nextItem.rulesByMaterial || {}).length === 0) {
          return null;
        }
      }

      return nextItem;
    })
    .filter(Boolean);
};

const buildSelectedMaterials = ({
  starterData,
  productFamily,
  selectedMaterialKeys,
  materialType,
}: {
  starterData: any;
  productFamily?: string | null;
  selectedMaterialKeys?: string[] | null;
  materialType?: string | null;
}) => {
  const starterMaterials = Array.isArray(
    starterData?.additionalOptions?.materials?.items,
  )
    ? starterData.additionalOptions.materials.items
    : [];
  const familyMaterials = getAsoClassicMaterialsForFamily(
    String(productFamily || ""),
  );
  const selectedKeys = Array.isArray(selectedMaterialKeys)
    ? selectedMaterialKeys
    : [];

  if (selectedKeys.length === 0) {
    return starterMaterials.length > 0 ? cloneDeep(starterMaterials) : [];
  }

  const selectedCatalogMaterials = familyMaterials.filter((material) =>
    selectedKeys.includes(material.key),
  );
  const pricingOptions = Array.isArray(
    starterData?.requiredOptions?.pricing?.priceOptions,
  )
    ? starterData.requiredOptions.pricing.priceOptions
    : [];

  const selectedStarterMaterials = starterMaterials.filter((material: any) => {
    const materialId = normalizeSelectionValue(material?.id);
    const materialLabel = normalizeSelectionValue(
      material?.label || material?.name,
    );

    return selectedCatalogMaterials.some((selectedMaterial) => {
      const selectedKey = normalizeSelectionValue(selectedMaterial?.key);
      const selectedLabel = normalizeSelectionValue(selectedMaterial?.label);
      return (
        (selectedKey && materialId.includes(selectedKey)) ||
        (selectedLabel && materialLabel === selectedLabel)
      );
    });
  });

  if (selectedStarterMaterials.length > 0) {
    return selectedStarterMaterials.map((material: any, index: number) => {
      const matchingCatalog = selectedCatalogMaterials.find((selected) => {
        const materialId = normalizeSelectionValue(material?.id);
        const materialLabel = normalizeSelectionValue(
          material?.label || material?.name,
        );
        const selectedKey = normalizeSelectionValue(selected?.key);
        const selectedLabel = normalizeSelectionValue(selected?.label);
        return (
          (selectedKey && materialId.includes(selectedKey)) ||
          (selectedLabel && materialLabel === selectedLabel)
        );
      });

      return {
        ...cloneDeep(material),
        label:
          material?.label ||
          material?.name ||
          matchingCatalog?.label ||
          "Material",
        image: material?.image || matchingCatalog?.image || "",
        previewImg:
          material?.previewImg || material?.image || matchingCatalog?.image || "",
        type: materialType === "advance" ? "advance" : "simple",
        active: true,
        isDefault: index === 0,
        pricingId:
          material?.pricingId ||
          resolveMaterialPricingId({
            productFamily,
            materialKey: matchingCatalog?.key,
            pricingOptions,
          }),
      };
    });
  }

  return selectedCatalogMaterials.map((material, index) => ({
    id: `material-${material.key}`,
    sourceIndex: index,
    label: material.label,
    description: "",
    previewImg: material.image || "",
    popupImg: "",
    image: material.image || "",
    popupImage: "",
    type: materialType === "advance" ? "advance" : "simple",
    active: true,
    isDefault: index === 0,
    additionalPrice: 0,
    pricingId: resolveMaterialPricingId({
      productFamily,
      materialKey: material.key,
      pricingOptions,
    }),
    excludeComponentIds: [],
  }));
};

const createClassicEmptyConfigurationData = ({
  productFamily,
  productType,
  materialType,
}: {
  productFamily?: string | null;
  productType?: string | null;
  materialType?: string | null;
}) => {
  const isAdvance = normalizeSelectionValue(materialType) === "advance";

  return {
    materialType: materialType || "",
    productType: productType || "",
    pricingMode: "frame-fit",
    configuratorMeta: {
      version: 1,
      structure: "modular-classic",
    },
    requiredOptions: {
      pricing: {
        mode: "frame-fit",
        priceOptions: [],
        items: [],
      },
      sizes: {
        label: "Sizes",
        description: "",
        items: [],
      },
      fixingMethods: {
        label: "Fixing Methods",
        description: "",
        items: [],
      },
      shapes: {
        label: "Shapes",
        description: "",
        items: [],
      },
      borders: {
        label: "Borders",
        description: "",
        items: [],
      },
      fonts: {
        label: "Fonts",
        description: "",
        items: [],
      },
      colors: {
        label: "Colors",
        description: "",
        customColors: {
          active: false,
          label: "Custom Colors",
          prevImg: "",
        },
        items: [],
      },
      ...(isAdvance
        ? {
            components: {
              label: "Components",
              description: "",
              items: [],
            },
          }
        : {}),
    },
    additionalOptions: {
      materials: {
        label: "Materials",
        description: "",
        items: [],
      },
      inputs: {
        label: "Inputs",
        description: "",
        items: [],
      },
      ...(!isAdvance
        ? {
            components: {
              label: "Additional Components",
              description: "",
              items: [],
            },
          }
        : {}),
    },
    settings: {
      customizerSign: {
        customizerOptions: {
          measurementUnit: "mm",
          desktopColumnOrder: "right",
          showHideMeasurements: "both",
          decimalFormatMeasurements: "with-decimal",
          showThicknessPricing: false,
          expandThicknessByDefault: false,
          expandPredefinedSizesByDefault: false,
        },
        text: {
          selectedFonts: [],
        },
      },
    },
  };
};

const createClassicStarterMaterials = ({
  productFamily,
  selectedMaterialKeys,
  materialType,
}: {
  productFamily?: string | null;
  selectedMaterialKeys?: string[] | null;
  materialType?: string | null;
}) =>
  buildSelectedMaterials({
    starterData: null,
    productFamily,
    selectedMaterialKeys,
    materialType,
  });

const createClassicStarterDataFromSelection = ({
  productFamily,
  productType,
  materialType,
  selectedMaterialKeys,
}: {
  productFamily?: string | null;
  productType?: string | null;
  materialType?: string | null;
  selectedMaterialKeys?: string[] | null;
}) => {
  const isAdvance = normalizeSelectionValue(materialType) === "advance";
  const familyKey = String(productFamily || "")
    .trim()
    .toLowerCase() as "signs-panels" | "banners" | "stickers";
  const familyStarterContent =
    classicStarterFamilyContent[familyKey] ||
    classicStarterFamilyContent["signs-panels"];
  const starterTemplate = cloneDeep(
    isAdvance
      ? classicPresetComponentsStarterData
      : classicBuildByOptionsStarterData,
  );
  const starterData = {
    ...createClassicEmptyConfigurationData({
      productFamily,
      productType,
      materialType,
    }),
    ...starterTemplate,
  };
  const starterMaterials = createClassicStarterMaterials({
    productFamily,
    selectedMaterialKeys,
    materialType,
  });
  const starterMaterialIds = starterMaterials
    .map((material: any) => String(material?.id || "").trim())
    .filter(Boolean);
  const starterSelectedFontIds = Array.isArray(familyStarterContent.fonts)
    ? familyStarterContent.fonts
        .map((item: any) => Number(item?.managedFontId ?? item?.id))
        .filter((value: number) => Number.isFinite(value) && value > 0)
    : [];

  starterData.requiredOptions.pricing = cloneDeep(
    familyStarterContent.pricing || {
      label: "Pricing",
      description: "",
      mode: "frame-fit",
      priceOptions: [],
      items: [],
    },
  );
  starterData.requiredOptions.pricing.mode =
    starterData.requiredOptions.pricing.mode || "frame-fit";
  starterData.requiredOptions.pricing.items = Array.isArray(
    starterData.requiredOptions.pricing.items,
  )
    ? starterData.requiredOptions.pricing.items
    : [];
  starterData.requiredOptions.sizes.items = cloneDeep(
    familyStarterContent.sizes,
  );
  starterData.requiredOptions.fixingMethods.items = cloneDeep(
    familyStarterContent.fixingMethods,
  );
  starterData.requiredOptions.shapes.items = cloneDeep(
    familyStarterContent.shapes,
  );
  starterData.requiredOptions.borders.items = cloneDeep(
    familyStarterContent.borders,
  );
  starterData.requiredOptions.fonts.items = cloneDeep(
    familyStarterContent.fonts || [],
  );
  starterData.requiredOptions.colors = {
    ...(starterData.requiredOptions.colors || {}),
    customColors: cloneDeep(
      familyStarterContent.colors?.customColors || {
        active: false,
        label: "Custom Colors",
        prevImg: "",
      },
    ),
    items: cloneDeep(familyStarterContent.colors?.items || []),
  };
  starterData.additionalOptions.materials.items = starterMaterials;
  starterData.additionalOptions.inputs.items = cloneDeep(
    familyStarterContent.inputs || [],
  );
  starterData.settings.customizerSign.text.selectedFonts =
    starterSelectedFontIds;

  if (isAdvance) {
    starterData.requiredOptions.components = {
      label: "Components",
      description: "",
      items: cloneDeep(familyStarterContent.requiredComponents),
    };
    delete starterData.additionalOptions.components;
  } else {
    const rulesByMaterial = starterMaterialIds.reduce<
      Record<string, { enabled: boolean }>
    >((acc, materialId) => {
      acc[materialId] = { enabled: true };
      return acc;
    }, {});

    starterData.additionalOptions.components = {
      label: "Additional Components",
      description: "",
      items: cloneDeep(familyStarterContent.additionalComponents).map(
        (item: any) => ({
          ...item,
          rulesByMaterial,
        }),
      ),
    };
    delete starterData.requiredOptions.components;
  }

  return starterData;
};

const buildClassicConfigurationDataFromSelection = ({
  baseData,
  starterData,
  productFamily,
  productType,
  materialType,
  selectedMaterialKeys,
}: {
  baseData: any;
  starterData?: any;
  productFamily?: string | null;
  productType?: string | null;
  materialType?: string | null;
  selectedMaterialKeys?: string[] | null;
}) => {
  const baseSettings = cloneDeep(baseData?.settings || {});
  const starter = starterData ? cloneDeep(starterData) : null;
  const isAdvance = normalizeSelectionValue(materialType) === "advance";

  if (!starter) {
    const emptyData = createClassicEmptyConfigurationData({
      productFamily,
      productType,
      materialType,
    });
    const selectedMaterials = buildSelectedMaterials({
      starterData: null,
      productFamily,
      selectedMaterialKeys,
      materialType,
    });

    emptyData.additionalOptions.materials.items = selectedMaterials;

    return {
      ...emptyData,
      settings: {
        ...(emptyData.settings || {}),
        ...baseSettings,
      },
    };
  }

  const nextData = createClassicEmptyConfigurationData({
    productFamily,
    productType,
    materialType,
  });

  const selectedMaterials = buildSelectedMaterials({
    starterData: starter,
    productFamily,
    selectedMaterialKeys,
    materialType,
  });
  const allowedMaterialIds = selectedMaterials.map((material: any) =>
    String(material?.id || ""),
  );

  nextData.requiredOptions = {
    pricing: cloneDeep(
      starter?.requiredOptions?.pricing || {
        label: "Pricing",
        description: "",
        mode: "frame-fit",
        priceOptions: [],
        items: [],
      },
    ),
    sizes: {
      ...(starter?.requiredOptions?.sizes
        ? cloneDeep(starter.requiredOptions.sizes)
        : {}),
      items: Array.isArray(starter?.requiredOptions?.sizes?.items)
        ? cloneDeep(starter.requiredOptions.sizes.items)
        : [],
    },
    fixingMethods: {
      ...(starter?.requiredOptions?.fixingMethods
        ? cloneDeep(starter.requiredOptions.fixingMethods)
        : {}),
      items: Array.isArray(starter?.requiredOptions?.fixingMethods?.items)
        ? pruneItemsByAllowedMaterials(
            starter.requiredOptions.fixingMethods.items,
            allowedMaterialIds,
          )
        : [],
    },
    shapes: {
      ...(starter?.requiredOptions?.shapes
        ? cloneDeep(starter.requiredOptions.shapes)
        : {}),
      items: Array.isArray(starter?.requiredOptions?.shapes?.items)
        ? pruneItemsByAllowedMaterials(
            starter.requiredOptions.shapes.items,
            allowedMaterialIds,
          )
        : [],
    },
    borders: {
      ...(starter?.requiredOptions?.borders
        ? cloneDeep(starter.requiredOptions.borders)
        : {}),
      items: Array.isArray(starter?.requiredOptions?.borders?.items)
        ? pruneItemsByAllowedMaterials(
            starter.requiredOptions.borders.items,
            allowedMaterialIds,
          )
        : [],
    },
    fonts: {
      ...(starter?.requiredOptions?.fonts
        ? cloneDeep(starter.requiredOptions.fonts)
        : {}),
      items: Array.isArray(starter?.requiredOptions?.fonts?.items)
        ? cloneDeep(starter.requiredOptions.fonts.items)
        : [],
    },
    colors: {
      ...(starter?.requiredOptions?.colors
        ? cloneDeep(starter.requiredOptions.colors)
        : {}),
      items: Array.isArray(starter?.requiredOptions?.colors?.items)
        ? pruneItemsByAllowedMaterials(
            starter.requiredOptions.colors.items,
            allowedMaterialIds,
          )
        : [],
    },
  };

  if (isAdvance) {
    nextData.requiredOptions.components = cloneDeep(
      starter?.requiredOptions?.components || {
          label: "Components",
          description: "",
          items: [],
        },
    );
  } else {
    delete nextData.requiredOptions.components;
  }

  nextData.additionalOptions = {
    materials: {
      ...(starter?.additionalOptions?.materials
        ? cloneDeep(starter.additionalOptions.materials)
        : {}),
      items: selectedMaterials,
    },
    inputs: {
      ...(starter?.additionalOptions?.inputs
        ? cloneDeep(starter.additionalOptions.inputs)
        : {}),
      items: Array.isArray(starter?.additionalOptions?.inputs?.items)
        ? pruneItemsByAllowedMaterials(
            starter.additionalOptions.inputs.items,
            allowedMaterialIds,
          )
        : [],
    },
  };

  if (isAdvance) {
    delete nextData.additionalOptions.components;
  } else {
    nextData.additionalOptions.components = {
      ...(starter?.additionalOptions?.components
        ? cloneDeep(starter.additionalOptions.components)
        : {}),
      items: Array.isArray(starter?.additionalOptions?.components?.items)
        ? pruneItemsByAllowedMaterials(
            starter.additionalOptions.components.items,
            allowedMaterialIds,
          )
        : [],
    };
  }

  const selectedFonts = Array.isArray(
    starter?.settings?.customizerSign?.text?.selectedFonts,
  )
    ? cloneDeep(starter.settings.customizerSign.text.selectedFonts)
    : [];

  nextData.settings = {
    ...(nextData.settings || {}),
    ...baseSettings,
    customizerSign: {
      ...(baseSettings?.customizerSign || {}),
      ...(nextData.settings?.customizerSign || {}),
      text: {
        ...(baseSettings?.customizerSign?.text || {}),
        ...(nextData.settings?.customizerSign?.text || {}),
        ...(selectedFonts.length > 0 ? { selectedFonts } : {}),
      },
    },
  };

  return nextData;
};
