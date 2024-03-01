import {
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
  redirect,
  useNavigate,
} from "@remix-run/react";
import { BoxBackground } from "~/components/layouts/BoxBackground";
import PlusIcon from "~/components/icons/PlusIcon";
import { SpacingBackground } from "~/components/layouts/SpacingBackground";
import RayStartArrowIcon from "~/components/icons/RayStartArrowIcon";
import RayEndArrowIcon from "~/components/icons/RayEndArrowIcon";

export default function MaterialTextImage() {
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
    <div>
      <SpacingBackground width="100%" height="auto" margin="16px 0px ">
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
    </div>
  );
}

export const action = () => {
  return null;
};
