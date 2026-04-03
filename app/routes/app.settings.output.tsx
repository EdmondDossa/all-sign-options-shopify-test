import {
  BlockStack,
  Box,
  Card,
  Grid,
  InlineStack,
  Text,
  TextField
} from "@shopify/polaris";

import {
  Form,
  useActionData,
  useLoaderData,
  useNavigation,
  useSubmit,
} from "@remix-run/react";
import { authenticate } from "~/shopify.server";
import { json } from "@remix-run/node";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import SettingOutputService from "~/models/SettingOutput.service";
import type { OutputType } from "~/types/SettingsType";
import useHandleFlashMessage from "~/hooks/useHandleFlashMessage";
import { z } from "zod";
import { parseWithZod } from "@conform-to/zod";
import { jFlashMessage } from "~/utils/message-flash";
import { SaveButton, ToggleButton } from "~/components/buttons";
import { useForm, Controller } from "react-hook-form"
import { getError } from "~/utils/error-getting";
import { booleanTransform, stringTransform } from "~/utils/transfomerZod";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { session } = await authenticate.admin(request);

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
    <div style={{ display: "grid", gap: 12, margin: "10px 0" }}>
      <Card>
        <Box padding="300">
          <Text as="h2" variant="headingLg">
            Output
          </Text>
          <Box paddingBlockStart="100">
            <Text as="p" tone="subdued">
              Configure exported file naming and output notification emails.
            </Text>
          </Box>
        </Box>
      </Card>

      <Form onSubmit={handleSubmit(onSubmit)} method="POST">
        <div style={{ display: "grid", gap: 12 }}>
          <Card>
            <Box padding="300">
              <BlockStack gap="300">
                <Text as="h3" variant="headingMd">
                  File Naming
                </Text>
                <Grid gap={{ lg: "30px" }}>
                  <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
                    <BlockStack gap="150">
                      <InlineStack gap="300" blockAlign="center">
                        <Text as="strong" variant="bodyMd">
                          Use order id as zip name
                        </Text>
                        <Text as="span" tone="subdued">
                          No
                        </Text>
                        <Controller
                          name="zipName"
                          control={control}
                          render={({ field: { value, onChange } }) => (
                            <ToggleButton checked={Boolean(value)} onChange={(next) => onChange(Boolean(next))} />
                          )}
                        />
                        <Text as="span" tone="subdued">
                          Yes
                        </Text>
                      </InlineStack>
                      <Text as="span" tone="subdued">
                        Use the order id as the zip filename for uploaded customization assets.
                      </Text>
                    </BlockStack>
                  </Grid.Cell>
                </Grid>
              </BlockStack>
            </Box>
          </Card>

          <Card>
            <Box padding="300">
              <BlockStack gap="300">
                <Text as="h3" variant="headingMd">
                  Notifications
                </Text>
                <Grid gap={{ lg: "30px" }}>
                  <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
                    <InlineStack gap="600" blockAlign="center">
                      <InlineStack gap="300" blockAlign="center">
                        <Text as="strong" variant="bodyMd">
                          Send email to customer
                        </Text>
                        <Text as="span" tone="subdued">
                          No
                        </Text>
                        <Controller
                          name="enableSendMailToCustom"
                          control={control}
                          render={({ field: { value, onChange } }) => (
                            <ToggleButton checked={Boolean(value)} onChange={(next) => onChange(Boolean(next))} />
                          )}
                        />
                        <Text as="span" tone="subdued">
                          Yes
                        </Text>
                      </InlineStack>

                      <InlineStack gap="300" blockAlign="center">
                        <Text as="strong" variant="bodyMd">
                          Send email to admin
                        </Text>
                        <Text as="span" tone="subdued">
                          No
                        </Text>
                        <Controller
                          name="enableSendMailToAdmin"
                          control={control}
                          render={({ field: { value, onChange } }) => (
                            <ToggleButton checked={Boolean(value)} onChange={(next) => onChange(Boolean(next))} />
                          )}
                        />
                        <Text as="span" tone="subdued">
                          Yes
                        </Text>
                      </InlineStack>
                    </InlineStack>
                  </Grid.Cell>

                  <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
                    <Controller
                      name="ouputReceiverMails"
                      control={control}
                      rules={{
                        pattern: {
                          value: /^([\w.-]+@[\w.-]+\.\w{2,},\s*)*([\w.-]+@[\w.-]+\.\w{2,})$/,
                          message: "List of email invalide (separate comma)",
                        },
                      }}
                      render={({ field, fieldState }) => (
                        <TextField
                          label="Admin recipient emails"
                          {...field}
                          error={fieldState.error?.message || getError(actionData, "ouputReceiverMails")}
                          autoComplete="off"
                          helpText="Separate multiple emails with commas."
                        />
                      )}
                    />
                  </Grid.Cell>
                </Grid>
              </BlockStack>
            </Box>
          </Card>

          <Box>
            <InlineStack align="end">
              <SaveButton submit loading={isSubmitting}>
                Save Output
              </SaveButton>
            </InlineStack>
          </Box>
        </div>
      </Form>
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
  const { session } = await authenticate.admin(request);
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
          ...jFlashMessage("Output config updating is completed successfully"),
        })
      : json({ ...jFlashMessage("Output updating failed", "error") });
  }
};
