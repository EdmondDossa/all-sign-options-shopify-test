import {
  Box,
  Button,
  Divider,
  Grid,
  InlineStack,
  Select,
  Text,
  TextField,
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
import { ReactSwitchCustom } from "~/components/inputs/ReactSwitchCustom";
import BiSaveIcon from "~/components/icons/BiSaveIcon";
import uploadIcon from "~/components/icons/uploadIcon";
import { z } from "zod";
import FontService from "~/models/Font.service";
import { authenticate } from "~/shopify.server";
import { FontType } from "~/types/ManagePropertyType";
import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { parseWithZod } from "@conform-to/zod";
import { flashMessage, jFlashMessage } from "~/utils/message-flash";
import useHandleFlashMessage from "~/hooks/useHandleFlashMessage";
import { getError } from "~/utils/error-getting";
import { FileInput } from "~/components/inputs/FileInput";
import { BiSaveBtn } from "~/components/buttons/BiSaveBtn";
import { BackBtn } from "~/components/buttons/BackBtn";



export const loader = async ({request, params }:LoaderFunctionArgs) => {
  const { session, admin } = await authenticate.admin(request);
  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  let font = null;
  
  if (id) {
    font = await FontService.getFont(parseInt(id),session.id)
  }
  
  return json({ font})
}


export default function ManageFontCreate() {
  const submit = useSubmit();
  const navigation = useNavigation()
  const actionData = useActionData<typeof action>();
  useHandleFlashMessage();
  console.log('action data :', actionData);
  let {font} = useLoaderData<typeof loader>()
  const [formData, setFormData] = useState<FontType>((font as FontType) || {
    label: "",
    isGoogleFont: true,
    url:""
  });

  let isLoading = navigation.state == "loading";
  let isSubmitting = navigation.state == "submitting";

  
  const handleIsGoogleFont = (value: boolean ) => setFormData({ ...formData, isGoogleFont: value })

  const handleLabel= (value: string) => setFormData({...formData, label:value})

  const handleUrl = (value: string) => setFormData({...formData, url:value})

  const handleSubmit = (e: any) => {
    e.preventDefault();
    submit({ ...formData }, { method: "POST" });
  };


   let options = [
    {value:"arial.com", label:"Arial"},
    {value:"noserif.com", label:"Arial No Serif"}
  ]
  
  
  
  return (
    <div>
      <SpacingBackground width="100%" height="auto" margin="16px 0px ">
          <Form onSubmit={handleSubmit} method="POST">
            <SpacingBackground backgroundColor="#F9F9F9">
            <Box paddingInline="300" paddingBlock="600">
                  <Text as="h6" variant="bodyMd" fontWeight="bold" >Add new font</Text>
            </Box>
            </SpacingBackground>
            <Divider borderWidth="100" />
             <SpacingBackground backgroundColor="#F8F9FB">
            <Box paddingInline="300" paddingBlock="1000">
              <Grid gap={{ lg: "30px" }}>
              <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
                <InlineStack gap="300" blockAlign="center">
                      <Text as="strong" fontWeight="bold" variant="bodyMd">Google font (default) </Text>
                      <ReactSwitchCustom checked={formData.isGoogleFont} setChecked={handleIsGoogleFont} />
                    </InlineStack>
                   
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
                  <TextField
                    label="Label"
                    value={`${formData.label}`}
                    onChange={handleLabel}
                    autoComplete="on"
                    error={getError(actionData,"label")}
                  />
                </Grid.Cell>

             { formData.isGoogleFont &&  <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
                   <Select
                    label="Choose google fonts"
                    options={options}
                    onChange={handleUrl}
                    error={getError(actionData, "url")}
                    value={formData.url}
                  />
                </Grid.Cell>}
           {/* {  formData.isGoogleFont &&   <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
                   <Select
                    label="Google fonts variants"
                    options={options}
                    onChange={handleSelectChange}
                    value={selected}
                  />
                </Grid.Cell>} */}
              
              
             { !formData.isGoogleFont  &&   <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>

                  <FileInput helperText=".ttf, .woff Font File Type (Required)"
                    error={getError(actionData, "url")} title="Upload font file"
                    path={formData.url} handlePath={handleUrl} />
                </Grid.Cell>}
          
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
  label: z.string({ required_error: 'Label is required' })
  .min(3, 'Label is too short')
    .max(100, 'Label is too long'),
  url: z.string({ required_error: 'Url is required' })
    .min(3, 'Url is too short')
    .max(255, 'Url is too long'),
  isGoogleFont: z.any().transform(val => `${val}`.toLowerCase() =="true").pipe(z.boolean())
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

  let font: FontType = submission.value as FontType;
  console.log(" data to  save", font)
  if (id) {
    font.id = parseInt(id);
    let res = await FontService.updateFont(font, session.id) 
    return res ?
      redirect(`..${flashMessage("Font  updated is completed successfully")}`)
      : json({ ...jFlashMessage("Font on Size upadating") });
  } else {
    let res =  await FontService.addFont(font, session.id)
    return res ? redirect(`..${flashMessage("Font  added is completed successfully")}`)
      : json({ ...jFlashMessage("error  on font adding") });
  } 
};



