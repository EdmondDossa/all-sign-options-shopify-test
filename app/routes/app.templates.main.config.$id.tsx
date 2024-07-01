import { parseWithZod } from "@conform-to/zod";
import { ActionFunctionArgs, json } from "@remix-run/node";
import { z } from "zod";
import TemplateService from "~/models/Template.service";
import { authenticate } from "~/shopify.server";
import { jFlashMessage } from "~/utils/message-flash";
import { jsonTransform } from "~/utils/transfomerZod";


const formSchema = z.object({
  data: z.any().transform(jsonTransform)
});



export const action = async ({ request , params}: ActionFunctionArgs) => {
  const { session, admin } = await authenticate.admin(request);

  const formData = await request.formData(); 
  const  id =   params.id || "";
  const submission = parseWithZod(formData, {schema:formSchema});
  if (submission.status !== 'success') {
    return json(jFlashMessage("error   on template adding") )
  }

  let template:any = submission.value;

  
    template.id = parseInt(id);
    let res = await TemplateService.configTemplate(parseInt(id), session.id, template.data) 
    return res ? json(jFlashMessage("template  configuration is completed successfully"))
      : json(jFlashMessage("error on template upadating") );
 
};

