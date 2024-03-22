import { ConfigColor } from "~/types/ConfigDataType";
import ConfigurationService from "./Configuration.service";
import { ConfigurationType } from '~/types/ConfigurationType';

export default class MaterialColorService {
  static async getAll(sessionId: string, configurationId: number, materialId: number): Promise<ConfigColor[] | null> {
    try {
      let configuration: ConfigurationType = await ConfigurationService.getConfiguration(configurationId, sessionId);
      let colors = configuration["data"]["materials"][materialId]["data"]["colors"];
      return colors? colors as ConfigColor: colors;
    } catch (error) {
      console.error("Error retrieving font:", error);
      return Promise.resolve(null);
    }
  }

 

  static async add(
    configurationId: number,
    sessionId: string,
    materialId: number,
    color: ConfigColor
  ): Promise<ConfigColor[] | null> {
    try {
      let configuration: ConfigurationType = await ConfigurationService.getConfiguration(configurationId, sessionId);
      let materialData = configuration["data"]["materials"][materialId]["data"];
      if (materialData instanceof Object && "colors" in materialData) {
        const colors = configuration["data"]["materials"][materialId]["data"]["colors"];
          configuration["data"]["materials"][materialId]["data"]["colors"]=[...colors||[], color]
              
      } else {
        configuration["data"]["materials"][materialId]["data"] = { ...materialData||{},'colors':[color]}
      }

      if (configuration["data"]["materials"][materialId]["data"]["colors"]) {
        
        configuration = await ConfigurationService.updateConfiguration(configuration, sessionId);
        
        return Promise.resolve(configuration["data"]["materials"][materialId]["data"]["colors"]);
      }
      return Promise.resolve(null);
    } catch (error) {
      console.error("Error colors output:", error);
      return Promise.resolve(null);
    }
  }


 



  static async  update(
    configurationId: number,
    sessionId: string,
    materialId: number,
    color: ConfigColor,
    id:number
  ): Promise<ConfigColor[] | null> {
    try {
      let configuration: ConfigurationType = await ConfigurationService.getConfiguration(configurationId, sessionId);
      let colors: ConfigColor[]|null = configuration["data"]["materials"][materialId]["data"]["colors"];
      if (Array.isArray(colors) && configuration["data"]["materials"][materialId]["data"]["colors"][id]) {
        configuration["data"]["materials"][materialId]["data"]["colors"][id] = color;
        configuration =  await ConfigurationService.updateConfiguration(configuration,sessionId)
        return Promise.resolve(colors);
      }
      return Promise.resolve(null);
    } catch (error) {
      console.error("Error updating colors:", error);
      return Promise.resolve(null);
    }
  };


  static async  delete(
    configurationId: number,
    sessionId: string,
    materialId: number,
    id:number
  ): Promise<ConfigColor[] | null> {
    try {
      let configuration: any = await ConfigurationService.getConfiguration(configurationId, sessionId);
      let colors: ConfigColor[]|null = configuration["data"]["materials"][materialId]["data"]["colors"];
      if (Array.isArray(colors) && configuration["data"]["materials"][materialId]["data"]["colors"][id]) {
        configuration["data"]["materials"][materialId]["data"]["colors"] = colors.filter((curr,index)=> index!= id);
        configuration =  await ConfigurationService.updateConfiguration(configuration,sessionId)
        return Promise.resolve(colors);
      }
      return Promise.resolve(null);
    } catch (error) {
      console.error("Error updating output:", error);
      return Promise.resolve(null);
    }
  };




}
