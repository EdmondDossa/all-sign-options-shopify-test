import {
  Box,
  ButtonGroup,
  Divider,
  IndexTable,
  InlineStack,
  Text,
} from "@shopify/polaris";
import { DeleteIconBtn } from "~/components/buttons/DeleteIconBtn";
import { EditIconBtn } from "~/components/buttons/EditIconBtn";
import { useLoaderData, useNavigate, useSubmit } from "@remix-run/react";
import { BoxBackground } from "~/components/layouts/BoxBackground";
import PlusIcon from "~/components/icons/PlusIcon";
import { SpacingBackground } from "~/components/layouts/SpacingBackground";
import RoundManageHistoryIcon from "~/components/icons/RoundManageHistoryIcon";
import { ActionFunctionArgs, LoaderFunctionArgs, json } from "@remix-run/node";
import { authenticate } from "~/shopify.server";
import ClipartsGroupService from "~/models/ClipartsGroup.service";
import { jFlashMessage } from "~/utils/message-flash";
import useHandleFlashMessage from "~/hooks/useHandleFlashMessage";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { session, admin } = await authenticate.admin(request);

  const clipartsGroups = await ClipartsGroupService.getClipartsGroups(
    session.id,
  );

  return json({ clipartsGroups });
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const { session, admin } = await authenticate.admin(request);

  const formData = await request.formData();
  const id = formData.get("id") as string;
  const method = request.method;

  switch (method) {
    case "DELETE": {
      console.log("start deleting");
      await ClipartsGroupService.deleteClipartsGroup(parseInt(id), session.id);
      return json({
        ...jFlashMessage("Cliparts group deleting is completed successfull"),
      });
    }

    default:
      break;
  }

  return null;
};

export default function ManageClipartIndex() {
  const submit = useSubmit();
  let { clipartsGroups } = useLoaderData<typeof loader>();
  useHandleFlashMessage();

  const navigate = useNavigate();
  const onHandleCreate = () => {
    navigate("edit");
  };

  const handeleDelete = (id: number) => {
    submit({ id: id }, { method: "DELETE" });
  };

  const handleUpdate = (id: number) => {
    submit({ id: id }, { method: "GET", action: "edit" });
  };

  const resourceName = {
    singular: "Clipart Group",
    plural: "Clipart Groups",
  };

  const rowMarkup = clipartsGroups?.map(({ id, title, description }, index) => (
    <IndexTable.Row id={id} key={id} position={index}>
      <IndexTable.Cell>{title}</IndexTable.Cell>
      <IndexTable.Cell>{description}</IndexTable.Cell>

      <IndexTable.Cell className="td-center">
        <ButtonGroup fullWidth noWrap gap="loose">
          <button
            className="add-option-btn"
            onClick={() => navigate(`${id}/clipart`)}
          >
            <InlineStack gap="100" blockAlign="center">
              {" "}
              <RoundManageHistoryIcon /> <Text as="span">
                manage cliparts
              </Text>{" "}
            </InlineStack>
          </button>
          <EditIconBtn
            size="micro"
            onClick={() => {
              handleUpdate(id);
            }}
          />
          <DeleteIconBtn
            size="micro"
            onClick={() => {
              handeleDelete(id);
            }}
          />
        </ButtonGroup>
      </IndexTable.Cell>
    </IndexTable.Row>
  ));
  return (
    <SpacingBackground width="100%" height="auto" margin="16px 0px ">
      <BoxBackground>
        <Box padding="150">
          <InlineStack gap="100" align="end">
            <button
              className="primary-btn"
              type="button"
              onClick={onHandleCreate}
            >
              <Box paddingInline="300">
                <InlineStack gap="300">
                  <PlusIcon />
                  <span className="primary-btn-text">
                    Add new clipart group
                  </span>
                </InlineStack>
              </Box>
            </button>
          </InlineStack>
        </Box>
        <Divider borderWidth="050" />
      </BoxBackground>
      <IndexTable
        resourceName={resourceName}
        itemCount={clipartsGroups ? clipartsGroups.length : 0}
        headings={[
          { title: "Title" },
          { title: "Description" },
          { title: "Action", alignment: "center" },
        ]}
        selectable={false}
      >
        {rowMarkup}
      </IndexTable>
    </SpacingBackground>
  );
}
