import {
  Box,
  Divider,
  Grid,
  InlineStack,
  Select,
  TextField,
} from "@shopify/polaris";
import { useCallback, useState } from "react";
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
import RayEndArrowIcon from "~/components/icons/RayEndArrowIcon";
import { ConfigColor } from "~/types/ConfigDataType";
import { ColorType } from "~/types/ManagePropertyType";
import { BiSaveBtn } from "~/components/buttons/BiSaveBtn";
import { getError } from "~/utils/error-getting";
import { z } from "zod";
import { ActionFunctionArgs, json } from "@remix-run/node";
import { authenticate } from "~/shopify.server";
import { parseWithZod } from "@conform-to/zod";
import MaterialColorService from "~/models/MaterialColors.service";
import { flashMessage } from "~/utils/message-flash";

export default function MaterialColorCreate() {
  const submit = useSubmit();
  const navigation = useNavigation();
  const actionData = useActionData<typeof action>();
  let { manageColors, colors } = useOutletContext<{
    manageColors: ColorType[];
    colors: ConfigColor[];
  }>();
  const [searchParams] = useSearchParams();
  const id = parseInt(searchParams.get("id") || "");
  let configColor = colors?.find((curr, index) => index === id);
  const [formData, setFormData] = useState<ConfigColor>(
    configColor
      ? (configColor as ConfigColor)
      : {
       
          manageColorId: manageColors[0]?.id || 0,
          additionalPrice: 0
        },
  );

  const options = manageColors
    ? manageColors.map((manageColors) => ({
        label: manageColors.name || "",
        value: `${manageColors.id}`,
      }))
    : [];

  let isLoading = navigation.state == "loading";
  let isSubmitting = navigation.state == "submitting";

  const HandleManageColorId = (value: string) =>
    setFormData({ ...formData, manageColorId: parseInt(value) });
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
              <Grid gap={{lg:"30px"}}>
                <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
                  <Select
                    label="Select color"
                    options={options}
                    value={`${formData.manageColorId}`}
                    onChange={HandleManageColorId}
                    error={getError(actionData, "manageColorId")}
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
  manageColorId: z.number({ required_error: "Material color is required" }),
  additionalPrice: z.number({ required_error: "Material color price is required" }),
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

  let configColor: ConfigColor = submission.value as ConfigColor;

  if (id && !Number.isNaN(configId)  && !Number.isNaN(mId) && !Number.isNaN(id)) {
    let res = await MaterialColorService.update(
      configId,
      session.id,
      mId,
      configColor,
      parseInt(id),
    );flashMessage
    return res
      ? redirect(
          `..${flashMessage("Material color  updated is completed successfully")}`,
        )
      : redirect(
          `..${flashMessage("Material color updated is  fail", "error")}`,
        );
  } else {
    let res = await MaterialColorService.add(
      configId,
      session.id,
      mId,
      configColor
    );
    return res
      ? redirect(
          `..${flashMessage("Material color added is completed successfully")}`,
        )
      : redirect(`..${flashMessage("Material color added is  fail", "error")}`);
  }
};
