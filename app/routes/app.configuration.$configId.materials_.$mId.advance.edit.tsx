import { parseWithZod } from "@conform-to/zod";
import { ActionFunctionArgs, json } from "@remix-run/node";
import { Form, Link, Outlet, redirect, useActionData, useNavigate, useNavigation, useOutletContext, useSearchParams, useSubmit } from "@remix-run/react";
import {
  Box,
  Button,
  Divider,
  Grid,
  InlineStack,
  Text,
  TextField,
} from "@shopify/polaris";
import { useCallback, useState } from "react";
import { z } from "zod";
import { BiSaveBtn } from "~/components/buttons/BiSaveBtn";
import NextLtrIcon from "~/components/icons/NextLtrIcon";
import RayEndArrowIcon from "~/components/icons/RayEndArrowIcon";
import RayStartArrowIcon from "~/components/icons/RayStartArrowIcon";
import uploadIcon from "~/components/icons/uploadIcon";
import { FileInput } from "~/components/inputs/FileInput";
import { BoxBackground } from "~/components/layouts/BoxBackground";
import { SpacingBackground } from "~/components/layouts/SpacingBackground";
import useHandleFlashMessage from "~/hooks/useHandleFlashMessage";
import MaterialAdvanceComponentService from "~/models/MaterialAdvanceComponent.service";
import MaterialAdvanceComponent from "~/models/MaterialAdvanceComponent.service";
import { authenticate } from "~/shopify.server";
import { MaterialAdvance, MaterialAdvanceComponentType } from "~/types/ConfigDataType";
import { ConfigurationType } from "~/types/ConfigurationType";
import { getError } from "~/utils/error-getting";
import { flashMessage } from "~/utils/message-flash";

export default function MaterialComponentCreate() {
  const submit = useSubmit();
  const navigation = useNavigation();
  const { materialComponents , material, configuration} = useOutletContext<{
    materialComponents: MaterialAdvanceComponentType[];
    material:MaterialAdvance, configuration: ConfigurationType
  }>();

  const actionData = useActionData<typeof action>();
  useHandleFlashMessage();
  const [searchParams] = useSearchParams();
  const id = parseInt(searchParams.get("id") || "");
  console.log("action data :", actionData);
  let materialComponent = materialComponents?.find((curr, index) => index == id);
  const [formData, setFormData] = useState<MaterialAdvanceComponentType>(
    materialComponent?
    materialComponent as MaterialAdvanceComponentType
      : {
        name: "",
        description: "",
        icon: "",
        options:[]
      }
  );

  let isLoading = navigation.state == "loading";
  let isSubmitting = navigation.state == "submitting";

  const handleName= (value: string) =>
    setFormData({ ...formData, name: value });
  const handleDescription = (value: string) =>
    setFormData({ ...formData, description: value });
  const handleIcon = (value: string) =>
    setFormData({ ...formData, icon: value });


  const handleSubmit = (e: any) => {
    e.preventDefault();
    submit({ ...formData, options:null }, { method: "POST" });
  };

  const navigate = useNavigate();
  const onBack = () => {
    navigate("..");
  };

  return (
    <>
          <BoxBackground>
          <Box paddingInline="300" paddingBlock="600">
            <InlineStack align="start">
              <InlineStack gap="100" align="start" blockAlign="start">
                <Text as="h2" variant="headingMd">
                  {configuration?.name}
                </Text>
                <NextLtrIcon />
                <Link className="link" to="../../materials">
            <Text as="h2" variant="headingMd" tone="subdued">
              Materials
            </Text>
            </Link>
                <NextLtrIcon />
                <Text as="h2" variant="headingMd" tone="subdued">
                  {material?.name} (Advance)
              </Text>
              
              </InlineStack>
            </InlineStack>
          </Box>
          <Divider borderWidth="100" />
        </BoxBackground>
        <Divider borderWidth="100" />
       
    <SpacingBackground width="100%" height="auto">
      <BoxBackground>
        <Box padding="300">
          <Text as="h2" variant="headingMd">
          Add  component
          </Text>
        </Box>
        <Divider borderWidth="050" />

        <Form onSubmit={handleSubmit} method="POST">
        <Box paddingInline="300" paddingBlock="1000">
              <Grid gap={{lg:"30px"}}>
                <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
                <TextField
                label="Title"
                  value={`${formData.name}`}
                  autoComplete="off"
                onChange={handleName}
                error={getError(actionData, "title")}
              />
                </Grid.Cell>
             
              <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
              <TextField
                label="Description"
                value={`${formData.description}`}
                autoComplete="off"
              onChange={handleDescription}
              error={getError(actionData, "description")}
              />
                </Grid.Cell>
              <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
              <FileInput error={getError(actionData, "icon")} title="Upload icon"
                    path={formData.icon} handlePath={handleIcon} />
              </Grid.Cell>
              </Grid>
            </Box>
        
          <Divider borderWidth="050" />
          <Box paddingInline="300" paddingBlock="300">
            <InlineStack align="end" gap="600">
              <button className="back-large-btn" type="button" onClick={onBack}>
                <Box paddingInline="1000">
                  <InlineStack gap="300">
                    <RayStartArrowIcon />{" "}
                    <span style={{ color: "black", fontWeight: "bold" }}>
                      {" "}
                      Back
                    </span>
                  </InlineStack>
                </Box>
              </button>
              <BiSaveBtn isLoading={isSubmitting} title="Save" />
            </InlineStack>
          </Box>
        </Form>
      </BoxBackground>
    </SpacingBackground>
    </>
  );
}


const formSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .min(3, "Name is too short")
    .max(100, "Name is too long"),
  description: z
    .string({ required_error: "Description is required" })
    .min(3, "Description is too short")
    .max(255, "Description is too long"),
  icon: z.string({ required_error: "Icon file is required" })
});

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const { session, admin } = await authenticate.admin(request);

  const formData = await request.formData();
  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  const configId = parseInt(params.configId ?? "");
  const mId = parseInt(params.mId ?? "");
  const submission = parseWithZod(formData, { schema: formSchema });

  if (submission.status !== "success") {
    return json({ status: false, message: null, errors: submission.error });
  }

  let materialComponent: MaterialAdvanceComponentType = submission.value as MaterialAdvanceComponentType;

  
  if (id && !Number.isNaN(configId)  && !Number.isNaN(mId) && !Number.isNaN(id)) {
    let res = await MaterialAdvanceComponentService.update(
      configId,
      session.id,
      mId,
      materialComponent,
      parseInt(id),
    ); 
    return res
      ? redirect(
          `..${flashMessage("Material advance component  updated is completed successfully")}`,
        )
      : redirect(
          `..${flashMessage("Material  advance component  updated is  fail", "error")}`,
        );
  } else {
    let res = await MaterialAdvanceComponentService.add(
      configId,
      session.id,
      mId,
      materialComponent
    );
    return res
      ? redirect(
          `..${flashMessage("Material  advance component  added is completed successfully")}`,
        )
      : redirect(`..${flashMessage("Material  advance component   added is  fail", "error")}`);
  }

};

