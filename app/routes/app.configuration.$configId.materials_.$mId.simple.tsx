
import { Box, Card, Divider, InlineStack, Page, Text } from "@shopify/polaris";
import { Link, Outlet, useLoaderData, useOutletContext, useParams, useRouteLoaderData } from "@remix-run/react";
import { BoxBackground } from "~/components/layouts/BoxBackground";
import NextLtrIcon from "~/components/icons/NextLtrIcon";
import { TabHeader } from "~/components/layouts/TabHeader";
import { ConfigurationType } from "~/types/ConfigurationType";
import { useEffect, useMemo, useState } from "react";


// import MaterialSizeIndex from "./app.configuration.$configId.materials_.$mId.simple.size._index";
import MaterialSizes from "./app.configuration.$configId.materials_.$mId.simple.size._index";
import MaterialShapes from "./app.configuration.$configId.materials_.$mId.simple.shape";
import MaterialBorder from "./app.configuration.$configId.materials_.$mId.simple.border._index"
import { json, LoaderFunctionArgs } from "@remix-run/node";
import { authenticate } from "~/shopify.server";
import { ConfigFixingMethod, ConfigSize } from "~/types/ConfigDataType";
import SettingBorderService from "~/models/SettingBorder.service";
import SettingShapesService from "~/models/SettingShapes.service";
import { BorderType, FixingMethodType, ShapeType } from "~/types/SettingsType";
import MaterialBorderService from "~/models/MaterialBorderService.service";
import MaterialSizeService from "~/models/MateriaSizeService.service";
import MaterialTextImage from "./app.configuration.$configId.materials_.$mId.simple.text-image";
import MaterialDiscount from "./app.configuration.$configId.materials_.$mId.simple.discount-product";
import SettingFixingMethodService from "~/models/SettingFixingMethod.service";
import MaterialFixingMethodService from "~/models/MaterialFixingMethod.service";
import MaterialFixingMethodsIndex from "./app.configuration.$configId.materials_.$mId.simple.fixing-method._index";
import MaterialColors from "./app.configuration.$configId.materials_.$mId.simple.color._index";
import MaterialAdditionalOptionIndex from "./app.configuration.$configId.materials_.$mId.simple.additional-option._index";

interface MaterielsProps {
  configuration?: ConfigurationType;
  plan?: string;
  materialIndex?: number;
  manageShapes: ShapeType[];
  manageFixingMethods: FixingMethodType[];
  manageBorders: BorderType[]
  refreshMaterial: (key: string, data: object) => void;
}

// export const loader = async ({ request, params }: LoaderFunctionArgs) => {
//   const { session, admin } = await authenticate.admin(request);
//   const configId = parseInt(params.configId ?? "");
//   const mId = parseInt(params.mId ?? "");
//   console.log("configID materialID", configId, mId);

//   const manageFixingMethods: FixingMethodType[] | null =
//     await SettingFixingMethodService.get(session.id);
//   const manageShapes: ShapeType[] | null = await SettingShapesService.get(
//     session.id,
//   );

//   return json({
//     manageFixingMethods,
//     manageShapes,
//   });
// };

export default function SimpleMateriels(props: MaterielsProps) {
  const outletContext = useOutletContext<{ configuration: ConfigurationType; plan: string, configId: number, sessionId: string }>();
  const params = useParams();

  const configuration = props.configuration ?? outletContext.configuration;
  const plan = props.plan ?? outletContext.plan;

  const materialIndex = props.materialIndex ?? (params.mId ? parseInt(params.mId) : undefined);
  const material = useMemo(
    () => configuration?.data?.materials?.[materialIndex ?? 0],
    [configuration, materialIndex]
  );

  // console.log(outletContext, "outlet context")

  //chargement es données pour les borders
  // let { configSizes, manageShapes, manageBorders} = useLoaderData<typeof loader>();

  // console.log(props, "mat props")
  // console.log(material.data.sizes, "88888") 

  const [selectedTab, setSelectedTab] = useState<string>("size");
  const renderTabContent = () => {
    console.log(selectedTab, "tab", material)
    switch (selectedTab) {
      case "size":
        return <MaterialSizes refreshMaterial={props.refreshMaterial} materialId={materialIndex} configuration={configuration} plan={plan} customSize={material?.data.sizes.customSize} allSizes={material?.data.sizes.allSizes} thickness={material?.data.sizes.thickness}/>;
      case "color":
        return <MaterialColors plan={plan} colorTable={material?.data.colors.allColors} customColors={material?.data.colors.customColors} materialId={materialIndex}/>;
      case "shape":
        return <MaterialShapes plan={plan} materialId={materialIndex} shapes={material?.data.shapes} manageShapes={props.manageShapes} />;
      case "border":
        return <MaterialBorder materialId={materialIndex} plan={plan} manageBorders={props.manageBorders} manageShapes={props.manageShapes} configSizes={material?.data.sizes.allSizes}  borders={material?.data.borders.allBorders} borderSetting={material?.data.borders.settings}/>;
      case "fixing-method":
        return <MaterialFixingMethodsIndex materialId={materialIndex} manageFixingMethods={props.manageFixingMethods} fixingMethods={material?.data.fixingMethods} manageShapes={props.manageShapes} configSizes={material?.data.sizes.allSizes} plan={plan} />;
      case "text-image":
        return <MaterialTextImage materialId={materialIndex} textImages={material?.data.textImages} />;
      case "discount-product":
        return <MaterialDiscount materialId={materialIndex} discounts={material?.discounts} />;
      case "additional-option":
        return <MaterialAdditionalOptionIndex configColors={material?.data.colors.allColors} materialId={materialIndex} additionalOptions={ material.data.additionalOptions } />;
      default:
        return null;
    }
  };
  

  return (
    <div style={{
        width: '100%',
        padding: '5px',
        display: "flex",
        gap: "8px"
        // backgroundColor: 'green'
      }}
    >
      <div className="material_sidebar">
        <TabHeader selectedTab={selectedTab} onSelectTab={setSelectedTab} />
      </div>
      <div className="material_contents">
        <Card>
          <InlineStack>
            <InlineStack gap="100" align="start">
              {material?.popImg && (
                <div>
                  <img src={material?.popImg} alt="" />
                </div>
              )}
              <div>
                <Text as="h2" variant="headingLg">
                  {material?.name}
                </Text>
                <Text
                  as="p"
                  variant="headingMd"
                  tone="subdued"
                  fontWeight="medium"
                >
                  {material?.description}
                </Text>
              </div>
            </InlineStack>
          </InlineStack>
        </Card>

        <div style={{padding: "8px 0px"}}>
          {renderTabContent()}

        </div>
      </div>
    </div>
  );
}

