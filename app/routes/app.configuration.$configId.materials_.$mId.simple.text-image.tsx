import { Box, Divider, Grid, InlineStack, Text } from "@shopify/polaris";
import { useState } from "react";
import {
  Form,
  useActionData,
  useLoaderData,
  useNavigation,
  useSubmit,
} from "@remix-run/react";
import { BoxBackground } from "~/components/layouts/BoxBackground";
import { SpacingBackground } from "~/components/layouts/SpacingBackground";

import { ActionFunctionArgs, LoaderFunctionArgs, json } from "@remix-run/node";
import { authenticate } from "~/shopify.server";
import { ConfigTextImages } from "~/types/ConfigDataType";

import MaterialTextImageService from "~/models/MaterialTextImage.service";
import useHandleFlashMessage from "~/hooks/useHandleFlashMessage";
import { ReactSwitchCustom } from "~/components/inputs/ReactSwitchCustom";
import { BiSaveBtn } from "~/components/buttons/BiSaveBtn";
import { parseWithZod } from "@conform-to/zod";
import { z } from "zod";
import { jFlashMessage } from "~/utils/message-flash";
import { booleanTransform } from "~/utils/transfomerZod";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const { session, admin } = await authenticate.admin(request);
  const configId = parseInt(params.configId ?? "");
  const mId = parseInt(params.mId ?? "");
  console.log("configID materialID", configId, mId);

  let textImages: ConfigTextImages | null = null;

  if (!Number.isNaN(configId) && !Number.isNaN(mId)) {
    textImages = await MaterialTextImageService.get(session.id, configId, mId);
  }

  return json({ textImages });
};

export default function MaterialTextImage() {
  const submit = useSubmit();
  let { textImages } = useLoaderData<typeof loader>();
  useHandleFlashMessage();

  const actionData = useActionData<typeof action>();

  const navigation = useNavigation();
  let isLoading = navigation.state == "loading";
  let isSubmitting = navigation.state == "submitting";

  const [formData, setFormData] = useState<ConfigTextImages>(
    textImages
      ? (textImages as ConfigTextImages)
      : {
          enableText: true,
          enableImage: false,
        },
  );

  const handleEnableText = (value: boolean) =>
    setFormData({ ...formData, enableText: value });
  const handleEnableImages = (value: boolean) =>
    setFormData({ ...formData, enableImage: value });

  const handleSubmit = (e: any) => {
    e.preventDefault();

    submit({ ...formData }, { method: "POST" });
  };

  return (
    <div>
      <SpacingBackground width="100%" height="auto" margin="16px 0px ">
        <BoxBackground>
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
              </Grid>
            </Box>
            <Divider borderWidth="050" />
            <Box paddingInline="300" paddingBlock="300">
              <InlineStack align="end" gap="600">
                <BiSaveBtn isLoading={isSubmitting} title="Save" />
              </InlineStack>
            </Box>
          </Form>
        </BoxBackground>
      </SpacingBackground>
    </div>
  );
}

const formSchema = z.object({
  enableText: z.any().transform(booleanTransform),
  enableImage: z.any().transform(booleanTransform),
});

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const { session, admin } = await authenticate.admin(request);

  const configId = parseInt(params.configId ?? "");
  const mId = parseInt(params.mId ?? "");

  const method = request.method;
  const formData = await request.formData();

  const submission = parseWithZod(formData, { schema: formSchema });

  if (submission.status !== "success") {
    return json({ status: false, message: null, errors: submission.error });
  }

  let textImages: ConfigTextImages = submission.value as ConfigTextImages;
  if (textImages) {
    let res = await MaterialTextImageService.edit(
      configId,
      session.id,
      mId,
      textImages,
    ); // Custom Size  updated is completed successfully
    return res
      ? json({
          ...jFlashMessage(
            "Matrrial  text and image  updated is completed successfully",
          ),
        })
      : json({
          ...jFlashMessage(
            "Errors on Matrrial  text and image   upadating",
            "error",
          ),
        });
  } else {
    return null;
  }
};
