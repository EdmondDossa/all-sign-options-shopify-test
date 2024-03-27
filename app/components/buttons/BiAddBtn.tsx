import { Box, InlineStack } from "@shopify/polaris";
import LoadingGray from "../icons/LoadingGray";
import PlusIcon from "../icons/PlusIcon";

export const BiAddBtn = ({ isLoading, title, handleClick }: { isLoading?: boolean; title?: string; handleClick?: any}) => {
    return ( <button disabled={isLoading} onClick={handleClick} className="next-large-btn" type="button">
    <Box paddingInline="300">
      <InlineStack gap="300">
      {isLoading?<LoadingGray/> : <PlusIcon />}
        <span style={{ color: "white", fontWeight: "bold" }}>
          {title||'Add'}
        </span>
      </InlineStack>
    </Box>
  </button>);
}