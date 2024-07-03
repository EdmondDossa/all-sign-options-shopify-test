import { Button, ButtonProps } from "@shopify/polaris";
import SettingBtnIcon from "../icons/SettingBtnIcon";

export const SettingIconBtn = (props:ButtonProps) => {
    return (<Button icon={SettingBtnIcon} {...props} variant="tertiary"/> );
}