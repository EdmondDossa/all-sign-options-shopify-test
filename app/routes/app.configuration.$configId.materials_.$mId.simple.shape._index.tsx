import {
  ActionList,
  Badge,
  Box,
  Button,
  ButtonGroup,
  Card,
  Divider,
  Icon,
  IndexTable,
  InlineStack,
  Popover,
} from "@shopify/polaris";
import { DeleteIconBtn } from "~/components/buttons/DeleteIconBtn";
import { EditIconBtn } from "~/components/buttons/EditIconBtn";
import {
  useFetcher,
  useNavigate,
  useNavigation,
  useOutletContext,
  useParams,
  useSubmit,
} from "@remix-run/react";
import { BoxBackground } from "~/components/layouts/BoxBackground";
import PlusIcon from "~/components/icons/PlusIcon";
import { ShapeType } from "~/types/SettingsType";
import { ConfigShape } from "~/types/ConfigDataType";
import useHandleFlashMessage from "~/hooks/useHandleFlashMessage";
import { ActionFunctionArgs, json } from "@remix-run/node";
import { authenticate } from "~/shopify.server";
import MaterialShapeService from "~/models/MaterialShape.service";
import { jFlashMessage } from "~/utils/message-flash";
import { ReactSwitchCustom } from "~/components/inputs/ReactSwitchCustom";
import { fileUrl } from "~/utils/fileUrl";

import MaterialShapeEdit from "./app.configuration.$configId.materials_.$mId.simple.shape.edit";
import { useEffect, useState } from "react";
import { DeleteIcon, EditIcon, MenuHorizontalIcon } from "@shopify/polaris-icons";

interface MaterialShapeProps {
  manageShapes: ShapeType[],
  plan: string;
  shapes: ConfigShape[];
  materialId: number | undefined
}
export default function MaterialShape({ materialId, manageShapes, shapes, plan }: MaterialShapeProps) {
  const submit = useSubmit();
  const navigate = useNavigate();
  const params = useParams();

  const deleteFetcher = useFetcher() as any;
  const setDefaultFetcher = useFetcher() as any;
  const bulkUpdateFetcher = useFetcher() as any;

  // let { manageShapes, shapes } = useOutletContext<{
  //   manageShapes: ShapeType[];
  //   shapes: ConfigShape[];
  // }>();
  useHandleFlashMessage();

  const navigation = useNavigation();
  let isLoading = navigation.state == "loading";
  // let isSubmitting = navigation.state == "submitting";
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [localShapes, setLocalShapes] = useState<ConfigShape[]>(shapes);
  // console.log(localShapes, "777")

  useEffect(() => {
    setLocalShapes(shapes);
  }, [shapes]);

  const handeleDelete = async (id: number) => {
    console.log("=== handeleDelete called with ID:", id, "===");
    
    try {
      const configId = parseInt(params.configId ?? "");
      const mId = parseInt(params.mId ?? "");
      
      // Utiliser materialId des props (qui est l'index du matériau)
      const finalMaterialId = materialId ?? 0;
      
      const requestBody = {
        operation: 'delete',
        configId,
        materialId: finalMaterialId,
        shapeId: id
      };
      

      deleteFetcher.submit(requestBody, {
        method: "POST",
        action: "/api/shape-manager",
        encType: "application/json",
      })

    } catch (error) {
      console.error("Error deleting shape:", error);
      if (error instanceof Error) {
        console.error("Error details:", error.message);
        console.error("Error stack:", error.stack);
      }
    }
  };

  const handeleDefault = async (id: number) => {
    // Mettre à jour l'état local immédiatement pour l'UI
    const updatedShapes = localShapes.map((curr, index) => {
      if (index === id) {
        return { ...curr, isDefault: true };
      } else {
        return { ...curr, isDefault: false };
      }
    });

    setLocalShapes(updatedShapes);
    console.log("Setting size as default - ID:", id, "Updated localShapes:", updatedShapes);
    
    try {
      const configId = parseInt(params.configId ?? "");
      
      // Utiliser materialId des props (qui est l'index du matériau)
      const finalMaterialId = materialId ?? 0;
      
      console.log("Calling MaterialSizeService.setDefault with:", { configId, materialId: finalMaterialId, id });
      
      // Utiliser la route API dédiée
      
      // Utiliser la route API dédiée
      console.log("Sending POST request to /api/set-default-size");
      
      const requestBody = {
        operation: 'set-default',
        configId,
        materialId: finalMaterialId,
        shapeId: id
      };

      setDefaultFetcher.submit(requestBody, {
        method: "POST",
        action: "/api/shape-manager",
        encType: "application/json",
      })
      
      // console.log("=== Request body being sent for set-default ===");
      // console.log("Request body:", requestBody);
      // console.log("materialId type:", typeof finalMaterialId, "value:", finalMaterialId);
      
      // // const response = await fetch('/api/set-default-size', {
      // const response = await fetch('/api/shape-manager', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(requestBody)
      // });
      
      // if (response.ok) {
      //   console.log("Size set as default successfully");
      // } else {
      //   console.error("Failed to set size as default");
      //   // En cas d'erreur, remettre l'état précédent
      //   setLocalShapes(shapes);
      // }
    } catch (error) {
      console.error("Error setting size as default:", error);
      // En cas d'erreur, remettre l'état précédent
      setLocalShapes(shapes);
    }
  };

  const [showEditSection, setShowEditSection] = useState<boolean>(false)
  const [edit, setEdit] = useState<boolean>(false)
  const [currentShapeID, setCurrentShapeID] = useState<number>(0)
  const handleUpdate = (id: number) => {
    // submit({ id: id }, { method: "GET", action: "edit" });
    setShowEditSection(true)
    setEdit(true)
    setCurrentShapeID(id)
  };

  const handleEdit = () => {
    // navigate("edit");
    setEdit(false)
    setShowEditSection(true)
  };

  // const shapesTab = shapes
  const shapesTab = localShapes
    ? shapes.map((currShapes, index) => {
        let shape = manageShapes ? manageShapes[currShapes?.shapeId] : null;
        return {
          id: `${index}`,
          title: `${shape?.name}`,
          image: shape?.icon,
          price: `${currShapes?.additionalPrice}`,
          isDefault: currShapes?.isDefault,
        };
      })
    : [];

  const resourceName = {
    singular: "Shape",
    plural: "Shapes",
  };

  const [activePopoverId, setActivePopoverId] = useState<number | null>(null);
  const rowMarkup = shapesTab.map(
    ({ id, title, image, price, isDefault }, index) => {
      const isActive = activePopoverId === index;
      return(
        <IndexTable.Row id={id} key={id} position={index}>
          <IndexTable.Cell>
            <InlineStack blockAlign="start" gap="300">
              {title}
            </InlineStack>
          </IndexTable.Cell>
          <IndexTable.Cell className="td-center">
            {image && (
              <img
                style={{ height: "30px" }}
                src={fileUrl(image)}
                alt={"border" + title}
              />
            )}
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
          <Card>
            <BoxBackground>
              <Box padding="150">
                {manageShapes?.length == shapes.length || (
                  <InlineStack gap="100" align="end">
                    <button
                      className="primary-btn"
                      type="button"
                      onClick={handleEdit}
                    >
                      <Box paddingInline="300">
                        <InlineStack gap="300">
                          <PlusIcon />
                          <span className="primary-btn-text"> Add new shape</span>
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
              itemCount={shapesTab.length}
              headings={[
                { title: "Title" },
                { title: "Image", alignment: "center" },
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

      ) : (
        <MaterialShapeEdit manageShapes={manageShapes} shapes={localShapes} id={currentShapeID} onClick={setShowEditSection} edit={edit} materialId={materialId} onUpdateShapes={setLocalShapes} />
      )}
    </div>
  );
}

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const { session, admin } = await authenticate.admin(request);

  const configId = parseInt(params.configId ?? "");
  const mId = parseInt(params.mId ?? "");

  const method = request.method;
  const formData = await request.formData();

  switch (method) {
    case "DELETE": {
      const id = formData.get("id") as string;
      console.log("start deleting");
      await MaterialShapeService.delete(
        configId,
        session.id,
        mId,
        parseInt(id || ""),
      );
      return json({
        ...jFlashMessage(
          "Material fixing method deleted successfully",
        ),
      });
      break;
    }
    case "PUT": {
      const id = formData.get("id") as string;
      await MaterialShapeService.setDefault(
        configId,
        session.id,
        mId,
        parseInt(id || ""),
      );
      return json({
        ...jFlashMessage("Default shape set successfully"),
      });
      break;
    }
    default:
      break;
  }
  return null;
};
