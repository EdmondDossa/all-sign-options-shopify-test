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
      price: "25$",
    }, 
    {
      id: "1",
      title: "Stop",
      icon: "/border/stop.png",
      price: "25$",
    }, 
    {
      id: "1",
      title: "Triangle",
      icon: "/border/triangle.png",
      price: "25$",
    }, 
    {
      id: "1",
      title: "Rounded corners",
      icon: "/border/rounded-corners.png",
      price: "25$",
    }, 
    {
      id: "1",
      title: "Thomy",
      icon: "/border/thomy.png",
      price: "25$",
    }, 
  ];
  const resourceName = {
    singular: "Border",
    plural: "Borders",
  };
  const { selectedResources, allResourcesSelected, handleSelectionChange } =
    useIndexResourceState(sizes);
  const rowMarkup = sizes.map(
    ({ id, title, icon, price }, index) => (
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
          <Badge tone="critical" >{price}</Badge>
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
                onClick={onHandleCreate}
              >
                <Box paddingInline="300">
                  <InlineStack gap="300">
                    <PlusIcon />
                    <span className="primary-btn-text"> Add new border</span>
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
            { title: "Icon" },
            { title: "Additional Price" },
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
