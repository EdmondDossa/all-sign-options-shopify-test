import ConfigurationService from "./Configuration.service";
import type { ConfigurationType } from "~/types/ConfigurationType";

export default class ConfigSettingsService {
  static async getAll(sessionId: string, configurationId: number): Promise<any | null> {
    try {
      const configuration: any = await ConfigurationService.getConfiguration(
        configurationId,
        sessionId,
      );
      return configuration?.data?.settings ?? null;
    } catch (_error) {
      return Promise.resolve(null);
    }
  }

  static async get(
    sessionId: string,
    configurationId: number,
    setting: string,
    settingItem: string,
  ): Promise<any | null> {
    try {
      const configuration: any = await ConfigurationService.getConfiguration(
        configurationId,
        sessionId,
      );
      if (!configuration?.data?.settings?.[setting]) return null;
      const settingData = configuration.data.settings[setting][settingItem];
      return settingData ?? null;
    } catch (_error) {
      return Promise.resolve(null);
    }
  }

  static async getMain(
    sessionId: string,
    configurationId: number,
    setting: string,
  ): Promise<any | null> {
    try {
      const configuration: any = await ConfigurationService.getConfiguration(
        configurationId,
        sessionId,
      );
      return configuration?.data?.settings?.[setting] ?? null;
    } catch (_error) {
      return Promise.resolve(null);
    }
  }

  static async edit(
    sessionId: string,
    configurationId: number,
    setting: string,
    settingItem: string,
    item: any,
  ): Promise<any[] | null> {
    try {
      let configuration: ConfigurationType = await ConfigurationService.getConfiguration(
        configurationId,
        sessionId,
      );

      if (configuration === null) {
        return null;
      }

      const data = (configuration?.data || {}) as Record<string, any>;
      const settings = (data.settings || {}) as Record<string, any>;
      const section = (settings[setting] || {}) as Record<string, any>;

      configuration.data = {
        ...data,
        settings: {
          ...settings,
          [setting]: {
            ...section,
            [settingItem]: item,
          },
        },
      };

      configuration = await ConfigurationService.updateConfiguration(
        configuration,
        sessionId,
      );

      return Promise.resolve(
        configuration?.data?.settings?.[setting]?.[settingItem] ?? null,
      );
    } catch (error) {
      console.error("Error editing config setting:", error);
      return Promise.resolve(null);
    }
  }

  static async editMain(
    sessionId: string,
    configurationId: number,
    setting: string,
    item: any,
  ): Promise<any[] | null> {
    try {
      let configuration: ConfigurationType = await ConfigurationService.getConfiguration(
        configurationId,
        sessionId,
      );
      if (configuration === null) {
        return null;
      }

      const data = (configuration?.data || {}) as Record<string, any>;
      const settings = (data.settings || {}) as Record<string, any>;
      const previous = (settings[setting] || {}) as Record<string, any>;

      configuration.data = {
        ...data,
        settings: {
          ...settings,
          [setting]: {
            ...previous,
            ...(item || {}),
          },
        },
      };

      configuration = await ConfigurationService.updateConfiguration(
        configuration,
        sessionId,
      );

      return Promise.resolve(configuration?.data?.settings?.[setting] ?? null);
    } catch (error) {
      console.error("Error editing config setting main:", error);
      return Promise.resolve(null);
    }
  }

  static async updateSettingsSection(
    configurationId: number,
    sessionId: string,
    setting: string,
    settingItem: string,
    value: any,
  ): Promise<any | null> {
    return this.edit(sessionId, configurationId, setting, settingItem, value);
  }

  static async updateSetting(
    configurationId: number,
    sessionId: string,
    setting: string,
    value: any,
  ): Promise<any | null> {
    try {
      let configuration: ConfigurationType = await ConfigurationService.getConfiguration(
        configurationId,
        sessionId,
      );
      if (!configuration) return null;

      const data = (configuration.data || {}) as Record<string, any>;
      const settings = (data.settings || {}) as Record<string, any>;

      configuration.data = {
        ...data,
        settings: {
          ...settings,
          [setting]: value,
        },
      } as any;

      configuration = await ConfigurationService.updateConfiguration(
        configuration,
        sessionId,
      );

      return configuration?.data?.settings?.[setting] ?? null;
    } catch (error) {
      console.error("Error updating setting:", error);
      return Promise.resolve(null);
    }
  }
}
