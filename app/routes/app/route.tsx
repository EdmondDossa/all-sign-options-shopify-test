import type { HeadersFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, Outlet, useLoaderData, useRouteError } from "@remix-run/react";
import polarisStyles from "@shopify/polaris/build/esm/styles.css";
import { boundary } from "@shopify/shopify-app-remix/server";
import { AppProvider } from "@shopify/shopify-app-remix/react";
import { authenticate } from "../../shopify.server";
import Sidebar from "~/components/layouts/Sidebar";
import appStyle from './app.css';
import { useGlobalPendingState } from "remix-utils/use-global-navigation-state";
import { useAppBridge } from "@shopify/app-bridge-react";
import { useEffect } from "react";
import SettingService from "~/models/Setting.service";

export const links = () => [{ rel: "stylesheet", href: polarisStyles }, { rel: "stylesheet", href: appStyle }];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const {session}=await authenticate.admin(request);
  // try {
  //   SettingService.addSetting(session.id, session.shop);
  //   console.log("Setting error setting_exist");

  // } catch (error) {
  //   console.log("Setting error setting_exist", error);
  // }

  return json({ apiKey: process.env.SHOPIFY_API_KEY || "" });
};

export default function App() {
  const { apiKey } = useLoaderData<typeof loader>();
  let globalState = useGlobalPendingState();
  const shopify = useAppBridge();
  useEffect(() => {
    shopify.loading(!(globalState === "idle"))
  }, [globalState])


  return (
    <AppProvider isEmbeddedApp apiKey={apiKey}>
      <ui-nav-menu>
        <Link to="/app" rel="home">
          Home
        </Link>
        <Link to="/app/configuration">List of configurations</Link>
        <Link to="/app/manage-font">Manage fonts</Link>
        <Link to="/app/manage-cliparts">Manage cliparts</Link>
        <Link to="/app/settings"> Settings Generals</Link>
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
