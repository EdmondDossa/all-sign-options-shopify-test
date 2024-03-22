import prisma from "~/db.server";
import { FontType } from "~/types/ManagePropertyType";
import SettingService from "./Setting.service";
import { BorderType, OutputType } from "~/types/SettingsType";

export default class SettingBorderService {
  static async get(sessionId: string): Promise<any | null> {
    try {
      let borders = null;
      let setting: any = await SettingService.getSetting(sessionId);
      try {
        borders = setting.data["borders"];
      } catch (error) {
        borders = null;
      }
      return borders;
    } catch (error) {
      console.error("Error retrieving font:", error);
      return Promise.resolve(null);
    }
  }

  static async update(
    border: BorderType,
    sessionId: string,
  ): Promise<any | null> {
    try {
      let setting: any = await SettingService.getSetting(sessionId);
      let data = setting.data;

      if (data && Array.isArray(data.borders)) {
        data = {
          ...data,
          borders: data.borders.map((curr: BorderType) => {
            return curr.value == border.value ? border : curr;
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
