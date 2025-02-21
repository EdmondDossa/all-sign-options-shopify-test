import { LoaderFunctionArgs, json } from "@remix-run/node";
import ConfigurationService from "~/models/Configuration.service";
import { authenticate } from "~/shopify.server";
import { PRICING_PLANS, getPlanProxy, getPlanProxyPublic } from "~/utils/pricing";
import prisma from "~/db.server";
import { configFilter } from "~/utils/config-filter";
import { replaceDomainUrl } from "~/utils/fileUrl";


export const loader = async ({ request, params }: LoaderFunctionArgs) => {
    let asoAccessToken = request.headers.get("Aso-Access-Token") || "" ;
    let admin: any = null;
    let session: any = null;
    if (!asoAccessToken) {
        ({ admin, session } = await authenticate.public.appProxy(request));
    }

    if (!admin || !session) {
        try {
            session = await prisma.session.findFirst({ where: { accessToken: request.headers.get("Aso-Access-Token") || "" } });
        if (!session) {
          return json({ error: "Session not found" });
        } 
        }catch (error) {
          return json({ error: "Session not found" , allerros: error });
        }
    }

   
    let sessionId = session.id;

   
    

    let plan: string = "";
    

    try {
        if (admin) {
            plan = await getPlanProxy(admin, session.shop);
           
        }else{
            plan = await getPlanProxyPublic(session.shop, session.accessToken);
        }
    } catch (error) {
       plan = "free"; 
    }


    let configs = await ConfigurationService.getConfigurations(sessionId, true);

    let config = null;

    if (!configs) {
        return json(null);
    }

    config = configs?.find((curr: any) => curr.id == params.id)

    
    if (plan == PRICING_PLANS.STARTER) {
        configs = configs?.slice(0, PRICING_PLANS.STARTER_RULES.configurations)
        config = configs?.find((curr: any) => curr.id == params.id)
    } 

    

    if (plan == PRICING_PLANS.STARTER) {
        config = configFilter(config);
    }

    return !asoAccessToken ?( await replaceDomainUrl(config, admin)) :configs ;
};
  