// Updated loader using the service
import { json, LoaderFunctionArgs } from "@remix-run/node";
import { authenticate } from "~/shopify.server";
import GoogleService from "~/models/GoogleService";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const { admin, session } = await authenticate.public.appProxy(request);

  if (!admin || !session) {
    return json({ 
      data: null, 
      message: "Shop not found", 
      status: "error" 
    });
  }

  try {
    const accessToken = await GoogleService.getAccessToken();
    
    return json({
      data: accessToken,
      message: "Access token retrieved successfully",
      status: "success"
    });
  } catch (error) {
    console.error("Error getting Google access token:", error);
    return json({
      data: null,
      message: error instanceof Error ? error.message : "Unknown error occurred",
      status: "error"
    });
  }
};