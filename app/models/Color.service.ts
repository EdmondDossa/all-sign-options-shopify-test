import prisma from "~/db.server";
import { ColorType } from "~/types/ManagePropertyType";

export default class ColorService {
  static async getColors(sessionId: string): Promise<any[] | null> {
    try {
      return await prisma.color.findMany({
        where: {
          sessionId: sessionId,
        },
      });
    } catch (error) {
      console.error("Error retrieving colors:", error);
      return Promise.resolve(null);
    }
  }

  static async getColor(
    id: number,
    sessionId: string,
  ): Promise<any | null> {
    try {
      return await prisma.color.findUnique({
        where: {
          id: id,
          sessionId: sessionId,
        },
      });
    } catch (error) {
      console.error("Error retrieving color:", error);
      return Promise.resolve(null);
    }
  }

  static async updateColor(
    color: ColorType,
    sessionId: string,
  ): Promise<any | null> {
    const { id, ...data } = color;
    try {
      return await prisma.color.update({
        where: {
          id: id,
          sessionId: sessionId,
        },
        data: data,
      });
    } catch (error) {
      console.error("Error updating color:", error);
      return Promise.resolve(null);
    }
  }

  static async deleteColor(
    id: number,
    sessionId: string,
  ): Promise<any| null> {
    try {
      await prisma.color.delete({
        where: {
          id: id,
          sessionId: sessionId
        },
      });
    } catch (error) {
      console.error("Error deleting color:", error);
      return Promise.resolve(null);
    }
  }

  static async addColor(
    color: ColorType,
    sessionId: string,
  ): Promise<any | null> {
    try {
      return await prisma.color.create({
        data: {
          ...color,
          sessionId: sessionId,
        },
      });
    } catch (error) {
      console.error("Error adding color:", error);
      return Promise.resolve(null);
    }
  }
}
