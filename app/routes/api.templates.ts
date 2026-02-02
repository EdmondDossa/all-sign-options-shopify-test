import { LoaderFunctionArgs, json } from "@remix-run/node";
import TemplateService from "~/models/Template.service";
import { authenticate } from "~/shopify.server";
import { PRICING_PLANS } from "~/utils/pricing";
import { getPlanProxy } from "~/utils/pricing-server.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { admin, session } = await authenticate.public.appProxy(request);
  if (!admin || !session) {
    return json({ error: "shop not found here" });
  }

  const url = new URL(request.url);
  const productId = url.searchParams.get("productId");

  let data: any[] | null;
  if (productId && productId.trim()) {
    data = await TemplateService.getTemplatesForProduct(session.id, productId.trim());
  } else {
    data = await TemplateService.getTemplates(session.id);
  }

  if (admin) {
    const plan = await getPlanProxy(admin, session?.shop);
    if (plan === "free" || plan === PRICING_PLANS.STARTER) {
      return json(null);
    }
  }

  return json(data ?? []);
};
  