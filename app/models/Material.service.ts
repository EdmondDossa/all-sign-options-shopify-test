import { Material, MaterialSimple } from "~/types/ConfigDataType";
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
        max: 0,
        min: 0,
        label: "Custom width",
      },
      active: false,
      height: {
        max: 0,
        min: 0,
        label: "Custom height",
      },
    },
  },
  colors: {
    allColors: [],
    customColors: {},
  },
  shapes: [],
  borders: {
    settings: {
      colors: [
        {
          name: "red",
          codeHex: "#9A4444",
        },
      ],
      enableBorderColor: false,
      enableBorderWidth: false,
    },
    allBorders: [],
  },
  textImages: {
    enableText: true,
    enableImages: true,
  },
  fixingMethods: [],
  additionalOptions: [],
};

const initialDataAdvanced = {
  
}




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
    if (material.type=="simple") {
      material.data = initialDataSimple;
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
}
