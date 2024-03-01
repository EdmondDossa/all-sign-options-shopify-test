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

export default function MaterialColorIndex() {
 
  const navigate = useNavigate();
  const onHandleColorCreate = () => {
    navigate("create");
  };

  const sizes = [
    {
      id: "1",
      title: "col-a",
      textColor: "#EF5A35",
      BackgroundColor: "#EF5A35",
      price: "225$",
    },  
    {
      id: "2",
      title: "col-a",
      textColor: "#EF5A35",
      BackgroundColor: "#EF5A35",
      price: "225$",
    },  
    {
      id: "3",
      title: "col-a",
      textColor: "#EF5A35",
      BackgroundColor: "#EF5A35",
      price: "225$",
    },  
    {
      id: "4",
      title: "col-a",
      textColor: "#EF5A35",
      BackgroundColor: "#EF5A35",
      price: "225$",
    },  
    {
      id: "5",
      title: "col-a",
      textColor: "#EF5A35",
      BackgroundColor: "#EF5A35",
      price: "225$",
    },  
    {
      id: "6",
      title: "col-a",
      textColor: "#EF5A35",
      BackgroundColor: "#EF5A35",
      price: "225$",
    },
       
  ];
  const resourceName = {
    singular: "Color",
    plural: "Colors",
  };
  const { selectedResources, allResourcesSelected, handleSelectionChange } =
    useIndexResourceState(sizes);
  const rowMarkup = sizes.map(
    ({ id, title, textColor, BackgroundColor,price }, index) => (
      <IndexTable.Row id={id} key={id} position={index}>
        <IndexTable.Cell>
          <InlineStack blockAlign="start" gap="300">
            {title}
          </InlineStack>
        </IndexTable.Cell>
        <IndexTable.Cell><Badge tone="critical" >{textColor}</Badge></IndexTable.Cell>
        <IndexTable.Cell>
          <Badge tone="info">{BackgroundColor}</Badge>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Badge tone="success" >{price}</Badge>
        </IndexTable.Cell>

        <IndexTable.Cell>
          <ButtonGroup gap="loose">
            <EditIconBtn size="micro" />
            <DeleteIconBtn size="micro" />
          </ButtonGroup>
        </IndexTable.Cell>
      </IndexTable.Row>
    ),
  );
  return (
    <div>
      <BoxBackground>
        <BoxBackground>
          <Box padding="150">
            <InlineStack gap="100" align="end">
              <button
                className="primary-btn"
                type="button"
                onClick={onHandleColorCreate}
              >
                <Box paddingInline="300">
                  <InlineStack gap="300">
                    <PlusIcon />
                    <span className="primary-btn-text">Add new color palette</span>
                  </InlineStack>
                </Box>
              </button>
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
            { title: "Text color" },
            { title: "Background color" },
            { title: "Additional price" },
            { title: "Action" },
          ]}
          selectable={false}
        >
          {rowMarkup}
        </IndexTable>
      </BoxBackground>

    
    </div>
  );
}
