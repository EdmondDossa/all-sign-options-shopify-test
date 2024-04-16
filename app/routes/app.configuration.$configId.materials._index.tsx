import {
  Badge,
  BlockStack,
  Box,
  Button,
  ButtonGroup,
  Card,
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
  useLoaderData,
  useNavigate,
  useOutletContext,
  useSubmit,
} from "@remix-run/react";
import { BoxBackground } from "~/components/layouts/BoxBackground";
import PlusIcon from "~/components/icons/PlusIcon";
import { SpacingBackground } from "~/components/layouts/SpacingBackground";
import RoundManageHistoryIcon from "~/components/icons/RoundManageHistoryIcon";
import useHandleFlashMessage from "~/hooks/useHandleFlashMessage";
import { authenticate } from "~/shopify.server";
import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import MaterialService from "~/models/Material.service";
import { Material } from "~/types/ConfigDataType";
import { jFlashMessage } from "~/utils/message-flash";
import { BorderCircleText } from "~/components/feactures/BorderCircleText";
import { truncateText } from "~/utils/truncate-text";



export default function MaterialIndex() {
  const submit = useSubmit();
  let { materials } = useOutletContext<{materials:Material[]}>();

  useHandleFlashMessage();

  const navigate = useNavigate();

  const handeleDelete = (id: number) => {
    submit({ id: id }, { method: "DELETE" });
  };

  const handleUpdate = (id: number) => {
    submit({ id: id }, { method: "GET", action: "edit" });
  };

  const handleEdit = () => {
    navigate("edit");
  };

  const resourceName = {
    singular: "Configuration",
    plural: "Configurations",
  };

  const rowMarkup = materials?.map(
    ({ name, description, icon, popImg, type }, index) => (
      <IndexTable.Row id={`${index}`} key={`${index}`} position={index}>
        <IndexTable.Cell>
          <InlineStack blockAlign="center" gap="300">
          <BorderCircleText text={name} /> {truncateText(name)}
          </InlineStack>
        </IndexTable.Cell>
        <IndexTable.Cell>{truncateText(description)}</IndexTable.Cell>
        <IndexTable.Cell>
          <img
            style={{ height: "30px" }}
            src={icon}
            alt={"product thumbnail" + name}
          />
        </IndexTable.Cell>
        <IndexTable.Cell>
          <img
            style={{ height: "30px" }}
            src={popImg}
            alt={"product thumbnail" + name}
          />
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Badge tone={type == "simple" ? "info" : "success"}>{type}</Badge>
        </IndexTable.Cell>

        <IndexTable.Cell>
          <ButtonGroup gap="loose">
            <button
              className="add-option-btn"
              onClick={() =>
                navigate(
                  type == "simple"
                    ? `${index}/simple`
                    :`${index}/advance`,
                )
              }
            >
              <InlineStack gap="100" blockAlign="center">
               
                <RoundManageHistoryIcon /> <Text as="span">manage</Text>
              </InlineStack>
            </button>
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
    <SpacingBackground margin="16px 0 0 0">
      <BoxBackground>
        <Box padding="300">
          <BlockStack gap="300">
            <InlineStack align="end">
          
              <button
                className="primary-btn"
                type="button"
                onClick={handleEdit}
              >
                <Box paddingInline="300">
                  <InlineStack gap="300" >
                    <PlusIcon />
                    <span className="primary-btn-text"> Add new Material</span>
                  </InlineStack>
                </Box>
              </button>
            </InlineStack>
          </BlockStack>
        </Box>
      </BoxBackground>
      <IndexTable
        resourceName={resourceName}
        itemCount={materials ? materials.length : 0}
        selectable={false}
        headings={[
          { title: "Title" },
          { title: "Desciption" },
          { title: "Icon" },
          { title: "Poppupimg" },
          { title: "Behavior (type)" },
          { title: "Action" },
        ]}
      >
        {rowMarkup}
      </IndexTable>
    </SpacingBackground>
  );
}

export const action = async ({ request, params }:ActionFunctionArgs) => {
  const { session, admin } = await authenticate.admin(request);
  
  const formData = await request.formData();
  const id = formData.get("id") as string;
  const configId = parseInt(params.configId ?? "");
  const method = request.method;
  
  switch (method) {
    case "DELETE": {
      console.log("start deleting")
      await MaterialService.delete(configId, session.id, parseInt(id));
      return json({...jFlashMessage("Configution deleting is completed successfull")})
      break;
    }
  
    default:
      break;
  }

  return null
}

