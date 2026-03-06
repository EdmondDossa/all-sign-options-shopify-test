import {
  Box,
  Grid,
  InlineStack,
  Select,
  Text,
  TextField,
} from "@shopify/polaris";
import { useEffect, useState } from "react";
import {
  Form,
  useActionData,
  useLoaderData,
  useNavigation,
  useOutletContext,
  useSubmit,
} from "@remix-run/react";
import { BoxBackground, SpacingBackground } from "~/components/layouts";
import {
  settingAction,
  settingLoader,
} from "~/custom-action-loader/config-action-loader";
import { ActionFunctionArgs, json, LoaderFunctionArgs } from "@remix-run/node";
import useHandleFlashMessage from "~/hooks/useHandleFlashMessage";
import { z } from "zod";
import { getError } from "~/utils/error-getting";
import { BiSaveBtn, ToggleButton } from "~/components/buttons";
import { authenticate } from "~/shopify.server";
import ConfigSettingsService from "~/models/ConfigSetttings.service";
import { jFlashMessage } from "~/utils/message-flash";
import { Controller, useForm } from "react-hook-form";
import { MailIcon } from "~/components/icons";
import { ComboxSelect, MultiCombobox } from "~/components/inputs";

const settingParams: [string, string] = ["generals", "requestQuote"];
const formSchema = z.object({
  showNavigatorMenu: z.string(),
  showNavigationMenuFirst: z.string(),
  requestQuoteSelectionOptionsDisplay: z.string(),
});

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
      const requestQuote: any = formData.get("requestQuote");
      if (requestQuote) {
        await ConfigSettingsService.updateSettingsSection(
          parseInt(`${configId}`),
          session.id,
          "generals",
          "requestQuote",
          JSON.parse(requestQuote),
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

interface RequestQuoteOptionsProps {
  enableRequestQuote: boolean;
  receiversEmail: string[];
  sendToCustomer: boolean;
  allowUploadFiles: boolean;
  acceptExtensions: string[];
  maxFileSize: number;
  maxFilesNumber: number;
  emailSubject: string;
}

export default function ConfigSettingsGeneral() {
  const submit = useSubmit();
  const { shop, currencySymbol, configuration } = useOutletContext<any>();
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isValid },
    watch,
    setValue,
    getValues,
    trigger,
  } = useForm<RequestQuoteOptionsProps>({
    defaultValues: {
      enableRequestQuote: false,
      receiversEmail: [],
      sendToCustomer: false,
      allowUploadFiles: false,
      acceptExtensions: [".jpg", ".png", ".svg", ".pdf"],
      maxFileSize: 10,
      maxFilesNumber: 5,
      emailSubject: "Request A Quote",
    },
    mode: "onChange",
  });
  useHandleFlashMessage();
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  let isSubmitting = navigation.state == "submitting";
  const extensions = [
    // Images
    { label: "JPG", value: ".jpg" },
    { label: "JPEG", value: ".jpeg" },
    { label: "PNG", value: ".png" },
    { label: "GIF", value: ".gif" },
    { label: "BMP", value: ".bmp" },
    { label: "WebP", value: ".webp" },
    { label: "TIFF", value: ".tiff" },
    { label: "SVG", value: ".svg" },
    { label: "ICO", value: ".ico" },
    { label: "HEIC", value: ".heic" },

    // Vidéos
    { label: "MP4", value: ".mp4" },
    { label: "AVI", value: ".avi" },
    { label: "MOV", value: ".mov" },
    { label: "WMV", value: ".wmv" },
    { label: "FLV", value: ".flv" },
    { label: "MKV", value: ".mkv" },
    { label: "WebM", value: ".webm" },
    { label: "3GP", value: ".3gp" },
    { label: "M4V", value: ".m4v" },
    { label: "MPG", value: ".mpg" },
    { label: "MPEG", value: ".mpeg" },

    // Document
    { label: "PDF", value: ".pdf" },
  ];

  // Fonction de validation d'email
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
  };

  // Fonction de validation pour le champ
  const validateEmails = (value: string[]) => {
    if (!value || value.length === 0) {
      return "At least one email address is required";
    }

    // Filtrer seulement lors de la validation, pas dans onChange
    const emails = value.filter((email) => email.trim() !== "");

    if (emails.length === 0) {
      return "At least one email address is required";
    }

    const invalidEmails = emails.filter((email) => !isValidEmail(email));

    if (invalidEmails.length > 0) {
      if (invalidEmails.length === 1) {
        return `Invalid email address: ${invalidEmails[0]}`;
      } else {
        return `Invalid email addresses: ${invalidEmails.join(", ")}`;
      }
    }

    return true;
  };
  const onInternalSubmit = (data: RequestQuoteOptionsProps) => {
    try {
      submit({ requestQuote: JSON.stringify(data) }, { method: "POST" });
    } catch (e) {
      console.error("Error submitting form:", e);
    }
  };

  useEffect(() => {
    if (configuration?.data?.settings?.generals?.requestQuote) {
      const requestQuoteOptions =
        configuration.data.settings.generals.requestQuote;

      const formValues = {
        enableRequestQuote: requestQuoteOptions.enableRequestQuote || false,
        receiversEmail: requestQuoteOptions.receiversEmail || [],
        sendToCustomer: requestQuoteOptions.sendToCustomer || false,
        allowUploadFiles: requestQuoteOptions.allowUploadFiles || false,
        acceptExtensions: requestQuoteOptions.acceptExtensions || [
          ".jpg",
          ".png",
          ".svg",
          ".pdf",
        ],
        maxFileSize: requestQuoteOptions.maxFileSize || 10,
        maxFilesNumber: requestQuoteOptions.maxFilesNumber || 5,
        emailSubject: requestQuoteOptions.emailSubject || "Request A Quote",
      };
      reset(formValues);
    }
  }, [configuration, reset]);

  return (
    <>
      <Form onSubmit={handleSubmit(onInternalSubmit)} method="POST">
        <SpacingBackground border="1px solid #DDDDDD">
          <BoxBackground>
            <Box paddingInline="300" paddingBlock="1000">
              <Controller
                name={"enableRequestQuote"}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <>
                    <InlineStack>
                      <Text as="h6" variant="headingMd">
                        Activate Request A Quote
                      </Text>

                      <Box paddingInline="150" />
                      <InlineStack>
                        <Text as="span">No</Text>
                        <Box paddingInline="100" />
                        <ToggleButton
                          id="enableRequestQuote"
                          checked={value}
                          onChange={onChange}
                        />
                        <Box paddingInline="100" />
                        <Text as="span">Yes</Text>
                      </InlineStack>
                    </InlineStack>
                    <Text as="p">
                      This option will allow the customer to request a quote
                      before purchasing.
                    </Text>
                  </>
                )}
              />
              <Box paddingBlock="100" />
              <Box paddingBlock="150">
                <Controller
                  name={"receiversEmail"}
                  control={control}
                  rules={{
                    required: "At least one email address is required",
                    validate: validateEmails,
                  }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TextField
                      type="text"
                      prefix={<MailIcon width={15} height={15} />}
                      label={"Email of request quote receivers"}
                      helpText="For many email, separate it with comma ( , )"
                      placeholder="name@flowbite.com"
                      autoComplete="off"
                      onChange={(val) => {
                        const emails = val
                          .split(",")
                          .map((email) => email.trim());
                        onChange(emails);
                      }}
                      value={Array.isArray(value) ? value.join(", ") : ""}
                      error={error?.message}
                    />
                  )}
                />
              </Box>
              <Box paddingBlock="100" />
              <Box paddingBlock="150">
                <Controller
                  name={"emailSubject"}
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      type="text"
                      prefix={<MailIcon width={15} height={15} />}
                      label={"Subject of request quote email"}
                      placeholder="name@flowbite.com"
                      autoComplete="off"
                      onChange={onChange}
                      value={value}
                    />
                  )}
                />
              </Box>
              <Box paddingBlock="100" />
              <Controller
                name={"allowUploadFiles"}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <>
                    <InlineStack>
                      <Text as="h6" variant="headingMd">
                        Allow upload files
                      </Text>

                      <Box paddingInline="150" />
                      <InlineStack>
                        <Text as="span">No</Text>
                        <Box paddingInline="100" />
                        <ToggleButton
                          id="allowUploadFiles"
                          checked={value}
                          onChange={onChange}
                        />
                        <Box paddingInline="100" />
                        <Text as="span">Yes</Text>
                      </InlineStack>
                    </InlineStack>
                    <Text as="p">
                      Allow customers to upload files when requesting a quote
                    </Text>
                  </>
                )}
              />
              {watch("allowUploadFiles") && (
                <Box>
                  <Controller
                    name={"acceptExtensions"}
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <MultiCombobox
                        label="Accepted file extensions"
                        placeholder="Select file extensions"
                        data={extensions}
                        selectedOptions={value}
                        setSelectedOptions={onChange}
                      />
                    )}
                  />
                  <Text as="p">List of accepted file extensions</Text>
                  <Box paddingBlock="100" />
                  <Grid columns={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
                    <Grid.Cell
                      columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}
                    >
                      <Controller
                        name={"maxFileSize"}
                        control={control}
                        rules={{
                          required: true,
                          min: {
                            value: 1,
                            message: "Minimum value is 1",
                          },
                        }}
                        render={({
                          field: { onChange, value },
                          fieldState,
                        }) => (
                          <TextField
                            type="number"
                            label={"Max file size (MB)"}
                            placeholder="10"
                            helpText="Maximum file size in MB"
                            autoComplete="off"
                            min={1}
                            onChange={onChange}
                            value={value.toString()}
                            error={fieldState.error?.message}
                          />
                        )}
                      />
                    </Grid.Cell>
                    <Grid.Cell
                      columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}
                    >
                      <Controller
                        name={"maxFilesNumber"}
                        control={control}
                        rules={{
                          required: true,
                          min: {
                            value: 1,
                            message: "Minimum value is 1",
                          },
                        }}
                        render={({
                          field: { onChange, value },
                          fieldState,
                        }) => (
                          <TextField
                            type="number"
                            label={"Max files number"}
                            placeholder="5"
                            helpText="Maximum number of files allowed"
                            autoComplete="off"
                            min={1}
                            onChange={onChange}
                            value={value.toString()}
                            error={fieldState.error?.message}
                          />
                        )}
                      />
                    </Grid.Cell>
                  </Grid>

                  <Box paddingBlock="100" />
                  <Controller
                    name={"sendToCustomer"}
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <>
                        <InlineStack>
                          <Text as="h6" variant="headingMd">
                            Send email of request quote to customer
                          </Text>

                          <Box paddingInline="150" />
                          <InlineStack>
                            <Text as="span">No</Text>
                            <Box paddingInline="100" />
                            <ToggleButton
                              id="sendToCustomer"
                              checked={value}
                              onChange={onChange}
                            />
                            <Box paddingInline="100" />
                            <Text as="span">Yes</Text>
                          </InlineStack>
                        </InlineStack>
                        <Text as="p">
                          Send the quote to the customer after the quote is
                          submitted
                        </Text>
                      </>
                    )}
                  />
                </Box>
              )}
              <Box paddingBlock="100" />
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
