import { parseWithZod } from "@conform-to/zod";
import { ActionFunctionArgs, json } from "@remix-run/node";
import { Form, Outlet, redirect, useActionData, useNavigate, useNavigation, useOutletContext, useSearchParams, useSubmit } from "@remix-run/react";
import {
  BlockStack,
  Box,
  Button,
  Card,
  Divider,
  Grid,
  InlineGrid,
  InlineStack,
  Page,
  Text,
  TextField,
} from "@shopify/polaris";
import { useCallback, useState } from "react";
import { z } from "zod";
import { BiSaveBtn } from "~/components/buttons/BiSaveBtn";
import RayEndArrowIcon from "~/components/icons/RayEndArrowIcon";
import RayStartArrowIcon from "~/components/icons/RayStartArrowIcon";
import uploadIcon from "~/components/icons/uploadIcon";
import { FileInput } from "~/components/inputs/FileInput";
import { BoxBackground } from "~/components/layouts/BoxBackground";
import { SpacingBackground } from "~/components/layouts/SpacingBackground";
import useHandleFlashMessage from "~/hooks/useHandleFlashMessage";
import MaterialAdditionalOptionService from "~/models/MaterialAdditionalOption.service";
import MaterialAdditionalOptionItemService from "~/models/MaterialAdditionalOptionItem.service";
import { authenticate } from "~/shopify.server";
import { ConfigAdditionalOption, ConfigAdditionalOptionItem } from "~/types/ConfigDataType";
import { getError } from "~/utils/error-getting";
import { flashMessage } from "~/utils/message-flash";

export default function MaterialAdditionalOptionCreate() {
  const submit = useSubmit();
  const navigation = useNavigation();
  const { additionalOptionItems } = useOutletContext<{
    additionalOptionItems: ConfigAdditionalOptionItem[];
  }>();
  const actionData = useActionData<typeof action>();
  useHandleFlashMessage();
  const [searchParams] = useSearchParams();
  const id = parseInt(searchParams.get("id") || "");
  console.log("action data :", actionData);
  let additionalOptionItem = additionalOptionItems?.find((curr, index) => index == id);
  const [formData, setFormData] = useState<ConfigAdditionalOptionItem>(
    additionalOptionItem?
    additionalOptionItem as ConfigAdditionalOptionItem
      : {
        title: "",
        description: "",
        icon: "",
        image: "",
        additionalPrice:0
      }
  );

  let isLoading = navigation.state == "loading";
  let isSubmitting = navigation.state == "submitting";

  const handleTitle= (value: string) =>
    setFormData({ ...formData, title: value });
  const handleDescription = (value: string) =>
    setFormData({ ...formData, description: value });
  const handleIcon = (value: string) =>
    setFormData({ ...formData, icon: value });
    const handleImage = (value: string) =>
      setFormData({ ...formData, image: value });
  const handleAdditionalPrice= (value: string) =>
    setFormData({ ...formData, additionalPrice: parseFloat(value) });


  const handleSubmit = (e: any) => {
    e.preventDefault();
    submit({ ...formData }, { method: "POST" });
  };

  const navigate = useNavigate();
  const onBack = () => {
    navigate("..");
  };

  return (
    <SpacingBackground width="100%" height="auto">
      <BoxBackground>
        <Box padding="300">
          <Text as="h2" variant="headingMd">
          {Number.isNaN(id)?'Add new option ':'Edit option'}
          
          </Text>
        </Box>
        <Divider borderWidth="050" />

        <Form onSubmit={handleSubmit} method="POST">
        <Box paddingInline="300" paddingBlock="1000">
              <Grid gap={{lg:"30px"}}>
                <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
                <TextField
                label="Title"
                  value={`${formData.title}`}
                  autoComplete="off"
                onChange={handleTitle}
                error={getError(actionData, "title")}
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
              <TextField
                  label="Additional  price"
                  type="number"
                value={`${formData.additionalPrice}`}
                autoComplete="off"
              onChange={handleAdditionalPrice}
              error={getError(actionData, "additionalPrice")}
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
  title: z
    .string({ required_error: "Title is required" })
    .min(3, "Title is too short")
    .max(100, "Title is too long"),
  description: z
    .string({ required_error: "Description is required" })
    .min(3, "Description is too short")
    .max(255, "Description is too long"),
  icon: z.string({ required_error: "Icon file is required" }),
  image: z.string({ required_error: "image file is required" }),
  additionalPrice: z.number({ required_error: "image file is required" })
});

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const { session, admin } = await authenticate.admin(request);

  const formData = await request.formData();
  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  const configId = parseInt(params.configId ?? "");
  const mId = parseInt(params.mId ?? "");
  const aId = parseInt(params.aId ?? "");
  const submission = parseWithZod(formData, { schema: formSchema });

  if (submission.status !== "success") {
    return json({ status: false, message: null, errors: submission.error });
  }

  let configAdditionalOptionItem: ConfigAdditionalOptionItem = submission.value as ConfigAdditionalOptionItem;

  
  if (id && !Number.isNaN(configId)  && !Number.isNaN(mId) && !Number.isNaN(aId) && !Number.isNaN(id)) {
    let res = await MaterialAdditionalOptionItemService.update(
      configId,
      session.id,
      mId, aId,
      configAdditionalOptionItem,
      parseInt(id),
    ); 
    return res
      ? redirect(
          `..${flashMessage("Material  option  updated is completed successfully")}`,
        )
      : redirect(
          `..${flashMessage("Material  option  updated is  fail", "error")}`,
        );
  } else {
    let res = await MaterialAdditionalOptionItemService.add(
      configId,
      session.id,
      mId,
      aId,
      configAdditionalOptionItem,
    );
    return res
      ? redirect(
          `..${flashMessage("Material  option  added is completed successfully")}`,
        )
      : redirect(`..${flashMessage("Material  option  added is  fail", "error")}`);
  }

};
