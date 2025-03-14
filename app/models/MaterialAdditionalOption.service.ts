import { ConfigAdditionalOption } from "~/types/ConfigDataType";
import ConfigurationService from "./Configuration.service";
import { ConfigurationType } from '~/types/ConfigurationType';

export default class MaterialAdditionalOptionService {
  static async getAll(sessionId: string, configurationId: number, materialId: number): Promise<ConfigAdditionalOption[] | null> {
    try {
      let configuration: ConfigurationType = await ConfigurationService.getConfiguration(configurationId, sessionId);
      let additionalOptions = configuration["data"]["materials"][materialId]["data"]["additionalOptions"];
      return additionalOptions? additionalOptions as ConfigAdditionalOption[]: additionalOptions;
    } catch (error) {
      console.error("Error retrieving font:", error);
      return Promise.resolve(null);
    }
  }

 

  static async add(
    configurationId: number,
    sessionId: string,
    materialId: number,
    additionalOption: ConfigAdditionalOption
  ): Promise<ConfigAdditionalOption[] | null> {
    additionalOption.options = [];
    try {
      let configuration: ConfigurationType = await ConfigurationService.getConfiguration(configurationId, sessionId);
      let materialData = configuration["data"]["materials"][materialId]["data"];
      if (materialData instanceof Object && "additionalOptions" in materialData) {
        const additionalOptions = configuration["data"]["materials"][materialId]["data"]["additionalOptions"];
          configuration["data"]["materials"][materialId]["data"]["additionalOptions"]=[...additionalOptions||[], additionalOption]
              
      } else {
        configuration["data"]["materials"][materialId]["data"] = { ...materialData||{},'additionalOptions':[additionalOption]}
      }

      if (configuration["data"]["materials"][materialId]["data"]["additionalOptions"]) {
        
        configuration = await ConfigurationService.updateConfiguration(configuration, sessionId);
        
        return Promise.resolve(configuration["data"]["materials"][materialId]["data"]["additionalOptions"]);
      }
      return Promise.resolve(null);
    } catch (error) {
      console.error("Error additionalOptions output:", error);
      return Promise.resolve(null);
    }
  }


 



  static async  update(
    configurationId: number,
    sessionId: string,
    materialId: number,
    additionalOption: ConfigAdditionalOption,
    id:number
  ): Promise<ConfigAdditionalOption[] | null> {
    try {
      let configuration: ConfigurationType = await ConfigurationService.getConfiguration(configurationId, sessionId);
      let additionalOptions: ConfigAdditionalOption[]|null = configuration["data"]["materials"][materialId]["data"]["additionalOptions"];
      if (Array.isArray(additionalOptions) && configuration["data"]["materials"][materialId]["data"]["additionalOptions"][id]) {
        additionalOption['options'] =  configuration["data"]["materials"][materialId]["data"]["additionalOptions"][id]['options']
        configuration["data"]["materials"][materialId]["data"]["additionalOptions"][id] = additionalOption;
        configuration =  await ConfigurationService.updateConfiguration(configuration,sessionId)
        return Promise.resolve(additionalOptions);
      }
      return Promise.resolve(null);
    } catch (error) {
      console.error("Error updating additionalOptions:", error);
      return Promise.resolve(null);
    }
  };


  static async  delete(
    configurationId: number,
    sessionId: string,
    materialId: number,
    id:number
  ): Promise<ConfigAdditionalOption[] | null> {
    try {
      let configuration: any = await ConfigurationService.getConfiguration(configurationId, sessionId);
      let additionalOptions: ConfigAdditionalOption[]|null = configuration["data"]["materials"][materialId]["data"]["additionalOptions"];
      if (Array.isArray(additionalOptions) && configuration["data"]["materials"][materialId]["data"]["additionalOptions"][id]) {
        configuration["data"]["materials"][materialId]["data"]["additionalOptions"] = additionalOptions.filter((curr,index)=> index!= id);
        configuration =  await ConfigurationService.updateConfiguration(configuration,sessionId)
        return Promise.resolve(additionalOptions);
      }
      return Promise.resolve(null);
    } catch (error) {
      console.error("Error updating output:", error);
      return Promise.resolve(null);
    }
  };
}
