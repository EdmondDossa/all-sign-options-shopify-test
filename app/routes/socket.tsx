import { json } from "@remix-run/node";
import { testMail } from "~/email";

export const loader = async () => {
    await testMail();
    return json({msg: "i work seriousely"});
}