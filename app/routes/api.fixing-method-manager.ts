import { ActionFunctionArgs, json } from "@remix-run/node";
import MaterialFixingMethodService from "~/models/MaterialFixingMethod.service";
import { jFlashMessage } from "~/utils/message-flash";
import { authenticate } from "~/shopify.server";

type FixingMethodOperation =
  | "get-all"
  | "add"
  | "update"
  | "bulk-update"
  | "delete"
  | "set-default";

interface FixingMethodRequestBody {
  operation: FixingMethodOperation;
  configId: number | string;
  materialId?: number | string;
  mId?: number | string; // alternative pour materialId
  fixingMethodId?: number | string;
  fixingMethodData?: any;
  fixingMethods?: any[]; // pour bulk-update
}

export async function action({ request }: ActionFunctionArgs) {
  console.log("API fixing-method-manager - Action called");

  const { session } = await authenticate.admin(request);
  const method = request.method;

  console.log("API fixing-method-manager - Method:", method);

  // Supporter GET pour get-all
  if (method !== "POST" && method !== "GET") {
    return json({ error: "Method not allowed" }, { status: 405 });
  }

  try {
    const contentType = request.headers.get("content-type");
    console.log("=== API fixing-method-manager - Debug Info ===");
    console.log("Content-Type:", contentType);
    console.log("Method:", method);

    let requestData: FixingMethodRequestBody;

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
        operation: formData.get("operation") as FixingMethodOperation,
        configId: formData.get("configId") as string,
        materialId: formData.get("materialId") as string,
        mId: formData.get("mId") as string,
        fixingMethodId: formData.get("fixingMethodId") as string,
        fixingMethodData: formData.get("fixingMethodData")
          ? JSON.parse(formData.get("fixingMethodData") as string)
          : undefined,
        fixingMethods: formData.get("fixingMethods")
          ? JSON.parse(formData.get("fixingMethods") as string)
          : undefined,
      };
    }

    console.log("=== API fixing-method-manager - Received data ===");
    console.log("Request data:", JSON.stringify(requestData, null, 2));

    // Validation de base
    if (!requestData.operation) {
      console.log("ERROR: Operation is missing");
      console.log("Available keys in requestData:", Object.keys(requestData));
      return json(
        {
          error: "Operation is required",
          received: requestData,
          available_operations: [
            "get-all",
            "add",
            "update",
            "bulk-update",
            "delete",
            "set-default",
          ],
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
    const fixingMethodId = parseInt(
      (requestData.fixingMethodId !== undefined ? requestData.fixingMethodId : "-1") as string,
    );

    console.log("=== API fixing-method-manager - Parsed values ===");
    console.log("operation:", requestData.operation);
    console.log("configId:", configId, "type:", typeof configId);
    console.log("materialId:", materialId, "type:", typeof materialId);
    console.log("fixingMethodId:", fixingMethodId, "type:", typeof fixingMethodId);

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
        console.log("API fixing-method-manager - Calling MaterialFixingMethodService.getAll");
        result = await MaterialFixingMethodService.getAll(
          session.id,
          configId,
          materialId,
        );
        successMessage = "Fixing methods retrieved successfully";
        break;
      }

      case "add": {
        if (!requestData.fixingMethodData) {
          return json(
            { error: "fixingMethodData is required for add operation" },
            { status: 400 },
          );
        }

        console.log("API fixing-method-manager - Calling MaterialFixingMethodService.add");
        result = await MaterialFixingMethodService.add(
          configId,
          session.id,
          materialId,
          requestData.fixingMethodData,
        );
        successMessage = "Fixing method added successfully";
        break;
      }

      case "update": {
        if (fixingMethodId === undefined || !requestData.fixingMethodData) {
          return json(
            { error: "fixingMethodId and fixingMethodData are required for update operation" },
            { status: 400 },
          );
        }

        console.log("API fixing-method-manager - Calling MaterialFixingMethodService.update");
        result = await MaterialFixingMethodService.update(
          configId,
          session.id,
          materialId,
          requestData.fixingMethodData,
          fixingMethodId,
        );
        successMessage = "Fixing method updated successfully";
        break;
      }

      case "bulk-update": {
        if (!requestData.fixingMethods || !Array.isArray(requestData.fixingMethods)) {
          return json(
            { error: "fixingMethods array is required for bulk-update operation" },
            { status: 400 },
          );
        }

        console.log(
          "API fixing-method-manager - Calling MaterialFixingMethodService.bulkUpdate",
        );
        result = await MaterialFixingMethodService.bulkUpdate(
          configId,
          session.id,
          materialId,
          requestData.fixingMethods,
        );
        successMessage = "Fixing methods bulk updated successfully";
        break;
      }

      case "delete": {
        if (fixingMethodId === undefined) {
          return json(
            { error: "fixingMethodId is required for delete operation" },
            { status: 400 },
          );
        }

        console.log("API fixing-method-manager - Calling MaterialFixingMethodService.delete");
        result = await MaterialFixingMethodService.delete(
          configId,
          session.id,
          materialId,
          fixingMethodId,
        );
        successMessage = "Fixing method deleted successfully";
        break;
      }

      case "set-default": {
        if (fixingMethodId === undefined) {
          return json(
            { error: "fixingMethodId is required for set-default operation" },
            { status: 400 },
          );
        }

        console.log(
          "API fixing-method-manager - Calling MaterialFixingMethodService.setDefault",
        );
        result = await MaterialFixingMethodService.setDefault(
          configId,
          session.id,
          materialId,
          fixingMethodId,
        );
        successMessage = "Fixing method set as default successfully";
        break;
      }

      default:
        return json(
          { error: `Unknown operation: ${requestData.operation}` },
          { status: 400 },
        );
    }

    console.log(`API fixing-method-manager - ${requestData.operation} result:`, result);

    return json({
      ...jFlashMessage(successMessage),
      success: true,
      operation: requestData.operation,
      data: result,
    });
  } catch (error) {
    console.error("API fixing-method-manager - Error:", error);
    return json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
