import {

  Box,
  ButtonGroup,
  Card,
  Divider,
  IndexTable,
  InlineStack,
  Text

} from "@shopify/polaris";
import { DeleteIconBtn } from "~/components/buttons/DeleteIconBtn";
import { EditIconBtn } from "~/components/buttons/EditIconBtn";
import {  json, useLoaderData, useNavigate, useSubmit } from "@remix-run/react";
import { BoxBackground } from "~/components/layouts/BoxBackground";
import PlusIcon from "~/components/icons/PlusIcon";
import { SpacingBackground } from "~/components/layouts/SpacingBackground";
import { jFlashMessage } from "~/utils/message-flash";
import FontService from "~/models/Font.service";
import { authenticate } from "~/shopify.server";
import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import useHandleFlashMessage from "~/hooks/useHandleFlashMessage";



export const loader = async ({request}:LoaderFunctionArgs) => { 
  const { session, admin } = await authenticate.admin(request);

  const fonts = await FontService.getFonts(session.id);
 
  return  json({fonts})
}

export const action = async ({ request }:ActionFunctionArgs) => {
  const { session, admin } = await authenticate.admin(request);
  
  const formData = await request.formData();
  const id = formData.get("id") as string;
  const method = request.method;
  
  switch (method) {
    case "DELETE": {
      console.log("start deleting") 
      await FontService.deleteFont(parseInt(id), session.id)
      return json({...jFlashMessage("Font deleted successfully")})
    }
  
    default:
      break;
  }

  return null
}


export default function ManageFontIndex() {
  const submit = useSubmit()
  let { fonts } = useLoaderData<typeof loader>();
  useHandleFlashMessage();
 
  const navigate = useNavigate();
  const onHandleCreate = () => {
    navigate("edit");
  };

  const handeleDelete = (id: number) => {
    submit({ id: id }, { method: "DELETE" });
  };

  const handleUpdate = (id: number) => {
    
    submit({id:id},{method:"GET", action:"edit"});
  }


  
  const resourceName = {
    singular: "Font",
    plural: "Fonts",
  };

  const rowMarkup = fonts?.map(
    ({ id, label}, index) => (
      <IndexTable.Row id={id} key={id} position={index}>
        <IndexTable.Cell>
            {label}
        </IndexTable.Cell>
        <IndexTable.Cell className="td-center">
          <ButtonGroup fullWidth noWrap gap="loose">
          <EditIconBtn  size="micro"  onClick={()=>{handleUpdate(id)}} />
            <DeleteIconBtn  size="micro" onClick={()=>{handeleDelete(id)}} />
          </ButtonGroup>
        </IndexTable.Cell>
      </IndexTable.Row>
    ),
  );
  return (
    <div style={{margin:"10px 0px "}}>
      <Card>
        <InlineStack gap="100" align="space-between" blockAlign='center'>
          <Text as="h2" variant="headingMd">
            Fonts
          </Text>

          <InlineStack align="end">
            <button
              className="primary-btn"
              type="button"
              onClick={onHandleCreate}
            >
              <Box paddingInline="200">
                <InlineStack gap="200">
                  <PlusIcon />
                  <span className="primary-btn-text"> Add new Font</span>
                </InlineStack>
              </Box>
            </button>
          </InlineStack>
        </InlineStack>
      </Card>
      
      <div style={{margin:"10px 0px "}}>
        <Card>
          <IndexTable
            resourceName={resourceName}
            itemCount={fonts?fonts.length:0}
            headings={[
              { title: "Title" },
              { title: "Action", alignment:"center" },
            ]}
            selectable={false}
          >
            {rowMarkup}
          </IndexTable>
          <Divider borderWidth="050" />
        </Card>
      </div>
    </div>
  );
}
