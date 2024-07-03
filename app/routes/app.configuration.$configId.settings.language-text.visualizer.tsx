import { Box, Grid, InlineStack, Text, TextField } from "@shopify/polaris";
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
import { z } from "zod";
import useHandleFlashMessage from "~/hooks/useHandleFlashMessage";
import { getError } from "~/utils/error-getting";
import { BiSaveBtn } from "~/components/buttons/BiSaveBtn";
import { stringTransform } from "~/utils/transfomerZod";

const settingParams: [string, string] = ["languageImages", "visualizer"];
const formSchema = z.object({
  textCanvasCenterH:z.string().nullish().transform(stringTransform),
    textCanvasCenterV:z.string().nullish().transform(stringTransform),
    textCanvasDelete:z.string().nullish().transform(stringTransform),
    textCanvasEdit:z.string().nullish().transform(stringTransform),
    textCanvasClone:z.string().nullish().transform(stringTransform),
  textPosition:z.string().nullish().transform(stringTransform),
    textAngle:z.string().nullish().transform(stringTransform),
    textWidth:z.string().nullish().transform(stringTransform),
    textHeight:z.string().nullish().transform(stringTransform),
    textRight:z.string().nullish().transform(stringTransform),
    textLeft:z.string().nullish().transform(stringTransform),
    textTop:z.string().nullish().transform(stringTransform),
    textBottom:z.string().nullish().transform(stringTransform),
  titleHeader: z.string().nullish().transform(stringTransform),
  textButtonRefresh: z.string().nullish().transform(stringTransform),
  textButtonBack: z.string().nullish().transform(stringTransform),
  textButtonNext: z.string().nullish().transform(stringTransform),
  textButtonFinish: z.string().nullish().transform(stringTransform),
  textPreview: z.string().nullish().transform(stringTransform),
  textShare: z.string().nullish().transform(stringTransform),
  textImport: z.string().nullish().transform(stringTransform),
  textDownload: z.string().nullish().transform(stringTransform),
  textSave: z.string().nullish().transform(stringTransform),
  textHelp: z.string().nullish().transform(stringTransform),
  textMaterial: z.string().nullish().transform(stringTransform),
  textSize: z.string().nullish().transform(stringTransform),
  textShape: z.string().nullish().transform(stringTransform),
  textFixingMethods: z.string().nullish().transform(stringTransform),
  textColor: z.string().nullish().transform(stringTransform),
  textOptionText: z.string().nullish().transform(stringTransform),
  textBorder: z.string().nullish().transform(stringTransform),
  textProduct: z.string().nullish().transform(stringTransform),
  textImage: z.string().nullish().transform(stringTransform),
  customSize: z.string().nullish().transform(stringTransform),
  customSizeButtonDone: z.string().nullish().transform(stringTransform),
  thickness: z.string().nullish().transform(stringTransform),
  textBeforePrice: z.string().nullish().transform(stringTransform),
  textAfterPrice: z.string().nullish().transform(stringTransform),
  textAddToCart: z.string().nullish().transform(stringTransform),
      
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
    {
      textCanvasCenterH:"centerH",
    textCanvasCenterV:"centerV",
    textCanvasDelete:"delete",
    textCanvasEdit:"Edit",
    textCanvasClone:"Clone",
      textPosition: "Position",
      textAngle: "Angle",
      textWidth: "Width",
      textHeight: "Height",
      textRight: "Right",
      textLeft: "Left",
      textTop: "Top",
      textBottom: "Bottom",
      titleHeader: "Plastic Signs",
      textButtonRefresh: "Restart all",
      textButtonBack: "Undo",
      textButtonNext: "Redo",
      textBeforePrice: "",
      textAfterPrice: "TVA Include",
      textButtonFinish: "Finish",
      textAddToCart: "Add To Cart",
      textPreview: "Preview",
      textShare: "Share",
      textImport: "Import",
      textDownload: "Download",
      textSave: "Save",
      textHelp: "Help",
      textMaterial: "Material",
      textSize: "Size",
      textShape: "Shape",
      textFixingMethods: "Fixing Methods",
      textColor: "Color",
      textOptionText: "Text",
      textBorder: "Border",
      textProduct: "Product",
      textImage: "Image",
      customSize: "Custom Size",
      customSizeButtonDone: "Done",
      thickness: "Thickness",

      
      ...settingData || {}
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
        <SpacingBackground border="1px solid #DDDDDD" margin="3px 0 0 0">
          <BoxBackground>
            <Box paddingInline="300" paddingBlock="1000">
              <Grid gap={{ lg: "20px" }}>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
                  <Text as="strong" fontWeight="bold" variant="bodyLg">
                    Content Header
                  </Text>
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 6, xl: 6 }}>
                  <TextField
                    size="medium"
                    label="Title header"
                    value={formData.titleHeader}
                    onChange={(value) =>
                      handleInputChange("titleHeader", value)
                    }
                    error={getError(actionData, "titleHeader")}
                    autoComplete="on"
                  />
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 6, xl: 6 }}>
                  <TextField
                    size="medium"
                    label="Text  button refresh"
                    value={formData.textButtonRefresh}
                    onChange={(value) =>
                      handleInputChange("textButtonRefresh", value)
                    }
                    error={getError(actionData, "textButtonRefresh")}
                    autoComplete="on"
                  />
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 6, xl: 6 }}>
                  <TextField
                    size="medium"
                    label="Text  button back"
                    value={formData.textButtonBack}
                    onChange={(value) =>
                      handleInputChange("textButtonBack", value)
                    }
                    error={getError(actionData, "textButtonBack")}
                    autoComplete="on"
                  />
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 6, xl: 6 }}>
                  <TextField
                    size="medium"
                    label="Text button next"
                    value={formData.textButtonNext}
                    onChange={(value) =>
                      handleInputChange("textButtonNext", value)
                    }
                    error={getError(actionData, "textButtonNext")}
                    autoComplete="on"
                  />
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 6, xl: 6 }}>
                  <TextField
                    size="medium"
                    label="Text Before Price"
                    value={formData.textBeforePrice}
                    onChange={(value) =>
                      handleInputChange("textBeforePrice", value)
                    }
                    error={getError(actionData, "textBeforePrice")}
                    autoComplete="on"
                  />
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 6, xl: 6 }}>
                  <TextField
                    size="medium"
                    label="Text After Price"
                    value={formData.textAfterPrice}
                    onChange={(value) =>
                      handleInputChange("textAfterPrice", value)
                    }
                    error={getError(actionData, "textAfterPrice")}
                    autoComplete="on"
                  />
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 6, xl: 6 }}>
                  <TextField
                    size="medium"
                    label="Text button finish"
                    value={formData.textButtonFinish}
                    onChange={(value) =>
                      handleInputChange("textButtonFinish", value)
                    }
                    error={getError(actionData, "textButtonFinish")}
                    autoComplete="on"
                  />
                  
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 6, xl: 6 }}>
                  <TextField
                    size="medium"
                    label="Text button Add to cart"
                    value={formData.textAddToCart}
                    onChange={(value) =>
                      handleInputChange("textAddToCart", value)
                    }
                    error={getError(actionData, "textAddToCart")}
                    autoComplete="on"
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
                    Content Text
                  </Text>
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 6, xl: 6 }}>
                  <TextField
                    size="medium"
                    label="Text  width"
                    value={formData.textWidth}
                    onChange={(value) =>
                      handleInputChange("textWidth", value)
                    }
                    error={getError(actionData, "textWidth")}
                    autoComplete="on"
                  />
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 6, xl: 6 }}>
                  <TextField
                    size="medium"
                    label="Text  Height"
                    value={formData.textHeight}
                    onChange={(value) =>
                      handleInputChange("textHeight", value)
                    }
                    error={getError(actionData, "textHeight")}
                    autoComplete="on"
                  />
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 6, xl: 6 }}>
                  <TextField
                    size="medium"
                    label="Text  Position"
                    value={formData.textPosition}
                    onChange={(value) =>
                      handleInputChange("textPosition", value)
                    }
                    error={getError(actionData, "textPosition")}
                    autoComplete="on"
                  />
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 6, xl: 6 }}>
                  <TextField
                    size="medium"
                    label="Text Angle"
                    value={formData.textAngle}
                    onChange={(value) =>
                      handleInputChange("textAngle", value)
                    }
                    error={getError(actionData, "textAngle")}
                    autoComplete="on"
                  />
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 6, xl: 6 }}>
                  <TextField
                    size="medium"
                    label="Text Top"
                    value={formData.textTop}
                    onChange={(value) =>
                      handleInputChange("textTop", value)
                    }
                    error={getError(actionData, "textTop")}
                    autoComplete="on"
                  />
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 6, xl: 6 }}>
                  <TextField
                    size="medium"
                    label="Text bottom"
                    value={formData.textBottom}
                    onChange={(value) =>
                      handleInputChange("textBottom", value)
                    }
                    error={getError(actionData, "textBottom")}
                    autoComplete="on"

                  />
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 6, xl: 6 }}>
                  <TextField
                    size="medium"
                    label="Text left"
                    value={formData.textLeft}
                    onChange={(value) =>
                      handleInputChange("textLeft", value)
                    }
                    error={getError(actionData, "textLeft")}
                    autoComplete="on"
                  />
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 6, xl: 6 }}>
                  <TextField
                    size="medium"
                    label="Text Right"
                    value={formData.textRight}
                    onChange={(value) =>
                      handleInputChange("textRight", value)
                    }
                    error={getError(actionData, "textRight")}
                    autoComplete="on"
                    
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
                    Action on selected object in canvas
                  </Text>
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 6, xl: 6 }}>
                  <TextField
                    size="medium"
                    label="Canvas selected object edit button"
                    value={formData.textCanvasEdit}
                    onChange={(value) =>
                      handleInputChange("textCanvasEdit", value)
                    }
                    error={getError(actionData, "textCanvasEdit")}
                    autoComplete="on"
                  />
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 6, xl: 6 }}>
                  <TextField
                    size="medium"
                    label="Canvas selected object edit button"
                    value={formData.textCanvasDelete}
                    onChange={(value) =>
                      handleInputChange("textCanvasDelete", value)
                    }
                    error={getError(actionData, "textCanvasDelete")}
                    autoComplete="on"
                  />
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 6, xl: 6 }}>
                  <TextField
                    size="medium"
                    label="Canvas selected object centerH button"
                    value={formData.textCanvasCenterH}
                    onChange={(value) =>
                      handleInputChange("textCanvasCenterH", value)
                    }
                    error={getError(actionData, "textCanvasCenterH")}
                    autoComplete="on"
                  />
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 6, xl: 6 }}>
                  <TextField
                    size="medium"
                    label="Canvas selected object centerV button"
                    value={formData.textCanvasCenterV}
                    onChange={(value) =>
                      handleInputChange("textCanvasCenterV", value)
                    }
                    error={getError(actionData, "textCanvasCenterV")}
                    autoComplete="on"
                  />
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 6, xl: 6 }}>
                  <TextField
                    size="medium"
                    label="Canvas selected object clone button"
                    value={formData.textCanvasClone}
                    onChange={(value) =>
                      handleInputChange("textCanvasClone", value)
                    }
                    error={getError(actionData, "textCanvasClone")}
                    autoComplete="on"
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
                    Content Sidebar
                  </Text>
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 6, xl: 6 }}>
                  <TextField
                    size="medium"
                    label="Preview text"
                    value={formData.textPreview}
                    onChange={(value) =>
                      handleInputChange("textPreview", value)
                    }
                    error={getError(actionData, "textPreview")}
                    autoComplete="on"
                  />
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 6, xl: 6 }}>
                  <TextField
                    size="medium"
                    label="Share text"
                    value={formData.textShare}
                    onChange={(value) => handleInputChange("textShare", value)}
                    error={getError(actionData, "textShare")}
                    autoComplete="on"
                  />
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 6, xl: 6 }}>
                  <TextField
                    size="medium"
                    label="Import text"
                    value={formData.textImport}
                    onChange={(value) => handleInputChange("textImport", value)}
                    error={getError(actionData, "textImport")}
                    autoComplete="on"
                  />
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 6, xl: 6 }}>
                  <TextField
                    size="medium"
                    label="Download text"
                    value={formData.textDownload}
                    onChange={(value) =>
                      handleInputChange("textDownload", value)
                    }
                    error={getError(actionData, "textDownload")}
                    autoComplete="on"
                  />
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 6, xl: 6 }}>
                  <TextField
                    size="medium"
                    label="Save  text"
                    value={formData.textSave}
                    onChange={(value) => handleInputChange("textSave", value)}
                    error={getError(actionData, "textSave")}
                    autoComplete="on"
                  />
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 6, xl: 6 }}>
                  <TextField
                    size="medium"
                    label="Help text"
                    value={formData.textHelp}
                    onChange={(value) => handleInputChange("textHelp", value)}
                    error={getError(actionData, "textHelp")}
                    autoComplete="on"
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
                    Button Options
                  </Text>
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 6, xl: 6 }}>
                  <TextField
                    size="medium"
                    label="Text Material"
                    value={formData.textMaterial}
                    onChange={(value) =>
                      handleInputChange("textMaterial", value)
                    }
                    error={getError(actionData, "textMaterial")}
                    autoComplete="on"
                  />
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 6, xl: 6 }}>
                  <TextField
                    size="medium"
                    label="Text Size"
                    value={formData.textSize}
                    onChange={(value) => handleInputChange("textSize", value)}
                    error={getError(actionData, "textSize")}
                    autoComplete="on"
                  />
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 6, xl: 6 }}>
                  <TextField
                    size="medium"
                    label="Text Custom Size"
                    value={formData.customSize}
                    onChange={(value) => handleInputChange("customSize", value)}
                    error={getError(actionData, "customSize")}
                    autoComplete="on"
                  />
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 6, xl: 6 }}>
                  <TextField
                    size="medium"
                    label="Text Custom Size Button Done"
                    value={formData.customSizeButtonDone}
                    onChange={(value) =>
                      handleInputChange("customSizeButtonDone", value)
                    }
                    error={getError(actionData, "customSizeButtonDone")}
                    autoComplete="on"
                  />
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 6, xl: 6 }}>
                  <TextField
                    size="medium"
                    label="Text Thickness"
                    value={formData.thickness}
                    onChange={(value) => handleInputChange("thickness", value)}
                    error={getError(actionData, "thickness")}
                    autoComplete="on"
                  />
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 6, xl: 6 }}>
                  <TextField
                    size="medium"
                    label="Text  Shape"
                    value={formData.textShape}
                    onChange={(value) => handleInputChange("textShape", value)}
                    error={getError(actionData, "textShape")}
                    autoComplete="on"
                  />
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 6, xl: 6 }}>
                  <TextField
                    size="medium"
                    label="Text  Fixing methods"
                    value={formData.textFixingMethods}
                    onChange={(value) =>
                      handleInputChange("textFixingMethods", value)
                    }
                    error={getError(actionData, "textFixingMethods")}
                    autoComplete="on"
                  />
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 6, xl: 6 }}>
                  <TextField
                    size="medium"
                    label="Text  color"
                    value={formData.textColor}
                    onChange={(value) => handleInputChange("textColor", value)}
                    error={getError(actionData, "textColor")}
                    autoComplete="on"
                  />
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 6, xl: 6 }}>
                  <TextField
                    size="medium"
                    label="Text  Option Text"
                    value={formData.textOptionText}
                    onChange={(value) =>
                      handleInputChange("textOptionText", value)
                    }
                    error={getError(actionData, "textOptionText")}
                    autoComplete="on"
                  />
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 6, xl: 6 }}>
                  <TextField
                    size="medium"
                    label="Text  Border"
                    value={formData.textBorder}
                    onChange={(value) => handleInputChange("textBorder", value)}
                    error={getError(actionData, "textBorder")}
                    autoComplete="on"
                  />
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 6, xl: 6 }}>
                  <TextField
                    size="medium"
                    label="Text  product"
                    value={formData.textProduct}
                    onChange={(value) =>
                      handleInputChange("textProduct", value)
                    }
                    error={getError(actionData, "textProduct")}
                    autoComplete="on"
                  />
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 6, xl: 6 }}>
                  <TextField
                    size="medium"
                    label="Text  Image"
                    value={formData.textImage}
                    onChange={(value) => handleInputChange("textImage", value)}
                    error={getError(actionData, "textImage")}
                    autoComplete="on"
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
