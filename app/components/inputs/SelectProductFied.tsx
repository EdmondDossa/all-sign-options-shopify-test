import { useAppBridge } from "@shopify/app-bridge-react";
import { Button, TextField } from "@shopify/polaris";
import { useState } from "react";

export const SelectProducField = ({ label, buttonTitle, onSelectProductID, selectProductId, productTitle }: {
    label: string;
    onSelectProductID: Function;
    selectProductId: any;
    buttonTitle: string;
    productTitle?: string;
  }) => {
    const shopify = useAppBridge();
    const [productName, setProductName] = useState<string>(productTitle ? productTitle : '');
  
    return <TextField prefix={<Button variant="primary" tone="success" onClick={async () => {
      const  productPicker = await shopify.resourcePicker({ type: 'product',filter: {
        variants: false
      } , action: 'select',selectionIds: selectProductId ? [{id:selectProductId}] : [] })
      console.log("productPicker productPicker", productPicker?.[0].id);    
      if(productPicker && productPicker?.[0].id) {
        onSelectProductID({id:productPicker?.[0].id, title:productPicker?.[0].title})
        setProductName(productPicker?.[0].title)
      }
  
    }}>{ buttonTitle}</Button>} label={label} autoComplete="off" value={productName} />
    
  }