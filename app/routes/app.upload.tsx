import { Prisma } from "@prisma/client";
import { ActionFunctionArgs, LoaderFunctionArgs, NodeOnDiskFile, json, unstable_composeUploadHandlers, unstable_createFileUploadHandler, unstable_createMemoryUploadHandler, unstable_parseMultipartFormData } from "@remix-run/node";
import { Url } from "url";
import prisma from "~/db.server";
import { authenticate } from "~/shopify.server";
import {
  BlockStack,
  Box,
  Button,
  Card,
  Checkbox,
  DropZone,
  Grid,
  InlineStack,
  LegacyCard,
  LegacyStack,
  Listbox,
  Page,
  Spinner,
  Tabs,
  Text,
  Thumbnail,
  ThumbnailProps,
} from "@shopify/polaris";
import { useCallback, useEffect, useId, useMemo, useState } from "react";
import { Modal, TitleBar } from "@shopify/app-bridge-react"
import { FileIcon,TextFontIcon, PlayCircleIcon } from "@shopify/polaris-icons";
import { useFetcher } from "@remix-run/react";
import { fileUrl } from "~/utils/fileUrl";


const fileExtensions = {
  "image": [".jpg", ".jpeg", ".png", ".gif", ".webp", ".heic", ".bmp", ".tiff"],
  "icon": [".ico", ".icns",".svg"],
  "video": [".mp4", ".mov", ".avi", ".wmv", ".mkv", ".flv", ".webm"],
  "font": [".ttf", ".otf", ".woff", ".woff2"]
};

const contentTypes = ["image", "video", "font", "icon"];


export async function action({ request }: ActionFunctionArgs) {
    const { admin, session } = await authenticate.admin(request);
    const { shop } = session;
    let formData = await unstable_parseMultipartFormData(
      request,
      unstable_composeUploadHandlers(
        unstable_createFileUploadHandler({
          // Limit file upload to images
          filter({ contentType }) {
            for (const currentType of contentTypes) {
                if (contentType.includes(contentType)) {
                  return true;
                }
            }

            return false;
          },
          // Store the images in the public/img folder
          directory: "./public/uploads",
          // By default `unstable_createFileUploadHandler` add a number to the file
          // names if there's another with the same name, by disabling it we replace
          // the old file
          avoidFileConflicts: true,
          // Use the actual filename as the final filename
          file({ filename }) {
            return filename;
          },
          // Limit the max size to 10MB
          maxPartSize: 10 * 1024 * 1024,
        }),
        unstable_createMemoryUploadHandler(),
      ),
    );
  
  
  let files = formData.getAll("file") as NodeOnDiskFile[];

  let returnFiles = files.map((file) => ({ name: file.name, url: `https://${shop}/apps/aso-proxy/uploads/${file.name}`, createdAt: Date.now() }));
  
  let upload = await prisma.upload.findUnique({
    where:{shop:shop}
  })

  if (!upload) {
    upload = await prisma.upload.create({
      data: {
        shop:shop
      }
    })
  }


  let filesToSave: any[];
  
  if (upload) {
    filesToSave = upload.files as any[]
    filesToSave = [...filesToSave||[], ...returnFiles];
    upload.files = filesToSave;
   upload = await prisma.upload.update({
      where: {
        id: upload.id
      },
      data: {
        files: filesToSave
      }
    });

    console.log("upload ",upload.files);
    
  }



  console.log("file file is file ", files)
    return json({
      files: returnFiles
    });
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { admin, session } = await authenticate.admin(request);
  const { shop } = session;

  let upload = await prisma.upload.findUnique({
    where:{shop:shop}
  })

  return json({files:upload?.files||[]})
}
  

export const FileUploader = ({
  children,
  fileData,
  setFilesData,
  multiple,
  title,
  type
}: {
  title?: string;
type ?: "image" | "video" | "font" | 'icon'| "all";
  multiple?: boolean;
  setFilesData?: any;
  fileData?: string[];
  children?: React.ReactNode;
  }) => {
    const id = useId()

  
  const [fileType, setFileType] = useState(type||"all");
  const [files, setFiles] = useState<any[]>([]);
  const fileFetcher = useFetcher();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<Set<string>>(
    new Set(fileData || [])
  );
  let { submit, isUploading, images } = useFileUpload();

  useEffect(() => {
    let data: any = fileFetcher?.data;
    let newFiles = data ? [...data.files] : files;
    newFiles.sort((a, b) => b.createdAt - a.createdAt)
    newFiles = newFiles.filter((file) =>fileType=="all"? true :getFileType(file.url) == fileType);
    setFiles(newFiles);
    console.log("je suis dedans dedans");
  }, [fileFetcher,fileType]);

  useEffect(() => {
    setFiles(images.length > 0 ? [...images, ...files]: files);
  }, [images.length>0]);

  console.log("files ", files);



  const handleDropZoneDrop = useCallback(
    (_dropFiles: File[], acceptedFiles: File[], _rejectedFiles: File[]) => {
      submit(acceptedFiles);
    },
    [],
  );

  const handleSeletedFile = (url: string) => {
    let currentSelectedFiles;
    if (selectedFiles.has(url)) {
      selectedFiles.delete(url);
    } else {
      if (!multiple) {
        selectedFiles.clear();
      }
      selectedFiles.add(url);
    }

    setSelectedFiles(new Set([...selectedFiles]));
  };

  const isSelectedFile = (url: string) => {
    return selectedFiles.has(url);
  };

  const handleAllSeletedFiles = () => {
    if (typeof setFilesData == "function") {
      setFilesData(
        multiple
          ? [...selectedFiles]
          : selectedFiles.size > 0
            ? [...selectedFiles][0]
            : null,
      );
    }
      
    console.log("select files: ", selectedFiles);
    shopify.modal.hide(id);
    setIsOpen(false);
  };

  const handleCancelSelectedFiles = () => {
    setIsOpen(false);
    shopify.modal.hide(id);
  };

  const handleFileType = useCallback((value:any)=>setFileType(value),[])

  return (
    <>
      <div
        onClick={() => {
          fileFetcher.submit(null, { method: "GET", action: "/app/upload" });
          shopify.modal.show(id);
          // setIsOpen(true);
        }}
      >
        {children || <div> Upload file</div>}
      </div>
      <Modal variant="large" id={`${id}`} >
     

          <Box>
            <InlineStack wrap={false}>
              <Box
                width="200px"
                borderInlineEndWidth="025"
                borderColor="border-brand"
              >
                <BlockStack gap="200">
                  <Text
                    as="h5"
                    variant="bodyMd"
                    alignment="center"
                    fontWeight="bold"
                  >
                    Bibliothèque de la boutique
                  </Text>
                  <Box>
                    <Listbox onSelect={handleFileType} accessibilityLabel="Basic Listbox example">
                    <Listbox.Option value="all">Tous</Listbox.Option>
                      <Listbox.Option value="image">Image</Listbox.Option>
                      <Listbox.Option value="video">Video</Listbox.Option>
                      <Listbox.Option value="icon">Icon</Listbox.Option>
                      <Listbox.Option value="font">Font</Listbox.Option>
                    </Listbox>
                  </Box>
                </BlockStack>
              </Box>
              <Box paddingBlock="100" paddingInline="300" width="100%">
                <BlockStack gap="300">
                  <Box>
                    <DropZone onDrop={handleDropZoneDrop} variableHeight>
                      <DropZone.FileUpload actionHint="Ou  glisser deposer" />
                    </DropZone>
                  </Box>
                  <Box>
                    <InlineStack blockAlign="center" gap="200" wrap={true} align="start">
                      {isUploading && <Spinner accessibilityLabel="uploading image" size="large" />}
                    
                      {Array.isArray(files) &&
                        files.length > 0 &&
                        files.map((file, index) => {
                          return (
                            <div
                              onClick={() => {
                                handleSeletedFile(file.url);
                              }}
                              key={index}
                              style={{ position: "relative" }}
                            >
                              <Image name={file.name} url={fileUrl(file.url)} />
                              <div
                                style={{
                                  position: "absolute",
                                  top: "0",
                                  right: "0",
                                }}
                              >
                                <Checkbox
                                  label=""
                                  labelHidden
                                  checked={isSelectedFile(file.url)}
                                />
                              </div>
                            </div>
                          );
                        })}
                    </InlineStack>
                  </Box>
                </BlockStack>
              </Box>
            </InlineStack>
          </Box>
       
        <TitleBar title={title||"Upload file"}>
          <button type="button" variant="primary" onClick={handleAllSeletedFiles}>
            Select file
          </button>
          <button type="button"  onClick={handleCancelSelectedFiles}>Cancel</button>
        </TitleBar>
      </Modal>
    </>
  );
};

export function useFileUpload() {
  let { submit, data, state, formData } = useFetcher<any>();
  let isUploading = state !== "idle";

  let uploadingFiles = formData
    ?.getAll("file")
    ?.filter((value: unknown): value is File => value instanceof File)
    .map((file) => {
      let name = file.name;
      // This line is important, this will create an Object URL, which is a `blob:` URL string
      // We'll need this to render the image in the browser as it's being uploaded
      let url = URL.createObjectURL(file);
      return { name, url };
    });

  let images = data?.files || (uploadingFiles ?? []);

  return {
    async submit(files: File[] | null) {
      if (!files) return;
      let formData = new FormData();
      for (let file of files) formData.append("file", file);
      await submit(formData, {
        method: "POST",
        encType: "multipart/form-data",
        action: "/app/upload",
      });
    },
    isUploading,
    images
  };
}

export function Image({ name, url }: { name: string; url: string }) {
  // Here we store the object URL in a state to keep it between renders
  let [objectUrl] = useState(() => {
    if (url.startsWith("blob:")) return url;
    return undefined;
  });

  useEffect(() => {
    // If there's an objectUrl but the `url` is not a blob anymore, we revoke it
    if (objectUrl && !url?.startsWith("blob:")) URL.revokeObjectURL(objectUrl);
  }, [objectUrl, url]);
  let fileType = getFileType(url)
  if (fileType=="image" || fileType == "icon") {
    return <Thumbnail size="large" source={url} alt={name}></Thumbnail>;
  }else if (fileType=="font") {
    return <Thumbnail size="large" source={TextFontIcon} alt={name}></Thumbnail>;
  }else if (fileType=="video") {
    return <Thumbnail size="large" source={PlayCircleIcon} alt={name}></Thumbnail>;
  } else {
    return <Thumbnail size="large" source={FileIcon} alt={name}></Thumbnail>;
  }

  
}

function getFileType(filename:string) {
  let part = filename.split('.');
  let ext = `.${part.length > 1 ? part.reverse()[0] : ""}`.toLowerCase();
  
 

  for (const [fileType, extensions] of Object.entries(fileExtensions)) {
    if (extensions.includes(ext)) {
      return fileType;
    }
  }

  return null;
}


  