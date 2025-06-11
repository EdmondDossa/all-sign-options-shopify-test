import { LoaderFunctionArgs, json, redirect } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { MONTHLY_PRO_PLAN, MONTHLY_STARTER_PLAN, authenticate } from "~/shopify.server";
import { getPlan, subscriptionRequired } from "~/utils/pricing-server.server";



export const loader = async ({ request }: LoaderFunctionArgs) => {
    const { billing, session, admin } = await authenticate.admin(request);
    
    await subscriptionRequired(billing,session?.shop, admin);
    const plan =  await  getPlan(billing,session?.shop, admin);
  
    return json({ plan });
  
}

export default function Configuration(){
    const { plan } = useLoaderData<typeof loader>();
    return (<Outlet context={{plan}}/>)
}