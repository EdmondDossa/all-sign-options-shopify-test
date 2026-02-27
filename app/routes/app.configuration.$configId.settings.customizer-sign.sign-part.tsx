import { Box, Grid, InlineStack, Select, Text, TextField } from "@shopify/polaris";
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
import {
  settingAction,
  settingLoader,
} from "~/custom-action-loader/config-action-loader";
import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import useHandleFlashMessage from "~/hooks/useHandleFlashMessage";
import { z } from "zod";
import { getError } from "~/utils/error-getting";
import { BiSaveBtn } from "~/components/buttons/BiSaveBtn";
import { ReactSwitchCustom } from "~/components/inputs/ReactSwitchCustom";
import { jsonTransform } from "~/utils/transfomerZod";

const settingParams: [string, string] = ["customizerSign", "signPart"];
const formSchema = z.object({
  doublePart: z
    .any()
    .transform(jsonTransform)
    .pipe(
      z.object({
        active: z.boolean(),
        label: z.string(),
        part1: z.string(),
        part2: z.string(),
        enableCopyDesignFromSide: z.boolean(),
        pricing: z
          .object({
            type: z.enum(["additional", "multiplier"]).default("additional"),
            additionalPrice: z.union([z.number(), z.string()]).default(0),
            multiplier: z.union([z.number(), z.string()]).default(1),
          })
          .optional()
          .default({ type: "additional", additionalPrice: 0, multiplier: 1 }),
      }),
    ),
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

  console.log("setting data :", settingData);

  const [formData, setFormData] = useState<any>(
    settingData || {
      doublePart: {
        active: false,
        label: "Switch Face",
        part1: "Face A",
        part2: "Face B",
        enableCopyDesignFromSide: true,
        pricing: {
          type: "additional",
          additionalPrice: 0,
          multiplier: 1,
        },
      },
    },
  );

  const pricingTypeOptions = [
    { label: "Additional price (+)", value: "additional" },
    { label: "Multiplier (×)", value: "multiplier" },
  ];

  const handleInputChange = (inputName: string, value: any) => {
    setFormData((prevData: any) => ({
      ...prevData,
      [inputName]: value,
    }));
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const data = { doublePart: JSON.stringify(formData.doublePart) };

    submit(data, { method: "POST" });
  };

  return (
    <>
      <Form onSubmit={handleFormSubmit} method="POST">
        <SpacingBackground border="1px solid #DDDDDD">
          <BoxBackground>
            <Box paddingInline="300" paddingBlock="1000">
              <Grid gap={{ lg: "25px" }}>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
                  <InlineStack gap="300">
                    <Text as="strong" variant="bodyMd">
                      Enable SIGN Part
                    </Text>
                    <ReactSwitchCustom
                      checked={formData.doublePart.active}
                      setChecked={(value: any) => {
                        formData.doublePart.active = value;
                        handleInputChange("doublePart", formData.doublePart);
                      }}
                    />
                  </InlineStack>
                </Grid.Cell>
                {formData.doublePart.active && (
                  <>
                    <Grid.Cell
                      columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}
                    >
                      <TextField
                        size="medium"
                        label="Label"
                        value={formData.doublePart.label}
                        onChange={(value) => {
                          formData.doublePart.label = value;
                          handleInputChange("doublePart", formData.doublePart);
                        }}
                        error={getError(actionData, "doublePart.label")}
                        autoComplete="off"
                      />
                    </Grid.Cell>
                    <Grid.Cell
                      columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}
                    >
                      <TextField
                        size="medium"
                        label="Part 1"
                        value={formData.doublePart.part1}
                        onChange={(value) => {
                          formData.doublePart.part1 = value;
                          handleInputChange("doublePart", formData.doublePart);
                        }}
                        error={getError(actionData, "doublePart.part1")}
                        autoComplete="off"
                      />
                    </Grid.Cell>
                    <Grid.Cell
                      columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}
                    >
                      <TextField
                        size="medium"
                        label="Part 2"
                        value={formData.doublePart.part2}
                        onChange={(value) => {
                          formData.doublePart.part2 = value;
                          handleInputChange("doublePart", formData.doublePart);
                        }}
                        error={getError(actionData, "doublePart.part2")}
                        autoComplete="off"
                      />
                    </Grid.Cell>

                    <Grid.Cell
                      columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}
                    >
                      <InlineStack gap="300">
                        <Text as="strong" variant="bodyMd">
                          Enable Copy design from side
                        </Text>
                        <ReactSwitchCustom
                          checked={formData.doublePart.enableCopyDesignFromSide}
                          setChecked={(value: any) => {
                            formData.doublePart.enableCopyDesignFromSide =
                              value;
                            handleInputChange(
                              "doublePart",
                              formData.doublePart,
                            );
                          }}
                        />
                      </InlineStack>
                    </Grid.Cell>

                    {/* ── Pricing section ── */}
                    <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
                      <Box paddingBlockStart="400">
                        <Text as="strong" variant="headingMd">
                          Double-sided pricing
                        </Text>
                        <Box paddingBlockStart="200">
                          <Text as="p" tone="subdued">
                            When the customer activates double-sided in the configurator, the selected pricing is applied to the total price.
                          </Text>
                        </Box>
                      </Box>
                    </Grid.Cell>
                    <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 4, xl: 4 }}>
                      <Select
                        label="Pricing type"
                        options={pricingTypeOptions}
                        value={formData.doublePart.pricing?.type || "additional"}
                        onChange={(val) => {
                          if (!formData.doublePart.pricing) formData.doublePart.pricing = { type: "additional", additionalPrice: 0, multiplier: 1 };
                          formData.doublePart.pricing.type = val;
                          handleInputChange("doublePart", formData.doublePart);
                        }}
                      />
                    </Grid.Cell>
                    {(formData.doublePart.pricing?.type === "additional" || !formData.doublePart.pricing?.type) && (
                      <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 4, xl: 4 }}>
                        <TextField
                          label="Additional price for double-sided"
                          autoComplete="off"
                          pattern="[0-9]+([,.][0-9]+)?"
                          prefix="+"
                          value={`${formData.doublePart.pricing?.additionalPrice ?? 0}`}
                          onChange={(val) => {
                            if (!formData.doublePart.pricing) formData.doublePart.pricing = { type: "additional", additionalPrice: 0, multiplier: 1 };
                            formData.doublePart.pricing.additionalPrice = val;
                            handleInputChange("doublePart", formData.doublePart);
                          }}
                          onBlur={() => {
                            if (formData.doublePart.pricing) {
                              formData.doublePart.pricing.additionalPrice = parseFloat(String(formData.doublePart.pricing.additionalPrice)) || 0;
                              handleInputChange("doublePart", formData.doublePart);
                            }
                          }}
                          helpText="This amount is added to the total price when the customer activates double-sided."
                        />
                      </Grid.Cell>
                    )}
                    {formData.doublePart.pricing?.type === "multiplier" && (
                      <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 4, xl: 4 }}>
                        <TextField
                          label="Multiplier for double-sided"
                          autoComplete="off"
                          pattern="[0-9]+([,.][0-9]+)?"
                          prefix="×"
                          value={`${formData.doublePart.pricing?.multiplier ?? 1}`}
                          onChange={(val) => {
                            if (!formData.doublePart.pricing) formData.doublePart.pricing = { type: "multiplier", additionalPrice: 0, multiplier: 1 };
                            formData.doublePart.pricing.multiplier = val;
                            handleInputChange("doublePart", formData.doublePart);
                          }}
                          onBlur={() => {
                            if (formData.doublePart.pricing) {
                              formData.doublePart.pricing.multiplier = parseFloat(String(formData.doublePart.pricing.multiplier)) || 1;
                              handleInputChange("doublePart", formData.doublePart);
                            }
                          }}
                          helpText="The total price is multiplied by this value when the customer activates double-sided."
                        />
                      </Grid.Cell>
                    )}
                  </>
                )}
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
