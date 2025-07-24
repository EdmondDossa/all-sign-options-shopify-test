import { data, LoaderFunctionArgs } from "@remix-run/node";
import { authenticate } from "~/shopify.server";

export const  loader = async ({ request, params }: LoaderFunctionArgs) => {

    const { admin, session } = await authenticate.public.appProxy(request);

        // Your Google OAuth 2.0 credentials
    const clientId = process.env.GOOGLE_DRIVE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_DRIVE_CLIENT_SECRET;
    const refreshToken = process.env.GOOGLE_DRIVE_REFRESH_TOKEN;

    if (!clientId || !clientSecret || !refreshToken) {
        return {
            data:null, 
            message: "Missing Google OAuth configuration",
            status:"error"
        }
    }

    try {
        // Request new access token using refresh token
        const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
            client_id: clientId,
            client_secret: clientSecret,
            refresh_token: refreshToken,
            grant_type: "refresh_token",
        }),
        });

        if (!tokenResponse.ok) {
        const errorData = await tokenResponse.json();
        throw new Error(`Google OAuth error: ${JSON.stringify(errorData)}`);
        }

        const tokenData = await tokenResponse.json();
        const accessToken = tokenData.access_token;

        return {
            data: accessToken,
            message: "Access  token get  successfully",
            status:"success"
        };
    } catch (error) {
        console.error("Error refreshing Google access token:", error);
        return {
            data: null,
            message: "Error refreshing Google access token",
            status:"error"
        };
    }
}