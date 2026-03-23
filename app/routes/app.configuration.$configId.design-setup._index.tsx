import { redirect } from '@remix-run/node';
import type { LoaderFunctionArgs } from '@remix-run/node';

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  const configId = String(params.configId || '').trim();
  const search = new URL(request.url).search;
  throw redirect(`/app/configuration/${configId}/design-setup/sign-part${search}`);
};

export default function ConfigurationDesignSetupIndex() {
  return null;
}
