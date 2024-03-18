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
import { BoxBackground } from "~/components/layouts/BoxBackground";
import { SpacingBackground } from "~/components/layouts/SpacingBackground";
import { ReactSwitchCustom } from "~/components/inputs/ReactSwitchCustom";
import BiSaveIcon from "~/components/icons/BiSaveIcon";
import { TextColorField } from "~/components/inputs/TextColorField";
import { ActionFunctionArgs, LoaderFunctionArgs, json } from "@remix-run/node";
import { authenticate } from "~/shopify.server";
import ColorService from "~/models/Color.service";
import useHandleFlashMessage from "~/hooks/useHandleFlashMessage";
import { ColorType } from "~/types/ManagePropertyType";
import { getError } from "~/utils/error-getting";
import { z } from "zod";
import { parseWithZod } from "@conform-to/zod";
import { flashMessage, jFlashMessage } from "~/utils/message-flash";
import { BiSaveBtn } from "~/components/buttons/BiSaveBtn";



export const loader = async ({request, params }:LoaderFunctionArgs) => {
  const { session, admin } = await authenticate.admin(request);
  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  let color = null;
  
  if (id) {
    color = await ColorService.getColor(parseInt(id),session.id)
  }
  
  return json({ color})
}


export default function ColorPaletteCreate() {
  const submit = useSubmit();
  const navigation = useNavigation()
  const actionData = useActionData<typeof action>();
  useHandleFlashMessage();
  console.log('action data :', actionData);
  let {color} = useLoaderData<typeof loader>()
  const [formData, setFormData] = useState<ColorType>((color as ColorType) || {
    name:"White",
    textColor: "#FFF",
    backgroundColor: "#FFF"
  });

  let isLoading = navigation.state == "loading";
  let isSubmitting = navigation.state == "submitting";

  
 

  const handleName = (value: string) => {
    formData.name = value
    setFormData({ ...formData}
  )
  }
  const handleTextColor = (value: string) => {
    formData.textColor = value;
    setFormData({ ...formData })
  }
  const handleBackgroundColor = (value: string) => {
    formData.backgroundColor = value;
    setFormData({ ...formData})
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
                  <Text as="h6" variant="bodyMd" fontWeight="bold" > Add new color</Text>
            </Box>
          </SpacingBackground>
            <Divider borderWidth="100" />
            <SpacingBackground backgroundColor="#F8F9FB">
              
            <Box paddingInline="300" paddingBlock="1000">
              <Grid gap={{lg:"30px"}}>
                <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
                  <TextField
                    label="Name"
                    value={`${formData.name}`}
                    onChange={handleName}
                    autoComplete="on"
                    error={getError(actionData,"name")}
                  />
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
                  <TextColorField  error={getError(actionData,"textColor")} label="Text color" color={formData.textColor} setColor={handleTextColor}/>
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
                  <TextColorField  error={getError(actionData,"backgroundColor")} label="Background Color" color={formData.backgroundColor} setColor={handleBackgroundColor}/>
                </Grid.Cell>
              </Grid>
            </Box>
              </SpacingBackground>
            <Divider borderWidth="100" />
            <SpacingBackground backgroundColor="#F9F9F9">
              
                <Box paddingInline="300" paddingBlock="300">
                  <InlineStack align="end" gap="600">
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
    textColor: z.string({ required_error: 'Text color is required' })
    .min(3, 'Text color is too short')
    .max(7, 'Text color is too long'),
    backgroundColor: z.string({ required_error: 'Bacckground color is required' })
    .min(3, 'Bacckground is too short')
    .max(7, 'Bacckground is too long')
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

  let size: ColorType = submission.value as ColorType;
  console.log(" data to  save", size)
  if (id) {
    size.id = parseInt(id);
    let res = await ColorService.updateColor(size, session.id)
    return res ?
      redirect(`..${flashMessage("Color  updated is completed successfully")}`)
      : json({ ...jFlashMessage("Color on Size upadating") });
  } else {
    let res =  await ColorService.addColor(size, session.id)
    return res ? redirect(`..${flashMessage("Color  added is completed successfully")}`)
      : json({ ...jFlashMessage("Color  on Size adding") });
  } 
};
