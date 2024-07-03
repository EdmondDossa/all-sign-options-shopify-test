import { ConfigAdditionalOptionItem } from "~/types/ConfigDataType";
import ConfigurationService from "./Configuration.service";
import { ConfigurationType } from '~/types/ConfigurationType';

export default class MaterialAdditionalOptionItemService {
  static async getAll(sessionId: string, configurationId: number, materialId: number,additionalId:number): Promise<ConfigAdditionalOptionItem[] | null> {
    try {
      let configuration: ConfigurationType = await ConfigurationService.getConfiguration(configurationId, sessionId);
      let additionalOptions = configuration["data"]["materials"][materialId]["data"]["additionalOptions"][additionalId]['options'];
      return additionalOptions? additionalOptions as ConfigAdditionalOptionItem: additionalOptions;
    } catch (error) {
      console.error("Error retrieving font:", error);
      return Promise.resolve(null);
    }
  }

 

  static async add(
    configurationId: number,
    sessionId: string,
    materialId: number,
    additionalId: number,
    option: ConfigAdditionalOptionItem
  ): Promise<ConfigAdditionalOptionItem[] | null> {
    option.isDefault = false;
    try {
      let configuration: ConfigurationType = await ConfigurationService.getConfiguration(configurationId, sessionId);
      let additionalOption = configuration["data"]["materials"][materialId]["data"]["additionalOptions"][additionalId]
      if (additionalOption instanceof Object && "options" in additionalOption) {
        const options = configuration["data"]["materials"][materialId]["data"]["additionalOptions"][additionalId]['options'] ;
        configuration["data"]["materials"][materialId]["data"]["additionalOptions"][additionalId]['options'] =[...options||[], option]
              
      } else {
        configuration["data"]["materials"][materialId]["data"]["additionalOptions"][additionalId] = { ...additionalOption||{},'options':[option]}
      }

      if (configuration["data"]["materials"][materialId]["data"]["additionalOptions"][additionalId]['options']) {
        
        configuration = await ConfigurationService.updateConfiguration(configuration, sessionId);
        
        return Promise.resolve(configuration["data"]["materials"][materialId]["data"]["additionalOptions"][additionalId]['options']);
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
    materialId: number,additionalId:number,
    option: ConfigAdditionalOptionItem,
    id:number
  ): Promise<ConfigAdditionalOptionItem[] | null> {
    try {
      let configuration: ConfigurationType = await ConfigurationService.getConfiguration(configurationId, sessionId);
      let options: ConfigAdditionalOptionItem[]|null = configuration["data"]["materials"][materialId]["data"]["additionalOptions"][additionalId]['options'];
      if (Array.isArray(options) && options[id]) {
        configuration["data"]["materials"][materialId]["data"]["additionalOptions"][additionalId]['options'][id] = option;
        configuration =  await ConfigurationService.updateConfiguration(configuration,sessionId)
        return Promise.resolve(options);
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
    materialId: number,additionalId:number,
    id:number
  ): Promise<ConfigAdditionalOptionItem[] | null> {
    try {
      let configuration: ConfigurationType = await ConfigurationService.getConfiguration(configurationId, sessionId);
      let options: ConfigAdditionalOptionItem[]|null = configuration["data"]["materials"][materialId]["data"]["additionalOptions"][additionalId]['options'];
      if (Array.isArray(options) && options[id]) {
        configuration["data"]["materials"][materialId]["data"]["additionalOptions"][additionalId]['options'] = options.filter((curr,index)=> index!= id);
        configuration =  await ConfigurationService.updateConfiguration(configuration,sessionId)
        return Promise.resolve(options);
      }
      return Promise.resolve(null);
    } catch (error) {
      console.error("Error updating option:", error);
      return Promise.resolve(null);
    }
  };




  static async  setDefault(
    configurationId: number,
    sessionId: string,
    materialId: number,additionalId:number,
    id:number
  ): Promise<ConfigAdditionalOptionItem[] | null> {
    try {
      let configuration: ConfigurationType = await ConfigurationService.getConfiguration(configurationId, sessionId);
      let options: ConfigAdditionalOptionItem[]|null = configuration["data"]["materials"][materialId]["data"]["additionalOptions"][additionalId]['options'];
      if (Array.isArray(options) && options[id]) {
        configuration["data"]["materials"][materialId]["data"]["additionalOptions"][additionalId]['options'] = options.map((curr, index) =>
        index == id
          ? { ...curr, isDefault: true }
          : { ...curr, isDefault: false },
      );
        configuration =  await ConfigurationService.updateConfiguration(configuration,sessionId)
        return Promise.resolve(options);
      }
      return Promise.resolve(null);
    } catch (error) {
      console.error("Error updating option:", error);
      return Promise.resolve(null);
    }
  };
}
