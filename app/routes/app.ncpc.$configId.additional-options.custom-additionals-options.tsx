import type { ActionFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useOutletContext, useSubmit } from "@remix-run/react";
import {
  Badge,
  Box,
  Card,
  IndexTable,
  InlineStack,
  Text,
} from "@shopify/polaris";
import { useMemo, useState } from "react";
import { DeleteIcon, EditIcon } from "@shopify/polaris-icons";
import { CustomAdditionalOptionsForm } from "~/components/layouts";
import PlusIcon from "~/components/icons/PlusIcon";
import NcpcRowActions from "~/components/ncpc/NcpcRowActions";
import useHandleFlashMessage from "~/hooks/useHandleFlashMessage";
import NcpcConfigurationService from "~/models/NcpcConfiguration.service";
import { authenticate } from "~/shopify.server";
import type { NcpcRouteContext } from "~/types/NcpcRouteContext";
import { jFlashMessage } from "~/utils/message-flash";
import { truncateText } from "~/utils/truncate-text";

const normalizeOptionType = (value: unknown) => {
  const type = String(value || "").trim();
  return type || "custom";
};

const sanitizeOptionBeforeSave = (value: any) => {
  if (!value || typeof value !== "object") return {};
  const clone = JSON.parse(JSON.stringify(value));
  delete clone.id;
  return clone;
};

export default function NcpcCustomAdditionalOptions() {
  const submit = useSubmit();
  const { ncpcData } = useOutletContext<NcpcRouteContext>();
  const [showForm, setShowForm] = useState(false);
  const [customAdditional, setCustomAdditional] = useState<any>(null);

  useHandleFlashMessage();

  const options = useMemo(() => {
    const raw = ncpcData?.additionalOptions?.customAdditionalsOptions;
    return Array.isArray(raw) ? raw : [];
  }, [ncpcData]);

  const handleDelete = (id: number) => {
    submit({ id: String(id) }, { method: "DELETE" });
  };

  const handleUpdate = (data: any) => {
    setCustomAdditional(data);
    setShowForm(true);
  };

  const handleSubmit = (formData: any) => {
    const customOption = formData;
    if (customOption?.id == null) {
      submit({ customOption: JSON.stringify(customOption) }, { method: "POST" });
      setShowForm(false);
      return;
    }

    submit(
      {
        id: String(customOption.id),
        customOption: JSON.stringify(customOption),
      },
      { method: "POST" },
    );
    setShowForm(false);
  };

  const handleAddNew = () => {
    setCustomAdditional(null);
    setShowForm(true);
  };

  const resourceName = {
    singular: "Custom Additional Option",
    plural: "Custom Additional Options",
  };

  const rowMarkup = options.map((option: any, index: number) => (
    <IndexTable.Row id={`${index}`} key={`${index}`} position={index}>
      <IndexTable.Cell>
        <InlineStack blockAlign="center" wrap={false} gap="300">
          <Text as="strong" variant="bodyMd" tone="subdued">
            {truncateText(String(option?.label || option?.title || `Option #${index + 1}`))}
          </Text>
        </InlineStack>
      </IndexTable.Cell>

      <IndexTable.Cell className="td-center">
        <Badge tone={normalizeOptionType(option?.type) === "simple" ? "info" : "success"}>
          {normalizeOptionType(option?.type)}
        </Badge>
      </IndexTable.Cell>

      <IndexTable.Cell className="td-center">
        <NcpcRowActions
          actions={[
            {
              content: "Edit",
              icon: EditIcon,
              onAction: () => handleUpdate({ id: index, ...option }),
            },
            {
              content: "Delete",
              icon: DeleteIcon,
              destructive: true,
              onAction: () => handleDelete(index),
            },
          ]}
        />
      </IndexTable.Cell>
    </IndexTable.Row>
  ));

  return (
    <div style={{ display: "grid", gap: 12, marginTop: 16 }}>
      {!showForm && (
        <>
          <Card>
            <Box padding="300">
              <InlineStack align="space-between" blockAlign="center">
                <div>
                  <Text as="h2" variant="headingMd">
                    Custom Additional Options
                  </Text>
                  <Box paddingBlockStart="100">
                    <Text as="p" tone="subdued">
                      Manage additional input blocks and their behaviors.
                    </Text>
                  </Box>
                </div>
                <button className="primary-btn" type="button" onClick={handleAddNew}>
                  <Box paddingInline="300">
                    <InlineStack gap="300" blockAlign="center">
                      <PlusIcon />
                      <span className="primary-btn-text">Add new option</span>
                    </InlineStack>
                  </Box>
                </button>
              </InlineStack>
            </Box>
          </Card>

          <div style={{ margin: "10px 0px" }}>
            <Card>
            <IndexTable
              resourceName={resourceName}
              itemCount={options.length}
              selectable={false}
              headings={[
                { title: "Title" },
                { title: "Type", alignment: "center" },
                { title: "Action", alignment: "center" },
              ]}
            >
              {rowMarkup}
            </IndexTable>
            </Card>
          </div>
        </>
      )}

      {showForm && (
        <CustomAdditionalOptionsForm
          isEditing={customAdditional?.id != null}
          customOption={customAdditional}
          onSubmit={handleSubmit}
          onClose={() => {
            setCustomAdditional(null);
            setShowForm(false);
          }}
        />
      )}
    </div>
  );
}

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const { session } = await authenticate.admin(request);
  const configId = parseInt(params.configId || "", 10);

  if (Number.isNaN(configId)) {
    return json({ ...jFlashMessage("Invalid configuration", "error") }, { status: 400 });
  }

  const formData = await request.formData();
  const id = parseInt(String(formData.get("id") || ""), 10);
  const method = request.method;

  if (method === "DELETE") {
    if (Number.isNaN(id)) {
      return json({ ...jFlashMessage("Invalid option index", "error") }, { status: 400 });
    }

    await NcpcConfigurationService.mutateNcpc(configId, session.id, (draft) => {
      const current = Array.isArray(draft.additionalOptions.customAdditionalsOptions)
        ? draft.additionalOptions.customAdditionalsOptions
        : [];
      draft.additionalOptions.customAdditionalsOptions = current.filter(
        (_item, index) => index !== id,
      );
    });

    return json({ ...jFlashMessage("Custom additional option deleted successfully") });
  }

  if (method === "POST") {
    const rawCustomOption = formData.get("customOption");
    if (typeof rawCustomOption !== "string") {
      return json(
        { ...jFlashMessage("Invalid custom option payload", "error") },
        { status: 400 },
      );
    }

    let customOption: any = null;
    try {
      customOption = JSON.parse(rawCustomOption);
    } catch (_error) {
      return json(
        { ...jFlashMessage("Invalid custom option payload", "error") },
        { status: 400 },
      );
    }

    const normalizedOption = sanitizeOptionBeforeSave(customOption);

    if (Number.isNaN(id)) {
      await NcpcConfigurationService.mutateNcpc(configId, session.id, (draft) => {
        if (!Array.isArray(draft.additionalOptions.customAdditionalsOptions)) {
          draft.additionalOptions.customAdditionalsOptions = [];
        }
        draft.additionalOptions.customAdditionalsOptions.push(normalizedOption);
      });

      return json({ ...jFlashMessage("Custom additional option added successfully") });
    }

    await NcpcConfigurationService.mutateNcpc(configId, session.id, (draft) => {
      if (!Array.isArray(draft.additionalOptions.customAdditionalsOptions)) {
        draft.additionalOptions.customAdditionalsOptions = [];
      }

      if (!draft.additionalOptions.customAdditionalsOptions[id]) return;
      draft.additionalOptions.customAdditionalsOptions[id] = normalizedOption;
    });

    return json({ ...jFlashMessage("Custom additional option updated successfully") });
  }

  return json({ ...jFlashMessage("Invalid operation", "error") }, { status: 400 });
};
