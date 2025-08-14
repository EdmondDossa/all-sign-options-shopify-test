import { useAppBridge } from "@shopify/app-bridge-react";
import { Button, TextField, Tag, InlineStack, Box, Text } from "@shopify/polaris";
import { useState, useEffect } from "react";

export const MultiProductSelectField = ({ 
  label, 
  buttonTitle, 
  onSelectProducts, 
  selectedProducts, 
  productTitles 
}: {
  label: string;
  onSelectProducts: Function;
  selectedProducts: Array<{id: string, title: string}>;
  buttonTitle: string;
  productTitles?: string[];
}) => {
  const shopify = useAppBridge();
  const [selectedProductNames, setSelectedProductNames] = useState<string[]>(productTitles || []);

  useEffect(() => {
    if (selectedProducts && selectedProducts.length > 0) {
      setSelectedProductNames(selectedProducts.map(p => p.title));
    } else {
      setSelectedProductNames([]);
    }
  }, [selectedProducts]);

  const handleProductSelection = async () => {
    const selectionIds = selectedProducts.map(p => ({ id: p.id }));
    
    const productPicker = await shopify.resourcePicker({ 
      type: 'product',
      filter: {
        variants: false
      }, 
      action: 'select',
      multiple: true,
      selectionIds: selectionIds
    });

    if (productPicker && productPicker.length > 0) {
      const products = productPicker.map((product: any) => ({
        id: product.id,
        title: product.title
      }));
      
      onSelectProducts(products);
      setSelectedProductNames(products.map(p => p.title));
    }
  };

  const removeProduct = (index: number) => {
    const newProducts = selectedProducts.filter((_, i) => i !== index);
    onSelectProducts(newProducts);
    setSelectedProductNames(newProducts.map(p => p.title));
  };

  return (
    <Box>
      <TextField 
        prefix={
          <Button 
            variant="primary" 
            tone="success" 
            onClick={handleProductSelection}
          >
            {buttonTitle}
          </Button>
        } 
        label={label} 
        autoComplete="off" 
        value={selectedProductNames.length > 0 ? `${selectedProductNames.length} product(s) selected` : ''} 
      />
      
      {selectedProducts && selectedProducts.length > 0 && (
        <Box paddingBlockStart="200">
          <Text as="p" variant="bodySm" tone="subdued">
            Products associated with configuration:
          </Text>
          <Box paddingBlockStart="200">
            <InlineStack gap="200" wrap>
              {selectedProducts.map((product, index) => (
                <Tag key={product.id} onRemove={() => removeProduct(index)}>
                  {product.title}
                </Tag>
              ))}
            </InlineStack>
          </Box>
        </Box>
      )}
    </Box>
  );
};
