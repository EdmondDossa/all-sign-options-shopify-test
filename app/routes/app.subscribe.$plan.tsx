import { LoaderFunctionArgs, json, redirect } from "@remix-run/node";
import { MONTHLY_PRO_PLAN, MONTHLY_STARTER_PLAN, YEARLY_PRO_PLAN, YEARLY_STARTER_PLAN, authenticate } from "~/shopify.server";
import { isTest } from "~/utils/pricing";
import {LegacyCard, EmptyState} from '@shopify/polaris';


export const loader = async ({ request, params }: LoaderFunctionArgs) => {
    const { billing } = await authenticate.admin(request);


    try {
        switch (params.plan) {
            case "monthly-starter":
                await billing.require({
                    plans: [MONTHLY_STARTER_PLAN],
                    isTest:isTest(),
                    onFailure: async () => billing.request({ plan: MONTHLY_STARTER_PLAN, isTest:isTest() }),
                });
                break;
            case "yearly-starter":
                await billing.require({
                    plans: [YEARLY_STARTER_PLAN],
                    isTest:isTest(),
                    onFailure: async () => billing.request({ plan: YEARLY_STARTER_PLAN, isTest:isTest() }),
                });
                break;
            
            case "monthly-pro":
                await billing.require({
                    plans: [MONTHLY_PRO_PLAN],
                    isTest:isTest(),
                    onFailure: async () => billing.request({ plan: MONTHLY_PRO_PLAN, isTest:isTest() }),
                });
                break;
            case "yearly-pro":
                    await billing.require({
                        plans: [YEARLY_PRO_PLAN],
                        isTest:isTest(),
                        onFailure: async () => billing.request({ plan: YEARLY_PRO_PLAN, isTest:isTest() }),
                    });
                    break;
        
            default:
                break;
        }
      
    } catch (error) {
        
        return json({ error: error });
    }

    
   
  
    return redirect("/app/configuration");
  
}



export default function EmptyStateExample() {
    return (
        <LegacyCard sectioned>
        <EmptyState
          heading="Something has gone wrong"
          secondaryAction={{
            content: 'Learn more',
            url: 'https://help.shopify.com',
          }}
          image="/aso_logo.png"
        >
          <p>Please , try again or contact support</p>
        </EmptyState>
      </LegacyCard>
    );
  }
  
  