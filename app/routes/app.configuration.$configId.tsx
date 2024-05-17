import { LoaderFunctionArgs } from "@remix-run/node";
import { Outlet, json, useLoaderData } from "@remix-run/react";
import ConfigurationService from "~/models/Configuration.service";
import { authenticate } from "~/shopify.server";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const { session, admin } = await authenticate.admin(request);
  const configId = parseInt(params.configId ?? "");
  let configuration = await ConfigurationService.getConfiguration(configId,session.id);


  if (!Number.isNaN(configId)) {
    configuration =  await  ConfigurationService.getConfiguration(configId,session.id);
  }

  return json({ configuration });
};
  

export default function ConfigurationView() {
  const {configuration} = useLoaderData<typeof loader>();
    
  return (
    <Outlet context={{configuration}} />
  );
}