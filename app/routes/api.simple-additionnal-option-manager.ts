import { ActionFunctionArgs, json } from "@remix-run/node";
import MaterialAdditionalOptionService from "~/models/MaterialAdditionalOption.service";
import { jFlashMessage } from "~/utils/message-flash";
import { authenticate } from "~/shopify.server";

type AdditionalOptionOperation = "get-all" | "add" | "update" | "delete";

interface AdditionalOptionRequestBody {
  operation: AdditionalOptionOperation;
  configId: number | string;
  materialId?: number | string;
  mId?: number | string; // alternative pour materialId
  additionalOptionId?: number | string;
  additionalOptionData?: any;
}

export async function action({ request }: ActionFunctionArgs) {
  console.log("API additional-option-manager - Action called");

  const { session } = await authenticate.admin(request);
  const method = request.method;

  console.log("API additional-option-manager - Method:", method);

  // Supporter GET pour get-all
  if (method !== "POST" && method !== "GET") {
    return json({ error: "Method not allowed" }, { status: 405 });
  }

  try {
    const contentType = request.headers.get("content-type");
    console.log("=== API additional-option-manager - Debug Info ===");
    console.log("Content-Type:", contentType);
    console.log("Method:", method);

    let requestData: AdditionalOptionRequestBody;

    // Pour GET, utiliser les query parameters
    if (method === "GET") {
      const url = new URL(request.url);
      requestData = {
        operation: "get-all", // GET = get-all par défaut
        configId: url.searchParams.get("configId") || "",
        materialId:
          url.searchParams.get("materialId") ||
          url.searchParams.get("mId") ||
          "",
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
        operation: formData.get("operation") as AdditionalOptionOperation,
        configId: formData.get("configId") as string,
        materialId: formData.get("materialId") as string,
        mId: formData.get("mId") as string,
        additionalOptionId: formData.get("additionalOptionId") as string,
        additionalOptionData: formData.get("additionalOptionData")
          ? JSON.parse(formData.get("additionalOptionData") as string)
          : undefined,
      };
    }

    console.log("=== API additional-option-manager - Received data ===");
    console.log("Request data:", JSON.stringify(requestData, null, 2));

    // Validation de base
    if (!requestData.operation) {
      console.log("ERROR: Operation is missing");
      console.log("Available keys in requestData:", Object.keys(requestData));
      return json(
        {
          error: "Operation is required",
          received: requestData,
          available_operations: ["get-all", "add", "update", "delete"],
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
    const additionalOptionId = parseInt(
      (requestData.additionalOptionId !== undefined ? requestData.additionalOptionId : "-1") as string,
    );

    console.log("=== API additional-option-manager - Parsed values ===");
    console.log("operation:", requestData.operation);
    console.log("configId:", configId, "type:", typeof configId);
    console.log("materialId:", materialId, "type:", typeof materialId);
    console.log("additionalOptionId:", additionalOptionId, "type:", typeof additionalOptionId);

    // Validation des IDs requis
    if (
      isNaN(configId) ||
      (requestData.operation !== "get-all" && isNaN(materialId))
    ) {
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
        console.log("API additional-option-manager - Calling MaterialAdditionalOptionService.getAll");
        result = await MaterialAdditionalOptionService.getAll(
          session.id,
          configId,
          materialId,
        );
        successMessage = "Additional options retrieved successfully";
        break;
      }

      case "add": {
        if (!requestData.additionalOptionData) {
          return json(
            { error: "additionalOptionData is required for add operation" },
            { status: 400 },
          );
        }

        console.log("API additional-option-manager - Calling MaterialAdditionalOptionService.add");
        result = await MaterialAdditionalOptionService.add(
          configId,
          session.id,
          materialId,
          requestData.additionalOptionData,
        );
        successMessage = "Additional option added successfully";
        break;
      }

      case "update": {
        if (additionalOptionId === undefined || !requestData.additionalOptionData) {
          return json(
            { error: "additionalOptionId and additionalOptionData are required for update operation" },
            { status: 400 },
          );
        }

        console.log("API additional-option-manager - Calling MaterialAdditionalOptionService.update");
        result = await MaterialAdditionalOptionService.update(
          configId,
          session.id,
          materialId,
          requestData.additionalOptionData,
          additionalOptionId,
        );
        successMessage = "Additional option updated successfully";
        break;
      }

      case "delete": {
        if (additionalOptionId === undefined) {
          return json(
            { error: "additionalOptionId is required for delete operation" },
            { status: 400 },
          );
        }

        console.log("API additional-option-manager - Calling MaterialAdditionalOptionService.delete");
        result = await MaterialAdditionalOptionService.delete(
          configId,
          session.id,
          materialId,
          additionalOptionId,
        );
        successMessage = "Additional option deleted successfully";
        break;
      }

      default:
        return json(
          { error: `Unknown operation: ${requestData.operation}` },
          { status: 400 },
        );
    }

    console.log(`API additional-option-manager - ${requestData.operation} result:`, result);

    return json({
      ...jFlashMessage(successMessage),
      success: true,
      operation: requestData.operation,
      data: result,
    });
  } catch (error) {
    console.error("API additional-option-manager - Error:", error);
    return json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
