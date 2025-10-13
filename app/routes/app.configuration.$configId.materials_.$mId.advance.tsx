

import { LoaderFunctionArgs, json } from "@remix-run/node";
import {Outlet, useLoaderData, useOutletContext, useParams} from "@remix-run/react";
import { Page } from "@shopify/polaris";
import MaterialAdvanceComponent from "~/models/MaterialAdvanceComponent.service";
import { authenticate } from "~/shopify.server";
import { MaterialAdvance, MaterialAdvanceComponentType } from "~/types/ConfigDataType";
import { ConfigurationType } from "~/types/ConfigurationType";
import MaterialAdvancedIndex from "./app.configuration.$configId.materials_.$mId.advance._index";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const { session, admin } = await authenticate.admin(request);
  const configId = parseInt(params.configId ?? "");
  const mId = parseInt(params.mId ?? "");
  console.log('configID materialID', configId, mId);

  let materialComponents: MaterialAdvanceComponentType[] | null = null;

  if ( !Number.isNaN(configId)  && !Number.isNaN(mId) ) {
    materialComponents = await MaterialAdvanceComponent.getAll(session.id, configId, mId);

  }
  
  return json({materialComponents });
};

interface AdvanceMaterialProps {
  configuration: ConfigurationType;
  materialComponents: MaterialAdvanceComponentType[]
  // material: MaterialAdvance
}

export default function MaterialAdvanced({materialComponents, configuration}: AdvanceMaterialProps) {
// // export default function MaterialAdvancedIndex() {
//   let { materialComponents } = useLoaderData<typeof loader>();
//   const { configuration } = useOutletContext<{ configuration: ConfigurationType; }>();
  const params = useParams();
  const material = configuration?.data?.materials?.find((currMaterial: any,index:number) => index === parseInt(params.mId ?? ""));
  console.log(' material configuration', configuration, materialComponents)
  return (
    <div style={{width: "100%"}}>
        
      {/* <Outlet context={  {  materialComponents , material, configuration}}/> */}
      <MaterialAdvancedIndex materialComponents={materialComponents} material={material} configuration={configuration}/>

    </div>
  );
}

