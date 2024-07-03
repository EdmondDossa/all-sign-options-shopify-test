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
import { FixingMethodType, ShapeType } from "~/types/SettingsType";
import { ConfigFixingMethod, ConfigSize } from "~/types/ConfigDataType";
import { getError } from "~/utils/error-getting";
import { BiSaveBtn } from "~/components/buttons/BiSaveBtn";
import { z } from "zod";
import { ActionFunctionArgs, json } from "@remix-run/node";
import { authenticate } from "~/shopify.server";
import { parseWithZod } from "@conform-to/zod";
import MaterialFixingMethodService from "~/models/MaterialFixingMethod.service";
import { flashMessage } from "~/utils/message-flash";
import { RemoveNowIconBtn } from "~/components/buttons/RemoveNowIconBtn";
import { BiAddBtn } from "~/components/buttons/BiAddBtn";
import { jsonTransform } from "~/utils/transfomerZod";
import { MultiCombobox } from "~/components/inputs/MultiCombobox";

export default function MaterialFixingMethod() {
  const submit = useSubmit();
  const navigation = useNavigation();
  const actionData = useActionData<typeof action>();
  let { manageFixingMethods, fixingMethods, configSizes, manageShapes } =
    useOutletContext<{
      manageFixingMethods: FixingMethodType[];
      fixingMethods: ConfigFixingMethod[];
      configSizes: ConfigSize[];
      manageShapes: ShapeType[];
    }>();
  const [searchParams] = useSearchParams();
  const id = parseInt(searchParams.get("id") || "");
  let configFixingMethod = fixingMethods?.find((curr, index) => index === id);

  const options = manageFixingMethods
    ? manageFixingMethods
        .map((manageFixingMethod, index) => ({
          label: manageFixingMethod.name || "",
          value: `${index}`,
        }))
        .filter(
          (filterFixingMethod) =>
            filterFixingMethod.value ==
              `${configFixingMethod?.fixingMethodId}` ||
            !fixingMethods?.find(
              (curr) => filterFixingMethod.value == `${curr.fixingMethodId}`,
            ),
        )
    : [];

  const [formData, setFormData] = useState<{
    configFixingMethods: ConfigFixingMethod[];
  }>(
    configFixingMethod
      ? {
          configFixingMethods: [configFixingMethod as ConfigFixingMethod],
        }
      : {
          configFixingMethods: [
            {
              fixingMethodId: parseInt(options[0]?.value),
              additionalPrice: 0,
              excludeSizes: [],
              excludeShapes: [],
              isDefault: false,
            },
          ],
        },
  );

  const handleAddItem = () => {
    if (!formData.configFixingMethods) {
      formData.configFixingMethods = [];
    }
    if (Number.isNaN(id)) {
      formData.configFixingMethods.push({
        fixingMethodId: parseInt(
          options.filter(
            (option) =>
              !formData.configFixingMethods?.find(
                (curr) => curr.fixingMethodId == parseInt(option.value),
              ),
          )[0]?.value,
        ),
        additionalPrice: 0,
        isDefault: false,
        excludeSizes: [],
        excludeShapes: [],
      });
    }

    setFormData({ ...formData });
  };

  const handleDeleteItem = (index: number) => {
    if (formData.configFixingMethods.length > 1) {
      formData.configFixingMethods.splice(index, 1);
      setFormData({ ...formData });
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    submit(
      { configFixingMethods: JSON.stringify(formData.configFixingMethods) },
      { method: "POST" },
    );
  };

  let isLoading = navigation.state == "loading";
  let isSubmitting = navigation.state == "submitting";
  const sizes = configSizes
    ? configSizes.map((configSize, index) => ({
        label: configSize.label || "",
        value: `${index}`,
      }))
    : [];
  const shapes = manageShapes
    ? manageShapes.map((manageShape, index) => ({
        label: manageShape.name || "",
        value: `${index}`,
      }))
    : [];

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
                {formData.configFixingMethods.map((fixingMethod, index) => (
                  <>
                    <Grid.Cell
                      columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}
                    >
                      <Divider borderWidth="100" />
                      <Divider borderWidth="100" />
                    </Grid.Cell>
                    <Grid.Cell
                      columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}
                    >
                      <BlockStack>
                        <Bleed marginBlockEnd="400">
                          <InlineStack wrap={false} align="end" gap="200">
                            <RemoveNowIconBtn
                              onClick={() => handleDeleteItem(index)}
                            />
                          </InlineStack>
                        </Bleed>
                        <Box width="100%">
                          <Grid>
                            <Grid.Cell
                              columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}
                            >
                              <Select
                                label="Select fixing method"
                                options={options}
                                value={`${fixingMethod.fixingMethodId}`}
                                onChange={(value) => {
                                  fixingMethod.fixingMethodId =
                                    parseFloat(value);
                                  formData.configFixingMethods[index] =
                                    fixingMethod;
                                  setFormData({ ...formData });
                                }}
                                error={getError(
                                  actionData,
                                  `manageFixingMethods.${index}.fixingMethodId`,
                                )}
                              />
                            </Grid.Cell>
                            <Grid.Cell
                              columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}
                            >
                              <TextField
                                label="Additional price"
                                type="number"
                                value={`${fixingMethod.additionalPrice}`}
                                onChange={(value) => {
                                  fixingMethod.additionalPrice = value;
                                  formData.configFixingMethods[index] =
                                    fixingMethod;
                                  setFormData({ ...formData });
                                }}
                                onBlur={(value) => {
                                  formData.configFixingMethods[index].additionalPrice =
                                   parseFloat(`${fixingMethod.additionalPrice||"0"}`)
                                  setFormData({ ...formData });
                                }}
                                autoComplete="off"
                                error={getError(
                                  actionData,
                                  `manageFixingMethods.${index}.additionalPrice`,
                                )}
                              />
                            </Grid.Cell>
                            <Grid.Cell
                              columnSpan={{ xs: 6, sm: 6, md: 3, lg: 6, xl: 6 }}
                            >
                              <BlockStack gap="300">
                                <Text as="strong" variant="headingMd">
                                  Exclude size
                                </Text>
                                <MultiCombobox
                                  labelHidden={true}
                                  helpText="exclude the sizes of this border"
                                  label="Exclude size"
                                  placeholder="Select exclude size"
                                  selectedOptions={fixingMethod.excludeSizes.map(
                                    (curr) => `${curr}`,
                                  )}
                                  data={sizes}
                                  setSelectedOptions={(value: any) => {
                                    fixingMethod.excludeSizes = value.map(
                                      (curr: any) => parseFloat(curr),
                                    );
                                    formData.configFixingMethods[index] =
                                      fixingMethod;
                                    setFormData({ ...formData });
                                  }}
                                ></MultiCombobox>
                              </BlockStack>
                            </Grid.Cell>
                            <Grid.Cell
                              columnSpan={{ xs: 6, sm: 6, md: 3, lg: 6, xl: 6 }}
                            >
                              <BlockStack gap="300">
                                <Text as="strong" variant="headingMd">
                                  Exclude shapes
                                </Text>
                                <MultiCombobox
                                  labelHidden={true}
                                  helpText="exclude the shapes of this border"
                                  label="Exclude shapes"
                                  placeholder="Select excluded shapes"
                                  selectedOptions={fixingMethod.excludeShapes.map(
                                    (curr) => `${curr}`,
                                  )}
                                  data={shapes}
                                  setSelectedOptions={(value: any) => {
                                    fixingMethod.excludeShapes = value.map(
                                      (curr: any) => parseFloat(curr),
                                    );
                                    formData.configFixingMethods[index] =
                                      fixingMethod;
                                    setFormData({ ...formData });
                                  }}
                                ></MultiCombobox>
                              </BlockStack>
                            </Grid.Cell>
                          </Grid>
                        </Box>
                      </BlockStack>
                    </Grid.Cell>
                  </>
                ))}

                {Number.isNaN(id) &&
                  options?.length > formData.configFixingMethods?.length && (
                    <Grid.Cell
                      columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}
                    >
                      <Box width="300px">
                        <BiAddBtn
                          title="Add fixing method"
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
  configFixingMethods: z
    .any()
    .transform(jsonTransform)
    .pipe(
      z
        .object({
          fixingMethodId: z.number({
            required_error: "Material fixing method is required",
          }),
          additionalPrice: z.number({
            required_error: "Material fixing method  price is required",
          }),
          excludeShapes: z.number().array(),
          excludeSizes: z.number().array(),
          isDefault: z.boolean().optional(),
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

  let configFixingMethods: ConfigFixingMethod[] = submission.value
    .configFixingMethods as ConfigFixingMethod[];

  if (
    id &&
    !Number.isNaN(configId) &&
    !Number.isNaN(mId) &&
    !Number.isNaN(id)
  ) {
    let res = await MaterialFixingMethodService.update(
      configId,
      session.id,
      mId,
      configFixingMethods[0],
      parseInt(id),
    );
    return res
      ? redirect(
          `..${flashMessage("Material fixing method  updated is completed successfully")}`,
        )
      : redirect(
          `..${flashMessage("Material fixing method  updated is  fail", "error")}`,
        );
  } else {
    let resTab: any = [];
    let res;
    for (const configFixingMethod of configFixingMethods) {
      let res = await MaterialFixingMethodService.add(
        configId,
        session.id,
        mId,
        configFixingMethod,
      );

      resTab.push(res);
    }

    return resTab?.length > 0
      ? redirect(
          `..${flashMessage("Material fixing method  added is completed successfully")}`,
        )
      : redirect(
          `..${flashMessage("Material fixing method  added is  fail", "error")}`,
        );
  }
};
