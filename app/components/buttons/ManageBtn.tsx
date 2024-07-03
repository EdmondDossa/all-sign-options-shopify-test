import { InlineStack, Text } from "@shopify/polaris"
import RoundManageHistoryIcon from "../icons/RoundManageHistoryIcon"

export const ManageBtn = ({title,handleClick}:{title:string, handleClick:any}) => {
    
   return (<button
       className="add-option-btn"
       onClick={handleClick}
  >
    <InlineStack gap="100" blockAlign="center">
      <RoundManageHistoryIcon /> <Text as="span">{title||"manage "}</Text>
    </InlineStack>
  </button>)
}