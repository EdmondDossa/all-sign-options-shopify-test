import { ActionFunctionArgs, json } from "@remix-run/node";
import {
  Form,
  Outlet,
  redirect,
  useActionData,
  useNavigate,
  useNavigation,
  useOutletContext,
  useSearchParams,
  useSubmit,
} from "@remix-run/react";
import {
  ActionList,
  AutoSelection,
  BlockStack,
  Box,
  Button,
  ColorPicker,
  Combobox,
  Divider,
  Grid,
  InlineGrid,
  InlineStack,
  LegacyStack,
  Listbox,
  Popover,
  Select,
  Tag,
  Text,
  TextField,
} from "@shopify/polaris";
import { useCallback, useEffect, useMemo, useState } from "react";
import CircleNotCheckIcon from "~/components/icons/CircleNotCheckIcon";
import RayEndArrowIcon from "~/components/icons/RayEndArrowIcon";
import RayStartArrowIcon from "~/components/icons/RayStartArrowIcon";
import uploadIcon from "~/components/icons/uploadIcon";
import { BoxBackground } from "~/components/layouts/BoxBackground";
import { SpacingBackground } from "~/components/layouts/SpacingBackground";
import ColorConvertor from "color-convert";
import BiSaveIcon from "~/components/icons/BiSaveIcon";
import { number, string, z } from "zod";
import { authenticate } from "~/shopify.server";
import { parseWithZod } from "@conform-to/zod";
import { BiSaveBtn } from "~/components/buttons/BiSaveBtn";
import { MaterialAdvanceOptionType } from "~/types/ConfigDataType";
import useHandleFlashMessage from "~/hooks/useHandleFlashMessage";
import MaterialAdditionalOptionService from "~/models/MaterialAdditionalOption.service";
import MaterialAdvancedOptionService from "~/models/MaterialAdvancedOption.service";
import { flashMessage } from "~/utils/message-flash";
import { getError } from "~/utils/error-getting";
import { FileInput } from "~/components/inputs/FileInput";
import { ColorType } from "~/types/ManagePropertyType";
import { FixingMethodType, ShapeType } from "~/types/SettingsType";

export default function MaterialComponentCreate() {
  const navigate = useNavigate();
  const submit = useSubmit();
  const navigation = useNavigation();
  const { materialOptions,manageColors,manageShapes,manageFixingsMethods  } = useOutletContext<{
    materialOptions: MaterialAdvanceOptionType[];
    manageColors: ColorType[];
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
          manageColorId:( manageColors?.length )? manageColors[0].id||0:0,
        fixingMethodId: manageFixingsMethods ? manageFixingsMethods[0]?.type:"",
          shapeId: manageShapes?.length ? manageShapes[0]?.value:"",
          size: {
            width: 0,
            height: 0,
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
  const handleAdditionalPrice = (value: string) =>
    setFormData({ ...formData, additionalPrice: parseFloat(value) });
  const handleManageColorId = (value: string) =>
    setFormData({ ...formData, manageColorId: parseInt(value) });
  const handleFixingMethodId = (value: string) =>
    setFormData({ ...formData, fixingMethodId: value });
  const handleShapeId = (value: string) =>
    setFormData({ ...formData, shapeId: value });
  
  const handleSizeWidth = (value: string) => {
    formData.size.width = parseInt(value);
    setFormData({ ...formData})
  }

  const handleSizeHeight = (value: string) => {
    formData.size.height = parseInt(value);
    setFormData({ ...formData})
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    submit({ ...formData,size:JSON.stringify(formData.size) }, { method: "POST" });
  };

  console.log("actionData",actionData)

  const colors = manageColors.map(manageColor=>({value:`${manageColor.id}`, label:manageColor.name||""}));
  const shapes =  manageShapes.map(manageShape=>({value:manageShape.value, label:manageShape.name||""}));
  const fixingMethods =  manageFixingsMethods.map(manageFixingsMethod=>({value:manageFixingsMethod.type, label:manageFixingsMethod.name||""}));

  


  const onBack = () => {
    navigate("..");
  };

  return (
    <SpacingBackground width="100%" height="auto">
      <BoxBackground>
        <Box padding="300">
          <Text as="h2" variant="headingMd">
            Add option
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
              <FileInput error={getError(actionData, "icon")} title="Upload icon"
                    path={formData.icon} handlePath={handleIcon} />
              </Grid.Cell>
              <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
              <FileInput error={getError(actionData, "image")} title="Upload Background Image"
                    path={formData.image} handlePath={handleImage} />
              </Grid.Cell>

              <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
             
                <Select
                    label="Select fixing method"
                    options={fixingMethods}
                    value={`${formData.fixingMethodId}`}
                    onChange={handleFixingMethodId}
                    error={getError(actionData, "fixingMethodId")}
                  />
              </Grid.Cell>
              <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
                <BlockStack gap="100">
                  <Text as="span"> Size</Text>
                  <InlineStack
                    wrap={false}
                    align="space-between"
                    blockAlign="center"
                  >
                    <TextField
                      label="Size width"
                      type="number"
                value={`${formData.size.width}`}
                autoComplete="off"
              onChange={handleSizeWidth}
              error={getError(actionData, "size.width")}
                    />
                    <Text as="strong" variant="bodyLg">
                      X
                    </Text>
                    <TextField
                  label="Size height"
                  type="number"
                value={`${formData.size.height}`}
                autoComplete="off"
              onChange={handleSizeHeight}
              error={getError(actionData, "size.height")}
              />
                  </InlineStack>
                </BlockStack>
              </Grid.Cell>
              <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
              
                 <Select
                    label="Select shape"
                    options={shapes}
                    value={`${formData.shapeId}`}
                    onChange={handleShapeId}
                    error={getError(actionData, "shapeId")}
                  />
              </Grid.Cell>
              <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
              <TextField
                  label="Additional  price"
                  type="number"
                value={`${formData.additionalPrice}`}
                autoComplete="off"
              onChange={handleAdditionalPrice}
              error={getError(actionData, "additionalPrice")}
              />
              </Grid.Cell>

              <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
                <Select
                    label="Select color"
                    options={colors}
                    value={`${formData.manageColorId}`}
                    onChange={handleManageColorId}
                    error={getError(actionData, "manageColorId")}
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
    .min(3, "Title is too short")
    .max(100, "Title is too long"),
  description: z
    .string({ required_error: "Description is required" })
    .min(3, "Description is too short")
    .max(255, "Description is too long"),
  icon: z.string({ required_error: "Icon file is required" }),
  image: z.string({ required_error: "image file is required" }),
  additionalPrice: z.number({ required_error: "Price is required" }),
  manageColorId: z.number({ required_error: "Color  is required" }),
  fixingMethodId: z.string({ required_error: "Fixing is required" }),
  shapeId: z.string({ required_error: "Shape is required" }),
  size: z.any().transform(value => JSON.parse(value || '')).pipe(
    z.object({
      width:z.number({ required_error: "Width  is required" }),
      height:z.number({ required_error: "Height  is required" })
    })
  )
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
          `..${flashMessage("Material advance option  updated is completed successfully")}`,
        )
      : redirect(
          `..${flashMessage("Material advance option  updated is  fail", "error")}`,
        );
  } else {
    let res = await MaterialAdvancedOptionService.add(
      configId,
      session.id,
      materialId,
      componentId,
      materialOption
    );
    return res
      ? redirect(
          `..${flashMessage("Material advance option  added is completed successfully")}`,
        )
      : redirect(
          `..${flashMessage("Material advance  option  added is  fail", "error")}`,
        );
  }
};


