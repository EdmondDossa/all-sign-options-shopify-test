import {
  Badge,
  Box,
  ButtonGroup,
  Divider,
  IndexTable,
  InlineStack,
  Text,
  useIndexResourceState,
} from "@shopify/polaris";
import { useCallback, useState } from "react";
import { DeleteIconBtn } from "~/components/buttons/DeleteIconBtn";
import { ViewIconBtn } from "~/components/buttons/ViewIconBtn";
import { EditIconBtn } from "~/components/buttons/EditIconBtn";
import { Form, Link, NavLink, Outlet, useNavigate } from "@remix-run/react";
import { BoxBackground } from "~/components/layouts/BoxBackground";
import PlusIcon from "~/components/icons/PlusIcon";
import { SpacingBackground } from "~/components/layouts/SpacingBackground";
import RoundManageHistoryIcon from "~/components/icons/RoundManageHistoryIcon";

export default function MaterialSizeIndex() {
  const navigate = useNavigate();
  const onHandleSizeCreate = () => {
    navigate("create");
  };

  const groups = [
    {
      id: "1",
      title: "Plants & nature",
      description: "Plastic, also known .....",
    },
    {
      id: "2",
      title: "Animals",
      description: "Plastic, also known .....",
    },
    {
      id: "3",
      title: "decorations festivities",
      description: "Plastic, also known .....",
    },
    {
      id: "4",
      title: "Plants & nature",
      description: "Plastic, also known .....",
    },
    {
      id: "5",
      title: "decorations festivities",
      description: "Plastic, also known .....",
    },
    {
      id: "6",
      title: "decorations festivities",
      description: "Plastic, also known .....",
    },
    {
      id: "7",
      title: "decorations festivities",
      description: "Plastic, also known .....",
    },
    {
      id: "8",
      title: "decorations festivities",
      description: "Plastic, also known .....",
    },
  ];
  const resourceName = {
    singular: "Size",
    plural: "groups",
  };
  const { selectedResources, allResourcesSelected, handleSelectionChange } =
    useIndexResourceState(groups);
  const rowMarkup = groups.map(({ id, title, description }, index) => (
    <IndexTable.Row id={id} key={id} position={index}>
      <IndexTable.Cell>{title}</IndexTable.Cell>
      <IndexTable.Cell>{description}</IndexTable.Cell>

      <IndexTable.Cell>
        <ButtonGroup gap="loose">
          <button className="add-option-btn" onClick={() => navigate(`${id}/clipart`)}>
            <InlineStack gap="100" blockAlign="center">
              {" "}
              <RoundManageHistoryIcon /> <Text as="span">
                manage cliparts
              </Text>{" "}
            </InlineStack>
          </button>
          <EditIconBtn size="micro" />
          <DeleteIconBtn size="micro" />
        </ButtonGroup>
      </IndexTable.Cell>
    </IndexTable.Row>
  ));
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
                  <span className="primary-btn-text">
                    {" "}
                    Add new clipart group
                  </span>
                </InlineStack>
              </Box>
            </button>
          </InlineStack>
        </Box>
        <Divider borderWidth="050" />
      </BoxBackground>
      <IndexTable
        resourceName={resourceName}
        itemCount={groups.length}
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
