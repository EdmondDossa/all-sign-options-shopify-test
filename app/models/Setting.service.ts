import prisma from "~/db.server";
import { FontType } from "~/types/ManagePropertyType";

export default class SettingService {
  static async addSetting(sessionId: string): Promise<any | null> {
    try {
      return await prisma.setting.create({
        data: {
          data: data,
          sessionId: sessionId,
        },
      });
    } catch (error) {
      console.error("Error adding font:", error);
      return Promise.resolve(null);
    }
  }

  static async getSetting(sessionId: string): Promise<any | null> {
    try {
      let setting:any = await prisma.setting.findUnique({
        where: {
          sessionId: sessionId,
        }
        });

        if (!setting) {
            setting = await SettingService.addSetting(sessionId)
        }
      return setting;
    } catch (error) {
      console.error("Error adding font:", error);
      return Promise.resolve(null);
    }
  }
}

const data = {
  output: {
    zipName: true,
    calculateOutput: true,
  },

  shapes: [
    {
      name: "Oval",
      icon: "/shapes/icon.png",
      value: "oval",
    },
    {
      name: "Square",
      icon: "/shapes/icon.png",
      value: "square",
    },
    {
      name: "Triangle",
      icon: "/shapes/icon.png",
      value: "triangle",
    },
    {
      name: "Rounded Square",
      icon: "/shapes/icon.png",
      value: "rounded-square",
    },
    {
      name: "Rotated Square",
      icon: "/shapes/icon.png",
      value: "rotated-square",
    },
    {
      name: "Turn Left",
      icon: "/shapes/icon.png",
      value: "turn-left",
    },
    {
      name: "Turn Right",
      icon: "/shapes/icon.png",
      value: "turn-right",
    },
    {
      name: "Arrow Left",
      icon: "/shapes/icon.png",
      value: "arrow-left",
    },
    {
      name: "Arrow Right",
      icon: "/shapes/icon.png",
      value: "arrow-right",
    },
    {
      name: "Stop",
      icon: "/shapes/icon.png",
      value: "stop",
    },
    {
      name: "Rounded Top",
      icon: "/shapes/icon.png",
      value: "rounded-top",
    },
    {
      name: "Rounded Sides",
      icon: "/shapes/icon.png",
      value: "rounded-sides",
    },
  ],

  fixingMethods: [
    {
      name: "None",
      description: "None",
      icon: "/fixing-method/icon.png",
      popImg: "/fixing-method/popImage.png",
      type: "none",
    },
    {
      name: "Screw",
      description: "Screw",
      icon: "/fixing-method/icon.png",
      popImg: "/fixing-method/popImage.png",
      type: "screw",
    },
    {
      name: "Screw Cap",
      description: "Screw Cap",
      icon: "/fixing-method/icon.png",
      popImg: "/fixing-method/popImage.png",
      type: "screw-cap",
    },
    {
      name: "Stand Off",
      description: "Stand Off",
      icon: "/fixing-method/icon.png",
      popImg: "/fixing-method/popImage.png",
      type: "standoff",
    },
    {
      name: "Hanging",
      description: "Hanging",
      icon: "/fixing-method/icon.png",
      popImg: "/fixing-method/popImage.png",
      type: "hanging",
    },
    {
      name: "Flag",
      description: "Flag",
      icon: "/fixing-method/icon.png",
      popImg: "/fixing-method/popImage.png",
      type: "flag",
    },
    {
      name: "Suction Cup",
      description: "Suction Cup",
      icon: "/fixing-method/icon.png",
      popImg: "/fixing-method/popImage.png",
      type: "suction-cup",
    },
    {
      name: "Table Stand",
      description: "Table Stand",
      icon: "/fixing-method/icon.png",
      popImg: "/fixing-method/popImage.png",
      type: "table-stand",
    },
    {
      name: "Ceiling",
      description: "Ceiling",
      icon: "/fixing-method/icon.png",
      popImg: "/fixing-method/popImage.png",
      type: "ceiling",
    },
    {
      name: "Pole Attachment",
      description: "Pole Attachment",
      icon: "/fixing-method/icon.png",
      popImg: "/fixing-method/popImage.png",
      type: "pole-attachment",
    },
    {
      name: "Cable Labeling",
      description: "Cable Labeling",
      icon: "/fixing-method/icon.png",
      popImg: "/fixing-method/popImage.png",
      type: "cable-labeling",
    },
    {
      name: "Table Clamp",
      description: "Table Clamp",
      icon: "/fixing-method/icon.png",
      popImg: "/fixing-method/popImage.png",
      type: "table-clamp",
    },
    {
      name: "Base Support",
      description: "Base Support",
      icon: "/fixing-method/icon.png",
      popImg: "/fixing-method/popImage.png",
      type: "base-support",
    },
  ],
  borders: [
    {
      name: "None",
      icon: "/border/icon.png",
      value: "none",
    },
  ],
};
