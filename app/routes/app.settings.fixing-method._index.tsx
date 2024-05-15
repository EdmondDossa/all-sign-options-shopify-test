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
import { fileUrl } from "~/utils/fileUrl";


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
        <IndexTable.Cell className="td-center">{ icon &&
        <img style={{height: "30px"}}
            src={fileUrl(icon)}
            alt={"Fixing method" + name}
          />}
        </IndexTable.Cell>
       

        <IndexTable.Cell className="td-center">
          <ButtonGroup  noWrap gap="loose">
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
          headings={[
            { title: "Title" },
            { title: "Description" },
            { title: "Icom" , alignment:"center" },
            { title: "Action", alignment:"center" },
          ]}
          selectable={false}
        >
          {rowMarkup}
        </IndexTable>
      </SpacingBackground>
  );
}
