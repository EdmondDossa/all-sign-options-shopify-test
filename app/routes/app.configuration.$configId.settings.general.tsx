import { json } from "@remix-run/node";
import type { ActionFunctionArgs } from "@remix-run/node";
import {
  Banner,
  Box,
  Button,
  Card,
  Divider,
  Grid,
  InlineStack,
  Select,
  Text,
  TextField,
} from "@shopify/polaris";
import { Outlet, useLocation, useNavigation, useOutletContext, useParams, useSubmit } from "@remix-run/react";
import { useEffect, useMemo, useState } from "react";
import SaveButton from "~/components/buttons/SaveButton";
import { ToggleButton } from "~/components/buttons";
import { FileInput } from "~/components/inputs/FileInput";
import { MultiCombobox } from "~/components/inputs";
import CollapsibleSectionCard from "~/components/settings/CollapsibleSectionCard";
import ModeSettingsSection from "~/components/settings/ModeSettingsSection";
import RequestQuoteSettingsSection from "~/components/settings/RequestQuoteSettingsSection";
import useHandleFlashMessage from "~/hooks/useHandleFlashMessage";
import ConfigSettingsService from "~/models/ConfigSetttings.service";
import { authenticate } from "~/shopify.server";
import { jFlashMessage } from "~/utils/message-flash";

type ProductSettings = {
  designFromScratch: boolean;
  redirectAfterAddingToCart: boolean;
  redirectToCheckOutPage: boolean;
  hideAddToCartButtonOnShopPage: boolean;
  hidePricing: boolean;
  showRecapAfterFinish: boolean;
  uploadFileOnFinish: boolean;
};

type ModeSettings = {
  type: "simple" | "multi";
  allowMultiFonts: boolean;
  allowMultiColors: boolean;
  shareAndSave: {
    allowShare: boolean;
    shareSignLocation: "options_review" | "review_only";
    allowSave: boolean;
  };
};

type OutputSettings = {
  filesFormat: string;
  waterMark: string;
  zipOutputFiles: {
    active: boolean;
    zipOutFolderPrefix: string;
  };
  designComposition: boolean;
  pdfDpi: number;
};

type UploadSettings = {
  allowFormat: string;
  maxUploadSize: number;
  maxUploadNumber: number;
  zipFiles: {
    active: boolean;
    zipOutFolderPrefix: string;
  };
};

type QuantityLimitSettings = {
  enableQuantityLimits: boolean;
  minQuantity?: number;
  maxQuantity?: number;
};

type DiscountType = "none" | "percent" | "fixed";

type DiscountLot = {
  id: string;
  quantity: number | string;
  discount: DiscountType;
  discountValue: number | string;
};

type DiscountSettings = {
  byQuantity: boolean;
  discount: DiscountType;
  discountValue: number | string;
  lots: DiscountLot[];
};

type MobileSettings = {
  showNavigatorMenu: string;
  showNavigationMenuFirst: string;
  mobileSelectionOptionsDisplay: string;
};

type RequestQuoteSettings = {
  enableRequestQuote: boolean;
  receiversEmail: string[];
  sendToCustomer: boolean;
  allowUploadFiles: boolean;
  acceptExtensions: string[];
  maxFileSize: number;
  maxFilesNumber: number;
  emailSubject: string;
};

type SimpleOptionItem = {
  label: string;
  value: string;
};

type SimpleOptionGroup = {
  id: string;
  name: string;
  required: boolean;
  options: SimpleOptionItem[];
};

type SimpleOptionsSettings = {
  enabled: boolean;
  optionGroups: SimpleOptionGroup[];
};

const fileFormatOptions = [
  { label: "PNG", value: "png" },
  { label: "JPEG", value: "jpeg" },
  { label: "SVG", value: "svg" },
  { label: "PNG + SVG", value: "png+svg" },
  { label: "JPEG + SVG", value: "jpeg+svg" },
  { label: "PNG + JPEG", value: "png+jpeg" },
];

const pdfDpiOptions = [
  { label: "72 DPI (Screen)", value: "72" },
  { label: "150 DPI (Basic Print)", value: "150" },
  { label: "300 DPI (Quality Print)", value: "300" },
  { label: "600 DPI (High Quality Print)", value: "600" },
];

const mobileMenuOptions = [
  { label: "Off", value: "off" },
  { label: "On", value: "on" },
];

const mobileFirstOptions = [
  { label: "Yes", value: "yes" },
  { label: "No", value: "no" },
];

const mobileDisplayOptions = [
  { label: "Horizontally Stack", value: "horizontally" },
  { label: "Scroll", value: "scroll" },
];

const uploadFormatOptions = [
  "jpg",
  "jpeg",
  "png",
  "gif",
  "bmp",
  "tiff",
  "webp",
  "psd",
  "ai",
  "svg",
  "eps",
  "pdf",
].map((value) => ({
  label: value.toUpperCase(),
  value,
}));

const DEFAULT_OPTION_GROUPS: SimpleOptionGroup[] = [
  {
    id: "size",
    name: "Size",
    required: true,
    options: [
      { label: '18" x 24" - Set of 8', value: '18x24-set8' },
      { label: '12" x 18" - Set of 20', value: '12x18-set20' },
      { label: '24" x 36" - Set of 5', value: '24x36-set5' },
    ],
  },
  {
    id: "material",
    name: "mm",
    required: true,
    options: [
      { label: "4mm Single-Sided", value: "4mm-single" },
      { label: "10mm Single-Sided", value: "10mm-single" },
    ],
  },
];

const defaultProduct = (): ProductSettings => ({
  designFromScratch: true,
  redirectAfterAddingToCart: true,
  redirectToCheckOutPage: false,
  hideAddToCartButtonOnShopPage: false,
  hidePricing: false,
  showRecapAfterFinish: true,
  uploadFileOnFinish: false,
});

const defaultMode = (): ModeSettings => ({
  type: "simple",
  allowMultiFonts: false,
  allowMultiColors: false,
  shareAndSave: {
    allowShare: false,
    shareSignLocation: "options_review",
    allowSave: false,
  },
});

const defaultOutput = (): OutputSettings => ({
  filesFormat: "png",
  waterMark: "",
  zipOutputFiles: {
    active: false,
    zipOutFolderPrefix: "aso_",
  },
  designComposition: false,
  pdfDpi: 300,
});

const defaultUpload = (): UploadSettings => ({
  allowFormat: "jpg,jpeg,png,gif,bmp,tiff,webp,psd,ai,svg,eps,pdf",
  maxUploadSize: 100,
  maxUploadNumber: 5,
  zipFiles: {
    active: false,
    zipOutFolderPrefix: "aso_",
  },
});

const defaultQuantityLimits = (): QuantityLimitSettings => ({
  enableQuantityLimits: false,
  minQuantity: 1,
  maxQuantity: undefined,
});

const defaultDiscount = (): DiscountSettings => ({
  byQuantity: false,
  discount: "none",
  discountValue: 0,
  lots: [
    {
      id: generateId(),
      quantity: 1,
      discount: "percent",
      discountValue: 0,
    },
  ],
});

const defaultMobile = (): MobileSettings => ({
  showNavigatorMenu: "off",
  showNavigationMenuFirst: "yes",
  mobileSelectionOptionsDisplay: "horizontally",
});

const defaultRequestQuote = (): RequestQuoteSettings => ({
  enableRequestQuote: false,
  receiversEmail: [],
  sendToCustomer: false,
  allowUploadFiles: false,
  acceptExtensions: [".jpg", ".png", ".svg", ".pdf"],
  maxFileSize: 10,
  maxFilesNumber: 5,
  emailSubject: "Request A Quote",
});

const defaultSimpleOptions = (): SimpleOptionsSettings => ({
  enabled: false,
  optionGroups: DEFAULT_OPTION_GROUPS,
});

const normalizeProductType = (value?: string | null) =>
  String(value || "")
    .trim()
    .toLowerCase();

const sanitizeProduct = (raw: any = {}): ProductSettings => ({
  designFromScratch: raw?.designFromScratch === undefined ? true : Boolean(raw.designFromScratch),
  redirectAfterAddingToCart:
    raw?.redirectAfterAddingToCart !== undefined
      ? Boolean(raw.redirectAfterAddingToCart)
      : raw?.redirectAfterAddToCart !== undefined
        ? Boolean(raw.redirectAfterAddToCart)
        : true,
  redirectToCheckOutPage: Boolean(raw?.redirectToCheckOutPage),
  hideAddToCartButtonOnShopPage: Boolean(raw?.hideAddToCartButtonOnShopPage),
  hidePricing: Boolean(raw?.hidePricing),
  showRecapAfterFinish:
    raw?.showRecapAfterFinish === undefined ? true : Boolean(raw.showRecapAfterFinish),
  uploadFileOnFinish: Boolean(raw?.uploadFileOnFinish),
});

const sanitizeMode = (raw: any = {}): ModeSettings => ({
  type: raw?.type === "multi" ? "multi" : "simple",
  allowMultiFonts: Boolean(raw?.allowMultiFonts),
  allowMultiColors: Boolean(raw?.allowMultiColors),
  shareAndSave: {
    allowShare: Boolean(raw?.shareAndSave?.allowShare),
    allowSave: Boolean(raw?.shareAndSave?.allowSave),
    shareSignLocation: raw?.shareAndSave?.shareSignLocation === "review_only" ? "review_only" : "options_review",
  },
});

const sanitizeOutput = (raw: any = {}): OutputSettings => ({
  filesFormat: typeof raw?.filesFormat === "string" ? raw.filesFormat : "png",
  waterMark: typeof raw?.waterMark === "string" ? raw.waterMark : "",
  zipOutputFiles: {
    active: Boolean(raw?.zipOutputFiles?.active),
    zipOutFolderPrefix:
      typeof raw?.zipOutputFiles?.zipOutFolderPrefix === "string"
        ? raw.zipOutputFiles.zipOutFolderPrefix
        : "aso_",
  },
  designComposition: Boolean(raw?.designComposition),
  pdfDpi: [72, 150, 300, 600].includes(Number(raw?.pdfDpi)) ? Number(raw.pdfDpi) : 300,
});

const sanitizeUpload = (raw: any = {}): UploadSettings => ({
  allowFormat:
    typeof raw?.allowFormat === "string"
      ? raw.allowFormat
      : "jpg,jpeg,png,gif,bmp,tiff,webp,psd,ai,svg,eps,pdf",
  maxUploadSize: Number.isFinite(Number(raw?.maxUploadSize)) ? Number(raw.maxUploadSize) : 100,
  maxUploadNumber: Number.isFinite(Number(raw?.maxUploadNumber)) ? Number(raw.maxUploadNumber) : 5,
  zipFiles: {
    active: Boolean(raw?.zipFiles?.active),
    zipOutFolderPrefix:
      typeof raw?.zipFiles?.zipOutFolderPrefix === "string" ? raw.zipFiles.zipOutFolderPrefix : "aso_",
  },
});

const sanitizeQuantityLimits = (raw: any = {}): QuantityLimitSettings => ({
  enableQuantityLimits: Boolean(raw?.enableQuantityLimits),
  minQuantity:
    raw?.minQuantity === undefined || raw?.minQuantity === null || raw?.minQuantity === ""
      ? undefined
      : Number(raw.minQuantity),
  maxQuantity:
    raw?.maxQuantity === undefined || raw?.maxQuantity === null || raw?.maxQuantity === ""
      ? undefined
      : Number(raw.maxQuantity),
});

const sanitizeDiscountType = (value: any): DiscountType =>
  value === "percent" || value === "fixed" ? value : "none";

const resolveLegacyMaterialDiscounts = (configuration: any): DiscountLot[] => {
  const data = configuration?.data || {};
  const materials = Array.isArray(data?.materials) ? data.materials : [];
  const source =
    materials.find((material: any) => Array.isArray(material?.discounts) && material.discounts.length > 0) ||
    materials.find((material: any) => Boolean(material?.isDefault)) ||
    materials[0];
  const discounts = Array.isArray(source?.discounts) ? source.discounts : [];

  return discounts.map((item: any) => ({
    id: generateId(),
    quantity:
      item?.quantity === undefined || item?.quantity === null || item?.quantity === ""
        ? 0
        : Number(item.quantity),
    discount: "percent" as DiscountType,
    discountValue:
      item?.discountPercentage === undefined ||
      item?.discountPercentage === null ||
      item?.discountPercentage === ""
        ? 0
        : Number(item.discountPercentage),
  }));
};

const sanitizeDiscount = (
  raw: any = {},
  legacyLots: DiscountLot[] = [],
): DiscountSettings => {
  const defaults = defaultDiscount();
  const rawLots = Array.isArray(raw?.lots) ? raw.lots : [];
  const lotsSource = rawLots.length > 0 ? rawLots : legacyLots;

  return {
    byQuantity:
      typeof raw?.byQuantity === "boolean" ? raw.byQuantity : lotsSource.length > 0,
    discount: sanitizeDiscountType(raw?.discount),
    discountValue:
      raw?.discountValue === undefined || raw?.discountValue === null || raw?.discountValue === ""
        ? 0
        : Number(raw.discountValue),
    lots:
      lotsSource.length > 0
        ? lotsSource.map((lot: any) => ({
            id: String(lot?.id || generateId()),
            quantity:
              lot?.quantity === undefined || lot?.quantity === null || lot?.quantity === ""
                ? 0
                : Number(lot.quantity),
            discount:
              rawLots.length > 0
                ? sanitizeDiscountType(lot?.discount)
                : "percent",
            discountValue:
              lot?.discountValue !== undefined &&
              lot?.discountValue !== null &&
              lot?.discountValue !== ""
                ? Number(lot.discountValue)
                : lot?.discountPercentage !== undefined &&
                    lot?.discountPercentage !== null &&
                    lot?.discountPercentage !== ""
                  ? Number(lot.discountPercentage)
                  : 0,
          }))
        : defaults.lots,
  };
};

const sanitizeMobile = (raw: any = {}): MobileSettings => ({
  showNavigatorMenu: raw?.showNavigatorMenu === "on" ? "on" : "off",
  showNavigationMenuFirst: raw?.showNavigationMenuFirst === "no" ? "no" : "yes",
  mobileSelectionOptionsDisplay:
    raw?.mobileSelectionOptionsDisplay === "scroll" ? "scroll" : "horizontally",
});

const sanitizeRequestQuote = (raw: any = {}): RequestQuoteSettings => ({
  enableRequestQuote: Boolean(raw?.enableRequestQuote),
  receiversEmail: Array.isArray(raw?.receiversEmail) ? raw.receiversEmail.map((item: any) => String(item || "").trim()).filter(Boolean) : [],
  sendToCustomer: Boolean(raw?.sendToCustomer),
  allowUploadFiles: Boolean(raw?.allowUploadFiles),
  acceptExtensions: Array.isArray(raw?.acceptExtensions) ? raw.acceptExtensions.map((item: any) => String(item || "").trim()).filter(Boolean) : [".jpg", ".png", ".svg", ".pdf"],
  maxFileSize: Number.isFinite(Number(raw?.maxFileSize)) ? Number(raw.maxFileSize) : 10,
  maxFilesNumber: Number.isFinite(Number(raw?.maxFilesNumber)) ? Number(raw.maxFilesNumber) : 5,
  emailSubject: typeof raw?.emailSubject === "string" ? raw.emailSubject : "Request A Quote",
});

const sanitizeSimpleOptions = (raw: any = {}): SimpleOptionsSettings => ({
  enabled: Boolean(raw?.enabled),
  optionGroups: Array.isArray(raw?.optionGroups) && raw.optionGroups.length > 0 ? raw.optionGroups : DEFAULT_OPTION_GROUPS,
});

const generateId = () => Math.random().toString(36).slice(2, 9);

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const { session } = await authenticate.admin(request);
  const configId = parseInt(params.configId ?? "", 10);

  if (!Number.isFinite(configId)) {
    return json({ ...jFlashMessage("Invalid configuration", "error") }, { status: 400 });
  }

  const formData = await request.formData();
  const section = String(formData.get("section") || "").trim();
  const rawPayload = String(formData.get("payload") || "");

  if (!section || !rawPayload) {
    return json({ ...jFlashMessage("Missing settings payload", "error") }, { status: 400 });
  }

  let parsed: any;
  try {
    parsed = JSON.parse(rawPayload);
  } catch {
    return json({ ...jFlashMessage("Invalid settings payload", "error") }, { status: 400 });
  }

  const map: Record<string, { key: string; sanitize: (value: any) => any }> = {
    product: { key: "product", sanitize: sanitizeProduct },
    mode: { key: "mode", sanitize: sanitizeMode },
    output: { key: "output", sanitize: sanitizeOutput },
    upload: { key: "upload", sanitize: sanitizeUpload },
    quantityLimits: { key: "quantityLimits", sanitize: sanitizeQuantityLimits },
    discount: { key: "discount", sanitize: sanitizeDiscount },
    mobile: { key: "mobile", sanitize: sanitizeMobile },
    requestQuote: { key: "requestQuote", sanitize: sanitizeRequestQuote },
    simpleOptions: { key: "simpleOptions", sanitize: sanitizeSimpleOptions },
  };

  const target = map[section];
  if (!target) {
    return json({ ...jFlashMessage("Unsupported settings section", "error") }, { status: 400 });
  }

  const result = await ConfigSettingsService.updateSettingsSection(
    configId,
    session.id,
    "generals",
    target.key,
    target.sanitize(parsed),
  );

  if (!result) {
    return json({ ...jFlashMessage("Unable to update settings", "error") }, { status: 500 });
  }

  return json({ ok: true, section, ...jFlashMessage(`${target.key} settings updated successfully`) });
};

function SectionSave({ loading, onClick, label }: { loading: boolean; onClick: () => void; label: string }) {
  return (
    <Box paddingBlockStart="300">
      <InlineStack align="end">
        <SaveButton loading={loading} onClick={onClick}>
          {label}
        </SaveButton>
      </InlineStack>
    </Box>
  );
}

function ProductConfigItem({
  title,
  children,
  checked,
  setChecked,
}: {
  title: string;
  children?: React.ReactNode;
  checked: boolean;
  setChecked: (value: boolean) => void;
}) {
  return (
    <div
      style={{
        height: "100%",
        border: "1px solid #d1d5db",
        borderRadius: 12,
        overflow: "hidden",
        background: "#ffffff",
      }}
    >
      <div style={{ padding: 16, borderBottom: "1px solid #e5e7eb" }}>
        <InlineStack wrap={false} align="space-between">
          <Box>
            <Text as="strong">{title}</Text>
          </Box>
          <InlineStack wrap={false} blockAlign="center" gap="100">
            <Text as="span">No</Text>
            <ToggleButton checked={checked} onChange={(value) => setChecked(Boolean(value))} />
            <Text as="span">Yes</Text>
          </InlineStack>
        </InlineStack>
      </div>
      <Box padding="400">
        <Text as="p">{children}</Text>
      </Box>
    </div>
  );
}

function ToggleField({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
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
  onUpdateOptionLabel: (groupId: string, optionValue: string, label: string) => void;
}) {
  return (
    <div style={{ border: "1px solid #d1d5db", borderRadius: 12, overflow: "hidden" }}>
      <div style={{ padding: 16, borderBottom: "1px solid #e5e7eb" }}>
        <InlineStack wrap={false} align="space-between" blockAlign="center">
          <InlineStack gap="300" blockAlign="center" wrap={false}>
            <Text as="strong" tone="subdued">
              Group {index + 1}
            </Text>
            <div style={{ minWidth: 220 }}>
              <TextField
                label=""
                labelHidden
                value={group.name}
                onChange={(val) => onUpdateGroupName(group.id, val)}
                placeholder="Group name"
                autoComplete="off"
              />
            </div>
          </InlineStack>
          <InlineStack gap="300" blockAlign="center" wrap={false}>
            <InlineStack gap="100" blockAlign="center">
              <Text as="span" tone="subdued">
                Required
              </Text>
              <ToggleButton checked={group.required} onChange={(value) => onToggleRequired(group.id, Boolean(value))} />
            </InlineStack>
            <Button tone="critical" variant="plain" onClick={() => onRemoveGroup(group.id)}>
              Remove
            </Button>
          </InlineStack>
        </InlineStack>
      </div>

      <div style={{ padding: 16, display: "grid", gap: 12 }}>
        {group.options.map((opt) => (
          <InlineStack key={opt.value} gap="200" blockAlign="center" wrap={false}>
            <div style={{ width: "100%" }}>
              <TextField
                label=""
                labelHidden
                value={opt.label}
                onChange={(val) => onUpdateOptionLabel(group.id, opt.value, val)}
                placeholder="Option label"
                autoComplete="off"
              />
            </div>
            <Button tone="critical" variant="plain" onClick={() => onRemoveOption(group.id, opt.value)}>
              Remove
            </Button>
          </InlineStack>
        ))}

        {group.options.length === 0 ? (
          <Text as="p" tone="subdued">
            No options yet.
          </Text>
        ) : null}

        <Divider />
        <InlineStack align="start">
          <Button variant="secondary" onClick={() => onAddOption(group.id)}>
            Add option
          </Button>
        </InlineStack>
      </div>
    </div>
  );
}

export default function ConfigSettingsGeneral() {
  const location = useLocation();
  const params = useParams();
  const submit = useSubmit();
  const navigation = useNavigation();
  const { configuration } = useOutletContext<any>();
  useHandleFlashMessage();

  const configId = String(params.configId || "");
  const basePath = `/app/configuration/${configId}/settings/general`;
  const isRootPage = location.pathname === basePath;

  const [product, setProduct] = useState<ProductSettings>(defaultProduct());
  const [mode, setMode] = useState<ModeSettings>(defaultMode());
  const [output, setOutput] = useState<OutputSettings>(defaultOutput());
  const [upload, setUpload] = useState<UploadSettings>(defaultUpload());
  const [quantityLimits, setQuantityLimits] = useState<QuantityLimitSettings>(defaultQuantityLimits());
  const [discount, setDiscount] = useState<DiscountSettings>(defaultDiscount());
  const [mobile, setMobile] = useState<MobileSettings>(defaultMobile());
  const [requestQuote, setRequestQuote] = useState<RequestQuoteSettings>(defaultRequestQuote());
  const [simpleOptions, setSimpleOptions] = useState<SimpleOptionsSettings>(defaultSimpleOptions());

  useEffect(() => {
    const generals = configuration?.data?.settings?.generals || {};
    setProduct(sanitizeProduct(generals.product || {}));
    setMode(sanitizeMode(generals.mode || {}));
    setOutput(sanitizeOutput(generals.output || {}));
    setUpload(sanitizeUpload(generals.upload || {}));
    setQuantityLimits(sanitizeQuantityLimits(generals.quantityLimits || {}));
    setDiscount(sanitizeDiscount(generals.discount || {}, resolveLegacyMaterialDiscounts(configuration)));
    setMobile(sanitizeMobile(generals.mobile || {}));
    setRequestQuote(sanitizeRequestQuote(generals.requestQuote || {}));
    setSimpleOptions(sanitizeSimpleOptions(generals.simpleOptions || {}));
  }, [configuration]);

  const supportsMultiMode = useMemo(() => {
    const direct = normalizeProductType(configuration?.productType);
    const nested = normalizeProductType(configuration?.data?.productType);
    return direct === "neon" || direct === "channel" || nested === "neon" || nested === "channel";
  }, [configuration]);

  const activeSection = String(navigation.formData?.get("section") || "");

  const submitSection = (section: string, value: any) => {
    const formData = new FormData();
    formData.append("section", section);
    formData.append("payload", JSON.stringify(value));
    submit(formData, { method: "POST" });
  };

  const addGroup = () => {
    setSimpleOptions((current) => ({
      ...current,
      optionGroups: [
        ...current.optionGroups,
        { id: generateId(), name: "New Option", required: true, options: [] },
      ],
    }));
  };

  const removeGroup = (groupId: string) => {
    setSimpleOptions((current) => ({
      ...current,
      optionGroups: current.optionGroups.filter((group) => group.id !== groupId),
    }));
  };

  const updateGroupName = (groupId: string, name: string) => {
    setSimpleOptions((current) => ({
      ...current,
      optionGroups: current.optionGroups.map((group) =>
        group.id === groupId ? { ...group, name } : group,
      ),
    }));
  };

  const toggleGroupRequired = (groupId: string, required: boolean) => {
    setSimpleOptions((current) => ({
      ...current,
      optionGroups: current.optionGroups.map((group) =>
        group.id === groupId ? { ...group, required } : group,
      ),
    }));
  };

  const addOption = (groupId: string) => {
    setSimpleOptions((current) => ({
      ...current,
      optionGroups: current.optionGroups.map((group) =>
        group.id === groupId
          ? {
              ...group,
              options: [...group.options, { label: "", value: generateId() }],
            }
          : group,
      ),
    }));
  };

  const removeOption = (groupId: string, optionValue: string) => {
    setSimpleOptions((current) => ({
      ...current,
      optionGroups: current.optionGroups.map((group) =>
        group.id === groupId
          ? { ...group, options: group.options.filter((option) => option.value !== optionValue) }
          : group,
      ),
    }));
  };

  const updateOptionLabel = (groupId: string, optionValue: string, label: string) => {
    setSimpleOptions((current) => ({
      ...current,
      optionGroups: current.optionGroups.map((group) =>
        group.id === groupId
          ? {
              ...group,
              options: group.options.map((option) =>
                option.value === optionValue ? { ...option, label } : option,
              ),
            }
          : group,
      ),
    }));
  };

  const resetSimpleOptions = () => {
    setSimpleOptions({
      enabled: simpleOptions.enabled,
      optionGroups: DEFAULT_OPTION_GROUPS,
    });
  };

  const currencySymbol = String(
    configuration?.data?.currencySymbol ||
      configuration?.data?.settings?.currencySymbol ||
      "$",
  );

  const addDiscountLot = () => {
    setDiscount((current) => {
      const lastQuantity =
        current.lots.length > 0
          ? Number(current.lots[current.lots.length - 1]?.quantity || 0)
          : 0;
      return {
        ...current,
        lots: [
          ...current.lots,
          {
            id: generateId(),
            quantity: lastQuantity + 1,
            discount: "percent",
            discountValue: 0,
          },
        ],
      };
    });
  };

  const removeDiscountLot = (lotId: string) => {
    setDiscount((current) => ({
      ...current,
      lots:
        current.lots.length > 1
          ? current.lots.filter((lot) => lot.id !== lotId)
          : current.lots,
    }));
  };

  const updateDiscountLot = (lotId: string, patch: Partial<DiscountLot>) => {
    setDiscount((current) => ({
      ...current,
      lots: current.lots.map((lot) =>
        lot.id === lotId
          ? {
              ...lot,
              ...patch,
            }
          : lot,
      ),
    }));
  };

  const sectionMenu = [
    { id: "product", label: "Product" },
    { id: "mode", label: "Mode" },
    { id: "output", label: "Output" },
    { id: "upload", label: "Upload Design" },
    { id: "quantity-limits", label: "Quantity Limits" },
    { id: "discount", label: "Discount" },
    { id: "mobile-option", label: "Mobile Option" },
    { id: "request-quote", label: "Request Quote" },
    { id: "simple-options", label: "Simple Options" },
  ];

  if (!isRootPage) {
    return <Outlet />;
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "minmax(0, 1fr) 220px",
        gap: 20,
        alignItems: "start",
      }}
    >
      <div style={{ display: "grid", gap: 16 }}>
        <Card>
          <Box padding="400">
            <Text as="h1" variant="headingLg">
              General
            </Text>
            <Box paddingBlockStart="100">
              <Text as="p" tone="subdued">
                Work with the classic configuration settings in one page. Each block writes directly into the existing classic settings data.
              </Text>
            </Box>
          </Box>
        </Card>

        <CollapsibleSectionCard
          id="product"
          title="Product"
          description="Storefront and add-to-cart behavior, aligned with the standard ASO product settings."
        >
          <Grid gap={{ lg: "10px" }}>
            <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 4, xl: 4 }}>
              <ProductConfigItem
                title="Enable design from scratch"
                checked={product.designFromScratch}
                setChecked={(value) =>
                  setProduct((current) => ({ ...current, designFromScratch: value }))
                }
              >
                Would you like to allow your clients to design the product from scratch? Or do you prefer allowing the customization only for templates assigned to the custom product ?
              </ProductConfigItem>
            </Grid.Cell>
            <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 4, xl: 4 }}>
              <ProductConfigItem
                title="Redirect to cart after adding a custom design to the cart"
                checked={product.redirectAfterAddingToCart}
                setChecked={(value) =>
                  setProduct((current) => ({
                    ...current,
                    redirectAfterAddingToCart: value,
                    redirectToCheckOutPage: !value,
                  }))
                }
              >
                This options allow you to define what to do after adding a design to the cart
              </ProductConfigItem>
            </Grid.Cell>
            <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 4, xl: 4 }}>
              <ProductConfigItem
                title="Redirect to checkout page after adding a custom design to the cart"
                checked={product.redirectToCheckOutPage}
                setChecked={(value) =>
                  setProduct((current) => ({
                    ...current,
                    redirectToCheckOutPage: value,
                    redirectAfterAddingToCart: !value,
                  }))
                }
              >
                This options allow you to define what to do after adding a design to the cart
              </ProductConfigItem>
            </Grid.Cell>
            <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 4, xl: 4 }}>
              <ProductConfigItem
                title="Hide add to cart buttons for custom product on shop"
                checked={product.hideAddToCartButtonOnShopPage}
                setChecked={(value) =>
                  setProduct((current) => ({ ...current, hideAddToCartButtonOnShopPage: value }))
                }
              >
                This options allow you to show/hide the cart button on the cart button on the customization page
              </ProductConfigItem>
            </Grid.Cell>
            <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 4, xl: 4 }}>
              <ProductConfigItem
                title="Hide sign  pricing on design screen "
                checked={product.hidePricing}
                setChecked={(value) => setProduct((current) => ({ ...current, hidePricing: value }))}
              >
                This options allow you to show/hide the sign pricing on design screen
              </ProductConfigItem>
            </Grid.Cell>
            <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 4, xl: 4 }}>
              <ProductConfigItem
                title="Show Recap after finish "
                checked={product.showRecapAfterFinish}
                setChecked={(value) =>
                  setProduct((current) => ({ ...current, showRecapAfterFinish: value }))
                }
              >
                This option allows you to show recap before adding the product to the cart
              </ProductConfigItem>
            </Grid.Cell>
            <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 4, xl: 4 }}>
              <ProductConfigItem
                title="Upload File on Finish"
                checked={product.uploadFileOnFinish}
                setChecked={(value) =>
                  setProduct((current) => ({ ...current, uploadFileOnFinish: value }))
                }
              >
                This option allows you to upload the design file upon completion. It will be associated with the product, and the user can manually add the product to the cart.
              </ProductConfigItem>
            </Grid.Cell>
          </Grid>

          <SectionSave
            loading={navigation.state === "submitting" && activeSection === "product"}
            onClick={() => submitSection("product", product)}
            label="Save Product"
          />
        </CollapsibleSectionCard>

        <CollapsibleSectionCard
          id="mode"
          title="Mode"
          description="Single or multi-selection behavior and share/save capabilities."
        >
          <ModeSettingsSection
            value={mode}
            saving={navigation.state === "submitting" && activeSection === "mode"}
            supportsMultiMode={supportsMultiMode}
            onChange={setMode}
            onSave={() => submitSection("mode", mode)}
          />
        </CollapsibleSectionCard>

        <CollapsibleSectionCard
          id="output"
          title="Output"
          description="Output formats, watermark and generated file settings."
        >
          <div style={{ display: "grid", gap: 16 }}>
            <Select
              label="Output files format"
              options={fileFormatOptions}
              value={output.filesFormat}
              onChange={(value) => setOutput((current) => ({ ...current, filesFormat: value }))}
            />

            <Select
              label="PDF Quality (DPI)"
              options={pdfDpiOptions}
              value={String(output.pdfDpi || 300)}
              onChange={(value) => setOutput((current) => ({ ...current, pdfDpi: Number(value) }))}
            />

            <FileInput
              title="Watermark"
              buttonTitle="Upload image"
              path={output.waterMark}
              handlePath={(value: any) => setOutput((current) => ({ ...current, waterMark: String(value || "") }))}
            />

            <ToggleField
              label="Zip output files"
              description="Package generated output files into a zip archive."
              checked={Boolean(output.zipOutputFiles.active)}
              onChange={(checked) =>
                setOutput((current) => ({
                  ...current,
                  zipOutputFiles: { ...current.zipOutputFiles, active: checked },
                }))
              }
            />

            {output.zipOutputFiles.active ? (
              <TextField
                label="Zip output folder prefix"
                autoComplete="off"
                value={output.zipOutputFiles.zipOutFolderPrefix}
                onChange={(value) =>
                  setOutput((current) => ({
                    ...current,
                    zipOutputFiles: { ...current.zipOutputFiles, zipOutFolderPrefix: value },
                  }))
                }
              />
            ) : null}

            <ToggleField
              label="Design composition"
              description="Include design composition details in the order output."
              checked={Boolean(output.designComposition)}
              onChange={(checked) => setOutput((current) => ({ ...current, designComposition: checked }))}
            />
          </div>

          <SectionSave
            loading={navigation.state === "submitting" && activeSection === "output"}
            onClick={() => submitSection("output", output)}
            label="Save Output"
          />
        </CollapsibleSectionCard>

        <CollapsibleSectionCard
          id="upload"
          title="Upload Design"
          description="Allowed upload formats, size limits and archive rules."
        >
          <div style={{ display: "grid", gap: 16 }}>
            <MultiCombobox
              label="Allowed upload formats"
              placeholder="Select allowed upload formats"
              helpText="Choose the upload formats allowed for customer files."
              data={uploadFormatOptions}
              selectedOptions={String(upload.allowFormat || "")
                .split(",")
                .map((item) => item.trim())
                .filter(Boolean)}
              setSelectedOptions={(values: string[]) =>
                setUpload((current) => ({
                  ...current,
                  allowFormat: values.join(","),
                }))
              }
            />

            <Grid>
              <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 6, xl: 6 }}>
                <TextField
                  label="Maximum upload size (MB)"
                  autoComplete="off"
                  type="number"
                  value={String(upload.maxUploadSize ?? 100)}
                  onChange={(value) =>
                    setUpload((current) => ({
                      ...current,
                      maxUploadSize: Number.isFinite(Number(value)) ? Number(value) : 0,
                    }))
                  }
                />
              </Grid.Cell>
              <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 6, xl: 6 }}>
                <TextField
                  label="Maximum upload number"
                  autoComplete="off"
                  type="number"
                  value={String(upload.maxUploadNumber ?? 5)}
                  onChange={(value) =>
                    setUpload((current) => ({
                      ...current,
                      maxUploadNumber: Number.isFinite(Number(value)) ? Number(value) : 0,
                    }))
                  }
                />
              </Grid.Cell>
            </Grid>

            <ToggleField
              label="Zip output files"
              description="Package customer uploads in a zip file when needed."
              checked={Boolean(upload.zipFiles.active)}
              onChange={(checked) =>
                setUpload((current) => ({
                  ...current,
                  zipFiles: { ...current.zipFiles, active: checked },
                }))
              }
            />

            {upload.zipFiles.active ? (
              <TextField
                label="Zip output folder prefix"
                autoComplete="off"
                value={upload.zipFiles.zipOutFolderPrefix}
                onChange={(value) =>
                  setUpload((current) => ({
                    ...current,
                    zipFiles: { ...current.zipFiles, zipOutFolderPrefix: value },
                  }))
                }
              />
            ) : null}
          </div>

          <SectionSave
            loading={navigation.state === "submitting" && activeSection === "upload"}
            onClick={() => submitSection("upload", upload)}
            label="Save Upload"
          />
        </CollapsibleSectionCard>

        <CollapsibleSectionCard
          id="quantity-limits"
          title="Quantity Limits"
          description="Minimum and maximum quantities allowed for this configuration."
        >
          <div style={{ display: "grid", gap: 16 }}>
            <ToggleField
              label="Enable quantity limits"
              description="Restrict customer orders to a minimum and maximum quantity."
              checked={Boolean(quantityLimits.enableQuantityLimits)}
              onChange={(checked) =>
                setQuantityLimits((current) => ({ ...current, enableQuantityLimits: checked }))
              }
            />

            {quantityLimits.enableQuantityLimits ? (
              <Grid>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 6, xl: 6 }}>
                  <TextField
                    label="Minimum quantity"
                    autoComplete="off"
                    type="number"
                    value={quantityLimits.minQuantity == null ? "" : String(quantityLimits.minQuantity)}
                    onChange={(value) =>
                      setQuantityLimits((current) => ({
                        ...current,
                        minQuantity: value === "" ? undefined : Number(value),
                      }))
                    }
                  />
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 6, xl: 6 }}>
                  <TextField
                    label="Maximum quantity"
                    autoComplete="off"
                    type="number"
                    value={quantityLimits.maxQuantity == null ? "" : String(quantityLimits.maxQuantity)}
                    onChange={(value) =>
                      setQuantityLimits((current) => ({
                        ...current,
                        maxQuantity: value === "" ? undefined : Number(value),
                      }))
                    }
                  />
                </Grid.Cell>
              </Grid>
            ) : null}
          </div>

          <SectionSave
            loading={navigation.state === "submitting" && activeSection === "quantityLimits"}
            onClick={() => submitSection("quantityLimits", quantityLimits)}
            label="Save Quantity Limits"
          />
        </CollapsibleSectionCard>

        <CollapsibleSectionCard
          id="discount"
          title="Discount"
          description="Choose between a simple discount or quantity-based discount lots."
        >
          <div style={{ display: "grid", gap: 16 }}>
            <ToggleField
              label="Discount by quantity"
              description="Turn this on if discounts should depend on ordered quantity."
              checked={Boolean(discount.byQuantity)}
              onChange={(checked) =>
                setDiscount((current) => ({
                  ...current,
                  byQuantity: checked,
                }))
              }
            />

            {!discount.byQuantity ? (
              <div style={{ display: "grid", gap: 16 }}>
                <Select
                  label="Discount type"
                  options={[
                    { label: "None", value: "none" },
                    { label: "Percentage", value: "percent" },
                    { label: "Fixed amount", value: "fixed" },
                  ]}
                  value={discount.discount}
                  onChange={(value) =>
                    setDiscount((current) => ({
                      ...current,
                      discount: sanitizeDiscountType(value),
                    }))
                  }
                />

                {discount.discount !== "none" ? (
                  <TextField
                    label={
                      discount.discount === "percent"
                        ? "Discount percentage"
                        : "Discount fixed amount"
                    }
                    type="number"
                    autoComplete="off"
                    prefix={discount.discount === "fixed" ? currencySymbol : undefined}
                    suffix={discount.discount === "percent" ? "%" : undefined}
                    value={String(discount.discountValue ?? 0)}
                    onChange={(value) =>
                      setDiscount((current) => ({
                        ...current,
                        discountValue: Number(value || 0),
                      }))
                    }
                  />
                ) : null}
              </div>
            ) : (
              <div style={{ display: "grid", gap: 12 }}>
                {discount.lots.map((lot, index) => (
                  <div
                    key={lot.id}
                    style={{
                      border: "1px solid #d1d5db",
                      borderRadius: 12,
                      padding: 16,
                      display: "grid",
                      gap: 12,
                    }}
                  >
                    <InlineStack align="space-between" blockAlign="center">
                      <Text as="strong">{`Lot ${index + 1}`}</Text>
                      <Button
                        tone="critical"
                        variant="plain"
                        onClick={() => removeDiscountLot(lot.id)}
                        disabled={discount.lots.length <= 1}
                      >
                        Remove
                      </Button>
                    </InlineStack>

                    <Grid>
                      <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 4, xl: 4 }}>
                        <TextField
                          label="Minimum quantity"
                          type="number"
                          autoComplete="off"
                          value={String(lot.quantity ?? 0)}
                          onChange={(value) =>
                            updateDiscountLot(lot.id, { quantity: Number(value || 0) })
                          }
                        />
                      </Grid.Cell>
                      <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 4, xl: 4 }}>
                        <Select
                          label="Discount type"
                          options={[
                            { label: "None", value: "none" },
                            { label: "Percentage", value: "percent" },
                            { label: "Fixed amount", value: "fixed" },
                          ]}
                          value={lot.discount}
                          onChange={(value) =>
                            updateDiscountLot(lot.id, {
                              discount: sanitizeDiscountType(value),
                            })
                          }
                        />
                      </Grid.Cell>
                      <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 4, xl: 4 }}>
                        {lot.discount !== "none" ? (
                          <TextField
                            label={
                              lot.discount === "percent"
                                ? "Discount percentage"
                                : "Discount fixed amount"
                            }
                            type="number"
                            autoComplete="off"
                            prefix={lot.discount === "fixed" ? currencySymbol : undefined}
                            suffix={lot.discount === "percent" ? "%" : undefined}
                            value={String(lot.discountValue ?? 0)}
                            onChange={(value) =>
                              updateDiscountLot(lot.id, {
                                discountValue: Number(value || 0),
                              })
                            }
                          />
                        ) : (
                          <div />
                        )}
                      </Grid.Cell>
                    </Grid>
                  </div>
                ))}

                <InlineStack align="start">
                  <Button variant="secondary" onClick={addDiscountLot}>
                    Add lot
                  </Button>
                </InlineStack>
              </div>
            )}
          </div>

          <SectionSave
            loading={navigation.state === "submitting" && activeSection === "discount"}
            onClick={() => submitSection("discount", discount)}
            label="Save Discount"
          />
        </CollapsibleSectionCard>

        <CollapsibleSectionCard
          id="mobile-option"
          title="Mobile Option"
          description="Mobile navigation and selection display preferences."
        >
          <div style={{ display: "grid", gap: 16 }}>
            <Select
              label="Show Navigation Menu on Mobile"
              helpText="Display a navigation menu of the selections on mobile."
              options={mobileMenuOptions}
              value={mobile.showNavigatorMenu}
              onChange={(value) => setMobile((current) => ({ ...current, showNavigatorMenu: value }))}
            />
            <Select
              label="Show Navigation Menu First"
              helpText="Allow customers to jump to a selection from the mobile menu before seeing the first option block."
              options={mobileFirstOptions}
              value={mobile.showNavigationMenuFirst}
              onChange={(value) => setMobile((current) => ({ ...current, showNavigationMenuFirst: value }))}
            />
            <Select
              label="Mobile Selection Options Display"
              helpText="Choose whether selection options are shown as horizontal stacks or scrollable items."
              options={mobileDisplayOptions}
              value={mobile.mobileSelectionOptionsDisplay}
              onChange={(value) => setMobile((current) => ({ ...current, mobileSelectionOptionsDisplay: value }))}
            />
          </div>

          <SectionSave
            loading={navigation.state === "submitting" && activeSection === "mobile"}
            onClick={() => submitSection("mobile", mobile)}
            label="Save Mobile"
          />
        </CollapsibleSectionCard>

        <CollapsibleSectionCard
          id="request-quote"
          title="Request Quote"
          description="Quote request workflow, recipient emails and upload rules."
        >
          <RequestQuoteSettingsSection
            value={requestQuote}
            saving={navigation.state === "submitting" && activeSection === "requestQuote"}
            onChange={setRequestQuote}
            onSave={() => submitSection("requestQuote", requestQuote)}
          />
        </CollapsibleSectionCard>

        <CollapsibleSectionCard
          id="simple-options"
          title="Simple Options"
          description="Replace the full customizer with native product option groups when needed."
        >
          <div style={{ display: "grid", gap: 16 }}>
            <ToggleField
              label="Enable Simple Product Options"
              description="When enabled, the product page will show simple option selectors instead of the full customizer."
              checked={Boolean(simpleOptions.enabled)}
              onChange={(checked) => setSimpleOptions((current) => ({ ...current, enabled: checked }))}
            />

            {simpleOptions.enabled ? (
              <>
                <Banner tone="info">
                  <Text as="p">
                    Define the option groups and values that will replace the customizer on the product page.
                  </Text>
                </Banner>

                <InlineStack align="space-between" blockAlign="center">
                  <Text as="h3" variant="headingMd">
                    Option Groups
                  </Text>
                  <InlineStack gap="200">
                    <Button onClick={resetSimpleOptions} variant="plain">
                      Reset to defaults
                    </Button>
                    <Button onClick={addGroup} variant="secondary">
                      Add group
                    </Button>
                  </InlineStack>
                </InlineStack>

                <div style={{ display: "grid", gap: 12 }}>
                  {simpleOptions.optionGroups.map((group, index) => (
                    <OptionGroupCard
                      key={group.id}
                      group={group}
                      index={index}
                      onRemoveGroup={removeGroup}
                      onUpdateGroupName={updateGroupName}
                      onToggleRequired={toggleGroupRequired}
                      onAddOption={addOption}
                      onRemoveOption={removeOption}
                      onUpdateOptionLabel={updateOptionLabel}
                    />
                  ))}
                </div>
              </>
            ) : null}
          </div>

          <SectionSave
            loading={navigation.state === "submitting" && activeSection === "simpleOptions"}
            onClick={() => submitSection("simpleOptions", simpleOptions)}
            label="Save Simple Options"
          />
        </CollapsibleSectionCard>
      </div>

      <div style={{ position: "sticky", top: 12 }}>
        <Card>
          <Box padding="250">
            <Text as="h2" variant="headingMd">
              Section Menu
            </Text>
            <Box paddingBlockStart="150">
              <div style={{ display: "grid", gap: 8 }}>
                {sectionMenu.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    style={{
                      textDecoration: "none",
                      color: "#111827",
                      border: "1px solid #e5e7eb",
                      borderRadius: 10,
                      padding: "8px 10px",
                      background: "#ffffff",
                      fontSize: 13,
                      fontWeight: 600,
                      lineHeight: 1.2,
                    }}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </Box>
          </Box>
        </Card>
      </div>
    </div>
  );
}
