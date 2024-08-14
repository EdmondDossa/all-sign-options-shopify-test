import { LoaderFunctionArgs, json, redirect } from "@remix-run/node";
import { MONTHLY_PRO_PLAN, MONTHLY_STARTER_PLAN, YEARLY_PRO_PLAN, YEARLY_STARTER_PLAN, authenticate } from "~/shopify.server";
import { isTest } from "~/utils/pricing";


export const loader = async ({ request, params }: LoaderFunctionArgs) => {
    const { billing } = await authenticate.admin(request);

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
    
    return redirect("/app/configuration");
}




  