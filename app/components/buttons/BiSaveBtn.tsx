import { Box, InlineStack } from "@shopify/polaris";
import LoadingGray from "../icons/LoadingGray";
import BiSaveIcon from "../icons/BiSaveIcon";

export const BiSaveBtn = ({
  isLoading,
  title,
  onClick,
  type,
  disabled,
}: {
  isLoading?: boolean;
  title?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}) => {
  return (
    <button
      disabled={Boolean(isLoading || disabled)}
      className="next-large-btn"
      type={type || "submit"}
      onClick={onClick}
    >
    <Box paddingInline="1000">
      <InlineStack gap="300">
      {isLoading?<LoadingGray/> : <BiSaveIcon />}
        <span style={{ color: "white", fontWeight: "bold" }}>
          {title||'Save'}
        </span>
      </InlineStack>
    </Box>
  </button>
  );
};
