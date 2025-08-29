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

const settingParams: [string, string] = ["generals", "output"];
const formSchema = z.object({
  filesFormat: z.string(),
  waterMark: z
    .string({ required_error: "Files format is required" })
    .nullish()
    .transform(stringTransform),
  zipOutputFiles: z
    .any()
    .transform(jsonTransform)
    .pipe(
      z.object({
        active: z.any().transform(booleanTransform).pipe(z.boolean()),
        zipOutFolderPrefix: z.string().nullish().transform(stringTransform),
      }),
    ),
  designComposition: z.any().transform(booleanTransform).pipe(z.boolean()),
  pdfDpi: z.number().int().min(72).max(600).refine((val) => [72, 150, 300, 600].includes(val), {
    message: "DPI must be one of: 72, 150, 300, 600"
  }).default(300),
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

  console.log("setting data :", settingData);
  const options = [
    { label: "PNG", value: "png" },
    { label: "JPEG", value: "jpeg" },
    { label: "SVG", value: "svg" },
    { label: "PNG + SVG", value: "png+svg" },
    { label: "JPEG + SVG", value: "jpeg+svg" },
    { label: "PNG+ JPEG", value: "png+jpeg" },
  ];

  const pdfDpiOptions = [
    { label: "72 DPI (Screen)", value: "72" },
    { label: "150 DPI (Basic Print)", value: "150" },
    { label: "300 DPI (Quality Print)", value: "300" },
    { label: "600 DPI (High Quality Print)", value: "600" },
  ];

  const [formData, setFormData] = useState<any>(
    settingData || {
      filesFormat: options[0].value,
      waterMark: "",
      zipOutputFiles: {
        active: false,
        zipOutFolderPrefix: "aso_",
      },
      designComposition: false,
      pdfDpi: 300,
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
      zipOutputFiles: JSON.stringify(formData.zipOutputFiles),
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
                  <BlockStack gap="300">
                    <Text as="strong" fontWeight="bold" variant="bodyLg">
                      Output files format
                    </Text>
                    <Select
                      label="What is your desired output files format ?"
                      options={options}
                      onChange={(value) =>
                        handleInputChange("filesFormat", value)
                      }
                      value={formData.filesFormat}
                      error={getError(actionData, "filesFormat")}
                    />
                    <Text as="p" variant="bodySm" tone="subdued">
                      Note: A PDF file will be automatically generated in addition to the selected format, regardless of your choice.
                    </Text>
                  </BlockStack>
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
                  <BlockStack gap="300">
                    <Text as="strong" fontWeight="bold" variant="bodyLg">
                      PDF Quality (DPI)
                    </Text>
                    <Select
                      label="Select PDF quality for automatic PDF generation"
                      options={pdfDpiOptions}
                      onChange={(value) =>
                        handleInputChange("pdfDpi", parseInt(value))
                      }
                      value={formData.pdfDpi?.toString() || "300"}
                      error={getError(actionData, "pdfDpi")}
                    />
                    <Text as="p" variant="bodySm" tone="subdued">
                      Tip: The higher the DPI, the larger the PDF file can be; 300 DPI is recommended for printing.
                    </Text>
                  </BlockStack>
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
                  <BlockStack gap="300">
                    <Text as="strong" fontWeight="bold" variant="bodyLg">
                      Watermark
                    </Text>

                    <FileInput
                      error={getError(actionData, "waterMark")}
                      title="Upload image"
                      path={formData.waterMark}
                      handlePath={(value: any) =>
                        handleInputChange("waterMark", value)
                      }
                    />
                  </BlockStack>
                </Grid.Cell>

                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
                  <BlockStack gap="300">
                    <InlineStack gap="300">
                      <Text as="strong" fontWeight="bold" variant="bodyLg">
                        Zip output files
                      </Text>
                      <ReactSwitchCustom
                        checked={formData.zipOutputFiles.active}
                        setChecked={(value: any) => {
                          formData.zipOutputFiles.active = value;
                          handleInputChange(
                            "zipOutputFiles",
                            formData.zipOutputFiles,
                          );
                        }}
                      />
                    </InlineStack>
                    {formData.zipOutputFiles.active && (
                      <TextField
                        size="medium"
                        label="Zip output folder prefix"
                        value={formData.zipOutputFiles.zipOutFolderPrefix}
                        onChange={(value) => {
                          formData.zipOutputFiles.zipOutFolderPrefix = value;
                          handleInputChange(
                            "zipOutputFiles",
                            formData.zipOutputFiles,
                          );
                        }}
                        error={getError(
                          actionData,
                          "zipOutputFiles.zipOutFolderPrefix",
                        )}
                        autoComplete="off"
                      />
                    )}
                  </BlockStack>
                </Grid.Cell>

                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
                  <BlockStack gap="300">
                    <InlineStack gap="300">
                      <Text as="strong" fontWeight="bold" variant="bodyLg">
                        Design composition
                      </Text>
                      <ReactSwitchCustom
                        checked={formData.designComposition}
                        setChecked={(value: any) =>
                          handleInputChange("designComposition", value)
                        }
                      />
                    </InlineStack>
                    <Text as="p">
                      {" "}
                      This option allows you to display or not design
                      composition in the order
                    </Text>
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
