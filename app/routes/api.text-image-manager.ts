import { ActionFunctionArgs, json } from "@remix-run/node";
import MaterialTextImageService from "~/models/MaterialTextImage.service";
import { jFlashMessage } from "~/utils/message-flash";
import { authenticate } from "~/shopify.server";
import { ConfigTextImages } from "~/types/ConfigDataType";

type TextImageOperation = 'get' | 'edit';

interface TextImageRequestBody {
  operation: TextImageOperation;
  configId: number | string;
  materialId?: number | string;
  mId?: number | string; // alternative pour materialId
  textImage?: ConfigTextImages
}

export async function action({ request }: ActionFunctionArgs) {
  console.log("API textImage-manager - Action called");
  
  const { session } = await authenticate.admin(request);
  const method = request.method;

  console.log("API textImage-manager - Method:", method);

  // Supporter GET pour get-all
  if (method !== "POST" && method !== "GET") {
    return json({ error: "Method not allowed" }, { status: 405 });
  }

  try {
    const contentType = request.headers.get("content-type");
    console.log("=== API textImage-manager - Debug Info ===");
    console.log("Content-Type:", contentType);
    console.log("Method:", method);
    
    let requestData: TextImageRequestBody;
    
    // Pour GET, utiliser les query parameters
    if (method === "GET") {
      const url = new URL(request.url);
      requestData = {
        operation: 'get', // GET = get par défaut
        configId: url.searchParams.get("configId") || "",
        materialId: url.searchParams.get("materialId") || url.searchParams.get("mId") || ""
      };
      console.log("Parsing as GET query params...");
    }
    // Pour POST, parser selon le content-type
    else if (contentType?.includes("application/json")) {
      console.log("Parsing as JSON...");
      requestData = await request.json();
    } else {
      console.log("Parsing as FormData...");
      const formData = await request.formData();
      console.log("FormData entries:", Array.from(formData.entries()));
      requestData = {
        operation: formData.get("operation") as TextImageOperation,
        configId: formData.get("configId") as string,
        materialId: formData.get("materialId") as string,
        mId: formData.get("mId") as string,
        textImage: formData.get("textImage")
          ? JSON.parse(formData.get("textImage") as string)
          : undefined,
      };
    }

    console.log("=== API textImage-manager - Received data ===");
    console.log("Request data:", JSON.stringify(requestData, null, 2));

    // Validation de base
    if (!requestData.operation) {
      console.log("ERROR: Operation is missing");
      console.log("Available keys in requestData:", Object.keys(requestData));
      return json(
        {
          error: "Operation is required",
          received: requestData,
          available_operations: ["get", "edit"],
        },
        { status: 400 },
      );
    }

    // Parser les IDs
    const configId = parseInt(requestData.configId as string);
    const materialId = parseInt(
      (requestData.materialId !== undefined
        ? requestData.materialId
        : requestData.mId) as string,
    );

    console.log("=== API textImage-manager - Parsed values ===");
    console.log("operation:", requestData.operation);
    console.log("configId:", configId, "type:", typeof configId);
    console.log("materialId:", materialId, "type:", typeof materialId);

    // Validation des IDs requis
    if (isNaN(configId) || isNaN(materialId)) {
      console.log("ERROR: Invalid IDs");
      return json(
        {
          error: "Valid configId and materialId are required",
          received: {
            configId: requestData.configId,
            materialId: requestData.materialId,
            mId: requestData.mId,
          },
          parsed: {
            configId,
            materialId,
          },
        },
        { status: 400 },
      );
    }

    let result: any;
    let successMessage: string;

    // Router vers la bonne opération
    switch (requestData.operation) {
      case "get": {
        console.log("API textImage-manager - Calling MaterialTextImageService.get");
        result = await MaterialTextImageService.get(
          session.id,
          configId,
          materialId,
        );
        successMessage = "Text/Image settings retrieved successfully";
        break;
      }

      case "edit": {
        if (!requestData.textImage) {
          return json(
            { error: "textImage is required for edit operation" },
            { status: 400 },
          );
        }

        console.log("API textImage-manager - Calling MaterialTextImageService.edit");
        result = await MaterialTextImageService.edit(
          configId,
          session.id,
          materialId,
          requestData.textImage,
        );
        successMessage = "Text/Image settings updated successfully";
        break;
      }

      default:
        return json(
          { error: `Unknown operation: ${requestData.operation}` },
          { status: 400 },
        );
    }

    console.log(`API textImage-manager - ${requestData.operation} result:`, result);

    return json({
      ...jFlashMessage(successMessage),
      success: true,
      operation: requestData.operation,
      data: result,
    });
  } catch (error) {
    console.error("API textImage-manager - Error:", error);
    return json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
