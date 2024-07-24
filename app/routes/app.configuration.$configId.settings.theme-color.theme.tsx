import { BlockStack, Box, Button, Collapsible, Grid, InlineStack, Text } from "@shopify/polaris";
import { useId, useState } from "react";
import {
  Form,
  useActionData,
  useLoaderData,
  useNavigation,
  useSubmit,
} from "@remix-run/react";
import { BoxBackground } from "~/components/layouts/BoxBackground";
import { SpacingBackground } from "~/components/layouts/SpacingBackground";
import {
  settingAction,
  settingLoader,
} from "~/custom-action-loader/config-action-loader";
import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { z } from "zod";
import useHandleFlashMessage from "~/hooks/useHandleFlashMessage";
import { BiSaveBtn } from "~/components/buttons/BiSaveBtn";
import { TextColorField } from "~/components/inputs/TextColorField";
import { CheckSpan } from "~/components/inputs/CheckSpan";
import { jsonTransform, stringTransform } from "~/utils/transfomerZod";

const settingParams: [string, string] = ["themeColors", ""];

const formSchema = z.object({
  skin: z.string(),
  colors: z
    .any()
    .transform(jsonTransform)
});

export const loader = async (agrs: LoaderFunctionArgs) => {
  return await settingLoader(agrs, settingParams);
};

export const action = async (args: ActionFunctionArgs) => {
  return await settingAction(args, settingParams, formSchema);
};

export default function ConfigSettingsThemeColor() {
  const submit = useSubmit();
  let { settingData } = useLoaderData<typeof loader>();
  useHandleFlashMessage();
  const [expanded, setExpanded] = useState({
    canvas: true,
    price: false,
    reset: false,
    undoRedo: false,
    preview: false,
    help: false,
    optionsSideBar: false,
    optionsModal: false,
    optionsInModal: false,
    objectsOptions: false,
    recaps: false,
  });
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  let isSubmitting = navigation.state == "submitting";
  const [formData, setFormData] = useState<any>({
    skin: settingData?.skin || "default",
    colors: {
      canvas: {
      backgroundColor: "#f4f8fa",
      borderColor: "#c3cfd6"
      },
      bars: {
      titleColor: "#000000",
      backgroundColor: "#ffffff",
      reset: {
          textColor: "#000000",
          hoverTextColor: "#dd3232",
          backgroundColor: "#ffffff",
          hoverBackgroundColor: "#f4f8fa",
          borderColor: "#ffffff",
          hoverBorderColor: "#f4f8fa",
          modalBackgroundColor: "#000000",
          modalContainerBackground: "#ffffff",
          modalTextColor: "#000000",
          modalYesButtonBackgroundColor: "#f4f8fa",
          modalYesButtonTextColor: "#000000",
          modalNoButtonBackgroundColor: "#dc2626",
          modalNoButtonTextColor: "#ffffff"
      },
      undoRedo: {
          textColor: "#000000",
          hoverTextColor: "#016464",
          backgroundColor: "#ffffff",
          hoverBackgroundColor: "#f4f8fa",
          borderColor: "#ffffff",
          hoverBorderColor: "#f4f8fa",
          disabledBackgroundColor: "#ffffff",
          disabledTextColor: "#c3cfd6"
      },
      preview: {
          textColor: "#000000",
          hoverTextColor: "#016464",
          backgroundColor: "#ffffff",
          hoverBackgroundColor: "#f4f8fa",
          borderColor: "#ffffff",
          hoverBorderColor: "#f4f8fa"
      },
      help: {
          textColor: "#ffffff",
          hoverTextColor: "#ffffff",
          backgroundColor: "#016464",
          hoverBackgroundColor: "#016464",
          borderColor: "#016464",
          hoverBorderColor: "#016464"
      },
      price: {
          backgroundColor: "#ffffff",
          textColor: "#000000",
          textAfterColor: "#000000",
          textBeforeColor: "#000000"
      }
      },
      optionsSideBar: {
      backgroundColor: "#eef3f6",
      scrollButtonsBackgroundColor: "#4a4a4a",
      scrollButtonsHoverBackgroundColor: "#74848d",
      scrollButtonsTextColor: "#ffffff",
      scrollButtonsHoverTextColor: "#ffffff",
      options: {
          buttons: {
          backgroundColor: "#ffffff",
          hoverBackgroundColor: "#ffffff",
          textColor: "#000000",
          hoverTextColor: "#016464",
          hovertextColor: "#016464"
          },
          modals: {
          headerBackgroundColor: "#016464",
          headerTextColor: "#ffffff",
          textColor: "#000000",
          option: {
              textColor: "#000000",
              hoverBackgroundColor: "#eef3f6",
              hoverTextColor: "#000000",
              activeTextColor: "#016464"
          },
          buttons: {
              backgroundColor: "#016464",
              hoverBackgroundColor: "#028383",
              textColor: "#ffffff",
              hoverTextColor: "#ffffff"
          },
          backgroundColor: "#ffffff"
          }
      }
      },
      objectsOptions: {
      backgroundColor: "#ffffff",
      edit: {
          buttonColor: "#ffffff",
          hoverButtonColor: "#787878",
          textColor: "#000000",
          hoverTextColor: "#ffffff"
      },
      clone: {
          buttonColor: "#ffffff",
          hoverButtonColor: "#787878",
          textColor: "#000000",
          hoverTextColor: "#ffffff"
      },
      delete: {
          buttonColor: "#ffffff",
          hoverButtonColor: "#787878",
          textColor: "#dd3232",
          hoverTextColor: "#dd3232"
      },
      center: {
          buttonColor: "#ffffff",
          hoverButtonColor: "#787878",
          textColor: "#000000",
          hoverTextColor: "#ffffff"
      }
      },
      recaps: {
      headerBackgroundColor: "#058585",
      headerTextColor: "#ffffff",
      backgroundColor: "#ffffff",
      optionTextColor: "#000000",
      optionHoverBackgroundColor: "#eef3f6",
      optionHoverTextColor: "#000000",
      optionBorderColor: "#eef3f6",
      optionHoverBorderColor: "#eef3f6",
      buttonFinishBackgroundColor: "#febd52",
      buttonFinishTextColor: "#14213d",
      buttonFinishHoverBackgroundColor: "#fcac29",
      buttonFinishHoverTextColor: "#313e52",
      buttonAddToCartBackgroundColor: "#febd52",
      buttonAddToCartHoverBackgroundColor: "#fcac29",
      buttonAddToCartTextColor: "#14213d",
      buttonAddToCartHoverTextColor: "#313e52",
      buttonEditBackgroundColor: "#016464",
      buttonEditHoverBackgroundColor: "#058585",
      buttonEditTextColor: "#ffffff",
      buttonEditHoverTextColor: "#f4f8fa"
      },
      ...(settingData?.colors?.recaps ? settingData.colors : {})
  },
    
  });

  const handleInputChange = (inputName: string, value: any) => {
    setFormData((prevData: any) => ({
      ...prevData,
      [inputName]: value,
    }));
  };

  let skins = [
    {
      title: "Default Skin",
      value: "default",
      img: "/theme-default.png",
    },
    {
      title: "Couffo Skin",
      value: "couffo",
      img: "/theme-couffo.png",
    },
  ];

  const handleColorChange = (value: any) => {
    setFormData((prevData: any) => {
      prevData["colors"]=value;
      return { ...prevData };
    });
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const data = { ...formData, colors: JSON.stringify(formData.colors) };

    submit(data, { method: "POST" });
  };

  return (
    <>
      <Form onSubmit={handleFormSubmit} method="POST">
        <SpacingBackground border="1px solid #DDDDDD" margin="3px 0 0 0">
          <BoxBackground>
            <Box paddingInline="300" paddingBlock="1000">
              <Grid gap={{ lg: "20px" }}>
                {skins.map((skin) => {
                  return (
                    <Grid.Cell
                      columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}
                    >
                      <AppearanceItem
                        title={skin.title}
                        imgSrc={skin.img}
                        active={formData.skin == skin.value}
                        onChange={(value) => {
                          handleInputChange("skin", skin.value);
                        }}
                      />
                    </Grid.Cell>
                  );
                })}
              </Grid>
            </Box>
          </BoxBackground>
        </SpacingBackground>
        <BlockStack gap="300">

      
        <ColorItem onToggle={() => setExpanded({ ...expanded, canvas: !expanded.canvas })} title="Canvas, Header and Side Bars" open={expanded.canvas}>
              <Grid gap={{ lg: "20px" }}>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 6, xl: 6 }}>
                  <TextColorField
                    label="Canvas background color"
                    color={formData.colors.canvas.backgroundColor}
                    setColor={(value: any) => {
                          formData.colors.canvas.backgroundColor = value;
                          handleColorChange(formData.colors);
                        }
                    }
                  />
            </Grid.Cell>
              <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 6, xl: 6 }}>
                  <TextColorField
                    label="Canvas border color"
                    color={formData.colors.canvas.borderColor}
                    setColor={(value: any) => {
                          formData.colors.canvas.borderColor = value;
                          handleColorChange(formData.colors);
                        }
                    }
                  />
            </Grid.Cell>
              <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 6, xl: 6 }}>
                    <TextColorField
                      label="Bars Background color"
                      color={formData.colors.bars.backgroundColor}
                      setColor={(value: any) => {
                            formData.colors.bars.backgroundColor = value;
                            handleColorChange(formData.colors);
                          }
                      }
                    />
              </Grid.Cell>
              <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 6, xl: 6 }}>
                    <TextColorField
                      label="Bars title color"
                      color={formData.colors.bars.titleColor}
                      setColor={(value: any) => {
                            formData.colors.bars.titleColor = value;
                            handleColorChange(formData.colors);
                          }
                      }
                    />
            </Grid.Cell>
            
                
              </Grid>
        </ColorItem>
        <ColorItem onToggle={() => setExpanded({ ...expanded, price: !expanded.price })} title="Price  Section" open={expanded.price}>
              <Grid gap={{ lg: "20px" }}>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 6, xl: 6 }}>
                  <TextColorField
                    label="Background color"
                    color={formData.colors.bars.price.backgroundColor}
                    setColor={(value: any) => {
                          formData.colors.bars.price.backgroundColor = value;
                          handleColorChange(formData.colors);
                        }
                    }
                  />
            </Grid.Cell>
              <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 6, xl: 6 }}>
                  <TextColorField
                    label="Text color"
                    color={formData.colors.bars.price.textColor}
                    setColor={(value: any) => {
                          formData.colors.bars.price.textColor = value;
                          handleColorChange(formData.colors);
                        }
                    }
                  />
            </Grid.Cell>
            <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 6, xl: 6 }}>
                  <TextColorField
                    label="Text before price"
                    color={formData.colors.bars.price.textBeforeColor}
                    setColor={(value: any) => {
                          formData.colors.bars.price.textBeforeColor = value;
                          handleColorChange(formData.colors);
                        }
                    }
                  />
            </Grid.Cell>
            <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 6, xl: 6 }}>
                  <TextColorField
                    label="Text after price"
                    color={formData.colors.bars.price.textAfterColor}
                    setColor={(value: any) => {
                          formData.colors.bars.price.textAfterColor = value;
                          handleColorChange(formData.colors);
                        }
                    }
                  />
            </Grid.Cell>
          
                
              </Grid>
        </ColorItem>

        <ColorItem onToggle={() => setExpanded({ ...expanded, reset: !expanded.reset })} title="Reset button" open={expanded.reset}>
              <Grid gap={{ lg: "20px" }}>
                <Grid.Cell columnSpan={{ xs: 3, sm: 3, md: 2, lg: 3, xl: 3 }}>
                  <TextColorField
                    label="Background color"
                    color={formData.colors.bars.reset.backgroundColor}
                    setColor={(value: any) => {
                          formData.colors.bars.reset.backgroundColor = value;
                          handleColorChange(formData.colors);
                        }
                    }
                  />
            </Grid.Cell>
            <Grid.Cell columnSpan={{ xs: 3, sm: 3, md: 2, lg: 3, xl: 3 }}>
                  <TextColorField
                    label="Hover background color"
                    color={formData.colors.bars.reset.hoverBackgroundColor}
                    setColor={(value: any) => {
                          formData.colors.bars.reset.hoverBackgroundColor = value;
                          handleColorChange(formData.colors);
                        }
                    }
                  />
            </Grid.Cell>
            <Grid.Cell columnSpan={{ xs: 3, sm: 3, md: 2, lg: 3, xl: 3 }}>
                  <TextColorField
                    label="Text color"
                    color={formData.colors.bars.reset.textColor}
                    setColor={(value: any) => {
                          formData.colors.bars.reset.textColor = value;
                          handleColorChange(formData.colors);
                        }
                    }
                  />
            </Grid.Cell>
            <Grid.Cell columnSpan={{ xs: 3, sm: 3, md: 2, lg: 3, xl: 3 }}>
                  <TextColorField
                    label="Hover text color"
                    color={formData.colors.bars.reset.hoverTextColor}
                    setColor={(value: any) => {
                          formData.colors.bars.reset.hoverTextColor = value;
                          handleColorChange(formData.colors);
                        }
                    }
                  />
            </Grid.Cell>

            <Grid.Cell columnSpan={{ xs: 3, sm: 3, md: 2, lg: 3, xl: 3 }}>
                  <TextColorField
                    label="Border color"
                    color={formData.colors.bars.reset.borderColor}
                    setColor={(value: any) => {
                          formData.colors.bars.reset.borderColor = value;
                          handleColorChange(formData.colors);
                        }
                    }
                  />
            </Grid.Cell>
            <Grid.Cell columnSpan={{ xs: 3, sm: 3, md: 2, lg: 3, xl: 3 }}>
                  <TextColorField
                    label="Hover border color"
                    color={formData.colors.bars.reset.hoverBorderColor}
                    setColor={(value: any) => {
                          formData.colors.bars.reset.hoverBorderColor = value;
                          handleColorChange(formData.colors);
                        }
                    }
                  />
            </Grid.Cell>
            <Grid.Cell columnSpan={{ xs: 3, sm: 3, md: 2, lg: 3, xl: 3 }}>
                  <TextColorField
                    label="Modal  Background color"
                    color={formData.colors.bars.reset.modalBackgroundColor}
                    setColor={(value: any) => {
                          formData.colors.bars.reset.modalBackgroundColor = value;
                          handleColorChange(formData.colors);
                        }
                    }
                  />
            </Grid.Cell>
            <Grid.Cell columnSpan={{ xs: 3, sm: 3, md: 2, lg: 3, xl: 3 }}>
                  <TextColorField
                    label="Container modal color"
                    color={formData.colors.bars.reset.modalContainerBackground}
                    setColor={(value: any) => {
                          formData.colors.bars.reset.modalContainerBackground = value;
                          handleColorChange(formData.colors);
                        }
                    }
                  />
            </Grid.Cell>

            <Grid.Cell columnSpan={{ xs: 3, sm: 3, md: 2, lg: 3, xl: 3 }}>
                  <TextColorField
                    label="Modal text color"
                    color={formData.colors.bars.reset.modalTextColor}
                    setColor={(value: any) => {
                          formData.colors.bars.reset.modalTextColor = value;
                          handleColorChange(formData.colors);
                        }
                    }
                  />
            </Grid.Cell>
            <Grid.Cell columnSpan={{ xs: 3, sm: 3, md: 2, lg: 3, xl: 3 }}>
                  <TextColorField
                    label="Yes background color"
                    color={formData.colors.bars.reset.modalYesButtonBackgroundColor}
                    setColor={(value: any) => {
                          formData.colors.bars.reset.modalYesButtonBackgroundColor = value;
                          handleColorChange(formData.colors);
                        }
                    }
                  />
            </Grid.Cell>
            <Grid.Cell columnSpan={{ xs: 3, sm: 3, md: 2, lg: 3, xl: 3 }}>
                  <TextColorField
                    label="Yes  text color"
                    color={formData.colors.bars.reset.modalYesButtonTextColor}
                    setColor={(value: any) => {
                          formData.colors.bars.reset.modalYesButtonTextColor = value;
                          handleColorChange(formData.colors);
                        }
                    }
                  />
            </Grid.Cell>
            <Grid.Cell columnSpan={{ xs: 3, sm: 3, md: 2, lg: 3, xl: 3 }}>
                  <TextColorField
                    label="No background color"
                    color={formData.colors.bars.reset.modalNoButtonBackgroundColor}
                    setColor={(value: any) => {
                          formData.colors.bars.reset.modalNoButtonBackgroundColor = value;
                          handleColorChange(formData.colors);
                        }
                    }
                  />
            </Grid.Cell>
            <Grid.Cell columnSpan={{ xs: 3, sm: 3, md: 2, lg: 3, xl: 3 }}>
                  <TextColorField
                    label="No  text color"
                    color={formData.colors.bars.reset.modalNoButtonTextColor}
                    setColor={(value: any) => {
                          formData.colors.bars.reset.modalNoButtonTextColor = value;
                          handleColorChange(formData.colors);
                        }
                    }
                  />
            </Grid.Cell>
          </Grid>
        </ColorItem>


        <ColorItem onToggle={() => setExpanded({ ...expanded, undoRedo: !expanded.undoRedo })} title="Undo  and redo buttons" open={expanded.undoRedo}>
              <Grid gap={{ lg: "20px" }}>
                <Grid.Cell columnSpan={{ xs: 3, sm: 3, md: 2, lg: 4, xl: 4 }}>
                  <TextColorField
                    label="Background color"
                    color={formData.colors.bars.undoRedo.backgroundColor}
                    setColor={(value: any) => {
                          formData.colors.bars.undoRedo.backgroundColor = value;
                          handleColorChange(formData.colors);
                        }
                    }
                  />
            </Grid.Cell>
            <Grid.Cell columnSpan={{ xs: 3, sm: 3, md: 2, lg: 4, xl: 4 }}>
                  <TextColorField
                    label="Hover background color"
                    color={formData.colors.bars.undoRedo.hoverBackgroundColor}
                    setColor={(value: any) => {
                          formData.colors.bars.undoRedo.hoverBackgroundColor = value;
                          handleColorChange(formData.colors);
                        }
                    }
                  />
            </Grid.Cell>

            <Grid.Cell columnSpan={{ xs: 3, sm: 3, md: 2, lg: 4, xl: 4 }}>
                  <TextColorField
                    label="Text color"
                    color={formData.colors.bars.undoRedo.textColor}
                    setColor={(value: any) => {
                          formData.colors.bars.undoRedo.textColor = value;
                          handleColorChange(formData.colors);
                        }
                    }
                  />
            </Grid.Cell>
            <Grid.Cell columnSpan={{ xs: 3, sm: 3, md: 2, lg: 4, xl: 4 }}>
                  <TextColorField
                    label="Hover text color"
                    color={formData.colors.bars.undoRedo.hoverTextColor}
                    setColor={(value: any) => {
                          formData.colors.bars.undoRedo.hoverTextColor = value;
                          handleColorChange(formData.colors);
                        }
                    }
                  />
            </Grid.Cell>


            <Grid.Cell columnSpan={{ xs: 3, sm: 3, md: 2, lg: 4, xl: 4 }}>
                  <TextColorField
                    label="border color"
                    color={formData.colors.bars.undoRedo.borderColor}
                    setColor={(value: any) => {
                          formData.colors.bars.undoRedo.borderColor = value;
                          handleColorChange(formData.colors);
                        }
                    }
                  />
            </Grid.Cell>
            <Grid.Cell columnSpan={{ xs: 3, sm: 3, md: 2, lg: 4, xl: 4 }}>
                  <TextColorField
                    label="Hover border color"
                    color={formData.colors.bars.undoRedo.hoverBorderColor}
                    setColor={(value: any) => {
                          formData.colors.bars.undoRedo.hoverBorderColor = value;
                          handleColorChange(formData.colors);
                        }
                    }
                  />
            </Grid.Cell>
            </Grid>
        </ColorItem>



        <ColorItem onToggle={() => setExpanded({ ...expanded, preview: !expanded.preview })} title="Preview buttons" open={expanded.preview}>
              <Grid gap={{ lg: "20px" }}>
                <Grid.Cell columnSpan={{ xs: 3, sm: 3, md: 2, lg: 4, xl: 4 }}>
                  <TextColorField
                    label="Background color"
                    color={formData.colors.bars.preview.backgroundColor}
                    setColor={(value: any) => {
                          formData.colors.bars.preview.backgroundColor = value;
                          handleColorChange(formData.colors);
                        }
                    }
                  />
            </Grid.Cell>
            <Grid.Cell columnSpan={{ xs: 3, sm: 3, md: 2, lg: 4, xl: 4 }}>
                  <TextColorField
                    label="Hover background color"
                    color={formData.colors.bars.preview.hoverBackgroundColor}
                    setColor={(value: any) => {
                          formData.colors.bars.preview.hoverBackgroundColor = value;
                          handleColorChange(formData.colors);
                        }
                    }
                  />
            </Grid.Cell>

            <Grid.Cell columnSpan={{ xs: 3, sm: 3, md: 2, lg: 4, xl: 4 }}>
                  <TextColorField
                    label="Text color"
                    color={formData.colors.bars.preview.textColor}
                    setColor={(value: any) => {
                          formData.colors.bars.preview.textColor = value;
                          handleColorChange(formData.colors);
                        }
                    }
                  />
            </Grid.Cell>
            <Grid.Cell columnSpan={{ xs: 3, sm: 3, md: 2, lg: 4, xl: 4 }}>
                  <TextColorField
                    label="Hover text color"
                    color={formData.colors.bars.preview.hoverTextColor}
                    setColor={(value: any) => {
                          formData.colors.bars.preview.hoverTextColor = value;
                          handleColorChange(formData.colors);
                        }
                    }
                  />
            </Grid.Cell>


            <Grid.Cell columnSpan={{ xs: 3, sm: 3, md: 2, lg: 4, xl: 4 }}>
                  <TextColorField
                    label="border color"
                    color={formData.colors.bars.preview.borderColor}
                    setColor={(value: any) => {
                          formData.colors.bars.preview.borderColor = value;
                          handleColorChange(formData.colors);
                        }
                    }
                  />
            </Grid.Cell>
            <Grid.Cell columnSpan={{ xs: 3, sm: 3, md: 2, lg: 4, xl: 4 }}>
                  <TextColorField
                    label="Hover border color"
                    color={formData.colors.bars.preview.hoverBorderColor}
                    setColor={(value: any) => {
                          formData.colors.bars.preview.hoverBorderColor = value;
                          handleColorChange(formData.colors);
                        }
                    }
                  />
            </Grid.Cell>
            </Grid>
        </ColorItem>



        <ColorItem onToggle={() => setExpanded({ ...expanded, help: !expanded.help })} title="Help buttons" open={expanded.help}>
              <Grid gap={{ lg: "20px" }}>
                <Grid.Cell columnSpan={{ xs: 3, sm: 3, md: 2, lg: 4, xl: 4 }}>
                  <TextColorField
                    label="Background color"
                    color={formData.colors.bars.help.backgroundColor}
                    setColor={(value: any) => {
                          formData.colors.bars.help.backgroundColor = value;
                          handleColorChange(formData.colors);
                        }
                    }
                  />
            </Grid.Cell>
            <Grid.Cell columnSpan={{ xs: 3, sm: 3, md: 2, lg: 4, xl: 4 }}>
                  <TextColorField
                    label="Hover background color"
                    color={formData.colors.bars.help.hoverBackgroundColor}
                    setColor={(value: any) => {
                          formData.colors.bars.help.hoverBackgroundColor = value;
                          handleColorChange(formData.colors);
                        }
                    }
                  />
            </Grid.Cell>

            <Grid.Cell columnSpan={{ xs: 3, sm: 3, md: 2, lg: 4, xl: 4 }}>
                  <TextColorField
                    label="Text color"
                    color={formData.colors.bars.help.textColor}
                    setColor={(value: any) => {
                          formData.colors.bars.help.textColor = value;
                          handleColorChange(formData.colors);
                        }
                    }
                  />
            </Grid.Cell>
            <Grid.Cell columnSpan={{ xs: 3, sm: 3, md: 2, lg: 4, xl: 4 }}>
                  <TextColorField
                    label="Hover text color"
                    color={formData.colors.bars.help.hoverTextColor}
                    setColor={(value: any) => {
                          formData.colors.bars.help.hoverTextColor = value;
                          handleColorChange(formData.colors);
                        }
                    }
                  />
            </Grid.Cell>


            <Grid.Cell columnSpan={{ xs: 3, sm: 3, md: 2, lg: 4, xl: 4 }}>
                  <TextColorField
                    label="border color"
                    color={formData.colors.bars.help.borderColor}
                    setColor={(value: any) => {
                          formData.colors.bars.help.borderColor = value;
                          handleColorChange(formData.colors);
                        }
                    }
                  />
            </Grid.Cell>
            <Grid.Cell columnSpan={{ xs: 3, sm: 3, md: 2, lg: 4, xl: 4 }}>
                  <TextColorField
                    label="Hover border color"
                    color={formData.colors.bars.help.hoverBorderColor}
                    setColor={(value: any) => {
                          formData.colors.bars.help.hoverBorderColor = value;
                          handleColorChange(formData.colors);
                        }
                    }
                  />
            </Grid.Cell>
            </Grid>
        </ColorItem>

        <ColorItem onToggle={() => setExpanded({ ...expanded, optionsSideBar: !expanded.optionsSideBar })} title="Options SideBar" open={expanded.optionsSideBar}>
              <Grid gap={{ lg: "20px" }}>
                <Grid.Cell columnSpan={{ xs: 3, sm: 3, md: 2, lg: 4, xl: 3 }}>
                  <TextColorField
                    label="Background color"
                    color={formData.colors.optionsSideBar.backgroundColor}
                    setColor={(value: any) => {
                          formData.colors.optionsSideBar.backgroundColor = value;
                          handleColorChange(formData.colors);
                        }
                    }
                  />
            </Grid.Cell>
            <Grid.Cell columnSpan={{ xs: 3, sm: 3, md: 2, lg: 4, xl: 3 }}>
                  <TextColorField
                    label="Scroll button Background color"
                    color={formData.colors.optionsSideBar.scrollButtonsBackgroundColor}
                    setColor={(value: any) => {
                          formData.colors.optionsSideBar.scrollButtonsBackgroundColor = value;
                          handleColorChange(formData.colors);
                        }
                    }
                  />
            </Grid.Cell>
            <Grid.Cell columnSpan={{ xs: 3, sm: 3, md: 2, lg: 4, xl: 3 }}>
                  <TextColorField
                    label="Scroll hover button Background color"
                    color={formData.colors.optionsSideBar.scrollButtonsHoverBackgroundColor}
                    setColor={(value: any) => {
                          formData.colors.optionsSideBar.scrollButtonsHoverBackgroundColor = value;
                          handleColorChange(formData.colors);
                        }
                    }
                  />
            </Grid.Cell>
            <Grid.Cell columnSpan={{ xs: 3, sm: 3, md: 2, lg: 4, xl: 3 }}>
                  <TextColorField
                    label="Scroll button text color"
                    color={formData.colors.optionsSideBar.scrollButtonsTextColor}
                    setColor={(value: any) => {
                          formData.colors.optionsSideBar.scrollButtonsTextColor = value;
                          handleColorChange(formData.colors);
                        }
                    }
                  />
            </Grid.Cell>
            <Grid.Cell columnSpan={{ xs: 3, sm: 3, md: 2, lg: 4, xl: 3 }}>
                  <TextColorField
                    label="Scroll button text hover color"
                    color={formData.colors.optionsSideBar.scrollButtonsHoverTextColor}
                    setColor={(value: any) => {
                          formData.colors.optionsSideBar.scrollButtonsHoverTextColor = value;
                          handleColorChange(formData.colors);
                        }
                    }
                  />
            </Grid.Cell>

            <Grid.Cell columnSpan={{ xs: 3, sm: 3, md: 2, lg: 4, xl: 3 }}>
                  <TextColorField
                    label="Options button Background color"
                    color={formData.colors.optionsSideBar.options.buttons.backgroundColor}
                    setColor={(value: any) => {
                          formData.colors.optionsSideBar.options.buttons.backgroundColor = value;
                          handleColorChange(formData.colors);
                        }
                    }
                  />
            </Grid.Cell>
            <Grid.Cell columnSpan={{ xs: 3, sm: 3, md: 2, lg: 4, xl: 3 }}>
                  <TextColorField
                    label="Options  button hover Background color"
                    color={formData.colors.optionsSideBar.options.buttons.hoverBackgroundColor}
                    setColor={(value: any) => {
                          formData.colors.optionsSideBar.options.buttons.hoverBackgroundColor = value;
                          handleColorChange(formData.colors);
                        }
                    }
                  />
            </Grid.Cell>
            <Grid.Cell columnSpan={{ xs: 3, sm: 3, md: 2, lg: 4, xl: 3 }}>
                  <TextColorField
                    label="Options button text color"
                    color={formData.colors.optionsSideBar.options.buttons.textColor}
                    setColor={(value: any) => {
                          formData.colors.optionsSideBar.options.buttons.textColor = value;
                          handleColorChange(formData.colors);
                        }
                    }
                  />
            </Grid.Cell>
            <Grid.Cell columnSpan={{ xs: 3, sm: 3, md: 2, lg: 4, xl: 3 }}>
                  <TextColorField
                    label="Options button hover text  color"
                    color={formData.colors.optionsSideBar.options.buttons.hoverTextColor}
                    setColor={(value: any) => {
                          formData.colors.optionsSideBar.options.buttons.hoverTextColor = value;
                          handleColorChange(formData.colors);
                        }
                    }
                  />
            </Grid.Cell>
           
            </Grid>
        </ColorItem>


        <ColorItem onToggle={() => setExpanded({ ...expanded, optionsModal: !expanded.optionsModal })} title="Options modals" open={expanded.optionsModal}>
              <Grid gap={{ lg: "20px" }}>
                <Grid.Cell columnSpan={{ xs: 3, sm: 3, md: 2, lg: 4, xl: 3 }}>
                  <TextColorField
                    label="Modal Background color"
                    color={formData.colors.optionsSideBar.options.modals.backgroundColor}
                    setColor={(value: any) => {
                          formData.colors.optionsSideBar.options.modals.backgroundColor = value;
                          handleColorChange(formData.colors);
                        }
                    }
                  />
            </Grid.Cell>
            <Grid.Cell columnSpan={{ xs: 3, sm: 3, md: 2, lg: 4, xl: 3 }}>
                  <TextColorField
                    label="Modal  text color"
                    color={formData.colors.optionsSideBar.options.modals.textColor}
                    setColor={(value: any) => {
                          formData.colors.optionsSideBar.options.modals.textColor= value;
                          handleColorChange(formData.colors);
                        }
                    }
                  />
            </Grid.Cell>

            <Grid.Cell columnSpan={{ xs: 3, sm: 3, md: 2, lg: 4, xl: 3 }}>
                  <TextColorField
                    label="Modal header Background color"
                    color={formData.colors.optionsSideBar.options.modals.headerBackgroundColor}
                    setColor={(value: any) => {
                          formData.colors.optionsSideBar.options.modals.headerBackgroundColor = value;
                          handleColorChange(formData.colors);
                        }
                    }
                  />
            </Grid.Cell>
            <Grid.Cell columnSpan={{ xs: 3, sm: 3, md: 2, lg: 4, xl: 3 }}>
                  <TextColorField
                    label="Modal header text color"
                    color={formData.colors.optionsSideBar.options.modals.headerTextColor}
                    setColor={(value: any) => {
                          formData.colors.optionsSideBar.options.modals.headerTextColor= value;
                          handleColorChange(formData.colors);
                        }
                    }
                  />
            </Grid.Cell>



            <Grid.Cell columnSpan={{ xs: 3, sm: 3, md: 2, lg: 4, xl: 3 }}>
                  <TextColorField
                    label="Modal button Background color"
                    color={formData.colors.optionsSideBar.options.modals.buttons.backgroundColor}
                    setColor={(value: any) => {
                          formData.colors.optionsSideBar.options.modals.buttons.backgroundColor = value;
                          handleColorChange(formData.colors);
                        }
                    }
                  />
            </Grid.Cell>
            <Grid.Cell columnSpan={{ xs: 3, sm: 3, md: 2, lg: 4, xl: 3 }}>
                  <TextColorField
                    label="Modal button hover Background color"
                    color={formData.colors.optionsSideBar.options.modals.buttons.hoverBackgroundColor}
                    setColor={(value: any) => {
                          formData.colors.optionsSideBar.options.modals.buttons.hoverBackgroundColor = value;
                          handleColorChange(formData.colors);
                        }
                    }
                  />
            </Grid.Cell>
            <Grid.Cell columnSpan={{ xs: 3, sm: 3, md: 2, lg: 4, xl: 3 }}>
                  <TextColorField
                    label="Modal button text color"
                    color={formData.colors.optionsSideBar.options.modals.buttons.textColor}
                    setColor={(value: any) => {
                          formData.colors.optionsSideBar.options.modals.buttons.textColor= value;
                          handleColorChange(formData.colors);
                        }
                    }
                  />
            </Grid.Cell>


           
            <Grid.Cell columnSpan={{ xs: 3, sm: 3, md: 2, lg: 4, xl: 3 }}>
                  <TextColorField
                    label="Modal button hover text color"
                    color={formData.colors.optionsSideBar.options.modals.buttons.hoverTextColor}
                    setColor={(value: any) => {
                          formData.colors.optionsSideBar.options.modals.buttons.hoverTextColor = value;
                          handleColorChange(formData.colors);
                        }
                    }
                  />
            </Grid.Cell>
          
          
           
            </Grid>
        </ColorItem>


        <ColorItem onToggle={() => setExpanded({ ...expanded, optionsInModal: !expanded.optionsInModal })} title="Options in modals" open={expanded.optionsInModal}>
              <Grid gap={{ lg: "20px" }}>
                
              <Grid.Cell columnSpan={{ xs: 3, sm: 3, md: 2, lg: 4, xl: 3 }}>
                  <TextColorField
                    label="Modal option text color"
                    color={formData.colors.optionsSideBar.options.modals.option.textColor}
                    setColor={(value: any) => {
                          formData.colors.optionsSideBar.options.modals.option.textColor= value;
                          handleColorChange(formData.colors);
                        }
                    }
                  />
            </Grid.Cell>


           
            <Grid.Cell columnSpan={{ xs: 3, sm: 3, md: 2, lg: 4, xl: 3 }}>
                  <TextColorField
                    label="Modal option hover text color"
                    color={formData.colors.optionsSideBar.options.modals.option.hoverTextColor}
                    setColor={(value: any) => {
                          formData.colors.optionsSideBar.options.modals.option.hoverTextColor = value;
                          handleColorChange(formData.colors);
                        }
                    }
                  />
            </Grid.Cell>
          
          

         
            <Grid.Cell columnSpan={{ xs: 3, sm: 3, md: 2, lg: 4, xl: 3 }}>
                  <TextColorField
                    label="Modal option hover Background color"
                    color={formData.colors.optionsSideBar.options.modals.option.hoverBackgroundColor}
                    setColor={(value: any) => {
                          formData.colors.optionsSideBar.options.modals.option.hoverBackgroundColor = value;
                          handleColorChange(formData.colors);
                        }
                    }
                  />
            </Grid.Cell>
            <Grid.Cell columnSpan={{ xs: 3, sm: 3, md: 2, lg: 4, xl: 3 }}>
                  <TextColorField
                    label="Modal option active text color"
                    color={formData.colors.optionsSideBar.options.modals.option.activeTextColor}
                    setColor={(value: any) => {
                          formData.colors.optionsSideBar.options.modals.option.activeTextColor = value;
                          handleColorChange(formData.colors);
                        }
                    }
                  />
            </Grid.Cell>
      
           
            </Grid>
        </ColorItem>




        <ColorItem onToggle={() => setExpanded({ ...expanded, objectsOptions: !expanded.objectsOptions })} title="Objects  options" open={expanded.objectsOptions}>
          <Grid gap={{ lg: "20px" }}>
          <Grid.Cell columnSpan={{ xs: 3, sm: 3, md: 2, lg: 4, xl: 4 }}>
                  <TextColorField
                    label="Background color"
                    color={formData.colors.objectsOptions.backgroundColor}
                    setColor={(value: any) => {
                          formData.colors.objectsOptions.backgroundColor = value;
                          handleColorChange(formData.colors);
                        }
                    }
                  />
            </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 3, sm: 3, md: 2, lg: 4, xl: 4 }}>
                  <TextColorField
                    label="Edit button color"
                    color={formData.colors.objectsOptions.edit.buttonColor}
                    setColor={(value: any) => {
                          formData.colors.objectsOptions.edit.buttonColor = value;
                          handleColorChange(formData.colors);
                        }
                    }
                  />
            </Grid.Cell>
            <Grid.Cell columnSpan={{ xs: 3, sm: 3, md: 2, lg: 4, xl: 4 }}>
                  <TextColorField
                    label="Hover Edit button color"
                    color={formData.colors.objectsOptions.edit.hoverButtonColor}
                    setColor={(value: any) => {
                          formData.colors.objectsOptions.edit.hoverButtonColor = value;
                          handleColorChange(formData.colors);
                        }
                    }
                  />
            </Grid.Cell>

            <Grid.Cell columnSpan={{ xs: 3, sm: 3, md: 2, lg: 4, xl: 4 }}>
                  <TextColorField
                    label="Edit button Text color"
                    color={formData.colors.objectsOptions.edit.textColor}
                    setColor={(value: any) => {
                          formData.colors.objectsOptions.edit.textColor = value;
                          handleColorChange(formData.colors);
                        }
                    }
                  />
            </Grid.Cell>
            <Grid.Cell columnSpan={{ xs: 3, sm: 3, md: 2, lg: 4, xl: 4 }}>
                  <TextColorField
                    label="Hover Edit button text color"
                    color={formData.colors.objectsOptions.edit.hoverTextColor}
                    setColor={(value: any) => {
                          formData.colors.objectsOptions.edit.hoverTextColor = value;
                          handleColorChange(formData.colors);
                        }
                    }
                  />
            </Grid.Cell>



            <Grid.Cell columnSpan={{ xs: 3, sm: 3, md: 2, lg: 4, xl: 4 }}>
                  <TextColorField
                    label="Clone button color"
                    color={formData.colors.objectsOptions.clone.buttonColor}
                    setColor={(value: any) => {
                          formData.colors.objectsOptions.clone.buttonColor = value;
                          handleColorChange(formData.colors);
                        }
                    }
                  />
            </Grid.Cell>
            <Grid.Cell columnSpan={{ xs: 3, sm: 3, md: 2, lg: 4, xl: 4 }}>
                  <TextColorField
                    label="Hover Clone button color"
                    color={formData.colors.objectsOptions.clone.hoverButtonColor}
                    setColor={(value: any) => {
                          formData.colors.objectsOptions.clone.hoverButtonColor = value;
                          handleColorChange(formData.colors);
                        }
                    }
                  />
            </Grid.Cell>

            <Grid.Cell columnSpan={{ xs: 3, sm: 3, md: 2, lg: 4, xl: 4 }}>
                  <TextColorField
                    label="Clone button Text color"
                    color={formData.colors.objectsOptions.clone.textColor}
                    setColor={(value: any) => {
                          formData.colors.objectsOptions.clone.textColor = value;
                          handleColorChange(formData.colors);
                        }
                    }
                  />
            </Grid.Cell>
            <Grid.Cell columnSpan={{ xs: 3, sm: 3, md: 2, lg: 4, xl: 4 }}>
                  <TextColorField
                    label="Hover Clone button text color"
                    color={formData.colors.objectsOptions.clone.hoverTextColor}
                    setColor={(value: any) => {
                          formData.colors.objectsOptions.clone.hoverTextColor = value;
                          handleColorChange(formData.colors);
                        }
                    }
                  />
            </Grid.Cell>


            <Grid.Cell columnSpan={{ xs: 3, sm: 3, md: 2, lg: 4, xl: 4 }}>
                  <TextColorField
                    label="Delete button color"
                    color={formData.colors.objectsOptions.delete.buttonColor}
                    setColor={(value: any) => {
                          formData.colors.objectsOptions.delete.buttonColor = value;
                          handleColorChange(formData.colors);
                        }
                    }
                  />
            </Grid.Cell>
            <Grid.Cell columnSpan={{ xs: 3, sm: 3, md: 2, lg: 4, xl: 4 }}>
                  <TextColorField
                    label="Hover Delete button color"
                    color={formData.colors.objectsOptions.delete.hoverButtonColor}
                    setColor={(value: any) => {
                          formData.colors.objectsOptions.delete.hoverButtonColor = value;
                          handleColorChange(formData.colors);
                        }
                    }
                  />
            </Grid.Cell>

            <Grid.Cell columnSpan={{ xs: 3, sm: 3, md: 2, lg: 4, xl: 4 }}>
                  <TextColorField
                    label="Delete button Text color"
                    color={formData.colors.objectsOptions.delete.textColor}
                    setColor={(value: any) => {
                          formData.colors.objectsOptions.delete.textColor = value;
                          handleColorChange(formData.colors);
                        }
                    }
                  />
            </Grid.Cell>
            <Grid.Cell columnSpan={{ xs: 3, sm: 3, md: 2, lg: 4, xl: 4 }}>
                  <TextColorField
                    label="Hover Delete button text color"
                    color={formData.colors.objectsOptions.delete.hoverTextColor}
                    setColor={(value: any) => {
                          formData.colors.objectsOptions.delete.hoverTextColor = value;
                          handleColorChange(formData.colors);
                        }
                    }
                  />
            </Grid.Cell>




            <Grid.Cell columnSpan={{ xs: 3, sm: 3, md: 2, lg: 4, xl: 4 }}>
                  <TextColorField
                    label="Center button color"
                    color={formData.colors.objectsOptions.center.buttonColor}
                    setColor={(value: any) => {
                          formData.colors.objectsOptions.center.buttonColor = value;
                          handleColorChange(formData.colors);
                        }
                    }
                  />
            </Grid.Cell>
            <Grid.Cell columnSpan={{ xs: 3, sm: 3, md: 2, lg: 4, xl: 4 }}>
                  <TextColorField
                    label="Hover Center button color"
                    color={formData.colors.objectsOptions.center.hoverButtonColor}
                    setColor={(value: any) => {
                          formData.colors.objectsOptions.center.hoverButtonColor = value;
                          handleColorChange(formData.colors);
                        }
                    }
                  />
            </Grid.Cell>

            <Grid.Cell columnSpan={{ xs: 3, sm: 3, md: 2, lg: 4, xl: 4 }}>
                  <TextColorField
                    label="Center button Text color"
                    color={formData.colors.objectsOptions.center.textColor}
                    setColor={(value: any) => {
                          formData.colors.objectsOptions.center.textColor = value;
                          handleColorChange(formData.colors);
                        }
                    }
                  />
            </Grid.Cell>
            <Grid.Cell columnSpan={{ xs: 3, sm: 3, md: 2, lg: 4, xl: 4 }}>
                  <TextColorField
                    label="Hover Center button text color"
                    color={formData.colors.objectsOptions.center.hoverTextColor}
                    setColor={(value: any) => {
                          formData.colors.objectsOptions.center.hoverTextColor = value;
                          handleColorChange(formData.colors);
                        }
                    }
                  />
            </Grid.Cell>
            </Grid>
        </ColorItem>





        <ColorItem onToggle={() => setExpanded({ ...expanded, recaps: !expanded.recaps })} title="Recaps section" open={expanded.recaps}>
              <Grid gap={{ lg: "20px" }}>
                <Grid.Cell columnSpan={{ xs: 3, sm: 3, md: 2, lg: 3, xl: 3 }}>
                  <TextColorField
                    label="Background color"
                    color={formData.colors.recaps.backgroundColor}
                    setColor={(value: any) => {
                          formData.colors.recaps.backgroundColor = value;
                          handleColorChange(formData.colors);
                        }
                    }
                  />
            </Grid.Cell>
         
                <Grid.Cell columnSpan={{ xs: 3, sm: 3, md: 2, lg: 3, xl: 3 }}>
                  <TextColorField
                    label="Header background color"
                    color={formData.colors.recaps.headerBackgroundColor}
                    setColor={(value: any) => {
                          formData.colors.recaps.headerBackgroundColor = value;
                          handleColorChange(formData.colors);
                        }
                    }
                  />
            </Grid.Cell>
            <Grid.Cell columnSpan={{ xs: 3, sm: 3, md: 2, lg: 3, xl: 3 }}>
                  <TextColorField
                    label="Header text color"
                    color={formData.colors.recaps.headerTextColor}
                    setColor={(value: any) => {
                          formData.colors.recaps.headerTextColor = value;
                          handleColorChange(formData.colors);
                        }
                    }
                  />
            </Grid.Cell>
            <Grid.Cell columnSpan={{ xs: 3, sm: 3, md: 2, lg: 3, xl: 3 }}>
                  <TextColorField
                    label="Recaps option hover background color"
                    color={formData.colors.recaps.optionHoverBackgroundColor}
                    setColor={(value: any) => {
                          formData.colors.recaps.optionHoverBackgroundColor = value;
                          handleColorChange(formData.colors);
                        }
                    }
                  />
            </Grid.Cell>
            <Grid.Cell columnSpan={{ xs: 3, sm: 3, md: 2, lg: 3, xl: 3 }}>
                  <TextColorField
                    label="Recaps option hover text color"
                    color={formData.colors.recaps.optionHoverTextColor}
                    setColor={(value: any) => {
                          formData.colors.recaps.optionHoverTextColor = value;
                          handleColorChange(formData.colors);
                        }
                    }
                  />
            </Grid.Cell>
            <Grid.Cell columnSpan={{ xs: 3, sm: 3, md: 2, lg: 3, xl: 3 }}>
                  <TextColorField
                    label="Recaps option  text color"
                    color={formData.colors.recaps.optionTextColor}
                    setColor={(value: any) => {
                          formData.colors.recaps.optionTextColor = value;
                          handleColorChange(formData.colors);
                        }
                    }
                  />
            </Grid.Cell>
            <Grid.Cell columnSpan={{ xs: 3, sm: 3, md: 2, lg: 3, xl: 3 }}>
                  <TextColorField
                    label="Recaps option  border color"
                    color={formData.colors.recaps.optionBorderColor}
                    setColor={(value: any) => {
                          formData.colors.recaps.optionBorderColor = value;
                          handleColorChange(formData.colors);
                        }
                    }
                  />
            </Grid.Cell>
            <Grid.Cell columnSpan={{ xs: 3, sm: 3, md: 2, lg: 3, xl: 3 }}>
                  <TextColorField
                    label="Recaps option  border hover color"
                    color={formData.colors.recaps.optionHoverBorderColor}
                    setColor={(value: any) => {
                          formData.colors.recaps.optionHoverBorderColor = value;
                          handleColorChange(formData.colors);
                        }
                    }
                  />
            </Grid.Cell>

            <Grid.Cell columnSpan={{ xs: 3, sm: 3, md: 2, lg: 3, xl: 3 }}>
                  <TextColorField
                    label="Button  Finish background color"
                    color={formData.colors.recaps.buttonFinishBackgroundColor}
                    setColor={(value: any) => {
                          formData.colors.recaps.buttonFinishBackgroundColor = value;
                          handleColorChange(formData.colors);
                        }
                    }
                  />
            </Grid.Cell>
            <Grid.Cell columnSpan={{ xs: 3, sm: 3, md: 2, lg: 3, xl: 3 }}>
                  <TextColorField
                    label="Button  Finish hover background color"
                    color={formData.colors.recaps.buttonFinishHoverBackgroundColor}
                    setColor={(value: any) => {
                          formData.colors.recaps.buttonFinishHoverBackgroundColor = value;
                          handleColorChange(formData.colors);
                        }
                    }
                  />
            </Grid.Cell>

            <Grid.Cell columnSpan={{ xs: 3, sm: 3, md: 2, lg: 3, xl: 3 }}>
                  <TextColorField
                    label="Button  Finish text color"
                    color={formData.colors.recaps.buttonFinishTextColor}
                    setColor={(value: any) => {
                          formData.colors.recaps.buttonFinishTextColor = value;
                          handleColorChange(formData.colors);
                        }
                    }
                  />
            </Grid.Cell>
            <Grid.Cell columnSpan={{ xs: 3, sm: 3, md: 2, lg: 3, xl: 3 }}>
                  <TextColorField
                    label="Button  Finish  text hover color"
                    color={formData.colors.recaps.buttonFinishHoverTextColor}
                    setColor={(value: any) => {
                          formData.colors.recaps.buttonFinishHoverTextColor = value;
                          handleColorChange(formData.colors);
                        }
                    }
                  />
            </Grid.Cell>






            <Grid.Cell columnSpan={{ xs: 3, sm: 3, md: 2, lg: 3, xl: 3 }}>
                  <TextColorField
                    label="Button  AddToCart background color"
                    color={formData.colors.recaps.buttonAddToCartBackgroundColor}
                    setColor={(value: any) => {
                          formData.colors.recaps.buttonAddToCartBackgroundColor = value;
                          handleColorChange(formData.colors);
                        }
                    }
                  />
            </Grid.Cell>
            <Grid.Cell columnSpan={{ xs: 3, sm: 3, md: 2, lg: 3, xl: 3 }}>
                  <TextColorField
                    label="Button  AddToCart hover background color"
                    color={formData.colors.recaps.buttonAddToCartHoverBackgroundColor}
                    setColor={(value: any) => {
                          formData.colors.recaps.buttonAddToCartHoverBackgroundColor = value;
                          handleColorChange(formData.colors);
                        }
                    }
                  />
            </Grid.Cell>

            <Grid.Cell columnSpan={{ xs: 3, sm: 3, md: 2, lg: 3, xl: 3 }}>
                  <TextColorField
                    label="Button  AddToCart text color"
                    color={formData.colors.recaps.buttonAddToCartTextColor}
                    setColor={(value: any) => {
                          formData.colors.recaps.buttonAddToCartTextColor = value;
                          handleColorChange(formData.colors);
                        }
                    }
                  />
            </Grid.Cell>
            <Grid.Cell columnSpan={{ xs: 3, sm: 3, md: 2, lg: 3, xl: 3 }}>
                  <TextColorField
                    label="Button  AddToCart  text hover color"
                    color={formData.colors.recaps.buttonAddToCartHoverTextColor}
                    setColor={(value: any) => {
                          formData.colors.recaps.buttonAddToCartHoverTextColor = value;
                          handleColorChange(formData.colors);
                        }
                    }
                  />
            </Grid.Cell>






            <Grid.Cell columnSpan={{ xs: 3, sm: 3, md: 2, lg: 3, xl: 3 }}>
                  <TextColorField
                    label="Button  Edit background color"
                    color={formData.colors.recaps.buttonEditBackgroundColor}
                    setColor={(value: any) => {
                          formData.colors.recaps.buttonEditBackgroundColor = value;
                          handleColorChange(formData.colors);
                        }
                    }
                  />
            </Grid.Cell>
            <Grid.Cell columnSpan={{ xs: 3, sm: 3, md: 2, lg: 3, xl: 3 }}>
                  <TextColorField
                    label="Button  Edit hover background color"
                    color={formData.colors.recaps.buttonEditHoverBackgroundColor}
                    setColor={(value: any) => {
                          formData.colors.recaps.buttonEditHoverBackgroundColor = value;
                          handleColorChange(formData.colors);
                        }
                    }
                  />
            </Grid.Cell>

            <Grid.Cell columnSpan={{ xs: 3, sm: 3, md: 2, lg: 3, xl: 3 }}>
                  <TextColorField
                    label="Button  Edit text color"
                    color={formData.colors.recaps.buttonEditTextColor}
                    setColor={(value: any) => {
                          formData.colors.recaps.buttonEditTextColor = value;
                          handleColorChange(formData.colors);
                        }
                    }
                  />
            </Grid.Cell>
            <Grid.Cell columnSpan={{ xs: 3, sm: 3, md: 2, lg: 3, xl: 3 }}>
                  <TextColorField
                    label="Button  Edit  text hover color"
                    color={formData.colors.recaps.buttonEditHoverTextColor}
                    setColor={(value: any) => {
                          formData.colors.recaps.buttonEditHoverTextColor = value;
                          handleColorChange(formData.colors);
                        }
                    }
                  />
            </Grid.Cell>
           
           
            </Grid>
        </ColorItem>


      
        </BlockStack>

        

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

export const AppearanceItem = ({
  imgSrc,
  title,
  active,
  onChange,
}: {
  imgSrc: string;
  title?: string;
  active: boolean;
  onChange: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <SpacingBackground border="1px  solid #E8E8E8" borderRadius="5px">
      <div
        onClick={() => {
          onChange(!active);
        }}
        style={{ position: "relative" }}
      >
        <img
          src={imgSrc}
          alt={title}
          style={{ width: "100%", height: "auto" }}
        />
        <div style={{ position: "absolute", bottom: "0", width: "100%" }}>
          <SpacingBackground
            backgroundColor="white !important"
            margin="0 0 0 0"
            borderRadius="0 0 10px 10px"
          >
            <Box background="bg-surface" paddingInline="300" paddingBlock="200">
              <InlineStack align="space-between">
                <Text as="span" variant="bodyMd" fontWeight="bold">
                  {title || "Default skyn"}
                </Text>
                <InlineStack gap="200">
                  <Text as="span" tone="success">
                    Select
                  </Text>
                  <CheckSpan checked={active} />
                </InlineStack>
              </InlineStack>
            </Box>
          </SpacingBackground>
        </div>
      </div>
    </SpacingBackground>
  );
};

const ColorItem = ({ title, onToggle, open, children }: {
  title: string;
  onToggle:Function;
  open: boolean;
  children?: React.ReactNode
}) => {
  const  id =  useId();
  
  return (
    <SpacingBackground border="1px solid #F8F9FB" margin="3px 0 0 0">
    <BoxBackground>
    <Box paddingInline="300" paddingBlock="300">
      <InlineStack align="space-between">
        <Text as="strong" fontWeight="bold" variant="bodyLg">
        {title}
        </Text>
        <Button
          textAlign="left"
          disclosure={open ? "up" : "down"}
          onClick={() => onToggle()}
          ariaExpanded={open}
          ariaControls={`${id}`}
        >
          {open ? "Show less" : "Show more"}
        </Button>
      </InlineStack>
      <Collapsible
        open={open}
        id={`${id}`}
        transition={{ duration: "500ms", timingFunction: "ease-in-out" }}
        expandOnPrint
      >
       {children}
      </Collapsible>
    </Box>
      </BoxBackground>
  </SpacingBackground>
  );
}
