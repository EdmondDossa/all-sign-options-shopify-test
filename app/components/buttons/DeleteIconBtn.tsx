import { Button, ButtonProps } from "@shopify/polaris";
import DeleteIcon from "../icons/DeleteBtnIcon";

export const DeleteIconBtn = (props:ButtonProps) => {
    return (<Button icon={DeleteIcon} {...props} variant="tertiary"/> );
}