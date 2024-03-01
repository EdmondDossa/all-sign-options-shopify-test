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

export default function MaterialSizeIndex() {
  const [checked, setChecked] = useState(false);
  const handleChangeCheck = useCallback(
    (newChecked: boolean) => setChecked(newChecked),
    [],
  );
  const [value, setValue] = useState("Jaded Pixel");
  const handleChange = useCallback(
    (newValue: string) => setValue(newValue),
    [],
  );
  const navigate = useNavigate();
  const onHandleSizeCreate = () => {
    navigate("create");
  };

  const sizes = [
    {
      id: "1",
      title: "100X50mm",
      width: "100 mm",
      height: "50 mm",
      price: "25$",
      thickness: "NONE",
    },  {
        id: "2",
        title: "100X50mm",
        width: "100 mm",
        height: "50 mm",
        price: "25$",
        thickness: "NONE",
      },  {
        id: "3",
        title: "100X50mm",
        width: "100 mm",
        height: "50 mm",
        price: "25$",
        thickness: "NONE",
      },  {
        id: "4",
        title: "100X50mm",
        width: "100 mm",
        height: "50 mm",
        price: "25$",
        thickness: "NONE",
      },  {
        id: "5",
        title: "100X50mm",
        width: "100 mm",
        height: "50 mm",
        price: "25$",
        thickness: "NONE",
      },  {
        id: "6",
        title: "100X50mm",
        width: "100 mm",
        height: "50 mm",
        price: "25$",
        thickness: "NONE",
      },  {
        id: "7",
        title: "100X50mm",
        width: "100 mm",
        height: "50 mm",
        price: "25$",
        thickness: "NONE",
      },  {
        id: "8",
        title: "100X50mm",
        width: "100 mm",
        height: "50 mm",
        price: "25$",
        thickness: "NONE",
      },
  ];
  const resourceName = {
    singular: "Size",
    plural: "sizes",
  };
  const { selectedResources, allResourcesSelected, handleSelectionChange } =
    useIndexResourceState(sizes);
  const rowMarkup = sizes.map(
    ({ id, title, width, height, thickness,price }, index) => (
      <IndexTable.Row id={id} key={id} position={index}>
        <IndexTable.Cell>
          <InlineStack blockAlign="start" gap="300">
            {title}
          </InlineStack>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <InlineStack blockAlign="start" gap="300">
                      <Badge tone="success" >{width}</Badge>
          </InlineStack>
        </IndexTable.Cell>
        <IndexTable.Cell><Badge tone="critical" >{height}</Badge></IndexTable.Cell>
        <IndexTable.Cell>
          <Badge>{thickness}</Badge>
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
                onClick={onHandleSizeCreate}
              >
                <Box paddingInline="300">
                  <InlineStack gap="300">
                    <PlusIcon />
                    <span className="primary-btn-text"> Add new SIZE</span>
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
            { title: "Width" },
            { title: "Height" },
            { title: "Thickness" },
            { title: "price" },
            { title: "Action" },
          ]}
          selectable={false}
        >
          {rowMarkup}
        </IndexTable>
      </BoxBackground>

      <SpacingBackground width="100%" height="auto" margin="16px 0px ">
        <BoxBackground>
          <Form method="POST">
            <Box paddingInline="300" paddingBlock="1000">
              <Box paddingBlockEnd="600">
                <InlineStack blockAlign="center" gap="200">
                  <Text as="strong" variant="headingMd">
                    Custum Size
                  </Text>
                  <Checkbox
                    label=""
                    checked={checked}
                    onChange={handleChangeCheck}
                  />
                </InlineStack>
              </Box>
              <InlineGrid columns={2} gap="800">
                <TextField
                  label="Width label"
                  value={value}
                  onChange={handleChange}
                  autoComplete="off"
                />{" "}
                <TextField
                  label="Height label"
                  value={value}
                  onChange={handleChange}
                  autoComplete="off"
                />{" "}
                <TextField
                  size="medium"
                  label="Min width"
                  value={value}
                  onChange={handleChange}
                  autoComplete="off"
                />
                <TextField
                  size="medium"
                  label="Max width"
                  value={value}
                  onChange={handleChange}
                  autoComplete="off"
                />
                <TextField
                  size="medium"
                  label="Min height"
                  value={value}
                  onChange={handleChange}
                  autoComplete="off"
                />
                <TextField
                  size="medium"
                  label="Max height"
                  value={value}
                  onChange={handleChange}
                  autoComplete="off"
                />
              </InlineGrid>
            </Box>
            <Divider borderWidth="050" />
            <Box paddingInline="300" paddingBlock="300">
              <InlineStack align="end" gap="600">
                <button className="next-large-btn" type="submit">
                  <Box paddingInline="1000">
                    <InlineStack gap="300">
                      <span style={{ color: "white", fontWeight: "bold" }}>
                        {" "}
                        Save
                      </span>
                    </InlineStack>
                  </Box>
                </button>
              </InlineStack>
            </Box>
          </Form>
        </BoxBackground>
      </SpacingBackground>
    </div>
  );
}
