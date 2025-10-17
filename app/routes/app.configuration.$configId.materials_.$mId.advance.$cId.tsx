import {
    Box,
    Divider,
    InlineStack,
    Text,
  } from "@shopify/polaris";
  
  import {Link, Outlet, useLoaderData, useOutletContext, useParams} from "@remix-run/react";
  import { BoxBackground } from "~/components/layouts/BoxBackground";
  import NextLtrIcon from "~/components/icons/NextLtrIcon";
import { LoaderFunctionArgs, json } from "@remix-run/node";
import { authenticate } from "~/shopify.server";
import {  MaterialAdvance, MaterialAdvanceComponentType, MaterialAdvanceOptionType } from "~/types/ConfigDataType";

import MaterialAdvancedOptionService from "~/models/MaterialAdvancedOption.service";
import { FixingMethodType, ShapeType } from "~/types/SettingsType";
import SettingShapesService from "~/models/SettingShapes.service";
import SettingFixingMethodService from "~/models/SettingFixingMethod.service";
import { ConfigurationType } from "~/types/ConfigurationType";
import MaterialAdvancedIndex from "./app.configuration.$configId.materials_.$mId.advance._index";
  
export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const { session, admin } = await authenticate.admin(request);
  const configId = parseInt(params.configId ?? "");
  const materialId = parseInt(params.mId ?? "");
  const componentId = parseInt(params.cId ?? "");
  console.log('configID materialID', configId, materialId, componentId);

  let materialOptions: MaterialAdvanceOptionType[] | null = null;

  const manageShapes: ShapeType[] | null = await SettingShapesService.get(session.id);
  const manageFixingsMethods : FixingMethodType[] | null =  await SettingFixingMethodService.get(session.id)

  if ( !Number.isNaN(configId)  && !Number.isNaN(materialId)  && !Number.isNaN(componentId) ) {
    materialOptions = await MaterialAdvancedOptionService.getAll(session.id, configId, materialId,componentId);

  }
  
  return json({materialOptions,manageShapes,manageFixingsMethods });
};

interface AdvanceMaterialProps {
  configuration: ConfigurationType;
  materialComponents: MaterialAdvanceComponentType[]
  material: MaterialAdvance
}  

export default function Materiels(){
// export default function Materiels({ materialComponents , material, configuration}: AdvanceMaterialProps){

  let { materialOptions, manageShapes, manageFixingsMethods } = useLoaderData<typeof loader>();
  const { materialComponents , material, configuration} = useOutletContext<{
    materialComponents: MaterialAdvanceComponentType[];
    material:MaterialAdvance, configuration: ConfigurationType
  }>();

  const params = useParams();
  const materialComponent = materialComponents?.find((currMaterialComponent: any,index:number) => index === parseInt(params.cId ?? ""));

  return (
    <div style={{width: "100%"}}>
      <BoxBackground>
        <Box paddingInline="300" paddingBlock="600">
          <InlineStack align="start">
            <InlineStack gap="100" align="start" blockAlign="start">
              <Text as="h2" variant="headingMd">
                {configuration?.name}
              </Text>
              <NextLtrIcon />
              <Link className="link" to="../../../materials">
          <Text as="h2" variant="headingMd">
            Materialsz
          </Text>
          </Link>
            <NextLtrIcon />
            <Link className="link" to="..">
              <Text as="h2" variant="headingMd" >
                {material?.name} (Advances)
            </Text>
          </Link>
            <NextLtrIcon />
              <Text as="h2" variant="headingMd" tone="subdued">
                {materialComponent?.name}
            </Text>
            
            </InlineStack>
          </InlineStack>
        </Box>
        <Divider borderWidth="100" />
      </BoxBackground>
      <Divider borderWidth="100" />
      
      <Outlet context={{materialOptions,manageShapes,manageFixingsMethods }}/>
      {/* <MaterialAdvancedIndex materialComponents={materialComponents} material={material} configuration={configuration}/> */}

    </div>
      )
}