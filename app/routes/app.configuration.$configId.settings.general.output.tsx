import {
  BlockStack,
  Box,
  Button,
  Grid,
  InlineStack,
  Select,
  Text,
  TextField,
} from "@shopify/polaris";
import { useCallback, useState } from "react";
import { Form, NavLink, redirect, useActionData, useLoaderData, useNavigate, useNavigation, useSubmit } from "@remix-run/react";
import { BoxBackground } from "~/components/layouts/BoxBackground";
import { SpacingBackground } from "~/components/layouts/SpacingBackground";
import { ReactSwitchCustom } from "~/components/inputs/ReactSwitchCustom";
import { settingAction, settingLoader } from "~/custom-action-loader/config-action-loader";
import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { booleanTransform, jsonTransform, stringTransform } from "~/utils/transfomerZod";
import { z } from "zod";
import useHandleFlashMessage from "~/hooks/useHandleFlashMessage";
import { FileInput } from "~/components/inputs/FileInput";
import { getError } from "~/utils/error-getting";
import { BiSaveBtn } from "~/components/buttons/BiSaveBtn";


const settingParams: [string, string] = ["generals", "output"];
const formSchema = z.object({
  filesFormat:z.string(),
  waterMark:z.string({required_error:"Files format is required"}).nullish().transform(stringTransform),
  zipOutputFiles:z.any().transform(jsonTransform).pipe(z.object({
    active:z.any().transform(booleanTransform).pipe(z.boolean()),
    zipOutFolderPrefix:z.string().nullish().transform(stringTransform)
 })),
  designComposition:z.any().transform(booleanTransform).pipe(z.boolean()),     
});

export const loader = async (agrs: LoaderFunctionArgs) => {
   return await settingLoader(agrs, settingParams);
}

export const action = async (args: ActionFunctionArgs) => {
  return await settingAction(args, settingParams, formSchema);
}

export default function ConfigSettingsGeneral() {

  const submit = useSubmit();
  let  {settingData } = useLoaderData<typeof loader>();
  useHandleFlashMessage();
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  let isSubmitting = navigation.state == "submitting";

  console.log('setting data :', settingData);
  const options = [
    { label: "PNG", value: "png" },
    { label: "JPEG", value: "jpeg" },
    { label: "SVG", value: "svg" },
    { label: "PNG + SVG", value: "png,svg" },
    { label: "JPEG + SVG", value: "jpeg,svg" },
    { label: "PNG+ JPEG", value: "png,jpeg" },
  ];
  

  const [formData, setFormData] = useState<any>(
    settingData || {
      filesFormat:options[0].value,
      waterMark:"",
      zipOutputFiles:{
         active:false,
         zipOutFolderPrefix:"aso_"
      },
      designComposition:false
      }
  );

  const handleInputChange = (inputName: string, value: any) => {
        setFormData((prevData:any) => ({
        ...prevData,
        [inputName]: value
    }));
  }

  
  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const data = {...formData,zipOutputFiles:JSON.stringify(formData.zipOutputFiles)};

    submit(data, { method: "POST" });
  }
  


  return (
    <>
      <Form onSubmit={handleFormSubmit} method="POST">
        <SpacingBackground border="1px solid #DDDDDD">
          <BoxBackground>
          <Box paddingInline="300" paddingBlock="1000">
              <Grid gap={{lg:"30px"}}>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
                  <BlockStack gap="300">
                  <Text as="strong" fontWeight="bold" variant="bodyLg">Output files format</Text>
                  <Select
                    label="What is your desired output files format ?"
                    options={options}
                    onChange={( value ) => handleInputChange("filesFormat", value)}
                      value={formData.filesFormat}
                      error={getError(actionData, "filesFormat")}
                  />
                  </BlockStack>
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
                  <BlockStack gap="300">
                  <Text as="strong" fontWeight="bold" variant="bodyLg">Watermark</Text>
               
                    <FileInput error={getError(actionData, "waterMark")} title="Upload image" 
                    path={formData.waterMark} handlePath={(value:any)=>handleInputChange("waterMark",value)}/>
                  </BlockStack>
                </Grid.Cell>
               
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
                  <BlockStack gap="300">
                    <InlineStack gap="300">
                      <Text as="strong" fontWeight="bold" variant="bodyLg">Zip  output files</Text>
                      <ReactSwitchCustom checked={formData.zipOutputFiles.active} setChecked={(value:any) => {
                        formData.zipOutputFiles.active = value
                      handleInputChange("zipOutputFiles", formData.zipOutputFiles )
                    }} />
                    </InlineStack>
               {formData.zipOutputFiles.active &&   <TextField
                    size="medium"
                    label="Zip output folder prefix"
                    value={formData.zipOutputFiles.zipOutFolderPrefix}
                      onChange={(value) => {
                        formData.zipOutputFiles.zipOutFolderPrefix = value
                      handleInputChange("zipOutputFiles", formData.zipOutputFiles )
                      }}
                      error={getError(actionData, "zipOutputFiles.zipOutFolderPrefix")} 
                    autoComplete="off"
                  />}
                  </BlockStack>
                </Grid.Cell>

                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
                  <BlockStack gap="300">
                    <InlineStack gap="300">
                      <Text as="strong" fontWeight="bold" variant="bodyLg">Design composition</Text>
                      <ReactSwitchCustom checked={formData.designComposition} setChecked={(value:any)=>handleInputChange("designComposition",value)} />
                    </InlineStack>
                    <Text as="p"> This option allows you to display or not design composition in the order</Text>
                  </BlockStack>
                </Grid.Cell>
              
              </Grid>
            </Box>
          </BoxBackground>
        </SpacingBackground>

        <SpacingBackground width="100%" height="auto" margin="3px 0 0 0">
          <BoxBackground>
            <Box paddingInline="300" paddingBlock="300">
              <InlineStack align="end" gap="600">
              <BiSaveBtn isLoading={isSubmitting} title="Save" />

              </InlineStack>
            </Box>
          </BoxBackground>
        </SpacingBackground>
      </Form>
    </>
  );
}

