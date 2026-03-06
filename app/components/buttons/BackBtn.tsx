import { Box, InlineStack } from "@shopify/polaris";

import RayStartArrowIcon from "../icons/RayStartArrowIcon";
import { useNavigate } from "@remix-run/react";
import LoadingGray from "../icons/LoadingGray";

export const BackBtn = ({
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
  const navigate = useNavigate();
  const onBack = () => {
    if (isLoading || disabled) return;
    if (onClick) {
      onClick();
    } else {
      navigate("..");
    }
  };
  return (
    <button
      className="back-large-btn"
      type={type || "button"}
      onClick={onBack}
      disabled={Boolean(isLoading || disabled)}
    >
      <Box paddingInline="1000">
        <InlineStack gap="300">
          {isLoading ? <LoadingGray /> : <RayStartArrowIcon />}
          <span style={{ color: "black", fontWeight: "bold" }}>
            {title || "Back"}
          </span>
        </InlineStack>
      </Box>
    </button>
  );
};
