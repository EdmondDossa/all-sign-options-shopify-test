import prisma from "~/db.server";
import { SizeType } from "~/types/ManagePropertyType";

export default class SizeService {
  static async getSizes(sessionId: string): Promise<any[] | null> {
    try {
      return await prisma.size.findMany({
        where: {
          sessionId: sessionId,
        },
      });
    } catch (error) {
      console.error("Error retrieving sizes:", error);
      return Promise.resolve(null);
    }
  }

  static async getSize(
    id: number,
    sessionId: string,
  ): Promise<any | null> {
    try {
      return await prisma.size.findUnique({
        where: {
          id: id,
          sessionId: sessionId,
        },
      });
    } catch (error) {
      console.error("Error retrieving size:", error);
      return Promise.resolve(null);
    }
  }

  static async updateSize(
    size: SizeType,
    sessionId: string,
  ): Promise<any | null> {
    const { id, ...data } = size;
    try {
      return await prisma.size.update({
        where: {
          id: id,
          sessionId: sessionId,
        },
        data: data,
      });
    } catch (error) {
      console.error("Error updating size:", error);
      return Promise.resolve(null);
    }
  }

  static async deleteSize(
    id: number,
    sessionId: string,
  ): Promise<any| null> {
    try {
      await prisma.size.delete({
        where: {
          id: id,
          sessionId: sessionId
        },
      });
    } catch (error) {
      console.error("Error deleting size:", error);
      return Promise.resolve(null);
    }
  }

  static async addSize(
    size: SizeType,
    sessionId: string,
  ): Promise<any | null> {
    try {
      return await prisma.size.create({
        data: {
          ...size,
          sessionId: sessionId,
        },
      });
    } catch (error) {
      console.error("Error adding size:", error);
      return Promise.resolve(null);
    }
  }
}
