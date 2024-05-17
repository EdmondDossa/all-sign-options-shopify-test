import prisma from "~/db.server";
import SettingService from "./Setting.service";
import { FixingMethodType } from "~/types/SettingsType";

export default class SettingFixingMethodService {
  static async get(sessionId: string): Promise<any | null> {
    try {
      let fixingMethods = null;
      let setting: any = await SettingService.getSetting(sessionId);
      try {
        fixingMethods = setting.data["fixingMethods"];
      } catch (error) {
        fixingMethods = null;
      }
      return fixingMethods;
    } catch (error) {
      console.error("Error retrieving font:", error);
      return Promise.resolve(null);
    }
  }

  static async update(
    fixingMethod: FixingMethodType,
    sessionId: string,
  ): Promise<any | null> {
    try {
      let setting: any = await SettingService.getSetting(sessionId);
      let data = setting.data;

      if (data && Array.isArray(data.fixingMethods)) {
        data = {
          ...data,
          fixingMethods: data.fixingMethods.map((curr: FixingMethodType) => {
            return curr.type == fixingMethod.type ? fixingMethod : curr;
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
