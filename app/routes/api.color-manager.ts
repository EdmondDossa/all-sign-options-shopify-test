import { ActionFunctionArgs, json } from "@remix-run/node";
import MaterialColorService from "~/models/MaterialColors.service";
import { jFlashMessage } from "~/utils/message-flash";
import { authenticate } from "~/shopify.server";
import { ConfigColor, ConfigCustomColor } from "~/types/ConfigDataType";

type ColorOperation =
  | "get-all"
  | "add"
  | "update"
  | "bulk-update"
  | "delete"
  | "set-default"
  | "edit-custom";

interface ColorRequestBody {
  operation: ColorOperation;
  configId: number | string;
  materialId?: number | string;
  mId?: number | string; // alternative pour materialId
  colorId?: number | string;
  colorData?: ConfigColor;
  customColorData?: ConfigCustomColor;
  colors?: ConfigColor[]; // pour bulk-update
}

export async function action({ request }: ActionFunctionArgs) {
  console.log("API color-manager - Action called");

  const { session } = await authenticate.admin(request);
  const method = request.method;

  console.log("API color-manager - Method:", method);

  // Supporter GET pour get-all
  if (method !== "POST" && method !== "GET") {
    return json({ error: "Method not allowed" }, { status: 405 });
  }

  try {
    const contentType = request.headers.get("content-type");
    console.log("=== API color-manager - Debug Info ===");
    console.log("Content-Type:", contentType);
    console.log("Method:", method);

    let requestData: ColorRequestBody;

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
        operation: formData.get("operation") as ColorOperation,
        configId: formData.get("configId") as string,
        materialId: formData.get("materialId") as string,
        mId: formData.get("mId") as string,
        colorId: formData.get("colorId") as string,
        colorData: formData.get("colorData")
          ? JSON.parse(formData.get("colorData") as string)
          : undefined,
        customColorData: formData.get("customColorData")
          ? JSON.parse(formData.get("customColorData") as string)
          : undefined,
        colors: formData.get("colors")
          ? JSON.parse(formData.get("colors") as string)
          : undefined,
      };
    }

    console.log("=== API color-manager - Received data ===");
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
            "edit-custom",
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
    const colorId = parseInt(
      (requestData.colorId !== undefined ? requestData.colorId : "-1") as string,
    );

    console.log("=== API color-manager - Parsed values ===");
    console.log("operation:", requestData.operation);
    console.log("configId:", configId, "type:", typeof configId);
    console.log("materialId:", materialId, "type:", typeof materialId);
    console.log("colorId:", colorId, "type:", typeof colorId);

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
        console.log("API color-manager - Calling MaterialColorService.getAll");
        result = await MaterialColorService.getAll(
          session.id,
          configId,
          materialId,
        );
        successMessage = "Colors retrieved successfully";
        break;
      }

      case "add": {
        if (!requestData.colorData) {
          return json(
            { error: "colorData is required for add operation" },
            { status: 400 },
          );
        }

        console.log("API color-manager - Calling MaterialColorService.add");
        result = await MaterialColorService.add(
          configId,
          session.id,
          materialId,
          requestData.colorData,
        );
        successMessage = "Color added successfully";
        break;
      }

      case "update": {
        if (colorId === undefined || !requestData.colorData) {
          return json(
            { error: "colorId and colorData are required for update operation" },
            { status: 400 },
          );
        }

        console.log("API color-manager - Calling MaterialColorService.update");
        result = await MaterialColorService.update(
          configId,
          session.id,
          materialId,
          requestData.colorData,
          colorId,
        );
        successMessage = "Color updated successfully";
        break;
      }

      case "bulk-update": {
        if (!requestData.colors || !Array.isArray(requestData.colors)) {
          return json(
            { error: "colors array is required for bulk-update operation" },
            { status: 400 },
          );
        }

        console.log(
          "API color-manager - Calling MaterialColorService.bulkUpdate",
        );
        result = await MaterialColorService.bulkUpdate(
          configId,
          session.id,
          materialId,
          requestData.colors,
        );
        successMessage = "Colors bulk updated successfully";
        break;
      }

      case "delete": {
        if (colorId === undefined) {
          return json(
            { error: "colorId is required for delete operation" },
            { status: 400 },
          );
        }

        console.log("API color-manager - Calling MaterialColorService.delete");
        result = await MaterialColorService.delete(
          configId,
          session.id,
          materialId,
          colorId,
        );
        successMessage = "Color deleted successfully";
        break;
      }

      case "set-default": {
        if (colorId === undefined) {
          return json(
            { error: "colorId is required for set-default operation" },
            { status: 400 },
          );
        }

        console.log(
          "API color-manager - Calling MaterialColorService.setDefault",
        );
        result = await MaterialColorService.setDefault(
          configId,
          session.id,
          materialId,
          colorId,
        );
        successMessage = "Color set as default successfully";
        break;
      }

      case "edit-custom": {
        if (!requestData.customColorData) {
          return json(
            { error: "customColorData is required for edit-custom operation" },
            { status: 400 },
          );
        }

        console.log(
          "API color-manager - Calling MaterialColorService.editCustomColor",
        );
        result = await MaterialColorService.editCustomColor(
          configId,
          session.id,
          materialId,
          requestData.customColorData,
        );
        successMessage = "Custom color updated successfully";
        break;
      }

      default:
        return json(
          { error: `Unknown operation: ${requestData.operation}` },
          { status: 400 },
        );
    }

    console.log(`API color-manager - ${requestData.operation} result:`, result);

    return json({
      ...jFlashMessage(successMessage),
      success: true,
      operation: requestData.operation,
      data: result,
    });
  } catch (error) {
    console.error("API color-manager - Error:", error);
    return json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
