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
import RayEndArrowIcon from "~/components/icons/RayEndArrowIcon";
import { ConfigShape } from "~/types/ConfigDataType";
import { ShapeType } from "~/types/SettingsType";
import { getError } from "~/utils/error-getting";
import { BiSaveBtn } from "~/components/buttons/BiSaveBtn";
import { number, z } from "zod";
import { ActionFunctionArgs, json } from "@remix-run/node";
import { authenticate } from "~/shopify.server";
import { parseWithZod } from "@conform-to/zod";
import { flashMessage } from "~/utils/message-flash";
import MaterialShapeService from "~/models/MaterialShape.service";
import { RemoveNowIconBtn } from "~/components/buttons/RemoveNowIconBtn";
import { BiAddBtn } from "~/components/buttons/BiAddBtn";
import { jsonTransform } from "~/utils/transfomerZod";


export default function MaterialFixingMethod() {
  const submit = useSubmit();
  const navigation = useNavigation();
  const actionData = useActionData<typeof action>();
  let { manageShapes, shapes } = useOutletContext<{
    manageShapes: ShapeType[];
    shapes: ConfigShape[];
  }>();
  const [searchParams] = useSearchParams();
  const id = parseInt(searchParams.get("id") || "");
  let configShape = shapes?.find((curr, index) => index === id);


  const options = manageShapes
  ? manageShapes.map((manageShapes, index) => ({
      label: manageShapes.name || "",
      value: `${index}`,
    })).filter(filterShape=>(filterShape.value==`${configShape?.shapeId}` )|| (!shapes?.find((curr) => filterShape.value == `${curr.shapeId}`)))
  : [];

  const [formData, setFormData] = useState<{configShapes: ConfigShape[]}>(
    configShape
      ? 
      {
        configShapes: [configShape as ConfigShape]
      }
      : {
        configShapes: [ {
          shapeId: parseInt(options[0]?.value),
          additionalPrice: 0,
          isDefault: false
        }]
      },
  );

  const handleAddItem = () => {
    if (!formData.configShapes) {
      formData.configShapes = [];
    } 
    if (Number.isNaN(id) && options?.length > formData.configShapes?.length) {
      formData.configShapes.push({
        shapeId: parseInt(options.filter(option=>!formData.configShapes?.find(curr=>curr.shapeId == parseInt(option.value)))[0]?.value),
        additionalPrice: 0,
        isDefault: false
        
      });
    }

    setFormData({ ...formData });
  }

  const handleDeleteItem = (index: number) => {
    if (formData.configShapes.length>1) {
      formData.configShapes.splice(index, 1);
      setFormData({ ...formData});
    }

  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    submit({configShapes: JSON.stringify(formData.configShapes)},{ method: "POST" });
  };



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
                    formData.configShapes.map((currConfigShape, index) => (
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
                      
                        <InlineStack wrap={false} as="div" gap="400">
                          <Box width="52%">

                          <Select
                        label="Select shapes"
                        options={options}
                        value={`${currConfigShape.shapeId}`}
                        onChange={(value) => {
                          currConfigShape.shapeId = parseFloat(value);
                          formData.configShapes[index] = currConfigShape;
                          setFormData({ ...formData });
                        }}
                        error={getError(actionData, `configShapes.${index}.shapeId`)}
                      />
                          </Box>
                          <Box width="52%">
                            
                      <TextField
                        label="Additional price"
                        type="number"
                        value={`${currConfigShape.additionalPrice}`}
                        onChange={(value) => {
                          currConfigShape.additionalPrice = parseFloat(value);
                          formData.configShapes[index] = currConfigShape;
                          setFormData({ ...formData });
                        }}
                        autoComplete="off"
                              error={getError(actionData, `configShapes.${index}.additionalPrice`)}
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
               {Number.isNaN(id) && options.length > formData.configShapes?.length && <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
                <Box width="150px">
                    <BiAddBtn title="Add shapes" handleClick={()=>handleAddItem()} />
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
  configShapes: z.any().transform(jsonTransform).pipe(
    z.object({
      shapeId: z.number({ required_error: "Material shape is required" }),
      additionalPrice: z.number({ required_error: "Material shape price is required" }),
      isDefault: z.boolean().optional(),
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

  let configShapes: ConfigShape[] = submission.value.configShapes as ConfigShape[];

  if (id && !Number.isNaN(configId)  && !Number.isNaN(mId) && !Number.isNaN(id)) {
    let res = await MaterialShapeService.update(
      configId,
      session.id,
      mId,
      configShapes[0],
      parseInt(id),
    );
    return res
      ? redirect(
          `..${flashMessage("Material shape  updated is completed successfully")}`,
        )
      : redirect(
          `..${flashMessage("Material shape updated is  fail", "error")}`,
        );
  } else {
    let resTab: any = [];
    let res;
    for (const configShape of configShapes) {
      res = await MaterialShapeService.add(
        configId,
        session.id,
        mId,
        configShape
      );

      resTab.push(res);
    }
    return resTab?.length > 0
      ? redirect(
          `..${flashMessage("Material shape added is completed successfully")}`,
        )
      : redirect(`..${flashMessage("Material shape added is  fail", "error")}`);
  }
};



