import {
  BlockStack,
  Box,
  Button,
  Collapsible,
  Grid,
  InlineStack,
  Text,
} from "@shopify/polaris";
import { useId, useState } from "react";
import {
  Form,
  useActionData,
  useLoaderData,
  useNavigation,
  useSubmit,
} from "@remix-run/react";
import { BoxBackground, SpacingBackground } from "~/components/layouts";
import {
  settingAction,
  settingLoader,
} from "~/custom-action-loader/config-action-loader";
import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { z } from "zod";
import useHandleFlashMessage from "~/hooks/useHandleFlashMessage";
import { BiSaveBtn } from "~/components/buttons";
import { TextColorField, CheckSpan } from "~/components/inputs";
import { jsonTransform, stringTransform } from "~/utils/transfomerZod";

const settingParams: [string, string] = ["themes", ""];

const formSchema = z.object({
  skin: z.string(),
  colors: z.any().transform(jsonTransform),
});

export const loader = async (agrs: LoaderFunctionArgs) => {
  return await settingLoader(agrs, settingParams);
};

export const action = async (args: ActionFunctionArgs) => {
  return await settingAction(args, settingParams, formSchema);
};

export default function ConfigSettingsThemeColor() {
  const submit = useSubmit();
  let { settingData } = useLoaderData<typeof loader>();
  useHandleFlashMessage();
  const [expanded, setExpanded] = useState({
    canvas: true,
    price: false,
    reset: false,
    undoRedo: false,
    preview: false,
    help: false,
    optionsSideBar: false,
    optionsModal: false,
    optionsInModal: false,
    objectsOptions: false,
    recaps: false,
  });
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  let isSubmitting = navigation.state == "submitting";
  const [formData, setFormData] = useState<any>({
    skin: settingData?.skin || "default",
    colors: {
      backgroundColor:"#FFFFFF",
      titleColor:"#000000",
      descriptionColor:"#000000",
      buttonColor:"#FFFFFF",
      buttonHoverColor:"#f8fafc",
      buttonTextColor:"#000000",
      activeButtonColor:"#0e7490",
      activeButtonHoverColor:"#0891b2",
      activeButtonTextColor:"#FFFFFF",
      beforePriceColor:"#000000",
      priceBackgroundColor:"#FFFFFF",
      priceColor:"#000000",
      delPriceColor:"#878787",
      afterPriceColor:"#000000",
      optionsSectionBackgroundColor:"#fafafa",
      optionBorderColor:"#4b5563",
      activeOptionBackgroundColor:"#ffffff",
      optionTextColor:"#4b5563",
      colorOfMeasuringBarText: "#FFFFFF",
      colorMeasuringBar: "#FFFFFF",
      activeOptionBorderColor:"#0891b2",
      activeOptionTextColor:"#0891b2",
      formErrorBg:"#ff0000",
      formErrorText:"#000000",
      finishModalColor:"#000000",
      finishModalLoaderColor:"#ece8e8",
      finishButtonContainerColor:"#000000",
      finishButtonContainerPriceColor:"#FFFFFF",
      finishButtonContainerDiscountPriceColor:"#000000",
      selectedTextBorderColor:"#000000",
      selectedTextBorderCornerColor:"#000000",
      darkBackgroundColor:"#1c1c1c",
      darkTitleColor:"#FFFFFF",
      darkDescriptionColor:"#FFFFFF",
      darkButtonColor:"#1c1c1c",
      darkButtonHoverColor:"#292929",
      darkButtonTextColor:"#FFFFFF",
      darkActiveButtonColor:"#292929",
      darkActiveButtonHoverColor:"#292929",
      darkActiveButtonTextColor:"#0e7490",
      darkBeforePriceColor:"#FFFFFF",
      darkPriceBackgroundColor:"#FFFFFF",
      darkPriceColor:"#1c1c1c",
      darkAfterPriceColor:"#FFFFFF",
      darkOptionsSectionBackgroundColor:"#292929",
      darkOptionBorderColor:"#6b7280",
      darkOptionTextColor:"#6b7280",
      darkActiveOptionBackgroundColor:"#000000",
      darkActiveOptionBorderColor:"#0891b2",
      darkActiveOptionTextColor:"#0891b2",
      darkFinishModalColor:"#ffffff",
      darkFinishModalLoaderColor:"#cccbc8",
    },
  });

  const colorFields: any = {
    backgroundColor: "Background Color",
    titleColor: "Title Color",
    descriptionColor: "Description Color",
    buttonHoverColor: "Button Hover Color",
    buttonTextColor: "Button Text Color",
    activeButtonColor: "Active Button Color",
    activeButtonHoverColor: "Active Button Hover Color",
    activeButtonTextColor: "Active Button Text Color",
    beforePriceColor: "Before Price Color",
    priceBackgroundColor: "Price Background Color",
    discountPriceColor: "Discount Price Color",
    priceColor: "Price Color",
    afterPriceColor: "After Price Color",
    optionsSectionBackgroundColor: "Options Section Background Color",
    optionBorderColor: "Option Border Color",
    optionTextColor: "Option Text Color",
    activeOptionBorderColor: "Active Option Border Color",
    activeOptionTextColor: "Active Option Text Color",
    activeOptionBackgroundColor: "Active Option Background Color",
    colorOfMeasuringBarText: "Color of measuring bar Text",
    colorMeasuringBar: "Color measuring bar",
    finishModalColor: "Finish Modal Color",
    finishModalLoaderColor: "Finish Modal Loader Color",
    selectedTextBorderColor: "Selected Text Border Color",
    selectedTextBorderCornerColor: "Selected Text Border Corner Color",
    finishButtonContainerColor: "Finish Button Container Color",
    finishButtonContainerPriceColor: "Finish Button Container Price Color",
    finishButtonContainerDiscountPriceColor:
      "Finish Button Container Discount Price Color",
    formErrorBg: "Error background Color",
    formErrorText: "Error text Color",
    darkBackgroundColor: "Dark Background Color",
    darkTitleColor: "Title Color",
    darkDescriptionColor: "Description Color",
    darkButtonHoverColor: "Dark Button Hover Color",
    darkButtonTextColor: "Dark Button Text Color",
    darkActiveButtonColor: "Dark Active Button Color",
    darkActiveButtonHoverColor: "Dark Active Button Hover Color",
    darkActiveButtonTextColor: "Dark Active Button Text Color",
    darkBeforePriceColor: "Dark Before Price Color",
    darkPriceBackgroundColor: "Dark Price Background Color",
    darkPriceColor: "Dark Price Color",
    darkDiscountPriceColor: "Dark Discount Price Color",
    darkAfterPriceColor: "Dark After Price Color",
    darkOptionsSectionBackgroundColor: "Dark Options Section Background Color",
    darkOptionBorderColor: "Dark Option Border Color",
    darkOptionTextColor: "Dark Option Text Color",
    darkActiveOptionBackgroundColor: "Dark Active Option Background Color",
    darkActiveOptionBorderColor: "Dark Active Option Border Color",
    darkActiveOptionTextColor: "Dark Active Option Text Color",
    darkFinishModalColor: "Finish Modal Color",
    darkFinishModalLoaderColor: "Finish Modal Loader Color",
  };

  const handleInputChange = (inputName: string, value: any) => {
    setFormData((prevData: any) => ({
      ...prevData,
      [inputName]: value,
    }));
  };

  let skins = [
    {
      title: "Default Skin",
      value: "default",
      img: "/images/settings/im_defaultSkin.png",
    },
    {
      title: "Mono Skin",
      value: "mono",
      img: "/images/settings/im_skinMono.png",
    },
    {
      title: "Zou Skin",
      value: "zou",
      img: "/images/settings/im_skinZou.png",
    },
  ];

  const handleColorChange = (value: any, key: string) => {
    let updateFormColors = { ...formData.colors };
    updateFormColors[key] = value;
    // Update the formData with the new color value
    setFormData((prevData: any) => {
      return { ...prevData, colors: updateFormColors };
    });
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const data = { ...formData, colors: JSON.stringify(formData.colors) };

    submit(data, { method: "POST" });
  };

  return (
    <>
      <Form onSubmit={handleFormSubmit} method="POST">
        <SpacingBackground border="1px solid #DDDDDD" margin="3px 0 0 0">
          <BoxBackground>
            <Box paddingInline="300" paddingBlock="1000">
              <Grid gap={{ lg: "20px" }}>
                {skins.map((skin) => {
                  return (
                    <Grid.Cell
                      columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}
                    >
                      <AppearanceItem
                        title={skin.title}
                        imgSrc={skin.img}
                        active={formData.skin == skin.value}
                        onChange={() => {
                          handleInputChange("skin", skin.value);
                        }}
                      />
                    </Grid.Cell>
                  );
                })}
              </Grid>
            </Box>
          </BoxBackground>
        </SpacingBackground>
        <BlockStack gap="300">
          <Grid columns={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
            {Object.keys(colorFields).map((key) => (
              <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 4, xl: 4 }}>
                <TextColorField
                  key={key}
                  label={colorFields[key]}
                  color={formData.colors[key]}
                  setColor={(value: any) => {
                    handleColorChange(value, key);
                  }}
                />
              </Grid.Cell>
            ))}
          </Grid>
        </BlockStack>

        <SpacingBackground width="100%" height="auto" margin="3px 0 0 0">
          <BoxBackground>
            <Box paddingInline="300" paddingBlock="300">
              <InlineStack align="end" gap="600">
                <BiSaveBtn title="Save" />
              </InlineStack>
            </Box>
          </BoxBackground>
        </SpacingBackground>
      </Form>
    </>
  );
}

export const AppearanceItem = ({
  imgSrc,
  title,
  active,
  onChange,
}: {
  imgSrc: string;
  title?: string;
  active: boolean;
  onChange: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <SpacingBackground border="1px  solid #E8E8E8" borderRadius="5px">
      <div
        onClick={() => {
          onChange(!active);
        }}
        style={{ position: "relative" }}
      >
        <img
          src={imgSrc}
          alt={title}
          style={{ width: "100%", height: "auto" }}
        />
        <div style={{ position: "absolute", bottom: "0", width: "100%" }}>
          <SpacingBackground
            backgroundColor="transparent !important"
            margin="0 0 0 0"
            borderRadius="0 0 10px 10px"
          >
            <Box background="bg-surface" paddingInline="300" paddingBlock="200">
              <InlineStack align="space-between">
                <Text as="span" variant="bodyMd" fontWeight="bold">
                  {title || "Default skyn"}
                </Text>
                <InlineStack gap="200">
                  <Text as="span" tone="success">
                    Select
                  </Text>
                  <CheckSpan checked={active} />
                </InlineStack>
              </InlineStack>
            </Box>
          </SpacingBackground>
        </div>
      </div>
    </SpacingBackground>
  );
};

const ColorItem = ({
  title,
  onToggle,
  open,
  children,
}: {
  title: string;
  onToggle: Function;
  open: boolean;
  children?: React.ReactNode;
}) => {
  const id = useId();

  return (
    <SpacingBackground border="1px solid #F8F9FB" margin="3px 0 0 0">
      <BoxBackground>
        <Box paddingInline="300" paddingBlock="300">
          <InlineStack align="space-between">
            <Text as="strong" fontWeight="bold" variant="bodyLg">
              {title}
            </Text>
            <Button
              textAlign="left"
              disclosure={open ? "up" : "down"}
              onClick={() => onToggle()}
              ariaExpanded={open}
              ariaControls={`${id}`}
            >
              {open ? "Show less" : "Show more"}
            </Button>
          </InlineStack>
          <Collapsible
            open={open}
            id={`${id}`}
            transition={{ duration: "500ms", timingFunction: "ease-in-out" }}
            expandOnPrint
          >
            {children}
          </Collapsible>
        </Box>
      </BoxBackground>
    </SpacingBackground>
  );
};
