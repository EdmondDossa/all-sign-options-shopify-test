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

  const handleSelectChange = useCallback(
    (value: string) => setSelected(value),
    [],
  );

  const options = [
    { label: "PNG", value: "1" },
    { label: "JPEG", value: "2" },
    { label: "SVG", value: "3" },
    { label: "PNG + SVG", value: "4" },
    { label: "JPEG + SVG", value: "5" },
    { label: "PNG+ JPEG", value: "6" },
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
                  <BlockStack gap="300">
                  <Text as="strong" fontWeight="bold" variant="bodyLg">Output files format</Text>
                  <Select
                    label="What is your desired output files format ?"
                    options={options}
                    onChange={handleSelectChange}
                    value={selected}
                  />
                  </BlockStack>
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
                  <BlockStack gap="300">
                  <Text as="strong" fontWeight="bold" variant="bodyLg">Watermark</Text>
                  <TextField
                size="medium"
                      label="Upload image"
                      labelHidden
                value={value}
                onChange={handleChange}
                autoComplete="off"
                prefix={
                  <Button size="slim"  icon={uploadIcon} tone="success" variant="primary">
                    Upload image
                  </Button>
                }
              />
                  </BlockStack>
                </Grid.Cell>
               
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
                  <BlockStack gap="300">
                    <InlineStack gap="300">
                      <Text as="strong" fontWeight="bold" variant="bodyLg">Zip  output files</Text>
                      <ReactSwitchCustom checked={checked} setChecked={setChecked} />
                    </InlineStack>
                  <TextField
                    size="medium"
                    label="Zip output folder prefix"
                    value={value}
                    onChange={handleChange}
                    autoComplete="off"
                  />
                  </BlockStack>
                </Grid.Cell>

                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
                  <BlockStack gap="300">
                    <InlineStack gap="300">
                      <Text as="strong" fontWeight="bold" variant="bodyLg">Design composition</Text>
                      <ReactSwitchCustom checked={checked} setChecked={setChecked} />
                    </InlineStack>
                    <Text as="p"> This option allows you to display or not design composition in the order</Text>
                  </BlockStack>
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


