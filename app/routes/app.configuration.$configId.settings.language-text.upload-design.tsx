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
  const [checked, setChecked] = useState(false);
  const [value, setValue] = useState("");
  const [selected, setSelected] = useState("1");


  const handleChange = useCallback(
    (newValue: string) => setValue(newValue),
    [],
  );

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
                      <Text as="strong" fontWeight="bold" variant="bodyLg">Custom design link</Text>
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
                <BlockStack gap="400">
                  
                <InlineStack gap="300" blockAlign="center">
                      <Text as="strong" fontWeight="bold" variant="bodyMd">Enable custom design link </Text>
                      <ReactSwitchCustom checked={checked} setChecked={setChecked} />
                    </InlineStack>
                   
                   <Text as="p" variant="bodySm" tone="subdued" > Enable this to display a link to direct customers to another page on your site, this will display as one of the first options on desktop and mobile.</Text>
                  </BlockStack>
              
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
                  <TextField
                    size="medium"
                    label="Custom Design Link"
                    helpText="URL to redirect customers on your store that will allow for more complex graphic design quote submissions."
                    value={value}
                    onChange={handleChange}
                    autoComplete="off"
                  />
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
                  
                  <TextField
                    size="medium"
                    label="Phrase for link to submit custom design page"
                    value={value}
                    onChange={handleChange}
                    autoComplete="off"
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


