import { redirect } from "@remix-run/node";
import { ShopifyBillingService } from "~/models/ShopifyBilling.service";
import { ShopifyShopService } from "~/models/ShopifyShop.service";
import { MONTHLY_PRO_PLAN, MONTHLY_STARTER_PLAN, YEARLY_PRO_PLAN, YEARLY_STARTER_PLAN } from "~/shopify.server";

export const getPlan = async (billing: any, shop?: string, admin?: any) => {
  const isDev = await ShopifyShopService.isShopInDev(admin);
  if (isDev) {
    return "pro";
  }
    const {hasActivePayment:hasProPlan } = await billing.check({
        plans: [MONTHLY_PRO_PLAN, YEARLY_PRO_PLAN],
        isTest: isTest(shop)
      });
       
      const {hasActivePayment:hasStarterPlan  } = await billing.check({
        plans: [MONTHLY_STARTER_PLAN, YEARLY_STARTER_PLAN],
        isTest: isTest(shop)
      });
    
    return hasProPlan?'pro':hasStarterPlan?'starter':"free"
}


export const getPlanDuration = async (billing:any, shop?:string) => {
  const {hasActivePayment:hasYearPlan } = await billing.check({
      plans: [YEARLY_STARTER_PLAN, YEARLY_PRO_PLAN],
      isTest: isTest(shop)
    });
  
  return hasYearPlan?'year':"month"
}


export const getPlanProxy = async (admin: any, shop?: string) => {
  const isDev = await ShopifyShopService.isShopInDev(admin);
  if (isDev) {
    return "pro";
  }

  const plans = await ShopifyBillingService.getBilling(admin);
  
  if (plans?.length > 0) {
    for (const plan of plans) {
      if (plan.test == isTest(shop)) {
        
        if (plan.name == MONTHLY_STARTER_PLAN || plan.name == YEARLY_STARTER_PLAN) {
          return "starter";
        } else if(plan.name == MONTHLY_PRO_PLAN || plan.name == YEARLY_PRO_PLAN) {
          return "pro";
          
        }
      }
      
    }
  }

  return "free"
}



export const getPlanProxyPublic = async (shop: any, accessToken: any) => {
  const isDev = await ShopifyShopService.isShopInDevPublic(shop, accessToken)
  
  if (isDev) {
    return "pro";
  }

  const plans = await ShopifyBillingService.getBillingRequest(shop, accessToken);
  
  if (plans?.length > 0) {
    for (const plan of plans) {
      if (plan.test == isTest(shop)) {
        
        if (plan.name == MONTHLY_STARTER_PLAN || plan.name == YEARLY_STARTER_PLAN) {
          return "starter";
        } else if(plan.name == MONTHLY_PRO_PLAN || plan.name == YEARLY_PRO_PLAN) {
          return "pro";
          
        }
      }
      
    }
  }

  return "free"
}



export const subscriptionRequired = async (billing: any,shop ?: string, admin?: any)=>{
  const isDev = await ShopifyShopService.isShopInDev(admin);
  if (isDev) {
    return true;
  }
  const billingCheck = await billing.require({
    plans: [MONTHLY_STARTER_PLAN, MONTHLY_PRO_PLAN, YEARLY_STARTER_PLAN, YEARLY_PRO_PLAN],
    isTest:isTest(shop),
      onFailure: async () => redirect('/app/pricing')
  });
}



export const proSubscriptionRequired = async (billing: any, shop?: string, admin?: any)=>{
  const isDev = await ShopifyShopService.isShopInDev(admin);
  if (isDev) {
    return true;
  }

  const billingCheck = await billing.require({
    plans: [MONTHLY_PRO_PLAN, YEARLY_PRO_PLAN],
    isTest:isTest(shop),
      onFailure: async () => redirect('/app/pricing')
  });
}

export const isTest = (shop?: string) => {

    if (shop && shop.startsWith("all-signs-options.myshopify.com")) {
      return true;
    }
  
    if (process.env.DEMO_SHOPS && shop && process.env.DEMO_SHOPS.includes(shop)) {
      return true;
    }
  

    return process.env.IS_TEST == "true" ? true : undefined
};
   
export const PRICING_PLANS = {
    FREE: "free",
    STARTER: "starter",
  PRO: "pro",
  STARTER_RULES: {
    configurations: 1,
    materials: 2,
    materialTypes: ["simple"],
    materialColors: 10,
    materialSizes: 10,
    materialCustomSizes: false,
    materialCustomColors: false,
    materialShapes: 5,
    materialBorders: 2,
    materialFixingMethods: 6,
    doublePart: false,
    textColors: 10,
    textCustomColors: false,
    imageColors: 10,
    imageCustomColors: false,
  }

}