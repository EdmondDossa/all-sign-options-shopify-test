import { Box, Button, ButtonProps, Text } from "@shopify/polaris";
import DeleteIcon from "../icons/DeleteBtnIcon";
import {
    XCircleIcon
  } from '@shopify/polaris-icons';

export const RemoveNowIconBtn = (props: ButtonProps) => {

    return (
            <Button icon={XCircleIcon} {...props} variant="tertiary" />
    );
}