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

const settingParams: [string, string] = ["generals", "mode"];
const formSchema = z.object({
  showNavigatorMenu: z.string(),
  showNavigationMenuFirst: z.string(),
  modeSelectionOptionsDisplay: z.string(),
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
      const mode: any = formData.get("mode");
      if (mode) {
        await ConfigSettingsService.updateSettingsSection(
          parseInt(`${configId}`),
          session.id,
          "generals",
          "mode",
          JSON.parse(mode),
        );
        return json({
          ...jFlashMessage("Mode setting updated successfully"),
        });
      }
    }
    default:
      break;
  }

  return null;
};

interface ModeOptionsProps {
  type: "simple" | "multi";
  allowMultiFonts: boolean;
  allowMultiColors: boolean;
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
  } = useForm<ModeOptionsProps>({
    defaultValues: {
      type: "simple",
      allowMultiFonts: false,
      allowMultiColors: false,
    },
    mode: "onChange",
  });
  useHandleFlashMessage();
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  let isSubmitting = navigation.state == "submitting";

  const onInternalSubmit = (data: ModeOptionsProps) => {
    try {
      submit({ mode: JSON.stringify(data) }, { method: "POST" });
    } catch (e) {
      console.error("Error submitting form:", e);
    }
  };
  type FieldType = {
    label: string;
    name: keyof ModeOptionsProps;
    helpText?: string;
    type?: string;
    options?: { label: string; value: any }[];
  };
  const fields: FieldType[] = [
    {
      label: "Multiple Color and Font Selections?",
      name: "type",
      type: "select",
      helpText:
        "In simple mode, your customer cannot select a text and apply a different font or color.",
      options: [
        { label: "Simple", value: "simple" },
        { label: "Multi", value: "multi" },
      ],
    },
    {
      label: "Allow Multi Fonts",
      name: "allowMultiFonts",
      type: "checkbox",
      helpText:
        "This optionsIf this option is enabled, your customers can apply different fonts to their texts.",
    },
    {
      label: "Allow Multi Colors",
      name: "allowMultiColors",
      type: "checkbox",
      helpText:
        "If this option is enabled, your customers can apply different colors to their texts.",
    },
  ];

  useEffect(() => {
    if (configuration?.data?.settings?.generals?.mode) {
      const modeOptions = configuration.data.settings.generals.mode;

      const formValues = {
        type: modeOptions.type || "simple",
        allowMultiFonts: modeOptions.allowMultiFonts || false,
        allowMultiColors: modeOptions.allowMultiColors || false,
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
              <Grid gap={{ lg: "30px" }}>
                {fields.map((field, index) => (
                  <>
                    {field.type === "select" ? (
                      <Grid.Cell
                        columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}
                      >
                        <Controller
                          name={field.name}
                          control={control}
                          rules={{ required: true }}
                          render={({ field: { onChange, onBlur, value } }) => (
                            <Select
                              label={field.label}
                              options={field.options}
                              helpText={field.helpText}
                              onChange={onChange}
                              onBlur={onBlur}
                              value={value as string}
                              error={getError(actionData, field.name)}
                            />
                          )}
                        />
                      </Grid.Cell>
                    ) : (
                      <>
                        {field.type != "checkbox" ? (
                          <Grid.Cell
                            columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}
                          >
                            <Controller
                              name={field.name}
                              control={control}
                              rules={{ required: true }}
                              render={({
                                field: { onChange, onBlur, value },
                              }) => (
                                <TextField
                                  label={field.label}
                                  value={value as string}
                                  type={field.type as any}
                                  onChange={onChange}
                                  onBlur={onBlur}
                                  helpText={field.helpText}
                                  error={getError(actionData, field.name)}
                                  autoComplete="off"
                                />
                              )}
                            />
                          </Grid.Cell>
                        ) : (
                          <>
                            {watch("type") === "multi" && (
                              <Grid.Cell
                                columnSpan={{
                                  xs: 6,
                                  sm: 6,
                                  md: 6,
                                  lg: 12,
                                  xl: 12,
                                }}
                              >
                                <Controller
                                  name={field.name}
                                  control={control}
                                  render={({ field: { onChange, value } }) => (
                                    <InlineStack gap="200">
                                      <Text as="span">{field.label}</Text>
                                      <ToggleButton
                                        id={`mode + ${index}`}
                                        checked={value as boolean}
                                        onChange={(val) => onChange(val)}
                                      />
                                    </InlineStack>
                                  )}
                                />
                                <Text as="p">{field.helpText}</Text>
                              </Grid.Cell>
                            )}
                          </>
                        )}
                      </>
                    )}
                  </>
                ))}
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
