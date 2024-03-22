import { ConfigBorder, ConfigCustomSize, ConfigSize, Material, MaterialSimple } from "~/types/ConfigDataType";
import ConfigurationService from "./Configuration.service";
import { ConfigurationType } from '~/types/ConfigurationType';

export default class MaterialBorderService {
  static async getAll(sessionId: string, configurationId: number, materialId: number): Promise<ConfigBorder[] | null> {
    try {
      let configuration: ConfigurationType = await ConfigurationService.getConfiguration(configurationId, sessionId);
      let borders = configuration["data"]["materials"][materialId]["data"]["borders"];
      return borders? borders as ConfigBorder: borders;
    } catch (error) {
      console.error("Error retrieving font:", error);
      return Promise.resolve(null);
    }
  }

 

  static async add(
    configurationId: number,
    sessionId: string,
    materialId: number,
    border: ConfigBorder
  ): Promise<ConfigBorder[] | null> {
    try {
      let configuration: ConfigurationType = await ConfigurationService.getConfiguration(configurationId, sessionId);
      let materialData = configuration["data"]["materials"][materialId]["data"];
      if (materialData instanceof Object && "borders" in materialData) {
        const borders = configuration["data"]["materials"][materialId]["data"]["borders"];
          configuration["data"]["materials"][materialId]["data"]["borders"]=[...borders||[], border]
              
      } else {
        configuration["data"]["materials"][materialId]["data"] = { ...materialData||{},'borders':[border]}
      }

      if (configuration["data"]["materials"][materialId]["data"]["borders"]) {
        
        configuration = await ConfigurationService.updateConfiguration(configuration, sessionId);
        
        return Promise.resolve(configuration["data"]["materials"][materialId]["data"]["borders"]);
      }
      return Promise.resolve(null);
    } catch (error) {
      console.error("Error borders output:", error);
      return Promise.resolve(null);
    }
  }


 



  static async  update(
    configurationId: number,
    sessionId: string,
    materialId: number,
    border: ConfigBorder,
    id:number
  ): Promise<ConfigBorder[] | null> {
    try {
      let configuration: ConfigurationType = await ConfigurationService.getConfiguration(configurationId, sessionId);
      let borders: ConfigBorder[]|null = configuration["data"]["materials"][materialId]["data"]["borders"];
      if (Array.isArray(borders) && configuration["data"]["materials"][materialId]["data"]["borders"][id]) {
        configuration["data"]["materials"][materialId]["data"]["borders"][id] = border;
        configuration =  await ConfigurationService.updateConfiguration(configuration,sessionId)
        return Promise.resolve(borders);
      }
      return Promise.resolve(null);
    } catch (error) {
      console.error("Error updating borders:", error);
      return Promise.resolve(null);
    }
  };


  static async  delete(
    configurationId: number,
    sessionId: string,
    materialId: number,
    id:number
  ): Promise<ConfigBorder[] | null> {
    try {
      let configuration: any = await ConfigurationService.getConfiguration(configurationId, sessionId);
      let borders: ConfigBorder[]|null = configuration["data"]["materials"][materialId]["data"]["borders"];
      if (Array.isArray(borders) && configuration["data"]["materials"][materialId]["data"]["borders"][id]) {
        configuration["data"]["materials"][materialId]["data"]["borders"] = borders.filter((curr,index)=> index!= id);
        configuration =  await ConfigurationService.updateConfiguration(configuration,sessionId)
        return Promise.resolve(borders);
      }
      return Promise.resolve(null);
    } catch (error) {
      console.error("Error updating output:", error);
      return Promise.resolve(null);
    }
  };




}
