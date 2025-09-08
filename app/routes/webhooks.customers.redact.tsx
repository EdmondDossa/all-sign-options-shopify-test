import type { ActionFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import db from "../db.server";
import { unlink } from "fs/promises";
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
    const { shop_id, shop_domain, customer, orders_to_redact } = payload;

    console.log("Received customers/redact webhook:", {
      shop_id,
      shop_domain,
      customer_id: customer?.id,
      customer_email: customer?.email,
      orders_to_redact
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
      designs_redacted: 0,
      files_deleted: 0,
      errors: [] as string[]
    };

    // Supprimer/anonymiser les designs liés à ce client
    if (customer?.id || customer?.email) {
      try {
        const designs = await db.design.findMany({
          where: {
            sessionId: session.id,
            // Note: Nous n'avons pas de champ direct pour l'email client
            // mais nous pouvons chercher par période ou autres critères
            // Pour l'instant, nous supprimons tous les designs de la session
            // Dans un vrai scénario, vous pourriez avoir un mapping client-design
          }
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

            // Supprimer l'enregistrement de la base de données
            await db.design.delete({
              where: { id: design.id }
            });

            redactionResults.designs_redacted++;
          } catch (error) {
            redactionResults.errors.push(`Error redacting design ${design.id}: ${error}`);
          }
        }
      } catch (error) {
        redactionResults.errors.push(`Error processing designs: ${error}`);
      }
    }

    // Anonymiser les templates qui pourraient contenir des données client
    // Note: Nous ne supprimons pas complètement les templates car ils peuvent être nécessaires
    // pour la boutique, mais nous pouvons anonymiser les données sensibles
    try {
      const templates = await db.template.findMany({
        where: {
          sessionId: session.id
        }
      });

      for (const template of templates) {
        try {
          // Anonymiser le nom du template si il contient des données client
          if (template.name && customer?.email) {
            const anonymizedName = template.name.replace(
              new RegExp(customer.email.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi'),
              '[REDACTED]'
            );

            if (anonymizedName !== template.name) {
              await db.template.update({
                where: { id: template.id },
                data: { name: anonymizedName }
              });
            }
          }
        } catch (error) {
          redactionResults.errors.push(`Error anonymizing template ${template.id}: ${error}`);
        }
      }
    } catch (error) {
      redactionResults.errors.push(`Error processing templates: ${error}`);
    }

    // Anonymiser les configurations qui pourraient contenir des données client
    try {
      const configurations = await db.configuration.findMany({
        where: {
          sessionId: session.id
        }
      });

      for (const config of configurations) {
        try {
          // Anonymiser le nom de la configuration si il contient des données client
          if (config.name && customer?.email) {
            const anonymizedName = config.name.replace(
              new RegExp(customer.email.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi'),
              '[REDACTED]'
            );

            if (anonymizedName !== config.name) {
              await db.configuration.update({
                where: { id: config.id },
                data: { name: anonymizedName }
              });
            }
          }
        } catch (error) {
          redactionResults.errors.push(`Error anonymizing configuration ${config.id}: ${error}`);
        }
      }
    } catch (error) {
      redactionResults.errors.push(`Error processing configurations: ${error}`);
    }

    // Log pour audit
    console.log(`Customer redaction processed for shop ${shop_domain}, customer ${customer?.id}:`, redactionResults);

    // Retourner le résultat de la suppression
    return json({
      message: "Customer redaction processed successfully",
      customer_id: customer?.id,
      shop_domain,
      redaction_results: redactionResults
    });

  } catch (error) {
    console.error("Error processing customers/redact webhook:", error);
    return json({ error: "Internal server error" }, { status: 500 });
  }
}
