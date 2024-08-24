import { Prisma } from "@prisma/client";
import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  NodeOnDiskFile,
  json,
  unstable_composeUploadHandlers,
  unstable_createFileUploadHandler,
  unstable_createMemoryUploadHandler,
  unstable_parseMultipartFormData,
} from "@remix-run/node";
import prisma from "~/db.server";
import { authenticate } from "~/shopify.server";
import {
  BlockStack,
  Box,
  Checkbox,
  DropZone,
  Grid,
  Icon,
  InlineStack,
  Listbox,
  Scrollable,
  Select,
  Spinner,
  Text,
  TextField,
  Thumbnail,
} from "@shopify/polaris";
import { useCallback, useEffect, useId, useState } from "react";
import { Modal, TitleBar } from "@shopify/app-bridge-react";
import { FileIcon, TextFontIcon, PlayCircleIcon , SearchIcon} from "@shopify/polaris-icons";
import { useFetcher } from "@remix-run/react";
import { fileUrl, getShopPath } from "~/utils/fileUrl";
import { truncateText } from "~/utils/truncate-text";

const fileExtensions = {
  image: [".jpg", ".jpeg", ".png", ".gif", ".webp", ".heic", ".bmp", ".tiff",".ico", ".icns", ".svg"],
  icon: [".ico", ".icns", ".svg"],
  video: [".mp4", ".mov", ".avi", ".wmv", ".mkv", ".flv", ".webm"],
  font: [".ttf", ".otf", ".woff", ".woff2"],
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
        directory: `./public/uploads/${getShopPath(session.id)}/files`,
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

  let returnFiles = files.map((file) => ({
    name: file.name,
    url: `https://${shop}/apps/aso-proxy/uploads/${getShopPath(session.id)}/files/${file.name}`,
    createdAt: Date.now(),
  }));

  let upload = await prisma.upload.findUnique({
    where: { shop: shop },
  });

  if (!upload) {
    upload = await prisma.upload.create({
      data: {
        shop: shop,
      },
    });
  }

  let filesToSave: any[];

  if (upload) {
    filesToSave = upload.files as any[];
    filesToSave = [...(filesToSave || []), ...returnFiles];
    upload.files = filesToSave;
    upload = await prisma.upload.update({
      where: {
        id: upload.id,
      },
      data: {
        files: filesToSave,
      },
    });

   
  }


  return json({
    files: returnFiles,
  });
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { admin, session } = await authenticate.admin(request);
  const { shop } = session;

  let upload = await prisma.upload.findUnique({
    where: { shop: shop },
  });

  return json({ files: upload?.files || [] });
};

export const FileUploader = ({
  children,
  fileData,
  setFilesData,
  multiple,
  title,
  type,
}: {
  title?: string;
  type?: "image" | "video" | "font" | "icon" | "all";
  multiple?: boolean;
  setFilesData?: any;
  fileData?: string[];
  children?: React.ReactNode;
}) => {
  const id = useId();

  const [fileType, setFileType] = useState(type || "all");
  const [searchTag, setSearchTag] = useState("");
  const [orderBy, setOrderBy] = useState("");
  let [files, setFiles] = useState<any[]>([]);
  const fileFetcher = useFetcher();
  const [isOpen, setIsOpen] = useState(false);
  let [selectedFiles, setSelectedFiles] = useState<Set<string>>(
    new Set(fileData || []),
  );
  let { submit, isUploading, images } = useFileUpload();

  useEffect(() => {
    let data: any = fileFetcher?.data;
    let newFiles = data ? [...data.files] : files;
    newFiles.sort((a, b) => b.createdAt - a.createdAt);
    newFiles = newFiles.filter((file) =>
      fileType == "all" ? true : getFileType(file.url) == fileType,
    );
    setFiles(newFiles);

  }, [fileFetcher.state, fileType]);

  useEffect(() => {
    setFiles(images.length > 0 ? [...images, ...files] : files);
  }, [images.length > 0]);



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
      let selectedFilesArr = [...selectedFiles]
        .filter((file) => type =="all" || getFileType(file) == (type || "image"));
      setFilesData(
        multiple
          ? selectedFilesArr
          : selectedFilesArr?.length > 0
            ? [...selectedFiles][0]
            : ""
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

  const handleFileType = useCallback((value: any) =>
  {
    type && type=="all" && setFileType(value)
  }
    
    , []);

  if (searchTag) {
    files = files.filter((file) => file.name.includes(searchTag));
  }

  let filesFilter = [...files];
  if (orderBy) { 
    switch (orderBy) {
      case 'DATE_ASC':
        filesFilter = filesFilter.reverse();
        break;
      case 'NAME_ASC':
        filesFilter.sort((a, b) => {
          const nameA = a.name.toUpperCase(); // ignore upper and lowercase
          const nameB = b.name.toUpperCase(); // ignore upper and lowercase
          if (nameA < nameB) {
              return -1;
          }
          if (nameA > nameB) {
              return 1;
          }
          return 0; // names must be equal
        });
        break;
      
      case 'NAME_DESC':
        filesFilter.sort((b, a) => {
          const nameA = a.name.toUpperCase(); // ignore upper and lowercase
          const nameB = b.name.toUpperCase(); // ignore upper and lowercase
          if (nameA < nameB) {
              return -1;
          }
          if (nameA > nameB) {
              return 1;
          }
          return 0; // names must be equal
        });
        break;
    
      default:
        break;
    }
  }

  const sortOptions =[
    {
      label: 'sort from Newest to Oldest',
      value: 'DATE_DESC'
    },
    {
      label: 'sort from Oldest to Newest)',
      value: 'DATE_ASC'
    },
    {
      label: 'sort A to Z',
      value:'NAME_ASC'
    },
    {
      label: 'sort Z to A',
      value: 'NAME_DESC',
    },
  ]
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
      <Modal variant="large" id={`${id}`}>
        <Box overflowY="clip">
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
                  <Listbox 
                    onSelect={handleFileType}
                    accessibilityLabel="Basic Listbox example"
                  >
                    <Listbox.Option disabled={type && type != "all" } selected={type == "all"} value="all">Tous</Listbox.Option>
                    <Listbox.Option disabled={type && type != "all" && type != "image"} selected={type == "image"}  value="image">Image</Listbox.Option>
                    <Listbox.Option disabled={type && type != "all" && type != "video"} selected={type == "video"} value="video">Video</Listbox.Option>
                    <Listbox.Option disabled={type && type != "all" && type != "icon"} selected={type == "icon"}  value="icon">Icon</Listbox.Option>
                    <Listbox.Option disabled={type && type != "all" && type != "font"} selected={type == "font"} value="font">Font</Listbox.Option>
                  </Listbox>
                </Box>
              </BlockStack>
            </Box>
            <Box paddingBlock="100" width="-webkit-fill-available">
              <Box padding='300'>
                <InlineStack gap="200" align="space-between">
                  <TextField clearButton onClearButtonClick={() => setSearchTag("")} label="search" labelHidden placeholder="search" value={searchTag} onChange={setSearchTag} prefix={<Icon source={SearchIcon} />} autoComplete="off" />
                  <Select label="sort"  labelHidden options={sortOptions} value={orderBy} onChange={setOrderBy} />
                </InlineStack>
              </Box>
              <Scrollable
                shadow
                horizontal={false}
                style={{ height: "100vh" }}
                focusable
                scrollbarGutter="stable"
                scrollbarWidth="thin"
              >
                <BlockStack gap="300">
                  <Box padding="300">
                    <DropZone onDrop={handleDropZoneDrop} variableHeight>
                      <DropZone.FileUpload actionHint="or  drag drop" />
                    </DropZone>
                  </Box>
                  <Box>
                    <Grid gap={{ lg: "10px" }}>
                      {isUploading && (
                        <Grid.Cell
                          columnSpan={{ xs: 3, sm: 2, md: 1, lg: 1, xl: 1 }}
                        >
                          <InlineStack
                            blockAlign="center"
                            gap="200"
                            wrap={true}
                            align="center"
                          >
                            <Spinner
                              accessibilityLabel="uploading image"
                              size="large"
                            />
                          </InlineStack>
                        </Grid.Cell>
                      )}

                      {Array.isArray(filesFilter) &&
                        filesFilter.length > 0 &&
                        filesFilter.map((file, index) => {
                          return (
                            <Grid.Cell
                              columnSpan={{ xs: 3, sm: 2, md: 1, lg: 1, xl: 1 }}
                            >

                              <InlineStack
                                blockAlign="center"
                                gap="200"
                                wrap={true}
                                align="center"
                              >
                                <div 
                                  onClick={() => {
                                    handleSeletedFile(file.url);
                                  }}
                                  key={index}
                                  style={{ position: "relative" }}
                                >
                                  <Image
                                    name={file.name}
                                    url={fileUrl(file.url)}
                                  />
                                  <div
                                    style={{
                                      position: "absolute",
                                      top: 5,
                                      right: 5,
                                    }}
                                  >
                                    <Checkbox
                                      label=""
                                      labelHidden
                                      checked={isSelectedFile(file.url)}
                                    />
                                  </div>
                                  </div>
                                  <Text truncate={true} breakWord={false} as="p" variant="bodyMd" >{truncateText(file.name,15)}</Text>
                              </InlineStack>
                            </Grid.Cell>
                          );
                        })}
                    </Grid>
                  </Box>
                </BlockStack>
              </Scrollable>
            </Box>
          </InlineStack>
        </Box>

        <TitleBar title={title || "Upload file"}>
          <button
            type="button"
            variant="primary"
            onClick={handleAllSeletedFiles}
          >
            Select file
          </button>
          <button type="button" onClick={handleCancelSelectedFiles}>
            Cancel
          </button>
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
    images,
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
  let fileType = getFileType(url);
  if (fileType == "image" || fileType == "icon") {
    return <Thumbnail size="large" source={url} alt={name}></Thumbnail>;
  } else if (fileType == "font") {
    return (
      <Thumbnail size="large" source={TextFontIcon} alt={name}></Thumbnail>
    );
  } else if (fileType == "video") {
    return (
      <Thumbnail size="large" source={PlayCircleIcon} alt={name}></Thumbnail>
    );
  } else {
    return <Thumbnail size="large" source={FileIcon} alt={name}></Thumbnail>;
  }
}

function getFileType(filename: string) {
  let part = filename.split(".");
  let ext = `.${part.length > 1 ? part.reverse()[0] : ""}`.toLowerCase();

  for (const [fileType, extensions] of Object.entries(fileExtensions)) {
    if (extensions.includes(ext)) {
      return fileType;
    }
  }

  return null;
}

