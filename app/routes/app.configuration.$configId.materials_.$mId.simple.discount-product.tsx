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
  useLoaderData,
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
import { useForm, useFieldArray, Controller } from "react-hook-form";
interface LotFormData {
  quantity: number;
  discountPercentage: number;
}

interface FormData {
  lots: LotFormData[];
}

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

  return { discounts };
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
    lots
  );

  return res
    ? redirect(
        `${flashMessage("Material discount settings updated successfully")}`
      )
    : redirect(
        `${flashMessage("Failed to update material discount settings", "error")}`
      );
};

export default function MaterialDiscount() {
  const submit = useSubmit();
  const { discounts } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const navigate = useNavigate();
  
  const isSubmitting = navigation.state === "submitting";

  // Initialisation de React Hook Form
  const { control, handleSubmit, getValues,formState: { errors } } = useForm<FormData>({
    defaultValues: {
      lots:discounts?.length? discounts :[{ quantity: 0, discountPercentage: 0 }]
    }
  });

  // Gestion du tableau dynamique avec useFieldArray
  const { fields, append, remove } = useFieldArray({
    control,
    name: "lots"
  });

  const handleAddItem = () => {
    // Récupérer les valeurs actuelles du formulaire
    const currentValues = getValues();
    
    // Prendre la dernière quantité et ajouter +1
    const lastQuantity = currentValues.lots.length > 0 
      ? currentValues.lots[currentValues.lots.length - 1].quantity || 0 
      : 0;
    
    append({ 
      quantity: (parseInt(lastQuantity+'') + 1) ,
      discountPercentage:0 
    });
  };



  const handleDeleteItem = (index: number) => {
    if (fields.length > 1) {
      remove(index);
    }
  };

  const onSubmit = (data: FormData) => {
    submit({ lots: JSON.stringify(data.lots) }, { method: "POST" });
  };

  const onBack = () => {
    navigate("..");
  };

  return (
    <div>
      <SpacingBackground width="100%" height="auto" margin="16px 0px">
        <BoxBackground>
          <Form onSubmit={handleSubmit(onSubmit)} method="POST">
            <Box paddingInline="300" paddingBlock="1000">
              <Grid gap={{ lg: "30px" }}>
                {fields.map((field, index) => (
                  <Grid.Cell key={field.id} columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
                    <InlineStack wrap={false} as="div" gap="400" >
                      <Box width="45%">
                        <Controller
                          name={`lots.${index}.quantity`}
                          control={control}
                          rules={{
                            required: "La quantité est requise",
                            pattern: {
                              value: /^\d+$/,
                              message: "La quantité doit être un nombre entier"
                            }
                          }}
                          render={({ field }) => (
                            <TextField
                              label="Quantity"
                              value={field.value +''}
                              onChange={field.onChange}
                              onBlur={field.onBlur}
                              type="number"
                              autoComplete="off"
                              error={
                                errors.lots?.[index]?.quantity?.message ||
                                getError(actionData, `lots.${index}.quantity`)
                              }
                            />
                          )}
                        />
                      </Box>
                      <Box width="45%">
                        <Controller
                          name={`lots.${index}.discountPercentage`}
                          control={control}
                          rules={{
                            required: "Le pourcentage de remise est requis",
                            pattern: {
                              value: /^\d+(\.\d+)?$/,
                              message: "Le pourcentage doit être un nombre valide"
                            },
                            min: {
                              value: 0,
                              message: "Le pourcentage ne peut pas être négatif"
                            },
                            max: {
                              value: 100,
                              message: "Le pourcentage ne peut pas dépasser 100%"
                            }
                          }}
                          render={({ field }) => (
                            <TextField
                              label="Discount Percentage"
                              value={field.value + ''}
                              onChange={field.onChange}
                              onBlur={field.onBlur}
                              autoComplete="off"
                              error={
                                errors.lots?.[index]?.discountPercentage?.message ||
                                getError(actionData, `lots.${index}.discountPercentage`)
                              }
                              suffix="%"
                            />
                          )}
                        />
                      </Box>
                      <Box paddingBlockStart="800" width="5%">
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