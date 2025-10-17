import {
  Box,
  ButtonGroup,
  Card,
  Divider,
  IndexTable,
  InlineStack,
  Text,
} from "@shopify/polaris";
import { EditIconBtn } from "~/components/buttons/EditIconBtn";
import { useNavigate, useOutletContext, useSubmit } from "@remix-run/react";
import { BoxBackground } from "~/components/layouts/BoxBackground";
import { SpacingBackground } from "~/components/layouts/SpacingBackground";

import { ShapeType } from "~/types/SettingsType";
import { fileUrl } from "~/utils/fileUrl";

export default function MaterialFixingMethod() {
  const submit = useSubmit();
  const navigate = useNavigate();
  const { shapes } = useOutletContext<{ shapes: ShapeType[] }>();

  const handleUpdate = (id: string) => {
    submit({ id: id }, { method: "GET", action: "edit" });
  };
  const resourceName = {
    singular: "Shape",
    plural: "Shapes",
  };

  const rowMarkup = shapes?.map(({ name, value, icon }, index) => (
    <IndexTable.Row id={value} key={value} position={index}>
      <IndexTable.Cell>{name}</IndexTable.Cell>
      <IndexTable.Cell className="td-center">
        {icon && (
          <img
            style={{ height: "30px" }}
            src={fileUrl(icon)}
            alt={"shape" + name}
          />
        )}
      </IndexTable.Cell>

      <IndexTable.Cell className="td-center">
        <ButtonGroup fullWidth noWrap gap="loose">
          <EditIconBtn
            size="micro"
            onClick={() => {
              handleUpdate(value);
            }}
          />
        </ButtonGroup>
      </IndexTable.Cell>
    </IndexTable.Row>
  ));
  return (
    <div style={{margin:"10px 0px "}}>
      <Card>
        <BoxBackground>
          <Box padding="200">
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
          itemCount={shapes ? shapes.length : 0}
          headings={[
            { title: "Title" },
            { title: "Icon", alignment: "center" },
            { title: "Action", alignment: "center" },
          ]}
          selectable={false}
        >
          {rowMarkup}
        </IndexTable>
      </Card>
    </div>
  );
}
