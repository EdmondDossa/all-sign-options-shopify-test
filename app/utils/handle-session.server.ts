import SessionService from "~/models/Session.service";
import SettingService from "~/models/Setting.service";
import { registerWebhooks } from "~/shopify.server";

export async function handleSession(session:any) {
  try {
    await registerWebhooks({ session });
    const sessionObject = await SessionService.get(session.id);
    if (!sessionObject?.isInitialized) {
      await SettingService.addSetting(session.id, session.shop);
      await SessionService.init(session.id);
    }
  } catch (error) {
    console.error('Error handling session:', error);
  }
}