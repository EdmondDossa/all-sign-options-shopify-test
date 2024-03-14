import {
  Box,
  Divider,
  Grid,
  InlineStack,
  Text,
  TextField,
} from "@shopify/polaris";
import { useCallback, useState } from "react";
import {
  Form,
  redirect,
  useNavigate,
} from "@remix-run/react";
import { BoxBackground } from "~/components/layouts/BoxBackground";
import { SpacingBackground } from "~/components/layouts/SpacingBackground";
import { ReactSwitchCustom } from "~/components/inputs/ReactSwitchCustom";
import BiSaveIcon from "~/components/icons/BiSaveIcon";
import { TextColorField } from "~/components/inputs/TextColorField";

export default function ColorPaletteCreate() {
  const [color, setColor] = useState<string|undefined>("#FFFFFF");
  const [color1, setColor1] = useState<string|undefined>("#FFFFFF");
  const [value, setValue] = useState("color a");

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
          <Form method="POST">
            <SpacingBackground backgroundColor="#F9F9F9">
              
            <Box paddingInline="300" paddingBlock="600">
                  <Text as="h6" variant="bodyMd" fontWeight="bold" > Add new color</Text>
            </Box>
          </SpacingBackground>
            <Divider borderWidth="100" />
            <SpacingBackground backgroundColor="#F8F9FB">
              
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
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
                  <TextColorField label="Text color" color={color} setColor={setColor}/>
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
                  <TextColorField label="Background Color" color={color1} setColor={setColor1}/>
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
    </div>
  );
}

export const action = () => {
  return redirect("..");
};
