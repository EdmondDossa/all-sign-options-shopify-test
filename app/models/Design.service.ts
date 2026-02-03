import prisma from "~/db.server";
import { DesignType } from "~/types/ManagePropertyType";

export default class DesignService {
  static async getDesigns(sessionId: string): Promise<any[] | null> {
    try {
      return await prisma.design.findMany({
        where: { sessionId },
      });
    } catch (error) {
      console.error("Error retrieving designs:", error);
      return null;
    }
  }

  static async getDesignsUploaded(sessionId: string, productId: string, customerIp?: string | null): Promise<any[] | null> {
    try {
      const where: any = {
        sessionId,
        productId: productId || undefined,
        OR: [
          { orderId: null },
          { orderId: "" },
        ],
      };
      if (customerIp != null && String(customerIp).trim() !== "") {
        where.customerIp = customerIp;
      }
      return await prisma.design.findMany({
        where,
      });
    } catch (error) {
      console.error("Error retrieving designs:", error);
      return null;
    }
  }

  static async designsDelete(fileId: number, sessionId: string, productId:string ,customerIp: string): Promise<any | null> {
    try {
       await prisma.design.delete({
        where: { 
          sessionId,productId,customerIp,
          id:fileId
        },
      });

      return true
    } catch (error) {
      console.error("Error deleting designs:", error);
      return false;
    }
  }



  static async getDesignUploaded(fileId: number, sessionId: string, productId:string ,customerIp: string): Promise<any | null> {
    try {
      return await prisma.design.findFirst({
        where: { 
          sessionId,productId,customerIp,
          id:fileId
        },
      });
    } catch (error) {
      console.error("Error getting designs:", error);
      return null;
    }
  }

  static async getDesign(id: number, sessionId: string): Promise<any | null> {
    try {
      return await prisma.design.findFirst({
        where: {
          id,
          sessionId,
        },
      });
    } catch (error) {
      console.error("Error retrieving design:", error);
      return null;
    }
  }

  static async getDesignByIp(customerIp: string, sessionId: string): Promise<any | null> {
    try {
      return await prisma.design.findMany({
        where: {
          customerIp,
          sessionId,
          OR: [
            { orderId: null },
            { orderId: "" },
          ],
        },
      });
      
    } catch (error) {
      console.error("Error retrieving design:", error);
      return null;
    }
  }

  static async getDesignByOrderId(orderId: string, sessionId: string): Promise<any | null> {
    try {
      return await prisma.design.findMany({
        where: {
          orderId,
          sessionId
        },
      });
      
    } catch (error) {
      console.error("Error retrieving design:", error);
      return null;
    }
  }

  static async addDesign(
    design: DesignType|any,
    sessionId: string
  ): Promise<any | null> {
    try {
      return await prisma.design.create({
        data: {
          ...design,
          sessionId,
        },
      });
    } catch (error) {
      console.error("Error adding design:", error);
      return null;
    }
  }

  static async addManyDesigns(
    designs: DesignType[]|any,
    sessionId: string
  ): Promise<any[] | any> {
    try {
      return await prisma.design.createMany({
        data: designs.map((design:any) => ({
          ...design,
          sessionId,
        }))
      });
    } catch (error) {
      console.error("Error adding designs:", error);
      return null;
    }
  }

  static async updateDesign(
    design: DesignType|any,
    sessionId: string
  ): Promise<any | null> {
    const { id, ...data } = design;
    if (!id) return null;
    try {
      return await prisma.design.update({
        where: {
          id,
          sessionId,
        },
        data: {
          orderId:    data.orderId,
          configId:   data.configId,
          zipFile:    data.zipFile
        }
      });
    } catch (error) {
      console.error("Error updating design:", error);
      return null;
    }
  }

  static async deleteDesign(id: number, sessionId: string): Promise<boolean> {
    try {
      await prisma.design.delete({
        where: {
          id,
          sessionId,
        },
      });
      return true;
    } catch (error) {
      console.error("Error deleting design:", error);
      return false;
    }
  }
}
