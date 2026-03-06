import { Box, Grid, InlineStack, Select, TextField } from "@shopify/polaris";
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
import { BiSaveBtn } from "~/components/buttons";
import { authenticate } from "~/shopify.server";
import ConfigSettingsService from "~/models/ConfigSetttings.service";
import { jFlashMessage } from "~/utils/message-flash";
import { Controller, useForm } from "react-hook-form";

const settingParams: [string, string] = ["generals", "mobile"];
const formSchema = z.object({
  showNavigatorMenu: z.string(),
  showNavigationMenuFirst: z.string(),
  mobileSelectionOptionsDisplay: z.string(),
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
      const mobile: any = formData.get("mobile");
      if (mobile) {
        await ConfigSettingsService.updateSettingsSection(
          parseInt(`${configId}`),
          session.id,
          "generals",
          "mobile",
          JSON.parse(mobile),
        );
        return json({
          ...jFlashMessage("Mobile setting updated successfully"),
        });
      }
    }
    default:
      break;
  }

  return null;
};

interface MobileOptionsProps {
  showNavigatorMenu: "off" | "on";
  showNavigationMenuFirst: "yes" | "no";
  mobileSelectionOptionsDisplay: "horizontally-stack" | "scroll";
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
  } = useForm<MobileOptionsProps>({
    defaultValues: {
      showNavigatorMenu: "off",
      showNavigationMenuFirst: "yes",
      mobileSelectionOptionsDisplay: "horizontally-stack",
    },
    mode: "onChange",
  });
  useHandleFlashMessage();
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  let isSubmitting = navigation.state == "submitting";

  const onInternalSubmit = (data: MobileOptionsProps) => {
    try {
      submit({ mobile: JSON.stringify(data) }, { method: "POST" });
    } catch (e) {
      console.error("Error submitting form:", e);
    }
  };
  type FieldType = {
    label: string;
    name: keyof MobileOptionsProps;
    helpText?: string;
    type?: string;
    options?: { label: string; value: any }[];
  };
  const fields: FieldType[] = [
    {
      label: "Show Navigation Menu on Mobile",
      helpText: "Display a navigation menu of the selections on mobile.",
      name: "showNavigatorMenu",
      type: "select",
      options: [
        { label: "Off", value: "off" },
        { label: "On", value: "on" },
      ],
    },
    {
      label: "Show Navigation Menu First",
      helpText:
        "This allows the users to jump to a specific selection from the navigation menu first. Otherwise, the screen will show the first selection.",
      name: "showNavigationMenuFirst",
      type: "select",
      options: [
        { label: "Yes", value: "yes" },
        { label: "No", value: "no" },
      ],
    },
    {
      label: "Mobile Selection Options Display",
      helpText:
        "Allow selection options to display as horizontally scrollable options on mobile or stacked vertically.",
      name: "mobileSelectionOptionsDisplay",
      type: "select",
      options: [
        { label: "Horizontally Stack", value: "horizontally" },
        { label: "Scroll", value: "scroll" },
      ],
    },
  ];

  useEffect(() => {
    if (configuration?.data?.settings?.generals?.mobile) {
      const mobileOptions = configuration.data.settings.generals.mobile;

      const formValues = {
        showNavigatorMenu: mobileOptions.showNavigatorMenu || "off",
        showNavigationMenuFirst: mobileOptions.showNavigationMenuFirst || "yes",
        mobileSelectionOptionsDisplay:
          mobileOptions.mobileSelectionOptionsDisplay || "horizontally-stack",
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
                              value={value}
                              error={getError(actionData, field.name)}
                            />
                          )}
                        />
                      </Grid.Cell>
                    ) : (
                      <Grid.Cell
                        columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}
                      >
                        <Controller
                          name={field.name}
                          control={control}
                          rules={{ required: true }}
                          render={({ field: { onChange, onBlur, value } }) => (
                            <TextField
                              label={field.label}
                              value={value}
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
