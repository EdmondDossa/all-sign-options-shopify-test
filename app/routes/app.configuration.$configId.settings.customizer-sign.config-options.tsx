import { BlockStack, Box, Button, Card, Grid, Icon, InlineStack, Text, TextField } from "@shopify/polaris";
import { useEffect, useState } from "react";
import {
  Form,
  useActionData,
  useLoaderData,
  useNavigation,
  useSubmit,
} from "@remix-run/react";
import { BoxBackground } from "~/components/layouts/BoxBackground";
import { SpacingBackground } from "~/components/layouts/SpacingBackground";
import {
  settingAction,
  settingLoader,
} from "~/custom-action-loader/config-action-loader";
import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import useHandleFlashMessage from "~/hooks/useHandleFlashMessage";
import { z } from "zod";
import { BiSaveBtn } from "~/components/buttons/BiSaveBtn";
import { jsonTransform } from "~/utils/transfomerZod";
import { FramSettingsTabsSvg } from "~/components/svgs/FramSettingsTabsSvg";
import { SizeSvg } from "~/components/svgs/SizeSvg";
import { ShapeSvg } from "~/components/svgs/ShapeSvg";
import { FixingMethodSvg } from "~/components/svgs/FixingMethodSvg";
import { BorderSvg } from "~/components/svgs/BorderSvg";
import { ColorPaletteSvg } from "~/components/svgs/ColorPaletteSvg";
import { TextImageSvg } from "~/components/svgs/TextImageSvg";
import { AdditinalOptionSvg } from "~/components/svgs/AdditinalOptionSvg";

import Sortable from "sortablejs";
import { QrSvg } from "~/components/svgs/QrSvg";
import { ImageSvg } from "~/components/svgs/ImageSvg ";
import TemplatesIcon from "~/components/icons/TemplatesIcon";
import { MaterialSvg } from "~/components/svgs/MaterialSvg";
import { AdditionalComponentSvg } from "~/components/svgs/AdditionalComponentSvg";
import { HideIcon, ViewIcon } from "@shopify/polaris-icons";


const settingParams: [string, string] = ["customizerSign", ""];
const formSchema = z.object({
  configOptions: z.any().transform(jsonTransform)
});

export const loader = async (agrs: LoaderFunctionArgs) => {
  return await settingLoader(agrs, settingParams);
};

export const action = async (args: ActionFunctionArgs) => {
  return await settingAction(args, settingParams, formSchema);
};

export default function ConfigSettingsGeneral() {
  const submit = useSubmit();
  let { settingData } = useLoaderData<typeof loader>();
  useHandleFlashMessage();
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  let isSubmitting = navigation.state == "submitting";

 

  const [formData, setFormData] = useState<any>(
      {
      configOptions: Array.isArray(settingData.configOptions) ? settingData.configOptions : [
        {
            type: "materials",
            active: true
        },
        {
            type: "sizes",
            active: true
        },
        {
            type: "shapes",
            active: true
        },
        {
            type: "fixing-methodes",
            active: true
        },
        {
            type: "borders",
            active: true
        },
        {
            type: "colors",
            active: true
        },
        {
            type: "texts",
            active: true
        },
        {
            type: "qrcodes",
            active: true
        },
        {
            type: "images",
            active: true
        },
        {
            type: "additional-options",
            active: true
        },
        {
            type: "additional-components",
            active: true
        }
      ]
    },
  );


  const handeleSort = () => {
    const matchingTbody = document.querySelector('.config-options');
    if(matchingTbody){
      const rows = Array.from(matchingTbody.querySelectorAll('.config-option'));
      const newOrder:any = rows.map((row) => {
        const id = row.getAttribute("id")
        return formData.configOptions.find((option:any, index:number) => 'config-option' + index == id);
      });

       return newOrder;
    }
};

  const handleInputChange = (inputName: string, value: any) => {
    setFormData((prevData: any) => ({
      ...prevData,
      [inputName]: value,
    }));
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
   
    const data = { configOptions: JSON.stringify(handeleSort()) };

    submit(data, { method: "POST" });
  };

  let   sortable = null;
  useEffect(()=>{
      const element = document.querySelector('.config-options');
      sortable   = new Sortable(element as HTMLElement, {

      })
  })

    
  

  return (
    <>
      <Form onSubmit={handleFormSubmit} method="POST">
        <SpacingBackground border="1px solid #DDDDDD" >
          <Box paddingInline="800" paddingBlock="200" >
                <BlockStack gap="200">
                <div className="config-options" style={{gap: "10px"}}>
                  {
                    formData.configOptions.map((configOption:any, index:number)=>{

                      return(
                        <Card>
                            <InlineStack align="space-between" blockAlign="center">
                              <InlineStack blockAlign="center" gap="200">
                                <OptionsICon type={configOption.type}/>
                                <Text as="strong" fontWeight="bold" variant="bodyLg">
                                   <span id={"config-option"+index} className="config-option">
                                     {configOption.type.replace('-', ' ').toUpperCase()}
                                    </span>

                                </Text>
                              </InlineStack>

                                <Button
                                  textAlign="left"
                                  icon={configOption.active ? <Icon
                                    source={ViewIcon }
                                    tone="base"
                                  /> : <Icon
                                  source={HideIcon}
                                  tone="base"
                                />}
                                  onClick={() =>{
                                  formData.configOptions[index].active = !configOption.active
                                    handleInputChange('configOptions', formData.configOptions)
                                  }}
                                
                                >
                                  { configOption.active  ? "Hide option" : "Show option"}
                                </Button>
                            </InlineStack>
                        </Card>
                      )
                    })
                  }
                   </div>
                </BlockStack>
          </Box>
        </SpacingBackground>

        <SpacingBackground width="100%" height="auto" margin="3px 0 0 0">
          <BoxBackground>
            <Box paddingInline="300" paddingBlock="300">
              <InlineStack align="end" gap="600">
                <BiSaveBtn isLoading={isSubmitting} title="Save" />
              </InlineStack>
            </Box>
          </BoxBackground>
        </SpacingBackground>
      </Form>
    </>
  );
}


const OptionsICon= ({type}:{type:string})=>{
      const  configOptions =  [
        {
            type: "materials",
            icon: <MaterialSvg/>
        },
        {
            type: "sizes",
            icon:  <SizeSvg /> 
        },
        {
            type: "shapes",
            icon:  <ShapeSvg />
        },
        {
            type: "fixing-methodes",
            icon:  <FixingMethodSvg />
        },
        {
            type: "borders",
            icon: <BorderSvg />
        },
        {
            type: "colors",
            icon:  <ColorPaletteSvg />  
        },
        {
            type: "texts",
            icon:  <TextImageSvg />
        },
        {
            type: "qrcodes",
            icon: <QrSvg />
        },
        {
            type: "images",
            icon:  <ImageSvg />
        },
        {
            type: "additional-options",
            icon: <AdditinalOptionSvg />
        },
        {
            type: "additional-components",
            icon: <AdditionalComponentSvg />
        }
      ]


    return <> {configOptions.find((item)=>item.type == type)?.icon } </> 
}
