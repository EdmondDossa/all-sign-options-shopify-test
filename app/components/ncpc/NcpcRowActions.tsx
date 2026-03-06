import { useState } from "react";
import { ActionList, Button, Icon, Popover } from "@shopify/polaris";
import { MenuHorizontalIcon } from "@shopify/polaris-icons";

type RowActionItem = {
  content: string;
  icon?: any;
  destructive?: boolean;
  onAction: () => void;
};

interface NcpcRowActionsProps {
  actions: RowActionItem[];
}

export default function NcpcRowActions({ actions }: NcpcRowActionsProps) {
  const [active, setActive] = useState(false);

  return (
    <Popover
      active={active}
      activator={
        <Button
          onClick={() => setActive((curr) => !curr)}
          icon={<Icon source={MenuHorizontalIcon} />}
        />
      }
      onClose={() => setActive(false)}
      preferredAlignment="right"
    >
      <ActionList
        items={actions.map((action) => ({
          ...action,
          onAction: () => {
            action.onAction();
            setActive(false);
          },
        }))}
      />
    </Popover>
  );
}

