import {
  ActionList,
  Badge,
  BlockStack,
  Box,
  Button,
  ButtonGroup,
  Card,
  Icon,
  IndexTable,
  InlineStack,
  Listbox,
  Popover,
  Text,
} from "@shopify/polaris";
import { DeleteIconBtn } from "~/components/buttons/DeleteIconBtn";
import { EditIconBtn } from "~/components/buttons/EditIconBtn";
import {
  json,
  useLoaderData,
  useNavigate,
  useOutletContext,
  useSubmit,
} from "@remix-run/react";
import { BoxBackground } from "~/components/layouts/BoxBackground";
import PlusIcon from "~/components/icons/PlusIcon";
import { SpacingBackground } from "~/components/layouts/SpacingBackground";
import useHandleFlashMessage from "~/hooks/useHandleFlashMessage";
import { authenticate } from "~/shopify.server";
import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import MaterialService from "~/models/Material.service";
import {
  Material,
  MaterialAdvance,
  MaterialAdvanceComponentType,
  MaterialSimple,
} from "~/types/ConfigDataType";
import { jFlashMessage } from "~/utils/message-flash";
import { BorderCircleText } from "~/components/feactures/BorderCircleText";
import { truncateText } from "~/utils/truncate-text";
import { fileUrl } from "~/utils/fileUrl";
import { ManageBtn } from "~/components/buttons/ManageBtn";
import { PRICING_PLANS } from "~/utils/pricing";
import { useEffect, useState } from "react";
import { ConfigurationType } from "~/types/ConfigurationType";

import SimpleMateriels from "./app.configuration.$configId.materials_.$mId.simple";
import MaterialAdvancedIndex from "./app.configuration.$configId.materials_.$mId.advance._index";
import {
  DeleteIcon,
  EditIcon,
  MenuHorizontalIcon,
} from "@shopify/polaris-icons";
import { BorderType, FixingMethodType, ShapeType } from "~/types/SettingsType";
import MaterialAdvanceComponentService from "~/models/MaterialAdvanceComponent.service";

// export const loader = async ({ request, params }: LoaderFunctionArgs) => {
//   const { session, admin, billing } = await authenticate.admin(request);
//   await proSubscriptionRequired(billing,session?.shop, admin);
//   const configId = parseInt(params.configId ?? "");
//   const mId = parseInt(params.mId ?? "");
//   console.log("configID materialID", configId, mId);

//   let additionalOptions: ConfigAdditionalOption[] | null = null;

//   if (!Number.isNaN(configId) && !Number.isNaN(mId)) {
//     additionalOptions = await MaterialAdditionalOptionService.getAll(
//       session.id,
//       configId,
//       mId,
//     );
//   }

//   return json({ additionalOptions });
// };
// export const loader = async ({ request, params }: LoaderFunctionArgs) => {
//   const { session, admin } = await authenticate.admin(request);
//   const configId = parseInt(params.configId ?? "");
//   const mId = parseInt(params.mId ?? "");
//   console.log('configID materialID', configId, mId);

//   let materialComponents: MaterialAdvanceComponentType[] | null = null;

//   if ( !Number.isNaN(configId)  && !Number.isNaN(mId) ) {
//     materialComponents = await MaterialAdvanceComponentService.getAll(session.id, configId, mId);

//   }

//   return json({materialComponents });
// };

export default function MaterialIndex() {
  const submit = useSubmit();
  let { materials, plan, manageFixingMethods, manageShapes, manageBorders, materialType } =
    useOutletContext<{
      materials: Material[];
      plan: string;
      manageFixingMethods: FixingMethodType[];
      manageShapes: ShapeType[];
      manageBorders: BorderType[];
      materialType: string
    }>();

  useHandleFlashMessage();

  const navigate = useNavigate();

  const handeleDelete = (id: number) => {
    submit({ id: id }, { method: "DELETE" });
    if( selectedMaterialIndex == id && id > 0 ){
      if(!(selectedMaterialIndex-1 < 0)){
        handleManage((selectedMaterialIndex-1), materials[(selectedMaterialIndex-1)].type)
      }
    }
  };

  const handleUpdate = (id: number) => {
    submit({ id: id }, { method: "GET", action: "edit" });
  };

  const handleEdit = () => {
    navigate("edit");
  };
  const { configuration } = useOutletContext<{
    configuration: ConfigurationType;
  }>();

  console.log(materialType, "materialType", configuration)

  const [selectedMaterialIndex, setSelectedMaterialIndex] = useState<number>(0);
  const [selectedMaterial, setSelectedMaterial] = useState<
    MaterialSimple | MaterialAdvance | undefined
  >(materials.length > 0 ? materials[0] : undefined);
  const [selectedMaterialType, setSelectedMaterialType] = useState<
    string | null
  >(materials.length > 0 ? materials[0].type : null);

  const handleManage = async (index: number, type: string) => {
    // navigate(type == "simple" ? `${index}/simple` : `${index}/advance`);
    setSelectedMaterialIndex(index);
    setSelectedMaterialType(type);
    setSelectedMaterial(materials[index]);

    if (selectedMaterialType == "advance") {
      // let { materialComponents } = useLoaderData<typeof loader>();
      console.log(selectedMaterial, "7777", materials[index])
      // useEffect(() => {
      //   const fetchComponents = async () => {
      //     // setLoading(true);
      //     try {
      //       const response = await fetch("/api/get-material-components", {
      //         method: "POST",
      //         headers: { "Content-Type": "application/json" },
      //         body: JSON.stringify({
      //           configId: 1,
      //           mId: 2,
      //           extraParam: 99, // valeur que tu veux
      //         }),
      //       });

      //       const data = await response.json();
      //       console.log(data.materialComponents || [], "advance comp");
      //     } catch (err) {
      //       console.error("Erreur lors du fetch", err);
      //     } finally {
      //       // setLoading(false);
      //     }
      //   };

      //   fetchComponents();
      // }, []);
    }
  };

  const resourceName = {
    singular: "Material",
    plural: "Materials",
  };

  const rowMarkup = materials?.map(
    ({ name, description, icon, popImg, type }, index) => (
      <IndexTable.Row id={`${index}`} key={`${index}`} position={index}>
        <IndexTable.Cell>
          <InlineStack blockAlign="center" wrap={false} gap="300">
            <BorderCircleText
              onClick={() => handleManage(index, type)}
              text={name}
            />
            <span
              className="btn-span"
              onClick={() => handleManage(index, type)}
            >
              {truncateText(name)}
            </span>
          </InlineStack>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <span className="btn-span" onClick={() => handleManage(index, type)}>
            {truncateText(description)}
          </span>
        </IndexTable.Cell>
        <IndexTable.Cell className="td-center">
          {icon && (
            <img
              style={{ height: "30px" }}
              src={fileUrl(icon)}
              alt={"product thumbnail" + name}
            />
          )}
        </IndexTable.Cell>

        <IndexTable.Cell className="td-center">
          <Badge tone={type == "simple" ? "info" : "success"}>{type}</Badge>
        </IndexTable.Cell>

        <IndexTable.Cell className="td-center">
          <ButtonGroup fullWidth={true} noWrap gap="loose">
            <ManageBtn
              title="Manage"
              handleClick={() => handleManage(index, type)}
            />
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
          </ButtonGroup>
        </IndexTable.Cell>
      </IndexTable.Row>
    ),
  );

  const [active, setActive] = useState(false);
  const [activePopoverId, setActivePopoverId] = useState<number | null>(null);

  const [localMaterials, setLocalMaterials] = useState(materials);
  // const togglePopover = useCallback(() => setActive((active) => !active), []);
  const listMarkup = localMaterials?.map(
    ({ name, description, icon, popImg, type }, index) => {
      const isActive = activePopoverId === index;

      return (

        <div
          style={{
            // width: "100%",
            backgroundColor: selectedMaterialIndex == index ? "rgba(1, 100, 100, 0.9)" : "transparent",
            color: selectedMaterialIndex == index ? "white" : "",
            display: "flex",
            gap: "4px",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "3px 10px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
          onClick={() => handleManage(index, type)}
        >
          <div>{truncateText(name)}</div>

          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <Popover
              active={isActive}
              activator={
                <Button
                  onClick={() => setActivePopoverId(isActive ? null : index)}
                  icon={<Icon source={MenuHorizontalIcon} />}
                />
              }
              onClose={() => setActivePopoverId(null)}
              preferredAlignment="right"
            >
              <ActionList
                items={[
                  {
                    content: "Edit",
                    icon: EditIcon,
                    onAction: () => handleUpdate(index),
                  },
                  // { content: 'Duplicate', icon: DuplicateIcon, onAction: () => handeleDuplicate(index) },
                  {
                    content: "Delete",
                    icon: DeleteIcon,
                    onAction: () => handeleDelete(index),
                    destructive: true,
                  },
                ]}
              />
            </Popover>
          </div>
        </div>
      );
    },
  );

  const refreshMaterial = async (key: string, data: object) => {
    if (!selectedMaterial) return;

    const updatedMaterial: MaterialSimple | MaterialAdvance = {
      ...selectedMaterial,
      data: {
        ...selectedMaterial.data,
        [key]: data,
      },
    };

    setSelectedMaterial(updatedMaterial);

    const newMaterials = materials.map((material, id) =>
      selectedMaterialIndex === id ? updatedMaterial : material,
    );

    setLocalMaterials(newMaterials);

    // Save to server
    try {
      const response = await fetch(`/api/manages-data`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          materials: newMaterials,
          configId: configuration.id,
        }),
      });
      if (!response.ok) {
        // Handle error
        console.error("Failed to save materials");
      }
    } catch (error) {
      console.error("Error saving materials:", error);
    }
  };

  useEffect(()=>{
    setLocalMaterials([...materials])
  }, [materials, ])

  return (
    <div>
      <div
        style={{
          display: "flex",
          height: "94.5%",
          padding: "10px",
          backgroundColor: "transparent",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flexWrap: "wrap",
            width: "100%",
            gap: "8px",
          }}
        >
          {/* <div className="material_sidebar"> */}
          <div className="">

            <div 
              style={{
                position: "fixed",
                left: "50%",
                transform: "translateX(-50%)",
                top: "",
                width:"94.5%", 
                height:"auto", 
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center", 
                background: "white", 
                paddingInline: "8px", 
                border:"1px solid #DDDDDD", 
                borderRadius: "12px", 
                overflow: "hidden",
                zIndex: "20"
              }}
            >
              <div
                style={{
                  paddingBlock: "6px",
                  display: "flex",
                  overflowX: "auto",
                  flexGrow: "1"
                }}
              >
                {listMarkup}

              </div>
              {!(
                plan == PRICING_PLANS.STARTER &&
                materials.length >= PRICING_PLANS.STARTER_RULES.materials
              ) && (
                <button
                  className="primary-btn"
                  type="button"
                  onClick={handleEdit}
                >
                  <Box paddingInline="300">
                    <InlineStack gap="300">
                      {/* <PlusIcon /> */}
                      <span className="primary-btn-text">
                        {" "}
                        Add new Material
                      </span>
                    </InlineStack>
                  </Box>
                </button>
              )}
              
            </div>

          </div>

          {/* <div className="material_contents"> */}
          <div className="" style={{paddingTop: selectedMaterialType != "simple" ? "52px" : "45px"}}>
            {selectedMaterialType != "simple" && 
              <Card>
                <InlineStack>
                  <InlineStack gap="100" align="start">
                    {selectedMaterial?.popImg && (
                      <div>
                        <img src={selectedMaterial?.popImg} alt="" />
                      </div>
                    )}
                    <div>
                      <Text as="h2" variant="headingLg">
                        {selectedMaterial?.name}
                      </Text>
                      <Text
                        as="p"
                        variant="headingMd"
                        tone="subdued"
                        fontWeight="medium"
                      >
                        {selectedMaterial?.description}
                      </Text>
                    </div>
                  </InlineStack>
                </InlineStack>
              </Card>
            }
            <div>
              {selectedMaterialIndex !== null ? (
                selectedMaterialType === "simple" ? (
                  <SimpleMateriels
                    configuration={{ ...configuration, data: { materials } }}
                    plan={plan}
                    materialIndex={selectedMaterialIndex}
                    manageFixingMethods={manageFixingMethods}
                    manageShapes={manageShapes}
                    manageBorders={manageBorders}
                    refreshMaterial={refreshMaterial}
                  />
                ) : (
                  <MaterialAdvancedIndex
                    // configuration={{ ...configuration }}
                    materialId={selectedMaterialIndex}
                    materialComponents={
                      selectedMaterial?.data as any as MaterialAdvanceComponentType[]
                    }
                    manageFixingMethods={manageFixingMethods}
                    manageShapes={manageShapes}
                  />
                )
              ) : (
                <p
                  style={{
                    padding: "20px",
                    justifyContent: "center",
                    alignContent: "center",
                  }}
                >
                  Empty material
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const { session, admin } = await authenticate.admin(request);

  const formData = await request.formData();
  const id = formData.get("id") as string;
  const configId = parseInt(params.configId ?? "");
  const method = request.method;

  switch (method) {
    case "DELETE": {
      console.log("start deleting");
      await MaterialService.delete(configId, session.id, parseInt(id));
      return json({
        ...jFlashMessage("Configuration deleting is completed successfully"),
      });
      break;
    }

    default:
      break;
  }

  return null;
};
