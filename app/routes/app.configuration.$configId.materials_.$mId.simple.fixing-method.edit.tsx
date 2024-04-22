import {
  AutoSelection,
  Bleed,
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
import { RemoveNowIconBtn } from "~/components/buttons/RemoveNowIconBtn";
import { BiAddBtn } from "~/components/buttons/BiAddBtn";
import { jsonTransform } from "~/utils/transfomerZod";

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

  const [formData, setFormData] = useState<{configFixingMethods: ConfigFixingMethod[]}>(
    configFixingMethod
      ? 
      {
        configFixingMethods: [configFixingMethod as ConfigFixingMethod]
      }
      : {
        configFixingMethods: [ {
          fixingMethodId:  0,
          additionalPrice: 0,
          isDefault: false
        }]
      },
  );

  const handleAddItem = () => {
    if (!formData.configFixingMethods) {
      formData.configFixingMethods = [];
    } 
    if (Number.isNaN(id)) {
      formData.configFixingMethods.push({
        fixingMethodId:0,
        additionalPrice: 0,
        isDefault: false
        
      });
    }

    setFormData({ ...formData });
  }

  const handleDeleteItem = (index: number) => {
    if (formData.configFixingMethods.length>1) {
      formData.configFixingMethods.splice(index, 1);
      setFormData({ ...formData});
    }

  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    submit({configFixingMethods: JSON.stringify(formData.configFixingMethods)},{ method: "POST" });
  };

  const options = manageFixingMethods
    ? manageFixingMethods.map((manageFixingMethod, index) => ({
        label: manageFixingMethod.name || "",
        value: `${index}`,
      }))
    : [];

  let isLoading = navigation.state == "loading";
  let isSubmitting = navigation.state == "submitting";


 

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
              {
                    formData.configFixingMethods.map((fixingMethod, index) => (
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
                      
                        <InlineStack wrap={false} as="div" gap="400">
                          <Box width="52%">

                          <Select
                        label="Select fixing method"
                        options={options}
                        value={`${fixingMethod.fixingMethodId}`}
                        onChange={(value) => {
                          fixingMethod.fixingMethodId = parseFloat(value);
                          formData.configFixingMethods[index] = fixingMethod;
                          setFormData({ ...formData });
                        }}
                        error={getError(actionData, `manageFixingMethods.${index}.fixingMethodId`)}
                      />
                          </Box>
                          <Box width="52%">
                            
                      <TextField
                        label="Additional price"
                        type="number"
                        value={`${fixingMethod.additionalPrice}`}
                        onChange={(value) => {
                          fixingMethod.additionalPrice = parseFloat(value);
                          formData.configFixingMethods[index] = fixingMethod;
                          setFormData({ ...formData });
                        }}
                        autoComplete="off"
                              error={getError(actionData, `manageFixingMethods.${index}.additionalPrice`)}
                        />
                     
                          </Box>
                          <Box width="1%">
                            <Bleed marginInlineStart="400">
                              
                            <RemoveNowIconBtn onClick={() => handleDeleteItem(index)} />
                          </Bleed>
                          </Box>
                             
                          
                        </InlineStack>
                        
                
                </Grid.Cell>
                         ))
                        }
               {Number.isNaN(id) && <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
                <Box width="150px">
                    <BiAddBtn title="Add fixing method" handleClick={()=>handleAddItem()} />
                  </Box>
                </Grid.Cell>}
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
  configFixingMethods: z.any().transform(jsonTransform).pipe(
    z.object({
      fixingMethodId: z.number({ required_error: "Material fixing method is required" }),
    additionalPrice: z.number({ required_error: "Material fixing method  price is required" }),
    isDefault: z.boolean().optional()
    }).array()
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

  let configFixingMethods: ConfigFixingMethod[] = submission.value.configFixingMethods as ConfigFixingMethod[];

  if (id && !Number.isNaN(configId)  && !Number.isNaN(mId) && !Number.isNaN(id)) {
    let res = await MaterialFixingMethodService.update(
      configId,
      session.id,
      mId,
      configFixingMethods[0],
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
   

    let resTab: any = [];
    let res;
    for (const configFixingMethod of configFixingMethods) {
        let res = await MaterialFixingMethodService.add(
        configId,
        session.id,
        mId,
        configFixingMethod
      );

      resTab.push(res);
    }
   
    return resTab?.length > 0
      ? redirect(
          `..${flashMessage("Material fixing method  added is completed successfully")}`,
        )
      : redirect(`..${flashMessage("Material fixing method  added is  fail", "error")}`);
  }
};


