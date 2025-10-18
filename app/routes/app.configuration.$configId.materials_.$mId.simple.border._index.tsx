import {
  ActionList,
  Badge,
  BlockStack,
  Box,
  Button,
  ButtonGroup,
  Card,
  Divider,
  Grid,
  Icon,
  IndexTable,
  InlineError,
  InlineStack,
  Popover,
  Text,
  TextField,
} from "@shopify/polaris";
import { useEffect, useState } from "react";
import { DeleteIconBtn } from "~/components/buttons/DeleteIconBtn";
import { EditIconBtn } from "~/components/buttons/EditIconBtn";
import {
  Form,
  json,
  useActionData,
  useFetcher,
  useNavigate,
  useNavigation,
  useOutletContext,
  useParams,
  useSubmit,
} from "@remix-run/react";
import { BoxBackground } from "~/components/layouts/BoxBackground";
import PlusIcon from "~/components/icons/PlusIcon";
import { SpacingBackground } from "~/components/layouts/SpacingBackground";
import { BorderType, ShapeType } from "~/types/SettingsType";
import { BorderSettingType, ConfigBorder, ConfigSize } from "~/types/ConfigDataType";
import useHandleFlashMessage from "~/hooks/useHandleFlashMessage";
import { jFlashMessage } from "~/utils/message-flash";
import MaterialBorderService from "~/models/MaterialBorderService.service";
import { authenticate } from "~/shopify.server";
import { ActionFunctionArgs } from "@remix-run/node";
import { ReactSwitchCustom } from "~/components/inputs/ReactSwitchCustom";
import { getError } from "~/utils/error-getting";
import { TextColorField } from "~/components/inputs/TextColorField";
import { DeleteNowIconBtn } from "~/components/buttons/DeleteNowIconBtn";
import { BiAddBtn } from "~/components/buttons/BiAddBtn";
import { BiSaveBtn } from "~/components/buttons/BiSaveBtn";
import { z } from "zod";
import { parseWithZod } from "@conform-to/zod";
import { booleanTransform, jsonTransform, stringTransform } from "~/utils/transfomerZod";
import { fileUrl } from "~/utils/fileUrl";
import { FileInput } from "~/components/inputs/FileInput";

import MaterialBorderCreate from "./app.configuration.$configId.materials_.$mId.simple.border.edit";
import { DeleteIcon, EditIcon, MenuHorizontalIcon } from "@shopify/polaris-icons";
import { PRICING_PLANS } from "~/utils/pricing";

interface MaterialBordersProps {
  manageBorders: BorderType[];
  manageShapes: ShapeType[],
  borders: ConfigBorder[];
  borderSetting: any;
  configSizes: ConfigSize[];
  plan: string;
  materialId: number | undefined
} 
export default function MaterialBorderIndex({ materialId, manageBorders, manageShapes, configSizes, borders, borderSetting, plan }: MaterialBordersProps) {
  const submit = useSubmit();
  const params = useParams();
  const configId = params.configId;
  const borderFetcher = useFetcher() as any

  useHandleFlashMessage();

  const navigation = useNavigation();
  let isLoading = navigation.state == "loading";
  let isSubmitting = borderFetcher.state == "submitting";

  const navigate = useNavigate();

  //   // Gestion des réponses du fetcher
  // useEffect(() => {
  //   if (borderFetcher.data && borderFetcher.data.success) {
  //     switch (borderFetcher.data.operation) {
  //       case 'delete':
  //         // Recharger les données après suppression
  //         refreshBorders();
  //         break;
  //       case 'set-default':
  //         // Recharger les données après changement de défaut
  //         refreshBorders();
  //         break;
  //       case 'get-all':
  //         // Mettre à jour les borders avec les nouvelles données
  //         setBorders(borderFetcher.data.data || []);
  //         break;
  //       default:
  //         refreshBorders();
  //         break;
  //     }
  //   }
  // }, [borderFetcher.data]);

  // // Fonction pour recharger les borders depuis l'API
  // const refreshBorders = () => {
  //   borderFetcher.submit(
  //     { 
  //       operation: 'get-all',
  //       configId: configId || '',
  //       materialId: mId || ''
  //     },
  //     { 
  //       method: "GET",
  //       action: "/api/border-manager"
  //     }
  //   );
  // };

  useEffect(()=> {
    if (plan == PRICING_PLANS.STARTER) {
      manageShapes = manageShapes?.slice(0, PRICING_PLANS.STARTER_RULES.materialShapes) || [];
      configSizes = configSizes?.slice(0, PRICING_PLANS.STARTER_RULES.materialSizes) || [];
      manageBorders = manageBorders?.slice(0, PRICING_PLANS.STARTER_RULES.materialBorders) || [];
      borders = borders?.filter(curr => curr.manageBorderId < PRICING_PLANS.STARTER_RULES.materialBorders ) .slice(0, PRICING_PLANS.STARTER_RULES.materialBorders) || [];
    }
  })

  const handeleDelete = (id: number) => {
    borderFetcher.submit(
      {
        operation: 'delete',
        configId: configId ,
        materialId: materialId ,
        borderId: id.toString()
      },
      {
        method: "POST",
        action: "/api/border-manager"
      }
    );
  };

  const handeleDefault = (id: number) => {
    borderFetcher.submit(
      {
        operation: 'set-default',
        configId: configId?.toString() ,
        materialId: materialId?.toString() ,
        borderId: id.toString()
      },
      {
        method: "POST",
        action: "/api/border-manager"
      }
    );
  };

  const [showEditSection, setShowEditSection] = useState<boolean>(false)
  const [edit, setEdit] = useState<boolean>(false)
  const [currentBorderID, setCurrentBorderID] = useState<number>(0)
  const handleUpdate = (id: number) => {
    // submit({ id: id }, { method: "GET", action: "edit" });
    setShowEditSection(true)
    setEdit(true)
    setCurrentBorderID(id)
  };

  const handleEdit = () => {
    // navigate("edit");
    setActivePopoverId(-1)
    setEdit(false)
    setShowEditSection(true)
  };

  const actionData = useActionData<typeof action>();

  // console.log("actionData Data data", actionData);

  const [formData, setFormData] = useState<any>(
    borderSetting ? borderSetting : {
      colors: [],
      enableBorderWidth: true,
      enableBorderColor: true,
      borderColorsLabel: "Borders Colors",
      customColorsPrevImg: '',
    },
  );

  console.log(formData, "333", borderSetting)

  useEffect(() =>{
    if(borderSetting){
      setFormData({
        ...borderSetting,
      })
    }
  }, [borderSetting, materialId])

  const handleSaveBorderSettings = (borderSettings: BorderSettingType) => {
    let requestBody = {
      operation: 'edit-settings',
      configId: configId,
      materialId: materialId,
      borderSettings: borderSettings
    }
    // console.log(requestBody, "669999")
    borderFetcher.submit( requestBody,
      {
        method: "POST",
        action: "/api/border-manager",
        encType: "application/json",
      }
    );
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    
    const borderSettings = { 
      ...formData, 
      colors: formData.colors // Pas besoin de stringify ici, l'API le fera
    };
    
    // Utiliser l'API au lieu du submit classique
    handleSaveBorderSettings(borderSettings);
  };

  // const handleFormSubmit = (event: React.FormEvent) => {
  //   event.preventDefault();

  //   const data = { ...formData, colors: JSON.stringify(formData.colors) };

  //   submit(data, { method: "POST" });
  // };

  const handleAddColor = () => {
    if (!formData.colors) {
      formData.colors = [];
    }
    formData.colors.push({
      name: "",
      codeHex: "#FFFFFF",
      additionalPrice: 0,
    });

    setFormData({ ...formData });
  };

  const handleDeleteColor = (index: number) => {
    formData.colors.splice(index, 1);
    setFormData({ ...formData });
  };

  // console.log("data", borders, manageBorders);

  const bordersTab = borders
    ? borders.map((currBorder, index) => {
        let border = manageBorders.find(
          (manageBorder, manageIndex) =>
            manageIndex == currBorder.manageBorderId,
        );
        return {
          id: `${index}`,
          title: `${border?.name}`,
          icon: `${border?.icon}`,
          price: `${currBorder.additionalPrice}`,
          isDefault: currBorder.isDefault,
        };
      })
    : [];

  const resourceName = {
    singular: "Border",
    plural: "Borders",
  };

  const [activePopoverId, setActivePopoverId] = useState<number | null>(null);
  const rowMarkup = bordersTab.map(
    ({ id, title, icon, price, isDefault }, index) => {
      const isActive = activePopoverId === index;

      return(
        <IndexTable.Row id={id} key={id} position={index}>
          <IndexTable.Cell>
            <InlineStack blockAlign="start" gap="300">
              {title}
            </InlineStack>
          </IndexTable.Cell>
          <IndexTable.Cell className="td-center">
            <img
              style={{ height: "30px" }}
              src={fileUrl(icon)}
              alt={"border" + title}
            />
          </IndexTable.Cell>

          <IndexTable.Cell className="td-center">
            <Badge>{price}</Badge>
          </IndexTable.Cell>
          <IndexTable.Cell className="td-center">
            <ReactSwitchCustom
              checked={isDefault || false}
              setChecked={() => (isDefault ? "" : handeleDefault(index))}
            ></ReactSwitchCustom>
          </IndexTable.Cell>
          <IndexTable.Cell className="td-center">
            {/* <ButtonGroup fullWidth noWrap gap="loose">
              <EditIconBtn
                size="micro"
                onClick={() => {
                  handleUpdate(parseInt(id));
                }}
              />
              <DeleteIconBtn
                size="micro"
                onClick={() => {
                  handeleDelete(parseInt(id));
                }}
              />
            </ButtonGroup> */}
            <Popover
              active={isActive}
              activator={
                <Button
                  onClick={() =>
                    setActivePopoverId(isActive ? null : index)
                  }
                  icon={<Icon source={MenuHorizontalIcon} />}
                />
              }
              onClose={() => setActivePopoverId(null)}
              preferredAlignment="right"
            >
              <ActionList 
                items={[
                  { content: 'Edit', icon: EditIcon, onAction: () => handleUpdate(index) },
                  { content: 'Delete', icon: DeleteIcon, onAction: () => handeleDelete(index), destructive: true, },
                ]}
              />
            </Popover>
          </IndexTable.Cell>
        </IndexTable.Row>
      )
    },
  );
  return (
    <div>
      {!showEditSection ? (
        <div>
          <div>
            <Card>
              <BoxBackground>
                <Box padding="150">
                  {manageBorders?.length == borders?.length || (
                    <InlineStack gap="100" align="end">
                      <button
                        className="primary-btn"
                        type="button"
                        onClick={handleEdit}
                      >
                        <Box paddingInline="300">
                          <InlineStack gap="300">
                            <PlusIcon />
                            <span className="primary-btn-text"> Add new border</span>
                          </InlineStack>
                        </Box>
                      </button>
                    </InlineStack>
                  )}
                </Box>
                <Divider borderWidth="050" />
              </BoxBackground>
              <IndexTable
                resourceName={resourceName}
                itemCount={bordersTab.length}
                headings={[
                  { title: "Title" },
                  { title: "Icon", alignment: "center" },
                  { title: "Additional Price", alignment: "center" },
                  { title: "Default", alignment: "center" },
                  { title: "Action", alignment: "center" },
                ]}
                selectable={false}
              >
                {rowMarkup}
              </IndexTable>
            </Card>
          </div>

          <div style={{width:"100%" ,height:"auto" ,margin:"16px 0px "}}>
            <div>
              <Card>
                <Form onSubmit={handleFormSubmit} method="POST">
                  <Box paddingInline="300" paddingBlock="1000">
                    <BlockStack gap="300">
                      <Text as="strong" variant="headingMd">
                        Border settings
                      </Text>
                      {formData.enableBorderColor && 
                        <BlockStack gap="300">
                          <Text as="h3" variant="bodyMd" fontWeight="bold">
                            Define border colors
                          </Text>
                          <Box maxWidth="350px" width="350px">
                            <TextField
                              autoComplete="on"
                              onChange={(value) => {
                                formData.borderColorsLabel = value;
                                setFormData({ ...formData });
                              }}
                              label="Label"
                              value={formData.borderColorsLabel}
                            />
                          </Box>
                          <Grid gap={{ lg: "30px" }}>
                            {formData.colors?.map((color: any, index: number) => (
                              <Grid.Cell
                                columnSpan={{ xs: 6, sm: 6, md: 3, lg: 6, xl: 6 }}
                              >
                                <InlineStack
                                  gap={"300"}
                                  blockAlign="end"
                                  align="space-between"
                                  wrap={false}
                                >
                                  <TextField
                                    autoComplete="on"
                                    onChange={(value) => {
                                      color.name = value;
                                      formData.colors[index] = color;
                                      setFormData({ ...formData });
                                    }}
                                    label="Name"
                                    value={color.name}
                                  />
                                  <InlineStack
                                    gap={"300"}
                                    blockAlign="end"
                                    align="space-between"
                                    wrap={false}
                                  >
                                    <TextColorField
                                      color={color.codeHex}
                                      setColor={(value: any) => {
                                        color.codeHex = value;
                                        formData.colors[index] = color;
                                        setFormData({ ...formData });
                                      }}
                                    />
                                    <TextField
                                      type="number"
                                      autoComplete="on"
                                      onChange={(value) => {
                                        color.additionalPrice = value;
                                        formData.colors[index] = color;
                                        setFormData({ ...formData });
                                      }}
                                      onBlur={(value) => {
                                        formData.colors[index].additionalPrice =
                                          parseFloat(color.additionalPrice || "0");
                                        setFormData({ ...formData });
                                      }}
                                      label="Price"
                                      value={`${color.additionalPrice}`}
                                    />
                                    <DeleteNowIconBtn
                                      onClick={() => handleDeleteColor(index)}
                                    />
                                  </InlineStack>
                                </InlineStack>
                                {true && (
                                  <InlineError
                                    message={
                                      getError(actionData, `colors[${index}].name`) ||
                                      getError(
                                        actionData,
                                        `colors[${index}].codeHex`,
                                      ) ||
                                      ""
                                    }
                                    fieldID="myFieldID"
                                  />
                                )}
                              </Grid.Cell>
                            ))}
                          </Grid>
                          <Box width="150px">
                            <BiAddBtn
                              title="Add color"
                              handleClick={() => handleAddColor()}
                            />
                          </Box>
                        </BlockStack>
                      }

                      <InlineStack gap="600">
                        <InlineStack blockAlign="center" gap="200">
                          <Text as="strong" variant="headingMd">
                            Enable border width
                          </Text>
                          <ReactSwitchCustom
                            checked={formData.enableBorderWidth}
                            setChecked={(value: boolean) => {
                              formData.enableBorderWidth = value;
                              setFormData({ ...formData });
                            }}
                          />
                        </InlineStack>

                        <InlineStack blockAlign="center" gap="200">
                          <Text as="strong" variant="headingMd">
                            Enable border color
                          </Text>
                          <ReactSwitchCustom
                            checked={formData.enableBorderColor}
                            setChecked={(value: boolean) => {
                              formData.enableBorderColor = value;
                              setFormData({ ...formData });
                            }}
                          />


                      
                        </InlineStack>
                      </InlineStack>
                  { formData.enableBorderColor &&   <Box width="300px">

                      <FileInput title="Custom color preview image"  buttonTitle="upload image"  path={formData.customColorsPrevImg} handlePath={(value:any)=>{formData.customColorsPrevImg = value; setFormData({...formData})}}/>
                      </Box>}
                    </BlockStack>
                  </Box>
                  <Divider borderWidth="050" />
                  <Box paddingInline="300" paddingBlock="300">
                    <InlineStack align="end" gap="600">
                      <BiSaveBtn isLoading={isSubmitting} title="Save" />
                    </InlineStack>
                  </Box>
                </Form>
              </Card>
            </div>
          </div>
        </div>
      ) : (
        <MaterialBorderCreate materialId={materialId} configSizes={configSizes} manageBorders={manageBorders} borders={borders} manageShapes={manageShapes} id={currentBorderID} onClick={setShowEditSection} edit={edit} />
      )}
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
          codeHex: z.string().nullish().transform(stringTransform),
          name: z.string().nullish().transform(stringTransform),
          additionalPrice: z.number(),
        })
        .array(),
  ),
  borderColorsLabel: z.string().nullish().transform(stringTransform),
  customColorsPrevImg: z.string().nullish().transform(stringTransform),
  enableBorderWidth: z.any().transform(booleanTransform).pipe(z.boolean()),
  enableBorderColor: z.any().transform(booleanTransform).pipe(z.boolean()),
});

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const { session, admin } = await authenticate.admin(request);

  const configId = parseInt(params.configId ?? "");
  const mId = parseInt(params.mId ?? "");

  const method = request.method;
  const formData = await request.formData();

  switch (method) {
    case "DELETE": {
      const id = formData.get("id") as string;
      await MaterialBorderService.delete(
        configId,
        session.id,
        mId,
        parseInt(id || ""),
      );
      return json({
        ...jFlashMessage("Border deleted successfully"),
      });
      break;
    }
    case "PUT": {
      const id = formData.get("id") as string;
      await MaterialBorderService.setDefault(
        configId,
        session.id,
        mId,
        parseInt(id || ""),
      );
      return json({
        ...jFlashMessage("Default border set successfully"),
      });
      break;
    }
    case "POST": {
      const submission = parseWithZod(formData, { schema: formSchema });

      if (submission.status !== "success") {
        return json({ status: false, message: null, errors: submission.error });
      }

      let borderSetting: BorderSettingType =
        submission.value as BorderSettingType;
      if (borderSetting) {
        let res = await MaterialBorderService.editSettings(
          configId,
          session.id,
          mId,
          borderSetting,
        ); // Custom Size  updated is completed successfully
        return res
          ? json({
              ...jFlashMessage(
                "Border setting updated successfully",
              ),
            })
          : json({
              ...jFlashMessage("Errors on setting updating", "error"),
            });
      } else {
        return;
      }
      break;
    }
    default:
      break;
  }

  return null;
};
