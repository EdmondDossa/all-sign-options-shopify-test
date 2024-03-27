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
import {
  Form,
  NavLink,
  redirect,
  useActionData,
  useLoaderData,
  useNavigate,
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
import { jsonTransform } from "~/utils/transfomerZod";

const settingParams: [string, string] = ["themes", ""];

const formSchema = z.object({
  skin: z.string(),
  colors: z
    .any()
    .transform(jsonTransform)
    .pipe(
      z.object({
        textColorContentHeader: z.string().nullish(),
        backgroundColorHeader: z.string().nullish(),
        textColorContentSideMenu: z.string().nullish(),
        backgroundColorHeaderContentSide: z.string().nullish(),
        textColorOptionsMenu: z.string().nullish(),
        backgroundColorOptionsMenu: z.string().nullish(),
        textColorButtonSave: z.string().nullish(),
        backgroundColorTextButtonSave: z.string().nullish(),
        textColorHoverButtonSave: z.string().nullish(),
        backgroundColorHoverButtonSave: z.string().nullish(),
        textColorButton: z.string().nullish(),
        backgroundButton: z.string().nullish(),
        textColorHoverButton: z.string().nullish(),
        backgroundColorHoverButton: z.string().nullish(),
        textColorButtonHelp: z.string().nullish(),
        backgroundColorButtonHelp: z.string().nullish(),
        textColorHoverButtonHelp: z.string().nullish(),
        backgroundColorHoverButtonHelp: z.string().nullish(),
        textColorHoverButtonRestartAll: z.string().nullish(),
        backgroundColorHoverButtonRestartAll: z.string().nullish(),
        textColorButtonRestartAll: z.string().nullish(),
        backgroundColorButtonRestartAll: z.string().nullish(),
      })
    )
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
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  let isSubmitting = navigation.state == "submitting";
  const [formData, setFormData] = useState<any>(
    settingData || {
      skin: "default",
      colors: {
        textColorContentHeader: "#000000",
        backgroundColorHeader: "#000000",
        textColorContentSideMenu: "#000000",
        backgroundColorHeaderContentSide: "#000000",
        textColorOptionsMenu: "#000000",
        backgroundColorOptionsMenu: "#000000",
        textColorButtonSave: "#000000",
        backgroundColorTextButtonSave: "#000000",
        textColorHoverButtonSave: "#000000",
        backgroundColorHoverButtonSave: "#000000",
        textColorButton: "#000000",
        backgroundButton: "#000000",
        textColorHoverButton: "#000000",
        backgroundColorHoverButton: "#000000",
        textColorButtonHelp: "#000000",
        backgroundColorButtonHelp: "#000000",
        textColorHoverButtonHelp: "#000000",
        backgroundColorHoverButtonHelp: "#000000",
        textColorHoverButtonRestartAll: "#000000",
        backgroundColorHoverButtonRestartAll: "#000000",
        textColorButtonRestartAll: "#000000",
        backgroundColorButtonRestartAll: "#000000",
      }
    }
  );

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

  const handleColorChange = (inputName: string, value: any) => {
    setFormData((prevData: any) => {
      prevData["colors"][inputName] = value;
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

        <SpacingBackground border="1px solid #DDDDDD" margin="3px 0 0 0">
          <BoxBackground>
            <Box paddingInline="300" paddingBlock="1000">
              <Grid gap={{ lg: "20px" }}>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
                  <Text as="strong" fontWeight="bold" variant="bodyLg">
                    Content Header
                  </Text>
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
                  <TextColorField
                    label="Text color"
                    color={formData.colors.textColorContentHeader}
                    setColor={(value: any) =>
                      handleColorChange("textColorContentHeader", value)
                    }
                  />
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
                  <TextColorField
                    label="Background header"
                    color={formData.colors.backgroundColorHeader}
                    setColor={(value: any) =>
                      handleColorChange("backgroundColorHeader", value)
                    }
                  />
                </Grid.Cell>
              </Grid>
            </Box>
          </BoxBackground>
        </SpacingBackground>

        <SpacingBackground border="1px solid #DDDDDD" margin="3px 0 0 0">
          <BoxBackground>
            <Box paddingInline="300" paddingBlock="1000">
              <Grid gap={{ lg: "20px" }}>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
                  <Text as="strong" fontWeight="bold" variant="bodyLg">
                    Content Side menu
                  </Text>
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
                  <TextColorField
                    label="Text options  color"
                    color={formData.colors.textColorContentSideMenu}
                    setColor={(value: any) =>
                      handleColorChange("textColorContentSideMenu", value)
                    }
                  />
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
                  <TextColorField
                    label="Background  options"
                    color={formData.colors.backgroundColorHeaderContentSide}
                    setColor={(value: any) =>
                      handleColorChange(
                        "backgroundColorHeaderContentSide",
                        value,
                      )
                    }
                  />
                </Grid.Cell>
              </Grid>
            </Box>
          </BoxBackground>
        </SpacingBackground>
        <SpacingBackground border="1px solid #DDDDDD" margin="3px 0 0 0">
          <BoxBackground>
            <Box paddingInline="300" paddingBlock="1000">
              <Grid gap={{ lg: "20px" }}>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
                  <Text as="strong" fontWeight="bold" variant="bodyLg">
                    Menu
                  </Text>
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
                  <TextColorField
                    label="color Text options "
                    color={formData.colors.textColorOptionsMenu}
                    setColor={(value: any) =>
                      handleColorChange("textColorOptionsMenu", value)
                    }
                  />
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
                  <TextColorField
                    label="Background  options"
                    color={formData.colors.backgroundColorOptionsMenu}
                    setColor={(value: any) =>
                      handleColorChange("backgroundColorOptionsMenu", value)
                    }
                  />
                </Grid.Cell>
              </Grid>
            </Box>
          </BoxBackground>
        </SpacingBackground>
        <SpacingBackground border="1px solid #DDDDDD" margin="3px 0 0 0">
          <BoxBackground>
            <Box paddingInline="300" paddingBlock="1000">
              <Grid gap={{ lg: "20px" }}>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 6, xl: 6 }}>
                  <TextColorField
                    label="Color text Button Save"
                    color={formData.colors.textColorButtonSave}
                    setColor={(value: any) =>
                      handleColorChange("textColorButtonSave", value)
                    }
                  />
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 6, xl: 6 }}>
                  <TextColorField
                    label="Background color text Button Save"
                    color={formData.colors.backgroundColorTextButtonSave}
                    setColor={(value: any) =>
                      handleColorChange("textColorContentHeader", value)
                    }
                  />
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 6, xl: 6 }}>
                  <TextColorField
                    label="Color text Hover Button Save"
                    color={formData.colors.textColorHoverButtonSave}
                    setColor={(value: any) =>
                      handleColorChange("textColorHoverButtonSave", value)
                    }
                  />
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 6, xl: 6 }}>
                  <TextColorField
                    label="Background color hover Button Save"
                    color={formData.colors.backgroundColorHoverButtonSave}
                    setColor={(value: any) =>
                      handleColorChange("backgroundColorHoverButtonSave", value)
                    }
                  />
                </Grid.Cell>
              </Grid>
            </Box>
          </BoxBackground>
        </SpacingBackground>

        <SpacingBackground border="1px solid #DDDDDD" margin="3px 0 0 0">
          <BoxBackground>
            <Box paddingInline="300" paddingBlock="1000">
              <Grid gap={{ lg: "20px" }}>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 12, xl: 12 }}>
                  <Text as="strong" fontWeight="bold" variant="bodyLg">
                    Buttons
                  </Text>
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 6, xl: 6 }}>
                  <TextColorField
                    label="Color Text Button "
                    color={formData.colors.textColorButton}
                    setColor={(value: any) =>
                      handleColorChange("textColorButton", value)
                    }
                  />
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 6, xl: 6 }}>
                  <TextColorField
                    label="Background  Buttom"
                    color={formData.colors.backgroundButton}
                    setColor={(value: any) =>
                      handleColorChange("backgroundButton", value)
                    }
                  />
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 6, xl: 6 }}>
                  <TextColorField
                    label="color text Hover Button "
                    color={formData.colors.textColorHoverButton}
                    setColor={(value: any) =>
                      handleColorChange("textColorHoverButton", value)
                    }
                  />
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 6, xl: 6 }}>
                  <TextColorField
                    label="Background  color hover Button"
                    color={formData.colors.backgroundColorHoverButton}
                    setColor={(value: any) =>
                      handleColorChange("backgroundColorHoverButton", value)
                    }
                  />
                </Grid.Cell>
              </Grid>
            </Box>
          </BoxBackground>
        </SpacingBackground>

        <SpacingBackground border="1px solid #DDDDDD" margin="3px 0 0 0">
          <BoxBackground>
            <Box paddingInline="300" paddingBlock="1000">
              <Grid gap={{ lg: "20px" }}>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 6, xl: 6 }}>
                  <TextColorField
                    label="Color Text Button Help"
                    color={formData.colors.textColorButtonHelp}
                    setColor={(value: any) =>
                      handleColorChange("textColorButtonHelp", value)
                    }
                  />
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 6, xl: 6 }}>
                  <TextColorField
                    label="Background  Button Help"
                    color={formData.colors.backgroundColorButtonHelp}
                    setColor={(value: any) =>
                      handleColorChange("backgroundColorButtonHelp", value)
                    }
                  />
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 6, xl: 6 }}>
                  <TextColorField
                    label="color   text hover  Button Help "
                    color={formData.colors.textColorHoverButtonHelp}
                    setColor={(value: any) =>
                      handleColorChange("textColorHoverButtonHelp", value)
                    }
                  />
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 6, xl: 6 }}>
                  <TextColorField
                    label="Background  color hover  Button Help"
                    color={formData.colors.backgroundColorHoverButtonHelp}
                    setColor={(value: any) =>
                      handleColorChange("backgroundColorHoverButtonHelp", value)
                    }
                  />
                </Grid.Cell>
              </Grid>
            </Box>
          </BoxBackground>
        </SpacingBackground>

        <SpacingBackground border="1px solid #DDDDDD" margin="3px 0 0 0">
          <BoxBackground>
            <Box paddingInline="300" paddingBlock="1000">
              <Grid gap={{ lg: "20px" }}>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 6, xl: 6 }}>
                  <TextColorField
                    label="Color Text Button Restart All"
                    color={formData.colors.textColorButtonRestartAll}
                    setColor={(value: any) =>
                      handleColorChange("textColorButtonRestartAll", value)
                    }
                  />
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 6, xl: 6 }}>
                  <TextColorField
                    label="Background  Button  Restart All"
                    color={formData.colors.backgroundColorButtonRestartAll}
                    setColor={(value: any) =>
                      handleColorChange(
                        "backgroundColorButtonRestartAll",
                        value,
                      )
                    }
                  />
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 6, xl: 6 }}>
                  <TextColorField
                    label="color   text hover  Button  Restart All "
                    color={formData.colors.textColorHoverButtonRestartAll}
                    setColor={(value: any) =>
                      handleColorChange("textColorHoverButtonRestartAll", value)
                    }
                  />
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 6, xl: 6 }}>
                  <TextColorField
                    label="Background  color hover  Button  Restart All"
                    color={formData.colors.backgroundColorHoverButtonRestartAll}
                    setColor={(value: any) =>
                      handleColorChange(
                        "backgroundColorHoverButtonRestartAll",
                        value,
                      )
                    }
                  />
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
