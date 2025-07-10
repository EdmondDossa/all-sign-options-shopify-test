import { LoaderFunctionArgs, json } from "@remix-run/node";
import ConfigurationService from "~/models/Configuration.service";
import { authenticate } from "~/shopify.server";
import { PRICING_PLANS } from "~/utils/pricing";
import {  getPlanProxy, getPlanProxyPublic } from "~/utils/pricing-server.server";
import prisma from "~/db.server";
import { configFilter } from "~/utils/config-filter";
import { replaceDomainUrl } from "~/utils/fileUrlServer.server";


export const loader = async ({ request, params }: LoaderFunctionArgs) => {
 
    const { admin, session } = await authenticate.public.appProxy(request);

    console.log('  config  id', params.id);
    let config = await ConfigurationService.getConfigurationWithoutTemplates(parseInt(`${params.id}`) , session?.id as string);

    return config?.data?.settings?.generals?.upload ||  {
        allowFormat: "jpg,jpeg,png,gif,bmp,tiff,webp,psd,ai,svg,eps,pdf",
        maxUploadSize: 100,
        maxUploadNumber: 5,
        zipFiles: {
          active: false,
          zipOutFolderPrefix: "aso_",
        }
      }
};
  