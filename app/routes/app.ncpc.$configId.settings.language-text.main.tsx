import { Box, Grid, InlineStack, Text, TextField } from "@shopify/polaris";
import { useEffect, useState } from "react";
import {
  Form,
  useActionData,
  useLoaderData,
  useNavigation,
  useSubmit,
} from "@remix-run/react";
import { BoxBackground, SpacingBackground } from "~/components/layouts";
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

const settingParams: [string, string] = ["languageImages", "main"];

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
      const main: any = formData.get("main");
      if (main) {
        await ConfigSettingsService.updateSettingsSection(
          parseInt(`${configId}`),
          session.id,
          "languageImages",
          "main",
          JSON.parse(main),
        );
        return json({
          ...jFlashMessage("Request Quote setting updated successfully"),
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
      header: "CREATE YOUR SIGN",
      textBoxLabel: "Write your text",
      lineCount: "Lines",
      maxCharacters: "max characters per line for current size",
      addingToCartButton: "Add to the cart",
      requestAQuoteButton: "Get A Quote",
      buttonSendAQuoteFormLabel: "Submit",
      firstName: "First Name",
      lastName: "Last Name",
      email: "Email",
      phone: "Phone",
      quoteAdditionalNotes: "Additional Notes",
      quoteUploadFileTitle: "Upload your files",
      quoteFilesFormats: "Formats",
      maxFileSize: "Max File Size",
      emailError: "Please enter a valid email address",
      quoteThanksMessage: "Your quote has been sent successfully",
      quoteModalTitle: "Quote Request Submission",
      finishButton: "Finish",
      textBeforePriceValue: "",
      textAfterPriceValue: "Tax included",
      maxSignLabel: "the size exceeds the limit",
      textAlignment: "Text Align",
      textAlignmentValue: {
        left: "Left",
        center: "Center",
        right: "Right",
      },
      maxSignModals: {
        width: "Your sign has exceeded the maximum width",
        height: "Your sign has exceeded the maximum height",
        lines: "Your sign has exceeded the maximum number of lines",
        characters: "Your sign has exceeded the maximum number of characters",
      },
      measurementLabel: {
        width: "Width",
        height: "Height",
      },
      summaryLabel: "Summary",
      editLabel: "Edit",
      sectionText: "Text",
      sectionAdditionalOptions: "Additional Options",
      charactersRemaining: "Remaining characters",
      minimumCharacter:
        "or more characters are required, please add more characters.",
      selectableTextMessage: "Click on a word to begin customising it.",
      //cncCutsText: "CNC Cuts Number",
      materialLineLength: "Material Line Length",
      applyToAll: "Apply to all",
    },
    mode: "onChange",
  });

  const mainFields = [
    {
      key: "header",
      label: "Header",
      description: "",
    },
    {
      key: "textBoxLabel",
      label: "Text Box Label",
      description: "",
    },
    {
      key: "lineCount", // Changed from "line"
      label: "Line count",
      description:
        "Preceded by the current number of lines over the total allowable (e.g. 1/3 lines).",
    },
    {
      key: "maxCharacters", // Changed from "maxChar"
      label: "Max characters",
      description:
        "Preceded by the maximum number of characters per line (e.g. 20 characters max per line for current size).",
    },
    {
      key: "addingToCartButton", // Changed from "addToCart"
      label: "Add to cart button",
      description: "Add To cart Button Label.",
    },
    {
      key: "requestAQuoteButton", // Changed from "requestQuote"
      label: "Get request a quote button",
      description: "Request a quote Button Label.",
    },
    {
      key: "email",
      label: "Email",
      description:
        "The name of the field where the customer will enter his e-mail address",
    },
    {
      key: "firstName",
      label: "First Name",
      description: "",
    },
    {
      key: "lastName",
      label: "Last Name",
      description: "",
    },
    {
      key: "phone",
      label: "Phone",
      description: "",
    },
    {
      key: "quoteAdditionalNotes",
      label: "Additional Notes",
      description:
        "The name of the field where the customer will enter additional notes",
    },
    {
      key: "quoteFilesFormats",
      label: "Files Formats",
      description: "Text indicating authorized file formats",
    },
    {
      key: "quoteUploadFileTitle",
      label: "Upload File",
      description: "Text indicating customers to upload files",
    },
    {
      key: "maxFileSize",
      label: "Max File Size",
      description:
        "Text indicating the maximum file size allowed for the customer",
    },
    {
      key: "buttonSendAQuoteFormLabel",
      label: "Submit",
      description: "The label of the button to submit the quote form",
    },
    {
      key: "emailError",
      label: "Email Error",
      description: "Error displayed when customer enters invalid mail",
    },
    {
      key: "quoteThanksMessage",
      label: "Quote Thanks Message",
      description: "The message displayed when the quote form is submitted",
    },
    {
      key: "quoteModalTitle",
      label: "Quote Modal Title",
      description: "The title is displayed on top of request a quote Modal",
    },
    {
      key: "finishButton",
      label: "Finish button",
      description: "Finish button Label.",
    },
    {
      key: "textBeforePriceValue", // Changed from "textBefore"
      label: "Text before price value",
      description: "Displays before the price value",
    },
    {
      key: "textAfterPriceValue", // Changed from "textAfter"
      label: "Text after price value",
      description: "Displays after the price value",
    },
    {
      key: "maxSignLabel", // Added missing field
      label: "Max Sign Label",
      description: "Text displayed when size exceeds limit",
    },
    {
      key: "textAlignment",
      label: "Text Align",
      description: "display instead of Text Align",
    },
    {
      key: "textAlignmentValue.left",
      label: "Left",
      description: "Left alignment option",
    },
    {
      key: "textAlignmentValue.center",
      label: "Center", // Fixed from "Left"
      description: "Center alignment option",
    },
    {
      key: "textAlignmentValue.right",
      label: "Right", // Fixed from "Left"
      description: "Right alignment option",
    },
    {
      key: "maxSignModals.width", // Added missing modal fields
      label: "Width Modal",
      description: "Message when width exceeds maximum",
    },
    {
      key: "maxSignModals.height",
      label: "Height Modal",
      description: "Message when height exceeds maximum",
    },
    {
      key: "maxSignModals.lines",
      label: "Lines Modal",
      description: "Message when lines exceed maximum",
    },
    {
      key: "maxSignModals.characters",
      label: "Characters Modal",
      description: "Message when characters exceed maximum",
    },
    {
      key: "measurementLabel.width",
      label: "Width",
      description: "Text to be displayed in the summary for width",
    },
    {
      key: "measurementLabel.height",
      label: "Height", // Fixed from "height"
      description: "Text to be displayed in the summary for height",
    },
    {
      key: "summaryLabel", // Changed from "textSummary"
      label: "Summary",
      description: "Summary header text",
    },
    {
      key: "editLabel", // Changed from "textEdit"
      label: "Edit",
      description: "Edit button text",
    },
    {
      key: "sectionText",
      label: "Text",
      description: "Text to display on the default skin for the text section",
    },
    {
      key: "sectionAdditionalOptions",
      label: "Additional Options",
      description:
        "Text that will be displayed as the title for the additional options section",
    },
    {
      key: "charactersRemaining",
      label: "Remaining characters",
      description: "Text to display for number of characters remaining",
    },
    {
      key: "minimumCharacter",
      label: "Minimum",
      description:
        "Preceded by the minimum number of characters for the size (for example 20 characters minimum for the current size).",
    },
    {
      key: "selectableTextMessage",
      label: "Selectable Text Message",
      description:
        "The text that shows the user that a text can be selected and customized",
    },
    /* {
      key: "materialLineLength", // Added missing field
      label: "Material Line Length",
      description: "Text for material line length",
    }, */
    {
      key: "applyToAll",
      label: "Apply To All Option Text",
      description: "",
    },
  ];

  const handleFormSubmit = async (formData: any) => {
    try {
      submit({ main: JSON.stringify(formData) }, { method: "POST" });
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
                {mainFields.map((field, index) => {
                  return (
                    <Grid.Cell
                      key={index}
                      columnSpan={{ xs: 6, sm: 6, md: 3, lg: 4, xl: 4 }}
                    >
                      <Controller
                        name={field.key}
                        control={control}
                        render={({ field: { onChange, value } }) => (
                          <TextField
                            id={field.key}
                            label={field.label}
                            helpText={field.description}
                            value={value || ""}
                            onChange={onChange}
                            autoComplete="off"
                          />
                        )}
                      />
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
