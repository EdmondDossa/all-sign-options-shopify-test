import {
  Box,
  ButtonGroup,
  Divider,
  IndexTable,
  InlineStack,
  Text,
} from "@shopify/polaris";
import { EditIconBtn } from "~/components/buttons/EditIconBtn";
import { useNavigate, useOutletContext, useSubmit } from "@remix-run/react";
import { BoxBackground } from "~/components/layouts/BoxBackground";
import { SpacingBackground } from "~/components/layouts/SpacingBackground";
import { BorderType } from "~/types/SettingsType";
import { fileUrl } from "~/utils/fileUrl";

export default function MaterialFixingMethod() {
  const submit = useSubmit();
  const navigate = useNavigate();
  const { borders } = useOutletContext<{ borders: BorderType[] }>();

  const handleUpdate = (id: string) => {
    submit({ id: id }, { method: "GET", action: "edit" });
  };
  const resourceName = {
    singular: "Border",
    plural: "Borders",
  };

  const rowMarkup = borders?.map(({ name, icon, value }, index) => (
    <IndexTable.Row id={value} key={value} position={index}>
      <IndexTable.Cell>
        <InlineStack blockAlign="start" gap="300">
          {name}
        </InlineStack>
      </IndexTable.Cell>
      <IndexTable.Cell className="td-center">
        {icon && (
          <img
            style={{ height: "30px" }}
            src={fileUrl(icon)}
            alt={"border" + name}
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
    <SpacingBackground margin="10px 0px ">
      <BoxBackground>
        <Box padding="400">
          <InlineStack gap="100" align="start">
            <Text as="h6" variant="bodyMd" fontWeight="bold">
              List of Border
            </Text>
          </InlineStack>
        </Box>
        <Divider borderWidth="050" />
      </BoxBackground>
      <IndexTable
        resourceName={resourceName}
        itemCount={borders ? borders.length : 0}
        headings={[
          { title: "Title" },
          { title: "Icon", alignment: "center" },
          { title: "Action", alignment: "center" },
        ]}
        selectable={false}
      >
        {rowMarkup}
      </IndexTable>
    </SpacingBackground>
  );
}
