import { Box, Grid, InlineStack, Text } from "@shopify/polaris";
import { useState } from "react";
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
import { stringTransform } from "~/utils/transfomerZod";
import { z } from "zod";
import useHandleFlashMessage from "~/hooks/useHandleFlashMessage";
import { FileInput } from "~/components/inputs/FileInput";
import { getError } from "~/utils/error-getting";
import { BiSaveBtn } from "~/components/buttons/BiSaveBtn";

const settingParams: [string, string] = ["languageImages", "images"];
const formSchema = z.object({
  resetAllIcon: z.string().nullish().transform(stringTransform),
  undoIcon: z.string().nullish().transform(stringTransform),
  redoIcon: z.string().nullish().transform(stringTransform),
  cancelAnAction: z.string().nullish().transform(stringTransform),
  changeIconHelp: z.string().nullish().transform(stringTransform),
  changeIconPreview: z.string().nullish().transform(stringTransform),
  changeIconImport: z.string().nullish().transform(stringTransform),
  changeIconShare: z.string().nullish().transform(stringTransform),
  changeIconSaveProject: z.string().nullish().transform(stringTransform),
  changeIconShareSideBar: z.string().nullish().transform(stringTransform),
  changeIconMaterial: z.string().nullish().transform(stringTransform),
  changeIconShape: z.string().nullish().transform(stringTransform),
  changeIconFixingMethod: z.string().nullish().transform(stringTransform),
  changeIconProduct: z.string().nullish().transform(stringTransform),
  changeIconSize: z.string().nullish().transform(stringTransform),
  changeIconText: z.string().nullish().transform(stringTransform),
  changeIconColor: z.string().nullish().transform(stringTransform),
  changeIconDownload: z.string().nullish().transform(stringTransform),
  changeIconBorder: z.string().nullish().transform(stringTransform),
  changeIconImage: z.string().nullish().transform(stringTransform),
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
  const [formData, setFormData] = useState<any>(
    settingData?.changeIconDownload? settingData:  {
      resetAllIcon: "",
      undoIcon: "",
      redoIcon: "",
      changeIconPreview: "",
      changeIconHelp: "",
      changeIconImport: "",
      changeIconShare: "",
      changeIconSaveProject: "",
      changeIconMaterial: "",
      changeIconShape: "",
      changeIconFixingMethod: "",
      changeIconProduct: "",
      changeIconSize: "",
      changeIconText: "",
      changeIconColor: "",
      changeIconDownload: "",
      changeIconBorder: "",
      changeIconImage: "",
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

    const data = { ...formData };

    submit(data, { method: "POST" });
  };

  return (
    <>
      <Form onSubmit={handleFormSubmit} method="POST">
        <SpacingBackground border="1px solid #DDDDDD" margin="4px 0px">
          <BoxBackground>
            <Box paddingInline="300" paddingBlock="1000">
              <Grid gap={{ lg: "20px" }}>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
                  <Text as="strong" fontWeight="bold" variant="bodyLg">
                    Custom design link
                  </Text>
                </Grid.Cell>

                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 4, xl: 4 }}>
                  <FileInput
                    error={getError(actionData, "resetAllIcon")}
                    title="Reset All"
                    buttonTitle="Upload icon"
                    path={formData.resetAllIcon}
                    handlePath={(value: any) =>
                      handleInputChange("resetAllIcon", value)
                    }
                  />
                </Grid.Cell>
               
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 4, xl: 4 }}>
                  <FileInput
                    error={getError(actionData, "undoIcon")}
                    title="Change Undo icon"
                    buttonTitle="Upload icon"
                    path={formData.undoIcon}
                    handlePath={(value: any) =>
                      handleInputChange("undoIcon", value)
                    }
                  />
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 4, xl: 4 }}>
                  <FileInput
                    error={getError(actionData, "redoIcon")}
                    title=" Change Redo icon"
                    buttonTitle="Upload icon"
                    path={formData.redoIcon}
                    handlePath={(value: any) =>
                      handleInputChange("redoIcon", value)
                    }
                  />
                </Grid.Cell>
              </Grid>
            </Box>
          </BoxBackground>
        </SpacingBackground>
        <SpacingBackground border="1px solid #DDDDDD" margin="4px 0px">
          <BoxBackground>
            <Box paddingInline="300" paddingBlock="1000">
              <Grid gap={{ lg: "25px" }}>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
                  <Text as="strong" fontWeight="bold" variant="bodyLg">
                    Side bar
                  </Text>
                </Grid.Cell>

                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 4, xl: 4 }}>
                  <FileInput
                    error={getError(actionData, "changeIconPreview")}
                    title="Change Icon  preview"
                    buttonTitle="Upload icon"
                    path={formData.changeIconPreview}
                    handlePath={(value: any) =>
                      handleInputChange("changeIconPreview", value)
                    }
                  />
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 4, xl: 4 }}>
                  <FileInput
                    error={getError(actionData, "changeIconHelp")}
                    title="Change help icon"
                    buttonTitle="Upload icon"
                    path={formData.changeIconHelp}
                    handlePath={(value: any) =>
                      handleInputChange("changeIconHelp", value)
                    }
                  />
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 4, xl: 4 }}>
                  <FileInput
                    error={getError(actionData, "changeIconImport")}
                    title="Change Icon  Import"
                    buttonTitle="Upload icon"
                    path={formData.changeIconImport}
                    handlePath={(value: any) =>
                      handleInputChange("changeIconImport", value)
                    }
                  />
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 4, xl: 4 }}>
                  <FileInput
                    error={getError(actionData, "changeIconShare")}
                    title="Change  Icon  share"
                    buttonTitle="Upload icon"
                    path={formData.changeIconShare}
                    handlePath={(value: any) =>
                      handleInputChange("changeIconShare", value)
                    }
                  />
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 4, xl: 4 }}>
                  <FileInput
                    error={getError(actionData, "changeIconSaveProject")}
                    title="Change  Icon  save project"
                    buttonTitle="Upload icon"
                    path={formData.changeIconSaveProject}
                    handlePath={(value: any) =>
                      handleInputChange("changeIconSaveProject", value)
                    }
                  />
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 4, xl: 4 }}>
                  <FileInput
                    error={getError(actionData, "changeIconShareSideBar")}
                    title="Change Icon Share Side bar"
                    buttonTitle="Upload icon"
                    path={formData.changeIconShareSideBar}
                    handlePath={(value: any) =>
                      handleInputChange("changeIconShareSideBar", value)
                    }
                  />
                </Grid.Cell>
              </Grid>
            </Box>
          </BoxBackground>
        </SpacingBackground>

        <SpacingBackground border="1px solid #DDDDDD" margin="4px 0px">
          <BoxBackground>
            <Box paddingInline="300" paddingBlock="1000">
              <Grid gap={{ lg: "25px" }}>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
                  <Text as="strong" fontWeight="bold" variant="bodyLg">
                    Menu
                  </Text>
                </Grid.Cell>

                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 4, xl: 4 }}>
                  <FileInput
                    error={getError(actionData, "changeIconMaterial")}
                    title="Change  Icon Material"
                    buttonTitle="Upload icon"
                    path={formData.changeIconMaterial}
                    handlePath={(value: any) =>
                      handleInputChange("changeIconMaterial", value)
                    }
                  />
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 4, xl: 4 }}>
                  <FileInput
                    error={getError(actionData, "changeIconShape")}
                    title="Change Icon shape"
                    buttonTitle="Upload icon"
                    path={formData.changeIconShape}
                    handlePath={(value: any) =>
                      handleInputChange("changeIconShape", value)
                    }
                  />
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 4, xl: 4 }}>
                  <FileInput
                    error={getError(actionData, "changeIconFixingMethod")}
                    title="Change  Icon  fixing method"
                    buttonTitle="Upload icon"
                    path={formData.changeIconFixingMethod}
                    handlePath={(value: any) =>
                      handleInputChange("changeIconFixingMethod", value)
                    }
                  />
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 4, xl: 4 }}>
                  <FileInput
                    error={getError(actionData, "changeIconProduct")}
                    title="Change  Icon  Product"
                    buttonTitle="Upload icon"
                    path={formData.changeIconProduct}
                    handlePath={(value: any) =>
                      handleInputChange("changeIconProduct", value)
                    }
                  />
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 4, xl: 4 }}>
                  <FileInput
                    error={getError(actionData, "changeIconDownload")}
                    title="Change download"
                    buttonTitle="Upload icon"
                    path={formData.changeIconDownload}
                    handlePath={(value: any) =>
                      handleInputChange("changeIconDownload", value)
                    }
                  />
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 4, xl: 4 }}>
                  <FileInput
                    error={getError(actionData, "changeIconText")}
                    title="Change Icon Text"
                    buttonTitle="Upload icon"
                    path={formData.changeIconText}
                    handlePath={(value: any) =>
                      handleInputChange("changeIconText", value)
                    }
                  />
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 4, xl: 4 }}>
                  <FileInput
                    error={getError(actionData, "changeIconColor")}
                    title="Change  Icon  color"
                    buttonTitle="Upload icon"
                    path={formData.changeIconColor}
                    handlePath={(value: any) =>
                      handleInputChange("changeIconColor", value)
                    }
                  />
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 4, xl: 4 }}>
                  <FileInput
                    error={getError(actionData, "changeIconSize")}
                    title="Change Icon size"
                    buttonTitle="Upload icon"
                    path={formData.changeIconSize}
                    handlePath={(value: any) =>
                      handleInputChange("changeIconSize", value)
                    }
                  />
                </Grid.Cell>

                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 4, xl: 4 }}>
                  <FileInput
                    error={getError(actionData, "changeIconBorder")}
                    title="Change Icon border"
                    buttonTitle="Upload icon"
                    path={formData.changeIconBorder}
                    handlePath={(value: any) =>
                      handleInputChange("changeIconBorder", value)
                    }
                  />
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 4, xl: 4 }}>
                  <FileInput
                    error={getError(actionData, "changeIconImage")}
                    title="Change Icon image"
                    buttonTitle="Upload icon"
                    path={formData.changeIconImage}
                    handlePath={(value: any) =>
                      handleInputChange("changeIconImage", value)
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
