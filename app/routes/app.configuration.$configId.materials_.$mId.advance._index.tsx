import {
  ActionList,
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
  Text,
} from "@shopify/polaris";

import { DeleteIconBtn } from "~/components/buttons/DeleteIconBtn";
import { EditIconBtn } from "~/components/buttons/EditIconBtn";
import {
  Link,
  useFetcher,
  useNavigate,
  useOutletContext,
  useParams,
  useSubmit,
} from "@remix-run/react";
import { BoxBackground } from "~/components/layouts/BoxBackground";
import { SpacingBackground } from "~/components/layouts/SpacingBackground";
import PlusIcon from "~/components/icons/PlusIcon";
import RoundManageHistoryIcon from "~/components/icons/RoundManageHistoryIcon";
import NextLtrIcon from "~/components/icons/NextLtrIcon";
import {
  MaterialAdvance,
  MaterialAdvanceComponentType,
} from "~/types/ConfigDataType";
import useHandleFlashMessage from "~/hooks/useHandleFlashMessage";
import { BorderCircleText } from "~/components/feactures/BorderCircleText";
import MaterialAdvanceComponentService from "~/models/MaterialAdvanceComponent.service";
import { ActionFunctionArgs, json } from "@remix-run/node";
import { authenticate } from "~/shopify.server";
import { jFlashMessage } from "~/utils/message-flash";
import { ConfigurationType } from "~/types/ConfigurationType";
import { truncateText } from "~/utils/truncate-text";
import { ReactSwitchCustom } from "~/components/inputs/ReactSwitchCustom";
import { fileUrl } from "~/utils/fileUrl";
import { useEffect, useState } from "react";
import { DeleteIcon, EditIcon, MenuHorizontalIcon, PlusCircleIcon } from "@shopify/polaris-icons";

import Materiels from "./app.configuration.$configId.materials_.$mId.advance.$cId";
import MaterialComponentCreate from "./app.configuration.$configId.materials_.$mId.advance.edit";
import MaterialAdvancedItemsIndex from "./app.configuration.$configId.materials_.$mId.advance.$cId._index";
import { FixingMethodType, ShapeType } from "~/types/SettingsType";

interface AdvanceMaterialProps {
  // configuration: ConfigurationType;
  materialComponents: MaterialAdvanceComponentType[]
  materialId: number | undefined,
  manageShapes: ShapeType[];
  manageFixingMethods: FixingMethodType[];
}
// This example is for guidance purposes. Copying it will come with caveats.
export default function MaterialAdvancedIndex({materialComponents, materialId, manageShapes, manageFixingMethods}: AdvanceMaterialProps) {
// export default function MaterialAdvancedIndex() {

  const submit = useSubmit();
  const navigate = useNavigate();
  const params = useParams();
  const configId = params.configId;
  const deleteFetcher = useFetcher() as any
  const setDafaultFetcher = useFetcher() as any

  // let { materialComponents, material, configuration } = useOutletContext<{
  //   materialComponents: MaterialAdvanceComponentType[];
  //   material: MaterialAdvance;
  //   configuration: ConfigurationType;
  // }>();

  useHandleFlashMessage();

  const handeleDelete = (id: number, e?: React.MouseEvent) => {
    // Empêcher la propagation du clic
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    // submit({ id: id }, { method: "DELETE" });

    const requestBody: any = {
      operation: "delete",
      configId: configId,
      materialId: materialId,
      componentId: id
    }

    deleteFetcher.submit(requestBody, {
      method: "POST",
      action: "/api/advance-add-component-manager",
      encType: "application/json",
    })
  };

  const [currentComponentID, setCurrentComponentID] = useState<number>(0)
  const handleUpdate = (id: number, e?: React.MouseEvent) => {
    // Empêcher la propagation du clic
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    // submit({ id: id }, { method: "GET", action: "edit" });
    setActivePopoverId(-1)
    setCurrentComponentID(id)
    setEdit(true)
    setShowEditSection(true)
  };

  const handeleDefault = (id: number) => {
    const requestBody: any = {
      operation: "set-default",
      configId: configId,
      materialId: materialId,
      componentId: id
    }

    setDafaultFetcher.submit(requestBody, {
      method: "POST",
      action: "/api/advance-add-component-manager",
      encType: "application/json",
    })
  };

  const [showComponentSection, setShowComponentSection] = useState<boolean>(false)
  const [selectedComponentId, setSelectedComponentId] = useState<number>(0)
  const onManageOption = (id: number) => {
    // navigate(`${id}`);
    setActivePopoverId(-1)
    setSelectedComponentId(id)
    setShowComponentSection(true)
    console.log(materialComponents[selectedComponentId], "azere")
  };

  const [showEditSection, setShowEditSection] = useState<boolean>(false)
  const [edit, setEdit] = useState<boolean>(false)
  const handleEdit = () => {
    // navigate("edit");
    setActivePopoverId(-1)
    setEdit(false)
    setShowEditSection(true)
  };

  // Callback pour mettre à jour les composants après création/modification
  const handleComponentsUpdate = (newComponents: MaterialAdvanceComponentType[] | null) => {
    if (newComponents) {
      setLocalMaterielComponents([...newComponents]);
    }
  };

  const resourceName = {
    singular: "Component",
    plural: "Components",
  };

  const [active, setActive] = useState(false);
  const [activePopoverId, setActivePopoverId] = useState<number | null>(null);
  const [localMaterielComponents, setLocalMaterielComponents] = useState(materialComponents)
  // const rowMarkup = materialComponents?.map(
  //   ({ name, description, icon, isDefault }, index) => (
  const rowMarkup = (localMaterielComponents || [])?.map(
    ({ name, description, icon, isDefault }, index) => {
      const isActive = activePopoverId === index;

      return(
        <IndexTable.Row 
          id={`${index}`} 
          key={`${index}`} 
          position={index} 
          onClick={(e) => {
            // Ne pas déclencher si le Popover est ouvert ou si on clique sur un élément interactif
            if (isActive || (e.target as HTMLElement).closest('[role="menu"]') || (e.target as HTMLElement).closest('button')) {
              return;
            }
            onManageOption(index);
          }}
        >
          <IndexTable.Cell>
            <InlineStack blockAlign="center" gap="300" wrap={false}>
              <BorderCircleText
                onClick={() => onManageOption(index)}
                text={name}
              />
                <span className="btn-span" onClick={() =>onManageOption(index)}>
              {truncateText(name)}
              </span>
            </InlineStack>
          </IndexTable.Cell>
          <IndexTable.Cell>
            <span className="btn-span" onClick={() =>onManageOption(index)}>
              {truncateText(description)}
              </span>
          </IndexTable.Cell>
          <IndexTable.Cell className="td-center">
          { icon && <img
              style={{ height: "30px" }}
              src={fileUrl(icon)}
              alt={"product " + name}
            />}
          </IndexTable.Cell>
          <IndexTable.Cell className="td-center">
            <div onClick={(e) => { e.stopPropagation() }}>
              <ReactSwitchCustom
                checked={isDefault || false}
                setChecked={() => (isDefault ? "" : handeleDefault(index))}
              ></ReactSwitchCustom>
            </div>
          </IndexTable.Cell>

          <IndexTable.Cell className="td-center">
            <Popover
              active={isActive}
              activator={
                <div onClick={(e) => { e.stopPropagation() }}>
                  <Button
                    onClick={() =>
                      setActivePopoverId(isActive ? null : index)
                    }
                    icon={<Icon source={MenuHorizontalIcon} />}
                  />
                </div>
              }
              onClose={() => setActivePopoverId(null)}
              preferredAlignment="right"
            >
              <ActionList 
                items={[
                  { 
                    content: 'Add option', 
                    icon: PlusCircleIcon, 
                    onAction: () => {
                      setActivePopoverId(null);
                      onManageOption(index);
                    }
                  },
                  { 
                    content: 'Edit', 
                    icon: EditIcon, 
                    onAction: () => {
                      setActivePopoverId(null);
                      handleUpdate(index);
                    }
                  },
                  { 
                    content: 'Delete', 
                    icon: DeleteIcon, 
                    onAction: () => {
                      setActivePopoverId(null);
                      handeleDelete(index);
                    }, 
                    destructive: true
                  },
                ]}
              />
            </Popover>
          </IndexTable.Cell>
        </IndexTable.Row>
      )
    },
  );

  useEffect(()=>{
    setLocalMaterielComponents([...(materialComponents || [])])
  }, [materialId, materialComponents])

  // Mettre à jour l'état local après suppression
  useEffect(() => {
    if (deleteFetcher.state === "idle" && deleteFetcher.data?.success && deleteFetcher.data?.data) {
      setLocalMaterielComponents([...(deleteFetcher.data.data || [])]);
    }
  }, [deleteFetcher.state, deleteFetcher.data]);

  // Mettre à jour l'état local après mise à jour par défaut
  useEffect(() => {
    if (setDafaultFetcher.state === "idle" && setDafaultFetcher.data?.success && setDafaultFetcher.data?.data) {
      setLocalMaterielComponents([...(setDafaultFetcher.data.data || [])]);
    }
  }, [setDafaultFetcher.state, setDafaultFetcher.data]);

  return (
    <div>
      {!showEditSection && !showComponentSection &&
        <div style={{width: "100%"}}>
          <BoxBackground>
            {/* <Box paddingInline="300" paddingBlock="600">
              <InlineStack align="start">
                <InlineStack gap="100" align="start" blockAlign="start">
                  <Text as="h2" variant="headingMd">
                    {configuration?.name}
                  </Text>
                  <NextLtrIcon />
                  <Link className="link" to="../../materials">
                    <Text as="h2" variant="headingMd" tone="subdued">
                      Materials
                    </Text>
                  </Link>
                  <NextLtrIcon />
                  <Text as="h2" variant="headingMd" tone="subdued">
                    {material?.name} (Advancee)
                  </Text>
                </InlineStack>
              </InlineStack>
            </Box> */}
            <Divider borderWidth="100" />
          </BoxBackground>
          <Divider borderWidth="100" />

          <Card>
            <SpacingBackground width="100%" height="auto">
              <BoxBackground>
                <Box padding="300">
                  <BlockStack gap="300">
                    <InlineStack gap="100" align="space-between">
                      <Text as="h2" variant="headingMd">
                        List of components
                      </Text>
                      <button
                        className="primary-btn"
                        type="button"
                        onClick={handleEdit}
                      >
                        <Box paddingInline="300">
                          <InlineStack gap="300">
                            <PlusIcon />
                            <span className="primary-btn-text">
                              Add new componentt
                            </span>
                          </InlineStack>
                        </Box>
                      </button>
                    </InlineStack>
                  </BlockStack>
                </Box>
                <Divider borderWidth="050" />
              </BoxBackground>
              <IndexTable
                resourceName={resourceName}
                itemCount={(localMaterielComponents || []).length}
                selectable={false}
                headings={[
                  { title: "Title" },
                  { title: "Desciption" },
                  { title: "Icon", alignment: "center" },
                  { title: "Default", alignment: "center" },
                  { title: "Action", alignment: "center" },
                ]}
              >
                {rowMarkup}
              </IndexTable>
            </SpacingBackground>
          </Card>
        </div>
      }
      {showEditSection && !showComponentSection &&
        <MaterialComponentCreate 
          materialId={materialId} 
          materialComponents={localMaterielComponents} 
          edit={edit} 
          index={currentComponentID} 
          onClick={setShowEditSection}
          onUpdate={handleComponentsUpdate}
        />
      }

      {showComponentSection &&
        <MaterialAdvancedItemsIndex manageShapes={manageShapes} manageFixingMethods={manageFixingMethods} materialId={materialId} componentId={selectedComponentId} materialOptions={localMaterielComponents[selectedComponentId].options} onClick={setShowComponentSection} />
      }
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
      await MaterialAdvanceComponentService.delete(
        configId,
        session.id,
        mId,
        parseInt(id || ""),
      );
      return json({
        ...jFlashMessage(
          "Material advance component deleted successfully",
        ),
      });
      break;
    }
    case "PUT": {
      const id = formData.get("id") as string;
      console.log("start deleting");
      await MaterialAdvanceComponentService.setDefault(
        configId,
        session.id,
        mId,
        parseInt(id || ""),
      );
      return json({
        ...jFlashMessage(
          "Default material advance component set successfully",
        ),
      });
      break;
    }
    default:
      break;
  }

  return null;
};
