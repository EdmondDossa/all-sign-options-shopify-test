import { ActionFunctionArgs, json } from "@remix-run/node";
import MaterialAdvancedOptionService from "~/models/MaterialAdvancedOption.service";
import { jFlashMessage } from "~/utils/message-flash";
import { authenticate } from "~/shopify.server";

type OptionOperation = "get-all" | "add" | "update" | "delete" | "set-default";

interface OptionRequestBody {
  operation: OptionOperation;
  configId: number | string;
  materialId?: number | string;
  mId?: number | string; // alternative pour materialId
  componentId?: number | string;
  optionId?: number | string;
  optionData?: any;
}

export async function action({ request }: ActionFunctionArgs) {
  console.log("API option-manager - Action called");

  const { session } = await authenticate.admin(request);
  const method = request.method;

  console.log("API option-manager - Method:", method);

  // Supporter GET pour get-all
  if (method !== "POST" && method !== "GET") {
    return json({ error: "Method not allowed" }, { status: 405 });
  }

  try {
    const contentType = request.headers.get("content-type");
    console.log("=== API option-manager - Debug Info ===");
    console.log("Content-Type:", contentType);
    console.log("Method:", method);

    let requestData: OptionRequestBody;

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
        componentId: url.searchParams.get("componentId") || "",
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
        operation: formData.get("operation") as OptionOperation,
        configId: formData.get("configId") as string,
        materialId: formData.get("materialId") as string,
        mId: formData.get("mId") as string,
        componentId: formData.get("componentId") as string,
        optionId: formData.get("optionId") as string,
        optionData: formData.get("optionData")
          ? JSON.parse(formData.get("optionData") as string)
          : undefined,
      };
    }

    console.log("=== API option-manager - Received data ===");
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
    const componentId = requestData.componentId !== undefined && requestData.componentId !== null
      ? parseInt(requestData.componentId as string)
      : undefined;
    const optionId = parseInt(
      (requestData.optionId !== undefined
        ? requestData.optionId
        : "-1") as string,
    );
    console.log("=== API option-manager - Parsed values ===");
    console.log("operation:", requestData.operation);
    console.log("configId:", configId, "type:", typeof configId);
    console.log("materialId:", materialId, "type:", typeof materialId);
    console.log("componentId:", componentId, "type:", typeof componentId);
    console.log("optionId:", optionId, "type:", typeof optionId);
    console.log("optionData:", requestData.optionData);

    // Validation des IDs requis
    if (
      isNaN(configId) ||
      (requestData.operation !== "get-all" &&
        (isNaN(materialId) || componentId === undefined))
    ) {
      console.log("ERROR: Invalid IDs");
      console.log("configId:", requestData.configId, "-> parsed:", configId);
      console.log(
        "materialId:",
        requestData.materialId,
        "-> parsed:",
        materialId,
      );
      console.log(
        "componentId:",
        requestData.componentId,
        "-> parsed:",
        componentId,
      );
      return json(
        {
          error: "Valid configId, materialId and componentId are required",
          received: {
            configId: requestData.configId,
            materialId: requestData.materialId,
            //   mId: requestData.mId,
            componentId: requestData.componentId,
          },
          parsed: {
            configId,
            materialId,
            componentId,
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
          "API option-manager - Calling MaterialAdvancedOptionService.getAll",
        );
        result = await MaterialAdvancedOptionService.getAll(
          session.id,
          configId,
          materialId,
          componentId!,
        );
        successMessage = "Options retrieved successfully";
        break;
      }

      case "add": {
        if (!requestData.optionData) {
          return json(
            { error: "optionData is required for add operation" },
            { status: 400 },
          );
        }

        console.log(
          "API option-manager - Calling MaterialAdvancedOptionService.add",
        );
        result = await MaterialAdvancedOptionService.add(
          configId,
          session.id,
          materialId,
          componentId!,
          requestData.optionData,
        );
        successMessage = "Option added successfully";
        break;
      }

      case "update": {
        if (optionId === undefined || !requestData.optionData) {
          return json(
            {
              error:
                "optionId and optionData are required for update operation",
            },
            { status: 400 },
          );
        }

        console.log(
          "API option-manager - Calling MaterialAdvancedOptionService.update",
        );
        result = await MaterialAdvancedOptionService.update(
          configId,
          session.id,
          materialId,
          componentId!,
          requestData.optionData,
          optionId,
        );
        successMessage = "Option updated successfully";
        break;
      }

      case "delete": {
        if (optionId === undefined) {
          return json(
            { error: "optionId is required for delete operation" },
            { status: 400 },
          );
        }

        console.log(
          "API option-manager - Calling MaterialAdvancedOptionService.delete",
        );
        result = await MaterialAdvancedOptionService.delete(
          configId,
          session.id,
          materialId,
          componentId!,
          optionId,
        );
        successMessage = "Option deleted successfully";
        break;
      }

      case "set-default": {
        if (optionId === undefined) {
          return json(
            { error: "optionId is required for set-default operation" },
            { status: 400 },
          );
        }

        console.log(
          "API option-manager - Calling MaterialAdvancedOptionService.setDefault",
        );
        result = await MaterialAdvancedOptionService.setDefault(
          configId,
          session.id,
          materialId,
          componentId!,
          optionId,
        );
        successMessage = "Option set as default successfully";
        break;
      }

      default:
        return json(
          { error: `Unknown operation: ${requestData.operation}` },
          { status: 400 },
        );
    }

    console.log(
      `API option-manager - ${requestData.operation} result:`,
      result,
    );

    return json({
      ...jFlashMessage(successMessage),
      success: true,
      operation: requestData.operation,
      data: result,
    });
  } catch (error) {
    console.error("API option-manager - Error:", error);
    return json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}