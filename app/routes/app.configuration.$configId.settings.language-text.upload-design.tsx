import {
  BlockStack,
  Box,
  Grid,
  InlineStack,
  Text,
  TextField,
} from "@shopify/polaris";
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
import { ReactSwitchCustom } from "~/components/inputs/ReactSwitchCustom";
import {
  settingAction,
  settingLoader,
} from "~/custom-action-loader/config-action-loader";
import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { booleanTransform, stringTransform } from "~/utils/transfomerZod";
import { z } from "zod";
import useHandleFlashMessage from "~/hooks/useHandleFlashMessage";
import { getError } from "~/utils/error-getting";
import { BiSaveBtn } from "~/components/buttons/BiSaveBtn";
import { CustomTinymce } from "~/components/inputs/CustomTinymce";

const settingParams: [string, string] = ["languageImages", "uploadDesign"];
const formSchema = z.object({
  link: z.string().nullish().transform(stringTransform),
  phraseSubmitCustom: z.string().nullish().transform(stringTransform),
  helpContent: z.string().nullish().transform(stringTransform),
  activate: z.any().transform(booleanTransform).pipe(z.boolean()),
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
      activate: false,
      link: "",
      phraseSubmitCustom: "Take a customization",
      helpContent: "",
      ...settingData
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
        <SpacingBackground border="1px solid #DDDDDD">
          <BoxBackground>
            <Box paddingInline="300" paddingBlock="1000">
              <Grid gap={{ lg: "30px" }}>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
                  <Text as="strong" fontWeight="bold" variant="bodyLg">
                    Custom design link
                  </Text>
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
                  <BlockStack gap="400">
                    <InlineStack gap="300" blockAlign="center">
                      <Text as="strong" fontWeight="bold" variant="bodyMd">
                        Enable custom design link{" "}
                      </Text>
                      <ReactSwitchCustom
                        checked={formData.activate}
                        setChecked={(value: any) =>
                          handleInputChange("activate", value)
                        }
                      />
                    </InlineStack>

                    <Text as="p" variant="bodySm" tone="subdued">
                      {" "}
                      Enable this to display a link to redirect customers to
                      another page on your site; this will display as one of the
                      first options on desktop and mobile.
                    </Text>
                  </BlockStack>
                </Grid.Cell>
                {formData.activate && (
                  <>
                    <Grid.Cell
                      columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}
                    >
                      <TextField
                        size="medium"
                        label="Custom Design Link"
                        helpText="                    URL to redirect customers on your store that will allow for more complex graphic design quote submissions."
                        value={formData.link}
                        onChange={(value) => handleInputChange("link", value)}
                        error={getError(actionData, "link")}
                        autoComplete="off"
                      />
                    </Grid.Cell>
                    <Grid.Cell
                      columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}
                    >
                      <TextField
                        size="medium"
                        label="Phrase for link to submit custom design page"
                        value={formData.phraseSubmitCustom}
                        onChange={(value) =>
                          handleInputChange("phraseSubmitCustom", value)
                        }
                        error={getError(actionData, "phraseSubmitCustom")}
                        autoComplete="off"
                      />
                    </Grid.Cell>
                  </>
                )}
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
                    Help content
                  </Text>
                </Grid.Cell>

                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
                <CustomTinymce
                    error={getError(actionData, "helpContent")}
                    title=""
                    onEditorChange={(value: any) =>
                      handleInputChange("helpContent", value)
                    }
                    value={formData.helpContent}
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
