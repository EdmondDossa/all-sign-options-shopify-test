import { useActionData, useSearchParams } from "@remix-run/react";
import { useAppBridge } from "@shopify/app-bridge-react";
import { useEffect } from "react";
import { MessageFlash } from "~/types/MessageFlashType";



export function FlashToast({ messageFlash }: { messageFlash: MessageFlash|null }) {
  const shopify = useAppBridge();
  useEffect(() => {
    if (messageFlash) {
      shopify.toast.show(messageFlash.msg, {
          isError: messageFlash.status == "error",
      });
    }
    
  }, []);

  return( <></>);
};

