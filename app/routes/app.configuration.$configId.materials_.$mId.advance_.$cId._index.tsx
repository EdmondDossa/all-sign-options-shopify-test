import {
  Badge,
  BlockStack,
  Box,
  Button,
  ButtonGroup,
  Card,
  ChoiceList,
  Divider,
  IndexTable,
  InlineGrid,
  InlineStack,
  Page,
  Select,
  Text,
  useIndexResourceState,
  useSetIndexFiltersMode,
} from "@shopify/polaris";
import { useCallback, useState } from "react";

import { DeleteIconBtn } from "~/components/buttons/DeleteIconBtn";
import { ViewIconBtn } from "~/components/buttons/ViewIconBtn";
import { EditIconBtn } from "~/components/buttons/EditIconBtn";
import { Link, useNavigate, useOutletContext, useSubmit } from "@remix-run/react";
import { BoxBackground } from "~/components/layouts/BoxBackground";
import { SpacingBackground } from "~/components/layouts/SpacingBackground";
import PlusIcon from "~/components/icons/PlusIcon";
import RoundManageHistoryIcon from "~/components/icons/RoundManageHistoryIcon";
import { MaterialAdvanceOptionType } from "~/types/ConfigDataType";
import useHandleFlashMessage from "~/hooks/useHandleFlashMessage";
import { ActionFunctionArgs, json } from "@remix-run/node";
import { authenticate } from "~/shopify.server";
import MaterialAdditionalOptionItemService from "~/models/MaterialAdditionalOptionItem.service";
import MaterialAdvancedOptionService from "~/models/MaterialAdvancedOption.service";
import { jFlashMessage } from "~/utils/message-flash";


// This example is for guidance purposes. Copying it will come with caveats.
export default function MaterialAdvancedIndex() {
  
  const navigate = useNavigate();
  const submit = useSubmit();

  const { materialOptions } = useOutletContext<{
    materialOptions: MaterialAdvanceOptionType[];
  }>();

  useHandleFlashMessage();


  const handeleDelete = (id: number) => {
    submit({ id: id }, { method: "DELETE" });
  };

  const handleUpdate = (id: number) => {
    submit({ id: id }, { method: "GET", action: "edit" });
  };

 
  const handleEdit = () => {
    navigate("edit");
  };


  const resourceName = {
    singular: "Component",
    plural: "Components",
  };

  const rowMarkup = materialOptions?.map(
    (
      {name, description, icon,image, additionalPrice },
      index,
    ) => (
      <IndexTable.Row
        id={`${index}`}
        key={`${index}`}
       
        position={index}
      >
        
        
        <IndexTable.Cell>
             {name}
        </IndexTable.Cell>
        <IndexTable.Cell>{description}</IndexTable.Cell>
        <IndexTable.Cell>
          <InlineStack align="center">

          <img style={{height: "30px"}}
            src={icon}
            alt={"product thumbnail" + name}
          />
          </InlineStack>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <InlineStack align="center">

          <img style={{height: "30px"}}
            src={image}
            alt={"product thumbnail" + name}
          />
          </InlineStack>
        </IndexTable.Cell>
        <IndexTable.Cell><Badge tone="success" >{additionalPrice +"$"}</Badge></IndexTable.Cell>
        <IndexTable.Cell>
          <ButtonGroup gap="loose" >
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
  return (
    
     <SpacingBackground width="100%" height="auto" >
        <BoxBackground>
          <Box padding="300">
          <BlockStack gap="300">
          <InlineStack gap="100" align="space-between" >

                <Text as="h2" variant="headingMd">
               
                </Text>
              <button
                className="primary-btn"
                type="button"
                onClick={handleEdit}
              >
                <Box paddingInline="300">
                  <InlineStack gap="300">
                    <PlusIcon/>
                    <span className="primary-btn-text">Add new option</span>
                  </InlineStack>
                </Box>
              </button>
            </InlineStack>
        
            </BlockStack>
          </Box>
          <Divider borderWidth="050"/>
        </BoxBackground>
        <IndexTable
          resourceName={resourceName}
        itemCount={materialOptions?materialOptions.length:0}
          selectable={false}
        
          sortable={[false, true, true, true, true, true, true]}
          headings={[
            { title: "Title" },
            { title: "Desciption"},
            { title: "Icon" },
            { title: "Image" },
            { title: "Price" },
            { title: "Action"},
          ]}
        >
          {rowMarkup}
        </IndexTable>
      </SpacingBackground>
   
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
        ...jFlashMessage("Material option deleting is completed successfull"),
      });
      break;
    }
    default:
      break;
  }

  return null;
};








