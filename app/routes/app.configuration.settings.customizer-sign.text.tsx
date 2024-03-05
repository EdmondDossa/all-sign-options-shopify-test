import {
  AutoSelection,
  BlockStack,
  Box,
  Button,
  Combobox,
  Grid,
  InlineStack,
  LegacyStack,
  Listbox,
  Select,
  Tag,
  Text,
  TextField,
} from "@shopify/polaris";
import { useCallback, useMemo, useState } from "react";
import { Form, NavLink, redirect, useNavigate } from "@remix-run/react";
import { BoxBackground } from "~/components/layouts/BoxBackground";
import { SpacingBackground } from "~/components/layouts/SpacingBackground";
import RayEndArrowIcon from "~/components/icons/RayEndArrowIcon";
import { ReactSwitchCustom } from "~/components/inputs/ReactSwitchCustom";
import uploadIcon from "~/components/icons/uploadIcon";
import { MultiColorCombobox } from "~/components/inputs/MultiColorCombobox";
import { MultiCombobox } from "~/components/inputs/MultiCombobox";
import { BoldSvg } from "~/components/svgs/BoldSvg";
import { UnderlineSvg } from "~/components/svgs/UnderlineSvg";
import { OverlineSvg } from "~/components/svgs/OverlineSvg";
import { StrikeThroughSvg } from "~/components/svgs/StrikeThroughSvg";
import { ItalicOutlinedSvg } from "~/components/svgs/ItalicOutlinedSvg";
import { OpacitySvg } from "~/components/svgs/OpacitySvg";
import { TextAlignmentSvg } from "~/components/svgs/TextAlignmentSvg";
import { CurvedUpSvg } from "~/components/svgs/CurvedUpSvg";
import { CurvedDownSvg } from "~/components/svgs/CurvedDownSvg";
import { ShapeBorderTopSvg } from "~/components/svgs/ShapeBorderTopSvg";
import { ActivatabaleItem } from "~/components/inputs/ActivatabaleItem";

export default function ConfigSettingsGeneral() {
  const [checked, setChecked] = useState(true);
  const [checked1, setChecked1] = useState(false);

  const [value, setValue] = useState("");
  const [selected, setSelected] = useState("1");
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedFonts, setSelectedFonts] = useState<string[]>([]);


  const handleChange = useCallback(
    (newValue: string) => setValue(newValue),
    [],
  );

  const handleSelectChange = useCallback(
    (value: string) => setSelected(value),
    [],
  );


  let colors = [
    { value: 1, label: "Yellow" , code:"#FFBC3C"},
    { value: 2, label: "Purple",code:"#554783" },
    { value: 3, label: "Brown" , code:"#523D2B"},
    { value: 4, label: "green" ,code:"#36E486"},
    { value: 5, label: "red" ,code:"#CE0404"},
  ];

    // sise
    let fonts = [
      { value: 1, label: "Montserrat" },
      { value: 2, label: "Arial" },
      { value: 3, label: "Red hat text" },
      { value: 4, label: "Gilroy" },
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
              <Grid gap={{ lg: "30px" }}>
              <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
                 <MultiCombobox
                       label="Select Font"
                       placeholder="Search font"
                       selectedOptions={selectedFonts}
                       data={fonts}
                       setSelectedOptions={setSelectedFonts}
                     ></MultiCombobox>
                 </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
                <BlockStack gap="300">
                    <InlineStack gap="300">
                      <Text as="strong" fontWeight="medium" variant="bodyMd">Enable Custom color</Text>
                      <ReactSwitchCustom checked={checked} setChecked={setChecked} />
                    </InlineStack>
                    <MultiColorCombobox
                      label="Add color"
                      placeholder="Search color"
                      selectedOptions={selectedColors}
                      data={colors}
                      setSelectedOptions={setSelectedColors}
                    ></MultiColorCombobox>
                  </BlockStack>
              
                </Grid.Cell>
              
               
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
                  <InlineStack gap="300">
                    <InlineStack gap="300">
                      <Text as="strong" fontWeight="medium" variant="bodyMd">Enable color picker</Text>
                      <ReactSwitchCustom checked={checked} setChecked={setChecked} />
                    </InlineStack>
                    <InlineStack gap="300">
                      <Text as="strong" fontWeight="medium" variant="bodyMd">Enable font size</Text>
                      <ReactSwitchCustom checked={checked} setChecked={setChecked} />
                    </InlineStack>
                  </InlineStack>
                </Grid.Cell>

                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 4, xl: 4 }}>
                <TextField
                    size="medium"
                    label="Minimun font size"
                    value={value}
                    onChange={handleChange}
                    autoComplete="off"
                  />
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 4, xl: 4 }}>
                <TextField
                    size="medium"
                    label="Maximum font size"
                    value={value}
                    onChange={handleChange}
                    autoComplete="off"
                  />
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 4, xl: 4 }}>
                <TextField
                    size="medium"
                    label="Default size"
                    value={value}
                    onChange={handleChange}
                    autoComplete="off"
                  />
                </Grid.Cell>

                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
                <BlockStack gap="300">
                    <Text as="strong" fontWeight="bold" variant="bodyMd">Enable text options</Text>
                    <InlineStack  gap="800" blockAlign="start"> 
                    <ActivatabaleItem fillIcon={true} title="Bold" status={checked} toggleStatus={setChecked}><BoldSvg/>  </ActivatabaleItem>
                    <ActivatabaleItem title="Underline" status={checked} toggleStatus={setChecked}><UnderlineSvg/>  </ActivatabaleItem>
                    <ActivatabaleItem title="Overline" status={checked} toggleStatus={setChecked}><OverlineSvg/>  </ActivatabaleItem>
                    <ActivatabaleItem title="Strike through" status={checked} toggleStatus={setChecked}><StrikeThroughSvg/>  </ActivatabaleItem>
                    <ActivatabaleItem title="Italic" status={checked} toggleStatus={setChecked}><ItalicOutlinedSvg/>  </ActivatabaleItem>
                      <ActivatabaleItem title="Opacity" status={checked1} toggleStatus={setChecked1}><OpacitySvg />  </ActivatabaleItem>
                    <ActivatabaleItem title="Bolder" status={checked1} toggleStatus={setChecked1}><ShapeBorderTopSvg/>  </ActivatabaleItem>
                    <ActivatabaleItem title="Text Alignment" status={checked1} toggleStatus={setChecked1}><TextAlignmentSvg/>  </ActivatabaleItem>
                    <ActivatabaleItem title="Curved-up" status={checked1} toggleStatus={setChecked1}><CurvedUpSvg/>  </ActivatabaleItem>
                    <ActivatabaleItem title="Curved-down" status={checked1} toggleStatus={setChecked1}><CurvedDownSvg/>  </ActivatabaleItem>
                    </InlineStack>
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
                    <InlineStack gap="300" >
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


