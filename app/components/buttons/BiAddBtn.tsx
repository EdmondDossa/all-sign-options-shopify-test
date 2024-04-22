import { Box, Icon, InlineStack } from "@shopify/polaris";
import LoadingGray from "../icons/LoadingGray";
import {PlusCircleIcon} from '@shopify/polaris-icons';

export const BiAddBtn = ({ isLoading, title, handleClick }: { isLoading?: boolean; title?: string; handleClick?: any}) => {
    return ( <button disabled={isLoading} onClick={handleClick} className="next-large-btn" type="button">
    <Box paddingInline="200">
        <InlineStack gap="100" blockAlign="center" align="center">
        <span style={{ color: "white", fontWeight: "bold" }}>
          
            {isLoading ? <LoadingGray /> : <Icon source={PlusCircleIcon} tone="inherit" />}
        </span>
            
        <span style={{ color: "white", fontWeight: "bold" }}>
          {title||'Add'}
        </span>
      </InlineStack>
    </Box>
  </button>);
}