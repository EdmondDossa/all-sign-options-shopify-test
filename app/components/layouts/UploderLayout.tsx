import { FC } from "react";
import { Box, Text, InlineStack } from "@shopify/polaris";
import { FileUploader } from "~/routes/app.upload";
import { BiSaveIcon } from "../icons";
import ImageCardWithDeleteButton from "../cards/ImageCardWithDeleteButton";
import { fileUrl } from "~/utils/fileUrl";

interface UploaderLayoutProps {
  modalTitle?: string;
  label?: string;
  buttonText: string;
  fileType: "image" | "video" | "font" | "icon" | "all";
  helperText?: string;
  value: string;
  isSubmitting: boolean;
  onChange: (value: any) => void;
}

const UploaderLayout: FC<UploaderLayoutProps> = ({
  modalTitle,
  helperText,
  label,
  fileType,
  buttonText,
  value,
  isSubmitting,
  onChange,
}) => {
  return (
    <Box padding="200">
      <Box padding="150" />
      <Text as="h6" variant="bodyMd">
        {label}
      </Text>
      <Box padding="100" />
      <InlineStack gap="300">
        <FileUploader
          type={fileType}
          setFilesData={(files: any) => {
            if (files?.trim() !== "") {
              onChange(files);
            }
          }}
          title={modalTitle}
        >
          <button
            disabled={isSubmitting}
            type="button"
            className="next-large-btn"
          >
            <Box paddingInline="1000">
              <InlineStack gap="300" blockAlign="center">
                <span style={{ color: "white", fontWeight: "bold" }}>
                  {buttonText}
                </span>
                {!isSubmitting && <BiSaveIcon />}
              </InlineStack>
            </Box>
          </button>
        </FileUploader>

        <ImageCardWithDeleteButton
          imageSrc={fileUrl(value)}
          onDelete={() => onChange("")}
        />
      </InlineStack>
      <Text as="p">{helperText}</Text>
    </Box>
  );
};
export default UploaderLayout;
