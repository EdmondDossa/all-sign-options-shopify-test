import type { ConfigurationType } from "~/types/ConfigurationType";
import type { NcpcData } from "~/types/NcpcDataType";

export interface NcpcRouteContext {
  configuration: ConfigurationType;
  productType: "neon" | "channel";
  plan: string;
  ncpcData: NcpcData;
}
