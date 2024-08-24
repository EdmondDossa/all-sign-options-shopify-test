import { BlockStack, Box, Button, ButtonProps, InlineStack } from "@shopify/polaris";
import LoadingGray from "../icons/LoadingGray";
import BiSaveIcon from "../icons/BiSaveIcon";
import { Modal, TitleBar, useAppBridge } from "@shopify/app-bridge-react";
import { useId } from "react";

export const BiSaveConfirmBtn = ({ isLoading, title, modalTitle ,children }: { isLoading?: boolean; title?: string,modalTitle?:string, children?: React.ReactNode }) => {
  
  const shopify = useAppBridge();
  const id = useId()

  return (<>
    
    <button disabled={isLoading} onClick={() => shopify.modal.show(id)} className="next-large-btn" type="button">
    <Box paddingInline="1000">
      <InlineStack gap="300">
      {isLoading?<LoadingGray/> : <BiSaveIcon />}
        <span style={{ color: "white", fontWeight: "bold" }}>
          {title||'Save'}
        </span>
      </InlineStack>
    </Box>
    </button>
    
    <Modal variant="small" id={id}>
   
      <Box padding="400">
        <BlockStack gap="400">
          
                    {children} 
      </BlockStack>
                </Box>
              
                <TitleBar title={modalTitle||'Saving confirmation'}>
                    <button variant="primary" onClick={()=>{shopify.modal.hide(id)}} type="submit">{title||'Save'}</button>
                    <button type="button" onClick={() => shopify.modal.hide(id)}>cancel</button>
                </TitleBar>
            </Modal>
    </> 
  );
}