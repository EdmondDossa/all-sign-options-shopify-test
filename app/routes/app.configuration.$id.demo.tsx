import { parseWithZod } from "@conform-to/zod";
import { ActionFunctionArgs, json } from "@remix-run/node";
import {
  Form,
  redirect,
  useActionData,
  useNavigate,
  useNavigation,
  useSubmit,
} from "@remix-run/react";
import {
  BlockStack,
  Box,
  Divider,
  Grid,
  Icon,
  InlineStack,
  Page,
  Text,
  TextField,
} from "@shopify/polaris";
import { useEffect, useState } from "react";
import { z } from "zod";
import { CheckSpan } from "~/components/inputs/CheckSpan";
import { BoxBackground } from "~/components/layouts/BoxBackground";
import { SpacingBackground } from "~/components/layouts/SpacingBackground";
import ConfigurationService from "~/models/Configuration.service";
import { configurationDemoData } from "~/models/demoData";
import { authenticate } from "~/shopify.server";
import { getError } from "~/utils/error-getting";
import { flashMessage } from "~/utils/message-flash";
import { truncateText } from "~/utils/truncate-text";
import { SearchIcon } from "@shopify/polaris-icons";
import { BackBtn } from "~/components/buttons/BackBtn";
import { BiSaveBtn } from "~/components/buttons/BiSaveBtn";

export default function ConfigurationDemo() {
  const [includeDemoData, setIncludeDemoData] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      {!includeDemoData ? (
        <Page fullWidth>
          <SpacingBackground width="100%" height="00">
            <BoxBackground>
              <Box paddingBlock="2000">
                <BlockStack gap="2000">
                  <BlockStack gap="150">
                    <Text alignment="center" as="h2" variant="headingXl">
                      Include demo data?
                    </Text>
                    <Box paddingInline="2800">
                      <Text alignment="center" as="p" tone="subdued">
                        To help you get started we can automatically add fonts,
                        colors, prices and sizes to your new configuration
                      </Text>
                    </Box>
                  </BlockStack>
                  <InlineStack align="center" gap="600">
                    <button
                      className="back-large-btn"
                      type="button"
                      onClick={() => setIncludeDemoData(true)}
                    >
                      <Box paddingInline="1000">
                        <InlineStack gap="300">
                          <span style={{ color: "black", fontWeight: "bold" }}>
                            Include demo data
                          </span>
                        </InlineStack>
                      </Box>
                    </button>
                    <button
                      className="next-large-btn"
                      type="button"
                      onClick={() => navigate("..")}
                    >
                      <Box paddingInline="1000">
                        <InlineStack gap="300">
                          <span style={{ color: "white", fontWeight: "bold" }}>
                            No include demo data
                          </span>
                        </InlineStack>
                      </Box>
                    </button>
                  </InlineStack>
                </BlockStack>
              </Box>
            </BoxBackground>
          </SpacingBackground>
        </Page>
      ) : (
        <DemoList handleOnBack={() => setIncludeDemoData(false)} />
      )}
    </>
  );
}

const formSchema = z.object({
  demoId: z.string({ required_error: "Demo configuration data is required" }),
});

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const { session, admin } = await authenticate.admin(request);

  const formData = await request.formData();

  const submission = parseWithZod(formData, { schema: formSchema });

  if (submission.status !== "success") {
    return json({ status: false, message: null, errors: submission.error });
  }

  let demoId = submission.value.demoId;
  let id = parseInt(params.id || "");

  console.log("demo  demoid", demoId, id);

  if (!Number.isNaN(id)) {
    const configuration = await ConfigurationService.getConfiguration(
      id,
      session.id,
    );
    configuration.data = replaceUploadsPath(
      configurationDemoData[parseInt(demoId)].data,
      `https://${session.shop}/apps/aso-proxy/uploads/`,
    );
    await ConfigurationService.updateConfiguration(configuration, session.id);

    return redirect(
      `..${flashMessage("Configuration  data  included is completed successfully")}`,
    );
  }

  return null;
};

function replaceUploadsPath(data: object, newPath: string): object {
  // Check if newPath is a string
  if (typeof newPath !== "string") {
    throw new Error("newPath must be a string");
  }

  function replaceInObject(obj: any) {
    for (const key in obj) {
      if (typeof obj[key] === "string") {
        obj[key] = obj[key].replace(/\/uploads\//g, newPath);
      } else if (typeof obj[key] === "object") {
        replaceInObject(obj[key]);
      }
    }
  }

  replaceInObject(data);
  return data;
}

const DemoList = ({ handleOnBack }: { handleOnBack: any }) => {
  const [selectData, setSelectData] = useState("");
  const  [searchTag,  setSearchTag] = useState("");
  const actionData = useActionData<typeof action>();

  const submit = useSubmit();
  const navigation = useNavigation();

  let data: Array<{
    label: string;
    value: any;
    description: string;
    image: string;
  }> = configurationDemoData.map((item, index) => {
    return {
      label: item.name,
      value: `${index}`,
      description: item.description,
      image: item.icon,
    };
  });

  data = data.filter((item) => {
    return item.label.toLowerCase().includes(searchTag.toLowerCase());
  });


  let isSubmitting = navigation.state == "submitting";

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!selectData) {
      return;
    }
    submit({ demoId: selectData }, { method: "POST" });
  };

  return (
    <Page fullWidth>
      <SpacingBackground width="100%" height="auto" margin="10px 0px ">
        <BoxBackground>
          <Box paddingInline="300" paddingBlock="300">
            <InlineStack gap="100" align="space-between" blockAlign="center">
              <Text as="h2" variant="headingMd">
                List of demo data
              </Text>
              <TextField
                prefix={<Icon source={SearchIcon} />}
                value={searchTag}
                label="Search demo data"
                onChange={setSearchTag}
                autoComplete="on"
                labelHidden
              />
            </InlineStack>
          </Box>
        </BoxBackground>

  
        <SpacingBackground width="100%" height="auto" margin="10px 0px" backgroundColor="#F8F9FB">
          <Box paddingInline="300" paddingBlock="300">
            <Grid gap={{ lg: "20px" }}>
              {data.map((demoData: any) => {
                return (
                  <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 2, lg: 4, xl: 3 }}>
                    <AppearanceItem
                      title={demoData.label}
                      description={demoData.description}
                      imgSrc={demoData.image}
                      active={demoData.value == `${selectData}`}
                      onChange={(value: any) => {
                        setSelectData(demoData.value);
                      }}
                    />
                  </Grid.Cell>
                );
              })}
            </Grid>
          </Box>
          
        </SpacingBackground>
        
        <SpacingBackground backgroundColor="#F9F9F9">
          <Form onSubmit={handleSubmit}>

          <Box paddingInline="300" paddingBlock="300">
            <InlineStack align="end" gap="600">
              <BackBtn
                onClick={() => {
                  handleOnBack();
                }}
                title="Back"
              />
              <BiSaveBtn isLoading={isSubmitting} title="Done" />
            </InlineStack>
          </Box>
          </Form>
        </SpacingBackground>
      </SpacingBackground>
    </Page>
  );
};

export const AppearanceItem = ({
  imgSrc,
  title,
  description,
  active,
  onChange,
}: {
  imgSrc: string;
  title?: string;
  description?: string;
  active: boolean;
  onChange: Function;
}) => {
  return (
    <SpacingBackground>
      <div
        onClick={() => {
          onChange(!active);
        }}
        style={{ position: "relative" }}
        className={active ? "demo-item active" : "demo-item"}
      >
        <img src={imgSrc} alt={title} className="image-fit" />

        <Box paddingInline="300" paddingBlock="300">
          <BlockStack>
            <InlineStack align="space-between" gap="200">
              <Text as="span" variant="bodyMd" fontWeight="bold">
                {title || "Default skyn"}
              </Text>
              <CheckSpan checked={active} />
            </InlineStack>
            <Text as="p" variant="bodyMd">
              {" "}
              {truncateText(description || "No description")}{" "}
            </Text>
          </BlockStack>
        </Box>
      </div>
    </SpacingBackground>
  );
};
