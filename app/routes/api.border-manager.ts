import { ActionFunctionArgs, json } from "@remix-run/node";
import MaterialBorderService from "~/models/MaterialBorderService.service";
import { jFlashMessage } from "~/utils/message-flash";
import { authenticate } from "~/shopify.server";

type BorderOperation =
  | "get-all"
  | "add"
  | "edit-settings"
  | "update"
  | "bulk-update"
  | "delete"
  | "set-default";

interface BorderRequestBody {
  operation: BorderOperation;
  configId: number | string;
  materialId?: number | string;
  mId?: number | string; // alternative pour materialId
  borderId?: number | string;
  borderData?: any;
  borders?: any[]; // pour bulk-update
  borderSettings?: any; // pour edit-settings
}

export async function action({ request }: ActionFunctionArgs) {
  console.log("API border-manager - Action called");

  const { session } = await authenticate.admin(request);
  const method = request.method;

  console.log("API border-manager - Method:", method);

  // Supporter GET pour get-all
  if (method !== "POST" && method !== "GET") {
    return json({ error: "Method not allowed" }, { status: 405 });
  }

  try {
    const contentType = request.headers.get("content-type");
    console.log("=== API border-manager - Debug Info ===");
    console.log("Content-Type:", contentType);
    console.log("Method:", method);

    let requestData: BorderRequestBody;

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
        operation: formData.get("operation") as BorderOperation,
        configId: formData.get("configId") as string,
        materialId: formData.get("materialId") as string,
        mId: formData.get("mId") as string,
        borderId: formData.get("borderId") as string,
        borderData: formData.get("borderData")
          ? JSON.parse(formData.get("borderData") as string)
          : undefined,
        borders: formData.get("borders")
          ? JSON.parse(formData.get("borders") as string)
          : undefined,
        borderSettings: formData.get("borderSettings")
          ? JSON.parse(formData.get("borderSettings") as string)
          : undefined,
      };
    }

    console.log("=== API border-manager - Received data ===");
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
            "edit-settings",
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
    const borderId = parseInt(
      (requestData.borderId !== undefined ? requestData.borderId : "-1") as string,
    );

    console.log("=== API border-manager - Parsed values ===");
    console.log("operation:", requestData.operation);
    console.log("configId:", configId, "type:", typeof configId);
    console.log("materialId:", materialId, "type:", typeof materialId);
    console.log("borderId:", borderId, "type:", typeof borderId);

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
        console.log("API border-manager - Calling MaterialBorderService.getAll");
        result = await MaterialBorderService.getAll(
          session.id,
          configId,
          materialId,
        );
        successMessage = "Borders retrieved successfully";
        break;
      }

      case "add": {
        if (!requestData.borderData) {
          return json(
            { error: "borderData is required for add operation" },
            { status: 400 },
          );
        }

        console.log("API border-manager - Calling MaterialBorderService.add");
        result = await MaterialBorderService.add(
          configId,
          session.id,
          materialId,
          requestData.borderData,
        );
        successMessage = "Border added successfully";
        break;
      }

      case "edit-settings": {
        if (!requestData.borderSettings) {
          return json(
            { error: "borderSettings is required for edit-settings operation" },
            { status: 400 },
          );
        }

        console.log("API border-manager - Calling MaterialBorderService.editSettings");
        result = await MaterialBorderService.editSettings(
          configId,
          session.id,
          materialId,
          requestData.borderSettings,
        );
        successMessage = "Border settings updated successfully";
        break;
      }

      case "update": {
        if (borderId === undefined || !requestData.borderData) {
          return json(
            { error: "borderId and borderData are required for update operation" },
            { status: 400 },
          );
        }

        console.log("API border-manager - Calling MaterialBorderService.update");
        result = await MaterialBorderService.update(
          configId,
          session.id,
          materialId,
          requestData.borderData,
          borderId,
        );
        successMessage = "Border updated successfully";
        break;
      }

      case "bulk-update": {
        if (!requestData.borders || !Array.isArray(requestData.borders)) {
          return json(
            { error: "borders array is required for bulk-update operation" },
            { status: 400 },
          );
        }

        console.log(
          "API border-manager - Calling MaterialBorderService.bulkUpdate",
        );
        result = await MaterialBorderService.bulkUpdate(
          configId,
          session.id,
          materialId,
          requestData.borders,
        );
        successMessage = "Borders bulk updated successfully";
        break;
      }

      case "delete": {
        if (borderId === undefined) {
          return json(
            { error: "borderId is required for delete operation" },
            { status: 400 },
          );
        }

        console.log("API border-manager - Calling MaterialBorderService.delete");
        result = await MaterialBorderService.delete(
          configId,
          session.id,
          materialId,
          borderId,
        );
        successMessage = "Border deleted successfully";
        break;
      }

      case "set-default": {
        if (borderId === undefined) {
          return json(
            { error: "borderId is required for set-default operation" },
            { status: 400 },
          );
        }

        console.log(
          "API border-manager - Calling MaterialBorderService.setDefault",
        );
        result = await MaterialBorderService.setDefault(
          configId,
          session.id,
          materialId,
          borderId,
        );
        successMessage = "Border set as default successfully";
        break;
      }

      default:
        return json(
          { error: `Unknown operation: ${requestData.operation}` },
          { status: 400 },
        );
    }

    console.log(`API border-manager - ${requestData.operation} result:`, result);

    return json({
      ...jFlashMessage(successMessage),
      success: true,
      operation: requestData.operation,
      data: result,
    });
  } catch (error) {
    console.error("API border-manager - Error:", error);
    return json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
