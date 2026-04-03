import { redirect } from "@remix-run/node";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { useOutletContext, useParams } from "@remix-run/react";
import SimplifiedBuilderPlaceholder from "~/components/layouts/SimplifiedBuilderPlaceholder";
import {
  isSimplifiedBuilderSection,
  SIMPLIFIED_BUILDER_SECTIONS,
  type SimplifiedBuilderSectionKey,
} from "~/utils/simplified-builder";

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  const section = String(params.section || "").trim();
  if (isSimplifiedBuilderSection(section)) {
    return null;
  }

  const configId = String(params.configId || "").trim();
  const search = new URL(request.url).search;
  throw redirect(`/app/configuration/${configId}/builder/sizes${search}`);
};

export default function SimplifiedBuilderSectionRoute() {
  const params = useParams();
  const { configuration } = useOutletContext<{ configuration: any }>();
  const section = params.section;

  if (!isSimplifiedBuilderSection(section)) {
    return null;
  }

  const content = SIMPLIFIED_BUILDER_SECTIONS[section];
  const configId = String(configuration?.id || "").trim();

  const parseConfigData = (rawData: any) => {
    if (!rawData) return null;
    if (typeof rawData === "string") {
      try {
        const parsed = JSON.parse(rawData);
        return parsed && typeof parsed === "object" ? parsed : null;
      } catch {
        return null;
      }
    }
    return typeof rawData === "object" ? rawData : null;
  };

  const data = parseConfigData(configuration?.data);
  const requiredOptions = data?.requiredOptions || {};
  const additionalOptions = data?.additionalOptions || {};
  const simplifiedBuilder = data?.simplifiedBuilder || {};
  const materials = Array.isArray(additionalOptions?.materials?.items)
    ? additionalOptions.materials.items
    : Array.isArray(simplifiedBuilder?.customizationOptions?.materials?.items)
      ? simplifiedBuilder.customizationOptions.materials.items
    : [];
  const simpleMaterials = materials.filter((material: any) => material?.type === "simple");
  const advancedMaterials = materials.filter((material: any) => material?.type === "advance");
  const snapshot = {
    sizes: Array.isArray(simplifiedBuilder?.coreSetup?.sizes?.items)
      ? simplifiedBuilder.coreSetup.sizes.items.length
      : Array.isArray(requiredOptions?.sizes?.items)
        ? requiredOptions.sizes.items.length
      : 0,
    colors: Array.isArray(simplifiedBuilder?.coreSetup?.colors?.items)
      ? simplifiedBuilder.coreSetup.colors.items.length
      : Array.isArray(requiredOptions?.colors?.items)
        ? requiredOptions.colors.items.length
      : 0,
    shapes: Array.isArray(additionalOptions?.shapes?.items)
      ? additionalOptions.shapes.items.length
      : Array.isArray(simplifiedBuilder?.customizationOptions?.shapes?.items)
        ? simplifiedBuilder.customizationOptions.shapes.items.length
      : 0,
    fixingMethods: Array.isArray(additionalOptions?.fixingMethods?.items)
      ? additionalOptions.fixingMethods.items.length
      : Array.isArray(simplifiedBuilder?.customizationOptions?.fixingMethods?.items)
        ? simplifiedBuilder.customizationOptions.fixingMethods.items.length
      : 0,
    borders: Array.isArray(additionalOptions?.borders?.items)
      ? additionalOptions.borders.items.length
      : Array.isArray(simplifiedBuilder?.customizationOptions?.borders?.items)
        ? simplifiedBuilder.customizationOptions.borders.items.length
      : 0,
    additionalInputs: Array.isArray(additionalOptions?.components?.items)
      ? additionalOptions.components.items.length
      : Array.isArray(simplifiedBuilder?.customizationOptions?.components?.items)
        ? simplifiedBuilder.customizationOptions.components.items.length
        : Array.isArray(additionalOptions?.additionalInputs?.items)
          ? additionalOptions.additionalInputs.items.length
          : Array.isArray(simplifiedBuilder?.customizationOptions?.additionalInputs?.items)
            ? simplifiedBuilder.customizationOptions.additionalInputs.items.length
      : 0,
    customSizes: 0,
  };

  const productsCount = Array.isArray(configuration?.products) ? configuration.products.length : 0;

  const legacyRouteBySection: Partial<Record<SimplifiedBuilderSectionKey, { label: string; url: string }>> = {
    sizes: {
      label: "Open current materials flow",
      url: `/app/configuration/${configId}/materials`,
    },
    pricing: {
      label: "Open current materials flow",
      url: `/app/configuration/${configId}/materials`,
    },
    colors: {
      label: "Open current materials flow",
      url: `/app/configuration/${configId}/materials`,
    },
    materials: {
      label: "Open current materials flow",
      url: `/app/configuration/${configId}/materials`,
    },
    "fixing-methods": {
      label: "Open current materials flow",
      url: `/app/configuration/${configId}/materials`,
    },
    shapes: {
      label: "Open current materials flow",
      url: `/app/configuration/${configId}/materials`,
    },
    borders: {
      label: "Open current materials flow",
      url: `/app/configuration/${configId}/materials`,
    },
    "additional-inputs": {
      label: "Open current materials flow",
      url: `/app/configuration/${configId}/materials`,
    },
    general: {
      label: "Open current general settings",
      url: `/app/configuration/${configId}/settings/general`,
    },
    "language-images": {
      label: "Open current language settings",
      url: `/app/configuration/${configId}/settings/language-text`,
    },
    "theme-color": {
      label: "Open current theme settings",
      url: `/app/configuration/${configId}/settings/theme-color`,
    },
    fonts: {
      label: "Open Manage Fonts",
      url: "/app/manage-font",
    },
  };

  const statsBySection: Record<
    SimplifiedBuilderSectionKey,
    Array<{ label: string; value: string; tone?: "info" | "success" | "warning" | "attention" }>
  > = {
    sizes: [
      { label: "Materials", value: String(materials.length), tone: "info" },
      { label: "Sizes", value: String(snapshot.sizes), tone: "success" },
      { label: "Custom size rules", value: String(snapshot.customSizes), tone: "warning" },
      { label: "Products", value: String(productsCount) },
    ],
    pricing: [
      {
        label: "Pricing mode",
        value: String(
          requiredOptions?.pricing?.mode ||
            simplifiedBuilder?.coreSetup?.pricing?.mode ||
            configuration?.pricingMode ||
            "-",
        ),
        tone: "info",
      },
      { label: "Materials", value: String(materials.length), tone: "success" },
      { label: "Simple materials", value: String(simpleMaterials.length) },
      { label: "Advanced materials", value: String(advancedMaterials.length) },
    ],
    fonts: [
      { label: "Products", value: String(productsCount), tone: "info" },
      { label: "Material type", value: String(configuration?.materialType || "-"), tone: "success" },
      { label: "Product type", value: String(configuration?.productType || "-") },
      { label: "Config name", value: String(configuration?.name || "-") },
    ],
    colors: [
      { label: "Materials", value: String(materials.length), tone: "info" },
      { label: "Colors", value: String(snapshot.colors), tone: "success" },
      { label: "Shapes", value: String(snapshot.shapes) },
      { label: "Borders", value: String(snapshot.borders) },
    ],
    materials: [
      { label: "Materials", value: String(materials.length), tone: "success" },
      { label: "Simple", value: String(simpleMaterials.length), tone: "info" },
      { label: "Advanced", value: String(advancedMaterials.length), tone: "warning" },
      { label: "Products", value: String(productsCount) },
    ],
    "fixing-methods": [
      { label: "Materials", value: String(materials.length), tone: "info" },
      { label: "Fixing methods", value: String(snapshot.fixingMethods), tone: "success" },
      { label: "Shapes", value: String(snapshot.shapes) },
      { label: "Sizes", value: String(snapshot.sizes) },
    ],
    shapes: [
      { label: "Materials", value: String(materials.length), tone: "info" },
      { label: "Shapes", value: String(snapshot.shapes), tone: "success" },
      { label: "Colors", value: String(snapshot.colors) },
      { label: "Fixing methods", value: String(snapshot.fixingMethods) },
    ],
    borders: [
      { label: "Materials", value: String(materials.length), tone: "info" },
      { label: "Borders", value: String(snapshot.borders), tone: "success" },
      { label: "Colors", value: String(snapshot.colors) },
      { label: "Shapes", value: String(snapshot.shapes) },
    ],
    "additional-inputs": [
      { label: "Materials", value: String(materials.length), tone: "info" },
      { label: "Additional inputs", value: String(snapshot.additionalInputs), tone: "success" },
      { label: "Products", value: String(productsCount) },
      { label: "Material type", value: String(configuration?.materialType || "-") },
    ],
    general: [
      { label: "Products", value: String(productsCount), tone: "info" },
      { label: "Material type", value: String(configuration?.materialType || "-"), tone: "success" },
      { label: "Product type", value: String(configuration?.productType || "-") },
      { label: "Pricing mode", value: String(configuration?.pricingMode || "-") },
    ],
    "language-images": [
      { label: "Products", value: String(productsCount), tone: "info" },
      { label: "Materials", value: String(materials.length), tone: "success" },
      { label: "Colors", value: String(snapshot.colors) },
      { label: "Additional inputs", value: String(snapshot.additionalInputs) },
    ],
    "theme-color": [
      { label: "Products", value: String(productsCount), tone: "info" },
      { label: "Materials", value: String(materials.length), tone: "success" },
      { label: "Material type", value: String(configuration?.materialType || "-") },
      { label: "Pricing mode", value: String(configuration?.pricingMode || "-") },
    ],
    "sort-options": [
      { label: "Materials", value: String(materials.length), tone: "info" },
      { label: "Sizes", value: String(snapshot.sizes), tone: "success" },
      { label: "Colors", value: String(snapshot.colors) },
      { label: "Additional inputs", value: String(snapshot.additionalInputs) },
    ],
  };

  const noteBySection: Partial<Record<SimplifiedBuilderSectionKey, string>> = {
    sizes: "Current classic data still lives under materials. This screen is the simplified entry point that will absorb that logic.",
    pricing: "Classic pricing is still spread across materials and config-level values. This screen will become the single merchant-facing entry point.",
    fonts: "Fonts are currently managed through the shared Manage Fonts library. This screen will later connect config-level availability to that source.",
    colors: "Colors are still configured inside the legacy material flow. The builder will flatten that into a simpler merchant view.",
    materials: "Materials are the main target of the simplification. The goal is to stop forcing merchants into material-deep routes for everyday setup.",
  };

  const legacyRoute = legacyRouteBySection[section];

  return (
    <SimplifiedBuilderPlaceholder
      title={content.title}
      description={content.description}
      items={content.items}
      stats={statsBySection[section]}
      legacyLabel={legacyRoute?.label}
      legacyUrl={legacyRoute?.url}
      note={noteBySection[section]}
    />
  );
}
