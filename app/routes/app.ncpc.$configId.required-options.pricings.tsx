import { json } from "@remix-run/node";
import type { ActionFunctionArgs } from "@remix-run/node";
import {
  BlockStack,
  Button,
  Box,
  Card,
  Divider,
  IndexTable,
  InlineStack,
  Page,
  Text,
} from "@shopify/polaris";
import { DeleteIcon, DuplicateIcon, EditIcon, PlusIcon } from "@shopify/polaris-icons";
import { useNavigation, useOutletContext, useSubmit } from "@remix-run/react";
import { useEffect, useMemo, useState } from "react";
import {
  PricingAdvancedForm,
  PricingSimpleForm,
  type AdvancedPriceType,
  type FixedPricing,
} from "~/components/layouts/PricingForm";
import NcpcRowActions from "~/components/ncpc/NcpcRowActions";
import NcpcConfigurationService from "~/models/NcpcConfiguration.service";
import { authenticate } from "~/shopify.server";
import type { NcpcRouteContext } from "~/types/NcpcRouteContext";
import { jFlashMessage } from "~/utils/message-flash";
import { truncateText } from "~/utils/truncate-text";

type PricingItem = FixedPricing | AdvancedPriceType;

const parseIndex = (value: FormDataEntryValue | null) => {
  const parsed = parseInt(String(value || ""), 10);
  return Number.isNaN(parsed) ? -1 : parsed;
};

const normalizePricingMode = (value: unknown) => {
  const normalized = String(value || "")
    .trim()
    .toLowerCase();

  if (normalized === "fixing-height") return "fixed-height";
  if (normalized === "fixing-width") return "fixed-width";
  return normalized || "fixed-height";
};

const toPricingFormSizes = (rawSizes: any[] = []) =>
  rawSizes.map((size: any) => ({
    ...size,
    numberLines: Number(size?.numberLines ?? size?.textNumber ?? 1),
  }));

export default function NcpcRequiredPricings() {
  const submit = useSubmit();
  const navigation = useNavigation();
  const { configuration, ncpcData } = useOutletContext<NcpcRouteContext>();

  const pricingMode = normalizePricingMode(
    (configuration as any)?.pricingMode || (ncpcData as any)?.pricingMode,
  );

  const priceOptions = Array.isArray(ncpcData?.requiredOptions?.priceOptions)
    ? ncpcData.requiredOptions.priceOptions
    : [];

  const sizes = useMemo(() => {
    const sizeOptions = (ncpcData as any)?.requiredOptions?.sizeOptions || {};
    const rawSizes = Array.isArray(sizeOptions?.sizes)
      ? sizeOptions.sizes
      : Array.isArray(sizeOptions?.allSizes)
        ? sizeOptions.allSizes
        : [];

    return toPricingFormSizes(rawSizes);
  }, [ncpcData]);

  const [showForm, setShowForm] = useState(false);
  const [editingPricing, setEditingPricing] = useState<PricingItem | null>(null);
  const [isClient, setIsClient] = useState(false);

  const isSubmitting = navigation.state === "submitting";

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleDelete = (index: number) => {
    submit(
      {
        operation: "delete-pricing",
        index: String(index),
      },
      { method: "POST" },
    );
  };

  const handleDuplicate = (index: number) => {
    submit(
      {
        operation: "duplicate-pricing",
        index: String(index),
      },
      { method: "POST" },
    );
  };

  const handleSubmitForm = (pricing: PricingItem) => {
    const isEditing = pricing?.id != null;
    const index = isEditing ? Number(pricing.id) : -1;
    const payload = { ...pricing } as any;
    delete payload.id;

    submit(
      {
        operation: isEditing ? "update-pricing" : "add-pricing",
        ...(isEditing ? { index: String(index) } : {}),
        pricing: JSON.stringify(payload),
      },
      { method: "POST" },
    );

    setShowForm(false);
    setEditingPricing(null);
  };

  const rows = priceOptions.map((pricing: any, index: number) => (
    <IndexTable.Row id={`${index}`} key={`${index}`} position={index}>
      <IndexTable.Cell>
        <Text as="span" variant="bodyMd">
          {truncateText(String(pricing?.label || `Pricing ${index + 1}`), 20)}
        </Text>
      </IndexTable.Cell>
      <IndexTable.Cell className="td-center">
        <NcpcRowActions
          actions={[
            {
              content: "Edit",
              icon: EditIcon,
              onAction: () => {
                setEditingPricing({ ...pricing, id: index });
                setShowForm(true);
              },
            },
            {
              content: "Duplicate",
              icon: DuplicateIcon,
              onAction: () => handleDuplicate(index),
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
    <Page fullWidth>
      {!showForm && (
        <Card>
          <BlockStack gap="200">
            <InlineStack align="space-between" blockAlign="center">
              <Text as="h2" variant="headingMd">
                Pricing List
              </Text>
              <Button
                icon={PlusIcon}
                variant="primary"
                tone="success"
                onClick={() => {
                  setEditingPricing(null);
                  setShowForm(true);
                }}
              >
                Add new pricing
              </Button>
            </InlineStack>
          </BlockStack>
          <Divider borderWidth="025" />
          {isClient ? (
            <IndexTable
              resourceName={{ singular: "Pricing", plural: "Pricings" }}
              itemCount={priceOptions.length}
              selectable={false}
              headings={[
                { title: "Label" },
                { title: "Action", alignment: "center" },
              ]}
            >
              {rows}
            </IndexTable>
          ) : (
            <Box padding="300">
              <Text as="p" tone="subdued">
                Loading pricings...
              </Text>
            </Box>
          )}
        </Card>
      )}

      {showForm && pricingMode !== "advanced" && (
        <PricingSimpleForm
          pricing={(editingPricing as FixedPricing) || undefined}
          sizes={sizes}
          pricingMode={pricingMode}
          isEditing={editingPricing?.id != null}
          onSubmit={handleSubmitForm}
          onClose={() => {
            setShowForm(false);
            setEditingPricing(null);
          }}
        />
      )}

      {showForm && pricingMode === "advanced" && (
        <PricingAdvancedForm
          pricing={(editingPricing as AdvancedPriceType) || undefined}
          isEditing={editingPricing?.id != null}
          measurementUnit={
            String(
              (ncpcData as any)?.settings?.generals?.customizer?.measurementUnit || "cm",
            )
          }
          onSubmit={handleSubmitForm}
          onClose={() => {
            setShowForm(false);
            setEditingPricing(null);
          }}
        />
      )}

      {isSubmitting && !showForm ? (
        <Box padding="200">
          <Text as="p" tone="subdued">
            Saving...
          </Text>
        </Box>
      ) : null}
    </Page>
  );
}

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const { session } = await authenticate.admin(request);

  if (request.method !== "POST") return null;

  const configId = parseInt(params.configId || "", 10);
  if (Number.isNaN(configId)) {
    return json({ ...jFlashMessage("Invalid configuration", "error") }, { status: 400 });
  }

  const formData = await request.formData();
  const operation = String(formData.get("operation") || "");
  const index = parseIndex(formData.get("index"));

  if (operation === "add-pricing" || operation === "update-pricing") {
    let pricing: any = null;
    try {
      pricing = JSON.parse(String(formData.get("pricing") || "{}"));
    } catch {
      pricing = null;
    }

    if (!pricing || typeof pricing !== "object") {
      return json({ ...jFlashMessage("Invalid pricing payload", "error") }, { status: 400 });
    }

    await NcpcConfigurationService.mutateNcpc(configId, session.id, (draft) => {
      const options = Array.isArray((draft as any)?.requiredOptions?.priceOptions)
        ? [...(draft as any).requiredOptions.priceOptions]
        : [];

      if (operation === "add-pricing") {
        options.push(pricing);
      } else if (index >= 0 && options[index] != null) {
        options[index] = pricing;
      }

      (draft as any).requiredOptions.priceOptions = options;
    });

    return json({ ...jFlashMessage("Pricing saved successfully") });
  }

  if (operation === "delete-pricing") {
    if (index < 0) {
      return json({ ...jFlashMessage("Invalid pricing index", "error") }, { status: 400 });
    }

    await NcpcConfigurationService.mutateNcpc(configId, session.id, (draft) => {
      const options = Array.isArray((draft as any)?.requiredOptions?.priceOptions)
        ? (draft as any).requiredOptions.priceOptions
        : [];

      (draft as any).requiredOptions.priceOptions = options.filter(
        (_item: any, itemIndex: number) => itemIndex !== index,
      );
    });

    return json({ ...jFlashMessage("Pricing deleted successfully") });
  }

  if (operation === "duplicate-pricing") {
    if (index < 0) {
      return json({ ...jFlashMessage("Invalid pricing index", "error") }, { status: 400 });
    }

    let duplicated = false;

    await NcpcConfigurationService.mutateNcpc(configId, session.id, (draft) => {
      const options = Array.isArray((draft as any)?.requiredOptions?.priceOptions)
        ? [...(draft as any).requiredOptions.priceOptions]
        : [];

      if (options[index] == null) {
        (draft as any).requiredOptions.priceOptions = options;
        return;
      }

      const clonedPricing = JSON.parse(JSON.stringify(options[index]));
      const sourceLabel = String(clonedPricing?.label || "").trim();

      clonedPricing.label = sourceLabel
        ? `${sourceLabel} (copy)`
        : `Pricing ${options.length + 1}`;

      options.splice(index + 1, 0, clonedPricing);
      (draft as any).requiredOptions.priceOptions = options;
      duplicated = true;
    });

    if (!duplicated) {
      return json({ ...jFlashMessage("Pricing not found", "error") }, { status: 404 });
    }

    return json({ ...jFlashMessage("Pricing duplicated successfully") });
  }

  return json({ ...jFlashMessage("Invalid operation", "error") }, { status: 400 });
};
