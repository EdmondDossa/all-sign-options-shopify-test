import { DuplicateIcon } from "@shopify/polaris-icons";
import {
  BlockStack,
  Box,
  Button,
  Modal,
  Text,
  TextField,
} from "@shopify/polaris";
import { useState, useEffect } from "react";

const DuplicateModal = ({
  textFieldLabel = "Label",
  data,
  labelField,
  onDuplicate,
  onOpen,
  onClose,
}: {
  textFieldLabel?: string;
  data: any;
  labelField: string;
  onDuplicate: (data: any) => void;
  onOpen?: () => void;
  onClose?: () => void;
}) => {
  const [active, setActive] = useState(false);
  const [internData, setInternData] = useState<any>({});

  useEffect(() => {
    if (data) {
      setInternData({ ...data });
    }
  }, [data]);

  const handleOpen = () => {
    setActive(true);
    if (onOpen) onOpen();
  };

  const handleClose = () => {
    setActive(false);
    if (onClose) onClose();
  };

  const handleDuplicate = () => {
    onDuplicate(internData);
    handleClose();
  };

  return (
    <>
      <Button
        size="micro"
        icon={DuplicateIcon}
        onClick={handleOpen}
        variant="tertiary"
      />

      <Modal
        open={active}
        onClose={handleClose}
        title="Duplicating configuration"
        primaryAction={{
          content: "Duplicate",
          onAction: handleDuplicate,
        }}
        secondaryActions={[
          {
            content: "Cancel",
            onAction: handleClose,
          },
        ]}
      >
        <Modal.Section>
          <BlockStack gap="400">
            <TextField
              label={textFieldLabel}
              value={internData?.[labelField] || ""}
              onChange={(val) =>
                setInternData((prev: any) => ({
                  ...prev,
                  [labelField]: val,
                }))
              }
              autoComplete="off"
            />
          </BlockStack>
        </Modal.Section>
      </Modal>
    </>
  );
};

export default DuplicateModal;
