import { createCookie, createCookieSessionStorage } from "@remix-run/node";
import { createTypedSessionStorage } from "remix-utils/typed-session";
import { z } from "zod";

let cookie = createCookie("session", {maxAge: 60});



// sessionCookie.flash("messageFlash", {msg:"Configuration  updated is completed successfully", status:"success"});
// sessionCookie.flash("messageFlash", {msg:"Configuration  updated is completed successfully", status:"success"});



let schema = z.object({
	token: z.string().optional(),
	count: z.number().default(1),
});

// you can use a Remix's Cookie container or a Remix Utils' Typed Cookie container
let sessionStorage = createCookieSessionStorage({ cookie });

// pass the session storage and the schema
let typedSessionStorage = createTypedSessionStorage({ sessionStorage, schema });


export const getSessionCookie = (request:Request) => {
  return typedSessionStorage.getSession(request.headers.get("Cookie"));
}

