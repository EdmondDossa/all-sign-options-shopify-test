import { BiSaveIcon, RayStartArrowIcon } from "~/components/icons";
import { SpacingBackground } from "~/components/layouts";
import ConfigSettingsService from "~/models/ConfigSetttings.service";
import { authenticate } from "~/shopify.server";
import { jFlashMessage } from "~/utils/message-flash";
import { ActionFunctionArgs, json, LoaderFunctionArgs } from "@remix-run/node";
import {
  Form,
  useNavigation,
  useOutletContext,
  useSubmit,
} from "@remix-run/react";
import {
  Box,
  Divider,
  Grid,
  InlineStack,
  Select,
  TextField,
} from "@shopify/polaris";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const { session, admin } = await authenticate.admin(request);

  return null;
};

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const { session, admin } = await authenticate.admin(request);

  const formData = await request.formData();
  const configId = params.configId;
  const method = request.method;

  switch (method) {
    case "POST": {
      const customizer: any = formData.get("customizer");
      if (customizer) {
        await ConfigSettingsService.updateSettingsSection(
          parseInt(`${configId}`),
          session.id,
          "generals",
          "customizer",
          JSON.parse(customizer),
        );
        return json({
          ...jFlashMessage("Customizer setting updated successfully"),
        });
      }
    }
    default:
      break;
  }

  return null;
};

interface CustomizerOptionsProps {
  measurementUnit: "cm" | "in" | "both";
  showHideMeasurements: "both" | "nothing" | "only-height" | "only-width";
  decimalFormatMeasurements: "decimal" | "no-decimal";
  fontFamilyName: string;
  priceStartOptions: "at-zero" | "default-text-price";
  priceMeasurementAnimation: "on" | "off";
  destokColumnOrder: "right" | "left";
  glowSwitch: "no-glow" | "glow-only" | "glow-switch";
  discount: "none" | "percent" | "fixed";
  displayOptions: "name" | "both";
  useExampleIcon: boolean;
  shadowSwitch: boolean;
  exampleText: string;
  showExampleOnHover: boolean;
  discountValue: number;
  showDayNightButton: boolean;
  displayPriceBeforeFinishBotton: "hide" | "show";
  textAlignment:
    | "display-alignment"
    | "hide-left-align"
    | "hide-center-align"
    | "hide-right-align";
}

const GeneralsSettingsCustomizerOptions = () => {
  const submit = useSubmit();
  const { shop, currencySymbol, configuration } = useOutletContext<any>();
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isValid },
    watch,
    setValue,
    getValues,
    trigger,
  } = useForm<CustomizerOptionsProps>({
    defaultValues: {
      measurementUnit: "cm",
      showHideMeasurements: "both",
      decimalFormatMeasurements: "no-decimal",
      fontFamilyName: "",
      priceStartOptions: "at-zero",
      priceMeasurementAnimation: "on",
      destokColumnOrder: "right",
      glowSwitch: "glow-only",
      discount: "none",
      displayOptions: "name",
      useExampleIcon: true,
      shadowSwitch: true,
      exampleText: "Example",
      showExampleOnHover: false,
      discountValue: 0,
      showDayNightButton: true,
      displayPriceBeforeFinishBotton: "hide",
      textAlignment: "display-alignment",
    },
    mode: "onChange",
  });

  const navigation = useNavigation();
  let isSubmitting = navigation.state == "submitting";

  type FieldType = {
    label: string;
    name: keyof CustomizerOptionsProps;
    helpText?: string;
    type?: string;
    options?: { label: string; value: any }[];
  };

  const fields: FieldType[] = [
    {
      label: "Measurement Unit",
      name: "measurementUnit",
      helpText: "",
      type: "select",
      options: [
        { label: "Centimeters", value: "cm" },
        { label: "Inches", value: "in" },
        { label: "Both", value: "both" },
      ],
    },
    {
      label: "Show/Hide Measurements",
      name: "showHideMeasurements",
      helpText: "",
      type: "select",
      options: [
        { label: "show both width and height", value: "both" },
        { label: "Do not show measurements", value: "nothing" },
        { label: "Only show height", value: "only-height" },
        { label: "Only show width", value: "only-width" },
      ],
    },
    {
      label: "Decimal Format Measurements",
      name: "decimalFormatMeasurements",
      helpText: "",
      type: "select",
      options: [
        { label: "Decimal", value: "decimal" },
        { label: "No Decimal", value: "no-decimal" },
      ],
    },
    /* { label: "Font Family Name", name: "fontFamilyName" },
    { label: "Price Start Options", name: "priceStartOptions" }, 
    { label: "Price Measurement Animation", name: "priceMeasurementAnimation" },*/
    {
      label: "Destok Column Order",
      name: "destokColumnOrder",
      type: "select",
      helpText: "",
      options: [
        { label: "Right", value: "right" },
        { label: "Left", value: "left" },
      ],
    },
    /* { label: "Glow Switch", name: "glowSwitch" }, */
    {
      label: "Shadow Button Switch",
      name: "shadowSwitch",
      helpText:
        "Display shadow button to turn on or off shadow on the sign",
      type: "select",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    {
      label: "Show Day/Night Button",
      name: "showDayNightButton",
      helpText:
        "Display a switch to turn default background into day or night mode.",
      type: "select",
      options: [
        { label: "Show", value: true },
        { label: "Hide", value: false },
      ],
    },
    {
      label: "Display example icon",
      name: "useExampleIcon",
      helpText:
        "How example button are supposed to be displayed",
      type: "select",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    {
      label: "Example Text",
      name: "exampleText",
      helpText:
        "Text to be displayed on the example button",
      type: "text",
    },
    {
      label: "Show Example on hover",
      name: "showExampleOnHover",
      helpText:
        "Display example button to turn on or off shadow on the sign",
      type: "select",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    {
      label: "Discount",
      name: "discount",
      type: "select",
      helpText: "Apply a discount to the total product price.",
      options: [
        { label: "None", value: "none" },
        { label: "Percentage of Total Amount", value: "percent" },
        { label: "Fixed Amount", value: "fixed" },
      ],
    },
    {
      label: "Display Options",
      name: "displayOptions",
      type: "select",
      helpText: "How options are supposed to be displayed",
      options: [
        { label: "Option Name", value: "name" },
        { label: "Option prevew image and name", value: "both" },
      ],
    },
    { label: "Discount", name: "discountValue", type: "number" },
    {
      label: "Display Price Before Finish Botton (only on skin Mono)",
      name: "displayPriceBeforeFinishBotton",
      type: "select",
      helpText: "Display the price of the sign before the finish button .",
      options: [
        { label: "Hide", value: "hide" },
        { label: "Show", value: "show" },
      ],
    },

    /* { label: "Text Alignment", name: "textAlignment" }, */
  ];

  useEffect(() => {
    if (configuration?.data?.settings?.generals?.customizer) {
      const customizerSettings =
        configuration.data.settings.generals.customizer;

      const formValues = {
        measurementUnit: customizerSettings.measurementUnit || "cm",
        showHideMeasurements: customizerSettings.showHideMeasurements || "both",
        decimalFormatMeasurements:
          customizerSettings.decimalFormatMeasurements || "no-decimal",
        fontFamilyName: customizerSettings.fontFamilyName || "",
        priceStartOptions: customizerSettings.priceStartOptions || "at-zero",
        priceMeasurementAnimation:
          customizerSettings.priceMeasurementAnimation || "on",
        destokColumnOrder: customizerSettings.destokColumnOrder || "right",
        glowSwitch: customizerSettings.glowSwitch || "glow-only",
        discount: customizerSettings.discount || "none",
        displayOptions: customizerSettings.displayOptions || "name",
        discountValue: customizerSettings.discountValue || 0,
        showDayNightButton:
          customizerSettings.showDayNightButton !== undefined
            ? customizerSettings.showDayNightButton
            : true,
        displayPriceBeforeFinishBotton:
          customizerSettings.displayPriceBeforeFinishBotton || "hide",
        textAlignment: customizerSettings.textAlignment || "display-alignment",
      };
      reset(formValues);
    }
  }, [configuration, reset]);

  const onInternalSubmit = (data: CustomizerOptionsProps) => {
    try {
      submit({ customizer: JSON.stringify(data) }, { method: "POST" });
    } catch (e) {
      console.error("Error submitting form:", e);
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit(onInternalSubmit)}>
        <Box paddingInline="300" paddingBlock="200" as="div">
          <SpacingBackground backgroundColor="#F8F9FB">
            <Box paddingInline="300" paddingBlock="100">
              <Grid
                gap={{ lg: "30px" }}
                columns={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}
              >
                {fields.map((field, index) => (
                  <>
                    {field.type != "select" ? (
                      field.name == "discountValue" ? (
                        watch("discount") != "none" && (
                          <Controller
                            name={field.name}
                            control={control}
                            rules={{ required: true }}
                            render={({
                              field: { onChange, onBlur, value },
                            }) => (
                              <Grid.Cell
                                columnSpan={{
                                  xs: 6,
                                  sm: 6,
                                  md: 3,
                                  lg: 3,
                                  xl: 3,
                                }}
                                key={field.name}
                              >
                                <TextField
                                  label={`${field.label} ${
                                    watch("discount") == "percent"
                                      ? "Percentage"
                                      : "Price"
                                  }`}
                                  onChange={onChange}
                                  onBlur={onBlur}
                                  prefix={
                                    watch("discount") == "fixed"
                                      ? currencySymbol
                                      : ""
                                  }
                                  value={
                                    value === undefined || value === null
                                      ? ""
                                      : String(value)
                                  }
                                  suffix={
                                    watch("discount") == "percent" ? "%" : ""
                                  }
                                  helpText={field.helpText}
                                  type={field.type as any}
                                  autoComplete="off"
                                />
                              </Grid.Cell>
                            )}
                          />
                        )
                      ) : (
                        <Controller
                          name={field.name}
                          control={control}
                          rules={{ required: true }}
                          render={({ field: { onChange, onBlur, value } }) => (
                            <Grid.Cell
                              columnSpan={{
                                xs: 6,
                                sm: 6,
                                md: 3,
                                lg: 3,
                                xl: 3,
                              }}
                              key={field.name}
                            >
                              <TextField
                                label={field.label}
                                onChange={onChange}
                                onBlur={onBlur}
                                value={
                                  value === undefined || value === null
                                    ? ""
                                    : String(value)
                                }
                                helpText={field.helpText}
                                type={field.type as any}
                                autoComplete="off"
                              />
                            </Grid.Cell>
                          )}
                        />
                      )
                    ) : (
                      <Controller
                        name={field.name}
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { onChange, onBlur, value } }) => (
                          <Grid.Cell
                            columnSpan={{ xs: 6, sm: 6, md: 3, lg: 3, xl: 3 }}
                            key={field.name}
                          >
                            <Select
                              label={field.label}
                              options={field.options || []}
                              onChange={onChange}
                              onBlur={onBlur}
                              value={
                                value === undefined || value === null
                                  ? ""
                                  : String(value)
                              }
                              helpText={field.helpText}
                            />
                          </Grid.Cell>
                        )}
                      />
                    )}
                  </>
                ))}
              </Grid>

              <Divider borderWidth="100" />
            </Box>
          </SpacingBackground>
        </Box>
        <SpacingBackground
          backgroundColor="#F9F9F9"
          bottom="0"
          shadow="0px 0px 10px rgba(0, 0, 0, 0.1)"
          width="100%"
          zIndex={100}
        >
          <Box paddingInline="300" paddingBlock="200">
            <InlineStack align="end" gap="600">
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
                      {"Save"}
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
};

export default GeneralsSettingsCustomizerOptions;
