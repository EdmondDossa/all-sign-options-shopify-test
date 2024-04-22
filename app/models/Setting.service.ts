import prisma from "~/db.server";
import { FontType } from "~/types/ManagePropertyType";

export default class SettingService {
  static async addSetting(
    sessionId: string,
    shop: string = "",
  ): Promise<any | null> {
    try {
      return await prisma.setting.create({
        data: {
          data: data(shop),
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
      let setting: any = await prisma.setting.findUnique({
        where: {
          sessionId: sessionId,
        },
      });

      if (!setting) {
        setting = await SettingService.addSetting(sessionId);
      }
      return setting;
    } catch (error) {
      console.error("Error adding font:", error);
      return Promise.resolve(null);
    }
  }
}

const data = (shop: string) => {
  const url = shop ? `https://${shop}/admin` : "";

  return {
    output: {
      zipName: true,
      calculateOutput: true,
    },

    shapes: [
      {
        name: "Oval",
        icon: url + "/resources/shapes/Icons/shape_oval_icon.svg",
        value: "oval",
      },
      {
        name: "Square",
        icon: url + "/resources/shapes/Icons/shape_square_icon.svg",
        value: "square",
      },
      {
        name: "Triangle",
        icon: url + "/resources/shapes/Icons/shape_triangle_icon.svg",
        value: "triangle",
      },
      {
        name: "Rounded Square",
        icon: url + "/resources/shapes/Icons/shape_rounded_rectangular_icon.svg",
        value: "rounded-square",
      },
      {
        name: "Rotated Square",
        icon: url + "/resources/shapes/Icons/shape_rotated_square_icon.svg",
        value: "rotated-square",
      },
      {
        name: "Turn Left",
        icon: url + "/resources/shapes/Icons/shape_turn_left_icon.svg",
        value: "turn-left",
      },
      {
        name: "Turn Right",
        icon: url + "/resources/shapes/Icons/shape_turn_right_icon.svg",
        value: "turn-right",
      },
      {
        name: "Arrow Left",
        icon: url + "/resources/shapes/Icons/shape_arrow_left_icon.svg",
        value: "arrow-left",
      },
      {
        name: "Arrow Right",
        icon: url + "/resources/shapes/Icons/shape_arrow_right_icon.svg",
        value: "arrow-right",
      },
      {
        name: "Stop",
        icon: url + "/resources/shapes/Icons/shape_stop_icon.svg",
        value: "stop",
      },
      {
        name: "Rounded Top",
        icon: url + "/resources/shapes/Icons/shape_rounded_top_bottom_icon.svg",
        value: "rounded-top",
      },
      {
        name: "Rounded Sides",
        icon: url + "/resources/shapes/Icons/shape_rounded_sides_icon.svg",
        value: "rounded-sides",
      },
    ],

    fixingMethods: [
      {
        name: "None",
        description: "None",
        icon: url + "/resources/fixing-methods/Icons/fixmethod_none_icon.svg",
        popImg: url + "/resources/fixing-methods/Icons/fixmethod_none_icon.svg",
        type: "none",
      },
      {
        name: "Screw",
        description: "Screw",
        icon: url + "/resources/fixing-methods/Icons/fixmethod_screw_icon.svg",
        popImg: url + "/resources/fixing-methods/Icons/fixmethod_screw_icon.svg",
        type: "screw",
      },
      {
        name: "Screw Cap",
        description: "Screw Cap",
        icon: url + "/resources/fixing-methods/Icons/fixmethod_screw_cap_icon.svg",
        popImg: url + "/resources/fixing-methods/Icons/fixmethod_screw_cap_icon.svg",
        type: "screw-cap",
      },
      {
        name: "Stand Off",
        description: "Stand Off",
        icon: url + "/resources/fixing-methods/Icons/fixmethod_standoff_icon.svg",
        popImg: url + "/resources/fixing-methods/Icons/fixmethod_standoff_icon.svg",
        type: "standoff",
      },
      {
        name: "Hanging",
        description: "Hanging",
        icon: url + "/resources/fixing-methods/Icons/fixmethod_hanging_icon.svg",
        popImg: url + "/resources/fixing-methods/Icons/fixmethod_hanging_icon.svg",
        type: "hanging",
      },
      {
        name: "Flag",
        description: "Flag",
        icon: url + "/resources/fixing-methods/Icons/fixmethod_flag_attachmnt_icon.svg",
        popImg: url + "/resources/fixing-methods/Icons/fixmethod_flag_attachmnt_icon.svg",
        type: "flag",
      },
      {
        name: "Suction Cup",
        description: "Suction Cup",
        icon: url + "/resources/fixing-methods/Icons/fixmethod_suction_cups_icon.svg",
        popImg: url + "/resources/fixing-methods/Icons/fixmethod_suction_cups_icon.svg",
        type: "suction-cup",
      },
      {
        name: "Table Stand",
        description: "Table Stand",
        icon: url + "*/resources/fixing-methods/Icons/fixmethod_table_clamp_icon.svg",
        popImg: url + "/resources/fixing-methods/Icons/fixmethod_table_clamp_icon.svg",
        type: "table-stand",
      },
      {
        name: "Ceiling",
        description: "Ceiling",
        icon: url + "/resources/fixing-methods/Icons/fixmethod_none_icon.svg",
        popImg: url + "",
        type: "ceiling",
      },
      {
        name: "Pole Attachment",
        description: "Pole Attachment",
        icon: url + "/resources/fixing-methods/Icons/fixmethod_pole_attachmnt_icon.svg",
        popImg: url + "/resources/fixing-methods/Icons/fixmethod_pole_attachmnt_icon.svg",
        type: "pole-attachment",
      },
      {
        name: "Cable Labeling",
        description: "Cable Labeling",
        icon: url + "/resources/fixing-methods/Icons/fixmethod_cable_label_icon.svg",
        popImg: url +  "/resources/fixing-methods/Icons/fixmethod_cable_label_icon.svg",
        type: "cable-labeling",
      },
      {
        name: "Table Clamp",
        description: "Table Clamp",
        icon: url + "/resources/fixing-methods/Icons/fixmethod_table_clamp_icon.svg",
        popImg: url + "/resources/fixing-methods/Icons/fixmethod_table_clamp_icon.svg",
        type: "table-clamp",
      },
      {
        name: "Base Support",
        description: "Base Support",
        icon: url + "/resources/fixing-methods/Icons/fixmethod_none_icon.svg",
        popImg: url + "",
        type: "base-support",
      },
    ],
    borders: [
      {
        name: "None",
        icon: url + "/resources/borders/icons/border_none_icon.svg",
        value: "none",
      },
      {
        name: "Normal",
        icon: url + "/resources/borders/icons/border_icon.svg",
        value: "normal",
      },
      {
        name: "Old world",
        icon: url + "/resources/borders/icons/border_old_world_icon.svg",
        value: "old-world",
      },
    ],
  };
};
