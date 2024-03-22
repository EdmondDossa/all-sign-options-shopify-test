import { ConfigFixingMethod } from "~/types/ConfigDataType";
import ConfigurationService from "./Configuration.service";
import { ConfigurationType } from '~/types/ConfigurationType';

export default class MaterialFixingMethodService {
  static async getAll(sessionId: string, configurationId: number, materialId: number): Promise<ConfigFixingMethod[] | null> {
    try {
      let configuration: ConfigurationType = await ConfigurationService.getConfiguration(configurationId, sessionId);
      let fixingMethods = configuration["data"]["materials"][materialId]["data"]["fixingMethods"];
      return fixingMethods? fixingMethods as ConfigFixingMethod: fixingMethods;
    } catch (error) {
      console.error("Error retrieving font:", error);
      return Promise.resolve(null);
    }
  }

 

  static async add(
    configurationId: number,
    sessionId: string,
    materialId: number,
    fixingMethod: ConfigFixingMethod
  ): Promise<ConfigFixingMethod[] | null> {
    try {
      let configuration: ConfigurationType = await ConfigurationService.getConfiguration(configurationId, sessionId);
      let materialData = configuration["data"]["materials"][materialId]["data"];
      if (materialData instanceof Object && "fixingMethods" in materialData) {
        const fixingMethods = configuration["data"]["materials"][materialId]["data"]["fixingMethods"];
          configuration["data"]["materials"][materialId]["data"]["fixingMethods"]=[...fixingMethods||[], fixingMethod]
              
      } else {
        configuration["data"]["materials"][materialId]["data"] = { ...materialData||{},'fixingMethods':[fixingMethod]}
      }

      if (configuration["data"]["materials"][materialId]["data"]["fixingMethods"]) {
        
        configuration = await ConfigurationService.updateConfiguration(configuration, sessionId);
        
        return Promise.resolve(configuration["data"]["materials"][materialId]["data"]["fixingMethods"]);
      }
      return Promise.resolve(null);
    } catch (error) {
      console.error("Error fixingMethods output:", error);
      return Promise.resolve(null);
    }
  }


 



  static async  update(
    configurationId: number,
    sessionId: string,
    materialId: number,
    fixingMethod: ConfigFixingMethod,
    id:number
  ): Promise<ConfigFixingMethod[] | null> {
    try {
      let configuration: ConfigurationType = await ConfigurationService.getConfiguration(configurationId, sessionId);
      let fixingMethods: ConfigFixingMethod[]|null = configuration["data"]["materials"][materialId]["data"]["fixingMethods"];
      if (Array.isArray(fixingMethods) && configuration["data"]["materials"][materialId]["data"]["fixingMethods"][id]) {
        configuration["data"]["materials"][materialId]["data"]["fixingMethods"][id] = fixingMethod;
        configuration =  await ConfigurationService.updateConfiguration(configuration,sessionId)
        return Promise.resolve(fixingMethods);
      }
      return Promise.resolve(null);
    } catch (error) {
      console.error("Error updating fixingMethods:", error);
      return Promise.resolve(null);
    }
  };


  static async  delete(
    configurationId: number,
    sessionId: string,
    materialId: number,
    id:number
  ): Promise<ConfigFixingMethod[] | null> {
    try {
      let configuration: any = await ConfigurationService.getConfiguration(configurationId, sessionId);
      let fixingMethods: ConfigFixingMethod[]|null = configuration["data"]["materials"][materialId]["data"]["fixingMethods"];
      if (Array.isArray(fixingMethods) && configuration["data"]["materials"][materialId]["data"]["fixingMethods"][id]) {
        configuration["data"]["materials"][materialId]["data"]["fixingMethods"] = fixingMethods.filter((curr,index)=> index!= id);
        configuration =  await ConfigurationService.updateConfiguration(configuration,sessionId)
        return Promise.resolve(fixingMethods);
      }
      return Promise.resolve(null);
    } catch (error) {
      console.error("Error updating output:", error);
      return Promise.resolve(null);
    }
  };




}
