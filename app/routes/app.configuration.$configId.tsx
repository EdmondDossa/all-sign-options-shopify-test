import { LoaderFunctionArgs } from "@remix-run/node";
import { Outlet, json, useLoaderData } from "@remix-run/react";
import ConfigurationService from "~/models/Configuration.service";
import { authenticate } from "~/shopify.server";
import { redirect } from "@remix-run/node";

const normalizeProductType = (value?: string | null) =>
  String(value || "")
    .trim()
    .toLowerCase();

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

const isNcpcConfiguration = (configuration: any) => {
  const data = parseConfigData(configuration?.data);
  const productType = normalizeProductType(configuration?.productType);
  if (productType === "neon" || productType === "channel") {
    return true;
  }

  const dataProductType = normalizeProductType(data?.productType);
  if (dataProductType === "neon" || dataProductType === "channel") {
    return true;
  }

  const wrappedNcpcData = parseConfigData(data?.ncpc);
  const wrappedProductType = normalizeProductType(wrappedNcpcData?.productType);
  if (wrappedProductType === "neon" || wrappedProductType === "channel") {
    return true;
  }
  return false;
};

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const { session, admin } = await authenticate.admin(request);
  const configId = parseInt(params.configId ?? "");
  let configuration = await ConfigurationService.getConfiguration(configId,session.id);

  if (!Number.isNaN(configId)) {
    configuration = await ConfigurationService.getConfiguration(configId,session.id);
  }

  if (configuration) {
    const pathname = new URL(request.url).pathname;
    const canStayOnClassicRoute = pathname.endsWith("/preview");

    if (isNcpcConfiguration(configuration) && !canStayOnClassicRoute) {
      throw redirect(`/app/ncpc/${configId}/required-options`);
    }
  }

  // Extraire materials de la configuration
  const materials = configuration?.data?.materials || [];
  
  return json({ configuration, materials });
};

export default function ConfigurationView() {
  const {configuration, materials} = useLoaderData<typeof loader>();
    
  return (
    <Outlet context={{configuration, materials}} />
  );
}
