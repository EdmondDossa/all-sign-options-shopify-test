import prisma from "~/db.server";
import { TemplateType } from "~/types/TemplateType";

export default class TemplateService {
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
          basePrice:true, 
          categoryId:true,
          configurationId:true,
          enabledAddToCart:true,
          category:  true,
          recaps:true,
          configuration: {
            select:{
              product: true
            }
        } },
        
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
