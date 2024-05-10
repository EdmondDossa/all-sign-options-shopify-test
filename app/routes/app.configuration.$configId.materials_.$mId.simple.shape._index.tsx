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
import {  ShapeType } from "~/types/SettingsType";
import {  ConfigShape } from "~/types/ConfigDataType";
import useHandleFlashMessage from "~/hooks/useHandleFlashMessage";
import { ActionFunctionArgs, json } from "@remix-run/node";
import { authenticate } from "~/shopify.server";
import MaterialShapeService from "~/models/MaterialShape.service";
import { jFlashMessage } from "~/utils/message-flash";
import { ReactSwitchCustom } from "~/components/inputs/ReactSwitchCustom";
import { fileUrl } from "~/utils/fileUrl";

export default function MaterialShape() {
  const submit = useSubmit();
  const navigate = useNavigate();


  let { manageShapes, shapes } = useOutletContext<{
    manageShapes: ShapeType[];
    shapes: ConfigShape[];
  }>();
  useHandleFlashMessage();


  const navigation = useNavigation();
  let isLoading = navigation.state == "loading";
  let isSubmitting = navigation.state == "submitting";


  const handeleDelete = (id: number) => {
    submit({ id: id }, { method: "DELETE" });
  };

  const handeleDefault = (id: number) => {
    shapes = shapes.map((curr, index) => {
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


  const shapesTab = shapes ? shapes.map((currShapes, index) => {

    let shape = manageShapes?manageShapes[currShapes?.shapeId]:null;
    return {
      id: `${index}`,
      title: `${shape?.name}`,
      image: shape?.icon,
      price: `${currShapes?.additionalPrice}$`,
      isDefault: currShapes?.isDefault
    }
  }) : [];


 
  const resourceName = {
    singular: "Shape",
    plural: "Shapes",
  };

  const rowMarkup = shapesTab.map(
    ({ id, title, image, price , isDefault}, index) => (
      <IndexTable.Row id={id} key={id} position={index}>
        <IndexTable.Cell>
          <InlineStack blockAlign="start" gap="300">
            {title}
          </InlineStack>
        </IndexTable.Cell>
        <IndexTable.Cell>
        <img style={{height: "30px"}}
            src={fileUrl(image)}
            alt={"border" + title}
          />
        </IndexTable.Cell>
       
        <IndexTable.Cell>
          <Badge tone="critical" >{price}</Badge>
        </IndexTable.Cell>
        <IndexTable.Cell><ReactSwitchCustom checked={isDefault||false} setChecked={() => isDefault ? "" : handeleDefault(index)}></ReactSwitchCustom></IndexTable.Cell>
        <IndexTable.Cell>
          <ButtonGroup noWrap gap="loose">

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
                    <span className="primary-btn-text"> Add new shape</span>
                  </InlineStack>
                </Box>
              </button>
            </InlineStack>
          </Box>
          <Divider borderWidth="050" />
        </BoxBackground>
        <IndexTable
          resourceName={resourceName}
          itemCount={shapesTab.length}
          sortable={[false, true, true, true, true, true, true]}
          headings={[
            { title: "Title" },
            { title: "Image" },
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
      await MaterialShapeService.delete(
        configId,
        session.id,
        mId,
        parseInt(id || ""),
      );
      return json({
        ...jFlashMessage("Material  fixing method  deleting is completed successfull"),
      });
      break;
    }
    case "PUT": {
      const id = formData.get("id") as string;
      await MaterialShapeService.setDefault(
        configId,
        session.id,
        mId,
        parseInt(id || ""),
      );
      return json({
        ...jFlashMessage("Default shape is defined successfull"),
      });
      break;
    }
    default:
      break;
  }
  return null;
};