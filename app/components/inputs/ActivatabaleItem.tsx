import { InlineStack } from "@shopify/polaris";
import { ReactSwitchCustom } from "./ReactSwitchCustom";

export const ActivatabaleItem = ({title, status, toggleStatus ,children, fillIcon = false, noTrokeIcon=false }: {
    title: string;
    status: boolean;
    toggleStatus: React.Dispatch<React.SetStateAction<boolean>>;
    children: React.ReactNode;
  fillIcon?: boolean;
  noTrokeIcon?: boolean;
  })=>{
  
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
       <ReactSwitchCustom  checked={status} setChecked={()=>toggleStatus(!status)}/>
    </InlineStack>
  )
  }
  