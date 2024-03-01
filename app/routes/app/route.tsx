import type { HeadersFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, Outlet, useLoaderData, useRouteError } from "@remix-run/react";
import polarisStyles from "@shopify/polaris/build/esm/styles.css";
import { boundary } from "@shopify/shopify-app-remix/server";
import { AppProvider } from "@shopify/shopify-app-remix/react";
import { authenticate } from "../../shopify.server";
import Sidebar from "~/components/layouts/Sidebar";
import appStyle from './app.css';

export const links = () => [{ rel: "stylesheet", href: polarisStyles }, { rel: "stylesheet", href: appStyle }];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await authenticate.admin(request);

  return json({ apiKey: process.env.SHOPIFY_API_KEY || "" });
};

export default function App() {
  const { apiKey } = useLoaderData<typeof loader>();

  return (
    <AppProvider isEmbeddedApp apiKey={apiKey}>
      <ui-nav-menu>
        <Link to="/app" rel="home">
          Home
        </Link>
        <Link to="/app/additional">Additional page</Link>
        <Link to="/app/configuration/materiels">Material page</Link>
        <Link to="/app/configuration/materiels-advanced">Material Avanced</Link>
        <Link to="/app/configuration/settings">Config settings</Link>
      </ui-nav-menu>
      <div style={{ display: 'flex' }}>
        <div style={{ width:"-webkit-fill-available"}}>
        <Outlet />
        </div>
        <div style={{ width:"85px", position: "relative"}}>
          <div style={{height: '100%'}} >
          <div  style={{position: "sticky", top:0}}>
            <Sidebar/>
          </div>
          </div>
        </div>
      </div>
    </AppProvider>
  );
}

// Shopify needs Remix to catch some thrown responses, so that their headers are included in the response. .
export function ErrorBoundary() {
  return boundary.error(useRouteError());
}

export const headers: HeadersFunction = (headersArgs) => {
  return boundary.headers(headersArgs);
};
