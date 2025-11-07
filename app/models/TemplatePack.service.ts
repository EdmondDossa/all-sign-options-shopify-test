import prisma from "~/db.server";
import TemplateService from "~/models/Template.service";
import CategoryService from "~/models/Category.service";
import ConfigurationService from "~/models/Configuration.service";
import FontService from "~/models/Font.service";
import { ShopifyProductService } from "~/models/ShopifyProduct.service";
import { readFileSync, readdirSync, copyFileSync, existsSync, mkdirSync } from "fs";
import * as path from "path";
import { replaceUrlForImport } from "~/utils/import-file";
import { getShopPath } from "~/utils/fileUrl";

export interface TemplatePackType {
  id?: number;
  name: string;
  slug: string;
  description?: string;
  category: string;
  price: number;
  jsonFile: string;
  previewImg: string;
  icon?: string;
  isActive?: boolean;
  order?: number;
}

export default class TemplatePackService {
  /**
   * Get all active template packs
   */
  static async getAllPacks(sessionId?: string): Promise<any[]> {
    try {
      const packs = await prisma.templatePack.findMany({
        where: {
          isActive: true,
        },
        orderBy: {
          order: "asc",
        },
      });

      // If sessionId provided, check which packs are purchased
      if (sessionId) {
        const purchasedPacks = await prisma.shopTemplatePack.findMany({
          where: {
            sessionId: sessionId,
            isActive: true,
          },
          select: {
            packId: true,
          },
        });

        const purchasedPackIds = new Set(
          purchasedPacks.map((p) => p.packId)
        );

        return packs.map((pack) => ({
          ...pack,
          isPurchased: purchasedPackIds.has(pack.id),
          hasAccess: purchasedPackIds.has(pack.id),
        }));
      }

      return packs;
    } catch (error) {
      console.error("Error retrieving template packs:", error);
      return [];
    }
  }

  /**
   * Get a single template pack by ID or slug
   */
  static async getPack(
    identifier: number | string,
    sessionId?: string
  ): Promise<any | null> {
    try {
      const where =
        typeof identifier === "number"
          ? { id: identifier }
          : { slug: identifier };

      const pack = await prisma.templatePack.findFirst({
        where: {
          ...where,
          isActive: true,
        },
      });

      if (!pack) {
        return null;
      }

      // Check if purchased
      let isPurchased = false;
      let hasAccess = false;

      if (sessionId) {
        const purchase = await prisma.shopTemplatePack.findFirst({
          where: {
            sessionId: sessionId,
            packId: pack.id,
            isActive: true,
          },
        });

        isPurchased = !!purchase;

        if (isPurchased) {
          // Check if templates from pack still exist in shop
          hasAccess = await this.hasAccessToPack(sessionId, pack.id);
        }
      }

      return {
        ...pack,
        isPurchased,
        hasAccess,
      };
    } catch (error) {
      console.error("Error retrieving template pack:", error);
      return null;
    }
  }

  /**
   * Check if a shop has access to a pack (purchased AND templates still exist)
   */
  static async hasAccessToPack(
    sessionId: string,
    packId: number
  ): Promise<boolean> {
    try {
      // Check if pack is purchased
      const purchase = await prisma.shopTemplatePack.findFirst({
        where: {
          sessionId: sessionId,
          packId: packId,
          isActive: true,
        },
      });

      if (!purchase) {
        return false;
      }

      // Get pack info
      const pack = await prisma.templatePack.findUnique({
        where: { id: packId },
      });

      if (!pack) {
        return false;
      }

      // Read JSON file to get template names
      try {
        const jsonPath = path.join(process.cwd(), "public", "template-packs", "json", pack.jsonFile);
        const packData = JSON.parse(readFileSync(jsonPath, "utf8"));
        
        // Support both new format (configurations array) and legacy format
        const isNewFormat = packData.configurations && Array.isArray(packData.configurations);
        let templateNames: string[] = [];
        
        if (isNewFormat) {
          // New format: extract template names from all configurations
          packData.configurations.forEach((config: any) => {
            if (config.templates && Array.isArray(config.templates)) {
              const configTemplateNames = config.templates.map((t: any) => t.name);
              templateNames.push(...configTemplateNames);
            }
          });
        } else {
          // Legacy format: templates at root level
          templateNames = packData.templates?.map((t: any) => t.name) || [];
        }

        if (templateNames.length === 0) {
          return false;
        }

        // Check if at least one template from pack exists in shop
        const shopTemplates = await prisma.template.findMany({
          where: {
            sessionId: sessionId,
            name: { in: templateNames },
          },
          select: { name: true },
        });

        const shopTemplateNames = new Set(
          shopTemplates.map((t) => t.name)
        );

        // Check if all templates exist (or at least some)
        // We'll consider access if at least 50% of templates exist
        const existingCount = templateNames.filter((name: string) =>
          shopTemplateNames.has(name)
        ).length;

        return existingCount >= templateNames.length * 0.5;
      } catch (error) {
        console.error("Error reading pack JSON:", error);
        // If we can't read the file, assume access is valid if purchased
        return true;
      }
    } catch (error) {
      console.error("Error checking pack access:", error);
      return false;
    }
  }

  /**
   * Get purchased packs for a shop
   */
  static async getPurchasedPacks(sessionId: string): Promise<any[]> {
    try {
      const purchases = await prisma.shopTemplatePack.findMany({
        where: {
          sessionId: sessionId,
          isActive: true,
        },
        include: {
          pack: true,
        },
        orderBy: {
          purchasedAt: "desc",
        },
      });

      // Check access for each pack
      const packsWithAccess = await Promise.all(
        purchases.map(async (purchase) => {
          const hasAccess = await this.hasAccessToPack(
            sessionId,
            purchase.packId
          );
          return {
            ...purchase.pack,
            purchaseInfo: {
              purchasedAt: purchase.purchasedAt,
              purchasePrice: purchase.purchasePrice,
            },
            hasAccess,
          };
        })
      );

      return packsWithAccess;
    } catch (error) {
      console.error("Error retrieving purchased packs:", error);
      return [];
    }
  }

  /**
   * Record a pack purchase
   */
  static async recordPurchase(
    sessionId: string,
    packId: number,
    price: number
  ): Promise<any | null> {
    try {
      // Check if already purchased
      const existing = await prisma.shopTemplatePack.findUnique({
        where: {
          sessionId_packId: {
            sessionId: sessionId,
            packId: packId,
          },
        },
      });

      if (existing) {
        // Update existing purchase
        return await prisma.shopTemplatePack.update({
          where: { id: existing.id },
          data: {
            purchasedAt: new Date(),
            purchasePrice: price,
            isActive: true,
          },
        });
      }

      // Create new purchase
      return await prisma.shopTemplatePack.create({
        data: {
          sessionId: sessionId,
          packId: packId,
          purchasePrice: price,
          isActive: true,
        },
      });
    } catch (error) {
      console.error("Error recording pack purchase:", error);
      return null;
    }
  }

  /**
   * Import a pack into a shop
   */
  static async importPackToShop(
    sessionId: string,
    packId: number,
    shop: string,
    admin?: any
  ): Promise<{ success: boolean; message: string; templatesCount?: number }> {
    try {
      // Get pack info
      const pack = await prisma.templatePack.findUnique({
        where: { id: packId },
      });

      if (!pack) {
        return { success: false, message: "Pack not found" };
      }

      // Check if pack is purchased
      const hasAccess = await this.hasAccessToPack(sessionId, packId);
      if (!hasAccess) {
        // Check purchase record
        const purchase = await prisma.shopTemplatePack.findFirst({
          where: {
            sessionId: sessionId,
            packId: packId,
            isActive: true,
          },
        });

        if (!purchase) {
          return {
            success: false,
            message: "Pack not purchased. Please purchase the pack first.",
          };
        }
      }

      // Read JSON file
      // Use path.join with process.cwd() to ensure correct path resolution
      const jsonPath = path.join(process.cwd(), "public", "template-packs", "json", pack.jsonFile);
      let packData: any;

      try {
        packData = JSON.parse(readFileSync(jsonPath, "utf8"));
      } catch (error) {
        console.error("Error reading pack JSON file:", error);
        return { success: false, message: "Error reading pack file" };
      }

      // Check for new format (with configurations array) or legacy format
      const isNewFormat = packData.configurations && Array.isArray(packData.configurations);
      const configurationsToImport = isNewFormat 
        ? packData.configurations 
        : [packData]; // Legacy format: single configuration object
      
      const allTemplates: any[] = [];
      
      if (isNewFormat) {
        // New format: extract all templates from all configurations
        configurationsToImport.forEach((config: any) => {
          if (config.templates && Array.isArray(config.templates)) {
            allTemplates.push(...config.templates);
          }
        });
      } else {
        // Legacy format: templates at root level
        allTemplates.push(...(packData.templates || []));
      }

      if (allTemplates.length === 0) {
        return { success: false, message: "No templates found in pack" };
      }

      // Transform URLs for import
      packData = await replaceUrlForImport(
        packData,
        packData.uploadsPrefix || "",
        `https://${shop}/apps/aso-proxy/`,
        `public/uploads/${getShopPath(sessionId)}/files`,
        true
      );

      // Import fonts (from root level or new format)
      const fontsToImport = packData.fonts || [];
      const fontIDs: number[] = [];
      if (fontsToImport.length > 0) {
        for (const font of fontsToImport) {
          const fontData = await FontService.addFont(
            {
              label: font.label,
              url: font.url,
              isGoogleFont: font.isGoogleFont,
            },
            sessionId
          );

          if (fontData) {
            fontIDs.push(fontData.id);
          }
        }
      }

      // Get or create category
      const categoryName = isNewFormat 
        ? (packData.category?.name || pack.category)
        : pack.category;
        
      let category = await CategoryService.getCategoryByName(
        categoryName,
        sessionId
      );

      if (!category) {
        category = await CategoryService.addCategory(
          {
            name: categoryName,
          },
          sessionId
        );
      }

      // Create or get configurations and import templates
      const configMap = new Map<number, number>(); // Maps original config ID to new config ID
      let totalTemplatesImported = 0;

      for (const configData of configurationsToImport) {
        // Check if configuration with same name already exists
        let targetConfiguration = await ConfigurationService.getConfigurations(
          sessionId
        );
        
        // Try to find existing configuration by name
        const existingConfig = targetConfiguration?.find(
          (c: any) => c.name === configData.name
        );

        if (existingConfig) {
          // Use existing configuration
          targetConfiguration = existingConfig;
          
          // Merge materials from pack into existing config
          if (configData.data?.materials && targetConfiguration.data?.materials) {
            const existingMaterialIds = new Set(
              targetConfiguration.data.materials.map((m: any) => m.id || m.name)
            );
            
            const newMaterials = configData.data.materials.filter(
              (m: any) => !existingMaterialIds.has(m.id || m.name)
            );
            
            if (newMaterials.length > 0) {
              targetConfiguration.data.materials = [
                ...targetConfiguration.data.materials,
                ...newMaterials,
              ];
            }
          }

          // Add fonts to configuration (avoid duplicates)
          if (fontIDs.length > 0) {
            if (
              targetConfiguration.data?.settings?.customizerSign?.text
                ?.selectedFonts
            ) {
              const existingFontIds = new Set(
                targetConfiguration.data.settings.customizerSign.text.selectedFonts
              );
              const newFontIds = fontIDs.filter((id) => !existingFontIds.has(id));
              
              if (newFontIds.length > 0) {
                targetConfiguration.data.settings.customizerSign.text.selectedFonts = [
                  ...targetConfiguration.data.settings.customizerSign.text.selectedFonts,
                  ...newFontIds,
                ];
              }
            }
          }

          // Update configuration
          await ConfigurationService.updateConfiguration(
            targetConfiguration,
            sessionId
          );
          
          configMap.set(configData.id, targetConfiguration.id);
        } else {
          // Create new configuration
          // IMPORTANT: Ne pas importer les produits du pack d'origine
          // Le client devra associer ses propres produits après l'importation
          targetConfiguration = await ConfigurationService.addConfiguration(
            {
              name: `${configData.name} (Pack)`,
              description: configData.description || `Configuration from ${pack.name} pack`,
              icon: configData.icon || pack.icon || "",
              popupImg: configData.popupImg || pack.previewImg,
              data: configData.data || {},
              products: [], // Toujours vide lors de l'importation - le client ajoutera ses propres produits
              materialType: configData.materialType,
              productType: configData.productType,
            },
            sessionId
          );

          if (!targetConfiguration) {
            console.error(`Error creating configuration: ${configData.name}`);
            continue;
          }

          // Add fonts to new configuration
          if (fontIDs.length > 0) {
            if (
              targetConfiguration.data?.settings?.customizerSign?.text
                ?.selectedFonts
            ) {
              targetConfiguration.data.settings.customizerSign.text.selectedFonts = [
                ...(targetConfiguration.data.settings.customizerSign.text.selectedFonts || []),
                ...fontIDs,
              ];
            } else if (targetConfiguration.data?.settings?.customizerSign?.text) {
              targetConfiguration.data.settings.customizerSign.text.selectedFonts = fontIDs;
            }
          }

          // S'assurer que products reste vide lors de la mise à jour
          // targetConfiguration vient de la DB avec 'product', on doit le convertir en 'products'
          if (!targetConfiguration.products) {
            targetConfiguration.products = Array.isArray(targetConfiguration.product) 
              ? targetConfiguration.product 
              : [];
          }
          
          // Essayer de trouver un produit disponible pour l'associer par défaut
          let defaultProduct: {id: string, title: string} | null = null;
          if (admin) {
            defaultProduct = await ShopifyProductService.findAvailableProduct(admin);
          }
          
          // Si un produit disponible est trouvé, l'associer, sinon laisser vide
          if (defaultProduct) {
            targetConfiguration.products = [defaultProduct];
            console.log(`Import - Associating available product "${defaultProduct.title}" to configuration "${targetConfiguration.name}"`);
          } else {
            targetConfiguration.products = [];
            console.log(`Import - No available product found for configuration "${targetConfiguration.name}", leaving empty`);
          }

          // Update configuration with fonts and products
          await ConfigurationService.updateConfiguration(
            targetConfiguration,
            sessionId
          );
          
          // Si un produit par défaut a été trouvé, l'associer dans Shopify
          if (defaultProduct && admin) {
            await ShopifyProductService.updateMultipleProducts(
              admin,
              [defaultProduct],
              targetConfiguration.id
            );
          }
          
          configMap.set(configData.id, targetConfiguration.id);
        }

        // Import templates for this configuration
        const configTemplates = isNewFormat 
          ? (configData.templates || [])
          : (configData.templates || allTemplates);
          
        if (configTemplates.length > 0) {
          // Remove configurationId from template data (it will be set by addMany)
          const templatesToImport = configTemplates.map((t: any) => {
            const { configurationId, ...templateData } = t;
            return templateData;
          });

          const templates = await TemplateService.addMany(
            templatesToImport,
            sessionId,
            targetConfiguration.id,
            category?.id
          );

          if (templates) {
            totalTemplatesImported += configTemplates.length;
          }
        }
      }

      if (totalTemplatesImported === 0) {
        return { success: false, message: "Error importing templates" };
      }

      return {
        success: true,
        message: "Pack imported successfully",
        templatesCount: totalTemplatesImported,
      };
    } catch (error) {
      console.error("Error importing pack to shop:", error);
      return {
        success: false,
        message: `Error importing pack: ${error}`,
      };
    }
  }

  /**
   * Create a new template pack (admin)
   */
  static async createPack(
    packData: TemplatePackType
  ): Promise<any | null> {
    try {
      return await prisma.templatePack.create({
        data: packData,
      });
    } catch (error) {
      console.error("Error creating template pack:", error);
      return null;
    }
  }

  /**
   * Update a template pack (admin)
   */
  static async updatePack(
    id: number,
    packData: Partial<TemplatePackType>
  ): Promise<any | null> {
    try {
      return await prisma.templatePack.update({
        where: { id },
        data: packData,
      });
    } catch (error) {
      console.error("Error updating template pack:", error);
      return null;
    }
  }

  /**
   * Delete a template pack (admin)
   */
  static async deletePack(id: number): Promise<boolean> {
    try {
      await prisma.templatePack.delete({
        where: { id },
      });
      return true;
    } catch (error) {
      console.error("Error deleting template pack:", error);
      return false;
    }
  }

  /**
   * Import template packs from JSON files in scripts directory (admin)
   * This replicates the functionality of the import-template-packs.js script
   */
  static async importPacksFromScripts(): Promise<{
    success: boolean;
    message: string;
    imported: number;
    updated: number;
    errors: string[];
  }> {
    try {
      const scriptsDir = path.join(process.cwd(), "scripts");
      const targetJsonDir = path.join(process.cwd(), "public", "template-packs", "json");
      const targetPreviewDir = path.join(process.cwd(), "public", "template-packs", "previews");

      // Create directories if they don't exist
      if (!existsSync(targetJsonDir)) {
        mkdirSync(targetJsonDir, { recursive: true });
      }
      if (!existsSync(targetPreviewDir)) {
        mkdirSync(targetPreviewDir, { recursive: true });
      }

      // Find all JSON files in scripts directory
      const jsonFiles = readdirSync(scriptsDir)
        .filter((file) => file.endsWith(".json") && file !== "data.json");

      if (jsonFiles.length === 0) {
        return {
          success: false,
          message: "No JSON files found in scripts directory",
          imported: 0,
          updated: 0,
          errors: [],
        };
      }

      let imported = 0;
      let updated = 0;
      const errors: string[] = [];

      // Helper function to slugify
      const slugify = (text: string) => {
        return text
          .toString()
          .toLowerCase()
          .trim()
          .replace(/\s+/g, "-")
          .replace(/[^\w\-]+/g, "")
          .replace(/\-\-+/g, "-")
          .replace(/^-+/, "")
          .replace(/-+$/, "");
      };

      for (const jsonFile of jsonFiles) {
        try {
          const jsonPath = path.join(scriptsDir, jsonFile);
          const jsonContent = readFileSync(jsonPath, "utf8");
          const packData = JSON.parse(jsonContent);

          // Extract category name from filename
          const categoryName = path.basename(jsonFile, ".json");
          const packName = `Pack ${categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}`;
          const slug = slugify(packName);

          // Check if pack already exists
          const existingPack = await prisma.templatePack.findUnique({
            where: { slug },
          });

          // Copy JSON file to target directory
          const targetJsonPath = path.join(targetJsonDir, jsonFile);
          copyFileSync(jsonPath, targetJsonPath);

          // Extract preview image
          let previewImg = "/aso_logo.png";
          const isNewFormat = packData.configurations && Array.isArray(packData.configurations);

          if (isNewFormat) {
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
            if (packData.templates && packData.templates.length > 0) {
              const firstTemplate = packData.templates[0];
              if (firstTemplate.prevImg) {
                previewImg = firstTemplate.prevImg;
              }
            }
          }

          // Count templates
          let templateCount = 0;
          if (isNewFormat) {
            templateCount = packData.configurations.reduce((total: number, config: any) => {
              return total + (config.templates?.length || 0);
            }, 0);
          } else {
            templateCount = packData.templates?.length || 0;
          }

          const defaultPrice = 29.99;
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
            await prisma.templatePack.update({
              where: { slug },
              data: packDataToSave,
            });
            updated++;
          } else {
            await prisma.templatePack.create({
              data: packDataToSave,
            });
            imported++;
          }
        } catch (error: any) {
          errors.push(`${jsonFile}: ${error.message}`);
        }
      }

      return {
        success: true,
        message: `Imported ${imported} new pack(s) and updated ${updated} existing pack(s)`,
        imported,
        updated,
        errors,
      };
    } catch (error: any) {
      return {
        success: false,
        message: `Error importing packs: ${error.message}`,
        imported: 0,
        updated: 0,
        errors: [error.message],
      };
    }
  }

  /**
   * Check and deactivate purchases if templates are deleted
   * This should be called when templates are deleted
   */
  static async checkPackAccessAfterDeletion(
    sessionId: string
  ): Promise<void> {
    try {
      const purchases = await prisma.shopTemplatePack.findMany({
        where: {
          sessionId: sessionId,
          isActive: true,
        },
        include: {
          pack: true,
        },
      });

      for (const purchase of purchases) {
        const hasAccess = await this.hasAccessToPack(
          sessionId,
          purchase.packId
        );

        if (!hasAccess) {
          // Deactivate purchase if access is lost
          await prisma.shopTemplatePack.update({
            where: { id: purchase.id },
            data: { isActive: false },
          });
        }
      }
    } catch (error) {
      console.error("Error checking pack access after deletion:", error);
    }
  }
}
