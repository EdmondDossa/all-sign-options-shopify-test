import {
  ActionList,
  Badge,
  BlockStack,
  Box,
  Button,
  ButtonGroup,
  Card,
  Divider,
  Icon,
  IndexTable,
  InlineStack,
  Popover,
  Text
} from "@shopify/polaris";

import { DeleteIconBtn } from "~/components/buttons/DeleteIconBtn";
import { EditIconBtn } from "~/components/buttons/EditIconBtn";
import { useFetcher, useNavigate, useOutletContext, useParams, useRevalidator, useSubmit } from "@remix-run/react";
import { BoxBackground } from "~/components/layouts/BoxBackground";
import { SpacingBackground } from "~/components/layouts/SpacingBackground";
import PlusIcon from "~/components/icons/PlusIcon";
import { MaterialAdvanceOptionType } from "~/types/ConfigDataType";
import useHandleFlashMessage from "~/hooks/useHandleFlashMessage";
import { ActionFunctionArgs, json } from "@remix-run/node";
import { authenticate } from "~/shopify.server";
import MaterialAdvancedOptionService from "~/models/MaterialAdvancedOption.service";
import { jFlashMessage } from "~/utils/message-flash";
import { ReactSwitchCustom } from "~/components/inputs/ReactSwitchCustom";
import { truncateText } from "~/utils/truncate-text";
import { fileUrl } from "~/utils/fileUrl";
import { useState, useEffect, useRef } from "react";
import { DeleteIcon, EditIcon, MenuHorizontalIcon } from "@shopify/polaris-icons";
import MaterialComponentCreate from "./app.configuration.$configId.materials_.$mId.advance.$cId.edit";
import RayStartArrowIcon from "~/components/icons/RayStartArrowIcon";
import { FixingMethodType, ShapeType } from "~/types/SettingsType";


interface AdvanceMaterialItemsProps {
  // configuration: ConfigurationType;
  materialOptions: MaterialAdvanceOptionType[] | undefined,
  materialId: number | undefined,
  componentId: number | undefined,
  onClick: (id: boolean) => void,
  manageShapes: ShapeType[];
  manageFixingMethods: FixingMethodType[];
}
// This example is for guidance purposes. Copying it will come with caveats.
export default function MaterialAdvancedItemsIndex({materialOptions, materialId, componentId, onClick, manageShapes, manageFixingMethods}: AdvanceMaterialItemsProps) {
  const navigate = useNavigate();
  const submit = useSubmit();
  const params = useParams();
  const configId = params.configId;
  const deleteFetcher = useFetcher() as any
  const setDafaultFetcher = useFetcher() as any
  const revalidator = useRevalidator();

  // let { materialOptions } = useOutletContext<{
  //   materialOptions: MaterialAdvanceOptionType[];
  // }>();

  useHandleFlashMessage();

  const handeleDelete = (id: number) => {
    // Optimistic update - supprimer immédiatement de l'UI
    if (localMaterialOptions && localMaterialOptions[id]) {
      setLocalMaterialOptions(localMaterialOptions.filter((_, index) => index !== id));
    }
    // submit({ id: id }, { method: "DELETE" });
    const requestBody: any = {
      operation: "delete",
      configId: configId,
      materialId: materialId,
      componentId: componentId,
      optionId: id
    }

    deleteFetcher.submit(requestBody, {
      method: "POST",
      action: "/api/advance-add-component-option-manager",
      encType: "application/json",
    })
  };

  const [showEditSection, setShowEditSection] = useState<boolean>(false)
  const [edit, setEdit] = useState<boolean>(false)
  const [currentComponentID, setCurrentComponentID] = useState<number>(0)
  const handleUpdate = (id: number) => {
    // submit({ id: id }, { method: "GET", action: "edit" });
    setActivePopoverId(-1)
    setEdit(true)
    setCurrentComponentID(id)
    setShowEditSection(true)
  };

  const handeleDefault = (id: number) => {
    // Optimistic update - mettre à jour immédiatement l'UI
    if (localMaterialOptions) {
      setLocalMaterialOptions(
        localMaterialOptions.map((curr, index) =>
          index === id
            ? { ...curr, isDefault: true }
            : { ...curr, isDefault: false }
        )
      );
    }

    const requestBody: any = {
      operation: "set-default",
      configId: configId,
      materialId: materialId,
      componentId: componentId,
      optionId: id
    }

    setDafaultFetcher.submit(requestBody, {
      method: "POST",
      action: "/api/advance-add-component-option-manager",
      encType: "application/json",
    })
  };

  const handleEdit = () => {
    // navigate("edit");
    setEdit(false)
    setShowEditSection(true)
  };

  const resourceName = {
    singular: "Component",
    plural: "Components",
  };

  const [activePopoverId, setActivePopoverId] = useState<number | null>(null);
  const [localMaterialOptions, setLocalMaterialOptions] = useState<MaterialAdvanceOptionType[] | undefined>(materialOptions);
  const hasProcessedDelete = useRef(false);
  const hasProcessedDefault = useRef(false);
  
  // Mettre à jour l'état local quand materialOptions change
  useEffect(() => {
    setLocalMaterialOptions(materialOptions);
    // Réinitialiser les flags quand les données changent depuis le loader
    hasProcessedDelete.current = false;
    hasProcessedDefault.current = false;
  }, [materialOptions]);

  // Mettre à jour après suppression
  useEffect(() => {
    if (deleteFetcher.state === "idle" && deleteFetcher.data && !hasProcessedDelete.current) {
      if (deleteFetcher.data.success && deleteFetcher.data.data) {
        hasProcessedDelete.current = true;
        // Mettre à jour avec les données du serveur (source de vérité)
        setLocalMaterialOptions(deleteFetcher.data.data);
        // Pas besoin de revalidate si on a déjà les données mises à jour
      } else if (deleteFetcher.data.error) {
        hasProcessedDelete.current = true;
        // En cas d'erreur, recharger depuis le serveur pour restaurer l'état
        revalidator.revalidate();
      }
    }
    // Réinitialiser le flag quand on commence une nouvelle soumission
    if (deleteFetcher.state === "submitting") {
      hasProcessedDelete.current = false;
    }
  }, [deleteFetcher.state, deleteFetcher.data]);

  // Mettre à jour après changement de défaut
  useEffect(() => {
    if (setDafaultFetcher.state === "idle" && setDafaultFetcher.data && !hasProcessedDefault.current) {
      if (setDafaultFetcher.data.success && setDafaultFetcher.data.data) {
        hasProcessedDefault.current = true;
        // Mettre à jour avec les données du serveur (source de vérité)
        setLocalMaterialOptions(setDafaultFetcher.data.data);
        // Pas besoin de revalidate si on a déjà les données mises à jour
      } else if (setDafaultFetcher.data.error) {
        hasProcessedDefault.current = true;
        // En cas d'erreur, recharger depuis le serveur pour restaurer l'état
        revalidator.revalidate();
      }
    }
    // Réinitialiser le flag quand on commence une nouvelle soumission
    if (setDafaultFetcher.state === "submitting") {
      hasProcessedDefault.current = false;
    }
  }, [setDafaultFetcher.state, setDafaultFetcher.data]);

  const rowMarkup = localMaterialOptions?.map(
    ({ name, description, icon, image, additionalPrice, isDefault }, index) => {
      const isActive = activePopoverId === index;
      
      return(
        <IndexTable.Row id={`${index}`} key={`${index}`} position={index}>
          <IndexTable.Cell>{truncateText(name)}</IndexTable.Cell>
          <IndexTable.Cell>
            {" "}
            <Text as="p">{truncateText(description)}</Text>{" "}
          </IndexTable.Cell>
          <IndexTable.Cell className="td-center">
            <InlineStack align="center">
              { icon &&
                <img
                  style={{ height: "30px" }}
                  src={fileUrl(icon)}
                  alt={"product thumbnail" + name}
                />
              }
              { icon == "" &&
                <p>none</p>
              }
            </InlineStack>
          </IndexTable.Cell>
          <IndexTable.Cell className="td-center">
            <InlineStack align="center">
              { image &&  
                <img
                  style={{ height: "30px" }}
                  src={fileUrl(image)}
                  alt={"product thumbnail" + name}
                />
              }
            </InlineStack>
          </IndexTable.Cell>
          <IndexTable.Cell className="td-center">
            <Badge tone="success">{additionalPrice+""}</Badge>
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
        <div style={{width:"100%", height:"auto", padding: "8px 0px"}}>
          <Card>
            <div>
              <Box padding="200">
                <BlockStack gap="300">
                  <InlineStack gap="100" align="end">
                  
                    <button
                      className="primary-btn"
                      type="button"
                      onClick={handleEdit}
                    >
                      <Box paddingInline="300">
                        <InlineStack gap="300">
                          <PlusIcon />
                          <span className="primary-btn-text">Add new option</span>
                        </InlineStack>
                      </Box>
                    </button>
                  </InlineStack>
                </BlockStack>
              </Box>
              <Divider borderWidth="050" />
            </div>
            <IndexTable
              resourceName={resourceName}
              selectable={false}
              itemCount={localMaterialOptions ? localMaterialOptions.length : 0}
              headings={[
                { title: "Title" },
                { title: "Desciption" },
                { title: "Icon", alignment: "center" },
                { title: "Image", alignment: "center" },
                { title: "Price", alignment: "center" },
                { title: "Default", alignment: "center" },
                { title: "Action", alignment: "center" },
              ]}
            >
              {rowMarkup}
            </IndexTable>

            <Divider borderWidth="050" />
            <Box paddingInline="300" paddingBlock="300">
              <InlineStack align="end" gap="600">
                <button
                  className="back-large-btn"
                  type="button"
                  onClick={()=> onClick(false)}
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
              </InlineStack>
            </Box>
          </Card>
        </div>
      ) : (
        <MaterialComponentCreate materialId={materialId} componentId={componentId} materialOptions={localMaterialOptions} manageShapes={manageShapes} manageFixingsMethods={manageFixingMethods} id={currentComponentID} onClick={setShowEditSection} edit={edit} refreshOptions={setLocalMaterialOptions} />
      )}
    </div>
  );
}

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const { session, admin } = await authenticate.admin(request);

  const configId = parseInt(params.configId ?? "");
  const materialId = parseInt(params.mId ?? "");
  const componentId = parseInt(params.cId ?? "");

  const method = request.method;
  const formData = await request.formData();

  switch (method) {
    case "DELETE": {
      const id = formData.get("id") as string;
      console.log("start deleting");
      await MaterialAdvancedOptionService.delete(
        configId,
        session.id,
        materialId,
        componentId,
        parseInt(id || ""),
      );
      return json({
        ...jFlashMessage("Material option deleted successfully"),
      });
      break;
    }

    case "PUT": {
      const id = formData.get("id") as string;
      console.log("start deleting");
      await MaterialAdvancedOptionService.setDefault(
        configId,
        session.id,
        materialId,
        componentId,
        parseInt(id || ""),
      );
      return json({
        ...jFlashMessage("Default material option set successfully"),
      });
      break;
    }

    default:
      break;
  }

  return null;
};
