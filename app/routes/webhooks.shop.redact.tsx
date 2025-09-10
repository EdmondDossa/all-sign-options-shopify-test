import type { ActionFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import db from "../db.server";
import { unlink, rm } from "fs/promises";
import { join } from "path";

export async function action({ request }: ActionFunctionArgs) {
  // Vérifier que c'est une requête POST avec JSON
  if (request.method !== "POST") {
    return json({ error: "Method not allowed" }, { status: 405 });
  }

  const contentType = request.headers.get("Content-Type");
  if (!contentType || !contentType.includes("application/json")) {
    return json({ error: "Invalid content type" }, { status: 400 });
  }

  try {
    const payload = await request.json();
    const { shop_id, shop_domain } = payload;

    console.log("Received shop/redact webhook:", {
      shop_id,
      shop_domain
    });

    // Trouver la session/boutique dans notre base de données
    const session = await db.session.findFirst({
      where: { shop: shop_domain }
    });

    if (!session) {
      console.log(`Shop not found: ${shop_domain}`);
      return json({ message: "Shop not found" }, { status: 404 });
    }

    let redactionResults = {
      session_deleted: false,
      designs_deleted: 0,
      templates_deleted: 0,
      configurations_deleted: 0,
      fonts_deleted: 0,
      cliparts_groups_deleted: 0,
      categories_deleted: 0,
      settings_deleted: 0,
      uploads_deleted: 0,
      files_deleted: 0,
      directories_deleted: 0,
      errors: [] as string[]
    };

    try {
      // 1. Supprimer tous les designs et leurs fichiers
      const designs = await db.design.findMany({
        where: { sessionId: session.id }
      });

      for (const design of designs) {
        try {
          // Supprimer le fichier physique s'il existe
          if (design.fileUrl && design.storage === "local") {
            try {
              const filePath = join(process.cwd(), "public", design.fileUrl);
              await unlink(filePath);
              redactionResults.files_deleted++;
            } catch (fileError) {
              console.warn(`Could not delete design file ${design.fileUrl}:`, fileError);
            }
          }
        } catch (error) {
          redactionResults.errors.push(`Error deleting design file ${design.id}: ${error}`);
        }
      }

      // Supprimer les enregistrements de designs
      const deletedDesigns = await db.design.deleteMany({
        where: { sessionId: session.id }
      });
      redactionResults.designs_deleted = deletedDesigns.count;

      // 2. Supprimer tous les templates et leurs fichiers
      const templates = await db.template.findMany({
        where: { sessionId: session.id }
      });

      for (const template of templates) {
        try {
          // Supprimer les fichiers d'images s'ils existent
          if (template.prevImg) {
            try {
              const filePath = join(process.cwd(), "public", template.prevImg);
              await unlink(filePath);
              redactionResults.files_deleted++;
            } catch (fileError) {
              console.warn(`Could not delete template preview file ${template.prevImg}:`, fileError);
            }
          }

          if (template.realImg) {
            try {
              const filePath = join(process.cwd(), "public", template.realImg);
              await unlink(filePath);
              redactionResults.files_deleted++;
            } catch (fileError) {
              console.warn(`Could not delete template real file ${template.realImg}:`, fileError);
            }
          }
        } catch (error) {
          redactionResults.errors.push(`Error deleting template files ${template.id}: ${error}`);
        }
      }

      const deletedTemplates = await db.template.deleteMany({
        where: { sessionId: session.id }
      });
      redactionResults.templates_deleted = deletedTemplates.count;

      // 3. Supprimer toutes les configurations et leurs fichiers
      const configurations = await db.configuration.findMany({
        where: { sessionId: session.id }
      });

      for (const config of configurations) {
        try {
          // Supprimer les fichiers d'icônes et d'images popup
          if (config.icon) {
            try {
              const filePath = join(process.cwd(), "public", config.icon);
              await unlink(filePath);
              redactionResults.files_deleted++;
            } catch (fileError) {
              console.warn(`Could not delete config icon file ${config.icon}:`, fileError);
            }
          }

          if (config.popupImg) {
            try {
              const filePath = join(process.cwd(), "public", config.popupImg);
              await unlink(filePath);
              redactionResults.files_deleted++;
            } catch (fileError) {
              console.warn(`Could not delete config popup file ${config.popupImg}:`, fileError);
            }
          }
        } catch (error) {
          redactionResults.errors.push(`Error deleting config files ${config.id}: ${error}`);
        }
      }

      const deletedConfigurations = await db.configuration.deleteMany({
        where: { sessionId: session.id }
      });
      redactionResults.configurations_deleted = deletedConfigurations.count;

      // 4. Supprimer toutes les polices
      const deletedFonts = await db.font.deleteMany({
        where: { sessionId: session.id }
      });
      redactionResults.fonts_deleted = deletedFonts.count;

      // 5. Supprimer tous les groupes de cliparts et leurs cliparts
      const clipartsGroups = await db.clipartsGroup.findMany({
        where: { sessionId: session.id },
        include: { cliparts: true }
      });

      for (const group of clipartsGroups) {
        try {
          // Supprimer les fichiers de cliparts
          for (const clipart of group.cliparts) {
            if (clipart.url) {
              try {
                const filePath = join(process.cwd(), "public", clipart.url);
                await unlink(filePath);
                redactionResults.files_deleted++;
              } catch (fileError) {
                console.warn(`Could not delete clipart file ${clipart.url}:`, fileError);
              }
            }
          }
        } catch (error) {
          redactionResults.errors.push(`Error deleting clipart files for group ${group.id}: ${error}`);
        }
      }

      const deletedClipartsGroups = await db.clipartsGroup.deleteMany({
        where: { sessionId: session.id }
      });
      redactionResults.cliparts_groups_deleted = deletedClipartsGroups.count;

      // 6. Supprimer toutes les catégories
      const deletedCategories = await db.category.deleteMany({
        where: { sessionId: session.id }
      });
      redactionResults.categories_deleted = deletedCategories.count;

      // 7. Supprimer les paramètres
      const deletedSettings = await db.setting.deleteMany({
        where: { sessionId: session.id }
      });
      redactionResults.settings_deleted = deletedSettings.count;

      // 8. Supprimer les uploads
      const deletedUploads = await db.upload.deleteMany({
        where: { shop: shop_domain }
      });
      redactionResults.uploads_deleted = deletedUploads.count;

      // 9. Supprimer le dossier d'upload de la boutique s'il existe
      try {
        const shopUploadDir = join(process.cwd(), 'public', 'uploads', shop_domain);
        await rm(shopUploadDir, { recursive: true, force: true });
        redactionResults.directories_deleted++;
      } catch (dirError) {
        console.warn(`Could not delete shop upload directory:`, dirError);
      }

      // 10. Supprimer le dossier de designs de la boutique s'il existe
      try {
        const shopDesignsDir = join(process.cwd(), 'public', 'designs', shop_domain);
        await rm(shopDesignsDir, { recursive: true, force: true });
        redactionResults.directories_deleted++;
      } catch (dirError) {
        console.warn(`Could not delete shop designs directory:`, dirError);
      }

      // 11. Enfin, supprimer la session elle-même
      await db.session.delete({
        where: { id: session.id }
      });
      redactionResults.session_deleted = true;

      // Log pour audit
      console.log(`Shop redaction completed for ${shop_domain}:`, redactionResults);

      return json({
        message: "Shop redaction processed successfully",
        shop_domain,
        redaction_results: redactionResults
      });

    } catch (error) {
      console.error(`Error during shop redaction for ${shop_domain}:`, error);
      redactionResults.errors.push(`Critical error during shop redaction: ${error}`);
      
      return json({
        message: "Shop redaction completed with errors",
        shop_domain,
        redaction_results: redactionResults
      }, { status: 500 });
    }

  } catch (error) {
    console.error("Error processing shop/redact webhook:", error);
    return json({ error: "Internal server error" }, { status: 500 });
  }
}
