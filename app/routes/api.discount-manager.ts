import { ActionFunctionArgs, json } from "@remix-run/node";
import MaterialDiscountService from "~/models/MaterialDiscount.service";
import { jFlashMessage } from "~/utils/message-flash";
import { authenticate } from "~/shopify.server";

type DiscountOperation = 'get-all' | 'update';

interface DiscountRequestBody {
  operation: DiscountOperation;
  configId: number | string;
  materialId?: number | string;
  mId?: number | string; // alternative pour materialId
  discounts?: any; // pour update
}

export async function action({ request }: ActionFunctionArgs) {
  console.log("API discount-manager - Action called");
  
  const { session } = await authenticate.admin(request);
  const method = request.method;

  console.log("API discount-manager - Method:", method);

  // Supporter GET pour get-all
  if (method !== "POST" && method !== "GET") {
    return json({ error: "Method not allowed" }, { status: 405 });
  }

  try {
    const contentType = request.headers.get("content-type");
    console.log("=== API discount-manager - Debug Info ===");
    console.log("Content-Type:", contentType);
    console.log("Method:", method);
    
    let requestData: DiscountRequestBody;
    
    // Pour GET, utiliser les query parameters
    if (method === "GET") {
      const url = new URL(request.url);
      requestData = {
        operation: 'get-all', // GET = get-all par défaut
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
        operation: formData.get("operation") as DiscountOperation,
        configId: formData.get("configId") as string,
        materialId: formData.get("materialId") as string,
        mId: formData.get("mId") as string,
        discounts: formData.get("discounts")
          ? JSON.parse(formData.get("discounts") as string)
          : undefined,
      };
    }

    console.log("=== API discount-manager - Received data ===");
    console.log("Request data:", JSON.stringify(requestData, null, 2));

    // Validation de base
    if (!requestData.operation) {
      console.log("ERROR: Operation is missing");
      console.log("Available keys in requestData:", Object.keys(requestData));
      return json(
        {
          error: "Operation is required",
          received: requestData,
          available_operations: ["get-all", "update"],
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

    console.log("=== API discount-manager - Parsed values ===");
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
      case "get-all": {
        console.log("API discount-manager - Calling MaterialDiscountService.getAll");
        result = await MaterialDiscountService.getAll(
          session.id,
          configId,
          materialId,
        );
        successMessage = "Discounts retrieved successfully";
        break;
      }

      case "update": {
        if (!requestData.discounts) {
          return json(
            { error: "discounts is required for update operation" },
            { status: 400 },
          );
        }

        console.log("API discount-manager - Calling MaterialDiscountService.update");
        result = await MaterialDiscountService.update(
          configId,
          session.id,
          materialId,
          requestData.discounts,
        );
        successMessage = "Discounts updated successfully";
        break;
      }

      default:
        return json(
          { error: `Unknown operation: ${requestData.operation}` },
          { status: 400 },
        );
    }

    console.log(`API discount-manager - ${requestData.operation} result:`, result);

    return json({
      ...jFlashMessage(successMessage),
      success: true,
      operation: requestData.operation,
      data: result,
    });
  } catch (error) {
    console.error("API discount-manager - Error:", error);
    return json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
