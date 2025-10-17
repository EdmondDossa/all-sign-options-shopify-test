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
  Text,
} from "@shopify/polaris";

import { DeleteIconBtn } from "~/components/buttons/DeleteIconBtn";
import { EditIconBtn } from "~/components/buttons/EditIconBtn";
import {
  json,
  useFetcher,
  useNavigate,
  useOutletContext,
  useParams,
  useSubmit,
} from "@remix-run/react";
import { BoxBackground } from "~/components/layouts/BoxBackground";
import { SpacingBackground } from "~/components/layouts/SpacingBackground";
import PlusIcon from "~/components/icons/PlusIcon";
import { ConfigAdditionalOptionItem, ConfigColor } from "~/types/ConfigDataType";
import useHandleFlashMessage from "~/hooks/useHandleFlashMessage";
import { jFlashMessage } from "~/utils/message-flash";
import { ActionFunctionArgs } from "@remix-run/node";
import { authenticate } from "~/shopify.server";
import MaterialAdditionalOptionItemService from "~/models/MaterialAdditionalOptionItem.service";
import { ReactSwitchCustom } from "~/components/inputs/ReactSwitchCustom";
import { fileUrl } from "~/utils/fileUrl";

import MaterialAdditionalOptionCreate from "./app.configuration.$configId.materials_.$mId.simple.additional-option.$aId.edit";
import { useEffect, useState } from "react";
import RayStartArrowIcon from "~/components/icons/RayStartArrowIcon";
import { DeleteIcon, EditIcon, MenuHorizontalIcon } from "@shopify/polaris-icons";

interface MaterialAddOptionsProps {
  additionalOptionItems: ConfigAdditionalOptionItem[];
  configColors: ConfigColor[];
  materialId: number | undefined;
  id: number;
  onClick: (id: boolean) => void;
  // edit: boolean
}

// This example is for guidance purposes. Copying it will come with caveats.
export default function MaterialAdditionalOptionsIndex({ additionalOptionItems, configColors, materialId, id, onClick }: MaterialAddOptionsProps) {
  const submit = useSubmit();
  const navigate = useNavigate();
  const deleteFetcher = useFetcher<any>();
  const setDefaultFetcher = useFetcher<any>();
  const params = useParams();
  const configId = params.configId;

  // let { additionalOptionItems } = useOutletContext<{
  //   additionalOptionItems: ConfigAdditionalOptionItem[];
  // }>();

  useHandleFlashMessage();

  const handeleDelete = (index: number) => {
    // submit({ id: id }, { method: "DELETE" });

    const requestBody: any = {
      operation: "delete",
      configId: configId,
      materialId: materialId,
      additionalId: id,
      optionItemId: index
    }

    deleteFetcher.submit(requestBody, {
      method: "POST",
      action: "/api/simple-additionnalOptionItems-manager",
      encType: "application/json",
    })
  };

  const handeleDefault = (index: number) => {
    additionalOptionItems = additionalOptionItems.map((curr, index) => {
      if (index === id) {
        curr.isDefault = true;
      } else {
        curr.isDefault = false;
      }
      return curr;
    });

    // submit({ id: id }, { method: "PUT" });
    const requestBody: any = {
      operation: "set-default",
      configId: configId,
      materialId: materialId,
      additionalId: id,
      optionItemId: index
    }

    setDefaultFetcher.submit(requestBody, {
      method: "POST",
      action: "/api/simple-additionnalOptionItems-manager",
      encType: "application/json",
    })
  };

  const [edit, setEdit] = useState<boolean>(false);
  const [selectedOptionId, setSelectedOptionId] = useState(0)
  const handleUpdate = (id: number) => {
    // submit({ id: id }, { method: "GET", action: "edit" });
    setActivePopoverId(-1)
    setSelectedOptionId(id)
    setEdit(true)
    setShowEditSection(true)
  };
  // console.log(id, 'eaziueaze')

  const [showEditSection, setShowEditSection] = useState<boolean>(false)
  const handleEdit = () => {
    // navigate("edit");
    setEdit(false)
    setShowEditSection(true)
  };


  const resourceName = {
    singular: "Additional option",
    plural: "Additionals options",
  };

  const [activePopoverId, setActivePopoverId] = useState<number | null>(null);
  const [localOptionItems, setLocalOptionItems] = useState<ConfigAdditionalOptionItem[]>(additionalOptionItems)
  const rowMarkup = localOptionItems?.map(
    ( { title, description, icon, additionalPrice, isDefault }, index) => {
      const isActive = activePopoverId === index;
      return(
        <IndexTable.Row id={`${index}`} key={`${index}`} position={index}>
          <IndexTable.Cell>{title}</IndexTable.Cell>
          <IndexTable.Cell>{description}</IndexTable.Cell>
          <IndexTable.Cell className="td-center">
        { icon &&   <img
              style={{ height: "30px" }}
              src={fileUrl(icon)}
              alt={" thumbnail"}
            />}
          </IndexTable.Cell>
      
          <IndexTable.Cell className="td-center">
            <Badge>{`${additionalPrice}`}</Badge>
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

  useEffect(()=>{
    setLocalOptionItems([
      ...additionalOptionItems
    ])
  }, [additionalOptionItems, materialId, id])
  return (
    <div>
      { !showEditSection &&
        <div style={{width:"100%" ,height:"auto" ,margin:"0px 0px "}}>
          <Card>
            <div>
              <Box paddingBlockEnd="300">
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
                          <span className="primary-btn-text"> Add new option </span>
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
              itemCount={additionalOptionItems ? additionalOptionItems.length : 0}
              selectable={false}
              headings={[
                { title: "Title" },
                { title: "Desciption" },
                { title: "Icon", alignment: "center" },
                { title: "Price", alignment: "center" },
                { title: "Default", alignment: "center" },
                { title: "Action", alignment: "center" },
              ]}
            >
              {rowMarkup}
            </IndexTable>
    
            <Divider borderWidth="050" />
            <Box paddingInline="300" paddingBlock="200">
              <InlineStack align="end" gap="600">
                <button className="back-large-btn" type="button" onClick={()=> onClick(false)}>
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
      }
  
      { showEditSection &&
        <MaterialAdditionalOptionCreate refreshOptionItems={setLocalOptionItems} additionalOptionItems={additionalOptionItems} configColors={configColors} materialId={materialId} componentId={id} id={selectedOptionId} edit={edit} onClick={setShowEditSection} />
      }

    </div>
  );
}

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const { session, admin } = await authenticate.admin(request);

  const configId = parseInt(params.configId ?? "");
  const mId = parseInt(params.mId ?? "");
  const aId = parseInt(params.aId ?? "");

  const method = request.method;
  const formData = await request.formData();

  switch (method) {
    case "DELETE": {
      const id = formData.get("id") as string;
      console.log("start deleting");
      await MaterialAdditionalOptionItemService.delete(
        configId,
        session.id,
        mId,
        aId,
        parseInt(id || ""),
      );
      return json({
        ...jFlashMessage("Material option deleted successfully"),
      });
      break;
    }
    case "PUT": {
      const id = formData.get("id") as string;
      await MaterialAdditionalOptionItemService.setDefault(
        configId,
        session.id,
        mId,
        aId,
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
