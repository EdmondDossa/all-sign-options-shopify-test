import {
  BlockStack,
  Box,
  ButtonGroup,
  Checkbox,
  Divider,
  Grid,
  IndexTable,
  InlineGrid,
  InlineStack,
  Select,
  Text,
  TextField,
  useIndexResourceState,
} from "@shopify/polaris";
import { useCallback, useState } from "react";
import { DeleteIconBtn } from "~/components/buttons/DeleteIconBtn";
import { ViewIconBtn } from "~/components/buttons/ViewIconBtn";
import { EditIconBtn } from "~/components/buttons/EditIconBtn";
import {
  Form,
  Link,
  NavLink,
  Outlet,
  redirect,
  useLoaderData,
  useNavigate,
  useNavigation,
  useSubmit,
} from "@remix-run/react";
import { BoxBackground } from "~/components/layouts/BoxBackground";
import PlusIcon from "~/components/icons/PlusIcon";
import { SpacingBackground } from "~/components/layouts/SpacingBackground";
import RayStartArrowIcon from "~/components/icons/RayStartArrowIcon";
import RayEndArrowIcon from "~/components/icons/RayEndArrowIcon";
import { ReactSwitchCustom } from "~/components/inputs/ReactSwitchCustom";
import BiSaveIcon from "~/components/icons/BiSaveIcon";
import { authenticate } from "~/shopify.server";
import { ActionFunctionArgs, LoaderFunctionArgs, json } from "@remix-run/node";
import SettingOutputService from "~/models/SettingOutput.service";
import { OutputType } from "~/types/SettingsType";
import useHandleFlashMessage from "~/hooks/useHandleFlashMessage";
import { z } from "zod";
import { parseWithZod } from "@conform-to/zod";
import { jFlashMessage } from "~/utils/message-flash";
import { BiSaveBtn } from "~/components/buttons/BiSaveBtn";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { session, admin } = await authenticate.admin(request);

  const output = await SettingOutputService.get(session.id);
  console.log(output);

  return json({ output });
};

export default function ManageSizeCreate() {
  const submit = useSubmit();
  const navigation = useNavigation();
  const { output } = useLoaderData<typeof loader>();
  useHandleFlashMessage();

  const [formData, setFormData] = useState<OutputType>(
    (output as OutputType) || {
      zipName: true,
      calculateOutput: true,
    },
  );

  let isLoading = navigation.state == "loading";
  let isSubmitting = navigation.state == "submitting";

  console.log(formData, output);

  const handleCalculateOutput = useCallback((value: boolean) => {
    formData.calculateOutput = value;
    setFormData({ ...formData });
  }, []);

  const handleZipName = useCallback((value: boolean) => {
    formData.zipName = value;
    setFormData({ ...formData });
  }, []);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    submit({ ...formData }, { method: "POST" });
  };

  return (
    <div>
      <SpacingBackground width="100%" height="auto" margin="10px 0px ">
        <Form onSubmit={handleSubmit} method="POST">
          <SpacingBackground backgroundColor="#F8F9FB">
            <Box paddingInline="300" paddingBlock="1200">
              <Grid gap={{ lg: "30px" }}>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
                  <BlockStack gap="100" >
                    <InlineStack gap="300" blockAlign="center">
                      <Text as="strong" fontWeight="bold" variant="bodyMd">
                        Use ider id as zip name
                      </Text>
                      <ReactSwitchCustom
                        checked={formData.zipName}
                        setChecked={handleZipName}
                      />
                    </InlineStack>
                    <Text as="span" tone="subdued">Use the command id as the name of the zip file that will contain the uploaded files during customization </Text>
                  </BlockStack>
                </Grid.Cell>

                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
                  <BlockStack gap="100">
                    <InlineStack gap="300" blockAlign="center">
                      <Text as="strong" fontWeight="bold" variant="bodyMd">
                        Calculate retina output
                      </Text>
                      <ReactSwitchCustom
                        checked={formData.calculateOutput}
                        setChecked={handleCalculateOutput}
                      />
                    </InlineStack>
                    
                  </BlockStack>
                </Grid.Cell>
              </Grid>
            </Box>
          </SpacingBackground>
          <Divider borderWidth="100" />
          <SpacingBackground backgroundColor="#F9F9F9">
            <Box paddingInline="300" paddingBlock="300">
              <InlineStack align="end" gap="600">
                <BiSaveBtn isLoading={isSubmitting} title="Save" />
              </InlineStack>
            </Box>
          </SpacingBackground>
        </Form>
      </SpacingBackground>
    </div>
  );
}

const formSchema = z.object({
  calculateOutput: z
    .any()
    .transform((val) => `${val}`.toLowerCase() == "true")
    .pipe(z.boolean()),
  zipName: z
    .any()
    .transform((val) => `${val}`.toLowerCase() == "true")
    .pipe(z.boolean()),
});

export const action = async ({ request }: ActionFunctionArgs) => {
  const { session, admin } = await authenticate.admin(request);
  const formData = await request.formData();

  const submission = parseWithZod(formData, { schema: formSchema });

  if (submission.status !== "success") {
    return json({ status: false, message: null, errors: submission.error });
  }

  let output: OutputType = submission.value as OutputType;
  console.log("out put ", output);
  if (output) {
    let res = await SettingOutputService.update(output, session.id);
    return res
      ? json({
          ...jFlashMessage("Output config  updaping  is completed successful"),
        })
      : json({ ...jFlashMessage("Output   updaping   failed", "error") });
  }
};
