import {
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
import { authenticate } from "~/shopify.server";
import TemplateService from "~/models/Template.service";
import useHandleFlashMessage from "~/hooks/useHandleFlashMessage";
import { getError } from "~/utils/error-getting";
import { BiSaveBtn } from "~/components/buttons/BiSaveBtn";
import { z } from "zod";
import { parseWithZod } from "@conform-to/zod";
import { flashMessage, jFlashMessage } from "~/utils/message-flash";
import { BackBtn } from "~/components/buttons/BackBtn";
import { TemplateType } from "~/types/TemplateType";
import { FileInput } from "~/components/inputs/FileInput";
import CategoryService from "~/models/Category.service";
import ConfigurationService from "~/models/Configuration.service";
import { ComboxSelect } from "~/components/inputs/ComboxSelect";
import { booleanTransform, stringTransform } from "~/utils/transfomerZod";
import { EditCategoryModal } from "./app.templates.categories._index";
import { fileUrl, getShopPath } from "~/utils/fileUrl";
import { readFileSync } from "fs";
import FontService from "~/models/Font.service";
import { replaceUrlForImport } from "~/utils/import-file";
import { FontType } from "~/types/ManagePropertyType";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const { session, admin } = await authenticate.admin(request);

  let categories = await CategoryService.getCategorys(session.id);
  let configurations = await ConfigurationService.getConfigurations(session.id);

  return json({  categories, configurations });
};

export default function TemplateEditComponent() {
  const submit = useSubmit();
  const navigation = useNavigation();
  const actionData = useActionData<typeof action>();
  let [enableCategoryEdit, setEnableCategoryEdit] = useState<any>(false);
  useHandleFlashMessage();
  let {  categories, configurations } = useLoaderData<typeof loader>();
  let [categoriesData, setCategoriesData] = useState<any>(categories || []);
  const [formData, setFormData] = useState(
      {
        categoryId: categories?.length ? categories[0].id : 0,
        configurationId: configurations?.length ? configurations[0].id : 0,
        templates: ""
    }
  );

  let isLoading = navigation.state == "loading";
  let isSubmitting = navigation.state == "submitting";

  useEffect(() => {
    if (categories) {
      setCategoriesData(categories);
    }
  }, [categories]);

  const handleInputChange = (inputName: string, value: any) => {
    setFormData((prevData: any) => ({
      ...prevData,
      [inputName]: value,
    }));
  };

  const navigate = useNavigate();
  const onBack = () => {
    navigate("..");
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    submit({ ...formData }, { method: "POST" });
  };

  return (
    <div>
      <SpacingBackground width="100%" height="auto" margin="16px 0px ">
        <Form onSubmit={handleSubmit} method="POST">
          <SpacingBackground backgroundColor="#F9F9F9">
            <Box paddingInline="300" paddingBlock="600">
              <Text as="h6" variant="bodyMd" fontWeight="bold">
                Import Template
              </Text>
            </Box>
          </SpacingBackground>
          <Divider borderWidth="100" />
          <SpacingBackground backgroundColor="#F8F9FB">
            <Box paddingInline="300" paddingBlock="1000">
              <Grid gap={{ lg: "30px" }}>
                <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
                  <FileInput
                    error={getError(actionData, "templates")}
                    title="Upload template json file"
                    buttonTitle="Upload"
                    type="other"
                    path={formData.templates}
                    handlePath={(value: string) =>
                      handleInputChange("templates", value)
                    }
                  />
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
                  <ComboxSelect
                    label="Select category"
                    placeholder="seach category"
                    selectedOption={`${formData.categoryId}`}
                    data={
                      categoriesData?.map((category: any) => ({
                        label: category.name,
                        value: `${category.id}`,
                      })) || []
                    }
                    setSelectedOption={(value: any) =>
                      handleInputChange("categoryId", parseInt(value))
                    }
                    error={getError(actionData, "categoryId")}
                    button={
                      <Button
                        tone="success"
                        variant="primary"
                        onClick={() => {
                          setEnableCategoryEdit(true);
                        }}
                      >
                        Add new
                      </Button>
                    }
                  ></ComboxSelect>
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
                  <ComboxSelect
                    label="Select configuration"
                    placeholder="seach configuration"
                    selectedOption={`${formData.configurationId}`}
                    data={
                      configurations?.map((configuration) => ({
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
              </Grid>
            </Box>
          </SpacingBackground>
          <Divider borderWidth="100" />
          <SpacingBackground backgroundColor="#F9F9F9">
            <Box paddingInline="300" paddingBlock="300">
              <InlineStack align="end" gap="600">
                <BackBtn isLoading={isLoading} title="Back" />
                <BiSaveBtn isLoading={isSubmitting|| isLoading} title='' />

              </InlineStack>
            </Box>
          </SpacingBackground>
        </Form>
      </SpacingBackground>
      <EditCategoryModal
        onSubmit={(value: any) => {
          setCategoriesData([...categoriesData, value]);
          handleInputChange("categoryId", value.id);
        }}
        open={enableCategoryEdit}
        onClose={() => {
          setEnableCategoryEdit(false);
        }}
      />
    </div>
  );
}

const formSchema = z.object({
  templates: z.string().nullish().transform(stringTransform),
  configurationId: z.number(),
  categoryId: z.number().nullable().nullish(),
});

export const action = async ({ request }: ActionFunctionArgs) => {
  const { session, admin } = await authenticate.admin(request);

  const formData = await request.formData();


  const submission:any = parseWithZod(formData, { schema: formSchema });

  if (submission.status !== "success") {
    return json({ status: false, message: null, errors: submission.error });
  }
  let configData: any = null;
  try {
    const readData = readFileSync("public"+fileUrl(submission.value.templates), 'utf8');
    configData = JSON.parse(readData);
    
    configData = await replaceUrlForImport(
      configData,
      configData.uploadsPrefix,
      `https://${session.shop}/apps/aso-proxy/`,
      `public/uploads/${getShopPath(session.id)}/files`,
      true
    );
    
  } catch (error) {
    console.log("errors on reading file", error);
  }

  //  enregister configuration  des  fonts
  
  let fontIDs = [];
  if (configData?.fonts?.length > 0) {
    for (const font of configData.fonts) {
      const fontData = await FontService.addFont({
        label: font.label,
        url: font.url,
        isGoogleFont: font.isGoogleFont
      }, session.id);

      if (fontData) {
        fontIDs.push(fontData.id);
      }
    }
  }


  let configuration = await ConfigurationService.getConfiguration(submission.value.configurationId, session.id);
 
  // engistrement des  materiels associes au  templates  importés
  configuration.data.materials = [...configuration.data.materials, ...configData.data.materials]

  // engistrement des  font associes au  templates  importés

  configuration.data.settings.customizerSign.text.selectedFonts.push(...fontIDs);


  
  configuration = await ConfigurationService.updateConfiguration(configuration, session.id);
  
  let templates = await TemplateService.addMany(configData.templates, session.id, configuration.id, submission.value.categoryId??undefined)
  
  return templates ? redirect(`..${flashMessage("templates  imported is completed successfully")}`)
  : json({ ...jFlashMessage("error   on template adding") });
  
};




