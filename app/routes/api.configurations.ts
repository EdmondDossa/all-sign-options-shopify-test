import { LoaderFunctionArgs, json } from "@remix-run/node";
import ConfigurationService from "~/models/Configuration.service";
import { authenticate } from "~/shopify.server";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
    let { admin, session, billing }:any = await authenticate.public.appProxy(request);
    if (!admin || !session) {
         session = await prisma.session.findFirst({ where: { accessToken: request.headers.get("Aso-Access-Token") || "" } }) ;
        if (!session) {
          return json({ error: "Session not found" });
        }
    }

    console.log("billing status", billing);
    let sessionId = session.id;
    let data = await ConfigurationService.getConfigurations(sessionId);
    
    return json(data );
};
  