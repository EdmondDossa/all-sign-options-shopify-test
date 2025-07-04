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
    design: DesignType,
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

  static async updateDesign(
    design: DesignType,
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
        data,
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
