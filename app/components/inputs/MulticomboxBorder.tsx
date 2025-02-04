import { AutoSelection, BlockStack, Box, Combobox, Grid, InlineError, InlineGrid, LegacyStack, Listbox, Tag, Text } from "@shopify/polaris";
import { useCallback, useEffect, useMemo, useState } from "react";
import { SpacingBackground } from "../layouts/SpacingBackground";
import CircleNotCheckIcon from "../icons/CircleNotCheckIcon";
import { fileUrl } from "~/utils/fileUrl";

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
  const deselectedOptions = data;

  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState(deselectedOptions);

  useEffect(() => {
    setOptions(data);
    console.log('change  option value  en present');
  }, [data]);

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
                      
                    <img style={{ height: "50px" }} src={fileUrl(image)} />
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




export const SelectCombobox = ({
  label,
  placeholder,
  helpText,
  labelHidden,
  data,
  selectedOptions,
  error,
  setSelectedOptions,
}: {
  label: string;
  placeholder: string;
  helpText?: string;
  error?: string;
  labelHidden?: boolean;
  data: Array<{ label: string; value: any, description?:string , image?: string}>;
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
   
        setSelectedOptions([...selectedOptions, selected]);
      

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
                    <BlockStack align="center" inlineAlign="center">
                       {image && <img style={{ width: "60px", height: "auto" }} src={fileUrl(image)} />}
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
    <>
    <Combobox
      allowMultiple={false}
      activator={
        <Combobox.TextField
          
          onChange={updateText}
          label={label}
          labelHidden={labelHidden}
          helpText={helpText}
          placeholder={placeholder}
          value={inputValue}
          prefix={<LegacyStack>{tagsMarkup}</LegacyStack>}
          autoComplete="off"
        />
      }
    >
      {optionsMarkup ? (
        <Listbox autoSelection={AutoSelection.None} onSelect={updateSelection}>
          {optionsMarkup}
        </Listbox>
      ) : null}
      </Combobox>
      {error && (
        <InlineError message={error||""} fieldID="myFieldID" />
      )}
    </>
  );
};


