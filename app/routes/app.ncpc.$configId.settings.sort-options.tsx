import { json } from "@remix-run/node";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { Form, useLoaderData, useNavigation } from "@remix-run/react";
import {
  Box,
  Button,
  Card,
  InlineStack,
  Page,
  Text,
} from "@shopify/polaris";
import { useEffect, useMemo, useRef, useState } from "react";
import Sortable from "~/utils/sortable-adapter";
import useHandleFlashMessage from "~/hooks/useHandleFlashMessage";
import ConfigSettingsService from "~/models/ConfigSetttings.service";
import ConfigurationService from "~/models/Configuration.service";
import { authenticate } from "~/shopify.server";
import { jFlashMessage } from "~/utils/message-flash";

const LEGACY_ADDITIONALS_ID = "additionals-options";
const CUSTOM_ADDITIONAL_STEP_PREFIX = "custom-additional-";

type ProductType = "neon" | "channel";

type SortItem = {
  id: string;
  label: string;
};

const getCustomAdditionalLabel = (entry: any, index: number) => {
  const directLabel = String(entry?.label || "").trim();
  if (directLabel) return directLabel;

  const title = String(entry?.title || "").trim();
  if (title) return title;

  const nestedOptionTitle = String(entry?.options?.[0]?.title || "").trim();
  if (nestedOptionTitle) return nestedOptionTitle;

  return `Additional Option #${index + 1}`;
};

const defaultSortOptions = (productType: ProductType): string[] => {
  if (productType === "neon") {
    return [
      "text-form",
      "fonts",
      "sizes",
      "colors",
      "materials",
      "jackets",
      "mountings",
      "backboards",
      "backboard-colors",
      LEGACY_ADDITIONALS_ID,
    ];
  }

  return [
    "text-form",
    "fonts",
    "sizes",
    "letter-types",
    "mountings",
    "backboards",
    "backboard-colors",
    LEGACY_ADDITIONALS_ID,
  ];
};

const itemLabel = (item: string) => {
  const map: Record<string, string> = {
    "text-form": "Text Form",
    fonts: "Fonts",
    sizes: "Sizes",
    colors: "Colors",
    materials: "Materials",
    jackets: "Jackets",
    mountings: "Mountings",
    backboards: "Backboards",
    "backboard-colors": "Backboard Colors",
    "additionals-options": "Additional Options",
    "letter-types": "Letter Types",
  };

  return map[item] || item;
};

const isCustomAdditionalId = (id: string) =>
  typeof id === "string" && id.startsWith(CUSTOM_ADDITIONAL_STEP_PREFIX);

const parseJsonValue = (value: FormDataEntryValue | null) => {
  try {
    return JSON.parse(String(value || "[]"));
  } catch (_error) {
    return null;
  }
};

const buildSortItems = (
  productType: ProductType,
  customAdditionals: Array<Record<string, unknown>>,
): { baseItems: SortItem[]; customItems: SortItem[]; allItems: SortItem[] } => {
  const baseIds = defaultSortOptions(productType).filter(
    (id) => id !== LEGACY_ADDITIONALS_ID,
  );

  const baseItems = baseIds.map((id) => ({ id, label: itemLabel(id) }));

  const customItems = (customAdditionals || []).map((group, index) => {
    return {
      id: `${CUSTOM_ADDITIONAL_STEP_PREFIX}${index}`,
      label: getCustomAdditionalLabel(group, index),
    };
  });

  if (customItems.length > 0) {
    return {
      baseItems,
      customItems,
      allItems: [...baseItems, ...customItems],
    };
  }

  return {
    baseItems,
    customItems,
    allItems: [
      ...baseItems,
      { id: LEGACY_ADDITIONALS_ID, label: itemLabel(LEGACY_ADDITIONALS_ID) },
    ],
  };
};

const normalizeSortOptions = (
  rawOrders: unknown,
  allItems: SortItem[],
  customItems: SortItem[],
) => {
  const configured = Array.isArray(rawOrders)
    ? rawOrders.filter((entry): entry is string => typeof entry === "string")
    : [];
  const availableCustomIds = customItems.map((item) => item.id);
  const fallbackOrder = allItems.map((item) => item.id);

  const normalized: string[] = [];
  const seen = new Set<string>();

  const pushUnique = (id: string) => {
    if (!id || seen.has(id)) return;
    seen.add(id);
    normalized.push(id);
  };

  configured.forEach((id) => {
    if (id === LEGACY_ADDITIONALS_ID) {
      if (availableCustomIds.length > 0) {
        availableCustomIds.forEach(pushUnique);
      } else {
        pushUnique(LEGACY_ADDITIONALS_ID);
      }
      return;
    }

    if (isCustomAdditionalId(id)) {
      if (availableCustomIds.includes(id)) {
        pushUnique(id);
      }
      return;
    }

    if (fallbackOrder.includes(id)) {
      pushUnique(id);
    }
  });

  fallbackOrder.forEach(pushUnique);
  return normalized;
};

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const { session } = await authenticate.admin(request);
  const configId = parseInt(params.configId || "", 10);

  if (Number.isNaN(configId)) {
    return json({
      sortOptions: [],
      productType: "neon" as ProductType,
      customAdditionals: [] as Array<Record<string, unknown>>,
    });
  }

  const configuration = await ConfigurationService.getConfiguration(configId, session.id);
  const current = configuration?.data?.settings?.sortOptions;
  const productType = configuration?.productType === "channel" ? "channel" : "neon";
  const customAdditionals = Array.isArray(
    configuration?.data?.additionalOptions?.customAdditionalsOptions,
  )
    ? configuration.data.additionalOptions.customAdditionalsOptions
    : [];

  return json({
    sortOptions: Array.isArray(current) ? current : [],
    productType,
    customAdditionals,
  });
};

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const { session } = await authenticate.admin(request);

  if (request.method !== "POST") return null;

  const configId = parseInt(params.configId || "", 10);
  if (Number.isNaN(configId)) {
    return json({ ...jFlashMessage("Invalid configuration", "error") }, { status: 400 });
  }

  const configuration = await ConfigurationService.getConfiguration(configId, session.id);
  const productType = configuration?.productType === "channel" ? "channel" : "neon";
  const customAdditionals = Array.isArray(
    configuration?.data?.additionalOptions?.customAdditionalsOptions,
  )
    ? configuration.data.additionalOptions.customAdditionalsOptions
    : [];

  const { allItems, customItems } = buildSortItems(productType, customAdditionals);

  const formData = await request.formData();
  const rawSortOptions = parseJsonValue(formData.get("sortOptions"));

  if (!Array.isArray(rawSortOptions) || !rawSortOptions.every((entry) => typeof entry === "string")) {
    return json({ ...jFlashMessage("Invalid sort options payload", "error") }, { status: 400 });
  }

  const sortOptions = normalizeSortOptions(rawSortOptions, allItems, customItems);

  const updated = await ConfigSettingsService.updateSetting(
    configId,
    session.id,
    "sortOptions",
    sortOptions,
  );

  if (!updated) {
    return json({ ...jFlashMessage("Unable to update sort options", "error") }, { status: 500 });
  }

  return json({ ...jFlashMessage("Sort options updated successfully") });
};

export default function NcpcSettingsSortOptions() {
  const {
    sortOptions: loadedSortOptions,
    productType,
    customAdditionals,
  } = useLoaderData<typeof loader>();
  const navigation = useNavigation();
  useHandleFlashMessage();

  const { allItems, customItems } = useMemo(
    () => buildSortItems(productType, customAdditionals || []),
    [productType, JSON.stringify(customAdditionals || [])],
  );

  const [sortOptions, setSortOptions] = useState<string[]>(
    normalizeSortOptions(loadedSortOptions, allItems, customItems),
  );

  const sortableRef = useRef<Sortable | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);

  const isSaving = navigation.state === "submitting";

  useEffect(() => {
    setSortOptions(normalizeSortOptions(loadedSortOptions, allItems, customItems));
  }, [JSON.stringify(loadedSortOptions), JSON.stringify(allItems), JSON.stringify(customItems)]);

  useEffect(() => {
    if (!listRef.current) return;

    sortableRef.current?.destroy();

    sortableRef.current = Sortable.create(listRef.current, {
      group: "ncpc-sort-options",
      animation: 120,
      draggable: "[data-id]",
      handle: ".drag-handle",
      chosenClass: "sortable-chosen",
      ghostClass: "sortable-ghost",
      onEnd: () => {
        if (!sortableRef.current) return;
        const next = sortableRef.current.toArray();
        setSortOptions(normalizeSortOptions(next, allItems, customItems));
      },
    });

    return () => {
      sortableRef.current?.destroy();
      sortableRef.current = null;
    };
  }, [JSON.stringify(allItems), JSON.stringify(customItems)]);

  const orderedItems = useMemo(() => {
    const byId = new Map(allItems.map((item) => [item.id, item]));
    return sortOptions
      .map((id) => byId.get(id))
      .filter((item): item is SortItem => Boolean(item));
  }, [JSON.stringify(sortOptions), JSON.stringify(allItems)]);

  return (
    <Page>
      <Card>
        <Box padding="300">
          <InlineStack align="space-between" blockAlign="center">
            <div>
              <Text as="h2" variant="headingMd">
                Sort Options
              </Text>
              <Box paddingBlockStart="100">
                <Text as="p" tone="subdued">
                  Drag and drop to reorder sections. Custom additional options are handled individually.
                </Text>
              </Box>
            </div>
            <Form method="POST">
              <input type="hidden" name="sortOptions" value={JSON.stringify(sortOptions)} />
              <Button submit variant="primary" loading={isSaving}>
                Save
              </Button>
            </Form>
          </InlineStack>

          <Box paddingBlockStart="300">
            <div
              ref={listRef}
              style={{
                display: "grid",
                gap: "10px",
              }}
            >
              {orderedItems.map((item, index) => (
                <div
                  key={item.id}
                  data-id={item.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "12px",
                    border: "1px solid #d1d5db",
                    borderRadius: "10px",
                    background: "#ffffff",
                  }}
                >
                  <span
                    className="drag-handle"
                    style={{
                      cursor: "grab",
                      userSelect: "none",
                      color: "#6b7280",
                      fontSize: "18px",
                      lineHeight: 1,
                      padding: "0 4px",
                    }}
                    aria-label="Drag handle"
                    title="Drag to reorder"
                  >
                    ::
                  </span>

                  <Text as="span" variant="bodyMd" tone="subdued">
                    {index + 1}.
                  </Text>

                  <Text as="span" variant="bodyMd">
                    {item.label}
                  </Text>
                </div>
              ))}
            </div>
          </Box>
        </Box>
      </Card>
    </Page>
  );
}
