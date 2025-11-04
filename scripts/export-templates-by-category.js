import { PrismaClient } from "@prisma/client";
import * as fs from "fs";
import * as path from "path";
import AdmZip from "adm-zip";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Prisma Client
const prisma = new PrismaClient();

/**
 * Sanitize filename by removing invalid characters
 */
function sanitizeFileName(name) {
  return name
    .replace(/[^a-z0-9]/gi, "_")
    .replace(/\s+/g, "_")
    .toLowerCase();
}

/**
 * Replace URLs for export compatibility (same logic as replaceUrlForImport in UI)
 * Transforms relative URLs to absolute URLs using uploadsPrefix
 */
function replaceUrlForExport(data, oldPrefix, newPrefix) {
  if (typeof data === "string") {
    if (data.startsWith("https://") && data.includes(oldPrefix) && !data.includes(newPrefix)) {
      // Replace the old prefix with the new prefix
      const newPath = newPrefix + data.split(oldPrefix).pop();
      return newPath;
    }
    return data;
  } else if (typeof data === "object" && data !== null) {
    if (Array.isArray(data)) {
      return data.map((item) => replaceUrlForExport(item, oldPrefix, newPrefix));
    } else {
      const result = {};
      for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
          result[key] = replaceUrlForExport(data[key], oldPrefix, newPrefix);
        }
      }
      return result;
    }
  }
  return data;
}

/**
 * Get fonts used by a configuration (same logic as UI export)
 * Filters all fonts by selectedFonts in configuration.data.settings.customizerSign.text.selectedFonts
 */
async function getFontsForConfiguration(configuration, sessionId) {
  // Get all fonts for the session
  const allFonts = await prisma.font.findMany({
    where: {
      sessionId: sessionId,
    },
  });

  if (!allFonts || allFonts.length === 0) {
    return [];
  }

  // Filter fonts by selectedFonts in configuration (same as UI export)
  const selectedFontIds = configuration?.data?.settings?.customizerSign?.text?.selectedFonts || [];
  const fonts = allFonts.filter((font) => 
    selectedFontIds.find((id) => id === font.id)
  );

  return fonts || [];
}

/**
 * List all available sessions
 */
async function listSessions() {
  try {
    const sessions = await prisma.session.findMany({
      select: {
        id: true,
        shop: true,
        email: true,
      },
      orderBy: {
        shop: "asc",
      },
    });

    if (sessions.length === 0) {
      console.log("No sessions found in the database.");
      return;
    }

    console.log("\n📋 Available sessions:");
    console.log("=".repeat(80));
    console.log(
      `${"Shop".padEnd(40)} ${"Session ID".padEnd(40)}`
    );
    console.log("=".repeat(80));

    sessions.forEach((session) => {
      const shop = (session.shop || "N/A").padEnd(40);
      const id = session.id.padEnd(40);
      console.log(`${shop} ${id}`);
    });

    console.log("=".repeat(80));
    console.log(`\nTotal: ${sessions.length} session(s)\n`);
    console.log("💡 Usage examples:");
    console.log("  - Export all sessions: npm run export:templates");
    console.log("  - Export by session ID: npm run export:templates -- --session=YOUR_SESSION_ID");
    console.log("  - Export by shop name: npm run export:templates -- --shop=example.myshopify.com\n");
  } catch (error) {
    console.error("Error listing sessions:", error);
  } finally {
    await prisma.$disconnect();
  }
}

/**
 * Export templates by category
 */
async function exportTemplatesByCategory(sessionId = null, shopName = null) {
  try {
    console.log("Starting export of templates by category...");

    // Determine which sessions to process
    let sessions;
    if (shopName) {
      // Find session by shop name (case-insensitive search)
      // First try exact match
      let foundSessions = await prisma.session.findMany({
        where: { 
          shop: shopName,
        },
      });
      
      // If no exact match, try case-insensitive search using raw query
      if (foundSessions.length === 0) {
        foundSessions = await prisma.$queryRaw`
          SELECT * FROM "Session" 
          WHERE LOWER(shop) = LOWER(${shopName})
        `;
      }
      
      sessions = foundSessions;
      
      if (sessions.length === 0) {
        console.error(`No session found for shop: ${shopName}`);
        console.log(`💡 Try using --list to see all available shops`);
        return;
      }
      console.log(`Found ${sessions.length} session(s) for shop: ${shopName}`);
    } else if (sessionId) {
      sessions = await prisma.session.findMany({
        where: { id: sessionId },
      });
      if (sessions.length === 0) {
        console.error(`No session found with ID: ${sessionId}`);
        return;
      }
    } else {
      // Export for all sessions
      sessions = await prisma.session.findMany();
      console.log(`Found ${sessions.length} session(s) to process`);
    }

    if (sessions.length === 0) {
      console.error("No sessions found!");
      return;
    }

    const uploadsPrefix = process.env.SHOPIFY_APP_URL || "https://example.myshopify.com";

    // Process each session
    for (const session of sessions) {
      console.log(`\nProcessing session: ${session.shop} (${session.id})`);

      // Get all categories with their templates
      const categories = await prisma.category.findMany({
        where: {
          sessionId: session.id,
        },
        include: {
          templates: {
            include: {
              configuration: {
                select: {
                  id: true,
                  name: true,
                  data: true,
                  product: true,
                },
              },
            },
          },
        },
        orderBy: {
          name: "asc",
        },
      });

      if (categories.length === 0) {
        console.log(`  No categories found for session ${session.shop}`);
        continue;
      }

      console.log(`  Found ${categories.length} category(ies)`);

      // Create temporary directory for JSON files
      const tempDir = path.join(__dirname, "temp_export");
      if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir, { recursive: true });
      }

      const exportedFiles = [];

      // Process each category
      for (const category of categories) {
        if (category.templates.length === 0) {
          console.log(`  Skipping category "${category.name}" - no templates`);
          continue;
        }

        console.log(`  Processing category: "${category.name}" (${category.templates.length} template(s))`);

        // Get all unique configurations used by templates in this category
        const configurationIds = new Set(
          category.templates.map((t) => t.configurationId)
        );
        const configurations = await prisma.configuration.findMany({
          where: {
            id: { in: Array.from(configurationIds) },
            sessionId: session.id,
          },
        });

        if (configurations.length === 0) {
          console.log(`  Warning: No configuration found for category "${category.name}"`);
          continue;
        }

        // Group templates by configuration for better organization
        // We'll use the primary configuration (most templates) as the base
        const configTemplateCount = {};
        category.templates.forEach((template) => {
          configTemplateCount[template.configurationId] = 
            (configTemplateCount[template.configurationId] || 0) + 1;
        });
        
        const primaryConfigId = Object.keys(configTemplateCount).reduce((a, b) =>
          configTemplateCount[a] > configTemplateCount[b] ? a : b
        );
        const primaryConfiguration = configurations.find(c => c.id === parseInt(primaryConfigId));

        // Get fonts using the same logic as UI export (filter by selectedFonts)
        const fonts = await getFontsForConfiguration(primaryConfiguration, session.id);

        // Prepare templates for export (same structure as existing export)
        const templatesForExport = category.templates.map((template) => ({
          id: template.id,
          name: template.name,
          basePrice: template.basePrice,
          prevImg: template.prevImg,
          realImg: template.realImg,
          enabledAddToCart: template.enabledAddToCart,
          recaps: template.recaps,
          data: template.data,
          enabledAutoImgUpdate: template.enabledAutoImgUpdate,
        }));

        // Create export structure EXACTLY like the UI export
        // Structure: configuration object with templates, fonts, data, uploadsPrefix
        let exportData = {
          id: primaryConfiguration.id,
          name: primaryConfiguration.name,
          description: primaryConfiguration.description,
          icon: primaryConfiguration.icon,
          popupImg: primaryConfiguration.popupImg,
          sessionId: primaryConfiguration.sessionId,
          data: primaryConfiguration.data,
          product: primaryConfiguration.product,
          materialType: primaryConfiguration.materialType,
          productType: primaryConfiguration.productType,
          templates: templatesForExport,
          fonts: fonts.map((font) => ({
            id: font.id,
            label: font.label,
            url: font.url,
            isGoogleFont: font.isGoogleFont,
          })),
          uploadsPrefix: uploadsPrefix,
        };

        // Replace URLs for export compatibility (same as UI export)
        // Transform "apps/aso-proxy" URLs to use uploadsPrefix
        exportData = replaceUrlForExport(
          exportData,
          "apps/aso-proxy",
          uploadsPrefix
        );

        // Create filename from category name
        const fileName = `${sanitizeFileName(category.name)}.json`;
        const filePath = path.join(tempDir, fileName);

        // Write JSON file
        fs.writeFileSync(filePath, JSON.stringify(exportData, null, 2), "utf8");
        exportedFiles.push({
          fileName,
          filePath,
          categoryName: category.name,
        });

        console.log(`    ✓ Exported ${category.templates.length} template(s) to ${fileName}`);
      }

      if (exportedFiles.length === 0) {
        console.log(`  No templates to export for session ${session.shop}`);
        // Clean up temp directory
        if (fs.existsSync(tempDir)) {
          fs.rmSync(tempDir, { recursive: true, force: true });
        }
        continue;
      }

      // Create ZIP file
      const zipFileName = `templates_export_${sanitizeFileName(session.shop)}_${Date.now()}.zip`;
      const zipFilePath = path.join(__dirname, zipFileName);

      const zip = new AdmZip();
      
      // Add all JSON files to ZIP
      for (const file of exportedFiles) {
        zip.addLocalFile(file.filePath, "", file.fileName);
        console.log(`    Added to ZIP: ${file.fileName} (${file.categoryName})`);
      }

      // Write ZIP file
      zip.writeZip(zipFilePath);
      console.log(`\n✓ ZIP file created: ${zipFilePath}`);
      console.log(`  Total categories exported: ${exportedFiles.length}`);

      // Clean up temporary directory
      if (fs.existsSync(tempDir)) {
        fs.rmSync(tempDir, { recursive: true, force: true });
      }
    }

    console.log("\n✓ Export completed successfully!");
  } catch (error) {
    console.error("Error during export:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Parse command line arguments
const args = process.argv.slice(2);

// Check for --list flag
if (args.includes("--list") || args.includes("-l")) {
  listSessions()
    .then(() => {
      process.exit(0);
    })
    .catch((error) => {
      console.error("Fatal error:", error);
      process.exit(1);
    });
} else {
  const sessionId = args.find((arg) => arg.startsWith("--session="))?.split("=")[1] || null;
  const shopName = args.find((arg) => arg.startsWith("--shop="))?.split("=")[1] || null;

  // Run the export
  exportTemplatesByCategory(sessionId, shopName)
    .then(() => {
      console.log("\nScript finished.");
      process.exit(0);
    })
    .catch((error) => {
      console.error("Fatal error:", error);
      process.exit(1);
    });
}

