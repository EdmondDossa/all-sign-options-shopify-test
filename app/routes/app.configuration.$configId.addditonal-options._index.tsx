import {
  Badge,
  BlockStack,
  Box,
  ButtonGroup,
  IndexTable,
  InlineStack,
} from "@shopify/polaris";
import { DeleteIconBtn } from "~/components/buttons/DeleteIconBtn";
import { EditIconBtn } from "~/components/buttons/EditIconBtn";
import {
  json,
  useNavigate,
  useOutletContext,
  useSubmit,
} from "@remix-run/react";
import { BoxBackground } from "~/components/layouts/BoxBackground";
import PlusIcon from "~/components/icons/PlusIcon";
import { SpacingBackground } from "~/components/layouts/SpacingBackground";
import useHandleFlashMessage from "~/hooks/useHandleFlashMessage";
import { authenticate } from "~/shopify.server";
import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { Material } from "~/types/ConfigDataType";
import { jFlashMessage } from "~/utils/message-flash";
import { truncateText } from "~/utils/truncate-text";
import ConfigAddionalOptionService from "~/models/ConfigAddionalOption.service";



export default function MaterialIndex() {
  const submit = useSubmit();
  let { additonalOptions } = useOutletContext<{additonalOptions:any[]}>();

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
    singular: "Additional Option",
    plural: "Additional Options",
  };

  const rowMarkup = additonalOptions?.map(
    ({ label, type }, index) => (
      <IndexTable.Row id={`${index}`} key={`${index}`} position={index}>
        <IndexTable.Cell>
          <InlineStack blockAlign="center" wrap={false} gap="300">
          {truncateText(label)}
          </InlineStack>
        </IndexTable.Cell>
     
        <IndexTable.Cell className="td-center">
          <Badge tone={type == "simple" ? "info" : "success"}>{type}</Badge>
        </IndexTable.Cell>

        <IndexTable.Cell className="td-center">
          <ButtonGroup fullWidth noWrap gap="loose">
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
                    <span className="primary-btn-text"> Add new option</span>
                  </InlineStack>
                </Box>
              </button>
            </InlineStack>
          </BlockStack>
        </Box>
      </BoxBackground>
      <IndexTable
        resourceName={resourceName}
        itemCount={additonalOptions ? additonalOptions.length : 0}
        selectable={false}
        headings={[
          { title: "Title" },
          { title: "Type",  alignment: "center"},
          { title: "Action",  alignment : "center"},
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
      await ConfigAddionalOptionService.delete(configId, session.id, parseInt(id));
      return json({...jFlashMessage("Configution deleting is completed successfull")})
      break;
    }
  
    default:
      break;
  }

  return null
}

