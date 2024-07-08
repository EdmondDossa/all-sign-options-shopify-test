import { LoaderFunctionArgs, json, redirect } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { MONTHLY_PRO_PLAN, MONTHLY_STARTER_PLAN, authenticate } from "~/shopify.server";
import { getPlan, subscriptionRequired } from "~/utils/pricing";



export const loader = async ({ request }: LoaderFunctionArgs) => {
    const { billing } = await authenticate.admin(request);
    
    await subscriptionRequired(billing);
    const plan =  await  getPlan(billing)
  
    return json({ plan });
  
}

export default function Configuration(){
    const { plan } = useLoaderData<typeof loader>();
    return (<Outlet context={{plan}}/>)
}