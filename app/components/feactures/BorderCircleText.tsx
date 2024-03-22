import { Box, InlineStack } from '@shopify/polaris';
export const BorderCircleText = ({text}:{text?:string}) => {
    text = getFirstLetters(text||"AS")
  return (<Box padding="150" borderColor="border-brand" borderWidth="025" borderRadius="full" background="bg-surface-secondary" width="34px" minHeight="34px">
    <InlineStack align='center' blockAlign='center'>
      {text}
      </InlineStack>
    </Box>);
}
  

function getFirstLetters(text:string) {
    text = text.replace(/\s+/g, " ");
    const sentences = text.split(" ");
  
    if (sentences.length < 2) {
      text = (sentences[0].length > 0 ? sentences[0].charAt(0) : "") + (sentences[0].length > 1 ? sentences[0].charAt(1) : "");
      return text.toLowerCase();
    }
  
    const firstLetter1 = sentences[0].length>0 ? sentences[0].charAt(0):"";
    const firstLetter2 =  sentences[1].length>0 ? sentences[1].charAt(0):"";
  
    text = firstLetter1 + firstLetter2;
    return text.toUpperCase() ;
  }