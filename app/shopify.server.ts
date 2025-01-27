import "@shopify/shopify-app-remix/adapters/node";
import {
  AppDistribution,
  DeliveryMethod,
  shopifyApp,
  LATEST_API_VERSION,
  BillingInterval,
} from "@shopify/shopify-app-remix/server";
import { PrismaSessionStorage } from "@shopify/shopify-app-session-storage-prisma";
import { restResources } from "@shopify/shopify-api/rest/admin/2024-01";
import prisma from "./db.server";
export const MONTHLY_STARTER_PLAN = "Monthly Basic Plan";
export const YEARLY_STARTER_PLAN = "Yearly Basic Plan";
export const MONTHLY_PRO_PLAN = "Monthly Premium Plan";
export const YEARLY_PRO_PLAN = "Yearly Premium plan";
export const PLAN_PRICES = {
  "MONTHLY_STARTER_PLAN": 29,
  "YEARLY_STARTER_PLAN": 279,
  "MONTHLY_PRO_PLAN": 49,
  "YEARLY_PRO_PLAN": 471,
};
export const PLAN_TRIAL_DAYS = 15;


const shopify = shopifyApp({
  apiKey: process.env.SHOPIFY_API_KEY,
  apiSecretKey: process.env.SHOPIFY_API_SECRET || "",
  apiVersion: LATEST_API_VERSION,
  scopes: process.env.SCOPES?.split(","),
  appUrl: process.env.SHOPIFY_APP_URL || "",
  authPathPrefix: "/auth",
  sessionStorage: new PrismaSessionStorage(prisma),
  distribution: AppDistribution.AppStore,
  restResources,
  webhooks: {
    APP_UNINSTALLED: {
      deliveryMethod: DeliveryMethod.Http,
      callbackUrl: "/webhooks",
    },
    CUSTOMERS_DATA_REQUEST: {
      deliveryMethod: DeliveryMethod.Http,
      callbackUrl: "/webhooks",
    },
    CUSTOMERS_REDACT: {
      deliveryMethod: DeliveryMethod.Http,
      callbackUrl: "/webhooks",
    },
    SHOP_REDACT: {
      deliveryMethod: DeliveryMethod.Http,
      callbackUrl: "/webhooks",
    },
    ORDERS_CREATE: {
      deliveryMethod: DeliveryMethod.Http,
      callbackUrl: "/webhooks",
      callback: async (topic,shop, body, webwookId)=>{
        console.log("========= order creatd ========")
        const  payload = JSON.parse(body)
        console.log('==== playlod',payload);
        console.log("========= order creatd end========")
      }
    }
  },
  billing: {
    [MONTHLY_STARTER_PLAN]: {
      amount: PLAN_PRICES.MONTHLY_STARTER_PLAN,
      currencyCode: 'USD',
      interval: BillingInterval.Every30Days,
      trialDays: PLAN_TRIAL_DAYS,
    },
    [YEARLY_STARTER_PLAN]: {
      amount: PLAN_PRICES.YEARLY_STARTER_PLAN,
      currencyCode: 'USD',
      interval: BillingInterval.Every30Days,
      trialDays: PLAN_TRIAL_DAYS,
    },
    [MONTHLY_PRO_PLAN]: {
      amount: PLAN_PRICES.MONTHLY_PRO_PLAN,
      currencyCode: 'USD',
      interval: BillingInterval.Every30Days,
      trialDays: PLAN_TRIAL_DAYS,
    },
    [YEARLY_PRO_PLAN]: {
      amount: PLAN_PRICES.YEARLY_PRO_PLAN,
      currencyCode: 'USD',
      interval: BillingInterval.Every30Days,
      trialDays: PLAN_TRIAL_DAYS,
    },
   
  },
  hooks: {
    afterAuth: async ({ session }) => {
      shopify.registerWebhooks({ session });
    },
  },
  future: {
    v3_webhookAdminContext: true,
    v3_authenticatePublic: true,
    unstable_newEmbeddedAuthStrategy: true,
  },
  ...(process.env.SHOP_CUSTOM_DOMAIN
    ? { customShopDomains: [process.env.SHOP_CUSTOM_DOMAIN] }
    : {}),
});

export default shopify;
export const apiVersion = LATEST_API_VERSION;
export const addDocumentResponseHeaders = shopify.addDocumentResponseHeaders;
export const authenticate = shopify.authenticate;
export const unauthenticated = shopify.unauthenticated;
export const login = shopify.login;
export const registerWebhooks = shopify.registerWebhooks;
export const sessionStorage = shopify.sessionStorage;
