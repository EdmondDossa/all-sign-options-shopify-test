import type { ActionFunctionArgs } from "@remix-run/node";
import { authenticate } from "../shopify.server";
import db from "../db.server";
import { OrderCreateWebhook } from "~/webhooks/OrderCreateWebhook";

export const action = async ({ request }: ActionFunctionArgs) => {
  console.log("webhook call ");
  const { topic, shop, session, admin, payload } = await authenticate.webhook(
    request
    );
    console.log("customers data request ", topic);

  if (!admin) {
    // The admin context isn't returned if the webhook fired after a shop was uninstalled.
    throw new Response();
  }

  switch (topic) {
    case "APP_UNINSTALLED":
      if (session) {
        await db.session.deleteMany({ where: { shop } });
        await db.upload.deleteMany({ where: { shop } });
      }
      return new Response("App uninstalled webhook processed", { status: 200 });
    
    case "ORDERS_CREATE":
      new Promise(async(resolve, reject) => {
        await OrderCreateWebhook(admin, session, payload);
        console.log("Order create webhook function completed");
      });
      console.log("Order create webhook function started");
      return new Response("Order create webhook processed", { status: 200 });
    
    // Compliance webhooks are now handled by dedicated route files:
    // - webhooks.customers.data_request.tsx
    // - webhooks.customers.redact.tsx  
    // - webhooks.shop.redact.tsx
    case "CUSTOMERS_DATA_REQUEST":
    case "CUSTOMERS_REDACT":
    case "SHOP_REDACT":
      console.log(`Compliance webhook ${topic} should be handled by dedicated route`);
      return new Response(`Compliance webhook ${topic} processed`, { status: 200 });
    
    default:
      throw new Response("Unhandled webhook topic", { status: 404 });
  }

  throw new Response();
};
