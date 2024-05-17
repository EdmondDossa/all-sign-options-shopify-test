import {
  Badge,
  BlockStack,
  Box,
  ButtonGroup,
  Divider,
  Grid,
  IndexTable,
  InlineStack,
  Text,
  TextField,
  useIndexResourceState,
} from "@shopify/polaris";
import { useState } from "react";
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

export default function MaterialSizeIndex() {
  const submit = useSubmit();
  let { customSize, allSizes, thickness } = useOutletContext<{
    customSize: ConfigCustomSize;
    allSizes: ConfigSize[];
    thickness: configSizeThickness;
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
    customSize: customSize || {
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
    },
  });

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

  const handleDeleteThickness = (index: number) => {
    formData.thickness.values.splice(index, 1);
    setFormData({ ...formData });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

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
              <button
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
              </button>
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
                              autoComplete="on"
                              onChange={(value) => {
                                formData.thickness.values[index] =
                                  parseInt(value);
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
            <Divider borderWidth="050" />
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
                          formData.customSize.width.min = parseInt(value);
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
                          formData.customSize.width.max = parseInt(value);
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
                          formData.customSize.height.min = parseInt(value);
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
                          formData.customSize.height.max = parseInt(value);
                          handleInputChange("customSize", formData.customSize);
                        }}
                        autoComplete="on"
                        error={getError(actionData, "customSize.height.max")}
                      />
                    </BlockStack>
                  </Grid.Cell>
                </Grid>
              )}
            </Box>
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
