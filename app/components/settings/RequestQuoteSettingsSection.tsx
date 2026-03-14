import { Box, Card, InlineStack, Text, TextField } from "@shopify/polaris";
import { SaveButton, ToggleButton } from "~/components/buttons";
import { MultiCombobox } from "~/components/inputs";

export type RequestQuoteSettingsValue = {
  enableRequestQuote: boolean;
  receiversEmail: string[];
  sendToCustomer: boolean;
  allowUploadFiles: boolean;
  acceptExtensions: string[];
  maxFileSize: number;
  maxFilesNumber: number;
  emailSubject: string;
};

const extensionOptions = [
  ".jpg",
  ".jpeg",
  ".png",
  ".gif",
  ".bmp",
  ".webp",
  ".tiff",
  ".svg",
  ".ico",
  ".heic",
  ".mp4",
  ".avi",
  ".mov",
  ".wmv",
  ".flv",
  ".mkv",
  ".webm",
  ".3gp",
  ".m4v",
  ".mpg",
  ".mpeg",
  ".pdf",
].map((value) => ({
  label: value.replace(".", "").toUpperCase(),
  value,
}));

const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

function ToggleField({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description?: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <div
      style={{
        display: "grid",
        gap: 6,
        padding: "12px 14px",
        border: "1px solid #e5e7eb",
        borderRadius: 12,
        background: "#ffffff",
      }}
    >
      <InlineStack align="space-between" blockAlign="center">
        <Text as="span" variant="bodyMd" fontWeight="semibold">
          {label}
        </Text>
        <InlineStack gap="150" blockAlign="center" wrap={false}>
          <Text as="span" variant="bodySm" tone="subdued">
            No
          </Text>
          <ToggleButton checked={checked} onChange={(value) => onChange(Boolean(value))} />
          <Text as="span" variant="bodySm" tone="subdued">
            Yes
          </Text>
        </InlineStack>
      </InlineStack>
      {description ? (
        <Text as="p" variant="bodySm" tone="subdued">
          {description}
        </Text>
      ) : null}
    </div>
  );
}

export default function RequestQuoteSettingsSection({
  title = "Request A Quote",
  description = "Configure the request quote flow, recipient emails and file upload restrictions.",
  value,
  saving,
  onChange,
  onSave,
}: {
  title?: string;
  description?: string;
  value: RequestQuoteSettingsValue;
  saving: boolean;
  onChange: (next: RequestQuoteSettingsValue) => void;
  onSave: () => void;
}) {
  const receivers = Array.isArray(value.receiversEmail) ? value.receiversEmail : [];
  const invalidEmails = receivers.filter((email) => email.trim() && !isValidEmail(email));

  return (
    <Card>
      <Box padding="300">
        <Text as="h3" variant="headingMd">
          {title}
        </Text>
        <Box paddingBlockStart="100">
          <Text as="p" tone="subdued">
            {description}
          </Text>
        </Box>

        <Box paddingBlockStart="300">
          <div style={{ display: "grid", gap: 12 }}>
            <ToggleField
              label="Enable Request Quote"
              description="Turn this on to let customers submit quote requests instead of going straight to purchase."
              checked={Boolean(value.enableRequestQuote)}
              onChange={(checked) => onChange({ ...value, enableRequestQuote: checked })}
            />

            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 12 }}>
              <TextField
                label="Receiver Email(s)"
                autoComplete="off"
                helpText="Separate multiple email addresses with commas."
                error={
                  invalidEmails.length > 0
                    ? `Invalid email address${invalidEmails.length > 1 ? "es" : ""}: ${invalidEmails.join(", ")}`
                    : undefined
                }
                value={receivers.join(", ")}
                onChange={(raw) =>
                  onChange({
                    ...value,
                    receiversEmail: raw
                      .split(",")
                      .map((item) => item.trim())
                      .filter(Boolean),
                  })
                }
              />
              <TextField
                label="Email Subject"
                autoComplete="off"
                maxLength={250}
                value={String(value.emailSubject || "")}
                onChange={(emailSubject) => onChange({ ...value, emailSubject })}
              />
            </div>

            <ToggleField
              label="Allow Upload Files"
              description="Allow the customer to attach files to a request quote submission."
              checked={Boolean(value.allowUploadFiles)}
              onChange={(checked) => onChange({ ...value, allowUploadFiles: checked })}
            />

            <MultiCombobox
              label="Accepted Extensions"
              placeholder="Select file extensions"
              helpText="Choose the file extensions customers are allowed to upload."
              data={extensionOptions}
              selectedOptions={value.acceptExtensions || []}
              setSelectedOptions={(acceptExtensions: string[]) =>
                onChange({ ...value, acceptExtensions })
              }
            />

            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 12 }}>
              <TextField
                label="Max File Size (MB)"
                type="number"
                autoComplete="off"
                helpText="Maximum file size allowed for one uploaded file."
                value={String(value.maxFileSize ?? 10)}
                onChange={(raw) =>
                  onChange({
                    ...value,
                    maxFileSize: Number.isFinite(Number(raw)) ? Number(raw) : 10,
                  })
                }
              />
              <TextField
                label="Max Files Number"
                type="number"
                autoComplete="off"
                helpText="Maximum number of files allowed per quote request."
                value={String(value.maxFilesNumber ?? 5)}
                onChange={(raw) =>
                  onChange({
                    ...value,
                    maxFilesNumber: Number.isFinite(Number(raw)) ? Number(raw) : 5,
                  })
                }
              />
            </div>

            <ToggleField
              label="Send To Customer"
              description="Send a copy or acknowledgement of the request quote to the customer."
              checked={Boolean(value.sendToCustomer)}
              onChange={(checked) => onChange({ ...value, sendToCustomer: checked })}
            />
          </div>
        </Box>

        <Box paddingBlockStart="300">
          <InlineStack align="end">
            <SaveButton loading={saving} onClick={onSave}>
              Save Request Quote
            </SaveButton>
          </InlineStack>
        </Box>
      </Box>
    </Card>
  );
}
