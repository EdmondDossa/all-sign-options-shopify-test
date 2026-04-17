import fs from "fs";
import { LoaderFunctionArgs, json } from "@remix-run/node";
import { authenticate } from "~/shopify.server";
import prisma from "~/db.server";
import { assignShopDesignPath } from "~/utils/fileUrl";
import { readJsonData } from "~/utils/jsonHandler";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
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

  const shareId = String(params.id || "").trim();
  if (!shareId) {
    return json(
      { success: false, message: "Missing shared configuration id" },
      { status: 400 },
    );
  }

  try {
    const filePath = assignShopDesignPath(
      session.id,
      `shared-configs/${shareId}.json`,
    );

    if (!fs.existsSync(filePath)) {
      return json(
        { success: false, message: "Shared configuration not found" },
        { status: 404 },
      );
    }

    const data = readJsonData(filePath);

    return json({
      success: true,
      share_id: shareId,
      config: data?.configuration || null,
      createdAt: data?.createdAt || null,
    });
  } catch (error) {
    return json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Unable to load shared configuration",
      },
      { status: 500 },
    );
  }
};
