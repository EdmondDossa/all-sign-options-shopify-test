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
import { Link, useNavigate } from "@remix-run/react";
import { BoxBackground } from "~/components/layouts/BoxBackground";
import { SpacingBackground } from "~/components/layouts/SpacingBackground";
import PlusIcon from "~/components/icons/PlusIcon";
import RoundManageHistoryIcon from "~/components/icons/RoundManageHistoryIcon";
import NextLtrIcon from "~/components/icons/NextLtrIcon";


// This example is for guidance purposes. Copying it will come with caveats.
export default function MaterialAdvancedIndex() {
  
  const navigate = useNavigate();
  const onHandleCreate = () => {
    navigate("create");
  };

  const onManageOption = () => {
    navigate("component");
  }


  
  const components = [
    {
      id: "1",
      tiltle: "Component  1",
      description: "Acrylic signs, also known .....",
      icon: "/component.png",
    },
    {
      id: "2",
      tiltle: "Component  2",
      description: "Acrylic signs, also known .....",
      icon: "/component.png",
    },
    {
      id: "3",
      tiltle: "Component  3",
      description: "Acrylic signs, also known .....",
      icon: "/component.png",
    },
    {
      id: "4",
      tiltle: "Component  4",
      description: "Acrylic signs, also known .....",
      icon: "/component.png",
    },
    {
      id: "5",
      tiltle: "Component  5",
      description: "Acrylic signs, also known .....",
      icon: "/component.png",
    },
    {
      id: "6",
      tiltle: "Component  6",
      description: "Acrylic signs, also known .....",
      icon: "/component.png",
    },
  ];
  const resourceName = {
    singular: "Component",
    plural: "Components",
  };

  const rowMarkup = components.map(
    (
      { id, tiltle, description, icon },
      index,
    ) => (
      <IndexTable.Row
        id={id}
        key={id}
       
        position={index}
      >
        
        
        <IndexTable.Cell>
           <InlineStack blockAlign="center" gap="300">
             <BorderCircleText label="SC"/> {tiltle}
          </InlineStack>
        </IndexTable.Cell>
        <IndexTable.Cell>{description}</IndexTable.Cell>
        <IndexTable.Cell>
          <img style={{height: "30px"}}
            src={icon}
            alt={"product thumbnail" + tiltle}
          />
        </IndexTable.Cell>
    
        <IndexTable.Cell>
          <ButtonGroup gap="loose" >
            <button className="add-option-btn" onClick={onManageOption}>

         
                <InlineStack gap="100" blockAlign="center"> <RoundManageHistoryIcon/> <Text as="span"> add options </Text> </InlineStack>
         
            </button>
            <EditIconBtn  size="micro"  />
            <DeleteIconBtn  size="micro" />
          </ButtonGroup>
        </IndexTable.Cell>
      </IndexTable.Row>
    ),
  );
  return (
    <>
        <BoxBackground>
          <Box paddingInline="300" paddingBlock="600">
            <InlineStack>
              <InlineStack gap="100" align="start">
                <Text as="h2" variant="headingMd">
                  Name config
                </Text>
                <NextLtrIcon />
                <Text as="h2" variant="headingMd" tone="subdued">
                  Material
                </Text>
                <NextLtrIcon />
                <Text as="h2" variant="headingMd" tone="subdued">
                  Plastic
              </Text>
              <NextLtrIcon />
                <Text as="h2" variant="headingMd" tone="subdued">
                  components
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
                onClick={onHandleCreate}
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
        itemCount={components.length}
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



export const BorderCircleText = ({label}:{label:string}) => {
  
  return (<Box padding="150"  borderColor="border-brand" borderWidth="025" borderRadius="full" background="bg-surface-secondary" width="34px" minHeight="34px">
    {label}
  </Box>)
}







