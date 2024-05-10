import ConfigurationService from "./Configuration.service";
import { ConfigurationType } from "~/types/ConfigurationType";




export default class ConfigAddionalOptionService {
  static async getAll(
    sessionId: string,
    configurationId: number,
  ): Promise<any> {
    try {
      let configuration: any = await ConfigurationService.getConfiguration(
        configurationId,
        sessionId,
      );
      let additionalOptions:any= configuration["data"]["additionalOptions"];
      return additionalOptions;
    } catch (error) {
      console.error("Error retrieving font:", error);
      return Promise.resolve(null);
    }
  }

  static async add(
    configurationId: number,
    sessionId: string,
    option: any
  ): Promise<any> {


    try {
      let configuration: ConfigurationType =
        await ConfigurationService.getConfiguration(configurationId, sessionId);
      let data = configuration?.data;
      if (data instanceof Object && "additionalOptions" in data) {
        configuration["data"]["additionalOptions"] = [
          ...(configuration["data"]["additionalOptions"] || []),
          option
        ];
      } else {
        configuration["data"] = { ...(data || {}), additionalOptions: [option] };
      }

      if (configuration["data"]["additionalOptions"]) {
        configuration = await ConfigurationService.updateConfiguration(
          configuration,
          sessionId,
        );

        return Promise.resolve(configuration["data"]["additionalOptions"]);
      }
      return Promise.resolve(null);
    } catch (error) {
      console.error("Error updating output:", error);
      return Promise.resolve(null);
    }
  }

  static async update(
    configurationId: number,
    sessionId: string,
    option: any,
    id: number,
  ): Promise<any> {
    try {
      let configuration: any = await ConfigurationService.getConfiguration(
        configurationId,
        sessionId,
      );
      let additionalOptions: any = configuration["data"]["additionalOptions"] ?? [];
      if (
        Array.isArray(additionalOptions) &&
        additionalOptions[id]["type"] == option["type"]
      ) {
        additionalOptions[id] = option;
        configuration["data"]["additionalOptions"] = additionalOptions;
        configuration = await ConfigurationService.updateConfiguration(
          configuration,
          sessionId,
        );
        return Promise.resolve(additionalOptions);
      }
      return Promise.resolve(null);
    } catch (error) {
      console.error("Error updating output:", error);
      return Promise.resolve(null);
    }
  }

  static async delete(
    configurationId: number,
    sessionId: string,
    id: number,
  ): Promise<any | null> {
    try {
      let configuration: any = await ConfigurationService.getConfiguration(
        configurationId,
        sessionId,
      );
      let additionalOptions: any[] = configuration["data"]["additionalOptions"] ?? [];
      if (Array.isArray(additionalOptions)) {
        configuration["data"]["additionalOptions"] = additionalOptions.filter(
          (curr, index) => index != id,
        );
        configuration = await ConfigurationService.updateConfiguration(
          configuration,
          sessionId,
        );
        return Promise.resolve(additionalOptions);
      }
      return Promise.resolve(null);
    } catch (error) {
      console.error("Error updating output:", error);
      return Promise.resolve(null);
    }
  }
}
