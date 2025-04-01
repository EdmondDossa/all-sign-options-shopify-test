import {
  BlockStack,
  Box,
  Divider,
  Grid,
  InlineStack,
  Text,
  TextField
} from "@shopify/polaris";
import { useCallback, useEffect, useState } from "react";

import {
  Form,
  useActionData,
  useLoaderData,
  useNavigation,
  useSubmit,
} from "@remix-run/react";
import { SpacingBackground } from "~/components/layouts/SpacingBackground";
import { ReactSwitchCustom } from "~/components/inputs/ReactSwitchCustom";
import { authenticate } from "~/shopify.server";
import { ActionFunctionArgs, LoaderFunctionArgs, json } from "@remix-run/node";
import SettingOutputService from "~/models/SettingOutput.service";
import { OutputType } from "~/types/SettingsType";
import useHandleFlashMessage from "~/hooks/useHandleFlashMessage";
import { z } from "zod";
import { parseWithZod } from "@conform-to/zod";
import { jFlashMessage } from "~/utils/message-flash";
import { BiSaveBtn } from "~/components/buttons/BiSaveBtn";
import { useForm, Controller, SubmitHandler } from "react-hook-form"
import { getError } from "~/utils/error-getting";
import { booleanTransform, stringTransform } from "~/utils/transfomerZod";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { session, admin } = await authenticate.admin(request);

  const output = await SettingOutputService.get(session.id);
  console.log(output);

  return json({ output });
};

export default function ManageSizeCreate() {
  const submit = useSubmit();
  const navigation = useNavigation();
  const { output } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  useHandleFlashMessage();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange", 
    defaultValues: {
      zipName: true,
      calculateOutput: true,
      enableSendMailToCustom: true,
      enableSendMailToAdmin: true,
      ouputReceiverMails: '',
      ...output
    },
  });

  const isSubmitting = navigation.state === 'submitting';

  const onSubmit = (data: any) => {
    submit(data, { method: 'POST' });
  };



  return (
    <div>
      <SpacingBackground width="100%" height="auto" margin="10px 0px">
        <Form onSubmit={handleSubmit(onSubmit)} method="POST">
          <SpacingBackground backgroundColor="#F8F9FB">
            <Box paddingInline="300" paddingBlock="1200">
              <Grid gap={{ lg: '30px' }}>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
                  <BlockStack gap="100">
                    <InlineStack gap="300" blockAlign="center">
                      <Text as="strong" fontWeight="bold" variant="bodyMd">
                        Use order id as zip name
                      </Text>
                      <Controller
                        name="zipName"
                        control={control}
                        render={({ field: { value, onChange } }) => (
                          <ReactSwitchCustom checked={value} setChecked={onChange} />
                        )}
                      />
                    </InlineStack>
                    <Text as="span" tone="subdued">
                      Use the command id as the name of the zip file that will
                      contain the uploaded files during customization.
                    </Text>
                  </BlockStack>
                </Grid.Cell>

                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
                  <BlockStack gap="300">
                    <InlineStack gap="600" blockAlign="start">

                      <InlineStack gap="300" blockAlign="center">
                        <Text as="strong" fontWeight="bold" variant="bodyLg">
                          Enable sending mail to customer
                        </Text>
                        <Controller
                          name="enableSendMailToCustom"
                          control={control}
                          render={({ field: { value, onChange } }) => (
                            <ReactSwitchCustom checked={value} setChecked={onChange} />
                          )}
                        />
                      </InlineStack>

                      <InlineStack gap="300" blockAlign="center">
                        <Text as="strong" fontWeight="bold" variant="bodyLg">
                          Enable sending mail to admin
                        </Text>
                        <Controller
                          name="enableSendMailToAdmin"
                          control={control}
                          render={({ field: { value, onChange } }) => (
                            <ReactSwitchCustom checked={value} setChecked={onChange} />
                          )}
                        />
                      </InlineStack>
                    </InlineStack>


                    <Controller
                      name="ouputReceiverMails"
                      control={control}
                      rules={{
                        pattern: {
                          value: /^([\w.-]+@[\w.-]+\.\w{2,},\s*)*([\w.-]+@[\w.-]+\.\w{2,})$/,
                          message: "List of email invalide (separate comma)",
                        },
                      }}
                      render={({ field , fieldState}) => (
                        <TextField
                          label="List of mails to send output"
                          {...field}
                          error= {
                            fieldState.error?.message ||
                            getError(actionData, 'ouputReceiverMails')
                          }
                          autoComplete="off"
                        />
                      )}
                    />
                  </BlockStack>
                </Grid.Cell>
              </Grid>
            </Box>
          </SpacingBackground>

          <Divider borderWidth="100" />

          <SpacingBackground backgroundColor="#F9F9F9">
            <Box paddingInline="300" paddingBlock="300">
              <InlineStack align="end" gap="600">
                <BiSaveBtn isLoading={isSubmitting} title="Save" />
              </InlineStack>
            </Box>
          </SpacingBackground>
        </Form>
      </SpacingBackground>
    </div>
  );
}

const formSchema = z.object({
  calculateOutput: z
    .any()
    .transform(booleanTransform),
  zipName: z.any().transform(booleanTransform),
  enableSendMailToCustom: z.any().transform(booleanTransform),
    enableSendMailToAdmin:z.any().transform(booleanTransform),
  ouputReceiverMails: z.any().transform(stringTransform)
});

export const action = async ({ request }: ActionFunctionArgs) => {
  const { session, admin } = await authenticate.admin(request);
  const formData = await request.formData();

  const submission = parseWithZod(formData, { schema: formSchema });

  if (submission.status !== "success") {
    return json({ status: false, message: null, errors: submission.error });
  }

  let output: OutputType = submission.value as OutputType;
  console.log("out put ", output);
  if (output) {
    let res = await SettingOutputService.update(output, session.id);
    return res
      ? json({
          ...jFlashMessage("Output config  updaping  is completed successful"),
        })
      : json({ ...jFlashMessage("Output   updaping   failed", "error") });
  }
};
