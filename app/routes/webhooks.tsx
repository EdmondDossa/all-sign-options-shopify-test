import type { ActionFunctionArgs } from "@remix-run/node";
import { authenticate } from "../shopify.server";
import db from "../db.server";

export const action = async ({ request }: ActionFunctionArgs) => {

  const { topic, shop, session, admin, payload } = await authenticate.webhook(
    request
    );
    console.log("customers data request ", topic, payload);

  if (!admin) {
    // The admin context isn't returned if the webhook fired after a shop was uninstalled.
    throw new Response();
  }

  switch (topic) {
    case "APP_UNINSTALLED":
      if (session) {
        await db.session.deleteMany({ where: { shop } });
      }

      break;
    case "CUSTOMERS_DATA_REQUEST": 
      console.log("customers data request", payload);
      return new Response("customers data request is received", { status: 200 });
      break;
 
    case "CUSTOMERS_REDACT":
      console.log("customer redact request", payload);
      return new Response("customer redact request is received", { status: 200 });
      break;
    case "SHOP_REDACT":
      console.log("shop redact request", payload);
      return new Response("shop data request is received", { status: 200 });
      break;
    default:
      throw new Response("Unhandled webhook topic", { status: 404 });
  }

  throw new Response();
};
