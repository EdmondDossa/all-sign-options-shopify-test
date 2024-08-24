import { BlockStack, Box, Button, ButtonProps, InlineStack, Link } from "@shopify/polaris";

import { Modal, TitleBar, useAppBridge } from "@shopify/app-bridge-react";
import { useId } from "react";

export const LinksConfirmBtn = ({ url, title, modalTitle ,children }: { url?: string; title?: any,modalTitle?:string, children?: React.ReactNode }) => {
  
  const shopify = useAppBridge();
  const id = useId()

  const  newTab =(linkUrl:string)=> {
    let newTab = document.createElement('a');
    newTab.href = `${linkUrl}`;
    newTab.target = "_blank";
    newTab.click();
}

  return (<>
    
    <Link onClick={() => shopify.modal.show(id)} > {title||'Save'}</Link>
    
    <Modal variant="small" id={id}>
   
      <Box padding="400">
        <BlockStack gap="400">
          
                    {children} 
      </BlockStack>
                </Box>
              
      <TitleBar title={modalTitle || 'Saving confirmation'}>

                   
        <button type="button" variant="primary" onClick={() => {
                      newTab(url||'');
                      shopify.modal.hide(id);
                    }}>Embed  Now</button>
                    <button type="button" onClick={() => shopify.modal.hide(id)}>cancel</button>
                </TitleBar>
            </Modal>
    </> 
  );
}