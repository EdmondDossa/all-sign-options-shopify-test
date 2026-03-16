import { Material } from "~/types/ConfigDataType";
import ConfigurationService from "./Configuration.service";
import { ConfigurationType } from "~/types/ConfigurationType";

const initialDataSimple = {
  sizes: {
    allSizes: [],
    thickness: {
      active: false,
      values: [],
    },
    customSize: {
      width: {
        max: 1000,
        min: 0,
        label: "Custom width",
      },
      active: true,
      height: {
        max: 1000,
        min: 0,
        label: "Custom height",
      },
      pricings:  {
        type:"unit",
        unit:{
          basePrice:0,
          surface:0,
          charPrice:0,
          areaConversionFactor:1
        },
        range:[]
      }
    },
  },
  colors: {
    allColors: [],
    customColors: {
      label: "custom  colors",
      active: false,
      prevImg: ""
    }
  },
  shapes: [],
  borders: {
    settings: {
      colors: [],
      enableBorderColor: false,
      enableBorderWidth: false,
      borderColorsLabel: "Borders Colors",
      customColorsPrevImg: ""
    },
    allBorders: [],
  },
  textImages: {
    enableText: true,
    enableImages: false,
  },
  fixingMethods: [],
  additionalOptions: [],
};
const initialDataAdvanced = {};

export default class MaterialService {
  static async getAll(
    sessionId: string,
    configurationId: number,
  ): Promise<Material[] | null> {
    try {
      let configuration: any = await ConfigurationService.getConfiguration(
        configurationId,
        sessionId,
      );
      let materials: Material[] = configuration["data"]["materials"];
      return materials ? (materials as Material[]) : materials;
    } catch (error) {
      console.error("Error retrieving font:", error);
      return Promise.resolve(null);
    }
  }

  static async add(
    configurationId: number,
    sessionId: string,
    material: Material,
  ): Promise<Material[] | null> {
    if (material.type == "simple") {
      material.data = initialDataSimple;
      material.discounts = [];
    }

    try {
      let configuration: ConfigurationType =
        await ConfigurationService.getConfiguration(configurationId, sessionId);
      let data = configuration?.data;
      if (data instanceof Object && "materials" in data) {
        configuration["data"]["materials"] = [
          ...(configuration["data"]["materials"] || []),
          material,
        ];
      } else {
        configuration["data"] = { ...(data || {}), materials: [material] };
      }

      if (configuration["data"]["materials"]) {
        configuration = await ConfigurationService.updateConfiguration(
          configuration,
          sessionId,
        );

        return Promise.resolve(configuration["data"]["materials"]);
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
    material: Material,
    id: number,
  ): Promise<Material[] | null> {
    try {
      let configuration: any = await ConfigurationService.getConfiguration(
        configurationId,
        sessionId,
      );
      let materials: Material[] = configuration["data"]["materials"] ?? [];
      if (
        Array.isArray(materials) &&
        materials[id]["type"] == material["type"]
      ) {
        if (!material.discounts) {
          material.discounts = [];
        }
        material["data"] = materials[id]["data"];
        materials[id] = material;
        configuration["data"]["materials"] = materials;
        configuration = await ConfigurationService.updateConfiguration(
          configuration,
          sessionId,
        );
        return Promise.resolve(materials);
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
  ): Promise<Material[] | null> {
    try {
      let configuration: any = await ConfigurationService.getConfiguration(
        configurationId,
        sessionId,
      );
      let materials: Material[] = configuration["data"]["materials"] ?? [];
      if (Array.isArray(materials)) {
        configuration["data"]["materials"] = materials.filter(
          (curr, index) => index != id,
        );
        configuration = await ConfigurationService.updateConfiguration(
          configuration,
          sessionId,
        );
        return Promise.resolve(materials);
      }
      return Promise.resolve(null);
    } catch (error) {
      console.error("Error updating output:", error);
      return Promise.resolve(null);
    }
  }

  static async changeStatus(
    configurationId: number,
    sessionId: string,
    id: number,
    newStatus: boolean
  ): Promise<Material[] | null> {
    try {
      // 1. Récupérer la configuration
      let configuration: any = await ConfigurationService.getConfiguration(
        configurationId,
        sessionId,
      );
      
      // 2. Récupérer la liste des matériaux
      let materials: Material[] = configuration["data"]["materials"] ?? [];
      
      // 3. Vérifier si le matériel existe à cet index
      if (Array.isArray(materials) && materials[id]) {
        // 4. Mettre à jour la propriété 'active'
        // Assurez-vous d'avoir ajouté 'active?: boolean' dans votre type Material
        materials[id].active = newStatus;

        // 5. Mettre à jour la configuration
        configuration["data"]["materials"] = materials;
        
        configuration = await ConfigurationService.updateConfiguration(
          configuration,
          sessionId,
        );
        
        return Promise.resolve(materials);
      }
      return Promise.resolve(null);
    } catch (error) {
      console.error("Error updating material status:", error);
      return Promise.resolve(null);
    }
  }
}
