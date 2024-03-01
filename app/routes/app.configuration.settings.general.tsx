import {
  BlockStack,
  Box,
  Checkbox,
  Divider,
  Grid,
  InlineStack,
  Select,
  TextField,
} from "@shopify/polaris";
import { useCallback, useState } from "react";
import {
  Form,
  NavLink,
  redirect,
  useNavigate,
} from "@remix-run/react";
import { BoxBackground } from "~/components/layouts/BoxBackground";
import { SpacingBackground } from "~/components/layouts/SpacingBackground";
import RayEndArrowIcon from "~/components/icons/RayEndArrowIcon";

export default function ConfigSettingsGeneral() {
  const [checked, setChecked] = useState(false);
  const handleChangeCheck = useCallback(
    (newChecked: boolean) => setChecked(newChecked),
    [],
  );

  const [value, setValue] = useState("");
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
      <SpacingBackground backgroundColor="#F4F4F4" width="100%" height="auto"   border="1px solid #DDDDDD">
        <Box paddingBlock="300">
        <InlineStack gap="400" align="center">
          <SubTabItem to="">  Produit</SubTabItem>
          <SubTabItem to="/app/configuration/materiels">  output</SubTabItem>
          <SubTabItem to="/app/configuration/materiels">  Mobile Option</SubTabItem>
      </InlineStack>
        </Box>
      </SpacingBackground>
      <SpacingBackground width="100%" height="auto" border="1px solid #DDDDDD">
        <BoxBackground>
          <Form method="POST">
            <Box paddingInline="300" paddingBlock="1000">
              <Grid gap={{lg:"30px"}}>
                <Grid.Cell columnSpan={{ xs: 2, sm: 2, md: 2, lg: 4, xl: 4 }}>
                  <InlineStack>

                  <Checkbox
                          labelClassName="check-text"
                          label="Enable Text"
                          checked={checked}
                          onChange={handleChangeCheck}
                        />
                  </InlineStack>
                     
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 2, sm: 2, md: 2, lg: 4, xl: 4 }}>
                <Checkbox
                        labelClassName="check-text"
                        label="Enable Image"
                        checked={checked}
                        onChange={handleChangeCheck}
                      />
                </Grid.Cell>
              </Grid>
            </Box>
            <Divider borderWidth="050" />
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
          </Form>
        </BoxBackground>
      </SpacingBackground>
    </>
  );
}

export const action = () => {
  return null;
};

export const SubTabItem = ({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}) => {
  return (
    <NavLink
      className={({ isActive, isPending }) =>
        isActive ? "sub-tab-items active" : "sub-tab-items"
      }
      to={to}
    >
      <BlockStack align="center">
        <InlineStack align="center" gap="200">
          {children}
        </InlineStack>
      </BlockStack>
    </NavLink>
  );
};
