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
import { Form, Link, NavLink, Outlet, useNavigate, useNavigation, useOutletContext, useSubmit } from "@remix-run/react";
import { BoxBackground } from "~/components/layouts/BoxBackground";
import PlusIcon from "~/components/icons/PlusIcon";
import { SpacingBackground } from "~/components/layouts/SpacingBackground";
import useHandleFlashMessage from "~/hooks/useHandleFlashMessage";
import { ColorType } from "~/types/ManagePropertyType";
import { ConfigColor } from "~/types/ConfigDataType";
import { ActionFunctionArgs, json } from "@remix-run/node";
import { authenticate } from "~/shopify.server";
import MaterialColorService from "~/models/MaterialColors.service";
import { jFlashMessage } from "~/utils/message-flash";

export default function MaterialColorIndex() {
  const submit = useSubmit();
  const navigate = useNavigate();
  const onHandleColorCreate = () => {
    navigate("create");
  };

  let { manageColors, colors } = useOutletContext<{
    manageColors: ColorType[];
    colors: ConfigColor[];
  }>();

  useHandleFlashMessage();


  const navigation = useNavigation();
  let isLoading = navigation.state == "loading";
  let isSubmitting = navigation.state == "submitting";


  const handeleDelete = (id: number) => {
    submit({ id: id }, { method: "DELETE" });
  };

  const handleUpdate = (id: number) => {
    submit({ id: id }, { method: "GET", action: "edit" });
  };

  const handleEdit = () => {
    navigate("edit");
  };


  const colorsTab = colors ? colors.map((currColor, index) => {

    let color = manageColors.find(manageColor => manageColor.id == currColor.manageColorId)
    return {
      id: `${index}`,
      title: `${color?.name}`,
      textColor: `${color?.textColor.codeHex}`,
      BackgroundColor: `${color?.backgroundColor}`,
      price:  `${currColor?.additionalPrice}$`
    }
  }) : [];


  const resourceName = {
    singular: "Color",
    plural: "Colors",
  };

  const rowMarkup = colorsTab.map(
    ({ id, title, textColor, BackgroundColor,price }, index) => (
      <IndexTable.Row id={id} key={id} position={index}>
        <IndexTable.Cell>
          <InlineStack blockAlign="start" gap="300">
            {title}
          </InlineStack>
        </IndexTable.Cell>
        <IndexTable.Cell><Badge tone="critical" >{textColor}</Badge></IndexTable.Cell>
        <IndexTable.Cell>
          <Badge tone="info">{BackgroundColor}</Badge>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Badge tone="success" >{price}</Badge>
        </IndexTable.Cell>

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
                    <span className="primary-btn-text">Add new color palette</span>
                  </InlineStack>
                </Box>
              </button>
            </InlineStack>
          </Box>
          <Divider borderWidth="050" />
        </BoxBackground>
        <IndexTable
          resourceName={resourceName}
          itemCount={colorsTab.length}
          sortable={[false, true, true, true, true, true, true]}
          headings={[
            { title: "Title" },
            { title: "Text color" },
            { title: "Background color" },
            { title: "Additional price" },
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
      await MaterialColorService.delete(
        configId,
        session.id,
        mId,
        parseInt(id || ""),
      );
      return json({
        ...jFlashMessage("Material  color deleting is completed successfull"),
      });
      break;
    }
    default:
      break;
  }

  return null;
};

