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
  json,
  useNavigate,
  useOutletContext,
  useSubmit,
} from "@remix-run/react";
import { BoxBackground } from "~/components/layouts/BoxBackground";
import { SpacingBackground } from "~/components/layouts/SpacingBackground";
import PlusIcon from "~/components/icons/PlusIcon";
import { ConfigAdditionalOption, ConfigAdditionalOptionItem, ConfigColor } from "~/types/ConfigDataType";
import useHandleFlashMessage from "~/hooks/useHandleFlashMessage";
import MaterialAdditionalOptionService from "~/models/MaterialAdditionalOption.service";
import { jFlashMessage } from "~/utils/message-flash";
import { ActionFunctionArgs } from "@remix-run/node";
import { authenticate } from "~/shopify.server";
import { fileUrl } from "~/utils/fileUrl";
import { ManageBtn } from "~/components/buttons/ManageBtn";
import { useEffect, useState } from "react";
import MaterialAdditionalOptionCreate from "./app.configuration.$configId.materials_.$mId.simple.additional-option.edit";
import MaterialAdditionalOptionsIndex from "./app.configuration.$configId.materials_.$mId.simple.additional-option.$aId._index";
import { DeleteIcon, EditIcon, MenuHorizontalIcon, PlusCircleIcon } from "@shopify/polaris-icons";
interface MaterialAddOptionsProps{
  additionalOptions: ConfigAdditionalOption[]
  materialId: number | undefined,
  configColors: ConfigColor[]
}

// This example is for guidance purposes. Copying it will come with caveats.
export default function MaterialAdditionalOptionIndex({materialId, additionalOptions, configColors}:MaterialAddOptionsProps) {
  const submit = useSubmit();
  const navigate = useNavigate();

  // const { additionalOptions } = useOutletContext<{
  //   additionalOptions: ConfigAdditionalOption[];
  // }>();

  useHandleFlashMessage();

  const handeleDelete = (id: number) => {
    submit({ id: id }, { method: "DELETE" });
  };

  const [showEditSection, setShowEditSection] = useState<boolean>(false)
  const [edit, setEdit] = useState<boolean>(false)
  const [currentOptionID, setCurrentOptionID] = useState<number>(0)
  const handleUpdate = (id: number) => {
    // submit({ id: id }, { method: "GET", action: "edit" });
    setActivePopoverId(-1)
    setShowEditSection(true)
    setEdit(true)
    setCurrentOptionID(id)
  };

  const [showOptionsSection, setShowOptionsSection] = useState<boolean>(false)
  const [componentOptions, setComponentOptions] = useState<any>()
  const handleView = (id: number) => {
    // navigate(`${id}`);
    additionalOptions.forEach((component, index)=>{
      if(index === id){
        setComponentOptions(component.options)
      }
    })
    setActivePopoverId(-1)
    setCurrentOptionID(id)
    setShowOptionsSection(true)

    //chargement des valeurs d'add option MaterialAdditionalOptionsIndex
  };

  const handleEdit = () => {
    // navigate("edit");
    setEdit(false)
    setShowEditSection(true)
  };

  const resourceName = {
    singular: "Additional component",
    plural: "Additional components",
  };

  const [activePopoverId, setActivePopoverId] = useState<number | null>(null);
  const [localAdditionalOptions, setLocalAdditionalOptions] = useState<ConfigAdditionalOption[]>(additionalOptions)
  const rowMarkup = localAdditionalOptions?.map(
    ({ title, description, icon }, index) => {
      const isActive = activePopoverId === index;
      return(
        <IndexTable.Row id={`${index}`} key={`${index}`} position={index}>
          <IndexTable.Cell>{title}</IndexTable.Cell>
          <IndexTable.Cell>{description}</IndexTable.Cell>
          <IndexTable.Cell className="td-center">
            <img
              style={{ height: "30px" }}
              src={fileUrl(icon)}
              alt={" thumbnail" + title}
            />
          </IndexTable.Cell>
          <IndexTable.Cell className="td-center">
            {/* <ButtonGroup fullWidth noWrap gap="loose">
              <ManageBtn
                title="add options"
                handleClick={() => handleView(index)}
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
                  { content: 'Add options', icon: PlusCircleIcon, onAction: () => handleView(index) },
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
    setLocalAdditionalOptions([
      ...additionalOptions
    ])
  }, [materialId, additionalOptions])

  return (
    <div>
      {(!showEditSection && !showOptionsSection ) &&
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
                          <span className="primary-btn-text"> Add new component</span>
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
              itemCount={additionalOptions ? additionalOptions.length : 0}
              selectable={false}
              headings={[
                { title: "Title" },
                { title: "Desciption" },
                { title: "Icon", alignment: "center" },
                { title: "Action", alignment: "center" },
              ]}
            >
              {rowMarkup}
            </IndexTable>
          </Card>
        </div>
      }

      {(showEditSection && !showOptionsSection ) &&
        <MaterialAdditionalOptionCreate materialId={materialId} additionalOptions={additionalOptions} id={currentOptionID} onClick={setShowEditSection} edit={edit} />
      }

      {showOptionsSection && 
        <MaterialAdditionalOptionsIndex additionalOptionItems={componentOptions} configColors={configColors} materialId={materialId} id={currentOptionID} onClick={setShowOptionsSection} />
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
      await MaterialAdditionalOptionService.delete(
        configId,
        session.id,
        mId,
        parseInt(id || ""),
      );
      return json({
        ...jFlashMessage(
          "Material additional option deleted successfully",
        ),
      });
      break;
    }
    default:
      break;
  }

  return null;
};
