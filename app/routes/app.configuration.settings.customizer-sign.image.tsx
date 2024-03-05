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
import { WaterOpacitySvg } from "~/components/svgs/WaterOpacitySvg";
import { BlurSvg } from "~/components/svgs/BlurSvg";
import { SharpenSvg } from "~/components/svgs/SharpenSvg";
import { EmbossSvg } from "~/components/svgs/EmbossSvg";

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

  const options = [
    { label: "PNG", value: "1" },
    { label: "JPEG", value: "2" },
    { label: "SVG", value: "3" },
    { label: "PNG + SVG", value: "4" },
    { label: "JPEG + SVG", value: "5" },
    { label: "PNG+ JPEG", value: "6" },
  ];




    // sise
    let fonts = [
      { value: 1, label: "House" },
      { value: 2, label: "Animal" },
      { value: 3, label: "Vehicule" },
      { value: 4, label: "trace" },
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
              <InlineStack gap="300" blockAlign="center">
                      <Text as="strong" fontWeight="bold" variant="bodyMd">Enable upload Image </Text>
                      <ReactSwitchCustom checked={checked} setChecked={setChecked} />
                    </InlineStack>
                 </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
                <BlockStack gap="100">
                  
                      <Text as="strong" fontWeight="bold" variant="bodyMd">File upload script</Text>
                   
                   <Text as="p" variant="bodySm" tone="subdued" > This option allows you to set which file upload script you would like to use</Text>
                  </BlockStack>
              
                </Grid.Cell>
              
               
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
                <InlineStack gap="300" blockAlign="center">
                      <Text as="strong" fontWeight="medium" variant="bodyMd"  tone="subdued">Normal</Text>
                      <ReactSwitchCustom checked={checked} setChecked={setChecked} />
                      <Text as="strong" fontWeight="medium" variant="bodyMd" tone="subdued">Custom with graphical enchacements</Text>
                    </InlineStack>
                </Grid.Cell>

                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 4, xl: 4 }}>
                <TextField
                    size="medium"
                    label="Upload min width (px)"
                    value={value}
                    onChange={handleChange}
                    autoComplete="off"
                  />
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 4, xl: 4 }}>
                <TextField
                    size="medium"
                    label="Upload min height (px)"
                    value={value}
                    onChange={handleChange}
                    autoComplete="off"
                  />
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 4, xl: 4 }}>
                <Select
                    label="Allowed uploads extensions"
                    options={options}
                    onChange={handleSelectChange}
                    value={selected}
                  />
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
                <BlockStack gap="400">
                    <InlineStack gap="300" blockAlign="center">
                      <Text as="strong" fontWeight="bold" variant="bodyMd">Enable clipart</Text>
                      <ReactSwitchCustom checked={checked} setChecked={setChecked} />
                    </InlineStack>
                    <MultiCombobox
                       label="Select clipart  group"
                       placeholder="Search clipart group"
                       selectedOptions={selectedFonts}
                       data={fonts}
                       setSelectedOptions={setSelectedFonts}
                     ></MultiCombobox>
                  </BlockStack>
              
                </Grid.Cell>

                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
                <BlockStack gap="400">
                <InlineStack gap="300" blockAlign="center">
                      <Text as="strong" fontWeight="bold" variant="bodyMd">Filter</Text>
                      <ReactSwitchCustom checked={checked} setChecked={setChecked} />
                    </InlineStack>
                    <InlineStack  gap="800" blockAlign="start"> 
                    <ActivatabaleItem fillIcon={true} noTrokeIcon={true} title="Greyscale" status={checked} toggleStatus={setChecked}><WaterOpacitySvg/>  </ActivatabaleItem>
                    <ActivatabaleItem fillIcon={true}  noTrokeIcon={true} title="Opacity" status={checked} toggleStatus={setChecked}><WaterOpacitySvg/>  </ActivatabaleItem>
                    <ActivatabaleItem fillIcon={true}   noTrokeIcon={true} title="Blur" status={checked} toggleStatus={setChecked}><BlurSvg/>  </ActivatabaleItem>
                    <ActivatabaleItem fillIcon={true} noTrokeIcon={true} title="Sepia" status={checked} toggleStatus={setChecked}><SharpenSvg/>  </ActivatabaleItem>
                    <ActivatabaleItem title="sharpen" status={checked} toggleStatus={setChecked}><SharpenSvg/>  </ActivatabaleItem>
                    <ActivatabaleItem title="Emboss" status={checked1} toggleStatus={setChecked1}><EmbossSvg />  </ActivatabaleItem>
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


