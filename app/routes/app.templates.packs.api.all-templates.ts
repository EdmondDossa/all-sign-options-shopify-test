/**
 * Route ressource : retourne la liste de tous les templates de tous les packs (vue "All").
 * Utilisée pour charger les données à la demande et éviter de bloquer le premier rendu.
 */
import { LoaderFunctionArgs, json } from "@remix-run/node";
import { authenticate } from "~/shopify.server";
import TemplatePackService from "~/models/TemplatePack.service";
import { getPlanProxy } from "~/utils/pricing-server.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { session, admin } = await authenticate.admin(request);
  const merchantPlan = await getPlanProxy(admin, session.shop);
  const packs = await TemplatePackService.getAllPacks(session.id, merchantPlan);
  const allTemplates = TemplatePackService.buildAllTemplatesList(packs);
  return json({ allTemplates });
};
