import { parseWithZod } from "@conform-to/zod";
import { ActionFunctionArgs, json } from "@remix-run/node";
import { Form, redirect, useActionData, useNavigate, useNavigation, useSubmit } from "@remix-run/react";
import { BlockStack, Box, InlineStack, Page, Text } from "@shopify/polaris";
import { useEffect, useState } from "react";
import { z } from "zod";
import { BackBtn } from "~/components/buttons/BackBtn";
import { BiSaveBtn } from "~/components/buttons/BiSaveBtn";
import { SelectCombobox } from "~/components/inputs/MulticomboxBorder";
import { BoxBackground } from "~/components/layouts/BoxBackground";
import { SpacingBackground } from "~/components/layouts/SpacingBackground";
import ConfigurationService from "~/models/Configuration.service";
import { configurationDemoData } from "~/models/demoData";
import { authenticate } from "~/shopify.server";
import { getError } from "~/utils/error-getting";
import { flashMessage } from "~/utils/message-flash";

export default function ConfigurationDemo() {
  const [includeDemoData, setIncludeDemoData] = useState(false);
  const [includeDemoDataError, setIncludeDemoDataError] = useState(false);
  const [selectData, setSelectData] = useState("");
  const actionData = useActionData<typeof action>();
  
  const submit = useSubmit();
  const navigation = useNavigation();

  const data: Array<{
    label: string;
    value: any;
    description: string;
    image: string;
  }> = configurationDemoData.map((item,index) => {
    return {
      label: item.name,
      value: `${index}`,
      description: item.description,
      image: item.icon,
    };
  })

  useEffect(() => {
    setIncludeDemoDataError(getError(actionData, "demoId") ? true : false)
  }, [actionData]);


  let isSubmitting = navigation.state == "submitting";

  const handleSubmit = (e: any) => {

    e.preventDefault();
    if (!selectData) {
      setIncludeDemoDataError(true);
      return;
    }
    submit({ demoId: selectData }, { method: "POST" });
  };


  const navigate = useNavigate();

  return (
    <Page fullWidth>
      <SpacingBackground width="100%" height="00">
        <BoxBackground>
          <Box paddingBlock="2000">
            {!includeDemoData ? (
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
            ) : (
                  <Box paddingInline="1000">
                    
                    <BlockStack gap="600">
                    <Text alignment="center" as="h2" variant="headingXl">
                    Include demo data
                    </Text>
                    <Box>
                      <SelectCombobox
                        label="Select data that you want to include"
                        placeholder="seach configuration"
                        selectedOptions={selectData ? [selectData] : []}
                      data={data}
                      error={includeDemoDataError ? "Data is required" : ""}
                        setSelectedOptions={(value: any) => {
                          setSelectData(
                            value.length ? value[value.length - 1] : value[0],
                          );
                        }}
                    />
                    </Box>
                    <Form onSubmit={handleSubmit}>

                      <InlineStack align="center" gap="200">
                        <BackBtn
                          onClick={() => setIncludeDemoData(false)}
                          title="Cancel"
                        />
                        <BiSaveBtn isLoading={isSubmitting} title="Save" />
                      </InlineStack>
                    </Form>
                  </BlockStack>
                </Box>
            )}
          </Box>
        </BoxBackground>
      </SpacingBackground>
    </Page>
  );
}

const formSchema = z.object({
  demoId:z.string( { required_error: "Demo configuration data is required" }),

});

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const { session, admin } = await authenticate.admin(request);

  const formData = await request.formData();
  
  const submission = parseWithZod(formData, { schema: formSchema });

  if (submission.status !== "success") {
    return json({ status: false, message: null, errors: submission.error });
  }

  let demoId = submission.value.demoId; 
  let id = parseInt(params.id || '');

  console.log('demo  demoid',demoId, id);

  if (!Number.isNaN(id)) {
    const configuration = await ConfigurationService.getConfiguration(id, session.id)
    configuration.data = replaceUploadsPath(configurationDemoData[parseInt(demoId)].data, `https://${session.shop}/apps/aso-proxy/uploads/`);
    await ConfigurationService.updateConfiguration(configuration, session.id)
    
    return redirect(
      `..${flashMessage("Configuration  data  included is completed successfully")}`,
    );
  } 


  return null
};



function replaceUploadsPath(data: object, newPath: string): object {
  // Check if newPath is a string
  if (typeof newPath !== 'string') {
    throw new Error('newPath must be a string');
  }

  function replaceInObject(obj: any) {
    for (const key in obj) {
      if (typeof obj[key] === 'string') {
        obj[key] = obj[key].replace(/\/uploads\//g, newPath);
      } else if (typeof obj[key] === 'object') {
        replaceInObject(obj[key]);
      }
    }
  }

  replaceInObject(data);
  return data;
}

