import {
  Bleed,
  Box,
  Card,
  Checkbox,
  Divider,
  Grid,
  InlineStack,
  Scrollable,
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
  useOutletContext,
  useSubmit
} from "@remix-run/react";
import { SpacingBackground } from "~/components/layouts/SpacingBackground";
import ClipartService from "~/models/Clipart.service";
import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { authenticate } from "~/shopify.server";
import { z } from "zod";
import { parseWithZod } from "@conform-to/zod";
import { ClipartType, ClipartsGroupType } from "~/types/ManagePropertyType";
import { flashMessage, jFlashMessage } from "~/utils/message-flash";
import { FileInput } from "~/components/inputs/FileInput";
import { getError } from "~/utils/error-getting";
import useHandleFlashMessage from "~/hooks/useHandleFlashMessage";
import { BiSaveBtn } from "~/components/buttons/BiSaveBtn";
import { BackBtn } from "~/components/buttons/BackBtn";
import { BiAddBtn } from "~/components/buttons/BiAddBtn";
import { RemoveNowIconBtn } from "~/components/buttons/RemoveNowIconBtn";
import { jsonTransform, stringTransform } from "~/utils/transfomerZod";
import { ReactSwitchCustom } from "~/components/inputs/ReactSwitchCustom";
import { readJsonField } from "~/utils/readJsonField";
import { CheckSpan } from "~/components/inputs/CheckSpan";
import { FileUploader } from "./app.upload";
import { ComboxSelect } from "~/components/inputs/ComboxSelect";


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
  let { clipartsGroup } = useOutletContext<{ clipartsGroup: ClipartsGroupType }>();
  useHandleFlashMessage();
  let { clipart, clipartsResources, shop } =  useLoaderData<typeof loader>()
  
  const [isApiUsed, setIsApiUsed] = useState(false);
  const [apiClipartGroup, setApiClipartGroup] = useState("animals");
  const [selectCliparts, setSelectCliparts] = useState(new Set<string>([]));
  const [saveSelectedCliparts, setSaveSelectedCliparts] = useState<boolean>(false);
  const  [selectAll, setSelectAll] = useState<boolean>(false);
  
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

  const  handleSelectAll = (value:boolean) =>{
      setSelectCliparts(new Set([])); 
      if (value) {
        let newsItems = [];
        for (let  item of clipartsResources[apiClipartGroup])  {
          newsItems.push(item)
        }
        setSelectCliparts(new Set(newsItems)); 
      }
      setSelectAll(value)
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
        title: value.split("/").pop()?.split(".")?.shift()||"",
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


  const handleImages = (images: string[]) => {
    let  cliparts = formData.cliparts;
    
    images.map((image)=>{
      if (formData.cliparts.find((curr)=>curr.url == image)) {
        return ;
      }
      cliparts.push({
        title: "",
        url: image,
        additionalPrice:0
      });
    })

    formData.cliparts = cliparts.filter(curr=> curr.url);

    setFormData({ ...formData });
  }


  const handleSubmit = (e: any) => {
    e.preventDefault();
    submit({cliparts:JSON.stringify(formData.cliparts) }, { method: "POST" });
  };

  return (
    <div>
      <div style={{width:"100%", height:"auto", margin:"10px 0px"}}>
        <Card>
          <Form onSubmit={handleSubmit} method="POST">
            <div>
              <Box paddingInline="300" paddingBlock="200">
                <InlineStack align="space-between">
                  <Text as="h6" variant="bodyMd" fontWeight="bold" > {clipart?" Update clipart":'Add new clipart'}</Text>
                  <InlineStack gap="300" blockAlign="center">

                  {!clipart && <InlineStack gap="300" blockAlign="center">
                    <Text as="strong" fontWeight="bold" variant="bodyLg">Use Api cliparts</Text>
                    <ReactSwitchCustom checked={isApiUsed} setChecked={(value: boolean) => handleIsApiUsedChange(value)}/>
                  </InlineStack>}
                  {isApiUsed && 
                    <InlineStack gap="300" blockAlign="center">
                      <Checkbox checked={selectAll} label="All" onChange={handleSelectAll}/>
                      <ComboxSelect placeholder="select groups" selectedOption={apiClipartGroup} setSelectedOption={ (value:string) =>handlesetApiClipartGroup(value)} label="Cliparts Groups " labelHidden data={apiClipartGroups} />
                    </InlineStack>
                  }
                  
                  { (!isApiUsed && !clipart) && 
                  <FileUploader
                    multiple
                    type="image"
                    fileData={[]}
                    setFilesData={handleImages}
                    title="select cliparts"
                  >
                  <BiAddBtn title="Add images" handleClick={()=>""} />
                  </FileUploader>}
                  </InlineStack>
                </InlineStack>
              </Box>
            </div>
            <Divider borderWidth="100" />
            <div>
              <Box paddingInline="300" paddingBlock="1000">
                <Scrollable
                  shadow
                  style={{maxHeight: '50vh', paddingBottom:"2rem"}}
                  focusable
                  scrollbarGutter="stable"
                  scrollbarWidth="thin"
                >
                  <Grid gap={{ lg: "15px" }}>
            
                    
                    { (!saveSelectedCliparts && isApiUsed) && <>
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
                              clipartItem.additionalPrice = value;
                              formData.cliparts[index] = clipartItem;
                              setFormData({ ...formData });
                            }}
                                  
                                  
                            onBlur={(value) => {
                              clipartItem.additionalPrice = parseFloat(`${clipartItem.additionalPrice}`);
                              formData.cliparts[index] = clipartItem;
                              setFormData({ ...formData });
                            }}
                            autoComplete="off"
                                  error={getError(actionData, `manageFixingMethods.${index}.additionalPrice`)}
                            />
                          
                              </Box>
                              
                              <InlineStack blockAlign="center">
                                <RemoveNowIconBtn onClick={() => handleDeleteClipart(index)} />
                              </InlineStack>
                                  
                                  
                              
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
                </Scrollable>
              
              </Box>
            </div>
            <Divider borderWidth="100" />
            <div>

              <Box paddingInline="300" paddingBlock="300">
                <InlineStack align="end" gap="600">
                <BackBtn isLoading={isLoading} title="Back"/>

                { (!isApiUsed || saveSelectedCliparts) ?
                    <BiSaveBtn isLoading={isSubmitting} title="Save" />:
                    <BiAddBtn title="Add selected cliparts" handleClick={()=>handleSaveSelectedCliparts()} />
                }
                </InlineStack>
              </Box>
            </div>
          </Form>
        </Card>
      </div>
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
  url: z.any().transform(stringTransform),
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
      redirect(`..${flashMessage("Clipart updated successfully")}`)
      : json({ ...jFlashMessage("Error on clipart updating") });
  } else {
    let res: any = null;
    for(const clipart of cliparts){
      res =  await ClipartService.addClipart(clipart,clipartsGroupId)
    }
    return res ? redirect(`..${flashMessage("Clipart added successfully")}`)
      : json({ ...jFlashMessage("Error on font adding") });
  } 
};