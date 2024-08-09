


import {
    Body,
    Button,
    Container,
    Head,
    Hr,
    Html,
    Img,
    Link,
    Preview,

    Section,
    Text,
  } from "@react-email/components";
  import * as React from "react";
  
  
  
  export const RecapMail = ({data, customer}:{data:any,customer?:any}) => (
    <Html>
      <Head />
      <Preview>#{data[0].orderNumber}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={box}>
          <Text style={bold}>All signs options</Text>
          <Text style={paragraph}>ID:  {data[0].orderNumber} </Text>

         {data?.map((variantRecap:any)=>( <div style={productDiv}>
            <Hr style={hr} />
            
         {variantRecap.recaps?.filesUrl?.designImages?.map( (src:string)=><Img style={{width: "100%", height:"auto"}}
              src={src}
              height="21"
              alt="Stripe"
            />)}
            <div style={optionDiv}>
              <Text style={bold}>{variantRecap.line_item?.title}</Text>
              <Text style={paragraph}>x {variantRecap.line_item?.quantity}   </Text>
            </div>
            <div style={optionDiv}>
              <Text style={bold}>{variantRecap.recaps.material?.label} : </Text>
              <Text style={paragraph}>{variantRecap.recaps.material?.value}</Text>
            </div>
            <div style={optionDiv}>
              <Text style={bold}>{variantRecap.recaps.sign?.size?.label} : </Text>
              <Text style={paragraph}>  {`
                ${variantRecap.recaps.sign?.size?.value?.width?.label} :
                 ${variantRecap.recaps.sign?.size?.value?.width.value}, 
                 ${variantRecap.recaps.sign?.size?.value?.height?.label}:
                  ${variantRecap.recaps.sign?.size?.value?.height.value}
                  `}</Text>
            </div>
            <div style={optionDiv}>
              <Text style={bold}>{variantRecap.recaps.sign?.size?.value?.thickness?.label} :</Text>
              <Text style={paragraph}>{variantRecap.recaps.sign?.size?.value?.thickness.value}</Text>
            </div>
            <div style={optionDiv}>
              <Text style={bold}>{variantRecap.recaps.sign.shape?.label} :</Text>
              <Text style={paragraph}>  {variantRecap.recaps.sign.shape?.value}</Text>
            </div>
            <div style={optionDiv}>
              <Text style={bold}>{variantRecap.recaps.sign.fixingMethod?.label} :</Text>
              <Text style={paragraph}> {variantRecap.recaps.sign.fixingMethod?.value}</Text>
            </div>

       {!variantRecap.recaps.sign.border?.value?.face1 && <div style={optionDiv}>
              <Text style={bold}>{variantRecap.recaps.sign.border?.label} : </Text>
              <Text style={paragraph}>  {variantRecap.recaps.sign.border?.value?.type} {variantRecap.recaps.sign.border.value?.color}: {variantRecap.recaps.sign.border.value?.codeHex} </Text>
            </div>}

            {variantRecap.recaps.sign.border?.value?.face1 && <div style={optionDiv}>
              <Text style={bold}>{variantRecap.recaps.sign.border?.label}-{variantRecap.recaps?.faces?.face1}: </Text>
              <Text style={paragraph}> {variantRecap.recaps.sign.border?.value?.face1?.type}, {variantRecap.recaps.sign.border.value?.face1?.codeHex} </Text>
            </div>}


            {variantRecap.recaps.sign.border?.value?.face2 && <div style={optionDiv}>
              <Text style={bold}>{variantRecap.recaps.sign.border?.label}-{variantRecap.recaps?.faces?.face2}: </Text>
              <Text style={paragraph}> {variantRecap.recaps.sign.border?.value?.face2?.type}, {variantRecap.recaps.sign.border.value?.face2?.codeHex} </Text>
            </div>}

            { !variantRecap.recaps.sign.color.value?.face1 && <div style={optionDiv}>
              <Text style={bold}>{variantRecap.recaps.sign.color?.label} : </Text>
              <Text style={paragraph}> {variantRecap.recaps.sign.color.value?.name}</Text>
            </div>}

            { variantRecap.recaps.sign.color.value?.face1 &&  <div style={optionDiv}>
              <Text style={bold}>{variantRecap.recaps.sign.color?.label}-{variantRecap.recaps?.faces?.face1}: </Text>
              <Text style={paragraph}> {variantRecap.recaps.sign.color.value?.face1?.name}</Text>
            </div>}

            { variantRecap.recaps.sign.color.value?.face2 &&  <div style={optionDiv}>
              <Text style={bold}>{variantRecap.recaps.sign.color?.label}-{variantRecap.recaps?.faces?.face2}: </Text>
              <Text style={paragraph}> {variantRecap.recaps.sign.color.value?.face2?.name}</Text>
            </div>}
      
           {!variantRecap.recaps?.faces?.face1 && <div style={optionDiv}>
              <Text style={bold}>{variantRecap.recaps.texts.label} : </Text>
              <div > {variantRecap.recaps.texts.value?.map((text:any)=>(<>
                <Text style={paragraph}>
                {text?.textContent}
                </Text>
                <Hr style={hrSm} /> 
                <Text style={paragraph}>
                <span style={{whiteSpace:"nowrap"}}> Font: {text?.fontFamily}   </span> <br />
                <span style={{whiteSpace:"nowrap"}}> {text?.values?.width?.label}: {text?.values?.width?.value}  </span> 
                <span style={{whiteSpace:"nowrap"}}> {text?.values?.height?.label}: {text?.values?.height?.value}  </span> 
                <span style={{whiteSpace:"nowrap"}}> {text?.values?.left?.label}: {text?.values?.left?.value} </span> 
                <span style={{whiteSpace:"nowrap"}}> {text?.values?.top?.label}: {text?.values?.top?.value}  </span> 
                <span style={{whiteSpace:"nowrap"}}> {text?.values?.right?.label}: {text?.values?.right?.value} </span> 
                <span style={{whiteSpace:"nowrap", marginBottom: "20px"}}>  {text?.values?.bottom?.label}: {text?.values?.bottom?.value}  </span> 
                </Text>
              </>))} </div>
            </div>
            }


{variantRecap.recaps?.faces?.face1 && <div style={optionDiv}>
              <Text style={bold}>{variantRecap.recaps.texts.label}-{variantRecap.recaps?.faces?.face1} :  </Text>
              <div> {variantRecap.recaps.texts.value?.face1?.map((text:any)=>(<>
                <Text style={paragraph}>
                {text?.textContent}
                </Text>
                <Hr style={hrSm} /> 
                <Text style={paragraph}>
                <span style={{whiteSpace:"nowrap"}}> Font: {text?.fontFamily}   </span> <br />
                <span style={{whiteSpace:"nowrap"}}> {text?.values?.width?.label}: {text?.values?.width?.value}  </span> 
                <span style={{whiteSpace:"nowrap"}}> {text?.values?.height?.label}: {text?.values?.height?.value}  </span> 
                <span style={{whiteSpace:"nowrap"}}> {text?.values?.left?.label}: {text?.values?.left?.value} </span> 
                <span style={{whiteSpace:"nowrap"}}> {text?.values?.top?.label}: {text?.values?.top?.value}  </span> 
                <span style={{whiteSpace:"nowrap"}}> {text?.values?.right?.label}: {text?.values?.right?.value} </span> 
                <span style={{whiteSpace:"nowrap", marginBottom: "20px"}}>  {text?.values?.bottom?.label}: {text?.values?.bottom?.value}  </span> 
                </Text>
              </>))} </div>
            </div>
            }

{variantRecap.recaps?.faces?.face2 && <div style={optionDiv}>
              <Text style={bold}>{variantRecap.recaps.texts.label}-{variantRecap.recaps?.faces?.face2} : </Text>
              <div > {variantRecap.recaps?.texts?.value?.face2?.map((text:any)=>(
                <>
                <Text style={paragraph}>
                {text?.textContent}
                </Text>
                <Hr style={hrSm} /> 
                <Text style={paragraph}>
                <span style={{whiteSpace:"nowrap"}}> Font: {text?.fontFamily}   </span> <br />
                <span style={{whiteSpace:"nowrap"}}> {text?.values?.width?.label}: {text?.values?.width?.value}  </span> 
                <span style={{whiteSpace:"nowrap"}}> {text?.values?.height?.label}: {text?.values?.height?.value}  </span> 
                <span style={{whiteSpace:"nowrap"}}> {text?.values?.left?.label}: {text?.values?.left?.value} </span> 
                <span style={{whiteSpace:"nowrap"}}> {text?.values?.top?.label}: {text?.values?.top?.value}  </span> 
                <span style={{whiteSpace:"nowrap"}}> {text?.values?.right?.label}: {text?.values?.right?.value} </span> 
                <span style={{whiteSpace:"nowrap", marginBottom: "20px"}}>  {text?.values?.bottom?.label}: {text?.values?.bottom?.value}  </span> 
                </Text>
              </>
              ))} </div>
            </div>
            }
            
          </div>))}


        { customer && <div style={{marginTop: "20px"}}>
              <Text style={bold}>Customer's information </Text>
              <Text style={paragraph}>{customer.first_name} {customer.last_name}  </Text>
              <Text style={paragraph}>{customer.email} </Text>
              <Text style={paragraph}>{customer.phone} </Text>
          </div>
          }
          
          
        
           
          </Section>
        </Container>
      </Body>
    </Html>
  );
  
  export default RecapMail;
  
  const main = {
    backgroundColor: "#f6f9fc",
    fontFamily:
      '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
  };

  const optionDiv = {
    margin: "0px",
    padding: "0px",
    display:"flex", gap:"20px"
  }

  const productDiv  = {
    gap: "0px"
  }
  
  const container = {
    backgroundColor: "#ffffff",
    margin: "0 auto",
    padding: "20px 0 48px",
    marginBottom: "64px",
  };
  
  const box = {
    padding: "0 10px",
  };
  
  const hr = {
    borderColor: "#e6ebf1",
    margin: "20px 0",
  };

  const hrSm = {
    borderColor: "#e6ebf1",
    margin: "4px 0",
  };
  
  const paragraph = {
    margin:'4px',
    color: "#525f7f",
    fontSize: "16px",
    lineHeight: "24px",
    textAlign: "left" as const,
  };

  const bold = {
    color: "#525f7f",
    margin:'4px',
    fontSize: "16px",
    lineHeight: "24px",
    fontWeight: "bold",
    whiteSpace: 'nowrap',
    textAlign: "left" as const,

  };


  
  
  const anchor = {
    color: "#556cd6",
  };
  
  const button = {
    backgroundColor: "#656ee8",
    borderRadius: "5px",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "bold",
    textDecoration: "none",
    textAlign: "center" as const,
    display: "block",
    width: "100%",
    padding: "10px",
  };
  
  const footer = {
    color: "#8898aa",
    fontSize: "12px",
    lineHeight: "16px",
  };
  