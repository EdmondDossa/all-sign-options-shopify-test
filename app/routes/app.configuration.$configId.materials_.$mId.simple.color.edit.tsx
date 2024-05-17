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
import {  useState } from "react";
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
import { ConfigColor } from "~/types/ConfigDataType";
import { BiSaveBtn } from "~/components/buttons/BiSaveBtn";
import { getError } from "~/utils/error-getting";
import { z } from "zod";
import { ActionFunctionArgs, json } from "@remix-run/node";
import { authenticate } from "~/shopify.server";
import { parseWithZod } from "@conform-to/zod";
import MaterialColorService from "~/models/MaterialColors.service";
import { flashMessage } from "~/utils/message-flash";
import { BiAddBtn } from "~/components/buttons/BiAddBtn";
import { RemoveNowIconBtn } from "~/components/buttons/RemoveNowIconBtn";
import { jsonTransform, stringTransform } from "~/utils/transfomerZod";
import { FileInput } from "~/components/inputs/FileInput";
import { TextColorField } from "~/components/inputs/TextColorField";
import { ReactSwitchCustom } from "~/components/inputs/ReactSwitchCustom";
import { ToggleButton } from "~/components/buttons/ToggleButton";

export default function MaterialColorCreate() {
  const submit = useSubmit();
  const navigation = useNavigation();
  const actionData = useActionData<typeof action>();
  let {  colors } = useOutletContext<{
    colors: ConfigColor[];
  }>();
  const [searchParams] = useSearchParams();
  const id = parseInt(searchParams.get("id") || "");
  let configColor = colors?.find((curr, index) => index === id);
  let [openIndex, setOpenIndex] = useState(new Set([0]));
  const [formData, setFormData] = useState<{ colors: ConfigColor[] }>(
    configColor
      ? {
          colors: [configColor as ConfigColor],
        }
      : {
          colors: [
            {
              additionalPrice: 0,
              isDefault: false,
              name: "",
              textColor: {
                active: true,
                sameForBorder: false,
                codeHex: "#000000",
                name: "",
              },
              pattern: {
                active: true,
                codeHex: "#000000",
                url: "",
              },
              prevImg: "",
            },
          ],
        },
  );

  console.log("formData color", actionData);

  const handleAddItem = () => {
    if (!formData.colors) {
      formData.colors = [];
    }
    if (Number.isNaN(id)) {
      formData.colors.push({
        additionalPrice: 0,
        isDefault: false,
        name: "",
        textColor: {
          active: true,
          sameForBorder: false,
          codeHex: "#000000",
          name: "",
        },
        pattern: {
          active: true,
          codeHex: "#000000",
          url: "",
        },
        prevImg: "",
      });
    }

    setFormData({ ...formData });
  };

  const handleDeleteItem = (index: number) => {
    if (formData.colors.length > 1) {
      formData.colors.splice(index, 1);
      setFormData({ ...formData });
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    submit({ colors: JSON.stringify(formData.colors) }, { method: "POST" });
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
                {formData.colors.map((color, index) => (
                  
                  <>
                    <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
                      <Divider borderWidth="100" />
                      <Divider borderWidth="100" />
                    </Grid.Cell>
                    <Grid.Cell
                    columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}
                  >
                      <BlockStack>
                        
                      <Bleed marginBlockEnd="400">
                            <InlineStack wrap={false} align="end"  gap="200">
                          <RemoveNowIconBtn
                            onClick={() => handleDeleteItem(index)}
                            />
                            <ToggleButton buttonProps={{
                              onClick: () => { 
                                openIndex.has(index) ? openIndex.delete(index) : openIndex.add(index);
                                setOpenIndex(new Set([...openIndex]))
                              
                             } }}
                            open={openIndex.has(index)}/>
                          </InlineStack>
                        </Bleed>
                        <Box width="100%">
                      
                            
                        <Grid>
                          <Grid.Cell
                            columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}
                          >
                            <TextField
                              label="Name"
                              value={`${color.name}`}
                              onChange={(value) => {
                                color.name = value;
                                formData.colors[index] = color;
                                setFormData({ ...formData });
                              }}
                              autoComplete="off"
                              error={getError(
                                actionData,
                                `colors[${index}].name`,
                              )}
                            />
                          </Grid.Cell>
                          <Grid.Cell
                            columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}
                          >
                            <FileInput
                              error={getError(
                                actionData,
                                `colors[${index}].prevImg`,
                              )}
                              title="Preview Image"
                              path={color.prevImg}
                              handlePath={(value: string) => {
                                color.prevImg = value;
                                formData.colors[index] = color;
                                setFormData({ ...formData });
                              }}
                            />
                            </Grid.Cell>
                         {openIndex.has(index) &&   <>
                          <Grid.Cell
                            columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}
                          >
                            <InlineStack blockAlign="center" gap="200">
                              <Text as="strong" variant="headingMd">
                                Use pattern color
                              </Text>
                              <ReactSwitchCustom
                                checked={color.pattern.active}
                                setChecked={(value: boolean) => {
                                  color.pattern.active = value;
                                  formData.colors[index] = color;
                                  setFormData({ ...formData });
                                }}
                              />
                            </InlineStack>
                          </Grid.Cell>
                          <Grid.Cell
                            columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}
                          >
                            {( !color.pattern.active )? (
                              <TextColorField
                                error={getError(
                                  actionData,
                                  `colors[${index}].pattern.codeHex`,
                                )}
                                label="Material Background Color"
                                color={color.pattern.codeHex}
                                setColor={(value: string) => {
                                  color.pattern.codeHex = value;
                                  formData.colors[index] = color;
                                  setFormData({ ...formData });
                                }}
                              />
                            ) : (
                              <FileInput
                                error={getError(
                                  actionData,
                                  `colors[${index}].pattern.url`,
                                )}
                                title="Preview Image"
                                path={color.pattern.url}
                                handlePath={(value: string) => { !color.pattern.active 
                                  color.pattern.url = value;
                                  formData.colors[index] = color;
                                  setFormData({ ...formData });
                                }}
                              />
                            )}
                          </Grid.Cell>
                          <Grid.Cell
                            columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}
                          >
                            <InlineStack blockAlign="center" gap="200">
                              <Text as="strong" variant="headingMd">
                                Enable text color
                              </Text>
                              <ReactSwitchCustom
                                checked={color.textColor.active}
                                setChecked={(value: boolean) => {
                                  color.textColor.active = value;
                                  formData.colors[index] = color;
                                  setFormData({ ...formData });
                                }}
                              />
                            </InlineStack>
                          </Grid.Cell>
                          <Grid.Cell
                            columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}
                          >
                            <InlineStack blockAlign="center" gap="200">
                              <Text as="strong" variant="headingMd">
                                Use the same color for border
                              </Text>
                              <ReactSwitchCustom
                                checked={color.textColor.sameForBorder}
                                setChecked={(value: boolean) => {
                                  color.textColor.sameForBorder = value;
                                  formData.colors[index] = color;
                                  setFormData({ ...formData });
                                }}
                              />
                            </InlineStack>
                          </Grid.Cell>
                          <Grid.Cell
                            columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}
                          >
                            <TextField
                              label="Text Color Name"
                              value={`${color.textColor.name}`}
                              onChange={(value) => {
                                color.textColor.name = value;
                                formData.colors[index] = color;
                                setFormData({ ...formData });
                              }}
                              autoComplete="off"
                              error={getError(
                                actionData,
                                `colors[${index}].textColor.name`,
                              )}
                            />
                          </Grid.Cell>
                          <Grid.Cell
                            columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}
                          >
                            <TextColorField
                              error={getError(
                                actionData,
                                `colors[${index}].textColor.codeHex`,
                              )}
                              label="Text Color"
                              color={color.textColor.codeHex}
                              setColor={(value: string) => {
                                color.textColor.codeHex = value;
                                formData.colors[index] = color;
                                setFormData({ ...formData });
                              }}
                            />
                          </Grid.Cell>

                          <Grid.Cell
                            columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}
                          >
                            <TextField
                              label="Additional price"
                              type="number"
                              value={`${color.additionalPrice}`}
                              onChange={(value) => {
                                color.additionalPrice = Number.parseFloat(value);
                                formData.colors[index] = color;
                                setFormData({ ...formData });
                              }}
                              autoComplete="off"
                              error={getError(
                                actionData,
                                `colors[${index}].additionalPrice`,
                              )}
                            />
                          </Grid.Cell>
                            </>}
        
                              
                        </Grid>
                      </Box>

                  
                    </BlockStack>
                  </Grid.Cell>
                  </>
                ))}
                {Number.isNaN(id) && (
                  <Grid.Cell
                    columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}
                  >
                    <Box width="150px">
                      <BiAddBtn
                        title="Add color"
                        handleClick={() => handleAddItem()}
                      />
                    </Box>
                  </Grid.Cell>
                )}
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
  colors: z
    .any()
    .transform(jsonTransform)
    .pipe(
      z
        .object({
          additionalPrice: z.number(),
          isDefault: z.boolean(),
          name: z.string(),
          textColor: z.object({
            sameForBorder: z.boolean(),
            active: z.boolean(),
            codeHex: z.string().nullish().transform(stringTransform),
            name: z.string().nullish().transform(stringTransform),
          }),
          pattern: z.object({
            active: z.boolean(),
            codeHex: z.string().nullish().transform(stringTransform),
            url: z.string().nullish().transform(stringTransform),
          }),
          prevImg: z.string().nullish().transform(stringTransform),
        })
        .array(),
    ),
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

  if (
    id &&
    !Number.isNaN(configId) &&
    !Number.isNaN(mId) &&
    !Number.isNaN(id)
  ) {
    let res = await MaterialColorService.update(
      configId,
      session.id,
      mId,
      configColors[0],
      parseInt(id),
    );
    flashMessage;
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
    for (const configColor of configColors) {
      res = await MaterialColorService.add(
        configId,
        session.id,
        mId,
        configColor,
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
