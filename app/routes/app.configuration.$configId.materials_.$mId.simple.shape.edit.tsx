import {
  AutoSelection,
  BlockStack,
  Box,
  Card,
  Checkbox,
  Combobox,
  Divider,
  Grid,
  InlineGrid,
  InlineStack,
  LegacyStack,
  Listbox,
  Select,
  Tag,
  Text,
  TextField,
} from "@shopify/polaris";
import { useCallback, useState, useMemo } from "react";
import { Form, redirect, useActionData, useNavigate, useNavigation, useOutletContext, useSearchParams, useSubmit } from "@remix-run/react";
import { BoxBackground } from "~/components/layouts/BoxBackground";
import { SpacingBackground } from "~/components/layouts/SpacingBackground";
import RayStartArrowIcon from "~/components/icons/RayStartArrowIcon";
import RayEndArrowIcon from "~/components/icons/RayEndArrowIcon";
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
  const [formData, setFormData] = useState<ConfigShape>(
    configShape
      ? (configShape as ConfigShape)
      : {
          shapeId:0,
          additionalPrice: 0
        },
  );

  const options = manageShapes
    ? manageShapes.map((manageShapes, index) => ({
        label: manageShapes.name || "",
        value: `${index}`,
      }))
    : [];

  let isLoading = navigation.state == "loading";
  let isSubmitting = navigation.state == "submitting";

  const HandleShapeId = (value: string) =>
    setFormData({ ...formData, shapeId: parseInt(value)  });
  const handleAdditionalPrice = (value: string) =>
    setFormData({ ...formData, additionalPrice: parseFloat(value) });
  

 

  const handleSubmit = (e: any) => {
    e.preventDefault();
    submit({...formData},{ method: "POST" });
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
                    label="Select shape"
                    options={options}
                    value={`${formData.shapeId}`}
                    onChange={HandleShapeId}
                    error={getError(actionData, "shapeId")}
                  />
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
                  <TextField
                    label="Additional price"
                    type="number"
                    value={`${formData.additionalPrice}`}
                    onChange={handleAdditionalPrice}
                    autoComplete="off"
                    error={getError(actionData, "additionalPrice")}
                  />
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
  shapeId: z.number({ required_error: "Material shape is required" }),
  additionalPrice: z.number({ required_error: "Material shape price is required" }),
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

  let configShape: ConfigShape = submission.value as ConfigShape;

  if (id && !Number.isNaN(configId)  && !Number.isNaN(mId) && !Number.isNaN(id)) {
    let res = await MaterialShapeService.update(
      configId,
      session.id,
      mId,
      configShape,
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
    let res = await MaterialShapeService.add(
      configId,
      session.id,
      mId,
      configShape
    );
    return res
      ? redirect(
          `..${flashMessage("Material shape added is completed successfully")}`,
        )
      : redirect(`..${flashMessage("Material shape added is  fail", "error")}`);
  }
};



