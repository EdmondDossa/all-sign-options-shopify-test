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
import { DeleteNowIconBtn } from "../buttons/DeleteNowIconBtn";
import { getFileType } from "~/utils/file-type";
import { FileIcon,TextFontIcon, PlayCircleIcon } from "@shopify/polaris-icons";
import { fileUrl } from "~/utils/fileUrl";


export const FileInput = ({
  title,
  type,
  error,
  helperText,
  path,
  handlePath,
  buttonTitle,
}: {
  title?: string;
  type?:  "image" | "icon" | "video" | "font" | "all" | "other";
  error?: string;
  helperText?: string;
  buttonTitle?: string;
  path: string;
  handlePath: Function;
}) => {
  return (
    <BlockStack gap="050">
      {title && <Text as="span"> {title} </Text>}
      <Box borderRadius="100" borderWidth="025" padding="025" paddingInline="100" >
        <InlineStack blockAlign="center" align="space-between">
          <FileUploader
            type={type}
            fileData={[path]}
            setFilesData={handlePath}
            title={title}
          >
            <Button
              icon={uploadIcon}
              size="micro"
              tone="success"
              variant="primary"
            >
              {buttonTitle || title || "Upload"}
            </Button>
          </FileUploader>
          {!path ? (
            <Thumbnail alt="image" source={uploadIcon} size="small" />
                  ) : (
                          <InlineStack gap="100">
                               <DeleteNowIconBtn onClick={()=>{handlePath('')}} size="micro" />
                               <MediaThumbnail url={fileUrl(path)} />
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



const  MediaThumbnail = ({ url }: { url: string }) => {
  let fileType = getFileType(url || "");
  
  if (fileType=="image" || fileType == "icon") {
    return <Thumbnail size="small" source={url} alt={'file'}></Thumbnail>;
  }else if (fileType=="font") {
    return <Thumbnail size="small" source={TextFontIcon} alt={"file"}></Thumbnail>;
  }else if (fileType=="video") {
    return <Thumbnail size="small" source={PlayCircleIcon} alt={"file"}></Thumbnail>;
  } else {
    return <Thumbnail size="small" source={FileIcon} alt={"file"}></Thumbnail>;
  }
}





