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
import { Form, Link, NavLink, Outlet, useLoaderData, useNavigate, useSubmit } from "@remix-run/react";
import { BoxBackground } from "~/components/layouts/BoxBackground";
import PlusIcon from "~/components/icons/PlusIcon";
import { SpacingBackground } from "~/components/layouts/SpacingBackground";
import useHandleFlashMessage from "~/hooks/useHandleFlashMessage";
import { ActionFunctionArgs, LoaderFunctionArgs, json } from "@remix-run/node";
import { authenticate } from "~/shopify.server";
import { jFlashMessage } from "~/utils/message-flash";
import ColorService from "~/models/Color.service";



export const loader = async ({request}:LoaderFunctionArgs) => { 
  const { session, admin } = await authenticate.admin(request);

  const colors = await ColorService.getColors(session.id);

  return  json({colors})
}

export const action = async ({ request }:ActionFunctionArgs) => {
  const { session, admin } = await authenticate.admin(request);
  
  const formData = await request.formData();
  const id = formData.get("id") as string;
  const method = request.method;
  
  switch (method) {
    case "DELETE": {
      console.log("start deleting")
      await ColorService.deleteColor(parseInt(id), session.id)
      return json({...jFlashMessage("Color deleting is completed successfull")})
    }
  
    default:
      break;
  }

  return null
}

export default function ColorPaletteIndex() {

  const submit = useSubmit()
  let { colors } = useLoaderData<typeof loader>();
  useHandleFlashMessage();
 

  const navigate = useNavigate();
  const onHandleEdit = () => {
    navigate("edit");
  };

  const handeleDelete = (id: number) => {
    submit({ id: id }, { method: "DELETE" });
  };

  const handleUpdate = (id: number) => {
    
    submit({id:id},{method:"GET", action:"edit"});
  }

  

  const resourceName = {
    singular: "Color",
    plural: "Colors",
  };
 
  const rowMarkup = colors?.map(
    ({ id, name, textColor, backgroundColor }, index) => (
      <IndexTable.Row id={id} key={id} position={index}>
        <IndexTable.Cell>
          <InlineStack blockAlign="start" gap="300">
            {name}
          </InlineStack>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <InlineStack blockAlign="start" gap="300">
                      <Badge tone="critical" >{textColor}</Badge>
          </InlineStack>
        </IndexTable.Cell>
        <IndexTable.Cell><Badge >{backgroundColor}</Badge></IndexTable.Cell>
       
     

        <IndexTable.Cell>
          <ButtonGroup gap="loose">
          <EditIconBtn  size="micro"  onClick={()=>{handleUpdate(id)}} />
            <DeleteIconBtn  size="micro" onClick={()=>{handeleDelete(id)}} />
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
                onClick={onHandleEdit}
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
          itemCount={colors?colors.length:0}
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
