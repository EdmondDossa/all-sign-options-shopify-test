import { Box, Grid, InlineStack, Text, TextField } from "@shopify/polaris";
import { useEffect, useState } from "react";
import {
  Form,
  useActionData,
  useLoaderData,
  useNavigation,
  useSubmit,
} from "@remix-run/react";
import {
  BoxBackground,
  SpacingBackground,
  UploaderLayout,
} from "~/components/layouts";
import {
  settingAction,
  settingLoader,
} from "~/custom-action-loader/config-action-loader";
import { ActionFunctionArgs, json, LoaderFunctionArgs } from "@remix-run/node";
import { stringTransform } from "~/utils/transfomerZod";
import { z } from "zod";
import useHandleFlashMessage from "~/hooks/useHandleFlashMessage";
import { FileInput } from "~/components/inputs";
import { getError } from "~/utils/error-getting";
import { BiSaveBtn } from "~/components/buttons";
import { Controller, useForm } from "react-hook-form";
import ConfigSettingsService from "~/models/ConfigSetttings.service";
import { jFlashMessage } from "~/utils/message-flash";
import { authenticate } from "~/shopify.server";
import { headers } from "./app";

const settingParams: [string, string] = ["languageImages", "visualizer"];

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
      const visualizer: any = formData.get("visualizer");
      if (visualizer) {
        await ConfigSettingsService.updateSettingsSection(
          parseInt(`${configId}`),
          session.id,
          "languageImages",
          "visualizer",
          JSON.parse(visualizer),
        );
        return json({
          ...jFlashMessage("Visualizer setting updated successfully"),
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
      defaultText: "Your Text",
      textUnderneathPrice: "",
      showNote: true,
      note: "",
      visualizerOn: "ON",
      visualizerOff: "OFF",
      visualizerLight: "Light",
      visualizerDark: "Dark",
      textIcon: "",
      fontIcon: "",
      sizeIcon: "",
      colorIcon: "",
      letterTypeIcon: "",
      materialIcon: "",
      jacketIcon: "",
      mountingIcon: "",
      backboardIcon: "",
      backboardColorIcon: "",
      additionalIcon: "",
      showTextEditorOverlay: false,
    },
    mode: "onChange",
  });

  const visualizerFields = [
    {
      header: "Visualizer",
      key: "defaultText",
      label: "Default Text",
      description: "The default text displayed on the customizer",
    },
    {
      header: "On/Off buttons",
      key: "visualizerOn",
      label: "Visualizer On",
      description: "",
    },
    {
      header: "",
      key: "visualizerOff",
      label: "Visualizer Off",
      description: "",
    },
    {
      header: "",
      key: "visualizerLight",
      label: "Visualizer Light",
      description: "",
    },
    {
      header: "",
      key: "visualizerDark",
      label: "Visualizer Dark",
      description: "",
    },
    {
      header: "",
      key: "textIcon",
      label: "Text Icon",
      description:
        "The icon to display on the skin on the page. Must be an svg code",
    },
    {
      header: "",
      key: "fontIcon",
      label: "Font Icon",
      description:
        "The icon to display on the skin on the page. Must be an svg code",
    },
    {
      header: "",
      key: "sizeIcon",
      label: "Size Icon",
      description:
        "The icon to display on the skin on the page. Must be an svg code",
    },
    {
      header: "",
      key: "colorIcon",
      label: "Color Icon",
      description:
        "The icon to display on the skin on the page. Must be an svg code",
    },
    {
      header: "",
      key: "letterTypeIcon",
      label: "Letter Type Icon",
      description:
        "The icon to display on the skin on the page. Must be an svg code",
    },
    {
      header: "",
      key: "materialIcon",
      label: "Material Icon",
      description:
        "The icon to display on the skin on the page. Must be an svg code",
    },
    {
      header: "",
      key: "jacketIcon",
      label: "Jacket Icon",
      description:
        "The icon to display on the skin on the page. Must be an svg code",
    },
    {
      header: "",
      key: "mountingIcon",
      label: "Mounting Icon",
      description:
        "The icon to display on the skin on the page. Must be an svg code",
    },
    {
      header: "",
      key: "backboardIcon",
      label: "Backboard Icon",
      description:
        "The icon to display on the skin on the page. Must be an svg code",
    },
    {
      header: "",
      key: "backboardColorIcon",
      label: "Backboard Color Icon",
      description:
        "The icon to display on the skin on the page. Must be an svg code",
    },
    {
      header: "",
      key: "additionalIcon",
      label: "Additional Icon",
      description:
        "The icon to display on the skin on the page. Must be an svg code",
    },
  ];

  const handleFormSubmit = async (formData: any) => {
    try {
      submit({ visualizer: JSON.stringify(formData) }, { method: "POST" });
    } catch (error) {
      console.error("Submit error:", error);
    }
  };

  useEffect(() => {
    if (settingData) {
      reset(settingData);
    }
  }, [settingData]);

  return (
    <>
      <Form onSubmit={handleSubmit(handleFormSubmit)} method="POST">
        <SpacingBackground border="1px solid #DDDDDD" margin="4px 0px">
          <BoxBackground>
            <Box paddingInline="300" paddingBlock="1000">
              <Grid columns={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
                {visualizerFields.map((fld, index) => {
                  return (
                    <Grid.Cell
                      key={index}
                      columnSpan={{ xs: 6, sm: 6, md: 3, lg: 6, xl: 6 }}
                    >
                      {!fld.key.includes("Icon") ? (
                        <Controller
                          name={fld.key}
                          control={control}
                          render={({ field: { onChange, value } }) => (
                            <TextField
                              id={fld.key}
                              label={fld.label}
                              helpText={fld.description}
                              value={value || ""}
                              onChange={onChange}
                              autoComplete="off"
                            />
                          )}
                        />
                      ) : (
                        <Controller
                          name={fld.key}
                          control={control}
                          render={({ field: { onChange, value } }) => (
                            <UploaderLayout
                              modalTitle="Upload Icon"
                              label={fld.label}
                              buttonText={"choose a picture"}
                              helperText={fld.description}
                              fileType={"image"}
                              value={value}
                              isSubmitting={false}
                              onChange={(val) => {
                                onChange(val);
                              }}
                            />
                          )}
                        />
                      )}
                    </Grid.Cell>
                  );
                })}
              </Grid>
            </Box>
          </BoxBackground>
        </SpacingBackground>
        <SpacingBackground width="100%" height="auto" margin="3px 0 0 0">
          <BoxBackground>
            <Box paddingInline="300" paddingBlock="300">
              <InlineStack align="end" gap="600">
                <BiSaveBtn title="Save" />
              </InlineStack>
            </Box>
          </BoxBackground>
        </SpacingBackground>
      </Form>
    </>
  );
}
