import { Box, Button, ButtonProps, Text } from "@shopify/polaris";
import DeleteIcon from "../icons/DeleteBtnIcon";
import { Modal, TitleBar, useAppBridge } from "@shopify/app-bridge-react";
import { useId } from "react";

export const DeleteIconBtn = (props: ButtonProps) => {
    const shopify = useAppBridge();
    const id = useId()
    return (
        <>
            <Button icon={DeleteIcon} {...props} onClick={() => shopify.modal.show(id)} variant="tertiary" />
            <Modal variant="small" id={id}>
                <Box padding="400">
                    <Text alignment="center" as="h3" variant="bodyMd">Are you sure you want to delete this item? This action cannot be undone</Text>
                </Box>
              
                <TitleBar title="Confirm deletion">
                    <button variant="primary" tone="critical" onClick={(e) => {
                        e.preventDefault();
                        if (props.onClick) {
                            props.onClick();
                        }
                        shopify.modal.hide(id)
                    }}>Delete</button>
                    <button onClick={() => shopify.modal.hide(id)}>cancel</button>
                </TitleBar>
            </Modal>
        </>
    );
}