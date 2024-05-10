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
import { Form, Link, NavLink, Outlet, useNavigate, useNavigation, useOutletContext, useSubmit } from "@remix-run/react";
import { BoxBackground } from "~/components/layouts/BoxBackground";
import PlusIcon from "~/components/icons/PlusIcon";
import { ActionFunctionArgs, json } from "@remix-run/node";
import { authenticate } from "~/shopify.server";
import MaterialFixingMethodService from "~/models/MaterialFixingMethod.service";
import { jFlashMessage } from "~/utils/message-flash";
import { FixingMethodType } from "~/types/SettingsType";
import { ConfigFixingMethod } from "~/types/ConfigDataType";
import useHandleFlashMessage from "~/hooks/useHandleFlashMessage";
import { ReactSwitchCustom } from "~/components/inputs/ReactSwitchCustom";
import { fileUrl } from "~/utils/fileUrl";

export default function MaterialFixingMethodComponent() {
 
  
  const submit = useSubmit();
  const navigate = useNavigate();


  let { manageFixingMethods, fixingMethods } = useOutletContext<{
    manageFixingMethods: FixingMethodType[];
    fixingMethods: ConfigFixingMethod[];
  }>();

  useHandleFlashMessage();


  const navigation = useNavigation();
  let isLoading = navigation.state == "loading";
  let isSubmitting = navigation.state == "submitting";


  const handeleDelete = (id: number) => {
    submit({ id: id }, { method: "DELETE" });
  };



  const handeleDefault = (id: number) => {
    fixingMethods = fixingMethods.map((curr, index) => {
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

  console.log("fixingMethods ....",fixingMethods)
  const fixingMethodTab = fixingMethods ? fixingMethods.map((currFixingMethod, index) => {

    let fixingMethod = manageFixingMethods.find((manageFixingMethod,manageIndex) => (manageIndex == currFixingMethod.fixingMethodId))
    return {
      id: `${index}`,
      title: `${fixingMethod?.name}`,
      image: fixingMethod?.icon,
      price: `${currFixingMethod?.additionalPrice}$`,
      isDefault: currFixingMethod.isDefault
    }
  }) : [];



  const resourceName = {
    singular: "Fixing method",
    plural: "Fixing methods",
  };

  const rowMarkup = fixingMethodTab?.map(
    ({ id, title, image, price, isDefault }, index) => (
      <IndexTable.Row id={id} key={id} position={index}>
        <IndexTable.Cell>
          <InlineStack blockAlign="start" gap="300">
            {title}
          </InlineStack>
        </IndexTable.Cell>
        <IndexTable.Cell>
        <img style={{height: "30px"}}
            src={fileUrl(image)}
            alt={"fixing-method" + title}
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
                    <span className="primary-btn-text"> Add new fixing method</span>
                  </InlineStack>
                </Box>
              </button>
            </InlineStack>
          </Box>
          <Divider borderWidth="050" />
        </BoxBackground>
        <IndexTable
          resourceName={resourceName}
          itemCount={fixingMethodTab.length}
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
      await MaterialFixingMethodService.delete(
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
      await MaterialFixingMethodService.setDefault(
        configId,
        session.id,
        mId,
        parseInt(id || ""),
      );
      return json({
        ...jFlashMessage("Default fixing method is defined successfull"),
      });
      break;
    }
    default:
      break;
  }

  return null;
};
