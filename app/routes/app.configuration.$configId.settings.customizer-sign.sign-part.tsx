import {
  Box,
  Grid,
  InlineStack,
  Select,
  Text,
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
import useHandleFlashMessage from "~/hooks/useHandleFlashMessage";
import { z } from "zod";
import { getError } from "~/utils/error-getting";
import { BiSaveBtn } from "~/components/buttons/BiSaveBtn";
import { ReactSwitchCustom } from "~/components/inputs/ReactSwitchCustom";
import { booleanTransform, jsonTransform } from "~/utils/transfomerZod";

const settingParams: [string, string] = ["customizerSign", "signPart"];
const formSchema = z.object({
  doublePart:z.any().transform(jsonTransform).pipe(z.object({
    active:z.boolean(),
    label:z.string(),
    part1:z.string(),
    part2:z.string(),
    enableCopyDesignFromSide:z.boolean()
 }))
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

  const [formData, setFormData] = useState<any>(
    settingData || {
      doublePart:{
        active: false,
        label:"Switch Face",
        part1:"Face A",
        part2:"Face B",
        enableCopyDesignFromSide:true
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

    const data = { doublePart: JSON.stringify(formData.doublePart) };

    submit(data, { method: "POST" });
  };

  return (
    <>
      <Form onSubmit={handleFormSubmit} method="POST">
        <SpacingBackground border="1px solid #DDDDDD">
          <BoxBackground>
          <Box paddingInline="300" paddingBlock="1000">
              <Grid gap={{lg:"25px"}}>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
                    <InlineStack gap="300">
                      <Text as="strong"  variant="bodyMd">Enable SIGN Part</Text>
                      <ReactSwitchCustom checked={formData.doublePart.active} setChecked={(value:any) => {
                        formData.doublePart.active = value
                      handleInputChange("doublePart", formData.doublePart )
                    }}  />
                    </InlineStack>
                </Grid.Cell>
                {formData.doublePart.active &&
                  <>
                    <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl:12 }}>
                          <TextField
                            size="medium"
                            label="Label"
                            value={formData.doublePart.label}
                              onChange={(value) => {
                                formData.doublePart.label = value
                              handleInputChange("doublePart", formData.doublePart )
                              }}
                              error={getError(actionData, "doublePart.label")} 
                            autoComplete="off"
                          />
                        </Grid.Cell>
                        <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
                          <TextField
                            size="medium"
                            label="Part 1"
                            value={formData.doublePart.part1}
                              onChange={(value) => {
                                formData.doublePart.part1 = value
                              handleInputChange("doublePart", formData.doublePart )
                              }}
                              error={getError(actionData, "doublePart.part1")} 
                            autoComplete="off"
                          />
                        </Grid.Cell>
                        <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
                          
                          <TextField
                            size="medium"
                            label="Part 2"
                            value={formData.doublePart.part2}
                            onChange={(value) => {
                              formData.doublePart.part2 = value
                            handleInputChange("doublePart", formData.doublePart )
                            }}
                            error={getError(actionData, "doublePart.part2")} 
                          autoComplete="off"
                          />
                        </Grid.Cell>

                        <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
                            <InlineStack gap="300">
                              <Text as="strong"  variant="bodyMd">Enable Copy design from side</Text>
                              <ReactSwitchCustom  checked={formData.doublePart.enableCopyDesignFromSide} setChecked={(value:any) => {
                                formData.doublePart.enableCopyDesignFromSide = value
                              handleInputChange("doublePart", formData.doublePart )
                            }} />
                            </InlineStack>            
                        </Grid.Cell>
                  </>
                }
              
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



