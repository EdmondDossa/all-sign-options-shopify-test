import {
  BlockStack,
  Box,
  Button,
  Divider,
  Grid,
  InlineStack,
  Text,
} from "@shopify/polaris";
import { useEffect, useState } from "react";
import {
  Form,
  redirect,
  useActionData,
  useLoaderData,
  useNavigate,
  useNavigation,
  useSubmit,
} from "@remix-run/react";
import { SpacingBackground } from "~/components/layouts/SpacingBackground";
import { ActionFunctionArgs, LoaderFunctionArgs, json } from "@remix-run/node";
import   { authenticate } from "~/shopify.server";
import TemplateService from "~/models/Template.service";
import useHandleFlashMessage from "~/hooks/useHandleFlashMessage";
import { getError } from "~/utils/error-getting";
import { BiSaveBtn } from "~/components/buttons/BiSaveBtn";
import { z } from "zod";
import { parseWithZod } from "@conform-to/zod";
import { flashMessage, jFlashMessage } from "~/utils/message-flash";
import { BackBtn } from "~/components/buttons/BackBtn";
import ConfigurationService from "~/models/Configuration.service";
import { ComboxSelect } from "~/components/inputs/ComboxSelect";
import { booleanTransform, jsonTransform, stringTransform } from "~/utils/transfomerZod";
import { fileUrl, getShopPath } from "~/utils/fileUrl";
import { readFileSync } from "fs";
import FontService from "~/models/Font.service";
import { replaceUrlForImport } from "~/utils/import-file";
import {
  MultiCombobox,
  SelectCombobox,
} from "~/components/inputs/MulticomboxBorder";
import { ReactSwitchCustom } from "~/components/inputs/ReactSwitchCustom";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const { session, admin } = await authenticate.admin(request);

  let configurations = await ConfigurationService.getConfigurations(
    session.id,
    true,
  );

  return { configurations };
};

export default function TemplateEditComponent() {
  const submit = useSubmit();
  const navigation = useNavigation();
  const actionData:any = useActionData<typeof action>();
  let templates: any = [];

  useHandleFlashMessage();
  let { configurations } = useLoaderData<typeof loader>();

  const [formData, setFormData] = useState({
    configurationId: 0,
    templates: [],
    exportAll: false
  });

  let isLoading = navigation.state == "loading";
  let isSubmitting = navigation.state == "submitting";

  const handleInputChange = (inputName: string, value: any) => {
    setFormData((prevData: any) => ({
      ...prevData,
      [inputName]: value,
    }));
  };

  templates =
    configurations?.find((c: any) => c.id == formData.configurationId)
      ?.templates || [];
  let templatesData = templates.map((curr: any) => ({
    label: curr.name,
    value: `${curr.id}`,
    image: curr.prevImg,
    description: '',
  }));

  const handleSubmit = (e: any) => {
    e.preventDefault();
    submit({ ...formData, templates: JSON.stringify(formData.templates)  }, { method: "POST" });
  };

 
  useEffect(() => {
    if (actionData?.configuration) {
      const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
        JSON.stringify(actionData.configuration)
      )}`;
      const link = document.createElement("a");
      link.href = jsonString;
      link.download = "data.json";
  
      link.click();
    }

  }, [actionData]);
    
     



  return (
    <div>
      <SpacingBackground width="100%" height="auto" margin="16px 0px ">
        <Form onSubmit={handleSubmit} method="POST">
          <SpacingBackground backgroundColor="#F9F9F9">
            <Box paddingInline="300" paddingBlock="600">
              <Text as="h6" variant="bodyMd" fontWeight="bold">
                Export Templates
              </Text>
            </Box>
          </SpacingBackground>
          <Divider borderWidth="100" />
          <SpacingBackground backgroundColor="#F8F9FB">
            <Box paddingInline="300" paddingBlock="1000">
              <Grid gap={{ lg: "30px" }}>
                <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
                  <ComboxSelect
                    label="Select configuration"
                    placeholder="seach configuration"
                    selectedOption={`${formData.configurationId}`}
                    data={
                      configurations?.map((configuration: any) => ({
                        label: configuration.name,
                        value: `${configuration.id}`,
                      })) || []
                    }
                    setSelectedOption={(value: any) =>
                      handleInputChange("configurationId", parseInt(value))
                    }
                    error={getError(actionData, "configurationId")}
                  ></ComboxSelect>
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
                    <BlockStack gap="200" align="start">
                        <Text as="strong" fontWeight="regular" variant="bodyMd">Export  all  templates of selected configuration </Text>
                        <ReactSwitchCustom checked={formData.exportAll} setChecked={(value:boolean)=>handleInputChange("exportAll", value)} />
                    </BlockStack>
                </Grid.Cell>

              {formData.exportAll ||  <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12}}>
                  <MultiCombobox
                    label="Templates"
                    placeholder="select template"
                    selectedOptions={formData.templates.map(
                      (curr) => `${curr}`
                    )}
                    data={templatesData}
                    setSelectedOptions={(value: any) => {
                      handleInputChange(
                        "templates",
                        value.map((v: string) => parseInt(v)),
                      );
                    }}
                  ></MultiCombobox>

              
                </Grid.Cell>}


              </Grid>
            </Box>
          </SpacingBackground>
          <Divider borderWidth="100" />
          <SpacingBackground backgroundColor="#F9F9F9">
            <Box paddingInline="300" paddingBlock="300">
              <InlineStack align="end" gap="600">
                <BackBtn isLoading={isLoading} title="Back" />
                <BiSaveBtn isLoading={isSubmitting || isLoading} title="Export templates" />
              </InlineStack>
            </Box>
          </SpacingBackground>
        </Form>
      </SpacingBackground>
    </div>
  );
}

const formSchema = z.object({
  templates: z.any().nullish().transform(jsonTransform),
  configurationId: z.number(),
  exportAll: z.any().transform(booleanTransform)
});

export const action = async ({ request }: ActionFunctionArgs) => {
  const { session, admin } = await authenticate.admin(request);

  const formData = await request.formData();

  const submission: any = parseWithZod(formData, { schema: formSchema });

  if (submission.status !== "success") {
    return json({ status: false, message: null, errors: submission.error });
  }
 
  let configuration = await ConfigurationService.getConfiguration(submission.value.configurationId, session.id);

  if (configuration && !submission.value.exportAll) {
    configuration.templates = configuration.templates?.filter((c: any) =>  submission.value.templates?.find((t: any) => t == c.id)) ;
  }

  let fonts = await FontService.getFonts(session.id);
  fonts = fonts?.filter((f: any) => configuration.data.settings.customizerSign.text.selectedFonts?.find((t: any) => t == f.id)) ?? [];
  
  configuration.fonts = fonts;

  let uploadsPrefix = process.env.SHOPIFY_APP_URL;

  console.log('here we get url ', uploadsPrefix);

  configuration = await replaceUrlForImport(configuration, "apps/aso-proxy", uploadsPrefix)


  configuration.uploadsPrefix = uploadsPrefix

  return configuration ? json({ ...jFlashMessage("Your file is ready to be downloaded"), configuration: configuration }) : json({ ...jFlashMessage("Error on template adding") });
};
