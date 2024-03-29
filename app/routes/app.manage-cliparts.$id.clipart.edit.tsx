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
import { BackBtn } from "~/components/buttons/BackBtn";


export const loader = async ({request, params }:LoaderFunctionArgs) => {
  const { session, admin } = await authenticate.admin(request);
  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  let clipart = null;
   
  if (id && params.id) {
    clipart = await ClipartService.getClipart(parseInt(id), parseInt(params.id || '0'));
  }
  
  return json({ clipart });
}

export default function ClipartCreate() {
  const submit = useSubmit();
  const navigation = useNavigation()
  const actionData = useActionData<typeof action>();
  useHandleFlashMessage();
  console.log('action data :', actionData);
  let {clipart} = useLoaderData<typeof loader>()
  const [formData, setFormData] = useState<ClipartType>((clipart as ClipartType) || {
    title: "",
    url: "",
    additionalPrice:0
  });

  let isLoading = navigation.state == "loading";
  let isSubmitting = navigation.state == "submitting";

  


  const handleTitle= (value: string) => setFormData({...formData, title:value})

  const handleUrl = (value: string) => setFormData({ ...formData, url: value })
  
  const handleadditionalPrice = (value: string) => setFormData({...formData, additionalPrice:parseInt(value)})


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
                  <Text as="h6" variant="bodyMd" fontWeight="bold" >Add clipart</Text>
            </Box>
            </SpacingBackground>
            <Divider borderWidth="100" />
             <SpacingBackground backgroundColor="#F8F9FB">
            <Box paddingInline="300" paddingBlock="1000">
              <Grid gap={{ lg: "30px" }}>
          
                <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
                  <TextField
                    label="Label"
                    value={`${formData.title}`}
                    onChange={handleTitle}
                        autoComplete="on"
                        error={getError(actionData,"title")}
                  />
                </Grid.Cell>

                <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
                <FileInput error={getError(actionData, "url")} title="Upload icon"
                    path={formData.url} handlePath={handleUrl} />
                </Grid.Cell>
              
              
               <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12}}>
               <TextField
                    label="Additional Price"
                    type="number"
                    value={`${formData.additionalPrice}`}
                    onChange={handleadditionalPrice}
                        autoComplete="on"
                        error={getError(actionData,"additionalPrice")}
                  />
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
  title: z.string({ required_error: 'Title is required' })
  .min(3, 'Title is too short')
  .max(100, 'Title is too long'),
  url: z.string({ required_error: 'Url is required' })
  .min(3, 'Url is too short')
  .max(255, 'Url is too long'),
  additionalPrice: z.number()
});



export const action = async ({ request, params }: ActionFunctionArgs) => {

  const { session, admin } = await authenticate.admin(request);



  const formData = await request.formData();
  
  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  const  clipartsGroupId = parseInt(params.id||"0");

  const submission = parseWithZod(formData, {schema:formSchema});

  if (submission.status !== 'success') {
    return json({status:false,message:null,errors:submission.error})
  }

  let clipart: ClipartType = submission.value as ClipartType;
  
  if (id && clipartsGroupId) {
    clipart.id = parseInt(id);
    let res = await ClipartService.updateClipart(clipart, clipartsGroupId) 
    return res ?
      redirect(`..${flashMessage("clipart  updated is completed successfully")}`)
      : json({ ...jFlashMessage("error on clipart upadating") });
  } else {
    let res =  await ClipartService.addClipart(clipart,clipartsGroupId)
    return res ? redirect(`..${flashMessage("clipart  added is completed successfully")}`)
      : json({ ...jFlashMessage("error  on font adding") });
  } 
};

