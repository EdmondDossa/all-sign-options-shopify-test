import {
  BlockStack,
  Box,
  Button,
  Divider,
  InlineStack,
  Text,
  TextField,
  Banner,
} from "@shopify/polaris";
import { useCallback, useState } from "react";
import {
  Form,
  useLoaderData,
  useNavigation,
  useSubmit,
} from "@remix-run/react";
import { BoxBackground } from "~/components/layouts/BoxBackground";
import { SpacingBackground } from "~/components/layouts/SpacingBackground";
import { ReactSwitchCustom } from "~/components/inputs/ReactSwitchCustom";
import { ActionFunctionArgs, LoaderFunctionArgs, json } from "@remix-run/node";
import useHandleFlashMessage from "~/hooks/useHandleFlashMessage";
import { BiSaveBtn } from "~/components/buttons/BiSaveBtn";
import { authenticate } from "~/shopify.server";
import ConfigSettingsService from "~/models/ConfigSetttings.service";
import { jFlashMessage } from "~/utils/message-flash";
import type {
  SimpleOptionGroup,
  SimpleOptionItem,
  SimpleProductOptions,
} from "~/types/ConfigDataType";

const SETTING_SECTION = "generals";
const SETTING_KEY = "simpleOptions";

const DEFAULT_OPTION_GROUPS: SimpleOptionGroup[] = [
  {
    id: "size",
    name: "Size",
    required: true,
    options: [
      { label: '18" x 24" - Set of 8', value: '18x24-set8' },
      { label: '12" x 18" - Set of 20', value: '12x18-set20' },
      { label: '24" x 36" - Set of 5', value: '24x36-set5' },
      { label: '16" x 24" - Set of 12', value: '16x24-set12' },
      { label: '18" x 18" - Set of 10', value: '18x18-set10' },
      { label: '12" x 12" - Set of 32', value: '12x12-set32' },
      { label: '20" x 24" - Set of 8', value: '20x24-set8' },
      { label: '18" x 30" - Set of 6', value: '18x30-set6' },
    ],
  },
  {
    id: "material",
    name: "mm",
    required: true,
    options: [
      { label: "4mm Single-Sided", value: "4mm-single" },
      { label: "4mm Double Sided", value: "4mm-double" },
      { label: "10mm Single-Sided", value: "10mm-single" },
      { label: "10mm Double-Sided", value: "10mm-double" },
    ],
  },
];

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const { session } = await authenticate.admin(request);
  const configId = parseInt(params.configId ?? "");
  const settingData = await ConfigSettingsService.get(
    session.id,
    configId,
    SETTING_SECTION,
    SETTING_KEY,
  );
  return json({ settingData: settingData as SimpleProductOptions | null });
};

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const { session } = await authenticate.admin(request);
  const configId = parseInt(params.configId ?? "");
  const formData = await request.formData();
  const rawData = formData.get("simpleOptionsData");
  if (!rawData || typeof rawData !== "string") {
    return json({ ...jFlashMessage("Invalid data", "error") });
  }
  let parsed: SimpleProductOptions;
  try {
    parsed = JSON.parse(rawData);
  } catch {
    return json({ ...jFlashMessage("Invalid JSON data", "error") });
  }
  const res = await ConfigSettingsService.edit(
    session.id,
    configId,
    SETTING_SECTION,
    SETTING_KEY,
    parsed,
  );
  return res
    ? json({ ...jFlashMessage("Simple Options saved successfully") })
    : json({ ...jFlashMessage("Error saving Simple Options", "error") });
};

function generateId() {
  return Math.random().toString(36).slice(2, 9);
}

export default function SimpleOptionsSettings() {
  const submit = useSubmit();
  const { settingData } = useLoaderData<typeof loader>();
  useHandleFlashMessage();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const [enabled, setEnabled] = useState<boolean>(
    settingData?.enabled ?? false,
  );
  const [optionGroups, setOptionGroups] = useState<SimpleOptionGroup[]>(
    settingData?.optionGroups ?? DEFAULT_OPTION_GROUPS,
  );

  const handleFormSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const data: SimpleProductOptions = { enabled, optionGroups };
      const formData = new FormData();
      formData.append("simpleOptionsData", JSON.stringify(data));
      submit(formData, { method: "POST" });
    },
    [enabled, optionGroups, submit],
  );

  const addGroup = useCallback(() => {
    setOptionGroups((prev) => [
      ...prev,
      { id: generateId(), name: "New Option", required: true, options: [] },
    ]);
  }, []);

  const removeGroup = useCallback((groupId: string) => {
    setOptionGroups((prev) => prev.filter((g) => g.id !== groupId));
  }, []);

  const updateGroupName = useCallback((groupId: string, name: string) => {
    setOptionGroups((prev) =>
      prev.map((g) => (g.id === groupId ? { ...g, name } : g)),
    );
  }, []);

  const toggleGroupRequired = useCallback(
    (groupId: string, required: boolean) => {
      setOptionGroups((prev) =>
        prev.map((g) => (g.id === groupId ? { ...g, required } : g)),
      );
    },
    [],
  );

  const addOption = useCallback((groupId: string) => {
    setOptionGroups((prev) =>
      prev.map((g) =>
        g.id === groupId
          ? {
              ...g,
              options: [...g.options, { label: "", value: generateId() }],
            }
          : g,
      ),
    );
  }, []);

  const removeOption = useCallback((groupId: string, optionValue: string) => {
    setOptionGroups((prev) =>
      prev.map((g) =>
        g.id === groupId
          ? { ...g, options: g.options.filter((o) => o.value !== optionValue) }
          : g,
      ),
    );
  }, []);

  const updateOptionLabel = useCallback(
    (groupId: string, optionValue: string, label: string) => {
      setOptionGroups((prev) =>
        prev.map((g) =>
          g.id === groupId
            ? {
                ...g,
                options: g.options.map((o) =>
                  o.value === optionValue ? { ...o, label } : o,
                ),
              }
            : g,
        ),
      );
    },
    [],
  );

  const resetToDefaults = useCallback(() => {
    setOptionGroups(DEFAULT_OPTION_GROUPS);
  }, []);

  return (
    <Form method="POST" onSubmit={handleFormSubmit}>
      <SpacingBackground border="1px solid #DDDDDD">
        <BoxBackground>
          <Box paddingInline="400" paddingBlock="600">
            <BlockStack gap="600">
              {/* Enable toggle */}
              <SpacingBackground
                border="1px solid #DDDDDD"
                borderRadius="5px"
                height="100%"
              >
                <BlockStack>
                  <SpacingBackground borderBottom="1px solid #DDDDDD">
                    <Box padding="400">
                      <InlineStack wrap={false} align="space-between">
                        <BlockStack gap="100">
                          <Text as="strong">Enable Simple Product Options</Text>
                          <Text as="p" tone="subdued">
                            When enabled, the product page will show simple
                            option selectors (Size, Material…) instead of the
                            full customizer. The customer selects their options
                            and uses the theme's native Add to Cart button.
                          </Text>
                        </BlockStack>
                        <InlineStack
                          wrap={false}
                          blockAlign="center"
                          gap="100"
                        >
                          <Text as="span"> No</Text>
                          <ReactSwitchCustom
                            checked={enabled}
                            setChecked={setEnabled}
                          />
                          <Text as="span"> Yes</Text>
                        </InlineStack>
                      </InlineStack>
                    </Box>
                  </SpacingBackground>
                </BlockStack>
              </SpacingBackground>

              {enabled && (
                <BlockStack gap="400">
                  <Banner tone="info">
                    <Text as="p">
                      Define the option groups (e.g. "Size", "mm") and their
                      values. These will replace the customizer on the product
                      page. The selected values are saved as line item
                      properties on the order.
                    </Text>
                  </Banner>

                  <InlineStack align="space-between" blockAlign="center">
                    <Text as="h3" variant="headingMd">
                      Option Groups
                    </Text>
                    <InlineStack gap="200">
                      <Button onClick={resetToDefaults} variant="plain">
                        Reset to defaults
                      </Button>
                      <Button onClick={addGroup} variant="secondary">
                        + Add group
                      </Button>
                    </InlineStack>
                  </InlineStack>

                  {optionGroups.map((group, gIdx) => (
                    <OptionGroupCard
                      key={group.id}
                      group={group}
                      index={gIdx}
                      onRemoveGroup={removeGroup}
                      onUpdateGroupName={updateGroupName}
                      onToggleRequired={toggleGroupRequired}
                      onAddOption={addOption}
                      onRemoveOption={removeOption}
                      onUpdateOptionLabel={updateOptionLabel}
                    />
                  ))}

                  {optionGroups.length === 0 && (
                    <SpacingBackground
                      border="1px dashed #DDDDDD"
                      borderRadius="5px"
                    >
                      <Box padding="600">
                        <BlockStack align="center">
                          <Text as="p" tone="subdued" alignment="center">
                            No option groups yet. Click "+ Add group" or "Reset
                            to defaults".
                          </Text>
                        </BlockStack>
                      </Box>
                    </SpacingBackground>
                  )}
                </BlockStack>
              )}
            </BlockStack>
          </Box>
        </BoxBackground>
      </SpacingBackground>

      <SpacingBackground width="100%" height="auto" margin="3px 0 0 0">
        <BoxBackground>
          <Box paddingInline="300" paddingBlock="300">
            <InlineStack align="end" gap="600">
              <BiSaveBtn isLoading={isSubmitting} title="Save" />
            </InlineStack>
          </Box>
        </BoxBackground>
      </SpacingBackground>
    </Form>
  );
}

function OptionGroupCard({
  group,
  index,
  onRemoveGroup,
  onUpdateGroupName,
  onToggleRequired,
  onAddOption,
  onRemoveOption,
  onUpdateOptionLabel,
}: {
  group: SimpleOptionGroup;
  index: number;
  onRemoveGroup: (id: string) => void;
  onUpdateGroupName: (id: string, name: string) => void;
  onToggleRequired: (id: string, required: boolean) => void;
  onAddOption: (groupId: string) => void;
  onRemoveOption: (groupId: string, optionValue: string) => void;
  onUpdateOptionLabel: (
    groupId: string,
    optionValue: string,
    label: string,
  ) => void;
}) {
  return (
    <SpacingBackground border="1px solid #DDDDDD" borderRadius="5px">
      <BlockStack>
        {/* Group header */}
        <SpacingBackground borderBottom="1px solid #DDDDDD">
          <Box padding="300">
            <InlineStack wrap={false} align="space-between" blockAlign="center">
              <InlineStack gap="300" blockAlign="center" wrap={false}>
                <Text as="strong" tone="subdued">
                  Group {index + 1}
                </Text>
                <Box minWidth="200px">
                  <TextField
                    label=""
                    labelHidden
                    value={group.name}
                    onChange={(val) => onUpdateGroupName(group.id, val)}
                    placeholder="Group name (e.g. Size)"
                    autoComplete="off"
                  />
                </Box>
              </InlineStack>
              <InlineStack gap="300" blockAlign="center" wrap={false}>
                <InlineStack gap="100" blockAlign="center">
                  <Text as="span" tone="subdued">
                    Required
                  </Text>
                  <ReactSwitchCustom
                    checked={group.required}
                    setChecked={(v) => onToggleRequired(group.id, v)}
                  />
                </InlineStack>
                <Button
                  tone="critical"
                  variant="plain"
                  onClick={() => onRemoveGroup(group.id)}
                >
                  Remove
                </Button>
              </InlineStack>
            </InlineStack>
          </Box>
        </SpacingBackground>

        {/* Options list */}
        <Box padding="300">
          <BlockStack gap="200">
            {group.options.map((opt) => (
              <InlineStack
                key={opt.value}
                gap="200"
                blockAlign="center"
                wrap={false}
              >
                <Box width="100%">
                  <TextField
                    label=""
                    labelHidden
                    value={opt.label}
                    onChange={(val) =>
                      onUpdateOptionLabel(group.id, opt.value, val)
                    }
                    placeholder='e.g. 18" x 24" - Set of 8'
                    autoComplete="off"
                  />
                </Box>
                <Button
                  tone="critical"
                  variant="plain"
                  onClick={() => onRemoveOption(group.id, opt.value)}
                >
                  ✕
                </Button>
              </InlineStack>
            ))}

            {group.options.length === 0 && (
              <Text as="p" tone="subdued">
                No options yet.
              </Text>
            )}

            <Divider />
            <Button
              variant="plain"
              onClick={() => onAddOption(group.id)}
            >
              + Add option
            </Button>
          </BlockStack>
        </Box>
      </BlockStack>
    </SpacingBackground>
  );
}
