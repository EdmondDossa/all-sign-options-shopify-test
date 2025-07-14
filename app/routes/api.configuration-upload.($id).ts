import { LoaderFunctionArgs, json } from "@remix-run/node";
import ConfigurationService from "~/models/Configuration.service";
import { authenticate } from "~/shopify.server";



const  uploadSetting =  {
  allowFormat: "jpg,jpeg,png,gif,bmp,tiff,webp,psd,ai,svg,eps,pdf",
  maxUploadSize: 100,
  maxUploadNumber: 5,
  zipFiles: {
    active: false,
    zipOutFolderPrefix: "aso_",
  }
}
export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const { admin, session } = await authenticate.public.appProxy(request);
 
  
    if(!params.id){
      return uploadSetting;
    }

    let config = await ConfigurationService.getConfigurationWithoutTemplates(parseInt(`${params.id}`) , session?.id as string);

    return config?.data?.settings?.generals?.upload || uploadSetting;
};
  