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
import { Form, Link, NavLink, Outlet, json, useLoaderData, useNavigate, useSubmit } from "@remix-run/react";
import { BoxBackground } from "~/components/layouts/BoxBackground";
import PlusIcon from "~/components/icons/PlusIcon";
import { SpacingBackground } from "~/components/layouts/SpacingBackground";
import useHandleFlashMessage from "~/hooks/useHandleFlashMessage";
import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { authenticate } from "~/shopify.server";
import SizeService from "~/models/Size.service";
import { jFlashMessage } from "~/utils/message-flash";


export const loader = async ({request}:LoaderFunctionArgs) => { 
  const { session, admin } = await authenticate.admin(request);

  const sizes = await SizeService.getSizes(session.id);

  return  json({sizes})
}

export const action = async ({ request }:ActionFunctionArgs) => {
  const { session, admin } = await authenticate.admin(request);
  
  const formData = await request.formData();
  const id = formData.get("id") as string;
  const method = request.method;
  
  switch (method) {
    case "DELETE": {
      console.log("start deleting")
      await SizeService.deleteSize(parseInt(id), session.id)
      return json({...jFlashMessage("Size deleting is completed successfull")})
    }
  
    default:
      break;
  }

  return null
}

export default function MaterialSizeIndex() {
  const submit = useSubmit()
  let { sizes } = useLoaderData<typeof loader>();
  useHandleFlashMessage();
 

  const navigate = useNavigate();
  const onHandleSizeCreate = () => {
    navigate("edit");
  };

  const handeleDelete = (id: number) => {
    submit({ id: id }, { method: "DELETE" });
  };

  const handleUpdate = (id: number) => {
    
    submit({id:id},{method:"GET", action:"edit"});
  }

  
  const resourceName = {
    singular: "Size",
    plural: "sizes",
  };
 
  const rowMarkup = sizes?.map(
    ({ id, label, width, height, thickness }, index) => (
      <IndexTable.Row id={id} key={id} position={index}>
        <IndexTable.Cell>
          <InlineStack blockAlign="start" gap="300">
            {label}
          </InlineStack>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <InlineStack blockAlign="start" gap="300">
                      <Badge tone="success" >{width+"mm"}</Badge>
          </InlineStack>
        </IndexTable.Cell>
        <IndexTable.Cell><Badge tone="critical" >{height+"mm"}</Badge></IndexTable.Cell>
        <IndexTable.Cell>
          <Badge>{thickness.value+"mm"}</Badge>
        </IndexTable.Cell>
     

        <IndexTable.Cell>
          <ButtonGroup noWrap gap="loose">
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
                onClick={onHandleSizeCreate}
              >
                <Box paddingInline="300">
                  <InlineStack gap="300">
                    <PlusIcon />
                    <span className="primary-btn-text"> Add new SIZE</span>
                  </InlineStack>
                </Box>
              </button>
            </InlineStack>
          </Box>
          <Divider borderWidth="050" />
        </BoxBackground>
        <IndexTable
          resourceName={resourceName}
          itemCount={sizes ?sizes.length:0}
          sortable={[false, true, true, true, true, true, true]}
          headings={[
            { title: "Title" },
            { title: "Width" },
            { title: "Height" },
            { title: "Thickness" },
            { title: "Action" },
          ]}
          selectable={false}
        >
          {rowMarkup}
        </IndexTable>
      </SpacingBackground>


  );
}
