import ConfigurationService from "./Configuration.service";
import { ConfigurationType } from "~/types/ConfigurationType";

export default class MaterialDiscountService {
  static async getAll(
    configId: number,
    sessionId: string,
    materialId: number
  ): Promise<any[] | null> {
    try {
      let configuration: ConfigurationType = await ConfigurationService.getConfiguration(
        configId,
        sessionId
      );
      if (configuration === null) {
        return null;
      }
      return configuration.data.materials[materialId].discounts || [];
    } catch (error) {
      console.error("Error getting material discounts:", error);
      return null;
    }
  }

  static async update(
    configId: number,
    sessionId: string,
    materialId: number,
    discount: any
  ): Promise<any | null> {
    try {
      let configuration: ConfigurationType = await ConfigurationService.getConfiguration(
        configId,
        sessionId
      );
      if (configuration === null) {
        return null;
      }

      if (!configuration.data.materials[materialId].discounts) {
        configuration.data.materials[materialId].discounts = [];
      }

      configuration.data.materials[materialId].discounts = [discount];

      configuration = await ConfigurationService.updateConfiguration(
        configuration,
        sessionId
      );

      return configuration.data.materials[materialId].discounts[0];
    } catch (error) {
      console.error("Error updating material discount:", error);
      return null;
    }
  }
} 