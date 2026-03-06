import {
  BlockStack,
  Box,
  Card,
  Grid,
  InlineStack,
  Page,
  Text,
} from "@shopify/polaris";
import { useEffect, useState } from "react";
import {
  Form,
  useActionData,
  useLoaderData,
  useNavigation,
  useOutletContext,
  useSubmit,
} from "@remix-run/react";
import { ActionFunctionArgs, json, LoaderFunctionArgs } from "@remix-run/node";
import useHandleFlashMessage from "~/hooks/useHandleFlashMessage";
import { CustomTinymce } from "~/components/inputs";
import { getError } from "~/utils/error-getting";
import {
  BiSaveBtn,
  EditIconBtn,
} from "~/components/buttons";
import { jFlashMessage } from "~/utils/message-flash";
import ConfigSettingsService from "~/models/ConfigSetttings.service";
import { authenticate } from "~/shopify.server";
import { RayStartArrowIcon } from "~/components/icons";
import ConfigurationService from "~/models/Configuration.service";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const { session, admin } = await authenticate.admin(request);
  const { configId } = params;

  const configuration = await ConfigurationService.getConfiguration(
    parseInt(`${configId}`),
    session.id,
  );

  return json({ infos: configuration.data.settings.infos });
};

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const { session, admin } = await authenticate.admin(request);

  const formData = await request.formData();
  const configId = params.configId;
  const method = request.method;

  switch (method) {
    case "POST":
      const infos: any = formData.get("infos");

      if (infos) {
        const parsedInfos = JSON.parse(infos);

        const result = await ConfigSettingsService.updateSetting(
          parseInt(`${configId}`),
          session.id,
          "infos",
          parsedInfos,
        );

        return json({
          ...jFlashMessage("Infos setting updated successfully"),
        });
      } else {
        console.log("No infos data received");
      }
      break;
    default:
      console.log("Unsupported method:", method);
      break;
  }

  return null;
};

export default function SettingsLanguageImageIcons() {
  const submit = useSubmit();
  const { currencySymbol, configuration } = useOutletContext<any>();
  const { infos } = useLoaderData<typeof loader>();
  const [settingInfos, setSettingInfos] = useState<any>({
    sizes: "",
    backboards: "",
    mountings: "",
    colors: "",
    materials: "",
    jackets: "",
    letterTypes: "",
    extras: [],
  });
  const actionData = useActionData<any>();
  useHandleFlashMessage();
  const navigation = useNavigation();
  let isSubmitting = navigation.state == "submitting";

  const [showForm, setShowForm] = useState(false);
  useEffect(() => {
    if (infos) {
      setSettingInfos((prevState: any) => ({
        ...prevState,
        ...infos,
      }));
    }
  }, [infos]);

  const [currentInfo, setCurrentInfo] = useState<any>(null);
  const handleEditInfo = (key: string, index?: number) => {
    if (index == null) {
      setCurrentInfo({
        key,
        content: settingInfos[key],
      });
    } else {
      const currentArray = settingInfos[key] || [];
      setCurrentInfo({
        key: "extras",
        content: currentArray[index] || "",
        index: index,
      });
    }
    setShowForm(true);
  };

  const handleSaveInfo = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      let updatedSettingInfos;

      if (currentInfo.key === "extras") {
        const currentArray = [...(settingInfos[currentInfo.key] || [])];
        currentArray[currentInfo.index] = currentInfo.content;
        updatedSettingInfos = {
          ...settingInfos,
          [currentInfo.key]: currentArray,
        };
      } else {
        updatedSettingInfos = {
          ...settingInfos,
          [currentInfo.key]: currentInfo.content,
        };
      }
      setSettingInfos(updatedSettingInfos);
      submit(
        { infos: JSON.stringify(updatedSettingInfos) },
        { method: "POST" },
      );
      console.log("Updated Setting Infos: ", updatedSettingInfos);
      setCurrentInfo(null);
      setShowForm(false);
    } catch (error) {
      console.error("Error saving info:", error);
    }
  };

  return (
    <Page>
      {!showForm && (
        <>
          {Object.entries(settingInfos).map(([key, value]) => (
            <>
              {Array.isArray(value) ? (
                (
                  configuration?.data?.additionalOptions?.customAdditionalsOptions ||
                  []
                ).map(
                  (item: any, index: number) => (
                    <>
                      <InfoDisplay
                        title={item.title || item.label}
                        key={index}
                        onEdit={() => handleEditInfo("extras", index)}
                      />
                      <Box padding="150" />
                    </>
                  ),
                )
              ) : (
                <>
                  <InfoDisplay
                    key={key}
                    title={key}
                    onEdit={() => handleEditInfo(key)}
                  />
                  <Box padding="150" />
                </>
              )}
            </>
          ))}
        </>
      )}
      {showForm && (
        <Box paddingBlockStart="200">
          <Card>
            <Box padding="300">
              <Form onSubmit={handleSaveInfo}>
                <Grid gap={{ lg: "25px" }}>
                  <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
                    <Text as="strong" fontWeight="bold" variant="bodyLg">
                      {currentInfo.key} information content
                    </Text>
                  </Grid.Cell>

                  <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
                    <CustomTinymce
                      error={getError(actionData, "helpContent")}
                      title=""
                      onEditorChange={(value: any) =>
                        setCurrentInfo({
                          ...currentInfo,
                          content: value,
                        })
                      }
                      value={currentInfo.content || ""}
                    />
                  </Grid.Cell>
                </Grid>
                <Box padding="150" />
                <InlineStack align="end" gap="600">
                  <button
                    disabled={isSubmitting}
                    className="back-large-btn"
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      setCurrentInfo(null);
                    }}
                  >
                    <Box paddingInline="1000">
                      <InlineStack gap="300">
                        <RayStartArrowIcon />{" "}
                        <span style={{ color: "black", fontWeight: "bold" }}>
                          Back
                        </span>
                      </InlineStack>
                    </Box>
                  </button>
                  <BiSaveBtn isLoading={isSubmitting} title="Save" />
                </InlineStack>
              </Form>
            </Box>
          </Card>
        </Box>
      )}
    </Page>
  );
}

interface InfoDisplayProps {
  onEdit?: () => void;
  title?: string;
}

const InfoDisplay: React.FC<InfoDisplayProps> = ({
  onEdit,
  title = "Sizes",
}) => {
  const handleEditClick = () => {
    if (onEdit) {
      onEdit();
    }
  };

  return (
    <>
      <Card>
        <InlineStack align="space-between" blockAlign="center">
          <BlockStack gap="200">
            <Text as="h2" variant="headingMd" fontWeight="bold">
              {title}
            </Text>
            <Text variant="bodyMd" as="p">
              Give your customers more information about the {title} section
            </Text>
          </BlockStack>
          <EditIconBtn onClick={handleEditClick} size="medium" />
        </InlineStack>
      </Card>
    </>
  );
};
