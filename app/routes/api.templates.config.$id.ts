import { ActionFunctionArgs, LoaderFunctionArgs, json } from "@remix-run/node";
import TemplateService from "~/models/Template.service";
import { authenticate } from "~/shopify.server";
import { z } from "zod";
import { jFlashMessage } from "~/utils/message-flash";
import { jsonTransform } from "~/utils/transfomerZod";
import { getShopProxyUrlWithSlash, replaceUploadsAddShopUrl } from "~/utils/fileUrl";
import prisma from "~/db.server";
import { uploadBase64 } from "~/utils/uploadBase64";



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
    const session = await prisma.session.findFirst({ where: { accessToken: request.headers.get("Aso-Access-Token") || "" } });
    if (!session) {
      return json({ error: "Session not found" });
    }
  
    const jsonData = await request.json();
    const  designImages =  jsonData.data.cartData.designImages;

    const  id =   params.id || "";

    let designImage = "";


    const  template =  await  TemplateService.getTemplate(parseInt(id), session.id);

    //  save  template  image as  prevImg
    if(designImages.face1?.length && template.enabledAutoImgUpdate){
      designImage = uploadBase64(designImages.face1[0].format, designImages.face1[0].url,session.id)
      designImage = getShopProxyUrlWithSlash(session.shop) + designImage;

    }else if(template.enabledAutoImgUpdate) {
      designImage = uploadBase64(designImages[0].format, designImages[0].url,session.id)
      designImage = getShopProxyUrlWithSlash(session.shop) + designImage;
    }

    let res = await TemplateService.configTemplate(parseInt(id), session.id, replaceUploadsAddShopUrl(jsonData?.data, session.shop), designImage);
    
    return res ? json(jFlashMessage("template  configuration is completed successfully").messageFlash)
      : json(jFlashMessage("error on template upadating").messageFlash );
 
};

