import {
  AutoSelection,
  BlockStack,
  Box,
  Button,
  Combobox,
  Grid,
  InlineError,
  InlineStack,
  LegacyStack,
  Listbox,
  Select,
  Tag,
  Text,
  TextField,
} from "@shopify/polaris";
import { useCallback, useMemo, useState } from "react";
import {
  Form,
  NavLink,
  redirect,
  useActionData,
  useLoaderData,
  useNavigate,
  useNavigation,
  useOutletContext,
  useSubmit,
} from "@remix-run/react";
import { BoxBackground } from "~/components/layouts/BoxBackground";
import { SpacingBackground } from "~/components/layouts/SpacingBackground";
import RayEndArrowIcon from "~/components/icons/RayEndArrowIcon";
import { ReactSwitchCustom } from "~/components/inputs/ReactSwitchCustom";
import uploadIcon from "~/components/icons/uploadIcon";
import { MultiColorCombobox } from "~/components/inputs/MultiColorCombobox";
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
import { set, z } from "zod";
import { getError } from "~/utils/error-getting";
import { BiSaveBtn } from "~/components/buttons/BiSaveBtn";
import { booleanTransform, jsonTransform } from "~/utils/transfomerZod";
import { ColorType, FontType } from "~/types/ManagePropertyType";
import { TextColorField } from "~/components/inputs/TextColorField";
import { DeleteIconBtn } from "~/components/buttons/DeleteIconBtn";
import { BiAddBtn } from "~/components/buttons/BiAddBtn";

const settingParams: [string, string] = ["customizerSign", "text"];
const formSchema = z.object({
  selectedFonts:  z
  .any()
  .transform(jsonTransform)
  .pipe(z.number().array()),
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
  colors: z
    .any()
    .transform(jsonTransform)
    .pipe(
      z.object({
        name: z.string(),
        codeHex: z.string(),
      }).array()
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
      enableFontSize:{
          active:true,
          minimumFontSize:12,
          maximumFontSize:30,
          defaultFontSize:16,
      },
      colors:[],
      enableCustomColor:true,
      enableBold:true,
      enableUnderline:true,
      enableOverline:true,
      enableStrike:true,
      enableItalic:true,
      enableOpacity:true,
      enableBorder:true,
      enableTextAlignment:true,
      enableCurvedUp:true,
      enableCurvedDown:true
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

  let { manageColors, manageFonts } = useOutletContext<{
    manageColors: ColorType[];
    manageFonts: FontType[];
  }>();

  const colors = manageColors
    ? manageColors.map((manageColor) => ({
        label: manageColor.name || "",
        value: `${manageColor.id}`,
      }))
    : [];

  const fonts = manageFonts
    ? manageFonts.map((manageFont) => ({
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
      codeHex: "#FFFFFF"
    });

    setFormData({ ...formData });
  }

  const  handleDeleteColor = (index: number) => {
    formData.colors.splice(index, 1);
    setFormData({ ...formData});

  }

  return (
    <>
      <Form onSubmit={handleFormSubmit} method="POST">
        <SpacingBackground border="1px solid #DDDDDD">
          <BoxBackground>
            <Box paddingInline="300" paddingBlock="1000">
              <Grid gap={{ lg: "30px" }}>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
                  <MultiCombobox
                    label="Select Font"
                    placeholder="Search font"
                    selectedOptions={formData.selectedFonts}
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
                    <Text as="h3" variant="bodyMd" fontWeight="bold"> Define text colors</Text>
                    <Grid gap={{ lg: "30px" }}>
                      {formData.colors?.map((color: any, index: number) => (
                          <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 2, lg: 4, xl: 4 }}>
                          <InlineStack gap={"300"} blockAlign="end" align="space-between" wrap={false}>
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
                            <InlineStack gap={"300"} blockAlign="center" align="space-between" wrap={false}>
                              
                            <TextColorField  color={color.codeHex} setColor={(value: any) => {
                                color.codeHex = value;
                                formData.colors[index] = color;
                              setFormData({ ...formData });
                              
                              }}
                              />
                            <DeleteIconBtn onClick={() => handleDeleteColor(index)} />
                          </InlineStack>

                          </InlineStack>
                          {true && (
                              <InlineError message={getError(
                                actionData,
                                `colors[${index}].name`
                              )||getError(
                                actionData,
                                `colors[${index}].name`
                              )||''} fieldID="myFieldID" />
                            )}
                          </Grid.Cell>
                        ))}
                    </Grid>  
                    <Box width="150px">
                    <BiAddBtn title="Add color" handleClick={()=>handleAddColor()} />
                    </Box>
                  </BlockStack>
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
                  <InlineStack gap="300">
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
                  </InlineStack>
                </Grid.Cell>

                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 4, xl: 4 }}>
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
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 4, xl: 4 }}>
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
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 4, xl: 4 }}>
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
                      <ActivatabaleItem
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
                      </ActivatabaleItem>
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

