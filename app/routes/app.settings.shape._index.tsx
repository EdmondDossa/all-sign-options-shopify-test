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
import { LoaderFunctionArgs, json } from "@remix-run/node";
import { authenticate } from "~/shopify.server";
import SettingShapesService from "~/models/SettingShapes.service";
import { ShapeType } from "~/types/SettingsType";


export default function MaterialFixingMethod() {
  const submit = useSubmit()
  const navigate = useNavigate();
  const { shapes } = useOutletContext<{shapes:ShapeType[]}>();

  const handleUpdate = (id: string) => {
    
    submit({id:id},{method:"GET", action:"edit"});
  }
  const resourceName = {
    singular: "Shape",
    plural: "Shapes",
  };

  const rowMarkup = shapes?.map(({ name, value, icon }, index) => (
    <IndexTable.Row id={value} key={value} position={index}>
      <IndexTable.Cell>
          {name}
      </IndexTable.Cell>
      <IndexTable.Cell>
        <img style={{ height: "30px" }} src={icon} alt={"shape" + name} />
      </IndexTable.Cell>



      <IndexTable.Cell>
        <ButtonGroup gap="loose">
        <EditIconBtn  size="micro"  onClick={()=>{handleUpdate(value)}} />
        </ButtonGroup>
      </IndexTable.Cell>
    </IndexTable.Row>
  ));
  return (
    <SpacingBackground margin="10px 0px ">
      <BoxBackground>
        <Box padding="400">
          <InlineStack gap="100" align="start">
            <Text as="h6" variant="bodyMd" fontWeight="bold">
            List of shapes
            </Text>
          </InlineStack>
        </Box>
        <Divider borderWidth="050" />
      </BoxBackground>
      <IndexTable
        resourceName={resourceName}
        itemCount={shapes?shapes.length:0}
        sortable={[false, true, true, true, true, true, true]}
        headings={[
          { title: "Title" },
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
