import prisma from "~/db.server";
import { CategoryType } from "~/types/TemplateType";

export default class CategoryService {
  static async getCategorys(sessionId: string): Promise<any[] | null> {
    try {
      return await prisma.category.findMany({
        where: {
          sessionId: sessionId,
        },
      });
    } catch (error) {
      console.error("Error retrieving categorys:", error);
      return Promise.resolve(null);
    }
  }

  static async getCategory(
    id: number,
    sessionId: string
  ): Promise<any | null> {
    try {
      return await prisma.category.findUnique({
        where: {
          id: id,
          sessionId: sessionId,
        },
      });
    } catch (error) {
      console.error("Error retrieving category:", error);
      return Promise.resolve(null);
    }
  }

  static async updateCategory(
    category: CategoryType,
    sessionId: string,
  ): Promise<any | null> {
    const { id, ...data } = category;
    try {
      return await prisma.category.update({
        where: {
          id: id,
          sessionId: sessionId,
        },
        data: data,
      });
    } catch (error) {
      console.error("Error updating category:", error);
      return Promise.resolve(null);
    }
  }

  static async deleteCategory(
    id: number,
    sessionId: string,
  ): Promise<any| null> {
    try {
      await prisma.category.delete({
        where: {
          id: id,
          sessionId: sessionId
        },
      });
    } catch (error) {
      console.error("Error deleting category:", error);
      return Promise.resolve(null);
    }
  }

  static async addCategory(
    category: CategoryType,
    sessionId: string,
  ): Promise<any | null> {
    try {
      return await prisma.category.create({
        data: {
          ...category,
          sessionId: sessionId,
        },
      });
    } catch (error) {
      console.error("Error adding category:", error);
      return Promise.resolve(null);
    }
  }
}
