import { AutoSelection, Combobox, LegacyStack, Listbox, Tag } from "@shopify/polaris";
import { useCallback, useMemo, useState } from "react";

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
    data?: Array<{ label: string; value: any }>;
    selectedOptions?: any[];
    setSelectedOptions:Function;
  }) => {
    const safeData = data ?? [];
    const safeSelectedOptions = selectedOptions ?? [];
    const deselectedOptions = useMemo(() => safeData, [safeData]);
  
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
        if (safeSelectedOptions.includes(selected+"")) {
          setSelectedOptions(
            safeSelectedOptions.filter((option) => option != selected),
          );
        } else {
          setSelectedOptions([...safeSelectedOptions, selected]);
        }

        updateText("");
      },
      [safeSelectedOptions, setSelectedOptions, updateText],
    );

    const removeTag = useCallback(
      (tag: string) => () => {
        const options = [...safeSelectedOptions];
        options.splice(options.indexOf(tag), 1);
        setSelectedOptions(options);
      },
      [safeSelectedOptions, setSelectedOptions],
    );

    const tagsMarkup = safeSelectedOptions.map((option) => (
      <Tag key={`option-${option}`} onRemove={removeTag(option)}>
        {safeData.find((current) => current.value == option)?.label}
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
                selected={safeSelectedOptions.includes(value)}
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