import { WaterOpacitySvg } from "~/components/svgs/WaterOpacitySvg";
import { BlurSvg } from "~/components/svgs/BlurSvg";
import { SharpenSvg } from "~/components/svgs/SharpenSvg";
import { EmbossSvg } from "~/components/svgs/EmbossSvg";
import {
  BlockStack,
  Box,
  Grid,
  InlineStack,
  Text,
  TextField,
} from "@shopify/polaris";
import { useState } from "react";
import { Form,  useActionData, useLoaderData, useNavigation, useOutletContext, useSubmit } from "@remix-run/react";
import { BoxBackground } from "~/components/layouts/BoxBackground";
import { SpacingBackground } from "~/components/layouts/SpacingBackground";
import { ReactSwitchCustom } from "~/components/inputs/ReactSwitchCustom";
import { MultiCombobox } from "~/components/inputs/MultiCombobox";
import { ActivatabaleItem } from "~/components/inputs/ActivatabaleItem";
import {
  settingAction,
  settingLoader,
} from "~/custom-action-loader/config-action-loader";
import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import useHandleFlashMessage from "~/hooks/useHandleFlashMessage";
import { z } from "zod";
import { getError } from "~/utils/error-getting";
import { BiSaveBtn } from "~/components/buttons/BiSaveBtn";
import { booleanTransform, jsonTransform } from "~/utils/transfomerZod";
import { ClipartsGroupType} from "~/types/ManagePropertyType";

const settingParams: [string, string] = ["customizerSign", "images"];
const formSchema = z.object({
  enableUploadImage:z.any().transform(booleanTransform).pipe(z.boolean()),     
  fileUploadScript:z.any().transform(jsonTransform).pipe(z.object({
    customWithGraphical:z.boolean(),
    uploadMinWidth:z.number(),
    uploadMaxWidth:z.number(),
    allowedUploadsExtentions:z.string().array()
  })),
  enableClipart:z.any().transform(jsonTransform).pipe(z.object({
    active:z.boolean(),
    selectClipartGroups:z.number().array(),
  })),
  filter:z.any().transform(jsonTransform).pipe(z.object({
    active:z.boolean(),
    enableGreyscale:z.boolean(),
    enableOpacity:z.boolean(),
    enableEmbross:z.boolean(),
    enableBlur:z.boolean(),
    enableSepia:z.boolean(),
    enableSharpen:z.boolean(),
  })),
  
});

export const loader = async (agrs: LoaderFunctionArgs) => {
  return await settingLoader(agrs, settingParams);
};


export const action = async (args: ActionFunctionArgs) => {
  return await settingAction(args, settingParams, formSchema);
};


export default function ConfigSettingsGeneral() {
  
  const options = [
    { label: "PNG", value: "png" },
    { label: "JPEG", value: "jpeg" },
    { label: "SVG", value: "svg" },
    { label: "WEBP", value: "webp" },
    { label: "GIF", value: "gif" },
  ];

  const submit = useSubmit();
  let { settingData } = useLoaderData<typeof loader>();
  useHandleFlashMessage();
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  let isSubmitting = navigation.state == "submitting";

  console.log("setting data :", settingData);

  const [formData, setFormData] = useState<any>(
    settingData || {
      "enableUploadImage":true,
      "fileUploadScript":{
         "customWithGraphical":false,
         "uploadMinWidth":100,
         "uploadMaxWidth":100,
         "allowedUploadsExtentions":["png"]
      },
      "enableClipart":{
         "active":true,
         "selectClipartGroups":[
            1
         ]
      },
      "filter":{
         "active":true,
         "enableGreyscale":false,
         "enableOpacity":true,
         "enableEmbross":true,
         "enableBlur":true,
         "enableSepia":true,
         "enableSharpen":true
      }
    },
  );

  const handleInputChange = (inputName: string, value: any) => {
    setFormData((prevData: any) => ({
      ...prevData,
      [inputName]: value,
    }));
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const data = {
      ...formData,
      fileUploadScript: JSON.stringify(formData.fileUploadScript),
      enableClipart: JSON.stringify(formData.enableClipart),
      filter: JSON.stringify(formData.filter)
    };

    submit(data, { method: "POST" });
  };

  let { manageClipartGroups } = useOutletContext<{
    manageClipartGroups: ClipartsGroupType[];
  }>();

  
  
    const clipartGroups = manageClipartGroups
    ? manageClipartGroups.map((manageClipartGroup) => ({
        label: manageClipartGroup.title || "",
        value: `${manageClipartGroup.id}`,
      }))
    : [];

  
  



  return (
    <>
      <Form onSubmit={handleFormSubmit} method="POST">
        <SpacingBackground border="1px solid #DDDDDD">
          <BoxBackground>
          <Box paddingInline="300" paddingBlock="1000">
              <Grid gap={{ lg: "30px" }}>
              <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
              <InlineStack gap="300" blockAlign="center">
                      <Text as="strong" fontWeight="bold" variant="bodyMd">Enable upload Image </Text>
                      <ReactSwitchCustom checked={formData.enableUploadImage} setChecked={(value:any)=>handleInputChange("enableUploadImage",value)}/>
                    </InlineStack>
                 </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
                <BlockStack gap="100">
                  
                      <Text as="strong" fontWeight="bold" variant="bodyMd">File upload script</Text>
                   
                   <Text as="p" variant="bodySm" tone="subdued" > This option allows you to set which file upload script you would like to use</Text>
                  </BlockStack>
              
                </Grid.Cell>
              
               
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
                <InlineStack gap="300" blockAlign="center">
                      <Text as="strong" fontWeight="medium" variant="bodyMd"  tone="subdued">Normal</Text>
                      <ReactSwitchCustom  checked={formData.fileUploadScript.customWithGraphical} setChecked={(value:any) => {
                        formData.fileUploadScript.customWithGraphical = value
                      handleInputChange("fileUploadScript", formData.fileUploadScript )
                    }} />
                      <Text as="strong" fontWeight="medium" variant="bodyMd" tone="subdued">Custom with graphical enchacements</Text>
                    </InlineStack>
                </Grid.Cell>

                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
                <TextField
                    size="medium"
                    label="Upload min width (px)"
                    value={formData.fileUploadScript.uploadMinWidth}
                    onChange={(value) => {
                      formData.fileUploadScript.uploadMinWidth = value
                    handleInputChange("fileUploadScript", formData.fileUploadScript )
                    }}
                    error={getError(actionData, "fileUploadScript.uploadMinWidth")} 
                  autoComplete="off"
                  />
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
                <TextField
                    size="medium"
                    label="Upload Max width (px)"
                    value={formData.fileUploadScript.uploadMaxWidth}
                    onChange={(value) => {
                      formData.fileUploadScript.uploadMaxWidth = value
                    handleInputChange("fileUploadScript", formData.fileUploadScript )
                    }}
                    error={getError(actionData, "fileUploadScript.uploadMaxWidth")} 
                  autoComplete="off"
                  />
                </Grid.Cell>
               
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
                <MultiCombobox
                       label="Select allow extension"
                       placeholder="select  extension"
                       data={options}
                       selectedOptions={formData.fileUploadScript.allowedUploadsExtentions}
                       setSelectedOptions={(value: any) => {
                         if (Array.isArray(value)) {
                           formData.fileUploadScript.allowedUploadsExtentions = value;
                           handleInputChange("fileUploadScript", formData.fileUploadScript )
                         }
                     }} 
                     ></MultiCombobox>
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
                <BlockStack gap="400">
                    <InlineStack gap="300" blockAlign="center">
                      <Text as="strong" fontWeight="bold" variant="bodyMd">Enable clipart</Text>
                      <ReactSwitchCustom checked={formData.enableClipart.active} setChecked={(value:any) => {
                        formData.enableClipart.active = value
                      handleInputChange("enableClipart", formData.enableClipart )
                    }} />
                    </InlineStack>
                   {formData.enableClipart.active && <MultiCombobox
                       label="Select clipart  group"
                       placeholder="Search clipart group"
                       data={clipartGroups}
                       selectedOptions={formData.enableClipart.selectClipartGroups?.map((curr:any)=>`${curr}`)}
                       setSelectedOptions={(value: any) => {
                         if (Array.isArray(value)) {
                           formData.enableClipart.selectClipartGroups = value.map((curr) => parseInt(curr));
                           handleInputChange("enableClipart", formData.enableClipart )
                         }
                     }} 
                     ></MultiCombobox>}
                  </BlockStack>
              
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
                <BlockStack gap="400">
                <InlineStack gap="300" blockAlign="center">
                      <Text as="strong" fontWeight="bold" variant="bodyMd">Filter</Text>
                      <ReactSwitchCustom  checked={formData.filter.active} setChecked={(value:any) => {
                        formData.filter.active = value
                      handleInputChange("filter", formData.filter )
                    }}/>
                    </InlineStack>
                  { formData.filter.active &&  <InlineStack  gap="800" blockAlign="start"> 
                      <ActivatabaleItem fillIcon={true} noTrokeIcon={true} title="Greyscale"
                      status={formData.filter.enableGreyscale}
                      toggleStatus={(value) => {
                        formData.filter.enableGreyscale = value
                      handleInputChange("filter", formData.filter )
                      }}><WaterOpacitySvg />  </ActivatabaleItem>
                    <ActivatabaleItem fillIcon={true}  noTrokeIcon={true} title="Opacity" status={formData.filter.enableOpacity}
                      toggleStatus={(value) => {
                        formData.filter.enableOpacity = value
                      handleInputChange("filter", formData.filter )
                      }}><WaterOpacitySvg/>  </ActivatabaleItem>
                    <ActivatabaleItem fillIcon={true}   noTrokeIcon={true} title="Blur" status={formData.filter.enableBlur}
                      toggleStatus={(value) => {
                        formData.filter.enableBlur = value
                      handleInputChange("filter", formData.filter )
                      }}><BlurSvg/>  </ActivatabaleItem>
                    <ActivatabaleItem fillIcon={true} noTrokeIcon={true} title="Sepia" status={formData.filter.enableSepia}
                      toggleStatus={(value) => {
                        formData.filter.enableSepia = value
                      handleInputChange("filter", formData.filter )
                      }}><SharpenSvg/>  </ActivatabaleItem>
                    <ActivatabaleItem title="sharpen" status={formData.filter.enableSharpen}
                      toggleStatus={(value) => {
                        formData.filter.enableSharpen = value
                      handleInputChange("filter", formData.filter )
                      }}><SharpenSvg/>  </ActivatabaleItem>
                    <ActivatabaleItem title="Emboss" status={formData.filter.enableEmbross}
                      toggleStatus={(value) => {
                        formData.filter.enableEmbross = value
                      handleInputChange("filter", formData.filter )
                      }}><EmbossSvg />  </ActivatabaleItem>
                    </InlineStack>}
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


