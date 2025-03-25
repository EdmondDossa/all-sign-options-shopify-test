import { LoaderFunctionArgs, json } from "@remix-run/node";
import prisma from "~/db.server";
import TemplateService from "~/models/Template.service";



export const loader = async ({ request, params }:LoaderFunctionArgs) => {

    const uuid = "7deaa757-6c68-4baf-8ce9-4ccfacd68972";

    if (uuid == params.uuid) {
        const  templates = await prisma.template.findMany();
        templates.forEach(async (template:any) => {
            
            if (template?.data?.cartData?.sign && !template.recaps) {
                const data = template.data;
                const size = data.cartData?.sign?.size?.value;
                await prisma.template.update({
                    where:{id:template.id},
                    data: {
                        recaps: data.cartData.sign ? {
                            customPrice: data.cartData.custom_price ,
                            priceType:data.templateData.price?.textAfter||"",
                            size: size? `${size.width?.value} x ${size.height?.value}` :"0mm x 0mm"
                        } : "",
                    },

                })
            }
        });

        return {msg:"mise a jours effectué avec  success", }
    }

    
    return  null;
}