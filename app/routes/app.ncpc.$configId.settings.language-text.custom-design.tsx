import {
  BlockStack,
  Box,
  Grid,
  InlineStack,
  Text,
  TextField,
} from "@shopify/polaris";
import { useEffect, useState } from "react";
import {
  Form,
  useActionData,
  useLoaderData,
  useNavigation,
  useSubmit,
} from "@remix-run/react";
import { BoxBackground, SpacingBackground } from "~/components/layouts";
import { ReactSwitchCustom } from "~/components/inputs";
import {
  settingAction,
  settingLoader,
} from "~/custom-action-loader/config-action-loader";
import { ActionFunctionArgs, json, LoaderFunctionArgs } from "@remix-run/node";
import { booleanTransform, stringTransform } from "~/utils/transfomerZod";
import { z } from "zod";
import useHandleFlashMessage from "~/hooks/useHandleFlashMessage";
import { getError } from "~/utils/error-getting";
import { BiSaveBtn, ToggleButton } from "~/components/buttons";
import { CustomTinymce } from "~/components/inputs";
import ConfigSettingsService from "~/models/ConfigSetttings.service";
import { jFlashMessage } from "~/utils/message-flash";
import { authenticate } from "~/shopify.server";
import { Controller, useForm } from "react-hook-form";

const settingParams: [string, string] = ["languageImages", "customDesign"];

export const loader = async (agrs: LoaderFunctionArgs) => {
  return await settingLoader(agrs, settingParams);
};

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const { session, admin } = await authenticate.admin(request);

  const formData = await request.formData();
  const configId = params.configId;
  const method = request.method;

  switch (method) {
    case "POST": {
      const customDesign: any = formData.get("customDesign");
      if (customDesign) {
        await ConfigSettingsService.updateSettingsSection(
          parseInt(`${configId}`),
          session.id,
          "languageImages",
          "customDesign",
          JSON.parse(customDesign),
        );
        return json({
          ...jFlashMessage("Custom Design setting updated successfully"),
        });
      }
    }
    default:
      break;
  }

  return null;
};

export default function ConfigSettingsGeneral() {
  const submit = useSubmit();
  let { settingData } = useLoaderData<typeof loader>();
  useHandleFlashMessage();
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  let isSubmitting = navigation.state == "submitting";

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isValid },
    watch,
    setValue,
    getValues,
    trigger,
  } = useForm<any>({
    defaultValues: {
      link: {
        activate: false,
        link: "",
        phraseSubmitCustom: "Take a customization",
      },
      screen: {
        activate: false,
        customDesignText:
          "To submit the personalized design, please click on this button before",
        buttonLabel: "Send Custom Design",
        phraseToLinkBackTextCustomiser: "Custom now",
        steps: {
          headers: "",
          data: [],
        },
      },
    },
    mode: "onChange",
  });

  const handleFormSubmit = (formData: any) => {
    submit({ customDesign: JSON.stringify(formData) }, { method: "POST" });
  };

  useEffect(() => {
    if (settingData) {
      reset(settingData);
    }
  }, [settingData]);
  return (
    <>
      <Form onSubmit={handleSubmit(handleFormSubmit)} method="POST">
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
                      <Controller
                        name="link.activate"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                          <ToggleButton
                            id="custom-design-link-toggle"
                            checked={value}
                            onChange={onChange}
                          />
                        )}
                      />
                    </InlineStack>

                    <Text as="p" variant="bodySm" tone="subdued">
                      {" "}
                      Enable this to display a link to direct customers to
                      another page on your site, this will display as one of the
                      first options on desktop and mobile.
                    </Text>
                  </BlockStack>
                </Grid.Cell>
                {watch("link.activate") && (
                  <>
                    <Grid.Cell
                      columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}
                    >
                      <Controller
                        name="link.link"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                          <TextField
                            label="Custom Design Link"
                            helpText="URL to redirect customers on your store that will allow for more complex graphic design quote submissions."
                            value={value}
                            onChange={onChange}
                            autoComplete="off"
                          />
                        )}
                      />
                    </Grid.Cell>
                    <Grid.Cell
                      columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}
                    >
                      <Controller
                        name="link.phraseSubmitCustom"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                          <TextField
                            size="medium"
                            label="Phrase for link to submit custom design page"
                            value={value}
                            onChange={onChange}
                            autoComplete="off"
                          />
                        )}
                      />
                    </Grid.Cell>
                  </>
                )}
              </Grid>
            </Box>
          </BoxBackground>
        </SpacingBackground>

        {/* <SpacingBackground border="1px solid #DDDDDD" margin="4px 0px">
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
        </SpacingBackground> */}

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
