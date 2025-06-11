import { redirect } from "@remix-run/node";
import { ShopifyBillingService } from "~/models/ShopifyBilling.service.server";
import { ShopifyShopService } from "~/models/ShopifyShop.service.server";
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

  return process.env.IS_TEST == "true" ? true : false;
};
   
