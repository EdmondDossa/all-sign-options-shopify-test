import { LoaderFunctionArgs, json } from "@remix-run/node";
import ConfigurationService from "~/models/Configuration.service";
import { authenticate } from "~/shopify.server";
import { PRICING_PLANS, getPlanProxy, getPlanProxyPublic } from "~/utils/pricing";
import prisma from "~/db.server";
import { configFilter } from "~/utils/config-filter";


export const loader = async ({ request, params }: LoaderFunctionArgs) => {
    let asoAccessToken = request.headers.get("Aso-Access-Token") || "" ;
    let admin: any = null;
    let session: any = null;
    if (!asoAccessToken) {
        ({ admin, session } = await authenticate.public.appProxy(request));
    }

    if (!admin || !session) {
        try {
            session = await prisma.session.findFirst({ where: { accessToken: request.headers.get("Aso-Access-Token") || "" } }) ;
        if (!session) {
          return json({ error: "Session not found" });
        } 
        }catch (error) {
          return json({ error: "Session not found" , allerros: error });
        }
    }

   
    let sessionId = session.id;

   
    

    let plan: string = "";
    


    if (admin) {
        plan = await getPlanProxy(admin);
       
    }else{
        plan = await getPlanProxyPublic(session.shop, session.accessToken);
    }


    let configs = await ConfigurationService.getConfigurations(sessionId, true);

    let config = null;

    if (plan =="free" || !configs) {
        return json(null);
    }
    
    if (plan == PRICING_PLANS.STARTER) {
        configs = configs?.slice(0, PRICING_PLANS.STARTER_RULES.configurations)
        config = configs?.find((curr: any) => curr.id == params.id)
    } else {
        config = configs?.find((curr: any) => curr.id == params.id)
    }

    

    if (plan == PRICING_PLANS.STARTER) {
        config = configFilter(config);
    }

   

    
    return json(config );
};
  