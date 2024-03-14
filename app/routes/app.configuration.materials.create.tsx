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
  Select,
  Text,
  TextField,
} from "@shopify/polaris";
import { useCallback, useState } from "react";
import BiSaveIcon from "~/components/icons/BiSaveIcon";
import RayEndArrowIcon from "~/components/icons/RayEndArrowIcon";
import RayStartArrowIcon from "~/components/icons/RayStartArrowIcon";
import { BoxBackground } from "~/components/layouts/BoxBackground";
import { SpacingBackground } from "~/components/layouts/SpacingBackground";

export default function MaterialCreate() {
  const [value, setValue] = useState("Jaded Pixel");
  const navigate = useNavigate();
  const handleChange = useCallback(
    (newValue: string) => setValue(newValue),
    [],
  );
    
  const [selected, setSelected] = useState("1");

  const handleSelectChange = useCallback(
    (value: string) => setSelected(value),
    [],
  );

  const options = [
    { label: "simple", value: "1" },
    { label: "advanced", value: "2" },
  ];

  const onBack = () => {
    navigate("..");
  };

  return (
    <SpacingBackground width="100%" height="auto" margin="16px 0px ">
      <Form method="POST">
        <SpacingBackground backgroundColor="#F9F9F9">
          <Box paddingInline="300" paddingBlock="600">
            <Text as="h6" variant="bodyMd" fontWeight="bold">
              {" "}
              Create new material
            </Text>
          </Box>
        </SpacingBackground>
        <Divider borderWidth="100" />
        <SpacingBackground backgroundColor="#F8F9FB">
          <Box paddingInline="300" paddingBlock="1000">
            <Grid gap={{ lg: "30px" }}>
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
                  value="mad ame laert"
                  onChange={() => {}}
                  autoComplete="off"
                />
              </Grid.Cell>
              <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
                <TextField
                  size="medium"
                  label="Upload icon"
                  value={value}
                  onChange={handleChange}
                  autoComplete="off"
                  prefix={
                    <Button size="slim" tone="success" variant="primary">
                      {" "}
                      Upload icon
                    </Button>
                  }
                />{" "}
              </Grid.Cell>
              <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
                <TextField
                  size="medium"
                  label="Upload Popupimg"
                  value={value}
                  onChange={handleChange}
                  autoComplete="off"
                  prefix={
                    <Button size="slim" tone="success" variant="primary">
                      {" "}
                      Upload Popupimg
                    </Button>
                  }
                />
                          </Grid.Cell >
                          <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
                          <Select
                    label="Behevior (type)"
                    options={options}
                    onChange={handleSelectChange}
                    value={selected}
                  />
                          </Grid.Cell>
            </Grid>
          </Box>
        </SpacingBackground>
        <Divider borderWidth="100" />
        <SpacingBackground backgroundColor="#F9F9F9">
          <Box paddingInline="300" paddingBlock="300">
            <InlineStack align="end" gap="600">
              <button className="next-large-btn" type="submit">
                <Box paddingInline="1000">
                  <InlineStack gap="300">
                    <BiSaveIcon />
                    <span style={{ color: "white", fontWeight: "bold" }}>
                      {" "}
                      Save
                    </span>
                  </InlineStack>
                </Box>
              </button>
            </InlineStack>
          </Box>
        </SpacingBackground>
      </Form>
    </SpacingBackground>
  );
}

export const action = ({ request }: ActionFunctionArgs) => {
  return redirect("..");
};
