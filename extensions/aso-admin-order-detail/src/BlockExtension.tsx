import {
  reactExtension,
  useApi,
  AdminBlock,
  BlockStack,
  Text,
  InlineStack,
  Heading,
  Divider,
  Box,
  Link,
  Button,
  Image
} from '@shopify/ui-extensions-react/admin';
import { useEffect, useState } from 'react';

// The target used here must match the target used in the extension's toml file (./shopify.extension.toml)
const TARGET = 'admin.order-details.block.render';

export default reactExtension(TARGET, () => <App />);

async function getVariantRecaps(id:any) {
  const res = await fetch(`/api/order-recaps/${id}`);
  return res.json();
}

function App() {

  // The useApi hook provides access to several useful APIs like i18n and data.
  let  [variantRecaps, setVariantRecaps] = useState<any>()
  const {i18n, data} = useApi(TARGET);


  const [isDownloading, setIsDownloading] = useState(false);

 
  useEffect( ()=> {
    console.log("start  getting data");
    getVariantRecaps( `${data.selected?.[0]?.id}`.replace('gid://shopify/Order/','')).then((res) => {
     
      setVariantRecaps(res)
      console.log('order data', res);
    
    }).catch((err) => console.log('errors getting data', err))
  },[])


  return (
    // The AdminBlock component provides an API for setting the title of the Block extension wrapper.
    <AdminBlock title="ALL SIGNS OPTIONS">
      <BlockStack gap="small small">
        <InlineStack blockAlignment="end">

         <Heading size={4} > {i18n.translate('recapTitle')}  </Heading>
     
        {/* <Link to="app:configuration">Configuration</Link> */}
     
        </InlineStack>
        <BlockStack >

         { variantRecaps?.map((variantRecap:any) => <Box paddingBlockEnd="base">
           <InlineStack inlineAlignment="start" blockAlignment="center" gap="base" >
                <Heading size={5} > {variantRecap.line_item?.title}   </Heading>
                <Heading  size={3} > x {variantRecap.line_item?.quantity}   </Heading>
              </InlineStack>
            <Box >
   
              <Divider/>
              
                <Text  fontWeight="bold-300">{variantRecap.recaps.material?.label} : </Text>
                <Text>{variantRecap.recaps.material?.value} </Text>
                <Text  fontWeight="bold-300">{variantRecap.recaps.sign?.size?.label} : </Text>
                <Text> {`
                ${variantRecap.recaps.sign?.size?.value?.width?.label} :
                 ${variantRecap.recaps.sign?.size?.value?.width.value}, 
                 ${variantRecap.recaps.sign?.size?.value?.height?.label}:
                  ${variantRecap.recaps.sign?.size?.value?.height.value}
                  `} </Text>
                  <Text  fontWeight="bold-300">{variantRecap.recaps.sign?.size?.value?.thickness?.label} : </Text>
                <Text>{variantRecap.recaps.sign?.size?.value?.thickness.value} </Text>
                <Text  fontWeight="bold-300">{variantRecap.recaps.sign?.shape?.label} : </Text>
                <Text> {variantRecap.recaps.sign?.shape?.value}</Text>
                <Text  fontWeight="bold-300">{variantRecap.recaps.sign?.fixingMethod?.label} : </Text>
                <Text> {variantRecap.recaps.sign?.fixingMethod?.value}</Text>
                { !variantRecap.recaps.sign?.border?.value?.face1 &&
                   <>
                <Text  fontWeight="bold-300">{variantRecap.recaps.sign?.border?.label} : </Text>
                <Text> {variantRecap.recaps.sign?.border?.value?.type}, {variantRecap.recaps.sign?.border?.value?.color} </Text>
              </>
              }
               {variantRecap.recaps.sign?.border?.value?.face1 &&<>
                <Text  fontWeight="bold-300">{variantRecap.recaps.sign?.border?.label}-{variantRecap.recaps?.faces?.face1}: </Text>
                <Text> {variantRecap.recaps.sign?.border?.value?.face1?.type}, {variantRecap.recaps.sign?.border?.value?.face1?.color} </Text>
              </>
              }
                  {variantRecap.recaps.sign?.border?.value?.face2 &&
                <>
                    <Text  fontWeight="bold-300">{variantRecap.recaps.sign?.border?.label}-{variantRecap.recaps?.faces?.face2}: </Text>
                    <Text> {variantRecap.recaps.sign?.border?.value?.face2?.type}, {variantRecap.recaps.sign?.border?.value?.face2?.color} </Text>
                
                </>
              }
               { !variantRecap.recaps.sign?.color?.value?.face1 && < >
                <Text  fontWeight="bold-300">{variantRecap.recaps.sign?.color?.label} : </Text>
                <Text>{variantRecap.recaps.sign?.color?.value?.name}</Text>
              </>}
              { variantRecap.recaps.sign?.color?.value?.face1 && <  >
                <Text  fontWeight="bold-300">{variantRecap.recaps.sign?.color?.label}-{variantRecap.recaps?.faces?.face1}: </Text>
                <Text>{variantRecap.recaps.sign?.color?.value?.face1?.name}</Text>
              </>}

              { variantRecap.recaps.sign?.color?.value?.face2 && <>
                <Text  fontWeight="bold-300">{variantRecap.recaps.sign?.color?.label}-{variantRecap.recaps?.faces?.face2}: </Text>
                <Text>{variantRecap.recaps.sign?.color?.value?.face2?.name}</Text>
              </>}
              {!variantRecap.recaps?.faces?.face1 && <>
              <Text fontWeight="bold-300">{variantRecap.recaps?.texts?.label} : </Text>
           {variantRecap.recaps.texts.value?.map((text:any)=>(<>
                <Text >
                {text?.textContent}
                </Text>
                
                <Text fontStyle="italic"  fontWeight="bold-200"> Font: {text?.fontFamily}   </Text> 
                <Text fontStyle="italic"  fontWeight="bold-200">  {text?.values?.width?.label}: {text?.values?.width?.value}  </Text> 
                <Text fontStyle="italic"  fontWeight="bold-200">  {text?.values?.height?.label}: {text?.values?.height?.value}  </Text> 
                <Text fontStyle="italic"  fontWeight="bold-200">  {text?.values?.left?.label}: {text?.values?.left?.value} </Text> 
                <Text fontStyle="italic"  fontWeight="bold-200">  {text?.values?.top?.label}: {text?.values?.top?.value}  </Text> 
                <Text fontStyle="italic"  fontWeight="bold-200">  {text?.values?.right?.label}: {text?.values?.right?.value} </Text> 
                <Text fontStyle="italic"  fontWeight="bold-200">   {text?.values?.bottom?.label}: {text?.values?.bottom?.value}  </Text> 
              
              </>))} 
            </>
            }

{variantRecap.recaps?.faces?.face1  && <>
              <Text fontWeight="bold-300">{variantRecap.recaps?.texts?.label}-{variantRecap.recaps?.faces?.face1} : </Text>
           {variantRecap.recaps?.texts?.value?.face1?.map((text:any)=>(<>
                <Text >
                {text?.textContent}
                </Text>
                
                <Text fontStyle="italic"  fontWeight="bold-200"> Font: {text?.fontFamily}   </Text> 
                <Text fontStyle="italic"  fontWeight="bold-200">  {text?.values?.width?.label}: {text?.values?.width?.value}  </Text> 
                <Text fontStyle="italic"  fontWeight="bold-200">  {text?.values?.height?.label}: {text?.values?.height?.value}  </Text> 
                <Text fontStyle="italic"  fontWeight="bold-200">  {text?.values?.left?.label}: {text?.values?.left?.value} </Text> 
                <Text fontStyle="italic"  fontWeight="bold-200">  {text?.values?.top?.label}: {text?.values?.top?.value}  </Text> 
                <Text fontStyle="italic"  fontWeight="bold-200">  {text?.values?.right?.label}: {text?.values?.right?.value} </Text> 
                <Text fontStyle="italic"  fontWeight="bold-200">   {text?.values?.bottom?.label}: {text?.values?.bottom?.value}  </Text> 
              
              </>))} 
            </>
            }


{variantRecap.recaps?.faces?.face2  && <>
              <Text fontWeight="bold-300">{variantRecap.recaps?.texts?.label}-{variantRecap.recaps?.faces?.face2} : </Text>
           {variantRecap.recaps.texts?.value?.face2?.map((text:any)=>(<>
                <Text >
                {text?.textContent}
                </Text>
                
                <Text fontStyle="italic"  fontWeight="bold-200"> Font: {text?.fontFamily}   </Text> 
                <Text fontStyle="italic"  fontWeight="bold-200">  {text?.values?.width?.label}: {text?.values?.width?.value}  </Text> 
                <Text fontStyle="italic"  fontWeight="bold-200">  {text?.values?.height?.label}: {text?.values?.height?.value}  </Text> 
                <Text fontStyle="italic"  fontWeight="bold-200">  {text?.values?.left?.label}: {text?.values?.left?.value} </Text> 
                <Text fontStyle="italic"  fontWeight="bold-200">  {text?.values?.top?.label}: {text?.values?.top?.value}  </Text> 
                <Text fontStyle="italic"  fontWeight="bold-200">  {text?.values?.right?.label}: {text?.values?.right?.value} </Text> 
                <Text fontStyle="italic"  fontWeight="bold-200">   {text?.values?.bottom?.label}: {text?.values?.bottom?.value}  </Text> 
              
              </>))} 
            </>
            }
              <InlineStack inlineAlignment="space-between" >
              <Link
     href={variantRecap.recaps?.filesUrl?.zipUrl}
    >
      {i18n.translate('bownloadBtn')} 
    </Link>

              </InlineStack>
             
            </Box>
          </Box>)}
          
        </BlockStack>
      </BlockStack>
    </AdminBlock>
  );
}