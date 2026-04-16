import { ensureClassicSimplifiedBuilderData } from "~/utils/simplified-builder-data";
import { parseConfigData } from "~/features/classic-required-colors.shared";
import {
  getClassicDataMaterialType,
  getClassicDataPricingMode,
  getClassicDataProductType,
} from "~/utils/classic-config-data";

export type ClassicCustomInputItem = Record<string, any> & {
  id?: string | number;
  type?: string;
  label?: string;
  title?: string;
  description?: string;
};

export type ClassicCustomInputsState = {
  label: string;
  description: string;
  items: ClassicCustomInputItem[];
};

export const emptyClassicCustomInput = (): ClassicCustomInputItem => ({
  type: "yes/no",
  label: "",
  description: "",
  inputs: {
    yes: "Yes",
    no: "No",
  },
  default: "no",
  popupImg: "",
  price: {
    type: "none",
    value: 0,
  },
});

const normalizeItem = (item: any, index: number): ClassicCustomInputItem => ({
  ...JSON.parse(JSON.stringify(item || {})),
  id: item?.id ?? `input-${index}`,
  type: String(item?.type || "yes/no"),
  label: String(item?.label || item?.title || ""),
  description: String(item?.description || ""),
});

export const getClassicCustomInputsState = (rawData: any): ClassicCustomInputsState => {
  const parsed = parseConfigData(rawData) || {};
  const data = ensureClassicSimplifiedBuilderData({
    data: parsed,
    materialType: getClassicDataMaterialType(parsed),
    productType: getClassicDataProductType(parsed),
    pricingMode: getClassicDataPricingMode(parsed),
  });

  const source = Array.isArray(data?.additionalOptions?.inputs?.items)
    ? data.additionalOptions.inputs.items
    : Array.isArray(data?.additionalOptions?.inputs)
      ? data.additionalOptions.inputs
      : Array.isArray(data?.additionalOptions)
        ? data.additionalOptions
        : [];

  return {
    label: String(data?.additionalOptions?.inputs?.label || "Inputs"),
    description: String(
      data?.additionalOptions?.inputs?.description ||
        "Manage standalone customer inputs using the NCPC-style form blocks.",
    ),
    items: source.map((item: any, index: number) => normalizeItem(item, index)),
  };
};

export const syncClassicCustomInputsIntoData = ({
  data,
  state,
}: {
  data: any;
  state: ClassicCustomInputsState;
}) => {
  const nextData = ensureClassicSimplifiedBuilderData({
    data,
    materialType: getClassicDataMaterialType(data),
    productType: getClassicDataProductType(data),
    pricingMode: getClassicDataPricingMode(data),
  });
  const materialType = String(
    getClassicDataMaterialType(data) || getClassicDataMaterialType(nextData) || "",
  )
    .trim()
    .toLowerCase();
  const isAdvancedMaterialType = materialType === "advance" || materialType === "advanced";

  const normalizedItems = state.items.map((item) => {
    const clone = JSON.parse(JSON.stringify(item || {}));
    delete clone.id;
    return clone;
  });

  nextData.additionalOptions = {
    ...(nextData.additionalOptions || {}),
    ...(isAdvancedMaterialType ? { components: undefined } : {}),
    inputs: {
      label: String(state.label || "Inputs"),
      description: String(state.description || ""),
      items: normalizedItems,
    },
  };
  if (isAdvancedMaterialType && nextData.additionalOptions) {
    delete (nextData.additionalOptions as any).components;
    delete (nextData.additionalOptions as any).additionalInputs;
  }

  return nextData;
};
