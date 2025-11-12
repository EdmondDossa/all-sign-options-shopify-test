import { ActionFunctionArgs, json } from "@remix-run/node";
import MaterialAdvanceComponentService from "~/models/MaterialAdvanceComponent.service";
import { jFlashMessage } from "~/utils/message-flash";
import { authenticate } from "~/shopify.server";

type ComponentOperation =
  | "get-all"
  | "add"
  | "update"
  | "delete"
  | "set-default";

interface ComponentRequestBody {
  operation: ComponentOperation;
  configId: number | string;
  materialId?: number | string;
  mId?: number | string; // alternative pour materialId
  componentId?: number | string;
  componentData?: any;
}

export async function action({ request }: ActionFunctionArgs) {
  console.log("API component-manager - Action called");

  const { session } = await authenticate.admin(request);
  const method = request.method;

  console.log("API component-manager - Method:", method);

  // Supporter GET pour get-all
  if (method !== "POST" && method !== "GET") {
    return json({ error: "Method not allowed" }, { status: 405 });
  }

  try {
    const contentType = request.headers.get("content-type");
    console.log("=== API component-manager - Debug Info ===");
    console.log("Content-Type:", contentType);
    console.log("Method:", method);

    let requestData: ComponentRequestBody;

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
        operation: formData.get("operation") as ComponentOperation,
        configId: formData.get("configId") as string,
        materialId: formData.get("materialId") as string,
        mId: formData.get("mId") as string,
        componentId: formData.get("componentId") as string,
        componentData: formData.get("componentData")
          ? JSON.parse(formData.get("componentData") as string)
          : undefined,
      };
    }

    console.log("=== API component-manager - Received data ===");
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
    const componentId = parseInt(
      (requestData.componentId !== undefined
        ? requestData.componentId
        : "-1") as string,
    );
    console.log("=== API component-manager - Parsed values ===");
    console.log("operation:", requestData.operation);
    console.log("configId:", configId, "type:", typeof configId);
    console.log("materialId:", materialId, "type:", typeof materialId);
    console.log("componentId:", componentId, "type:", typeof componentId);
    console.log("componentData:", requestData.componentData);

    // Validation des IDs requis
    if (
      isNaN(configId) ||
      (requestData.operation !== "get-all" && isNaN(materialId))
    ) {
      console.log("ERROR: Invalid IDs");
      console.log("configId:", requestData.configId, "-> parsed:", configId);
      console.log(
        "materialId:",
        requestData.materialId,
        "-> parsed:",
        materialId,
      );
      console.log("mId:", requestData.mId);
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
        console.log(
          "API component-manager - Calling MaterialAdvanceComponentService.getAll",
        );
        result = await MaterialAdvanceComponentService.getAll(
          session.id,
          configId,
          materialId,
        );
        successMessage = "Components retrieved successfully";
        break;
      }

      case "add": {
        if (!requestData.componentData) {
          return json(
            { error: "componentData is required for add operation" },
            { status: 400 },
          );
        }

        console.log(
          "API component-manager - Calling MaterialAdvanceComponentService.add",
        );
        result = await MaterialAdvanceComponentService.add(
          configId,
          session.id,
          materialId,
          requestData.componentData,
        );
        successMessage = "Component added successfully";
        break;
      }

      case "update": {
        if (componentId === undefined || !requestData.componentData) {
          return json(
            {
              error:
                "componentId and componentData are required for update operation",
            },
            { status: 400 },
          );
        }

        console.log(
          "API component-manager - Calling MaterialAdvanceComponentService.update",
        );
        result = await MaterialAdvanceComponentService.update(
          configId,
          session.id,
          materialId,
          requestData.componentData,
          componentId,
        );
        successMessage = "Component updated successfully";
        break;
      }

      case "delete": {
        if (componentId === undefined) {
          return json(
            { error: "componentId is required for delete operation" },
            { status: 400 },
          );
        }

        console.log(
          "API component-manager - Calling MaterialAdvanceComponentService.delete",
        );
        result = await MaterialAdvanceComponentService.delete(
          configId,
          session.id,
          materialId,
          componentId,
        );
        successMessage = "Component deleted successfully";
        break;
      }

      case "set-default": {
        if (componentId === undefined) {
          return json(
            { error: "componentId is required for set-default operation" },
            { status: 400 },
          );
        }

        console.log(
          "API component-manager - Calling MaterialAdvanceComponentService.setDefault",
        );
        result = await MaterialAdvanceComponentService.setDefault(
          configId,
          session.id,
          materialId,
          componentId,
        );
        successMessage = "Component set as default successfully";
        break;
      }

      default:
        return json(
          { error: `Unknown operation: ${requestData.operation}` },
          { status: 400 },
        );
    }

    console.log(
      `API component-manager - ${requestData.operation} result:`,
      result,
    );

    return json({
      ...jFlashMessage(successMessage),
      success: true,
      operation: requestData.operation,
      data: result,
    });
  } catch (error) {
    console.error("API component-manager - Error:", error);
    return json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}