import {
  Box,
  InlineStack,
  TextField,
} from "@shopify/polaris";
import {  useState } from "react";
import {
  Form,
  useActionData,
  useLoaderData,
  useNavigation,
  useSubmit,
} from "@remix-run/react";
import { BoxBackground } from "~/components/layouts/BoxBackground";
import { SpacingBackground } from "~/components/layouts/SpacingBackground";
import {
  settingAction,
  settingLoader,
} from "~/custom-action-loader/config-action-loader";
import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { z } from "zod";
import useHandleFlashMessage from "~/hooks/useHandleFlashMessage";
import { BiSaveBtn } from "~/components/buttons/BiSaveBtn";
import {  stringTransform } from "~/utils/transfomerZod";

const settingParams: [string, string] = ["themeColors", ""];

const formSchema = z.object({
  customCss: z.string().nullish().transform(stringTransform),
});

export const loader = async (agrs: LoaderFunctionArgs) => {
  return await settingLoader(agrs, settingParams);
};

export const action = async (args: ActionFunctionArgs) => {
  return await settingAction(args, settingParams, formSchema);
};

export default function ConfigSettingsCustomCss() {
  const submit = useSubmit();
  let { settingData } = useLoaderData<typeof loader>();
  useHandleFlashMessage();
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  let isSubmitting = navigation.state == "submitting";
  const [formData, setFormData] = useState<any>(
    (settingData?.customCss )? {
      customCss: settingData.customCss
    } : {
      customCss: "",
    }
  );

  console.log("Seting data", settingData);

  const handleInputChange = (inputName: string, value: any) => {
    setFormData((prevData: any) => ({
      ...prevData,
      [inputName]: value,
    }));
  };


  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const data = {customCss: formData.customCss};

    submit(data, { method: "POST" });
  };

  return (
    <>
      <Form onSubmit={handleFormSubmit} method="POST">
        <SpacingBackground border="1px solid #DDDDDD" margin="3px 0 0 0">
          <BoxBackground>
            <Box paddingInline="300" paddingBlock="1000">
              <TextField
                multiline={10}
                label="Custom CSS"
                type="text"
                value={formData.customCss}
                onChange={(value) => handleInputChange("customCss", value)}
                autoComplete="off"
              />
            </Box>
          </BoxBackground>
        </SpacingBackground>

   
        <SpacingBackground width="100%" height="auto" margin="3px 0 0 0">
          <BoxBackground>
            <Box paddingInline="300" paddingBlock="300">
              <InlineStack align="end" gap="600">
                <BiSaveBtn isLoading={isSubmitting} title="Save" />
              </InlineStack>
            </Box>
          </BoxBackground>
        </SpacingBackground>
      </Form>
    </>
  );
}


