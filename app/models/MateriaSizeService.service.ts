import { ConfigCustomSize, ConfigSize, Material, MaterialSimple, configSizeThickness } from "~/types/ConfigDataType";
import ConfigurationService from "./Configuration.service";
import { ConfigurationType } from '~/types/ConfigurationType';

export default class MaterialSizeService {
  static async getAll(sessionId: string, configurationId: number, materialId: number): Promise<any | null> {
    try {
      let configuration: ConfigurationType = await ConfigurationService.getConfiguration(configurationId, sessionId);
      let sizes = configuration["data"]["materials"][materialId]["data"]["sizes"];
      return sizes;
    } catch (error) {
      console.error("Error retrieving font:", error);
      return Promise.resolve(null);
    }
  }

 

  static async addSize(
    configurationId: number,
    sessionId: string,
    materialId: number,
    size: ConfigSize
  ): Promise<any | null> {
    size.isDefault = false;

    try {
      let configuration: ConfigurationType = await ConfigurationService.getConfiguration(configurationId, sessionId);
      let materialData = configuration["data"]["materials"][materialId]["data"];
      if (materialData instanceof Object && "sizes" in materialData) {
        let sizes = configuration["data"]["materials"][materialId]["data"]["sizes"];
        if (sizes instanceof Object && "allSizes" in sizes) {
          const allSizes:ConfigSize[]|null = configuration["data"]["materials"][materialId]["data"]["sizes"]["allSizes"];
          configuration["data"]["materials"][materialId]["data"]["sizes"]["allSizes"]= [...allSizes||[], size]
        } else {
          configuration["data"]["materials"][materialId]["data"]["sizes"]={...sizes||{},allSizes:[size]}
        }
      } else {
        configuration["data"]["materials"][materialId]["data"] = { ...materialData||{},'sizes':{allSizes:[size], customSize:null, thickness:null}}
      }

      if (configuration["data"]["materials"][materialId]["data"]["sizes"]["allSizes"]) {
        
        configuration = await ConfigurationService.updateConfiguration(configuration, sessionId);
        
        return Promise.resolve(configuration["data"]["materials"][materialId]["data"]["sizes"]["allSizes"]);
      }
      return Promise.resolve(null);
    } catch (error) {
      console.error("Error updating output:", error);
      return Promise.resolve(null);
    }
  }


  static async addCustomSizeAndThickness(
    configurationId: number,
    sessionId: string,
    materialId: number,
    size: ConfigCustomSize,
    thickness: configSizeThickness
  ): Promise<any | null> {
    try {
      let configuration: ConfigurationType = await ConfigurationService.getConfiguration(configurationId, sessionId);
      let materialData = configuration["data"]["materials"][materialId]["data"];
      if (materialData instanceof Object && "sizes" in materialData) {
        let sizes = configuration["data"]["materials"][materialId]["data"]["sizes"];
        if (sizes instanceof Object && "customSize" in sizes) {
          configuration["data"]["materials"][materialId]["data"]["sizes"]["thickness"] = thickness;
          configuration["data"]["materials"][materialId]["data"]["sizes"]["customSize"] = size;
        } else {
          configuration["data"]["materials"][materialId]["data"]["sizes"] = { ...sizes || {}, customSize: size, thickness: thickness };
        }
      } else {
        configuration["data"]["materials"][materialId]["data"] = { ...materialData||{},'sizes':{customSize:size, thickness:thickness, allSizes:[]}}
      }

      if (configuration["data"]["materials"][materialId]["data"]["sizes"]["customSize"]) {
        
        configuration = await ConfigurationService.updateConfiguration(configuration, sessionId);
        
        return Promise.resolve(configuration["data"]["materials"][materialId]["data"]["sizes"]);
      }
      return Promise.resolve(null);
    } catch (error) {
      console.error("Error updating output:", error);
      return Promise.resolve(null);
    }
  }



  static async  update(
    configurationId: number,
    sessionId: string,
    materialId: number,
    size: ConfigSize,
    id:number
  ): Promise<ConfigSize[] | null> {
    try {
      let configuration: ConfigurationType = await ConfigurationService.getConfiguration(configurationId, sessionId);
      let allSizes: ConfigSize[]|null = configuration["data"]["materials"][materialId]["data"]["sizes"]["allSizes"];
      if (Array.isArray(allSizes) && configuration["data"]["materials"][materialId]["data"]["sizes"]["allSizes"][id]) {
        configuration["data"]["materials"][materialId]["data"]["sizes"]["allSizes"][id] = size;
        configuration =  await ConfigurationService.updateConfiguration(configuration,sessionId)
        return Promise.resolve(allSizes);
      }
      return Promise.resolve(null);
    } catch (error) {
      console.error("Error updating output:", error);
      return Promise.resolve(null);
    }
  };


  static async  bulkUpdate(
    configurationId: number,
    sessionId: string,
    materialId: number,
    sizes: ConfigSize[],
  ): Promise<ConfigSize[] | null> {
    try {
      let configuration: ConfigurationType = await ConfigurationService.getConfiguration(configurationId, sessionId);
      if (Array.isArray(sizes)) {
        configuration["data"]["materials"][materialId]["data"]["sizes"]["allSizes"] = sizes;
        configuration =  await ConfigurationService.updateConfiguration(configuration,sessionId)
        return Promise.resolve(sizes);
      }
      return Promise.resolve(null);
    } catch (error) {
      console.error("Error on  bulk updating size:", error);
      return Promise.resolve(null);
    }
  };



  static async  delete(
    configurationId: number,
    sessionId: string,
    materialId: number,
    id:number
  ): Promise<ConfigSize[] | null> {
    try {
      let configuration: any = await ConfigurationService.getConfiguration(configurationId, sessionId);
      let allSizes: ConfigSize[]|null = configuration["data"]["materials"][materialId]["data"]["sizes"]["allSizes"];
      if (Array.isArray(allSizes) && configuration["data"]["materials"][materialId]["data"]["sizes"]["allSizes"][id]) {
        configuration["data"]["materials"][materialId]["data"]["sizes"]["allSizes"] = allSizes.filter((curr,index)=> index!= id);
        configuration =  await ConfigurationService.updateConfiguration(configuration,sessionId)
        return Promise.resolve(allSizes);
      }
      return Promise.resolve(null);
    } catch (error) {
      console.error("Error updating output:", error);
      return Promise.resolve(null);
    }
  };

  static async  setDefault(
    configurationId: number,
    sessionId: string,
    materialId: number,
    id:number
  ): Promise<ConfigSize[] | null> {
    try {
      let configuration: any = await ConfigurationService.getConfiguration(configurationId, sessionId);
      let allSizes: ConfigSize[]|null = configuration["data"]["materials"][materialId]["data"]["sizes"]["allSizes"];
      if (Array.isArray(allSizes) && configuration["data"]["materials"][materialId]["data"]["sizes"]["allSizes"][id]) {
        configuration["data"]["materials"][materialId]["data"]["sizes"]["allSizes"] = allSizes.map((curr, index) => {
          if (index === id) {
            return { ...curr, isDefault: true };
          } else {
            return { ...curr, isDefault: false };
          }
        });
        configuration =  await ConfigurationService.updateConfiguration(configuration,sessionId)
        return Promise.resolve(allSizes);
      }
      return Promise.resolve(null);
    } catch (error) {
      console.error("Error updating output:", error);
      return Promise.resolve(null);
    }
  };





}
