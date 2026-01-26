import prisma from "~/db.server";

export default class SettingService {
  static async addSetting(
    sessionId: string,
    shop: string = "",
  ): Promise<any | null> {
    try {
      return await prisma.setting.upsert({
        where: {
          sessionId: sessionId,
        },
        update: {},
        create: {
          data: data(shop),
          sessionId: sessionId,
        },
      });
    } catch (error) {
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
      } else {
        // Vérifier si les nouvelles méthodes de fixation existent, sinon les ajouter
        setting = await SettingService.updateSettingWithNewFixingMethods(sessionId, setting);
      }
      return setting;
    } catch (error) {
      console.error("Error adding font:", error);
      return Promise.resolve(null);
    }
  }

  static async updateSettingWithNewFixingMethods(sessionId: string, setting: any): Promise<any> {
    try {
      const currentData = setting.data as any;
      const defaultData = data(""); // Passer une chaîne vide pour l'argument shop
      
      // Vérifier si les nouvelles méthodes existent dans les settings actuels
      const currentFixingMethods = currentData.fixingMethods || [];
      const defaultFixingMethods = defaultData.fixingMethods || [];
      
      // Ajouter les nouvelles méthodes qui n'existent pas
      const newFixingMethods = defaultFixingMethods.filter((defaultMethod: any) => 
        !currentFixingMethods.some((currentMethod: any) => currentMethod.type === defaultMethod.type)
      );
      
      if (newFixingMethods.length > 0) {
        const updatedData = {
          ...currentData,
          fixingMethods: [...currentFixingMethods, ...newFixingMethods]
        };
        
        setting = await prisma.setting.update({
          where: {
            sessionId: sessionId,
          },
          data: {
            data: updatedData,
          },
        });
      }
      
      return setting;
    } catch (error) {
      console.error("Error updating fixing methods:", error);
      return setting;
    }
  }
}

const data = (shop: string) => {
  const url = shop ? `https://${shop}/apps/aso-proxy` : "";

  return {
    output: {
      zipName: true,
      calculateOutput: true,  
      enableSendMailToCustom: true,
      enableSendMailToAdmin: true,
      ouputReceiverMails: '',

    },

    shapes: [
      {
        name: "Oval",
        icon:url + "/assets/images/shapes/ic_shape_oval.svg",
        value: "oval",
      },
      {
        name: "Square",
        icon:url + "/assets/images/shapes/ic_shape_square.svg",
        value: "square",
      },
      {
        name: "Triangle",
        icon:url + "/assets/images/shapes/ic_shape_triangle.svg",
        value: "triangle",
      },
      {
        name: "Rounded Square",
        icon:url + "/assets/images/shapes/ic_shape_rounded.svg",
        value: "rounded-square",
      },
      {
        name: "Rotated Square",
        icon:url + "/assets/images/shapes/ic_shape_rotated_square.svg",
        value: "rotated-square",
      },
      {
        name: "Turn Left",
        icon:url + "/assets/images/shapes/ic_shape_turn_left.svg",
        value: "turn-left",
      },
      {
        name: "Turn Right",
        icon:url + "/assets/images/shapes/ic_shape_turn_right.svg",
        value: "turn-right",
      },
      {
        name: "Arrow Left",
        icon:url + "/assets/images/shapes/ic_shape_arrow_left.svg",
        value: "arrow-left",
      },
      {
        name: "Arrow Right",
        icon:url + "/assets/images/shapes/ic_shape_arrow_right.svg",
        value: "arrow-right",
      },
      {
        name: "Stop",
        icon:url + "/assets/images/shapes/ic_shape_stop.svg",
        value: "stop",
      },
      {
        name: "Rounded Top",
        icon:url + "/assets/images/shapes/ic_shape_rounded_top.svg",
        value: "rounded-top",
      },
      {
        name: "Rounded Sides",
        icon:url + "/assets/images/shapes/ic_shape_rounded_sides.svg",
        value: "rounded-sides",
      },
      {
        name: "Cut To Shape",
        icon:url + "/assets/images/shapes/ic_shape_cut_to_shape.svg",
        value: "cut-to-shape",
      },
    ],

    fixingMethods: [
      {
        name: "None",
        description: "",
        icon:url + "/assets/images/fixing-methodes/ic_fixmethod_none.svg",
        popImg: "",
        type: "none",
      },
      {
        name: "Adhesive Tape",
        description: "",
        icon:url + "/assets/images/fixing-methodes/ic_fixmethod_adhesive_tape.svg",
        popImg: "",
        type: "adhesive-tape",
      },
      {
        name: "Screw",
        description: "",
        icon:url + "/assets/images/fixing-methodes/ic_fixmethod_screw.svg",
        popImg: "",
        type: "screw",
      },
      {
        name: "Screw Cap",
        description: "",
        icon:url + "/assets/images/fixing-methodes/ic_fixmethod_screw_cap.svg",
        popImg: "",
        type: "screw-cap",
      },
      {
        name: "Stand Off",
        description: "",
        icon:url + "/assets/images/fixing-methodes/ic_fixmethod_standoff.svg",
        popImg: "",
        type: "standoff",
      },
      {
        name: "Hanging",
        description: "",
        icon:url + "/assets/images/fixing-methodes/ic_fixmethod_hanging.svg",
        popImg: "",
        type: "hanging",
      },
      {
        name: "Flag",
        description: "",
        icon:url + "/assets/images/fixing-methodes/ic_fixmethod_flag.svg",
        popImg: "",
        type: "flag",
      },
      {
        name: "Suction Cup",
        description: "",
        icon:url + "/assets/images/fixing-methodes/ic_fixmethod_suction_cup.svg",
        popImg: "",
        type: "suction-cup",
      },
      {
        name: "Table Stand",
        description: "",
        icon:url + "/assets/images/fixing-methodes/ic_fixmethod_table_stand.svg",
        popImg: "",
        type: "table-stand",
      },
      {
        name: "Ceiling",
        description: "",
        icon:url + "/assets/images/fixing-methodes/ic_fixmethod_ceiling.svg",
        popImg: "",
        type: "ceiling",
      },
      {
        name: "Pole Attachment",
        description: "",
        icon:url + "/assets/images/fixing-methodes/ic_fixmethod_pole_attachment.svg",
        popImg: "",
        type: "pole-attachment",
      },
      {
        name: "Cable Labeling",
        description: "",
        icon:url + "/assets/images/fixing-methodes/ic_fixmethod_cable_label.svg",
        popImg: "",
        type: "cable-labeling",
      },
      {
        name: "Table Clamp",
        description: "",
        icon:url + "/assets/images/fixing-methodes/ic_fixmethod_table_clamp.svg",
        popImg: "",
        type: "table-clamp",
      },
      {
        name: "Base Support",
        description: "",
        icon:url + "/assets/images/fixing-methodes/ic_fixmethod_base_support.svg",
        popImg: "",
        type: "base-support",
      },
      {
        name: "Magnetic Strip",
        description: "",
        icon:url + "/assets/images/fixing-methodes/ic_fixmethod_magnetic_strip.svg",
        popImg: "",
        type: "magnetic-strip",
      },
      {
        name: "Keyring",
        description: "",
        icon:url + "/assets/images/fixing-methodes/ic_fixmethod_keyring.svg",
        popImg: "",
        type: "keyring",
      },
      {
        name: "Sign Holder",
        description: "",
        icon:url + "/assets/images/fixing-methodes/ic_fixmethod_sign_holder.svg",
        popImg: "",
        type: "sign-holder",
      },
      {
        name: "Eyelets",
        description: "",
        icon:url + "/assets/images/fixing-methodes/ic_fixmethod_eyelets.svg",
        popImg: "",
        type: "eyelets",
      },
      {
        name: "S Hook",
        description: "",
        icon:url + "/assets/images/fixing-methodes/ic_fixmethod_s_hook.svg",
        popImg: "",
        type: "s-hook",
      },
      {
        name: "Roll Up",
        description: "",
        icon:url + "/assets/images/fixing-methodes/ic_fixmethod_roll_up.svg",
        popImg: "",
        type: "roll-up",
      },
      {
        name: "Invisible Standoffs",
        description: "",
        icon:url + "/assets/images/fixing-methodes/ic_fixmethod_invisible_standoff.svg",
        popImg: "",
        type: "invisible-standoff",
      },
      {
        name: "Hidden Mounts",
        description: "",
        icon:url + "/assets/images/fixing-methodes/ic_fixmethod_hidden_mount.svg",
        popImg: "",
        type: "hidden-mount",
      },
      {
        name: "Pins",
        description: "",
        icon:url + "/assets/images/fixing-methodes/ic_fixmethod_pins.svg",
        popImg: "",
        type: "pins",
      },
    ],
    borders: [
      {
        name: "None",
        icon:url + "/assets/images/borders/ic_border_none.svg",
        value: "none",
      },
      {
        name: "Normal",
        icon:url + "/assets/images/borders/ic_border_thin.svg",
        value: "normal",
      },
      {
        name: "Rounded Corners",
        icon:url + "/assets/images/borders/ic_border_rounded_corners.svg",
        value: "rounded-corners",
      },
      {
        name: "Old World",
        icon:url + "/assets/images/borders/ic_border_old_world.svg",
        value: "old-world",
      },
    ],
  };
};
