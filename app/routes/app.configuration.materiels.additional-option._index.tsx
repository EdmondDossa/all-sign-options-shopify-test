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


// This example is for guidance purposes. Copying it will come with caveats.
export default function MaterialAdditionalOptionIndex() {
  
  const navigate = useNavigate();
  const onHandleCreate = () => {
    navigate("create");
  };

  const onHandleConfigurationCreate = () => {
    navigate('/app/configuration/create');
  };
  
  const AdditionalOptions = [
    {
      id: "1",
      tiltle: "Acrylic signs",
      description: "Acrylic signs, also known .....",
      icon: "/acrylsign-icon.png",
      price: "25$"
    },
    {
      id: "2",
      tiltle: "Acrylic signs",
      description: "Acrylic signs, also known .....",
      icon: "/acrylsign-icon.png",
      price: "25$"
    },
    {
      id: "3",
      tiltle: "Acrylic signs",
      description: "Acrylic signs, also known .....",
      icon: "/acrylsign-icon.png",
      price: "25$"
    },
    {
      id: "4",
      tiltle: "Acrylic signs",
      description: "Acrylic signs, also known .....",
      icon: "/acrylsign-icon.png",
      price: "25$"
    },
    {
      id: "5",
      tiltle: "Acrylic signs",
      description: "Acrylic signs, also known .....",
      icon: "/acrylsign-icon.png",
      price: "25$"
    },
    {
      id: "6",
      tiltle: "Acrylic signs",
      description: "Acrylic signs, also known .....",
      icon: "/acrylsign-icon.png",
      price: "25$"
    },
  ];
  const resourceName = {
    singular: "Additional option",
    plural: "Additionals options",
  };

  const rowMarkup = AdditionalOptions.map(
    (
      { id, tiltle, description, icon, price },
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
          <img style={{height: "30px"}}
            src={icon}
            alt={"product thumbnail" + tiltle}
          />
        </IndexTable.Cell>
        <IndexTable.Cell>
        <Badge tone="success" >{price}</Badge>
        </IndexTable.Cell>
      
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
    
     <SpacingBackground width="100%" height="auto" margin="16px 0px ">
        <BoxBackground>
          <Box padding="300">
          <BlockStack gap="300">
          <InlineStack gap="100" align="space-between" >

                <Text as="h2" variant="headingMd">
                  {/* List of configurations */}
                </Text>
              <button
                className="primary-btn"
                type="button"
                onClick={onHandleCreate}
              >
                <Box paddingInline="300">
                  <InlineStack gap="300">
                    <PlusIcon/>
                    <span className="primary-btn-text"> Add new option</span>
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
        itemCount={AdditionalOptions.length}
          selectable={false}
        
          sortable={[false, true, true, true, true, true, true]}
          headings={[
            { title: "Title" },
            { title: "Desciption"},
            { title: "Icon" },
            { title: "Additional price" },
            { title: "Action"},
          ]}
        >
          {rowMarkup}
        </IndexTable>
        <Divider borderWidth="050"/>
        <Box padding="300" background="bg-surface" >
          <FooterLabel/>
        </Box>
      </SpacingBackground>
   
  );
}




export const FooterLabel = () => {
  const [selected, setSelected] = useState('10');

  const handleSelectChange = useCallback(
    (value: string) => setSelected(value),
    [],
  );

  const options = [
    {label: '10', value: '10'},
    {label: '20', value: '20'},
    {label: '30', value: '30'},
  ];

  return (

      <InlineStack blockAlign="center" align="space-between">
          <InlineStack gap="300" blockAlign="center">

        <Select
          label=""
          labelHidden
            options={options}
            onChange={handleSelectChange}
            value={selected}
          />
          <InlineStack gap="100" blockAlign="center">
            <Text as="strong">1</Text>
            <Text as="span" tone="subdued"> to</Text>
            <Text as="strong"> 10</Text>
            <Text as="span" tone="subdued"> on</Text>
            <Text as="strong"> 50</Text>
        </InlineStack>
      </InlineStack>
      <InlineStack gap="150">
        <Link className="link" to="">{ '<<' }</Link>
        <Link className="link" to="">{ '<' } </Link>
        <Text as="span" tone="subdued">page 1 on 8 </Text>
        <Link className="link" to="">{ '>' }</Link>
        <Link className="link" to="">{ '>>' } </Link>
      </InlineStack>
  </InlineStack>)
}




