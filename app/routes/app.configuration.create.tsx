import { ActionFunctionArgs } from "@remix-run/node";
import { Form, Outlet, redirect, useNavigate } from "@remix-run/react";
import {
  BlockStack,
  Box,
  Button,
  Card,
  Divider,
  InlineGrid,
  InlineStack,
  Page,
  Text,
  TextField,
} from "@shopify/polaris";
import { useCallback, useState } from "react";
import RayEndArrowIcon from "~/components/icons/RayEndArrowIcon";
import RayStartArrowIcon from "~/components/icons/RayStartArrowIcon";
import { BoxBackground } from "~/components/layouts/BoxBackground";
import { SpacingBackground } from "~/components/layouts/SpacingBackground";

export default function ConfigurationCreate() {
  const [value, setValue] = useState("Jaded Pixel");
  const navigate =  useNavigate()
  const handleChange = useCallback(
    (newValue: string) => setValue(newValue),
    [],
  );

  const onBack = () => {
    navigate('/app/configuration')
  }

  return (
    <Page fullWidth>
      <SpacingBackground width="100%"  height="auto"  >
        <BoxBackground>
          <Box padding="300">
            <Text as="h2" variant="headingMd">
              Create new configuration
            </Text>
          </Box>
          <Divider borderWidth="050" />

                  <Form method="POST" >
                      <Box paddingInline="300" paddingBlock="1000">
                          
            <InlineGrid columns={2} gap="800">
              <TextField
                label="Name configuration"
                value={value}
                onChange={handleChange}
                autoComplete="off"
              />{" "}
              <TextField
                label="Description"
                value={value}
                onChange={handleChange}
                autoComplete="off"
              />{" "}
             
                <TextField
                  size="medium"
                label="Upload Popupimg"
                value={value}
                onChange={handleChange}
                  autoComplete="off"
                  prefix={<Button size="slim" tone="success" variant="primary"> Upload Popupimg</Button>}
                />
                 <TextField
                  size="medium"
                label="Upload Popupimg"
                value={value}
                onChange={handleChange}
                  autoComplete="off"
                  prefix={<Button size="slim" tone="success" variant="primary"> Upload Popupimg</Button>}
              />
            </InlineGrid>
                      </Box>
                      <Divider borderWidth="050" />
                      <Box paddingInline="300" paddingBlock="300">
              <InlineStack align="end" gap="600">
                <button className="back-large-btn" type="button" onClick={onBack}>
                  <Box paddingInline="1000">
                      <InlineStack gap="300">
                          <RayStartArrowIcon /> <span style={{color: "black", fontWeight:"bold" }} > Back</span>
                      </InlineStack>
                  </Box>
                </button>
                <button  className="next-large-btn" type="submit">
                  <Box paddingInline="1000"  >
                      <InlineStack gap="300"  >
                      <span style={{color: "white", fontWeight:"bold" }} > Next</span><RayEndArrowIcon/>
                      </InlineStack>
                  </Box>
                </button>
                          </InlineStack>
                      </Box>
          </Form>
        </BoxBackground>
      </SpacingBackground>
    </Page>
  );
}

export const action = ({ request }:ActionFunctionArgs) => {
  

  return redirect('/app/configuration/demo');
}




