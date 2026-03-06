import { json, redirect } from "@remix-run/node";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { Outlet } from "@remix-run/react";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { pathname, search } = new URL(request.url);
  if (pathname === "/app/ncpc" || pathname === "/app/ncpc/") {
    return redirect(`/app/configuration${search || ""}`);
  }
  return json(null);
};

export default function NcpcRoot() {
  return <Outlet />;
}
