import { Box, Button, ButtonProps, InlineStack } from "@shopify/polaris";

import RayStartArrowIcon from "../icons/RayStartArrowIcon";
import { useNavigate } from "@remix-run/react";
import LoadingGray from "../icons/LoadingGray";

export const BackBtn = ({ isLoading, title }: { isLoading?: boolean; title?: string }) => {
  const navigate = useNavigate();
  const onBack = () => {
    navigate("..");
  };
    return (  <button 
      className="back-large-btn"
      type="button"
      onClick={onBack}
    >
      <Box paddingInline="1000">
        <InlineStack gap="300">
        
          {isLoading?<LoadingGray/> :  <RayStartArrowIcon />}
          <span style={{ color: "black", fontWeight: "bold" }}>
            {title||'Back'}
          </span>
        </InlineStack>
      </Box>
    </button>);
}