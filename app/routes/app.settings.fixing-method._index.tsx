import {
  Box,
  ButtonGroup,
  Divider,
  IndexTable,
  InlineStack,
  Text,
} from "@shopify/polaris";
import { EditIconBtn } from "~/components/buttons/EditIconBtn";
import { Form, Link, NavLink, Outlet, useLoaderData, useNavigate, useOutletContext, useSubmit } from "@remix-run/react";
import { BoxBackground } from "~/components/layouts/BoxBackground";
import { SpacingBackground } from "~/components/layouts/SpacingBackground";
import { FixingMethodType } from "~/types/SettingsType";


export default function SettingFixingMethod() {
  const submit = useSubmit()
  const navigate = useNavigate();
  const { fixingMethods } = useOutletContext<{fixingMethods:FixingMethodType[]}>();

  const handleUpdate = (id: string) => {
    
    submit({id:id},{method:"GET", action:"edit"});
  }
  const resourceName = {
    singular: "Fixing method",
    plural: "Fixing methods",
  };

  const rowMarkup = fixingMethods?.map(
    ({ name, popImg,icon, description,type }, index) => (
      <IndexTable.Row id={type} key={type} position={index}>
        <IndexTable.Cell>
          <InlineStack blockAlign="start" gap="300">
            {name}
          </InlineStack>
        </IndexTable.Cell>
        <IndexTable.Cell>
          {description}
        </IndexTable.Cell>

        <IndexTable.Cell>
        <img style={{height: "30px"}}
            src={popImg}
            alt={"Fixing method" + name}
          />
        </IndexTable.Cell>
        <IndexTable.Cell>
        <img style={{height: "30px"}}
            src={icon}
            alt={"Fixing method" + name}
          />
        </IndexTable.Cell>
       

        <IndexTable.Cell>
          <ButtonGroup gap="loose">
          <EditIconBtn  size="micro"  onClick={()=>{handleUpdate(type)}} />
          </ButtonGroup>
        </IndexTable.Cell>
      </IndexTable.Row>
    ),
  );
  return (
    <SpacingBackground margin="10px 0px ">
    <BoxBackground>
      <Box padding="400" >
        <InlineStack gap="100" align="start">
          <Text as="h6" variant="bodyMd" fontWeight="bold">List of fixing method</Text>
        </InlineStack>
      </Box>
      <Divider borderWidth="050" />
    </BoxBackground>
        <IndexTable
          resourceName={resourceName}
          itemCount={fixingMethods?fixingMethods.length:0}
          sortable={[false, true, true, true, true, true, true]}
          headings={[
            { title: "Title" },
            { title: "Description" },
            { title: "Image" },
            { title: "Icon" },
            { title: "Action" },
          ]}
          selectable={false}
        >
          {rowMarkup}
        </IndexTable>
      </SpacingBackground>
  );
}
