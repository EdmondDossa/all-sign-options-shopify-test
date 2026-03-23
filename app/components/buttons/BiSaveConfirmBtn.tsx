import { BlockStack, Box, InlineStack } from "@shopify/polaris";
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
                    <button
                      variant="primary"
                      onClick={()=>{shopify.modal.hide(id)}}
                      type="submit"
                      style={{
                        backgroundColor: "rgb(1, 100, 100)",
                        color: "white",
                        border: "none",
                        padding: "8px 16px",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }}
                    >
                      {title||'Save'}
                    </button>
                    <button
                      type="button"
                      onClick={() => shopify.modal.hide(id)}
                      style={{
                        backgroundColor: "transparent",
                        border: "1px solid #D1D5DB",
                        padding: "8px 16px",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }}
                    >
                      cancel
                    </button>
                </TitleBar>
            </Modal>
    </> 
  );
}
