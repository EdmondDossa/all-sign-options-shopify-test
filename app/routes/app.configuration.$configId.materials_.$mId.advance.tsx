

import { LoaderFunctionArgs, json } from "@remix-run/node";
import {Outlet, useLoaderData} from "@remix-run/react";
import { Page } from "@shopify/polaris";
import MaterialAdvanceComponent from "~/models/MaterialAdvanceComponent.service";
import { authenticate } from "~/shopify.server";
import { MaterialAdvanceComponentType } from "~/types/ConfigDataType";

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
  let  {materialComponents } = useLoaderData<typeof loader>();
  return (
    <Page fullWidth>
        
    <Outlet context={  {materialComponents }}/>
  </Page>
  );
}

