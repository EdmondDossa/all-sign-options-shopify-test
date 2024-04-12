import {
  ConfigAdditionalOptionItem,
  MaterialAdvanceOptionType,
} from "~/types/ConfigDataType";
import ConfigurationService from "./Configuration.service";
import { ConfigurationType } from "~/types/ConfigurationType";

export default class MaterialAdvancedOptionService {
  static async getAll(
    sessionId: string,
    configurationId: number,
    materialId: number,
    materialComponentId: number,
  ): Promise<MaterialAdvanceOptionType[] | null> {
    try {
      let configuration: ConfigurationType =
        await ConfigurationService.getConfiguration(configurationId, sessionId);
      let materialComponents =
        configuration["data"]["materials"][materialId]["data"][
          materialComponentId
        ]["options"];
      return materialComponents
        ? (materialComponents as MaterialAdvanceOptionType)
        : materialComponents;
    } catch (error) {
      console.error("Error retrieving font:", error);
      return Promise.resolve(null);
    }
  }

  static async add(
    configurationId: number,
    sessionId: string,
    materialId: number,
    materialComponentId: number,
    option: MaterialAdvanceOptionType,
  ): Promise<MaterialAdvanceOptionType[] | null> {
    option.isDefault = false;
    try {
      let configuration: ConfigurationType =
        await ConfigurationService.getConfiguration(configurationId, sessionId);
      let materialComponent =
        configuration["data"]["materials"][materialId]["data"][
          materialComponentId
        ];
      if (
        materialComponent instanceof Object &&
        "options" in materialComponent
      ) {
        const options =
          configuration["data"]["materials"][materialId]["data"][
            materialComponentId
          ]["options"];
        configuration["data"]["materials"][materialId]["data"][
          materialComponentId
        ]["options"] = [...(options || []), option];
      } else {
        configuration["data"]["materials"][materialId]["data"][
          materialComponentId
        ] = { ...(materialComponent || {}), options: [option] };
      }

      if (
        configuration["data"]["materials"][materialId]["data"][
          materialComponentId
        ]["options"]
      ) {
        configuration = await ConfigurationService.updateConfiguration(
          configuration,
          sessionId,
        );

        return Promise.resolve(
          configuration["data"]["materials"][materialId]["data"][
            materialComponentId
          ]["options"],
        );
      }
      return Promise.resolve(null);
    } catch (error) {
      console.error("Error materialComponents output:", error);
      return Promise.resolve(null);
    }
  }

  static async update(
    configurationId: number,
    sessionId: string,
    materialId: number,
    materialComponentId: number,
    option: MaterialAdvanceOptionType,
    id: number,
  ): Promise<MaterialAdvanceOptionType[] | null> {
    try {
      let configuration: ConfigurationType =
        await ConfigurationService.getConfiguration(configurationId, sessionId);
      let options: MaterialAdvanceOptionType[] | null =
        configuration["data"]["materials"][materialId]["data"][
          materialComponentId
        ]["options"];
      if (Array.isArray(options) && options[id]) {
        configuration["data"]["materials"][materialId]["data"][
          materialComponentId
        ]["options"][id] = option;
        configuration = await ConfigurationService.updateConfiguration(
          configuration,
          sessionId,
        );
        return Promise.resolve(options);
      }
      return Promise.resolve(null);
    } catch (error) {
      console.error("Error updating materialComponents:", error);
      return Promise.resolve(null);
    }
  }

  static async delete(
    configurationId: number,
    sessionId: string,
    materialId: number,
    materialComponentId: number,
    id: number,
  ): Promise<MaterialAdvanceOptionType[] | null> {
    try {
      let configuration: ConfigurationType =
        await ConfigurationService.getConfiguration(configurationId, sessionId);
      let options: MaterialAdvanceOptionType[] | null =
        configuration["data"]["materials"][materialId]["data"][
          materialComponentId
        ]["options"];
      if (Array.isArray(options) && options[id]) {
        configuration["data"]["materials"][materialId]["data"][
          materialComponentId
        ]["options"] = options.filter((curr, index) => index != id);
        configuration = await ConfigurationService.updateConfiguration(
          configuration,
          sessionId,
        );
        return Promise.resolve(options);
      }
      return Promise.resolve(null);
    } catch (error) {
      console.error("Error updating option:", error);
      return Promise.resolve(null);
    }
  }

  static async setDefault(
    configurationId: number,
    sessionId: string,
    materialId: number,
    materialComponentId: number,
    id: number,
  ): Promise<MaterialAdvanceOptionType[] | null> {
    try {
      let configuration: ConfigurationType =
        await ConfigurationService.getConfiguration(configurationId, sessionId);
      let options: MaterialAdvanceOptionType[] | null =
        configuration["data"]["materials"][materialId]["data"][
          materialComponentId
        ]["options"];
      if (Array.isArray(options) && options[id]) {
        configuration["data"]["materials"][materialId]["data"][
          materialComponentId
        ]["options"] = options.map((curr, index) =>
          index == id
            ? { ...curr, isDefault: true }
            : { ...curr, isDefault: false },
        );
        configuration = await ConfigurationService.updateConfiguration(
          configuration,
          sessionId,
        );
        return Promise.resolve(options);
      }
      return Promise.resolve(null);
    } catch (error) {
      console.error("Error updating option:", error);
      return Promise.resolve(null);
    }
  }
}
