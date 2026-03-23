import { redirect } from "@remix-run/node";
import type { LoaderFunctionArgs } from "@remix-run/node";

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  const configId = String(params.configId || "").trim();
  const search = new URL(request.url).search;

  if (!configId) {
    throw redirect("/app/configuration");
  }

  throw redirect(`/app/configuration/${configId}/additional-options/materials${search}`);
};

export default function AdditionalOptionsIndexRoute() {
  return null;
}
