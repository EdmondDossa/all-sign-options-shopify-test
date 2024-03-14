import prisma from "~/db.server";
import { ConfigurationType } from "~/types/ConfigurationType";

export default class ConfigurationService {
  static async getConfigurations(sessionId: string): Promise<any[] | null> {
    try {
      return await prisma.configuration.findMany({
        where: {
          sessionId: sessionId,
        },
      });
    } catch (error) {
      console.error("Error retrieving configurations:", error);
      return Promise.reject(null);
    }
  }

  static async getConfiguration(
    id: number,
    sessionId: string,
  ): Promise<any | null> {
    try {
      return await prisma.configuration.findUnique({
        where: {
          id: id,
          sessionId: sessionId,
        },
      });
    } catch (error) {
      console.error("Error retrieving configuration:", error);
      return Promise.reject(null);
    }
  }

  static async updateConfiguration(
    configuration: ConfigurationType,
    sessionId: string,
  ): Promise<any | null> {
    const { id, ...data } = configuration;
    try {
      return await prisma.configuration.update({
        where: {
          id: id,
          sessionId: sessionId,
        },
        data: data,
      });
    } catch (error) {
      console.error("Error updating configuration:", error);
      return Promise.reject(null);
    }
  }

  static async deleteConfiguration(
    id: number,
    sessionId: string,
  ): Promise<void> {
    try {
      await prisma.configuration.delete({
        where: {
          id: id,
          sessionId: sessionId
        },
      });
    } catch (error) {
      console.error("Error deleting configuration:", error);
      return Promise.reject(null);
    }
  }

  static async addConfiguration(
    configuration: ConfigurationType,
    sessionId: string,
  ): Promise<any | null> {
    try {
      return await prisma.configuration.create({
        data: {
          ...configuration,
          sessionId: sessionId,
        },
      });
    } catch (error) {
      console.error("Error adding configuration:", error);
      return Promise.reject(null);
    }
  }
}
