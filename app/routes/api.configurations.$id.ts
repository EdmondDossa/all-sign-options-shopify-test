import { LoaderFunctionArgs, json } from "@remix-run/node";
import ConfigurationService from "~/models/Configuration.service";
import { authenticate } from "~/shopify.server";
import { PRICING_PLANS, getPlanProxy, getPlanProxyPublic } from "~/utils/pricing";

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

   
    

    let plan: string = "";
    


    if (admin) {
        plan = await getPlanProxy(admin);
    }else{
        plan = await getPlanProxyPublic(session.shop, session.accessToken);
        console.log("use public plan ");
    }


    let configs = await ConfigurationService.getConfigurations(sessionId, true);

    let config = null;

    if (plan =="free" || !configs) {
        return json(null);
    }
    
    if (plan == PRICING_PLANS.STARTER) {
        configs = configs?.slice(0, PRICING_PLANS.STARTER_RULES.configurations)
        console.log("config ", config, "configs length ", configs?.length, "config id",configs[0].id);
        config = configs?.find((curr: any) => curr.id == params.id)
    } else {
        config = configs?.find((curr: any) => curr.id == params.id)
    }

    

    console.log(" le plan courant est ", plan);
    if (plan == PRICING_PLANS.STARTER) {
        if (config?.data?.materials?.length) {
            let materials = config.data.materials.filter((material: any) => PRICING_PLANS.STARTER_RULES.materialTypes.includes(material.type))?.slice(0, PRICING_PLANS.STARTER_RULES.materials);
            config.data.materials = [];
            for (let material of materials) { 
                if (material?.data?.sizes?.allSizes?.length) {
                    material.data.sizes.allSizes = material.data.sizes.allSizes.slice(0, PRICING_PLANS.STARTER_RULES.materialSizes);
                }

                if (material?.data?.sizes?.customSize?.active) {
                    material.data.sizes.customSize.active = PRICING_PLANS.STARTER_RULES.materialCustomSizes;
                }


                if (material?.data?.colors?.allColors?.length) {
                    material.data.colors.allColors = material.data.colors.allColors.slice(0, PRICING_PLANS.STARTER_RULES.materialColors);
                }

                if (material?.data?.colors?.customColors?.active) {
                    material.data.colors.customColors.active = PRICING_PLANS.STARTER_RULES.materialCustomColors;
                }

                if (material?.data?.shapes?.length) {
                    material.data.shapes = material.data.shapes
                        .filter((shape: any) => shape.shapeId < PRICING_PLANS.STARTER_RULES.materialShapes)
                        .slice(0, PRICING_PLANS.STARTER_RULES.materialShapes);
                }

                if (material?.data?.borders?.allBorders?.length) {
                    material.data.borders.allBorders = material.data.borders.allBorders
                        .filter((border: any) => border.manageBorderId < PRICING_PLANS.STARTER_RULES.materialBorders)
                        .slice(0,PRICING_PLANS.STARTER_RULES.materialBorders);
                }

                if (material?.data?.fixingMethods?.length) {
                    material.data.fixingMethods = material.data.fixingMethods
                        .filter((fixingMethod: any) => fixingMethod.fixingMethodId < PRICING_PLANS.STARTER_RULES.materialFixingMethods )
                        .slice(0, PRICING_PLANS.STARTER_RULES.materialFixingMethods);
                }

                

                if (material?.data?.additionalOptions?.length) { 
                    material.data.additionalOptions = [];
                }

                config.data.materials.push(material);
            }
        }

        if (config?.data?.settings?.customizerSign?.signPart?.doublePart?.active) {
            config.data.settings.customizerSign.signPart.doublePart.active = PRICING_PLANS.STARTER_RULES.doublePart;
        }

        if (config?.data?.settings?.customizerSign?.images?.enableCustomColor) {
            config.data.settings.customizerSign.images.enableCustomColor = PRICING_PLANS.STARTER_RULES.imageCustomColors;
        }

        if (config?.data?.settings?.customizerSign?.images?.colors?.length) {
            config.data.settings.customizerSign.images.colors = config.data.settings.customizerSign.images.colors.slice(0, PRICING_PLANS.STARTER_RULES.imageColors);
        }


        if (config?.data?.settings?.customizerSign?.text) {
            config.data.settings.customizerSign.text.enableCustomColor = PRICING_PLANS.STARTER_RULES.textCustomColors;
        }

        if (config?.data?.settings?.customizerSign?.text?.colors?.length) {
            config.data.settings.customizerSign.text.colors = config.data.settings.customizerSign.text.colors.slice(0, PRICING_PLANS.STARTER_RULES.textColors);
        }
    }

    
    return json(config );
};
  