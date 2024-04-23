import { ConfigColor, ConfigCustomColor } from "~/types/ConfigDataType";
import ConfigurationService from "./Configuration.service";
import { ConfigurationType } from "~/types/ConfigurationType";

export default class MaterialColorService {
  static async getAll(
    sessionId: string,
    configurationId: number,
    materialId: number,
  ): Promise<{allColors: ConfigColor[], customColors: ConfigCustomColor} | null> {
    try {
      let configuration: ConfigurationType =
        await ConfigurationService.getConfiguration(configurationId, sessionId);
      let colors =
        configuration["data"]["materials"][materialId]["data"]["colors"];
      return colors ? (colors as ConfigColor) : colors;
    } catch (error) {
      console.error("Error retrieving font:", error);
      return Promise.resolve(null);
    }
  }

  static async add(
    configurationId: number,
    sessionId: string,
    materialId: number,
    color: ConfigColor,
  ): Promise<ConfigColor[] | null> {
    color.isDefault = false;

    try {
      let configuration: ConfigurationType =
        await ConfigurationService.getConfiguration(configurationId, sessionId);
      let materialData = configuration["data"]["materials"][materialId]["data"];
      if (materialData instanceof Object && "colors" in materialData) {
        const colors =
          configuration["data"]["materials"][materialId]["data"]["colors"]["allColors"];
        configuration["data"]["materials"][materialId]["data"]["colors"]["allColors"] = [
          ...(colors || []),
          color,
        ];
      } else {
        configuration["data"]["materials"][materialId]["data"] = {
          ...(materialData || {}),
          colors: {customColors:{}, allColors: [color]},
        };
      }

      if (configuration["data"]["materials"][materialId]["data"]["colors"]) {
        configuration = await ConfigurationService.updateConfiguration(
          configuration,
          sessionId,
        );

        return Promise.resolve(
          configuration["data"]["materials"][materialId]["data"]["colors"]["allColors"],
        );
      }
      return Promise.resolve(null);
    } catch (error) {
      console.error("Error colors output:", error);
      return Promise.resolve(null);
    }
  }

  static async editCustom(
    configurationId: number,
    sessionId: string,
    materialId: number,
    color: ConfigCustomColor,
  ): Promise<ConfigCustomColor | null> {

    try {
      let configuration: ConfigurationType =
        await ConfigurationService.getConfiguration(configurationId, sessionId);
      let materialData = configuration["data"]["materials"][materialId]["data"];
      if (materialData instanceof Object && "colors" in materialData) {
        const colors =
          configuration["data"]["materials"][materialId]["data"]["colors"]["customColors"];
        configuration["data"]["materials"][materialId]["data"]["colors"]["customColors"] = {
          ...(colors || {}),
          color}
      
      } else {
        configuration["data"]["materials"][materialId]["data"] = {
          ...(materialData || {}),
          colors: {customColors:color, allColors:[]},
        };
      }

      if (configuration["data"]["materials"][materialId]["data"]["colors"]) {
        configuration = await ConfigurationService.updateConfiguration(
          configuration,
          sessionId,
        );

        return Promise.resolve(
          configuration["data"]["materials"][materialId]["data"]["colors"]["customColors"],
        );
      }
      return Promise.resolve(null);
    } catch (error) {
      console.error("Error colors output:", error);
      return Promise.resolve(null);
    }
  }

  static async update(
    configurationId: number,
    sessionId: string,
    materialId: number,
    color: ConfigColor,
    id: number,
  ): Promise<ConfigColor[] | null> {
    try {
      let configuration: ConfigurationType =
        await ConfigurationService.getConfiguration(configurationId, sessionId);
      let colors: ConfigColor[] | null =
        configuration["data"]["materials"][materialId]["data"]["colors"]["allColors"];
      if (
        Array.isArray(colors) &&
        configuration["data"]["materials"][materialId]["data"]["colors"]["allColors"][id]
      ) {
        configuration["data"]["materials"][materialId]["data"]["colors"]["allColors"][id] =
          color;
        configuration = await ConfigurationService.updateConfiguration(
          configuration,
          sessionId,
        );
        return Promise.resolve(colors);
      }
      return Promise.resolve(null);
    } catch (error) {
      console.error("Error updating colors:", error);
      return Promise.resolve(null);
    }
  }

  static async delete(
    configurationId: number,
    sessionId: string,
    materialId: number,
    id: number,
  ): Promise<ConfigColor[] | null> {
    try {
      let configuration: any = await ConfigurationService.getConfiguration(
        configurationId,
        sessionId,
      );
      let colors: ConfigColor[] | null =
        configuration["data"]["materials"][materialId]["data"]["colors"]["allColors"];
      if (
        Array.isArray(colors) &&
        configuration["data"]["materials"][materialId]["data"]["colors"]["allColors"][id]
      ) {
        configuration["data"]["materials"][materialId]["data"]["colors"]["allColors"] =
          colors.filter((curr, index) => index != id);
        configuration = await ConfigurationService.updateConfiguration(
          configuration,
          sessionId,
        );
        return Promise.resolve(colors);
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
  ): Promise<ConfigColor[] | null> {
    try {
      let configuration: any = await ConfigurationService.getConfiguration(
        configurationId,
        sessionId,
      );
      let colors: ConfigColor[] | null =
        configuration["data"]["materials"][materialId]["data"]["colors"]["allColors"];
      if (
        Array.isArray(colors) &&
        configuration["data"]["materials"][materialId]["data"]["colors"]["allColors"][id]
      ) {
        configuration["data"]["materials"][materialId]["data"]["colors"]["allColors"] =
          colors.map((curr, index) =>
            index == id
              ? { ...curr, isDefault: true }
              : { ...curr, isDefault: false },
          );
        configuration = await ConfigurationService.updateConfiguration(
          configuration,
          sessionId,
        );
        return Promise.resolve(colors);
      }
      return Promise.resolve(null);
    } catch (error) {
      console.error("Error updating output:", error);
      return Promise.resolve(null);
    }
  }
}
