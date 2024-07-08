import { LoaderFunctionArgs, json } from "@remix-run/node";
import ConfigurationService from "~/models/Configuration.service";
import { authenticate } from "~/shopify.server";
import { PRICING_PLANS, getPlanProxy } from "~/utils/pricing";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
    let { admin, session, billing }: any = await authenticate.public.appProxy(request);
    if (!admin || !session) {
         session = await prisma.session.findFirst({ where: { accessToken: request.headers.get("Aso-Access-Token") || "" } }) ;
        if (!session) {
          return json({ error: "Session not found" });
        }
    }

   
    let sessionId = session.id;

    let config = await ConfigurationService.getConfiguration(parseInt(params.id || "0"), sessionId);
    

    let plan:string = "";

    if (admin) {

        plan = await getPlanProxy(admin);
        if (plan =="free") {
            return json(null);
        }
        console.log(" le plan courant est ", plan);
        if (plan == PRICING_PLANS.STARTER) {
            if (config?.data?.materials?.length) {
                let materials = config.data.materials.filter((material: any) => material.type == "simple")?.slice(0, 2);
                config.data.materials = [];
                for (let material of materials) { 
                    if (material?.data?.sizes?.allSizes?.length) {
                        material.data.sizes.allSizes = material.data.sizes.allSizes.slice(0, 10);
                    }

                    if (material?.data?.sizes?.customSize?.active) {
                        material.data.sizes.customSize.active = false;
                    }


                    if (material?.data?.colors?.allColors?.length) {
                        material.data.colors.allColors = material.data.colors.allColors.slice(0, 10);
                    }

                    if (material?.data?.colors?.customColors?.active) {
                        material.data.colors.customColors.active = false;
                    }

                    if (material?.data?.shapes?.length) {
                        material.data.shapes = material.data.shapes.filter((shape: any) => shape.shapeId < 5).slice(0, 5);
                    }

                    if (material?.data?.borders?.allBorders?.length) {
                        material.data.borders.allBorders = material.data.borders.allBorders.filter((border: any) => border.manageBorderId <2).slice(0, 2);
                    }

                    if (material?.data?.fixingMethods?.length) {
                        material.data.fixingMethods = material.data.fixingMethods.filter((fixingMethod: any) => fixingMethod.fixingMethodId < 5).slice(0, 5);
                    }

                    if (material?.data?.textImages?.enableImage) { 
                        material.data.textImages.enableImage = false;
                    }

                    if (material?.data?.additionalOptions?.length) { 
                        material.data.additionalOptions = [];
                    }

                    config.data.materials.push(material);
                }
            }

            if (config?.data?.settings?.customizerSign?.signPart?.doublePart?.active) {
                config.data.settings.customizerSign.signPart.doublePart.active = false;
            }
        }
    }

    
    return json(config );
};
  