import prisma from "~/db.server";
import TemplateService from "~/models/Template.service";
import CategoryService from "~/models/Category.service";
import ConfigurationService from "~/models/Configuration.service";
import FontService from "~/models/Font.service";
import { ShopifyProductService } from "~/models/ShopifyProduct.service";
import { readFileSync, readdirSync, copyFileSync, existsSync, mkdirSync, writeFileSync } from "fs";
import * as path from "path";
import { replaceUrlForImport } from "~/utils/import-file";
import { getShopPath, getShopProxyUrlWithSlash } from "~/utils/fileUrl";

export interface TemplatePackType {
  id?: number;
  name: string;
  slug: string;
  description?: string;
  category: string;
  price: number;
  tier?: string | null;
  plans?: string | null;
  jsonFile: string;
  previewImg: string;
  icon?: string;
  isActive?: boolean;
  order?: number;
}

export default class TemplatePackService {
  /**
   * Get template count from pack JSON file
   */
  static getPackTemplateCount(pack: { jsonFile: string }): number {
    try {
      const jsonPath = path.join(process.cwd(), "public", "template-packs", "json", pack.jsonFile);
      const packData = JSON.parse(readFileSync(jsonPath, "utf8"));
      const isNewFormat = packData.configurations && Array.isArray(packData.configurations);
      if (isNewFormat) {
        return packData.configurations.reduce((total: number, config: any) => total + (config.templates?.length || 0), 0);
      }
      return packData.templates?.length || 0;
    } catch {
      return 0;
    }
  }

  /**
   * Niveau du pack : "free" | "basic" | "pro" (stocké dans pack.plans en une seule valeur).
   * Règles d'accès :
   * - Pack FREE  → accessible par free, basic (starter), pro
   * - Pack BASIC → accessible par basic (starter), pro — pas par free
   * - Pack PRO   → accessible par pro uniquement
   */
  static getPackPlanLevel(pack: { plans?: string | null }): "free" | "basic" | "pro" {
    const v = pack.plans?.trim().toLowerCase();
    if (v === "basic" || v === "pro") return v;
    return "free";
  }

  /** Niveau numérique pour comparaison : free=0, starter=1, pro=2 */
  static planLevelOrder(plan: string): number {
    const p = plan?.toLowerCase();
    if (p === "pro") return 2;
    if (p === "starter" || p === "basic") return 1;
    return 0;
  }

  /**
   * Le marchand peut-il accéder à ce pack (voir + insérer) ?
   * Un pack est accessible si le plan du marchand est >= au niveau du pack.
   */
  static canAccessPackByPlan(pack: { plans?: string | null }, merchantPlan: string): boolean {
    const packLevel = this.getPackPlanLevel(pack);
    const merchantLevel = this.planLevelOrder(merchantPlan);
    const packLevelOrder = packLevel === "pro" ? 2 : packLevel === "basic" ? 1 : 0;
    return merchantLevel >= packLevelOrder;
  }

  /**
   * Get all active template packs (with templateCount, planLevel, hasAccess).
   * Tous les packs sont retournés (pas de filtre par plan). hasAccess = true si le marchand
   * peut insérer les templates (Free: packs free only, Basic: free+basic, Pro: tout).
   */
  static async getAllPacks(sessionId?: string, merchantPlan?: string): Promise<any[]> {
    try {
      const packs = await prisma.templatePack.findMany({
        where: {
          isActive: true,
        },
        orderBy: [
          { category: "asc" },
          { order: "asc" },
          { createdAt: "desc" },
        ],
      });

      let enriched = packs.map((pack) => {
        const templateCount = this.getPackTemplateCount(pack);
        const planLevel = this.getPackPlanLevel(pack);
        return { ...pack, templateCount, planLevel };
      });

      // Ne pas filtrer les packs : tout le monde voit tous les packs/templates.
      // hasAccess (ci-dessous) indique si l'utilisateur peut insérer (Free: free only, Basic: free+basic, Pro: tout).

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

        return enriched.map((pack) => {
          const isPurchased = purchasedPackIds.has(pack.id);
          const canTakeByPlan = !!merchantPlan && this.canAccessPackByPlan(pack, merchantPlan);
          const hasAccess = isPurchased || canTakeByPlan;
          return {
            ...pack,
            isPurchased,
            hasAccess,
          };
        });
      }

      return enriched;
    } catch (error) {
      console.error("Error retrieving template packs:", error);
      return [];
    }
  }

  /**
   * Get a single template pack by ID or slug.
   * If merchantPlan is provided and pack is available for that plan, hasAccess = true (no purchase required).
   */
  static async getPack(
    identifier: number | string,
    sessionId?: string,
    merchantPlan?: string
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

      const planLevel = this.getPackPlanLevel(pack);
      const canTakeByPlan = !!merchantPlan && this.canAccessPackByPlan(pack, merchantPlan);

      let isPurchased = false;
      let hasAccess = canTakeByPlan;

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
          hasAccess = hasAccess || (await this.hasAccessToPack(sessionId, pack.id));
        }
      }

      return {
        ...pack,
        planLevel,
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
   * Record a pack purchase with charge ID and status (for pending payments)
   */
  static async recordPurchaseWithCharge(
    sessionId: string,
    packId: number,
    price: number,
    shopifyChargeId: string | null,
    status: string
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
            shopifyChargeId: shopifyChargeId,
            purchaseStatus: status,
            isActive: status === "active" || status === "accepted",
          },
        });
      }

      // Create new purchase
      return await prisma.shopTemplatePack.create({
        data: {
          sessionId: sessionId,
          packId: packId,
          purchasePrice: price,
          shopifyChargeId: shopifyChargeId,
          purchaseStatus: status,
          isActive: status === "active" || status === "accepted",
        },
      });
    } catch (error) {
      console.error("Error recording pack purchase with charge:", error);
      return null;
    }
  }

  /**
   * Finalize purchase after payment confirmation (called from webhook)
   * Returns purchase info for the webhook to handle import
   */
  static async finalizePurchase(
    shopifyChargeId: string,
    status: string,
    admin?: any
  ): Promise<{ success: boolean; message: string; purchase?: any; shouldImport?: boolean }> {
    try {
      // Find purchase by charge ID
      const purchase = await prisma.shopTemplatePack.findFirst({
        where: {
          shopifyChargeId: shopifyChargeId,
        },
        include: {
          pack: true,
          session: true,
        },
      });

      if (!purchase) {
        return {
          success: false,
          message: `Purchase not found for charge ID: ${shopifyChargeId}`,
        };
      }

      // Update purchase status
      const isActive = status === "active" || status === "accepted";
      const updatedPurchase = await prisma.shopTemplatePack.update({
        where: { id: purchase.id },
        data: {
          purchaseStatus: status,
          isActive: isActive,
        },
      });

      // If payment is accepted and admin is provided, import the pack
      if (isActive && admin && purchase.session) {
        const importResult = await this.importPackToShop(
          purchase.sessionId,
          purchase.packId,
          purchase.session.shop,
          admin
        );

        if (importResult.success) {
          return {
            success: true,
            message: `Pack "${purchase.pack.name}" purchased and imported successfully! ${importResult.templatesCount} templates added.`,
            purchase: updatedPurchase,
            shouldImport: false, // Already imported
          };
        } else {
          return {
            success: false,
            message: `Payment confirmed but import failed: ${importResult.message}`,
            purchase: updatedPurchase,
            shouldImport: false,
          };
        }
      }

      // Return info that import should be done (if admin not provided, webhook will handle it)
      return {
        success: true,
        message: `Purchase status updated to: ${status}`,
        purchase: updatedPurchase,
        shouldImport: isActive && !admin,
      };
    } catch (error: any) {
      console.error("Error finalizing purchase:", error);
      return {
        success: false,
        message: error.message || "Error finalizing purchase",
      };
    }
  }

  /**
   * Import a pack into a shop.
   * If templateNames is provided and non-empty, only those templates are imported.
   */
  static async importPackToShop(
    sessionId: string,
    packId: number,
    shop: string,
    admin?: any,
    templateNames?: string[]
  ): Promise<{ success: boolean; message: string; templatesCount?: number }> {
    try {
      // Get pack info
      const pack = await prisma.templatePack.findUnique({
        where: { id: packId },
      });

      if (!pack) {
        return { success: false, message: "Pack not found" };
      }

      // Check access: by plan or by purchase
      let hasAccessByPlan = false;
      if (admin) {
        const { getPlanProxy } = await import("~/utils/pricing-server.server");
        const merchantPlan = await getPlanProxy(admin, shop);
        hasAccessByPlan = !!merchantPlan && this.canAccessPackByPlan(pack, merchantPlan);
      }
      if (!hasAccessByPlan) {
        const hasAccess = await this.hasAccessToPack(sessionId, packId);
        if (!hasAccess) {
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
              message: "Ce pack n'est pas accessible avec votre plan.",
            };
          }
        }
      }

      // Read JSON file
      const jsonPath = path.join(process.cwd(), "public", "template-packs", "json", pack.jsonFile);
      let packData: any;

      try {
        packData = JSON.parse(readFileSync(jsonPath, "utf8"));
      } catch (error) {
        console.error("Error reading pack JSON file:", error);
        return { success: false, message: "Error reading pack file" };
      }

      const isNewFormat = packData.configurations && Array.isArray(packData.configurations);
      let configurationsToImport = isNewFormat 
        ? packData.configurations 
        : [packData];
      
      const allTemplates: any[] = [];
      
      if (isNewFormat) {
        configurationsToImport.forEach((config: any) => {
          if (config.templates && Array.isArray(config.templates)) {
            allTemplates.push(...config.templates);
          }
        });
      } else {
        allTemplates.push(...(packData.templates || []));
      }

      // Filter by template names if provided
      const filterNames = templateNames && templateNames.length > 0
        ? new Set(templateNames.map((n) => n.trim()).filter(Boolean))
        : null;

      if (filterNames && filterNames.size > 0) {
        if (isNewFormat) {
          configurationsToImport = configurationsToImport
            .map((config: any) => {
              const filtered = (config.templates || []).filter((t: any) =>
                filterNames.has((t.name || "").trim())
              );
              if (filtered.length === 0) return null;
              return { ...config, templates: filtered };
            })
            .filter(Boolean);
        } else {
          configurationsToImport = [{
            ...packData,
            templates: (packData.templates || []).filter((t: any) =>
              filterNames.has((t.name || "").trim())
            ),
          }].filter((c: any) => c.templates && c.templates.length > 0);
        }
      }

      const totalRequested = filterNames ? filterNames.size : allTemplates.length;
      if (configurationsToImport.length === 0 || (filterNames && filterNames.size > 0 && totalRequested === 0)) {
        return { success: false, message: "Aucun template trouvé dans le pack" };
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

  /**
   * Get all templates from the shop for export (templates created in templates/main)
   */
  static async getTemplatesForExport(sessionId: string): Promise<any[]> {
    try {
      const templates = await prisma.template.findMany({
        where: { sessionId },
        include: {
          category: true,
          configuration: {
            select: {
              id: true,
              name: true,
              description: true,
              icon: true,
              popupImg: true,
              sessionId: true,
              data: true,
              product: true,
              materialType: true,
              productType: true,
            },
          },
        },
        orderBy: [
          { category: { name: "asc" } },
          { name: "asc" },
        ],
      });

      return templates.map((t) => ({
        id: t.id,
        name: t.name,
        prevImg: t.prevImg,
        realImg: t.realImg,
        basePrice: t.basePrice,
        categoryName: t.category?.name || "Uncategorized",
        configurationName: t.configuration.name,
        configurationId: t.configurationId,
      }));
    } catch (error) {
      console.error("Error retrieving templates for export:", error);
      return [];
    }
  }

  /**
   * Export selected templates as a pack: write JSON to public/template-packs/json and create TemplatePack record.
   * parentCategoryName: type de signe (Door signs, etc.) pour la Template Library.
   * packPlan: "free" | "basic" | "pro" — à partir de quel plan le pack est accessible.
   */
  static async exportTemplatesAsPack(
    sessionId: string,
    templateIds: number[],
    packName: string,
    parentCategoryName?: string,
    packPlan?: "free" | "basic" | "pro"
  ): Promise<{ success: boolean; message: string; jsonFile?: string }> {
    try {
      if (templateIds.length === 0) {
        return { success: false, message: "Aucun template sélectionné" };
      }
      if (!packName || !packName.trim()) {
        return { success: false, message: "Le nom du pack est requis" };
      }

      const templates = await prisma.template.findMany({
        where: {
          id: { in: templateIds },
          sessionId,
        },
        include: {
          category: true,
          configuration: {
            select: {
              id: true,
              name: true,
              description: true,
              icon: true,
              popupImg: true,
              sessionId: true,
              data: true,
              product: true,
              materialType: true,
              productType: true,
            },
          },
        },
      });

      if (templates.length === 0) {
        return { success: false, message: "Aucun template trouvé" };
      }

      const session = await prisma.session.findUnique({
        where: { id: sessionId },
      });
      if (!session) {
        return { success: false, message: "Session introuvable" };
      }

      const uploadsPrefix = getShopProxyUrlWithSlash(session.shop);

      const templatesByConfig: Record<number, any[]> = {};
      templates.forEach((t) => {
        if (!templatesByConfig[t.configurationId]) {
          templatesByConfig[t.configurationId] = [];
        }
        templatesByConfig[t.configurationId].push({
          id: t.id,
          name: t.name,
          basePrice: t.basePrice,
          prevImg: t.prevImg,
          realImg: t.realImg,
          enabledAddToCart: t.enabledAddToCart,
          recaps: t.recaps,
          data: t.data,
          enabledAutoImgUpdate: t.enabledAutoImgUpdate,
          configurationId: t.configurationId,
        });
      });

      const configurationIds = Object.keys(templatesByConfig).map(Number);
      const configurations = await prisma.configuration.findMany({
        where: {
          id: { in: configurationIds },
          sessionId,
        },
      });

      const allFontsMap = new Map<number, { id: number; label: string; url: string; isGoogleFont: boolean }>();
      const configurationsForExport: any[] = [];

      const getFontsForConfig = async (config: any) => {
        const selectedFontIds = config?.data?.settings?.customizerSign?.text?.selectedFonts || [];
        if (selectedFontIds.length === 0) return [];
        const fonts = await prisma.font.findMany({
          where: { sessionId, id: { in: selectedFontIds } },
        });
        return fonts;
      };

      for (const config of configurations) {
        const configFonts = await getFontsForConfig(config);
        configFonts.forEach((f) => {
          if (!allFontsMap.has(f.id)) {
            allFontsMap.set(f.id, {
              id: f.id,
              label: f.label,
              url: f.url,
              isGoogleFont: f.isGoogleFont,
            });
          }
        });
        configurationsForExport.push({
          id: config.id,
          name: config.name,
          description: config.description,
          icon: config.icon,
          popupImg: config.popupImg,
          sessionId: config.sessionId,
          data: config.data,
          product: config.product,
          materialType: config.materialType,
          productType: config.productType,
          templates: templatesByConfig[config.id] || [],
        });
      }

      const categories = new Set(templates.map((t) => t.category?.name || "Uncategorized"));
      const categoryName = parentCategoryName?.trim() || (categories.size === 1 ? Array.from(categories)[0] : "Mixed");

      let exportData: any = {
        category: { id: templates[0]?.categoryId || 0, name: categoryName },
        configurations: configurationsForExport,
        fonts: Array.from(allFontsMap.values()),
        uploadsPrefix,
      };

      const sanitizeFileName = (name: string) =>
        name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "_")
          .replace(/^_+|_+$/g, "");

      const fileName = `${sanitizeFileName(packName.trim())}.json`;
      const targetJsonDir = path.join(process.cwd(), "public", "template-packs", "json");
      if (!existsSync(targetJsonDir)) {
        mkdirSync(targetJsonDir, { recursive: true });
      }
      const targetJsonPath = path.join(targetJsonDir, fileName);
      writeFileSync(targetJsonPath, JSON.stringify(exportData, null, 2), "utf8");

      const slug = sanitizeFileName(packName.trim());
      const previewImg = templates[0]?.prevImg || templates[0]?.realImg || "/aso_logo.png";

      const packDataToSave = {
        name: packName.trim(),
        slug,
        description: `Pack exporté depuis l'admin - ${templates.length} template(s)`,
        category: categoryName,
        price: 0,
        plans: packPlan === "basic" || packPlan === "pro" ? packPlan : "free",
        jsonFile: fileName,
        previewImg,
        isActive: true,
        order: 0,
      };

      const existingPack = await prisma.templatePack.findUnique({
        where: { slug },
      });

      if (existingPack) {
        await prisma.templatePack.update({
          where: { slug },
          data: packDataToSave,
        });
      } else {
        await prisma.templatePack.create({
          data: packDataToSave,
        });
      }

      return {
        success: true,
        message: `Pack "${packName.trim()}" exporté : ${templates.length} template(s), fichier ${fileName}`,
        jsonFile: fileName,
      };
    } catch (error: any) {
      console.error("Error exporting templates as pack:", error);
      return {
        success: false,
        message: error.message || "Erreur lors de l'export du pack",
      };
    }
  }
}
