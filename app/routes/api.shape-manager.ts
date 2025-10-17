import { ActionFunctionArgs, json } from "@remix-run/node";
import MaterialShapeService from "~/models/MaterialShape.service";
import { jFlashMessage } from "~/utils/message-flash";
import { authenticate } from "~/shopify.server";

type ShapeOperation =
  | "get-all"
  | "add"
  | "update"
  | "bulk-update"
  | "delete"
  | "set-default";

interface ShapeRequestBody {
  operation: ShapeOperation;
  configId: number | string;
  materialId?: number | string;
  mId?: number | string; // alternative pour materialId
  shapeId?: number | string;
  shapeData?: any;
  shapes?: any[]; // pour bulk-update
}

export async function action({ request }: ActionFunctionArgs) {
  console.log("API shape-manager - Action called");

  const { session } = await authenticate.admin(request);
  const method = request.method;

  console.log("API shape-manager - Method:", method);

  // Supporter GET pour get-all
  if (method !== "POST" && method !== "GET") {
    return json({ error: "Method not allowed" }, { status: 405 });
  }

  try {
    const contentType = request.headers.get("content-type");
    console.log("=== API shape-manager - Debug Info ===");
    console.log("Content-Type:", contentType);
    console.log("Method:", method);

    let requestData: ShapeRequestBody;

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
        operation: formData.get("operation") as ShapeOperation,
        configId: formData.get("configId") as string,
        materialId: formData.get("materialId") as string,
        mId: formData.get("mId") as string,
        shapeId: formData.get("shapeId") as string,
        shapeData: formData.get("shapeData")
          ? JSON.parse(formData.get("shapeData") as string)
          : undefined,
        shapes: formData.get("shapes")
          ? JSON.parse(formData.get("shapes") as string)
          : undefined,
      };
    }

    console.log("=== API shape-manager - Received data ===");
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
    const shapeId = parseInt(
      (requestData.shapeId !== undefined ? requestData.shapeId : "-1") as string,
    );

    console.log("=== API shape-manager - Parsed values ===");
    console.log("operation:", requestData.operation);
    console.log("configId:", configId, "type:", typeof configId);
    console.log("materialId:", materialId, "type:", typeof materialId);
    console.log("shapeId:", shapeId, "type:", typeof shapeId);

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
        console.log("API shape-manager - Calling MaterialShapeService.getAll");
        result = await MaterialShapeService.getAll(
          session.id,
          configId,
          materialId,
        );
        successMessage = "Shapes retrieved successfully";
        break;
      }

      case "add": {
        if (!requestData.shapeData) {
          return json(
            { error: "shapeData is required for add operation" },
            { status: 400 },
          );
        }

        console.log("API shape-manager - Calling MaterialShapeService.add");
        result = await MaterialShapeService.add(
          configId,
          session.id,
          materialId,
          requestData.shapeData,
        );
        successMessage = "Shape added successfully";
        break;
      }

      case "update": {
        if (shapeId === undefined || !requestData.shapeData) {
          return json(
            { error: "shapeId and shapeData are required for update operation" },
            { status: 400 },
          );
        }

        console.log("API shape-manager - Calling MaterialShapeService.update");
        result = await MaterialShapeService.update(
          configId,
          session.id,
          materialId,
          requestData.shapeData,
          shapeId,
        );
        successMessage = "Shape updated successfully";
        break;
      }

      case "bulk-update": {
        if (!requestData.shapes || !Array.isArray(requestData.shapes)) {
          return json(
            { error: "shapes array is required for bulk-update operation" },
            { status: 400 },
          );
        }

        console.log(
          "API shape-manager - Calling MaterialShapeService.bulkUpdate",
        );
        result = await MaterialShapeService.bulkUpdate(
          configId,
          session.id,
          materialId,
          requestData.shapes,
        );
        successMessage = "Shapes bulk updated successfully";
        break;
      }

      case "delete": {
        if (shapeId === undefined) {
          return json(
            { error: "shapeId is required for delete operation" },
            { status: 400 },
          );
        }

        console.log("API shape-manager - Calling MaterialShapeService.delete");
        result = await MaterialShapeService.delete(
          configId,
          session.id,
          materialId,
          shapeId,
        );
        successMessage = "Shape deleted successfully";
        break;
      }

      case "set-default": {
        if (shapeId === undefined) {
          return json(
            { error: "shapeId is required for set-default operation" },
            { status: 400 },
          );
        }

        console.log(
          "API shape-manager - Calling MaterialShapeService.setDefault",
        );
        result = await MaterialShapeService.setDefault(
          configId,
          session.id,
          materialId,
          shapeId,
        );
        successMessage = "Shape set as default successfully";
        break;
      }

      default:
        return json(
          { error: `Unknown operation: ${requestData.operation}` },
          { status: 400 },
        );
    }

    console.log(`API shape-manager - ${requestData.operation} result:`, result);

    return json({
      ...jFlashMessage(successMessage),
      success: true,
      operation: requestData.operation,
      data: result,
    });
  } catch (error) {
    console.error("API shape-manager - Error:", error);
    return json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
