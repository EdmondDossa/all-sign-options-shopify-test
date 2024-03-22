import { ShapeType } from "./../types/SettingsType";
import prisma from "~/db.server";
import { FontType } from "~/types/ManagePropertyType";
import SettingService from "./Setting.service";
import { OutputType } from "~/types/SettingsType";

export default class SettingShapesService {
  static async get(sessionId: string): Promise<any | null> {
    try {
      let shapes = null;
      let setting: any = await SettingService.getSetting(sessionId);
      try {
        shapes = setting?.data["shapes"];
      } catch (error) {
        shapes = null;
      }
      return shapes;
    } catch (error) {
      console.error("Error retrieving font:", error);
      return Promise.resolve(null);
    }
  }

  static async update(
    shape: ShapeType,
    sessionId: string,
  ): Promise<any | null> {
    try {
      let setting: any = await SettingService.getSetting(sessionId);
      let data = setting.data;

      if (data && Array.isArray(data.shapes)) {
        data = {
          ...data,
          shapes: data.shapes.map((curr: ShapeType) => {
            return curr.value == shape.value ? shape : curr;
          })
        };

        return await prisma.setting.update({
          where: {
            sessionId: sessionId,
          },
          data: {
            data: data,
          },
        });
      }

      return Promise.resolve(null);
    } catch (error) {
      console.error("Error updating output:", error);
      return Promise.resolve(null);
    }
  }
}
