import "@shopify/shopify-app-remix/adapters/node";
import {
  AppDistribution,
  DeliveryMethod,
  shopifyApp,
  ApiVersion,
  BillingInterval,
} from "@shopify/shopify-app-remix/server";
import { PrismaSessionStorage } from "@shopify/shopify-app-session-storage-prisma";
import prisma from "./db.server";
import { PLAN_PRICES, PLAN_TRIAL_DAYS } from "./utils/pricing";
export const MONTHLY_STARTER_PLAN = "Monthly Basic Plan";
export const YEARLY_STARTER_PLAN = "Yearly Basic Plan";
export const MONTHLY_PRO_PLAN = "Monthly Premium Plan";
export const YEARLY_PRO_PLAN = "Yearly Premium plan";



const shopify = shopifyApp({
  apiKey: process.env.SHOPIFY_API_KEY,
  apiSecretKey: process.env.SHOPIFY_API_SECRET || "",
  apiVersion: ApiVersion.January25,
  scopes: process.env.SCOPES?.split(","),
  appUrl: process.env.SHOPIFY_APP_URL || "",
  authPathPrefix: "/auth",
  sessionStorage: new PrismaSessionStorage(prisma),
  distribution: AppDistribution.AppStore,
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
      trialDays: PLAN_TRIAL_DAYS,
      lineItems:[
        {
          amount: PLAN_PRICES.MONTHLY_STARTER_PLAN,
          currencyCode: 'USD',
          interval: BillingInterval.Every30Days,
        }
      ]
    },
    [YEARLY_STARTER_PLAN]: {
      
      trialDays: PLAN_TRIAL_DAYS,
      lineItems:[
        {
          amount: PLAN_PRICES.YEARLY_STARTER_PLAN,
          currencyCode: 'USD',
          interval: BillingInterval.Annual,  
        }
      ]
    },
    [MONTHLY_PRO_PLAN]: {
     
      trialDays: PLAN_TRIAL_DAYS,
      lineItems:[
        {
          amount: PLAN_PRICES.MONTHLY_PRO_PLAN,
          currencyCode: 'USD',
          interval: BillingInterval.Every30Days,
        }
      ]
    },
    [YEARLY_PRO_PLAN]: {
      
      trialDays: PLAN_TRIAL_DAYS,
      lineItems:[
        {
          amount: PLAN_PRICES.YEARLY_PRO_PLAN,
          currencyCode: 'USD',
          interval: BillingInterval.Annual,
        }
      ]
    },
   
  },
  hooks: {
    afterAuth: async ({ session }) => {
      shopify.registerWebhooks({ session });
    },
  },
  future: {
    unstable_newEmbeddedAuthStrategy: true,
    removeRest: true,
  },
  ...(process.env.SHOP_CUSTOM_DOMAIN
    ? { customShopDomains: [process.env.SHOP_CUSTOM_DOMAIN] }
    : {}),
});



export default shopify;
export const apiVersion = ApiVersion.January25;
export const addDocumentResponseHeaders = shopify.addDocumentResponseHeaders;
export const authenticate = shopify.authenticate;
export const unauthenticated = shopify.unauthenticated;
export const login = shopify.login;
export const registerWebhooks = shopify.registerWebhooks;
export const sessionStorage = shopify.sessionStorage;




