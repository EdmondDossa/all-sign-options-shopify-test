import {
  Bleed,
  BlockStack,
  Box,
  Card,
  Divider,
  Grid,
  InlineStack,
  Text,
  TextField,
} from "@shopify/polaris";
import { useState, useEffect } from "react";
import { useFetcher, useParams } from "@remix-run/react";
import { BoxBackground } from "~/components/layouts/BoxBackground";
import { SpacingBackground } from "~/components/layouts/SpacingBackground";
import RayStartArrowIcon from "~/components/icons/RayStartArrowIcon";
import { ConfigColor } from "~/types/ConfigDataType";
import { BiSaveBtn } from "~/components/buttons/BiSaveBtn";
import { RemoveNowIconBtn } from "~/components/buttons/RemoveNowIconBtn";
import { FileInput } from "~/components/inputs/FileInput";
import { TextColorField } from "~/components/inputs/TextColorField";
import { ReactSwitchCustom } from "~/components/inputs/ReactSwitchCustom";
import { ToggleButton } from "~/components/buttons/ToggleButton";

interface MaterialColorProps {
  colors: ConfigColor[];
  id: number;
  onClick: (id: boolean) => void;
  edit: boolean;
  materialId: number | undefined;
  onUpdateColors: (updatedColors: ConfigColor[]) => void;
}

export default function MaterialColorCreate({
  colors,
  id,
  onClick,
  edit,
  materialId,
  onUpdateColors,
}: MaterialColorProps) {
  const fetcher = useFetcher<any>();
  const params = useParams();
  const configId = params.configId;
  const mId = params.mId;

  const isSubmitting = fetcher.state === "submitting";

  const configColor = edit
    ? colors?.find((_, index) => index === id)
    : undefined;

  const [formData, setFormData] = useState<ConfigColor>(
    configColor || {
      additionalPrice: 0,
      isDefault: !colors || colors.length === 0,
      name: "",
      textColor: {
        active: false,
        sameForBorder: false,
        codeHex: "#000000",
        name: "",
      },
      pattern: {
        active: false,
        codeHex: "#000000",
        url: "",
      },
      prevImg: "",
    },
  );

  const [openIndex, setOpenIndex] = useState(new Set([0]));

  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data && fetcher.data.success) {
      // La mise à jour a réussi, on met à jour l'état parent et on ferme le formulaire
      onUpdateColors(fetcher.data.data);
      onClick(false);
    }
    // Gérer les erreurs si nécessaire
    if (fetcher.state === "idle" && fetcher.data && !fetcher.data.success) {
      console.error("Failed to update color:", fetcher.data.error);
      // Afficher un message d'erreur à l'utilisateur
    }
  }, [fetcher.state, fetcher.data, onUpdateColors, onClick]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload: any = {
      operation: edit ? "update" : "add",
      configId: configId,
      materialId: materialId,
      colorData: formData,
    };

    if (edit) {
      payload.colorId = id;
    }

    fetcher.submit(payload, {
      method: "POST",
      action: "/api/color-manager",
      encType: "application/json",
    });
  };

  return (
    <div>
      <div style={{ width: "100%", height: "auto", margin: "0px 0px " }}>
        <Card>
          <fetcher.Form onSubmit={handleSubmit} method="POST">
            <Box paddingInline="300" paddingBlock="1000">
              <Grid gap={{ lg: "30px" }}>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
                  <Divider borderWidth="100" />
                  <Divider borderWidth="100" />
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
                  <BlockStack>
                    <Bleed marginBlockEnd="400">
                      <InlineStack wrap={false} align="end" gap="200">
                        <RemoveNowIconBtn onClick={() => onClick(false)} />
                        <ToggleButton
                          buttonProps={{
                            onClick: () => {
                              openIndex.has(0)
                                ? openIndex.delete(0)
                                : openIndex.add(0);
                              setOpenIndex(new Set([...openIndex]));
                            },
                          }}
                          open={openIndex.has(0)}
                        />
                      </InlineStack>
                    </Bleed>
                    <Box width="100%">
                      <Grid>
                        <Grid.Cell
                          columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}
                        >
                          <TextField
                            label="Name"
                            value={formData.name}
                            onChange={(value) => {
                              setFormData({ ...formData, name: value });
                            }}
                            autoComplete="off"
                          />
                        </Grid.Cell>
                        <Grid.Cell
                          columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}
                        >
                          <FileInput
                            title="Preview Image"
                            path={formData.prevImg || ""}
                            handlePath={(value: string) => {
                              setFormData({ ...formData, prevImg: value });
                            }}
                          />
                        </Grid.Cell>
                        {openIndex.has(0) && (
                          <>
                            <Grid.Cell
                              columnSpan={{
                                xs: 6,
                                sm: 6,
                                md: 6,
                                lg: 6,
                                xl: 6,
                              }}
                            >
                              <InlineStack blockAlign="center" gap="200">
                                <Text as="strong" variant="headingMd">
                                  Use pattern color
                                </Text>
                                <ReactSwitchCustom
                                  checked={formData.pattern.active}
                                  setChecked={(value: boolean) => {
                                    setFormData({
                                      ...formData,
                                      pattern: {
                                        ...formData.pattern,
                                        active: value,
                                      },
                                    });
                                  }}
                                />
                              </InlineStack>
                            </Grid.Cell>
                            <Grid.Cell
                              columnSpan={{
                                xs: 6,
                                sm: 6,
                                md: 6,
                                lg: 6,
                                xl: 6,
                              }}
                            >
                              {!formData.pattern.active ? (
                                <TextColorField
                                  label="Material Background Color"
                                  color={formData.pattern.codeHex || ""}
                                  setColor={(value: string) => {
                                    setFormData({
                                      ...formData,
                                      pattern: {
                                        ...formData.pattern,
                                        codeHex: value,
                                      },
                                    });
                                  }}
                                />
                              ) : (
                                <FileInput
                                  title="Pattern Image"
                                  path={formData.pattern.url || ""}
                                  handlePath={(value: string) => {
                                    setFormData({
                                      ...formData,
                                      pattern: {
                                        ...formData.pattern,
                                        url: value,
                                      },
                                    });
                                  }}
                                />
                              )}
                            </Grid.Cell>
                            <Grid.Cell
                              columnSpan={{
                                xs: 6,
                                sm: 6,
                                md: 6,
                                lg: 6,
                                xl: 6,
                              }}
                            >
                              <InlineStack blockAlign="center" gap="200">
                                <Text as="strong" variant="headingMd">
                                  Enable text color
                                </Text>
                                <ReactSwitchCustom
                                  checked={formData.textColor.active}
                                  setChecked={(value: boolean) => {
                                    setFormData({
                                      ...formData,
                                      textColor: {
                                        ...formData.textColor,
                                        active: value,
                                      },
                                    });
                                  }}
                                />
                              </InlineStack>
                            </Grid.Cell>
                            <Grid.Cell
                              columnSpan={{
                                xs: 6,
                                sm: 6,
                                md: 6,
                                lg: 6,
                                xl: 6,
                              }}
                            >
                              <InlineStack blockAlign="center" gap="200">
                                <Text as="strong" variant="headingMd">
                                  Use the same color for border
                                </Text>
                                <ReactSwitchCustom
                                  checked={formData.textColor.sameForBorder}
                                  setChecked={(value: boolean) => {
                                    setFormData({
                                      ...formData,
                                      textColor: {
                                        ...formData.textColor,
                                        sameForBorder: value,
                                      },
                                    });
                                  }}
                                />
                              </InlineStack>
                            </Grid.Cell>
                            {formData.textColor.active && (
                              <>
                                <Grid.Cell
                                  columnSpan={{
                                    xs: 6,
                                    sm: 6,
                                    md: 6,
                                    lg: 6,
                                    xl: 6,
                                  }}
                                >
                                  <TextField
                                    label="Text Color Name"
                                    value={formData.textColor.name || ""}
                                    onChange={(value) => {
                                      setFormData({
                                        ...formData,
                                        textColor: {
                                          ...formData.textColor,
                                          name: value,
                                        },
                                      });
                                    }}
                                    autoComplete="off"
                                  />
                                </Grid.Cell>
                                <Grid.Cell
                                  columnSpan={{
                                    xs: 6,
                                    sm: 6,
                                    md: 6,
                                    lg: 6,
                                    xl: 6,
                                  }}
                                >
                                  <TextColorField
                                    label="Text Color"
                                    color={formData.textColor.codeHex || ""}
                                    setColor={(value: string) => {
                                      setFormData({
                                        ...formData,
                                        textColor: {
                                          ...formData.textColor,
                                          codeHex: value,
                                        },
                                      });
                                    }}
                                  />
                                </Grid.Cell>
                              </>
                            )}
                            <Grid.Cell
                              columnSpan={{
                                xs: 6,
                                sm: 6,
                                md: 6,
                                lg: 12,
                                xl: 12,
                              }}
                            >
                              <TextField
                                label="Additional price"
                                type="number"
                                value={`${formData.additionalPrice}`}
                                onChange={(value) => {
                                  setFormData({
                                    ...formData,
                                    additionalPrice: parseFloat(value) || 0,
                                  });
                                }}
                                autoComplete="off"
                              />
                            </Grid.Cell>
                          </>
                        )}
                      </Grid>
                    </Box>
                  </BlockStack>
                </Grid.Cell>
              </Grid>
            </Box>
            <Divider borderWidth="050" />
            <Box paddingInline="300" paddingBlock="300">
              <InlineStack align="end" gap="600">
                <button
                  className="back-large-btn"
                  type="button"
                  onClick={() => onClick(false)}
                >
                  <Box paddingInline="1000">
                    <InlineStack gap="300">
                      <RayStartArrowIcon />{" "}
                      <span style={{ color: "black", fontWeight: "bold" }}>
                        {" "}
                        Back
                      </span>
                    </InlineStack>
                  </Box>
                </button>
                <BiSaveBtn isLoading={isSubmitting} title="Save" />
              </InlineStack>
            </Box>
          </fetcher.Form>
        </Card>
      </div>
    </div>
  );
}
