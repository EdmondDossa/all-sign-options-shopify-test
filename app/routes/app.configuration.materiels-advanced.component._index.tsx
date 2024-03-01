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


// This example is for guidance purposes. Copying it will come with caveats.
export default function MaterialAdvancedIndex() {
  
  const navigate = useNavigate();
  const onHandleCreate = () => {
    navigate("create");
  };


  
  const components = [
    {
      id: "1",
      tiltle: "Rounded wood",
      description: "Acrylic signs, also known .....",
      icon: "/rounded-wood.png",
      size: "25 x 10 mm",
      color: "#DDA534"
    },
    {
      id: "2",
      tiltle: "Circle wood",
      description: "Acrylic signs, also known .....",
      icon: "/circle-wood.png",
      size: "25 x 10 mm",
      color: "#DDA534"
    },
    {
      id: "3",
      tiltle: "Circle wood slim",
      description: "Acrylic signs, also known .....",
      icon: "/circle-wood.png",
      size: "25 x 10 mm",
      color: "#DDA534"
    },
    {
      id: "4",
      tiltle: "Circle wood gold",
      description: "Acrylic signs, also known .....",
      icon: "/circle-wood.png",
      size: "25 x 10 mm",
      color: "#DDA534"
    },
    {
      id: "5",
      tiltle: "Circle wood black",
      description: "Acrylic signs, also known .....",
      icon: "/circle-wood.png",
      size: "25 x 10 mm",
      color: "#DDA534"
    },
    {
      id: "6",
      tiltle: "Circle wood whited",
      description: "Acrylic signs, also known .....",
      icon: "/circle-wood.png",
      size: "25 x 10 mm",
      color: "#DDA534"
    },
  ];
  const resourceName = {
    singular: "Component",
    plural: "Components",
  };

  const rowMarkup = components.map(
    (
      { id, tiltle, description, icon, size, color },
      index,
    ) => (
      <IndexTable.Row
        id={id}
        key={id}
       
        position={index}
      >
        
        
        <IndexTable.Cell>
             {tiltle}
        </IndexTable.Cell>
        <IndexTable.Cell>{description}</IndexTable.Cell>
        <IndexTable.Cell>
          <InlineStack align="center">

          <img style={{height: "30px"}}
            src={icon}
            alt={"product thumbnail" + tiltle}
          />
          </InlineStack>
        </IndexTable.Cell>
        <IndexTable.Cell><Badge tone="success" >{size}</Badge></IndexTable.Cell>
        <IndexTable.Cell><Badge tone="critical" >{color}</Badge></IndexTable.Cell>
        <IndexTable.Cell>
          <ButtonGroup gap="loose" >
            <EditIconBtn  size="micro"  />
            <DeleteIconBtn  size="micro" />
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
                onClick={onHandleCreate}
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
        itemCount={components.length}
          selectable={false}
        
          sortable={[false, true, true, true, true, true, true]}
          headings={[
            { title: "Title" },
            { title: "Desciption"},
            { title: "Icon" },
            { title: "Sise" },
            { title: "Color" },
            { title: "Action"},
          ]}
        >
          {rowMarkup}
        </IndexTable>
      </SpacingBackground>
   
  );
}









