import {
  Bleed,
  BlockStack,
  Box,
  Divider,
  Grid,
  InlineStack,
  Select,
  Text,
  TextField,
  InlineError,
} from "@shopify/polaris";
import { useState } from "react";
import {
  Form,
  redirect,
  useActionData,
  useNavigate,
  useNavigation,
  useOutletContext,
  useSearchParams,
  useSubmit,
} from "@remix-run/react";
import { BoxBackground } from "~/components/layouts/BoxBackground";
import { SpacingBackground } from "~/components/layouts/SpacingBackground";
import RayStartArrowIcon from "~/components/icons/RayStartArrowIcon";
import { ConfigShape } from "~/types/ConfigDataType";
import { ShapeType } from "~/types/SettingsType";
import { getError } from "~/utils/error-getting";
import { BiSaveBtn } from "~/components/buttons/BiSaveBtn";
import { z } from "zod";
import { ActionFunctionArgs, json } from "@remix-run/node";
import { authenticate } from "~/shopify.server";
import { parseWithZod } from "@conform-to/zod";
import { flashMessage } from "~/utils/message-flash";
import MaterialShapeService from "~/models/MaterialShape.service";
import { RemoveNowIconBtn } from "~/components/buttons/RemoveNowIconBtn";
import { BiAddBtn } from "~/components/buttons/BiAddBtn";
import { jsonTransform } from "~/utils/transfomerZod";
import { ReactSwitchCustom } from "~/components/inputs/ReactSwitchCustom";

interface FormDataType {
  configShapes: ConfigShape[];
  error?: string;
}

export default function MaterialFixingMethod() {
  const submit = useSubmit();
  const navigation = useNavigation();
  const actionData = useActionData<typeof action>();
  let { manageShapes, shapes } = useOutletContext<{
    manageShapes: ShapeType[];
    shapes: ConfigShape[];
  }>();
  const [searchParams] = useSearchParams();
  const id = parseInt(searchParams.get("id") || "");
  let configShape = shapes?.find((curr, index) => index === id);

  const options = manageShapes
    ? manageShapes
        .map((manageShapes, index) => ({
          label: manageShapes.name || "",
          value: `${index}`,
        }))
        .filter(
          (filterShape) =>
            filterShape.value == `${configShape?.shapeId}` ||
            !shapes?.find((curr) => filterShape.value == `${curr.shapeId}`),
        )
    : [];

  const [formData, setFormData] = useState<FormDataType>(
    configShape
      ? {
          configShapes: [configShape as ConfigShape],
        }
      : {
          configShapes: [
            {
              shapeId: parseInt(options[0]?.value),
              additionalPrice: 0,
              isDefault: false,
              enablePricingBySurface: false,
              surface: 0,
              shapeSize: {
                small: 0,
                medium: 0,
                large: 0
              }
            },
          ],
        },
  );

  const handleAddItem = () => {
    if (!formData.configShapes) {
      formData.configShapes = [];
    }
    if (Number.isNaN(id) && options?.length > formData.configShapes?.length) {
      formData.configShapes.push({
        shapeId: parseInt(
          options.filter(
            (option) =>
              !formData.configShapes?.find(
                (curr) => curr.shapeId == parseInt(option.value),
              ),
          )[0]?.value,
        ),
        additionalPrice: 0,
        isDefault: false,
        enablePricingBySurface: false,
        surface: 0,
        shapeSize: {
          small: 20,
          medium: 40,
          large: 60
        }
      });
    }

    setFormData({ ...formData });
  };

  const handleDeleteItem = (index: number) => {
    if (formData.configShapes.length > 1) {
      formData.configShapes.splice(index, 1);
      setFormData({ ...formData });
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    
    // Validate shape sizes before submitting
    const hasInvalidSizes = formData.configShapes.some(shape => {
      if (shape.shapeSize) {
        return !(shape.shapeSize.small < shape.shapeSize.medium && shape.shapeSize.medium < shape.shapeSize.large);
      }
      return false;
    });

    if (hasInvalidSizes) {
      // Show error message
      const errorMessage = "Error: Small < Medium < Large is not found";
      setFormData(prev => ({
        ...prev,
        error: errorMessage
      }));
      return;
    }

    submit(
      { configShapes: JSON.stringify(formData.configShapes) },
      { method: "POST" },
    );
  };

  let isLoading = navigation.state == "loading";
  let isSubmitting = navigation.state == "submitting";

  const navigate = useNavigate();
  const onBack = () => {
    navigate("..");
  };

  return (
    <div>
      <SpacingBackground width="100%" height="auto" margin="16px 0px ">
        <BoxBackground>
          <Form onSubmit={handleSubmit} method="POST">
            <Box paddingInline="300" paddingBlock="1000">
              <Grid gap={{ lg: "30px" }}>
                {formData.configShapes.map((currConfigShape, index) => (
                  <Grid.Cell
                    columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}
                  >
                    <InlineStack wrap={false} as="div" gap="400">
                      <Box width={currConfigShape.enablePricingBySurface ? "25%" : "40%"}>
                        <Select
                          label="Select shapes"
                          options={options}
                          value={`${currConfigShape.shapeId}`}
                          onChange={(value) => {
                            currConfigShape.shapeId = parseFloat(value);
                            formData.configShapes[index] = currConfigShape;
                            setFormData({ ...formData });
                          }}
                          error={getError(
                            actionData,
                            `configShapes.${index}.shapeId`,
                          )}
                        />
                      </Box>
                      <Box width={currConfigShape.enablePricingBySurface ? "25%" : "40%"}>
                        <TextField
                          label="Additional price"
                          type="number"
                          value={`${currConfigShape.additionalPrice}`}
                          onChange={(value) => {
                            currConfigShape.additionalPrice = value;
                            formData.configShapes[index] = currConfigShape;
                            setFormData({ ...formData });
                          }}
                          onBlur={(value) => {
                            currConfigShape.additionalPrice = parseFloat(`${currConfigShape.additionalPrice}`);
                            formData.configShapes[index] = currConfigShape;
                            setFormData({ ...formData });
                          }}
                          autoComplete="off"
                          error={getError(
                            actionData,
                            `configShapes.${index}.additionalPrice`,
                          )}
                        />
                      </Box>
                      {currConfigShape.enablePricingBySurface && (
                        <Box width={currConfigShape.enablePricingBySurface ? "25%" : "40%"}>
                          <TextField
                            label="Surface for  this price"
                            type="number"
                            value={`${currConfigShape.surface}`}
                            onChange={(value) => {
                              currConfigShape.surface = value;
                              formData.configShapes[index] = currConfigShape;
                              setFormData({ ...formData });
                            }}
                            onBlur={(value) => {
                              currConfigShape.surface = parseFloat(`${currConfigShape.surface}`);
                              formData.configShapes[index] = currConfigShape;
                              setFormData({ ...formData });
                            }}
                            autoComplete="off"
                            error={getError(
                              actionData,
                              `configShapes.${index}.surface`,
                            )}
                          />
                        </Box>
                      )}
                      <Box width="18%">
                        <BlockStack gap="200">
                          <Text as="span">
                            Enable Pricing By Surface
                          </Text>
                          <InlineStack wrap={false} gap="100" blockAlign="center">
                            <Text as="span"> No</Text>
                            <ReactSwitchCustom
                              checked={currConfigShape.enablePricingBySurface?true:false}
                              setChecked={(value:any) => {
                                currConfigShape.enablePricingBySurface = value;
                                formData.configShapes[index] = currConfigShape;
                                setFormData({ ...formData });
                              }}
                            />
                            <Text as="span"> Yes</Text>
                          </InlineStack>
                        </BlockStack>
                      </Box>
                      <Box width="1%">
                        <Bleed marginInlineStart="400">
                          <RemoveNowIconBtn
                            onClick={() => handleDeleteItem(index)}
                          />
                        </Bleed>
                      </Box>
                    </InlineStack>
                    {/* Add shapeSize fields when Cut to Shape is selected */}
                    {manageShapes[currConfigShape.shapeId]?.value === "cut-to-shape" && (
                      <Box paddingBlockStart="400">
                        <BlockStack gap="400">
                          <Grid gap={{ lg: "20px" }}>
                            <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 4, xl: 4 }}>
                              <TextField
                                label="Shape Size Small (px)"
                                type="number"
                                value={`${currConfigShape.shapeSize?.small || 0}`}
                                onChange={(value) => {
                                  if (!currConfigShape.shapeSize) {
                                    currConfigShape.shapeSize = { small: 0, medium: 0, large: 0 };
                                  }
                                  currConfigShape.shapeSize.small = parseFloat(value);
                                  formData.configShapes[index] = currConfigShape;
                                  setFormData({ ...formData });
                                }}
                                autoComplete="off"
                              />
                            </Grid.Cell>
                            <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 4, xl: 4 }}>
                              <TextField
                                label="Shape Size Medium (px)"
                                type="number"
                                value={`${currConfigShape.shapeSize?.medium || 0}`}
                                onChange={(value) => {
                                  if (!currConfigShape.shapeSize) {
                                    currConfigShape.shapeSize = { small: 0, medium: 0, large: 0 };
                                  }
                                  currConfigShape.shapeSize.medium = parseFloat(value);
                                  formData.configShapes[index] = currConfigShape;
                                  setFormData({ ...formData });
                                }}
                                autoComplete="off"
                              />
                            </Grid.Cell>
                            <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 4, xl: 4 }}>
                              <TextField
                                label="Shape Size Large (px)"
                                type="number"
                                value={`${currConfigShape.shapeSize?.large || 0}`}
                                onChange={(value) => {
                                  if (!currConfigShape.shapeSize) {
                                    currConfigShape.shapeSize = { small: 0, medium: 0, large: 0 };
                                  }
                                  currConfigShape.shapeSize.large = parseFloat(value);
                                  formData.configShapes[index] = currConfigShape;
                                  setFormData({ ...formData });
                                }}
                                autoComplete="off"
                              />
                            </Grid.Cell>
                          </Grid>
                          {formData.error && (
                            <Box paddingBlockStart="200">
                              <InlineError message={formData.error} fieldID="shapeSizeError" />
                            </Box>
                          )}
                        </BlockStack>
                      </Box>
                    )}
                  </Grid.Cell>
                ))}
                {Number.isNaN(id) &&
                  options.length > formData.configShapes?.length && (
                    <Grid.Cell
                      columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}
                    >
                      <Box width="150px">
                        <BiAddBtn
                          title="Add shapes"
                          handleClick={() => handleAddItem()}
                        />
                      </Box>
                    </Grid.Cell>
                  )}
              </Grid>
            </Box>
            <Divider borderWidth="050" />
            <Box paddingInline="300" paddingBlock="300">
              <InlineStack align="end" gap="600">
                <button
                  className="back-large-btn"
                  type="button"
                  onClick={onBack}
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
          </Form>
        </BoxBackground>
      </SpacingBackground>
    </div>
  );
}

const formSchema = z.object({
  configShapes: z
    .any()
    .transform(jsonTransform)
    .pipe(
      z
        .object({
          shapeId: z.number({ required_error: "Material shape is required" }),
          additionalPrice: z.number({
            required_error: "Material shape price is required",
          }),
          isDefault: z.boolean().optional(),
          enablePricingBySurface: z.boolean().optional(),
          surface: z.number({
            required_error: "Material shape price is required",
          }).optional(),
          shapeSize: z.object({
            small: z.number(),
            medium: z.number(),
            large: z.number()
          }).refine(
            (data) => data.small < data.medium && data.medium < data.large,
            {
              message: "Error: Small < Medium < Large is not found",
              path: ["shapeSize"]
            }
          ).optional()
        })
        .array(),
    ),
});

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const { session, admin } = await authenticate.admin(request);

  const formData = await request.formData();
  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  const configId = parseInt(params.configId ?? "");
  const mId = parseInt(params.mId ?? "");
  const submission = parseWithZod(formData, { schema: formSchema });

  if (submission.status !== "success") {
    return json({ status: false, message: null, errors: submission.error });
  }

  let configShapes: ConfigShape[] = submission.value
    .configShapes as ConfigShape[];

  if (
    id &&
    !Number.isNaN(configId) &&
    !Number.isNaN(mId) &&
    !Number.isNaN(id)
  ) {
    let res = await MaterialShapeService.update(
      configId,
      session.id,
      mId,
      configShapes[0],
      parseInt(id),
    );
    return res
      ? redirect(
          `..${flashMessage("Material shape  updated is completed successfully")}`,
        )
      : redirect(
          `..${flashMessage("Material shape updated is  fail", "error")}`,
        );
  } else {
    let resTab: any = [];
    let res;
    for (const configShape of configShapes) {
      res = await MaterialShapeService.add(
        configId,
        session.id,
        mId,
        configShape,
      );

      resTab.push(res);
    }
    return resTab?.length > 0
      ? redirect(
          `..${flashMessage("Material shape added is completed successfully")}`,
        )
      : redirect(`..${flashMessage("Material shape added is  fail", "error")}`);
  }
};
