import { Outlet, useOutletContext } from "@remix-run/react";
import type { NcpcRouteContext } from "~/types/NcpcRouteContext";

export default function NcpcRequiredOptionsLayout() {
  const context = useOutletContext<NcpcRouteContext>();
  return <Outlet context={context} />;
}
