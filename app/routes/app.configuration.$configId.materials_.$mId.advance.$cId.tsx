import {
    Box,
    Divider,
    InlineStack,
    Page,
    Text,
  } from "@shopify/polaris";
  
  import {Link, Outlet, useLoaderData, useOutletContext, useParams} from "@remix-run/react";
  import { BoxBackground } from "~/components/layouts/BoxBackground";
  import NextLtrIcon from "~/components/icons/NextLtrIcon";
import { LoaderFunctionArgs, json } from "@remix-run/node";
import { authenticate } from "~/shopify.server";
import { ConfigAdditionalOptionItem, MaterialAdvance, MaterialAdvanceComponentType, MaterialAdvanceOptionType } from "~/types/ConfigDataType";
import MaterialAdditionalOptionService from "~/models/MaterialAdditionalOption.service";
import MaterialAdvancedOptionService from "~/models/MaterialAdvancedOption.service";
import { ColorType } from "~/types/ManagePropertyType";
import { FixingMethodType, ShapeType } from "~/types/SettingsType";
import SettingShapesService from "~/models/SettingShapes.service";
import ColorService from "~/models/Color.service";
import SettingFixingMethodService from "~/models/SettingFixingMethod.service";
import { ConfigurationType } from "~/types/ConfigurationType";
  
export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const { session, admin } = await authenticate.admin(request);
  const configId = parseInt(params.configId ?? "");
  const materialId = parseInt(params.mId ?? "");
  const componentId = parseInt(params.cId ?? "");
  console.log('configID materialID', configId, materialId, componentId);

  let materialOptions: MaterialAdvanceOptionType[] | null = null;
  const manageColors: ColorType[] | null = await ColorService.getColors(session.id);
  const manageShapes: ShapeType[] | null = await SettingShapesService.get(session.id);
  const manageFixingsMethods : FixingMethodType[] | null =  await SettingFixingMethodService.get(session.id)

  if ( !Number.isNaN(configId)  && !Number.isNaN(materialId)  && !Number.isNaN(componentId) ) {
    materialOptions = await MaterialAdvancedOptionService.getAll(session.id, configId, materialId,componentId);

  }
  
  return json({materialOptions,manageColors,manageShapes,manageFixingsMethods });
};

  

export default function Materiels(){
  let { materialOptions, manageColors, manageShapes, manageFixingsMethods } = useLoaderData<typeof loader>();
  const { materialComponents , material, configuration} = useOutletContext<{
    materialComponents: MaterialAdvanceComponentType[];
    material:MaterialAdvance, configuration: ConfigurationType
  }>();

  const params = useParams();
  const materialComponent = materialComponents?.find((currMaterialComponent: any,index:number) => index === parseInt(params.cId ?? ""));

  return (
    <>
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
              Materials
            </Text>
            </Link>
              <NextLtrIcon />
              <Link className="link" to="..">
                <Text as="h2" variant="headingMd" >
                  {material?.name} (Advance)
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
        <Outlet context={{materialOptions,manageColors,manageShapes,manageFixingsMethods }}/>

      </>
      )
}