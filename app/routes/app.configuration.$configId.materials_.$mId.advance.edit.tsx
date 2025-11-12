import { parseWithZod } from "@conform-to/zod";
import { ActionFunctionArgs, json } from "@remix-run/node";
import {
  Form,
  Link,
  redirect,
  useActionData,
  useFetcher,
  useNavigate,
  useNavigation,
  useOutletContext,
  useParams,
  useRevalidator,
  useSearchParams,
  useSubmit,
} from "@remix-run/react";
import {
  Box,
  Card,
  Divider,
  Grid,
  InlineStack,
  Text,
  TextField,
} from "@shopify/polaris";
import { useEffect, useState } from "react";
import { z } from "zod";
import { BiSaveBtn } from "~/components/buttons/BiSaveBtn";
import NextLtrIcon from "~/components/icons/NextLtrIcon";
import RayStartArrowIcon from "~/components/icons/RayStartArrowIcon";
import { FileInput } from "~/components/inputs/FileInput";
import { BoxBackground } from "~/components/layouts/BoxBackground";
import { SpacingBackground } from "~/components/layouts/SpacingBackground";
import useHandleFlashMessage from "~/hooks/useHandleFlashMessage";
import MaterialAdvanceComponentService from "~/models/MaterialAdvanceComponent.service";
import { authenticate } from "~/shopify.server";
import {
  MaterialAdvance,
  MaterialAdvanceComponentType,
} from "~/types/ConfigDataType";
import { ConfigurationType } from "~/types/ConfigurationType";
import { getError } from "~/utils/error-getting";
import { flashMessage } from "~/utils/message-flash";
import { stringTransform } from "~/utils/transfomerZod";

interface MaterialAdavanceProps {
  materialComponents: MaterialAdvanceComponentType[];
  index: number;
  onClick: (id: boolean) => void;
  edit: boolean;
  materialId: number | undefined;
  onUpdate?: (components: MaterialAdvanceComponentType[] | null) => void;
}
export default function MaterialComponentCreate( { materialId, materialComponents, edit, index, onClick, onUpdate} :MaterialAdavanceProps) {
  const submit = useSubmit();
  const navigation = useNavigation();
  const params = useParams();
  const configId = params.configId;
  const fetcher = useFetcher() as any
  const revalidator = useRevalidator();
  // const { materialComponents, material, configuration } = useOutletContext<{
  //   materialComponents: MaterialAdvanceComponentType[];
  //   material: MaterialAdvance;
  //   configuration: ConfigurationType;
  // }>();

  const actionData = useActionData<typeof action>();
  useHandleFlashMessage();

  // Recharger les données après une soumission réussie
  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data?.success) {
      // Mettre à jour les composants avec les données retournées par l'API
      if (fetcher.data?.data && onUpdate) {
        onUpdate(fetcher.data.data);
      }
      revalidator.revalidate();
      onClick(false);
    }
  }, [fetcher.state, fetcher.data, revalidator, onClick, onUpdate]);
  // const [searchParams] = useSearchParams();
  // const id = parseInt(searchParams.get("id") || "");
  const id = edit ? index : 0
  console.log("action data :", actionData);
  let materialComponent = materialComponents?.find(
    (curr:any, index:number) => index == id,
  );
  const [formData, setFormData] = useState<MaterialAdvanceComponentType>(
    edit ? (materialComponent as MaterialAdvanceComponentType)
    : {
        name: "",
        description: "",
        icon: "",
        options: [],
        isDefault: false,
      },
  );

  let isLoading = navigation.state == "loading";
  let isSubmitting = fetcher.state == "submitting";

  const handleName = (value: string) =>
    setFormData({ ...formData, name: value });
  const handleDescription = (value: string) =>
    setFormData({ ...formData, description: value });
  const handleIcon = (value: string) =>
    setFormData({ ...formData, icon: value });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // submit({ ...formData, options: null }, { method: "POST" });
    const requestBody: any = {
      operation: edit ? "update" : "add",
      configId: configId,
      materialId: materialId,
      componentData: formData,
    }

    if(edit){
      requestBody.componentId = index
    }

    fetcher.submit(requestBody, {
      method: "POST",
      action: "/api/advance-add-component-manager",
      encType: "application/json",
    });
  };

  const navigate = useNavigate();
  const onBack = () => {
    navigate("..");
  };

  return (
    <>
      <div style={{width:"100%", height:"auto", padding: "10px 0px"}}>
        <Card>
          <Box paddingInline="100" paddingBlockEnd="300">
            <Text as="h2" variant="headingMd">
              {Number.isNaN(id) ? " Add  component" : "Edit component"}
            </Text>
          </Box>
          <Divider borderWidth="050" />

          <Form onSubmit={handleSubmit} method="POST">
            <Box paddingInline="300" paddingBlock="400">
              <Grid gap={{ lg: "30px" }}>
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
                  <FileInput
                    error={getError(actionData, "icon")}
                    title="Upload icon"
                    path={formData.icon}
                    handlePath={handleIcon}
                  />
                </Grid.Cell>
              </Grid>
            </Box>

            <Divider borderWidth="050" />
            <Box paddingInline="300" paddingBlock="300">
              <InlineStack align="end" gap="600">
                <button
                  className="back-large-btn"
                  type="button"
                  onClick={()=> onClick(false)}
                >
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
        </Card>
      </div>
    </>
  );
}

const formSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .min(1, "Name is too short")
    .max(100, "Name is too long"),
  description:z.string().nullish().transform(stringTransform),
  icon: z.string().nullish().transform(stringTransform),
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

  let materialComponent: MaterialAdvanceComponentType =
    submission.value as MaterialAdvanceComponentType;

  if (
    id &&
    !Number.isNaN(configId) &&
    !Number.isNaN(mId) &&
    !Number.isNaN(id)
  ) {
    let res = await MaterialAdvanceComponentService.update(
      configId,
      session.id,
      mId,
      materialComponent,
      parseInt(id),
    );
    return res
      ? redirect(
          `..${flashMessage("Material advance component updated successfully")}`,
        )
      : redirect(
          `..${flashMessage("Failed to update material advance component", "error")}`,
        );
  } else {
    let res = await MaterialAdvanceComponentService.add(
      configId,
      session.id,
      mId,
      materialComponent,
    );
    return res
      ? redirect(
          `..${flashMessage("Material advance component added successfully")}`,
        )
      : redirect(
          `..${flashMessage("Failed to add material advance component", "error")}`,
        );
  }
};
