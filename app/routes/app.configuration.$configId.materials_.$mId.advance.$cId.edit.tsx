import { ActionFunctionArgs, json } from "@remix-run/node";
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
import {
  BlockStack,
  Box,
  Divider,
  Grid,
  InlineStack,
  Text,
  TextField,
} from "@shopify/polaris";
import { useState } from "react";
import RayStartArrowIcon from "~/components/icons/RayStartArrowIcon";
import { BoxBackground } from "~/components/layouts/BoxBackground";
import { SpacingBackground } from "~/components/layouts/SpacingBackground";
import { z } from "zod";
import { authenticate } from "~/shopify.server";
import { parseWithZod } from "@conform-to/zod";
import { BiSaveBtn } from "~/components/buttons/BiSaveBtn";
import { MaterialAdvanceOptionType } from "~/types/ConfigDataType";
import useHandleFlashMessage from "~/hooks/useHandleFlashMessage";
import MaterialAdvancedOptionService from "~/models/MaterialAdvancedOption.service";
import { flashMessage } from "~/utils/message-flash";
import { getError } from "~/utils/error-getting";
import { FileInput } from "~/components/inputs/FileInput";
import { ColorType } from "~/types/ManagePropertyType";
import { FixingMethodType, ShapeType } from "~/types/SettingsType";
import { TextColorField } from "~/components/inputs/TextColorField";
import {
  MultiCombobox,
  SelectCombobox,
} from "~/components/inputs/MulticomboxBorder";
import { jsonTransform, stringTransform } from "~/utils/transfomerZod";

export default function MaterialComponentCreate() {
  const navigate = useNavigate();
  const submit = useSubmit();
  const navigation = useNavigation();
  const { materialOptions, manageShapes, manageFixingsMethods } =
    useOutletContext<{
      materialOptions: MaterialAdvanceOptionType[];
      manageShapes: ShapeType[];
      manageFixingsMethods: FixingMethodType[];
    }>();
  const actionData = useActionData<typeof action>();
  useHandleFlashMessage();
  const [searchParams] = useSearchParams();
  const id = parseInt(searchParams.get("id") || "");
  console.log("action data :", actionData);
  let materialOption = materialOptions?.find((curr, index) => index == id);
  const [formData, setFormData] = useState<MaterialAdvanceOptionType>(
    materialOption
      ? (materialOption as MaterialAdvanceOptionType)
      : {
          name: "",
          description: "",
          icon: "",
          image: "",
          color: {
            name: "",
            codeHex: "",
            prevImg: "",
          },
          fixingMethods: [],
          shapeId: 0,
          size: {
            width: 0,
            height: 0,
            basePrice: 0,
            startPriceAtChar: 1,
            maxTextChar: -1,
            charPrice: 0,
          },
          additionalPrice: 0,
        },
  );

  let isLoading = navigation.state == "loading";
  let isSubmitting = navigation.state == "submitting";

  const handleName = (value: string) =>
    setFormData({ ...formData, name: value });
  const handleDescription = (value: string) =>
    setFormData({ ...formData, description: value });
  const handleIcon = (value: string) =>
    setFormData({ ...formData, icon: value });
  const handleImage = (value: string) =>
    setFormData({ ...formData, image: value });
  const handleAdditionalPrice = (value: string, isOnBlur: boolean = false) => {
    setFormData({
      ...formData,
      additionalPrice: isOnBlur
        ? parseFloat(`${formData.additionalPrice || "0"}`)
        : value,
    });
  };

  const handleSizeWidth = (value: string, isOnBlur: boolean = false) => {
    formData.size.width = isOnBlur? parseFloat(`${formData.size.width || "0"}`) : value;
    setFormData({ ...formData });
  };

  const handleSizeHeight = (value: string, isOnBlur: boolean = false) => {
    formData.size.height = isOnBlur? parseFloat(`${formData.size.height || "0"}`) : value;
    setFormData({ ...formData });
  };

  const handleSizeBasePrice = (value: string, isOnBlur: boolean = false) => {
    formData.size.basePrice = isOnBlur? parseFloat(`${formData.size.basePrice || "0"}`) : value;
    setFormData({ ...formData });
  };

  const handleSizeStartPriceAtChar = (value: string) => {
    formData.size.startPriceAtChar = parseInt(value);
    setFormData({ ...formData });
  };

  const handleSizeMaxTextChar = (value: string, isOnBlur: boolean = false) => {
    formData.size.maxTextChar = isOnBlur? parseInt(`${formData.size.maxTextChar || "0"}`) : value;
    setFormData({ ...formData });
  };

  const handleSizeCharPrice = (value: string, isOnBlur: boolean = false) => {
    formData.size.charPrice = isOnBlur? parseFloat(`${formData.size.charPrice || "0"}`) : value;
    setFormData({ ...formData });
  };

  const handleInputChange = (inputName: string, value: any) => {
    setFormData((prevData: any) => ({
      ...prevData,
      [inputName]: value,
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    submit(
      {
        ...formData,
        size: JSON.stringify(formData.size),
        color: JSON.stringify(formData.color),
        fixingMethods: JSON.stringify(formData.fixingMethods),
      },
      { method: "POST" },
    );
  };

  console.log("actionData", actionData);

  const shapes = manageShapes.map((manageShape, index) => ({
    value: `${index}`,
    label: manageShape.name || "",
    description: manageShape.name || "",
    image: manageShape.icon || "",
  }));
  const fixingMethods = manageFixingsMethods.map(
    (manageFixingsMethod, index) => ({
      value: `${index}`,
      label: manageFixingsMethod.name || "",
      description: manageFixingsMethod.description || "",
      image: manageFixingsMethod.icon || "",
    }),
  );

  console.log("value  of  data", formData.fixingMethods);

  const onBack = () => {
    navigate("..");
  };

  return (
    <SpacingBackground width="100%" height="auto">
      <BoxBackground>
        <Box padding="300">
          <Text as="h2" variant="headingMd">
            {Number.isNaN(id) ? "Add option" : "Edit option"}
          </Text>
        </Box>
        <Divider borderWidth="050" />

        <Form onSubmit={handleSubmit} method="POST">
          <Box paddingInline="300" paddingBlock="1000">
            <Grid gap={{ lg: "30px" }}>
              <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
                <TextField
                  label="Name"
                  value={`${formData.name}`}
                  autoComplete="off"
                  onChange={handleName}
                  error={getError(actionData, "name")}
                />
              </Grid.Cell>

              <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
                <TextField
                  label="Description"
                  value={`${formData.description}`}
                  autoComplete="off"
                  onChange={handleDescription}
                  error={getError(actionData, "description")}
                />
              </Grid.Cell>
              <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
                <FileInput
                  error={getError(actionData, "icon")}
                  title="Upload icon"
                  path={formData.icon}
                  handlePath={handleIcon}
                />
              </Grid.Cell>
              <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
                <FileInput
                  error={getError(actionData, "image")}
                  title="Upload Background Image"
                  buttonTitle="Upload Image"
                  path={formData.image}
                  handlePath={handleImage}
                />
              </Grid.Cell>

              <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
                <MultiCombobox
                  label="Select fixing method"
                  placeholder="seach fixing method"
                  selectedOptions={formData.fixingMethods.map(
                    (curr) => `${curr}`,
                  )}
                  data={fixingMethods}
                  setSelectedOptions={(value: any) => {
                    handleInputChange(
                      "fixingMethods",
                      value.map((v: string) => parseInt(v)),
                    );
                  }}
                ></MultiCombobox>
              </Grid.Cell>
              <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
                <SelectCombobox
                  label="Select shape"
                  placeholder="seach shape"
                  selectedOptions={
                    !Number.isNaN(formData.shapeId)
                      ? [`${formData.shapeId}`]
                      : []
                  }
                  data={shapes}
                  setSelectedOptions={(value: any) => {
                    handleInputChange(
                      "shapeId",
                      value.length
                        ? value[value.length - 1]
                        : parseInt(value[0]),
                    );
                  }}
                  error={getError(actionData, "shapeId")}
                ></SelectCombobox>
              </Grid.Cell>
              <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
                <Text as="h3" variant="bodyMd" fontWeight="bold">
                  Size
                </Text>
                <Box paddingInline="300" paddingBlockStart="300">
                  <Grid>
                    <Grid.Cell
                      columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}
                    >
                      <TextField
                        size="slim"
                        label="Width"
                        type="number"
                        value={`${formData.size.width}`}
                        autoComplete="off"
                        onChange={(value: any) => handleSizeWidth(value)}
                        onBlur={()=> handleSizeWidth("", true)}
                        error={getError(actionData, "size.width")}
                      />
                    </Grid.Cell>
                    <Grid.Cell
                      columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}
                    >
                      <TextField
                        size="slim"
                        label="Height"
                        type="number"
                        value={`${formData.size.height}`}
                        autoComplete="off"
                        onChange={(value: any) => handleSizeHeight(value)}
                        onBlur={(value: any) => handleSizeHeight(value, true)}
                        error={getError(actionData, "size.height")}
                      />
                    </Grid.Cell>
                    <Grid.Cell
                      columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}
                    >
                      <TextField
                        size="slim"
                        label="Max text char"
                        type="number"
                        value={`${formData.size.maxTextChar}`}
                        onChange={(value: any) => handleSizeMaxTextChar(value)}
                        onBlur={(value: any) => handleSizeMaxTextChar(value, true)}
                        helpText="Max number of characters in text, for without limit set to -1"
                        autoComplete="on"
                        error={getError(actionData, "size.maxTextChar")}
                      />
                    </Grid.Cell>
                    <Grid.Cell
                      columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}
                    >
                      <TextField
                        size="slim"
                        label="Base Price"
                        type="number"
                        value={`${formData.size.basePrice}`}
                        onChange={(value: any) => handleSizeBasePrice(value)}
                        onBlur={(value: any) => handleSizeBasePrice(value, true)}
                        autoComplete="on"
                        error={getError(actionData, "size.basePrice")}
                      />
                    </Grid.Cell>
                    <Grid.Cell
                      columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}
                    >
                      <TextField
                        size="slim"
                        label="Number at start pricing char"
                        type="number"
                        value={`${formData.size.startPriceAtChar}`}
                        onChange={handleSizeStartPriceAtChar}
                        autoComplete="on"
                        error={getError(actionData, "size.startPriceAtChar")}
                      />
                    </Grid.Cell>
                    <Grid.Cell
                      columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}
                    >
                      <TextField
                        size="slim"
                        label="Char Price"
                        type="number"
                        value={`${formData.size.charPrice}`}
                        onChange={(value: any) => handleSizeCharPrice(value)}
                        onBlur={(value: any) => handleSizeCharPrice(value, true)}
                        autoComplete="on"
                        error={getError(actionData, "size.charPrice")}
                      />
                    </Grid.Cell>
                  </Grid>
                </Box>
              </Grid.Cell>

              <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
                <TextField
                  label="Additional  price"
                  type="number"
                  value={`${formData.additionalPrice}`}
                  autoComplete="off"
                  onChange={(value) => handleAdditionalPrice(value)}
                  onBlur={(value: any) => handleAdditionalPrice(value, true)}
                  error={getError(actionData, "additionalPrice")}
                />
              </Grid.Cell>
              <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
                <TextField
                  size="medium"
                  label="Color name"
                  value={formData.color.name}
                  onChange={(value) => {
                    formData.color.name = value;
                    handleInputChange("color", formData.color);
                  }}
                  error={getError(actionData, "color.name")}
                  autoComplete="on"
                />
              </Grid.Cell>
            </Grid>
          </Box>

          <Divider borderWidth="050" />
          <Box paddingInline="300" paddingBlock="300">
            <InlineStack align="end" gap="600">
              <button className="back-large-btn" type="button" onClick={onBack}>
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
  );
}

const formSchema = z.object({
  name: z
    .string({ required_error: "Title is required" })
    .min(1, "Title is too short")
    .max(100, "Title is too long"),
  description: z.string().nullish().transform(stringTransform),
  icon: z.string().nullish().transform(stringTransform),
  image: z.string().nullish().transform(stringTransform),
  additionalPrice: z.number({ required_error: "Price is required" }),
  fixingMethods: z
    .any()
    .transform(jsonTransform)
    .pipe(z.number().array()),
  shapeId: z.number({
    required_error: "Shape is required",
    invalid_type_error: "Shape is required",
  }),
  size: z
    .any()
    .transform(jsonTransform)
    .pipe(
      z.object({
        width: z.number({ required_error: "Width  is required" }),
        height: z.number({ required_error: "Height  is required" }),
        basePrice: z.number({ required_error: "Base price  is required" }),
        startPriceAtChar: z.number({
          required_error: "Start price at char  is required",
        }),
        maxTextChar: z.number({ required_error: " Max text char is required" }),
        charPrice: z.number({ required_error: "Char price  is required" }),
      }),
    ),
  color: z
    .any()
    .transform(jsonTransform)
    .pipe(
      z.object({
        name:  z.string().nullish().transform(stringTransform),
        codeHex: z.string().nullish().transform(stringTransform),
        prevImg: z.string().nullish().transform(stringTransform),
      }),
    ),
});

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const { session, admin } = await authenticate.admin(request);

  const formData = await request.formData();
  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  const configId = parseInt(params.configId ?? "");
  const materialId = parseInt(params.mId ?? "");
  const componentId = parseInt(params.cId ?? "");
  const submission = parseWithZod(formData, { schema: formSchema });

  if (submission.status !== "success") {
    return json({ status: false, message: null, errors: submission.error });
  }

  let materialOption: MaterialAdvanceOptionType =
    submission.value as MaterialAdvanceOptionType;

  if (
    id &&
    !Number.isNaN(configId) &&
    !Number.isNaN(materialId) &&
    !Number.isNaN(componentId) &&
    !Number.isNaN(id)
  ) {
    let res = await MaterialAdvancedOptionService.update(
      configId,
      session.id,
      materialId,
      componentId,
      materialOption,
      parseInt(id),
    );
    return res
      ? redirect(
          `..${flashMessage("Material advance option updated successfully")}`,
        )
      : redirect(
          `..${flashMessage("Failed to update material advance option", "error")}`,
        );
  } else {
    let res = await MaterialAdvancedOptionService.add(
      configId,
      session.id,
      materialId,
      componentId,
      materialOption,
    );
    return res
      ? redirect(
          `..${flashMessage("Material advance option added successfully")}`,
        )
      : redirect(
          `..${flashMessage("Failed to add material advance option", "error")}`,
        );
  }
};
