import { Box, Button, ButtonProps, InlineStack } from "@shopify/polaris";
import DeleteIcon from "../icons/DeleteBtnIcon";
import LoadingGray from "../icons/LoadingGray";
import BiSaveIcon from "../icons/BiSaveIcon";

export const BiSaveBtn = ({ isLoading, title }: { isLoading?: boolean;  title?:string}) => {
    return ( <button disabled={isLoading} className="next-large-btn" type="submit">
    <Box paddingInline="1000">
      <InlineStack gap="300">
      {isLoading?<LoadingGray/> : <BiSaveIcon />}
        <span style={{ color: "white", fontWeight: "bold" }}>
          {title||'Save'}
        </span>
      </InlineStack>
    </Box>
  </button>);
}