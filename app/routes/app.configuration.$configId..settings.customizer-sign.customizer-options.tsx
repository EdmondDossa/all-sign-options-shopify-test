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
  const [measurementUnitSelected, setMeasurementUnitSelected] = useState("1");
  const [showMeasurementSelected, setShowMeasurementSelected] = useState("1");
  const [measurementDecimalFormatSelected, setMeasurementDecimalFormatSelected] = useState("1");
  const [positionSelected, setPositionSelected] = useState("1");
  const [displaySwitchSelected, setdDisplaySwitchSelected] = useState("1");



  const measurementUnitOptions = [
    { label: "Centimeters", value: "1" },
    { label: "inches", value: "2" },
    { label: "milimetres", value: "3" },
    { label: "Both Centimeters and Inches", value: "4" }
  ];

  const showMeasurementOptions = [
    { label: "show both width and height", value: "1" },
    { label: "Do not show measurements", value: "3" },
    { label: "show only height", value: "2" },
    { label: "show only width", value: "4" }
  ];

  const measurementDecimalFormatOptions = [
    { label: "with decimal ", value: "1" },
    { label: "No decimal", value: "2" }
  ];

  const positionOptions = [
    { label: "Right", value: "1" },
    { label: "Left", value: "2" }
  ];


  const displaySwitchOptions = [
    { label: "Display ", value: "1" },
    { label: "hidden", value: "2" }
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
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
                 
                  <Select
                    label="Measurement Unit"
                    options={measurementUnitOptions}
                    onChange={setMeasurementUnitSelected}
                    value={measurementUnitSelected}
                  />
                
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
                 
                 <Select
                    label="Show/hide Measurements"
                   options={showMeasurementOptions}
                   onChange={setShowMeasurementSelected}
                   value={showMeasurementSelected}
                 />
               
                </Grid.Cell>
                
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
                 
                 <Select
                    label="Decimal Format of Measurements"
                   options={measurementDecimalFormatOptions}
                   onChange={setMeasurementDecimalFormatSelected}
                   value={measurementDecimalFormatSelected}
                 />
               
                </Grid.Cell>
                <Grid.Cell  columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
                 
                 <Select
                    label="Right or Left"
                   options={positionOptions}
                   onChange={setPositionSelected}
                   value={positionSelected}
                 />
               
                </Grid.Cell>
                
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
                 
                 <Select
                    label=""
                    helpText="Display a switch to turn default background into day or right mode"
                   options={displaySwitchOptions}
                   onChange={setdDisplaySwitchSelected}
                   value={displaySwitchSelected}
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


