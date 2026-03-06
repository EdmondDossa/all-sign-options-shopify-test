import { useEffect, useState } from "react";
import AdditionalPriceField, {
  type AdditionalPriceMode,
} from "~/components/inputs/AdditionalPriceField";

interface AdditionalPriceType {
  type: string;
  value: number;
  headerText: string;
  currencySymbol?: string;
  onTypeChange: (val: string) => void;
  onValueChange: (val: number) => void;
  groupName?: string;
}

const AdditionalPriceLayout = ({
  type,
  value,
  headerText,
  currencySymbol,
  onTypeChange,
  onValueChange,
  groupName: _groupName,
}: AdditionalPriceType) => {
  const [currentType, setCurrentType] = useState("");
  const [currentValue, setCurrentValue] = useState(0);

  useEffect(() => {
    setCurrentType(type);
    setCurrentValue(value);
  }, [type, value]);

  return (
    <AdditionalPriceField
      title={headerText}
      mode={currentType}
      value={currentValue}
      currencySymbol={currencySymbol}
      groupName={_groupName}
      onModeChange={(nextMode) => {
        const normalized = nextMode as AdditionalPriceMode;
        setCurrentType(normalized);
        onTypeChange(normalized);
      }}
      onValueChange={(nextValue) => {
        setCurrentValue(nextValue);
        onValueChange(nextValue);
      }}
    />
  );
};

export default AdditionalPriceLayout;
