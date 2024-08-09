import { Box, Button, ButtonProps, Text } from "@shopify/polaris";
import DeleteIcon from "../icons/DeleteBtnIcon";


export const DeleteNowIconBtn = (props: ButtonProps) => {

    return (
            <Button icon={DeleteIcon} {...props} variant="tertiary" />
    );
}