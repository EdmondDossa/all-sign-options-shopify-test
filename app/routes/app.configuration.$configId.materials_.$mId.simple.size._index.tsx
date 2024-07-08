import {
  Badge,
  Bleed,
  BlockStack,
  Box,
  ButtonGroup,
  Divider,
  Grid,
  IndexTable,
  InlineError,
  InlineStack,
  Text,
  TextField,
  useIndexResourceState,
} from "@shopify/polaris";
import { useEffect, useState } from "react";
import { DeleteIconBtn } from "~/components/buttons/DeleteIconBtn";
import { EditIconBtn } from "~/components/buttons/EditIconBtn";
import {
  Form,
  useActionData,
  useNavigate,
  useNavigation,
  useOutletContext,
  useSubmit,
} from "@remix-run/react";
import { BoxBackground } from "~/components/layouts/BoxBackground";
import PlusIcon from "~/components/icons/PlusIcon";
import { SpacingBackground } from "~/components/layouts/SpacingBackground";
import {
  ConfigCustomSize,
  ConfigSize,
  configSizeThickness,
} from "~/types/ConfigDataType";
import useHandleFlashMessage from "~/hooks/useHandleFlashMessage";
import { getError } from "~/utils/error-getting";
import { ReactSwitchCustom } from "~/components/inputs/ReactSwitchCustom";
import { ActionFunctionArgs, json, redirect } from "@remix-run/node";
import { authenticate } from "~/shopify.server";
import { z } from "zod";
import { parseWithZod } from "@conform-to/zod";
import MaterialSizeService from "~/models/MateriaSizeService.service";
import { jFlashMessage } from "~/utils/message-flash";
import { BiSaveBtn } from "~/components/buttons/BiSaveBtn";
import { BiAddBtn } from "~/components/buttons/BiAddBtn";
import { jsonTransform } from "~/utils/transfomerZod";
import { RemoveNowIconBtn } from "~/components/buttons/RemoveNowIconBtn";
import { ConfigurationType } from "~/types/ConfigurationType";
import { PRICING_PLANS } from "~/utils/pricing";

export default function MaterialSizeIndex() {
  const submit = useSubmit();
  let { customSize, allSizes, thickness , configuration, plan } = useOutletContext<{
    customSize: ConfigCustomSize;
    allSizes: ConfigSize[];
    thickness: configSizeThickness;
    configuration: ConfigurationType;
    plan: string;
  }>();

  useHandleFlashMessage();

  const actionData = useActionData<typeof action>();

  const navigation = useNavigation();
  let isLoading = navigation.state == "loading";
  let isSubmitting = navigation.state == "submitting";

  const navigate = useNavigate();

  const handeleDelete = (id: number) => {
    submit({ id: id }, { method: "DELETE" });
  };

  const handeleDefault = (id: number) => {
    allSizes = allSizes.map((curr, index) => {
      if (index === id) {
        curr.isDefault = true;
      } else {
        curr.isDefault = false;
      }
      return curr;
    });

    submit({ id: id }, { method: "PUT" });
  };

  const handleUpdate = (id: number) => {
    submit({ id: id }, { method: "GET", action: "edit" });
  };

  const handleEdit = () => {
    navigate("edit");
  };

  const [formData, setFormData] = useState<{
    thickness: configSizeThickness;
    customSize: ConfigCustomSize;
  }>({
    thickness: thickness || {
      active: false,
      values: [],
    },
    customSize: customSize?.pricings
      ? customSize
      : {
          active: false,
          width: {
            label: "Custom width",
            min: 0,
            max: 0,
          },
          height: {
            label: "Custom height",
            min: 0,
            max: 0,
          },
          pricings: []
        },
  });





  useEffect(() => {
    if (plan == PRICING_PLANS.STARTER) {
      formData.customSize.active = false;
      setFormData({
          ...formData
      })
    }
  }, [])

  const handleInputChange = (inputName: string, value: any) => {
    setFormData((prevData: any) => ({
      ...prevData,
      [inputName]: value,
    }));
  };

  const handleAddThickness = () => {
    if (!formData.thickness.values) {
      formData.thickness.values = [];
    }
    formData.thickness.values.push(0);

    setFormData({ ...formData });
  };

  let [pricingErrors, setPricingErrors] = useState<
    Array<{ id: number; message: string }>
  >([]);



  const handleDeleteThickness = (index: number) => {
    formData.thickness.values.splice(index, 1);
    setFormData({ ...formData });
  };

  const handleAddPricing = () => {
    if (!formData.customSize?.pricings) {
      formData.customSize.pricings = [];
    }
    formData.customSize.pricings.push({
      basePrice: 0,
      surface: 0,
      charPrice: 0,
    });

    setFormData({ ...formData });
  };

  const handleDeletePricing = (index: number) => {
    formData.customSize.pricings.splice(index, 1);
    setFormData({ ...formData });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    pricingErrors = [];
    formData.customSize.pricings.forEach((pricing, index) => {
      if (
        Math.max(
          parseFloat(`${formData.customSize.height.min}`),
          parseFloat(`${formData.customSize.width.min}`)
        ) > parseFloat(`${pricing.surface}`)
      ) {
        pricingErrors.push({
          id: index,
          message:
            "The  surface  must be greater than the minimum  width   and height ",
        });
      } else if (
        Math.max(
          parseFloat(`${formData.customSize.height.max}`),
          parseFloat(`${formData.customSize.width.max}`)
        ) < parseFloat(`${pricing.surface}`)
      ) {
        pricingErrors.push({
          id: index,
          message: "The surface must be less than the maximum width and height",
        });
      } else if (
        index > 0 &&
        parseFloat(`${formData.customSize.pricings[index - 1].surface}`) >=
          parseFloat(`${pricing.surface}`)
      ) {
        pricingErrors.push({
          id: index,
          message: "The surface must be greater than the surface above",
        });
      } else if (pricingErrors.find((curr) => curr.id == index)) {
        pricingErrors = pricingErrors.filter((curr: any) => curr.id !== index);
      }
      setPricingErrors([...pricingErrors]);
    
    });

    if (pricingErrors.length > 0) {
      return;
    }

    

    submit(
      {
        thickness: JSON.stringify(formData.thickness),
        customSize: JSON.stringify(formData.customSize),
      },
      { method: "POST" },
    );
  };

  const sizes = allSizes?.map((currSize, index) => {
    return {
      id: `${index}`,
      title: currSize?.label,
      width: `${currSize?.width}`,
      height: `${currSize?.height}`,
      price: `${currSize?.basePrice}`,
      isDefault: currSize?.isDefault,
    };
  });

  const resourceName = {
    singular: "Size",
    plural: "sizes",
  };
  const { selectedResources, allResourcesSelected, handleSelectionChange } =
    useIndexResourceState(sizes);
  const rowMarkup = sizes?.map(
    ({ id, title, width, height, price, isDefault }, index) => (
      <IndexTable.Row id={id} key={id} position={index}>
        <IndexTable.Cell>
          <InlineStack blockAlign="start" gap="300">
            {title}
          </InlineStack>
        </IndexTable.Cell>
        <IndexTable.Cell className="td-center">
          <Badge tone="success">{width}</Badge>
        </IndexTable.Cell>
        <IndexTable.Cell className="td-center">
          <Badge tone="critical">{height}</Badge>
        </IndexTable.Cell>

        <IndexTable.Cell className="td-center">
          <Badge tone="critical">{price}</Badge>
        </IndexTable.Cell>
        <IndexTable.Cell className="td-center">
          <ReactSwitchCustom
            checked={isDefault || false}
            setChecked={() => (isDefault ? "" : handeleDefault(index))}
          ></ReactSwitchCustom>
        </IndexTable.Cell>

        <IndexTable.Cell className="td-center">
          <ButtonGroup fullWidth={true} noWrap gap="loose">
            <EditIconBtn
              size="micro"
              onClick={() => {
                handleUpdate(index);
              }}
            />
            <DeleteIconBtn
              size="micro"
              onClick={() => {
                handeleDelete(index);
              }}
            />
          </ButtonGroup>
        </IndexTable.Cell>
      </IndexTable.Row>
    ),
  );
  return (
    <div>
      <BoxBackground>
        <BoxBackground>
          <Box padding="150">
            <InlineStack gap="100" align="end">
             {!(plan == PRICING_PLANS.STARTER && allSizes.length>=10) && <button
                className="primary-btn"
                type="button"
                onClick={handleEdit}
              >
                <Box paddingInline="300">
                  <InlineStack gap="300">
                    <PlusIcon />
                    <span className="primary-btn-text"> Add new SIZE</span>
                  </InlineStack>
                </Box>
              </button>}
            </InlineStack>
          </Box>
          <Divider borderWidth="050" />
        </BoxBackground>
        <IndexTable
          resourceName={resourceName}
          itemCount={sizes ? sizes.length : 0}
          headings={[
            { title: "Title" },
            { title: "Width", alignment: "center" },
            { title: "Height", alignment: "center" },
            { title: "price", alignment: "center" },
            { title: "Default", alignment: "center" },
            { title: "Action", alignment: "center" },
          ]}
          selectable={false}
        >
          {rowMarkup}
        </IndexTable>
      </BoxBackground>

      <SpacingBackground width="100%" height="auto" margin="16px 0px ">
        <BoxBackground>
          <Form onSubmit={handleSubmit} method="POST">
            <Box paddingInline="300" paddingBlock="1000">
              <Box paddingBlockEnd="600">
                <InlineStack blockAlign="center" gap="200">
                  <Text as="strong" variant="headingMd">
                    Enable Thickness
                  </Text>
                  <ReactSwitchCustom
                    checked={formData.thickness.active}
                    setChecked={(value: boolean) => {
                      formData.thickness.active = value;
                      handleInputChange("thickness", formData.thickness);
                    }}
                  />
                </InlineStack>
              </Box>
              {formData.thickness.active && (
                <BlockStack gap="300">
                  <Grid gap={{ lg: "30px" }}>
                    {formData.thickness.values?.map(
                      (thicknessValue: any, index: number) => (
                        <Grid.Cell
                          columnSpan={{ xs: 3, sm: 3, md: 3, lg: 3, xl: 3 }}
                        >
                          <InlineStack
                            gap={"100"}
                            blockAlign="center"
                            wrap={false}
                          >
                            <TextField
                              labelHidden
                              type="number"
                              autoComplete="off"
                              onChange={(value) => {
                                formData.thickness.values[index] = value;
                                handleInputChange(
                                  "thickness",
                                  formData.thickness,
                                );
                              }}
                              onBlur={(value) => {
                                formData.thickness.values[index] = parseFloat(
                                  formData.thickness.values[index],
                                );
                                handleInputChange(
                                  "thickness",
                                  formData.thickness,
                                );
                              }}
                              label="Value"
                              value={`${thicknessValue}`}
                            />
                            <RemoveNowIconBtn
                              onClick={() => handleDeleteThickness(index)}
                            />
                          </InlineStack>
                        </Grid.Cell>
                      ),
                    )}
                  </Grid>
                  <Box width="300px">
                    <BiAddBtn
                      title="Add Thickness"
                      handleClick={() => handleAddThickness()}
                    />
                  </Box>
                </BlockStack>
              )}
            </Box>
            {plan == PRICING_PLANS.STARTER || <><Divider borderWidth="050" />
            <Box paddingInline="300" paddingBlock="1000">
              <Box paddingBlockEnd="600">
                <InlineStack blockAlign="center" gap="200">
                  <Text as="strong" variant="headingMd">
                    Custum Size
                  </Text>
                  <ReactSwitchCustom
                    checked={formData.customSize.active}
                    setChecked={(value: boolean) => {
                      formData.customSize.active = value;
                      handleInputChange("customSize", formData.customSize);
                    }}
                  />
                </InlineStack>
              </Box>
              {formData.customSize.active && (
                <Grid gap={{ lg: "30px" }}>
                  <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
                    <BlockStack gap="800">
                      <TextField
                        label="Width label"
                        value={`${formData.customSize.width.label}`}
                        onChange={(value) => {
                          formData.customSize.width.label = value;
                          handleInputChange("customSize", formData.customSize);
                        }}
                        autoComplete="on"
                        error={getError(actionData, "customSize.width.label")}
                      />
                      <TextField
                        size="medium"
                        label="Min width"
                        type="number"
                        value={`${formData.customSize.width.min}`}
                        onChange={(value) => {
                          formData.customSize.width.min = value;
                          handleInputChange("customSize", formData.customSize);
                        }}
                        onBlur={(value) => {
                          formData.customSize.width.min = parseFloat(
                            `${formData.customSize.width.min}`,
                          );
                          handleInputChange("customSize", formData.customSize);
                        }}
                        autoComplete="on"
                        error={getError(actionData, "customSize.width.min")}
                      />
                      <TextField
                        size="medium"
                        label="Max width"
                        type="number"
                        value={`${formData.customSize.width.max}`}
                        onChange={(value) => {
                          formData.customSize.width.max = value;
                          handleInputChange("customSize", formData.customSize);
                        }}
                        onBlur={(value) => {
                          formData.customSize.width.max = parseFloat(
                            `${formData.customSize.width.max}`,
                          );
                          handleInputChange("customSize", formData.customSize);
                        }}
                        autoComplete="on"
                        error={getError(actionData, "customSize.width.max")}
                      />
                    </BlockStack>
                  </Grid.Cell>
                  <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
                    <BlockStack gap="800">
                      <TextField
                        label="Height label"
                        value={`${formData.customSize.height.label}`}
                        onChange={(value) => {
                          formData.customSize.height.label = value;
                          handleInputChange("customSize", formData.customSize);
                        }}
                        autoComplete="on"
                        error={getError(actionData, "customSize.height.label")}
                      />

                      <TextField
                        size="medium"
                        label="Min height"
                        type="number"
                        value={`${formData.customSize.height.min}`}
                        onChange={(value) => {
                          formData.customSize.height.min = value;
                          handleInputChange("customSize", formData.customSize);
                        }}
                        onBlur={(value) => {
                          formData.customSize.height.min = parseFloat(
                            `${formData.customSize.height.min}`,
                          );
                          handleInputChange("customSize", formData.customSize);
                        }}
                        autoComplete="on"
                        error={getError(actionData, "customSize.height.min")}
                      />
                      <TextField
                        size="medium"
                        label="Max height"
                        type="number"
                        value={`${formData.customSize.height.max}`}
                        onChange={(value) => {
                          formData.customSize.height.max = value;
                          handleInputChange("customSize", formData.customSize);
                        }}
                        onBlur={(value) => {
                          formData.customSize.height.max = parseFloat(
                            `${formData.customSize.height.max}`,
                          );
                          handleInputChange("customSize", formData.customSize);
                        }}
                        autoComplete="on"
                        error={getError(actionData, "customSize.height.max")}
                      />
                    </BlockStack>
                  </Grid.Cell>
                  <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
                    <BlockStack gap="200">
                    <Text as="h1" variant="headingMd" fontWeight="bold">
                      Pricings
                    </Text>
                    <Grid gap={{ lg: "10px" }}>
                      {formData.customSize.pricings?.map(
                        (pricing: any, index: number) => (
                          <Grid.Cell
                            columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}
                          >
                            <BlockStack>
                              <Bleed marginBlockEnd="400">
                                <InlineStack wrap={false} align="end" gap="200">
                                  <RemoveNowIconBtn
                                    onClick={() => handleDeletePricing(index)}
                                  />
                                </InlineStack>
                              </Bleed>

                              <Grid>
                                <Grid.Cell
                                  columnSpan={{
                                    xs: 6,
                                    sm: 6,
                                    md: 2,
                                    lg: 4,
                                    xl: 4,
                                  }}
                                >
                                  <TextField
                                    label="Surface"
                                    type="number"
                                    autoComplete="off"
                                    onChange={(value) => {
                                      formData.customSize.pricings[
                                        index
                                      ].surface = value;
                                      handleInputChange(
                                        "customSize",
                                        formData.customSize,
                                      );
                                    }}
                                    onBlur={(value) => {
                                      formData.customSize.pricings[
                                        index
                                      ].surface = parseFloat(
                                        `${formData.customSize.pricings[index].surface || "0"}`,
                                      );
                                      handleInputChange(
                                        "customSize",
                                        formData.customSize,
                                      );
                                    }}
                                    value={`${pricing.surface}`}
                                    suffix={<Text as="span">
                                      {configuration.data?.settings?.customizerSign?.customizerOptions?.measurementUnit}<sup>2</sup>
                                    </Text>}
                                  />
                                </Grid.Cell>
                                <Grid.Cell
                                  columnSpan={{
                                    xs: 6,
                                    sm: 6,
                                    md: 2,
                                    lg: 4,
                                    xl: 4,
                                  }}
                                >
                                  <TextField
                                    label="Base price"
                                    type="number"
                                    autoComplete="off"
                                    onChange={(value) => {
                                      formData.customSize.pricings[
                                        index
                                      ].basePrice = value;
                                      handleInputChange(
                                        "customSize",
                                        formData.customSize,
                                      );
                                    }}
                                    onBlur={(value) => {
                                      formData.customSize.pricings[
                                        index
                                      ].basePrice = parseFloat(
                                        `${formData.customSize.pricings[index].basePrice || "0"}`,
                                      );
                                      handleInputChange(
                                        "customSize",
                                        formData.customSize,
                                      );
                                    }}
                                    value={`${pricing.basePrice}`}
                                  />
                                </Grid.Cell>
                                <Grid.Cell
                                  columnSpan={{
                                    xs: 6,
                                    sm: 6,
                                    md: 2,
                                    lg: 4,
                                    xl: 4,
                                  }}
                                >
                                  <TextField
                                    label="Char price"
                                    type="number"
                                    autoComplete="off"
                                    onChange={(value) => {
                                      formData.customSize.pricings[
                                        index
                                      ].charPrice = value;
                                      handleInputChange(
                                        "customSize",
                                        formData.customSize,
                                      );
                                    }}
                                    onBlur={(value) => {
                                      formData.customSize.pricings[
                                        index
                                      ].charPrice = parseFloat(
                                        `${formData.customSize.pricings[index].charPrice || "0"}`,
                                      );
                                      handleInputChange(
                                        "customSize",
                                        formData.customSize,
                                      );
                                    }}
                                    value={`${pricing.charPrice}`}
                                  />
                                </Grid.Cell>
                              </Grid>

                              {pricingErrors.find(
                                (curr: any) => curr.id == index,
                              ) && (
                                <InlineError
                                  message={
                                    pricingErrors.find(
                                      (curr: any) => curr.id == index,
                                    )?.message || ""
                                  }
                                  fieldID={`field${index}`}
                                />
                              )}
                            </BlockStack>
                          </Grid.Cell>
                        ),
                      )}
                    </Grid>
                    {!pricingErrors?.length && (
                      <Box width="300px">
                        <BiAddBtn
                          title="Add pricing"
                          handleClick={() => handleAddPricing()}
                        />
                      </Box>
                    )}
                    </BlockStack>
                  </Grid.Cell>
                </Grid>
              )}
            </Box></>}
            <Divider borderWidth="050" />
            <Box paddingInline="300" paddingBlock="300">
              <InlineStack align="end" gap="600">
                <BiSaveBtn isLoading={isSubmitting} title="Save" />
              </InlineStack>
            </Box>
          </Form>
        </BoxBackground>
      </SpacingBackground>
    </div>
  );
}

const formSchema = z.object({
  thickness: z
    .any()
    .transform(jsonTransform)
    .pipe(
      z.object({
        active: z.boolean(),
        values: z.number().array(),
      }),
    ),

  customSize: z
    .any()
    .transform(jsonTransform)
    .pipe(
      z.object({
        active: z.boolean(),
        width: z.object({
          label: z
            .string({ required_error: "Width label is required" })
            .min(3, "Width label is too short")
            .max(100, "Width label is too long"),
          min: z.number({
            required_error: "Width min is required",
          }),
          max: z.number({
            required_error: "Width max is required",
          }),
        }),

        height: z.object({
          label: z
            .string({ required_error: "Height label is required" })
            .min(3, "Height label is too short")
            .max(100, "Height label is too long"),
          min: z.number({
            required_error: "Height min is required",
          }),
          max: z.number({
            required_error: "Height max is required",
          }),
        }),
        pricings: z
          .object({
            surface: z.number(),
            basePrice: z.number(),
            charPrice: z.number(),
          })
          .array(),
      }),
    ),
});
export const action = async ({ request, params }: ActionFunctionArgs) => {
  const { session, admin } = await authenticate.admin(request);

  const configId = parseInt(params.configId ?? "");
  const mId = parseInt(params.mId ?? "");

  const method = request.method;
  const formData = await request.formData();

  switch (method) {
    case "DELETE": {
      const id = formData.get("id") as string;
      console.log("start deleting");
      await MaterialSizeService.delete(
        configId,
        session.id,
        mId,
        parseInt(id || ""),
      );
      return json({
        ...jFlashMessage("Size deleting is completed successfull"),
      });
      break;
    }

    case "PUT": {
      const id = formData.get("id") as string;
      await MaterialSizeService.setDefault(
        configId,
        session.id,
        mId,
        parseInt(id || ""),
      );
      return json({
        ...jFlashMessage("Default Size is defined successfull"),
      });
      break;
    }

    case "POST": {
      const submission = parseWithZod(formData, { schema: formSchema });

      if (submission.status !== "success") {
        return json({ status: false, message: null, errors: submission.error });
      }

      let {
        customSize,
        thickness,
      }: { customSize: ConfigCustomSize; thickness: configSizeThickness } =
        submission.value;
      if (customSize) {
        let res = await MaterialSizeService.addCustomSizeAndThickness(
          configId,
          session.id,
          mId,
          customSize,
          thickness,
        ); // Custom Size  updated is completed successfully
        return res
          ? json({
              ...jFlashMessage(
                "Custom Size and thickness  updated is completed successfully",
              ),
            })
          : json({
              ...jFlashMessage(
                "Errors on Custom Size and thickness  upadating",
                "error",
              ),
            });
      } else {
        return;
      }
      break;
    }
    default:
      break;
  }

  return null;
};
