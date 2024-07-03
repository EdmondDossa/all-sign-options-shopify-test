import { Box, Button, ButtonProps, Text } from "@shopify/polaris";
import DeleteIcon from "../icons/DeleteBtnIcon";
import { Modal, TitleBar, useAppBridge } from "@shopify/app-bridge-react";
import { useId } from "react";

export const DeleteNowIconBtn = (props: ButtonProps) => {

    return (
            <Button icon={DeleteIcon} {...props} variant="tertiary" />
    );
}