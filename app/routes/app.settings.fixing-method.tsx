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

  const fixingMethods = [
    {
      id: "1",
      title: "None",
      image: "/fixing-method/none.png",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    }, 
    {
      id: "2",
      title: "Adhesive Tape",
      image: "/fixing-method/adhesive-tape.png",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    }, 
    {
      id: "3",
      title: "Screw",
      image: "/fixing-method/screw.png",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    }, 
    {
      id: "4",
      title: "Screw and Tape",
      image: "/fixing-method/screw-tape.png",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    }, 
    {
      id: "5",
      title: "Magnetic Strip",
      image: "/fixing-method/magnetic-trap.png",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    }, 
  ];
  const resourceName = {
    singular: "Fixing method",
    plural: "Fixing methods",
  };

  const rowMarkup = fixingMethods.map(
    ({ id, title, image, description }, index) => (
      <IndexTable.Row id={id} key={id} position={index}>
        <IndexTable.Cell>
          <InlineStack blockAlign="start" gap="300">
            {title}
          </InlineStack>
        </IndexTable.Cell>
        <IndexTable.Cell>
          {description}
        </IndexTable.Cell>

        <IndexTable.Cell>
        <img style={{height: "30px"}}
            src={image}
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
          <Text as="h6" variant="bodyMd" fontWeight="bold">List of fixing method</Text>
        </InlineStack>
      </Box>
      <Divider borderWidth="050" />
    </BoxBackground>
        <IndexTable
          resourceName={resourceName}
          itemCount={fixingMethods.length}
          sortable={[false, true, true, true, true, true, true]}
          headings={[
            { title: "Title" },
            { title: "Description" },
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
