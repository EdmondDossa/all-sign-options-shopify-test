import { parseWithZod } from "@conform-to/zod";
import { ActionFunctionArgs, LoaderFunctionArgs, json } from "@remix-run/node";
import { Form, Outlet, redirect, useActionData, useLoaderData, useNavigate, useNavigation, useOutletContext, useSearchParams, useSubmit } from "@remix-run/react";
import {
  BlockStack,
  Box,
  Button,
  Card,
  Divider,
  Grid,
  InlineGrid,
  InlineStack,
  Page,
  Select,
  Text,
  TextField,
} from "@shopify/polaris";
import { useCallback, useState } from "react";
import { z } from "zod";
import { BackBtn } from "~/components/buttons/BackBtn";
import { BiSaveBtn } from "~/components/buttons/BiSaveBtn";
import BiSaveIcon from "~/components/icons/BiSaveIcon";
import RayEndArrowIcon from "~/components/icons/RayEndArrowIcon";
import RayStartArrowIcon from "~/components/icons/RayStartArrowIcon";
import { FileInput } from "~/components/inputs/FileInput";
import { BoxBackground } from "~/components/layouts/BoxBackground";
import { SpacingBackground } from "~/components/layouts/SpacingBackground";
import ServiceMaterial from "~/models/Material.service";
import { authenticate } from "~/shopify.server";
import { Material, MaterialType } from "~/types/ConfigDataType";
import { getError } from "~/utils/error-getting";
import { flashMessage } from "~/utils/message-flash";




export default function MaterialEdit() {
  const submit = useSubmit();
  const navigation = useNavigation()
  const actionData = useActionData<typeof action>();
  console.log('action data :', actionData);
  let { materials } = useOutletContext<{materials:Material[]}>();
  const [searchParams] = useSearchParams();
  const id = parseInt(searchParams.get('id') || "");
  let material = materials?.find((curr, index) =>index === id)
  const [formData, setFormData] = useState<Material>(material?(material as Material):{
    name: "",
    description: "",
    icon: "",
    popImg: "",
    type:"simple"
  });

  let isLoading = navigation.state == "loading";
  let isSubmitting = navigation.state == "submitting";
  let types = [
    { value: "simple", label: "Simple" },
    {value:"advance", label:"Advance"}
  ]

  
  const handleName = (value: string) => setFormData({...formData, name:value})

  const handleDescription = (value: string) => setFormData({...formData, description:value})

  const handleIcon = (value: string) => setFormData({...formData, icon:value})

  const handlePopImg = (value: string) => setFormData({ ...formData, popImg: value })
  
  const handleType =  (value: "simple"|"advance") => setFormData({...formData, type:value})

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const data = formData as MaterialType;
    submit({...data}, { method: "POST" });
  };


  const navigate = useNavigate();
  const onBack = () => {
    
    navigate("..");
  };

  return (
    <SpacingBackground width="100%" height="auto" margin="16px 0px ">
      <Form onSubmit={handleSubmit} method="POST">
        <SpacingBackground backgroundColor="#F9F9F9">
          <Box paddingInline="300" paddingBlock="600">
            <Text as="h6" variant="bodyMd" fontWeight="bold">
              {" "}
              Create new material
            </Text>
          </Box>
        </SpacingBackground>
        <Divider borderWidth="100" />
        <SpacingBackground backgroundColor="#F8F9FB">
          <Box paddingInline="300" paddingBlock="1000">
            <Grid gap={{ lg: "30px" }}>
              <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
                 <TextField
                    label="Name"
                    value={`${formData.name}`}
                    onChange={handleName}
                    autoComplete="on"
                    error={getError(actionData, "name")}
                  />
              </Grid.Cell>
              <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
              <TextField
                    label="Description"
                    value={`${formData.description}`}
                    onChange={handleDescription}
                    autoComplete="on"
                    error={getError(actionData, "description")}
                  />
                
              </Grid.Cell>
              <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
                <FileInput
                    error={getError(actionData, "icon")}
                    title="Upload icon"
                    path={formData.icon}
                    handlePath={handleIcon}
                  />
              </Grid.Cell>
              <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
               
                <FileInput
                    error={getError(actionData, "popImg")}
                    title="Upload poppup Image"
                    path={formData.popImg}
                    handlePath={handlePopImg}
                  />
                          </Grid.Cell >
                          <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
                          <Select
                    label="Behevior (type)"
                  options={types}
                  disabled={!Number.isNaN(id)}
                    onChange={handleType}
                    value={formData.type}
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
  );
}


const formSchema = z.object({
  name: z
      .string({ required_error: 'Name is required' })
      .min(3, 'Name is too short')
    .max(100, 'Name is too long'),
    type: z
    .string({ required_error: 'Type is required' })
    .min(3, 'Type is too short')
    .max(100, 'Type is too long'),
  
  description:z
      .string({ required_error: 'Description is required' })
      .min(3, 'Description is fale is too short')
      .max(500, 'Description is too long'),
  icon:z
      .string({ required_error: 'File is required' }),
  popImg:z.string({ required_error: 'File is required' })
    
  
});

export const action = async ({ request,params}: ActionFunctionArgs) => {

  const { session, admin } = await authenticate.admin(request);



  const formData = await request.formData();
  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  const configId = parseInt(params.configId ?? "");
  const submission = parseWithZod(formData, {schema:formSchema});

  if (submission.status !== 'success') {
    return json({status:false,message:null,errors:submission.error})
  }

  let material: Material = submission.value as Material;
  
  if (id && configId) {
    let res = await ServiceMaterial.update(configId, session.id, material, parseInt(id))
    return res
      ? redirect(`..${flashMessage("Material  updated is completed successfully")}`)
      : redirect(`..${flashMessage("Material  updated is  fail","error")}`);
  } else {
    let res = await ServiceMaterial.add(configId, session.id, material)
    return res
      ? redirect(`..${flashMessage("Material  added is completed successfully")}`)
      : redirect(`..${flashMessage("Material  added is  fail","error")}`);
  }
 
};
