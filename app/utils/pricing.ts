import { redirect } from "@remix-run/node";
import { ShopifyBillingService } from "~/models/ShopifyBilling.service";
import { ShopifyShopService } from "~/models/ShopifyShop.service";
import { MONTHLY_PRO_PLAN, MONTHLY_STARTER_PLAN, YEARLY_PRO_PLAN, YEARLY_STARTER_PLAN } from "~/shopify.server";

export const getPlan = async (billing: any, shop?: string, admin?: any) => {
    
    const {hasActivePayment:hasProPlan } = await billing.check({
        plans: [MONTHLY_PRO_PLAN, YEARLY_PRO_PLAN],
        isTest: isTest(shop)
      });
       
      const {hasActivePayment:hasStarterPlan  } = await billing.check({
        plans: [MONTHLY_STARTER_PLAN, YEARLY_STARTER_PLAN],
        isTest: isTest(shop)
      });
  
      let  plan = hasProPlan?'pro':hasStarterPlan ? 'starter':"free"
      
      if (plan == "free") {
        const isDev = await ShopifyShopService.isShopInDev(admin);
        
        return isDev? "pro":"free";
      }
    
    return plan
}


export const getPlanOnly = async (billing: any, shop?: string, admin?: any) => {
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



export const getPlanProxy = async (admin: any, shop?: string) => {
  const plans = await ShopifyBillingService.getBilling(admin);
  
  if (plans?.length > 0) {
    for (const plan of plans) {
      if (plan.test == (isTest(shop)||false)) {
        
        if (plan.name == MONTHLY_STARTER_PLAN || plan.name == YEARLY_STARTER_PLAN) {
          return "starter";
        } else if(plan.name == MONTHLY_PRO_PLAN || plan.name == YEARLY_PRO_PLAN) {
          return "pro";
        }
      }
      
    }
  }

  const isDev = await ShopifyShopService.isShopInDev(admin);

  return isDev ? "pro" : "free";
}



export const getPlanProxyPublic = async (shop: any, accessToken: any) => {
  const plans = await ShopifyBillingService.getBillingRequest(shop, accessToken);

  if (plans?.length > 0) {
    for (const plan of plans) {
      if (plan.test == (isTest(shop)||false)) {
        
        if (plan.name == MONTHLY_STARTER_PLAN || plan.name == YEARLY_STARTER_PLAN) {
          return "starter";
        } else if(plan.name == MONTHLY_PRO_PLAN || plan.name == YEARLY_PRO_PLAN) {
          return "pro";
          
        }
      }
      
    }
  }

  const isDev = await ShopifyShopService.isShopInDevPublic(shop, accessToken)
  
  return isDev ? "pro" :"free";
}



export const subscriptionRequired = async (billing: any,shop ?: string, admin?: any)=>{
  
    // Check if the shop has an active subscription
    const {hasActivePayment  }= await billing.check({
      plans: [MONTHLY_STARTER_PLAN, MONTHLY_PRO_PLAN, YEARLY_STARTER_PLAN, YEARLY_PRO_PLAN],
      isTest:isTest(shop)
    });
  if (!hasActivePayment) {
    const isDev = await ShopifyShopService.isShopInDev(admin);
    
    if (isDev) {
      return null
    } else {
      throw redirect('/app/pricing');
    }
     
    }
}



export const proSubscriptionRequired = async (billing: any, shop?: string, admin?: any)=>{
    // Check if the shop has an active subscription
    const {hasActivePayment  }= await billing.check({
      plans: [MONTHLY_PRO_PLAN, YEARLY_PRO_PLAN],
      isTest:isTest(shop)
    });
  
  
  if (!hasActivePayment) {
      const isDev = await ShopifyShopService.isShopInDev(admin);
    if (isDev) {
        const { hasActivePayment:hasStarterPlan  }= await billing.check({
          plans: [MONTHLY_STARTER_PLAN, YEARLY_STARTER_PLAN],
          isTest:isTest(shop)
        });
        if (!hasStarterPlan) {
          return null
        }
    } 
    

    throw redirect('/app/pricing');
      
  }
}

export const isTest = (shop?: string) => {

  return process.env.IS_TEST == "true"  || process.env.IS_TEST ? true : false;
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

export const PLAN_PRICES = {
  "MONTHLY_STARTER_PLAN": 29,
  "YEARLY_STARTER_PLAN": 279,
  "MONTHLY_PRO_PLAN": 49,
  "YEARLY_PRO_PLAN": 471,
};
export const PLAN_TRIAL_DAYS = 15;