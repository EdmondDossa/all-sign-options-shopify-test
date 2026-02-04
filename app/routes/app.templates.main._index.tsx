import { parseWithZod } from "@conform-to/zod";
import { ActionFunctionArgs, LoaderFunctionArgs, json } from "@remix-run/node";
import {
  Form,
  redirect,
  useActionData,
  useLoaderData,
  useNavigate,
  useNavigation,
  useSubmit,
} from "@remix-run/react";
import {
  BlockStack,
  Box,
  Card,
  Grid,
  Icon,
  InlineStack,
  Text,
  Badge,
  TextField,
  ButtonGroup,
  Divider,
  ExceptionList,
} from "@shopify/polaris";
import { useState } from "react";
import PlusIcon from "~/components/icons/PlusIcon";
import ImportIcon from "~/components/icons/ImportIcon";
import ExportIcon from "~/components/icons/ExportIcon";
import { BoxBackground } from "~/components/layouts/BoxBackground";
import { SpacingBackground } from "~/components/layouts/SpacingBackground";
import { SearchIcon } from "@shopify/polaris-icons";
import { DeleteIconBtn } from "~/components/buttons/DeleteIconBtn";
import { EditIconBtn } from "~/components/buttons/EditIconBtn";
import { SettingIconBtn } from "~/components/buttons/SettingIconBtn";
import { authenticate } from "~/shopify.server";
import TemplateService from "~/models/Template.service";
import CategoryService from "~/models/Category.service";
import TemplatePackService from "~/models/TemplatePack.service";
import { ShopifyShopService } from "~/models/ShopifyShop.service.server";
import { flashMessage, jFlashMessage } from "~/utils/message-flash";
import useHandleFlashMessage from "~/hooks/useHandleFlashMessage";
import { getImageUrl } from "~/utils/fileUrl";
import { ComboxSelect } from "~/components/inputs/ComboxSelect";
import { LinksConfirmBtn } from "~/components/buttons/LinksConfirmBtn";
import { AlertCircleIcon } from "@shopify/polaris-icons";



export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { session, admin } = await authenticate.admin(request);

  const templates = await TemplateService.getTemplates(
    session.id,
  );

  const categories = await CategoryService.getCategorys(session.id);

  let templateUrl = "";
  try {
    const shop = await ShopifyShopService.getShop(admin);
    templateUrl = `https://${shop.myshopifyDomain}/admin/themes/current/editor?template=product&addAppBlockId=${process.env.SHOPIFY_ALL_SIGNS_OPTIONS_FRONTEND_ID}/all-signs-option-template&target=newAppsSection`;
  } catch (e) {
    // ignore
  }

  return json({ templates, categories, templateUrl });
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const { session, admin } = await authenticate.admin(request);

  const formData = await request.formData();
  const id = formData.get("id") as string;
  const method = request.method;

  switch (method) {
    case "DELETE": {
      console.log("start deleting");
      await TemplateService.deleteTemplate(parseInt(id), session.id);
      
      // Check pack access after template deletion
      await TemplatePackService.checkPackAccessAfterDeletion(session.id);
      
      return json({
        ...jFlashMessage("Template deleted successfully"),
      });
    }

    default:
      break;
  }

  return null;
};




export default function ConfigurationTemplates() {
  const  [searchTag,  setSearchTag] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const submit = useSubmit();
  let { templates, categories, templateUrl } = useLoaderData<typeof loader>();
  useHandleFlashMessage();
 


  const navigation = useNavigation();

  let data : Array<{
    label: string;
    value: any;
    image: string;
    basePrice: number|any;
    categoryId: number | null;
  }> =templates?.map((item, index) => {
    return {
      label: item.name,
      value: `${item.id}`,
      image: item.prevImg || item.realImg || item.configuration?.icon || item.configuration?.popupImg || "",
      basePrice: item.basePrice,
      categoryId: item.categoryId
    };
  })||[];

  // Filter by category first
  if (selectedCategoryId !== null) {
    data = data.filter((item) => {
      return item.categoryId === selectedCategoryId;
    });
  }

  // Then filter by search tag
  data = data.filter((item) => {
    return item.label.toLowerCase().includes(searchTag.toLowerCase());
  });


  let isSubmitting = navigation.state == "submitting";
  const navigate = useNavigate();


  const onHandleCreate = () => {
    navigate("edit");
  };

  const onHandleImport = () => {
    navigate("import");
  };


  const onHandleExport = () => {
    navigate("export");
  };

  const onHandlePacks = () => {
    navigate("/app/templates/packs");
  };

  const handeleDelete = (id: number) => {
    submit({ id: id }, { method: "DELETE" });
  };

  const handleUpdate = (id: number) => {
    submit({ id: id }, { method: "GET", action: "edit" });
  };


  const handlePreview = (id: number) => {
    navigate(`preview/${id}`);
  };



  return (
      <div style={{width:"100%", height:"auto", padding: "10px 0px"}}>
        <Card>
          <Box>
            <InlineStack gap="100" align="space-between" blockAlign="center">
              <Text as="h2" variant="headingMd">
                 Templates  list
            </Text>
            <InlineStack gap="100" align="space-between" blockAlign="center">
              <Box minWidth="200px">
                <ComboxSelect
                  label="Filter by category"
                  placeholder="All categories"
                  selectedOption={selectedCategoryId !== null ? `${selectedCategoryId}` : "0"}
                  data={[
                    { label: "All categories", value: "0" },
                    ...(categories?.map((category: any) => ({
                      label: category.name,
                      value: `${category.id}`,
                    })) || [])
                  ]}
                  setSelectedOption={(value: any) => {
                    setSelectedCategoryId(value === "0" ? null : parseInt(value));
                  }}
                  labelHidden={true}
                />
              </Box>
              <TextField
                label="Search templates"
                prefix={<Icon source={SearchIcon} />}
                value={searchTag}
                placeholder="Search templates"
                onChange={setSearchTag}
                autoComplete="on"
                labelHidden
            />
             <button
                  className="primary-btn"
                  type="button"
                  onClick={() => { onHandleCreate() }}
                >
                  <Box paddingInline="100">
                    <InlineStack gap="100">
                      <PlusIcon />
                      <span className="primary-btn-text">
                       Create Template  
                      </span>
                    </InlineStack>
                  </Box>
              </button>
              <div className="aso-coming-soon-wrapper">
                <span className="aso-coming-soon-tooltip">Coming soon</span>
                <button
                  className="primary-btn aso-coming-soon-btn"
                  type="button"
                  disabled
                >
                  <Box paddingInline="100">
                    <InlineStack gap="100">
                      <PlusIcon />
                      <span className="primary-btn-text">
                        Browse our template
                      </span>
                    </InlineStack>
                  </Box>
                </button>
              </div>
              <button
                className="primary-btn"
                type="button"
                onClick={ ()=>{ onHandleImport() } }
              >
                <Box paddingInline="100">
                  <InlineStack gap="100">
                    <ImportIcon />
                    <span className="primary-btn-text">
                      Import  
                    </span>
                  </InlineStack>
                </Box>
              </button>
              <button
                className="primary-btn"
                type="button"
                onClick={ ()=>{ onHandleExport() } }
              >
                <Box paddingInline="100">
                  <InlineStack gap="100">
                    <ExportIcon />
                    <span className="primary-btn-text">
                      Export  
                    </span>
                  </InlineStack>
                </Box>
              </button>
              {templateUrl ? (
                <LinksConfirmBtn
                  url={templateUrl}
                  modalTitle="Templates List Block"
                  title="Add template theme"
                  asButton
                >
                  <ExceptionList
                    items={[
                      {
                        icon: AlertCircleIcon,
                        status: "warning",
                        description: "This will open the theme editor and add the Templates List block to the product template. You can then place it (e.g. before the add to cart button in the Product information section) and save.",
                      },
                    ]}
                  />
                </LinksConfirmBtn>
              ) : null}
            </InlineStack>
            </InlineStack>
          </Box>
        </Card>

  
        <div style={{width:"100%", height:"auto", margin:"10px 0px", backgroundColor:"#F8F9FB"}}>
          <Box paddingInline="300" paddingBlock="300">
          <Grid gap={{ lg: "20px" }}>
              {data.map((item: any) => {
                return (
                  <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 2, lg: 3, xl: 3 }}>
                    <AppearanceItem
                      title={item.label}
                      imgSrc={getImageUrl(item.image)}
                      basePrice={item.basePrice}
                      onDelete={ ()=>handeleDelete(item.value)}
                      onUpdate={ ()=>handleUpdate(item.value)}
                      onPreview={ ()=>handlePreview(item.value)}
                    />
                  </Grid.Cell>
                );
              })}
            </Grid>
          </Box>
          
        </div>
        
      
      </div>
  
  );
};

export const AppearanceItem = ({
  imgSrc,
  title,
  onDelete,
  onUpdate,
  onPreview,
  basePrice
}: {
  imgSrc: string;
  title?: string;
  basePrice: number;
  onPreview: Function;
  onDelete: Function;
  onUpdate: Function;
}) => {
  return (
    <SpacingBackground>
      <div
     
        style={{ position: "relative" }}
        className={"template"}
      >
        <img src={imgSrc || "/aso_logo.png"} alt={title} className="image-fit" style={{height: "10rem"}} />

        <Box paddingBlock="100">
          <BlockStack gap="100">
            <InlineStack align="space-between" gap="200">
              <Text as="span" variant="bodyMd" fontWeight="bold">
                {title || "Default template"}
              </Text>
            
            </InlineStack>

            <Box paddingBlockStart="200" paddingBlockEnd="050">
            <Divider  borderWidth="0165" borderColor="border-tertiary" />                     
            </Box>
            <InlineStack blockAlign="center"  gap="200" align="space-between">
            <Badge tone="critical">{`Base price: ${basePrice}`}</Badge>
                <ButtonGroup fullWidth={true} noWrap gap="tight">
              
                  <EditIconBtn
                    size="micro"
                    onClick={() => {
                      onUpdate()
                    }}
                  />
            
                  <DeleteIconBtn
                    size="micro"
                    onClick={() => {
                      onDelete()
                    }}
                />
                    <SettingIconBtn
                    onClick={() => {
                   onPreview()
                    }}
                  />
                
                </ButtonGroup>
            </InlineStack>
          
          </BlockStack>
        </Box>
      </div>
    </SpacingBackground>
  );
};
