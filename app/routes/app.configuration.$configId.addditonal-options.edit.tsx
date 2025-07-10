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
  Divider,
  Grid,
  InlineStack,
  Text,
  TextField,
} from "@shopify/polaris";
import { useState } from "react";
import { z } from "zod";
import { BackBtn } from "~/components/buttons/BackBtn";
import { BiAddBtn } from "~/components/buttons/BiAddBtn";
import { BiSaveBtn } from "~/components/buttons/BiSaveBtn";
import { RemoveNowIconBtn } from "~/components/buttons/RemoveNowIconBtn";
import { FlashToast } from "~/components/feactures/FlashToast";
import { FileInput } from "~/components/inputs/FileInput";
import { ReactSwitchCustom } from "~/components/inputs/ReactSwitchCustom";
import { TextColorField } from "~/components/inputs/TextColorField";
import { SpacingBackground } from "~/components/layouts/SpacingBackground";

import ConfigAddionalOptionService from "~/models/ConfigAddionalOption.service";
import { authenticate } from "~/shopify.server";
import { getErrorFromZod } from "~/utils/error-getting";
import { fileUrl } from "~/utils/fileUrl";
import { flashMessage } from "~/utils/message-flash";
import { jsonTransform } from "~/utils/transfomerZod";

export default function MaterialEdit() {
  const navigation = useNavigation();
  const actionData = useActionData<typeof action>();
  console.log("action data :", actionData);
  let { additonalOptions } = useOutletContext<{ additonalOptions: [] }>();
  const [searchParams] = useSearchParams();
  const id = parseInt(searchParams.get("id") || "");
  let additonalOption: any = additonalOptions?.find(
    (curr, index) => index === id,
  );
  const [selectedType, setSelectedType] = useState(
    additonalOption?.type || "yes/no",
  );
  const [formData, setFormData] = useState({});

  let isLoading = navigation.state == "loading";
  let isSubmitting = navigation.state == "submitting";
  let types = [
    {
      icon: "/aso-config-additional-option/yes-no.jpg",
      value: "yes/no",
      label: "Yes/No",
      component: (
        <YesOrNoInput
          additonalOption={additonalOption}
          isLoading={isLoading}
          isSubmitting={isSubmitting}
        />
      ),
    },
    {
      icon: "/aso-config-additional-option/image-type.jpg",
      value: "image-input",
      label: "Image Input",
      component: (
        <TypeImageInput
          additonalOption={additonalOption}
          isLoading={isLoading}
          isSubmitting={isSubmitting}
        />
      ),
    },
    {
      icon: "/aso-config-additional-option/dropdown.jpg",
      value: "dropdown",
      label: "Dropdown",
      component: (
        <DropdownTypeInput
          additonalOption={additonalOption}
          isLoading={isLoading}
          isSubmitting={isSubmitting}
        />
      ),
    },
    {
      icon: "/aso-config-additional-option/note.jpg",
      value: "note",
      label: "Note",
      component: (
        <NoteTypeInput
          additonalOption={additonalOption}
          isLoading={isLoading}
          isSubmitting={isSubmitting}
        />
      ),
    },
    {
      icon: "/aso-config-additional-option/include-type.jpg",
      value: "include-type",
      label: "Include Type",
      component: (
        <IncludedOptionInput
          additonalOption={additonalOption}
          isLoading={isLoading}
          isSubmitting={isSubmitting}
        />
      ),
    },
  ];

  return (
    <SpacingBackground width="100%" height="auto" margin="16px 0px ">
      <SpacingBackground backgroundColor="#F9F9F9">
        <Box paddingInline="300" paddingBlock="600">
          <Text as="h6" variant="bodyMd" fontWeight="bold">
            {additonalOption
              ? "Update additional option"
              : "Create new additional option"}
          </Text>
        </Box>
      </SpacingBackground>
      <Divider borderWidth="100" />
      <SpacingBackground backgroundColor="#FFFFFF">
        <Box paddingInline="300" paddingBlock="600">
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
              <InlineStack gap="600" blockAlign="center" align="center">
                {types?.map((type) => (
                  <div
                    onClick={() =>
                      Number.isNaN(id) && setSelectedType(type.value)
                    }
                    className={
                      type.value === selectedType
                        ? "aso-additonal-card active"
                        : `aso-additonal-card ${Number.isNaN(id) || "disabled"}`
                    }
                  >
                    <BlockStack inlineAlign="center" align="center" gap="100">
                      <img
                        style={{ height: "40px" }}
                        src={fileUrl(type.icon)}
                        alt=""
                      />
                      <span> {type.label}</span>
                    </BlockStack>
                  </div>
                ))}
              </InlineStack>
            </Grid.Cell>
          </Grid>
        </Box>
      </SpacingBackground>
      <Divider borderWidth="100" />
      {types?.find((curr) => curr.value === selectedType)?.component}
    </SpacingBackground>
  );
}

const formSchema = z.object({
  option: z.any().transform(jsonTransform),
});

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const { session, admin } = await authenticate.admin(request);

  const formData = await request.formData();
  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  const configId = parseInt(params.configId ?? "");
  const submission = parseWithZod(formData, { schema: formSchema });

  if (submission.status !== "success") {
    return json({ status: false, message: null, errors: submission.error });
  }

  let option = submission.value.option;

  if (id && configId) {
    let res = await ConfigAddionalOptionService.update(
      configId,
      session.id,
      option,
      parseInt(id),
    );
    return res
      ? redirect(
          `..${flashMessage("Additional option updated successfully")}`,
        )
      : redirect(
          `..${flashMessage("Failed to update additional option", "error")}`,
        );
  } else {
    let res = await ConfigAddionalOptionService.add(
      configId,
      session.id,
      option,
    );
    return res
      ? redirect(
          `..${flashMessage("Additional option added successfully")}`,
        )
      : redirect(
          `..${flashMessage("Failed to add additional option", "error")}`,
        );
  }
};

function YesOrNoInput({
  additonalOption,
  isSubmitting,
  isLoading,
}: {
  additonalOption: any;
  isSubmitting: boolean;
  isLoading: boolean;
}) {
  const [formData, setFormData] = useState<any>(
    additonalOption || {
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
    submit({ option: JSON.stringify(formData) }, { method: "POST" });
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
            msg: "Your entries contain errors. Kindly rectify them",
            status: "error",
          }}
        />
      )}
      <SpacingBackground backgroundColor="#F8F9FB">
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
      <Divider borderWidth="100" />
      <SpacingBackground backgroundColor="#F8F9FB">
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
                    <ReactSwitchCustom
                      checked={formData.default == "yes"}
                      setChecked={(value: any) =>
                        handleInputChange(
                          "default",
                          formData.default == "no" ? "yes" : "no",
                        )
                      }
                    />
                  </InlineStack>
                  <InlineStack gap="100" blockAlign="center">
                    <Text as="span" variant="bodySm">
                      UnSelected
                    </Text>
                    <ReactSwitchCustom
                      checked={formData.default == "no"}
                      setChecked={(value: any) =>
                        handleInputChange(
                          "default",
                          formData.default == "no" ? "yes" : "no",
                        )
                      }
                    />
                  </InlineStack>
                </InlineStack>
              </BlockStack>
            </Grid.Cell>
          </Grid>
        </Box>
      </SpacingBackground>
      <Divider borderWidth="100" />
      <SpacingBackground backgroundColor="#F8F9FB">
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
      <Divider borderWidth="100" />
      <SpacingBackground backgroundColor="#F8F9FB">
        <Box paddingInline="600" paddingBlock="600">
          <Grid gap={{ lg: "15px" }}>
            <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
              <Text as="h3" variant="bodyMd" fontWeight="semibold">
                {" "}
                3- Yes/No Inpu
              </Text>
              <Text as="p" variant="bodyMd" tone="subdued">
                Displays as two buttons side by side.
              </Text>
            </Grid.Cell>
            <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
              <InlineStack gap="300" blockAlign="center">
                <InlineStack gap="100" blockAlign="center">
                  <Text as="span" fontWeight="semibold" variant="bodySm">
                    None
                  </Text>
                  <ReactSwitchCustom
                    checked={formData.price.type == "none"}
                    setChecked={(value: boolean) =>
                      value &&
                      handleInputChange("price", {
                        ...formData.price,
                        type: "none",
                      })
                    }
                  />
                </InlineStack>
                <InlineStack gap="100" blockAlign="center">
                  <Text as="span" fontWeight="semibold" variant="bodySm">
                    Base Price
                  </Text>
                  <ReactSwitchCustom
                    checked={formData.price.type == "base"}
                    setChecked={(value: boolean) =>
                      value &&
                      handleInputChange("price", {
                        ...formData.price,
                        type: "base",
                      })
                    }
                  />
                </InlineStack>
                <InlineStack gap="100" blockAlign="center">
                  <Text as="span" fontWeight="semibold" variant="bodySm">
                    Price Multiplier
                  </Text>
                  <ReactSwitchCustom
                    checked={formData.price.type == "multiplier"}
                    setChecked={(value: boolean) =>
                      value &&
                      handleInputChange("price", {
                        ...formData.price,
                        type: "multiplier",
                      })
                    }
                  />
                </InlineStack>
              </InlineStack>
            </Grid.Cell>
            {formData.price.type != "none" && (
              <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
                <TextField
                  label="Price value"
                  type="number"
                  labelHidden
                  value={`${formData.price.value}`}
                  onChange={(value) =>
                    handleInputChange("price", {
                      ...formData.price,
                      value: value,
                    })
                  }
                  onBlur={(value) =>
                    handleInputChange("price", {
                      ...formData.price,
                      value: parseFloat(formData.price.value),
                    })
                  }
                  helpText={
                    formData.price.type == "base"
                      ? "Additional cost when selected by customer (e.g. $10.00)."
                      : "Multiply the final price of the sign when selected (e.g. 2 x 100)."
                  }
                  autoComplete="on"
                />
              </Grid.Cell>
            )}
          </Grid>
        </Box>
      </SpacingBackground>
      <Divider borderWidth="100" />
      <SpacingBackground backgroundColor="#F9F9F9">
        <Box paddingInline="300" paddingBlock="300">
          <InlineStack align="end" gap="600">
            <BackBtn isLoading={isLoading} title="Back" />
            <BiSaveBtn isLoading={isSubmitting} title="Save" />
          </InlineStack>
        </Box>
      </SpacingBackground>
    </Form>
  );
}

function NoteTypeInput({
  additonalOption,
  isSubmitting,
  isLoading,
}: {
  additonalOption: any;
  isSubmitting: boolean;
  isLoading: boolean;
}) {
  const [formData, setFormData] = useState<any>(
    additonalOption || {
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
    submit({ option: JSON.stringify(formData) }, { method: "POST" });
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
            msg: "Your entries contain errors. Kindly rectify them",
            status: "error",
          }}
        />
      )}
      <SpacingBackground backgroundColor="#F8F9FB">
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
      <Divider borderWidth="100" />
      <SpacingBackground backgroundColor="#F8F9FB">
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
      <Divider borderWidth="100" />
      <SpacingBackground backgroundColor="#F9F9F9">
        <Box paddingInline="300" paddingBlock="300">
          <InlineStack align="end" gap="600">
            <BackBtn isLoading={isLoading} title="Back" />
            <BiSaveBtn isLoading={isSubmitting} title="Save" />
          </InlineStack>
        </Box>
      </SpacingBackground>
    </Form>
  );
}

function TypeImageInput({
  additonalOption,
  isSubmitting,
  isLoading,
}: {
  additonalOption: any;
  isSubmitting: boolean;
  isLoading: boolean;
}) {
  const [formData, setFormData] = useState<any>(
    additonalOption || {
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
    submit({ option: JSON.stringify(formData) }, { method: "POST" });
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
            msg: "Your entries contain errors. Kindly rectify them",
            status: "error",
          }}
        />
      )}
      <SpacingBackground backgroundColor="#F8F9FB">
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
      <Divider borderWidth="100" />
      <SpacingBackground backgroundColor="#F8F9FB">
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
                                <InlineStack gap="300" blockAlign="center">
                                  <InlineStack gap="100" blockAlign="center">
                                    <Text
                                      as="span"
                                      fontWeight="semibold"
                                      variant="bodySm"
                                    >
                                      None
                                    </Text>
                                    <ReactSwitchCustom
                                      checked={option.price.type == "none"}
                                      setChecked={(value: boolean) => {
                                        if (!value) return;
                                        formData.options[index].price.type =
                                          "none";
                                        handleInputChange(
                                          "options",
                                          formData.options,
                                        );
                                      }}
                                    />
                                  </InlineStack>
                                  <InlineStack gap="100" blockAlign="center">
                                    <Text
                                      as="span"
                                      fontWeight="semibold"
                                      variant="bodySm"
                                    >
                                      Base Price
                                    </Text>
                                    <ReactSwitchCustom
                                      checked={option.price.type == "base"}
                                      setChecked={(value: boolean) => {
                                        if (!value) return;
                                        formData.options[index].price.type =
                                          "base";
                                        handleInputChange(
                                          "options",
                                          formData.options,
                                        );
                                      }}
                                    />
                                  </InlineStack>
                                  <InlineStack gap="100" blockAlign="center">
                                    <Text
                                      as="span"
                                      fontWeight="semibold"
                                      variant="bodySm"
                                    >
                                      Price Multiplier
                                    </Text>
                                    <ReactSwitchCustom
                                      checked={
                                        option.price.type == "multiplier"
                                      }
                                      setChecked={(value: boolean) => {
                                        if (!value) return;
                                        formData.options[index].price.type =
                                          "multiplier";
                                        handleInputChange(
                                          "options",
                                          formData.options,
                                        );
                                      }}
                                    />
                                  </InlineStack>
                                </InlineStack>
                              </Grid.Cell>
                              {option.price.type != "none" && (
                                <Grid.Cell
                                  columnSpan={{
                                    xs: 6,
                                    sm: 6,
                                    md: 6,
                                    lg: 6,
                                    xl: 6,
                                  }}
                                >
                                  <TextField
                                    label="Price value"
                                    type="number"
                                    labelHidden
                                    value={`${option.price.value}`}
                                    onChange={(value: any) => {
                                      formData.options[index].price.value =
                                        value;
                                      handleInputChange(
                                        "options",
                                        formData.options,
                                      );
                                    }}
                                    onBlur={(value: any) => {
                                      formData.options[index].price.value =
                                        parseFloat(option.price.value);
                                      handleInputChange(
                                        "options",
                                        formData.options,
                                      );
                                    }}
                                    helpText={
                                      option.price.type == "base"
                                        ? "Additional cost when selected by customer (e.g. $10.00)."
                                        : "Multiply the final price of the sign when selected (e.g. 2 x 100)."
                                    }
                                    autoComplete="on"
                                  />
                                </Grid.Cell>
                              )}
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

      <Divider borderWidth="100" />
      <SpacingBackground backgroundColor="#F9F9F9">
        <Box paddingInline="300" paddingBlock="300">
          <InlineStack align="end" gap="600">
            <BackBtn isLoading={isLoading} title="Back" />
            <BiSaveBtn isLoading={isSubmitting} title="Save" />
          </InlineStack>
        </Box>
      </SpacingBackground>
    </Form>
  );
}

function DropdownTypeInput({
  additonalOption,
  isSubmitting,
  isLoading,
}: {
  additonalOption: any;
  isSubmitting: boolean;
  isLoading: boolean;
}) {
  const [formData, setFormData] = useState<any>(
    additonalOption || {
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
    submit({ option: JSON.stringify(formData) }, { method: "POST" });
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
            msg: "Your entries contain errors. Kindly rectify them",
            status: "error",
          }}
        />
      )}
      <SpacingBackground backgroundColor="#F8F9FB">
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
      <Divider borderWidth="100" />
      <SpacingBackground backgroundColor="#F8F9FB">
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
                                <InlineStack gap="300" blockAlign="center">
                                  <InlineStack gap="100" blockAlign="center">
                                    <Text
                                      as="span"
                                      fontWeight="semibold"
                                      variant="bodySm"
                                    >
                                      None
                                    </Text>
                                    <ReactSwitchCustom
                                      checked={option.price.type == "none"}
                                      setChecked={(value: boolean) => {
                                        if (!value) return;
                                        formData.options[index].price.type =
                                          "none";
                                        handleInputChange(
                                          "options",
                                          formData.options,
                                        );
                                      }}
                                    />
                                  </InlineStack>
                                  <InlineStack gap="100" blockAlign="center">
                                    <Text
                                      as="span"
                                      fontWeight="semibold"
                                      variant="bodySm"
                                    >
                                      Base Price
                                    </Text>
                                    <ReactSwitchCustom
                                      checked={option.price.type == "base"}
                                      setChecked={(value: boolean) => {
                                        if (!value) return;
                                        formData.options[index].price.type =
                                          "base";
                                        handleInputChange(
                                          "options",
                                          formData.options,
                                        );
                                      }}
                                    />
                                  </InlineStack>
                                  <InlineStack gap="100" blockAlign="center">
                                    <Text
                                      as="span"
                                      fontWeight="semibold"
                                      variant="bodySm"
                                    >
                                      Price Multiplier
                                    </Text>
                                    <ReactSwitchCustom
                                      checked={
                                        option.price.type == "multiplier"
                                      }
                                      setChecked={(value: boolean) => {
                                        if (!value) return;
                                        formData.options[index].price.type =
                                          "multiplier";
                                        handleInputChange(
                                          "options",
                                          formData.options,
                                        );
                                      }}
                                    />
                                  </InlineStack>
                                </InlineStack>
                              </Grid.Cell>
                              {option.price.type != "none" && (
                                <Grid.Cell
                                  columnSpan={{
                                    xs: 6,
                                    sm: 6,
                                    md: 6,
                                    lg: 6,
                                    xl: 6,
                                  }}
                                >
                                  <TextField
                                    label="Price value"
                                    type="number"
                                    labelHidden
                                    value={`${option.price.value}`}
                                    onChange={(value: any) => {
                                      formData.options[index].price.value =
                                        value;
                                      handleInputChange(
                                        "options",
                                        formData.options,
                                      );
                                    }}
                                    onBlur={(value: any) => {
                                      formData.options[index].price.value =
                                        parseFloat(option.price.value);
                                      handleInputChange(
                                        "options",
                                        formData.options,
                                      );
                                    }}
                                    helpText={
                                      option.price.type == "base"
                                        ? "Additional cost when selected by customer (e.g. $10.00)."
                                        : "Multiply the final price of the sign when selected (e.g. 2 x 100)."
                                    }
                                    autoComplete="on"
                                  />
                                </Grid.Cell>
                              )}
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

      <Divider borderWidth="100" />
      <SpacingBackground backgroundColor="#F9F9F9">
        <Box paddingInline="300" paddingBlock="300">
          <InlineStack align="end" gap="600">
            <BackBtn isLoading={isLoading} title="Back" />
            <BiSaveBtn isLoading={isSubmitting} title="Save" />
          </InlineStack>
        </Box>
      </SpacingBackground>
    </Form>
  );
}

function IncludedOptionInput({
  additonalOption,
  isSubmitting,
  isLoading,
}: {
  additonalOption: any;
  isSubmitting: boolean;
  isLoading: boolean;
}) {
  const [formData, setFormData] = useState<any>(
    additonalOption || {
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
    submit({ option: JSON.stringify(formData) }, { method: "POST" });
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
            msg: "Your entries contain errors. Kindly rectify them",
            status: "error",
          }}
        />
      )}
      <SpacingBackground backgroundColor="#F8F9FB">
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
      <Divider borderWidth="100" />
      <SpacingBackground backgroundColor="#F8F9FB">
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
      <Divider borderWidth="100" />
      <SpacingBackground backgroundColor="#F8F9FB">
        <Box paddingInline="600" paddingBlock="600">
          <Grid gap={{ lg: "15px" }}>
            <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
              <Text as="h3" variant="bodyMd" fontWeight="semibold">
                {" "}
                4- Pricing (optional)
              </Text>
            </Grid.Cell>
            <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
              <InlineStack gap="300" blockAlign="center">
                <InlineStack gap="100" blockAlign="center">
                  <Text as="span" fontWeight="semibold" variant="bodySm">
                    None
                  </Text>
                  <ReactSwitchCustom
                    checked={formData.price.type == "none"}
                    setChecked={(value: boolean) =>
                      value &&
                      handleInputChange("price", {
                        ...formData.price,
                        type: "none",
                      })
                    }
                  />
                </InlineStack>
                <InlineStack gap="100" blockAlign="center">
                  <Text as="span" fontWeight="semibold" variant="bodySm">
                    Base Price
                  </Text>
                  <ReactSwitchCustom
                    checked={formData.price.type == "base"}
                    setChecked={(value: boolean) =>
                      value &&
                      handleInputChange("price", {
                        ...formData.price,
                        type: "base",
                      })
                    }
                  />
                </InlineStack>
                <InlineStack gap="100" blockAlign="center">
                  <Text as="span" fontWeight="semibold" variant="bodySm">
                    Price Multiplier
                  </Text>
                  <ReactSwitchCustom
                    checked={formData.price.type == "multiplier"}
                    setChecked={(value: boolean) =>
                      value &&
                      handleInputChange("price", {
                        ...formData.price,
                        type: "multiplier",
                      })
                    }
                  />
                </InlineStack>
              </InlineStack>
            </Grid.Cell>
            {formData.price.type != "none" && (
              <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
                <TextField
                  label="Price value"
                  type="number"
                  labelHidden
                  value={`${formData.price.value}`}
                  onChange={(value) =>
                    handleInputChange("price", {
                      ...formData.price,
                      value: value,
                    })
                  }
                  onBlur={(value) =>
                    handleInputChange("price", {
                      ...formData.price,
                      value: parseFloat(formData.price.value),
                    })
                  }
                  helpText={
                    formData.price.type == "base"
                      ? "Additional cost when selected by customer (e.g. $10.00)."
                      : "Multiply the final price of the sign when selected (e.g. 2 x 100)."
                  }
                  autoComplete="on"
                />
              </Grid.Cell>
            )}
          </Grid>
        </Box>
      </SpacingBackground>
      <Divider borderWidth="100" />
      <SpacingBackground backgroundColor="#F9F9F9">
        <Box paddingInline="300" paddingBlock="300">
          <InlineStack align="end" gap="600">
            <BackBtn isLoading={isLoading} title="Back" />
            <BiSaveBtn isLoading={isSubmitting} title="Save" />
          </InlineStack>
        </Box>
      </SpacingBackground>
    </Form>
  );
}
