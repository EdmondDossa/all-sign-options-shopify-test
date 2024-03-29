

import { LoaderFunctionArgs, json } from "@remix-run/node";
import {Outlet, useLoaderData, useOutletContext, useParams} from "@remix-run/react";
import { Page } from "@shopify/polaris";
import MaterialAdvanceComponent from "~/models/MaterialAdvanceComponent.service";
import { authenticate } from "~/shopify.server";
import { MaterialAdvanceComponentType } from "~/types/ConfigDataType";
import { ConfigurationType } from "~/types/ConfigurationType";

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

export default function MaterialAdvancedIndex() {
  let { materialComponents } = useLoaderData<typeof loader>();
  const { configuration } = useOutletContext<{ configuration: ConfigurationType; }>();
  const params = useParams();
  const material = configuration?.data?.materials?.find((currMaterial: any,index:number) => index === parseInt(params.mId ?? ""));
  console.log(' material configuration', configuration)
  return (
    <Page fullWidth>
        
    <Outlet context={  {materialComponents , material, configuration}}/>
  </Page>
  );
}

