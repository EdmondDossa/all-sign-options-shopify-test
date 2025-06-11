import {
  BlockStack,
  Box,
  ButtonGroup,
  Divider,
  IndexTable,
  InlineGrid,
  InlineStack,
  Page,
  Select,
  Text,
} from "@shopify/polaris";
import { useCallback, useState } from "react";
import { DeleteIconBtn } from "~/components/buttons/DeleteIconBtn";
import { ViewIconBtn } from "~/components/buttons/ViewIconBtn";
import { EditIconBtn } from "~/components/buttons/EditIconBtn";
import {
  Link,
  json,
  useLoaderData,
  useNavigate,
  useOutletContext,
  useSubmit,
} from "@remix-run/react";
import { BoxBackground } from "~/components/layouts/BoxBackground";
import PlusIcon from "~/components/icons/PlusIcon";
import { SpacingBackground } from "~/components/layouts/SpacingBackground";
import { authenticate } from "~/shopify.server";
import { ActionFunctionArgs, LoaderFunctionArgs, redirect } from "@remix-run/node";
import ConfigurationService from "~/models/Configuration.service";
import useHandleFlashMessage from "~/hooks/useHandleFlashMessage";
import { flashMessage, jFlashMessage } from "~/utils/message-flash";
import { BorderCircleText } from "~/components/feactures/BorderCircleText";
import { ManageBtn } from "~/components/buttons/ManageBtn";
import { truncateText } from "~/utils/truncate-text";
import { fileUrl } from "~/utils/fileUrl";
import { DuplicateIconBtn } from "~/components/buttons/DuplicateIconBtn";
import { ConfigurationType } from "~/types/ConfigurationType";
import { PRICING_PLANS } from "~/utils/pricing";
// import {LATEST_API_VERSION} from "@shopify/shopify-app-remix/server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { session, admin } = await authenticate.admin(request);

  const configurations = await ConfigurationService.getConfigurations(session.id);
  // console.log("log log", LATEST_API_VERSION);

  return json({ configurations });
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const { session, admin } = await authenticate.admin(request);

  const formData = await request.formData();
  const id = formData.get("id") as string;
  const method = request.method;
 

  switch (method) {
    case "DELETE": {
      await ConfigurationService.deleteConfiguration(parseInt(id), session.id);

   
      return redirect(
        `${flashMessage("Configution deleting is completed successfull")}`,
      );
      break;
    }

    case "POST": {
      const configuration: ConfigurationType =
        await ConfigurationService.getConfigurationWithoutTemplates(parseInt(id), session.id);
      delete configuration.id;
      delete configuration.product;
      configuration.name = formData.get("configTitle") as string;
      await ConfigurationService.duplicateConfiguration(
        configuration,
        session.id,
      );

      return redirect(
        `${flashMessage("Configution duplicating is completed successfull")}`,
      );
      break;
    }

    default:
      break;
  }

  return null;
};

// This example is for guidance purposes. Copying it will come with caveats.
export default function Configuration() {
  const submit = useSubmit();
  let { configurations } = useLoaderData<typeof loader>();
  let { plan } = useOutletContext<{ plan: string }>();
  
  if (plan == PRICING_PLANS.STARTER) {
    configurations = configurations?.slice(0, PRICING_PLANS.STARTER_RULES.configurations)||[];
  }
  useHandleFlashMessage();

  const [configTitle, setConfigTitle] = useState<string>("");

  const navigate = useNavigate();
  const onHandleConfigurationCreate = () => {
    navigate("/app/configuration/create");
  };

  const handeleDelete = (id: number) => {
    submit({ id: id }, { method: "DELETE" });
  };

  const handeleDuplicate = (id: number) => {
    submit({ id: id, configTitle: configTitle }, { method: "POST" });
  };

  const handleUpdate = (id: number) => {
    submit({ id: id }, { method: "GET", action: "create" });
  };

  const handleMaterials = (id: number) => {
    navigate(`${id}/materials`);
  };
  

  const handlePreviews = (id: number) => {
    navigate(`${id}/preview`);
  };

  configurations = configurations || [];

  const resourceName = {
    singular: "Configuration",
    plural: "Configurations",
  };

  const rowMarkup = configurations.map(
    ({ id, name, description, icon, popupImg }, index) => (
      <IndexTable.Row id={`${id}`} key={id} position={index}>
        <IndexTable.Cell>
          <InlineStack blockAlign="center" gap="300" wrap={false}>
            <BorderCircleText onClick={() => handleMaterials(id)} text={name} />{" "}
            <span className="btn-span" onClick={() => handleMaterials(id)}>
            {truncateText(name)}
            </span>
          </InlineStack>
        </IndexTable.Cell>
        <IndexTable.Cell>

            <span className="btn-span" onClick={() => handleMaterials(id)}>
            {truncateText(description)}
            </span>
          
        </IndexTable.Cell>
        <IndexTable.Cell className="td-center">
        { icon && <img
            style={{ height: "30px" }}
            src={fileUrl(icon)}
            alt={"product thumbnail" + name}
          />}
        </IndexTable.Cell>

        <IndexTable.Cell className="td-center">
          <ButtonGroup fullWidth={true} noWrap gap="loose">
            <ViewIconBtn
              onClick={() => {
                handlePreviews(id);
              }}
            />
            <ManageBtn title="Materials" handleClick={() => handleMaterials(id)} />
            <EditIconBtn
              size="micro"
              onClick={() => {
                handleUpdate(id);
              }}
            />
            <DuplicateIconBtn
              handeleDuplicate={() => {
                handeleDuplicate(id);
              }}
              handleTitle={setConfigTitle}
              title={configTitle}
              onModalOpen={() => {
                setConfigTitle(name);
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
    <Page fullWidth>
       <BoxBackground>
      <Box paddingInline="300" paddingBlock="600">
          <InlineStack gap="100" align="start">
            <Text as="h2" variant="headingMd">
              Configurations list
            </Text>
        </InlineStack>
      </Box>
    </BoxBackground>
      <SpacingBackground  margin="16px 0px ">
        <BoxBackground>
          <Box padding="300">
            <BlockStack gap="300">
              

     { !(plan == PRICING_PLANS.STARTER && configurations?.length>=PRICING_PLANS.STARTER_RULES.configurations)      &&   <InlineStack align="end">
                
                <button
                  className="primary-btn"
                  type="button"
                  onClick={onHandleConfigurationCreate}
                >
                  <Box paddingInline="300">
                    <InlineStack gap="300">
                      <PlusIcon />
                      <span className="primary-btn-text">
                        {" "}
                        Add new configuration
                      </span>
                    </InlineStack>
                  </Box>
                </button>
              </InlineStack>}
            </BlockStack>
          </Box>
        </BoxBackground>
        <IndexTable
          resourceName={resourceName}
          itemCount={configurations.length}
          selectable={false}
          headings={[
            { title: "Name configuration" },
            { title: "Desciption" },
            { title: "Icon", alignment: "center" },
            { title: "Action", alignment: "center" },
          ]}
        >
          {rowMarkup}
        </IndexTable>
        <Divider borderWidth="050" />
        
      </SpacingBackground>
    </Page>
  );
}

