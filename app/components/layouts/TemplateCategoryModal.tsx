import { useFetcher } from "@remix-run/react";
import { Box, TextField } from "@shopify/polaris";
import { Modal, TitleBar, useAppBridge } from "@shopify/app-bridge-react";
import { useEffect, useId, useRef, useState } from "react";

const primaryModalButtonStyle = {
  backgroundColor: "rgb(1, 100, 100)",
  color: "white",
  border: "none",
  padding: "8px 16px",
  borderRadius: "4px",
  cursor: "pointer",
} as const;

const secondaryModalButtonStyle = {
  backgroundColor: "transparent",
  border: "1px solid #D1D5DB",
  padding: "8px 16px",
  borderRadius: "4px",
  cursor: "pointer",
} as const;

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit: (category: any) => void;
};

export default function TemplateCategoryModal({ open, onClose, onSubmit }: Props) {
  const shopify = useAppBridge();
  const modalId = useId();
  const fetcher = useFetcher<any>();
  const [name, setName] = useState("");
  const lastHandledCategoryId = useRef<number | null>(null);

  useEffect(() => {
    if (open) {
      shopify.modal.show(modalId);
    }
  }, [modalId, open, shopify]);

  useEffect(() => {
    if (fetcher.state !== "idle" || !fetcher.data) return;

    if (fetcher.data?.messageFlash?.status === "success" && fetcher.data?.category) {
      const currentCategoryId = Number(fetcher.data.category.id || 0);
      if (currentCategoryId && lastHandledCategoryId.current === currentCategoryId) {
        return;
      }
      lastHandledCategoryId.current = currentCategoryId || null;
      onSubmit(fetcher.data.category);
      setName("");
      onClose();
      shopify.modal.hide(modalId);
      shopify.toast.show(fetcher.data.messageFlash.msg, { isError: false });
      return;
    }

    if (fetcher.data?.messageFlash?.status === "error") {
      shopify.toast.show(fetcher.data.messageFlash.msg, { isError: true });
      return;
    }

    if (fetcher.data?.errors?.name?.[0]) {
      shopify.toast.show(fetcher.data.errors.name[0], { isError: true });
    }
  }, [fetcher.data, fetcher.state, modalId, onClose, onSubmit, shopify]);

  const handleSave = () => {
    lastHandledCategoryId.current = null;
    fetcher.submit({ name }, { method: "POST", action: "/app/templates/categories/edit" });
  };

  return (
    <Modal
      variant="small"
      id={modalId}
      onHide={() => {
        setName("");
        onClose();
      }}
    >
      <Box padding="400">
        <TextField
          label="Name"
          autoComplete="off"
          value={name}
          onChange={setName}
        />
      </Box>
      <TitleBar title="Add new category">
        <button
          type="button"
          onClick={() => {
            setName("");
            onClose();
            shopify.modal.hide(modalId);
          }}
          style={secondaryModalButtonStyle}
        >
          Cancel
        </button>
        <button type="button" variant="primary" onClick={handleSave} style={primaryModalButtonStyle}>
          Save
        </button>
      </TitleBar>
    </Modal>
  );
}
