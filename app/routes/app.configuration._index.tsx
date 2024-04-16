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
import { useCallback, useEffect, useState } from "react";
import { DeleteIconBtn } from "~/components/buttons/DeleteIconBtn";
import { ViewIconBtn } from "~/components/buttons/ViewIconBtn";
import { EditIconBtn } from "~/components/buttons/EditIconBtn";
import { Link, json, useLoaderData, useNavigate, useSearchParams, useSubmit } from "@remix-run/react";
import { BoxBackground } from "~/components/layouts/BoxBackground";
import PlusIcon from "~/components/icons/PlusIcon";
import { SpacingBackground } from "~/components/layouts/SpacingBackground";
import { authenticate } from "~/shopify.server";
import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import prisma from "~/db.server";
import ConfigurationService from "~/models/Configuration.service";
import { getSessionCookie } from "~/sessions";
import { MessageFlash } from "~/types/MessageFlashType";
import { useAppBridge } from "@shopify/app-bridge-react";
import useHandleFlashMessage from "~/hooks/useHandleFlashMessage";
import { jFlashMessage } from "~/utils/message-flash";
import { BorderCircleText } from "~/components/feactures/BorderCircleText";
import { ManageBtn } from "~/components/buttons/ManageBtn";
import { truncateText } from "~/utils/truncate-text";



export const loader = async ({request}:LoaderFunctionArgs) => { 
  const { session, admin } = await authenticate.admin(request);

  const configurations = await prisma.configuration.findMany({
    where: {
      sessionId: session.id
    }
  });

  console.log( "my head :", request.headers)

  

  // let messageFlash = sessionCookie.get("messageFlash")

  

  return  json({configurations, messageFlash:null})
}

export const action = async ({ request }:ActionFunctionArgs) => {
  const { session, admin } = await authenticate.admin(request);
  
  const formData = await request.formData();
  const id = formData.get("id") as string;
  const method = request.method;
  console.log(" config deleeting :", id,method);
  
  switch (method) {
    case "DELETE": {
      console.log("start deleting")
      await ConfigurationService.deleteConfiguration(parseInt(id), session.id)
      
      return json({...jFlashMessage("Configution deleting is completed successfull")})
      break;
    }
  
    default:
      break;
  }

  return null
}


// This example is for guidance purposes. Copying it will come with caveats.
export default function Configuration() {
  const submit = useSubmit();
  let { configurations } = useLoaderData<typeof loader>();
  useHandleFlashMessage();
 


  const navigate = useNavigate();
  const onHandleConfigurationCreate = () => {
    navigate('/app/configuration/create');
  };
  
  const handeleDelete = (id: number) => {
    submit({ id: id }, { method: "DELETE" });
  };

  const handleUpdate = (id: number) => {
    
    submit({id:id},{method:"GET", action:"create"});
  }

  const handleMaterials = (id: number) => {
    
    navigate(`${id}/materials`);
  }
  const handleSettings = (id: number) => {
    
    navigate(`${id}/settings`);
  }



  configurations = configurations || [];

  const resourceName = {
    singular: "Configuration",
    plural: "Configurations",
  };
  const { selectedResources, allResourcesSelected, handleSelectionChange } =
    useIndexResourceState(configurations);
  const rowMarkup = configurations.map(
    (
      { id, name, description, icon, popupImg },
      index,
    ) => (
      <IndexTable.Row
        id={`${id}`}
        key={id}
        selected={selectedResources.includes(`${id}`)}
        position={index}
      >
        
        <IndexTable.Cell>
          <InlineStack blockAlign="center" gap="300">
             <BorderCircleText text={name} /> {truncateText(name)}
          </InlineStack>
         
        </IndexTable.Cell>
        <IndexTable.Cell ><Text  truncate as="p">{truncateText(description)}</Text></IndexTable.Cell>
        <IndexTable.Cell>
          <img style={{height: "30px"}}
            src={icon}
            alt={"product thumbnail" + name}
          />
        </IndexTable.Cell>
        <IndexTable.Cell>
          <img style={{height: "30px"}}
            src={popupImg}
            alt={"product thumbnail" + name}
          />
        </IndexTable.Cell>
      
        <IndexTable.Cell>
          <ButtonGroup gap="loose" >
            <ManageBtn  title="setting" handleClick={()=>handleSettings(id)}/>
            <ViewIconBtn  size="micro" onClick={()=>handleMaterials(id)} />
            <EditIconBtn  size="micro"  onClick={()=>{handleUpdate(id)}} />
            <DeleteIconBtn  size="micro" onClick={()=>{handeleDelete(id)}} />
          </ButtonGroup>
        </IndexTable.Cell>
      </IndexTable.Row>
    ),
  );
  return (
    <Page
      fullWidth
    >
      <SpacingBackground >
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
                    <span className="primary-btn-text"> Add new configuration</span>
                  </InlineStack>
                </Box>
              </button>
            
              </InlineGrid>
            
            </BlockStack>
          </Box>
        
        </BoxBackground>
        <IndexTable
          resourceName={resourceName}
          itemCount={configurations.length}
      selectable={false}
          headings={[
            { title: "Name configuration" },
            { title: "Desciption"},
            { title: "Icon" },
            { title: "Poppupimg" },
            { title: "Action"},
          ]}
        >
          {rowMarkup}
        </IndexTable>
        <Divider borderWidth="050" />
        {/* <SpacingBackground backgroundColor="#FFFFFF">
        <Box padding="300">
          <FooterLabel/>
        </Box>
        </SpacingBackground> */}
      </SpacingBackground>
    </Page>
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









