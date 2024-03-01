import { ActionFunctionArgs } from "@remix-run/node";
import { Form, Outlet, redirect, useNavigate } from "@remix-run/react";
import {
  BlockStack,
  Box,
  Button,
  Card,
  Divider,
  Grid,
  InlineGrid,
  InlineStack,
  Page,
  Text,
  TextField,
} from "@shopify/polaris";
import { useCallback, useState } from "react";
import RayEndArrowIcon from "~/components/icons/RayEndArrowIcon";
import RayStartArrowIcon from "~/components/icons/RayStartArrowIcon";
import uploadIcon from "~/components/icons/uploadIcon";
import { BoxBackground } from "~/components/layouts/BoxBackground";
import { SpacingBackground } from "~/components/layouts/SpacingBackground";

export default function MaterialAdditionalOptionCreate() {
  const [value, setValue] = useState("Jaded Pixel");
  const navigate = useNavigate();
  const handleChange = useCallback(
    (newValue: string) => setValue(newValue),
    [],
  );

  const onBack = () => {
    navigate("..");
  };

  return (
    <SpacingBackground width="100%" height="auto">
      <BoxBackground>
        <Box padding="300">
          <Text as="h2" variant="headingMd">
            Add options
          </Text>
        </Box>
        <Divider borderWidth="050" />

        <Form method="POST">
        <Box paddingInline="300" paddingBlock="1000">
              <Grid gap={{lg:"30px"}}>
                <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
                <TextField
                label="Title"
                value={value}
                onChange={handleChange}
                autoComplete="off"
              />
                </Grid.Cell>
             
              <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
              <TextField
                label="Description"
                value={value}
                onChange={handleChange}
                autoComplete="off"
              />
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
                <TextField
                size="medium"
                label="Upload icon"
                value={value}
                onChange={handleChange}
                autoComplete="off"
                prefix={
                  <Button size="slim"  icon={uploadIcon} tone="success" variant="primary">
                    Upload icon
                  </Button>
                }
              />
              </Grid.Cell>
              <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
              <TextField
                size="medium"
                label="Background / image"
                value={value}
                onChange={handleChange}
                autoComplete="off"
                prefix={
                  <Button size="slim" icon={uploadIcon} tone="success" variant="primary">
                    Upload image
                  </Button>
                }
              />
              </Grid.Cell>
              <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
                  <TextField
                    label="Additional price"
                    value={value}
                    onChange={handleChange}
                    autoComplete="off"
                  />
                </Grid.Cell>
              </Grid>
            </Box>
        
          <Divider borderWidth="050" />
          <Box paddingInline="300" paddingBlock="300">
            <InlineStack align="end" gap="600">
              <button className="back-large-btn" type="button" onClick={onBack}>
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
        </Form>
      </BoxBackground>
    </SpacingBackground>
  );
}

export const action = ({ request }: ActionFunctionArgs) => {
  return redirect("..");
};
