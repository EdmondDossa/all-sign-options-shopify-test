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
import { getError } from "~/utils/error-getting";
import { BiSaveBtn } from "~/components/buttons/BiSaveBtn";
import { z } from "zod";
import { ActionFunctionArgs, json, LoaderFunctionArgs } from "@remix-run/node";
import { authenticate } from "~/shopify.server";
import { parseWithZod } from "@conform-to/zod";
import { flashMessage } from "~/utils/message-flash";
import { RemoveNowIconBtn } from "~/components/buttons/RemoveNowIconBtn";
import { BiAddBtn } from "~/components/buttons/BiAddBtn";
import MaterialDiscountService from "../models/MaterialDiscount.service";
import { ConfigDiscount } from "~/types/ConfigDataType";
import { jsonTransform, stringTransform } from "~/utils/transfomerZod";
import useHandleFlashMessage from "~/hooks/useHandleFlashMessage";

const formSchema = z.object({
  lots: z.any().transform(jsonTransform).pipe(z.array(z.object({
    quantity: z.number().min(0),
    discountPercentage: z.number().min(0).max(100)
  })))
});

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const { session } = await authenticate.admin(request);
  const configId = parseInt(params.configId ?? "");
  const mId = parseInt(params.mId ?? "");
  const discounts = await MaterialDiscountService.getAll(
    configId,
    session.id,
    mId
  );
  return json({ discounts });
};

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const { session } = await authenticate.admin(request);
  const configId = parseInt(params.configId ?? "");
  const mId = parseInt(params.mId ?? "");
  const formData = await request.formData();
  const submission = parseWithZod(formData, { schema: formSchema });

  if (submission.status !== "success") {
    return json({ status: false, message: null, errors: submission.error });
  }

  const lots = submission.value.lots;
  const res = await MaterialDiscountService.update(
    configId,
    session.id,
    mId,
    { lots }
  );

  return res
    ? redirect(
        `..${flashMessage("Material discount settings updated successfully")}`
      )
    : redirect(
        `..${flashMessage("Failed to update material discount settings", "error")}`
      );
};

export default function MaterialDiscount() {
  const submit = useSubmit();
  const { discounts } = useOutletContext<{
    discounts: ConfigDiscount[];
  }>();
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  let isSubmitting = navigation.state == "submitting";
  const [formData, setFormData] = useState<{ lots: Array<{ quantity: string; discountPercentage: string }> }>(
    discounts?.[0]?.lots 
      ? { lots: discounts[0].lots }
      : { lots: [{ quantity: "", discountPercentage: "" }] }
  );

  const handleAddItem = () => {
    if (!formData.lots) {
      formData.lots = [];
    }
    formData.lots.push({ quantity: "", discountPercentage: "" });
    setFormData({ ...formData });
  };

  const handleDeleteItem = (index: number) => {
    if (formData.lots.length > 1) {
      formData.lots.splice(index, 1);
      setFormData({ ...formData });
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    submit({ lots: JSON.stringify(formData.lots) }, { method: "POST" });
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
                {formData.lots.map((lot, index) => (
                  <Grid.Cell key={index} columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
                    <InlineStack wrap={false} as="div" gap="400" blockAlign="center">
                      <Box width="45%">
                        <TextField
                          label="Quantity"
                          value={lot.quantity}
                          onChange={(value) => {
                            lot.quantity = value;
                            formData.lots[index] = lot;
                            setFormData({ ...formData });
                          }}
                          autoComplete="off"
                          error={getError(actionData, `lots.${index}.quantity`)}
                        />
                      </Box>
                      <Box width="45%">
                        <TextField
                          label="Discount Percentage"
                          value={lot.discountPercentage}
                          onChange={(value) => {
                            lot.discountPercentage = value;
                            formData.lots[index] = lot;
                            setFormData({ ...formData });
                          }}
                          autoComplete="off"
                          error={getError(actionData, `lots.${index}.discountPercentage`)}
                          suffix="%"
                        />
                      </Box>
                      <Box width="5%">
                        <RemoveNowIconBtn onClick={() => handleDeleteItem(index)} />
                      </Box>
                    </InlineStack>
                  </Grid.Cell>
                ))}
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
                  <Box width="150px">
                    <BiAddBtn title="Add lot" handleClick={handleAddItem} />
                  </Box>
                </Grid.Cell>
              </Grid>
            </Box>
            <Divider borderWidth="050" />
            <Box paddingInline="300" paddingBlock="300">
              <InlineStack align="end" gap="300">
                <BiSaveBtn isLoading={isSubmitting} />
              </InlineStack>
            </Box>
          </Form>
        </BoxBackground>
      </SpacingBackground>
    </div>
  );
} 