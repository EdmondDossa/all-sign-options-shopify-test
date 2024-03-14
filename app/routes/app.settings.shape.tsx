import {
  Badge,
  BlockStack,
  Box,
  Button,
  ButtonGroup,
  Card,
  Checkbox,
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
  TextField,
  useIndexResourceState,
  useSetIndexFiltersMode,
} from "@shopify/polaris";
import { useCallback, useState } from "react";
import { DeleteIconBtn } from "~/components/buttons/DeleteIconBtn";
import { ViewIconBtn } from "~/components/buttons/ViewIconBtn";
import { EditIconBtn } from "~/components/buttons/EditIconBtn";
import { Form, Link, NavLink, Outlet, useNavigate } from "@remix-run/react";
import { BoxBackground } from "~/components/layouts/BoxBackground";
import PlusIcon from "~/components/icons/PlusIcon";
import { SpacingBackground } from "~/components/layouts/SpacingBackground";

export default function MaterialFixingMethod() {
  const navigate = useNavigate();
  const onHandleCreate = () => {
    navigate("create");
  };

  const shapes = [
    {
      id: "1",
      title: "Stop",
      image: "/shape/stop.png",
  
    },
    {
      id: "2",
      title: "Triangle",
      image: "/shape/triangle.png",

    },
    {
      id: "3",
      title: "Rounded corners",
      image: "/shape/rounded-corners.png",
   
    },
    {
      id: "4",
      title: "Rounded Square",
      image: "/shape/rounded-square.png",
      
    },
    {
      id: "5",
      title: "Thomy",
      image: "/shape/thomy.png",
     
    },
  ];
  const resourceName = {
    singular: "Shape",
    plural: "Shapes",
  };

  const rowMarkup = shapes.map(({ id, title, image }, index) => (
    <IndexTable.Row id={id} key={id} position={index}>
      <IndexTable.Cell>
          {title}
      </IndexTable.Cell>
      <IndexTable.Cell>
        <img style={{ height: "30px" }} src={image} alt={"border" + title} />
      </IndexTable.Cell>



      <IndexTable.Cell>
        <ButtonGroup gap="loose">
          <EditIconBtn size="micro" />
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
        itemCount={shapes.length}
        sortable={[false, true, true, true, true, true, true]}
        headings={[
          { title: "Title" },
          { title: "Image" },
          { title: "Action" },
        ]}
        selectable={false}
      >
        {rowMarkup}
      </IndexTable>
    </SpacingBackground>
  );
}
