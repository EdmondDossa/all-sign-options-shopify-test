import prisma from "~/db.server";
import { TemplateType } from "~/types/TemplateType";

export default class TemplateService {
  static async getTemplates(sessionId: string): Promise<any[] | null> {
    try {
      return await prisma.template.findMany({
        where: {
          sessionId: sessionId,
        },
        include: {
          category:  true,
          configuration: {
          select:{
            product: true
          }
        } }
      });
    } catch (error) {
      console.error("Error retrieving templates:", error);
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
        data: data,
      });
    } catch (error) {
      console.error("Error updating template:", error);
      return Promise.resolve(null);
    }
  }


  static async configTemplate(id:number,
    sessionId: string,
    data: any,
  ): Promise<any | null> {
 
    try {
      return await prisma.template.update({
        where: {
          id: id,
          sessionId: sessionId,
        },
        data: {
          data: data
        },
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
      await prisma.template.delete({
        where: {
          id: id,
          sessionId: sessionId
        },
      });
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
