import prisma from "~/db.server";
import { FontType } from "~/types/ManagePropertyType";

export default class FontService {
  static async getFonts(sessionId: string): Promise<any[] | null> {
    try {
      return await prisma.font.findMany({
        where: {
          sessionId: sessionId,
        },
      });
    } catch (error) {
      console.error("Error retrieving fonts:", error);
      return Promise.resolve(null);
    }
  }

  static async getFont(
    id: number,
    sessionId: string
  ): Promise<any | null> {
    try {
      return await prisma.font.findUnique({
        where: {
          id: id,
          sessionId: sessionId,
        },
      });
    } catch (error) {
      console.error("Error retrieving font:", error);
      return Promise.resolve(null);
    }
  }

  static async updateFont(
    font: FontType,
    sessionId: string,
  ): Promise<any | null> {
    const { id, ...data } = font;
    try {
      return await prisma.font.update({
        where: {
          id: id,
          sessionId: sessionId,
        },
        data: data,
      });
    } catch (error) {
      console.error("Error updating font:", error);
      return Promise.resolve(null);
    }
  }

  static async deleteFont(
    id: number,
    sessionId: string,
  ): Promise<any| null> {
    try {
      await prisma.font.delete({
        where: {
          id: id,
          sessionId: sessionId
        },
      });
    } catch (error) {
      console.error("Error deleting font:", error);
      return Promise.resolve(null);
    }
  }

  static async addFont(
    font: FontType,
    sessionId: string,
  ): Promise<any | null> {
    try {
      return await prisma.font.create({
        data: {
          ...font,
          sessionId: sessionId,
        },
      });
    } catch (error) {
      console.error("Error adding font:", error);
      return Promise.resolve(null);
    }
  }


 
}
