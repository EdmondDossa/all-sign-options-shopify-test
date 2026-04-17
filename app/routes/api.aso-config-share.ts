import { ActionFunctionArgs, json } from "@remix-run/node";
import { authenticate } from "~/shopify.server";
import prisma from "~/db.server";
import { assignShopDesignPath } from "~/utils/fileUrl";
import { updateOrCreateJsonData } from "~/utils/jsonHandler";

function buildShareId() {
  return `aso_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const asoAccessToken = request.headers.get("Aso-Access-Token") || "";
  let session = null as any;

  if (!asoAccessToken) {
    ({ session } = await authenticate.public.appProxy(request));
  }

  if (!session) {
    session = await prisma.session.findFirst({
      where: { accessToken: asoAccessToken },
    });
  }

  if (!session) {
    return json(
      { success: false, message: "Session not found" },
      { status: 401 },
    );
  }

  try {
    const payload = await request.json();
    const configuration =
      payload?.configuration && typeof payload.configuration === "object"
        ? payload.configuration
        : null;

    if (!configuration) {
      return json(
        { success: false, message: "Missing configuration payload" },
        { status: 400 },
      );
    }

    const shareId = buildShareId();
    const shareData = {
      id: shareId,
      configId: String(payload?.configId || ""),
      productId: String(payload?.productId || ""),
      configuration,
      createdAt: new Date().toISOString(),
    };

    const filePath = assignShopDesignPath(
      session.id,
      `shared-configs/${shareId}.json`,
    );
    const saved = updateOrCreateJsonData(filePath, shareData);

    if (!saved) {
      return json(
        { success: false, message: "Unable to save shared configuration" },
        { status: 500 },
      );
    }

    return json({
      success: true,
      share_id: shareId,
      config: configuration,
    });
  } catch (error) {
    return json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : "Unable to share configuration",
      },
      { status: 500 },
    );
  }
};
