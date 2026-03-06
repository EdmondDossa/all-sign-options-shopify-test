import { parseWithZod } from "@conform-to/zod";
import { ActionFunctionArgs, json } from "@remix-run/node";
import {
  Form,
  redirect,
  useActionData,
  useNavigation,
  useOutletContext,
  useSearchParams,
  useSubmit,
} from "@remix-run/react";
import {
  Bleed,
  BlockStack,
  Box,
  Card,
  Divider,
  Grid,
  InlineStack,
  Text,
  TextField,
} from "@shopify/polaris";
import { useState } from "react";
import { z } from "zod";
import {
  BackBtn,
  BiAddBtn,
  BiSaveBtn,
  RemoveNowIconBtn,
  ToggleButton,
} from "~/components/buttons";
import { FlashToast } from "~/components/features";
import {
  FileInput,
  ReactSwitchCustom,
  TextColorField,
} from "~/components/inputs";
import AdditionalPriceLayout from "~/components/layouts/AdditionalPriceLayout";
import { SpacingBackground } from "~/components/layouts/SpacingBackground";

import { authenticate } from "~/shopify.server";
import { getErrorFromZod } from "~/utils/error-getting";
import { fileUrl } from "~/utils/fileUrl";
import { flashMessage } from "~/utils/message-flash";
import { jsonTransform } from "~/utils/transfomerZod";
import { BiSaveIcon, RayStartArrowIcon } from "../icons";

interface Props {
  customOption?: any;
  isEditing: boolean;
  onSubmit: (customOption: any) => void;
  onClose: () => void;
}
export default function CustomAdditionalOptionsForm({
  customOption,
  isEditing,
  onSubmit,
  onClose,
}: Props) {
  let { configuration } = useOutletContext<any>();
  const navigation = useNavigation();
  const [searchParams] = useSearchParams();

  const [selectedType, setSelectedType] = useState(
    customOption?.type || "yes/no",
  );
  const [formData, setFormData] = useState({});

  let isLoading = navigation.state == "loading";
  let isSubmitting = navigation.state == "submitting";
  let types = [
    {
      icon: "/images/settings/yesNo.png",
      fallbackIcon: "/images/yesNo.png",
      value: "yes/no",
      label: "Yes/No",
      component: (
        <YesOrNoInput
          additionalOption={customOption}
          isLoading={isLoading}
          isSubmitting={isSubmitting}
          onSubmit={onSubmit}
          onClose={onClose}
        />
      ),
    },
    {
      icon: "/images/settings/image-row.png",
      fallbackIcon: "/images/image-row.png",
      value: "image-input",
      label: "Image Input",
      component: (
        <TypeImageInput
          additionalOption={customOption}
          isLoading={isLoading}
          isSubmitting={isSubmitting}
          onSubmit={onSubmit}
          onClose={onClose}
        />
      ),
    },
    {
      icon: "/images/settings/select.png",
      fallbackIcon: "/images/select.png",
      value: "dropdown",
      label: "Dropdown",
      component: (
        <DropdownTypeInput
          additionalOption={customOption}
          isLoading={isLoading}
          isSubmitting={isSubmitting}
          onSubmit={onSubmit}
          onClose={onClose}
        />
      ),
    },
    {
      icon: "/images/settings/text-box.png",
      fallbackIcon: "/images/text-box.png",
      value: "note",
      label: "Note",
      component: (
        <NoteTypeInput
          additionalOption={customOption}
          isLoading={isLoading}
          isSubmitting={isSubmitting}
          onSubmit={onSubmit}
          onClose={onClose}
        />
      ),
    },
    {
      icon: "/images/settings/includeType.png",
      fallbackIcon: "/images/includeType.png",
      value: "include-type",
      label: "Include Type",
      component: (
        <IncludedOptionInput
          additionalOption={customOption}
          isLoading={isLoading}
          isSubmitting={isSubmitting}
          onSubmit={onSubmit}
          onClose={onClose}
        />
      ),
    },
  ];

  const handleChangeType = (type: string) => {
    if (!customOption) {
      setSelectedType(type);
    }
  };
  return (
    <div style={{ display: "grid", gap: 12, marginTop: 16 }}>
      <Card>
        <Box padding="300">
          <Text as="h6" variant="bodyMd" fontWeight="bold">
            {isEditing
              ? "Update additional option"
              : "Create new additional option"}
          </Text>
        </Box>
      </Card>
      <Card>
        <Box padding="300">
          <Grid gap={{ lg: "15px" }}>
            <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
              <Text as="h3" variant="headingMd" fontWeight="semibold">
                {" "}
                1- Choose an Input Type
              </Text>
              <Text as="p" variant="bodyMd" tone="subdued">
                This text will displayed above the input options.
              </Text>
            </Grid.Cell>
            <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
              {/* Utiliser un conteneur avec display: grid pour aligner les tailles */}
              <div className="ncpc-additional-type-grid">
                {types?.map((type, index) => (
                  <button
                    type="button"
                    disabled={isSubmitting || customOption?.id != null}
                    key={`type-button-${index}`}
                    onClick={() => handleChangeType(type.value)}
                    className={`ncpc-additional-card ${type.value == selectedType ? "active" : ""}`}
                  >
                    <BlockStack inlineAlign="center" align="center" gap="200">
                      <div className="ncpc-additional-card-image-wrap">
                        <img
                          className="ncpc-additional-card-image"
                          src={type.icon}
                          alt={type.label}
                          loading="lazy"
                          onError={(event) => {
                            const img = event.currentTarget;
                            if (img.dataset.fallbackApplied === "1") return;
                            img.dataset.fallbackApplied = "1";
                            img.src = type.fallbackIcon;
                          }}
                        />
                      </div>
                      <span className="ncpc-additional-card-label">{type.label}</span>
                    </BlockStack>
                  </button>
                ))}
              </div>
            </Grid.Cell>
          </Grid>
        </Box>
      </Card>
      {types?.find((curr) => curr.value === selectedType)?.component}
    </div>
  );
}

function YesOrNoInput({
  additionalOption,
  isSubmitting,
  isLoading,
  onSubmit,
  onClose,
}: {
  additionalOption: any;
  isSubmitting: boolean;
  isLoading: boolean;
  onSubmit: (customOption: any) => void;
  onClose: () => void;
}) {
  const [formData, setFormData] = useState<any>(
    additionalOption || {
      type: "yes/no",
      label: "",
      description: "",
      inputs: {
        yes: "",
        no: "",
      },
      default: "no",
      popupImg: "",
      price: {
        type: "none",
        value: 0,
      },
    },
  );
  let [isError, setIsError] = useState(false);
  let [formErrors, setFormErrors] = useState<any>({});

  const formSchema = z.object({
    label: z.string().min(1),
    inputs: z.object({
      yes: z.string().min(1),
      no: z.string().min(1),
    }),
  });

  const submit = useSubmit();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const formAnalyser = formSchema.safeParse(formData);
    if (!formAnalyser.success) {
      setIsError(true);
      setFormErrors(formAnalyser.error.issues);
      return;
    }
    onSubmit(formData);
  };

  const handleInputChange = (inputName: string, value: any) => {
    setIsError(false);
    setFormData((prevData: any) => ({
      ...prevData,
      [inputName]: value,
    }));
  };

  return (
    <Form onSubmit={handleSubmit} method="POST">
      {isError && (
        <FlashToast
          messageFlash={{
            msg: "Your entries contain errors. kindly rectify them",
            status: "error",
          }}
        />
      )}
      <SpacingBackground backgroundColor="#FFFFFF" border="1px solid #E3E7EC" borderRadius="12px" margin="0 0 12px 0">
        <Box paddingInline="300" paddingBlock="600">
          <Grid gap={{ lg: "15px" }}>
            <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
              <Text as="h3" variant="headingMd" fontWeight="semibold">
                {" "}
                2- Set the Label and Description
              </Text>
              <Text as="p" variant="bodyMd" tone="subdued">
                This text will displayed above the input options.
              </Text>
            </Grid.Cell>
            <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
              <TextField
                label="Label"
                value={`${formData.label}`}
                onChange={(value) => {
                  handleInputChange("label", value);
                }}
                autoComplete="on"
                error={getErrorFromZod(formErrors, "label")}
              />
            </Grid.Cell>
            <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
              <TextField
                label="Description"
                value={`${formData.description}`}
                onChange={(value) => {
                  handleInputChange("description", value);
                }}
                autoComplete="on"
              />
            </Grid.Cell>
          </Grid>
        </Box>
      </SpacingBackground>
      <SpacingBackground backgroundColor="#FFFFFF" border="1px solid #E3E7EC" borderRadius="12px" margin="0 0 12px 0">
        <Box paddingInline="600" paddingBlock="600">
          <Grid gap={{ lg: "15px" }}>
            <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
              <Text as="h3" variant="headingMd" fontWeight="semibold">
                {" "}
                3- Yes/No Input
              </Text>
              <Text as="p" variant="bodyMd" tone="subdued">
                Displays as two buttons side by side.
              </Text>
            </Grid.Cell>
            <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
              <TextField
                label="Selected Value"
                value={`${formData.inputs.yes}`}
                onChange={(value) => {
                  formData.inputs.yes = value;
                  handleInputChange("inputs", formData.inputs);
                }}
                autoComplete="on"
                error={getErrorFromZod(formErrors, "inputs.yes")}
              />
            </Grid.Cell>
            <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
              <TextField
                label="Unselected Value"
                value={`${formData.inputs.no}`}
                onChange={(value) => {
                  formData.inputs.no = value;
                  handleInputChange("inputs", formData.inputs);
                }}
                error={getErrorFromZod(formErrors, "inputs.no")}
                autoComplete="on"
              />
            </Grid.Cell>

            <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
              <BlockStack gap="100">
                <Text as="strong" fontWeight="bold" variant="bodyMd">
                  DEFAULT SELECTED VALUE
                </Text>
                <Text as="p">
                  {" "}
                  Choose which value is highlighted by default when the product
                  customiser initally displays
                </Text>
                <InlineStack gap="300" blockAlign="center">
                  <InlineStack gap="100" blockAlign="center">
                    <Text as="span" variant="bodySm">
                      Selected
                    </Text>
                    <ToggleButton
                      id={"selected"}
                      checked={formData.default == "yes"}
                      type="radio"
                      name="default"
                      value={"yes"}
                      onChange={function (value: any): void {
                        handleInputChange("default", value);
                      }}
                    />
                  </InlineStack>
                  <InlineStack gap="100" blockAlign="center">
                    <Text as="span" variant="bodySm">
                      UnSelected
                    </Text>
                    <ToggleButton
                      id={"unSelected"}
                      checked={formData.default == "no"}
                      type="radio"
                      name="default"
                      value={"no"}
                      onChange={function (value: any): void {
                        handleInputChange("default", value);
                      }}
                    />
                  </InlineStack>
                </InlineStack>
              </BlockStack>
            </Grid.Cell>
          </Grid>
        </Box>
      </SpacingBackground>
      <SpacingBackground backgroundColor="#FFFFFF" border="1px solid #E3E7EC" borderRadius="12px" margin="0 0 12px 0">
        <Box paddingInline="600" paddingBlock="600">
          <Grid gap={{ lg: "15px" }}>
            <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
              <Text as="h3" variant="headingMd" fontWeight="semibold">
                {" "}
                4- Popup Image (optional)
              </Text>
              <Text as="p" variant="bodyMd" tone="subdued">
                Example Image - displayed as popup
              </Text>
            </Grid.Cell>
            <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
              <FileInput
                buttonTitle="choose a picture"
                path={formData.popupImg}
                handlePath={(value: any) =>
                  handleInputChange("popupImg", value)
                }
              />
            </Grid.Cell>
          </Grid>
        </Box>
      </SpacingBackground>
      <SpacingBackground backgroundColor="#FFFFFF" border="1px solid #E3E7EC" borderRadius="12px" margin="0 0 12px 0">
        <Box paddingInline="600" paddingBlock="600">
          <AdditionalPriceLayout
            type={formData.price.type}
            value={formData.price.value}
            headerText={"5- Additional Price"}
            onTypeChange={function (val: string): void {
              handleInputChange("price", {
                ...formData.price,
                type: val,
              });
            }}
            onValueChange={function (val: number): void {
              handleInputChange("price", {
                ...formData.price,
                value: val,
              });
            }}
          />
        </Box>
      </SpacingBackground>
      <SpacingBackground backgroundColor="#FFFFFF" border="1px solid #E3E7EC" borderRadius="12px" margin="0 0 12px 0">
        <Box paddingInline="300" paddingBlock="300">
          <InlineStack align="end" gap="600">
            <button
              disabled={isSubmitting}
              className="back-large-btn"
              type="button"
              onClick={onClose}
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

            <button
              disabled={isSubmitting}
              className="next-large-btn"
              type="submit"
            >
              <Box paddingInline="1000">
                <InlineStack gap="300" blockAlign="center">
                  {isSubmitting && (
                    <img
                      width="22"
                      height="22"
                      src="/assets/loading/ic_loading_gray.svg"
                    />
                  )}
                  <span style={{ color: "white", fontWeight: "bold" }}>
                    {"Save"}
                  </span>
                  {!isSubmitting && <BiSaveIcon />}
                </InlineStack>
              </Box>
            </button>
          </InlineStack>
        </Box>
      </SpacingBackground>
    </Form>
  );
}

function NoteTypeInput({
  additionalOption,
  isSubmitting,
  isLoading,
  onSubmit,
  onClose,
}: {
  additionalOption: any;
  isSubmitting: boolean;
  isLoading: boolean;
  onSubmit: (customOption: any) => void;
  onClose: () => void;
}) {
  const [formData, setFormData] = useState<any>(
    additionalOption || {
      type: "note",
      label: "",
      description: "",
      noteLimitChar: "",
    },
  );
  let [isError, setIsError] = useState(false);
  let [formErrors, setFormErrors] = useState<any>({});

  const formSchema = z.object({
    label: z.string().min(1),
  });

  const submit = useSubmit();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const formAnalyser = formSchema.safeParse(formData);
    if (!formAnalyser.success) {
      setIsError(true);
      setFormErrors(formAnalyser.error.issues);
      return;
    }
    onSubmit(formData);
  };

  const handleInputChange = (inputName: string, value: any) => {
    setIsError(false);
    setFormData((prevData: any) => ({
      ...prevData,
      [inputName]: value,
    }));
  };

  return (
    <Form onSubmit={handleSubmit} method="POST">
      {isError && (
        <FlashToast
          messageFlash={{
            msg: "Your entries contain errors. kindly rectify them",
            status: "error",
          }}
        />
      )}
      <SpacingBackground backgroundColor="#FFFFFF" border="1px solid #E3E7EC" borderRadius="12px" margin="0 0 12px 0">
        <Box paddingInline="300" paddingBlock="600">
          <Grid gap={{ lg: "15px" }}>
            <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
              <Text as="h3" variant="headingMd" fontWeight="semibold">
                {" "}
                2- Set the Label and Description
              </Text>
              <Text as="p" variant="bodyMd" tone="subdued">
                This text will displayed above the input options.
              </Text>
            </Grid.Cell>
            <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
              <TextField
                label="Label"
                value={`${formData.label}`}
                onChange={(value) => {
                  handleInputChange("label", value);
                }}
                autoComplete="on"
                error={getErrorFromZod(formErrors, "label")}
              />
            </Grid.Cell>
            <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
              <TextField
                label="Description"
                value={`${formData.description}`}
                onChange={(value) => {
                  handleInputChange("description", value);
                }}
                autoComplete="on"
              />
            </Grid.Cell>
          </Grid>
        </Box>
      </SpacingBackground>
      <SpacingBackground backgroundColor="#FFFFFF" border="1px solid #E3E7EC" borderRadius="12px" margin="0 0 12px 0">
        <Box paddingInline="300" paddingBlock="600">
          <Grid gap={{ lg: "15px" }}>
            <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
              <Text as="h3" variant="headingMd" fontWeight="semibold">
                {" "}
                3-Note Input
              </Text>
              <Text as="p" variant="bodyMd" tone="subdued">
                Character limit (optional).
              </Text>
            </Grid.Cell>

            <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
              <TextField
                type="number"
                label="Displays as a textarea field for customers to type any additional requirements."
                value={`${formData.noteLimitChar}`}
                onChange={(value) => {
                  handleInputChange("noteLimitChar", parseInt(value));
                }}
                autoComplete="on"
                helpText="The maximum number of text characters for notes."
              />
            </Grid.Cell>
          </Grid>
        </Box>
      </SpacingBackground>
      <SpacingBackground backgroundColor="#FFFFFF" border="1px solid #E3E7EC" borderRadius="12px" margin="0 0 12px 0">
        <Box paddingInline="300" paddingBlock="300">
          <InlineStack align="end" gap="600">
            <button
              disabled={isSubmitting}
              className="back-large-btn"
              type="button"
              onClick={onClose}
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

            <button
              disabled={isSubmitting}
              className="next-large-btn"
              type="submit"
            >
              <Box paddingInline="1000">
                <InlineStack gap="300" blockAlign="center">
                  {isSubmitting && (
                    <img
                      width="22"
                      height="22"
                      src="/assets/loading/ic_loading_gray.svg"
                    />
                  )}
                  <span style={{ color: "white", fontWeight: "bold" }}>
                    {"Save"}
                  </span>
                  {!isSubmitting && <BiSaveIcon />}
                </InlineStack>
              </Box>
            </button>
          </InlineStack>
        </Box>
      </SpacingBackground>
    </Form>
  );
}

function TypeImageInput({
  additionalOption,
  isSubmitting,
  isLoading,
  onSubmit,
  onClose,
}: {
  additionalOption: any;
  isSubmitting: boolean;
  isLoading: boolean;
  onSubmit: (customOption: any) => void;
  onClose: () => void;
}) {
  const [formData, setFormData] = useState<any>(
    additionalOption || {
      type: "image-input",
      label: "",
      description: "",
      options: [
        {
          label: "",
          value: "",
          color: "#ffffff",
          previewImg: "",
          popupImg: "",
          price: {
            type: "none",
            value: 0,
          },
        },
      ],
    },
  );

  const handleAddItem = () => {
    if (!formData.options) {
      formData.options = [];
    }

    formData.options.push({
      label: "",
      value: "",
      color: "#ffffff",
      previewImg: "",
      popupImg: "",
      price: {
        type: "none",
        value: 0,
      },
    });

    setFormData({ ...formData });
  };

  const handleDeleteItem = (index: number) => {
    if (formData.options.length > 1) {
      formData.options.splice(index, 1);
      setFormData({ ...formData });
    }
  };
  let [isError, setIsError] = useState(false);
  let [formErrors, setFormErrors] = useState<any>({});

  const formSchema = z.object({
    label: z.string().min(1),
    options: z
      .object({
        value: z.string().min(1),
      })
      .array(),
  });

  const submit = useSubmit();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const formAnalyser = formSchema.safeParse(formData);
    if (!formAnalyser.success) {
      setIsError(true);
      setFormErrors(formAnalyser.error.issues);
      return;
    }
    onSubmit(formData);
  };

  const handleInputChange = (inputName: string, value: any) => {
    setIsError(false);
    setFormData((prevData: any) => ({
      ...prevData,
      [inputName]: value,
    }));
  };

  return (
    <Form onSubmit={handleSubmit} method="POST">
      {isError && (
        <FlashToast
          messageFlash={{
            msg: "Your entries contain errors. kindly rectify them",
            status: "error",
          }}
        />
      )}
      <SpacingBackground backgroundColor="#FFFFFF" border="1px solid #E3E7EC" borderRadius="12px" margin="0 0 12px 0">
        <Box paddingInline="300" paddingBlock="600">
          <Grid gap={{ lg: "15px" }}>
            <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
              <Text as="h3" variant="headingMd" fontWeight="semibold">
                {" "}
                2- Set the Label and Description
              </Text>
              <Text as="p" variant="bodyMd" tone="subdued">
                This text will displayed above the input options.
              </Text>
            </Grid.Cell>
            <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
              <TextField
                label="Label"
                value={`${formData.label}`}
                onChange={(value) => {
                  handleInputChange("label", value);
                }}
                autoComplete="on"
                error={getErrorFromZod(formErrors, "label")}
              />
            </Grid.Cell>
            <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
              <TextField
                label="Description"
                value={`${formData.description}`}
                onChange={(value) => {
                  handleInputChange("description", value);
                }}
                autoComplete="on"
              />
            </Grid.Cell>
          </Grid>
        </Box>
      </SpacingBackground>
      <SpacingBackground backgroundColor="#FFFFFF" border="1px solid #E3E7EC" borderRadius="12px" margin="0 0 12px 0">
        <Box paddingInline="600" paddingBlock="600">
          <Grid gap={{ lg: "15px" }}>
            <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
              <Text as="h3" variant="headingMd" fontWeight="semibold">
                3- Images as Input
              </Text>
              <Text as="p" variant="bodyMd" tone="subdued">
                Displays as a row of images that is selectable by the customer.
              </Text>
            </Grid.Cell>
            <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
              <Box
                paddingInline="300"
                paddingBlock="600"
                background="bg-surface"
              >
                <Grid gap={{ lg: "15px" }}>
                  {formData.options.map((option: any, index: number) => (
                    <>
                      {index > 0 && (
                        <Grid.Cell
                          columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}
                        >
                          <Divider borderWidth="100" />
                        </Grid.Cell>
                      )}
                      <Grid.Cell
                        columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}
                      >
                        <BlockStack>
                          <Bleed marginBlockEnd="400">
                            <InlineStack wrap={false} align="end" gap="200">
                              <RemoveNowIconBtn
                                onClick={() => handleDeleteItem(index)}
                              />
                            </InlineStack>
                          </Bleed>
                          <Box width="100%">
                            <Grid>
                              <Grid.Cell
                                columnSpan={{
                                  xs: 6,
                                  sm: 3,
                                  md: 3,
                                  lg: 6,
                                  xl: 6,
                                }}
                              >
                                <TextField
                                  label="Label"
                                  value={`${option.label}`}
                                  onChange={(value) => {
                                    formData.options[index].label = value;
                                    handleInputChange(
                                      "options",
                                      formData.options,
                                    );
                                  }}
                                  autoComplete="on"
                                />
                              </Grid.Cell>
                              <Grid.Cell
                                columnSpan={{
                                  xs: 6,
                                  sm: 3,
                                  md: 3,
                                  lg: 6,
                                  xl: 6,
                                }}
                              >
                                <TextField
                                  label="Value(Required)"
                                  value={`${option.value}`}
                                  onChange={(value) => {
                                    formData.options[index].value = value;
                                    handleInputChange(
                                      "options",
                                      formData.options,
                                    );
                                  }}
                                  autoComplete="on"
                                  error={getErrorFromZod(
                                    formErrors,
                                    "options." + index + ".value",
                                  )}
                                />
                              </Grid.Cell>
                              <Grid.Cell
                                columnSpan={{
                                  xs: 6,
                                  sm: 3,
                                  md: 3,
                                  lg: 6,
                                  xl: 6,
                                }}
                              >
                                <TextColorField
                                  label="Color"
                                  color={`${option.color}`}
                                  setColor={(value: string) => {
                                    formData.options[index].color = value;
                                    handleInputChange(
                                      "options",
                                      formData.options,
                                    );
                                  }}
                                />
                              </Grid.Cell>
                              <Grid.Cell
                                columnSpan={{
                                  xs: 6,
                                  sm: 3,
                                  md: 3,
                                  lg: 6,
                                  xl: 6,
                                }}
                              ></Grid.Cell>
                              <Grid.Cell
                                columnSpan={{
                                  xs: 6,
                                  sm: 3,
                                  md: 3,
                                  lg: 6,
                                  xl: 6,
                                }}
                              >
                                <Text
                                  as="h6"
                                  variant="bodyMd"
                                  fontWeight="semibold"
                                >
                                  Popup Image (optional)
                                </Text>
                                <FileInput
                                  title="Example Image - displayed as popup"
                                  buttonTitle="choose a picture"
                                  path={option.popupImg}
                                  handlePath={(value: string) => {
                                    formData.options[index].popupImg = value;
                                    handleInputChange(
                                      "options",
                                      formData.options,
                                    );
                                  }}
                                />
                              </Grid.Cell>
                              <Grid.Cell
                                columnSpan={{
                                  xs: 6,
                                  sm: 3,
                                  md: 3,
                                  lg: 6,
                                  xl: 6,
                                }}
                              >
                                <Text
                                  as="h6"
                                  variant="bodyMd"
                                  fontWeight="semibold"
                                >
                                  Preview image (optional)
                                </Text>
                                <FileInput
                                  title="Image - displayed as   Preview image "
                                  buttonTitle="choose a picture"
                                  path={option.previewImg}
                                  handlePath={(value: string) => {
                                    formData.options[index].previewImg = value;
                                    handleInputChange(
                                      "options",
                                      formData.options,
                                    );
                                  }}
                                />
                              </Grid.Cell>
                              <Grid.Cell
                                columnSpan={{
                                  xs: 6,
                                  sm: 6,
                                  md: 6,
                                  lg: 12,
                                  xl: 12,
                                }}
                              >
                                <AdditionalPriceLayout
                                  type={option.price.type}
                                  value={option.price.value}
                                  headerText={"Pricing (Optional)"}
                                  onTypeChange={function (val: string): void {
                                    formData.options[index].price.type = val;
                                    handleInputChange(
                                      "options",
                                      formData.options,
                                    );
                                  }}
                                  onValueChange={function (val: number): void {
                                    formData.options[index].price.value = val;
                                    handleInputChange(
                                      "options",
                                      formData.options,
                                    );
                                  }}
                                />
                              </Grid.Cell>
                            </Grid>
                          </Box>
                        </BlockStack>
                      </Grid.Cell>
                    </>
                  ))}

                  <Grid.Cell
                    columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}
                  >
                    <Box width="300px">
                      <BiAddBtn
                        title="Add option"
                        handleClick={() => handleAddItem()}
                      />
                    </Box>
                  </Grid.Cell>
                </Grid>
              </Box>
            </Grid.Cell>
          </Grid>
        </Box>
      </SpacingBackground>
      <SpacingBackground backgroundColor="#FFFFFF" border="1px solid #E3E7EC" borderRadius="12px" margin="0 0 12px 0">
        <Box paddingInline="300" paddingBlock="300">
          <InlineStack align="end" gap="600">
            <button
              disabled={isSubmitting}
              className="back-large-btn"
              type="button"
              onClick={onClose}
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

            <button
              disabled={isSubmitting}
              className="next-large-btn"
              type="submit"
            >
              <Box paddingInline="1000">
                <InlineStack gap="300" blockAlign="center">
                  {isSubmitting && (
                    <img
                      width="22"
                      height="22"
                      src="/assets/loading/ic_loading_gray.svg"
                    />
                  )}
                  <span style={{ color: "white", fontWeight: "bold" }}>
                    {"Save"}
                  </span>
                  {!isSubmitting && <BiSaveIcon />}
                </InlineStack>
              </Box>
            </button>
          </InlineStack>
        </Box>
      </SpacingBackground>
    </Form>
  );
}

function DropdownTypeInput({
  additionalOption,
  isSubmitting,
  isLoading,
  onSubmit,
  onClose,
}: {
  additionalOption: any;
  isSubmitting: boolean;
  isLoading: boolean;
  onSubmit: (customOption: any) => void;
  onClose: () => void;
}) {
  const [formData, setFormData] = useState<any>(
    additionalOption || {
      type: "dropdown",
      label: "",
      description: "",
      options: [
        {
          label: "",
          value: "",
          popupImg: "",
          price: {
            type: "none",
            value: 0,
          },
        },
      ],
    },
  );

  const handleAddItem = () => {
    if (!formData.options) {
      formData.options = [];
    }

    formData.options.push({
      label: "",
      value: "",
      popupImg: "",
      price: {
        type: "none",
        value: 0,
      },
    });

    setFormData({ ...formData });
  };

  const handleDeleteItem = (index: number) => {
    if (formData.options.length > 1) {
      formData.options.splice(index, 1);
      setFormData({ ...formData });
    }
  };

  let [isError, setIsError] = useState(false);
  let [formErrors, setFormErrors] = useState<any>();

  const formSchema = z.object({
    label: z.string().min(1),
    options: z
      .object({
        value: z.string().min(1),
      })
      .array(),
  });

  const submit = useSubmit();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const formAnalyser = formSchema.safeParse(formData);
    if (!formAnalyser.success) {
      console.log("errors", formAnalyser.error.issues);
      setIsError(true);
      setFormErrors(formAnalyser.error.issues);
      return;
    }
    onSubmit(formData);
  };

  const handleInputChange = (inputName: string, value: any) => {
    setIsError(false);
    setFormData((prevData: any) => ({
      ...prevData,
      [inputName]: value,
    }));
  };

  return (
    <Form onSubmit={handleSubmit} method="POST">
      {isError && (
        <FlashToast
          messageFlash={{
            msg: "Your entries contain errors. kindly rectify them",
            status: "error",
          }}
        />
      )}
      <SpacingBackground backgroundColor="#FFFFFF" border="1px solid #E3E7EC" borderRadius="12px" margin="0 0 12px 0">
        <Box paddingInline="300" paddingBlock="600">
          <Grid gap={{ lg: "15px" }}>
            <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
              <Text as="h3" variant="headingMd" fontWeight="semibold">
                {" "}
                2- Set the Label and Description
              </Text>
              <Text as="p" variant="bodyMd" tone="subdued">
                This text will displayed above the input options.
              </Text>
            </Grid.Cell>
            <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
              <TextField
                label="Label"
                value={`${formData.label}`}
                onChange={(value) => {
                  handleInputChange("label", value);
                }}
                error={getErrorFromZod(formErrors, "label")}
                autoComplete="on"
              />
            </Grid.Cell>
            <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
              <TextField
                label="Description"
                value={`${formData.description}`}
                onChange={(value) => {
                  handleInputChange("description", value);
                }}
                autoComplete="on"
              />
            </Grid.Cell>
          </Grid>
        </Box>
      </SpacingBackground>
      <SpacingBackground backgroundColor="#FFFFFF" border="1px solid #E3E7EC" borderRadius="12px" margin="0 0 12px 0">
        <Box paddingInline="600" paddingBlock="600">
          <Grid gap={{ lg: "15px" }}>
            <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
              <Text as="h3" variant="headingMd" fontWeight="semibold">
                {" "}
                3- Dropdown Input
              </Text>
              <Text as="p" variant="bodyMd" tone="subdued">
                Displays as a select list.
              </Text>
            </Grid.Cell>
            <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
              <Box
                paddingInline="300"
                paddingBlock="1000"
                background="bg-surface"
              >
                <Grid gap={{ lg: "30px" }}>
                  {formData.options.map((option: any, index: number) => (
                    <>
                      <Grid.Cell
                        columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}
                      >
                        <Divider borderWidth="100" />
                        <Divider borderWidth="100" />
                      </Grid.Cell>
                      <Grid.Cell
                        columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}
                      >
                        <BlockStack>
                          <Bleed marginBlockEnd="400">
                            <InlineStack wrap={false} align="end" gap="200">
                              <RemoveNowIconBtn
                                onClick={() => handleDeleteItem(index)}
                              />
                            </InlineStack>
                          </Bleed>
                          <Box width="100%">
                            <Grid>
                              <Grid.Cell
                                columnSpan={{
                                  xs: 6,
                                  sm: 3,
                                  md: 3,
                                  lg: 6,
                                  xl: 6,
                                }}
                              >
                                <TextField
                                  label="Label"
                                  value={`${option.label}`}
                                  onChange={(value) => {
                                    formData.options[index].label = value;
                                    handleInputChange(
                                      "options",
                                      formData.options,
                                    );
                                  }}
                                  autoComplete="on"
                                />
                              </Grid.Cell>
                              <Grid.Cell
                                columnSpan={{
                                  xs: 6,
                                  sm: 3,
                                  md: 3,
                                  lg: 6,
                                  xl: 6,
                                }}
                              >
                                <TextField
                                  label="Value(Required)"
                                  value={`${option.value}`}
                                  onChange={(value) => {
                                    formData.options[index].value = value;
                                    handleInputChange(
                                      "options",
                                      formData.options,
                                    );
                                  }}
                                  autoComplete="on"
                                  error={getErrorFromZod(
                                    formErrors,
                                    "options." + index + ".value",
                                  )}
                                />
                              </Grid.Cell>
                              <Grid.Cell
                                columnSpan={{
                                  xs: 6,
                                  sm: 3,
                                  md: 3,
                                  lg: 6,
                                  xl: 6,
                                }}
                              >
                                <Text
                                  as="h6"
                                  variant="bodyMd"
                                  fontWeight="semibold"
                                >
                                  Popup Image (optional)
                                </Text>
                                <FileInput
                                  title="Example Image - displayed as popup"
                                  buttonTitle="choose a picture"
                                  path={option.popupImg}
                                  handlePath={(value: string) => {
                                    formData.options[index].popupImg = value;
                                    handleInputChange(
                                      "options",
                                      formData.options,
                                    );
                                  }}
                                />
                              </Grid.Cell>
                              <Grid.Cell
                                columnSpan={{
                                  xs: 6,
                                  sm: 6,
                                  md: 6,
                                  lg: 12,
                                  xl: 12,
                                }}
                              >
                                <AdditionalPriceLayout
                                  type={option.price.type}
                                  value={option.price.value}
                                  headerText={"Pricing (Optional)"}
                                  onTypeChange={function (val: string): void {
                                    formData.options[index].price.type = val;
                                    handleInputChange(
                                      "options",
                                      formData.options,
                                    );
                                  }}
                                  onValueChange={function (val: number): void {
                                    formData.options[index].price.value = val;
                                    handleInputChange(
                                      "options",
                                      formData.options,
                                    );
                                  }}
                                />
                              </Grid.Cell>
                            </Grid>
                          </Box>
                        </BlockStack>
                      </Grid.Cell>
                    </>
                  ))}

                  <Grid.Cell
                    columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}
                  >
                    <Box width="300px">
                      <BiAddBtn
                        title="Add option"
                        handleClick={() => handleAddItem()}
                      />
                    </Box>
                  </Grid.Cell>
                </Grid>
              </Box>
            </Grid.Cell>
          </Grid>
        </Box>
      </SpacingBackground>
      <SpacingBackground backgroundColor="#FFFFFF" border="1px solid #E3E7EC" borderRadius="12px" margin="0 0 12px 0">
        <Box paddingInline="300" paddingBlock="300">
          <InlineStack align="end" gap="600">
            <button
              disabled={isSubmitting}
              className="back-large-btn"
              type="button"
              onClick={onClose}
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

            <button
              disabled={isSubmitting}
              className="next-large-btn"
              type="submit"
            >
              <Box paddingInline="1000">
                <InlineStack gap="300" blockAlign="center">
                  {isSubmitting && (
                    <img
                      width="22"
                      height="22"
                      src="/assets/loading/ic_loading_gray.svg"
                    />
                  )}
                  <span style={{ color: "white", fontWeight: "bold" }}>
                    {"Save"}
                  </span>
                  {!isSubmitting && <BiSaveIcon />}
                </InlineStack>
              </Box>
            </button>
          </InlineStack>
        </Box>
      </SpacingBackground>
    </Form>
  );
}

function IncludedOptionInput({
  additionalOption,
  isSubmitting,
  isLoading,
  onSubmit,
  onClose,
}: {
  additionalOption: any;
  isSubmitting: boolean;
  isLoading: boolean;
  onSubmit: (customOption: any) => void;
  onClose: () => void;
}) {
  const [formData, setFormData] = useState<any>(
    additionalOption || {
      type: "include-type",
      label: "",
      description: "",
      popupImg: "",
      price: {
        type: "none",
        value: 0,
      },
    },
  );
  let [isError, setIsError] = useState(false);
  let [formErrors, setFormErrors] = useState<any>({});

  const formSchema = z.object({
    label: z.string().min(1),
  });

  const submit = useSubmit();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const formAnalyser = formSchema.safeParse(formData);
    if (!formAnalyser.success) {
      setIsError(true);
      setFormErrors(formAnalyser.error.issues);
      return;
    }
    onSubmit(formData);
  };

  const handleInputChange = (inputName: string, value: any) => {
    setIsError(false);
    setFormData((prevData: any) => ({
      ...prevData,
      [inputName]: value,
    }));
  };

  return (
    <Form onSubmit={handleSubmit} method="POST">
      {isError && (
        <FlashToast
          messageFlash={{
            msg: "Your entries contain errors. kindly rectify them",
            status: "error",
          }}
        />
      )}
      <SpacingBackground backgroundColor="#FFFFFF" border="1px solid #E3E7EC" borderRadius="12px" margin="0 0 12px 0">
        <Box paddingInline="300" paddingBlock="600">
          <Grid gap={{ lg: "15px" }}>
            <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
              <Text as="h3" variant="headingMd" fontWeight="semibold">
                {" "}
                2- Set the Label and Description
              </Text>
              <Text as="p" variant="bodyMd" tone="subdued">
                This text will displayed above the input options.
              </Text>
            </Grid.Cell>
            <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
              <TextField
                label="Label"
                value={`${formData.label}`}
                onChange={(value) => {
                  handleInputChange("label", value);
                }}
                autoComplete="on"
                error={getErrorFromZod(formErrors, "label")}
              />
            </Grid.Cell>
            <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
              <TextField
                label="Description"
                value={`${formData.description}`}
                onChange={(value) => {
                  handleInputChange("description", value);
                }}
                autoComplete="on"
              />
            </Grid.Cell>
          </Grid>
        </Box>
      </SpacingBackground>
      <SpacingBackground backgroundColor="#FFFFFF" border="1px solid #E3E7EC" borderRadius="12px" margin="0 0 12px 0">
        <Box paddingInline="600" paddingBlock="600">
          <Grid gap={{ lg: "15px" }}>
            <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
              <Text as="h3" variant="headingMd" fontWeight="semibold">
                {" "}
                3- Popup Image (optional)
              </Text>
              <Text as="p" variant="bodyMd" tone="subdued">
                Example Image - displayed as popup
              </Text>
            </Grid.Cell>
            <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
              <FileInput
                buttonTitle="choose a picture"
                path={formData.popupImg}
                handlePath={(value: any) =>
                  handleInputChange("popupImg", value)
                }
              />
            </Grid.Cell>
          </Grid>
        </Box>
      </SpacingBackground>
      <SpacingBackground backgroundColor="#FFFFFF" border="1px solid #E3E7EC" borderRadius="12px" margin="0 0 12px 0">
        <Box paddingInline="600" paddingBlock="600">
          <AdditionalPriceLayout
            type={formData.price.type}
            value={formData.price.value}
            headerText={"4- Pricing (Optional)"}
            onTypeChange={function (val: string): void {
              handleInputChange("price", {
                ...formData.price,
                type: val,
              });
            }}
            onValueChange={function (val: number): void {
              handleInputChange("price", {
                ...formData.price,
                value: val,
              });
            }}
          />
        </Box>
      </SpacingBackground>
      <SpacingBackground backgroundColor="#FFFFFF" border="1px solid #E3E7EC" borderRadius="12px" margin="0 0 12px 0">
        <Box paddingInline="300" paddingBlock="300">
          <InlineStack align="end" gap="600">
            <button
              disabled={isSubmitting}
              className="back-large-btn"
              type="button"
              onClick={onClose}
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

            <button
              disabled={isSubmitting}
              className="next-large-btn"
              type="submit"
            >
              <Box paddingInline="1000">
                <InlineStack gap="300" blockAlign="center">
                  {isSubmitting && (
                    <img
                      width="22"
                      height="22"
                      src="/assets/loading/ic_loading_gray.svg"
                    />
                  )}
                  <span style={{ color: "white", fontWeight: "bold" }}>
                    {"Save"}
                  </span>
                  {!isSubmitting && <BiSaveIcon />}
                </InlineStack>
              </Box>
            </button>
          </InlineStack>
        </Box>
      </SpacingBackground>
    </Form>
  );
}
