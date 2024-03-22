import {
  AutoSelection,
  BlockStack,
  Box,
  Checkbox,
  Combobox,
  Divider,
  EmptySearchResult,
  Grid,
  Icon,
  InlineStack,
  LegacyStack,
  Listbox,
  Select,
  Tag,
  Text,
  TextContainer,
  TextField,
} from "@shopify/polaris";
import { useCallback, useState, useMemo } from "react";
import {
  Form,
  redirect,
  useActionData,
  useNavigate,
  useNavigation,
  useOutletContext,
  useSearchParams,
  useSubmit,
} from "@remix-run/react";
import { BoxBackground } from "~/components/layouts/BoxBackground";
import { SpacingBackground } from "~/components/layouts/SpacingBackground";
import RayStartArrowIcon from "~/components/icons/RayStartArrowIcon";
import RayEndArrowIcon from "~/components/icons/RayEndArrowIcon";
import { MultiCombobox } from "~/components/inputs/MultiCombobox";
import { BorderType } from "~/types/SettingsType";
import { ConfigBorder } from "~/types/ConfigDataType";
import { SizeType } from "~/types/ManagePropertyType";
import { ReactSwitchCustom } from "~/components/inputs/ReactSwitchCustom";
import { getError } from "~/utils/error-getting";
import { TextColorField } from "~/components/inputs/TextColorField";
import { BiSaveBtn } from "~/components/buttons/BiSaveBtn";
import { z } from "zod";
import { ActionFunctionArgs, json } from "@remix-run/node";
import { authenticate } from "~/shopify.server";
import { parseWithZod } from "@conform-to/zod";
import MaterialBorderService from "~/models/MaterialBorderService.service";
import { flashMessage } from "~/utils/message-flash";

export default function MaterialBorderCreate() {
  const [selected, setSelected] = useState("1");
  const submit = useSubmit();
  const navigation = useNavigation();
  const actionData = useActionData<typeof action>();
  let { manageSizes, manageBorders, borders } = useOutletContext<{
    manageBorders: BorderType[];
    manageSizes: SizeType[];
    borders: ConfigBorder[];
  }>();
  const [searchParams] = useSearchParams();
  const id = parseInt(searchParams.get("id") || "");
  let configBorder = borders?.find((curr, index) => index === id);
  const [formData, setFormData] = useState<ConfigBorder>(
    configBorder
      ? (configBorder as ConfigBorder)
      : {
          manageBorderId: manageBorders[0]?.value || "",
          additionalPrice: 0,
          excludeSizes: [],
          settings: {
            codeHex: "",
            enableBorderWidth: false,
            enableBorderColor: false,
          },
        },
  );

  const options = manageBorders
    ? manageBorders.map((manageBorder) => ({
        label: manageBorder.name || "",
        value: `${manageBorder.value}`,
      }))
    : [];
  const sizes = manageSizes ? manageSizes.map((manageSize) => ({ label: manageSize.label||'', value: `${manageSize.id}` })) : [];

  let isLoading = navigation.state == "loading";
  let isSubmitting = navigation.state == "submitting";

  const HandleManageBorderId = (value: string) =>
    setFormData({ ...formData, manageBorderId: value });
  const handleAdditionalPrice = (value: string) =>
    setFormData({ ...formData, additionalPrice: parseFloat(value) });
  const handleExcludeSizes = (value: any[]) =>
    setFormData({ ...formData, excludeSizes: value.map(currValue=> parseInt(currValue)) });

  const handleCodeHex = (value: string) => {
    formData.settings.codeHex = value;
    setFormData({ ...formData });
  };

  const handleEnableBorderWidth = (value: boolean) => {
    formData.settings.enableBorderWidth = value;
    setFormData({ ...formData });
  };

  const handleEnableBorderColor = (value: boolean) => {
    formData.settings.enableBorderColor = value;
    setFormData({ ...formData });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    submit(
      {
        ...formData,
        settings: JSON.stringify(formData.settings),
        excludeSizes: JSON.stringify(formData.excludeSizes),
      },
      { method: "POST" },
    );
  };
  const navigate = useNavigate();
  const onBack = () => {
    navigate("..");
  };

  return (
    <div>
      <SpacingBackground width="100%" height="auto" margin="16px 0px ">
        <BoxBackground>
          <Form onSubmit={handleSubmit} method="POST">
            <Box paddingInline="300" paddingBlock="1000">
              <Grid gap={{ lg: "30px" }}>
                <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
                  <Select
                    label="Select border"
                    options={options}
                    value={`${formData.manageBorderId}`}
                    onChange={HandleManageBorderId}
                    error={getError(actionData, "manageBorderId")}
                  />
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
                  <TextField
                    label="Additional Price"
                    type="number"
                    value={`${formData.additionalPrice}`}
                    onChange={handleAdditionalPrice}
                    autoComplete="on"
                    error={getError(actionData, "additionalPrice")}
                  />
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
                  <BlockStack gap="300">
                    <Text as="strong" variant="headingMd">
                      Exclude size
                    </Text>
                    <MultiCombobox
                      labelHidden={true}
                      helpText="exclude the sizes of this border"
                      label="Exclude size"
                      placeholder="Select exclude size"
                      selectedOptions={formData.excludeSizes}
                      data={sizes}
                      setSelectedOptions={handleExcludeSizes}
                    ></MultiCombobox>
                  </BlockStack>
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
                  <BlockStack gap="300">
                    <Text as="strong" variant="headingMd">
                      Border settings
                    </Text>
                   
                  <TextColorField  error={getError(actionData,"settings.codeHex")} label="Border color" color={formData.settings.codeHex} setColor={handleCodeHex}/>

                    <InlineStack gap="600">
                      <InlineStack blockAlign="center" gap="200">
                        <Text as="strong" variant="headingMd">
                          Enable border width
                        </Text>
                        <ReactSwitchCustom
                          checked={formData.settings.enableBorderWidth}
                          setChecked={handleEnableBorderWidth}
                        />
                      </InlineStack>

                      <InlineStack blockAlign="center" gap="200">
                        <Text as="strong" variant="headingMd">
                          Enable border color
                        </Text>
                        <ReactSwitchCustom
                          checked={formData.settings.enableBorderColor}
                          setChecked={handleEnableBorderColor}
                        />
                      </InlineStack>
                    </InlineStack>
                  </BlockStack>
                </Grid.Cell>
              </Grid>
            </Box>
            <Divider borderWidth="050" />
            <Box paddingInline="300" paddingBlock="300">
              <InlineStack align="end" gap="600">
                <button
                  className="back-large-btn"
                  type="button"
                  onClick={onBack}
                >
                  <Box paddingInline="1000">
                    <InlineStack gap="300">
                      <RayStartArrowIcon />{" "}
                      <span style={{ color: "black", fontWeight: "bold" }}>
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
    </div>
  );
}


// manageBorderId: manageBorders[0]?.value || "",
// additionalPrice: 0,
// excludeSizes: [],
// settings: {
//   codeHex: "",
//   enableBorderWidth: false,
//   enableBorderColor: false,
// },

const formSchema = z.object({
  manageBorderId: z.string({ required_error: "Border is required" }),
  additionalPrice: z.number({ required_error: "price is required" }),
  excludeSizes:  z.any()
  .transform((value) => JSON.parse(value as string) || []).pipe(z.number().array()),
  settings: z
  .any()
  .transform((value) => JSON.parse(value as string) || {})
  .pipe(
    z.object({
      codeHex: z
        .string({ required_error: "Color  is required" })
        .min(3, "Color is too short")
        .max(7, "Color label is too long"),
        enableBorderWidth: z.boolean({
        required_error: "field  is required",
      }),
      enableBorderColor: z.boolean({
        required_error: "field is required",
      }),
    }),
  )
});

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const { session, admin } = await authenticate.admin(request);

  const formData = await request.formData();
  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  const configId = parseInt(params.configId ?? "");
  const mId = parseInt(params.mId ?? "");
  const submission = parseWithZod(formData, { schema: formSchema });

  if (submission.status !== "success") {
    return json({ status: false, message: null, errors: submission.error });
  }

  let configBorder: ConfigBorder = submission.value as ConfigBorder;

  if (id && configId && mId) {
    let res = await MaterialBorderService.update(
      configId,
      session.id,
      mId,
      configBorder,
      parseInt(id),
    );
    return res
      ? redirect(
          `..${flashMessage("Material Border  updated is completed successfully")}`,
        )
      : redirect(
          `..${flashMessage("Material Border updated is  fail", "error")}`,
        );
  } else {
    let res = await MaterialBorderService.add(
      configId,
      session.id,
      mId,
      configBorder
    );
    return res
      ? redirect(
          `..${flashMessage("Material  added is completed successfully")}`,
        )
      : redirect(`..${flashMessage("Material  added is  fail", "error")}`);
  }
};
