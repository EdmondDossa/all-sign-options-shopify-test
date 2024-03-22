import {
  AutoSelection,
  BlockStack,
  Box,
  Card,
  Checkbox,
  Combobox,
  Divider,
  Grid,
  InlineGrid,
  InlineStack,
  LegacyStack,
  Listbox,
  Select,
  Tag,
  Text,
  TextField,
} from "@shopify/polaris";
import { useCallback, useState, useMemo } from "react";
import { Form, redirect, useActionData, useNavigate, useNavigation, useOutletContext, useSearchParams, useSubmit } from "@remix-run/react";
import { BoxBackground } from "~/components/layouts/BoxBackground";
import { SpacingBackground } from "~/components/layouts/SpacingBackground";
import RayStartArrowIcon from "~/components/icons/RayStartArrowIcon";
import RayEndArrowIcon from "~/components/icons/RayEndArrowIcon";
import CircleCheckIcon from "~/components/icons/CircleCheckIcon";
import CircleNotCheckIcon from "~/components/icons/CircleNotCheckIcon";
import { FixingMethodType } from "~/types/SettingsType";
import { ConfigFixingMethod } from "~/types/ConfigDataType";
import { getError } from "~/utils/error-getting";
import { BiSaveBtn } from "~/components/buttons/BiSaveBtn";
import { z } from "zod";
import { ActionFunctionArgs, json } from "@remix-run/node";
import { authenticate } from "~/shopify.server";
import { parseWithZod } from "@conform-to/zod";
import MaterialFixingMethodService from "~/models/MaterialFixingMethod.service";
import { flashMessage } from "~/utils/message-flash";

export default function MaterialFixingMethod() {
  const submit = useSubmit();
  const navigation = useNavigation();
  const actionData = useActionData<typeof action>();
  let { manageFixingMethods, fixingMethods } = useOutletContext<{
    manageFixingMethods: FixingMethodType[];
    fixingMethods: ConfigFixingMethod[];
  }>();
  const [searchParams] = useSearchParams();
  const id = parseInt(searchParams.get("id") || "");
  let configFixingMethod = fixingMethods?.find((curr, index) => index === id);
  const [formData, setFormData] = useState<ConfigFixingMethod>(
    configFixingMethod
      ? (configFixingMethod as ConfigFixingMethod)
      : {
         fixingMethodId: manageFixingMethods[0]?.type || '',
          additionalPrice: 0
        },
  );

  const options = manageFixingMethods
    ? manageFixingMethods.map((manageFixingMethod) => ({
        label: manageFixingMethod.name || "",
        value: `${manageFixingMethod.type}`,
      }))
    : [];

  let isLoading = navigation.state == "loading";
  let isSubmitting = navigation.state == "submitting";

  const HandleFixingMethodId = (value: string) =>
    setFormData({ ...formData, fixingMethodId: value });
  const handleAdditionalPrice = (value: string) =>
    setFormData({ ...formData, additionalPrice: parseFloat(value) });
  

 

  const handleSubmit = (e: any) => {
    e.preventDefault();
    submit({...formData},{ method: "POST" });
  };



  // const [selectedFixingMethods, setSelectedFixingMethods] = useState<string[]>(
  //   [],
  // );

  // const fixingMethods = [
  //   {
  //     value: "1",
  //     label: "None",
  //     image: "/fixing-method/none.png",
  //     description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt port sit amet, consec"
  //   }, 
  // ];

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
                  {/* <MultiCombobox
                    label="Select fixing method"
                    placeholder="seach fixing method"
                    selectedOptions={selectedFixingMethods}
                    data={fixingMethods}
                    setSelectedOptions={setSelectedFixingMethods}
                  ></MultiCombobox> */}
                  <Select
                    label="Select color"
                    options={options}
                    value={`${formData.fixingMethodId}`}
                    onChange={HandleFixingMethodId}
                    error={getError(actionData, "fixingMethodId")}
                  />
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
                <TextField
                    label="Additional price"
                    type="number"
                    value={`${formData.additionalPrice}`}
                    onChange={handleAdditionalPrice}
                    autoComplete="off"
                    error={getError(actionData, "additionalPrice")}
                  />
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
    </div>
  );
}

const formSchema = z.object({
  fixingMethodId: z.string({ required_error: "Material fixing method is required" }),
  additionalPrice: z.number({ required_error: "Material fixing method  price is required" }),
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

  let configFixingMethod: ConfigFixingMethod = submission.value as ConfigFixingMethod;

  if (id && !Number.isNaN(configId)  && !Number.isNaN(mId) && !Number.isNaN(id)) {
    let res = await MaterialFixingMethodService.update(
      configId,
      session.id,
      mId,
      configFixingMethod,
      parseInt(id),
    );
    return res
      ? redirect(
          `..${flashMessage("Material fixing method  updated is completed successfully")}`,
        )
      : redirect(
          `..${flashMessage("Material fixing method  updated is  fail", "error")}`,
        );
  } else {
    let res = await MaterialFixingMethodService.add(
      configId,
      session.id,
      mId,
      configFixingMethod
    );
    return res
      ? redirect(
          `..${flashMessage("Material fixing method  added is completed successfully")}`,
        )
      : redirect(`..${flashMessage("Material fixing method  added is  fail", "error")}`);
  }
};


