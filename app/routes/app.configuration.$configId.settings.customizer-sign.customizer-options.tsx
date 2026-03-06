import {
  Box,
  Grid,
  InlineStack,
  Select,
  Text,
} from "@shopify/polaris";
import {  useState } from "react";
import { ReactSwitchCustom } from "~/components/inputs/ReactSwitchCustom";
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
import useHandleFlashMessage from "~/hooks/useHandleFlashMessage";
import { z } from "zod";
import { getError } from "~/utils/error-getting";
import { BiSaveBtn } from "~/components/buttons/BiSaveBtn";
import { booleanTransform } from "~/utils/transfomerZod";

const settingParams: [string, string] = ["customizerSign", "customizerOptions"];
const formSchema = z.object({
  measurementUnit: z.string(),
  showHideMeasurements: z.string(),
  decimalFormatMeasurements: z.string(),
  desktopColumnOrder: z.string(),
  finishButtonPosition: z.string().nullable(),
  allowNextButton: z.any().transform(booleanTransform),
  showThicknessPricing: z.any().transform(booleanTransform),
  showPredefinedSizesInConfigurator: z.any().transform(booleanTransform),
  showCustomSizeInConfigurator: z.any().transform(booleanTransform),
});

export const loader = async (agrs: LoaderFunctionArgs) => {
  return await settingLoader(agrs, settingParams);
};


export const action = async (args: ActionFunctionArgs) => {
  return await settingAction(args, settingParams, formSchema);
};


export default function ConfigSettingsGeneral() {
  const measurementUnitOptions = [
    { label: "Centimeters", value: "cm" },
    { label: "inches", value: "in" },
    { label: "Milimetres", value: "mm" },
    { label: "Mètre", value: "m" },
    { label: "Feet", value: "ft" },
  ];

  const showMeasurementOptions = [
    { label: "show both width and height", value: "both" },
    { label: "Do not show measurements", value: "none" },
    { label: "show only height", value: "height" },
    { label: "show only width", value: "width" }
  ];

  const measurementDecimalFormatOptions = [
    { label: "with decimal ", value: "with-decimal" },
    { label: "No decimal", value: "no-decimal" }
  ];

  const positionOptions = [
    { label: "Right", value: "right" },
    { label: "Left", value: "left" }
  ];

  const finishButtonPositions = [
    { label: "Top", value: "top" },
    { label: "Bottom", value: "bottom" }
  ];

  const allowNextButtons = [
    { label: "Yes", value: "yes" },
    { label: "No", value: "no" }
  ];

  const submit = useSubmit();
  let { settingData } = useLoaderData<typeof loader>();
  useHandleFlashMessage();
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  let isSubmitting = navigation.state == "submitting";



  const [formData, setFormData] = useState<any>(
    settingData || {
         measurementUnit: "mm",
         showHideMeasurements: showMeasurementOptions[0].value,
         decimalFormatMeasurements: measurementDecimalFormatOptions[0].value,
         desktopColumnOrder: 'left',
         finishButtonPosition:'bottom',
         allowNextButton:false,
         showThicknessPricing: false,
         showPredefinedSizesInConfigurator: true,
         showCustomSizeInConfigurator: true,
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

    const data = { ...formData };

    submit(data, { method: "POST" });
  };




  return (
    <>
      <Form onSubmit={handleFormSubmit} method="POST">
        <SpacingBackground border="1px solid #DDDDDD">
          <BoxBackground>
          <Box paddingInline="300" paddingBlock="1000">
              <Grid gap={{lg:"30px"}}>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
                 
                  <Select
                    label="Measurement Unit"
                    options={measurementUnitOptions}
                    onChange={(value) =>
                      handleInputChange("measurementUnit", value)
                    }
                    value={formData.measurementUnit}
                    error={getError(actionData, "measurementUnit")}
                    
                  />
                
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
                 
                 <Select
                    label="Show/hide Measurements"
                   options={showMeasurementOptions}
                   onChange={(value) =>
                    handleInputChange("showHideMeasurements", value)
                  }
                  value={formData.showHideMeasurements}
                  error={getError(actionData, "showHideMeasurements")}
                 />
               
                </Grid.Cell>
                
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
                 
                 <Select
                    label="Decimal Format of Measurements"
                   options={measurementDecimalFormatOptions}
                   onChange={(value) =>
                    handleInputChange("decimalFormatMeasurements", value)
                  }
                  value={formData.decimalFormatMeasurements}
                  error={getError(actionData, "decimalFormatMeasurements")}
                 />
               
                </Grid.Cell>
                <Grid.Cell  columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
                 
                 <Select
                    label="Desktop Column Order"
                   options={positionOptions}
                   onChange={(value) =>
                    handleInputChange("desktopColumnOrder", value)
                  }
                  value={formData.desktopColumnOrder}
                  error={getError(actionData, "desktopColumnOrder")}
                 />
               
                </Grid.Cell>

                <Grid.Cell  columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
                 <Select
                    label="Finish button position"
                   options={finishButtonPositions}
                   onChange={(value) =>
                    handleInputChange("finishButtonPosition", value)
                  }
                  value={formData.finishButtonPosition}
                  error={getError(actionData, "finishButtonPosition")}
                 />
                </Grid.Cell>
                <Grid.Cell  columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
                 <Select
                    label="Allow next button"
                   options={allowNextButtons }
                   onChange={(value) =>
                    handleInputChange("allowNextButton", value =="yes" ? true : false)
                  }
                  value={formData.allowNextButton ?  'yes' : 'no'}
                  error={getError(actionData, "allowNextButton")}
                 />
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
                  <InlineStack blockAlign="center" gap="200">
                    <Text as="p" variant="bodyMd">Show thickness pricing labels in configurator</Text>
                    <ReactSwitchCustom
                      checked={formData.showThicknessPricing ?? false}
                      setChecked={(value: boolean) =>
                        handleInputChange("showThicknessPricing", value)
                      }
                    />
                  </InlineStack>
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
                  <InlineStack blockAlign="center" gap="200">
                    <Text as="p" variant="bodyMd">Show predefined sizes in configurator</Text>
                    <ReactSwitchCustom
                      checked={formData.showPredefinedSizesInConfigurator !== false}
                      setChecked={(value: boolean) =>
                        handleInputChange("showPredefinedSizesInConfigurator", value)
                      }
                    />
                  </InlineStack>
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
                  <InlineStack blockAlign="center" gap="200">
                    <Text as="p" variant="bodyMd">Show Custom size in configurator</Text>
                    <ReactSwitchCustom
                      checked={formData.showCustomSizeInConfigurator !== false}
                      setChecked={(value: boolean) =>
                        handleInputChange("showCustomSizeInConfigurator", value)
                      }
                    />
                  </InlineStack>
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




