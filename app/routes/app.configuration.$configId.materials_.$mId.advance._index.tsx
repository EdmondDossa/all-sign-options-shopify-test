import {
  BlockStack,
  Box,
  ButtonGroup,
  Divider,
  IndexTable,
  InlineStack,
  Text,
} from "@shopify/polaris";

import { DeleteIconBtn } from "~/components/buttons/DeleteIconBtn";
import { EditIconBtn } from "~/components/buttons/EditIconBtn";
import {
  Link,
  useNavigate,
  useOutletContext,
  useSubmit,
} from "@remix-run/react";
import { BoxBackground } from "~/components/layouts/BoxBackground";
import { SpacingBackground } from "~/components/layouts/SpacingBackground";
import PlusIcon from "~/components/icons/PlusIcon";
import RoundManageHistoryIcon from "~/components/icons/RoundManageHistoryIcon";
import NextLtrIcon from "~/components/icons/NextLtrIcon";
import {
  MaterialAdvance,
  MaterialAdvanceComponentType,
} from "~/types/ConfigDataType";
import useHandleFlashMessage from "~/hooks/useHandleFlashMessage";
import { BorderCircleText } from "~/components/feactures/BorderCircleText";
import MaterialAdvanceComponentService from "~/models/MaterialAdvanceComponent.service";
import { ActionFunctionArgs, json } from "@remix-run/node";
import { authenticate } from "~/shopify.server";
import { jFlashMessage } from "~/utils/message-flash";
import { ConfigurationType } from "~/types/ConfigurationType";
import { truncateText } from "~/utils/truncate-text";
import { ReactSwitchCustom } from "~/components/inputs/ReactSwitchCustom";
import { fileUrl } from "~/utils/fileUrl";

// This example is for guidance purposes. Copying it will come with caveats.
export default function MaterialAdvancedIndex() {
  const submit = useSubmit();
  const navigate = useNavigate();

  let { materialComponents, material, configuration } = useOutletContext<{
    materialComponents: MaterialAdvanceComponentType[];
    material: MaterialAdvance;
    configuration: ConfigurationType;
  }>();

  useHandleFlashMessage();

  const handeleDelete = (id: number) => {
    submit({ id: id }, { method: "DELETE" });
  };

  const handleUpdate = (id: number) => {
    submit({ id: id }, { method: "GET", action: "edit" });
  };

  const handeleDefault = (id: number) => {
    materialComponents = materialComponents.map((curr, index) => {
      if (index === id) {
        curr.isDefault = true;
      } else {
        curr.isDefault = false;
      }
      return curr;
    });

    submit({ id: id }, { method: "PUT" });
  };

  const onManageOption = (id: number) => {
    navigate(`${id}`);
  };

  const handleEdit = () => {
    navigate("edit");
  };

  const resourceName = {
    singular: "Component",
    plural: "Components",
  };

  const rowMarkup = materialComponents?.map(
    ({ name, description, icon, isDefault }, index) => (
      <IndexTable.Row id={`${index}`} key={`${index}`} position={index}>
        <IndexTable.Cell>
          <InlineStack blockAlign="center" gap="300" wrap={false}>
            <BorderCircleText
              onClick={() => onManageOption(index)}
              text={name}
            />
               <span className="btn-span" onClick={() =>onManageOption(index)}>
            {truncateText(name)}
            </span>
          </InlineStack>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <span className="btn-span" onClick={() =>onManageOption(index)}>
            {truncateText(description)}
            </span>
        </IndexTable.Cell>
        <IndexTable.Cell className="td-center">
        { icon && <img
            style={{ height: "30px" }}
            src={fileUrl(icon)}
            alt={"product " + name}
          />}
        </IndexTable.Cell>
        <IndexTable.Cell className="td-center">
          <ReactSwitchCustom
            checked={isDefault || false}
            setChecked={() => (isDefault ? "" : handeleDefault(index))}
          ></ReactSwitchCustom>
        </IndexTable.Cell>

        <IndexTable.Cell className="td-center">
          <ButtonGroup fullWidth noWrap gap="loose">
            <button
              className="add-option-btn"
              onClick={() => onManageOption(index)}
            >
              <InlineStack gap="100" blockAlign="center">
                {" "}
                <RoundManageHistoryIcon /> <Text as="span">
                  {" "}
                  add options{" "}
                </Text>{" "}
              </InlineStack>
            </button>
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
    <>
      <BoxBackground>
        <Box paddingInline="300" paddingBlock="600">
          <InlineStack align="start">
            <InlineStack gap="100" align="start" blockAlign="start">
              <Text as="h2" variant="headingMd">
                {configuration?.name}
              </Text>
              <NextLtrIcon />
              <Link className="link" to="../../materials">
                <Text as="h2" variant="headingMd" tone="subdued">
                  Materials
                </Text>
              </Link>
              <NextLtrIcon />
              <Text as="h2" variant="headingMd" tone="subdued">
                {material?.name} (Advance)
              </Text>
            </InlineStack>
          </InlineStack>
        </Box>
        <Divider borderWidth="100" />
      </BoxBackground>
      <Divider borderWidth="100" />

      <SpacingBackground width="100%" height="auto">
        <BoxBackground>
          <Box padding="300">
            <BlockStack gap="300">
              <InlineStack gap="100" align="space-between">
                <Text as="h2" variant="headingMd">
                  List of components
                </Text>
                <button
                  className="primary-btn"
                  type="button"
                  onClick={handleEdit}
                >
                  <Box paddingInline="300">
                    <InlineStack gap="300">
                      <PlusIcon />
                      <span className="primary-btn-text">
                        Add new component
                      </span>
                    </InlineStack>
                  </Box>
                </button>
              </InlineStack>
            </BlockStack>
          </Box>
          <Divider borderWidth="050" />
        </BoxBackground>
        <IndexTable
          resourceName={resourceName}
          itemCount={materialComponents ? materialComponents.length : 0}
          selectable={false}
          headings={[
            { title: "Title" },
            { title: "Desciption" },
            { title: "Icon", alignment: "center" },
            { title: "Default", alignment: "center" },
            { title: "Action", alignment: "center" },
          ]}
        >
          {rowMarkup}
        </IndexTable>
      </SpacingBackground>
    </>
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
      await MaterialAdvanceComponentService.delete(
        configId,
        session.id,
        mId,
        parseInt(id || ""),
      );
      return json({
        ...jFlashMessage(
          "Material advance component deleted successfully",
        ),
      });
      break;
    }
    case "PUT": {
      const id = formData.get("id") as string;
      console.log("start deleting");
      await MaterialAdvanceComponentService.setDefault(
        configId,
        session.id,
        mId,
        parseInt(id || ""),
      );
      return json({
        ...jFlashMessage(
          "Default material advance component set successfully",
        ),
      });
      break;
    }
    default:
      break;
  }

  return null;
};
