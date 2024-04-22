import {
  Bleed,
  Box,
  Divider,
  Grid,
  InlineGrid,
  InlineStack,
  Select,
  TextField,
} from "@shopify/polaris";
import { useCallback, useState } from "react";
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
import { ConfigColor } from "~/types/ConfigDataType";
import { ColorType } from "~/types/ManagePropertyType";
import { BiSaveBtn } from "~/components/buttons/BiSaveBtn";
import { getError } from "~/utils/error-getting";
import { z } from "zod";
import { ActionFunctionArgs, json } from "@remix-run/node";
import { authenticate } from "~/shopify.server";
import { parseWithZod } from "@conform-to/zod";
import MaterialColorService from "~/models/MaterialColors.service";
import { flashMessage } from "~/utils/message-flash";
import { BiAddBtn } from "~/components/buttons/BiAddBtn";
import { DeleteNowIconBtn } from "~/components/buttons/DeleteNowIconBtn";
import { RemoveNowIconBtn } from "~/components/buttons/RemoveNowIconBtn";
import { jsonTransform } from "~/utils/transfomerZod";

export default function MaterialColorCreate() {
  const submit = useSubmit();
  const navigation = useNavigation();
  const actionData = useActionData<typeof action>();
  let { manageColors, colors } = useOutletContext<{
    manageColors: ColorType[];
    colors: ConfigColor[];
  }>();
  const [searchParams] = useSearchParams();
  const id = parseInt(searchParams.get("id") || "");
  let configColor = colors?.find((curr, index) => index === id);
  const [formData, setFormData] = useState<{colors: ConfigColor[]}>(
    configColor
      ? 
      {
        colors: [configColor as ConfigColor]
      }
      : {
        colors: [ {
       
          manageColorId: manageColors[0]?.id || 0,
          additionalPrice: 0,
          isDefault: false
        }]
      },
  );

  const handleAddItem = () => {
    if (!formData.colors) {
      formData.colors = [];
    } 
    if (Number.isNaN(id)) {
      formData.colors.push({
        manageColorId:0,
        additionalPrice: 0,
        isDefault: false
        
      });
    }

    setFormData({ ...formData });
  }

  const handleDeleteItem = (index: number) => {
    if (formData.colors.length>1) {
      formData.colors.splice(index, 1);
      setFormData({ ...formData});
    }

  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    submit({colors: JSON.stringify(formData.colors)},{ method: "POST" });
  };

  const options = manageColors
    ? manageColors.map((manageColors) => ({
        label: manageColors.name || "",
        value: `${manageColors.id}`,
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
                    formData.colors.map((color, index) => (
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
                      
                        <InlineStack wrap={false} as="div" gap="400">
                          <Box width="52%">

                          <Select
                        label="Select color"
                        options={options}
                        value={`${color.manageColorId}`}
                        onChange={(value) => {
                          color.manageColorId = parseFloat(value);
                          formData.colors[index] = color;
                          setFormData({ ...formData });
                        }}
                        error={getError(actionData, `colors.${index}.manageColorId`)}
                      />
                          </Box>
                          <Box width="52%">
                            
                      <TextField
                        label="Additional price"
                        type="number"
                        value={`${color.additionalPrice}`}
                        onChange={(value) => {
                          color.additionalPrice = parseFloat(value);
                          formData.colors[index] = color;
                          setFormData({ ...formData });
                        }}
                        autoComplete="off"
                              error={getError(actionData, `colors.${index}.additionalPrice`)}
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
                    <BiAddBtn title="Add color" handleClick={()=>handleAddItem()} />
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
  colors:  z.any().transform(jsonTransform).pipe(
    z.object({
      manageColorId: z.number({ required_error: "Material color is required" }),
      additionalPrice: z.number({ required_error: "Material color price is required" }),
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

  let configColors: ConfigColor[] = submission.value.colors as ConfigColor[];

  if (id && !Number.isNaN(configId)  && !Number.isNaN(mId) && !Number.isNaN(id)) {
    let res = await MaterialColorService.update(
      configId,
      session.id,
      mId,
      configColors[0],
      parseInt(id),
    );flashMessage
    return res
      ? redirect(
          `..${flashMessage("Material color  updated is completed successfully")}`,
        )
      : redirect(
          `..${flashMessage("Material color updated is  fail", "error")}`,
        );
  } else {
    let resTab: any = [];
    let res;
    for  (const configColor of configColors) {
      res = await MaterialColorService.add(
        configId,
        session.id,
        mId,
        configColor
      );

      resTab.push(res);
    }
   
    return resTab?.length > 0
      ? redirect(
          `..${flashMessage("Material color added is completed successfully")}`,
        )
      : redirect(`..${flashMessage("Material color added is  fail", "error")}`);
  }
};
