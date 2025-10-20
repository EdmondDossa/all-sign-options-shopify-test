import {
  Badge,
  BlockStack,
  Box,
  Button,
  Card,
  Divider,
  Grid,
  Icon,
  InlineGrid,
  InlineStack,
  Layout,
  LegacyCard,
  Link,
  Modal,
  Page,
  Text,
  TextField,
  Thumbnail,
} from "@shopify/polaris";
import { useCallback, useState } from "react";

import {
  Form,
  json,
  redirect,
  useActionData,
  useLoaderData,
  useNavigate,
  useNavigation,
  useOutletContext,
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
import { SelectProducField } from "~/components/inputs/SelectProductFied";
import { jsonTransform, stringTransform } from "~/utils/transfomerZod";
import { CustomTinymce } from "~/components/inputs/CustomTinymce";
import prisma from "~/db.server";
import { BoxBackground } from "~/components/layouts/BoxBackground";
import { configurationDemoData } from "~/models/demoData";
import { PRICING_PLANS } from "~/utils/pricing";
import { SearchIcon } from "@shopify/polaris-icons";
import { AppearanceItem } from "./app.configuration.$id.demo";
import { BackBtn } from "~/components/buttons/BackBtn";
import { BiSaveBtn } from "~/components/buttons/BiSaveBtn";
import { configFilter } from "~/utils/config-filter";
import FontService from "~/models/Font.service";
import {  fontData } from "~/models/demoData";
import { getPlan } from "~/utils/pricing-server.server";
import { MultiProductSelectField } from "~/components/inputs/MultiProductSelectField";



export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const { session, admin } = await authenticate.admin(request);
  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  let configuration = null;

  if (id) {
    configuration = await prisma.configuration.findUnique({
      where: { id: parseInt(id), sessionId: session.id },
    });
  }

  if (configuration) {
    (configuration as any).products = Array.isArray(configuration.product) ? configuration.product : [];
    delete (configuration as any).product;
  }

  return json({ configuration });
};

export default function ConfigurationEdit() {
  const submit = useSubmit();
  const navigation = useNavigation();
  const actionData = useActionData<typeof action>();
  // console.log("action data :", actionData);
  let { configuration } = useLoaderData<typeof loader>();
  
  // console.log("configuration :", configuration);
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

  


  const [step, setStep] = useState(configuration ? 4 : 0);

  const [formDatas, setFormDatas] = useState({
    name: '',
    email: '',
    age: '',
    comment: '',
  });

  // selection du type produit
  const [productType, setProductType] = useState<string>('signboard');
  const selectProductType = (type: string) => {
    setProductType(type);
    console.log(type, "product type");
  };

  const [productCategorie, setProductCategorie] = useState<string>('signage');
  const selectProductCategorie = (type: string) => {
    setProductCategorie(type);
    console.log(type, "product categorie");
  };

  // selection du type de materiel
  const [materialType, setMaterialType] = useState<string>('simple');
  const selectMaterialType = (type: string) => {
    setMaterialType(type);
    console.log(type, "material type");
  };

  // Demo data
  const [validDemoData, setValidDemoData] = useState<boolean>(false);
  const [demoId, setDemoId] = useState<any>(null);
  const [demoName, setDemoName] = useState<any>('');

  const handleSubmit = () => {
    console.log(demoId, "demoData id")
    // submit(
    //   { 
    //     ...formData, 
    //     product: JSON.stringify(formData.product),
    //     materialType:materialType,
    //     productType: productType,
    //     demoId: parseInt(`${demoId}`)
    //   },
    //   { method: "POST" },
    // );

  const submitData: any = { 
    ...formData, 
    product: JSON.stringify(formData.product),
    materialType: materialType,
    productType: productType
  };
  
  // Ajouter demoId seulement s'il existe et est valide
  if (demoId !== null && demoId !== undefined && demoId !== '') {
    submitData.demoId = parseInt(`${demoId}`);
  }
  
  submit(submitData, { method: "POST" });

    // onBack()
  };


  const allowDemoData = (statut: boolean) => {
    setValidDemoData(statut);
    if(statut == true){
      setShowDemoData(true)
    }
    console.log(statut, "demo data");
  };
  // modal de selection de demo data associé
  const [showDemoData, setShowDemoData] = useState(false);
  const DemoList = ({ handleOnBack, handleDemoId }: { handleOnBack: any, handleDemoId:any }) => {
    const [selectData, setSelectData] = useState("");
    const  [searchTag,  setSearchTag] = useState("");
   
    const navigation = useNavigation();
    // Pour l'instant, on utilise un plan par défaut car nous ne sommes pas dans un contexte d'outlet
    const plan = "pro"; // ou récupérer depuis un contexte global si disponible
    
  
  
    let data: Array<{
      label: string;
      value: any;
      description: string;
      image: string;
      hide: boolean;
    }> = configurationDemoData.map((item, index) => {
      return {
        label: item.name,
        value: `${index}`,
        description: item.description,
        image: item.icon,
        hide: !PRICING_PLANS.STARTER_RULES.materialTypes.includes(item.data.materials[0].type) && plan == PRICING_PLANS.STARTER ? true : false,
      };
    });
  
    data = data.filter((item) => {
      return !item.hide;
    });
  
    data = data.filter((item) => {
      return item.label.toLowerCase().includes(searchTag.toLowerCase());
    });
  
  
    let isSubmitting = navigation.state == "submitting";
  
  
  
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
  
    
          <SpacingBackground width="100%" height="auto" margin="5px 0px" backgroundColor="#F8F9FB">
            <Box paddingInline="300" paddingBlock="300">
              <Grid gap={{ lg: "20px" }}>
                {data.map((demoData: any) => {
                  return (
                    <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 2, lg: 4, xl: 3 }}>
                      <AppearanceItem
                        title={demoData.label}
                        description={demoData.description}
                        imgSrc={demoData.image}
                        // active={demoData.value == `${selectData}`}
                        active={demoData.value == demoId}
                        onChange={(value: any) => {
                          setSelectData(demoData.value);
                          handleDemoId(demoData.value, demoData.label)
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
                {/* <BackBtn
                  onClick={() => {
                    handleOnBack();
                  }}
                  title="Back"
                /> */}
                {/* <BiSaveBtn isLoading={isSubmitting} title="Done" /> */}
              </InlineStack>
            </Box>
            </Form>
          </SpacingBackground>
        </SpacingBackground>
      </Page>
    );
  };

  //modal de recapitulatif
  const [showConfigRecap, setShowConfigRecap] = useState(false);


  // navigation enter les steps
  const nextStep = () => setStep((prev) => Math.min(prev + 1, 4));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 0));

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <Box>
            <div style={{paddingBottom: '25px', display: 'flex', flexDirection: 'column', gap: '5px'}}>
              <Text as="h2" variant="headingLg" fontWeight="bold">
                Choose a product category
              </Text>
              <p>Select a category to automatically load the right options (dimensions, print areas, materials, etc.)</p>
            </div>

            <Grid columns={{xs: 1, sm: 1, md: 3, lg: 3, xl: 3}}>
              <Grid.Cell>
                <div 
                  onClick={() => selectProductCategorie('signage')} 
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    cursor: 'pointer',
                    backgroundColor: '#F5F5F5',
                    color: 'black',
                    borderRadius: '20px',
                    border: '0.07em solid #BDBDBD',
                    boxShadow: productCategorie === 'signage' ? '0px 0px 4px 2px rgba(1, 100, 100, 0.8)' : '',
                    transition: 'all 50ms',
                    overflow: "hidden"
                  }}
                >
                  <div
                    style={{
                      position: "relative",
                      background: "linear-gradient(0.45turn, #DCDCDC, #ebf8e1, #ebf8e1)",
                      width: "100%",
                      height: "150px",
                    }}
                  >
                    <span 
                      style={{
                        position: "absolute",
                        top: "15px",
                        left: "15px",
                        display: "flex",
                        width: "fit",
                        background: "white", 
                        color: "#424242", 
                        fontSize: "12px", 
                        borderRadius: "20px",
                        padding: "1px 10px"
                      }}
                    >
                      Signage
                    </span>
                    
                    <span 
                      style={{
                        position: "absolute",
                        top: "25px",
                        right: "25px",
                        display: "flex",
                        width: "fit",
                        background: "white", 
                        color: "#424242", 
                        fontSize: "12px", 
                        borderRadius: "16px",
                        padding: "10px",
                        boxShadow:  '0px 1px 4px #BDBDBD',
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" data-source-pos="281:24-281:67" data-source-name="Icon">
                        <rect width="20" height="14" x="2" y="3" rx="2"></rect>
                        <line x1="8" x2="16" y1="21" y2="21"></line>
                        <line x1="12" x2="12" y1="17" y2="21"></line>
                      </svg>
                    </span>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                      padding: "6px 15px",
                    }}
                  >
                    <InlineStack gap="100" blockAlign="center">
                      <p style={{fontSize: "18px"}}>Signs</p>
                      <span 
                        style={{
                          display: productCategorie === 'signage' ? "flex" : "none",
                          width: "fit",
                          background: "rgba(1, 100, 100, 0.2)", 
                          color: "rgba(1, 100, 100, 0.8)", 
                          fontSize: "10px", 
                          borderRadius: "20px",
                          padding: "0.5px 4px"
                        }}
                      >
                        selected
                      </span>
                    </InlineStack>
                    <div style={{display: "flex", flexDirection: "column", gap: "5px"}}>
                      <p style={{color: "#424242", fontWeight: "normal"}} >This category covers various products such as: </p>
                      <div style={{display: "flex", gap: "5px"}}>
                        <span 
                          style={{                            
                            display: "flex",
                            width: "fit",
                            background: "#E0F2F1", 
                            color: "#424242", 
                            fontSize: "11.5px", 
                            borderRadius: "20px",
                            padding: "1px 8px",
                            border: "2px solid #E0E0E0"
                          }}
                        >
                          Banner
                        </span>
                        <span 
                          style={{                            
                            display: "flex",
                            width: "fit",
                            background: "#E0F2F1", 
                            color: "#424242", 
                            fontSize: "11.5px", 
                            borderRadius: "20px",
                            padding: "1px 8px",
                            border: "2px solid #E0E0E0"
                          }}
                        >
                          Sticker
                        </span>
                        <span 
                          style={{                            
                            display: "flex",
                            width: "fit",
                            background: "#E0F2F1", 
                            color: "#424242", 
                            fontSize: "11.5px", 
                            borderRadius: "20px",
                            padding: "1px 8px",
                            border: "2px solid #E0E0E0"
                          }}
                        >
                          Lightbox
                        </span>
                      </div>
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "10px 15px",
                    }}
                  >
                    <p style={{color: "gray", fontSize: "12px", fontWeight: "normal"}} >Click to choose</p>

                    <span 
                      style={{
                        display: "flex",
                        padding: "5px",
                        border: productCategorie === 'signage' ? "2px solid rgba(1, 100, 100, 0.8)" : "2px solid #DCDCDC",
                        borderRadius: "10px"
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="20" height="20">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Grid.Cell>

              <Grid.Cell>
                <div 
                  // onClick={() => selectProductCategorie('apparel')} 
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    cursor: 'pointer',
                    backgroundColor: '#F5F5F5',
                    color: 'black',
                    borderRadius: '20px',
                    border: '0.07em solid #BDBDBD',
                    boxShadow: productCategorie === 'apparel' ? '0px 0px 4px 2px rgba(1, 100, 100, 0.8)' : '',
                    transition: 'all 50ms',
                    overflow: "hidden"
                  }}
                >
                  <div
                    style={{
                      position: "relative",
                      background: "linear-gradient(0.45turn, #B2DFDB, #E0F2F1, #ebf8e1)",
                      width: "100%",
                      height: "150px",
                    }}
                  >
                    <span 
                      style={{
                        position: "absolute",
                        top: "15px",
                        left: "15px",
                        display: "flex",
                        width: "fit",
                        background: "white", 
                        color: "#424242", 
                        fontSize: "12px", 
                        borderRadius: "20px",
                        padding: "1px 10px"
                      }}
                    >
                      Apparel
                    </span>
                    
                    <span 
                      style={{
                        position: "absolute",
                        top: "25px",
                        right: "25px",
                        display: "flex",
                        width: "fit",
                        background: "white", 
                        color: "#424242", 
                        fontSize: "12px", 
                        borderRadius: "16px",
                        padding: "10px",
                        boxShadow:  '0px 1px 4px #BDBDBD',
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" data-source-pos="281:24-281:67" data-source-name="Icon">
                        <path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"></path>
                      </svg>
                    </span>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                      padding: "6px 15px",
                    }}
                  >
                    <InlineStack gap="100" blockAlign="center">
                      <p style={{fontSize: "18px"}}>Textile</p>
                      <span 
                        style={{
                          display: productCategorie === 'apparel' ? "flex" : "none",
                          width: "fit",
                          background: "rgba(1, 100, 100, 0.2)", 
                          color: "rgba(1, 100, 100, 0.8)", 
                          fontSize: "10px", 
                          borderRadius: "20px",
                          padding: "0.5px 4px"
                        }}
                      >
                        selected
                      </span>
                      <Badge tone="info">Coming soon</Badge>
                    </InlineStack>
                    <div style={{display: "flex", flexDirection: "column", gap: "5px"}}>
                      <p style={{color: "#424242", fontWeight: "normal"}} >This category covers various products such as: </p>
                      <div style={{display: "flex", gap: "5px"}}>
                        <span 
                          style={{                            
                            display: "flex",
                            width: "fit",
                            background: "#E0F2F1", 
                            color: "#424242", 
                            fontSize: "11.5px", 
                            borderRadius: "20px",
                            padding: "1px 8px",
                            border: "2px solid #E0E0E0"
                          }}
                        >
                          T-shirt
                        </span>
                        <span 
                          style={{                            
                            display: "flex",
                            width: "fit",
                            background: "#E0F2F1", 
                            color: "#424242", 
                            fontSize: "11.5px", 
                            borderRadius: "20px",
                            padding: "1px 8px",
                            border: "2px solid #E0E0E0"
                          }}
                        >
                          Cap
                        </span>
                        <span 
                          style={{                            
                            display: "flex",
                            width: "fit",
                            background: "#E0F2F1", 
                            color: "#424242", 
                            fontSize: "11.5px", 
                            borderRadius: "20px",
                            padding: "1px 8px",
                            border: "2px solid #E0E0E0"
                          }}
                        >
                          Hoodie
                        </span>
                      </div>
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "10px 15px",
                    }}
                  >
                    <p style={{color: "gray", fontSize: "12px", fontWeight: "normal"}} >Click to choose</p>

                    <span 
                      style={{
                        display: "flex",
                        padding: "5px",
                        border: productCategorie === 'apparel' ? "2px solid rgba(1, 100, 100, 0.8)" : "2px solid #DCDCDC",
                        borderRadius: "10px"
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="20" height="20">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Grid.Cell>

              <Grid.Cell> 
                <div 
                  // onClick={() => selectProductCategorie('object')} 
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    cursor: 'pointer',
                    backgroundColor: '#F5F5F5',
                    color: 'black',
                    borderRadius: '20px',
                    border: '0.07em solid #BDBDBD',
                    boxShadow: productCategorie === 'object' ? '0px 0px 4px 2px rgba(1, 100, 100, 0.8)' : '',
                    transition: 'all 50ms',
                    overflow: "hidden"
                  }}
                >
                  <div
                    style={{
                      position: "relative",
                      background: "linear-gradient(0.45turn, #F8BBD0, #FCE4EC, #ebf8e1)",
                      width: "100%",
                      height: "150px",
                    }}
                  >
                    <span 
                      style={{
                        position: "absolute",
                        top: "15px",
                        left: "15px",
                        display: "flex",
                        width: "fit",
                        background: "white", 
                        color: "#424242", 
                        fontSize: "12px", 
                        borderRadius: "20px",
                        padding: "1px 10px"
                      }}
                    >
                      Objects
                    </span>
                    
                    <span 
                      style={{
                        position: "absolute",
                        top: "25px",
                        right: "25px",
                        display: "flex",
                        width: "fit",
                        background: "white", 
                        color: "#424242", 
                        fontSize: "12px", 
                        borderRadius: "16px",
                        padding: "10px",
                        boxShadow:  '0px 1px 4px #BDBDBD',
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" data-source-pos="281:24-281:67" data-source-name="Icon">
                        <path d="m6 8 1.75 12.28a2 2 0 0 0 2 1.72h4.54a2 2 0 0 0 2-1.72L18 8"></path>
                        <path d="M5 8h14"></path>
                        <path d="M7 15a6.47 6.47 0 0 1 5 0 6.47 6.47 0 0 0 5 0"></path>
                        <path d="m12 8 1-6h2"></path>
                      </svg>
                    </span>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                      padding: "6px 15px",
                    }}
                  >
                    <InlineStack gap="100" blockAlign="center">
                      <p style={{fontSize: "18px"}}>Goodies</p>
                      <span 
                        style={{
                          display: productCategorie === 'object' ? "flex" : "none",
                          width: "fit",
                          background: "rgba(1, 100, 100, 0.2)", 
                          color: "rgba(1, 100, 100, 0.8)", 
                          fontSize: "10px", 
                          borderRadius: "20px",
                          padding: "0.5px 4px"
                        }}
                      >
                        selected
                      </span>
                      <Badge tone="info">Coming soon</Badge>
                    </InlineStack>
                    <div style={{display: "flex", flexDirection: "column", gap: "5px"}}>
                      <p style={{color: "#424242", fontWeight: "normal"}} >This category covers various products such as: </p>
                      <div style={{display: "flex", gap: "5px"}}>
                        <span 
                          style={{                            
                            display: "flex",
                            width: "fit",
                            background: "#E0F2F1", 
                            color: "#424242", 
                            fontSize: "11.5px", 
                            borderRadius: "20px",
                            padding: "1px 8px",
                            border: "2px solid #E0E0E0"
                          }}
                        >
                          Mug
                        </span>
                        <span 
                          style={{                            
                            display: "flex",
                            width: "fit",
                            background: "#E0F2F1", 
                            color: "#424242", 
                            fontSize: "11.5px", 
                            borderRadius: "20px",
                            padding: "1px 8px",
                            border: "2px solid #E0E0E0"
                          }}
                        >
                          Card
                        </span>
                        <span 
                          style={{                            
                            display: "flex",
                            width: "fit",
                            background: "#E0F2F1", 
                            color: "#424242", 
                            fontSize: "11.5px", 
                            borderRadius: "20px",
                            padding: "1px 8px",
                            border: "2px solid #E0E0E0"
                          }}
                        >
                          Tote bag
                        </span>
                      </div>
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "10px 15px",
                    }}
                  >
                    <p style={{color: "gray", fontSize: "12px", fontWeight: "normal"}} >Click to choose</p>

                    <span 
                      style={{
                        display: "flex",
                        padding: "5px",
                        border: productCategorie === 'object' ? "2px solid rgba(1, 100, 100, 0.8)" : "2px solid #DCDCDC",
                        borderRadius: "10px"
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="20" height="20">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Grid.Cell>
            </Grid>

          </Box>
        );
      case 1:
        return (
          <Box>
            <div style={{paddingBottom: '25px', display: 'flex', flexDirection: 'column', gap: '5px'}}>
              <Text as="h2" variant="headingLg" fontWeight="bold">
                Select product type
              </Text>
              <p>Now pick a subtype that best matches your product within <span style={{fontWeight: "600"}}>{productCategorie != 'signage' ? (productCategorie != 'apparel' ? "Goodies" : "Textile") : "Signs"}</span> </p>
            </div>

            <Grid columns={{xs: 1, sm: 2, md: 2, lg: 3, xl: 3}}>
              <Grid.Cell>
                <div 
                  onClick={() => selectProductType('signboard')} 
                  style={{
                    cursor: 'pointer',
                    // backgroundColor:  '#f1f1f1',
                    backgroundColor:  '#F5F5F5',
                    color: 'black',
                    borderRadius: '16px',
                    border: '0.07em solid #BDBDBD',
                    boxShadow: productType === 'signboard' ? '0px 0px 4px 2px rgba(1, 100, 100, 0.8)' : '',
                    padding: '16px',
                    transition: 'all 50ms',
                    height: '110px',
                    overflow: 'hidden'
                  }}
                >
                  <div style={{display: 'flex', gap: '10px', alignItems: '', height: '100%'}}>                    
                    <div style={{display: 'flex', flexDirection: 'column', gap: '8px', width: '100%'}}>
                      <div style={{padding: '0px'}}>
                        <BlockStack gap="100">
                          <p style={{fontSize: "16px", fontWeight: "600"}}>Signboard</p>
                          <p style={{fontSize: "14px", fontWeight: "400", color: "#616161", textOverflow: 'ellipsis'}}>Rigid panel / PVC/ Aluminum/ Plexiglass/ Wood/ Painted or stainless metal <Link monochrome url="https://demos.signsdesigner.us/aso-templates-page/asowp-templates/196/#/" target="_blank">See more</Link> </p>                        
                        </BlockStack>
                      </div>
                      {/* <div onClick={(e) => { e.stopPropagation() }}>
                        <Button>View demos</Button>
                      </div> */}
                    </div>

                    <span 
                      style={{
                        width: "fit-content",
                        height: "fit-content",
                        display: "flex",
                        padding: "5px",
                        border: productType === 'signboard' ? "2px solid rgba(1, 100, 100, 0.6)" : "2px solid #DCDCDC",
                        borderRadius: "10px"
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="20" height="20">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Grid.Cell>

              <Grid.Cell>
                <div 
                  onClick={() => selectProductType('banner')} 
                  style={{
                    cursor: 'pointer',
                    // backgroundColor:  '#f1f1f1',
                    backgroundColor:  '#F5F5F5',
                    color: 'black',
                    borderRadius: '16px',
                    border: '0.07em solid #BDBDBD',
                    boxShadow: productType === 'banner' ? '0px 0px 4px 2px rgba(1, 100, 100, 0.8)' : '',
                    padding: '16px',
                    transition: 'all 50ms',
                    height: '110px',
                    overflow: 'hidden'
                  }}
                >
                  <div style={{display: 'flex', gap: '10px', alignItems: '', height: '100%'}}>                    
                    <div style={{display: 'flex', flexDirection: 'column', gap: '8px', width: '100%'}}>
                      <div style={{padding: '0px'}}>
                        <BlockStack gap="100">
                          <p style={{fontSize: "16px", fontWeight: "600"}}>Banners</p>
                          <p style={{fontSize: "14px", fontWeight: "400", color: "#616161", textOverflow: 'ellipsis'}}>PVC/ Mesh/ Double‑sided/ fabric, etc.. <Link monochrome url="https://demos.signsdesigner.us/aso-templates-page/asowp-templates/222/#/" target="_blank">See more</Link></p>
                        </BlockStack>
                      </div>                      
                    </div>

                    <span 
                      style={{
                        width: "fit-content",
                        height: "fit-content",
                        display: "flex",
                        padding: "5px",
                        border: productType === 'banner' ? "2px solid rgba(1, 100, 100, 0.6)" : "2px solid #DCDCDC",
                        borderRadius: "10px"
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="20" height="20">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Grid.Cell>

              <Grid.Cell>
                <div 
                  onClick={() => selectProductType('sticker')} 
                  style={{
                    cursor: 'pointer',
                    backgroundColor:  '#F5F5F5',
                    color: 'black',
                    borderRadius: '16px',
                    border: '0.07em solid #BDBDBD',
                    boxShadow: productType === 'sticker' ? '0px 0px 4px 2px rgba(1, 100, 100, 0.8)' : '',
                    padding: '16px',
                    transition: 'all 50ms',
                    height: '110px',
                    overflow: 'hidden'
                  }}
                >
                  <div style={{display: 'flex', gap: '10px', alignItems: '', height: '100%'}}>                    
                    <div style={{display: 'flex', flexDirection: 'column', gap: '8px', width: '100%'}}>
                      <div style={{padding: '0px'}}>
                        <BlockStack gap="100">
                          <p style={{fontSize: "16px", fontWeight: "600"}}>Sticker</p>
                          <p style={{fontSize: "14px", fontWeight: "400", color: "#616161", textOverflow: 'ellipsis'}}>Vinyl/ die-cut/ Self‑adhesive paper/ matte/ glossy/ UV‑resistant, etc.. <Link monochrome url="https://demos.signsdesigner.us/aso-templates-page/asowp-templates/885/#/" target="_blank">See more</Link></p>
                        </BlockStack>
                      </div>
                      {/* <div onClick={(e) => { e.stopPropagation() }}>
                        <Button>View demos</Button>
                      </div> */}
                    </div>

                    <span 
                      style={{
                        width: "fit-content",
                        height: "fit-content",
                        display: "flex",
                        padding: "5px",
                        border: productType === 'sticker' ? "2px solid rgba(1, 100, 100, 0.6)" : "2px solid #DCDCDC",
                        borderRadius: "10px"
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="20" height="20">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Grid.Cell>

              <Grid.Cell>
                <div 
                  // onClick={() => selectProductType('other')} 
                  style={{
                    cursor: 'pointer',
                    backgroundColor:  '#F5F5F5',
                    color: 'black',
                    borderRadius: '16px',
                    border: '0.07em solid #BDBDBD',
                    boxShadow: productType === 'other' ? '0px 0px 4px 2px rgba(1, 100, 100, 0.8)' : '',
                    padding: '16px',
                    transition: 'all 50ms',
                  }}
                >
                  <div style={{display: 'flex', gap: '10px', alignItems: '', height: '100%'}}>                    
                    <div style={{display: 'flex', flexDirection: 'column', gap: '8px', width: '100%'}}>
                      <div style={{padding: '0px'}}>
                        <BlockStack gap="100">
                          <p style={{fontSize: "16px", fontWeight: "600"}}>Lettering Signs</p>
                          <p style={{fontSize: "14px", fontWeight: "400", color: "#616161"}}>Neon and channel <Badge tone="info">Coming soon</Badge></p>
                        </BlockStack>
                      </div>
                      {/* <div onClick={(e) => { e.stopPropagation() }}>
                        <Button>View demos</Button>
                      </div> */}
                    </div>

                    <span 
                      style={{
                        width: "fit-content",
                        height: "fit-content",
                        display: "flex",
                        padding: "5px",
                        border: productType === 'other' ? "2px solid rgba(1, 100, 100, 0.6)" : "2px solid #DCDCDC",
                        borderRadius: "10px"
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="20" height="20">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Grid.Cell>

              <Grid.Cell>
                <div 
                  // onClick={() => selectProductType('lightbox')} 
                  style={{
                    cursor: 'pointer',
                    backgroundColor:  '#F5F5F5',
                    color: 'black',
                    borderRadius: '16px',
                    border: '0.07em solid #BDBDBD',
                    boxShadow: productType === 'lightbox' ? '0px 0px 4px 2px rgba(1, 100, 100, 0.8)' : '',
                    padding: '16px',
                    transition: 'all 50ms',
                  }}
                >
                  <div style={{display: 'flex', gap: '10px', alignItems: '', height: '100%'}}>                    
                    <div style={{display: 'flex', flexDirection: 'column', gap: '8px', width: '100%'}}>
                      <div style={{padding: '0px'}}>
                        <BlockStack gap="100">
                          <p style={{fontSize: "16px", fontWeight: "600"}}>lightbox</p>
                          <p style={{fontSize: "14px", fontWeight: "400", color: "#616161"}}>Backlit <Badge tone="info">Coming soon</Badge></p>
                        </BlockStack>
                      </div>
                      {/* <div onClick={(e) => { e.stopPropagation() }}>
                        <Button>View demos</Button>
                      </div> */}
                    </div>

                    <span 
                      style={{
                        width: "fit-content",
                        height: "fit-content",
                        display: "flex",
                        padding: "5px",
                        border: productType === 'lightbox' ? "2px solid rgba(1, 100, 100, 0.6)" : "2px solid #DCDCDC",
                        borderRadius: "10px"
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="20" height="20">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Grid.Cell>
            </Grid>

          </Box>
        );
      case 2:
        return (
          <Box>
            <div style={{paddingBottom: '25px', display: 'flex', flexDirection: 'column', gap: '5px'}}>
              <Text as="h2" variant="headingLg" fontWeight="bold">
                Select material type
              </Text>
            </div>

            <Grid columns={{xs: 2, sm: 2, md: 2, lg: 3, xl: 3}}>
              <Grid.Cell>
                <div 
                  onClick={() => selectMaterialType('simple')} 
                  style={{
                    cursor: 'pointer',
                    // backgroundColor:  '#f1f1f1',
                    backgroundColor:  '#F5F5F5',
                    color: 'black',
                    borderRadius: '16px',
                    border: '0.07em solid #BDBDBD',
                    boxShadow: materialType === 'simple' ? '0px 0px 4px 2px rgba(1, 100, 100, 0.8)' : '',
                    padding: '16px',
                    transition: 'all 50ms',
                  }}
                >
                  <div style={{display: 'flex', gap: '10px', alignItems: '', height: '100%'}}>                    
                    <div style={{display: 'flex', flexDirection: 'column', gap: '8px', width: '100%'}}>
                      <div style={{padding: '0px'}}>
                        <BlockStack gap="100">
                          <p style={{fontSize: "16px", fontWeight: "600"}}>Simple</p>
                          <p style={{fontSize: "14px", fontWeight: "400", color: "#616161"}}>All material options are customizable for the customer</p>
                        </BlockStack>
                      </div>
                    </div>

                    <span 
                      style={{
                        width: "fit-content",
                        height: "fit-content",
                        display: "flex",
                        padding: "5px",
                        border: materialType === 'simple' ? "2px solid rgba(1, 100, 100, 0.6)" : "2px solid #DCDCDC",
                        borderRadius: "10px"
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="20" height="20">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Grid.Cell>

              <Grid.Cell>
                <div 
                  onClick={() => selectMaterialType('advance')} 
                  style={{
                    cursor: 'pointer',
                    // backgroundColor:  '#f1f1f1',
                    backgroundColor:  '#F5F5F5',
                    color: 'black',
                    borderRadius: '16px',
                    border: '0.07em solid #BDBDBD',
                    boxShadow: materialType === 'advance' ? '0px 0px 4px 2px rgba(1, 100, 100, 0.8)' : '',
                    padding: '16px',
                    transition: 'all 50ms',
                  }}
                >
                  <div style={{display: 'flex', gap: '10px', alignItems: '', height: '100%'}}>                    
                    <div style={{display: 'flex', flexDirection: 'column', gap: '8px', width: '100%'}}>
                      <div style={{padding: '0px'}}>
                        <BlockStack gap="100">
                          <p style={{fontSize: "16px", fontWeight: "600"}}>Advance</p>
                          <p style={{fontSize: "14px", fontWeight: "400", color: "#616161"}}>Size, shape and background color have default preconfigured values </p>
                        </BlockStack>
                      </div>
                    </div>

                    <span 
                      style={{
                        width: "fit-content",
                        height: "fit-content",
                        display: "flex",
                        padding: "5px",
                        border: materialType === 'advance' ? "2px solid rgba(1, 100, 100, 0.6)" : "2px solid #DCDCDC",
                        borderRadius: "10px"
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="20" height="20">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Grid.Cell>

              <Grid.Cell>
                <div 
                  // onClick={() => selectMaterialType('layer')} 
                  style={{
                    cursor: 'pointer',
                    // backgroundColor:  '#f1f1f1',
                    backgroundColor:  '#F5F5F5',
                    color: 'black',
                    borderRadius: '16px',
                    border: '0.07em solid #BDBDBD',
                    boxShadow: materialType === 'layer' ? '0px 0px 4px 2px rgba(1, 100, 100, 0.8)' : '',
                    padding: '16px',
                    transition: 'all 50ms',
                  }}
                >
                  <div style={{display: 'flex', gap: '10px', alignItems: '', height: '100%'}}>                    
                    <div style={{display: 'flex', flexDirection: 'column', gap: '8px', width: '100%'}}>
                      <div style={{padding: '0px'}}>
                        <BlockStack gap="100">
                          <p style={{fontSize: "16px", fontWeight: "600"}}>Layers</p>
                          <p style={{fontSize: "14px", fontWeight: "400", color: "#616161"}}>stack multiple layers that can be configured independently <Badge tone="info">Coming soon</Badge></p>
                        </BlockStack>
                      </div>
                    </div>

                    <span 
                      style={{
                        width: "fit-content",
                        height: "fit-content",
                        display: "flex",
                        padding: "5px",
                        border: materialType === 'layer' ? "2px solid rgba(1, 100, 100, 0.6)" : "2px solid #DCDCDC",
                        borderRadius: "10px"
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="20" height="20">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Grid.Cell>
            </Grid>

          </Box>
        );
      case 3:
        return (
          <Box>
            <div style={{paddingBottom: '25px', display: 'flex', flexDirection: 'column', gap: '5px'}}>
              <Text as="h2" variant="headingLg" fontWeight="bold">
                Include demo data
              </Text>
              <p>Decide whether to preload demo content. If enabled, choose a starting template for faster setup.</p>
            </div>

            <div 
              style={{
                cursor: 'pointer',
                // backgroundColor:  '#f1f1f1',
                backgroundColor:  '#F5F5F5',
                color: 'black',
                borderRadius: '16px',
                border: '0.07em solid #BDBDBD',
                padding: '20px',
                transition: 'all 50ms',
              }}
            >
              <div style={{display: 'flex', gap: '10px', alignItems: 'center', height: '100%'}}>                    
                <div style={{display: 'flex', flexDirection: 'column', gap: '8px', width: '100%'}}>
                  <div style={{padding: '0px'}}>
                    <BlockStack gap="100">
                      <p style={{fontSize: "16px", fontWeight: "600"}}>Include demo data?</p>
                      <p style={{fontSize: "14px", fontWeight: "400", color: "#616161"}}>Preload a template to start faster. You can still customize everything later.</p>
                    </BlockStack>
                  </div>
                </div>

                <div 
                  style={{
                    display: "flex",
                    gap: "10px"
                  }}
                >
                  <span 
                    onClick={() => {allowDemoData(false), setDemoId(null)}} 
                    style={{
                      width: "fit-content",
                      height: "fit-content",
                      display: "flex",
                      color: !validDemoData ? "rgba(1, 100, 100, 0.7)" : "#757575",
                      fontSize: "15px",
                      padding: "7px 10px",
                      border: !validDemoData ? "2px solid rgba(1, 100, 100, 0.6)" : "2px solid #757575",
                      borderRadius: "10px",
                      boxShadow: !validDemoData ? '0px 0px 4px 2px rgba(1, 100, 100, 0.8)' : '',
                    }}
                  >
                    No
                  </span>
                  <span 
                    onClick={() => allowDemoData(true)} 
                    style={{
                      width: "fit-content",
                      height: "fit-content",
                      display: "flex",
                      color: (validDemoData && demoName != "") ? "rgba(1, 100, 100, 0.7)" : "#757575",
                      fontSize: "15px",
                      padding: "7px 10px",
                      border: (validDemoData && demoName != "") ? "2px solid rgba(1, 100, 100, 0.6)" : "2px solid #757575",
                      borderRadius: "10px",
                      boxShadow: (validDemoData && demoName != "") ? '0px 0px 4px 2px rgba(1, 100, 100, 0.8)' : '',
                    }}
                  >
                    Yes
                  </span>
                </div>
              </div>
            </div>

            { (validDemoData && demoName != "") && <div style={{paddingTop: '15px'}}>
              <p>Demo dat selected: <span style={{fontSize: "14px", fontWeight: "600"}}> {demoName} </span></p>
            </div>}

            <Modal
              size="large"
              open={showDemoData}
              onClose={() => setShowDemoData(false)}
              title="Select a demo"
              primaryAction={{
                content: 'Done',
                onAction: () => setShowDemoData(false),
              }}
            >
              <Modal.Section>
                {/* <Text as="p">demos datas list</Text> */}
                <DemoList handleOnBack={() => setShowDemoData(false)} handleDemoId={(demoId:string, demoName: string)=> {
                    setDemoId(demoId);
                    setDemoName(demoName)                  
                  }} />
              </Modal.Section>
            </Modal>
          </Box>
        );
      case 4:
        return (
          <div style={{display: "flex", gap: "10px"}}>
            <div style={{width: "70%", display: "flex", flexDirection: "column", gap: "12px"}}>
              <div style={{display: "flex", flexDirection: "column", gap: "8px", padding: '16px', backgroundColor:  '#F5F5F5', border: '1px solid #E0E0E0', borderRadius: '14px',}}>
                <TextField
                  label="Name configuration"
                  value={formData.name}
                  onChange={handleName}
                  autoComplete="on"
                  error={
                    formData.name === "" ? "configuration name required" : ""
                  }
                />
              </div>

              <div style={{display: "flex", flexDirection: "column", gap: "8px", padding: '16px', backgroundColor:  '#F5F5F5', border: '1px solid #E0E0E0', borderRadius: '14px',}}>
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
              </div>

              <div style={{display: "flex", flexDirection: "column", gap: "8px", padding: '16px', backgroundColor:  '#F5F5F5', border: '1px solid #E0E0E0', borderRadius: '14px',}}>
                <FileInput
                    error={
                      actionData?.errors?.icon ? actionData.errors.icon[0] : ""
                    }
                    title="Upload image"
                    path={formData.icon}
                    handlePath={handleIcon}
                  />
              </div>

              <div style={{display: "flex", flexDirection: "column", gap: "8px", padding: '16px', backgroundColor:  '#F5F5F5', border: '1px solid #E0E0E0', borderRadius: '14px',}}>
              <MultiProductSelectField
                    label="Products associated with configuration"
                    buttonTitle="select"
                    selectedProducts={formData.products || []}
                    onSelectProducts={(value: any) => {
                      console.log("Client - Products selected:", value);
                      handleProducts(value);
                    }}
                    productTitles={(formData.products || []).map(p => p.title)}
                  />
              </div>
            </div>

            <div style={{width: "30%", display: configuration ? "none" : "flex"}}>
              <div style={{display: "flex", flexDirection: "column", width: "100%", gap: "8px", padding: '16px', backgroundColor:  '#F5F5F5', border: '1px solid #E0E0E0', borderRadius: '14px',}}>
                <p style={{fontWeight: "700", paddingBottom: "10px"}}>Summary</p>

                <p style={{color: "#757575"}}>Category: <span style={{color: "#424242", fontWeight: "600"}}> {productCategorie != 'signage' ? (productCategorie != 'apparel' ? "Goodies" : "Textile") : "Signs"} </span></p>
                <p style={{color: "#757575"}}>Product type: <span style={{color: "#424242", fontWeight: "600"}}> {productType} </span></p>
                <p style={{color: "#757575"}}>Material type: <span style={{color: "#424242", fontWeight: "600"}}> {materialType} </span></p>
                <p style={{color: "#757575"}}>Demo data: <span style={{color: "#424242", fontWeight: "600"}}> {validDemoData ? 'Yes' : 'No'} {validDemoData && demoName != "" ? `(${demoName})` : ''} </span></p>

                <p style={{color: "#757575"}}>Name: <span style={{color: "#424242", fontWeight: "600"}}> {formData.name} </span></p>
                {formData.description != "" &&
                  <p style={{color: "#757575"}}>Description: <span style={{color: "#424242", fontWeight: "600"}}> {formData.description} </span></p>
                }
                {formData.products && formData.products.length > 0 && 
                  <p style={{color: "#757575"}}>Associated products: <span style={{color: "#424242", fontWeight: "600"}}> {formData.products.map((p: any) => p.title).join(", ")} </span></p>
                }
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };



  return (
    <Page fullWidth>
      <div style={{padding: '10px', background: 'white', border: '1px solid #E0E0E0', borderRadius: '14px',}}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          background: 'white',
          padding: '4px 10px',
          gap: '5px',
        }}>
            <InlineStack gap="100" align="space-between" blockAlign='center'>
              <Text as="h2" variant="headingLg" fontWeight="bold">
                {" "}
                {configuration
                  ? "Update configuration"
                  : "Create new configuration"}
              </Text>
            </InlineStack>
            
            {!configuration && 
              <div>
                <InlineStack>
                  <p >Step {step + 1} of 5</p>
                </InlineStack>

                <div style={{
                  display: 'flex',
                  gap: '2px',
                  width: '20%'
                }}>
                  <span style={{
                    display: 'flex',
                    backgroundColor: step >= 0 ? 'rgba(1, 100, 100, 0.8)' : '#f1f1f1',
                    width: '25%',
                    padding: '2px',
                    border: '1px solid rgba(1, 100, 100, 0.8)',
                    borderRadius: '8px',
                  }}></span>

                  <span style={{
                    display: 'flex',
                    backgroundColor: step >= 1 ? 'rgba(1, 100, 100, 0.8)' : '#f1f1f1',
                    width: '25%',
                    padding: '2px',
                    border: '1px solid rgba(1, 100, 100, 0.8)',
                    borderRadius: '8px',
                  }}></span>

                  <span style={{
                    display: 'flex',
                    backgroundColor: step >= 2 ? 'rgba(1, 100, 100, 0.8)' : '#f1f1f1',
                    width: '25%',
                    padding: '2px',
                    border: '1px solid rgba(1, 100, 100, 0.8)',
                    borderRadius: '8px',
                  }}></span>

                  <span style={{
                    display: 'flex',
                    backgroundColor: step >= 3 ? 'rgba(1, 100, 100, 0.8)' : '#f1f1f1',
                    width: '25%',
                    padding: '2px',
                    border: '1px solid rgba(1, 100, 100, 0.8)',
                    borderRadius: '8px',
                  }}></span>

                  <span style={{
                    display: 'flex',
                    backgroundColor: step >= 4 ? 'rgba(1, 100, 100, 0.8)' : '#f1f1f1',
                    width: '25%',
                    padding: '2px',
                    border: '1px solid rgba(1, 100, 100, 0.8)',
                    borderRadius: '8px',
                  }}></span>

                </div>
              </div>
            }
        </div>
      </div>

      <SpacingBackground  margin="10px 0px">
        <Card >
          <Box padding='100'>
            {renderStep()}
          </Box>

          <div style={{width: '100%', display: 'flex',justifyContent: 'space-between', padding: '25px 5px 0px 5px', gap: '10px'}}>
            <div style={{color: ' rgb(97, 97, 97)'}}>
              {step == 0 && (
                <p> Tip: you will refine the type and the personalization level in the next steps. </p>
              )}

              {step == 1 && (
                <p> Tip: after choosing a subtype, you'll proceed to Level 3 (Simple / Advanced / Layers). </p>
              )}

              {step == 2 && (
                <p> Tip: select a level and you can move on to Demo Data / Templates next. </p>
              )}

              {step == 3 && (
                <p> Tip: selecting a template speeds up onboarding, but you can also start from scratch. </p>
              )}
            </div>
            
            <div style={{display: 'flex', gap: '10px'}}>
              {((!configuration && step == 0) || configuration) && (
                <Button onClick={onBack} size="large">
                  Back
                </Button>
              )}
              {(!configuration && step > 0) && (
                <Button onClick={prevStep} size="large">
                  Back
                </Button>
              )}
              
              {step < 4 ? (
                <button 
                  onClick={nextStep} 
                  style={{
                    backgroundColor: 'rgba(1, 100, 100, 0.9)',
                    color: 'white',
                    borderRadius: '8px',
                    padding: '7px 10px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    border: '1px',
                    // boxShadow: ' 0rem -0.0625rem 0rem 0rem #b5b5b5 inset, 0rem 0rem 0rem 0.0625rem rgba(0, 0, 0, 0.1) inset, 0rem 0.03125rem 0rem 0.09375rem #FFF inset'
                  }}
                >
                  Next
                </button>
              ) : (
                <button
                  disabled={isLoading || formData.name == ''}
                  type="submit"
                  style={{
                    backgroundColor: 'rgba(1, 100, 100, 0.9)',
                    color: 'white',
                    borderRadius: '8px',
                    padding: '7px 10px',
                    fontWeight: '600',
                    cursor: formData.name != ''  ? 'pointer' : 'not-allowed',
                    border: '1px',
                    boxShadow: ' 0rem -0.0625rem 0rem 0rem #b5b5b5 inset, 0rem 0rem 0rem 0.0625rem rgba(0, 0, 0, 0.1) inset, 0rem 0.03125rem 0rem 0.09375rem #FFF inset'
                  }}
                  onClick={()=> handleSubmit()}
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
                        {configuration ? "Save" : "Finish"} 
                      </span>
                    </InlineStack>
                  </Box>
                </button>
              )}
            </div>
          </div>
        </Card>
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
  productType: z.string().nullish().transform(stringTransform),
  materialType: z.string().nullish().transform(stringTransform),
  demoId: z.number().nullish().nullable(),
  product: z.any().transform(jsonTransform),
  products: z.any().transform(jsonTransform),

});

export const action = async ({ request }: ActionFunctionArgs) => {
  const { billing, session, admin } = await authenticate.admin(request);
  const plan =  await  getPlan(billing,session?.shop, admin);

  const formData = await request.formData();
  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  const submission = parseWithZod(formData, { schema: formSchema });
  let demoId = null;

  if (submission.status !== "success") {
    return json({ status: false, message: null, errors: submission.error });
  }

  let configuration: any = submission.value as ConfigurationType;
  if (configuration.demoId !== null && configuration.demoId !== undefined && !isNaN(configuration.demoId)) {
    demoId = configuration.demoId;
  }
  delete configuration.demoId

  if (id) {
    configuration.id = parseInt(id);
    const oldConfiguration = await ConfigurationService.getConfiguration(
      configuration.id,
      session.id,
    );
    const oldConfigurationProductID = oldConfiguration.product
      ? oldConfiguration.product.id
      : undefined;

    const configurationObject = await ConfigurationService.updateConfiguration(
      configuration,
      session.id,
    );
    if (
      configurationObject &&
      configurationObject.product?.id &&
      oldConfigurationProductID != configurationObject.product?.id
    ) {
      const metafieldId = await ShopifyProductService.getMetafieldID(
        admin,
        configuration?.product?.id,
      );
      await ShopifyProductService.update(
        admin,
        configurationObject.product.id,
        configurationObject.id,
        metafieldId,
      );

      if (oldConfigurationProductID) {
        const oldMetafieldId = await ShopifyProductService.getMetafieldID(
          admin,
          oldConfigurationProductID,
        );
        await ShopifyProductService.update(
          admin,
          oldConfigurationProductID,
          0,
          oldMetafieldId,
        );
      }
    }
    return redirect(
      `..${flashMessage("Configuration updated successfully")}`,
    );
  } else {
    const configurationObject = await ConfigurationService.addConfiguration(
      configuration,
      session.id,
    );
    console.log('demo  id selected', demoId);

    if (demoId !=undefined && demoId != null ) {
      await saveDemoData( demoId, configurationObject, session.id, plan, session.shop)
    }
    
    // Gérer les produits multiples
    if (configurationObject && configuration.products && configuration.products.length > 0) {
      console.log("Action - Creating new configuration with products:", configuration.products);
      await ShopifyProductService.updateMultipleProducts(admin, configuration.products, configurationObject.id);
    }
    
    return redirect(`/app/configuration/${configurationObject.id}/materials`)
  }
};


function replaceUploadsPath(data: object, newPath: string): object {
  // Check if newPath is a string
  if (typeof newPath !== "string") {
    throw new Error("newPath must be a string");
  }

  function replaceInObject(obj: any) {
    for (const key in obj) {
      if (typeof obj[key] === "string") {
        obj[key] = obj[key].replace(/^.*?\/aso_default_files\//, newPath);
      } else if (typeof obj[key] === "object") {
        replaceInObject(obj[key]);
      }
    }
  }

  replaceInObject(data);
  return data;
}


 const saveDemoData = async (demoId:number, configuration:ConfigurationType, sessionId:string, plan:any, shop:string ) => {
    if (!configuration ) {
      return  false;
    }
    
    const fontIds = [];
    const allFonts = await FontService.getFonts(sessionId);

    if(!allFonts || allFonts.length <3) {
      for (let currentfont  of fontData) {
        let fontWith:any = replaceUploadsPath(currentfont, `https://${shop}/apps/aso-proxy/aso_default_files/`);
        let newfont = await FontService.addFont({
          url: fontWith.url,
          label: currentfont.label,
          isGoogleFont: currentfont.isGoogleFont
        }, sessionId);
        fontIds.push(newfont.id);
      };
      if (configurationDemoData[demoId]?.data?.settings?.customizerSign?.text) {
        configurationDemoData[demoId].data.settings.customizerSign.text.selectedFonts = fontIds;
      }
    } else {
      configurationDemoData[demoId].data.settings.customizerSign.text.selectedFonts = allFonts.slice(0,10).map(font => font.id);
    }

    
    let configData = configurationDemoData[demoId].data;
    
    if(plan == PRICING_PLANS.STARTER) {
      configData = configFilter(configurationDemoData[demoId])?.data;
    }

    configuration.data = replaceUploadsPath(
      configData,
      `https://${shop}/apps/aso-proxy/aso_default_files/`
    );


    return  await ConfigurationService.updateConfiguration(configuration, sessionId);
};
