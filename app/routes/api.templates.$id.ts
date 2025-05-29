import { LoaderFunctionArgs, json } from "@remix-run/node";
import SettingShapesService from "~/models/SettingShapes.service";
import TemplateService from "~/models/Template.service";
import { authenticate } from "~/shopify.server";
import prisma from "~/db.server";
import { replaceDomainUrl } from "~/utils/fileUrlServer.server";


export const loader = async ({ request, params }: LoaderFunctionArgs) => {
    let asoAccessToken = request.headers.get("Aso-Access-Token") || "" ;
    let admin: any = null;
    let session: any = null;
    if (!asoAccessToken) {
        ({ admin, session } = await authenticate.public.appProxy(request));
    }
    if (!admin || !session) {
         session = await prisma.session.findFirst({ where: { accessToken: request.headers.get("Aso-Access-Token") || "" } }) ;
        if (!session) {
          return json({ error: "Session not found" });
        }
    }
    let sessionId = session.id;
   
    
    
    let data = await TemplateService.getTemplate(parseInt(`${params.id}`), sessionId);
    
    data  = await replaceDomainUrl(data, admin);
    
    return !asoAccessToken  ? await replaceDomainUrl(data, admin) : json(data );

};
  