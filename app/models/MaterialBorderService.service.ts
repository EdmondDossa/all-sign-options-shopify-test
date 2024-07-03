import {
  BorderSettingType,
  ConfigBorder,
} from "~/types/ConfigDataType";
import ConfigurationService from "./Configuration.service";
import { ConfigurationType } from "~/types/ConfigurationType";

export default class MaterialBorderService {
  static async getAll(
    sessionId: string,
    configurationId: number,
    materialId: number,
  ): Promise<{allBorders: ConfigBorder[],settings :BorderSettingType} | null> {
    try {
      let configuration: ConfigurationType =
        await ConfigurationService.getConfiguration(configurationId, sessionId);
      let borders =
        configuration["data"]["materials"][materialId]["data"]["borders"];
      return borders ? (borders as ConfigBorder) : borders;
    } catch (error) {
      return Promise.resolve(null);
    }
  }

  static async add(
    configurationId: number,
    sessionId: string,
    materialId: number,
    border: ConfigBorder,
  ): Promise<ConfigBorder[] | null> {
    border.isDefault = false;
    

    try {
      let configuration: ConfigurationType =
        await ConfigurationService.getConfiguration(configurationId, sessionId);
      let materialData = configuration["data"]["materials"][materialId]["data"];
      if (materialData instanceof Object && "borders" in materialData) {
        const borders =
          configuration["data"]["materials"][materialId]["data"]["borders"]["allBorders"];
        configuration["data"]["materials"][materialId]["data"]["borders"]["allBorders"] = [
          ...(borders || []),
          border,
        ];
      } else {
        configuration["data"]["materials"][materialId]["data"] = {
          ...(materialData || {}),
          borders: {allBorders: [border], settings: {}}
        };
      }

      if (configuration["data"]["materials"][materialId]["data"]["borders"]["allBorders"]) {
        configuration = await ConfigurationService.updateConfiguration(
          configuration,
          sessionId,
        );

        return Promise.resolve(
          configuration["data"]["materials"][materialId]["data"]["borders"]["allBorders"],
        );
      }
      return Promise.resolve(null);
    } catch (error) {
      console.error("Error borders output:", error);
      return Promise.resolve(null);
    }
  }


  static async editSetting(
    configurationId: number,
    sessionId: string,
    materialId: number,
    borderSettings: BorderSettingType,
  ): Promise<BorderSettingType | null> {
    

    try {
      let configuration: ConfigurationType =
        await ConfigurationService.getConfiguration(configurationId, sessionId);
      let materialData = configuration["data"]["materials"][materialId]["data"];
      if (materialData instanceof Object && "borders" in materialData) {
        configuration["data"]["materials"][materialId]["data"]["borders"]["settings"] = borderSettings
      } else {
        configuration["data"]["materials"][materialId]["data"] = {
          ...(materialData || {}),
          borders: {allBorders: [], settings: borderSettings}
        };
      }

      if (configuration["data"]["materials"][materialId]["data"]["borders"]["settings"]) {
        configuration = await ConfigurationService.updateConfiguration(
          configuration,
          sessionId,
        );

        return Promise.resolve(
          configuration["data"]["materials"][materialId]["data"]["borders"]["settings"],
        );
      }
      return Promise.resolve(null);
    } catch (error) {
      console.error("Error borders output:", error);
      return Promise.resolve(null);
    }
  }

  static async update(
    configurationId: number,
    sessionId: string,
    materialId: number,
    border: ConfigBorder,
    id: number,
  ): Promise<ConfigBorder[] | null> {
    try {
      let configuration: ConfigurationType =
        await ConfigurationService.getConfiguration(configurationId, sessionId);
      let borders: ConfigBorder[] | null =
        configuration["data"]["materials"][materialId]["data"]["borders"]["allBorders"];
      if (
        Array.isArray(borders) &&
        configuration["data"]["materials"][materialId]["data"]["borders"]["allBorders"][id]
      ) {
        configuration["data"]["materials"][materialId]["data"]["borders"]["allBorders"][id] =
          border;
        configuration = await ConfigurationService.updateConfiguration(
          configuration,
          sessionId,
        );
        return Promise.resolve(borders);
      }
      return Promise.resolve(null);
    } catch (error) {
      console.error("Error updating borders:", error);
      return Promise.resolve(null);
    }
  }

  static async delete(
    configurationId: number,
    sessionId: string,
    materialId: number,
    id: number,
  ): Promise<ConfigBorder[] | null> {
    try {
      let configuration: any = await ConfigurationService.getConfiguration(
        configurationId,
        sessionId,
      );
      let borders: ConfigBorder[] | null =
        configuration["data"]["materials"][materialId]["data"]["borders"]["allBorders"];
      if (
        Array.isArray(borders) &&
        configuration["data"]["materials"][materialId]["data"]["borders"]["allBorders"][id]
      ) {
        configuration["data"]["materials"][materialId]["data"]["borders"]["allBorders"] =
          borders.filter((curr, index) => index != id);
        configuration = await ConfigurationService.updateConfiguration(
          configuration,
          sessionId,
        );
        return Promise.resolve(borders);
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
  ): Promise<ConfigBorder[] | null> {
    try {
      let configuration: any = await ConfigurationService.getConfiguration(
        configurationId,
        sessionId,
      );
      let borders: ConfigBorder[] | null =
        configuration["data"]["materials"][materialId]["data"]["borders"]["allBorders"];
      if (
        Array.isArray(borders) &&
        configuration["data"]["materials"][materialId]["data"]["borders"]["allBorders"][id]
      ) {
        configuration["data"]["materials"][materialId]["data"]["borders"]["allBorders"] =
          borders.map((curr, index) =>
            index == id
              ? { ...curr, isDefault: true }
              : { ...curr, isDefault: false },
          );
        configuration = await ConfigurationService.updateConfiguration(
          configuration,
          sessionId,
        );
        return Promise.resolve(borders);
      }
      return Promise.resolve(null);
    } catch (error) {
      console.error("Error updating output:", error);
      return Promise.resolve(null);
    }
  }
}
