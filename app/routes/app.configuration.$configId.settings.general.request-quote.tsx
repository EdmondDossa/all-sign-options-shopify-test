import { json } from "@remix-run/node";
import type { ActionFunctionArgs } from "@remix-run/node";
import { Box } from "@shopify/polaris";
import { useNavigation, useOutletContext, useSubmit } from "@remix-run/react";
import { useEffect, useState } from "react";
import RequestQuoteSettingsSection from "~/components/settings/RequestQuoteSettingsSection";
import useHandleFlashMessage from "~/hooks/useHandleFlashMessage";
import ConfigSettingsService from "~/models/ConfigSetttings.service";
import { authenticate } from "~/shopify.server";
import { jFlashMessage } from "~/utils/message-flash";

type RequestQuoteState = {
  enableRequestQuote: boolean;
  receiversEmail: string[];
  sendToCustomer: boolean;
  allowUploadFiles: boolean;
  acceptExtensions: string[];
  maxFileSize: number;
  maxFilesNumber: number;
  emailSubject: string;
};

const DEFAULT_REQUEST_QUOTE: RequestQuoteState = {
  enableRequestQuote: false,
  receiversEmail: [],
  sendToCustomer: false,
  allowUploadFiles: false,
  acceptExtensions: [".jpg", ".png", ".svg", ".pdf"],
  maxFileSize: 10,
  maxFilesNumber: 5,
  emailSubject: "Request A Quote",
};

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const { session } = await authenticate.admin(request);
  const configId = parseInt(params.configId ?? "", 10);

  if (!Number.isFinite(configId)) {
    return json({ ...jFlashMessage("Invalid configuration", "error") }, { status: 400 });
  }

  const formData = await request.formData();
  const raw = formData.get("requestQuote");

  if (!raw || typeof raw !== "string") {
    return json({ ...jFlashMessage("Missing request quote payload", "error") }, { status: 400 });
  }

  try {
    await ConfigSettingsService.updateSettingsSection(
      configId,
      session.id,
      "generals",
      "requestQuote",
      JSON.parse(raw),
    );

    return json({ ...jFlashMessage("Request quote settings updated successfully") });
  } catch (error) {
    return json(
      { ...jFlashMessage(String(error || "Failed to update request quote settings"), "error") },
      { status: 400 },
    );
  }
};

export default function ConfigurationGeneralRequestQuoteRoute() {
  const submit = useSubmit();
  const navigation = useNavigation();
  const { configuration } = useOutletContext<any>();
  useHandleFlashMessage();

  const [requestQuote, setRequestQuote] = useState<RequestQuoteState>(DEFAULT_REQUEST_QUOTE);

  useEffect(() => {
    const nextValue = configuration?.data?.settings?.generals?.requestQuote || {};
    setRequestQuote({
      ...DEFAULT_REQUEST_QUOTE,
      ...nextValue,
      receiversEmail: Array.isArray(nextValue?.receiversEmail)
        ? nextValue.receiversEmail
        : [],
      acceptExtensions: Array.isArray(nextValue?.acceptExtensions)
        ? nextValue.acceptExtensions
        : DEFAULT_REQUEST_QUOTE.acceptExtensions,
    });
  }, [configuration]);

  return (
    <Box paddingBlockEnd="400">
      <RequestQuoteSettingsSection
        value={requestQuote}
        saving={navigation.state === "submitting"}
        onChange={setRequestQuote}
        onSave={() =>
          submit({ requestQuote: JSON.stringify(requestQuote) }, { method: "POST" })
        }
      />
    </Box>
  );
}
