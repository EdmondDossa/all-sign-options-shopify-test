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
  console.log(' API configuration-upload called - START');
  try {
    const { admin, session } = await authenticate.public.appProxy(request);

    if (!params?.id) {
      return json(uploadSetting);
    }

    const config = await ConfigurationService.getConfigurationWithoutTemplates(parseInt(`${params.id}`), session?.id as string);
    const settings = config?.data?.settings?.generals?.upload || uploadSetting;
    return json(settings);
  } catch (error) {
    console.error('Error in configuration-upload API:', error);
    return json({ error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
};