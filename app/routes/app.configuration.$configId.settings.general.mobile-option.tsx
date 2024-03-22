import {
  BlockStack,
  Box,
  Button,
  Grid,
  InlineStack,
  Select,
  Text,
  TextField,
} from "@shopify/polaris";
import { useCallback, useState } from "react";
import { Form, NavLink, redirect, useNavigate } from "@remix-run/react";
import { BoxBackground } from "~/components/layouts/BoxBackground";
import { SpacingBackground } from "~/components/layouts/SpacingBackground";
import RayEndArrowIcon from "~/components/icons/RayEndArrowIcon";
import { ReactSwitchCustom } from "~/components/inputs/ReactSwitchCustom";
import uploadIcon from "~/components/icons/uploadIcon";

export default function ConfigSettingsGeneral() {
  const [menuMobileSelected, setMenuMobileSelected] = useState("1");
  const [menuFirstSelected, setMenuFirstSelected] = useState("1");
  const [mobileSectionSelected, setMobileSectionSelected] = useState("1");



  const menuMobileOptions = [
    { label: "Off", value: "1" },
    { label: "On", value: "2" }
  ];

  const menuFirstOptions = [
    { label: "Yes", value: "1" },
    { label: "No", value: "2" }
  ];

  const mobileSectionOptions = [
    { label: "Horizontally Stack", value: "1" },
    { label: "Scroll", value: "2" }
  ];


  const navigate = useNavigate();
  const onBack = () => {
    navigate("..");
  };

  return (
    <>
      <Form method="POST">
        <SpacingBackground border="1px solid #DDDDDD">
          <BoxBackground>
          <Box paddingInline="300" paddingBlock="1000">
              <Grid gap={{lg:"30px"}}>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
                 
                  <Select
                    label="Show Navigation Menu on Mobile"
                    helpText="Display a navigation menu of the selections on mobile."
                    options={menuMobileOptions}
                    onChange={setMenuMobileSelected}
                    value={menuMobileSelected}
                  />
                
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
                 
                 <Select
                    label="Show Navigation Menu First"
                    helpText="This allows the users to jump to a specific selection from the navigation menu first. Otherwise, the screen will show the first selection."
                   options={menuFirstOptions}
                   onChange={setMenuFirstSelected}
                   value={menuFirstSelected}
                 />
               
                </Grid.Cell>
                
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
                 
                 <Select
                    label="Mobile Selection Options Display"
                    helpText="Allow selection options to display as horizontally scrollable options on mobile or stacked vertically."
                   options={mobileSectionOptions}
                   onChange={setMobileSectionSelected}
                   value={mobileSectionSelected}
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
                <button className="next-large-btn" type="submit">
                  <Box paddingInline="1000">
                    <InlineStack gap="300">
                      <span style={{ color: "white", fontWeight: "bold" }}>
                        {" "}
                        Save
                      </span>
                      <RayEndArrowIcon />
                    </InlineStack>
                  </Box>
                </button>
              </InlineStack>
            </Box>
          </BoxBackground>
        </SpacingBackground>
      </Form>
    </>
  );
}

export const action = () => {
  return null;
};


