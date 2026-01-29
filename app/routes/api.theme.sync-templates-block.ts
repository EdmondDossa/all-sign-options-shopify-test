import type { ActionFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { authenticate } from "~/shopify.server";
import { syncTemplatesBlockOnProductTemplate } from "~/models/Theme.service.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  if (request.method !== "POST") {
    return json({ ok: false, message: "Method not allowed" }, { status: 405 });
  }

  const { session } = await authenticate.admin(request);
  if (!session?.shop || !session.accessToken) {
    return json({ ok: false, message: "Unauthorized" }, { status: 401 });
  }

  const extensionId = process.env.SHOPIFY_ALL_SIGNS_OPTIONS_FRONTEND_ID;
  if (!extensionId) {
    return json({ ok: false, message: "Extension ID not configured (SHOPIFY_ALL_SIGNS_OPTIONS_FRONTEND_ID)" }, { status: 500 });
  }

  const result = await syncTemplatesBlockOnProductTemplate(
    session.shop,
    session.accessToken,
    extensionId
  );

  return json(result, result.ok ? { status: 200 } : { status: 400 });
};
