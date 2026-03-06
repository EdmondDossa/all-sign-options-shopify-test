import { useEffect, useState } from "react";
import SpacingBackground from "./SpacingBackground";
import {
  Box,
  Divider,
  Grid,
  InlineStack,
  Select,
  Text,
  TextField,
} from "@shopify/polaris";
import { HelpLink, ToggleButton } from "../buttons";
import { BiSaveIcon, NextLtrIcon, RayStartArrowIcon } from "../icons";
import { Controller, useForm } from "react-hook-form";
import { Form, useNavigation } from "@remix-run/react";
import { AdditionalPriceType } from "~/types/ConfigDataType";
import AdditionalPriceLayout from "./AdditionalPriceLayout";
import UploaderLayout from "./UploderLayout";

interface Props {
  material?: MaterialType;
  isEditing?: boolean;
  currencySymbol?: string;
  onChange?: (material: MaterialType) => void;
  onSubmit: (material: MaterialType) => void;
  onClose: () => void;
}
export interface MaterialType {
  id?: number;
  label: string;
  description: string;
  popupImg: string;
  previewImg: string;
  isDefault: boolean;
  price: AdditionalPriceType;
}
export default function MaterialForm({
  material,
  currencySymbol,
  onChange,
  onSubmit,
  onClose,
  isEditing = false,
}: Props) {
  const defaultSize: MaterialType | any = isEditing
    ? material
    : {
        id: null,
        label: "",
        description: "",
        popupImg: "",
        previewImg: "",
        isDefault: false,
        price: {
          type: "none",
          value: 0,
        },
      };
  const [hasError, setHasError] = useState(false);

  const handleGoBack = () => {
    onClose();
  };

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isValid },
    trigger,
    watch,
    setValue,
  } = useForm<MaterialType>({
    defaultValues: defaultSize,
    mode: "onChange", // Active la validation au changement
  });

  const navigation = useNavigation();
  let isSubmitting = navigation.state == "submitting";

  const onInternalSubmit = (data: MaterialType) => {
    try {
      onSubmit(data);
    } catch (e) {
      console.error("Error submitting form:", e);
    }
  };

  // Surveille les erreurs et met à jour l'état hasError
  useEffect(() => {
    const errorCount = Object.keys(errors).length;
    setHasError(errorCount > 0);
  }, [errors]);

  return (
    <>
      <Box paddingInline="300" paddingBlock="200" background="bg-surface">
        <InlineStack gap="300" align="space-between">
          <Box padding="300" background="bg-surface">
            <Text as="p" variant="headingMd">
              Materials <NextLtrIcon width={6} height={10} />{" "}
              {isEditing ? "Edit Material" : "Add new Material"}
            </Text>
          </Box>
          <InlineStack gap="300" align="center">
            <HelpLink
              url="https://docs.signsdesigner.us/docs/ncpc-documentation/advanced-tips-and-tricks-9638/adding-materials-9748/"
              text="Get Help"
            />
          </InlineStack>
        </InlineStack>
      </Box>

      <Divider />

      <Form onSubmit={handleSubmit(onInternalSubmit)}>
        <Box paddingInline="300" paddingBlock="200" as="div">
          <SpacingBackground backgroundColor="#F8F9FB">
            <Box paddingInline="300" paddingBlock="100">
              <Grid
                gap={{ lg: "30px" }}
                columns={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}
              >
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 3, xl: 3 }}>
                  <Controller
                    name="label"
                    control={control}
                    rules={{ required: "This field is required" }}
                    render={({ field, fieldState }) => (
                      <TextField
                        label="Label"
                        helpText=""
                        value={field.value}
                        onChange={field.onChange}
                        autoComplete="on"
                        error={fieldState.error?.message}
                      />
                    )}
                  />
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 3, xl: 3 }}>
                  <Controller
                    name="description"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        label="Description"
                        helpText=""
                        value={field.value}
                        onChange={(value) => field.onChange(value)}
                        autoComplete="on"
                      />
                    )}
                  />
                </Grid.Cell>
              </Grid>
            </Box>
            <Divider borderWidth="100" />
            <Box>
              <Grid
                gap={{ lg: "30px" }}
                columns={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}
              >
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 2, lg: 3, xl: 2 }}>
                  <Controller
                    name="previewImg"
                    control={control}
                    render={({ field, fieldState }) => (
                      <UploaderLayout
                        label="Preview Image (optional)"
                        modalTitle="Upload Preview Image"
                        helperText="Upload an image to display the material. Adding an image will replace the preview color."
                        buttonText={"choose a picture"}
                        fileType={"image"}
                        value={field.value}
                        isSubmitting={false}
                        onChange={(val) => {
                          field.onChange(val);
                        }}
                      />
                    )}
                  />
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 2, lg: 3, xl: 2 }}>
                  <Controller
                    name="popupImg"
                    control={control}
                    render={({ field, fieldState }) => (
                      <UploaderLayout
                        modalTitle="Upload Popup Image"
                        label="Popup Image (optional)"
                        buttonText={"choose a picture"}
                        helperText="Example Image - displayed as popup"
                        fileType={"image"}
                        value={field.value}
                        isSubmitting={false}
                        onChange={(val) => {
                          field.onChange(val);
                        }}
                      />
                    )}
                  />
                </Grid.Cell>
              </Grid>
            </Box>
            <Box padding={"150"} />
            <Divider borderWidth="100" />
            <Box padding={"150"} />
            <Box>
              <AdditionalPriceLayout
                headerText="Pricing (optional)"
                currencySymbol={currencySymbol}
                type={watch("price.type")}
                value={watch("price.value")}
                onTypeChange={(val: string) => {
                  setValue("price.type", val);
                }}
                onValueChange={(val: number) => {
                  setValue("price.value", val);
                }}
              />
            </Box>
            <Box padding={"150"} />
            <Divider borderWidth="100" />
          </SpacingBackground>
        </Box>

        <SpacingBackground
          backgroundColor="#F9F9F9"
          position="sticky"
          bottom="0"
          shadow="0px 0px 10px rgba(0, 0, 0, 0.1)"
          width="100%"
          zIndex={100}
        >
          <Box paddingInline="300" paddingBlock="200">
            <InlineStack align="end" gap="600">
              <button
                disabled={isSubmitting}
                className="back-large-btn"
                type="button"
                onClick={handleGoBack}
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

              <button
                disabled={isSubmitting}
                className="next-large-btn"
                type="submit"
              >
                <Box paddingInline="1000">
                  <InlineStack gap="300" blockAlign="center">
                    {isSubmitting && (
                      <img
                        width="22"
                        height="22"
                        src="/assets/loading/ic_loading_gray.svg"
                      />
                    )}
                    <span style={{ color: "white", fontWeight: "bold" }}>
                      {isEditing ? "Update" : "Save"}
                    </span>
                    {!isSubmitting && <BiSaveIcon />}
                  </InlineStack>
                </Box>
              </button>
            </InlineStack>
          </Box>
        </SpacingBackground>
      </Form>
    </>
  );
}
