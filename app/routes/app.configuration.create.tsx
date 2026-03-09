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
import { useCallback, useEffect, useMemo, useState } from "react";

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
import { configurationDemoData } from "~/models/demoData";
import { PRICING_PLANS } from "~/utils/pricing";
import { SearchIcon } from "@shopify/polaris-icons";
import { AppearanceItem } from "./app.configuration.$id.demo";
import { BackBtn } from "~/components/buttons/BackBtn";
import { BiSaveBtn } from "~/components/buttons/BiSaveBtn";
import { configFilter } from "~/utils/config-filter";
import FontService from "~/models/Font.service";
import {  fontData } from "~/models/demoData";
import { getPlan } from "~/utils/pricing-server.server";
import { MultiProductSelectField } from "~/components/inputs/MultiProductSelectField";
import {
  getAllowedNcpcPricingModes,
  getDefaultNcpcPresetKey,
  getDefaultNcpcPricingMode,
  NCPC_PRICING_OPTIONS,
} from "~/utils/ncpc-presets";

import { ArrowLeftIcon, ArrowRightIcon } from "@shopify/polaris-icons"; 

const LETTERING_CATEGORY_TYPE = "lettering";
const LETTERING_PRODUCT_TYPES = ["neon", "channel"] as const;


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
    const dbProducts = Array.isArray(configuration.product) ? configuration.product : [];
    
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
              if (typeof product === 'string' || (product && product.id)) {
                const productId = typeof product === 'string' ? product : product.id;
                // Note: On garde le produit tel quel car on ne peut pas facilement récupérer le titre ici
                // Le titre sera mis à jour lors de la sélection dans le picker
                return { id: productId, title: product.title || 'Product' };
              }
              
              return product;
            } catch (error) {
              console.log("Error verifying product:", error);
              return product;
            }
          })
        );
        
        finalProducts = verifiedProducts.filter((p: any) => p !== null && p !== undefined);
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
  // console.log("action data :", actionData);
  let { configuration } = useLoaderData<typeof loader>();
  
  // console.log("configuration :", configuration);
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

  // let signageOption = {
  //   name: "Signage",
  //   type: "signage",
  //   productCategories: [
  //     {
  //       name: "Signboard",
  //       type: "signboard",
  //       description: "Rigid panel / PVC/ Aluminum/ Plexiglass/ Wood/ Painted or stainless metal",
  //       demoLink: "https://demos.signsdesigner.us/aso-templates-page/asowp-templates/196/#/",
  //       productGroups: [
  //         {
  //           name: "Bussiness & Office",
  //           products: [
  //             {
  //               name: "Door signs",
  //               description: "Office doors, meeting rooms, name plates",
  //               type: "",
  //               demoData: "",
  //               materialType: "all"
  //             },
  //             {
  //               name: "Vinyl signs",
  //               description: "Office doors, meeting rooms, name plates",
  //               type: "",
  //               demoData: "",
  //               materialType: "simple"
  //             },
  //             {
  //               name: "Plastic signs",
  //               description: "Office doors, meeting rooms, name plates",
  //               type: "",
  //               demoData: "",
  //               materialType: "all"
  //             },
  //             {
  //               name: "Stainless metal signs",
  //               description: "Office doors, meeting rooms, name plates",
  //               type: "",
  //               demoData: "",
  //               materialType: "all"
  //             },
  //           ]
  //         },
  //         {
  //           name: "Retail & Outdoor",
  //           products: [
  //             {
  //               name: "Acrylic signs",
  //               description: "Office doors, meeting rooms, name plates",
  //               type: "",
  //               demoData: "",
  //               materialType: "all"
  //             },
  //             {
  //               name: "Aluminum signs",
  //               description: "Office doors, meeting rooms, name plates",
  //               type: "",
  //               demoData: "",
  //               materialType: "all"
  //             },
  //             {
  //               name: "Brass signs",
  //               description: "Office doors, meeting rooms, name plates",
  //               type: "",
  //               demoData: "",
  //               materialType: "advanca"
  //             },
  //             {
  //               name: "Wood signs",
  //               description: "Office doors, meeting rooms, name plates",
  //               type: "",
  //               demoData: "",
  //               materialType: "advanca"
  //             },
              
  //           ]
  //         },
  //         {
  //           name: "Specialized & Industrial",
  //           products: [
  //             {
  //               name: "Letterbox signs",
  //               description: "Office doors, meeting rooms, name plates",
  //               type: "",
  //               demoData: "",
  //               materialType: "all"
  //             },  
  //             {
  //               name: "Decals",
  //               description: "Office doors, meeting rooms, name plates",
  //               type: "",
  //               demoData: "",
  //               materialType: "all"
  //             },
  //             {
  //               name: "Vinyl lettering",
  //               description: "Office doors, meeting rooms, name plates",
  //               type: "",
  //               demoData: "",
  //               materialType: "simple"
  //             },
  //           ]
  //         },
  //       ]
  //     },
  //     {
  //       name: "Banners",
  //       type: "banner",
  //       description: "PVC/ Mesh/ Double‑sided/ fabric, etc..",
  //       demoLink: "https://demos.signsdesigner.us/aso-templates-page/asowp-templates/222/#/",
  //       productGroups: [
  //         {
  //           name: "Bussiness & Office",
  //           products: [
  //             {
  //               name: "Roll up",
  //               description: "Office doors, meeting rooms, name plates",
  //               type: "",
  //               demoData: "",
  //               materialType: "all"
  //             },
  //             {
  //               name: "Double sided",
  //               description: "Office doors, meeting rooms, name plates",
  //               type: "",
  //               demoData: "",
  //               materialType: "simple"
  //             }
  //           ]
  //         },
  //         {
  //           name: "Retail & Outdoor",
  //           products: [
  //             {
  //               name: "Pvc banner",
  //               description: "Office doors, meeting rooms, name plates",
  //               type: "",
  //               demoData: "",
  //               materialType: "all"
  //             },
  //             {
  //               name: "Mesh banner",
  //               description: "Office doors, meeting rooms, name plates",
  //               type: "",
  //               demoData: "",
  //               materialType: "all"
  //             }
              
  //           ]
  //         }
  //       ]
  //     },
  //     {
  //       name: "Stickers",
  //       type: "sticker",
  //       description: "Vinyl/ die-cut/ Self‑adhesive paper/ matte/ glossy/ UV‑resistant, etc..",
  //       demoLink: "https://demos.signsdesigner.us/aso-templates-page/asowp-templates/885/#/",
  //       productGroups: [
  //         {
  //           name: "Bussiness & Office",
  //           products: [
  //             {
  //               name: "Vynil sticker",
  //               description: "Office doors, meeting rooms, name plates",
  //               type: "",
  //               demoData: "",
  //               materialType: "all"
  //             },
  //             {
  //               name: "Die-cut",
  //               description: "Office doors, meeting rooms, name plates",
  //               type: "",
  //               demoData: "",
  //               materialType: "simple"
  //             },
  //             {
  //               name: "Self adhesive",
  //               description: "Office doors, meeting rooms, name plates",
  //               type: "",
  //               demoData: "",
  //               materialType: "simple"
  //             },
  //           ]
  //         },
  //         {
  //           name: "Retail & Outdoor",
  //           products: [
  //             {
  //               name: "Matte sticker",
  //               description: "Office doors, meeting rooms, name plates",
  //               type: "",
  //               demoData: "",
  //               materialType: "all"
  //             },
  //             {
  //               name: "Glossy sticker",
  //               description: "Office doors, meeting rooms, name plates",
  //               type: "",
  //               demoData: "",
  //               materialType: "all"
  //             },
  //             {
  //               name: "Holographic sticker",
  //               description: "Office doors, meeting rooms, name plates",
  //               type: "",
  //               demoData: "",
  //               materialType: "simple"
  //             },
              
  //           ]
  //         }
  //       ]
  //     },
  //   ]
  // }

  let signageOption = {
    name: "Signage",
    type: "signage", 
    productCategories: [
      {
        name: "Signboard",
        type: "signboard",
        description: "Rigid panels (PVC, Alu, Wood, Acrylic) for permanent display.",
        demoLink: "https://demos.signsdesigner.us/aso-templates-page/asowp-templates/196/#/",
        productGroups: [
          {
            name: "Business & Office",
            products: [
              {
                name: "Door signs",
                image: ["https://signsdesigner.us/app/aso_products_preview/door_signs/image_1.webp", "https://signsdesigner.us/app/aso_products_preview/door_signs/image_2.webp", "https://signsdesigner.us/app/aso_products_preview/door_signs/image_3.webp"],
                description: "Office doors, meeting rooms, name plates.",
                type: "door-sign",
                demoData: "",
                materialType: "simple"
              },
              {
                name: "Name badges",
                description: "Name tags for staff and reception.",
                image: ["https://signsdesigner.us/app/aso_products_preview/name_badges/image_1.webp", "https://signsdesigner.us/app/aso_products_preview/name_badges/image_2.webp", "https://signsdesigner.us/app/aso_products_preview/name_badges/image_3.webp", "https://signsdesigner.us/app/aso_products_preview/name_badges/image_4.webp"],
                type: "name-badge",
                demoData: "",
                materialType: "simple"
                // materialType: "all"
              },
              {
                name: "Acrylic signs",
                description: "Premium plexiglass plates for offices.",
                image: ["https://signsdesigner.us/app/aso_products_preview/acrylic_signs/image_1.webp", "https://signsdesigner.us/app/aso_products_preview/acrylic_signs/image_2.webp", "https://signsdesigner.us/app/aso_products_preview/acrylic_signs/image_3.webp", "https://signsdesigner.us/app/aso_products_preview/acrylic_signs/image_4.webp"],
                type: "acrylic-sign",
                demoData: "",
                materialType: "simple"
              },
              {
                name: "Double-sided signs",
                description: "Hanging or projecting double-sided panels.",
                image: ["https://signsdesigner.us/app/aso_products_preview/double_sided_signs/image_1.webp", "https://signsdesigner.us/app/aso_products_preview/double_sided_signs/image_2.webp"],
                type: "double-sided-sign",
                demoData: "",
                materialType: "simple"
              }
            ]
          },
          {
            name: "Retail & Outdoor",
            products: [
              {
                name: "Wood signs",
                description: "Decorative wood boards for cafés & shops.",
                image: ["https://signsdesigner.us/app/aso_products_preview/wood_signs/image_1.webp", "https://signsdesigner.us/app/aso_products_preview/wood_signs/image_2.webp", "https://signsdesigner.us/app/aso_products_preview/wood_signs/image_3.webp"],
                type: "wood-sign",
                demoData: "",
                materialType: "simple"
              },
              {
                name: "Magnetic signs",
                description: "Removable magnetic panels for vehicles.",
                image: ["https://signsdesigner.us/app/aso_products_preview/magnetic_signs/image_1.webp"],
                type: "magnetic-sign",
                demoData: "",
                materialType: "simple"
              },
              {
                name: "House signs",
                description: "Outdoor house numbers and name plaques.",
                image: ["https://signsdesigner.us/app/aso_products_preview/house_signs/image_1.webp", "https://signsdesigner.us/app/aso_products_preview/house_signs/image_2.webp"],
                type: "house-sign",
                demoData: "",
                materialType: "simple"
                // materialType: "all",
              },
              {
                name: "Plastic signs",
                description: "PVC / Eco board signs for shops and events.",
                image: ["https://signsdesigner.us/app/aso_products_preview/plastic_signs/image_1.webp", "https://signsdesigner.us/app/aso_products_preview/plastic_signs/image_2.webp", "https://signsdesigner.us/app/aso_products_preview/plastic_signs/image_3.webp", "https://signsdesigner.us/app/aso_products_preview/plastic_signs/image_4.webp", "https://signsdesigner.us/app/aso_products_preview/plastic_signs/image_5.webp"],
                type: "gate-sign",
                demoData: "",
                materialType: "simple",
                // materialType: "all"
              }
            ]
          },
          {
            name: "Specialized & Industrial",
            products: [
              {
                name: "Brass signs",
                description: "Engraved brass plates for professionals.",
                image: ["https://signsdesigner.us/app/aso_products_preview/brass_signs/image_1.webp", "https://signsdesigner.us/app/aso_products_preview/brass_signs/image_2.webp", "https://signsdesigner.us/app/aso_products_preview/brass_signs/image_3.webp"],
                type: "plastic-sign",
                demoData: "",
                materialType: "advance"
              },
              {
                name: "Stainless steel signs",
                description: "Durable plates for factories & technical areas.",
                image: ["https://signsdesigner.us/app/aso_products_preview/stainless_steel_signs/image_1.webp", "https://signsdesigner.us/app/aso_products_preview/stainless_steel_signs/image_2.webp"],
                type: "warning-sign",
                demoData: "",
                materialType: "advance",
                // materialType: "all"
              },
              {
                name: "Labels and plates",
                description: "Small information or identification plates.",
                image: ["https://signsdesigner.us/app/aso_products_preview/name_badges/image_1.webp", "https://signsdesigner.us/app/aso_products_preview/name_badges/image_2.webp", "https://signsdesigner.us/app/aso_products_preview/name_badges/image_3.webp", "https://signsdesigner.us/app/aso_products_preview/name_badges/image_4.webp"],
                type: "brass-sign",
                demoData: "",
                materialType: "simple"
              }
              // {
              //   name: "Cable tags",
              //   description: "Technical labels and cable identification tags.",
              //   type: "reflective-sign",
              //   demoData: "",
              //   materialType: "advanced"
              // }
            ]
          }
        ]
      },
      {
        name: "Banners",
        type: "banner",
        description: "Flexible large-format printing for events and promos.",
        demoLink: "https://demos.signsdesigner.us/aso-templates-page/asowp-templates/196/#/",
        productGroups: [
          {
            name: "Standard banners",
            products: [
              {
                name: "Banners signs",
                description: "Standard promotional banners (indoor / outdoor).",
                image: ["https://signsdesigner.us/app/aso_products_preview/banners_signs/image_1.webp", "https://signsdesigner.us/app/aso_products_preview/banners_signs/image_2.webp", "https://signsdesigner.us/app/aso_products_preview/banners_signs/image_3.webp", "https://signsdesigner.us/app/aso_products_preview/banners_signs/image_4.webp"],
                type: "roll-up",
                demoData: "",
                materialType: "simple"
              },
              // {
              //   name: "Mesh / Facric banners",
              //   description: "Wind-proof or textile banners for façades and events.",
              //   type: "roll-up",
              //   demoData: "",
              //   materialType: "simple"
              // },
              {
                name: "Posters",
                description: "Large format posters used like lightweight banners.",
                image: ["https://signsdesigner.us/app/aso_products_preview/posters/image_1.webp", "https://signsdesigner.us/app/aso_products_preview/posters/image_2.webp", "https://signsdesigner.us/app/aso_products_preview/posters/image_3.webp"],
                type: "roll-up",
                demoData: "",
                materialType: "simple"
              },
            ]
          },
          {
            name: "With structure",
            products: [
              {
                name: "Roll-up banners",
                description: "Roll-up banners with cassette and stand.",
                image: ["https://signsdesigner.us/app/aso_products_preview/pull-up_banners/image_1.webp", "https://signsdesigner.us/app/aso_products_preview/pull-up_banners/image_2.webp", "https://signsdesigner.us/app/aso_products_preview/pull-up_banners/image_3.webp"],
                type: "vinyl-banner",
                demoData: "",
                materialType: "simple",
                // materialType: "all",
              },
              // {
              //   name: "X-banner",
              //   description: "X-frame banners for events and exhibitions.",
              //   type: "poster",
              //   demoData: "",
              //   materialType: "simple"
              // }
            ]
          }
        ]
      },
      {
        name: "Stickers",
        type: "sticker",
        description: "Adhesive vinyls and decals for smooth surfaces.",
        demoLink: "https://demos.signsdesigner.us/aso-templates-page/asowp-templates/196/#/",
        productGroups: [
          {
            name: "General stickers",
            products: [
              {
                name: "Vinyl lettering",
                description: "Cut vinyl text for windows, doors, or walls",
                image: ["https://signsdesigner.us/app/aso_products_preview/vinyl_lettering/image_1.webp", "https://signsdesigner.us/app/aso_products_preview/vinyl_lettering/image_2.webp", "https://signsdesigner.us/app/aso_products_preview/vinyl_lettering/image_3.webp"],
                type: "vinyl-lettering",
                demoData: "",
                materialType: "simple"
              },
              {
                name: "Decals",
                description: "Printed decals for logos, products, or branding.",
                image: ["https://signsdesigner.us/app/aso_products_preview/decals/image_1.webp"],
                type: "decal",
                demoData: "",
                materialType: "simple"
              }
            ]
          },
          {
            name: "Cut & special use",
            products: [
              {
                name: "Contour-cut / die-cut",
                description: "Stickers following the exact shape of the design.",
                image: ["https://signsdesigner.us/app/aso_products_preview/contour-cut/image_1.webp", "https://signsdesigner.us/app/aso_products_preview/contour-cut/image_2webp", "https://signsdesigner.us/app/aso_products_preview/contour-cut/image_3.webp"],
                type: "label",
                demoData: "",
                materialType: "simple"
              },
              // {
              //   name: "Sheet of stickers",
              //   description: "Multiple designs on a single sticker sheet.",
              //   type: "cable-label",
              //   demoData: "",
              //   materialType: "simple"
              // },
              // {
              //   name: "Transparent / decal sticker",
              //   description: "Clear stickers for glass, bottles, or packaging.",
              //   type: "cable-label",
              //   demoData: "",
              //   materialType: "simple"
              // },
              {
                name: "Floor / wall stickers",
                description: "Non-slip or large surface stickers for floors and walls.",
                image: ["https://signsdesigner.us/app/aso_products_preview/floor_decals/image_1.webp"],
                type: "cable-label",
                demoData: "",
                materialType: "simple"
              },
            ]
          }
        ]
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
      }
    ]
  }

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

  const DEFAULT_PRODUCT_IMAGE = "/images/configuration-examples/product-generic-sign.svg";

  const DOMAIN_CARDS = [
    {
      key: "signage",
      title: "Signs",
      badge: "Signage",
      description: "This domain covers various products such as:",
      tags: ["Signboard", "Banner", "Sticker", "Neon", "Channel"],
      gradient: "linear-gradient(0.45turn, #DCDCDC, #ebf8e1, #ebf8e1)",
      selectable: true,
      comingSoon: false,
    },
    {
      key: "apparel",
      title: "Textile",
      badge: "Apparel",
      description: "This domain covers various products such as:",
      tags: ["T-shirt", "Cap", "Hoodie"],
      gradient: "linear-gradient(0.45turn, #B2DFDB, #E0F2F1, #ebf8e1)",
      selectable: false,
      comingSoon: true,
    },
    {
      key: "object",
      title: "Goodies",
      badge: "Objects",
      description: "This domain covers various products such as:",
      tags: ["Mug", "Card", "Tote bag"],
      gradient: "linear-gradient(0.45turn, #F8BBD0, #FCE4EC, #ebf8e1)",
      selectable: false,
      comingSoon: true,
    },
  ];

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

  const dedupeItems = (items: any[], getKey: (item: any, index: number) => string) => {
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
    name: '',
    email: '',
    age: '',
    comment: '',
  });

  //selectionner la catégorie
  const [productCategorie, setProductCategorie] = useState<any>(configuration ? null : signageOption);
  const selectProductCategorie = (data: object) => {
    setProductCategorie(data);
    console.log(data, "product categorie");
  };

  // selection du type produit
  const initialProductType =
    signageOption.productCategories.find(
      (category: any) => category.type === (configuration as any)?.productType,
    ) || signageOption.productCategories[0] || null;

  const [productType, setProductType] = useState<any>(initialProductType);
  const selectProductType = (data: any) => {
    setProductType(data);
    setProductData(null);
    if(data.productGroups.length > 0){
      setProductGroup(data.productGroups[0])
    }
      };
  const isNcpcProductType = LETTERING_PRODUCT_TYPES.includes(
    (productType?.type || "") as (typeof LETTERING_PRODUCT_TYPES)[number],
  );

  const [productGroup, setProductGroup] = useState<any>(
    initialProductType?.productGroups?.[0] || null,
  );

  const visibleProductCategories = useMemo(
    () =>
      dedupeItems(
        productCategorie?.productCategories || [],
        (item) => String(item?.type || item?.name || ""),
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
      dedupeItems(
        productType?.productGroups || [],
        (item) => String(item?.name || ""),
      ),
    [productType],
  );

  const productGroupsToDisplay = useMemo(
    () =>
      visibleProductGroups.filter(
        (group: any) => String(group?.name || "").trim().toLowerCase() !== "most popular",
      ),
    [visibleProductGroups],
  );

  const shouldShowProductGroupTabs = useMemo(
    () => productGroupsToDisplay.length > 0,
    [productGroupsToDisplay],
  );

  const visibleProducts = useMemo(
    () =>
      dedupeItems(
        productGroup?.products || [],
        (item) => String(item?.type || item?.name || ""),
      ),
    [productGroup],
  );


  //selectionner le produit
  const [productData, setProductData] = useState<any>(null);
  const selectProductData = (data: any) => {
    setProductData(data);
    // setMaterialType("")
    setMaterialType(data.materialType)
  };


  // State pour la prévisualisation
  const [previewProduct, setPreviewProduct] = useState<any>(null);

  // État pour l'index de l'image dans la modale
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Remplacez 'previewProduct' par votre variable réelle, si elle est définie ici
  // const [previewProduct, setPreviewProduct] = useState(null); // Exemple si vous définissez l'état ici

  // Préparation des URLs d'images (pour gérer le string ou le tableau)
  const imageUrls = useMemo(() => {
    if (!previewProduct) return [];
    const productImages = toImageArray(previewProduct?.image);
    if (productImages.length > 0) return productImages;
    return [PRODUCT_IMAGE_MAP[previewProduct?.type] || DEFAULT_PRODUCT_IMAGE];
  }, [previewProduct]);

  // Réinitialiser l'index lorsque le produit change ou la modale s'ouvre/ferme
  useEffect(() => {
      // S'assure que l'index est valide et le remet à 0 si la liste d'images change
      if (currentImageIndex >= imageUrls.length) {
          setCurrentImageIndex(0);
      }
      // Réinitialise à 0 si la modale se ferme (previewProduct est null)
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
    setCurrentImageIndex(prevIndex => (prevIndex + 1) % imageUrls.length);
  }, [imageUrls.length]);


  const handlePreviousImage = useCallback(() => {
    setCurrentImageIndex(prevIndex => (prevIndex - 1 + imageUrls.length) % imageUrls.length);
  }, [imageUrls.length]);
  // selection du type de materiel
  // Initialiser avec la valeur de la configuration si elle existe, sinon 'simple' par défaut
  const [materialType, setMaterialType] = useState<string>(
    (configuration as any)?.materialType || 'simple'
  );
  const selectMaterialType = (type: string) => {
    setMaterialType(type);
    console.log(type, "material type");
  };

  // Demo data
  const [validDemoData, setValidDemoData] = useState<boolean>(false);
  const [demoId, setDemoId] = useState<any>(null);
  const [demoName, setDemoName] = useState<any>('');
  const [includeNcpcMeta, setIncludeNcpcMeta] = useState<boolean>(true);
  const [ncpcPricingMode, setNcpcPricingMode] = useState<string>(
    (configuration as any)?.pricingMode || "",
  );
  const allowedNcpcPricingModes = useMemo(
    () =>
      getAllowedNcpcPricingModes(
        productType?.type === "channel" ? "channel" : "neon",
        productData?.type || null,
      ),
    [productType?.type, productData?.type],
  );

  useEffect(() => {
    if (!isNcpcProductType) return;
    if (!allowedNcpcPricingModes.length) return;

    if (!ncpcPricingMode || !allowedNcpcPricingModes.includes(ncpcPricingMode as any)) {
      setNcpcPricingMode(
        getDefaultNcpcPricingMode(
          productType?.type === "channel" ? "channel" : "neon",
          productData?.type || null,
        ),
      );
    }
  }, [
    isNcpcProductType,
    allowedNcpcPricingModes,
    ncpcPricingMode,
    productType?.type,
    productData?.type,
  ]);

  const handleSubmit = () => {
    // Log demoId seulement s'il existe
    if (demoId !== null && demoId !== undefined && demoId !== '') {
      console.log(demoId, "demoData id");
    }
    // Ancien code commenté - maintenant on utilise uniquement products

  const submitData: any = { 
    ...formData, 
    products: JSON.stringify(formData.products || []),
    // Toujours utiliser le materialType du state (initialisé depuis la config ou modifié par l'utilisateur)
    materialType: materialType,
    productType: productType?.type || ""
  };

  if (isNcpcProductType) {
    submitData.ncpcPresetKey = productData?.type || "";
    submitData.ncpcPricingMode = ncpcPricingMode;
    submitData.ncpcIncludeMeta = includeNcpcMeta ? "true" : "false";
  }
  
  console.log("Submit - materialType:", materialType);
  console.log("Submit - productType:", productType);
  
  // Ajouter demoId seulement s'il existe et est valide
  if (demoId !== null && demoId !== undefined && demoId !== '') {
    submitData.demoId = parseInt(`${demoId}`);
  }
  
  submit(submitData, { method: "POST" });

    // onBack()
  };


  const allowDemoData = (statut: boolean) => {
    if (!statut) {
      setValidDemoData(false);
      setDemoId(null);
      setDemoName("");
      return;
    }

    if (isNcpcProductType) {
      // Les templates demo actuels ne couvrent pas encore NCPC (neon/channel)
      setValidDemoData(false);
      setDemoId(null);
      setDemoName("");
      return;
    }

    setValidDemoData(statut);
    // if(statut == true){
    //   setShowDemoData(true)
    // }

    let plan = "pro"

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
        hide: !PRICING_PLANS.STARTER_RULES.materialTypes.includes(item.data.materials[0].type) && plan == PRICING_PLANS.STARTER ? true : false,
      };
    });

    data = data.filter((item) => {
      return item.label === productData?.name;
    });

    if (!data[0]) {
      setValidDemoData(false);
      setDemoId(null);
      setDemoName("");
      return;
    }

    setDemoId(data[0].value);
    setDemoName(data[0].label)  
    // setSelectData(demoData.value);
    // handleDemoId(demoData.value, demoData.label)

    console.log(statut, "demo data", data);
  };
  // modal de selection de demo data associé
  const [showDemoData, setShowDemoData] = useState(false);
  const DemoList = ({ handleOnBack, handleDemoId }: { handleOnBack: any, handleDemoId:any }) => {
    const [selectData, setSelectData] = useState("");
    const  [searchTag,  setSearchTag] = useState("");
   
    const navigation = useNavigation();
    // Pour l'instant, on utilise un plan par défaut car nous ne sommes pas dans un contexte d'outlet
    const plan = "pro"; // ou récupérer depuis un contexte global si disponible
    
  
  
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
        hide: !PRICING_PLANS.STARTER_RULES.materialTypes.includes(item.data.materials[0].type) && plan == PRICING_PLANS.STARTER ? true : false,
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
  
    
          <SpacingBackground width="100%" height="auto" margin="5px 0px" backgroundColor="#F8F9FB">
            <Box paddingInline="300" paddingBlock="300">
              <Grid gap={{ lg: "20px" }}>
                {data.map((demoData: any) => {
                  return (
                    <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 2, lg: 4, xl: 3 }}>
                      <AppearanceItem
                        title={demoData.label}
                        description={demoData.description}
                        imgSrc={demoData.image}
                        // active={demoData.value == `${selectData}`}
                        active={demoData.value == demoId}
                        onChange={(value: any) => {
                          setSelectData(demoData.value);
                          handleDemoId(demoData.value, demoData.label)
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
              <InlineStack align="end" gap="600">
                {/* <BackBtn
                  onClick={() => {
                    handleOnBack();
                  }}
                  title="Back"
                /> */}
                {/* <BiSaveBtn isLoading={isSubmitting} title="Done" /> */}
              </InlineStack>
            </Box>
            </Form>
          </SpacingBackground>
        </SpacingBackground>
      </Page>
    );
  };

  //modal de recapitulatif
  const [showConfigRecap, setShowConfigRecap] = useState(false);


  const canProceedStep = useMemo(() => {
    if (step === 1) {
      return productData != null;
    }

    if (step === 2) {
      if (isNcpcProductType) {
        return Boolean(ncpcPricingMode);
      }
      return Boolean(materialType);
    }

    return true;
  }, [step, productData, isNcpcProductType, ncpcPricingMode, materialType]);

  // navigation entre les steps
  function nextStep() {
    if (!canProceedStep) return;

    setStep((prev) => Math.min(prev + 1, 3));

    if (step == 1 && !isNcpcProductType) {
      allowDemoData(true);
    }
  }

  const prevStep = () => setStep((prev) => Math.max(prev - 1, 0));

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <Box>
            <div style={{paddingBottom: '25px', display: 'flex', flexDirection: 'column', gap: '5px'}}>
              <Text as="h2" variant="headingLg" fontWeight="bold">
                Select the signage domain <Badge tone="success" size="large" >{productCategorie?.name || "Signage"}</Badge> 
              </Text>
              <p>Select a domain so we can prepare the matching product types for your next step.</p>
            </div>

            <Grid columns={{xs: 1, sm: 1, md: 3, lg: 3, xl: 3}}>
              {DOMAIN_CARDS.map((domain) => {
                const selected = productCategorie?.type === domain.key;
                return (
                  <Grid.Cell key={domain.key}>
                    <div
                      onClick={() => {
                        if (domain.selectable) {
                          selectProductCategorie(signageOption);
                        }
                      }}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        cursor: domain.selectable ? "pointer" : "not-allowed",
                        backgroundColor: "#F5F5F5",
                        color: "black",
                        borderRadius: "20px",
                        border: "0.07em solid #BDBDBD",
                        boxShadow: selected ? "0px 0px 4px 2px rgba(1, 100, 100, 0.8)" : "",
                        transition: "all 120ms",
                        overflow: "hidden",
                        opacity: domain.selectable ? 1 : 0.96,
                      }}
                    >
                      <div
                        style={{
                          position: "relative",
                          background: domain.gradient,
                          width: "100%",
                          height: "160px",
                        }}
                      >
                        <div
                          style={{
                            position: "absolute",
                            left: "50%",
                            top: "56%",
                            transform: "translate(-50%, -50%)",
                            width: "74%",
                            height: "92px",
                            borderRadius: "10px",
                            border: "2px solid rgba(94, 132, 129, 0.45)",
                            background: "rgba(255,255,255,0.22)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.35)",
                          }}
                        >
                          <div style={{ textAlign: "center" }}>
                            <p
                              style={{
                                fontSize: "32px",
                                letterSpacing: "0.04em",
                                fontWeight: 700,
                                color: "rgba(52, 96, 95, 0.75)",
                                textTransform: "uppercase",
                                lineHeight: 1,
                              }}
                            >
                              {domain.badge}
                            </p>
                            <div
                              style={{
                                marginTop: "8px",
                                width: "110px",
                                height: "4px",
                                borderRadius: "999px",
                                background: "rgba(52, 96, 95, 0.55)",
                                marginInline: "auto",
                              }}
                            />
                          </div>
                        </div>

                        <span
                          style={{
                            position: "absolute",
                            top: "15px",
                            left: "15px",
                            display: "flex",
                            width: "fit-content",
                            background: "white",
                            color: "#424242",
                            fontSize: "12px",
                            borderRadius: "20px",
                            padding: "1px 10px",
                          }}
                        >
                          {domain.badge}
                        </span>

                        <span
                          style={{
                            position: "absolute",
                            top: "20px",
                            right: "20px",
                            display: "flex",
                            width: "fit-content",
                            background: "white",
                            color: "#424242",
                            borderRadius: "16px",
                            padding: "10px",
                            boxShadow: "0px 1px 4px #BDBDBD",
                          }}
                        >
                          {getDomainIcon(domain.key)}
                        </span>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "10px",
                          padding: "10px 15px 8px 15px",
                        }}
                      >
                        <InlineStack gap="100" blockAlign="center">
                          <p style={{fontSize: "18px"}}>{domain.title}</p>
                          {selected && (
                            <span
                              style={{
                                display: "flex",
                                width: "fit-content",
                                background: "rgba(1, 100, 100, 0.2)",
                                color: "rgba(1, 100, 100, 0.8)",
                                fontSize: "10px",
                                borderRadius: "20px",
                                padding: "0.5px 6px",
                              }}
                            >
                              selected
                            </span>
                          )}
                          {domain.comingSoon && <Badge tone="info">Coming soon</Badge>}
                        </InlineStack>

                        <div style={{display: "flex", flexDirection: "column", gap: "5px"}}>
                          <p style={{color: "#424242", fontWeight: "normal"}}>{domain.description}</p>
                          <div style={{display: "flex", gap: "5px", flexWrap: "wrap"}}>
                            {domain.tags.map((tag) => (
                              <span
                                key={`${domain.key}-${tag}`}
                                style={{
                                  display: "flex",
                                  width: "fit-content",
                                  background: "#E0F2F1",
                                  color: "#424242",
                                  fontSize: "11.5px",
                                  borderRadius: "20px",
                                  padding: "1px 8px",
                                  border: "2px solid #E0E0E0",
                                }}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          gap: "10px",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: "10px 15px 12px 15px",
                        }}
                      >
                        <p style={{color: "gray", fontSize: "12px", fontWeight: "normal"}}>
                          {domain.selectable ? "Click to choose" : "Unavailable for now"}
                        </p>

                        <span
                          style={{
                            display: "flex",
                            padding: "5px",
                            border: selected ? "2px solid rgba(1, 100, 100, 0.8)" : "2px solid #DCDCDC",
                            borderRadius: "10px",
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            width="20"
                            height="20"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                          </svg>
                        </span>
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
            <div style={{paddingBottom: '20px', display: 'flex', flexDirection: 'column', gap: '5px'}}>
              <Text as="h2" variant="headingLg" fontWeight="bold">
               {/* Select the type and the product sample of {productCategorie.name}  */}
                What product would you like to sell?{" "}
                <Badge size="large" >{productCategorie?.name || "Signage"}</Badge>{" "}
                <Badge size="large" tone={isNcpcProductType ? "info" : "success"}>
                  {selectedPrimaryCategoryLabel}
                </Badge>{" "}
                {isNcpcProductType && (
                  <Badge tone="success" size="large" >
                    {productType?.name || "Neon"}
                  </Badge>
                )}
              </Text>
              <p>
                Choose the subtype that best matches your product within{" "}
                {selectedPrimaryCategoryLabel}. You will fine-tune material behaviour in the next step.
              </p>
              {/* <span style={{fontWeight: "700"}}>{productCategorie.name}</span> */}
            </div>


            <div style={{display: "flex", gap: "10px", paddingBottom: '20px'}}>
              {primaryProductCategories.map((categorie: any) => {
                const isLetteringCategory = categorie.type === LETTERING_CATEGORY_TYPE;
                const isSelectedCategory = isLetteringCategory
                  ? isNcpcProductType
                  : productType?.type === categorie.type;

                return (
                <div
                  key={categorie.type}
                  onClick={() => {
                    if (isLetteringCategory) {
                      const activeLetteringType =
                        letteringProductCategories.find(
                          (letteringCategory: any) => letteringCategory.type === productType?.type,
                        ) || letteringProductCategories[0];
                      if (activeLetteringType) {
                        selectProductType(activeLetteringType);
                      }
                      return;
                    }
                    selectProductType(categorie);
                  }} 
                  style={{
                    cursor: 'pointer',
                    // backgroundColor:  '#f1f1f1',
                    backgroundColor:  '#F5F5F5',
                    color: isSelectedCategory ? 'rgba(1, 100, 100, 0.8)' : '#424242',
                    borderRadius: '16px',
                    border: '0.07em solid #BDBDBD',
                    boxShadow: isSelectedCategory ? '0px 0px 2px 2px rgba(1, 100, 100, 0.8)' : '',
                    paddingInline: '16px',
                    paddingBlock: '5px',
                    transition: 'all 50ms',
                    height: 'auto',
                    overflow: 'hidden'
                  }}
                >
                  <div style={{display: 'flex', gap: '10px', alignItems: '', height: '100%'}}>                    
                    <div style={{display: 'flex', flexDirection: 'column', width: '100%'}}>
                      <div style={{padding: '0px'}}>
                        <BlockStack gap="100">
                          <p style={{fontSize: "16px", fontWeight: "600"}}>{categorie.name}</p>
                        </BlockStack>
                      </div>
                    </div>
                  </div>
                </div>
                );
              })}
            </div>

            {isNcpcProductType && letteringProductCategories.length > 0 && (
              <div
                style={{
                  display: "flex",
                  gap: "8px",
                  marginBottom: "20px",
                  borderBottom: "1px solid #E0E0E0",
                }}
              >
                {letteringProductCategories.map((letteringType: any) => (
                  <div
                    key={letteringType.type}
                    onClick={() => selectProductType(letteringType)}
                    style={{
                      cursor: "pointer",
                      backgroundColor:
                        productType?.type === letteringType.type
                          ? "rgba(1, 100, 100, 0.1)"
                          : "",
                      color:
                        productType?.type === letteringType.type
                          ? "rgba(1, 100, 100, 1)"
                          : "#424242",
                      borderBottom:
                        productType?.type === letteringType.type
                          ? "0.09em solid rgba(1, 100, 100, 1)"
                          : "0.07em solid #BDBDBD",
                      paddingInline: "16px",
                      paddingBlock: "6px",
                      transition: "all 50ms",
                    }}
                  >
                    <p style={{ fontSize: "14px", fontWeight: "600" }}>
                      {letteringType.name}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {shouldShowProductGroupTabs && (
              <div style={{display: "flex", gap: "8px", marginBottom: '20px', borderBottom: '1px solid #E0E0E0'}}>
                {productGroupsToDisplay.map((productGrp: any) => (
                  <div
                    key={productGrp.name}
                    onClick={() => {
                      setProductGroup(productGrp);
                      setProductData(null);
                    }}
                    style={{
                      cursor: 'pointer',
                      backgroundColor: productGroup?.name === productGrp?.name ?  'rgba(1, 100, 100, 0.1)' : '',
                      color: productGroup?.name === productGrp?.name ?  'rgba(1, 100, 100, 1)' : '#424242',
                      borderBottom: productGroup?.name === productGrp?.name ? '0.09em solid rgba(1, 100, 100, 1)' : '0.07em solid #BDBDBD',
                      paddingInline: '16px',
                      paddingBlock: '6px',
                      transition: 'all 50ms',
                    }}
                  >
                    <div style={{display: 'flex', gap: '10px', alignItems: '', height: '100%'}}>                    
                      <div style={{display: 'flex', flexDirection: 'column', gap: '8px', width: '100%'}}>
                        <div style={{padding: '0px'}}>
                            <p style={{fontSize: "14px", fontWeight: "500"}}>{productGrp.name}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <Grid columns={{ xs: 1, sm: 2, md: 2, lg: 2, xl: 2 }}>
              {visibleProducts.map((product: any) => {
                const cardImage = getProductCardImage(product);
                const isSelected = productData?.name === product?.name;
                return (
                  <Grid.Cell key={product?.type || product?.name}>
                    <div
                      onClick={() => selectProductData(product)}
                      style={{
                        cursor: "pointer",
                        background: isSelected
                          ? "linear-gradient(165deg, #F8FEFD 0%, #F2F8F8 100%)"
                          : "#F7F8FA",
                        color: "black",
                        borderRadius: "14px",
                        border: "1px solid #C6CDD4",
                        boxShadow: isSelected
                          ? "0 0 0 2px rgba(1, 100, 100, 0.72), 0 12px 24px rgba(15, 23, 42, 0.08)"
                          : "0 4px 14px rgba(15, 23, 42, 0.04)",
                        transition: "all 180ms",
                        padding: "14px",
                        minHeight: "108px",
                        position: "relative",
                        overflow: "hidden",
                      }}
                    >
                      {isSelected && (
                        <div
                          style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            height: "2px",
                            background: "linear-gradient(90deg, rgba(1, 100, 100, 0.85), rgba(1, 100, 100, 0.35))",
                          }}
                        />
                      )}

                      <div style={{ display: "flex", gap: "14px", alignItems: "center" }}>
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
                              ? "0 0 0 2px rgba(1, 100, 100, 0.22)"
                              : "inset 0 0 0 1px rgba(255,255,255,0.45)",
                          }}
                        >
                          <img
                            src={cardImage}
                            alt={`${product?.name} example`}
                            onError={(event) => {
                              event.currentTarget.src = DEFAULT_PRODUCT_IMAGE;
                            }}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "contain",
                              objectPosition: "center",
                            }}
                          />
                        </div>

                        <div style={{ display: "flex", flexDirection: "column", gap: "6px", flex: 1, minWidth: 0 }}>
                          <div style={{ display: "flex", justifyContent: "space-between", gap: "8px", alignItems: "center" }}>
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
                            {isSelected && (
                              <span
                                style={{
                                  display: "flex",
                                  width: "fit-content",
                                  background: "rgba(1, 100, 100, 0.14)",
                                  color: "rgba(1, 100, 100, 0.9)",
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
                            {product?.description}
                          </p>

                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "2px" }}>
                            <p style={{ color: "#9EA6AD", fontSize: "12px", fontWeight: 500 }}>Click to select</p>

                            <div
                              onClick={(e) => {
                                e.stopPropagation();
                                setPreviewProduct(product);
                              }}
                              style={{
                                display: "inline-flex",
                                alignItems: "center",
                                cursor: "pointer",
                                width: "fit-content",
                              }}
                            >
                              <span
                                style={{
                                  color: "rgba(1, 100, 100, 0.8)",
                                  fontSize: "12px",
                                  fontWeight: 600,
                                }}
                              >
                                Preview
                              </span>
                            </div>
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
                  content: 'Close',
                  onAction: () => setPreviewProduct(null),
                }}
                secondaryActions={[
                  {
                    content: 'Select',
                    onAction: () =>  selectProductData(previewProduct),
                  },
                ]}
                    >
                <Modal.Section>
                  <BlockStack gap="200">
                    <Text as="p" tone="subdued">
                      {previewProduct.description}
                    </Text>
                     
                    <div style={{position: "relative", display: "flex", width: "100%", height: "100%"}}>
                      <span style={{position: "absolute", top: "50%", left: "1%", translate: '0% -50%'}}>
                        <Button
                            icon={<Icon source={ArrowLeftIcon} />}
                            onClick={handlePreviousImage}
                            disabled={imageUrls.length <= 1} // Désactivé s'il y a 0 ou 1 image
                        />

                      </span>

                      <div
                          style={{
                            width: '100%',
                            height: '200px',
                            backgroundColor: '#F0F4F8',
                            border: '1px dashed #B0BEC5',
                            borderRadius: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#637381',
                            overflow: 'hidden',
                          }}
                      >
                          {/* Affichage de l'image COURANTE */}
                          {imageUrls.length > 0 ? (
                            <>
                              <div style={{
                                position: 'absolute',
                                top: '50%',
                                translate: 'var(--tw-translate-x) -50%, -50% var(--tw-translate-y)',
                                left: '50%',
                              }}>
                                {isImageLoading && <Spinner accessibilityLabel="Loading image" size="small" />}
                              </div>
                              <img
                                  src={imageUrls[currentImageIndex]}
                                  onError={(event) => {
                                    event.currentTarget.src = DEFAULT_PRODUCT_IMAGE;
                                  }}
                                  onLoad={handleImageLoad}
                                  alt={`Aperçu ${currentImageIndex + 1}`}
                                  style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
                              />
                            </>
                          ) : (
                              <Text as="span" variant="bodyMd">No image available</Text>
                          )}
                      </div>
                      
                      <span style={{position: "absolute", top: "50%", right: "1%", translate: '0% -50%'}}>
                        <Button
                            icon={<Icon source={ArrowRightIcon} />}
                            onClick={handleNextImage}
                            disabled={imageUrls.length <= 1} // Désactivé s'il y a 0 ou 1 image
                        />
                      </span>
                    </div>
                    
                    {imageUrls.length > 1 && (
                        <Text alignment="center" tone="subdued" as="p" variant="bodySm">
                            {`${currentImageIndex + 1} / ${imageUrls.length}`}
                        </Text>
                    )}

                    <InlineStack gap="200" blockAlign="center">
                      <Text as="span" tone="subdued">
                        Suggested interaction mode for this product:
                      </Text>
                      <Text as="span" fontWeight="bold">
                        {previewProduct.materialType === 'advance' ? 'Avancé' : 
                         previewProduct.materialType === 'simple' ? 'Simple' : 
                         'Standard'}
                      </Text>
                    </InlineStack>
                  </BlockStack>
                </Modal.Section>
              </Modal>
            )}            

          </Box>
        );
      case 2:
        return (
          <Box>
            <div style={{paddingBottom: '20px', display: 'flex', flexDirection: 'column', gap: '5px'}}>
              <Text as="h2" variant="headingLg" fontWeight="bold">
                {isNcpcProductType
                  ? "Configure NCPC preset"
                  : "Add product template for fast setup"}{" "}
                <Badge size="large" >{productCategorie?.name || "Signage"}</Badge> <Badge size="large" >{productType?.name || "Signboard"}</Badge> <Badge tone="success" size="large" >{productData?.name || "-"}</Badge>
              </Text>
              <p>
                {isNcpcProductType
                  ? "Choose the pricing model and whether to initialize Neon/Channel starter data."
                  : "Choose a starter template whose demo content matches your product."}
              </p>
            </div>

            {isNcpcProductType ? (
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
                  <p style={{ fontSize: "16px", fontWeight: "600", marginBottom: "10px" }}>
                    How do you price your signs?
                  </p>
                  <p style={{ fontSize: "14px", color: "#616161", marginBottom: "14px" }}>
                    Choose a pricing model for this NCPC configuration.
                  </p>
                  <Grid columns={{ xs: 1, sm: 2, md: 2, lg: 2, xl: 2 }}>
                    {NCPC_PRICING_OPTIONS.filter((option) =>
                      allowedNcpcPricingModes.includes(option.value),
                    ).map((option) => {
                      const isSelected = ncpcPricingMode === option.value;
                      const preview = PRICING_PREVIEW_MAP[option.value] || {
                        image: "/images/configuration-examples/pricing-previews/sizes.svg",
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
                            <div style={{ display: "flex", gap: "14px", alignItems: "center" }}>
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
                                  <p style={{ fontSize: "14px", fontWeight: 700 }}>{option.name}</p>
                                  <span
                                    style={{
                                      fontSize: "11px",
                                      lineHeight: 1,
                                      padding: "4px 7px",
                                      borderRadius: "999px",
                                      background: isSelected
                                        ? "rgba(1, 100, 100, 0.15)"
                                        : "#F0F2F4",
                                      color: isSelected ? "rgba(1, 100, 100, 0.85)" : "#5F6368",
                                      fontWeight: 700,
                                      whiteSpace: "nowrap",
                                    }}
                                  >
                                    {preview.tag}
                                  </span>
                                </div>

                                <p style={{ fontSize: "12px", color: "#5F6368" }}>{option.description}</p>
                                {preview.hint ? (
                                  <p style={{ fontSize: "12px", color: "#3B4146", marginTop: "6px" }}>
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

                <div
                  style={{
                    marginTop: "14px",
                    backgroundColor: "#F7F8FA",
                    borderRadius: "16px",
                    border: "1px solid #C6CDD4",
                    padding: "20px",
                  }}
                >
                  <p style={{ fontSize: "16px", fontWeight: "600", marginBottom: "10px" }}>
                    Include starter data?
                  </p>
                  <p style={{ fontSize: "14px", color: "#616161", marginBottom: "12px" }}>
                    Pre-fill colors, sizes and options from a Neon/Channel starter preset.
                  </p>
                  <InlineStack gap="200">
                    <span
                      onClick={() => setIncludeNcpcMeta(false)}
                      style={{
                        cursor: "pointer",
                        padding: "7px 14px",
                        borderRadius: "10px",
                        border: !includeNcpcMeta
                          ? "2px solid rgba(1, 100, 100, 0.7)"
                          : "1px solid #8A939B",
                        color: !includeNcpcMeta ? "rgba(1, 100, 100, 0.8)" : "#5F6368",
                        background: !includeNcpcMeta ? "rgba(1, 100, 100, 0.08)" : "#F0F2F4",
                        fontWeight: 600,
                        transition: "all 120ms ease",
                      }}
                    >
                      No
                    </span>
                    <span
                      onClick={() => setIncludeNcpcMeta(true)}
                      style={{
                        cursor: "pointer",
                        padding: "7px 14px",
                        borderRadius: "10px",
                        border: includeNcpcMeta
                          ? "2px solid rgba(1, 100, 100, 0.7)"
                          : "1px solid #8A939B",
                        color: includeNcpcMeta ? "rgba(1, 100, 100, 0.8)" : "#5F6368",
                        background: includeNcpcMeta ? "rgba(1, 100, 100, 0.08)" : "#F0F2F4",
                        fontWeight: 600,
                        transition: "all 120ms ease",
                      }}
                    >
                      Yes
                    </span>
                  </InlineStack>
                </div>
              </>
            ) : (
              <>
                <div 
                  style={{
                    cursor: 'pointer',
                    backgroundColor:  '#F5F5F5',
                    color: 'black',
                    borderRadius: '16px',
                    border: '0.07em solid #BDBDBD',
                    padding: '20px',
                    transition: 'all 50ms',
                  }}
                >
                  <div style={{display: 'flex', gap: '10px', alignItems: 'center', height: '100%'}}>                    
                    <div style={{display: 'flex', flexDirection: 'column', gap: '8px', width: '100%'}}>
                      <div style={{padding: '0px'}}>
                        <BlockStack gap="100">
                          <p style={{fontSize: "16px", fontWeight: "600"}}>Include demo data?</p>
                          <p style={{fontSize: "14px", fontWeight: "400", color: "#616161"}}>Preload a template to start faster. You can still customize everything later.</p>
                        </BlockStack>
                      </div>
                    </div>

                    <div 
                      style={{
                        display: "flex",
                        gap: "10px"
                      }}
                    >
                      <span 
                        onClick={() => {
                          allowDemoData(false);
                          setDemoId(null);
                        }} 
                        style={{
                          width: "fit-content",
                          height: "fit-content",
                          display: "flex",
                          color: !validDemoData ? "rgba(1, 100, 100, 0.7)" : "#757575",
                          fontSize: "15px",
                          padding: "7px 10px",
                          border: !validDemoData ? "2px solid rgba(1, 100, 100, 0.6)" : "2px solid #757575",
                          borderRadius: "10px",
                          boxShadow: !validDemoData ? '0px 0px 4px 2px rgba(1, 100, 100, 0.8)' : '',
                        }}
                      >
                        No
                      </span>
                      <span 
                        onClick={() => {
                          allowDemoData(true);
                        }} 
                        style={{
                          width: "fit-content",
                          height: "fit-content",
                          display: "flex",
                          color: (validDemoData && demoName != "") ? "rgba(1, 100, 100, 0.7)" : "#757575",
                          fontSize: "15px",
                          padding: "7px 10px",
                          border: (validDemoData && demoName != "") ? "2px solid rgba(1, 100, 100, 0.6)" : "2px solid #757575",
                          borderRadius: "10px",
                          boxShadow: (validDemoData && demoName != "") ? '0px 0px 4px 2px rgba(1, 100, 100, 0.8)' : '',
                        }}
                      >
                        Yes
                      </span>
                    </div>
                  </div>
                </div>

                { (validDemoData && demoName != "") && <div style={{paddingTop: '15px'}}>
                  <p>Demo data selected: <span style={{fontSize: "14px", fontWeight: "600"}}> {demoName} </span></p>
                </div>}

                <div style={{display: productData != null ? "flex" : "none", flexDirection: "column", gap: "10px", paddingTop: "20px"}}>
                  <p style={{fontSize: "16px", fontWeight: "600"}}>Select how user can customize your product</p>

                  <Grid columns={{xs: 2, sm: 2, md: 2, lg: 3, xl: 3}}>
                    {productData?.materialType != "advance" && 
                      <Grid.Cell>
                        <div 
                          onClick={() => selectMaterialType('simple')} 
                          style={{
                            cursor: 'pointer',
                            backgroundColor:  '#F5F5F5',
                            color: 'black',
                            borderRadius: '16px',
                            border: '0.07em solid #BDBDBD',
                            boxShadow: materialType === 'simple' ? '0px 0px 4px 2px rgba(1, 100, 100, 0.8)' : '',
                            padding: '16px',
                            transition: 'all 50ms',
                          }}
                        >
                          <div style={{display: 'flex', gap: '10px', alignItems: '', height: '100%'}}>                    
                            <div style={{display: 'flex', flexDirection: 'column', gap: '8px', width: '100%'}}>
                              <div style={{padding: '0px'}}>
                                <BlockStack gap="100">
                                  <p style={{fontSize: "15px", fontWeight: "600"}}>Simple</p>
                                  <p style={{fontSize: "13px", fontWeight: "400", color: "#616161"}}>User can control the all option of the product like shape, size, color, etc…</p>
                                </BlockStack>
                              </div>
                            </div>

                            <span 
                              style={{
                                width: "fit-content",
                                height: "fit-content",
                                display: "flex",
                                padding: "5px",
                                border: materialType === 'simple' ? "2px solid rgba(1, 100, 100, 0.6)" : "2px solid #DCDCDC",
                                borderRadius: "10px"
                              }}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="15" height="15">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                              </svg>
                            </span>
                          </div>
                        </div>
                      </Grid.Cell>
                    }
                    {productData?.materialType != "simple" && 
                      <Grid.Cell>
                        <div 
                          onClick={() => selectMaterialType('advance')} 
                          style={{
                            cursor: 'pointer',
                            backgroundColor:  '#F5F5F5',
                            color: 'black',
                            borderRadius: '16px',
                            border: '0.07em solid #BDBDBD',
                            boxShadow: materialType === 'advance' ? '0px 0px 4px 2px rgba(1, 100, 100, 0.8)' : '',
                            padding: '16px',
                            transition: 'all 50ms',
                          }}
                        >
                          <div style={{display: 'flex', gap: '10px', alignItems: '', height: '100%'}}>                    
                            <div style={{display: 'flex', flexDirection: 'column', gap: '8px', width: '100%'}}>
                              <div style={{padding: '0px'}}>
                                <BlockStack gap="100">
                                  <p style={{fontSize: "15px", fontWeight: "600"}}>Advance</p>
                                  <p style={{fontSize: "13px", fontWeight: "400", color: "#616161"}}>User can add text and image, not control the shape, size, color  of the product  </p>
                                </BlockStack>
                              </div>
                            </div>

                            <span 
                              style={{
                                width: "fit-content",
                                height: "fit-content",
                                display: "flex",
                                padding: "5px",
                                border: materialType === 'advance' ? "2px solid rgba(1, 100, 100, 0.6)" : "2px solid #DCDCDC",
                                borderRadius: "10px"
                              }}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="15" height="15">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                              </svg>
                            </span>
                          </div>
                        </div>
                      </Grid.Cell>
                    }

                    {productData?.materialType == "all" && 
                      <Grid.Cell>
                        <div 
                          style={{
                            cursor: 'pointer',
                            backgroundColor:  '#F5F5F5',
                            color: 'black',
                            borderRadius: '16px',
                            border: '0.07em solid #BDBDBD',
                            boxShadow: materialType === 'layer' ? '0px 0px 4px 2px rgba(1, 100, 100, 0.8)' : '',
                            padding: '16px',
                            transition: 'all 50ms',
                          }}
                        >
                          <div style={{display: 'flex', gap: '10px', alignItems: '', height: '100%'}}>                    
                            <div style={{display: 'flex', flexDirection: 'column', gap: '8px', width: '100%'}}>
                              <div style={{padding: '0px'}}>
                                <BlockStack gap="100">
                                  <p style={{fontSize: "15px", fontWeight: "600"}}>Layers</p>
                                  <p style={{fontSize: "13px", fontWeight: "400", color: "#616161"}}>User can control some part of the product <Badge tone="info">Coming soon</Badge></p>
                                </BlockStack>
                              </div>
                            </div>

                            <span 
                              style={{
                                width: "fit-content",
                                height: "fit-content",
                                display: "flex",
                                padding: "5px",
                                border: materialType === 'layer' ? "2px solid rgba(1, 100, 100, 0.6)" : "2px solid #DCDCDC",
                                borderRadius: "10px"
                              }}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="15" height="15">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                              </svg>
                            </span>
                          </div>
                        </div>
                      </Grid.Cell>
                    }
                  </Grid>
                </div>

                <Modal
                  size="large"
                  open={showDemoData}
                  onClose={() => setShowDemoData(false)}
                  title="Select a demo"
                  primaryAction={{
                    content: 'Done',
                    onAction: () => setShowDemoData(false),
                  }}
                >
                  <Modal.Section>
                    <DemoList handleOnBack={() => setShowDemoData(false)} handleDemoId={(demoId:string, demoName: string)=> {
                        setDemoId(demoId);
                        setDemoName(demoName)                  
                      }} />
                  </Modal.Section>
                </Modal>
              </>
            )}
          </Box>
        );
      case 3:
        return (
          <div style={{display: "flex", gap: "10px"}}>
            <div style={{width: "70%", display: "flex", flexDirection: "column", gap: "12px"}}>
              <div style={{display: "flex", flexDirection: "column", gap: "8px", padding: '16px', backgroundColor:  '#F5F5F5', border: '1px solid #E0E0E0', borderRadius: '14px',}}>
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

              <div style={{display: "flex", flexDirection: "column", gap: "8px", padding: '16px', backgroundColor:  '#F5F5F5', border: '1px solid #E0E0E0', borderRadius: '14px',}}>
                <TextField
                  label="Description"
                  value={formData.description}
                  onChange={handleDescription}
                  autoComplete="on"
                  error={
                    actionData?.errors && typeof actionData.errors === 'object' && 'description' in actionData.errors
                      ? (actionData.errors as Record<string, string[] | null>).description?.[0] || ""
                      : ""
                  }
                />
              </div>

              <div style={{display: "flex", flexDirection: "column", gap: "8px", padding: '16px', backgroundColor:  '#F5F5F5', border: '1px solid #E0E0E0', borderRadius: '14px',}}>
                <FileInput
                    error={
                      actionData?.errors && typeof actionData.errors === 'object' && 'icon' in actionData.errors
                        ? (actionData.errors as Record<string, string[] | null>).icon?.[0] || ""
                        : ""
                    }
                    title="Upload image"
                    path={formData.icon}
                    handlePath={handleIcon}
                  />
              </div>

              <div style={{display: "flex", flexDirection: "column", gap: "8px", padding: '16px', backgroundColor:  '#F5F5F5', border: '1px solid #E0E0E0', borderRadius: '14px',}}>
              <MultiProductSelectField
                    label="Products associated with configuration"
                    buttonTitle="select"
                    selectedProducts={formData.products || []}
                    onSelectProducts={(value: any) => {
                      console.log("Client - Products selected:", value);
                      handleProducts(value);
                    }}
                    productTitles={(formData.products || []).map(p => p.title)}
                  />
              </div>
            </div>

            <div style={{width: "30%", display: configuration ? "none" : "flex"}}>
              <div style={{display: "flex", flexDirection: "column", width: "100%", gap: "8px", padding: '16px', backgroundColor:  '#F5F5F5', border: '1px solid #E0E0E0', borderRadius: '14px',}}>
                <p style={{fontWeight: "700", paddingBottom: "10px"}}>Summary</p>

                {productCategorie?.name && (
                  <p style={{color: "#757575"}}>Domain: <span style={{color: "#424242", fontWeight: "600"}}> {productCategorie.name} </span></p>
                )}
                {productType?.name && (
                  <p style={{color: "#757575"}}>Categorie type: <span style={{color: "#424242", fontWeight: "600"}}> {productType.name} </span></p>
                )}
                {productData?.name && (
                  <p style={{color: "#757575"}}>Product sample: <span style={{color: "#424242", fontWeight: "600"}}> {productData.name} </span></p>
                )}
                {isNcpcProductType ? (
                  <>
                    <p style={{color: "#757575"}}>Pricing mode: <span style={{color: "#424242", fontWeight: "600"}}> {ncpcPricingMode || "-"} </span></p>
                    <p style={{color: "#757575"}}>Starter data: <span style={{color: "#424242", fontWeight: "600"}}> {includeNcpcMeta ? "Yes" : "No"} </span></p>
                  </>
                ) : (
                  <>
                    <p style={{color: "#757575"}}>Material type: <span style={{color: "#424242", fontWeight: "600"}}> {materialType} </span></p>
                    <p style={{color: "#757575"}}>Demo data: <span style={{color: "#424242", fontWeight: "600"}}> {validDemoData ? 'Yes' : 'No'} {validDemoData && demoName != "" ? `(${demoName})` : ''} </span></p>
                  </>
                )}

                <p style={{color: "#757575"}}>Name: <span style={{color: "#424242", fontWeight: "600"}}> {formData.name} </span></p>
                {formData.description != "" &&
                  <p style={{color: "#757575"}}>Description: <span style={{color: "#424242", fontWeight: "600"}}> {formData.description} </span></p>
                }
                {formData.products && formData.products.length > 0 && 
                  <p style={{color: "#757575"}}>Associated products: <span style={{color: "#424242", fontWeight: "600"}}> {formData.products.map((p: any) => p.title).join(", ")} </span></p>
                }
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };



  return (
    <Page fullWidth>
      <div style={{padding: '10px', background: 'white', border: '1px solid #E0E0E0', borderRadius: '14px',}}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          background: 'white',
          padding: '4px 10px',
          gap: '5px',
        }}>
            <InlineStack gap="100" align="space-between" blockAlign='center'>
              <Text as="h2" variant="headingLg" fontWeight="bold">
                {" "}
                {configuration
                  ? "Update configuration"
                  : "Create new configuration"}
              </Text>
            </InlineStack>

            {actionData?.status === false && actionData?.message && (
              <Banner tone="critical" onDismiss={() => {}}>
                {actionData.message}
              </Banner>
            )}
            
            {!configuration && 
              <div>
                <InlineStack>
                  <p >Step {step + 1} of 4</p>
                </InlineStack>

                <div style={{
                  display: 'flex',
                  gap: '2px',
                  width: '20%'
                }}>
                  <span style={{
                    display: 'flex',
                    backgroundColor: step >= 0 ? 'rgba(1, 100, 100, 0.8)' : '#f1f1f1',
                    width: '25%',
                    padding: '2px',
                    border: '1px solid rgba(1, 100, 100, 0.8)',
                    borderRadius: '8px',
                  }}></span>

                  <span style={{
                    display: 'flex',
                    backgroundColor: step >= 1 ? 'rgba(1, 100, 100, 0.8)' : '#f1f1f1',
                    width: '25%',
                    padding: '2px',
                    border: '1px solid rgba(1, 100, 100, 0.8)',
                    borderRadius: '8px',
                  }}></span>

                  <span style={{
                    display: 'flex',
                    backgroundColor: step >= 2 ? 'rgba(1, 100, 100, 0.8)' : '#f1f1f1',
                    width: '25%',
                    padding: '2px',
                    border: '1px solid rgba(1, 100, 100, 0.8)',
                    borderRadius: '8px',
                  }}></span>

                  <span style={{
                    display: 'flex',
                    backgroundColor: step >= 3 ? 'rgba(1, 100, 100, 0.8)' : '#f1f1f1',
                    width: '25%',
                    padding: '2px',
                    border: '1px solid rgba(1, 100, 100, 0.8)',
                    borderRadius: '8px',
                  }}></span>


                </div>
              </div>
            }
        </div>
      </div>

      <SpacingBackground  margin="10px 0px">
        <Card >
          <Box padding='100'>
            {renderStep()}
          </Box>

          <div style={{width: '100%', display: 'flex',justifyContent: 'space-between', padding: '25px 5px 0px 5px', gap: '10px'}}>
            <div style={{color: ' rgb(97, 97, 97)'}}>
              {step == 0 && (
                <p>  Tip: The next steps will let you pick the product type and how customers can personalize it. </p>
              )}

              {step == 1 && (
                <p> Tip: You’ll configure the demo content and the user interaction mode in the next step. </p>
              )}

              {step == 2 && (
                <p> Tip: select a product sample with its material option and the to Demo Data / Templates next. </p>
              )}
            </div>
            
            <div style={{display: 'flex', gap: '10px'}}>
              {((!configuration && step == 0) || configuration) && (
                <Button onClick={onBack} size="large">
                  Back
                </Button>
              )}
              {(!configuration && step > 0) && (
                <Button onClick={prevStep} size="large">
                  Back
                </Button>
              )}
              
              {step < 3 ? (
                <button 
                  onClick={nextStep}
                  disabled={!canProceedStep}
                  style={{
                    backgroundColor: 'rgba(1, 100, 100, 0.9)',
                    color: 'white',
                    borderRadius: '8px',
                    padding: '7px 10px',
                    fontWeight: '600',
                    cursor: canProceedStep ? 'pointer' : 'not-allowed',
                    opacity: canProceedStep ? 1 : 0.6,
                    border: '1px',
                    // boxShadow: ' 0rem -0.0625rem 0rem 0rem #b5b5b5 inset, 0rem 0rem 0rem 0.0625rem rgba(0, 0, 0, 0.1) inset, 0rem 0.03125rem 0rem 0.09375rem #FFF inset'
                  }}
                >
                  Next
                </button>
              ) : (
                <button
                  disabled={isLoading || formData.name == ''}
                  type="submit"
                  style={{
                    backgroundColor: 'rgba(1, 100, 100, 0.9)',
                    color: 'white',
                    borderRadius: '8px',
                    padding: '7px 10px',
                    fontWeight: '600',
                    cursor: formData.name != ''  ? 'pointer' : 'not-allowed',
                    border: '1px',
                    boxShadow: ' 0rem -0.0625rem 0rem 0rem #b5b5b5 inset, 0rem 0rem 0rem 0.0625rem rgba(0, 0, 0, 0.1) inset, 0rem 0.03125rem 0rem 0.09375rem #FFF inset'
                  }}
                  onClick={()=> handleSubmit()}
                >
                  <Box paddingInline="1000">
                    <InlineStack gap="300" blockAlign="center">
                      {isSubmitting && (
                        <img
                          width="22"
                          height="22"
                          src="/loading/ic_loading_gray.svg"
                        />
                      )}
                      <span style={{ color: "white", fontWeight: "bold" }}>
                        {configuration ? "Save" : "Finish"} 
                      </span>
                    </InlineStack>
                  </Box>
                </button>
              )}
            </div>
          </div>
        </Card>
      </SpacingBackground>
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
  productType: z.string().nullish().transform(stringTransform),
  materialType: z.string().nullish().transform(stringTransform),
  demoId: z.number().nullish().nullable(),
  ncpcPresetKey: z.string().nullish().transform(stringTransform),
  ncpcPricingMode: z.string().nullish().transform(stringTransform),
  ncpcIncludeMeta: z.string().nullish().transform(stringTransform),
  products: z.any().transform(jsonTransform),

});

export const action = async ({ request }: ActionFunctionArgs) => {
  const { billing, session, admin } = await authenticate.admin(request);
  const plan =  await  getPlan(billing,session?.shop, admin);

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
    ncpcPresetKey?: string;
    ncpcPricingMode?: string;
    ncpcIncludeMeta?: string;
  };
  const ncpcPresetKey = configuration.ncpcPresetKey || "";
  const ncpcPricingMode = configuration.ncpcPricingMode || "";
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
  if (configuration.demoId !== null && configuration.demoId !== undefined && !isNaN(configuration.demoId)) {
    demoId = configuration.demoId;
  }
  delete configuration.demoId

  if (configuration.productType === "neon" || configuration.productType === "channel") {
    const normalizedProductType =
      configuration.productType === "channel" ? "channel" : "neon";
    const normalizedPricingMode =
      normalizeNcpcPricingMode(ncpcPricingMode) || "fixed-height";
    configuration.productType = normalizedProductType;
    configuration.pricingMode = normalizedPricingMode;
  } else {
    configuration.pricingMode = null;
  }

  if (id) {
    configuration.id = parseInt(id);

    if (configuration.productType === "neon" || configuration.productType === "channel") {
      configuration.productType =
        configuration.productType === "channel" ? "channel" : "neon";
    }

    // Récupérer les anciens produits associés depuis Shopify
    const oldShopifyProducts = await ShopifyProductService.getProductsByConfiguration(
      admin,
      configuration.id
    );

    // Normaliser les produits avant de sauvegarder en base de données
    // S'assurer que configuration.products est toujours un tableau
    let newProducts: any[] = [];
    if (configuration.products) {
      if (Array.isArray(configuration.products)) {
        newProducts = configuration.products;
      } else if (typeof configuration.products === 'string') {
        try {
          const parsed = JSON.parse(configuration.products);
          newProducts = Array.isArray(parsed) ? parsed : [];
        } catch (e) {
          newProducts = [];
        }
      }
    }
    // Mettre à jour configuration.products avec la valeur normalisée
    configuration.products = newProducts;

    // Mettre à jour la configuration en base de données (blocage si un produit est déjà lié à une autre config)
    let configurationObject: any;
    try {
      configurationObject = await ConfigurationService.updateConfiguration(
        configuration,
        session.id,
      );
    } catch (err: any) {
      const msg = err?.message || "Erreur lors de la mise à jour de la configuration.";
      return json({ status: false, message: msg, errors: {} });
    }

    // Normaliser les IDs pour la comparaison (enlever les espaces, normaliser le format)
    const normalizeId = (id: string) => String(id).trim();
    
    const newProductIds = new Set(newProducts.map((p: any) => normalizeId(p.id)));
    const oldProductIds = new Set(oldShopifyProducts.map((p: any) => normalizeId(p.id)));

    console.log("DEBUG - New products IDs:", Array.from(newProductIds));
    console.log("DEBUG - Old products IDs:", Array.from(oldProductIds));

    // Identifier les produits à ajouter (dans nouveaux mais pas dans anciens)
    const productsToAdd = newProducts.filter((p: any) => !oldProductIds.has(normalizeId(p.id)));
    
    // Identifier les produits à supprimer (dans anciens mais pas dans nouveaux)
    const productsToRemove = oldShopifyProducts.filter((p: any) => !newProductIds.has(normalizeId(p.id)));

    console.log("DEBUG - Products to add:", productsToAdd);
    console.log("DEBUG - Products to remove:", productsToRemove);

    // Ajouter la configuration aux nouveaux produits dans Shopify
    if (productsToAdd.length > 0) {
      console.log("Action - Adding products to configuration:", productsToAdd);
      await ShopifyProductService.updateMultipleProducts(
        admin,
        productsToAdd,
        configurationObject.id
      );
    }

    // Retirer la configuration des produits supprimés dans Shopify
    if (productsToRemove.length > 0) {
      console.log("Action - Removing products from configuration:", productsToRemove);
      const productIdsToRemove = productsToRemove.map((p: any) => p.id);
      await ShopifyProductService.removeConfigurationFromProducts(
        admin,
        productIdsToRemove
      );
    }

    // Si tous les produits ont été supprimés, s'assurer qu'aucun produit n'est associé
    if (newProducts.length === 0 && oldShopifyProducts.length > 0) {
      console.log("Action - All products removed, ensuring no products are associated");
      const allProductIds = oldShopifyProducts.map((p: any) => p.id);
      await ShopifyProductService.removeConfigurationFromProducts(
          admin,
        allProductIds
        );
      }

    return redirect(
      `/app/configuration${flashMessage("Configuration updated successfully")}`,
    );
  } else {
    // Normaliser les produits avant de sauvegarder en base de données
    // S'assurer que configuration.products est toujours un tableau
    let newProducts: any[] = [];
    if (configuration.products) {
      if (Array.isArray(configuration.products)) {
        newProducts = configuration.products;
      } else if (typeof configuration.products === 'string') {
        try {
          const parsed = JSON.parse(configuration.products);
          newProducts = Array.isArray(parsed) ? parsed : [];
        } catch (e) {
          newProducts = [];
        }
      }
    }
    // Mettre à jour configuration.products avec la valeur normalisée
    configuration.products = newProducts;

    console.log("Action - Creating configuration with products count:", newProducts.length);
    console.log("Action - Products to save:", newProducts);

    let configurationObject: any;
    try {
      configurationObject = await ConfigurationService.addConfiguration(
        configuration,
        session.id,
      );
    } catch (err: any) {
      const msg = err?.message || "Erreur lors de la création de la configuration.";
      return json({ status: false, message: msg, errors: {} });
    }
    console.log('demo  id selected', demoId);

    if (demoId !=undefined && demoId != null ) {
      await saveDemoData( demoId, configurationObject, session.id, plan, session.shop)
    }
    
    // Gérer les produits multiples
    if (configurationObject && newProducts.length > 0) {
      console.log("Action - Creating new configuration with products:", newProducts);
      await ShopifyProductService.updateMultipleProducts(admin, newProducts, configurationObject.id);
    }
    
    // S'assurer que l'ID est un nombre valide avant la redirection
    const configId = Number(configurationObject?.id);
    if (!configId || isNaN(configId)) {
      console.error("Invalid configuration ID:", configurationObject?.id);
      return json({ status: false, message: "Failed to create configuration", errors: {} });
    }
    
    if (configuration.productType === "neon" || configuration.productType === "channel") {
      const { getNcpcPresetConfigurationData } = await import(
        "~/utils/ncpc-config-data.server"
      );
      const ncpcProductType = configuration.productType === "channel" ? "channel" : "neon";
      const safePresetKey = ncpcPresetKey || getDefaultNcpcPresetKey(ncpcProductType);
      const requestedPricingMode =
        ncpcPricingMode || getDefaultNcpcPricingMode(ncpcProductType, safePresetKey);
      const safePricingMode =
        requestedPricingMode === "fixing-height"
          ? "fixed-height"
          : requestedPricingMode === "fixing-width"
            ? "fixed-width"
            : requestedPricingMode;

      const presetData = await getNcpcPresetConfigurationData({
        productType: ncpcProductType,
        presetKey: safePresetKey,
        pricingMode: safePricingMode,
      });

      if (!presetData || !presetData.requiredOptions || !presetData.additionalOptions) {
        return json(
          { status: false, message: "NCPC preset data is invalid", errors: {} },
          { status: 400 },
        );
      }

      const createdConfiguration = await ConfigurationService.getConfiguration(
        configId,
        session.id,
      );

      if (createdConfiguration) {
        createdConfiguration.products = Array.isArray(createdConfiguration.product)
          ? createdConfiguration.product
          : [];
        createdConfiguration.productType = ncpcProductType;
        createdConfiguration.pricingMode = safePricingMode;
        createdConfiguration.data = presetData;

        await ConfigurationService.updateConfiguration(
          createdConfiguration as ConfigurationType,
          session.id,
        );
      }

      return redirect(`/app/ncpc/${configId}/required-options${forwardedSearch}`);
    }

    return redirect(`/app/configuration/${configId}/materials${forwardedSearch}`)
  }
};


function replaceUploadsPath(data: object, newPath: string): object {
  // Check if newPath is a string
  if (typeof newPath !== "string") {
    throw new Error("newPath must be a string");
  }

  function replaceInObject(obj: any) {
    for (const key in obj) {
      if (typeof obj[key] === "string") {
        obj[key] = obj[key].replace(/^.*?\/aso_default_files\//, newPath);
      } else if (typeof obj[key] === "object") {
        replaceInObject(obj[key]);
      }
    }
  }

  replaceInObject(data);
  return data;
}


 const saveDemoData = async (demoId:number, configuration:ConfigurationType, sessionId:string, plan:any, shop:string ) => {
    if (!configuration ) {
      return  false;
    }
    
    const fontIds = [];
    const allFonts = await FontService.getFonts(sessionId);

    if(!allFonts || allFonts.length <3) {
      for (let currentfont  of fontData) {
        let fontWith:any = replaceUploadsPath(currentfont, `https://${shop}/apps/aso-proxy/aso_default_files/`);
        let newfont = await FontService.addFont({
          url: fontWith.url,
          label: currentfont.label,
          isGoogleFont: currentfont.isGoogleFont
        }, sessionId);
        fontIds.push(newfont.id);
      };
      if (configurationDemoData[demoId]?.data?.settings?.customizerSign?.text) {
        configurationDemoData[demoId].data.settings.customizerSign.text.selectedFonts = fontIds;
      }
    } else {
      configurationDemoData[demoId].data.settings.customizerSign.text.selectedFonts = allFonts.slice(0,10).map(font => font.id);
    }

    
    let configData = configurationDemoData[demoId].data;
    
    if(plan == PRICING_PLANS.STARTER) {
      configData = configFilter(configurationDemoData[demoId])?.data;
    }

    configuration.data = replaceUploadsPath(
      configData,
      `https://${shop}/apps/aso-proxy/aso_default_files/`
    );


    return  await ConfigurationService.updateConfiguration(configuration, sessionId);
};
