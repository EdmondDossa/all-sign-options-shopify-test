import { ActionFunctionArgs, json } from "@remix-run/node";
import MaterialSizeService from "~/models/MateriaSizeService.service";
import { jFlashMessage } from "~/utils/message-flash";
import { authenticate } from "~/shopify.server";
import { ConfigCustomSize, configSizeThickness } from "~/types/ConfigDataType";

type SizeOperation =
  | "get-all"
  | "add"
  | "add-custom"
  | "update"
  | "bulk-update"
  | "delete"
  | "set-default";

interface SizeRequestBody {
  operation: SizeOperation;
  configId: number | string;
  materialId?: number | string;
  mId?: number | string; // alternative pour materialId
  sizeId?: number | string;
  sizeData?: any | ConfigCustomSize;
  sizes?: any[]; // pour bulk-update
  thickness?: any | configSizeThickness; // pour add-custom
}

export async function action({ request }: ActionFunctionArgs) {
  console.log("API size-manager - Action called");

  const { session } = await authenticate.admin(request);
  const method = request.method;

  console.log("API size-manager - Method:", method);

  // Supporter GET pour get-all
  if (method !== "POST" && method !== "GET") {
    return json({ error: "Method not allowed" }, { status: 405 });
  }

  try {
    const contentType = request.headers.get("content-type");
    console.log("=== API size-manager - Debug Info ===");
    console.log("Content-Type:", contentType);
    console.log("Method:", method);

    let requestData: SizeRequestBody;

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
        operation: formData.get("operation") as SizeOperation,
        configId: formData.get("configId") as string,
        materialId: formData.get("materialId") as string,
        mId: formData.get("mId") as string,
        sizeId: formData.get("sizeId") as string,
        sizeData: formData.get("sizeData")
          ? JSON.parse(formData.get("sizeData") as string)
          : undefined,
        sizes: formData.get("sizes")
          ? JSON.parse(formData.get("sizes") as string)
          : undefined,
        thickness: formData.get("thickness")
          ? JSON.parse(formData.get("thickness") as string)
          : undefined,
      };
    }

    console.log("=== API size-manager - Received data ===");
    console.log("Request data:", JSON.stringify(requestData, null, 2));
    console.log("========================================");
    console.log("Request Data 2 : ", requestData);
    console.log("sizeId : ", parseInt(requestData.sizeId as string));

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
            "add-custom",
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
    const sizeId = parseInt(
      (requestData.sizeId !== undefined ? requestData.sizeId : "-1") as string,
    );

    console.log("=== API size-manager - Parsed values ===");
    console.log("operation:", requestData.operation);
    console.log("configId:", configId, "type:", typeof configId);
    console.log("materialId:", materialId, "type:", typeof materialId);
    console.log("sizeId:", sizeId, "type:", typeof sizeId);
    console.log("sizeData:", requestData.sizeData);
    console.log("sizes:", requestData.sizes);
    console.log("thickness:", requestData.thickness);

    // Validation des IDs requis
    if (
      isNaN(configId) ||
      (requestData.operation !== "get-all" &&
        requestData.operation !== "add-custom" &&
        isNaN(materialId))
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
        console.log("API size-manager - Calling MaterialSizeService.getAll");
        result = await MaterialSizeService.getAll(
          session.id,
          configId,
          materialId,
        );
        successMessage = "Sizes retrieved successfully";
        break;
      }

      case "add": {
        if (!requestData.sizeData) {
          return json(
            { error: "sizeData is required for add operation" },
            { status: 400 },
          );
        }

        console.log("API size-manager - Calling MaterialSizeService.addSize");
        result = await MaterialSizeService.addSize(
          configId,
          session.id,
          materialId,
          requestData.sizeData,
        );
        successMessage = "Size added successfully";
        break;
      }

      case "add-custom": {
        console.log(
          "API size-manager - Calling MaterialSizeService.addCustomSizeAndThickness",
        );
        result = await MaterialSizeService.addCustomSizeAndThickness(
          configId,
          session.id,
          materialId,
          requestData.sizeData,
          requestData.thickness,
        );
        successMessage = "Custom size and thickness added successfully";
        break;
      }

      case "update": {
        if (sizeId === undefined || !requestData.sizeData) {
          return json(
            { error: "sizeId and sizeData are required for update operation" },
            { status: 400 },
          );
        }

        console.log("API size-manager - Calling MaterialSizeService.update");
        result = await MaterialSizeService.update(
          configId,
          session.id,
          materialId,
          requestData.sizeData,
          sizeId,
        );
        successMessage = "Size updated successfully";
        break;
      }

      case "bulk-update": {
        if (!requestData.sizes || !Array.isArray(requestData.sizes)) {
          return json(
            { error: "sizes array is required for bulk-update operation" },
            { status: 400 },
          );
        }

        console.log(
          "API size-manager - Calling MaterialSizeService.bulkUpdate",
        );
        result = await MaterialSizeService.bulkUpdate(
          configId,
          session.id,
          materialId,
          requestData.sizes,
        );
        successMessage = "Sizes bulk updated successfully";
        break;
      }

      case "delete": {
        if (sizeId === undefined) {
          return json(
            { error: "sizeId is required for delete operation" },
            { status: 400 },
          );
        }

        console.log("API size-manager - Calling MaterialSizeService.delete");
        result = await MaterialSizeService.delete(
          configId,
          session.id,
          materialId,
          sizeId,
        );
        successMessage = "Size deleted successfully";
        break;
      }

      case "set-default": {
        if (sizeId === undefined) {
          return json(
            { error: "sizeId is required for set-default operation" },
            { status: 400 },
          );
        }

        console.log(
          "API size-manager - Calling MaterialSizeService.setDefault",
        );
        result = await MaterialSizeService.setDefault(
          configId,
          session.id,
          materialId,
          sizeId,
        );
        successMessage = "Size set as default successfully";
        break;
      }

      default:
        return json(
          { error: `Unknown operation: ${requestData.operation}` },
          { status: 400 },
        );
    }

    console.log(`API size-manager - ${requestData.operation} result:`, result);

    return json({
      ...jFlashMessage(successMessage),
      success: true,
      operation: requestData.operation,
      data: result,
    });
  } catch (error) {
    console.error("API size-manager - Error:", error);
    return json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
