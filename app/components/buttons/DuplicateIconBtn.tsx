import {DuplicateIcon} from '@shopify/polaris-icons';
import { BlockStack, Box, Button, ButtonProps, Text, TextField } from "@shopify/polaris";
import { Modal, TitleBar, useAppBridge } from "@shopify/app-bridge-react";
import { useId } from "react";

export const DuplicateIconBtn = ({handeleDuplicate, title, handleTitle, onModalOpen}:{handeleDuplicate: Function, title: string, handleTitle: Function, onModalOpen: Function}) => {
    const shopify = useAppBridge();
    const id = useId()
    return (
        <>
            <Button size="micro" icon={DuplicateIcon} onClick={() => {
                shopify.modal.show(id)
                onModalOpen();
            }} variant="tertiary" />
            <Modal variant="small" id={id}>
                <Box padding="400">
                    <BlockStack gap="400">

                        <TextField label="Name of new configuration" value={title} onChange={(value: string) => handleTitle(value)} autoComplete='on'/>
                    </BlockStack>
                </Box>
              
                <TitleBar title="Duplicating configuration">
                    <button variant="primary" tone="default" onClick={() => {
                        handeleDuplicate()
                        shopify.modal.hide(id)
                    }}>Duplicate</button>
                    <button onClick={() => shopify.modal.hide(id)}>cancel</button>
                </TitleBar>
            </Modal>
        </>
    );
}