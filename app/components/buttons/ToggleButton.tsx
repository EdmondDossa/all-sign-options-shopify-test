import { Box, Button, ButtonProps, Text } from "@shopify/polaris";
import DeleteIcon from "../icons/DeleteBtnIcon";
import {
  CircleChevronUpIcon,CircleChevronDownIcon
  } from '@shopify/polaris-icons';

export const ToggleButton = ({buttonProps,open}:{buttonProps:ButtonProps, open:boolean}) => {

    return (
            <Button icon={open? CircleChevronUpIcon:CircleChevronDownIcon} {...buttonProps}  />
    );
}