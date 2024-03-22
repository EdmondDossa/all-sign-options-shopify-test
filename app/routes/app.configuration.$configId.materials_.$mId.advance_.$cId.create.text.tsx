import { ActionFunctionArgs, json } from "@remix-run/node";
import {
  Form,
  Outlet,
  redirect,
  useActionData,
  useNavigate,
  useNavigation,
  useOutletContext,
  useSearchParams,
  useSubmit,
} from "@remix-run/react";
import {
  ActionList,
  AutoSelection,
  BlockStack,
  Box,
  Button,
  ColorPicker,
  Combobox,
  Divider,
  Grid,
  InlineGrid,
  InlineStack,
  LegacyStack,
  Listbox,
  Popover,
  Tag,
  Text,
  TextField,
} from "@shopify/polaris";
import { useCallback, useEffect, useMemo, useState } from "react";
import CircleNotCheckIcon from "~/components/icons/CircleNotCheckIcon";
import RayEndArrowIcon from "~/components/icons/RayEndArrowIcon";
import RayStartArrowIcon from "~/components/icons/RayStartArrowIcon";
import uploadIcon from "~/components/icons/uploadIcon";
import { BoxBackground } from "~/components/layouts/BoxBackground";
import { SpacingBackground } from "~/components/layouts/SpacingBackground";
import ColorConvertor from "color-convert";
import BiSaveIcon from "~/components/icons/BiSaveIcon";
import { number, string, z } from "zod";
import { authenticate } from "~/shopify.server";
import { parseWithZod } from "@conform-to/zod";
import { BiSaveBtn } from "~/components/buttons/BiSaveBtn";
import { MaterialAdvanceOptionType } from "~/types/ConfigDataType";
import useHandleFlashMessage from "~/hooks/useHandleFlashMessage";

export default function MaterialComponentCreate() {
  const submit = useSubmit();
  const navigation = useNavigation();
  const { materialOptions } = useOutletContext<{
    materialOptions: MaterialAdvanceOptionType[];
  }>();
  const actionData = useActionData<typeof action>();
  useHandleFlashMessage();
  const [searchParams] = useSearchParams();
  const id = parseInt(searchParams.get("id") || "");
  console.log("action data :", actionData);
  let materialOption = materialOptions?.find((curr, index) => index == id);
  const [formData, setFormData] = useState<MaterialAdvanceOptionType>(
    materialOption
      ? (materialOption as MaterialAdvanceOptionType)
      : {
          name: "",
          description: "string",
          icon: "",
          image: "",
          manageColorId: 0,
          fixingMethodId: "",
          shapeId: "",
          size: {
            width: 0,
            height: 0,
          },
          additionalPrice: 0,
        },
  );

  let isLoading = navigation.state == "loading";
  let isSubmitting = navigation.state == "submitting";

  const handleName = (value: string) =>
    setFormData({ ...formData, name: value });
  const handleDescription = (value: string) =>
    setFormData({ ...formData, description: value });
  const handleIcon = (value: string) =>
    setFormData({ ...formData, icon: value });
  const handleImage = (value: string) =>
    setFormData({ ...formData, image: value });
  const handleAdditionalPrice = (value: string) =>
    setFormData({ ...formData, additionalPrice: parseFloat(value) });
  const handleManageColorId = (value: string) =>
    setFormData({ ...formData, manageColorId: parseInt(value) });
  const handleFixingMethodId = (value: string) =>
    setFormData({ ...formData, fixingMethodId: value });
  const handleShapeId = (value: string) =>
    setFormData({ ...formData, shapeId: value });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    submit({ ...formData }, { method: "POST" });
  };

  const [selectedFixingMethods, setSelectedFixingMethods] = useState<string[]>(
    [],
  );

  const fixingMethods = [
    {
      value: "1",
      label: "None",
      image: "/fixing-method/none.png",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt port sit amet, consec",
    },
  ];

  const [selectedShapes, setSelectedShapes] = useState<string[]>([]);

  const shapes = [
    {
      value: "1",
      label: "Stop",
      image: "/shape/stop.png",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt port sit amet, consec",
    },
  ];

  const onBack = () => {
    navigate("..");
  };

  return (
    <SpacingBackground width="100%" height="auto">
      <BoxBackground>
        <Box padding="300">
          <Text as="h2" variant="headingMd">
            Add option
          </Text>
        </Box>
        <Divider borderWidth="050" />

        <Form method="POST">
          <Box paddingInline="300" paddingBlock="1000">
            <Grid gap={{ lg: "30px" }}>
              <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
                <TextField
                  label="Title"
                  value={value}
                  onChange={handleChange}
                  autoComplete="off"
                />
              </Grid.Cell>

              <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
                <TextField
                  label="Description"
                  value={value}
                  onChange={handleChange}
                  autoComplete="off"
                />
              </Grid.Cell>
              <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
                <TextField
                  size="medium"
                  label="Upload icon"
                  value={value}
                  onChange={handleChange}
                  autoComplete="off"
                  prefix={
                    <Button
                      size="slim"
                      icon={uploadIcon}
                      tone="success"
                      variant="primary"
                    >
                      Upload icon
                    </Button>
                  }
                />
              </Grid.Cell>
              <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
                <TextField
                  size="medium"
                  label="Background / image"
                  value={value}
                  onChange={handleChange}
                  autoComplete="off"
                  prefix={
                    <Button
                      size="slim"
                      icon={uploadIcon}
                      tone="success"
                      variant="primary"
                    >
                      Upload image
                    </Button>
                  }
                />
              </Grid.Cell>

              <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
                <MultiCombobox
                  label="Select fixing method"
                  placeholder="seach fixing method"
                  selectedOptions={selectedFixingMethods}
                  data={fixingMethods}
                  setSelectedOptions={setSelectedFixingMethods}
                ></MultiCombobox>
              </Grid.Cell>
              <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
                <BlockStack gap="100">
                  <Text as="span"> Size</Text>
                  <InlineStack
                    wrap={false}
                    align="space-between"
                    blockAlign="center"
                  >
                    <TextField
                      label="Size"
                      labelHidden
                      value={size}
                      onChange={handleSize}
                      autoComplete="off"
                      placeholder="Width"
                    />
                    <Text as="strong" variant="bodyLg">
                      X
                    </Text>
                    <TextField
                      label=""
                      value={size}
                      onChange={handleSize}
                      autoComplete="off"
                      placeholder="Height"
                    />
                  </InlineStack>
                </BlockStack>
              </Grid.Cell>
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
                  value={value}
                  onChange={handleChange}
                  autoComplete="off"
                />
              </Grid.Cell>

              <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
                <ColorField color={color} setColor={setColor}></ColorField>
              </Grid.Cell>
            </Grid>
          </Box>

          <Divider borderWidth="050" />
          <Box paddingInline="300" paddingBlock="300">
            <InlineStack align="end" gap="600">
              <button className="back-large-btn" type="button" onClick={onBack}>
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
              <BiSaveBtn isLoading={isSubmitting} title="Save" />
            </InlineStack>
          </Box>
        </Form>
      </BoxBackground>
    </SpacingBackground>
  );
}

const formSchema = z.object({
  title: z
    .string({ required_error: "Title is required" })
    .min(3, "Title is too short")
    .max(100, "Title is too long"),
  description: z
    .string({ required_error: "Description is required" })
    .min(3, "Description is too short")
    .max(255, "Description is too long"),
  icon: z.string({ required_error: "Icon file is required" }),
  image: z.string({ required_error: "image file is required" }),
  additionalPrice: z.number({ required_error: "image file is required" }),
});

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const { session, admin } = await authenticate.admin(request);

  const formData = await request.formData();
  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  const configId = parseInt(params.configId ?? "");
  const mId = parseInt(params.mId ?? "");
  const aId = parseInt(params.aId ?? "");
  const submission = parseWithZod(formData, { schema: formSchema });

  if (submission.status !== "success") {
    return json({ status: false, message: null, errors: submission.error });
  }

  let configAdditionalOptionItem: ConfigAdditionalOptionItem =
    submission.value as ConfigAdditionalOptionItem;

  if (
    id &&
    !Number.isNaN(configId) &&
    !Number.isNaN(mId) &&
    !Number.isNaN(aId) &&
    !Number.isNaN(id)
  ) {
    let res = await MaterialAdditionalOptionItemService.update(
      configId,
      session.id,
      mId,
      aId,
      configAdditionalOptionItem,
      parseInt(id),
    );
    return res
      ? redirect(
          `..${flashMessage("Material  option  updated is completed successfully")}`,
        )
      : redirect(
          `..${flashMessage("Material  option  updated is  fail", "error")}`,
        );
  } else {
    let res = await MaterialAdditionalOptionItemService.add(
      configId,
      session.id,
      mId,
      aId,
      configAdditionalOptionItem,
    );
    return res
      ? redirect(
          `..${flashMessage("Material  option  added is completed successfully")}`,
        )
      : redirect(
          `..${flashMessage("Material  option  added is  fail", "error")}`,
        );
  }
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
  data: Array<{
    label: string;
    value: any;
    description: string;
    image: string;
  }>;
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
      const resultOptions = deselectedOptions.filter((option: any) =>
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
      ? options.map((option: any) => {
          const { label, value, description, image } = option;

          return (
            <Listbox.Option
              key={`${value}`}
              value={value}
              selected={selectedOptions.includes(value)}
              accessibilityLabel={label}
            >
              <SpacingBackground
                display="block"
                width="100%"
                height="auto"
                margin="3px 12px"
              >
                <Box
                  borderWidth="025"
                  borderRadius="100"
                  borderColor="border"
                  padding="100"
                >
                  <Grid>
                    <Grid.Cell
                      columnSpan={{ xs: 2, sm: 2, md: 2, lg: 2, xl: 2 }}
                    >
                      <BlockStack align="center">
                        <img style={{ height: "50px" }} src={image} />
                      </BlockStack>
                    </Grid.Cell>
                    <Grid.Cell
                      columnSpan={{ xs: 3, sm: 3, md: 3, lg: 9, xl: 9 }}
                    >
                      <BlockStack>
                        <Text as="strong" variant="bodyMd">
                          {label}
                        </Text>
                        <Text as="p" tone="subdued">
                          {description}
                        </Text>
                      </BlockStack>
                    </Grid.Cell>
                    <Grid.Cell
                      columnSpan={{ xs: 1, sm: 1, md: 1, lg: 1, xl: 1 }}
                    >
                      <SpacingBackground
                        width="100%"
                        height="100%"
                        margin="20px 0 0 0"
                      >
                        <InlineGrid alignItems="center">
                          <span
                            className={
                              selectedOptions.includes(value)
                                ? "check-span check"
                                : "check-span"
                            }
                          >
                            <CircleNotCheckIcon />
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

export function ColorField({
  color,
  setColor,
}: {
  color?: string | undefined;
  setColor?: React.Dispatch<React.SetStateAction<string | undefined>>;
}) {
  const [popoverActive, setPopoverActive] = useState(true);
  const [colorHex, setColorHex] = useState<string>();
  const hsv = ColorConvertor.hex.hsv(color || "#FFFFFF");
  const [colorHsv, setColorHsv] = useState({
    hue: hsv[0],
    brightness: hsv[2] / 100,
    saturation: hsv[1] / 100,
  });

  const togglePopoverActive = useCallback(
    () => setPopoverActive((popoverActive) => !popoverActive),
    [],
  );

  useEffect(() => {
    // let colorConvertor = Color({hue:color.hue, saturationv: color.saturation, value:color.brightness}, "hsv")
    const hex = ColorConvertor.hsv.hex.raw([
      colorHsv.hue,
      colorHsv.saturation * 100,
      colorHsv.brightness * 100,
    ]);
    setColorHex(hex);
    if (typeof setColor === "function") {
      setColor(hex);
    }
  }, [colorHsv]);

  const activator = (
    <TextField
      prefix={
        colorHex && (
          <Tag onClick={() => togglePopoverActive()}>
            <Box paddingInline="100" paddingBlock="150">
              <InlineStack gap="100" align="center" blockAlign="center">
                <div
                  style={{ backgroundColor: `#${colorHex}` }}
                  className="color-span"
                >
                  {" "}
                </div>{" "}
                <span>{`#${colorHex}`}</span>
              </InlineStack>
            </Box>
          </Tag>
        )
      }
      label="Color"
      onFocus={togglePopoverActive}
      autoComplete="off"
    />
  );

  return (
    <Popover
      active={popoverActive}
      activator={activator}
      autofocusTarget="first-node"
      onClose={togglePopoverActive}
    >
      <ColorPicker onChange={setColorHsv} color={colorHsv} />
    </Popover>
  );
}
