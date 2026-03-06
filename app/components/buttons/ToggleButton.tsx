import { useId } from "react";
import { Button, type ButtonProps } from "@shopify/polaris";
import { CircleChevronDownIcon, CircleChevronUpIcon } from "@shopify/polaris-icons";

type ChoiceToggleProps = {
  id?: string;
  checked: boolean;
  type?: "checkbox" | "radio";
  disabled?: boolean;
  name?: string;
  value?: any;
  onChange?: (value: any) => void;
};

type ChevronToggleProps = {
  buttonProps: ButtonProps;
  open: boolean;
};

type ToggleButtonProps = ChoiceToggleProps | ChevronToggleProps;

const isChevronToggle = (props: ToggleButtonProps): props is ChevronToggleProps =>
  "buttonProps" in props;

export const ToggleButton = (props: ToggleButtonProps) => {
  if (isChevronToggle(props)) {
    const { buttonProps, open } = props;
    return <Button icon={open ? CircleChevronUpIcon : CircleChevronDownIcon} {...buttonProps} />;
  }

  const generatedId = useId();
  const {
    id,
    checked,
    type = "checkbox",
    disabled,
    name,
    value,
    onChange,
  } = props;

  const inputId = id || `toggle-${generatedId}`;

  return (
    <label htmlFor={inputId} className="custom-toggle">
      <input
        type={type}
        id={inputId}
        checked={checked}
        disabled={disabled}
        name={name}
        value={value}
        onChange={(event) => {
          if (type === "radio") {
            onChange?.(value);
            return;
          }
          onChange?.(event.currentTarget.checked);
        }}
      />
      <span className="toggle-slider" />
    </label>
  );
};
