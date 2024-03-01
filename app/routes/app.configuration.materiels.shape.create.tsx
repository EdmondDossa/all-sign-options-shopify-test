import {
  AutoSelection,
  BlockStack,
  Box,
  Card,
  Checkbox,
  Combobox,
  Divider,
  Grid,
  InlineGrid,
  InlineStack,
  LegacyStack,
  Listbox,
  Tag,
  Text,
  TextField,
} from "@shopify/polaris";
import { useCallback, useState, useMemo } from "react";
import { Form, redirect, useNavigate } from "@remix-run/react";
import { BoxBackground } from "~/components/layouts/BoxBackground";
import { SpacingBackground } from "~/components/layouts/SpacingBackground";
import RayStartArrowIcon from "~/components/icons/RayStartArrowIcon";
import RayEndArrowIcon from "~/components/icons/RayEndArrowIcon";
import CircleCheckIcon from "~/components/icons/CircleCheckIcon";
import CircleNotCheckIcon from "~/components/icons/CircleNotCheckIcon";

export default function MaterialFixingMethod() {
  const [selectedShapes, setSelectedShapes] = useState<string[]>(
    [],
  );

  const shapes = [
    {
      value: "1",
      label: "Stop",
      image: "/shape/stop.png",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt port sit amet, consec"
    }, 
    {
      value: "2",
      label: "Triangle",
      image: "/shape/triangle.png",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt port sit amet, consec"
    }, 
    {
      value: "3",
      label: "Rounded Corners",
      image: "/shape/rounded-corners.png",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt port sit amet, consec"
    }, 
    {
      value: "4",
      label: "Rounded Square",
      image: "/shape/rounded-square.png",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt port sit amet, consec"
    }, 
    {
      value: "5",
      label: "Thomy",
      image: "/shape/thomy.png",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt port sit amet, consec"
    }, 
  ];

  const [numberValue, setNumberValue] = useState("0");
  const handleChangeNumber = useCallback(
    (newValue: string) => setNumberValue(newValue),
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
              <Grid gap={{ lg: "30px" }}>
                <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
                  <MultiCombobox
                    label="Select shape"
                    placeholder="Select shape"
                    selectedOptions={selectedShapes}
                    data={shapes}
                    setSelectedOptions={setSelectedShapes}
                  ></MultiCombobox>
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
  data: Array<{ label: string; value: any, description:string , image: string}>;
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
          const { label, value, description, image } = option;

          return (
            <Listbox.Option
              key={`${value}`}
              value={value}
              selected={selectedOptions.includes(value)}
              accessibilityLabel={label}
            >
              <SpacingBackground display="block" width="100%" height="auto" margin="3px 12px">
                <Box borderWidth="025" borderRadius="100" borderColor="border" padding="100" >
                  <Grid >
                  <Grid.Cell columnSpan={{ xs: 2, sm: 2, md: 2, lg: 2, xl: 2 }}>
                    <BlockStack align="center">
                      
                    <img style={{ height: "50px" }} src={image} />
                  </BlockStack>
                    </Grid.Cell>
                    <Grid.Cell columnSpan={{ xs: 3, sm: 3, md: 3, lg: 9, xl: 9 }}>
                    <BlockStack>
                        <Text as="strong" variant="bodyMd">
                          {label}
                        </Text>
                        <Text as="p" tone="subdued">
                         {description}
                        </Text>
                      </BlockStack>
                  </Grid.Cell>
                    <Grid.Cell columnSpan={{ xs: 1, sm: 1, md: 1, lg: 1, xl: 1 }}>
                      
                        <SpacingBackground width="100%" height="100%" margin="20px 0 0 0">
                      <InlineGrid alignItems="center" >

                        <span className={selectedOptions.includes(value)?"check-span check":"check-span"}>
                            <CircleNotCheckIcon/>
                        </span>
                    </InlineGrid>
                        </SpacingBackground>
                  </Grid.Cell>
                  </Grid>

                </Box>
              </SpacingBackground>
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
