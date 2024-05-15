import {
  Box,
  Button,
  ButtonGroup,
  Checkbox,
  Divider,
  Grid,
  IndexTable,
  InlineGrid,
  InlineStack,
  Select,
  Text,
  TextField,
  useIndexResourceState,
} from "@shopify/polaris";
import { useCallback, useState } from "react";
import {
  Form,
  json,
  redirect,
  useActionData,
  useLoaderData,
  useNavigate,
  useNavigation,
  useOutletContext,
  useSubmit,
} from "@remix-run/react";
import { SpacingBackground } from "~/components/layouts/SpacingBackground";
import BiSaveIcon from "~/components/icons/BiSaveIcon";
import uploadIcon from "~/components/icons/uploadIcon";
import ClipartService from "~/models/Clipart.service";
import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { authenticate } from "~/shopify.server";
import { z } from "zod";
import { parseWithZod } from "@conform-to/zod";
import { ClipartType } from "~/types/ManagePropertyType";
import { flashMessage, jFlashMessage } from "~/utils/message-flash";
import { FileInput } from "~/components/inputs/FileInput";
import { getError } from "~/utils/error-getting";
import useHandleFlashMessage from "~/hooks/useHandleFlashMessage";
import { BiSaveBtn } from "~/components/buttons/BiSaveBtn";
import { ShapeType } from "~/types/SettingsType";
import SettingShapesService from "~/models/SettingShapes.service";
import { BackBtn } from "~/components/buttons/BackBtn";


export const loader = async ({request, params }:LoaderFunctionArgs) => {
  const { session, admin } = await authenticate.admin(request);
  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  
  return json({ id });
}

export default function SettingShapeEdit() {
  const submit = useSubmit();
  const navigation = useNavigation()
  const { shapes } = useOutletContext<{shapes:ShapeType[]}>();
  const actionData = useActionData<typeof action>();
  useHandleFlashMessage();
  console.log('action data :', actionData);
  let { id } = useLoaderData<typeof loader>()
  let shape = shapes.find(curr => curr.value == id);
  const [formData, setFormData] = useState<ShapeType>((shape as ShapeType));

  let isLoading = navigation.state == "loading";
  let isSubmitting = navigation.state == "submitting";

  


  const handleName= (value: string) => setFormData({...formData, name:value})

  const handleIcon = (value: string) => setFormData({ ...formData, icon: value })
  



  const handleSubmit = (e: any) => {
    e.preventDefault();
    submit({ ...formData }, { method: "POST" });
  };

  return (
    <div>
      <SpacingBackground width="100%" height="auto" margin="16px 0px ">
          <Form onSubmit={handleSubmit} method="POST">
            <SpacingBackground backgroundColor="#F9F9F9">
            <Box paddingInline="300" paddingBlock="600">
        

                  <Text as="h6" variant="bodyMd" fontWeight="bold" >Edit Shape</Text>
            </Box>
            </SpacingBackground>
            <Divider borderWidth="100" />
             <SpacingBackground backgroundColor="#F8F9FB">
            <Box paddingInline="300" paddingBlock="1000">
              <Grid gap={{ lg: "30px" }}>
          
                <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
                  <TextField
                    label="Label"
                    value={`${formData.name}`}
                    onChange={handleName}
                        autoComplete="on"
                        error={getError(actionData,"title")}
                  />
                </Grid.Cell>

                <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
                <FileInput error={getError(actionData, "url")} title="Upload icon"
                    path={formData.icon} handlePath={handleIcon} />
                </Grid.Cell>
              </Grid>
            </Box>
            </SpacingBackground>
            <Divider borderWidth="100" />
             <SpacingBackground backgroundColor="#F9F9F9">

            <Box paddingInline="300" paddingBlock="300">
              <InlineStack align="end" gap="600">
              <BackBtn isLoading={isLoading} title="Back"/>
              <BiSaveBtn isLoading={isSubmitting} title="Save" />
              </InlineStack>
            </Box>
            </SpacingBackground>
          </Form>
      </SpacingBackground>
    </div>
  );
}

const formSchema = z.object({
  name: z.string({ required_error: 'Name is required' })
  .min(3, 'Name is too short')
  .max(100, 'Name is too long'),
  value: z.string({ required_error: 'value is required' })
  .min(3, 'value is too short')
  .max(255, 'value is too long'),
  icon: z.string({ required_error: 'Icon file is required' })
});



export const action = async ({ request, params }: ActionFunctionArgs) => {

  const { session, admin } = await authenticate.admin(request);



  const formData = await request.formData();
  
  const url = new URL(request.url);
  const id = url.searchParams.get("id");


  const submission = parseWithZod(formData, {schema:formSchema});

  if (submission.status !== 'success') {
    return json({status:false,message:null,errors:submission.error})
  }

  let shape: ShapeType = submission.value as ShapeType;
  
  if (id && shape) {
    
    let res = await SettingShapesService.update(shape, session.id) 
    return res ?
      redirect(`..${flashMessage("Shape  updated is completed successfully")}`)
      : json({ ...jFlashMessage("error on Shape upadating") });
  } 

  return null;
};

