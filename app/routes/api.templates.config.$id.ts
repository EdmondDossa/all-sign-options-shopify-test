import { ActionFunctionArgs, LoaderFunctionArgs, json } from "@remix-run/node";
import SettingShapesService from "~/models/SettingShapes.service";
import TemplateService from "~/models/Template.service";
import { authenticate } from "~/shopify.server";

import { parseWithZod } from "@conform-to/zod";
import { z } from "zod";
import { jFlashMessage } from "~/utils/message-flash";
import { jsonTransform } from "~/utils/transfomerZod";
import { replaceUploadsAddShopUrl } from "~/utils/fileUrl";
import prisma from "~/db.server";



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

    let data = await TemplateService.getTemplate(parseInt(`${params.id}`),sessionId);
    
    return json(data );

};
  


const formSchema = z.object({
  data: z.any().transform(jsonTransform)
});



export const action = async ({ request , params}: ActionFunctionArgs) => {
    console.log("request header", request.headers.get("Aso-Access-Token"));
    const session = await prisma.session.findFirst({ where: { accessToken: request.headers.get("Aso-Access-Token") || "" } });
    if (!session) {
      return json({ error: "Session not found" });
    }
    

  
  const jsonData = await request.json();


  const  id =   params.id || "";


  let res = await TemplateService.configTemplate(parseInt(id), session.id, replaceUploadsAddShopUrl(jsonData?.data, session.shop));
    return res ? json(jFlashMessage("template  configuration is completed successfully").messageFlash)
      : json(jFlashMessage("error on template upadating").messageFlash );
 
};

