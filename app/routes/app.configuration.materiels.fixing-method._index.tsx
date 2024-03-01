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
      price: "25$",
    }, 
    {
      id: "2",
      title: "Adhesive Tape",
      image: "/fixing-method/adhesive-tape.png",
      price: "25$",
    }, 
    {
      id: "3",
      title: "Screw",
      image: "/fixing-method/screw.png",
      price: "25$",
    }, 
    {
      id: "4",
      title: "Screw and Tape",
      image: "/fixing-method/screw-tape.png",
      price: "25$",
    }, 
    {
      id: "5",
      title: "Magnetic Strip",
      image: "/fixing-method/magnetic-trap.png",
      price: "25$",
    }, 
  ];
  const resourceName = {
    singular: "Fixing method",
    plural: "Fixing methods",
  };

  const rowMarkup = fixingMethods.map(
    ({ id, title, image, price }, index) => (
      <IndexTable.Row id={id} key={id} position={index}>
        <IndexTable.Cell>
          <InlineStack blockAlign="start" gap="300">
            {title}
          </InlineStack>
        </IndexTable.Cell>
        <IndexTable.Cell>
        <img style={{height: "30px"}}
            src={image}
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
                    <span className="primary-btn-text"> Add new fixing method</span>
                  </InlineStack>
                </Box>
              </button>
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
            { title: "Image" },
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
