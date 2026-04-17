import fs from "fs";
import path from "path";
import { ActionFunctionArgs, json } from "@remix-run/node";
import { authenticate } from "~/shopify.server";
import prisma from "~/db.server";
import { assignShopDesignPath } from "~/utils/fileUrl";
import { updateOrCreateJsonData } from "~/utils/jsonHandler";

function sanitizeFilename(value: string) {
  return value.replace(/[^a-zA-Z0-9._-]+/g, "-");
}

function parseMaybeJson(value: FormDataEntryValue | null) {
  if (typeof value !== "string") {
    return value;
  }

  const trimmed = value.trim();
  if (!trimmed) return "";

  try {
    return JSON.parse(trimmed);
  } catch {
    return trimmed;
  }
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
    const formData = await request.formData();
    const quoteId = `quote_${Date.now().toString(36)}_${Math.random()
      .toString(36)
      .slice(2, 10)}`;
    const quoteDir = assignShopDesignPath(session.id, `quotes/${quoteId}/`);
    fs.mkdirSync(quoteDir, { recursive: true });

    const payload: Record<string, any> = {
      id: quoteId,
      createdAt: new Date().toISOString(),
      fields: {},
      files: [],
    };

    for (const [key, value] of formData.entries()) {
      if (value instanceof File) {
        const safeName = sanitizeFilename(value.name || `${key}.bin`);
        const outputPath = path.join(quoteDir, safeName);
        const buffer = Buffer.from(await value.arrayBuffer());
        fs.writeFileSync(outputPath, buffer);
        payload.files.push({
          field: key,
          name: safeName,
          type: value.type || "application/octet-stream",
          size: value.size || buffer.length,
          path: outputPath,
        });
        continue;
      }

      payload.fields[key] = parseMaybeJson(value);
    }

    const saved = updateOrCreateJsonData(
      path.join(quoteDir, "payload.json"),
      payload,
    );

    if (!saved) {
      return json(
        { success: false, message: "Unable to save quote request" },
        { status: 500 },
      );
    }

    return json({
      success: true,
      id: quoteId,
      message: "Quote request saved",
    });
  } catch (error) {
    return json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : "Unable to save quote request",
      },
      { status: 500 },
    );
  }
};
