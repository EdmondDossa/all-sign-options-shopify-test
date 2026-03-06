import {
  Box,
  Grid,
  InlineStack,
  Select,
  Text,
  TextField,
} from "@shopify/polaris";
import { useEffect, useState } from "react";
import {
  Form,
  useActionData,
  useLoaderData,
  useNavigation,
  useOutletContext,
  useSubmit,
} from "@remix-run/react";
import { BoxBackground, SpacingBackground } from "~/components/layouts";
import {
  settingAction,
  settingLoader,
} from "~/custom-action-loader/config-action-loader";
import { ActionFunctionArgs, json, LoaderFunctionArgs } from "@remix-run/node";
import useHandleFlashMessage from "~/hooks/useHandleFlashMessage";
import { z } from "zod";
import { getError } from "~/utils/error-getting";
import { BiSaveBtn, ToggleButton } from "~/components/buttons";
import { authenticate } from "~/shopify.server";
import ConfigSettingsService from "~/models/ConfigSetttings.service";
import { jFlashMessage } from "~/utils/message-flash";
import { Controller, useForm } from "react-hook-form";

const settingParams: [string, string] = ["generals", "output"];
const formSchema = z.object({
  showNavigatorMenu: z.string(),
  showNavigationMenuFirst: z.string(),
  outputSelectionOptionsDisplay: z.string(),
});

export const loader = async (agrs: LoaderFunctionArgs) => {
  return await settingLoader(agrs, settingParams);
};

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const { session, admin } = await authenticate.admin(request);

  const formData = await request.formData();
  const configId = params.configId;
  const method = request.method;

  switch (method) {
    case "POST": {
      const output: any = formData.get("output");
      if (output) {
        await ConfigSettingsService.updateSettingsSection(
          parseInt(`${configId}`),
          session.id,
          "generals",
          "output",
          JSON.parse(output),
        );
        return json({
          ...jFlashMessage("Output setting updated successfully"),
        });
      }
    }
    default:
      break;
  }

  return null;
};

interface OutputOptionsProps {
  fileFormat: string;
  manufacturerEmail: {
    sendDesignByEmail: boolean;
    receiverEmail: string[];
    subject: string;
    emailTemplate: string;
  };
}

export default function ConfigSettingsGeneral() {
  const submit = useSubmit();
  const { shop, currencySymbol, configuration } = useOutletContext<any>();
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isValid },
    watch,
    setValue,
    getValues,
    trigger,
  } = useForm<OutputOptionsProps>({
    defaultValues: {
      fileFormat: "svg",
      manufacturerEmail: {
        sendDesignByEmail: true,
        receiverEmail: [],
        subject: "New order for Manufacturer",
        emailTemplate: "",
      },
    },
    mode: "onChange",
  });
  useHandleFlashMessage();
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  let isSubmitting = navigation.state == "submitting";

  const onInternalSubmit = (data: OutputOptionsProps) => {
    try {
      console.log("data", data);
      submit({ output: JSON.stringify(data) }, { method: "POST" });
    } catch (e) {
      console.error("Error submitting form:", e);
    }
  };

  useEffect(() => {
    if (configuration?.data?.settings?.generals?.output) {
      const outputOptions = configuration.data.settings.generals.output;
      const template =
        configuration.productType == "neon"
          ? '{{#product}}\n<p><br>\n<b>Text:</b> {{ncpc_text}}<br>\n<b>Alignment:</b> {{ncpc_text_align}}<br>\n<b>Font:</b> {{ncpc_font_family}}<br>\n<b>Size:</b> {{ncpc_size}}<br>\n<b>Colour:</b> {{ncpc_neon_color}}<br>\n<b>Backboard:</b> {{ncpc_backboard}}<br>\n<b>Backboard Colour:</b> {{ncpc_backboard_color}}<br>\n<b>Material:</b> {{ncpc_material}}<br>\n<b>Jacket:</b> {{ncpc_jacket}}<br>\n<b>Mounting:</b> {{ncpc_mounting}}<br>\n{{#additional_options}}<b>{{label}}:</b> {{value}}<br>{{/additional_options}}\n <img src="{{ncpc_preview_img}}"><br><br>\n{{#svgPreviewLink}}\n<b>SVG:</b> <a href="{{ncpc_svg_data}}" target="_blank">Link</a><br>\n{{/svgPreviewLink}}</p>\n{{/products}}<br><b>Name:</b> {{shipping_adddress.name}} <br>\n<b>Phone:</b> {{shipping_adddress.phone}} <br>\n<b>Address:</b> {{shipping_adddress.address1}} {{shipping_adddress.address2}} {{shipping_adddress.city}} {{shipping_adddress.country}} <br>\n<b>Shipping option:</b> {{shippingLine}} <br>\n<b>Email:</b> {{email}} <br>'
          : '{{#product}}\n<p><br>\n<b>Text:</b> {{ncpc_text}}<br>\n<b>Alignment:</b> {{ncpc_text_align}}<br>\n<b>Font:</b> {{ncpc_font_family}}<br>\n<b>Size:</b> {{ncpc_size}}<br>\n<b>Letter Type:</b> {{ncpc_letter_type}}<br>\n<b>Face Color:</b> {{ncpc_face}}<br>\n<br>\n<b>Trim Color:</b> {{ncpc_trim}}<br>\n<br>\n<b>Side Color:</b> {{ncpc_side}}<br>\n<br>\n<b>Back Lit Color:</b> {{ncpc_back_lit}}<br>\n<br>\n<b>Backboard:</b> {{ncpc_backboard}}<br>\n<b>Backboard Colour:</b> {{ncpc_backboard_color}}<br>\n<b>Material:</b> {{ncpc_material}}<br>\n<b>Jacket:</b> {{ncpc_jacket}}<br>\n<b>Mounting:</b> {{ncpc_mounting}}<br>\n{{#additional_options}}<b>{{label}}:</b> {{value}}<br>\n{{/additional_options}} <img src="{{ncpc_preview_img}}"><br>\n<br>\n{{#svgPreviewLink}}<b>SVG:</b> <a href="{{ncpc_svg_data}}" target="_blank">Link</a><br>\n{{/svgPreviewLink}}</p>{{/products}}<br>\n<b>Name:</b> {{shipping_adddress.name}} <br>\n<b>Phone:</b> {{shipping_adddress.phone}} <br>\n<b>Address:</b> {{shipping_adddress.address1}} {{shipping_adddress.address2}} {{shipping_adddress.city}} {{shipping_adddress.country}} <br>\n<b>Shipping option:</b> {{shippingLine}} <br>\n<b>Email:</b> {{email}} <br>\n{{/product}}';
      const formValues = {
        fileFormat: outputOptions.fileFormat || "svg",
        manufacturerEmail: {
          sendDesignByEmail:
            outputOptions.manufacturerEmail.sendDesignByEmail || true,
          receiverEmail: outputOptions.manufacturerEmail.receiverEmail || [],
          subject:
            outputOptions.manufacturerEmail.subject ||
            "New order for Manufacturer",
          emailTemplate:
            outputOptions.manufacturerEmail.emailTemplate || template,
        },
      };
      reset(formValues);
    }
  }, [configuration, reset]);

  return (
    <>
      <Form onSubmit={handleSubmit(onInternalSubmit)} method="POST">
        <SpacingBackground border="1px solid #DDDDDD">
          <BoxBackground>
            <Box paddingInline="300" paddingBlock="1000">
              <Grid gap={{ lg: "30px" }}>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
                  <Controller
                    name={"fileFormat"}
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <>
                        <Text as="h6" variant="headingMd">
                          Output files format
                        </Text>
                        <Select
                          label={"What is your desired output files format ?"}
                          options={[{ label: "SVG", value: "svg" }]}
                          onChange={onChange}
                          value={value}
                        />
                      </>
                    )}
                  />
                  <Box paddingBlock="100" />
                  <Box paddingBlock="150">
                    <Controller
                      name={"manufacturerEmail.sendDesignByEmail"}
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { onChange, value } }) => (
                        <InlineStack>
                          <Text as="h6" variant="headingMd">
                            Send Design By Email
                          </Text>
                          <ToggleButton
                            id="sendDesignByEmail"
                            checked={value}
                            onChange={onChange}
                          />
                        </InlineStack>
                      )}
                    />
                  </Box>
                </Grid.Cell>
                {watch("manufacturerEmail.sendDesignByEmail") && (
                  <Grid.Cell
                    columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}
                  >
                    <Controller
                      name={"manufacturerEmail.receiverEmail"}
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <>
                          <Text as="h6" variant="headingMd">
                            Manufacturer Email
                          </Text>
                          <Text as="p">
                            An email is sent every time a custom sign is marked
                            as PAID on the shopify order.
                          </Text>
                          <Box padding="150" />
                          <TextField
                            type="text"
                            label={
                              "Receiver email (if you have more than one, please separate them with '|' )"
                            }
                            autoComplete="off"
                            onChange={(val) => {
                              onChange(val.split("|"));
                            }}
                            helpText="The store’s default email will be used if kept blank"
                            value={value.join("|")}
                          />
                        </>
                      )}
                    />
                    <Box padding="100" />
                    <Controller
                      name={"manufacturerEmail.subject"}
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <>
                          <Box padding="150" />
                          <TextField
                            type="text"
                            label={"Mail Subject"}
                            autoComplete="off"
                            onChange={onChange}
                            value={value}
                          />
                        </>
                      )}
                    />
                    <Box padding="100" />
                    <Controller
                      name={"manufacturerEmail.emailTemplate"}
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <>
                          <Box padding="150" />
                          <TextField
                            type="text"
                            label={"Manufacturer email template"}
                            autoComplete="off"
                            onChange={onChange}
                            multiline={true}
                            value={value}
                          />
                        </>
                      )}
                    />
                  </Grid.Cell>
                )}
              </Grid>
            </Box>
          </BoxBackground>
        </SpacingBackground>

        <SpacingBackground width="100%" height="auto" margin="3px 0 0 0">
          <BoxBackground>
            <Box paddingInline="300" paddingBlock="300">
              <InlineStack align="end" gap="600">
                <BiSaveBtn isLoading={isSubmitting} title="Save" />
              </InlineStack>
            </Box>
          </BoxBackground>
        </SpacingBackground>
      </Form>
    </>
  );
}
