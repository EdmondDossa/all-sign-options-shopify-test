import {
  BlockStack,
  Box,
  Divider,
  Grid,
  InlineError,
  InlineStack,
  Text,
  TextField,
  Thumbnail,
} from "@shopify/polaris";
import { useState } from "react";
import {
  Form,
  useActionData,
  useLoaderData,
  useNavigation,
  useOutletContext,
  useSubmit,
} from "@remix-run/react";
import { BoxBackground } from "~/components/layouts/BoxBackground";
import { SpacingBackground } from "~/components/layouts/SpacingBackground";
import { ReactSwitchCustom } from "~/components/inputs/ReactSwitchCustom";
import { MultiCombobox } from "~/components/inputs/MultiCombobox";
import { BoldSvg } from "~/components/svgs/BoldSvg";
import { UnderlineSvg } from "~/components/svgs/UnderlineSvg";
import { OverlineSvg } from "~/components/svgs/OverlineSvg";
import { StrikeThroughSvg } from "~/components/svgs/StrikeThroughSvg";
import { ItalicOutlinedSvg } from "~/components/svgs/ItalicOutlinedSvg";
import { OpacitySvg } from "~/components/svgs/OpacitySvg";
import { TextAlignmentSvg } from "~/components/svgs/TextAlignmentSvg";
import { CurvedUpSvg } from "~/components/svgs/CurvedUpSvg";
import { CurvedDownSvg } from "~/components/svgs/CurvedDownSvg";
import { ShapeBorderTopSvg } from "~/components/svgs/ShapeBorderTopSvg";
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
import { ColorType, FontType } from "~/types/ManagePropertyType";
import { TextColorField } from "~/components/inputs/TextColorField";
import { BiAddBtn } from "~/components/buttons/BiAddBtn";
import { DeleteNowIconBtn } from "~/components/buttons/DeleteNowIconBtn";
import { FileInput } from "~/components/inputs/FileInput";
import { PRICING_PLANS } from "~/utils/pricing";

const settingParams: [string, string] = ["customizerSign", "text"];
const formSchema = z.object({
  selectedFonts: z.any().transform(jsonTransform).pipe(z.number().array()),
  enableFontSize: z
    .any()
    .transform(jsonTransform)
    .pipe(
      z.object({
        active: z.boolean(),
        minimumFontSize: z.number(),
        maximumFontSize: z.number(),
        defaultFontSize: z.number(),
      }),
  ),
  textType: z.any().transform(jsonTransform).pipe(z.string()),
  colorsLabel: z.string().nullish().transform(stringTransform),
  colorsPrevImg: z.string().nullish().transform(stringTransform),
  colors: z
    .any()
    .transform(jsonTransform)
    .pipe(
      z
        .object({
          name: z.string(),
          codeHex: z.string(),
        })
        .array(),
    ),
  enableCustomColor: z.any().transform(booleanTransform).pipe(z.boolean()),
  enableBold: z.any().transform(booleanTransform).pipe(z.boolean()),
  enableUnderline: z.any().transform(booleanTransform).pipe(z.boolean()),
  enableOverline: z.any().transform(booleanTransform).pipe(z.boolean()),
  enableStrike: z.any().transform(booleanTransform).pipe(z.boolean()),
  enableItalic: z.any().transform(booleanTransform).pipe(z.boolean()),
  enableOpacity: z.any().transform(booleanTransform).pipe(z.boolean()),
  enableBorder: z.any().transform(booleanTransform).pipe(z.boolean()),
  enableTextAlignment: z.any().transform(booleanTransform).pipe(z.boolean()),
  enableCurvedDown: z.any().transform(booleanTransform).pipe(z.boolean()),
  enableCurvedUp: z.any().transform(booleanTransform).pipe(z.boolean()),
});

export const loader = async (agrs: LoaderFunctionArgs) => {
  return await settingLoader(agrs, settingParams);
};

export const action = async (args: ActionFunctionArgs) => {
  return await settingAction(args, settingParams, formSchema);
};

export default function ConfigSettingsGeneral() {
  const submit = useSubmit();
  let { settingData } = useLoaderData<typeof loader>();
  useHandleFlashMessage();
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  let isSubmitting = navigation.state == "submitting";

  console.log("setting data :", settingData);

  const [formData, setFormData] = useState<any>(
    settingData || {
      selectedFonts: [],
      enableFontSize: {
        active: true,
        minimumFontSize: 12,
        maximumFontSize: 30,
        defaultFontSize: 16,
      },
      colorsLabel:"Texts Colors",
      colorsPrevImg:"",
      colors: [],
      enableCustomColor: true,
      textType: "normal",
      enableBold: true,
      enableUnderline: true,
      enableOverline: true,
      enableStrike: true,
      enableItalic: true,
      enableOpacity: true,
      enableBorder: true,
      enableTextAlignment: true,
      enableCurvedUp: true,
      enableCurvedDown: true,
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
      selectedFonts: JSON.stringify(formData.selectedFonts),
      colors: JSON.stringify(formData.colors),
      enableFontSize: JSON.stringify(formData.enableFontSize),
    };

    submit(data, { method: "POST" });
  };

  let {  manageFonts, plan } = useOutletContext<{
    manageFonts: FontType[];
    plan: string;
  }>();



  const fonts = manageFonts
    ? manageFonts?.map((manageFont) => ({
        label: manageFont.label || "",
        value: `${manageFont.id}`,
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

  const textTypes = [
    {
      label: "NORMAL",
      value: "normal",
      image: "/assets/images/text-types/text-normal.png",
    },
    {
      label: "NEON",
      value: "neon",
      image: "/assets/images/text-types/text-neon.png",
    },
    {
      label: "3D",
      value: "3D",
      image: "/assets/images/text-types/text-3d.png",
    }
  ]

  return (
    <>
      <Form onSubmit={handleFormSubmit} method="POST">
        <SpacingBackground border="1px solid #DDDDDD">
        {/* <BoxBackground>
            <Box paddingInline="300" paddingBlock="300">
              <Grid gap={{ lg: "15px" }}>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
                  <Text as="h2" variant="bodyLg" fontWeight="bold"> Sign Text Type</Text> 
                  <Text   as="p" > hoose from three text types to create your custom sign. The selected type allows customers to personalize their sign effortlessly</Text> 
                  
                </Grid.Cell>
                {textTypes.map((textType) =>
                <Grid.Cell columnSpan={{ xs: 2, sm: 2, md: 2, lg: 4, xl: 4 }}>
                  <InlineStack blockAlign="center" gap="100" >
                    <Thumbnail size="large" source={textType.image}  alt={textType.label}/>
                    <InlineStack align="end" blockAlign="center" gap="200">
                      <Text as="h3" variant="bodyMd" fontWeight="semibold">{textType.label}</Text>
                      <ReactSwitchCustom checked={formData.textType == textType.value} setChecked={() => handleInputChange("textType", textType.value)} />
                    </InlineStack>
                  </InlineStack>
                </Grid.Cell>)}
              </Grid>
            </Box>
          </BoxBackground>
          <Divider  borderColor="border-brand" borderWidth="100" /> */}
          <BoxBackground>
            <Box paddingInline="300" paddingBlock="1000">
              <Grid gap={{ lg: "30px" }}>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
                  <MultiCombobox
                    label="Select Font"
                    placeholder="Search font"
                    selectedOptions={formData.selectedFonts.map(
                      (curr: any) => `${curr}`,
                    )}
                    data={fonts}
                    setSelectedOptions={(value: any) => {
                      if (Array.isArray(value)) {
                        handleInputChange(
                          "selectedFonts",
                          value.map((curr) => parseInt(curr)),
                        );
                      }
                    }}
                  ></MultiCombobox>
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
                      {formData.colors?.filter((curr: any, index: number) => plan===PRICING_PLANS.STARTER ? index < PRICING_PLANS.STARTER_RULES.textColors : true)
                        .map((color: any, index: number) => (
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
                                setColor={(value: any) => {
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
                   {(plan===PRICING_PLANS.STARTER  ? formData.colors.length < PRICING_PLANS.STARTER_RULES.textColors : true) && <Box width="150px">
                      <BiAddBtn
                        title="Add more colors"
                        handleClick={() => handleAddColor()}
                      />
                    </Box>}
                  </BlockStack>
                </Grid.Cell>
                {(plan == PRICING_PLANS.STARTER ? PRICING_PLANS.STARTER_RULES.textCustomColors : true) &&
                  <>
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
                  <InlineStack gap="300">
                    <Text as="strong" fontWeight="medium" variant="bodyMd">
                      Enable font size
                    </Text>
                    <ReactSwitchCustom
                      checked={formData.enableFontSize.active}
                      setChecked={(value: any) => {
                        formData.enableFontSize.active = value;
                        handleInputChange(
                          "enableFontSize",
                          formData.enableFontSize,
                        );
                      }}
                    />
                  </InlineStack>
                </Grid.Cell>

                {formData.enableFontSize.active && (
                  <>
                    <Grid.Cell
                      columnSpan={{ xs: 6, sm: 6, md: 6, lg: 4, xl: 4 }}
                    >
                      <TextField
                        size="medium"
                        label="Minimun font size"
                        value={formData.enableFontSize.minimumFontSize}
                        onChange={(value) => {
                          formData.enableFontSize.minimumFontSize = value;
                          handleInputChange(
                            "enableFontSize",
                            formData.enableFontSize,
                          );
                        }}
                        error={getError(
                          actionData,
                          "enableFontSize.minimumFontSize",
                        )}
                        autoComplete="off"
                      />
                    </Grid.Cell>
                    <Grid.Cell
                      columnSpan={{ xs: 6, sm: 6, md: 6, lg: 4, xl: 4 }}
                    >
                      <TextField
                        size="medium"
                        label="Maximum font size"
                        value={formData.enableFontSize.maximumFontSize}
                        onChange={(value) => {
                          formData.enableFontSize.maximumFontSize = value;
                          handleInputChange(
                            "enableFontSize",
                            formData.enableFontSize,
                          );
                        }}
                        error={getError(
                          actionData,
                          "enableFontSize.maximumFontSize",
                        )}
                        autoComplete="off"
                      />
                    </Grid.Cell>
                    <Grid.Cell
                      columnSpan={{ xs: 6, sm: 6, md: 6, lg: 4, xl: 4 }}
                    >
                      <TextField
                        size="medium"
                        label="Default size"
                        value={formData.enableFontSize.defaultFontSize}
                        onChange={(value) => {
                          formData.enableFontSize.defaultFontSize = value;
                          handleInputChange(
                            "enableFontSize",
                            formData.enableFontSize,
                          );
                        }}
                        error={getError(
                          actionData,
                          "enableFontSize.defaultFontSize",
                        )}
                        autoComplete="off"
                      />
                    </Grid.Cell>
                  </>
                )}

                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
                  <BlockStack gap="300">
                    <Text as="strong" fontWeight="bold" variant="bodyMd">
                      Enable text options
                    </Text>
                    <InlineStack gap="800" blockAlign="start">
                      <ActivatabaleItem
                        fillIcon={true}
                        title="Bold"
                        status={formData.enableBold}
                        toggleStatus={(value: any) =>
                          handleInputChange("enableBold", value)
                        }
                      >
                        <BoldSvg />{" "}
                      </ActivatabaleItem>
                      <ActivatabaleItem
                        title="Underline"
                        status={formData.enableUnderline}
                        toggleStatus={(value: any) =>
                          handleInputChange("enableUnderline", value)
                        }
                      >
                        <UnderlineSvg />{" "}
                      </ActivatabaleItem>
                      <ActivatabaleItem
                        title="Overline"
                        status={formData.enableOverline}
                        toggleStatus={(value: any) =>
                          handleInputChange("enableOverline", value)
                        }
                      >
                        <OverlineSvg />{" "}
                      </ActivatabaleItem>
                      <ActivatabaleItem
                        title="Strike through"
                        status={formData.enableStrike}
                        toggleStatus={(value: any) =>
                          handleInputChange("enableStrike", value)
                        }
                      >
                        <StrikeThroughSvg />{" "}
                      </ActivatabaleItem>
                      <ActivatabaleItem
                        title="Italic"
                        status={formData.enableItalic}
                        toggleStatus={(value: any) =>
                          handleInputChange("enableItalic", value)
                        }
                      >
                        <ItalicOutlinedSvg />{" "}
                      </ActivatabaleItem>
                      <ActivatabaleItem
                        title="Opacity"
                        status={formData.enableOpacity}
                        toggleStatus={(value: any) =>
                          handleInputChange("enableOpacity", value)
                        }
                      >
                        <OpacitySvg />{" "}
                      </ActivatabaleItem>
                      <ActivatabaleItem
                        title="Bolder"
                        status={formData.enableBorder}
                        toggleStatus={(value: any) =>
                          handleInputChange("enableBorder", value)
                        }
                      >
                        <ShapeBorderTopSvg />{" "}
                      </ActivatabaleItem>
                      <ActivatabaleItem
                        title="Text Alignment"
                        status={formData.enableTextAlignment}
                        toggleStatus={(value: any) =>
                          handleInputChange("enableTextAlignment", value)
                        }
                      >
                        <TextAlignmentSvg />{" "}
                      </ActivatabaleItem>
                      {/* <ActivatabaleItem
                        title="Curved-up"
                        status={formData.enableCurvedUp}
                        toggleStatus={(value: any) =>
                          handleInputChange("enableCurvedUp", value)
                        }
                      >
                        <CurvedUpSvg />{" "}
                      </ActivatabaleItem>
                      <ActivatabaleItem
                        title="Curved-down"
                        status={formData.enableCurvedDown}
                        toggleStatus={(value: any) =>
                          handleInputChange("enableCurvedDown", value)
                        }
                      >
                        <CurvedDownSvg />{" "}
                      </ActivatabaleItem> */}
                    </InlineStack>
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
