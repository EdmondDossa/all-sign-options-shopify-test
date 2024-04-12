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
import { Form, Link, NavLink, Outlet, json, useActionData, useNavigate, useNavigation, useOutletContext, useSubmit } from "@remix-run/react";
import { BoxBackground } from "~/components/layouts/BoxBackground";
import PlusIcon from "~/components/icons/PlusIcon";
import { SpacingBackground } from "~/components/layouts/SpacingBackground";
import { BorderType } from "~/types/SettingsType";
import { SizeType } from "~/types/ManagePropertyType";
import { ConfigBorder } from "~/types/ConfigDataType";
import useHandleFlashMessage from "~/hooks/useHandleFlashMessage";
import { jFlashMessage } from "~/utils/message-flash";
import MaterialBorderService from "~/models/MaterialBorderService.service";
import { authenticate } from "~/shopify.server";
import { ActionFunctionArgs } from "@remix-run/node";
import { ReactSwitchCustom } from "~/components/inputs/ReactSwitchCustom";

export default function MaterialBorderIndex() {
  const submit = useSubmit();

  let {  manageBorders, borders } = useOutletContext<{
    manageBorders: BorderType[];
    borders: ConfigBorder[];
  }>();

  useHandleFlashMessage();


  const navigation = useNavigation();
  let isLoading = navigation.state == "loading";
  let isSubmitting = navigation.state == "submitting";

  const navigate = useNavigate();

  const handeleDelete = (id: number) => {
    submit({ id: id }, { method: "DELETE" });
  };

  const handeleDefault = (id: number) => {
    borders = borders.map((curr, index) => {
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

  console.log("data", borders, manageBorders);


  const bordersTab = borders ? borders.map((currBorder, index) => {

    let border = manageBorders.find((manageBorder, manageIndex) => manageIndex == currBorder.manageBorderId)
    return {
      id: `${index}`,
      title: `${border?.name}`,
      icon: `${border?.icon}`,
      price: `${currBorder.additionalPrice}`,
      isDefault: currBorder.isDefault
    }
  }) : [];
  
  const resourceName = {
    singular: "Border",
    plural: "Borders",
  };

  const rowMarkup = bordersTab.map(
    ({ id, title, icon, price,isDefault }, index) => (
      <IndexTable.Row id={id} key={id} position={index}>
        <IndexTable.Cell>
          <InlineStack blockAlign="start" gap="300">
            {title}
          </InlineStack>
        </IndexTable.Cell>
        <IndexTable.Cell>
        <img style={{height: "30px"}}
            src={icon}
            alt={"border" + title}
          />
        </IndexTable.Cell>
       
        <IndexTable.Cell>
          <Badge tone="critical" >{price}</Badge>
        </IndexTable.Cell>
        <IndexTable.Cell><ReactSwitchCustom checked={isDefault||false} setChecked={() => isDefault ? "" : handeleDefault(index)}></ReactSwitchCustom></IndexTable.Cell>
        <IndexTable.Cell>
          <ButtonGroup gap="loose">

          <EditIconBtn
              size="micro"
              onClick={() => {
                handleUpdate(parseInt(id));
              }}
            />
            <DeleteIconBtn
              size="micro"
              onClick={() => {
                handeleDelete(parseInt(id));
              }}
            />
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
                onClick={handleEdit}
              >
                <Box paddingInline="300">
                  <InlineStack gap="300">
                    <PlusIcon />
                    <span className="primary-btn-text"> Add new border</span>
                  </InlineStack>
                </Box>
              </button>
            </InlineStack>
          </Box>
          <Divider borderWidth="050" />
        </BoxBackground>
        <IndexTable
          resourceName={resourceName}
          itemCount={bordersTab.length}
          sortable={[false, true, true, true, true, true, true]}
          headings={[
            { title: "Title" },
            { title: "Icon" },
            { title: "Additional Price" },
            { title: "Default" },
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
      await MaterialBorderService.delete(
        configId,
        session.id,
        mId,
        parseInt(id || ""),
      );
      return json({
        ...jFlashMessage("Border deleting is completed successfull"),
      });
      break;
    }
    case "PUT": {
      const id = formData.get("id") as string;
      await MaterialBorderService.setDefault(
        configId,
        session.id,
        mId,
        parseInt(id || ""),
      );
      return json({
        ...jFlashMessage("Default border is defined successfull"),
      });
      break;
    }
    default:
      break;
  }

  return null;
};
