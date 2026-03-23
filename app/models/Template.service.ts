import prisma from "~/db.server";
import type { TemplateType } from "~/types/TemplateType";
import ConfigurationService from "~/models/Configuration.service";

export default class TemplateService {
  /**
   * Get templates only for the configuration(s) linked to this product.
   * One product = one configuration; returns templates of that configuration.
   * productId can be numeric (Liquid product.id) or gid (e.g. gid://shopify/Product/123).
   */
  static async getTemplatesForProduct(sessionId: string, productId: string | number): Promise<any[] | null> {
    try {
      const normalizedId = ConfigurationService.normalizeProductId(productId);
      const configs = await prisma.configuration.findMany({
        where: { sessionId },
        select: { id: true, product: true },
      });
      const configIds = configs
        .filter((c) => {
          const productList = Array.isArray(c.product) ? c.product : [];
          return productList.some((p: any) => ConfigurationService.normalizeProductId(p?.id ?? p) === normalizedId);
        })
        .map((c) => c.id);
      if (configIds.length === 0) return [];
      return await prisma.template.findMany({
        where: {
          sessionId,
          configurationId: { in: configIds },
        },
        select: {
          id: true,
          name: true,
          prevImg: true,
          realImg: true,
          basePrice: true,
          categoryId: true,
          configurationId: true,
          enabledAddToCart: true,
          enabledAutoImgUpdate: true,
          category: true,
          recaps: true,
          configuration: {
            select: { product: true },
          },
        },
      });
    } catch (error) {
      console.error("Error retrieving templates for product:", error);
      return Promise.resolve(null);
    }
  }

  static async getTemplates(sessionId: string): Promise<any[] | null> {
    try {
      return await prisma.template.findMany({
        where: {
          sessionId: sessionId,
        },
        select: {
          id:true,
          name:true, 
          prevImg:true,
          realImg:true,
          basePrice:true, 
          categoryId:true,
          configurationId:true,
          enabledAddToCart:true,
          category:  true,
          recaps:true,
          configuration: {
            select:{
              product: true,
              icon: true,
              popupImg: true
            }
        } },
        
      });
    } catch (error) {
      console.error("Error retrieving templates:", error);
      return Promise.resolve(null);
    }
  }

  static async getTemplatesByConfiguration(
    sessionId: string,
    configurationId: number,
  ): Promise<any[] | null> {
    try {
      return await prisma.template.findMany({
        where: {
          sessionId,
          configurationId,
        },
        select: {
          id: true,
          name: true,
          prevImg: true,
          realImg: true,
          basePrice: true,
          categoryId: true,
          configurationId: true,
          enabledAddToCart: true,
          category: true,
          recaps: true,
          configuration: {
            select: {
              product: true,
              icon: true,
              popupImg: true,
            },
          },
        },
        orderBy: {
          id: "desc",
        },
      });
    } catch (error) {
      console.error("Error retrieving templates by configuration:", error);
      return Promise.resolve(null);
    }
  }

  static async getTemplate(
    id: number,
    sessionId: string
  ): Promise<any | null> {
    try {
      return await prisma.template.findUnique({
        where: {
          id: id,
          sessionId: sessionId,
        },
        include:{   
          configuration: {
            select:{
              product: true
            }
        }}
      });
    } catch (error) {
      console.error("Error retrieving template:", error);
      return Promise.resolve(null);
    }
  }

  static async updateTemplate(
    template: TemplateType,
    sessionId: string,
  ): Promise<any | null> {
    const { id, ...data } = template;
    try {
      return await prisma.template.update({
        where: {
          id: id,
          sessionId: sessionId,
        },
        data: data
        
      });
    } catch (error) {
      console.error("Error updating template:", error);
      return Promise.resolve(null);
    }
  }


  static async configTemplate(id:number,
    sessionId: string,
    data: any,
    designImg:string=""
  ): Promise<any | null> {
 
    try {
      const size = data.cartData?.sign?.size?.value;
      
      let  dataToSave:any =  {
        recaps: data.cartData.sign ? {
          customPrice: data.cartData.custom_price ,
          priceType:data.templateData.price?.textAfter||"",
          size: size? `${size.width?.value} x ${size.height?.value}` :"0mm x 0mm"
        } : "",
        data: data,
      }

    
      if (designImg) {
        dataToSave = {...dataToSave, prevImg: designImg}
      }
      
      return await prisma.template.update({
        where: {
          id: id,
          sessionId: sessionId,
        },
        data: dataToSave,
      });
    } catch (error) {
      console.error("Error on template config:", error);
      return Promise.resolve(null);
    }
  }

  static async deleteTemplate(
    id: number,
    sessionId: string,
  ): Promise<any| null> {
    try {
      // Get template before deletion to check its configuration
      const template = await prisma.template.findFirst({
        where: {
          id: id,
          sessionId: sessionId
        },
        include: {
          configuration: true,
        },
      });

      if (!template) {
        return null;
      }

      // Delete the template
      await prisma.template.delete({
        where: {
          id: id,
          sessionId: sessionId
        },
      });

      // Check if configuration should be deleted (if it's a pack configuration)
      if (template.configuration) {
        const configName = template.configuration.name || "";
        
        // Check if this is a pack configuration (ends with " (Pack)")
        if (configName.endsWith(" (Pack)")) {
          // Check if there are other templates using this configuration
          const remainingTemplates = await prisma.template.findMany({
            where: {
              configurationId: template.configurationId,
              sessionId: sessionId,
            },
          });

          // If no other templates use this configuration, delete it
          if (remainingTemplates.length === 0) {
            try {
              await prisma.configuration.delete({
                where: {
                  id: template.configurationId,
                  sessionId: sessionId,
                },
              });
              console.log(`Deleted pack configuration: ${configName}`);
            } catch (error) {
              console.error(`Error deleting pack configuration ${configName}:`, error);
            }
          }
        }
      }

      return { success: true };
    } catch (error) {
      console.error("Error deleting template:", error);
      return Promise.resolve(null);
    }
  }

  static async addTemplate(
    template: TemplateType,
    sessionId: string,
  ): Promise<any | null> {
    try {
      return await prisma.template.create({
        data: {
          ...template,
          sessionId: sessionId,
          data: { templateData: [], cartData: []}
        },
      });
    } catch (error) {
      console.error("Error adding template:", error);
      return Promise.resolve(null);
    }
  }


  static async addMany(
    templates: TemplateType[],
    sessionId: string,
    configurationId: number,
    categoryId?:number 
  ): Promise<any | null> {
    try {
      return await prisma.template.createMany({
        data: templates.map((template) => {
          delete template.id;
          return {
            ...template, sessionId: sessionId,
            configurationId: configurationId,
            categoryId: categoryId
          }
        })
      });
    } catch (error) {
      console.error("Error adding template:", error);
      return Promise.resolve(null);
    }
  }
}
