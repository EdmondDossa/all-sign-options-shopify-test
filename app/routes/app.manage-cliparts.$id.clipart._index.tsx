import {
  Badge,
  Box,
  ButtonGroup,
  Divider,
  IndexTable,
  InlineStack,
  Link,
  Text,
} from "@shopify/polaris";
import { DeleteIconBtn } from "~/components/buttons/DeleteIconBtn";
import { EditIconBtn } from "~/components/buttons/EditIconBtn";
import { useLoaderData, useNavigate, useOutletContext, useSubmit } from "@remix-run/react";
import { BoxBackground } from "~/components/layouts/BoxBackground";
import PlusIcon from "~/components/icons/PlusIcon";
import { SpacingBackground } from "~/components/layouts/SpacingBackground";
import useHandleFlashMessage from "~/hooks/useHandleFlashMessage";
import { authenticate } from "~/shopify.server";
import { ActionFunctionArgs, LoaderFunctionArgs, json } from "@remix-run/node";
import ClipartService from "~/models/Clipart.service";
import { jFlashMessage } from "~/utils/message-flash";
import { fileUrl } from "~/utils/fileUrl";
import NextLtrIcon from "~/components/icons/NextLtrIcon";
import { ClipartsGroupType } from "~/types/ManagePropertyType";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const { session, admin } = await authenticate.admin(request);
  const clipartsGroupId = parseInt(params.id || "0");
  const cliparts = await ClipartService.getCliparts(clipartsGroupId);


  return json({ cliparts });
};

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const { session, admin } = await authenticate.admin(request);
  const clipartsGroupId = parseInt(params.id || "0");

  const formData = await request.formData();
  const id = formData.get("id") as string;
  const method = request.method;

  switch (method) {
    case "DELETE": {
      console.log("start deleting");
      await ClipartService.deleteClipart(
        parseInt(id),
        clipartsGroupId,
        session.id,
      );
      return json({
        ...jFlashMessage("Cliparts group deleting is completed successfull"),
      });
    }

    default:
      break;
  }

  return null;
};

export default function MaterialFixingMethod() {
  const submit = useSubmit();
  let { cliparts } = useLoaderData<typeof loader>();
  let { clipartsGroup } = useOutletContext<{ clipartsGroup: ClipartsGroupType }>();
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
    singular: "Clipart ",
    plural: "Cliparts",
  };

  const rowMarkup = cliparts?.map(
    ({ id, title, url, additionalPrice }, index) => (
      <IndexTable.Row id={id} key={id} position={index}>
        <IndexTable.Cell>
          <InlineStack blockAlign="start" gap="300">
            {title}
          </InlineStack>
        </IndexTable.Cell>
        <IndexTable.Cell className="td-center">
          <img
            style={{ height: "30px" }}
            src={fileUrl(url)}
            alt={"Clipart" + title}
          />
        </IndexTable.Cell>

        <IndexTable.Cell className="td-center">
          <Badge tone="success">{additionalPrice}</Badge>
        </IndexTable.Cell>

        <IndexTable.Cell className="td-center">
          <ButtonGroup fullWidth noWrap gap="loose">
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
    ),
  );
  return (
    <>
    
      <SpacingBackground width="100%" height="auto" margin="16px 0px ">
        <BoxBackground>
          <BoxBackground>
            <Box padding="150">

              <InlineStack gap="100" blockAlign="center" align="space-between">
                <Text as="h2" variant="headingMd">
                  List of cliparts
                </Text>
                <button
                  className="primary-btn"
                  type="button"
                  onClick={onHandleCreate}
                >
                  <Box paddingInline="300">
                    <InlineStack gap="300">
                      <PlusIcon />
                      <span className="primary-btn-text"> Add new clipart</span>
                    </InlineStack>
                  </Box>
                </button>
              </InlineStack>
            </Box>
            <Divider borderWidth="050" />
          </BoxBackground>
          <IndexTable
            resourceName={resourceName}
            itemCount={cliparts ? cliparts.length : 0}
            headings={[
              { title: "Title" },
              { title: "Icon", alignment: "center" },
              { title: "Additional Price", alignment: "center" },
              { title: "Action", alignment: "center" },
            ]}
            selectable={false}
          >
            {rowMarkup}
          </IndexTable>
        </BoxBackground>
      </SpacingBackground>
    </>
  );
}
