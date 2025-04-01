import {
  Badge,
  Banner,
  BlockStack,
  Box,
  Button,
  Divider,
  ExceptionList,
  Grid,
  InlineStack,
  List,
  Text,
  TextField,
} from "@shopify/polaris";
import {  useEffect, useState } from "react";
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
import { ReactSwitchCustom } from "~/components/inputs/ReactSwitchCustom";
import { ComboxSelect } from "~/components/inputs/ComboxSelect";
import { booleanTransform, stringTransform } from "~/utils/transfomerZod";
import { EditCategoryModal } from "./app.templates.categories._index";
import { BiSaveConfirmBtn } from "~/components/buttons/BiSaveConfirmBtn";
import {
  AlertCircleIcon
} from '@shopify/polaris-icons';


export const loader = async ({request, params }:LoaderFunctionArgs) => {
  const { session, admin } = await authenticate.admin(request);
  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  let template = null;
  let categories =  await  CategoryService.getCategorys(session.id);
  let configurations = await  ConfigurationService.getConfigurations(session.id);
  
  if (id) {
    template = await TemplateService.getTemplate(parseInt(id),session.id)
  }
  
  return json({template, categories, configurations})
}

export default function TemplateEditComponent() {
  const submit = useSubmit();
  const navigation = useNavigation()
  const actionData = useActionData<typeof action>();
  let [enableCategoryEdit, setEnableCategoryEdit]= useState<any>(false);
  useHandleFlashMessage();
  console.log('action data :', actionData);
  let {template, categories, configurations} = useLoaderData<typeof loader>()
  let [categoriesData, setCategoriesData] = useState<any>(categories||[])
  const [formData, setFormData] = useState<TemplateType>(template? (template as TemplateType) : {
      name:"", 
      enabledAddToCart:true,
      enabledAutoImgUpdate:false,
      basePrice:0,
      categoryId:categories?.length ? categories[0].id:0,
      configurationId:configurations?.length ? configurations[0].id:0,
      prevImg:""
  });

  let isLoading = navigation.state == "loading";
  let isSubmitting = navigation.state == "submitting";

  
  useEffect(()=>{
      if (categories) {
        setCategoriesData(categories);
      }
  },[categories]);

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
    console.log(" log is nt errors");
    submit({ ...formData }, { method: "POST" });
  };
  
  return (
    <div>
      <SpacingBackground width="100%" height="auto" margin="16px 0px ">
          <Form onSubmit={handleSubmit} method="POST">
            <SpacingBackground backgroundColor="#F9F9F9">
            <Box paddingInline="300" paddingBlock="600">
                  <Text as="h6" variant="bodyMd" fontWeight="bold" >{template?'Update template' :"Create new template"} </Text>
            </Box>
          </SpacingBackground>
            <Divider borderWidth="100" />
            <SpacingBackground backgroundColor="#F8F9FB">
     
            <Box paddingInline="300" paddingBlock="1000">
              <Grid gap={{lg:"30px"}}>
                <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
                  <TextField
                    label="Name"
                    value={`${formData.name}`}
                    onChange={(value)=>handleInputChange("name",value)}
                    autoComplete="on"
                    error={getError(actionData,"name")}
                  />
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>

                <FileInput
                  error={getError(actionData, "prevImg")}
                  title="Upload preview image"
                  path={formData.prevImg}
                  handlePath={(value:string)=>handleInputChange("prevImg",value)}
                />
              </Grid.Cell>
              <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
                  <TextField
                    size="medium"
                    label="Base price"
                    type="number"
                    value={`${formData.basePrice}`}
                    onChange={(value) => handleInputChange("basePrice",value)}
                    onBlur={(value) => handleInputChange("basePrice", parseFloat(`${formData.basePrice}`||'0'))}
                    autoComplete="on"
                    error={getError(actionData, "basePrice")}
                  />
                </Grid.Cell>
                   <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl:6 }}>
                   <BlockStack gap="400" align="start">
                      <InlineStack gap="300" blockAlign="center">
                        <Text as="strong" fontWeight="bold" variant="bodyMd">Enable auto-update for the preview image </Text>
                        <ReactSwitchCustom checked={formData.enabledAutoImgUpdate ? true:false} setChecked={(value:boolean)=>handleInputChange("enabledAutoImgUpdate", value)} />
                      </InlineStack>
                      <InlineStack gap="300" blockAlign="center">
                        <Text as="strong" fontWeight="bold" variant="bodyMd">Enable add  to  cart </Text>
                        <ReactSwitchCustom checked={formData.enabledAddToCart} setChecked={(value:boolean)=>handleInputChange("enabledAddToCart", value)} />
                      </InlineStack>
                  
                    </BlockStack>
                   
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
                <ComboxSelect
                  label="Select category"
                  placeholder="seach category"
                  selectedOption={`${formData.categoryId}`}
                  data={categoriesData?.map((category:any)=>({label:category.name,value:`${category.id}` }))||[]}
                  setSelectedOption={ (value:any)=>handleInputChange('categoryId',parseInt(value))}
                  error={getError(actionData, "categoryId")}
                  button={<Button tone="success" variant="primary"  onClick={()=>{ setEnableCategoryEdit(true)}}>Add new</Button>}
                ></ComboxSelect>
              </Grid.Cell>
              <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
                <ComboxSelect
                  label="Select configuration"
                  placeholder="seach configuration"
                  selectedOption={`${formData.configurationId}`}
                  data={configurations?.map(configuration=>({label:configuration.name,value:`${configuration.id}` }))||[]}
                  setSelectedOption={ (value:any)=>handleInputChange('configurationId',parseInt(value))}
                  error={getError(actionData, "configurationId")}
                  disable={template?true:false}
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
                
                {
                  template ?
                  <BiSaveBtn isLoading={isSubmitting} title="Save" /> : 
                    <BiSaveConfirmBtn isLoading={isSubmitting} title="Save">
                      <Badge tone="info">Please Note:</Badge>

                      <ExceptionList
                        
                          items={[
                            {
                              icon: AlertCircleIcon,
                             
                              description:
                                'To make the template available to customers, you need to design the template on next page  following this instructions .',
                            
                            },
                          ]}
                     />
                 
                      <Text as="h6" variant="bodyMd" fontWeight="bold">
                        Design instructions
                      </Text>
                      <List type="bullet">
                          <List.Item>Custom design with  options available </List.Item>
                          <List.Item>Click on  finish button</List.Item>
                          <List.Item>Click on  Save,  and  the template will be available on template list bloc</List.Item>
                        </List>
                    </BiSaveConfirmBtn>
                }
            
              </InlineStack>
            </Box>
              </SpacingBackground>
          </Form>
      </SpacingBackground>
      <EditCategoryModal onSubmit={(value:any)=> { 
        setCategoriesData([...categoriesData, value])
        handleInputChange('categoryId',value.id)
        console.log("news categoies")
      }} open={enableCategoryEdit} onClose={()=>{
        setEnableCategoryEdit(false)
        
        }} />
    </div>
  );
}

const formSchema = z.object({
  name: z.string({ required_error: 'Name is required' })
  .min(2, 'Name is too short')
    .max(220, 'Name is too long'),
    prevImg:  z.string().nullish().transform(stringTransform),
    basePrice: z.number(),
    enabledAddToCart: z.any().transform(booleanTransform),
    enabledAutoImgUpdate:z.any().transform(booleanTransform),
    configurationId: z.number(),
    categoryId: z.number(),
});



export const action = async ({ request }: ActionFunctionArgs) => {

  const { session, admin } = await authenticate.admin(request);

  const formData = await request.formData(); 
  const url = new URL(request.url);
  const id = url.searchParams.get("id");

  const submission = parseWithZod(formData, {schema:formSchema});

  if (submission.status !== 'success') {
    return json({status:false,message:null,errors:submission.error})
  }

  let template: TemplateType = submission.value as TemplateType;
  console.log(" data to  save", template)
  if (id) {
    template.id = parseInt(id);
    let res = await TemplateService.updateTemplate(template, session.id)
    return res ? 
      redirect(`..${flashMessage("template  updated is completed successfully")}`)
      : json({ ...jFlashMessage("error on template upadating") });
  } else {
    let res =  await TemplateService.addTemplate(template, session.id)
    return res ? redirect(`../preview/${res.id}/${flashMessage("template  added is completed successfully. Please setup your template in preview page to make it active.")}`)
      : json({ ...jFlashMessage("error   on template adding") });
  } 
};

