import { FunctionComponent, useEffect } from "react";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { redirect, useActionData, useNavigate, useNavigation, useSubmit } from "@remix-run/react";
import {
  Page,
  Layout,
  Text,
  Card,
  Button,
  BlockStack,
  Box,
  List,
  InlineStack,
  Grid,
  LegacyCard,
  Icon,
  Divider,
  InlineGrid,
  TextField,
  EmptyState,
} from "@shopify/polaris";
import { PlusIcon } from "@shopify/polaris-icons";
import { authenticate } from "../shopify.server";
import ManageFontIcon from "~/components/icons/ManageFontIcon";
import ManageClipartsIcon from "~/components/icons/ManageClipartsIcon";
import ColorPaletteIcon from "~/components/icons/ColorPaletteIcon";
import ManageSizeIcon from "~/components/icons/ManageSizeIcon";
import ConfigurationIcon from "~/components/icons/ConfigurationIcon";
import SettingsGeneralIcon from "~/components/icons/SettingsGeneralIcon";
import MessageIcon from "~/components/icons/MessageIcon";
import Configuration from "./app.configuration";





export default function Index() {
  const navigate =  useNavigate()
  return (
    
      <EmptyState
        heading="Welcome in All Signs Options"
        action={{content: 'View configurations',onAction() {
            return  navigate('configuration')
        },}}
       
        image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
      >
        <p>Design custom signs and signage online</p>
      </EmptyState>

  );
}


