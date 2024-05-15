import {
  Box,
  Divider,
  Grid,
  InlineStack,
  Text,
  TextField,
} from "@shopify/polaris";
import { useCallback, useState } from "react";
import {
  Form,
  json,
  redirect,
  useActionData,
  useLoaderData,
  useNavigation,
  useOutletContext,
  useSubmit,
} from "@remix-run/react";
import { SpacingBackground } from "~/components/layouts/SpacingBackground";
import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { authenticate } from "~/shopify.server";
import { z } from "zod";
import { parseWithZod } from "@conform-to/zod";
import { flashMessage, jFlashMessage } from "~/utils/message-flash";
import { FileInput } from "~/components/inputs/FileInput";
import { getError } from "~/utils/error-getting";
import useHandleFlashMessage from "~/hooks/useHandleFlashMessage";
import { BiSaveBtn } from "~/components/buttons/BiSaveBtn";
import { FixingMethodType } from "~/types/SettingsType";
import SettingFixingMethodService from "~/models/SettingFixingMethod.service";
import { BackBtn } from "~/components/buttons/BackBtn";
import { CustomTinymce } from "~/components/inputs/CustomTinymce";
import { stringTransform } from "~/utils/transfomerZod";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const { session, admin } = await authenticate.admin(request);
  const url = new URL(request.url);
  const id = url.searchParams.get("id");

  return json({ id });
};

export default function SettingFixingMethod() {
  const submit = useSubmit();
  const navigation = useNavigation();
  const { fixingMethods } = useOutletContext<{
    fixingMethods: FixingMethodType[];
  }>();
  const actionData = useActionData<typeof action>();
  useHandleFlashMessage();
  console.log("action data :", actionData);
  let { id } = useLoaderData<typeof loader>();
  let fixingMethod = fixingMethods.find((curr) => curr.type == id);
  const [formData, setFormData] = useState<FixingMethodType>(
    fixingMethod as FixingMethodType
  );

  let isLoading = navigation.state == "loading";
  let isSubmitting = navigation.state == "submitting";

  const handleName = (value: string) =>
    setFormData({ ...formData, name: value });
  const handleDescription = (value: string) =>
    setFormData({ ...formData, description: value });
  const handleIcon = (value: string) =>
    setFormData({ ...formData, icon: value });
  const handlePopImg = (value: string) =>
    setFormData({ ...formData, popImg: value });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    submit({ ...formData }, { method: "POST" });
  };

  return (
    <div>
      <SpacingBackground width="100%" height="auto" margin="16px 0px ">
        <Form onSubmit={handleSubmit} method="POST">
          <SpacingBackground backgroundColor="#F9F9F9">
            <Box paddingInline="300" paddingBlock="600">
              <Text as="h6" variant="bodyMd" fontWeight="bold">
                Edit Fixing Method
              </Text>
            </Box>
          </SpacingBackground>
          <Divider borderWidth="100" />
          <SpacingBackground backgroundColor="#F8F9FB">
            <Box paddingInline="300" paddingBlock="1000">
              <Grid gap={{ lg: "30px" }}>
                <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
                  <TextField
                    label="Label"
                    value={`${formData.name}`}
                    onChange={handleName}
                    autoComplete="on"
                    error={getError(actionData, "name")}
                  />
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
                  <TextField
                    label="Description"
                    value={`${formData.description}`}
                    onChange={handleDescription}
                    autoComplete="on"
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
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
                   <CustomTinymce error={getError(actionData, "popImg")} title="Complete popup description" onEditorChange={handlePopImg} value={formData.popImg}/>
                </Grid.Cell>
              </Grid>
            </Box>
          </SpacingBackground>
          <Divider borderWidth="100" />
          <SpacingBackground backgroundColor="#F9F9F9">
            <Box paddingInline="300" paddingBlock="300">
              <InlineStack align="end" gap="600">
              <BackBtn isLoading={isLoading} title="Back"/>
                <BiSaveBtn isLoading={isSubmitting} title="Save" />
              </InlineStack>
            </Box>
          </SpacingBackground>
        </Form>
      </SpacingBackground>
    </div>
  );
}

const formSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .min(3, "Name is too short")
    .max(100, "Name is too long"),
  description: z
    .string({ required_error: "Description is required" })
    .min(3, "Description is too short")
    .max(255, "Description is too long"),
  type: z
    .string({ required_error: "type is required" })
    .min(1, "type is too short")
    .max(255, "type is too long"),
  icon: z.string({ required_error: "Icon file is required" }),
  popImg: z.string().nullish().transform(stringTransform)
});

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const { session, admin } = await authenticate.admin(request);

  const formData = await request.formData();

  const url = new URL(request.url);
  const id = url.searchParams.get("id");

  const submission = parseWithZod(formData, { schema: formSchema });

  if (submission.status !== "success") {
    return json({ status: false, message: null, errors: submission.error });
  }

  let fixingMethod: FixingMethodType = submission.value as FixingMethodType;

  if (id && fixingMethod) {
    let res = await SettingFixingMethodService.update(fixingMethod, session.id);
    return res
      ? redirect(
          `..${flashMessage("Fixing method  updated is completed successfully")}`,
        )
      : json({ ...jFlashMessage("error on Fixing method upadating") });
  }

  return null;
};
