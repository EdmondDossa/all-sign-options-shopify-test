import { useNavigate } from "@remix-run/react";
import { EmptyState } from "@shopify/polaris";

export default function Index() {
  const navigate = useNavigate();
  return (
    <EmptyState
      heading="Welcome in All Signs Options"
      action={{
        content: "View configurations",
        onAction() {
          return navigate("configuration");
        },
      }}
      image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
    >
      <p>Design custom signs and signage online</p>
    </EmptyState>
  );
}
