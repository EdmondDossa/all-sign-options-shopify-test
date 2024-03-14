import {
  Text,
  Box,
  ButtonGroup,
  Divider,
  IndexTable,
  InlineStack,
  useIndexResourceState,
} from "@shopify/polaris";
import { DeleteIconBtn } from "~/components/buttons/DeleteIconBtn";
import { EditIconBtn } from "~/components/buttons/EditIconBtn";
import { Form, Link, NavLink, Outlet, useNavigate } from "@remix-run/react";
import { BoxBackground } from "~/components/layouts/BoxBackground";
import PlusIcon from "~/components/icons/PlusIcon";
import { SpacingBackground } from "~/components/layouts/SpacingBackground";

export default function MaterialBorderIndex() {
 
  
  const navigate = useNavigate();
  const onHandleCreate = () => {
    navigate("create");
  };

  const sizes = [
    {
      id: "1",
      title: "None",
      icon: "/border/none.png",
    }, 
    {
      id: "1",
      title: "Stop",
      icon: "/border/stop.png",
    }, 
    {
      id: "1",
      title: "Triangle",
      icon: "/border/triangle.png",
    }, 
    {
      id: "1",
      title: "Rounded corners",
      icon: "/border/rounded-corners.png",
    }, 
    {
      id: "1",
      title: "Thomy",
      icon: "/border/thomy.png",
    }, 
  ];
  const resourceName = {
    singular: "Border",
    plural: "Borders",
  };
  const { selectedResources, allResourcesSelected, handleSelectionChange } =
    useIndexResourceState(sizes);
  const rowMarkup = sizes.map(
    ({ id, title, icon }, index) => (
      <IndexTable.Row id={id} key={id} position={index}>
        <IndexTable.Cell>
          <InlineStack blockAlign="start" gap="300">
            {title}
          </InlineStack>
        </IndexTable.Cell>
        <IndexTable.Cell>
        <img style={{height: "30px"}}
            src={icon}
            alt={"border" + title}
          />
        </IndexTable.Cell>
       
        

        <IndexTable.Cell>
          <ButtonGroup gap="loose">
            <EditIconBtn size="micro" />
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
              <Text as="h6" variant="bodyMd" fontWeight="bold">List of Border</Text>
            </InlineStack>
          </Box>
          <Divider borderWidth="050" />
        </BoxBackground>
        <IndexTable
          resourceName={resourceName}
          itemCount={sizes.length}
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
