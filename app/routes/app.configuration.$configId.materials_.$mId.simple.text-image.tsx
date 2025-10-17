// import { Box, Divider, Grid, InlineStack, Text } from "@shopify/polaris";
// import { useEffect, useState } from "react";
// import {
//   Form,
//   useActionData,
//   useFetcher,
//   useLoaderData,
//   useNavigation,
//   useParams,
//   useSubmit,
// } from "@remix-run/react";
// import { BoxBackground } from "~/components/layouts/BoxBackground";
// import { SpacingBackground } from "~/components/layouts/SpacingBackground";

// import { ActionFunctionArgs, LoaderFunctionArgs, json } from "@remix-run/node";
// import { authenticate } from "~/shopify.server";
// import { ConfigTextImages } from "~/types/ConfigDataType";

// import MaterialTextImageService from "~/models/MaterialTextImage.service";
// import useHandleFlashMessage from "~/hooks/useHandleFlashMessage";
// import { ReactSwitchCustom } from "~/components/inputs/ReactSwitchCustom";
// import { BiSaveBtn } from "~/components/buttons/BiSaveBtn";
// import { parseWithZod } from "@conform-to/zod";
// import { z } from "zod";
// import { jFlashMessage } from "~/utils/message-flash";
// import { booleanTransform } from "~/utils/transfomerZod";

// export const loader = async ({ request, params }: LoaderFunctionArgs) => {
//   const { session, admin } = await authenticate.admin(request);
//   const configId = parseInt(params.configId ?? "");
//   const mId = parseInt(params.mId ?? "");

//   let textImages: ConfigTextImages | null = null;

//   if (!Number.isNaN(configId) && !Number.isNaN(mId)) {
//     textImages = await MaterialTextImageService.get(session.id, configId, mId);
//   }

//   return json({ textImages });
// };

// interface MaterialTextImageProps {
//   textImages: ConfigTextImages,
//   materialId: number | undefined
// }

// export default function MaterialTextImage( {textImages, materialId}: MaterialTextImageProps) {
//   const submit = useSubmit();
//   const params = useParams();
//   const textImageFetcher = useFetcher() as any;

//   useHandleFlashMessage();

//   const navigation = useNavigation();
//   let isLoading = navigation.state == "loading";
//   let isSubmitting = textImageFetcher.state == "submitting";

//   const [formData, setFormData] = useState<ConfigTextImages>(
//     textImages
//       ? (textImages as ConfigTextImages)
//       : {
//           enableText: true,
//           enableImage: false,
//           enableQrCode:false,
//         },
//   );

//   const handleEnableText = (value: boolean) =>
//     setFormData({ ...formData, enableText: value });
//   const handleEnableImages = (value: boolean) =>
//     setFormData({ ...formData, enableImage: value });
//   const handleEnableQrCode = (value: boolean) =>
//     setFormData({ ...formData, enableQrCode: value });

//   const handleSubmit = async (e: any) => {
//     e.preventDefault();

//     // submit({ ...formData }, { method: "POST" });
//     try{
//       const configId = parseInt(params.configId ?? "");
//       const finalMaterialId = materialId ?? 0;
  
//       const requestBody = {
//           operation: 'edit',
//           configId: configId.toString(),
//           materialId: finalMaterialId.toString(),
//           textImage: { ...formData }
//         }
  
//       textImageFetcher.submit(JSON.stringify(requestBody),
//         {
//           method: "POST",
//           action: "/api/text-image-manager"
//         }
//       );
//       console.log(textImages, "azerty", formData, textImageFetcher)

//     }catch{

//     }

//   };


//   useEffect(() => {
//       if (textImageFetcher.data?.success && textImageFetcher.data?.data) {
//         console.log("Bulk update successful, updating local state", textImageFetcher);
//         textImages = textImageFetcher.data.data;
//       }
//     }, [textImageFetcher.data]);

//   return (
//     <div>
//       <SpacingBackground width="100%" height="auto" margin="16px 0px ">
//         <BoxBackground>
//           <Form onSubmit={handleSubmit} method="POST">
//             <Box paddingInline="300" paddingBlock="1000">
//               <Grid gap={{ lg: "30px" }}>
//                 <Grid.Cell columnSpan={{ xs: 2, sm: 2, md: 2, lg: 4, xl: 4 }}>
//                   <InlineStack blockAlign="center" gap="200">
//                     <Text as="strong" variant="headingMd">
//                       Enable Text
//                     </Text>
//                     <ReactSwitchCustom
//                       checked={formData.enableText}
//                       setChecked={handleEnableText}
//                     />
//                   </InlineStack>
//                 </Grid.Cell>
//                 <Grid.Cell columnSpan={{ xs: 2, sm: 2, md: 2, lg: 4, xl: 4 }}>
//                   <InlineStack blockAlign="center" gap="200">
//                     <Text as="strong" variant="headingMd">
//                       Enable Image
//                     </Text>
//                     <ReactSwitchCustom
//                       checked={formData.enableImage}
//                       setChecked={handleEnableImages}
//                     />
//                   </InlineStack>
//                 </Grid.Cell>
//                 <Grid.Cell columnSpan={{ xs: 2, sm: 2, md: 2, lg: 4, xl: 4 }}>
//                   <InlineStack blockAlign="center" gap="200">
//                     <Text as="strong" variant="headingMd">
//                       Enable QR Code
//                     </Text>
//                     <ReactSwitchCustom
//                       checked={formData.enableQrCode}
//                       setChecked={handleEnableQrCode}
//                     />
//                   </InlineStack>
//                 </Grid.Cell>
//               </Grid>
//             </Box>
//             <Divider borderWidth="050" />
//             <Box paddingInline="300" paddingBlock="300">
//               <InlineStack align="end" gap="600">
//                 <BiSaveBtn isLoading={isSubmitting} title="Save" />
//               </InlineStack>
//             </Box>
//           </Form>
//         </BoxBackground>
//       </SpacingBackground>
//     </div>
//   );
// }

// const formSchema = z.object({
//   enableText: z.any().transform(booleanTransform),
//   enableImage: z.any().transform(booleanTransform),
//   enableQrCode: z.any().transform(booleanTransform),
// });


import { Box, Card, Divider, Grid, InlineStack, Text } from "@shopify/polaris";
import { useEffect, useState } from "react";
import {
  Form,
  useFetcher,
  useNavigation,
  useParams,
} from "@remix-run/react";

import { BoxBackground } from "~/components/layouts/BoxBackground";
import { SpacingBackground } from "~/components/layouts/SpacingBackground";
import { ConfigTextImages } from "~/types/ConfigDataType";
import useHandleFlashMessage from "~/hooks/useHandleFlashMessage";
import { ReactSwitchCustom } from "~/components/inputs/ReactSwitchCustom";
import { BiSaveBtn } from "~/components/buttons/BiSaveBtn";

interface MaterialTextImageProps {
  textImages: ConfigTextImages;
  materialId: number | undefined;
}

export default function MaterialTextImage({ textImages, materialId }: MaterialTextImageProps) {
  const params = useParams();
  const textImageFetcher = useFetcher() as any;
  useHandleFlashMessage();

  const isSubmitting = textImageFetcher.state === "submitting";

  const [formData, setFormData] = useState<ConfigTextImages>(
    textImages ? {
      enableText: textImages.enableText,
      enableImage: textImages.enableImage,
      enableQrCode: textImages.enableQrCode ? textImages.enableQrCode : false,
    } : {
      enableText: true,
      enableImage: false,
      enableQrCode: false,
    }
  );

  useEffect(() => {
    if (textImages) {
      setFormData({
        enableText: textImages.enableText,
        enableImage: textImages.enableImage,
        enableQrCode: textImages.enableQrCode ?? false,
      });
    }
  }, [textImages, materialId]);


  const handleEnableText = (value: boolean) => {
    setFormData({ ...formData, enableText: value })
  };
  const handleEnableImages = (value: boolean) => {
    setFormData({ ...formData, enableImage: value })
  };
  const handleEnableQrCode = (value: boolean) => {
    setFormData({ ...formData, enableQrCode: value })
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const configId = params.configId ?? "";
    const finalMaterialId = materialId ?? 0;

    const requestBody = {
      operation: 'edit',
      configId: configId,
      materialId: finalMaterialId,
      textImage: {
        enableText: formData.enableText,
        enableImage: formData.enableImage,
        enableQrCode: formData.enableQrCode,
      }
    }

    textImageFetcher.submit(requestBody, {
      method: "POST",
      action: "/api/text-image-manager",
      encType: "application/json",
    });
  };

  useEffect(() => {
    if (textImageFetcher.data?.success && textImageFetcher.data?.data) {
      const updated = textImageFetcher.data.data;
      setFormData(updated); // mise à jour locale du formulaire
    }
  }, [textImageFetcher.data]);

  return (
    <div>
      <div style={{width:"100%" ,height:"auto" ,margin:"0px 0px "}}>
        <Card>
          <Form onSubmit={handleSubmit} method="POST">
            <Box paddingInline="300" paddingBlock="1000">
              <Grid gap={{ lg: "30px" }}>
                <Grid.Cell columnSpan={{ xs: 2, sm: 2, md: 2, lg: 4, xl: 4 }}>
                  <InlineStack blockAlign="center" gap="200">
                    <Text as="strong" variant="headingMd">
                      Enable Text
                    </Text>
                    <ReactSwitchCustom
                      checked={formData.enableText}
                      setChecked={handleEnableText}
                    />
                  </InlineStack>
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 2, sm: 2, md: 2, lg: 4, xl: 4 }}>
                  <InlineStack blockAlign="center" gap="200">
                    <Text as="strong" variant="headingMd">
                      Enable Image
                    </Text>
                    <ReactSwitchCustom
                      checked={formData.enableImage}
                      setChecked={handleEnableImages}
                    />
                  </InlineStack>
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 2, sm: 2, md: 2, lg: 4, xl: 4 }}>
                  <InlineStack blockAlign="center" gap="200">
                    <Text as="strong" variant="headingMd">
                      Enable QR Code
                    </Text>
                    <ReactSwitchCustom
                      checked={formData.enableQrCode}
                      setChecked={handleEnableQrCode}
                    />
                  </InlineStack>
                </Grid.Cell>
              </Grid>
            </Box>
            <Divider borderWidth="050" />
            <Box paddingInline="300" paddingBlock="300">
              <InlineStack align="end" gap="600">
                <BiSaveBtn isLoading={isSubmitting} title="Save" />
              </InlineStack>
            </Box>
          </Form>
        </Card>
      </div>
    </div>
  );
}

