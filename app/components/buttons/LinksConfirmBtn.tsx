import { BlockStack, Box, Button, InlineStack, Link } from "@shopify/polaris";

import { Modal, TitleBar, useAppBridge } from "@shopify/app-bridge-react";
import { useId } from "react";

export const LinksConfirmBtn = ({ url, title, modalTitle, asButton, children }: { url?: string; title?: any; modalTitle?: string; asButton?: boolean; children?: React.ReactNode }) => {
  
  const shopify = useAppBridge();
  const id = useId()

  return (<>
    
    {asButton ? (
      <Button variant="primary" tone="success" onClick={() => shopify.modal.show(id)}>
        {title || "Save"}
      </Button>
    ) : (
      <Link onClick={() => shopify.modal.show(id)}> {title || "Save"}</Link>
    )}
    
    <Modal variant="small" id={id}>
   
      <Box padding="400">
        <BlockStack gap="400">
          
          {children} 
          <Button onClick={() => shopify.modal.hide(id)} url={url} target="_blank" tone="success" variant="primary">Embed  Now</Button>
      </BlockStack>
                </Box>
              
      <TitleBar title={modalTitle || 'Saving confirmation'}>

                   
      
       
                    <button type="button" onClick={() => shopify.modal.hide(id)}>cancel</button>
                </TitleBar>
            </Modal>
    </> 
  );
}