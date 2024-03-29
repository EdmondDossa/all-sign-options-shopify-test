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
import prisma from "~/db.server";
import { z } from "zod";
import { parseWithZod } from "@conform-to/zod";
import { SizeType } from "~/types/ManagePropertyType";
import SizeService from "~/models/Size.service";
import { flashMessage, jFlashMessage } from "~/utils/message-flash";
import { getError } from "~/utils/error-getting";
import useHandleFlashMessage from "~/hooks/useHandleFlashMessage";
import LoadingGray from "~/components/icons/LoadingGray";
import { BiSaveBtn } from "~/components/buttons/BiSaveBtn";
import { BackBtn } from "~/components/buttons/BackBtn";



export const loader = async ({request, params }:LoaderFunctionArgs) => {
  const { session, admin } = await authenticate.admin(request);
  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  let size = null;
  
  if (id) {
    size = await SizeService.getSize(parseInt(id),session.id)
  }
  
  return json({ size})
}

export default function ManageSizeCreate() {
  const submit = useSubmit();
  const navigation = useNavigation()
  const actionData = useActionData<typeof action>();
  useHandleFlashMessage();
  console.log('action data :', actionData);
  let {size} = useLoaderData<typeof loader>()
  const [formData, setFormData] = useState<SizeType>((size as SizeType) || {
    label: "",
    width:0,
    height:0,
    thickness:{
        active:false,
        value:0
    }
  });

  let isLoading = navigation.state == "loading";
  let isSubmitting = navigation.state == "submitting";

  
  const handleWidth = (value: string) => setFormData({ ...formData, width: parseInt(value) })

  const handleLabel= (value: string) => setFormData({...formData, label:value})

  const handleHeight = (value: string) => setFormData({...formData, height:parseInt(value)})

  const handleThickness = (value: string) => {
    formData.thickness.value = parseInt(value);
    setFormData({ ...formData });
  }

  const handleActive = (value: boolean) => {
    formData.thickness.active = value;
    setFormData({ ...formData });
  }
  
  const navigate = useNavigate();
  const onBack = () => {
    navigate("..");
  };

   
  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(" log is nt errors");
    submit({ ...formData, thickness:JSON.stringify(formData.thickness) }, { method: "POST" });
  };
  


  return (
    <div>
      <SpacingBackground width="100%" height="auto" margin="16px 0px ">
          <Form onSubmit={handleSubmit} method="POST">
            <SpacingBackground backgroundColor="#F9F9F9">
            <Box paddingInline="300" paddingBlock="600">
                  <Text as="h6" variant="bodyMd" fontWeight="bold" > Create new size</Text>
            </Box>
          </SpacingBackground>
            <Divider borderWidth="100" />
            <SpacingBackground backgroundColor="#F8F9FB">
              
            <Box paddingInline="300" paddingBlock="1000">
              <Grid gap={{lg:"30px"}}>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
                  <TextField
                    label="Label"
                    value={`${formData.label}`}
                    onChange={handleLabel}
                    autoComplete="on"
                    error={getError(actionData,"label")}
                  />
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
                  <TextField
                    label="Width"
                    type="number"
                    value={`${formData.width}`}
                    onChange={handleWidth}
                        autoComplete="on"
                        error={getError(actionData,"width")}
                  />
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
                  <TextField
                    label="Height"
                    type="number"
                    value={`${formData.height}`}
                    onChange={handleHeight}
                        autoComplete="on"
                        error={getError(actionData,"height")}
                  />
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
                <InlineStack gap="300" blockAlign="center">
                      <Text as="strong" fontWeight="bold" variant="bodyMd">Thickness </Text>
                      <ReactSwitchCustom checked={formData.thickness.active} setChecked={handleActive} />
                    </InlineStack>
                   
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
                  <TextField
                    size="medium"
                    label="Thickeness"
                    type="number"
                    value={`${formData.thickness.value}`}
                    onChange={handleThickness}
                    autoComplete="on"
                    error={getError(actionData,"thickness.value")}
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
  label: z.string({ required_error: 'Name is required' })
  .min(3, 'Name is too short')
  .max(100, 'Name is too long'),
  width: z.number({
    required_error: 'Width is required',
  }),
  height: z.number({
    required_error: 'Height is required',
  }),
  thickness: z.any().transform((value)=> JSON.parse(value as string)||{}).pipe(
  z.object({
    active: z.boolean({ required_error: 'Thickness activation is required' }),
    value: z.number({
      required_error: 'Thickness value is required',
    }),
  }),)
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

  let size: SizeType = submission.value as SizeType;
  console.log(" data to  save", size)
  if (id) {
    size.id = parseInt(id);
    let res = await SizeService.updateSize(size, session.id)
    return res ?
      redirect(`..${flashMessage("Size  updated is completed successfully")}`)
      : json({ ...jFlashMessage("Error on Size upadating") });
  } else {
    let res =  await SizeService.addSize(size, session.id)
    return res ? redirect(`..${flashMessage("Size  added is completed successfully")}`)
      : json({ ...jFlashMessage("Error  on Size adding") });
  } 
};