import {Listbox, Combobox, Icon, InlineStack, Badge} from '@shopify/polaris';
import {SearchIcon} from '@shopify/polaris-icons';
import {useState, useCallback, useEffect} from 'react';

export function ComboxSelect({
    label,
    placeholder,
    helpText,
    labelHidden,
    data,
    selectedOption, 
    setSelectedOption,
    disable,
    button
}:{
    label: string;
    placeholder: string;
    helpText?: string;
    error?: string;
    labelHidden?: boolean;
    button?:any;
    data:Array<{
        label: string;
        value: string;
    }>;
    selectedOption?:string;
    setSelectedOption: Function;
    disable?:boolean;
}) {



  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState(data);

  const escapeSpecialRegExCharacters = useCallback(
    (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
    [],
  );

  useEffect(()=>{
      setOptions(data)
  }, [data])

  const updateText = useCallback(
    (value: string) => {
      setInputValue(value);

      if (value === '') {
        setOptions(data);
        return;
      }

      const filterRegex = new RegExp(escapeSpecialRegExCharacters(value), 'i');
      const resultOptions = data.filter((option) =>
        option.label.match(filterRegex),
      );
      setOptions(resultOptions);
    },
    [data, escapeSpecialRegExCharacters],
  );

  const updateSelection = useCallback(
    (selected: string) => {
      const matchedOption = options.find((option) => {
        return option.value.match(selected);
      });

      setSelectedOption(selected);
      setInputValue('');
    },
    [options],
  );

  const optionsMarkup =
    options.length > 0
      ? options.map((option) => {
          const {label, value} = option;

          return (
            <Listbox.Option
              key={`${value}`}
              value={value}
              selected={selectedOption === value}
              accessibilityLabel={label}
            >
              {label}
            </Listbox.Option>
          );
        })
      : null;

  return (
    <>
      <Combobox
        activator={
          <Combobox.TextField
            prefix={<InlineStack>
                {/* <Icon source={SearchIcon} /> */}
                {selectedOption && <Badge>{options?.find((option=> option.value == selectedOption))?.label||""}</Badge>}
            </InlineStack>}
            onChange={updateText}
            label={label}
            labelHidden={labelHidden}
            helpText={helpText}
            placeholder={placeholder}
            value={inputValue}
            autoComplete="off"
            disabled={disable}
            connectedRight={button||""}
          />
        }
      >
        {options.length > 0 ? (
          <Listbox onSelect={updateSelection}>{optionsMarkup}</Listbox>
        ) : null}
      </Combobox>
    </>
  );
}