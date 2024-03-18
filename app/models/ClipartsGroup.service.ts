import prisma from "~/db.server";
import { ClipartsGroupType } from "~/types/ManagePropertyType";

export default class ClipartsGroupService {
  static async getClipartsGroups(sessionId: string): Promise<any[] | null> {
    try {
      return await prisma.clipartsGroup.findMany({
        where: {
          sessionId: sessionId,
        },
      });
    } catch (error) {
      console.error("Error retrieving clipartsGroups:", error);
      return Promise.resolve(null);
    }
  }

  static async getClipartsGroup(
    id: number,
    sessionId: string
  ): Promise<any | null> {
    try {
      return await prisma.clipartsGroup.findUnique({
        where: {
          id: id,
          sessionId: sessionId,
        },
      });
    } catch (error) {
      console.error("Error retrieving clipartsGroup:", error);
      return Promise.resolve(null);
    }
  }

  static async updateClipartsGroup(
    clipartsGroup: ClipartsGroupType,
    sessionId: string,
  ): Promise<any | null> {
    const { id, ...data } = clipartsGroup;
    try {
      return await prisma.clipartsGroup.update({
        where: {
          id: id,
          sessionId: sessionId,
        },
        data: data,
      });
    } catch (error) {
      console.error("Error updating clipartsGroup:", error);
      return Promise.resolve(null);
    }
  }

  static async deleteClipartsGroup(
    id: number,
    sessionId: string,
  ): Promise<any| null> {
    try {
      await prisma.clipartsGroup.delete({
        where: {
          id: id,
          sessionId: sessionId
        },
      });
    } catch (error) {
      console.error("Error deleting clipartsGroup:", error);
      return Promise.resolve(null);
    }
  }

  static async addClipartsGroup(
    clipartsGroup: ClipartsGroupType,
    sessionId: string,
  ): Promise<any | null> {
    try {
      return await prisma.clipartsGroup.create({
        data: {
          ...clipartsGroup,
          sessionId: sessionId,
        },
      });
    } catch (error) {
      console.error("Error adding clipartsGroup:", error);
      return Promise.resolve(null);
    }
  }
}
