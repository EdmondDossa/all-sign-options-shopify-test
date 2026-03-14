import { json } from "@remix-run/node";
import type { ActionFunctionArgs } from "@remix-run/node";
import { Box } from "@shopify/polaris";
import { useNavigation, useOutletContext, useSubmit } from "@remix-run/react";
import { useEffect, useMemo, useState } from "react";
import ModeSettingsSection from "~/components/settings/ModeSettingsSection";
import useHandleFlashMessage from "~/hooks/useHandleFlashMessage";
import ConfigSettingsService from "~/models/ConfigSetttings.service";
import { authenticate } from "~/shopify.server";
import { jFlashMessage } from "~/utils/message-flash";

type ModeState = {
  type: "simple" | "multi";
  allowMultiFonts: boolean;
  allowMultiColors: boolean;
  shareAndSave: {
    allowShare: boolean;
    shareSignLocation: "options_review" | "review_only";
    allowSave: boolean;
  };
};

const DEFAULT_MODE: ModeState = {
  type: "simple",
  allowMultiFonts: false,
  allowMultiColors: false,
  shareAndSave: {
    allowShare: false,
    shareSignLocation: "options_review",
    allowSave: false,
  },
};

const normalizeProductType = (value?: string | null) =>
  String(value || "")
    .trim()
    .toLowerCase();

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const { session } = await authenticate.admin(request);
  const configId = parseInt(params.configId ?? "", 10);

  if (!Number.isFinite(configId)) {
    return json({ ...jFlashMessage("Invalid configuration", "error") }, { status: 400 });
  }

  const formData = await request.formData();
  const raw = formData.get("mode");

  if (!raw || typeof raw !== "string") {
    return json({ ...jFlashMessage("Missing mode payload", "error") }, { status: 400 });
  }

  try {
    await ConfigSettingsService.updateSettingsSection(
      configId,
      session.id,
      "generals",
      "mode",
      JSON.parse(raw),
    );

    return json({ ...jFlashMessage("Mode settings updated successfully") });
  } catch (error) {
    return json(
      { ...jFlashMessage(String(error || "Failed to update mode settings"), "error") },
      { status: 400 },
    );
  }
};

export default function ConfigurationGeneralModeRoute() {
  const submit = useSubmit();
  const navigation = useNavigation();
  const { configuration } = useOutletContext<any>();
  useHandleFlashMessage();

  const [mode, setMode] = useState<ModeState>(DEFAULT_MODE);

  const supportsMultiMode = useMemo(() => {
    const direct = normalizeProductType(configuration?.productType);
    const nested = normalizeProductType(configuration?.data?.productType);
    return direct === "neon" || direct === "channel" || nested === "neon" || nested === "channel";
  }, [configuration]);

  useEffect(() => {
    const nextValue = configuration?.data?.settings?.generals?.mode || {};
    setMode({
      ...DEFAULT_MODE,
      ...nextValue,
      type: nextValue?.type === "multi" ? "multi" : "simple",
      allowMultiFonts: Boolean(nextValue?.allowMultiFonts),
      allowMultiColors: Boolean(nextValue?.allowMultiColors),
      shareAndSave: {
        ...DEFAULT_MODE.shareAndSave,
        ...(nextValue?.shareAndSave || {}),
        shareSignLocation:
          nextValue?.shareAndSave?.shareSignLocation === "review_only"
            ? "review_only"
            : "options_review",
      },
    });
  }, [configuration]);

  return (
    <Box paddingBlockEnd="400">
      <ModeSettingsSection
        value={mode}
        saving={navigation.state === "submitting"}
        supportsMultiMode={supportsMultiMode}
        onChange={setMode}
        onSave={() => submit({ mode: JSON.stringify(mode) }, { method: "POST" })}
      />
    </Box>
  );
}
