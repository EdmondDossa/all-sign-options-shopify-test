import { parseWithZod } from "@conform-to/zod";
import { ActionFunctionArgs, LoaderFunctionArgs, json } from "@remix-run/node";
import ConfigSettingsService from "~/models/ConfigSetttings.service ";
import { authenticate } from "~/shopify.server";
import { jFlashMessage } from "~/utils/message-flash";



export const settingLoader = async ({ request, params }: LoaderFunctionArgs,settingParams: [string,string]) => {
    const { session, admin } = await authenticate.admin(request);
    const configId = parseInt(params.configId ?? "");
    const  settingData = await ConfigSettingsService.get(session.id, configId,...settingParams);
    return json({settingData });
  };

export const settingAction = async ({ request, params }: ActionFunctionArgs, settingParams: [string,string],formSchema: any) => {
    const { session } = await authenticate.admin(request);
    const configId = parseInt(params.configId ?? "");
    const formData = await request.formData();
    const submission = parseWithZod(formData, { schema: formSchema });
  
    if (submission.status !== "success") {
      return json({ status: false, message: null, errors: submission.error });
    }
  
    let data = submission.value;
    
    if (data) {
      let res = await ConfigSettingsService.edit(
        session.id,
        configId,
        ...settingParams,
        data
      ); jFlashMessage
      return res
        ? json({
            ...jFlashMessage(
              "Custom setting  updated is completed successfully",
            ),
          })
        : json({
            ...jFlashMessage("Errors on setting updating", "error"),
          });
    } else {
      return;
    }
  
  };