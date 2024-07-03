import { ConfigShape } from "~/types/ConfigDataType";
import ConfigurationService from "./Configuration.service";
import { ConfigurationType } from "~/types/ConfigurationType";

export default class MaterialShapeService {
  static async getAll(
    sessionId: string,
    configurationId: number,
    materialId: number,
  ): Promise<ConfigShape[] | null> {
    try {
      let configuration: ConfigurationType =
        await ConfigurationService.getConfiguration(configurationId, sessionId);
      let shapes =
        configuration["data"]["materials"][materialId]["data"]["shapes"];
      return shapes ? (shapes as ConfigShape) : shapes;
    } catch (error) {
      console.error("Error retrieving font:", error);
      return Promise.resolve(null);
    }
  }

  static async add(
    configurationId: number,
    sessionId: string,
    materialId: number,
    shape: ConfigShape,
  ): Promise<ConfigShape[] | null> {
    shape.isDefault = false;

    try {
      let configuration: ConfigurationType =
        await ConfigurationService.getConfiguration(configurationId, sessionId);
      let materialData = configuration["data"]["materials"][materialId]["data"];
      if (materialData instanceof Object && "shapes" in materialData) {
        const shapes =
          configuration["data"]["materials"][materialId]["data"]["shapes"];
        configuration["data"]["materials"][materialId]["data"]["shapes"] = [
          ...(shapes || []),
          shape,
        ];
      } else {
        configuration["data"]["materials"][materialId]["data"] = {
          ...(materialData || {}),
          shapes: [shape],
        };
      }

      if (configuration["data"]["materials"][materialId]["data"]["shapes"]) {
        configuration = await ConfigurationService.updateConfiguration(
          configuration,
          sessionId,
        );

        return Promise.resolve(
          configuration["data"]["materials"][materialId]["data"]["shapes"],
        );
      }
      return Promise.resolve(null);
    } catch (error) {
      console.error("Error shapes output:", error);
      return Promise.resolve(null);
    }
  }

  static async update(
    configurationId: number,
    sessionId: string,
    materialId: number,
    shape: ConfigShape,
    id: number,
  ): Promise<ConfigShape[] | null> {
    try {
      let configuration: ConfigurationType =
        await ConfigurationService.getConfiguration(configurationId, sessionId);
      let shapes: ConfigShape[] | null =
        configuration["data"]["materials"][materialId]["data"]["shapes"];
      if (
        Array.isArray(shapes) &&
        configuration["data"]["materials"][materialId]["data"]["shapes"][id]
      ) {
        configuration["data"]["materials"][materialId]["data"]["shapes"][id] =
          shape;
        configuration = await ConfigurationService.updateConfiguration(
          configuration,
          sessionId,
        );
        return Promise.resolve(shapes);
      }
      return Promise.resolve(null);
    } catch (error) {
      console.error("Error updating shapes:", error);
      return Promise.resolve(null);
    }
  }

  static async delete(
    configurationId: number,
    sessionId: string,
    materialId: number,
    id: number,
  ): Promise<ConfigShape[] | null> {
    try {
      let configuration: any = await ConfigurationService.getConfiguration(
        configurationId,
        sessionId,
      );
      let shapes: ConfigShape[] | null =
        configuration["data"]["materials"][materialId]["data"]["shapes"];
      if (
        Array.isArray(shapes) &&
        configuration["data"]["materials"][materialId]["data"]["shapes"][id]
      ) {
        configuration["data"]["materials"][materialId]["data"]["shapes"] =
          shapes.filter((curr, index) => index != id);
        configuration = await ConfigurationService.updateConfiguration(
          configuration,
          sessionId,
        );
        return Promise.resolve(shapes);
      }
      return Promise.resolve(null);
    } catch (error) {
      console.error("Error updating output:", error);
      return Promise.resolve(null);
    }
  }

  static async setDefault(
    configurationId: number,
    sessionId: string,
    materialId: number,
    id: number,
  ): Promise<ConfigShape[] | null> {
    try {
      let configuration: any = await ConfigurationService.getConfiguration(
        configurationId,
        sessionId,
      );
      let shapes: ConfigShape[] | null =
        configuration["data"]["materials"][materialId]["data"]["shapes"];
      if (
        Array.isArray(shapes) &&
        configuration["data"]["materials"][materialId]["data"]["shapes"][id]
      ) {
        configuration["data"]["materials"][materialId]["data"]["shapes"] =
          shapes.map((curr, index) =>
            index == id
              ? { ...curr, isDefault: true }
              : { ...curr, isDefault: false },
          );
        configuration = await ConfigurationService.updateConfiguration(
          configuration,
          sessionId,
        );
        return Promise.resolve(shapes);
      }
      return Promise.resolve(null);
    } catch (error) {
      console.error("Error updating output:", error);
      return Promise.resolve(null);
    }
  }
}
