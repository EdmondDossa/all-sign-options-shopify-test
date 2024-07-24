import prisma from "~/db.server";
import { ClipartType } from "~/types/ManagePropertyType";

export default class ClipartService {
  static async getCliparts(clipartsGroupId: number): Promise<any[] | null> {
    try {
      return await prisma.clipart.findMany({
        where: {
          clipartsGroupId: clipartsGroupId,
        },
      });
    } catch (error) {
      console.error("Error retrieving cliparts:", error);
      return Promise.resolve(null);
    }
  }

  static async getClipartsBySessionID(sessionID: string): Promise<any[] | null> {
    try {
      return await prisma.clipart.findMany({
        where: {
          clipartsGroup: {
            sessionId: sessionID
          }
        },
      });
    } catch (error) {
      console.error("Error retrieving cliparts:", error);
      return Promise.resolve(null);
    }
  }

  static async getClipart(
    id: number,
    clipartsGroupId: number,
  ): Promise<any | null> {
    try {
      return await prisma.clipart.findUnique({
        where: {
          id: id,
          clipartsGroupId: clipartsGroupId,
        },
      });
    } catch (error) {
      console.error("Error retrieving clipart:", error);
      return Promise.resolve(null);
    }
  }

  static async updateClipart(
    clipart: ClipartType,
    clipartsGroupId: number,
  ): Promise<any | null> {
    const { id, ...data } = clipart;
    let newData:any = data;
    try {
      return await prisma.clipart.update({
        where: {
          id: id,
          clipartsGroupId: clipartsGroupId,
        },
        data: newData,
      });
    } catch (error) {
      console.error("Error updating clipart:", error);
      return Promise.resolve(null);
    }
  }

  static async deleteClipart(
    id: number,
    clipartsGroupId: number,
    sessionId:string
  ): Promise<any| null> {
    try {
      await prisma.clipart.delete({
        where: {
          id: id,
          clipartsGroupId: clipartsGroupId,
          clipartsGroup: {
            sessionId:sessionId
          }
        },
      });
    } catch (error) {
      console.error("Error deleting clipart:", error);
      return Promise.resolve(null);
    }
  }

  static async addClipart(
    clipart: ClipartType,
    clipartsGroupId: number,
  ): Promise<any | null> {
    let newdata:any = clipart
    try {
      return await prisma.clipart.create({
        data: {
          ...newdata,
          clipartsGroupId: clipartsGroupId
        },
      });
    } catch (error) {
      console.error("Error adding clipart:", error);
      return Promise.resolve(null);
    }
  }
}
