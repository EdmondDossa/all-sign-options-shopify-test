import type { HeadersFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, Outlet, useLoaderData, useMatches, useNavigate, useRouteError } from "@remix-run/react";
import '@shopify/polaris/build/esm/styles.css';
import { boundary } from "@shopify/shopify-app-remix/server";
import { AppProvider } from "@shopify/shopify-app-remix/react";
import { authenticate } from "../../shopify.server";
import Sidebar from "~/components/layouts/Sidebar";
import './app.css';
import { useGlobalPendingState } from "remix-utils/use-global-navigation-state";
import { useAppBridge } from "@shopify/app-bridge-react";
import { useEffect, useState } from "react";
import { ViewIconBtn } from "~/components/buttons/ViewIconBtn";
import { version } from "package.json";
import { handleSession } from "~/utils/handle-session.server";

import { useLocation } from "react-router-dom"; // ou "@remix-run/react"


export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { session , admin}: any = await authenticate.admin(request);

  handleSession(session).then().catch();


  
  return json({ apiKey: process.env.SHOPIFY_API_KEY || "" , });
};




export default function App() {
  const { apiKey } = useLoaderData<typeof loader>();
  let globalState = useGlobalPendingState();

  const location = useLocation();
  // const hiddenRoutes = ["/app", "/app/configuration", "/app/configuration/create", "/app/manage-font", "/app/manage-font/edit", "/app/manage-cliparts", "/app/manage-cliparts/edit", "/app/settings/output", "/app/settings/shape", "/app/settings/fixing-method", "/app/settings/border", "/app/pricing", "/app/templates/main", "/app/templates/main/edit", "/app/templates/categories"]; // les routes où on ne veut pas afficher
  
  // const isHidden = hiddenRoutes.includes(location.pathname);
  
  const hiddenRoutesRegex = [
    /^\/app$/, 
    /^\/app\/configuration(\/create)?$/,
    /^\/app\/configuration\/[^/]+\/(builder|required-options|additional-options|settings|design-setup|templates)(\/.*)?$/,
    /^\/app\/configuration\/[^/]+\/preview$/,
    /^\/app\/ncpc(\/.*)?$/,
    /^\/app\/manage-font(\/edit)?$/,
    /^\/app\/manage-cliparts(\/.*)?$/, // match tout ce qui suit
    /^\/app\/settings\/(output|shape|fixing-method|border)$/,
    /^\/app\/settings\/(output|shape|fixing-method|border)(\/.*)$/,
    /^\/app\/pricing$/,
    /^\/app\/templates\/main(\/edit)?$/,
    /^\/app\/templates\/categories$/
  ];
  function isHiddenRoute(pathname: string) {
    return hiddenRoutesRegex.some(regex => regex.test(pathname));
  }
  

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
        <Link to="/app/templates">Templates</Link>
        <Link to="/app/manage-font">Manage fonts</Link>
        <Link to="/app/manage-cliparts">Manage cliparts</Link>
        <Link to="/app/settings"> global settings</Link>
        <Link to="/app/pricing"> Pricing</Link>
      </ui-nav-menu>
      {/* {!isHidden && ( */}
      {!isHiddenRoute(location.pathname) && (

        <HeaderTopMenu />
      )}
      <div className="content-sidebar-wrapper">
       
        <div className="app-content" 
          style={{
            marginTop: !isHiddenRoute(location.pathname) ? '1.6rem' : '0rem'
          }}
        >
          <Outlet />
        </div>
        {/* <div className="sidebar-sticky" >
          <div style={{height: '100%'}} >
          <div  style={{position: "fixed", top:0, height:"4000px"}}>
            <Sidebar/>
          </div>
          </div>
        </div> */}
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



const HeaderTopMenu = () => {

  const [currentTopMenu, setCurrentTopMenu] = useState("");
  let [configId, setConfigId] = useState('');
  let [configName, setConfigName] = useState('');
  const [isNcpcConfiguration, setIsNcpcConfiguration] = useState(false);
  

  const matches = useMatches();
  const navigate = useNavigate();
  const location = useLocation();

  const normalizeProductType = (value?: string | null) =>
    String(value || "")
      .trim()
      .toLowerCase();

  const parseConfigData = (rawData: any) => {
    if (!rawData) return null;
    if (typeof rawData === "string") {
      try {
        const parsed = JSON.parse(rawData);
        return parsed && typeof parsed === "object" ? parsed : null;
      } catch {
        return null;
      }
    }
    return typeof rawData === "object" ? rawData : null;
  };

  const detectNcpcFromConfiguration = (configuration: any) => {
    const productType = normalizeProductType(configuration?.productType);
    if (productType === "neon" || productType === "channel") {
      return true;
    }

    const data = parseConfigData(configuration?.data);
    const dataProductType = normalizeProductType(data?.productType);
    if (dataProductType === "neon" || dataProductType === "channel") {
      return true;
    }

    const wrappedNcpcData = parseConfigData(data?.ncpc);
    const wrappedProductType = normalizeProductType(wrappedNcpcData?.productType);
    if (wrappedProductType === "neon" || wrappedProductType === "channel") {
      return true;
    }
    return false;
  };



  
  useEffect(() => {
    let newConfigId = "";
    let newConfigName = "";
    let newCurrentTopMenu = "";
    let newIsNcpcConfiguration = location.pathname.includes("/app/ncpc/");

    for (const match of matches) {
      if (match.params.configId) {
        newConfigId = match.params.configId;
      }
      if (match.data && (match.data as any)?.configuration?.name != undefined) {
        newConfigName = (match.data as any).configuration.name;
      }

      if (match.data && (match.data as any)?.configuration) {
        newIsNcpcConfiguration =
          newIsNcpcConfiguration ||
          detectNcpcFromConfiguration((match.data as any).configuration);
      }
    }

    if (newIsNcpcConfiguration) {
      if (location.pathname.includes("/required-options")) {
        newCurrentTopMenu = "required-options";
      } else if (location.pathname.includes("/additional-options")) {
        newCurrentTopMenu = "additional-options";
      } else if (location.pathname.includes("/settings")) {
        newCurrentTopMenu = "settings";
      }
    } else {
      if (location.pathname.includes("/materials")) {
        newCurrentTopMenu = "materials";
      } else if (location.pathname.includes("/addditonal-options")) {
        newCurrentTopMenu = "addditonal-options";
      } else if (location.pathname.includes("/settings")) {
        newCurrentTopMenu = "settings";
      }
    }

    setConfigId(newConfigId);
    setConfigName(newConfigName);
    setIsNcpcConfiguration(newIsNcpcConfiguration);
    setCurrentTopMenu(newCurrentTopMenu);
  }, [matches, location.pathname]);



  const normalizeConfigId = (value: string) => {
    const normalized = String(value || "").trim();
    return /^\d+$/.test(normalized) ? normalized : "";
  };

  const navigateToMenu = (path: string, configId: string) => {
    const safeConfigId = normalizeConfigId(configId);
    if (!safeConfigId) return;
    const search = location.search || "";

    const normalizedPath = String(path || "").trim().toLowerCase();

    if (isNcpcConfiguration) {
      const allowedNcpcPaths = new Set([
        "required-options",
        "additional-options",
        "settings",
      ]);
      const safePath = allowedNcpcPaths.has(normalizedPath)
        ? normalizedPath
        : "required-options";
      navigate(`/app/ncpc/${safeConfigId}/${safePath}${search}`);
      return;
    }

    const allowedClassicPaths = new Set(["materials", "addditonal-options", "settings"]);
    const safePath = allowedClassicPaths.has(normalizedPath)
      ? normalizedPath
      : "materials";
    navigate(`/app/configuration/${safeConfigId}/${safePath}${search}`);
  }

  const handlePreviews = (id: number) => {
    const returnTo = encodeURIComponent(`${location.pathname}${location.search || ""}`);
    navigate(`/app/configuration/${id}/preview?returnTo=${returnTo}`);
  };



  return (
    <div>
      <div className="topbar-aso" >
        {
          configId && <>
            <div onClick={()=> navigate(`/app/configuration${location.search || ""}`)} style={{
              display: 'flex',
              justifyContent: "center",
              alignItems: "center",
              gap: "6px",
              cursor: "pointer"
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" style={{
                width: "1.2rem",
                height: "1.2rem"
              }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
              </svg>
              <p style={{
                fontSize: '16px',
                fontWeight: 'bold'
              }}>
                {configName}
              </p>
              <p></p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'center' }} >
            


                  <span className="aso-config-id">{configId} ID</span>
                    
                    
                  {!isNcpcConfiguration && currentTopMenu != "materials" && <button onClick={() => navigateToMenu("materials", configId)} className="aso-material-btn" >
                    <svg width="18" height="17" viewBox="0 0 21 19" fill="none" xmlns="http://www.w3.org/2000/svg" ><path d="M1.6851 16.9L2.96826 17.46V8.43L0.641333 14.29C0.248724 15.31 0.698788 16.48 1.6851 16.9ZM20.3579 13.2L15.6083 1.25C15.468 0.887546 15.2291 0.575978 14.9211 0.353818C14.613 0.131658 14.2494 0.00864917 13.8751 0C13.6261 0 13.3676 0.0400001 13.1186 0.15L6.06125 3.2C5.72062 3.35096 5.42861 3.60077 5.21984 3.91982C5.01107 4.23886 4.89432 4.61375 4.88342 5C4.87384 5.25 4.92172 5.54 5.00791 5.8L9.79582 17.75C10.0735 18.53 10.7821 18.99 11.529 19C11.778 19 12.027 18.95 12.2664 18.85L19.3142 15.8C19.7827 15.5997 20.1558 15.2132 20.3515 14.7257C20.5472 14.2381 20.5496 13.6893 20.3579 13.2ZM6.80816 6C6.55419 6 6.31063 5.89464 6.13105 5.70711C5.95147 5.51957 5.85058 5.26522 5.85058 5C5.85058 4.73478 5.95147 4.48043 6.13105 4.29289C6.31063 4.10536 6.55419 4 6.80816 4C7.33483 4 7.76574 4.45 7.76574 5C7.76574 5.55 7.33483 6 6.80816 6ZM4.893 17C4.893 17.5304 5.09477 18.0391 5.45393 18.4142C5.8131 18.7893 6.30023 19 6.80816 19H8.19665L4.893 10.66V17Z" fill="currentColor"></path></svg>
                    <span>Material</span>
                  </button>}
                  {isNcpcConfiguration && currentTopMenu != "required-options" && <button onClick={() => navigateToMenu("required-options", configId)} className="aso-material-btn" >
                    <svg width="18" height="17" viewBox="0 0 21 19" fill="none" xmlns="http://www.w3.org/2000/svg" ><path d="M1.6851 16.9L2.96826 17.46V8.43L0.641333 14.29C0.248724 15.31 0.698788 16.48 1.6851 16.9ZM20.3579 13.2L15.6083 1.25C15.468 0.887546 15.2291 0.575978 14.9211 0.353818C14.613 0.131658 14.2494 0.00864917 13.8751 0C13.6261 0 13.3676 0.0400001 13.1186 0.15L6.06125 3.2C5.72062 3.35096 5.42861 3.60077 5.21984 3.91982C5.01107 4.23886 4.89432 4.61375 4.88342 5C4.87384 5.25 4.92172 5.54 5.00791 5.8L9.79582 17.75C10.0735 18.53 10.7821 18.99 11.529 19C11.778 19 12.027 18.95 12.2664 18.85L19.3142 15.8C19.7827 15.5997 20.1558 15.2132 20.3515 14.7257C20.5472 14.2381 20.5496 13.6893 20.3579 13.2ZM6.80816 6C6.55419 6 6.31063 5.89464 6.13105 5.70711C5.95147 5.51957 5.85058 5.26522 5.85058 5C5.85058 4.73478 5.95147 4.48043 6.13105 4.29289C6.31063 4.10536 6.55419 4 6.80816 4C7.33483 4 7.76574 4.45 7.76574 5C7.76574 5.55 7.33483 6 6.80816 6ZM4.893 17C4.893 17.5304 5.09477 18.0391 5.45393 18.4142C5.8131 18.7893 6.30023 19 6.80816 19H8.19665L4.893 10.66V17Z" fill="currentColor"></path></svg>
                    <span>Required</span>
                  </button>}
                  {currentTopMenu != "settings" && <button onClick={() => navigateToMenu("settings", configId)} className="aso-setting-btn" >
                    <svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg" >
                      <path d="M16.9583 13.0417C16.9583 12.8675 16.9333 12.7092 16.9083 12.5429L17.6083 11.965C17.7583 11.8383 17.7917 11.6325 17.6917 11.4662L17.2 10.6587C17.1529 10.5792 17.0777 10.5181 16.9877 10.4863C16.8977 10.4544 16.7987 10.4538 16.7083 10.4846L15.825 10.7696C15.5583 10.5558 15.2583 10.3896 14.925 10.2708L14.7417 9.40792C14.722 9.31871 14.6708 9.23861 14.5964 9.18098C14.5221 9.12334 14.4293 9.09167 14.3333 9.09125H13.35C13.15 9.09125 12.9833 9.22583 12.9417 9.40792L12.7583 10.2708C12.425 10.3896 12.125 10.5558 11.8583 10.7696L10.975 10.4846C10.8845 10.4551 10.786 10.4563 10.6963 10.488C10.6067 10.5198 10.5314 10.5801 10.4833 10.6587L9.99167 11.4662C9.89167 11.6325 9.925 11.8383 10.075 11.965L10.775 12.5429C10.75 12.7092 10.725 12.8675 10.725 13.0417C10.725 13.2158 10.75 13.3742 10.775 13.5404L10.075 14.1183C9.925 14.245 9.89167 14.4508 9.99167 14.6171L10.4833 15.4246C10.5833 15.5908 10.7917 15.6621 10.975 15.5987L11.8583 15.3137C12.125 15.5275 12.425 15.6937 12.7583 15.8125L12.9417 16.6754C12.9833 16.8575 13.15 16.9921 13.35 16.9921H14.3333C14.5333 16.9921 14.7 16.8575 14.7417 16.6754L14.925 15.8125C15.2583 15.6937 15.5583 15.5275 15.825 15.3137L16.7083 15.5987C16.9 15.6621 17.1 15.5829 17.2 15.4246L17.6917 14.6171C17.7917 14.4508 17.7583 14.245 17.6083 14.1183L16.9083 13.5404C16.9333 13.3742 16.9583 13.2158 16.9583 13.0417ZM13.8333 14.625C12.9167 14.625 12.1667 13.9125 12.1667 13.0417C12.1667 12.1708 12.9167 11.4583 13.8333 11.4583C14.75 11.4583 15.5 12.1708 15.5 13.0417C15.5 13.9125 14.75 14.625 13.8333 14.625ZM8 3.54167C7.54167 3.54167 7.16667 3.89792 7.16667 4.33333V7.5C7.16667 7.71375 7.25833 7.91167 7.40833 8.06208L9.13333 9.70083L10 8.28375L8.83333 7.17542V4.33333C8.83333 3.89792 8.45833 3.54167 8 3.54167ZM1.55 8.29167C1.00833 8.29167 0.6 8.77458 0.733333 9.27333C1.56667 12.3529 4.5 14.625 8 14.625H8.05833L7.05 12.9704C5.93235 12.7935 4.89297 12.3117 4.05848 11.5836C3.22398 10.8555 2.63039 9.9125 2.35 8.86958C2.30409 8.70203 2.20027 8.55399 2.0552 8.44919C1.91014 8.34439 1.73222 8.28892 1.55 8.29167ZM1.33333 5.91667C0.875 5.91667 0.5 5.56042 0.5 5.125V1.95833C0.5 1.52292 0.875 1.16667 1.33333 1.16667C1.79167 1.16667 2.16667 1.52292 2.16667 1.95833V3.035C3.54167 1.42 5.64167 0.375 8 0.375C9.98912 0.375 11.8968 1.12567 13.3033 2.46186C14.7098 3.79806 15.5 5.61033 15.5 7.5H13.8333C13.8333 4.44417 11.2167 1.95833 8 1.95833C7.06042 1.95958 6.13501 2.17612 5.3023 2.58957C4.46959 3.00302 3.75415 3.60119 3.21667 4.33333H4.66667C5.125 4.33333 5.5 4.68958 5.5 5.125C5.5 5.56042 5.125 5.91667 4.66667 5.91667H1.33333Z" fill="currentColor"></path></svg>
                    <span className="">Setting</span>
                  </button>}
                  {!isNcpcConfiguration && currentTopMenu != "addditonal-options" && <button onClick={() => navigateToMenu("addditonal-options", configId)} className="aso-additonal-btn" >
                    <svg width="18" height="18" viewBox="0 0 26 28" fill="#f0bb1b" xmlns="http://www.w3.org/2000/svg"><path d="M25 4H1M25 14H1M25 24H1M21 1V7M5 11V17M17 21V27" stroke="#f0bb1b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                    <span className="additonal-options-text">Additionals options</span>
                  </button>}
                  {isNcpcConfiguration && currentTopMenu != "additional-options" && <button onClick={() => navigateToMenu("additional-options", configId)} className="aso-additonal-btn" >
                    <svg width="18" height="18" viewBox="0 0 26 28" fill="#f0bb1b" xmlns="http://www.w3.org/2000/svg"><path d="M25 4H1M25 14H1M25 24H1M21 1V7M5 11V17M17 21V27" stroke="#f0bb1b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                    <span className="additonal-options-text">Additional options</span>
                  </button>}

                  <button className="aso-preview-btn" onClick={() => { handlePreviews(parseInt(configId)); }}>Preview</button>

            
            </div>
          </>
        }
        {/* <img className="aso-logo"
          src={'/aso_logo.png'}
          alt={"All Signs Customizer"}
        /> */}
        {/* <div className="version-style">
          V{version}
        </div> */}
      </div>
    </div>
  );
}
