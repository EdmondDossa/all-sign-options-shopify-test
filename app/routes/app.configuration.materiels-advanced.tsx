import {
    Box,
    Divider,
    InlineStack,
    Page,
    Text,
  } from "@shopify/polaris";
  
  import {Outlet} from "@remix-run/react";
  import { BoxBackground } from "~/components/layouts/BoxBackground";
  import NextLtrIcon from "~/components/icons/NextLtrIcon";
  import { Tabheader } from "~/components/layouts/TabHeader";
  

export default function Materiels(){
    
    return (<Page fullWidth>
        
        <Outlet/>
      </Page>)
}