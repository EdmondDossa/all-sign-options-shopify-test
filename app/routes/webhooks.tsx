import type { ActionFunctionArgs } from "@remix-run/node";
import { authenticate } from "../shopify.server";
import db from "../db.server";
import { ShopifyProductService } from "~/models/ShopifyProduct.service";
import { ShopifyShopService } from "~/models/ShopifyShop.service";
import { sendRecapMail } from "~/email";
import AdmZip from "adm-zip";
import { fileBuffer, generateUniqueId, getExtensionFromBase64, uploadBufferWithName } from "~/utils/uploadBase64";
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
      }
      return new Response("customers data request is received", { status: 200 });
    case "CUSTOMERS_DATA_REQUEST": 
      console.log("customers data request", payload);
      return new Response("customers data request is received", { status: 200 });
     
 
    case "CUSTOMERS_REDACT":
      console.log("customer redact request", payload);
      return new Response("customer redact request is received", { status: 200 });
    case "SHOP_REDACT":
      console.log("shop redact request", payload);
      return new Response("shop data request is received", { status: 200 });
    case "ORDERS_CREATE":
         new Promise(async(resolve, reject) => {
           await OrderCreateWebhook(admin,session,payload);
           console.log(" load order webhook function")
         });
         console.log(" load order webhook function end");


      return new Response("shop data request is received", { status: 200 });
    default:

      throw new Response("Unhandled webhook topic", { status: 404 });
  }

  throw new Response();
};
