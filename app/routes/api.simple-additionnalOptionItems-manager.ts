import { ActionFunctionArgs, json } from "@remix-run/node";
import MaterialAdditionalOptionItemService from "~/models/MaterialAdditionalOptionItem.service";
import { jFlashMessage } from "~/utils/message-flash";
import { authenticate } from "~/shopify.server";

type AdditionalOptionItemOperation =
  | "get-all"
  | "add"
  | "update"
  | "delete"
  | "set-default";

interface AdditionalOptionItemRequestBody {
  operation: AdditionalOptionItemOperation;
  configId: number | string;
  materialId?: number | string;
  mId?: number | string; // alternative pour materialId
  additionalId: number | string;
  optionItemId?: number | string;
  optionItemData?: any;
}

export async function action({ request }: ActionFunctionArgs) {
  console.log("API additional-option-item-manager - Action called");

  const { session } = await authenticate.admin(request);
  const method = request.method;

  console.log("API additional-option-item-manager - Method:", method);

  // Supporter GET pour get-all
  if (method !== "POST" && method !== "GET") {
    return json({ error: "Method not allowed" }, { status: 405 });
  }

  try {
    const contentType = request.headers.get("content-type");
    console.log("=== API additional-option-item-manager - Debug Info ===");
    console.log("Content-Type:", contentType);
    console.log("Method:", method);

    let requestData: AdditionalOptionItemRequestBody;

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
        additionalId: url.searchParams.get("additionalId") || "",
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
        operation: formData.get("operation") as AdditionalOptionItemOperation,
        configId: formData.get("configId") as string,
        materialId: formData.get("materialId") as string,
        mId: formData.get("mId") as string,
        additionalId: formData.get("additionalId") as string,
        optionItemId: formData.get("optionItemId") as string,
        optionItemData: formData.get("optionItemData")
          ? JSON.parse(formData.get("optionItemData") as string)
          : undefined,
      };
    }

    console.log("=== API additional-option-item-manager - Received data ===");
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
    const additionalId = parseInt(requestData.additionalId as string);
    const optionItemId = parseInt(
      (requestData.optionItemId !== undefined
        ? requestData.optionItemId
        : "-1") as string,
    );
    console.log("=== API additional-option-item-manager - Parsed values ===");
    console.log("operation:", requestData.operation);
    console.log("configId:", configId, "type:", typeof configId);
    console.log("materialId:", materialId, "type:", typeof materialId);
    console.log("additionalId:", additionalId, "type:", typeof additionalId);
    console.log("optionItemId:", optionItemId, "type:", typeof optionItemId);
    console.log("optionItemData:", requestData.optionItemData);

    // Validation des IDs requis
    if (isNaN(configId) || isNaN(materialId) || isNaN(additionalId)) {
      console.log("ERROR: Invalid IDs");
      console.log("configId:", requestData.configId, "-> parsed:", configId);
      console.log(
        "materialId:",
        requestData.materialId,
        "-> parsed:",
        materialId,
      );
      console.log("mId:", requestData.mId);
      console.log(
        "additionalId:",
        requestData.additionalId,
        "-> parsed:",
        additionalId,
      );
      return json(
        {
          error: "Valid configId, materialId and additionalId are required",
          received: {
            configId: requestData.configId,
            materialId: requestData.materialId,
            mId: requestData.mId,
            additionalId: requestData.additionalId,
          },
          parsed: {
            configId,
            materialId,
            additionalId,
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
          "API additional-option-item-manager - Calling MaterialAdditionalOptionItemService.getAll",
        );
        result = await MaterialAdditionalOptionItemService.getAll(
          session.id,
          configId,
          materialId,
          additionalId,
        );
        successMessage = "Additional option items retrieved successfully";
        break;
      }

      case "add": {
        if (!requestData.optionItemData) {
          return json(
            { error: "optionItemData is required for add operation" },
            { status: 400 },
          );
        }

        console.log(
          "API additional-option-item-manager - Calling MaterialAdditionalOptionItemService.add",
        );
        result = await MaterialAdditionalOptionItemService.add(
          configId,
          session.id,
          materialId,
          additionalId,
          requestData.optionItemData,
        );
        successMessage = "Additional option item added successfully";
        break;
      }

      case "update": {
        if (optionItemId === undefined || !requestData.optionItemData) {
          return json(
            {
              error:
                "optionItemId and optionItemData are required for update operation",
            },
            { status: 400 },
          );
        }

        console.log(
          "API additional-option-item-manager - Calling MaterialAdditionalOptionItemService.update",
        );
        result = await MaterialAdditionalOptionItemService.update(
          configId,
          session.id,
          materialId,
          additionalId,
          requestData.optionItemData,
          optionItemId,
        );
        successMessage = "Additional option item updated successfully";
        break;
      }

      case "delete": {
        if (optionItemId === undefined) {
          return json(
            { error: "optionItemId is required for delete operation" },
            { status: 400 },
          );
        }

        console.log(
          "API additional-option-item-manager - Calling MaterialAdditionalOptionItemService.delete",
        );
        result = await MaterialAdditionalOptionItemService.delete(
          configId,
          session.id,
          materialId,
          additionalId,
          optionItemId,
        );
        successMessage = "Additional option item deleted successfully";
        break;
      }

      case "set-default": {
        if (optionItemId === undefined) {
          return json(
            { error: "optionItemId is required for set-default operation" },
            { status: 400 },
          );
        }

        console.log(
          "API additional-option-item-manager - Calling MaterialAdditionalOptionItemService.setDefault",
        );
        result = await MaterialAdditionalOptionItemService.setDefault(
          configId,
          session.id,
          materialId,
          additionalId,
          optionItemId,
        );
        successMessage = "Additional option item set as default successfully";
        break;
      }

      default:
        return json(
          { error: `Unknown operation: ${requestData.operation}` },
          { status: 400 },
        );
    }

    console.log(
      `API additional-option-item-manager - ${requestData.operation} result:`,
      result,
    );

    return json({
      ...jFlashMessage(successMessage),
      success: true,
      operation: requestData.operation,
      data: result,
    });
  } catch (error) {
    console.error("API additional-option-item-manager - Error:", error);
    return json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}