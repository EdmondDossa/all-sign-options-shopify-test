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
      title: "Mont-1",
      description: "Plastic, also known .....",
    },  {
        id: "2",
        title: "Mont-1",
        description: "Plastic, also known .....",
      },  {
        id: "3",
        title: "Mont-1",
        description: "Plastic, also known .....",
      },  {
        id: "4",
        title: "Mont-1",
        description: "Plastic, also known .....",
      },  {
        id: "5",
        title: "Mont-1",
        description: "Plastic, also known .....",
      },  {
        id: "6",
        title: "Mont-1",
        description: "Plastic, also known .....",
      },  {
        id: "7",
        title: "Mont-1",
        description: "Plastic, also known .....",
      },  {
        id: "8",
        title: "Mont-1",
        description: "Plastic, also known .....",
      },
  ];
  const resourceName = {
    singular: "Size",
    plural: "sizes",
  };
  const { selectedResources, allResourcesSelected, handleSelectionChange } =
    useIndexResourceState(sizes);
  const rowMarkup = sizes.map(
    ({ id, title, description}, index) => (
      <IndexTable.Row id={id} key={id} position={index}>
        <IndexTable.Cell>
            {title}
        </IndexTable.Cell>
        <IndexTable.Cell>
              {description}
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
    <SpacingBackground width="100%" height="auto" margin="16px 0px ">

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
                    <span className="primary-btn-text"> Add new Font</span>
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
            { title: "Description" },
            { title: "Action" },
          ]}
          selectable={false}
        >
          {rowMarkup}
        </IndexTable>
      </SpacingBackground>


  );
}
