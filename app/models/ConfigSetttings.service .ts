import { Material, MaterialSimple } from "~/types/ConfigDataType";
import ConfigurationService from "./Configuration.service";
import { ConfigurationType } from '~/types/ConfigurationType';

export default class ConfigSettingsService {
  static async getAll(sessionId: string, configurationId: number): Promise<any| null> {
    try {
      let configuration: any = await ConfigurationService.getConfiguration(configurationId, sessionId);
      let settingData  = configuration["data"]["settings"];
      return settingData;
    } catch (error) {
      return Promise.resolve(null);
    }
  }
  static async get(sessionId: string, configurationId: number,setting:string, settingItem:string): Promise<any| null> {
    try {
      let configuration: any = await ConfigurationService.getConfiguration(configurationId, sessionId);
      let settingData  = configuration["data"]["settings"][setting][settingItem];
      return settingData;
    } catch (error) {
      return Promise.resolve(null);
    }
  }

 

  static async edit(
    sessionId: string,
    configurationId: number,
    setting: string,
    settingItem: string,
    item:any
  ): Promise<any[] | null> {
    try {
      let configuration: ConfigurationType = await ConfigurationService.getConfiguration(configurationId, sessionId);
      if (configuration === null) {
        console.log("Configuration not found");
        return null
      };
      console.log('configuration',configuration)
      let data = configuration?.data
      if (data instanceof Object && "settings" in data) {
        let settings = data["settings"];
        if ( settings instanceof Object && setting in settings   ) {
          configuration["data"]["settings"][setting][settingItem] = item
        } else {
          console.log('data is not an settings')
          configuration["data"]["settings"] = {...settings||{},[setting]:{[settingItem]:item}}
        }
      } else {
        console.log('data is not an object')
        configuration["data"] = { ...data||{},'settings':{[setting]:{[settingItem]:item}}}
      }

      if (configuration["data"]["settings"][setting][settingItem]) {
        
        configuration = await ConfigurationService.updateConfiguration(configuration, sessionId)
        
        return Promise.resolve(configuration["data"]["settings"][setting][settingItem]);
      }
      return Promise.resolve(null);
    } catch (error) {
      console.error("Error Editing config setting:", error);
      return Promise.resolve(null);
    }
  }

}
