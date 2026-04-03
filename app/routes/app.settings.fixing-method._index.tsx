import { json } from "@remix-run/node";
import type { ActionFunctionArgs } from "@remix-run/node";
import { useActionData, useNavigation, useOutletContext, useSubmit } from "@remix-run/react";
import { parseWithZod } from "@conform-to/zod";
import { Box, Button, Card, IndexTable, InlineGrid, InlineStack, Text, TextField } from "@shopify/polaris";
import { EditIcon } from "@shopify/polaris-icons";
import { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import SaveButton from "~/components/buttons/SaveButton";
import { FileInput } from "~/components/inputs/FileInput";
import { CustomTinymce } from "~/components/inputs/CustomTinymce";
import useHandleFlashMessage from "~/hooks/useHandleFlashMessage";
import SettingFixingMethodService from "~/models/SettingFixingMethod.service";
import type { FixingMethodType } from "~/types/SettingsType";
import { getError } from "~/utils/error-getting";
import { jFlashMessage } from "~/utils/message-flash";
import { stringTransform } from "~/utils/transfomerZod";
import { fileUrl } from "~/utils/fileUrl";

const formSchema = z.object({
  name: z.string({ required_error: "Name is required" }).min(3).max(100),
  description: z.string({ required_error: "Description is required" }).min(3).max(255),
  type: z.string({ required_error: "Type is required" }).min(1).max(255),
  icon: z.string({ required_error: "Icon file is required" }),
  popImg: z.string().nullish().transform(stringTransform),
});

export const action = async ({ request }: ActionFunctionArgs) => {
  const { session } = await import("~/shopify.server").then((mod) => mod.authenticate.admin(request));
  const formData = await request.formData();
  const submission = parseWithZod(formData, { schema: formSchema });

  if (submission.status !== "success") {
    return json({ status: false, message: null, errors: submission.error }, { status: 400 });
  }

  const fixingMethod = submission.value as FixingMethodType;
  const res = await SettingFixingMethodService.update(fixingMethod, session.id);
  return res
    ? json({ ...jFlashMessage("Fixing method updated successfully") })
    : json({ ...jFlashMessage("Error on fixing method updating", "error") }, { status: 500 });
};

const emptyFixingMethod = (): FixingMethodType =>
  ({
    name: "",
    description: "",
    type: "",
    icon: "",
    popImg: "",
  }) as FixingMethodType;

export default function SettingFixingMethodIndex() {
  const submit = useSubmit();
  const navigation = useNavigation();
  const actionData = useActionData<typeof action>();
  const { fixingMethods } = useOutletContext<{ fixingMethods: FixingMethodType[] }>();
  useHandleFlashMessage();

  const [editId, setEditId] = useState("");
  const selectedItem = useMemo(
    () => (fixingMethods || []).find((item) => String(item.type) === editId) || null,
    [fixingMethods, editId],
  );
  const [formData, setFormData] = useState<FixingMethodType>(emptyFixingMethod());
  const isSubmitting = navigation.state === "submitting";

  useEffect(() => {
    setFormData(selectedItem ? { ...selectedItem } : emptyFixingMethod());
  }, [selectedItem]);

  useEffect(() => {
    if (actionData && "messageFlash" in actionData && (actionData as any).messageFlash?.status !== "error") {
      setEditId("");
    }
  }, [actionData]);

  const openEdit = (id: string) => setEditId(id);
  const closeEdit = () => setEditId("");

  const handleSave = () => {
    submit(
      {
        name: formData.name,
        description: formData.description,
        type: formData.type,
        icon: formData.icon,
        popImg: formData.popImg || "",
      },
      { method: "POST" },
    );
  };

  if (selectedItem) {
    return (
      <div style={{ display: "grid", gap: 12, margin: "10px 0" }}>
        <Card>
          <Box padding="300">
            <Text as="h2" variant="headingLg">
              Edit Fixing Method
            </Text>
          </Box>
        </Card>

        <Card>
          <Box padding="300">
            <div style={{ display: "grid", gap: 16 }}>
              <InlineGrid columns={{ xs: 1, md: 2 }} gap="400">
                <TextField
                  label="Label"
                  value={String(formData.name || "")}
                  onChange={(value) => setFormData((current) => ({ ...current, name: value }))}
                  autoComplete="off"
                  error={getError(actionData, "name")}
                />
                <TextField
                  label="Description"
                  value={String(formData.description || "")}
                  onChange={(value) => setFormData((current) => ({ ...current, description: value }))}
                  autoComplete="off"
                  error={getError(actionData, "description")}
                />
              </InlineGrid>
              <InlineGrid columns={{ xs: 1, md: 2 }} gap="400">
                <FileInput
                  error={getError(actionData, "icon")}
                  title="Upload icon"
                  path={String(formData.icon || "")}
                  handlePath={(value: string) => setFormData((current) => ({ ...current, icon: value }))}
                />
              </InlineGrid>
              <CustomTinymce
                error={getError(actionData, "popImg")}
                title="Complete popup description"
                onEditorChange={(value: any) => setFormData((current) => ({ ...current, popImg: String(value || "") }))}
                value={String(formData.popImg || "")}
              />
              <InlineStack align="end" gap="200">
                <Button variant="secondary" onClick={closeEdit}>
                  Back to fixing methods
                </Button>
                <SaveButton loading={isSubmitting} onClick={handleSave}>
                  Save Fixing Method
                </SaveButton>
              </InlineStack>
            </div>
          </Box>
        </Card>
      </div>
    );
  }

  return (
    <div style={{ display: "grid", gap: 12, margin: "10px 0" }}>
      <Card>
        <Box padding="300">
          <Text as="h2" variant="headingLg">
            Fixing Methods
          </Text>
          <Box paddingBlockStart="100">
            <Text as="p" tone="subdued">
              Manage the fixing methods available globally across configurations.
            </Text>
          </Box>
        </Box>
      </Card>

      <Card>
        <Box padding="300">
          <Text as="h3" variant="headingMd">
            Fixing Methods List
          </Text>
          <Box paddingBlockStart="200" />
          <IndexTable
            resourceName={{ singular: "fixing method", plural: "fixing methods" }}
            itemCount={fixingMethods ? fixingMethods.length : 0}
            selectable={false}
            headings={[
              { title: "Fixing method" },
              { title: "Description" },
              { title: "Preview" },
              { title: "Actions" },
            ]}
          >
            {(fixingMethods || []).map(({ name, icon, description, type }, index) => (
              <IndexTable.Row id={type} key={type} position={index}>
                <IndexTable.Cell>
                  <Text as="span" fontWeight="semibold">
                    {name}
                  </Text>
                </IndexTable.Cell>
                <IndexTable.Cell>
                  <Text as="span" tone="subdued">
                    {description || "-"}
                  </Text>
                </IndexTable.Cell>
                <IndexTable.Cell>
                  <div
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: 8,
                      border: "1px solid #D0D5DD",
                      background: "#F8F9FB",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      overflow: "hidden",
                    }}
                  >
                    {icon ? (
                      <img
                        style={{ width: "100%", height: "100%", objectFit: "contain" }}
                        src={fileUrl(icon)}
                        alt={`fixing method ${name}`}
                      />
                    ) : (
                      <Text as="span" tone="subdued">
                        -
                      </Text>
                    )}
                  </div>
                </IndexTable.Cell>
                <IndexTable.Cell>
                  <InlineStack gap="200">
                    <Button icon={EditIcon} variant="secondary" onClick={() => openEdit(type)}>
                      Edit
                    </Button>
                  </InlineStack>
                </IndexTable.Cell>
              </IndexTable.Row>
            ))}
          </IndexTable>
        </Box>
      </Card>
    </div>
  );
}
