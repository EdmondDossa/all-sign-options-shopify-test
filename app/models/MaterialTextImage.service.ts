import { ConfigTextImages } from "~/types/ConfigDataType";
import ConfigurationService from "./Configuration.service";
import { ConfigurationType } from '~/types/ConfigurationType';

export default class MaterialTextImageService {
  static async get(sessionId: string, configurationId: number, materialId: number): Promise<ConfigTextImages | null> {
    try {
      let configuration: ConfigurationType = await ConfigurationService.getConfiguration(configurationId, sessionId);
      let textImages = configuration["data"]["materials"][materialId]["data"]["textImages"];
      return textImages? textImages as ConfigTextImages: textImages;
    } catch (error) {
      console.error("Error retrieving font:", error);
      return Promise.resolve(null);
    }
  }

 

  static async edit(
    configurationId: number,
    sessionId: string,
    materialId: number,
    textImage: ConfigTextImages
  ): Promise<ConfigTextImages | null> {
    try {
      let configuration: ConfigurationType = await ConfigurationService.getConfiguration(configurationId, sessionId);
      let materialData = configuration["data"]["materials"][materialId]["data"];
      if (materialData instanceof Object && "textImages" in materialData) {
        configuration["data"]["materials"][materialId]["data"]["textImages"]=textImage
              
      } else {
        configuration["data"]["materials"][materialId]["data"] = { ...materialData||{},'textImages':textImage}
      }

      if (configuration["data"]["materials"][materialId]["data"]["textImages"]) {
        
        configuration = await ConfigurationService.updateConfiguration(configuration, sessionId);
        
        return Promise.resolve(configuration["data"]["materials"][materialId]["data"]["textImages"]);
      }
      return Promise.resolve(null);
    } catch (error) {
      console.error("Error textImages output:", error);
      return Promise.resolve(null);
    }
  }


 








}
