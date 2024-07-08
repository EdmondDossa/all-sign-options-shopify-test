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
import { ActionFunctionArgs } from "@remix-run/node";
import MaterialService from "~/models/Material.service";
import { Material } from "~/types/ConfigDataType";
import { jFlashMessage } from "~/utils/message-flash";
import { BorderCircleText } from "~/components/feactures/BorderCircleText";
import { truncateText } from "~/utils/truncate-text";
import { fileUrl } from "~/utils/fileUrl";
import { ManageBtn } from "~/components/buttons/ManageBtn";
import { PRICING_PLANS } from "~/utils/pricing";

export default function MaterialIndex() {
  const submit = useSubmit();
  let { materials , plan} = useOutletContext<{ materials: Material[], plan: string }>();

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

  const handleManage = (index: number, type: string) => {
    navigate(type == "simple" ? `${index}/simple` : `${index}/advance`);
  };

  const resourceName = {
    singular: "Material",
    plural: "Materials",
  };

  const rowMarkup = materials?.map(
    ({ name, description, icon, popImg, type }, index) => (
      <IndexTable.Row id={`${index}`} key={`${index}`} position={index}>
        <IndexTable.Cell>
          <InlineStack blockAlign="center" wrap={false} gap="300">
            <BorderCircleText
              onClick={() => handleManage(index, type)}
              text={name}
            />
            <span className="btn-span" onClick={() => handleManage(index, type)}>
            {truncateText(name)}
            </span>
          </InlineStack>
        </IndexTable.Cell>
        <IndexTable.Cell>
            <span className="btn-span" onClick={() => handleManage(index, type)}>
            {truncateText(description)}
            </span>
        </IndexTable.Cell>
        <IndexTable.Cell className="td-center">
          <img
            style={{ height: "30px" }}
            src={fileUrl(icon)}
            alt={"product thumbnail" + name}
          />
        </IndexTable.Cell>

        <IndexTable.Cell className="td-center">
          <Badge tone={type == "simple" ? "info" : "success"}>{type}</Badge>
        </IndexTable.Cell>

        <IndexTable.Cell className="td-center">
          <ButtonGroup fullWidth={true} noWrap gap="loose">
            <ManageBtn
              title="Manage"
              handleClick={() => handleManage(index, type)}
            />
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
             {!(plan == PRICING_PLANS.STARTER && materials.length>=2 ) && <button
                className="primary-btn"
                type="button"
                onClick={handleEdit}
              >
                <Box paddingInline="300">
                  <InlineStack gap="300">
                    <PlusIcon />
                    <span className="primary-btn-text"> Add new Material</span>
                  </InlineStack>
                </Box>
              </button>}
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
          { title: "Icon", alignment: "center" },
          { title: "Behavior (type)", alignment: "center" },
          { title: "Action", alignment: "center" },
        ]}
      >
        {rowMarkup}
      </IndexTable>
    </SpacingBackground>
  );
}

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const { session, admin } = await authenticate.admin(request);

  const formData = await request.formData();
  const id = formData.get("id") as string;
  const configId = parseInt(params.configId ?? "");
  const method = request.method;

  switch (method) {
    case "DELETE": {
      console.log("start deleting");
      await MaterialService.delete(configId, session.id, parseInt(id));
      return json({
        ...jFlashMessage("Configution deleting is completed successfull"),
      });
      break;
    }

    default:
      break;
  }

  return null;
};
