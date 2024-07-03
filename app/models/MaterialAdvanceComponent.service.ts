import { MaterialAdvanceComponentType } from "~/types/ConfigDataType";
import ConfigurationService from "./Configuration.service";
import { ConfigurationType } from '~/types/ConfigurationType';

export default class MaterialAdvanceComponentService {
  static async getAll(sessionId: string, configurationId: number, materialId: number): Promise<MaterialAdvanceComponentType[] | null> {
    try {
      let configuration: ConfigurationType = await ConfigurationService.getConfiguration(configurationId, sessionId);
      let materialComponents = configuration["data"]["materials"][materialId]["data"];
      return materialComponents? materialComponents as MaterialAdvanceComponentType[]: materialComponents;
    } catch (error) {
      console.error("Error retrieving  material advance component:", error);
      return Promise.resolve(null);
    }
  }

 

  static async add(
    configurationId: number,
    sessionId: string,
    materialId: number,
    materialComponent: MaterialAdvanceComponentType
  ): Promise<MaterialAdvanceComponentType[] | null> {
    materialComponent.isDefault = false;

    try {
      let configuration: ConfigurationType = await ConfigurationService.getConfiguration(configurationId, sessionId);
      let materialComponents = configuration["data"]["materials"][materialId]["data"];
      if (Array.isArray(materialComponents)) {
          configuration["data"]["materials"][materialId]["data"]=[...materialComponents, materialComponent]
              
      } else {
        configuration["data"]["materials"][materialId]["data"] =[materialComponent]
      }

      if (Array.isArray(configuration["data"]["materials"][materialId]["data"])) {
        
        configuration = await ConfigurationService.updateConfiguration(configuration, sessionId);
        
        return Promise.resolve(configuration["data"]["materials"][materialId]["data"]);
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
    materialComponent: MaterialAdvanceComponentType,
    id:number
  ): Promise<MaterialAdvanceComponentType[] | null> {
    try {
      let configuration: ConfigurationType = await ConfigurationService.getConfiguration(configurationId, sessionId);
      let materialComponents: MaterialAdvanceComponentType[]|null = configuration["data"]["materials"][materialId]["data"];
      if (Array.isArray(materialComponents) &&  materialComponents[id]) {
        materialComponent['options'] = materialComponents[id]['options'];
        configuration["data"]["materials"][materialId]["data"][id] = materialComponent;
        configuration =  await ConfigurationService.updateConfiguration(configuration,sessionId)
        return Promise.resolve(materialComponents);
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
  ): Promise<MaterialAdvanceComponentType[] | null> {
    try {
      let configuration: any = await ConfigurationService.getConfiguration(configurationId, sessionId);
      let materialComponents: MaterialAdvanceComponentType[]|null = configuration["data"]["materials"][materialId]["data"];
      if (Array.isArray(materialComponents) && materialComponents[id]) {
        configuration["data"]["materials"][materialId]["data"] = materialComponents?.filter((curr,index)=> index!= id);
        configuration =  await ConfigurationService.updateConfiguration(configuration,sessionId)
        return Promise.resolve(materialComponents);
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
  ): Promise<MaterialAdvanceComponentType[] | null> {
    try {
      let configuration: any = await ConfigurationService.getConfiguration(configurationId, sessionId);
      let materialComponents: MaterialAdvanceComponentType[]|null = configuration["data"]["materials"][materialId]["data"];
      if (Array.isArray(materialComponents) && materialComponents[id]) {
        configuration["data"]["materials"][materialId]["data"] = materialComponents.map((curr,index)=> index == id? {...curr, 'isDefault':true}: {...curr, 'isDefault':false});
        configuration =  await ConfigurationService.updateConfiguration(configuration,sessionId)
        return Promise.resolve(materialComponents);
      }
      return Promise.resolve(null);
    } catch (error) {
      console.error("Error updating output:", error);
      return Promise.resolve(null);
    }
  };
}
