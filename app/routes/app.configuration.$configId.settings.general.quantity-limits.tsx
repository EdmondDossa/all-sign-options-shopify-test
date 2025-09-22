import {
  Box,
  Card,
  Form,
  FormLayout,
  Grid,
  InlineStack,
  Text,
  TextField,
} from "@shopify/polaris";
import { useState } from "react";
import {
  useActionData,
  useLoaderData,
  useNavigation,
  useSubmit,
} from "@remix-run/react";
import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { SpacingBackground } from "~/components/layouts/SpacingBackground";
import { BoxBackground } from "~/components/layouts/BoxBackground";
import { BiSaveBtn } from "~/components/buttons/BiSaveBtn";
import { ReactSwitchCustom } from "~/components/inputs/ReactSwitchCustom";
import { settingAction, settingLoader } from "~/custom-action-loader/config-action-loader";
import useHandleFlashMessage from "~/hooks/useHandleFlashMessage";
import z from "zod";
import { parseWithZod } from "@conform-to/zod";
import { jsonTransform, stringTransform } from "~/utils/transfomerZod";

const settingParams = ["generals", "quantityLimits"] as [string, string];

const formSchema = z.object({
  enableQuantityLimits: z.preprocess(
    (value) => value === "on" || value === "true",
    z.boolean()
  ),
  minQuantity: z.preprocess(
    (value) => (value === "" ? undefined : value),
    z.number().int().min(1, "Minimum quantity must be at least 1").optional()
  ),
  maxQuantity: z.preprocess(
    (value) => (value === "" ? undefined : value),
    z.number().int().min(1, "Maximum quantity must be at least 1").optional()
  ),
}).refine((data) => {
  if (data.enableQuantityLimits && data.minQuantity && data.maxQuantity && data.minQuantity > data.maxQuantity) {
    return false;
  }
  return true;
}, {
  message: "Minimum quantity cannot be greater than maximum quantity",
  path: ["maxQuantity"],
});

export const loader = async (args: LoaderFunctionArgs) => {
  return await settingLoader(args, settingParams);
};

export const action = async (args: ActionFunctionArgs) => {
  return await settingAction(args, settingParams, formSchema);
};

export default function QuantityLimitsSettings() {
  const submit = useSubmit();
  let { settingData } = useLoaderData<typeof loader>();
  useHandleFlashMessage();
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  let isSubmitting = navigation.state == "submitting";

  const [formData, setFormData] = useState<any>(
    settingData || {
      enableQuantityLimits: false,
      minQuantity: 1,
      maxQuantity: undefined,
    }
  );

  const handleInputChange = (inputName: string, value: any) => {
    setFormData((prevData: any) => ({
      ...prevData,
      [inputName]: value,
    }));
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const data = {
      ...formData,
      enableQuantityLimits: formData.enableQuantityLimits ? "on" : "off",
    };

    submit(data, { method: "POST" });
  };

  return (
    <>
      <Form onSubmit={handleFormSubmit} method="post">
        <SpacingBackground border="1px solid #DDDDDD">
          <BoxBackground>
            <Box paddingInline="300" paddingBlock="1000">
              <Grid gap={{ lg: "10px" }}>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
                  <Card>
                    <Box paddingInline="400" paddingBlock="400">
                      <Text as="h3" variant="headingMd" fontWeight="bold">
                        Quantity Limits Settings
                      </Text>
                      <Box paddingBlockStart="400">
                        <Text as="p" variant="bodyMd" tone="subdued">
                          Configure minimum and maximum quantity limits for this configuration. 
                          When enabled, customers will be restricted to order within these limits.
                        </Text>
                      </Box>
                    </Box>
                  </Card>
                </Grid.Cell>

                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
                  <Card>
                    <Box paddingInline="400" paddingBlock="400">
                      <FormLayout>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                          <Text as="span" variant="bodyMd" fontWeight="medium">
                            Enable quantity limits
                          </Text>
                          <ReactSwitchCustom 
                            checked={formData.enableQuantityLimits} 
                            setChecked={(value: boolean) => handleInputChange("enableQuantityLimits", value)} 
                          />
                        </div>
                        <div style={{ marginBottom: '16px' }}>
                          <Text as="p" variant="bodyMd" tone="subdued">
                            When enabled, customers will be restricted by the quantity limits below
                          </Text>
                        </div>

                        {formData.enableQuantityLimits && (
                          <>
                            <TextField
                              label="Minimum quantity"
                              type="number"
                              value={formData.minQuantity?.toString() || ""}
                              onChange={(value) => handleInputChange("minQuantity", value)}
                              autoComplete="off"
                              min="1"
                              helpText="Minimum quantity that customers can order"
                              error={
                                (actionData as any)?.errors?.minQuantity ? (actionData as any).errors.minQuantity[0] : ""
                              }
                            />

                            <TextField
                              label="Maximum quantity"
                              type="number"
                              value={formData.maxQuantity?.toString() || ""}
                              onChange={(value) => handleInputChange("maxQuantity", value)}
                              autoComplete="off"
                              min="1"
                              helpText="Maximum quantity that customers can order (leave empty for no limit)"
                              error={
                                (actionData as any)?.errors?.maxQuantity ? (actionData as any).errors.maxQuantity[0] : ""
                              }
                            />
                          </>
                        )}
                      </FormLayout>
                    </Box>
                  </Card>
                </Grid.Cell>
              </Grid>
            </Box>
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
