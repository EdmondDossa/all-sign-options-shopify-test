import { WaterOpacitySvg } from "~/components/svgs/WaterOpacitySvg";
import { BlurSvg } from "~/components/svgs/BlurSvg";
import { SharpenSvg } from "~/components/svgs/SharpenSvg";
import { EmbossSvg } from "~/components/svgs/EmbossSvg";
import {
  Bleed,
  BlockStack,
  Box,
  Button,
  Grid,
  InlineError,
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
import { booleanTransform, jsonTransform, stringTransform } from "~/utils/transfomerZod";
import { ClipartsGroupType} from "~/types/ManagePropertyType";
import { BiAddBtn } from "~/components/buttons/BiAddBtn";
import { DeleteNowIconBtn } from "~/components/buttons/DeleteNowIconBtn";
import { TextColorField } from "~/components/inputs/TextColorField";
import { FileInput } from "~/components/inputs/FileInput";
import { PRICING_PLANS } from "~/utils/pricing";
import { CheckSpan } from "~/components/inputs/CheckSpan";
import { DeleteIconBtn } from "~/components/buttons/DeleteIconBtn";
import { FileUploader } from "./app.upload";
import { DeleteIcon } from "@shopify/polaris-icons";

const settingParams: [string, string] = ["customizerSign", "images"];
const formSchema = z.object({
  enableDownloadImage: z.any().transform(booleanTransform).pipe(z.boolean()),    
  enableUploadImage: z.any().transform(booleanTransform).pipe(z.boolean()),    
  colorsLabel: z.string().nullish().transform(stringTransform),
  colorsPrevImg: z.string().nullish().transform(stringTransform),
  colors: z.any().transform(jsonTransform).pipe(
      z.object({
          name: z.string(),
          codeHex: z.string(),
      }).array(),
  ),
  enableCustomColor: z.any().transform(booleanTransform).pipe(z.boolean()),
  fileUploadScript:z.any().transform(jsonTransform).pipe(z.object({
    customWithGraphical:z.boolean(),
    uploadMinWidth:z.number(),
    uploadMaxWidth:z.number(),
    allowedUploadsExtentions:z.string().array()
  })),
  cutlines: z.any().transform(jsonTransform).pipe(z.object({
    first: z.object({
      borderSize: z.number(),
      color: z.string()
    }),
    second: z.object({
      color: z.string(),
      size: z.number(),
      borderColor: z.string(),
      borderSize: z.number()
    })
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
    enableGreenify:z.boolean(),
    enablePinkify:z.boolean(),
    enableOrangeify:z.boolean(),
    enableBlueify:z.boolean(),
  })),
  scenes: z.any().transform(jsonTransform).pipe(z.string().array()),
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
    {
      "enableUploadImage": true,
      enableDownloadImage: true,
      colorsLabel:"Image Colors",
      colorsPrevImg:"",
      colors: [],
      enableCustomColor: true,
      "fileUploadScript":{
         "customWithGraphical":false,
         "uploadMinWidth":100,
         "uploadMaxWidth":100,
         "allowedUploadsExtentions":["png"]
      },
      "cutlines": {
        first: {
          borderSize: 0,
          color: '#FFFFFF'
        },
        second: {
          color: '#FFFFFF',
          size: 0,
          borderColor: '#FFFFFF',
          borderSize: 0
        }
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
         "enableSharpen":true,
         "enableGreenify":false,
         "enablePinkify":false,
         "enableOrangeify":false,
         "enableBlueify":false
      },
      "scenes": [],
      ...((settingData?.scenes) ? settingData : {})
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
      colors: JSON.stringify(formData.colors),
      fileUploadScript: JSON.stringify(formData.fileUploadScript),
      cutlines: JSON.stringify(formData.cutlines),
      enableClipart: JSON.stringify(formData.enableClipart),
      filter: JSON.stringify(formData.filter),
      scenes: JSON.stringify(formData.scenes)
    };

    submit(data, { method: "POST" });
  };

  let { manageClipartGroups , plan} = useOutletContext<{
    manageClipartGroups: ClipartsGroupType[];
    plan: string;
  }>();

  
  
    const clipartGroups = manageClipartGroups
    ? manageClipartGroups.map((manageClipartGroup) => ({
        label: manageClipartGroup.title || "",
        value: `${manageClipartGroup.id}`,
      }))
    : [];

  
  
    const handleAddColor = () => {
      if (!formData.colors) {
        formData.colors = [];
      }
      formData.colors.push({
        name: "",
        codeHex: "#FFFFFF",
      });
  
      setFormData({ ...formData });
    };
  
    const handleDeleteColor = (index: number) => {
      formData.colors.splice(index, 1);
      setFormData({ ...formData });
    };
  
  const handleSceneDelete = (scene: string) => {
      
     setFormData({
      ...formData,
       scenes: formData.scenes.filter((s: string) => s !== scene)
     })
  }

  const handleSceneChange = (values: string[]) => {

    setFormData({
      ...formData,
      scenes: values
    });

    console.log(formData);
  }
  
  



  return (
    <>
      <Form onSubmit={handleFormSubmit} method="POST">
        <SpacingBackground border="1px solid #DDDDDD">
          <BoxBackground>
          <Box paddingInline="300" paddingBlock="1000">
              <Grid gap={{ lg: "30px" }}>
              <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
              <InlineStack gap="300" blockAlign="center">
                      <Text as="strong" fontWeight="bold" variant="bodyMd">Enable Download Image </Text>
                      <ReactSwitchCustom checked={formData.enableDownloadImage} setChecked={(value:any)=>handleInputChange("enableDownloadImage",value)}/>
                    </InlineStack>
                </Grid.Cell>
              <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
              <InlineStack gap="300" blockAlign="center">
                      <Text as="strong" fontWeight="bold" variant="bodyMd">Enable upload Image </Text>
                      <ReactSwitchCustom checked={formData.enableUploadImage} setChecked={(value:any)=>handleInputChange("enableUploadImage",value)}/>
                    </InlineStack>
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
                  <BlockStack gap="300">
                    <Text as="h3" variant="bodyMd" fontWeight="bold">
                      Define text colors
                    </Text>
                    <Box maxWidth="350px" width="350px">

                    <TextField  
                              autoComplete="on"
                              onChange={(value) => {
                               
                                formData.colorsLabel = value;
                                setFormData({ ...formData });
                              }}
                              label="Label"
                              value={formData.colorsLabel}
                            />
                    </Box>
                    <Grid gap={{ lg: "30px" }}>
                      {formData.colors
                        .filter((curr: any, index: number) => plan===PRICING_PLANS.STARTER ? index < PRICING_PLANS.STARTER_RULES.imageColors : true)
                        ?.map((color: any, index: number) => (
                        <Grid.Cell
                          columnSpan={{ xs: 6, sm: 3, md: 2, lg: 4, xl: 4 }}
                        >
                          <InlineStack
                            gap={"300"}
                            blockAlign="end"
                            align="space-between"
                            wrap={false}
                          >
                            <TextField
                              autoComplete="on"
                              onChange={(value) => {
                                color.name = value;
                                formData.colors[index] = color;
                                setFormData({ ...formData });
                              }}
                              label="Name"
                              value={color.name}
                            />
                            <InlineStack
                              gap={"300"}
                              blockAlign="center"
                              align="space-between"
                              wrap={false}
                            >
                              <TextColorField
                                color={color.codeHex}
                                setColor={(value: string) => {
                                  color.codeHex = value;
                                  formData.colors[index] = color;
                                  setFormData({ ...formData });
                                }}
                              />
                              <DeleteNowIconBtn
                                onClick={() => handleDeleteColor(index)}
                              />
                            </InlineStack>
                          </InlineStack>
                          {true && (
                            <InlineError
                              message={
                                getError(actionData, `colors[${index}].name`) ||
                                getError(actionData, `colors[${index}].name`) ||
                                ""
                              }
                              fieldID="myFieldID"
                            />
                          )}
                        </Grid.Cell>
                      ))}
                    </Grid>
                   {(plan===PRICING_PLANS.STARTER  ? formData.colors.length < PRICING_PLANS.STARTER_RULES.imageColors : true) && <Box width="150px">
                      <BiAddBtn
                        title="Add more colors"
                        handleClick={() => handleAddColor()}
                      />
                    </Box>}
                  </BlockStack>
                </Grid.Cell>
                {
                  (plan == PRICING_PLANS.STARTER ? PRICING_PLANS.STARTER_RULES.imageCustomColors : true) && <>
                   <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 2, lg: 2, xl: 2 }}>
                  <InlineStack gap="300">
                    <Text as="strong" fontWeight="medium" variant="bodyMd">
                      Enable Custom color
                    </Text>
                    <ReactSwitchCustom
                      checked={formData.enableCustomColor}
                      setChecked={(value: any) => {
                        formData.enableCustomColor = value;
                        handleInputChange(
                          "enableCustomColor",
                          formData.enableCustomColor,
                        );
                      }}
                    />
                  </InlineStack>
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 6, xl: 6 }}>
                 
                 <FileInput title="Custom color preview image"  buttonTitle="upload image"  path={formData.colorsPrevImg} handlePath={(value:any)=>{formData.colorsPrevImg = value; setFormData({...formData})}}/>
                 </Grid.Cell>
                  
                  </>
                }
               
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
                <BlockStack gap="300">
                    <Text as="h3" variant="bodyMd" fontWeight="bold">
                      Cutlines Settings
                    </Text>
                    <BlockStack gap="400">
                      <Text as="h5" variant="bodyMd" fontWeight="bold">
                        First Cutline
                      </Text>
                      <Grid gap={{ lg: "30px" }}>
                        <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
                          <TextField
                            label="Border Size (for print ready file)"
                            type="number"
                            value={formData.cutlines.first.borderSize.toString()}
                            onChange={(value) => {
                              setFormData({
                                ...formData,
                                cutlines: {
                                  ...formData.cutlines,
                                  first: {
                                    ...formData.cutlines.first,
                                    borderSize: parseInt(value) || 0
                                  }
                                }
                              });
                            }}
                            autoComplete="off"
                          />
                        </Grid.Cell>
                        <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
                          <BlockStack gap="100">
                            <Text as="strong" variant="bodyMd">
                              Color
                            </Text>
                            <TextColorField
                              color={formData.cutlines.first.color}
                              setColor={(value: string) => {
                                setFormData({
                                  ...formData,
                                  cutlines: {
                                    ...formData.cutlines,
                                    first: {
                                      ...formData.cutlines.first,
                                      color: value
                                    }
                                  }
                                });
                              }}
                            />
                          </BlockStack>
                        </Grid.Cell>
                      </Grid>
                    </BlockStack>
                  </BlockStack>
                </Grid.Cell>

                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
                  <BlockStack gap="300">
                    <BlockStack gap="400">
                      <Text as="h5" variant="bodyMd" fontWeight="bold">
                        Second Cutline
                      </Text>
                      <Grid gap={{ lg: "30px" }}>
                        <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
                          <TextField
                            label="Size"
                            type="number"
                            value={formData.cutlines.second.size.toString()}
                            onChange={(value) => {
                              setFormData({
                                ...formData,
                                cutlines: {
                                  ...formData.cutlines,
                                  second: {
                                    ...formData.cutlines.second,
                                    size: parseInt(value) || 0
                                  }
                                }
                              });
                            }}
                            autoComplete="off"
                          />
                        </Grid.Cell>
                        <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
                          <BlockStack gap="100">
                            <Text as="strong" variant="bodyMd">
                              Color
                            </Text>
                            <TextColorField
                              color={formData.cutlines.second.color}
                              setColor={(value: string) => {
                                setFormData({
                                  ...formData,
                                  cutlines: {
                                    ...formData.cutlines,
                                    second: {
                                      ...formData.cutlines.second,
                                      color: value
                                    }
                                  }
                                });
                              }}
                            />
                          </BlockStack>
                        </Grid.Cell>
                        <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
                          <TextField
                            label="Border Size (for print ready file)"
                            type="number"
                            value={formData.cutlines.second.borderSize.toString()}
                            onChange={(value) => {
                              setFormData({
                                ...formData,
                                cutlines: {
                                  ...formData.cutlines,
                                  second: {
                                    ...formData.cutlines.second,
                                    borderSize: parseInt(value) || 0
                                  }
                                }
                              });
                            }}
                            autoComplete="off"
                          />
                        </Grid.Cell>
                        <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
                          <BlockStack gap="100">
                            <Text as="strong" variant="bodyMd">
                              Border Color
                            </Text>
                            <TextColorField
                              color={formData.cutlines.second.borderColor}
                              setColor={(value: string) => {
                                setFormData({
                                  ...formData,
                                  cutlines: {
                                    ...formData.cutlines,
                                    second: {
                                      ...formData.cutlines.second,
                                      borderColor: value
                                    }
                                  }
                                });
                              }}
                            />
                          </BlockStack>
                        </Grid.Cell>
                      </Grid>
                    </BlockStack>
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
                      <ActivatabaleItem fillIcon={true} noTrokeIcon={true} title="Greenify" status={formData.filter.enableGreenify}
                      toggleStatus={(value) => {
                        formData.filter.enableGreenify = value
                      handleInputChange("filter", formData.filter )
                      }}><WaterOpacitySvg />  </ActivatabaleItem>
                    <ActivatabaleItem fillIcon={true} noTrokeIcon={true} title="Pinkify" status={formData.filter.enablePinkify}
                      toggleStatus={(value) => {
                        formData.filter.enablePinkify = value
                      handleInputChange("filter", formData.filter )
                      }}><WaterOpacitySvg />  </ActivatabaleItem>
                    <ActivatabaleItem fillIcon={true} noTrokeIcon={true} title="Orangeify" status={formData.filter.enableOrangeify}
                      toggleStatus={(value) => {
                        formData.filter.enableOrangeify = value
                      handleInputChange("filter", formData.filter )
                      }}><WaterOpacitySvg />  </ActivatabaleItem>
                    <ActivatabaleItem fillIcon={true} noTrokeIcon={true} title="Blueify" status={formData.filter.enableBlueify}
                      toggleStatus={(value) => {
                        formData.filter.enableBlueify = value
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
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
                  <Text as="h6" fontWeight="bold" variant="bodyMd"> Scenes for configution preview</Text>
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
                  <Grid gap={{ lg: "30px" }}>
                    { formData.scenes?.map((scene: string) => (
                      
                      <Grid.Cell columnSpan={{ xs: 3, sm: 3, md: 2, lg: 2, xl: 2 }}>
                        <ClipartItem imgSrc={scene}  onDelete={()=>handleSceneDelete(scene)}/>
                      </Grid.Cell>
                    ))
                        
                    }
                  
                  </Grid>

                </Grid.Cell>
                  <Grid.Cell>
                  <Box width="300px">
                
                  </Box>
                  <FileUploader
                    multiple={true}
            type="image"
            fileData={formData.scenes}
            setFilesData={handleSceneChange}
            title="Uplaod image file"
          >  <BiAddBtn title="Add new Scene image"  /></FileUploader>
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


export const ClipartItem = ({
  imgSrc,
  onDelete,
}: {
  imgSrc: string;
  onDelete:Function;
}) => {
  return (
    <BlockStack>
      <Bleed marginBlockEnd="1000">
        <Box paddingInline="200">
          <InlineStack gap="200" align="end">
          <Button icon={DeleteIcon} tone="critical" onClick={() => onDelete()}/>
                 
                </InlineStack>
        </Box>
            </Bleed>
    <SpacingBackground backgroundColor="#FFFFFF" border="1px  solid #E8E8E8" borderRadius="5px" height="110px" width="auto">
      <div
      
        style={{  margin:"5px" }}
      >
        <img 
          src={imgSrc}
          alt={""}
          style={{ height: "100px", width : "100%" }}
        />
        
     
          
       
      </div>
    </SpacingBackground>
    </BlockStack>
  );
};


