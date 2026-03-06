import { Box, Grid, InlineStack, Text, TextField } from "@shopify/polaris";
import { useEffect, useState } from "react";
import {
  Form,
  useActionData,
  useLoaderData,
  useNavigation,
  useSubmit,
} from "@remix-run/react";
import { BoxBackground, SpacingBackground } from "~/components/layouts";
import {
  settingAction,
  settingLoader,
} from "~/custom-action-loader/config-action-loader";
import { ActionFunctionArgs, json, LoaderFunctionArgs } from "@remix-run/node";
import { stringTransform } from "~/utils/transfomerZod";
import { z } from "zod";
import useHandleFlashMessage from "~/hooks/useHandleFlashMessage";
import { FileInput } from "~/components/inputs";
import { getError } from "~/utils/error-getting";
import { BiSaveBtn, ToggleButton } from "~/components/buttons";
import { jFlashMessage } from "~/utils/message-flash";
import ConfigSettingsService from "~/models/ConfigSetttings.service";
import { authenticate } from "~/shopify.server";
import { Controller, useForm } from "react-hook-form";
import { FileUploader } from "~/routes/app.upload";
import { BiSaveIcon } from "~/components/icons";
import { fileUrl } from "~/utils/fileUrl";

const settingParams: [string, string] = ["languageImages", "images"];

export const loader = async (agrs: LoaderFunctionArgs) => {
  return await settingLoader(agrs, settingParams);
};

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const { session, admin } = await authenticate.admin(request);

  const formData = await request.formData();
  const configId = params.configId;
  const method = request.method;

  switch (method) {
    case "POST": {
      const images: any = formData.get("images");
      if (images) {
        await ConfigSettingsService.updateSettingsSection(
          parseInt(`${configId}`),
          session.id,
          "languageImages",
          "images",
          JSON.parse(images),
        );
        return json({
          ...jFlashMessage("Images setting updated successfully"),
        });
      }
    }
    default:
      break;
  }

  return null;
};

export default function ConfigSettingsGeneral() {
  const submit = useSubmit();
  let { settingData } = useLoaderData<typeof loader>();
  useHandleFlashMessage();
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  let isSubmitting = navigation.state == "submitting";
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isValid },
    watch,
    setValue,
    getValues,
    trigger,
  } = useForm<any>({
    defaultValues: {
      previewImage: {
        activate: false,
        allowUpload: false,
        uploadText: "",
        displayDefaultBackgroundImage: false,
      },
      enableReviewImage: true,
      reviewScreenImages: {
        activate: false,
        displayDefaultBackgroundImage: false,
      },
      manageImages: [],
    },
    mode: "onChange",
  });

  const handleFormSubmit = async (formData: any) => {
    try {
      submit({ images: JSON.stringify(formData) }, { method: "POST" });
    } catch (error) {
      console.error("Submit error:", error);
    }
  };

  useEffect(() => {
    if (settingData) {
      reset(settingData);
    }
  }, [settingData]);

  return (
    <>
      <Form onSubmit={handleSubmit(handleFormSubmit)} method="POST">
        <SpacingBackground border="1px solid #DDDDDD" margin="4px 0px">
          <BoxBackground>
            <Box paddingInline="300" paddingBlock="1000">
              <Grid gap={{ lg: "20px" }}>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
                  <Text as="strong" fontWeight="bold" variant="bodyLg">
                    Preview images
                  </Text>
                </Grid.Cell>

                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
                  <InlineStack gap="300" blockAlign="center">
                    <Text as="strong" fontWeight="bold" variant="bodyMd">
                      Enable Preview Images
                    </Text>
                    <Controller
                      name="previewImage.activate"
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <ToggleButton
                          id="previewImage.activate"
                          checked={value}
                          onChange={onChange}
                        />
                      )}
                    />
                  </InlineStack>
                  <Text as="p" variant="bodyMd">
                    If ticked, the customers would be able to change backgrounds
                    to the visualizer screen.
                  </Text>
                </Grid.Cell>
                {watch("previewImage.activate") && (
                  <>
                    <Grid.Cell
                      columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}
                    >
                      <InlineStack gap="300" blockAlign="center">
                        <Text as="strong" fontWeight="bold" variant="bodyMd">
                          Display default blue/gray background image
                        </Text>
                        <Controller
                          name="previewImage.displayDefaultBackgroundImage"
                          control={control}
                          render={({ field: { onChange, value } }) => (
                            <ToggleButton
                              id="previewImage.displayDefaultBackgroundImage"
                              checked={value}
                              onChange={onChange}
                            />
                          )}
                        />
                      </InlineStack>
                      <Text as="p" variant="bodyMd">
                        If ticked this image will display before other images
                      </Text>
                    </Grid.Cell>
                    <Grid.Cell
                      columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}
                    >
                      <InlineStack gap="300" blockAlign="center">
                        <Text as="strong" fontWeight="bold" variant="bodyMd">
                          Allow customers to upload background images
                        </Text>
                        <Controller
                          name="previewImage.allowUpload"
                          control={control}
                          render={({ field: { onChange, value } }) => (
                            <ToggleButton
                              id="previewImage.allowUpload"
                              checked={value}
                              onChange={onChange}
                            />
                          )}
                        />
                      </InlineStack>
                      <Text as="p" variant="bodyMd">
                        If ticked, the preview images will be shown on the
                        visualizer screen.
                      </Text>
                    </Grid.Cell>
                    {watch("previewImage.allowUpload") && (
                      <Grid.Cell
                        columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}
                      >
                        <Controller
                          name="previewImage.uploadText"
                          control={control}
                          render={({ field: { onChange, value } }) => (
                            <TextField
                              label="Upload Background"
                              value={value || ""}
                              onChange={onChange}
                              autoComplete="off"
                            />
                          )}
                        />
                        <Text as="p" variant="bodyMd">
                          This will be displayed on the upload button.
                        </Text>
                      </Grid.Cell>
                    )}
                  </>
                )}

                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
                  <Text as="strong" fontWeight="bold" variant="bodyLg">
                    Review images
                  </Text>
                </Grid.Cell>

                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
                  <InlineStack gap="300" blockAlign="center">
                    <Text as="strong" fontWeight="bold" variant="bodyMd">
                      Enable Review Images
                    </Text>
                    <Controller
                      name="enableReviewImage"
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <ToggleButton
                          id="enableReviewImage"
                          checked={value}
                          onChange={onChange}
                        />
                      )}
                    />
                  </InlineStack>
                  <Text as="p" variant="bodyMd">
                    If option not ticked, the image showing the customization on
                    the review screen will not be displayed.
                  </Text>
                </Grid.Cell>
                {watch("enableReviewImage") && (
                  <>
                    <Grid.Cell
                      columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}
                    >
                      <InlineStack gap="300" blockAlign="center">
                        <Text as="strong" fontWeight="bold" variant="bodyMd">
                          Enable Review Screen Images
                        </Text>
                        <Controller
                          name="reviewScreenImages.activate"
                          control={control}
                          render={({ field: { onChange, value } }) => (
                            <ToggleButton
                              id="reviewScreenImages.activate"
                              checked={value}
                              onChange={onChange}
                            />
                          )}
                        />
                      </InlineStack>
                      <Text as="p" variant="bodyMd">
                        If ticked, the preview images will be shown on the
                        review screen.
                      </Text>
                    </Grid.Cell>
                    {watch("reviewScreenImages.activate") && (
                      <Grid.Cell
                        columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}
                      >
                        <InlineStack gap="300" blockAlign="center">
                          <Text as="strong" fontWeight="bold" variant="bodyMd">
                            Display default blue/gray background image
                          </Text>
                          <Controller
                            name="reviewScreenImages.displayDefaultBackgroundImage"
                            control={control}
                            render={({ field: { onChange, value } }) => (
                              <ToggleButton
                                id="reviewScreenImages.displayDefaultBackgroundImage"
                                checked={value}
                                onChange={onChange}
                              />
                            )}
                          />
                        </InlineStack>
                        <Text as="p" variant="bodyMd">
                          If ticked this image will display before other images
                        </Text>
                      </Grid.Cell>
                    )}
                  </>
                )}
              </Grid>
            </Box>
            <Box padding="150">
              <InlineStack align="center">
                <FileUploader
                  type={"image"}
                  multiple={true}
                  setFilesData={(files: any) => {
                    if (files?.length > 0) {
                      setValue("manageImages", [
                        ...(getValues("manageImages") || []),
                        ...files,
                      ]);
                    }
                  }}
                  title={"Upload ackground Scenes Images"}
                >
                  <button
                    disabled={isSubmitting}
                    type="button"
                    className="next-large-btn"
                  >
                    <Box paddingInline="1000">
                      <InlineStack gap="300" blockAlign="center">
                        <span style={{ color: "white", fontWeight: "bold" }}>
                          Choose the scenes{" "}
                        </span>
                      </InlineStack>
                    </Box>
                  </button>
                </FileUploader>
              </InlineStack>
            </Box>
            <Box padding="150">
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "16px",
                }}
              >
                {watch("manageImages")?.map((img: string, index: number) => (
                  <div
                    key={index} // n'oubliez pas la key pour React
                    style={{
                      position: "relative",
                      display: "flex",
                      width: "100px",
                      border: "1px solid white",
                      borderRadius: "6px",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        position: "relative",
                        width: "100px",
                        height: "100px",
                      }}
                    >
                      <img
                        src={fileUrl(img)}
                        alt="Image exemple"
                        style={{
                          position: "absolute",
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setValue("manageImages", [
                          ...(getValues("manageImages").filter(
                            (item: string) => item !== img,
                          ) || []),
                        ]);
                      }}
                      style={{
                        backgroundColor: "#ef4444",
                        position: "absolute",
                        top: "0",
                        right: "0",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                        width: "20px",
                        height: "20px",
                        borderRadius: "6px",
                        boxShadow: "0 10px 15px -3px rgba(113, 113, 122, 0.4)",
                        fontWeight: "500",
                        transition: "all ease-in-out 1s",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        style={{
                          width: "12px",
                          height: "12px",
                          fill: "currentColor",
                        }}
                      >
                        <path
                          fillRule="evenodd"
                          d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm3 10.5a.75.75 0 000-1.5H9a.75.75 0 000 1.5h6z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
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
