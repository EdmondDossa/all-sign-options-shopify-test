import { Button, ButtonProps } from "@shopify/polaris";
import DeleteIcon from "../icons/DeleteBtnIcon";
import EditBtnIcon from "../icons/EditBtnIcon";

export const EditIconBtn = (props:ButtonProps) => {
    return (<Button icon={EditBtnIcon} {...props} variant="tertiary"/> );
}