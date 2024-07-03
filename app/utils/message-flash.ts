
import { MessageFlash } from "~/types/MessageFlashType";

export function flashMessage(msg: string, status: "info" | "success" | "error" = "success",onlyParam=true) {
    const messageFlash: MessageFlash = {
        msg: msg,
        status:status
    }
    return  `${onlyParam?"?":""}messageFlash=`+encodeURIComponent(`${JSON.stringify(messageFlash)}`);
}


export function jFlashMessage(msg: string, status: "info" | "success" | "error" = "success") {
    const messageFlash: MessageFlash = {
        msg: msg,
        status:status
    }
    return { messageFlash:messageFlash };
}


