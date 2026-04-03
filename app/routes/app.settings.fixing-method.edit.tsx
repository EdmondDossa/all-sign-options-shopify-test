import { redirect } from "@remix-run/node";
import type { LoaderFunctionArgs } from "@remix-run/node";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");

  return redirect(id ? `/app/settings/fixing-method?id=${encodeURIComponent(id)}` : "/app/settings/fixing-method");
};

export default function SettingFixingMethodEditRedirect() {
  return null;
}
