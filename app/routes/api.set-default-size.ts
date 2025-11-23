import { ActionFunctionArgs, json } from "@remix-run/node";
import MaterialSizeService from "~/models/MateriaSizeService.service";
import { jFlashMessage } from "~/utils/message-flash";
import { authenticate } from "~/shopify.server";

export async function action({ request }: ActionFunctionArgs) {
  console.log("API set-default-size - Action called");
  
  const { session } = await authenticate.admin(request);
  const method = request.method;

  console.log("API set-default-size - Method:", method);

  if (method === "POST") {
    // Vérifier si c'est du JSON ou du FormData
    const contentType = request.headers.get("content-type");
    
    let configId: number;
    let materialId: number;
    let sizeId: number;
    
    if (contentType?.includes("application/json")) {
      const body = await request.json();
      console.log("=== API set-default-size - Received body ===");
      console.log("Body:", body);
      console.log("Body materialId:", body.materialId, "type:", typeof body.materialId);
      
      configId = parseInt(body.configId);
      materialId = parseInt(body.materialId !== undefined ? body.materialId : body.mId);
      sizeId = parseInt(body.sizeId);
      
      console.log("=== API set-default-size - Parsed values ===");
      console.log("configId:", configId, "type:", typeof configId);
      console.log("materialId:", materialId, "type:", typeof materialId);
      console.log("sizeId:", sizeId, "type:", typeof sizeId);
    } else {
      const formData = await request.formData();
      configId = parseInt(formData.get("configId") as string);
      materialId = parseInt(formData.get("materialId") as string || formData.get("mId") as string);
      sizeId = parseInt(formData.get("sizeId") as string);
    }

    console.log("API set-default-size - Calling MaterialSizeService.setDefault with:", { configId, sessionId: session.id, materialId, sizeId });

    const result = await MaterialSizeService.setDefault(
      configId,
      session.id,
      materialId,
      sizeId,
    );

    console.log("API set-default-size - MaterialSizeService.setDefault result:", result);

    return json({
      ...jFlashMessage("Size set as default successfully"),
      success: true,
      data: result
    });
  }

  return json({ error: "Method not allowed" }, { status: 405 });
} 