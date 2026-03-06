import { redirect } from "@remix-run/node";
import type { LoaderFunctionArgs } from "@remix-run/node";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const search = new URL(request.url).search || "";
  return redirect(`/app/ncpc/${params.configId}/required-options/sizes${search}`);
};

export default function NcpcRequiredOptionsIndex() {
  return null;
}
