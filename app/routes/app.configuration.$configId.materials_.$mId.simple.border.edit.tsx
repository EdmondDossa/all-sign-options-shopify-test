import {
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
import { MultiCombobox } from "~/components/inputs/MultiCombobox";
import { BorderType, ShapeType } from "~/types/SettingsType";
import { ConfigBorder, ConfigSize } from "~/types/ConfigDataType";
import { getError } from "~/utils/error-getting";
import { BiSaveBtn } from "~/components/buttons/BiSaveBtn";
import { z } from "zod";
import { ActionFunctionArgs, json } from "@remix-run/node";
import { authenticate } from "~/shopify.server";
import { parseWithZod } from "@conform-to/zod";
import MaterialBorderService from "~/models/MaterialBorderService.service";
import { flashMessage } from "~/utils/message-flash";
import { jsonTransform } from "~/utils/transfomerZod";

export default function MaterialBorderCreate() {
  const [selected, setSelected] = useState("1");
  const submit = useSubmit();
  const navigation = useNavigation();
  const actionData = useActionData<typeof action>();
  let { configSizes, manageBorders, borders, manageShapes } = useOutletContext<{
    manageBorders: BorderType[];
    configSizes: ConfigSize[];
    manageShapes: ShapeType[];
    borders: ConfigBorder[];
  }>();
  const [searchParams] = useSearchParams();
  const id = parseInt(searchParams.get("id") || "");
  let configBorder = borders?.find((curr, index) => index === id);

  const options = manageBorders
    ? manageBorders
        .map((manageBorder, index) => ({
          label: manageBorder.name || "",
          value: `${index}`,
        }))
        .filter(
          (filterBorder) =>
            filterBorder.value == `${configBorder?.manageBorderId}` ||
            !borders?.find(
              (curr) => filterBorder.value == `${curr.manageBorderId}`,
            ),
        )
    : [];

  const [formData, setFormData] = useState<ConfigBorder>(
    configBorder
      ? (configBorder as ConfigBorder)
      : {
          manageBorderId: parseInt(options[0]?.value),
          additionalPrice: 0,
          excludeSizes: [],
          excludeShapes: [],
        },
  );

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

  let isLoading = navigation.state == "loading";
  let isSubmitting = navigation.state == "submitting";

  const HandleManageBorderId = (value: string) =>
    setFormData({ ...formData, manageBorderId: parseInt(value) });
  const handleAdditionalPrice = (value: string,onBlur=false) =>
    setFormData({ ...formData, additionalPrice:onBlur? parseFloat(`${formData.additionalPrice || "0"}`) : value });
  const handleExcludeSizes = (value: any[]) =>
    setFormData({
      ...formData,
      excludeSizes: value.map((currValue) => parseInt(currValue)),
    });
  const handleExcludeShapes = (value: any[]) =>
    setFormData({
      ...formData,
      excludeShapes: value.map((currValue) => parseInt(currValue)),
    });

  console.log("action data :", actionData);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    submit(
      {
        ...formData,
        excludeSizes: JSON.stringify(formData.excludeSizes),
        excludeShapes: JSON.stringify(formData.excludeShapes),
      },
      { method: "POST" },
    );
  };

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
                <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
                  <Select
                    label="Select border"
                    options={options}
                    value={`${formData.manageBorderId}`}
                    onChange={HandleManageBorderId}
                    error={getError(actionData, "manageBorderId")}
                  />
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
                  <TextField
                    label="Additional Price"
                    type="number"
                    value={`${formData.additionalPrice}`}
                    onChange={(value) => handleAdditionalPrice(value)}
                    onBlur={(value)=>handleAdditionalPrice("",true)}
                    
                    autoComplete="on"
                    error={getError(actionData, "additionalPrice")}
                  />
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
                  <BlockStack gap="300">
                    <Text as="strong" variant="headingMd">
                      Exclude size
                    </Text>
                    <MultiCombobox
                      labelHidden={true}
                      helpText="exclude the sizes of this border"
                      label="Exclude size"
                      placeholder="Select exclude size"
                      selectedOptions={formData.excludeSizes.map(
                        (curr) => `${curr}`,
                      )}
                      data={sizes}
                      setSelectedOptions={handleExcludeSizes}
                    ></MultiCombobox>
                  </BlockStack>
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
                  <BlockStack gap="300">
                    <Text as="strong" variant="headingMd">
                      Exclude shapes
                    </Text>
                    <MultiCombobox
                      labelHidden={true}
                      helpText="exclude the shapes of this border"
                      label="Exclude shapes"
                      placeholder="Select excluded shapes"
                      selectedOptions={formData.excludeShapes.map(
                        (curr) => `${curr}`,
                      )}
                      data={shapes}
                      setSelectedOptions={handleExcludeShapes}
                    ></MultiCombobox>
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
                  onClick={onBack}
                >
                  <Box paddingInline="1000">
                    <InlineStack gap="300">
                      <RayStartArrowIcon />{" "}
                      <span style={{ color: "black", fontWeight: "bold" }}>
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

// manageBorderId: manageBorders[0]?.value || "",
// additionalPrice: 0,
// excludeSizes: [],
// settings: {
//   codeHex: "",
//   enableBorderWidth: false,
//   enableBorderColor: false,
// },

const formSchema = z.object({
  manageBorderId: z.number({ required_error: "Border is required" }),
  additionalPrice: z.number({ required_error: "price is required" }),
  excludeSizes: z.any().transform(jsonTransform).pipe(z.number().array()),
  excludeShapes: z.any().transform(jsonTransform).pipe(z.number().array()),
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

  let configBorder: ConfigBorder = submission.value as ConfigBorder;

  if (
    !Number.isNaN(parseInt(id || "")) &&
    !Number.isNaN(configId) &&
    !Number.isNaN(mId)
  ) {
    let res = await MaterialBorderService.update(
      configId,
      session.id,
      mId,
      configBorder,
      parseInt(id || ""),
    );
    return res
      ? redirect(
          `..${flashMessage("Material Border  updated is completed successfully")}`,
        )
      : redirect(
          `..${flashMessage("Material Border updated is  fail", "error")}`,
        );
  } else {
    let res = await MaterialBorderService.add(
      configId,
      session.id,
      mId,
      configBorder,
    );
    return res
      ? redirect(
          `..${flashMessage("Material  added is completed successfully")}`,
        )
      : redirect(`..${flashMessage("Material  added is  fail", "error")}`);
  }
};
