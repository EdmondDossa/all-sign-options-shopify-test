import { Button, ButtonProps } from "@shopify/polaris";
import ViewBtnIcon from "../icons/ViewBtnIcon";

export const ViewIconBtn = (props:ButtonProps) => {
    return (<Button icon={ViewBtnIcon} {...props} variant="tertiary"/> );
}