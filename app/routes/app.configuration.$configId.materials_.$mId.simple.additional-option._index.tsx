import {
  Badge,
  BlockStack,
  Box,
  Button,
  ButtonGroup,
  Card,
  ChoiceList,
  Divider,
  IndexTable,
  InlineGrid,
  InlineStack,
  Page,
  Select,
  Text,
  useIndexResourceState,
  useSetIndexFiltersMode,
} from "@shopify/polaris";
import { useCallback, useState } from "react";

import { DeleteIconBtn } from "~/components/buttons/DeleteIconBtn";
import { ViewIconBtn } from "~/components/buttons/ViewIconBtn";
import { EditIconBtn } from "~/components/buttons/EditIconBtn";
import {
  Link,
  json,
  useNavigate,
  useNavigation,
  useOutletContext,
  useSubmit,
} from "@remix-run/react";
import { BoxBackground } from "~/components/layouts/BoxBackground";
import { SpacingBackground } from "~/components/layouts/SpacingBackground";
import PlusIcon from "~/components/icons/PlusIcon";
import { ConfigAdditionalOption } from "~/types/ConfigDataType";
import useHandleFlashMessage from "~/hooks/useHandleFlashMessage";
import MaterialAdditionalOptionService from "~/models/MaterialAdditionalOption.service";
import { jFlashMessage } from "~/utils/message-flash";
import { ActionFunctionArgs } from "@remix-run/node";
import { authenticate } from "~/shopify.server";
import { fileUrl } from "~/utils/fileUrl";
import { ManageBtn } from "~/components/buttons/ManageBtn";

// This example is for guidance purposes. Copying it will come with caveats.
export default function MaterialAdditionalOptionIndex() {
  const submit = useSubmit();
  const navigate = useNavigate();

  const { additionalOptions } = useOutletContext<{
    additionalOptions: ConfigAdditionalOption[];
  }>();

  useHandleFlashMessage();


  const handeleDelete = (id: number) => {
    submit({ id: id }, { method: "DELETE" });
  };

  const handleUpdate = (id: number) => {
    submit({ id: id }, { method: "GET", action: "edit" });
  };

  const handleView = (id: number) => {
    navigate(`${id}`);
  };

  const handleEdit = () => {
    navigate("edit");
  };

  const resourceName = {
    singular: "Additional component",
    plural: "Additional components",
  };

  const rowMarkup = additionalOptions?.map(
    ({ title, description, icon }, index) => (
      <IndexTable.Row id={`${index}`} key={`${index}`} position={index}>
        <IndexTable.Cell>{title}</IndexTable.Cell>
        <IndexTable.Cell>{description}</IndexTable.Cell>
        <IndexTable.Cell className="td-center">
          <img
            style={{ height: "30px" }}
            src={fileUrl(icon)}
            alt={" thumbnail" + title}
          />
        </IndexTable.Cell>
        <IndexTable.Cell className="td-center">
          <ButtonGroup fullWidth noWrap gap="loose">
     
          <ManageBtn  title="add options" handleClick={()=>   handleView(index)}/>

            <EditIconBtn
              size="micro"
              onClick={() => {
                handleUpdate(index);
              }}
            />
            <DeleteIconBtn
              size="micro"
              onClick={() => {
                handeleDelete(index);
              }}
            />
          </ButtonGroup>
        </IndexTable.Cell>
      </IndexTable.Row>
    ),
  );
  return (
    <SpacingBackground width="100%" height="auto" margin="16px 0px ">
      <BoxBackground>
        <Box padding="300">
          <BlockStack gap="300">
            <InlineStack gap="100" align="space-between">
              <Text as="h2" variant="headingMd">
                {/* List of configurations */}
              </Text>
              <button
                className="primary-btn"
                type="button"
                onClick={handleEdit}
              >
                <Box paddingInline="300">
                  <InlineStack gap="300">
                    <PlusIcon />
                    <span className="primary-btn-text"> Add new component</span>
                  </InlineStack>
                </Box>
              </button>
            </InlineStack>
          </BlockStack>
        </Box>
        <Divider borderWidth="050" />
      </BoxBackground>
      <IndexTable
        resourceName={resourceName}
        itemCount={additionalOptions ? additionalOptions.length : 0}
        selectable={false}
        headings={[
          { title: "Title" },
          { title: "Desciption" },
          { title: "Icon" ,  alignment: "center"},
          { title: "Action", alignment: "center" },
        ]}
      >
        {rowMarkup}
      </IndexTable>
    </SpacingBackground>
  );
}


export const action = async ({ request, params }: ActionFunctionArgs) => {
  const { session, admin } = await authenticate.admin(request);

  const configId = parseInt(params.configId ?? "");
  const mId = parseInt(params.mId ?? "");

  const method = request.method;
  const formData = await request.formData();

  switch (method) {
    case "DELETE": {
      const id = formData.get("id") as string;
      console.log("start deleting");
      await MaterialAdditionalOptionService.delete(
        configId,
        session.id,
        mId,
        parseInt(id || ""),
      );
      return json({
        ...jFlashMessage("Material additional option deleting is completed successfull"),
      });
      break;
    }
    default:
      break;
  }

  return null;
};
