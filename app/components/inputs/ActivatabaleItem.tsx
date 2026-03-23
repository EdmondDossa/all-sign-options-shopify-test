import { InlineStack } from "@shopify/polaris";
import { ToggleButton } from "~/components/buttons";

export const ActivatabaleItem = ({ title, status, toggleStatus, children, fillIcon = false, noTrokeIcon = false }: {
  title: string;
  status: boolean;
  toggleStatus: (value: boolean) => void;
  children: React.ReactNode;
  fillIcon?: boolean;
  noTrokeIcon?: boolean;
}) => {
  
  return (
    <InlineStack gap="100"  blockAlign="baseline">
    
    <div
      onClick={() => { toggleStatus(!status) }}
      className={status ? `activatable-item active ${fillIcon && 'fill'}  ${noTrokeIcon && 'no-troke'}` : `activatable-item ${fillIcon && 'fill'}   ${noTrokeIcon && 'no-troke'}`}>
      <div className="activatable-item-child" >
          {children}
      </div>
      <div className="activatable-item-title">
        {title}
      </div>
      </div>
       <ToggleButton checked={status} onChange={(value) => toggleStatus(Boolean(value))} />
    </InlineStack>
  )
  }
  
