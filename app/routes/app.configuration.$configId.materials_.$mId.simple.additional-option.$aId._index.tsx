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
import { ConfigAdditionalOption, ConfigAdditionalOptionItem } from "~/types/ConfigDataType";
import useHandleFlashMessage from "~/hooks/useHandleFlashMessage";
import MaterialAdditionalOptionService from "~/models/MaterialAdditionalOption.service";
import { jFlashMessage } from "~/utils/message-flash";
import { ActionFunctionArgs } from "@remix-run/node";
import { authenticate } from "~/shopify.server";
import MaterialAdditionalOptionItemService from "~/models/MaterialAdditionalOptionItem.service";
import { ReactSwitchCustom } from "~/components/inputs/ReactSwitchCustom";

// This example is for guidance purposes. Copying it will come with caveats.
export default function MaterialAdditionalOptionIndex() {
  const submit = useSubmit();
  const navigate = useNavigate();

  let { additionalOptionItems } = useOutletContext<{
    additionalOptionItems: ConfigAdditionalOptionItem[];
  }>();

  useHandleFlashMessage();


  const handeleDelete = (id: number) => {
    submit({ id: id }, { method: "DELETE" });
  };


  const handeleDefault = (id: number) => {
    additionalOptionItems = additionalOptionItems.map((curr, index) => {
      if (index === id) {
        curr.isDefault = true;
      } else {
        curr.isDefault = false;
      }
      return curr;
    });
    
    submit({ id: id }, { method: "PUT" });
  };

  const handleUpdate = (id: number) => {
    submit({ id: id }, { method: "GET", action: "edit" });
  };

  const handleEdit = () => {
    navigate("edit");
  };

  const resourceName = {
    singular: "Additional option",
    plural: "Additionals options",
  };

  const rowMarkup = additionalOptionItems?.map(
    ({ title, description, icon,image ,additionalPrice, isDefault }, index) => (
      <IndexTable.Row id={`${index}`} key={`${index}`} position={index}>
        <IndexTable.Cell>{title}</IndexTable.Cell>
        <IndexTable.Cell>{description}</IndexTable.Cell>
        <IndexTable.Cell>
          <img
            style={{ height: "30px" }}
            src={icon}
            alt={" thumbnail" + title}
          />
        </IndexTable.Cell>
        <IndexTable.Cell>
          <img
            style={{ height: "30px" }}
            src={image}
            alt={" thumbnail" + title}
          />
        </IndexTable.Cell>
        <IndexTable.Cell>
        <Badge tone="success" >{`${additionalPrice}$`}</Badge>
        </IndexTable.Cell>
        <IndexTable.Cell><ReactSwitchCustom checked={isDefault||false} setChecked={() => isDefault ? "" : handeleDefault(index)}></ReactSwitchCustom></IndexTable.Cell>

        <IndexTable.Cell>
          <ButtonGroup gap="loose">

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
                    <span className="primary-btn-text"> Add new option </span>
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
        itemCount={additionalOptionItems ? additionalOptionItems.length : 0}
        selectable={false}
        sortable={[false, true, true, true, true, true, true]}
        headings={[
          { title: "Title" },
          { title: "Desciption" },
          { title: "Icon" },
          { title: "Image" },
          { title: "Price" },
          { title: "Default" },
          { title: "Action" },
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
  const aId = parseInt(params.aId ?? "");

  const method = request.method;
  const formData = await request.formData();

  switch (method) {
    case "DELETE": {
      const id = formData.get("id") as string;
      console.log("start deleting");
      await MaterialAdditionalOptionItemService.delete(
        configId,
        session.id,
        mId,
        aId,
        parseInt(id || ""),
      );
      return json({
        ...jFlashMessage("Material option deleting is completed successfull"),
      });
      break;
    }
    case "PUT": {
      const id = formData.get("id") as string;
      await MaterialAdditionalOptionItemService.setDefault(
        configId,
        session.id,
        mId,
        aId,
        parseInt(id || ""),
      );
      return json({
        ...jFlashMessage("Default Material option  is defined successfull"),
      });
      break;
    }
    default:
      break;
  }

  return null;
};
