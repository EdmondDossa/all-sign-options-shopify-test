import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

export const DesignUploadMail = ({
  order,
  designs,
  customer,
}: {
  order: any;
  designs: any[];
  customer?: any;
}) => {
  const getDesignsForLineItem = (productId: string) =>
    designs.filter((d) => d.productId === productId);

  return (
    <Html>
      <Head />
      <Preview>#{order.order_number} - Upload your file</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={box}>
            <Text style={bold}>All Signs Customizer: Upload File</Text>
            <Text style={paragraph}>Order ID: {order.order_number}</Text>

           { order?.line_items?.map((item: any) => {
            const matchedDesigns = getDesignsForLineItem(item.product_id);
            if (matchedDesigns.length === 0) return null;

            return (
              <div key={item.id} style={productDiv}>
                <Hr style={hr} />
                <div style={optionDiv}>
                  <Text style={bold}>{item.title}</Text>
                  <Text style={{...paragraph, whiteSpace:"nowrap"}}>x {item.quantity}</Text>
                </div>

                {matchedDesigns.map((design) => (
                  design.zipFile ? (
                    <a
                      href={design.zipFile}
                      style={button}
                      target="_blank"
                      rel="noopener noreferrer"
                      key={design.zipFile}
                    >
                      Download ZIP
                    </a>
                  ) : null
                ))}
              </div>
            );
          })}


            {customer && (
              <div style={{ marginTop: "20px" }}>
                <Text style={bold}>Customer Information</Text>
                <Text style={paragraph}>
                  {customer.first_name} {customer.last_name}
                </Text>
                <Text style={paragraph}>{customer.email}</Text>
                <Text style={paragraph}>{customer.phone}</Text>
              </div>
            )}
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default DesignUploadMail;

// ---------------------- Styles ----------------------
const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
};

const box = {
  padding: "0 10px",
};

const productDiv = {
  marginBottom: "20px",
};

const optionDiv = {
  display: "flex",
  gap: "20px",
  alignItems: "center",
};

const paragraph = {
  margin: "4px",
  color: "#525f7f",
  fontSize: "16px",
  lineHeight: "24px",
  textAlign: "left" as const,
};

const bold = {
  ...paragraph,
  fontWeight: "bold",
};

const anchor = {
  color: "#556cd6",
  textDecoration: "underline",
};

const hr = {
  borderColor: "#e6ebf1",
  margin: "20px 0",
};

const button = {
  display: "inline-block",
  padding: "10px 16px",
  marginTop: "10px",
  backgroundColor: "#556cd6",
  color: "#ffffff",
  fontSize: "14px",
  fontWeight: "bold",
  textDecoration: "none",
  borderRadius: "4px",
};

