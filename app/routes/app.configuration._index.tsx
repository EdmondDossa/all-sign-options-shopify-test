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


// This example is for guidance purposes. Copying it will come with caveats.
export default function Configuration() {
 
 


  const navigate = useNavigate();
  const onHandleConfigurationCreate = () => {
    navigate('/app/configuration/create');
  };
  
 
  
  



  const products = [
    {
      id: "1",
      product: "Acrylic signs",
      description: "Acrylic signs, also known .....",
      icon: "/acrylsign-icon.png",
      poppupimg: "/acrylsign-poppupimg.png"
    },
    {
      id: "2",
      product: "Acrylic signs",
      description: "Acrylic signs, also known .....",
      icon: "/acrylsign-icon.png",
      poppupimg: "/acrylsign-poppupimg.png"
    },
    {
      id: "3",
      product: "Acrylic signs",
      description: "Acrylic signs, also known .....",
      icon: "/acrylsign-icon.png",
      poppupimg: "/acrylsign-poppupimg.png"
    },
    {
      id: "4",
      product: "Acrylic signs",
      description: "Acrylic signs, also known .....",
      icon: "/acrylsign-icon.png",
      poppupimg: "/acrylsign-poppupimg.png"
    },
    {
      id: "5",
      product: "Acrylic signs",
      description: "Acrylic signs, also known .....",
      icon: "/acrylsign-icon.png",
      poppupimg: "/acrylsign-poppupimg.png"
    },
    {
      id: "6",
      product: "Acrylic signs",
      description: "Acrylic signs, also known .....",
      icon: "/acrylsign-icon.png",
      poppupimg: "/acrylsign-poppupimg.png"
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
      { id, product, description, icon, poppupimg },
      index,
    ) => (
      <IndexTable.Row
        id={id}
        key={id}
        selected={selectedResources.includes(id)}
        position={index}
      >
        
        <IndexTable.Cell></IndexTable.Cell>
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
          <ButtonGroup gap="loose" >
            <ViewIconBtn  size="micro" />
            <EditIconBtn  size="micro"  />
            <DeleteIconBtn  size="micro" />
          </ButtonGroup>
        </IndexTable.Cell>
      </IndexTable.Row>
    ),
  );
  return (
    <Page
      fullWidth
    >
      <Card padding="0">
        <BoxBackground>
          <Box padding="300">
          <BlockStack gap="300">

              <InlineGrid columns="1fr auto">
                <Text as="h2" variant="headingMd">
                  List of configurations
                </Text>

                <InlineStack gap="100">

                  <Text as="strong" variant="bodyMd">
                    11 
                  </Text>
                  <Text as="span" tone="subdued">
                    configurations
                  </Text>
                </InlineStack>
              </InlineGrid>
              
              <InlineGrid columns="1fr auto">
                <Text as="h2" variant="headingMd">
                
                </Text>
                <button
                className="primary-btn"
                type="button"
                onClick={onHandleConfigurationCreate}
              >
                <Box paddingInline="300">
                  <InlineStack gap="300">
                    <PlusIcon/>
                    <span className="primary-btn-text"> Add new option</span>
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
          selectedItemsCount={
            allResourcesSelected ? "All" : selectedResources.length
          }
          onSelectionChange={handleSelectionChange}
          sortable={[false, true, true, true, true, true, true]}
          headings={[
            { title: "" },
            { title: "Name configuration" },
            { title: "Desciption"},
            { title: "Icon" },
            { title: "Poppupimg" },
            { title: "Action"},
          ]}
        >
          {rowMarkup}
        </IndexTable>
        <Divider borderWidth="050"/>
        <Box padding="300">
          <FooterLabel/>
        </Box>
      </Card>
    </Page>
  );
}


export const BorderCircleText = () => {
  
  return (<Box padding="150"  borderColor="border-brand" borderWidth="025" borderRadius="full" background="bg-surface-secondary" width="34px" minHeight="34px">
    AS
  </Box>)
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





