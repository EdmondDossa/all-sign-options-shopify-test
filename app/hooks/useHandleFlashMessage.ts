import { useActionData, useSearchParams } from "@remix-run/react";
import { useAppBridge } from "@shopify/app-bridge-react";
import { useEffect } from "react";
import { MessageFlash } from "~/types/MessageFlashType";

function useHandleFlashMessage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const shopify = useAppBridge();
  const actionData: any = useActionData();

  useEffect(() => {
    if (actionData && actionData.hasOwnProperty("messageFlash")) {
      try {
        const messageFlash: MessageFlash = actionData.messageFlash;
        shopify.toast.show(messageFlash.msg, {
          isError: messageFlash.status == "error",
        });
      } catch (error) {
        // Handle parsing errors gracefully
        console.error("Error parsing message flash:", error);
      }
      return;
    }
    const messageFlashStr = searchParams.get("messageFlash");

    if (messageFlashStr && messageFlashStr.trim()!="" ) {
      try {
        const messageFlash: MessageFlash = JSON.parse(messageFlashStr);
        shopify.toast.show(messageFlash.msg, {
          isError: messageFlash.status == "error",
        });
      } catch (error) {
        // Handle parsing errors gracefully
        console.error("Error parsing message flash:", error);
      }
      setSearchParams({ messageFlash: "" });
    }
  }, [actionData]);
}

export default useHandleFlashMessage;
