import { json } from "@remix-run/node";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { Box, Card, Text } from "@shopify/polaris";
import {
  useLoaderData,
  useNavigation,
  useOutletContext,
  useSubmit,
} from "@remix-run/react";
import { useEffect, useState } from "react";
import {
  mergeTextSettings,
  resolveLegacyTextImages,
  TextSetupSection,
  type TextSettingsState,
} from "~/features/classic-design-setup.shared";
import ConfigurationService from "~/models/Configuration.service";
import { authenticate } from "~/shopify.server";
import { jFlashMessage } from "~/utils/message-flash";
import { getPlan } from "~/utils/pricing-server.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { session, admin, billing } = await authenticate.admin(request);
  const plan = await getPlan(billing, session?.shop, admin);
  return json({ plan });
};

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const { session } = await authenticate.admin(request);
  const configId = parseInt(params.configId ?? "", 10);

  if (!Number.isFinite(configId)) {
    return json(
      { ...jFlashMessage("Invalid configuration", "error") },
      { status: 400 },
    );
  }

  const formData = await request.formData();
  const rawPayload = String(formData.get("payload") || "");

  if (!rawPayload) {
    return json(
      { ...jFlashMessage("Missing text settings payload", "error") },
      { status: 400 },
    );
  }

  let parsed: any;
  try {
    parsed = JSON.parse(rawPayload);
  } catch {
    return json(
      { ...jFlashMessage("Invalid text settings payload", "error") },
      { status: 400 },
    );
  }

  const configuration: any = await ConfigurationService.getConfiguration(configId, session.id);
  if (!configuration) {
    return json(
      { ...jFlashMessage("Unable to load configuration", "error") },
      { status: 500 },
    );
  }

  const nextData = typeof configuration.data === "string"
    ? JSON.parse(configuration.data || "{}")
    : { ...(configuration.data || {}) };
  const settings = { ...(nextData.settings || {}) };
  const customizerSign = { ...(settings.customizerSign || {}) };
  const configOptions = Array.isArray(customizerSign.configOptions)
    ? [...customizerSign.configOptions]
    : [];

  const setConfigOptionActive = (type: string, active: boolean) => {
    const index = configOptions.findIndex((item: any) => item?.type === type);
    if (index >= 0) {
      configOptions[index] = { ...configOptions[index], active };
      return;
    }
    configOptions.push({ type, active });
  };

  setConfigOptionActive("texts", Boolean(parsed.active));
  setConfigOptionActive("qrcodes", Boolean(parsed.enableQrCode));

  const materials = Array.isArray(nextData.materials) ? nextData.materials : [];
  nextData.materials = materials.map((material: any) => ({
    ...material,
    data: {
      ...(material?.data || {}),
      textImages: {
        ...(material?.data?.textImages || {}),
        enableText: Boolean(parsed.active),
        enableQrCode: Boolean(parsed.enableQrCode),
      },
    },
  }));

  customizerSign.text = parsed;
  customizerSign.configOptions = configOptions;
  settings.customizerSign = customizerSign;
  nextData.settings = settings;

  configuration.data = nextData;
  const result = await ConfigurationService.updateConfiguration(configuration, session.id);

  if (!result) {
    return json(
      { ...jFlashMessage("Unable to update text settings", "error") },
      { status: 500 },
    );
  }

  return json({
    ok: true,
    ...jFlashMessage("Text settings updated successfully"),
  });
};

export default function ConfigurationDesignSetupText() {
  const { configuration } = useOutletContext<any>();
  const { plan } = useLoaderData<typeof loader>();
  const navigation = useNavigation();
  const submit = useSubmit();
  const legacyTextImages = resolveLegacyTextImages(configuration?.data);
  const [textSettings, setTextSettings] = useState<TextSettingsState>(
    mergeTextSettings(configuration?.data?.settings?.customizerSign?.text, legacyTextImages),
  );

  useEffect(() => {
    const section = configuration?.data?.settings?.customizerSign || {};
    setTextSettings(mergeTextSettings(section?.text, resolveLegacyTextImages(configuration?.data)));
  }, [configuration]);

  const submitSection = () => {
    const formData = new FormData();
    formData.append("payload", JSON.stringify(textSettings));
    submit(formData, { method: "POST" });
  };

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <Card>
        <Box padding="400">
          <Text as="h1" variant="headingLg">
            Text Setting
          </Text>
          <Box paddingBlockStart="100">
            <Text as="p" tone="subdued">
              Bring text configuration closer to the core setup, while keeping
              the same classic save location.
            </Text>
          </Box>
        </Box>
      </Card>
      <TextSetupSection
        textSettings={textSettings}
        setTextSettings={setTextSettings}
        plan={plan}
        loading={navigation.state === "submitting"}
        onSave={submitSection}
      />
    </div>
  );
}
