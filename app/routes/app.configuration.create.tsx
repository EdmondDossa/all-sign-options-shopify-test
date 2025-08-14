import {
  Box,
  Divider,
  Grid,
  InlineStack,
  Page,
  Text,
  TextField,
} from "@shopify/polaris";
import { useState } from "react";

import {
  Form,
  json,
  redirect,
  useActionData,
  useLoaderData,
  useNavigate,
  useNavigation,
  useSubmit,
} from "@remix-run/react";
import { SpacingBackground } from "~/components/layouts/SpacingBackground";
import RayStartArrowIcon from "~/components/icons/RayStartArrowIcon";
import RayEndArrowIcon from "~/components/icons/RayEndArrowIcon";
import { FileInput } from "~/components/inputs/FileInput";
import { authenticate } from "~/shopify.server";
import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { ConfigurationType } from "~/types/ConfigurationType";
import ConfigurationService from "~/models/Configuration.service";
import z from "zod";
import { parseWithZod } from "@conform-to/zod";
import { flashMessage } from "~/utils/message-flash";
import { ShopifyProductService } from "~/models/ShopifyProduct.service";
import { MultiProductSelectField } from "~/components/inputs/MultiProductSelectField";
import { jsonTransform, stringTransform } from "~/utils/transfomerZod";
import { CustomTinymce } from "~/components/inputs/CustomTinymce";
import prisma from "~/db.server";


export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const { session, admin } = await authenticate.admin(request);
  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  let configuration = null;

  if (id) {
    configuration = await prisma.configuration.findUnique({
      where: { id: parseInt(id), sessionId: session.id },
    });
    
    // Load associated products for editing
    if (configuration) {
      // Convert product field from database to products array for frontend
      (configuration as any).products = configuration.product || [];
      delete (configuration as any).product;
    }
  }

  return json({ configuration });
};

export default function ConfigurationEdit() {
  const submit = useSubmit();
  const navigation = useNavigation();
  const actionData = useActionData<typeof action>();
  console.log("action data :", actionData);
  let { configuration } = useLoaderData<typeof loader>();
  
  console.log("configuration :", configuration);
  const [formData, setFormData] = useState<ConfigurationType>(
    (configuration as ConfigurationType) || {
      name: "",
      description: "",
      icon: "",
      popupImg: "",
      product: null,
      products: [],
    },
  );

  let isLoading = navigation.state == "loading";
  let isSubmitting = navigation.state == "submitting";

  const handleName = (value: string) =>
    setFormData({ ...formData, name: value });

  const handleDescription = (value: string) =>
    setFormData({ ...formData, description: value });

  const handleIcon = (value: string) =>
    setFormData({ ...formData, icon: value });

  const handlePopupImg = (value: string) =>
    setFormData({ ...formData, popupImg: value });

  const handleProducts = (value: any) =>
    setFormData({ ...formData, products: value });

  const navigate = useNavigate();
  const onBack = () => {
    navigate("..");
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(" log is nt errors");
    submit(
      { ...formData, products: JSON.stringify(formData.products) },
      { method: "POST" },
    );
  };

  return (
    <Page fullWidth>
      <SpacingBackground width="100%" height="auto" margin="16px 0px ">
        <Form onSubmit={handleSubmit} method="POST">
          <SpacingBackground backgroundColor="#F9F9F9">
            <Box paddingInline="300" paddingBlock="600">
              <Text as="h6" variant="bodyMd" fontWeight="bold">
                {" "}
                {configuration
                  ? "Update configuration"
                  : "Create new configuration"}
              </Text>
            </Box>
          </SpacingBackground>
          <Divider borderWidth="100" />
          <SpacingBackground backgroundColor="#F8F9FB">
            <Box paddingInline="300" paddingBlock="1000">
              <Grid gap={{ lg: "30px" }}>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 6, xl: 6 }}>
                  <TextField
                    label="Name configuration"
                    value={formData.name}
                    onChange={handleName}
                    autoComplete="on"
                    error={
                      actionData?.errors?.name ? actionData.errors.name[0] : ""
                    }
                  />
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 6, xl: 6 }}>
                  <TextField
                    label="Description"
                    value={formData.description}
                    onChange={handleDescription}
                    autoComplete="on"
                    error={
                      actionData?.errors?.description
                        ? actionData.errors.description[0]
                        : ""
                    }
                  />
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 6, xl: 6 }}>
                  <FileInput
                    error={
                      actionData?.errors?.icon ? actionData.errors.icon[0] : ""
                    }
                    title="Upload image"
                    path={formData.icon}
                    handlePath={handleIcon}
                  />
                </Grid.Cell>

                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 6, xl: 6 }}>
                  <MultiProductSelectField
                    label="Products associated with configuration"
                    buttonTitle="select"
                    selectedProducts={formData.products || []}
                    onSelectProducts={(value: any) => {
                      console.log("Products selected ", value);
                      handleProducts(value);
                    }}
                    productTitles={formData.products?.map(p => p.title)}
                  />
                </Grid.Cell>
                {/* <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
                  <CustomTinymce
                    error={
                      actionData?.errors?.popupImg
                        ? actionData.errors.popupImg[0]
                        : ""
                    }
                    title="Popup image"
                    onEditorChange={handlePopupImg}
                    value={formData.popupImg}
                  />
                   <FileInput
                    error={
                      actionData?.errors?.popupImg
                        ? actionData.errors.popupImg[0]
                        : ""
                    }
                    title="Upload image"
                    path={formData.popupImg}
                    handlePath={}
                  /> 
                </Grid.Cell> */}
              </Grid>
            </Box>
          </SpacingBackground>
          <Divider borderWidth="100" />
          <SpacingBackground backgroundColor="#F9F9F9">
            <Box paddingInline="300" paddingBlock="300">
              <InlineStack align="end" gap="600">
                <button
                  className="back-large-btn"
                  type="button"
                  onClick={onBack}
                >
                  <Box paddingInline="1000">
                    <InlineStack gap="300">
                      <RayStartArrowIcon />{" "}
                      <span style={{ color: "black", fontWeight: "bold" }}>
                        {" "}
                        Back
                      </span>
                    </InlineStack>
                  </Box>
                </button>
                <button
                  disabled={isLoading}
                  className="next-large-btn"
                  type="submit"
                >
                  <Box paddingInline="1000">
                    <InlineStack gap="300" blockAlign="center">
                      {isSubmitting && (
                        <img
                          width="22"
                          height="22"
                          src="/loading/ic_loading_gray.svg"
                        />
                      )}
                      <span style={{ color: "white", fontWeight: "bold" }}>
                        {configuration ? "Save" : "Next"}
                      </span>
                      {!isSubmitting && !configuration && <RayEndArrowIcon />}
                    </InlineStack>
                  </Box>
                </button>
              </InlineStack>
            </Box>
          </SpacingBackground>
        </Form>
      </SpacingBackground>
    </Page>
  );
}

const formSchema = z.object({
  name: z.preprocess(
    (value) => (value === "" ? undefined : value),
    z
      .string({ required_error: "Name is required" })
      .min(3, "Name is too short")
      .max(100, "Name is too long"),
  ),
  description: z.string().nullish().transform(stringTransform),
  icon: z.string().nullish().transform(stringTransform),
  popupImg: z.string().nullish().transform(stringTransform),
  products: z.any().transform(jsonTransform),
});

export const action = async ({ request }: ActionFunctionArgs) => {
  const { session, admin } = await authenticate.admin(request);

  const formData = await request.formData();
  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  const submission = parseWithZod(formData, { schema: formSchema });

  if (submission.status !== "success") {
    return json({ status: false, message: null, errors: submission.error });
  }

  let configuration: ConfigurationType = submission.value as ConfigurationType;

  if (id) {
    configuration.id = parseInt(id);
    const oldConfiguration = await ConfigurationService.getConfiguration(
      configuration.id,
      session.id,
    );
    
    // Get old products from the database
    const oldProducts = oldConfiguration?.product || [];
    const oldProductIds = oldProducts.map((p: any) => p.id);

    const configurationObject = await ConfigurationService.updateConfiguration(
      configuration,
      session.id,
    );

    if (configurationObject && configuration.products && configuration.products.length > 0) {
      // Get new product IDs
      const newProductIds = configuration.products.map(p => p.id);
      
      // Find products to remove (in old but not in new)
      const productsToRemove = oldProductIds.filter((id: string) => !newProductIds.includes(id));
      
      // Find products to add (in new but not in old)
      const productsToAdd = configuration.products.filter((p: any) => !oldProductIds.includes(p.id));

      // Remove configuration from products that are no longer associated
      if (productsToRemove.length > 0) {
        await ShopifyProductService.removeConfigurationFromProducts(admin, productsToRemove);
      }

      // Add configuration to new products
      if (productsToAdd.length > 0) {
        await ShopifyProductService.updateMultipleProducts(admin, productsToAdd, configurationObject.id);
      }
    } else if (oldProductIds.length > 0) {
      // If no products selected, remove all associations
      await ShopifyProductService.removeConfigurationFromProducts(admin, oldProductIds);
    }

    return redirect(
      `..${flashMessage("Configuration updated successfully")}`,
    );
  } else {
    const configurationObject = await ConfigurationService.addConfiguration(
      configuration,
      session.id,
    );
    
    if (configurationObject && configuration.products && configuration.products.length > 0) {
      await ShopifyProductService.updateMultipleProducts(admin, configuration.products, configurationObject.id);
    }
    
    return redirect(`../${configurationObject.id}/demo`);
  }
};
