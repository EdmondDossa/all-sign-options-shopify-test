import {
  Box,
  Button,
  Card,
  Grid,
  InlineStack,
  Text,
  TextField,
} from "@shopify/polaris";
import {  useState } from "react";
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
import { json } from "@remix-run/node";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { authenticate } from "~/shopify.server";
import ClipartsGroupService from "~/models/ClipartsGroup.service";
import useHandleFlashMessage from "~/hooks/useHandleFlashMessage";
import type { ClipartsGroupType } from "~/types/ManagePropertyType";
import { getError } from "~/utils/error-getting";
import { z } from "zod";
import { parseWithZod } from "@conform-to/zod";
import { flashMessage, jFlashMessage } from "~/utils/message-flash";
import { stringTransform } from "~/utils/transfomerZod";


export const loader = async ({request, params }:LoaderFunctionArgs) => {
  const { session } = await authenticate.admin(request);
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
    submit({ ...formData }, { method: "POST" });
  };
  
  return (
    <SpacingBackground width="100%" height="auto" margin="16px 0px ">
      <Form onSubmit={handleSubmit} method="POST">
        <div style={{ display: "grid", gap: 12 }}>
          <Card>
            <Box padding="300">
              <Text as="h2" variant="headingLg">
                {clipartsGroup ? "Update clipart group" : "Create new clipart group"}
              </Text>
            </Box>
          </Card>

          <Card>
            <Box padding="300">
              <Grid gap={{ lg: "30px" }}>
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
            <Box padding="300">
              <InlineStack align="end" gap="200">
                <Button onClick={onBack} disabled={Boolean(isLoading)}>
                  Back
                </Button>
                <Button
                  submit
                  variant="primary"
                  tone="success"
                  loading={isSubmitting}
                >
                  Save
                </Button>
              </InlineStack>
            </Box>
          </Card>
        </div>
      </Form>
    </SpacingBackground>
  );
}


const formSchema = z.object({
  title: z.string({ required_error: 'Title is required' })
  .min(2, 'Title is too short')
    .max(100, 'Title is too long'),
    description:  z.string().nullish().transform(stringTransform),
});



export const action = async ({ request }: ActionFunctionArgs) => {

  const { session } = await authenticate.admin(request);



  const formData = await request.formData();
  
  const url = new URL(request.url);
  const id = url.searchParams.get("id");

  const submission = parseWithZod(formData, {schema:formSchema});

  if (submission.status !== 'success') {
    return json({status:false,message:null,errors:submission.error})
  }

  let size: ClipartsGroupType = submission.value as ClipartsGroupType;
  if (id) {
    size.id = parseInt(id);
    let res = await ClipartsGroupService.updateClipartsGroup(size, session.id)
    return res ? 
      redirect(`..${flashMessage("Clipart group updated successfully")}`)
      : json({ ...jFlashMessage("Error on clipart group updating") });
  } else {
    let res =  await ClipartsGroupService.addClipartsGroup(size, session.id)
    return res ? redirect(`..${flashMessage("Clipart group added successfully")}`)
      : json({ ...jFlashMessage("Clipart group on Size adding") });
  } 
};
