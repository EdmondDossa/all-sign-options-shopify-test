import {
  Box,
  Divider,
  Grid,
  InlineStack,
  Text,
  TextField,
} from "@shopify/polaris";
import { useCallback, useState } from "react";
import {
  Form,
  redirect,
  useActionData,
  useLoaderData,
  useNavigate,
  useNavigation,
  useSubmit,
} from "@remix-run/react";
import { SpacingBackground } from "~/components/layouts/SpacingBackground";
import { ReactSwitchCustom } from "~/components/inputs/ReactSwitchCustom";
import BiSaveIcon from "~/components/icons/BiSaveIcon";
import { ActionFunctionArgs, LoaderFunctionArgs, json } from "@remix-run/node";
import { authenticate } from "~/shopify.server";
import ClipartsGroupService from "~/models/ClipartsGroup.service";
import useHandleFlashMessage from "~/hooks/useHandleFlashMessage";
import { ClipartsGroupType } from "~/types/ManagePropertyType";
import { getError } from "~/utils/error-getting";
import { BiSaveBtn } from "~/components/buttons/BiSaveBtn";
import { z } from "zod";
import { parseWithZod } from "@conform-to/zod";
import { flashMessage, jFlashMessage } from "~/utils/message-flash";
import { BackBtn } from "~/components/buttons/BackBtn";


export const loader = async ({request, params }:LoaderFunctionArgs) => {
  const { session, admin } = await authenticate.admin(request);
  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  let clipartsGroup = null;
  
  if (id) {
    clipartsGroup = await ClipartsGroupService.getClipartsGroup(parseInt(id),session.id)
  }
  
  return json({clipartsGroup})
}

export default function ManageClipartCreate() {
  const submit = useSubmit();
  const navigation = useNavigation()
  const actionData = useActionData<typeof action>();
  useHandleFlashMessage();
  console.log('action data :', actionData);
  let {clipartsGroup} = useLoaderData<typeof loader>()
  const [formData, setFormData] = useState<ClipartsGroupType>((clipartsGroup as ClipartsGroupType) || {
    title: "",
    description:""
  });

  let isLoading = navigation.state == "loading";
  let isSubmitting = navigation.state == "submitting";

  
  

  const handleTitle = (value: string) => {
    formData.title = value
    setFormData({ ...formData}
  )
  }
  const handleDescription = (value: string) => {
    formData.description = value;
    setFormData({ ...formData })
  }
 



  
  const navigate = useNavigate();
  const onBack = () => {
    navigate("..");
  };

   
  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(" log is nt errors");
    submit({ ...formData }, { method: "POST" });
  };
  
  return (
    <div>
      <SpacingBackground width="100%" height="auto" margin="16px 0px ">
          <Form onSubmit={handleSubmit} method="POST">
            <SpacingBackground backgroundColor="#F9F9F9">
            <Box paddingInline="300" paddingBlock="600">
                  <Text as="h6" variant="bodyMd" fontWeight="bold" >Create new clipart group</Text>
            </Box>
          </SpacingBackground>
            <Divider borderWidth="100" />
            <SpacingBackground backgroundColor="#F8F9FB">
              
            <Box paddingInline="300" paddingBlock="1000">
              <Grid gap={{lg:"30px"}}>
                <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
                  <TextField
                    label="Title"
                    value={`${formData.title}`}
                    onChange={handleTitle}
                    autoComplete="on"
                    error={getError(actionData,"title")}
                  />
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
                  <TextField
                    label="Description"
                    value={`${formData.description}`}
                    onChange={handleDescription}
                    autoComplete="on"
                    error={getError(actionData,"description")}
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
    description: z.string({ required_error: 'Description is required' })
    .min(3, 'Description is too short')
    .max(250, 'Description is too long'),
});



export const action = async ({ request }: ActionFunctionArgs) => {

  const { session, admin } = await authenticate.admin(request);



  const formData = await request.formData();
  console.log(" form  dta",formData.get("thickness"));
  
  const url = new URL(request.url);
  const id = url.searchParams.get("id");

  const submission = parseWithZod(formData, {schema:formSchema});

  if (submission.status !== 'success') {
    return json({status:false,message:null,errors:submission.error})
  }

  let size: ClipartsGroupType = submission.value as ClipartsGroupType;
  console.log(" data to  save", size)
  if (id) {
    size.id = parseInt(id);
    let res = await ClipartsGroupService.updateClipartsGroup(size, session.id)
    return res ? 
      redirect(`..${flashMessage("Cliparts group  updated is completed successfully")}`)
      : json({ ...jFlashMessage("error on Cliparts group upadating") });
  } else {
    let res =  await ClipartsGroupService.addClipartsGroup(size, session.id)
    return res ? redirect(`..${flashMessage("Cliparts group  added is completed successfully")}`)
      : json({ ...jFlashMessage("Clipart group   on Size adding") });
  } 
};

