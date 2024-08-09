import { redirect } from "@remix-run/node";
import { ShopifyBillingService } from "~/models/ShopifyBilling.service";
import { MONTHLY_PRO_PLAN, MONTHLY_STARTER_PLAN, YEARLY_PRO_PLAN, YEARLY_STARTER_PLAN } from "~/shopify.server";

export const getPlan = async (billing:any) => {
    const {hasActivePayment:hasProPlan } = await billing.check({
        plans: [MONTHLY_PRO_PLAN, YEARLY_PRO_PLAN],
        isTest: isTest()
      });
       
      const {hasActivePayment:hasStarterPlan  } = await billing.check({
        plans: [MONTHLY_STARTER_PLAN, YEARLY_STARTER_PLAN],
        isTest: isTest()
      });
    
    return hasProPlan?'pro':hasStarterPlan?'starter':"free"
}


export const getPlanDuration = async (billing:any) => {
  const {hasActivePayment:hasYearPlan } = await billing.check({
      plans: [YEARLY_STARTER_PLAN, YEARLY_PRO_PLAN],
      isTest: isTest()
    });
  
  return hasYearPlan?'year':"month"
}


export const getPlanProxy = async (admin:any) => {
  const plans = await ShopifyBillingService.getBilling(admin);
  
  if (plans?.length > 0) {
    for (const plan of plans) {
      if (plan.test == isTest()) {
        
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



export const getPlanProxyPublic = async (shop:any, accessToken:any) => {
  const plans = await ShopifyBillingService.getBillingRequest(shop, accessToken);
  
  if (plans?.length > 0) {
    for (const plan of plans) {
      if (plan.test == isTest()) {
        
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



export const subscriptionRequired = async (billing: any)=>{
  
  const billingCheck = await billing.require({
    plans: [MONTHLY_STARTER_PLAN, MONTHLY_PRO_PLAN, YEARLY_STARTER_PLAN, YEARLY_PRO_PLAN],
    isTest:isTest(),
      onFailure: async () => redirect('/app/pricing')
  });
}



export const proSubscriptionRequired = async (billing: any)=>{
  
  const billingCheck = await billing.require({
    plans: [MONTHLY_PRO_PLAN, YEARLY_PRO_PLAN],
    isTest:isTest(),
      onFailure: async () => redirect('/app/pricing')
  });
}

export const isTest = () => process.env.IS_TEST ? true : false;
   
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