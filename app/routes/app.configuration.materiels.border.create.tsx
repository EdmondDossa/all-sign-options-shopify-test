import {
  AutoSelection,
  BlockStack,
  Box,
  Checkbox,
  Combobox,
  Divider,
  EmptySearchResult,
  Grid,
  Icon,
  InlineStack,
  LegacyStack,
  Listbox,
  Select,
  Tag,
  Text,
  TextContainer,
  TextField,
} from "@shopify/polaris";
import { useCallback, useState, useMemo } from "react";
import { Form, redirect, useNavigate } from "@remix-run/react";
import { BoxBackground } from "~/components/layouts/BoxBackground";
import { SpacingBackground } from "~/components/layouts/SpacingBackground";
import RayStartArrowIcon from "~/components/icons/RayStartArrowIcon";
import RayEndArrowIcon from "~/components/icons/RayEndArrowIcon";
import { SearchIcon } from "@shopify/polaris-icons";

export default function MaterialBorderCreate() {
  const [selected, setSelected] = useState("1");
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);

  const [checked, setChecked] = useState(false);
  const handleChangeCheck = useCallback(
    (newChecked: boolean) => setChecked(newChecked),
    [],
  );

  const handleSelectChange = useCallback(
    (value: string) => setSelected(value),
    [],
  );

  const border = [
    { label: "None", value: "1" },
    { label: "triangle", value: "2" },
    { label: "Stop", value: "3" },
    { label: "thomy", value: "3" },
    { label: "Rounded Corner", value: "3" },
  ];
  const [value, setValue] = useState("Jaded Pixel");
  const handleChange = useCallback(
    (newValue: string) => setValue(newValue),
    [],
  );

  const [numberValue, setNumberValue] = useState("0");
  const handleChangeNumber = useCallback(
    (newValue: string) => setNumberValue(newValue),
    [],
  );

  const navigate = useNavigate();
  const onBack = () => {
    navigate("..");
  };

  // sise
  let sizes = [
    { value: 1, label: "100x50mm" },
    { value: 2, label: "100x50mm_thick" },
    { value: 3, label: "100x51mm" },
    { value: 4, label: "00x52mm" },
  ];

  let colors = [
    { value: 1, label: "back" },
    { value: 2, label: "white" },
    { value: 3, label: "red" },
    { value: 4, label: "green" },
  ];
  return (
    <div>
      <SpacingBackground width="100%" height="auto" margin="16px 0px ">
        <BoxBackground>
          <Form method="POST">
            <Box paddingInline="300" paddingBlock="1000">
              <Grid gap={{ lg: "30px" }}>
                <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
                  <Select
                    label="Select border"
                    options={border}
                    onChange={handleSelectChange}
                    value={selected}
                  />
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
                  <TextField
                    label="Additional Price"
                    value={numberValue}
                    type="number"
                    onChange={handleChangeNumber}
                    autoComplete="off"
                  />
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
                  <BlockStack gap="300">
                    <Text as="strong" variant="headingMd">
                      Exclude size
                    </Text>
                    <MultiCombobox
                      labelHidden={true}
                      helpText="exclude the sizes of this border"
                      label="Exclude size"
                      placeholder="Select exclude size"
                      selectedOptions={selectedSizes}
                      data={sizes}
                      setSelectedOptions={setSelectedSizes}
                    ></MultiCombobox>
                  </BlockStack>
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
                  <BlockStack gap="300">
                    <Text as="strong" variant="headingMd">
                      Border settings
                    </Text>
                    <MultiCombobox
                      label="border color"
                      placeholder="Select border color"
                      selectedOptions={selectedColors}
                      data={colors}
                      setSelectedOptions={setSelectedColors}
                    ></MultiCombobox>
                    <InlineStack gap="600">
                      <Checkbox
                         labelClassName="check-text"
                        label="Enable border width"
                        checked={checked}
                        onChange={handleChangeCheck}
                      />
                      <Checkbox
                        labelClassName="check-text"
                        label="Enable border color"
                        checked={checked}
                        onChange={handleChangeCheck}
                      />
                    </InlineStack>
                  </BlockStack>
                </Grid.Cell>
              </Grid>
            </Box>
            <Divider borderWidth="050" />
            <Box paddingInline="300" paddingBlock="300">
              <InlineStack align="end" gap="600">
                <button
                  className="back-large-btn"
                  type="button"
                  onClick={onBack}
                >
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
                        Next
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
  return redirect("..");
};

export const MultiCombobox = ({
  label,
  placeholder,
  helpText,
  labelHidden,
  data,
  selectedOptions,
  setSelectedOptions,
}: {
  label: string;
  placeholder: string;
  helpText?: string;
  labelHidden?: boolean;
  data: Array<{ label: string; value: any }>;
  selectedOptions: any[];
  setSelectedOptions: React.Dispatch<React.SetStateAction<any[]>>;
}) => {
  const deselectedOptions = useMemo(() => data, []);

  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState(deselectedOptions);

  const escapeSpecialRegExCharacters = useCallback(
    (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
    [],
  );

  const updateText = useCallback(
    (value: string) => {
      setInputValue(value);

      if (value === "") {
        setOptions(deselectedOptions);
        return;
      }

      const filterRegex = new RegExp(escapeSpecialRegExCharacters(value), "i");
      const resultOptions = deselectedOptions.filter((option) =>
        option.label.match(filterRegex),
      );
      setOptions(resultOptions);
    },
    [deselectedOptions, escapeSpecialRegExCharacters],
  );

  const updateSelection = useCallback(
    (selected: string) => {
      if (selectedOptions.includes(selected)) {
        setSelectedOptions(
          selectedOptions.filter((option) => option !== selected),
        );
      } else {
        setSelectedOptions([...selectedOptions, selected]);
      }

      updateText("");
    },
    [selectedOptions, updateText],
  );

  const removeTag = useCallback(
    (tag: string) => () => {
      const options = [...selectedOptions];
      options.splice(options.indexOf(tag), 1);
      setSelectedOptions(options);
    },
    [selectedOptions],
  );

  const tagsMarkup = selectedOptions.map((option) => (
    <Tag key={`option-${option}`} onRemove={removeTag(option)}>
      {data.find((current) => current.value == option)?.label}
    </Tag>
  ));

  const optionsMarkup =
    options.length > 0
      ? options.map((option) => {
          const { label, value } = option;

          return (
            <Listbox.Option
              key={`${value}`}
              value={value}
              selected={selectedOptions.includes(value)}
              accessibilityLabel={label}
            >
              {label}
            </Listbox.Option>
          );
        })
      : null;

  return (
    <Combobox
      allowMultiple
      activator={
        <Combobox.TextField
          onChange={updateText}
          label={label}
          labelHidden={labelHidden}
          value={inputValue}
          verticalContent={<LegacyStack>{tagsMarkup}</LegacyStack>}
          placeholder={placeholder}
          autoComplete="off"
          helpText={helpText}
        />
      }
    >
      {optionsMarkup ? (
        <Listbox autoSelection={AutoSelection.None} onSelect={updateSelection}>
          {optionsMarkup}
        </Listbox>
      ) : null}
    </Combobox>
  );
};
