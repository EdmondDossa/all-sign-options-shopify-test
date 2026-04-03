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
import useHandleFlashMessage from "~/hooks/useHandleFlashMessage";
import SettingShapesService from "~/models/SettingShapes.service";
import type { ShapeType } from "~/types/SettingsType";
import { getError } from "~/utils/error-getting";
import { jFlashMessage } from "~/utils/message-flash";
import { fileUrl } from "~/utils/fileUrl";

const formSchema = z.object({
  name: z.string({ required_error: "Name is required" }).min(3).max(100),
  value: z.string({ required_error: "Value is required" }).min(1).max(255),
  icon: z.string({ required_error: "Icon file is required" }),
});

export const action = async ({ request }: ActionFunctionArgs) => {
  const { session } = await import("~/shopify.server").then((mod) => mod.authenticate.admin(request));
  const formData = await request.formData();
  const submission = parseWithZod(formData, { schema: formSchema });

  if (submission.status !== "success") {
    return json({ status: false, message: null, errors: submission.error }, { status: 400 });
  }

  const shape = submission.value as ShapeType;
  const res = await SettingShapesService.update(shape, session.id);
  return res
    ? json({ ...jFlashMessage("Shape updated successfully") })
    : json({ ...jFlashMessage("Error on shape updating", "error") }, { status: 500 });
};

const emptyShape = (): ShapeType =>
  ({
    name: "",
    value: "",
    icon: "",
  }) as ShapeType;

export default function ShapeSettingsIndex() {
  const submit = useSubmit();
  const navigation = useNavigation();
  const actionData = useActionData<typeof action>();
  const { shapes } = useOutletContext<{ shapes: ShapeType[] }>();
  useHandleFlashMessage();

  const [editId, setEditId] = useState("");
  const selectedItem = useMemo(
    () => (shapes || []).find((item) => String(item.value) === editId) || null,
    [shapes, editId],
  );
  const [formData, setFormData] = useState<ShapeType>(emptyShape());
  const isSubmitting = navigation.state === "submitting";

  useEffect(() => {
    setFormData(selectedItem ? { ...selectedItem } : emptyShape());
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
        value: formData.value,
        icon: formData.icon,
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
              Edit Shape
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
                <FileInput
                  error={getError(actionData, "icon")}
                  title="Upload icon"
                  path={String(formData.icon || "")}
                  handlePath={(value: string) => setFormData((current) => ({ ...current, icon: value }))}
                />
              </InlineGrid>
              <InlineStack align="end" gap="200">
                <Button variant="secondary" onClick={closeEdit}>
                  Back to shapes
                </Button>
                <SaveButton loading={isSubmitting} onClick={handleSave}>
                  Save Shape
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
            Shapes
          </Text>
          <Box paddingBlockStart="100">
            <Text as="p" tone="subdued">
              Manage the shapes available globally across configurations.
            </Text>
          </Box>
        </Box>
      </Card>

      <Card>
        <Box padding="300">
          <Text as="h3" variant="headingMd">
            Shapes List
          </Text>
          <Box paddingBlockStart="200" />
          <IndexTable
            resourceName={{ singular: "shape", plural: "shapes" }}
            itemCount={shapes ? shapes.length : 0}
            selectable={false}
            headings={[
              { title: "Shape" },
              { title: "Preview" },
              { title: "Actions" },
            ]}
          >
            {(shapes || []).map(({ name, value, icon }, index) => (
              <IndexTable.Row id={value} key={value} position={index}>
                <IndexTable.Cell>
                  <Text as="span" fontWeight="semibold">
                    {name}
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
                        alt={`shape ${name}`}
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
                    <Button icon={EditIcon} variant="secondary" onClick={() => openEdit(value)}>
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
