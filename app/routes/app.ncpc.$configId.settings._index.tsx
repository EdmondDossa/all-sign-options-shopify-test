import { redirect } from "@remix-run/node";
import type { LoaderFunctionArgs } from "@remix-run/node";

export const loader = ({ request }: LoaderFunctionArgs) => {
  const search = new URL(request.url).search || "";
  return redirect(`generals${search}`);
};
