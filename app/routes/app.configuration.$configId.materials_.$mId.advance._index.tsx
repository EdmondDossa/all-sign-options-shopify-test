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
import { Link, useNavigate, useOutletContext, useParams, useSubmit } from "@remix-run/react";
import { BoxBackground } from "~/components/layouts/BoxBackground";
import { SpacingBackground } from "~/components/layouts/SpacingBackground";
import PlusIcon from "~/components/icons/PlusIcon";
import RoundManageHistoryIcon from "~/components/icons/RoundManageHistoryIcon";
import NextLtrIcon from "~/components/icons/NextLtrIcon";
import { MaterialAdvance, MaterialAdvanceComponentType } from "~/types/ConfigDataType";
import useHandleFlashMessage from "~/hooks/useHandleFlashMessage";
import { BorderCircleText } from "~/components/feactures/BorderCircleText";
import MaterialAdvanceComponentService from "~/models/MaterialAdvanceComponent.service";
import { ActionFunctionArgs, json } from "@remix-run/node";
import { authenticate } from "~/shopify.server";
import { jFlashMessage } from "~/utils/message-flash";
import { ConfigurationType } from "~/types/ConfigurationType";


// This example is for guidance purposes. Copying it will come with caveats.
export default function MaterialAdvancedIndex() {
  
  const submit = useSubmit();
  const navigate = useNavigate();

  const { materialComponents , material, configuration} = useOutletContext<{
    materialComponents: MaterialAdvanceComponentType[];
    material:MaterialAdvance, configuration: ConfigurationType
  }>();

  useHandleFlashMessage();


  const handeleDelete = (id: number) => {
    submit({ id: id }, { method: "DELETE" });
  };

  const handleUpdate = (id: number) => {
    submit({ id: id }, { method: "GET", action: "edit" });
  };

  const onManageOption = (id: number) => {
    navigate(`${id}`);
  };

  const handleEdit = () => {
    navigate("edit");
  };



  const resourceName = {
    singular: "Component",
    plural: "Components",
  };

  const rowMarkup = materialComponents?.map(
    (
      {  name, description, icon },
      index,
    ) => (
      <IndexTable.Row
        id={`${index}`}
        key={`${index}`}
        position={index}
      >
        
        
        <IndexTable.Cell>
           <InlineStack blockAlign="center" gap="300">
            <BorderCircleText text={ name } /> {name}
          </InlineStack>
        </IndexTable.Cell>
        <IndexTable.Cell>{description}</IndexTable.Cell>
        <IndexTable.Cell>
          <img style={{height: "30px"}}
            src={icon}
            alt={"product " + name}
          />
        </IndexTable.Cell>
    
        <IndexTable.Cell>
          <ButtonGroup gap="loose" >
            <button className="add-option-btn" onClick={()=>onManageOption(index)}>

         
                <InlineStack gap="100" blockAlign="center"> <RoundManageHistoryIcon/> <Text as="span"> add options </Text> </InlineStack>
         
            </button>
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
    <>
      <BoxBackground>
          <Box paddingInline="300" paddingBlock="600">
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
                  {material?.name} (Advance)
              </Text>
              
              </InlineStack>
            </InlineStack>
          </Box>
          <Divider borderWidth="100" />
        </BoxBackground>
        <Divider borderWidth="100" />
        
     <SpacingBackground width="100%" height="auto" >
        <BoxBackground>
          <Box padding="300">
          <BlockStack gap="300">
          <InlineStack gap="100" align="space-between" >

                <Text as="h2" variant="headingMd">
                List of  components
                </Text>
              <button
                className="primary-btn"
                type="button"
                onClick={handleEdit}
              >
                <Box paddingInline="300">
                  <InlineStack gap="300">
                    <PlusIcon/>
                    <span className="primary-btn-text">Add new  component</span>
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
        itemCount={materialComponents?materialComponents.length:0}
          selectable={false}
        
          sortable={[false, true, true, true, true, true, true]}
          headings={[
            { title: "Title" },
            { title: "Desciption"},
            { title: "Icon" },
            { title: "Action"},
          ]}
        >
          {rowMarkup}
        </IndexTable>
      </SpacingBackground>
    </>
   
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
        ...jFlashMessage("Material advance component  deleting is completed successfull"),
      });
      break;
    }
    default:
      break;
  }

  return null;
};








