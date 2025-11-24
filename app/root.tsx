import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

export default function App() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        if (!Crisp || typeof Crisp.configure !== "function") {
          return;
        }
        
        Crisp.configure("119b2249-75d7-428e-9822-47c33b453759", { autoload: true });
        
        // Désactiver le masquage automatique quand l'agent est absent
        const configureCrispSettings = () => {
          if ((window as any).$crisp && (window as any).$crisp.is) {
            Crisp.setHideOnAway(false);
          } else {
            setTimeout(configureCrispSettings, 200);
          }
        };
        
        setTimeout(configureCrispSettings, 500);
      } catch (error) {
        // Erreur silencieuse
      }
    }
  }, []);
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <link rel="preconnect" href="https://cdn.shopify.com/" />
        <link
          rel="stylesheet"
          href="https://cdn.shopify.com/static/fonts/inter/v4/styles.css"
        />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}