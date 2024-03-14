import {
    Badge,
    BlockStack,
    Box,
    Button,
    ButtonGroup,
    Card,
    ChoiceList,
    Divider,
    IndexFilters,
    IndexTable,
    InlineGrid,
    InlineStack,
    Layout,
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
  import PlusIcon from "~/components/icons/PlusIcon";
  import { SpacingBackground } from "~/components/layouts/SpacingBackground";
import RoundManageHistoryIcon from "~/components/icons/RoundManageHistoryIcon";
  
  
  // This example is for guidance purposes. Copying it will come with caveats.
  export default function Configuration() {
   
   
  
  
    const navigate = useNavigate();
    const onHandleMaterialCreate = () => {
      navigate('create');
    };
    
   
    
    
  
  
  
    const products = [
      {
        id: "1",
        product: "Acrylic signs",
        description: "Acrylic signs, also known .....",
        icon: "/acrylsign-icon.png",
        poppupimg: "/acrylsign-poppupimg.png",
        behavior:"Advenced"
      },
      {
        id: "2",
        product: "Acrylic signs",
        description: "Acrylic signs, also known .....",
        icon: "/acrylsign-icon.png",
        poppupimg: "/acrylsign-poppupimg.png",
        behavior:"Simple"
      },
      {
        id: "3",
        product: "Acrylic signs",
        description: "Acrylic signs, also known .....",
        icon: "/acrylsign-icon.png",
        poppupimg: "/acrylsign-poppupimg.png",
        behavior:"Advenced"
      },
      {
        id: "4",
        product: "Acrylic signs",
        description: "Acrylic signs, also known .....",
        icon: "/acrylsign-icon.png",
        poppupimg: "/acrylsign-poppupimg.png",
        behavior:"Simple"
      },
      {
        id: "5",
        product: "Acrylic signs",
        description: "Acrylic signs, also known .....",
        icon: "/acrylsign-icon.png",
        poppupimg: "/acrylsign-poppupimg.png",
        behavior:"Simple"
      },
      {
        id: "6",
        product: "Acrylic signs",
        description: "Acrylic signs, also known .....",
        icon: "/acrylsign-icon.png",
        poppupimg: "/acrylsign-poppupimg.png",
        behavior:"Advenced"
      },
    ];
    const resourceName = {
      singular: "Configuration",
      plural: "Configurations",
    };
    const { selectedResources, allResourcesSelected, handleSelectionChange } =
      useIndexResourceState(products);
    const rowMarkup = products.map(
      (
        { id, product, description, icon, poppupimg,behavior },
        index,
      ) => (
        <IndexTable.Row
          id={id}
          key={id}
          selected={selectedResources.includes(id)}
          position={index}
        >
          
          <IndexTable.Cell>
            <InlineStack blockAlign="center" gap="300">
               <BorderCircleText /> {product}
            </InlineStack>
           
          </IndexTable.Cell>
          <IndexTable.Cell>{description}</IndexTable.Cell>
          <IndexTable.Cell>
            <img style={{height: "30px"}}
              src={icon}
              alt={"product thumbnail" + product}
            />
          </IndexTable.Cell>
          <IndexTable.Cell>
            <img style={{height: "30px"}}
              src={poppupimg}
              alt={"product thumbnail" + product}
            />
                </IndexTable.Cell>
                <IndexTable.Cell>
                    <Badge tone={behavior=="Simple"?"info":"success"}>{behavior}</Badge>

                </IndexTable.Cell>
        
          <IndexTable.Cell>
            <ButtonGroup gap="loose" >
            <button className="add-option-btn" onClick={() => navigate(behavior=="Simple"?"../materiels/size":`../materiels-advanced`)}>
            <InlineStack gap="100" blockAlign="center">
              {" "}
              <RoundManageHistoryIcon /> <Text as="span">
                manage
              </Text>{" "}
            </InlineStack>
          </button>
              <EditIconBtn  size="micro" />
              <DeleteIconBtn  size="micro" />
            </ButtonGroup>
          </IndexTable.Cell>
        </IndexTable.Row>
      ),
    );
    return (
    
        <SpacingBackground  margin="16px 0 0 0">
          <BoxBackground>
            <Box padding="300">
            <BlockStack gap="300">
  
              
                <InlineGrid columns="1fr auto">
                  <Text as="h2" variant="headingMd">
                  
                  </Text>
                  <button
                  className="primary-btn"
                  type="button"
                  onClick={onHandleMaterialCreate}
                >
                  <Box paddingInline="300">
                    <InlineStack gap="300">
                      <PlusIcon/>
                      <span className="primary-btn-text"> Add new Material</span>
                    </InlineStack>
                  </Box>
                </button>
              
                </InlineGrid>
              
              </BlockStack>
            </Box>
          
          </BoxBackground>
          <IndexTable
            resourceName={resourceName}
            itemCount={products.length}
        selectable={false}
            headings={[
              { title: "Title" },
              { title: "Desciption"},
              { title: "Icon" },
              { title: "Poppupimg" },
              { title: "Behavior (type)" },
              { title: "Action"},
            ]}
          >
            {rowMarkup}
          </IndexTable>
        </SpacingBackground>
    );
  }
  
  
  export const BorderCircleText = () => {
    
    return (<Box padding="150"  borderColor="border-brand" borderWidth="025" borderRadius="full" background="bg-surface-secondary" width="34px" minHeight="34px">
      AS
    </Box>)
  }
  
  
 
  
  
  
  
  