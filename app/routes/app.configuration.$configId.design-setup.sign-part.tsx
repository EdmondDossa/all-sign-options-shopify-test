import { json } from "@remix-run/node";
import type { ActionFunctionArgs } from "@remix-run/node";
import {
  Box,
  Card,
  Grid,
  InlineStack,
  Select,
  Text,
  TextField,
} from "@shopify/polaris";
import { useEffect, useState } from "react";
import { useNavigation, useOutletContext, useSubmit } from "@remix-run/react";
import SaveButton from "~/components/buttons/SaveButton";
import { ToggleButton } from "~/components/buttons";
import ConfigSettingsService from "~/models/ConfigSetttings.service";
import { authenticate } from "~/shopify.server";
import { jFlashMessage } from "~/utils/message-flash";

type SignPartState = {
  doublePart: {
    active: boolean;
    label: string;
    part1: string;
    part2: string;
    enableCopyDesignFromSide: boolean;
    pricing: {
      type: "additional" | "multiplier";
      additionalPrice: number | string;
      multiplier: number | string;
    };
  };
};

const defaultSignPart = (): SignPartState => ({
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
});

function SectionSave({
  loading,
  onClick,
  label,
}: {
  loading: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <Box paddingBlockStart="300">
      <InlineStack align="end">
        <SaveButton loading={loading} onClick={onClick}>
          {label}
        </SaveButton>
      </InlineStack>
    </Box>
  );
}

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const { session } = await authenticate.admin(request);
  const configId = parseInt(params.configId ?? "", 10);

  if (!Number.isFinite(configId)) {
    return json(
      { ...jFlashMessage("Invalid configuration", "error") },
      { status: 400 },
    );
  }

  const formData = await request.formData();
  const rawPayload = String(formData.get("payload") || "");

  if (!rawPayload) {
    return json(
      { ...jFlashMessage("Missing sign part settings payload", "error") },
      { status: 400 },
    );
  }

  let parsed: SignPartState;
  try {
    parsed = JSON.parse(rawPayload);
  } catch {
    return json(
      { ...jFlashMessage("Invalid sign part settings payload", "error") },
      { status: 400 },
    );
  }

  const result = await ConfigSettingsService.updateSettingsSection(
    configId,
    session.id,
    "customizerSign",
    "signPart",
    parsed,
  );

  if (!result) {
    return json(
      { ...jFlashMessage("Unable to update sign part settings", "error") },
      { status: 500 },
    );
  }

  return json({
    ok: true,
    ...jFlashMessage("Sign part settings updated successfully"),
  });
};

export default function ConfigurationDesignSetupSignPart() {
  const { configuration } = useOutletContext<any>();
  const navigation = useNavigation();
  const submit = useSubmit();
  const [signPart, setSignPart] = useState<SignPartState>(defaultSignPart());

  useEffect(() => {
    const section = configuration?.data?.settings?.customizerSign || {};
    setSignPart({
      doublePart: {
        ...defaultSignPart().doublePart,
        ...(section?.signPart?.doublePart || {}),
        pricing: {
          ...defaultSignPart().doublePart.pricing,
          ...(section?.signPart?.doublePart?.pricing || {}),
        },
      },
    });
  }, [configuration]);

  const pricingTypeOptions = [
    { label: "Additional price (+)", value: "additional" },
    { label: "Multiplier (×)", value: "multiplier" },
  ];

  const submitSection = () => {
    const formData = new FormData();
    formData.append("payload", JSON.stringify(signPart));
    submit(formData, { method: "POST" });
  };

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <Card>
        <Box padding="400">
          <Text as="h1" variant="headingLg">
            Sign Part
          </Text>
          <Box paddingBlockStart="100">
            <Text as="p" tone="subdued">
              Configure double-sided sign behavior from Editor Setup while
              keeping the classic save location unchanged.
            </Text>
          </Box>
        </Box>
      </Card>

      <Card>
        <Box padding="300">
          <Text as="h2" variant="headingMd">
            Sign Part
          </Text>
          <Box paddingBlockStart="100">
            <Text as="p" tone="subdued">
              Enable double-sided setup and define its pricing behavior.
            </Text>
          </Box>

          <Box paddingBlockStart="300">
            <Grid gap={{ lg: "25px" }}>
              <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
                <InlineStack gap="300">
                  <Text as="strong" variant="bodyMd">
                    Enable SIGN Part
                  </Text>
                  <ToggleButton
                    checked={signPart.doublePart.active}
                    onChange={(value) =>
                      setSignPart((current) => ({
                        ...current,
                        doublePart: {
                          ...current.doublePart,
                          active: Boolean(value),
                        },
                      }))
                    }
                  />
                </InlineStack>
              </Grid.Cell>

              {signPart.doublePart.active ? (
                <>
                  <Grid.Cell
                    columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}
                  >
                    <TextField
                      label="Label"
                      autoComplete="off"
                      value={signPart.doublePart.label}
                      onChange={(value) =>
                        setSignPart((current) => ({
                          ...current,
                          doublePart: { ...current.doublePart, label: value },
                        }))
                      }
                    />
                  </Grid.Cell>
                  <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
                    <TextField
                      label="Part 1"
                      autoComplete="off"
                      value={signPart.doublePart.part1}
                      onChange={(value) =>
                        setSignPart((current) => ({
                          ...current,
                          doublePart: { ...current.doublePart, part1: value },
                        }))
                      }
                    />
                  </Grid.Cell>
                  <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
                    <TextField
                      label="Part 2"
                      autoComplete="off"
                      value={signPart.doublePart.part2}
                      onChange={(value) =>
                        setSignPart((current) => ({
                          ...current,
                          doublePart: { ...current.doublePart, part2: value },
                        }))
                      }
                    />
                  </Grid.Cell>
                  <Grid.Cell
                    columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}
                  >
                    <InlineStack gap="300">
                      <Text as="strong" variant="bodyMd">
                        Enable Copy design from side
                      </Text>
                      <ToggleButton
                        checked={signPart.doublePart.enableCopyDesignFromSide}
                        onChange={(value) =>
                          setSignPart((current) => ({
                            ...current,
                            doublePart: {
                              ...current.doublePart,
                              enableCopyDesignFromSide: Boolean(value),
                            },
                          }))
                        }
                      />
                    </InlineStack>
                  </Grid.Cell>
                  <Grid.Cell
                    columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}
                  >
                    <Box paddingBlockStart="400">
                      <Text as="strong" variant="headingMd">
                        Double-sided pricing
                      </Text>
                      <Box paddingBlockStart="200">
                        <Text as="p" tone="subdued">
                          When the customer activates double-sided in the
                          configurator, the selected pricing is applied to the
                          total price.
                        </Text>
                      </Box>
                    </Box>
                  </Grid.Cell>
                  <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 4, xl: 4 }}>
                    <Select
                      label="Pricing type"
                      options={pricingTypeOptions}
                      value={signPart.doublePart.pricing?.type || "additional"}
                      onChange={(value) =>
                        setSignPart((current) => ({
                          ...current,
                          doublePart: {
                            ...current.doublePart,
                            pricing: {
                              ...current.doublePart.pricing,
                              type: value as "additional" | "multiplier",
                            },
                          },
                        }))
                      }
                    />
                  </Grid.Cell>
                  {signPart.doublePart.pricing?.type === "additional" ? (
                    <Grid.Cell
                      columnSpan={{ xs: 6, sm: 6, md: 3, lg: 4, xl: 4 }}
                    >
                      <TextField
                        label="Additional price for double-sided"
                        autoComplete="off"
                        pattern="[0-9]+([,.][0-9]+)?"
                        prefix="+"
                        value={`${signPart.doublePart.pricing?.additionalPrice ?? 0}`}
                        onChange={(value) =>
                          setSignPart((current) => ({
                            ...current,
                            doublePart: {
                              ...current.doublePart,
                              pricing: {
                                ...current.doublePart.pricing,
                                additionalPrice: value,
                              },
                            },
                          }))
                        }
                        helpText="This amount is added to the total price when the customer activates double-sided."
                      />
                    </Grid.Cell>
                  ) : null}
                  {signPart.doublePart.pricing?.type === "multiplier" ? (
                    <Grid.Cell
                      columnSpan={{ xs: 6, sm: 6, md: 3, lg: 4, xl: 4 }}
                    >
                      <TextField
                        label="Multiplier for double-sided"
                        autoComplete="off"
                        pattern="[0-9]+([,.][0-9]+)?"
                        prefix="×"
                        value={`${signPart.doublePart.pricing?.multiplier ?? 1}`}
                        onChange={(value) =>
                          setSignPart((current) => ({
                            ...current,
                            doublePart: {
                              ...current.doublePart,
                              pricing: {
                                ...current.doublePart.pricing,
                                multiplier: value,
                              },
                            },
                          }))
                        }
                        helpText="The total price is multiplied by this value when the customer activates double-sided."
                      />
                    </Grid.Cell>
                  ) : null}
                </>
              ) : null}
            </Grid>
          </Box>

          <SectionSave
            loading={navigation.state === "submitting"}
            onClick={submitSection}
            label="Save Sign Part"
          />
        </Box>
      </Card>
    </div>
  );
}
