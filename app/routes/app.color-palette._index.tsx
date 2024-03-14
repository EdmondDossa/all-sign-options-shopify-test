import {
  Badge,
  Box,
  ButtonGroup,
  Divider,
  IndexTable,
  InlineStack,
} from "@shopify/polaris";
import { DeleteIconBtn } from "~/components/buttons/DeleteIconBtn";
import { EditIconBtn } from "~/components/buttons/EditIconBtn";
import { Form, Link, NavLink, Outlet, useNavigate } from "@remix-run/react";
import { BoxBackground } from "~/components/layouts/BoxBackground";
import PlusIcon from "~/components/icons/PlusIcon";
import { SpacingBackground } from "~/components/layouts/SpacingBackground";

export default function ColorPaletteIndex() {


  const navigate = useNavigate();
  const onHandleCreate = () => {
    navigate("create");
  };

  const colors = [
    {
      id: "1",
      title: "col-a",
      textColor: "#EF5A35",
      BackgroundColor: "#EF5A35",
    },  
    {
      id: "2",
      title: "col-a",
      textColor: "#EF5A35",
      BackgroundColor: "#EF5A35",
    },  
    {
      id: "3",
      title: "col-a",
      textColor: "#EF5A35",
      BackgroundColor: "#EF5A35",
    },  
    {
      id: "4",
      title: "col-a",
      textColor: "#EF5A35",
      BackgroundColor: "#EF5A35",
    },  
    {
      id: "5",
      title: "col-a",
      textColor: "#EF5A35",
      BackgroundColor: "#EF5A35",
    },  
    {
      id: "6",
      title: "col-a",
      textColor: "#EF5A35",
      BackgroundColor: "#EF5A35",
    },
       
  ];
  const resourceName = {
    singular: "Color",
    plural: "Colors",
  };
 
  const rowMarkup = colors.map(
    ({ id, title, textColor, BackgroundColor }, index) => (
      <IndexTable.Row id={id} key={id} position={index}>
        <IndexTable.Cell>
          <InlineStack blockAlign="start" gap="300">
            {title}
          </InlineStack>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <InlineStack blockAlign="start" gap="300">
                      <Badge tone="critical" >{textColor}</Badge>
          </InlineStack>
        </IndexTable.Cell>
        <IndexTable.Cell><Badge >{BackgroundColor}</Badge></IndexTable.Cell>
       
     

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
                onClick={onHandleCreate}
              >
                <Box paddingInline="300">
                  <InlineStack gap="300">
                    <PlusIcon />
                    <span className="primary-btn-text"> Add new color</span>
                  </InlineStack>
                </Box>
              </button>
            </InlineStack>
          </Box>
          <Divider borderWidth="050" />
        </BoxBackground>
        <IndexTable
          resourceName={resourceName}
          itemCount={colors.length}
          sortable={[false, true, true, true, true, true, true]}
          headings={[
            { title: "Title" },
            { title: "Text color" },
            { title: "Background color" },
            { title: "Action" },
          ]}
          selectable={false}
        >
          {rowMarkup}
        </IndexTable>
      </SpacingBackground>


  );
}
