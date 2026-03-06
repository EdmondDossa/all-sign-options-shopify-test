import { json, redirect } from "@remix-run/node";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import NcpcConfigurationService from "~/models/NcpcConfiguration.service";
import { authenticate } from "~/shopify.server";

const getCurrencySymbol = (currencyCode: string) => {
  try {
    const parts = new Intl.NumberFormat("en", {
      style: "currency",
      currency: currencyCode,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).formatToParts(0);

    return parts.find((part) => part.type === "currency")?.value || currencyCode;
  } catch {
    return currencyCode;
  }
};

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const { session, admin } = await authenticate.admin(request);
  const configId = parseInt(`${params.configId || ""}`, 10);
  if (Number.isNaN(configId)) {
    throw redirect("/app/configuration");
  }

  const context = await NcpcConfigurationService.getContext(configId, session.id);
  if (!context) {
    throw redirect("/app/configuration");
  }
  const { configuration } = context;

  const response = await admin.graphql(
    `#graphql
  query {
    shop {
      name
      currencyCode
      checkoutApiSupported
      taxesIncluded
      resourceLimits {
        maxProductVariants
      }
    }
  }`,
  );

  const responseJson = await response.json();
  const shop = responseJson.data.shop;
  const currencySymbol = getCurrencySymbol(shop.currencyCode);

  return json({ shop, currencySymbol, configuration });
};

export default function NcpcSettingsLayout() {
  const { shop, currencySymbol, configuration } = useLoaderData<typeof loader>();
  return <Outlet context={{ configuration, shop, currencySymbol }} />;
}
