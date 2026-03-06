import { Box, InlineStack } from "@shopify/polaris";
import { PlusIcon } from "../icons";

const AddBtn = ({
  onClick,
  className,
  children,
}: {
  children: React.ReactNode;
  className: string;
  onClick: () => void;
}) => {
  return (
    <>
      <button className={`${className ?? ""}`} type="button" onClick={onClick}>
        <Box paddingInline="300">
          <InlineStack gap="300">
            <PlusIcon />
            {children}
          </InlineStack>
        </Box>
      </button>
    </>
  );
};

export default AddBtn;
