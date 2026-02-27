import {
  ActionList,
  Badge,
  Bleed,
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
  Select,
  Text,
  TextField,
  useIndexResourceState,
} from "@shopify/polaris";
import { useEffect, useState } from "react";
import { DeleteIconBtn } from "~/components/buttons/DeleteIconBtn";
import { EditIconBtn } from "~/components/buttons/EditIconBtn";
import {
  Form,
  useActionData,
  useLocation,
  useNavigate,
  useNavigation,
  useOutletContext,
  useParams,
  useSubmit,
} from "@remix-run/react";
import { BoxBackground } from "~/components/layouts/BoxBackground";
import PlusIcon from "~/components/icons/PlusIcon";
import { SpacingBackground } from "~/components/layouts/SpacingBackground";
import {
  ConfigCustomSize,
  ConfigSize,
  ThicknessValue,
  configSizeThickness,
} from "~/types/ConfigDataType";
import useHandleFlashMessage from "~/hooks/useHandleFlashMessage";
import { getError } from "~/utils/error-getting";
import { ReactSwitchCustom } from "~/components/inputs/ReactSwitchCustom";
import { ActionFunctionArgs, json, redirect } from "@remix-run/node";
import { authenticate } from "~/shopify.server";
import { z } from "zod";
import { parseWithZod } from "@conform-to/zod";
import MaterialSizeService from "~/models/MateriaSizeService.service";
import { jFlashMessage } from "~/utils/message-flash";
import { BiSaveBtn } from "~/components/buttons/BiSaveBtn";
import { BiAddBtn } from "~/components/buttons/BiAddBtn";
import { jsonTransform } from "~/utils/transfomerZod";
import { RemoveNowIconBtn } from "~/components/buttons/RemoveNowIconBtn";
import { ConfigurationType } from "~/types/ConfigurationType";
import { PRICING_PLANS } from "~/utils/pricing";
import { DeleteIcon, EditIcon, MenuHorizontalIcon } from "@shopify/polaris-icons";
import { useFetcher } from "@remix-run/react";

import MaterialSizeEdit from "./app.configuration.$configId.materials_.$mId.simple.size.edit";

interface MaterialSizesProps {
  customSize: ConfigCustomSize;
  allSizes: ConfigSize[];
  thickness: configSizeThickness,
  configuration: ConfigurationType;
  plan: string;
  materialId: number | undefined,
  refreshMaterial: (key: string, data: object) => void;
}
export default function MaterialSizeIndex({ materialId, customSize, allSizes, thickness, configuration, plan, refreshMaterial }: MaterialSizesProps) {
  const submit = useSubmit();
  const setDefaultfetcher = useFetcher();
  const deletefetcher = useFetcher();
  const settingfetcher = useFetcher();

  const params = useParams();

  useHandleFlashMessage();

  const actionData = useActionData<typeof action>();

  const navigation = useNavigation();
  let isLoading = navigation.state == "loading";
  let isSubmitting = settingfetcher.state == "submitting";

  const navigate = useNavigate();

  const location = useLocation();

  // État local pour gérer l'affichage des sizes
  const [localSizes, setLocalSizes] = useState<ConfigSize[]>(allSizes);

  // Mettre à jour l'état local quand les props changent
  useEffect(() => {
    setLocalSizes(allSizes);
  }, [allSizes]);

  const handeleDelete = async (id: number) => {
    console.log("=== handeleDelete called with ID:", id, "===");

    try {
      const configId = parseInt(params.configId ?? "");
      const mId = parseInt(params.mId ?? "");

      // console.log("=== Debug params ===");
      // console.log("params.configId:", params.configId, "parsed:", configId);
      // console.log("params.mId:", params.mId, "parsed:", mId);
      // console.log("props materialId:", materialId);
      // console.log("=== End Debug ===");

      // Utiliser materialId des props (qui est l'index du matériau)
      const finalMaterialId = materialId ?? 0;

      // console.log("Final materialId:", finalMaterialId);
      // console.log("Current URL:", window.location.href);

      // // Utiliser la route API dédiée
      // console.log("=== Sending POST request to /api/delete-size ===");

      // // Utiliser la route API dédiée
      // console.log("Sending POST request to /api/delete-size");

      const requestBody = {
        operation: 'delete',
        configId,
        materialId: finalMaterialId,
        sizeId: id
      };

      // console.log("=== Request body being sent ===");
      // console.log("Request body:", requestBody);
      // console.log("materialId type:", typeof finalMaterialId, "value:", finalMaterialId);

      // // const response = await fetch('/api/delete-size', {
      // const response = await fetch('/api/size-manager', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(requestBody)
      // });

      deletefetcher.submit(
        {
          operation: "delete",
          configId: configId,
          materialId: finalMaterialId,
          sizeId: id,
        },
        {
          method: "POST",
          action: "/api/size-manager",
          encType: "application/json",
        }
      )

      // console.log("=== Fetch response status:", response.status, "===");
      // console.log("=== Fetch response headers:", response.headers, "===");

      // if (response.ok) {
      //   console.log("Size deleted successfully");
      //   const responseData = await response.json();
      //   console.log("Response data:", responseData);

      //   // Mettre à jour l'état local en supprimant la size
      //   const updatedSizes = localSizes.filter((_, index) => index !== id);
      //   setLocalSizes(updatedSizes);
      // } else {
      //   console.error("Failed to delete size, status:", response.status);
      //   const errorText = await response.text();
      //   console.error("Error response:", errorText);
      // }
    } catch (error) {
      console.error("Error deleting size:", error);
      if (error instanceof Error) {
        console.error("Error details:", error.message);
        console.error("Error stack:", error.stack);
      }
    }
  };

  const handeleDefault = (id: number) => {
    allSizes = allSizes.map((curr, index) => {
      if (index === id) {
        curr.isDefault = true;
      } else {
        curr.isDefault = false;
      }
      return curr;
    });

    const configId = parseInt(params.configId ?? "");
    const finalMaterialId = materialId ?? 0;

    setDefaultfetcher.submit(
      {
        operation: "set-default",
        configId: configId,
        materialId: finalMaterialId,
        sizeId: id,
      },
      {
        method: "POST",
        action: "/api/size-manager",
        encType: "application/json",
      }
    );

  };
  const [showEditSection, setShowEditSection] = useState<boolean>(false)
  const [edit, setEdit] = useState<boolean>(false)
  const [currentSizeID, setCurrentSizeID] = useState<number>(0)
  const handleUpdate = (id: number) => {
    // submit({ id: id }, { method: "GET", action: "edit" });
    setShowEditSection(true)
    setEdit(true)
    setCurrentSizeID(id)
  };

  const handleEdit = () => {
    // navigate("edit");
    setEdit(false)
    setShowEditSection(true)
    setCurrentSizeID(-1) // -1 pour indiquer une nouvelle size
  };

  const [formData, setFormData] = useState<{
    thickness: configSizeThickness;
    customSize: ConfigCustomSize;
  }>({
    thickness: thickness || {
      active: false,
      values: [],
    },
    customSize: (() => {
      const base = customSize ?? {} as any;
      const pricings = base.pricings;
      const hasPricings = pricings && typeof pricings === "object" && pricings.type && pricings.unit && Array.isArray(pricings.range);
      return hasPricings
        ? base
        : {
          ...base,
          active: base.active ?? false,
          width: base.width ?? { label: "Custom width", min: 0, max: 0 },
          height: base.height ?? { label: "Custom height", min: 0, max: 0 },
          pricings: {
            type: pricings?.type ?? "unit",
            unit: pricings?.unit ?? { basePrice: 0, surface: 0, charPrice: 0 },
            range: Array.isArray(pricings?.range) ? pricings.range : [],
            rangePricingPerUnit: pricings?.rangePricingPerUnit ?? false,
          },
        };
    })(),
  });





  useEffect(() => {
    if (plan == PRICING_PLANS.STARTER) {
      formData.customSize.active = PRICING_PLANS.STARTER_RULES.materialCustomSizes;
      setFormData({
        ...formData
      })
    }
    if (plan == PRICING_PLANS.STARTER) {
      allSizes = allSizes?.slice(0, PRICING_PLANS.STARTER_RULES.materialSizes) || [];
    }
  }, [customSize, thickness, materialId])

  const handleInputChange = (inputName: string, value: any) => {
    setFormData((prevData: any) => ({
      ...prevData,
      [inputName]: value,
    }));
  };

  const handleAddThickness = () => {
    if (!formData.thickness.values) {
      formData.thickness.values = [];
    }
    const newThickness: ThicknessValue = {
      label: "",
      value: 0,
      pricingType: "additional",
      additionalPrice: 0,
      multiplier: 1,
    };
    formData.thickness.values.push(newThickness);
    setFormData({ ...formData });
  };

  let [pricingErrors, setPricingErrors] = useState<
    Array<{ id: number; message: string }>
  >([]);



  const handleDeleteThickness = (index: number) => {
    formData.thickness.values.splice(index, 1);
    setFormData({ ...formData });
  };

  const handleAddPricing = () => {
    if (!formData.customSize.pricings) {
      formData.customSize.pricings = {
        type: "unit",
        unit: { basePrice: 0, surface: 0, charPrice: 0 },
        range: [],
        rangePricingPerUnit: false,
      };
    }
    const range = formData.customSize.pricings.range ?? [];
    const lastSurface = range.length > 0
      ? range[range.length - 1].surface
      : 0;
    formData.customSize.pricings.range = [...range, {
      basePrice: 0,
      surface: parseFloat(String(lastSurface)) + 1,
      charPrice: 0,
    }];
    setFormData({ ...formData });
  };

  const handleDeletePricing = (index: number) => {
    if (!formData.customSize.pricings?.range) return;
    formData.customSize.pricings.range.splice(index, 1);
    setFormData({ ...formData });
  };

  // const handleSubmit = (e: any) => {
  //   e.preventDefault();
  //   pricingErrors = [];
  //   if(Array.isArray(formData.customSize.pricings.range)){

  //     formData.customSize.pricings.range.forEach((pricing:any, index:number) => {
  //      if (
  //         index > 0 &&
  //         parseFloat(`${formData.customSize.pricings.range[index - 1].surface}`) >=
  //           parseFloat(`${pricing.surface}`)
  //       ) {
  //         pricingErrors.push({
  //           id: index,
  //           message: "The surface must be greater than the surface above",
  //         });
  //       } else if (pricingErrors.find((curr) => curr.id == index)) {
  //         pricingErrors = pricingErrors.filter((curr: any) => curr.id !== index);
  //       }
  //       setPricingErrors([...pricingErrors]);

  //     });
  //   }

  //   if (pricingErrors.length > 0) {
  //     return;
  //   }



  //   submit(
  //     {
  //       thickness: JSON.stringify(formData.thickness),
  //       customSize: JSON.stringify(formData.customSize),
  //     },
  //     { method: "POST" },
  //   );
  // };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    pricingErrors = [];
    const configId = parseInt(params.configId ?? "");


    // Validation des prix par surface
    const range = formData.customSize?.pricings?.range;
    if (Array.isArray(range)) {
      range.forEach((pricing: any, index: number) => {
        if (
          index > 0 &&
          parseFloat(`${range[index - 1].surface}`) >= parseFloat(`${pricing.surface}`)
        ) {
          pricingErrors.push({
            id: index,
            message: "The surface must be greater than the surface above",
          });
        } else if (pricingErrors.find((curr) => curr.id == index)) {
          pricingErrors = pricingErrors.filter((curr: any) => curr.id !== index);
        }
        setPricingErrors([...pricingErrors]);
      });
    }

    if (pricingErrors.length > 0) {
      return;
    }

    try {
      const configId = parseInt(params.configId ?? "");
      const finalMaterialId = materialId ?? 0;

      const requestBody: any = {
        operation: 'add-custom',
        configId: configId, // Convertir en string
        materialId: finalMaterialId, // Convertir en string
        sizeData: formData.customSize, // Sérialiser en JSON string
        thickness: formData.thickness // Sérialiser en JSON string
      };

      console.log("=== Sending request body ===");
      console.log("Request body:", requestBody);

      settingfetcher.submit(requestBody, {
        action: "/api/size-manager",
        method: "POST",
        encType: "application/json"
      });

    } catch (error) {
      console.error('Network error:', error);
      showNotification('Network error occurred', 'error');
    }
  };

  const showNotification = (message: string, type: 'success' | 'error') => {
    // Votre logique de notification
    console.log(`${type.toUpperCase()}: ${message}`);
  };

  const sizes = localSizes?.map((currSize, index) => {
    return {
      id: `${index}`,
      title: currSize?.label,
      width: `${currSize?.width}`,
      height: `${currSize?.height}`,
      price: `${currSize?.basePrice}`,
      isDefault: currSize?.isDefault,
    };
  });

  const resourceName = {
    singular: "Size",
    plural: "sizes",
  };
  const { selectedResources, allResourcesSelected, handleSelectionChange } = useIndexResourceState(sizes);

  const [activePopoverId, setActivePopoverId] = useState<number | null>(null);
  const rowMarkup = sizes?.map(
    ({ id, title, width, height, price, isDefault }, index) => {
      const isActive = activePopoverId === index;

      return (
        <IndexTable.Row id={id} key={id} position={index}>
          <IndexTable.Cell>
            <InlineStack blockAlign="start" gap="300">
              {title}
            </InlineStack>
          </IndexTable.Cell>
          <IndexTable.Cell className="td-center dragable-ref">
            <Badge>{width}</Badge>
          </IndexTable.Cell>
          <IndexTable.Cell className="td-center">
            <Badge>{height}</Badge>
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
            {/* <ButtonGroup fullWidth={true} noWrap gap="loose">
              <EditIconBtn
                size="micro"
                onClick={() => {
                  handleUpdate(index);
                }}
              />
              <DeleteIconBtn
                size="micro"
                onClick={() => {
                  handeleDelete(index);
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
                  {
                    content: 'Delete', icon: DeleteIcon, onAction: () => {
                      console.log("=== DELETE BUTTON CLICKED ===");
                      handeleDelete(index);
                    }, destructive: true,
                  },
                ]}
              />
            </Popover>
          </IndexTable.Cell>
        </IndexTable.Row>
      )
    },
  );

  useEffect(() => {
    setFormData({
      customSize: customSize,
      thickness: thickness,
    })
  }, [customSize, thickness, materialId])
  return (
    <div>
      {!showEditSection ? (
        <div>
          <div>
            <Card>
              <BoxBackground>
                <Box padding="150">
                  <InlineStack gap="100" align="end">
                    {!(plan == PRICING_PLANS.STARTER && localSizes.length >= PRICING_PLANS.STARTER_RULES.materialSizes) && <button
                      className="primary-btn"
                      type="button"
                      onClick={handleEdit}
                    >
                      <Box paddingInline="300">
                        <InlineStack gap="300">
                          <PlusIcon />
                          <span className="primary-btn-text"> Add new SIZE</span>
                        </InlineStack>
                      </Box>
                    </button>}
                  </InlineStack>
                </Box>
                <Divider borderWidth="050" />
              </BoxBackground>
              <IndexTable
                resourceName={resourceName}
                itemCount={sizes ? sizes.length : 0}
                headings={[
                  { title: "Title" },
                  { title: "Width", alignment: "center" },
                  { title: "Height", alignment: "center" },
                  { title: "price", alignment: "center" },
                  { title: "Default", alignment: "center" },
                  { title: "Action", alignment: "center" },
                ]}
                selectable={false}
              >
                {rowMarkup}
              </IndexTable>

            </Card>
          </div>

          <SpacingBackground width="100%" height="auto" margin="16px 0px ">
            <Card>
              <div>
                <Form onSubmit={handleSubmit} method="POST">
                  <Box paddingInline="300" paddingBlock="1000">
                    <Box paddingBlockEnd="600">
                      <InlineStack blockAlign="center" gap="200">
                        <Text as="strong" variant="headingMd">
                          Enable Thickness
                        </Text>
                        <ReactSwitchCustom
                          checked={formData.thickness.active}
                          setChecked={(value: boolean) => {
                            formData.thickness.active = value;
                            handleInputChange("thickness", formData.thickness);
                          }}
                        />
                      </InlineStack>
                    </Box>
                    {formData.thickness.active && (
                      <BlockStack gap="400">
                        {formData.thickness.values?.map(
                          (thicknessValue: any, index: number) => {
                            const isObj = thicknessValue && typeof thicknessValue === "object";
                            const tv: ThicknessValue = isObj
                              ? thicknessValue
                              : { label: String(thicknessValue), value: thicknessValue, pricingType: "additional", additionalPrice: 0, multiplier: 1 };

                            const updateField = (field: string, val: any) => {
                              formData.thickness.values[index] = { ...tv, [field]: val };
                              handleInputChange("thickness", formData.thickness);
                            };

                            return (
                              <SpacingBackground key={index} border="1px solid #DDDDDD" borderRadius="5px">
                                <Box padding="300">
                                  <BlockStack gap="300">
                                    <InlineStack align="space-between" blockAlign="center" wrap={false}>
                                      <Text as="strong" variant="bodySm">Thickness {index + 1}</Text>
                                      <RemoveNowIconBtn onClick={() => handleDeleteThickness(index)} />
                                    </InlineStack>
                                    <Grid gap={{ lg: "10px" }}>
                                      <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 4, xl: 4 }}>
                                        <TextField
                                          label="Label (displayed to customer)"
                                          autoComplete="off"
                                          placeholder='e.g. 4mm, 10mm'
                                          value={tv.label}
                                          onChange={(val) => updateField("label", val)}
                                        />
                                      </Grid.Cell>
                                      <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 4, xl: 4 }}>
                                        <TextField
                                          label="Value (numeric)"
                                          autoComplete="off"
                                          pattern="[0-9]+([,.][0-9]+)?"
                                          value={`${tv.value}`}
                                          onChange={(val) => updateField("value", val)}
                                          onBlur={() => updateField("value", parseFloat(String(tv.value)) || 0)}
                                        />
                                      </Grid.Cell>
                                      <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 4, xl: 4 }}>
                                        <Select
                                          label="Pricing type"
                                          options={[
                                            { label: "Additional price (+)", value: "additional" },
                                            { label: "Multiplier (×)", value: "multiplier" },
                                          ]}
                                          value={tv.pricingType || "additional"}
                                          onChange={(val) => updateField("pricingType", val)}
                                        />
                                      </Grid.Cell>
                                      {(tv.pricingType === "additional" || !tv.pricingType) && (
                                        <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 4, xl: 4 }}>
                                          <TextField
                                            label="Additional price"
                                            autoComplete="off"
                                            pattern="[0-9]+([,.][0-9]+)?"
                                            prefix="+"
                                            value={`${tv.additionalPrice ?? 0}`}
                                            onChange={(val) => updateField("additionalPrice", val)}
                                            onBlur={() => updateField("additionalPrice", parseFloat(String(tv.additionalPrice)) || 0)}
                                            helpText="This amount is added to the total price when this thickness is selected."
                                          />
                                        </Grid.Cell>
                                      )}
                                      {tv.pricingType === "multiplier" && (
                                        <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 4, xl: 4 }}>
                                          <TextField
                                            label="Multiplier"
                                            autoComplete="off"
                                            pattern="[0-9]+([,.][0-9]+)?"
                                            prefix="×"
                                            value={`${tv.multiplier ?? 1}`}
                                            onChange={(val) => updateField("multiplier", val)}
                                            onBlur={() => updateField("multiplier", parseFloat(String(tv.multiplier)) || 1)}
                                            helpText="The total price is multiplied by this value when this thickness is selected."
                                          />
                                        </Grid.Cell>
                                      )}
                                    </Grid>
                                  </BlockStack>
                                </Box>
                              </SpacingBackground>
                            );
                          },
                        )}
                        <Box width="300px">
                          <BiAddBtn
                            title="Add Thickness"
                            handleClick={() => handleAddThickness()}
                          />
                        </Box>
                      </BlockStack>
                    )}
                  </Box>
                  {(plan == PRICING_PLANS.STARTER && PRICING_PLANS.STARTER_RULES.materialCustomSizes) || <><Divider borderWidth="050" />
                    <Box paddingInline="300" paddingBlock="1000">
                      <Box paddingBlockEnd="600">
                        <InlineStack blockAlign="center" gap="200">
                          <Text as="strong" variant="headingMd">
                            Custom Size
                          </Text>
                          <ReactSwitchCustom
                            checked={formData.customSize.active}
                            setChecked={(value: boolean) => {
                              formData.customSize.active = value;
                              handleInputChange("customSize", formData.customSize);
                            }}
                          />
                        </InlineStack>
                      </Box>
                      {formData.customSize.active && (
                        <Grid gap={{ lg: "30px" }}>
                          <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
                            <BlockStack gap="800">
                              <TextField
                                label="Width label"
                                value={`${formData.customSize.width.label}`}
                                onChange={(value) => {
                                  formData.customSize.width.label = value;
                                  handleInputChange("customSize", formData.customSize);
                                }}
                                autoComplete="on"
                                error={getError(actionData, "customSize.width.label")}
                              />
                              <TextField
                                size="medium"
                                label="Min width"
                                pattern="[0-9]+([,.][0-9]+)?"
                                value={`${formData.customSize.width.min}`}
                                onChange={(value) => {
                                  formData.customSize.width.min = value;
                                  handleInputChange("customSize", formData.customSize);
                                }}
                                onBlur={(value) => {
                                  formData.customSize.width.min = parseFloat(
                                    `${formData.customSize.width.min}`,
                                  );
                                  handleInputChange("customSize", formData.customSize);
                                }}
                                autoComplete="on"
                                error={getError(actionData, "customSize.width.min")}
                              />
                              <TextField
                                size="medium"
                                label="Max width"
                                pattern="[0-9]+([,.][0-9]+)?"
                                value={`${formData.customSize.width.max}`}
                                onChange={(value) => {
                                  formData.customSize.width.max = value;
                                  handleInputChange("customSize", formData.customSize);
                                }}
                                onBlur={(value) => {
                                  formData.customSize.width.max = parseFloat(
                                    `${formData.customSize.width.max}`,
                                  );
                                  handleInputChange("customSize", formData.customSize);
                                }}
                                autoComplete="on"
                                error={getError(actionData, "customSize.width.max")}
                              />
                            </BlockStack>
                          </Grid.Cell>
                          <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
                            <BlockStack gap="800">
                              <TextField
                                label="Height label"
                                value={`${formData.customSize.height.label}`}
                                onChange={(value) => {
                                  formData.customSize.height.label = value;
                                  handleInputChange("customSize", formData.customSize);
                                }}
                                autoComplete="on"
                                error={getError(actionData, "customSize.height.label")}
                              />

                              <TextField
                                size="medium"
                                label="Min height"
                                pattern="[0-9]+([,.][0-9]+)?"
                                value={`${formData.customSize.height.min}`}
                                onChange={(value) => {
                                  formData.customSize.height.min = value;
                                  handleInputChange("customSize", formData.customSize);
                                }}
                                onBlur={(value) => {
                                  formData.customSize.height.min = parseFloat(
                                    `${formData.customSize.height.min}`,
                                  );
                                  handleInputChange("customSize", formData.customSize);
                                }}
                                autoComplete="on"
                                error={getError(actionData, "customSize.height.min")}
                              />
                              <TextField
                                size="medium"
                                label="Max height"
                                pattern="[0-9]+([,.][0-9]+)?"
                                value={`${formData.customSize.height.max}`}
                                onChange={(value) => {
                                  formData.customSize.height.max = value;
                                  handleInputChange("customSize", formData.customSize);
                                }}
                                onBlur={(value) => {
                                  formData.customSize.height.max = parseFloat(
                                    `${formData.customSize.height.max}`,
                                  );
                                  handleInputChange("customSize", formData.customSize);
                                }}
                                autoComplete="on"
                                error={getError(actionData, "customSize.height.max")}
                              />
                            </BlockStack>
                          </Grid.Cell>
                          <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
                            <BlockStack gap="200">
                              <InlineStack gap="1000">
                                <Text as="h1" variant="headingMd" fontWeight="bold">
                                  Pricings
                                </Text>

                                <InlineStack blockAlign="center" gap="200">
                                  <Text as="strong" variant="headingMd">
                                    Price per Surface
                                  </Text>
                                  <ReactSwitchCustom
                                    checked={formData.customSize.pricings?.type === "unit"}
                                    setChecked={(value: boolean) => {
                                      if (!formData.customSize.pricings) {
                                        formData.customSize.pricings = {
                                          type: "unit",
                                          unit: { basePrice: 0, surface: 0, charPrice: 0 },
                                          range: [],
                                          rangePricingPerUnit: false,
                                        };
                                      }
                                      if (value) {
                                        formData.customSize.pricings.type = "unit";
                                        handleInputChange("customSize", formData.customSize);
                                      }
                                    }}
                                  />
                                </InlineStack>
                                <InlineStack blockAlign="center" gap="200">
                                  <Text as="strong" variant="headingMd">
                                    Price per interval of surface
                                  </Text>
                                  <ReactSwitchCustom
                                    checked={formData.customSize.pricings?.type === "range"}
                                    setChecked={(value: boolean) => {
                                      if (!formData.customSize.pricings) {
                                        formData.customSize.pricings = {
                                          type: "unit",
                                          unit: { basePrice: 0, surface: 0, charPrice: 0 },
                                          range: [],
                                          rangePricingPerUnit: false,
                                        };
                                      }
                                      if (value) {
                                        formData.customSize.pricings.type = "range";
                                        handleInputChange("customSize", formData.customSize);
                                      }
                                    }}
                                  />
                                </InlineStack>
                              </InlineStack>
                              <Grid gap={{ lg: "10px" }}>
                                {formData.customSize.pricings?.type == "range" && <Grid.Cell
                                  columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}
                                >
                                  <Box paddingBlock="600">

                                    <InlineStack blockAlign="center" gap="1000">
                                      <Text as="strong" variant="headingMd">
                                        Interval  pricing type :
                                      </Text>
                                      <InlineStack wrap={false} gap="200">

                                        <Text as="span" variant="headingSm">
                                          Additional price
                                        </Text>
                                        <ReactSwitchCustom
                                          checked={formData.customSize.pricings.rangePricingPerUnit ? false : true}
                                          setChecked={(value: boolean) => {
                                            if (value) {
                                              formData.customSize.pricings.rangePricingPerUnit = !formData.customSize.pricings.rangePricingPerUnit;
                                              handleInputChange("customSize", formData.customSize);
                                            }
                                          }}
                                        />


                                      </InlineStack>
                                      <InlineStack wrap={false} gap="200">

                                        <Text as="span" variant="headingSm">
                                          Price per unit of surface
                                        </Text>
                                        <ReactSwitchCustom
                                          checked={formData.customSize.pricings.rangePricingPerUnit ? true : false}
                                          setChecked={(value: boolean) => {
                                            if (value) {
                                              formData.customSize.pricings.rangePricingPerUnit = !formData.customSize.pricings.rangePricingPerUnit;
                                              handleInputChange("customSize", formData.customSize);
                                            }
                                          }}
                                        />


                                      </InlineStack>
                                    </InlineStack>
                                  </Box>

                                </Grid.Cell>}
                                {formData.customSize.pricings?.type == "range" && formData.customSize.pricings?.range?.map(
                                  (pricing: any, index: number) => (
                                    <Grid.Cell
                                      columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}
                                    >
                                      <BlockStack>
                                        <Bleed marginBlockEnd="400">
                                          <InlineStack wrap={false} align="end" gap="200">
                                            <RemoveNowIconBtn
                                              onClick={() => handleDeletePricing(index)}
                                            />
                                          </InlineStack>
                                        </Bleed>

                                        <Grid>
                                          <Grid.Cell
                                            columnSpan={{
                                              xs: 6,
                                              sm: 6,
                                              md: 2,
                                              lg: 4,
                                              xl: 4,
                                            }}
                                          >
                                            <TextField
                                              label="Surface maximum"
                                              pattern="[0-9]+([,.][0-9]+)?"
                                              autoComplete="off"
                                              min={0}
                                              onChange={(value) => {
                                                formData.customSize.pricings.range[
                                                  index
                                                ].surface = value;
                                                handleInputChange(
                                                  "customSize",
                                                  formData.customSize,
                                                );
                                              }}
                                              onBlur={(value) => {
                                                formData.customSize.pricings.range[
                                                  index
                                                ].surface = parseFloat(
                                                  `${formData.customSize.pricings.range[index].surface || "0"}`,
                                                );
                                                handleInputChange(
                                                  "customSize",
                                                  formData.customSize,
                                                );
                                              }}
                                              value={`${pricing.surface}`}
                                              suffix={<Text as="span">
                                                {configuration.data?.settings?.customizerSign?.customizerOptions?.measurementUnit}<sup>2</sup>
                                              </Text>}
                                            />
                                          </Grid.Cell>
                                          <Grid.Cell
                                            columnSpan={{
                                              xs: 6,
                                              sm: 6,
                                              md: 2,
                                              lg: 4,
                                              xl: 4,
                                            }}
                                          >
                                            <TextField
                                              label={
                                                formData.customSize.pricings.rangePricingPerUnit ?
                                                  "Price  per  unit of surface" :
                                                  "Additional Price"
                                              }
                                              pattern="[0-9]+([,.][0-9]+)?"
                                              autoComplete="off"
                                              onChange={(value) => {
                                                formData.customSize.pricings.range[
                                                  index
                                                ].basePrice = value;
                                                handleInputChange(
                                                  "customSize",
                                                  formData.customSize,
                                                );
                                              }}
                                              onBlur={(value) => {
                                                formData.customSize.pricings.range[
                                                  index
                                                ].basePrice = parseFloat(
                                                  `${formData.customSize.pricings.range[index].basePrice || "0"}`,
                                                );
                                                handleInputChange(
                                                  "customSize",
                                                  formData.customSize,
                                                );
                                              }}
                                              value={`${pricing.basePrice}`}
                                            />
                                          </Grid.Cell>
                                          <Grid.Cell
                                            columnSpan={{
                                              xs: 6,
                                              sm: 6,
                                              md: 2,
                                              lg: 4,
                                              xl: 4,
                                            }}
                                          >
                                            <TextField
                                              label="Char price"
                                              autoComplete="off"
                                              pattern="[0-9]+([,.][0-9]+)?"
                                              onChange={(value) => {
                                                formData.customSize.pricings.range[
                                                  index
                                                ].charPrice = value;
                                                handleInputChange(
                                                  "customSize",
                                                  formData.customSize,
                                                );
                                              }}
                                              onBlur={(value) => {
                                                formData.customSize.pricings.range[
                                                  index
                                                ].charPrice = parseFloat(
                                                  `${formData.customSize.pricings.range[index].charPrice || "0"}`,
                                                );
                                                handleInputChange(
                                                  "customSize",
                                                  formData.customSize,
                                                );
                                              }}
                                              value={`${pricing.charPrice}`}
                                            />
                                          </Grid.Cell>
                                        </Grid>

                                        {pricingErrors.find(
                                          (curr: any) => curr.id == index,
                                        ) && (
                                            <InlineError
                                              message={
                                                pricingErrors.find(
                                                  (curr: any) => curr.id == index,
                                                )?.message || ""
                                              }
                                              fieldID={`field${index}`}
                                            />
                                          )}
                                      </BlockStack>
                                    </Grid.Cell>
                                  ),
                                )}

                                {formData.customSize.pricings?.type == "unit" && <Grid.Cell
                                  columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}
                                >

                                  <Grid>
                                    <Grid.Cell
                                      columnSpan={{
                                        xs: 6,
                                        sm: 6,
                                        md: 2,
                                        lg: 4,
                                        xl: 4,
                                      }}
                                    >
                                      <TextField
                                        label="Surface"
                                        pattern="[0-9]+([,.][0-9]+)?"
                                        autoComplete="off"
                                        onChange={(value) => {
                                          formData.customSize.pricings.unit.surface = value;
                                          handleInputChange(
                                            "customSize",
                                            formData.customSize,
                                          );
                                        }}
                                        onBlur={(value) => {
                                          formData.customSize.pricings.unit.surface = parseFloat(
                                            `${formData.customSize.pricings.unit.surface || "0"}`,
                                          );
                                          handleInputChange(
                                            "customSize",
                                            formData.customSize,
                                          );
                                        }}
                                        value={`${formData.customSize.pricings.unit.surface}`}
                                        suffix={<Text as="span">
                                          {configuration.data?.settings?.customizerSign?.customizerOptions?.measurementUnit}<sup>2</sup>
                                        </Text>}
                                      />
                                    </Grid.Cell>
                                    <Grid.Cell
                                      columnSpan={{
                                        xs: 6,
                                        sm: 6,
                                        md: 2,
                                        lg: 4,
                                        xl: 4,
                                      }}
                                    >
                                      <TextField
                                        label="Base price"
                                        pattern="[0-9]+([,.][0-9]+)?"
                                        autoComplete="off"
                                        onChange={(value) => {
                                          formData.customSize.pricings.unit.basePrice = value;
                                          handleInputChange(
                                            "customSize",
                                            formData.customSize,
                                          );
                                        }}
                                        onBlur={(value) => {
                                          formData.customSize.pricings.unit.basePrice = parseFloat(
                                            `${formData.customSize.pricings.unit.basePrice || "0"}`,
                                          );
                                          handleInputChange(
                                            "customSize",
                                            formData.customSize,
                                          );
                                        }}
                                        value={`${formData.customSize.pricings.unit.basePrice}`}
                                      />
                                    </Grid.Cell>
                                    <Grid.Cell
                                      columnSpan={{
                                        xs: 6,
                                        sm: 6,
                                        md: 2,
                                        lg: 4,
                                        xl: 4,
                                      }}
                                    >
                                      <TextField
                                        label="Char price"
                                        pattern="[0-9]+([,.][0-9]+)?"
                                        autoComplete="off"
                                        onChange={(value) => {
                                          formData.customSize.pricings.unit.charPrice = value;
                                          handleInputChange(
                                            "customSize",
                                            formData.customSize,
                                          );
                                        }}
                                        onBlur={(value) => {
                                          formData.customSize.pricings.unit.charPrice = parseFloat(
                                            `${formData.customSize.pricings.unit.charPrice || "0"}`,
                                          );
                                          handleInputChange(
                                            "customSize",
                                            formData.customSize,
                                          );
                                        }}
                                        value={`${formData.customSize.pricings.unit.charPrice}`}
                                      />
                                    </Grid.Cell>
                                  </Grid>
                                </Grid.Cell>}


                              </Grid>
                              {!pricingErrors?.length && formData.customSize.pricings?.type == "range" && (
                                <Box width="300px">
                                  <BiAddBtn
                                    title="Add pricing"
                                    handleClick={() => handleAddPricing()}
                                  />
                                </Box>
                              )}
                            </BlockStack>
                          </Grid.Cell>
                        </Grid>
                      )}
                    </Box></>}
                  <Divider borderWidth="050" />
                  <Box paddingInline="300" paddingBlock="300">
                    <InlineStack align="end" gap="600">
                      <BiSaveBtn isLoading={isSubmitting} title="Save" />
                    </InlineStack>
                  </Box>
                </Form>
              </div>

            </Card>
          </SpacingBackground>
        </div>

      ) : (
        <MaterialSizeEdit
          allSizes={localSizes}
          id={currentSizeID}
          onClick={setShowEditSection}
          edit={edit}
          materialId={materialId}
          onUpdateSizes={setLocalSizes}
        />
      )}
    </div>
  );
}

const thicknessValueSchema = z.union([
  z.number(),
  z.string(),
  z.object({
    label: z.string(),
    value: z.union([z.number(), z.string()]),
    pricingType: z.enum(["additional", "multiplier"]).default("additional"),
    additionalPrice: z.union([z.number(), z.string()]).default(0),
    multiplier: z.union([z.number(), z.string()]).default(1),
  }),
]);

const formSchema = z.object({
  thickness: z
    .any()
    .transform(jsonTransform)
    .pipe(
      z.object({
        active: z.boolean(),
        values: z.array(thicknessValueSchema),
      }),
    ),

  customSize: z
    .any()
    .transform(jsonTransform)
    .pipe(
      z.object({
        active: z.boolean(),
        width: z.object({
          label: z
            .string({ required_error: "Width label is required" })
            .min(3, "Width label is too short")
            .max(100, "Width label is too long"),
          min: z.number({
            required_error: "Width min is required",
          }),
          max: z.number({
            required_error: "Width max is required",
          }),
        }),

        height: z.object({
          label: z
            .string({ required_error: "Height label is required" })
            .min(3, "Height label is too short")
            .max(100, "Height label is too long"),
          min: z.number({
            required_error: "Height min is required",
          }),
          max: z.number({
            required_error: "Height max is required",
          }),
        }),
        pricings: z.any().transform(jsonTransform),
      }),
    ),
});
export const action = async ({ request, params }: ActionFunctionArgs) => {
  console.log("=== ACTION CALLED ===");
  console.log("ACTION - Action called with method:", request.method);

  const { session, admin } = await authenticate.admin(request);

  const configId = parseInt(params.configId ?? "");
  const mId = parseInt(params.mId ?? "");

  const method = request.method;
  const formData = await request.formData();

  switch (method) {
    case "DELETE": {
      const id = formData.get("id") as string;
      console.log("Action DELETE - Calling MaterialSizeService.delete with:", { configId, sessionId: session.id, mId, id: parseInt(id || "") });

      const result = await MaterialSizeService.delete(
        configId,
        session.id,
        mId,
        parseInt(id || ""),
      );

      console.log("Action DELETE - MaterialSizeService.delete result:", result);

      return json({
        ...jFlashMessage("Size deleted successfully"),
        success: true,
        data: result
      });
      break;
    }

    case "PUT": {
      const id = formData.get("id") as string;
      console.log("Action PUT - Calling MaterialSizeService.setDefault with:", { configId, sessionId: session.id, mId, id: parseInt(id || "") });

      const result = await MaterialSizeService.setDefault(
        configId,
        session.id,
        mId,
        parseInt(id || ""),
      );

      console.log("Action PUT - MaterialSizeService.setDefault result:", result);

      return json({
        ...jFlashMessage("Default size set successfully"),
      });
      break;
    }

    case "POST": {
      const submission = parseWithZod(formData, { schema: formSchema });

      if (submission.status !== "success") {
        return json({ status: false, message: null, errors: submission.error });
      }

      let {
        customSize,
        thickness,
      }: { customSize: any; thickness: any } =
        submission.value;
      if (customSize) {
        let res = await MaterialSizeService.addCustomSizeAndThickness(
          configId,
          session.id,
          mId,
          customSize,
          thickness,
        ); // Custom Size  updated is completed successfully
        return res
          ? json({
            ...jFlashMessage(
              "Custom Size and thickness updated successfully",
            ),
          })
          : json({
            ...jFlashMessage(
              "Errors on Custom Size and thickness updating",
              "error",
            ),
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
