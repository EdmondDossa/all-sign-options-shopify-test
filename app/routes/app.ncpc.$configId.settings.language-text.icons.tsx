import {
  BlockStack,
  Box,
  Grid,
  Icon,
  IndexTable,
  InlineStack,
  Page,
  Select,
  Text,
  TextField,
} from "@shopify/polaris";
import { useEffect, useState } from "react";
import {
  Form,
  useActionData,
  useLoaderData,
  useNavigation,
  useOutletContext,
  useSubmit,
} from "@remix-run/react";
import {
  BoxBackground,
  SpacingBackground,
  UploaderLayout,
} from "~/components/layouts";
import {
  settingAction,
  settingLoader,
} from "~/custom-action-loader/config-action-loader";
import { ActionFunctionArgs, json, LoaderFunctionArgs } from "@remix-run/node";
import { stringTransform } from "~/utils/transfomerZod";
import { set, z } from "zod";
import useHandleFlashMessage from "~/hooks/useHandleFlashMessage";
import { FileInput } from "~/components/inputs";
import { getError } from "~/utils/error-getting";
import {
  BiSaveBtn,
  ToggleButton,
} from "~/components/buttons";
import { jFlashMessage } from "~/utils/message-flash";
import ConfigSettingsService from "~/models/ConfigSetttings.service";
import { authenticate } from "~/shopify.server";
import { Controller, useForm } from "react-hook-form";
import { FileUploader } from "~/routes/app.upload";
import { BiSaveIcon, PlusIcon, RayStartArrowIcon } from "~/components/icons";
import { DeleteIcon, EditIcon } from "@shopify/polaris-icons";
import NcpcRowActions from "~/components/ncpc/NcpcRowActions";
import { fileUrl, getShopPath } from "~/utils/fileUrl";
import { truncateText } from "~/utils/truncate-text";
import { convertSvgUrlToSinglePath } from "~/utils/svgUtils";
import fs from "fs/promises";
import path from "path";

const settingParams: [string, string] = ["languageImages", "icons"];

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
      const icons: any = formData.get("icons");
      const icon: any = formData.get("icon");
      if (!icon) {
        await ConfigSettingsService.updateSettingsSection(
          parseInt(`${configId}`),
          session.id,
          "languageImages",
          "icons",
          JSON.parse(icons),
        );
        return json({
          ...jFlashMessage("Images setting updated successfully"),
        });
      }

      function generateUniqueFileName(extension = "svg"): string {
        const timestamp = Date.now();
        const random = Math.floor(Math.random() * 10000);
        return `svg_${timestamp}_${random}.${extension}`;
      }

      if (icon) {
        const uniqueName = generateUniqueFileName();
        const savePath = path.join(
          process.cwd(),
          `./public/uploads/${getShopPath(session.id)}/icons`,
          uniqueName,
        );
        console.log("savePath", savePath);
        try {
          await fs.mkdir(path.dirname(savePath), { recursive: true });
          await fs.writeFile(savePath, JSON.parse(icon).file);
          const iconData = {
            ...JSON.parse(icon),
            file: `/uploads/${getShopPath(session.id)}/icons/${uniqueName}`,
          };

          let iconsSettings = {
            ...JSON.parse(formData.get("icons") as string),
          };
          if (icon.id != null) {
            const iconId = icon.id;
            delete icon.id;
            const listIcons = JSON.parse(
              formData.get("icons") as string,
            ).listIcons;
            listIcons[iconId] = {
              ...iconData,
            };
            iconsSettings = {
              ...iconsSettings,
              listIcons,
            };
          } else {
            const listIcons = JSON.parse(
              formData.get("icons") as string,
            ).listIcons;
            listIcons.push({
              ...iconData,
            });
            iconsSettings = {
              ...iconsSettings,
              listIcons,
            };
          }
          console.log("iconsSettings", iconsSettings);
          await ConfigSettingsService.updateSettingsSection(
            parseInt(`${configId}`),
            session.id,
            "languageImages",
            "icons",
            iconsSettings,
          );
          return json({
            ...jFlashMessage("Icon saved successfully"),
          });
        } catch (error: any) {
          return json(
            { success: false, error: error.message },
            { status: 500 },
          );
        }
      }
    }
    default:
      break;
  }

  return null;
};

export default function SettingsLanguageImageIcons() {
  const submit = useSubmit();
  let { settingData } = useLoaderData<typeof loader>();
  const { configuration, currencySymbol } = useOutletContext<any>();
  useHandleFlashMessage();
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  let isSubmitting = navigation.state == "submitting";
  const [showForm, setShowForm] = useState(false);
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
      title: "",
      description: "",
      pricing: -1,
      listIcons: [],
    },
    mode: "onChange",
  });
  const [icon, setIcon] = useState(null);

  const handleFormSubmit = async (formData: any) => {
    try {
      submit({ icons: JSON.stringify(formData) }, { method: "POST" });
    } catch (error) {
      console.error("Submit error:", error);
    }
  };

  const handleIconFormSubmit = (icon: any) => {
    const listIcons = watch("listIcons");
    if (icon.file && icon.file.includes(".svg")) {
      if (icon.id != null) {
        const iconId = icon.id;
        delete icon.id;
        listIcons[iconId] = {
          ...icon,
        };
      } else {
        listIcons.push({
          ...icon,
        });
      }
      setValue("listIcons", listIcons);
      const settingsData = getValues();
      submit({ icons: JSON.stringify(settingsData) }, { method: "POST" });
    } else {
      const settingsData = getValues();
      submit(
        { icons: JSON.stringify(settingsData), icon: JSON.stringify(icon) },
        { method: "POST" },
      );
    }
    setIcon(null);
    setShowForm(false);
  };
  const resourceName = {
    singular: "Icon",
    plural: "Icons",
  };
  const addNewIcon = () => {
    setIcon(null);
    setShowForm(true);
  };

  const handleEditIcon = (icon: any) => {
    setIcon(icon);
    setShowForm(true);
  };
  const handleDeleteIcon = (index: number) => {
    const listIcons = watch("listIcons");
    listIcons.splice(index, 1);
    setValue("listIcons", listIcons);
    const settingsData = getValues();
    submit({ icons: JSON.stringify(settingsData) }, { method: "POST" });
    setIcon(null);
    setShowForm(false);
  };
  useEffect(() => {
    if (settingData) {
      reset(settingData);
    }
  }, [settingData]);

  return (
    <Page>
      {!showForm && (
        <>
          <BlockStack gap="200">
            <InlineStack align="space-between" blockAlign="center">
              <Text as="h2" variant="headingMd">
                Icons List
              </Text>
              <button
                className="primary-btn"
                type="button"
                onClick={addNewIcon}
              >
                <Box paddingInline="300">
                  <InlineStack gap="300">
                    <PlusIcon />
                    <span className="primary-btn-text"> Add new icon</span>
                  </InlineStack>
                </Box>
              </button>
            </InlineStack>
          </BlockStack>
          <IndexTable
            resourceName={resourceName}
            itemCount={watch("listIcons").length}
            selectable={false}
            headings={[
              { title: "Label" },
              { title: "Action", alignment: "center" },
            ]}
          >
            {watch("listIcons")?.map((icon: any, index: number) => (
              <IndexTable.Row
                id={index + ""}
                key={index}
                position={index}
                selected={false}
              >
                <IndexTable.Cell>
                  <Text as="strong" variant="bodyMd" tone="subdued">
                    {truncateText(icon.name, 20)}
                  </Text>
                </IndexTable.Cell>
                <IndexTable.Cell>
                  <NcpcRowActions
                    actions={[
                      {
                        content: "Edit",
                        icon: EditIcon,
                        onAction: () => handleEditIcon({ ...icon, id: index }),
                      },
                      {
                        content: "Delete",
                        icon: DeleteIcon,
                        destructive: true,
                        onAction: () => handleDeleteIcon(index),
                      },
                    ]}
                  />
                </IndexTable.Cell>
              </IndexTable.Row>
            ))}
          </IndexTable>
          <Form onSubmit={handleSubmit(handleFormSubmit)} method="POST">
            <SpacingBackground border="1px solid #DDDDDD" margin="4px 0px">
              <BoxBackground>
                <Box paddingInline="300" paddingBlock="1000">
                  <Text as="h6" variant="headingMd">
                    Pricing
                  </Text>
                  <Controller
                    name="pricing"
                    control={control}
                    defaultValue={-1}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <Select
                        options={[
                          { label: "No choice made", value: (-1).toString() },
                          ...(configuration.data.requiredOptions.priceOptions
                            ? configuration.data.requiredOptions.priceOptions.map(
                                (pr: any, index: number) => ({
                                  label: pr.label,
                                  value: index.toString(),
                                }),
                              )
                            : []),
                        ]}
                        value={value.toString()}
                        label="Pricing"
                        onChange={(val) => onChange(Number(val))}
                        helpText="The pricing system chosen will be used to calculate the cost of icons independently of any other text."
                      />
                    )}
                  />
                  <Controller
                    name="title"
                    control={control}
                    defaultValue={-1}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextField
                        value={value}
                        onChange={onChange}
                        label="Title"
                        autoComplete="off"
                      />
                    )}
                  />
                  <Controller
                    name="description"
                    control={control}
                    defaultValue={-1}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextField
                        value={value}
                        onChange={onChange}
                        label="Description"
                        autoComplete="off"
                      />
                    )}
                  />
                </Box>
              </BoxBackground>
            </SpacingBackground>
            <SpacingBackground width="100%" height="auto" margin="3px 0 0 0">
              <BoxBackground>
                <Box paddingInline="300" paddingBlock="300">
                  <InlineStack align="end" gap="600">
                    <button
                      disabled={isSubmitting}
                      className="back-large-btn"
                      type="button"
                      onClick={() => {
                        setIcon(null);
                        setShowForm(false);
                      }}
                    >
                      <Box paddingInline="1000">
                        <InlineStack gap="300">
                          <RayStartArrowIcon />{" "}
                          <span style={{ color: "black", fontWeight: "bold" }}>
                            Back
                          </span>
                        </InlineStack>
                      </Box>
                    </button>
                    <BiSaveBtn isLoading={isSubmitting} title="Save" />
                  </InlineStack>
                </Box>
              </BoxBackground>
            </SpacingBackground>
          </Form>
        </>
      )}
      {showForm && (
        <SpacingBackground border="1px solid #DDDDDD" margin="4px 0px">
          <BoxBackground>
            <Box paddingInline="300" paddingBlock="1000">
              <IconForm
                icon={icon}
                isEditing={icon != null}
                isSubmitting={isSubmitting}
                handleSubmitForm={handleIconFormSubmit}
                handleClose={() => {
                  setIcon(null);
                  setShowForm(false);
                }}
              />
            </Box>
          </BoxBackground>
        </SpacingBackground>
      )}
    </Page>
  );
}

const IconForm = ({
  icon,
  isEditing,
  isSubmitting,
  handleSubmitForm,
  handleClose,
}: {
  icon?: any;
  isEditing?: boolean;
  isSubmitting?: boolean;
  handleSubmitForm: (data: any) => void;
  handleClose: () => void;
}) => {
  const { control, handleSubmit, setValue, getValues, watch, reset } =
    useForm<any>({
      defaultValues:
        icon != null
          ? icon
          : {
              name: "",
              preview: "",
              file: "",
              minHeight: 5,
              basePrice: 0,
            },
      mode: "onChange",
    });

  const [isLoading, setIsLoading] = useState(false);
  const onSubmit = (icon: any) => {
    handleSubmitForm(icon);
  };

  const onSvgFileChange = async (file: string) => {
    setIsLoading(true);
    const singlePathSvg = await convertSvgUrlToSinglePath(fileUrl(file));
    setValue("file", singlePathSvg);
    setValue("preview", file);
    setValue("name", file.split("/").pop()?.split(".")[0]);
    setIsLoading(false);
  };

  useEffect(() => {
    if (icon) {
      reset(icon);
    }
  }, [icon, reset]);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <InlineStack blockAlign="center" gap="500">
        <Controller
          name="preview"
          control={control}
          render={({ field, fieldState }) => (
            <UploaderLayout
              modalTitle="Please set icon file (svg) Icon file"
              label="Original Icon file*"
              buttonText={"choose a picture"}
              helperText="The icon file must be an svg"
              fileType={"image"}
              value={field.value}
              isSubmitting={false}
              onChange={async (value: any) => {
                if (value.toLowerCase().endsWith(".svg")) {
                  await onSvgFileChange(value);
                }
              }}
            />
          )}
        />
        <div
          style={{
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Text as="h6" variant="headingMd">
            Icon Preview*
          </Text>
          <div className="imagecardwidthDeleteBtn">
            <div className="image-container">
              {!isLoading ? (
                <>
                  {watch("file").includes(".svg") ? (
                    <img
                      src={
                        watch("file") && watch("file").trim() != ""
                          ? watch("file")
                          : "/images/im_default-selected.png"
                      }
                      className="card-image"
                    />
                  ) : (
                    <Icon source={watch("file")} />
                  )}
                </>
              ) : (
                <img
                  src="/assets/loading/ic_loading_gray.svg"
                  className="card-image"
                />
              )}
            </div>
          </div>
        </div>
      </InlineStack>
      <Box padding="150">
        <Text as="h6" variant="headingMd">
          <svg
            viewBox="0 0 20 20"
            focusable="false"
            aria-hidden="true"
            fill="currentColor"
            height={16}
            width={16}
          >
            <path d="M10 14a.75.75 0 0 1-.75-.75v-3.5a.75.75 0 0 1 1.5 0v3.5a.75.75 0 0 1-.75.75Z"></path>
            <path d="M9 7a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z"></path>
            <path
              fill-rule="evenodd"
              d="M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Zm-1.5 0a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0Z"
            ></path>
          </svg>
          Why is my icon different?
        </Text>
        <Text as="p">
          We process SVG to ensure that it can be integrated into text panels.
          This can sometimes slightly alter the appearance and thickness of
          lines.
        </Text>
      </Box>
      <Grid columns={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
        <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
          <Controller
            name="name"
            rules={{ required: "This field is required" }}
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                value={field.value}
                onChange={field.onChange}
                label="Icon name"
                autoComplete="off"
                error={fieldState.error?.message}
              />
            )}
          />
        </Grid.Cell>
        <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
          <Controller
            name="basePrice"
            control={control}
            rules={{ min: 0 }}
            render={({ field }) => (
              <TextField
                type="number"
                value={field.value.toString()}
                onChange={(val) => field.onChange(Number(val))}
                label="Base Price"
                autoComplete="off"
                min={0}
                helpText="Base price of the icon if not only on the sign."
              />
            )}
          />
        </Grid.Cell>
        <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
          <Controller
            name="minHeight"
            control={control}
            rules={{ min: 1 }}
            render={({ field }) => (
              <TextField
                type="number"
                value={field.value.toString()}
                onChange={(val) => field.onChange(Number(val))}
                label="Minimum Height"
                autoComplete="off"
                min={1}
                helpText="Minimum svg height in cm (cm)."
              />
            )}
          />
        </Grid.Cell>
      </Grid>
      <InlineStack align="end" gap="600">
        <button
          disabled={isSubmitting}
          className="back-large-btn"
          type="button"
          onClick={handleClose}
        >
          <Box paddingInline="1000">
            <InlineStack gap="300">
              <RayStartArrowIcon />{" "}
              <span style={{ color: "black", fontWeight: "bold" }}>Back</span>
            </InlineStack>
          </Box>
        </button>
        <BiSaveBtn
          isLoading={isSubmitting}
          title={isEditing ? "Update" : "Save"}
        />
      </InlineStack>
    </Form>
  );
};
