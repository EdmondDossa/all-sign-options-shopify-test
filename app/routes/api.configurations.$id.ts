import { LoaderFunctionArgs, json } from "@remix-run/node";
import ConfigurationService from "~/models/Configuration.service";
import { authenticate } from "~/shopify.server";
import { PRICING_PLANS } from "~/utils/pricing";
import {  getPlanProxy, getPlanProxyPublic } from "~/utils/pricing-server.server";
import prisma from "~/db.server";
import { configFilter } from "~/utils/config-filter";
import { replaceDomainUrl } from "~/utils/fileUrlServer.server";


export const loader = async ({ request, params }: LoaderFunctionArgs) => {
    console.log('🔥 API configurations called - START');
    try {
        console.log("API configurations called with params:", params);
        let asoAccessToken = request.headers.get("Aso-Access-Token") || "" ;
        let admin: any = null;
        let session: any = null;
        
        if (!asoAccessToken) {
            ({ admin, session } = await authenticate.public.appProxy(request));
        }

        if (!admin || !session) {
            try {
                session = await prisma.session.findFirst({ where: { accessToken: asoAccessToken } });
            if (!session) {
              return json({ error: "Session not found" });
            } 
            }catch (error) {
              return json({ error: "Session not found", details: error });
            }
        }

        let sessionId = session.id;
        let plan: string = "";
        
        try {
            if (admin) {
                plan = await getPlanProxy(admin, session.shop);
            } else {
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

        // Debug log to check materialType and productType
        console.log("API configurations - Config found:", {
            id: config?.id,
            materialType: config?.materialType,
            productType: config?.productType,
            pricingMode: config?.pricingMode,
            name: config?.name
        });
        
        if (plan == PRICING_PLANS.STARTER) {
            configs = configs?.slice(0, PRICING_PLANS.STARTER_RULES.configurations)
            config = configs?.find((curr: any) => curr.id == params.id)
        } 

        if (plan == PRICING_PLANS.STARTER) {
            config = configFilter(config);
        }

        config = await replaceDomainUrl(config, admin, {
            shopDomain: session?.shop || "",
        });

        const normalizedProductType = String(config?.productType || "")
          .trim()
          .toLowerCase();
        const isNcpcConfiguration =
          normalizedProductType === "neon" || normalizedProductType === "channel";

        // Ajouter materialType dans l'objet data uniquement pour le flux legacy (non-NCPC)
        if (config && config.data && !isNcpcConfiguration) {
            config.data.materialType = config.materialType;
        }

        // S'assurer que materialType et productType sont bien présents au niveau racine ET dans data
        console.log("API configurations - Final config before return:", {
            id: config?.id,
            materialType: config?.materialType,
            productType: config?.productType,
            pricingMode: config?.pricingMode,
            dataMaterialType: config?.data?.materialType,
            hasData: !!config?.data
        });

        return json(config);

    } catch (error) {
        console.error('Error in configurations API:', error);
        return json({ error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
    }
};
