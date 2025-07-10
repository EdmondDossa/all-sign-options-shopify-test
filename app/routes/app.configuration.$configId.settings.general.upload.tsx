import {
  BlockStack,
  Box,
  Grid,
  InlineStack,
  Select,
  Text,
  TextField,
} from "@shopify/polaris";
import { useState } from "react";
import {
  Form,
  useActionData,
  useLoaderData,
  useNavigation,
  useSubmit,
} from "@remix-run/react";
import { BoxBackground } from "~/components/layouts/BoxBackground";
import { SpacingBackground } from "~/components/layouts/SpacingBackground";
import { ReactSwitchCustom } from "~/components/inputs/ReactSwitchCustom";
import {
  settingAction,
  settingLoader,
} from "~/custom-action-loader/config-action-loader";
import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import {
  booleanTransform,
  jsonTransform,
  stringTransform,
} from "~/utils/transfomerZod";
import { z } from "zod";
import useHandleFlashMessage from "~/hooks/useHandleFlashMessage";
import { FileInput } from "~/components/inputs/FileInput";
import { getError } from "~/utils/error-getting";
import { BiSaveBtn } from "~/components/buttons/BiSaveBtn";

const settingParams: [string, string] = ["generals", "upload"];
const formSchema = z.object({
  allowFormat: z.string(),
  maxUploadSize: z.number(),
  maxUploadNumber: z.number(),
  zipFiles: z
    .any()
    .transform(jsonTransform)
    .pipe(
      z.object({
        active: z.any().transform(booleanTransform).pipe(z.boolean()),
        zipOutFolderPrefix: z.string().nullish().transform(stringTransform),
      }),
    ),
});

export const loader = async (agrs: LoaderFunctionArgs) => {
  return await settingLoader(agrs, settingParams);
};

export const action = async (args: ActionFunctionArgs) => {
  return await settingAction(args, settingParams, formSchema);
};

export default function ConfigSettingsGeneral() {
  const submit = useSubmit();
  let { settingData } = useLoaderData<typeof loader>();
  useHandleFlashMessage();
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  let isSubmitting = navigation.state == "submitting";



  const [formData, setFormData] = useState<any>(
    settingData || {
      allowFormat: "jpg,jpeg,png,gif,bmp,tiff,webp,psd,ai,svg,eps,pdf",
      maxUploadSize: 100,
      maxUploadNumber: 5,
      zipFiles: {
        active: false,
        zipOutFolderPrefix: "aso_",
      }
    },
  );

  const handleInputChange = (inputName: string, value: any) => {
    setFormData((prevData: any) => ({
      ...prevData,
      [inputName]: value,
    }));
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const data = {
      ...formData,
      zipFiles: JSON.stringify(formData.zipFiles),
    };

    submit(data, { method: "POST" });
  };

  return (
    <>
      <Form onSubmit={handleFormSubmit} method="POST">
        <SpacingBackground border="1px solid #DDDDDD">
          <BoxBackground>
            <Box paddingInline="300" paddingBlock="1000">
              <Grid gap={{ lg: "30px" }}>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
                <TextField
                    label="Allowed upload formats"
                    onChange={(value) => handleInputChange("allowFormat", value)}
                    helpText="Separate formats with commas (e.g., jpg, png, psd)"
                    value={formData.allowFormat}
                    error={getError(actionData, "allowFormat")}
                    autoComplete=""
                  />

                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
                    <TextField
                      error={getError(actionData, "maxUploadSize")}
                      label="Maximum  upload size (MB)"
                      value={formData.maxUploadSize}
                      onChange={(value: any) =>
                        handleInputChange("maxUploadSize", value)
                      }
                      autoComplete=""
                      min={0}
                      max={5000}
                    />
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
                    <TextField
                      error={getError(actionData, "maxUploadNumber")}
                      label="Maximum  upload number"
                      value={formData.maxUploadNumber}
                      onChange={(value: any) =>
                        handleInputChange("maxUploadNumber", value)
                      }
                      autoComplete=""
                      min={0}
                      max={50}
                    />
                </Grid.Cell>

                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
                  <BlockStack gap="300">
                    <InlineStack gap="300">
                      <Text as="strong" fontWeight="bold" variant="bodyLg">
                        Zip output files
                      </Text>
                      <ReactSwitchCustom
                        checked={formData.zipFiles.active}
                        setChecked={(value: any) => {
                          formData.zipFiles.active = value;
                          handleInputChange(
                            "zipFiles",
                            formData.zipFiles,
                          );
                        }}
                      />
                    </InlineStack>
                    {formData.zipFiles.active && (
                      <TextField
                        size="medium"
                        label="Zip output folder prefix"
                        value={formData.zipFiles.zipOutFolderPrefix}
                        onChange={(value) => {
                          formData.zipFiles.zipOutFolderPrefix = value;
                          handleInputChange(
                            "zipFiles",
                            formData.zipFiles,
                          );
                        }}
                        error={getError(
                          actionData,
                          "zipFiles.zipOutFolderPrefix",
                        )}
                        autoComplete="off"
                      />
                    )}
                  </BlockStack>
                </Grid.Cell>
              </Grid>
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
