import {
  BlockStack,
  Box,
  Button,
  InlineError,
  InlineStack,
  Text,
  Thumbnail,
} from "@shopify/polaris";
import { FileUploader } from "~/routes/app.upload";
import uploadIcon from "~/components/icons/uploadIcon";
import { DeleteIconBtn } from "../buttons/DeleteIconBtn";

export const FileInput = ({
  title,
  error,
  helperText,
  path,
  handlePath,
  buttonTitle,
}: {
  title?: string;
  error?: string;
  helperText?: string;
  buttonTitle?: string;
  path: string;
  handlePath: Function;
}) => {
  return (
    <BlockStack gap="050">
      {title && <Text as="span"> {title} </Text>}
      <Box borderRadius="100" borderWidth="025" padding="200" >
        <InlineStack blockAlign="center" align="space-between">
          <FileUploader
            fileData={[path]}
            setFilesData={handlePath}
            title="Uplaod image file"
          >
            <Button
              icon={uploadIcon}
              size="large"
              tone="success"
              variant="primary"
            >
              {buttonTitle || title || "Upload"}
            </Button>
          </FileUploader>
          {path == "" ? (
            <Thumbnail alt="image" source={uploadIcon} size="small" />
                  ) : (
                          <InlineStack gap="100">
                               <DeleteIconBtn onClick={()=>{handlePath('')}} size="micro" />
                              <Thumbnail alt={path} source={path} size="small" />
                          </InlineStack>
          )}
        </InlineStack>
      </Box>
      {helperText && (
        <Text as="span" tone="subdued">
          {helperText}
        </Text>
      )}
        {error && (
        <InlineError message={error||""} fieldID="myFieldID" />
      )}
    </BlockStack>
  );
};
