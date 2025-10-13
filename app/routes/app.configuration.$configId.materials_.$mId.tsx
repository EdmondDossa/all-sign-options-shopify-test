import { LoaderFunctionArgs } from "@remix-run/node";
import { Outlet, json, useLoaderData } from "@remix-run/react";
import ConfigurationService from "~/models/Configuration.service";
import { authenticate } from "~/shopify.server";
import { getPlan } from "~/utils/pricing-server.server";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const {billing, session, admin } = await authenticate.admin(request);
  const configId = parseInt(params.configId ?? "");
  let configuration = await ConfigurationService.getConfiguration(
    configId,
    session.id,
  );

  if (!Number.isNaN(configId)) {
    configuration = await ConfigurationService.getConfiguration(
      configId,
      session.id,
    );
  }
  let plan = await getPlan(billing,session?.shop, admin);
  let sessionId = session.id

  return json({ configuration, plan, configId, sessionId });
};

export default function Materiels() {
  const { configuration, plan, configId, sessionId } = useLoaderData<typeof loader>();
  return <Outlet context={{ configuration, plan, configId, sessionId }} />;
}
