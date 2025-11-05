import { PrismaClient } from "@prisma/client";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Prisma Client
const prisma = new PrismaClient();

/**
 * Sanitize string to create slug
 */
function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

/**
 * Import template packs from JSON files
 */
async function importTemplatePacks() {
  try {
    console.log("Starting template packs import...\n");

    // Paths
    const scriptsDir = path.join(__dirname);
    const targetJsonDir = path.join(__dirname, "..", "public", "template-packs", "json");
    const targetPreviewDir = path.join(__dirname, "..", "public", "template-packs", "previews");

    // Create directories if they don't exist
    if (!fs.existsSync(targetJsonDir)) {
      fs.mkdirSync(targetJsonDir, { recursive: true });
      console.log(`Created directory: ${targetJsonDir}`);
    }
    if (!fs.existsSync(targetPreviewDir)) {
      fs.mkdirSync(targetPreviewDir, { recursive: true });
      console.log(`Created directory: ${targetPreviewDir}`);
    }

    // Find all JSON files in scripts directory
    const jsonFiles = fs
      .readdirSync(scriptsDir)
      .filter((file) => file.endsWith(".json") && file !== "data.json");

    if (jsonFiles.length === 0) {
      console.log("No JSON files found in scripts directory.");
      console.log("Please run the export script first to generate template pack JSON files.");
      return;
    }

    console.log(`Found ${jsonFiles.length} JSON file(s) to process:\n`);

    for (const jsonFile of jsonFiles) {
      try {
        const jsonPath = path.join(scriptsDir, jsonFile);
        const jsonContent = fs.readFileSync(jsonPath, "utf8");
        const packData = JSON.parse(jsonContent);

        // Extract category name from filename (remove extension)
        const categoryName = path.basename(jsonFile, ".json");
        const packName = `Pack ${categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}`;
        const slug = slugify(packName);

        // Check if pack already exists
        const existingPack = await prisma.templatePack.findUnique({
          where: { slug },
        });

        // Copy JSON file to target directory
        const targetJsonPath = path.join(targetJsonDir, jsonFile);
        fs.copyFileSync(jsonPath, targetJsonPath);
        console.log(`✓ Copied ${jsonFile} to template-packs/json/`);

        // Extract preview image from first template if available
        // Support both new format (configurations array) and legacy format
        let previewImg = "/aso_logo.png";
        const isNewFormat = packData.configurations && Array.isArray(packData.configurations);
        
        if (isNewFormat) {
          // New format: check first template in first configuration
          if (packData.configurations.length > 0) {
            const firstConfig = packData.configurations[0];
            if (firstConfig.templates && firstConfig.templates.length > 0) {
              const firstTemplate = firstConfig.templates[0];
              if (firstTemplate.prevImg) {
                previewImg = firstTemplate.prevImg;
              }
            }
          }
        } else {
          // Legacy format: templates at root level
          if (packData.templates && packData.templates.length > 0) {
            const firstTemplate = packData.templates[0];
            if (firstTemplate.prevImg) {
              previewImg = firstTemplate.prevImg;
            }
          }
        }

        // Determine price (default: $29.99, can be adjusted)
        const defaultPrice = 29.99;
        let templateCount = 0;
        
        if (isNewFormat) {
          // Count all templates across all configurations
          templateCount = packData.configurations.reduce((total: number, config: any) => {
            return total + (config.templates?.length || 0);
          }, 0);
        } else {
          // Legacy format
          templateCount = packData.templates?.length || 0;
        }
        const price = defaultPrice + (templateCount > 10 ? (templateCount - 10) * 2 : 0);

        const packDataToSave = {
          name: packName,
          slug: slug,
          description: `Premium ${categoryName} templates - ${templateCount} ready-to-use templates`,
          category: categoryName,
          price: price,
          jsonFile: jsonFile,
          previewImg: previewImg,
          isActive: true,
          order: 0,
        };

        if (existingPack) {
          // Update existing pack
          await prisma.templatePack.update({
            where: { slug },
            data: packDataToSave,
          });
          console.log(`  ✓ Updated pack: ${packName}`);
        } else {
          // Create new pack
          await prisma.templatePack.create({
            data: packDataToSave,
          });
          console.log(`  ✓ Created pack: ${packName}`);
        }

        console.log(`    - Category: ${categoryName}`);
        console.log(`    - Templates: ${templateCount}`);
        console.log(`    - Price: $${price.toFixed(2)}`);
        console.log(`    - JSON File: ${jsonFile}\n`);
      } catch (error) {
        console.error(`  ✗ Error processing ${jsonFile}:`, error.message);
        console.log("");
      }
    }

    console.log("\n✓ Template packs import completed!");
    console.log("\nNext steps:");
    console.log("1. Review and adjust prices in the admin interface");
    console.log("2. Upload preview images to /public/template-packs/previews/");
    console.log("3. Test the pack purchase flow");
  } catch (error) {
    console.error("Error during import:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the import
importTemplatePacks()
  .then(() => {
    console.log("\nScript finished.");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Fatal error:", error);
    process.exit(1);
  });
