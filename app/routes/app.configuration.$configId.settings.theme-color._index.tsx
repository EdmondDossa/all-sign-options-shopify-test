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
import CircleNotCheckIcon from "~/components/icons/CircleNotCheckIcon";
import { CheckSpan } from "~/components/inputs/CheckSpan";
import { TextColorField } from "~/components/inputs/TextColorField";

export default function ConfigSettingsThemeColor() {
  const [checked, setChecked] = useState(false);
  const [value, setValue] = useState("");
  const [color, setColor] = useState<string|undefined>("#FFFFFF");
  const [color1, setColor1] = useState<string|undefined>("#FFFFFF");
  const [color2, setColor2] = useState<string|undefined>("#FFFFFF");
  const [color3, setColor3] = useState<string|undefined>("#FFFFFF");
  const [color4, setColor4] = useState<string|undefined>("#FFFFFF");
  const [color5, setColor5] = useState<string|undefined>("#FFFFFF");
  const [color6, setColor6] = useState<string|undefined>("#FFFFFF");
  const [color7, setColor7] = useState<string|undefined>("#FFFFFF");
  const [color8, setColor8] = useState<string|undefined>("#FFFFFF");
  const [selected, setSelected] = useState("1");

  const handleChange = useCallback(
    (newValue: string) => setValue(newValue),
    [],
  );

  const handleColor = useCallback(
    (newValue: string) => setColor(newValue),
    [],
  );


  const navigate = useNavigate();
  const onBack = () => {
    navigate("..");
  };

  return (
    <>
      <Form method="POST">
        <SpacingBackground border="1px solid #DDDDDD" margin="3px 0 0 0">
          <BoxBackground>
            <Box paddingInline="300" paddingBlock="1000">
              <Grid gap={{ lg: "20px" }}>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
                  <AppearanceItem
                    imgSrc="/theme-color.png"
                    active={checked}
                    onChange={setChecked}
                  />
                </Grid.Cell>
              </Grid>
            </Box>
          </BoxBackground>
        </SpacingBackground>

        <SpacingBackground border="1px solid #DDDDDD" margin="3px 0 0 0">
          <BoxBackground>
            <Box paddingInline="300" paddingBlock="1000">
              <Grid gap={{ lg: "20px" }}>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
                  <Text as="strong" fontWeight="bold" variant="bodyLg">
                    Content Header
                  </Text>
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
                  <TextColorField label="Text color" color={color} setColor={setColor}/>
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
                  <TextColorField label="Background header" color={color1} setColor={setColor1}/>
                </Grid.Cell>
              </Grid>
            </Box>
          </BoxBackground>
        </SpacingBackground>

        <SpacingBackground border="1px solid #DDDDDD" margin="3px 0 0 0">
          <BoxBackground>
            <Box paddingInline="300" paddingBlock="1000">
              <Grid gap={{ lg: "20px" }}>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
                  <Text as="strong" fontWeight="bold" variant="bodyLg">
                  Content Side menu
                  </Text>
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
                  <TextColorField label="Text options  color" color={color2} setColor={setColor2}/>
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
                  <TextColorField label="Background  options" color={color3} setColor={setColor3}/>
                </Grid.Cell>
              </Grid>
            </Box>
          </BoxBackground>
        </SpacingBackground>
        <SpacingBackground border="1px solid #DDDDDD" margin="3px 0 0 0">
          <BoxBackground>
            <Box paddingInline="300" paddingBlock="1000">
              <Grid gap={{ lg: "20px" }}>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
                  <Text as="strong" fontWeight="bold" variant="bodyLg">
                  Menu
                  </Text>
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
                  <TextColorField label="color Text options " color={color4} setColor={setColor4}/>
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
                  <TextColorField label="Background  options" color={color5} setColor={setColor5}/>
                </Grid.Cell>
              </Grid>
            </Box>
          </BoxBackground>
        </SpacingBackground>
        <SpacingBackground border="1px solid #DDDDDD" margin="3px 0 0 0">
          <BoxBackground>
            <Box paddingInline="300" paddingBlock="1000">
              <Grid gap={{ lg: "20px" }}>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
                  <TextColorField label="Color text Button Save" color={color6} setColor={setColor6}/>
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
                  <TextColorField label="Background color text Button Save" color={color7} setColor={setColor7}/>
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

export const AppearanceItem = ({
  imgSrc,
  title,
  active,
  onChange,
}: {
  imgSrc: string;
  title?: string;
  active: boolean;
  onChange: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <SpacingBackground border="1px  solid #E8E8E8" borderRadius="5px">
      <div
        onClick={() => {
          onChange(!active);
        }}
        style={{ position: "relative" }}
      >
        <img
          src={imgSrc}
          alt={title}
          style={{ width: "100%", height: "auto" }}
        />
        <div style={{ position: "absolute", bottom: "0", width:"100%" }}>
          <SpacingBackground
            backgroundColor="white !important"
            margin="0 0 0 0"
            borderRadius="0 0 10px 10px"
            
          >
            <Box background="bg-surface" paddingInline="300" paddingBlock="200">
              <InlineStack align="space-between">
                <Text as="span" variant="bodyMd" fontWeight="bold">
                  Default skyn{" "}
                </Text>
                <InlineStack gap="200">
                  <Text as="span" tone="success">
                    Select
                  </Text>
                  <CheckSpan checked={active} />
                </InlineStack>
              </InlineStack>
            </Box>
          </SpacingBackground>
        </div>
      </div>
    </SpacingBackground>
  );
};
