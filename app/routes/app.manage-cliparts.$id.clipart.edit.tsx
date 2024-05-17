import {
  Bleed,
  Box,
  Divider,
  Grid,
  InlineStack,
  Select,
  Text,
  TextField,
  useIndexResourceState,
} from "@shopify/polaris";
import {  useState } from "react";
import {
  Form,
  json,
  redirect,
  useActionData,
  useLoaderData,
  useNavigation,
  useSubmit
} from "@remix-run/react";
import { SpacingBackground } from "~/components/layouts/SpacingBackground";
import ClipartService from "~/models/Clipart.service";
import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { authenticate } from "~/shopify.server";
import { z } from "zod";
import { parseWithZod } from "@conform-to/zod";
import { ClipartType } from "~/types/ManagePropertyType";
import { flashMessage, jFlashMessage } from "~/utils/message-flash";
import { FileInput } from "~/components/inputs/FileInput";
import { getError } from "~/utils/error-getting";
import useHandleFlashMessage from "~/hooks/useHandleFlashMessage";
import { BiSaveBtn } from "~/components/buttons/BiSaveBtn";
import { BackBtn } from "~/components/buttons/BackBtn";
import { BiAddBtn } from "~/components/buttons/BiAddBtn";
import { RemoveNowIconBtn } from "~/components/buttons/RemoveNowIconBtn";
import { jsonTransform } from "~/utils/transfomerZod";
import { ReactSwitchCustom } from "~/components/inputs/ReactSwitchCustom";
import { readJsonField } from "~/utils/readJsonField";
import { CheckSpan } from "~/components/inputs/CheckSpan";


export const loader = async ({request, params }:LoaderFunctionArgs) => {
  const { session, admin } = await authenticate.admin(request);
  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  let clipart = null;
  const clipartsResources =  readJsonField('public/aso-cliparts/cliparts.json');
   
  if (id && params.id) {
    clipart = await ClipartService.getClipart(parseInt(id), parseInt(params.id || '0'));
  }
  
  return json({ clipart, clipartsResources, shop:session.shop });
}

export default function ClipartCreate() {
  const submit = useSubmit();
  const navigation = useNavigation()
  const actionData = useActionData<typeof action>();
  useHandleFlashMessage();
  console.log('action data :', actionData);
  let { clipart, clipartsResources, shop } =  useLoaderData<typeof loader>()
  console.log('loader data :', clipartsResources);
  
  const [isApiUsed, setIsApiUsed] = useState(false);
  const [apiClipartGroup, setApiClipartGroup] = useState("animals");
  const [selectCliparts, setSelectCliparts] = useState(new Set<string>([]));
  const [saveSelectedCliparts, setSaveSelectedCliparts] = useState<boolean>(false);
   // animals arrows decorationFestivities emojisFlags foodsDrinks healthcare householdTools mostPopular others peoples 
  // plantsNature prohibitionsWarnings shapes sportActivities symbolsMarkings vehiclesTraffic
  const apiClipartGroups = [
    {
      label: "Animals",
      value: "animals",
    }
    ,{
      label: "Arrows",
      value: "arrows",
    },
    {
      label: "Decoration Festivities",
      value: "decorationFestivities",
    },
    {
      label: "Emojis Flags",
      value: "emojisFlags",
    },
    {
      label: "Foods Drinks",
      value: "foodsDrinks",
    },
    {
      label: "Health care",
      value: "healthcare",
    },
    {
      label: "Household Tools",
      value: "householdTools",
    },
    {
      label: "Most Popular",
      value: "mostPopular",
    }
    ,{
      label: "Others",
      value: "others",
    },
    {
      label: "Peoples",
      value: "peoples",
    }
    ,{
      label: "Plants Nature",
      value: "plantsNature",
    },
    {
      label: "Prohibitions Warnings",
      value: "prohibitionsWarnings",
    },  
    {
      label: "Shapes",
      value: "shapes",
    },
    {
      label: "Sport Activities",
      value: "sportActivities",
    },
    {
      label: "Symbols Markings",
      value: "symbolsMarkings",
    },
    {
      label: "Vehicles Traffic",
      value: "vehiclesTraffic",
    }
  ]
  
  const [formData, setFormData] = useState<{ cliparts: ClipartType[] }>(
    clipart ? ({ cliparts: [clipart as ClipartType] }) : {
    cliparts: [{
      title: "",
      url: "",
      additionalPrice:0
    }]
    });
  

  let isLoading = navigation.state == "loading";
  let isSubmitting = navigation.state == "submitting";

  const handleAddClipart = () => {
    if (!formData.cliparts) {
      formData.cliparts = [];
    } 
    formData.cliparts.push({
      title: "",
      url: "",
      additionalPrice:0
    });

    setFormData({ ...formData });
  }

  const handleDeleteClipart = (index: number) => {
    if (formData.cliparts.length>1) {
      formData.cliparts.splice(index, 1);
      setFormData({ ...formData});
    }
  }

  const handleSelectCliparts = (value:string) => {
    if (selectCliparts.has(value)) {
      selectCliparts.delete(value);
    } else {
      selectCliparts.add(value);
    }
    setSelectCliparts(new Set([...selectCliparts])); 
  }


  const  handleSaveSelectedCliparts = () => {
    setSaveSelectedCliparts(true);
    formData.cliparts = [];
    selectCliparts.forEach((value) => {
      formData.cliparts.push({
        title: "",
        url: `https://${shop}/apps/aso-proxy${value}`,
        additionalPrice:0
      });
    })
    
  }

  const handlesetApiClipartGroup = (value: string) => {
    setApiClipartGroup(value);
    setSelectCliparts(new Set([])); 
  }


  const handleIsApiUsedChange = (value: boolean) => {
    setIsApiUsed(value)
    setSaveSelectedCliparts(false);
    setSelectCliparts(new Set([]));
    formData.cliparts = [];
    formData.cliparts.push({
      title: "",
      url: "",
      additionalPrice:0
    });

    setFormData({ ...formData });
  }


  const handleSubmit = (e: any) => {
    e.preventDefault();
    submit({cliparts:JSON.stringify(formData.cliparts) }, { method: "POST" });
  };

  return (
    <div>
      <SpacingBackground width="100%" height="auto" margin="16px 0px ">
          <Form onSubmit={handleSubmit} method="POST">
            <SpacingBackground backgroundColor="#F9F9F9">
            <Box paddingInline="300" paddingBlock="600">
                  <Text as="h6" variant="bodyMd" fontWeight="bold" > {clipart?" Update clipart":'Add new clipart'}</Text>
            </Box>
            </SpacingBackground>
            <Divider borderWidth="100" />
             <SpacingBackground backgroundColor="#F8F9FB">
            <Box paddingInline="300" paddingBlock="1000">
              <Grid gap={{ lg: "30px" }}>
        
                { !clipart &&
                  <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
                    <InlineStack gap="300" blockAlign="center">
                      <Text as="strong" fontWeight="bold" variant="bodyLg">Use custom cliparts</Text>
                    <ReactSwitchCustom checked={isApiUsed} setChecked={(value: boolean) => handleIsApiUsedChange(value)}
                    />
                      <Text as="strong" fontWeight="bold" variant="bodyLg">Use Api cliparts</Text>
                    </InlineStack>
                </Grid.Cell>}
                { (!saveSelectedCliparts && isApiUsed) && <>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
                  <Select
                    label="Select Clipart group"
                    options={apiClipartGroups}
                    value={apiClipartGroup}
                    onChange={(value) => handlesetApiClipartGroup(value)}
                  />
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
                  <Grid gap={{ lg: "30px" }}>
                    { clipartsResources[apiClipartGroup]?.map((clipartResource: string) => (
                      
                      <Grid.Cell columnSpan={{ xs: 2, sm: 2, md: 2, lg: 2, xl: 2 }}>
                        <ClipartItem active={selectCliparts.has(clipartResource)} imgSrc={clipartResource}  onChange={(checked:boolean) => {handleSelectCliparts(clipartResource)} }/>
                      </Grid.Cell>
                    ))
                        
                    }
                  
                  </Grid>

                </Grid.Cell>
                  <Grid.Cell>
                  <Box width="300px">
                  <BiAddBtn title="Add selected cliparts" handleClick={()=>handleSaveSelectedCliparts()} />
                  </Box>
                </Grid.Cell>
                </>
                  
             }
              {( saveSelectedCliparts || !isApiUsed) &&
                    formData.cliparts.map((clipartItem, index) => (
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
                      
                        <InlineStack wrap={false} as="div" gap="400">
                          <Box width="52%">
                          <TextField
                    label="Label"
                    value={`${clipartItem.title}`}
                    onChange={(value) => {
                      clipartItem.title = value;
                      formData.cliparts[index] = clipartItem;
                      setFormData({ ...formData });
                    }}
                        autoComplete="on"
                              error={getError(actionData, `cliparts.${index}.title`)}
                  />
                          
                          </Box>
                          <Box width="52%">
                          <FileInput error={getError(actionData, "url")} title="Upload icon"
                              path={`${clipartItem.url}`}
                              handlePath={(value: string) => {
                                clipartItem.url = value;
                                formData.cliparts[index] = clipartItem;
                                setFormData({ ...formData });
                              }} />
                          </Box>
                          <Box width="52%">
                            
                      <TextField
                        label="Additional price"
                        type="number"
                        value={`${clipartItem.additionalPrice}`}
                        onChange={(value) => {
                          clipartItem.additionalPrice = parseFloat(value);
                          formData.cliparts[index] = clipartItem;
                          setFormData({ ...formData });
                        }}
                        autoComplete="off"
                              error={getError(actionData, `manageFixingMethods.${index}.additionalPrice`)}
                        />
                     
                          </Box>
                          <Box width="1%">
                            <Bleed marginInlineStart="400">
                              
                            <RemoveNowIconBtn onClick={() => handleDeleteClipart(index)} />
                          </Bleed>
                          </Box>
                             
                          
                        </InlineStack>
                        
                
                </Grid.Cell>
                         ))
                        }
               {(!clipart && !isApiUsed) && <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
                <Box width="150px">
                    <BiAddBtn title="Add clipart" handleClick={()=>handleAddClipart()} />
                  </Box>
                </Grid.Cell>}
              </Grid>
         
            </Box>
            </SpacingBackground>
            <Divider borderWidth="100" />
             <SpacingBackground backgroundColor="#F9F9F9">

            <Box paddingInline="300" paddingBlock="300">
              <InlineStack align="end" gap="600">
              <BackBtn isLoading={isLoading} title="Back"/>
              {(!isApiUsed || saveSelectedCliparts) && <BiSaveBtn isLoading={isSubmitting} title="Save" />}
              </InlineStack>
            </Box>
            </SpacingBackground>
          </Form>
      </SpacingBackground>
    </div>
  );
}



export const ClipartItem = ({
  imgSrc,
  active,
  onChange,
}: {
  imgSrc: string;
  active: boolean;
  onChange:Function;
}) => {
  return (
    <SpacingBackground backgroundColor="#FFFFFF" border="1px  solid #E8E8E8" borderRadius="5px" height="110px" width="auto">
      <div
        onClick={() => {
          onChange(!active);
        }}
        style={{ position: "relative" , margin:"5px" }}
      >
        <img 
          src={imgSrc}
          alt={""}
          style={{ height: "100px", width : "100px" }}
        />
        <div style={{ position: "absolute", bottom: "0", right: "0", width: "20px", }}>
     
            <Box  paddingBlockEnd="200" >
                <InlineStack gap="200">
                  <CheckSpan checked={active} />
                </InlineStack>
            </Box>
        </div>
      </div>
    </SpacingBackground>
  );
};


const formSchema = z.object({
  cliparts: z.any().transform(jsonTransform).pipe(
    z.object({
      title: z.any(),
  url: z.string({ required_error: 'Url is required' })
  .min(3, 'Url is too short')
  .max(255, 'Url is too long'),
  additionalPrice: z.number()
    }).array()
  )
});



export const action = async ({ request, params }: ActionFunctionArgs) => {

  const { session, admin } = await authenticate.admin(request);



  const formData = await request.formData();
  
  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  const  clipartsGroupId = parseInt(params.id||"0");

  const submission = parseWithZod(formData, {schema:formSchema});

  if (submission.status !== 'success') {
    return json({status:false,message:null,errors:submission.error})
  }

  let cliparts: ClipartType[] = submission.value.cliparts as ClipartType[];
  
  if (id && clipartsGroupId) {
    let clipart =cliparts[0]
    clipart.id = parseInt(id);
    let res = await ClipartService.updateClipart(clipart, clipartsGroupId) 
    return res ?
      redirect(`..${flashMessage("clipart  updated is completed successfully")}`)
      : json({ ...jFlashMessage("error on clipart upadating") });
  } else {
    let res: any = null;
    for(const clipart of cliparts){
      res =  await ClipartService.addClipart(clipart,clipartsGroupId)
    }
    return res ? redirect(`..${flashMessage("clipart  added is completed successfully")}`)
      : json({ ...jFlashMessage("error  on font adding") });
  } 
};

