import {
  Box,
  Grid,
  InlineStack,
  Select,
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

const settingParams: [string, string] = ["generals", "mobile"];
const formSchema = z.object({
  showNavigatorMenu: z.string(),
  showNavigationMenuFirst: z.string(),
  mobileSelectionOptionsDisplay: z.string(),
});

export const loader = async (agrs: LoaderFunctionArgs) => {
  return await settingLoader(agrs, settingParams);
};

export const action = async (args: ActionFunctionArgs) => {
  return await settingAction(args, settingParams, formSchema);
};

export default function ConfigSettingsGeneral() {
  const menuMobileOptions = [
    { label: "Off", value: "off" },
    { label: "On", value: "on" },
  ];

  const menuFirstOptions = [
    { label: "Yes", value: "yes" },
    { label: "No", value: "no" },
  ];

  const mobileSectionOptions = [
    { label: "Horizontally Stack", value: "horizontally" },
    { label: "Scroll", value: "scroll" },
  ];

  const submit = useSubmit();
  let { settingData } = useLoaderData<typeof loader>();
  useHandleFlashMessage();
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  let isSubmitting = navigation.state == "submitting";

  console.log("setting data :", settingData);

  const [formData, setFormData] = useState<any>(
    settingData || {
      showNavigatorMenu: menuMobileOptions[0].value,
      showNavigationMenuFirst: menuFirstOptions[0].value,
      mobileSelectionOptionsDisplay: mobileSectionOptions[0].value,
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
              <Grid gap={{ lg: "30px" }}>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
                  <Select
                    label="Show Navigation Menu on Mobile"
                    helpText="Display a navigation menu of the selections on mobile."
                    options={menuMobileOptions}
                    onChange={(value) =>
                      handleInputChange("showNavigatorMenu", value)
                    }
                    value={formData.showNavigatorMenu}
                    error={getError(actionData, "showNavigatorMenu")}
                  />
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
                  <Select
                    label="Show Navigation Menu First"
                    helpText="This allows the users to jump to a specific selection from the navigation menu first. Otherwise, the screen will show the first selection."
                    options={menuFirstOptions}
                    onChange={(value) =>
                      handleInputChange("showNavigationMenuFirst", value)
                    }
                    value={formData.showNavigationMenuFirst}
                    error={getError(actionData, "showNavigationMenuFirst")}
                  />
                </Grid.Cell>

                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
                  <Select
                    label="Mobile Selection Options Display"
                    options={mobileSectionOptions}
                    helpText="Allow selection options to display as horizontally scrollable options on mobile or stacked vertically."
                    onChange={(value) =>
                      handleInputChange("mobileSelectionOptionsDisplay", value)
                    }
                    value={formData.mobileSelectionOptionsDisplay}
                    error={getError(
                      actionData,
                      "mobileSelectionOptionsDisplay",
                    )}
                  />
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
