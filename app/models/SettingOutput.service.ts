import prisma from "~/db.server";
import SettingService from "./Setting.service";
import { OutputType } from "~/types/SettingsType";

export default class SettingOutputService {
  static async get(sessionId: string): Promise<any | null> {
    try {
      let output = null;
      let setting: any = await SettingService.getSetting(sessionId);
      try {
        output = setting?.data["output"];
      } catch (error) {
        output = {
          zipName: null,
          calculateOutput: null,
        };
      }
      return output;
    } catch (error) {
      console.error("Error retrieving font:", error);
      return Promise.resolve(null);
    }
  }

  static async update(
    output: OutputType,
    sessionId: string,
  ): Promise<any | null> {
    try {
      let setting: any = await SettingService.getSetting(sessionId);
      let data = setting.data;

      if (data) {
        data = { ...data, output: output };

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
