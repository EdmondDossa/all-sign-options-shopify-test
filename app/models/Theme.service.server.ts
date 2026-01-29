/**
 * Service pour modifier le thème via l'API GraphQL (themeFilesUpsert).
 * L'API REST Asset PUT renvoie 404 pour les apps sans exemption Shopify, donc on utilise GraphQL.
 * Utilisé pour ajouter/supprimer le bloc "ASO Templates List" en dessous du bloc "All Signs Customizer"
 * selon le setting embed_templates_block_below.
 */

import { apiVersion } from "~/shopify.server";

export type ThemeSyncResult = {
  ok: boolean;
  message: string;
  updated?: boolean;
  sectionsModified?: string[];
};

function isConfiguratorBlock(block: { type?: string; app_block_id?: string }, extensionId: string): boolean {
  const type = (block.type || "").toLowerCase();
  const appBlockId = (block.app_block_id || "").toLowerCase();
  const configuratorHandle = "all-signs-options";
  const templateHandle = "all-signs-option-template";
  if (type.includes(templateHandle) || appBlockId.includes(templateHandle)) return false;
  return type.includes(configuratorHandle) || appBlockId.includes(configuratorHandle) || appBlockId === `${extensionId}/${configuratorHandle}`;
}

function isTemplateBlock(block: { type?: string; app_block_id?: string }): boolean {
  const type = (block.type || "").toLowerCase();
  const appBlockId = (block.app_block_id || "").toLowerCase();
  return type.includes("all-signs-option-template") || appBlockId.includes("all-signs-option-template");
}

function generateBlockId(): string {
  return "aso-" + Math.random().toString(36).slice(2, 11);
}

export async function syncTemplatesBlockOnProductTemplate(
  shop: string,
  accessToken: string,
  extensionId: string
): Promise<ThemeSyncResult> {
  try {
    const graphqlUrl = `https://${shop}/admin/api/${apiVersion}/graphql.json`;
    const headers = {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": accessToken,
    };

    // 1. Récupérer le thème principal (published)
    const themesQuery = `#graphql
      query GetMainTheme {
        themes(first: 1, roles: [MAIN]) {
          nodes {
            id
          }
        }
      }
    `;
    const themesRes = await fetch(graphqlUrl, {
      method: "POST",
      headers,
      body: JSON.stringify({ query: themesQuery }),
    });
    if (!themesRes.ok) {
      return { ok: false, message: `Failed to list themes: ${themesRes.status}` };
    }
    const themesData = await themesRes.json();
    const themeId = themesData?.data?.themes?.nodes?.[0]?.id;
    if (!themeId) {
      return { ok: false, message: "No main (published) theme found." };
    }

    // 2. Lire le contenu de templates/product.json (REST GET fonctionne en lecture)
    const restBaseUrl = `https://${shop}/admin/api/${apiVersion}`;
    const assetKey = "templates/product.json";
    const assetRes = await fetch(
      `${restBaseUrl}/themes/${themeId.replace("gid://shopify/OnlineStoreTheme/", "")}/assets.json?asset[key]=${encodeURIComponent(assetKey)}`,
      { headers: { "X-Shopify-Access-Token": accessToken } }
    );
    if (!assetRes.ok) {
      return { ok: false, message: `Failed to get ${assetKey}: ${assetRes.status}. Make sure the product template uses JSON (e.g. Dawn).` };
    }
    const assetData = await assetRes.json();
    const asset = assetData.asset;
    if (!asset?.value) {
      return { ok: false, message: "product.json not found or empty." };
    }

    let json: { sections?: Record<string, { blocks?: Record<string, { type?: string; app_block_id?: string; settings?: Record<string, unknown> }>; block_order?: string[] }>; order?: string[] };
    try {
      json = JSON.parse(asset.value);
    } catch {
      return { ok: false, message: "product.json is not valid JSON." };
    }

    const sections = json.sections || {};
    const sectionIds = Object.keys(sections);
    const sectionsModified: string[] = [];

    for (const sectionId of sectionIds) {
      const section = sections[sectionId];
      if (!section?.blocks || !section.block_order) continue;

      const blocks = section.blocks;
      const blockOrder = [...section.block_order];

      const configuratorIndex = blockOrder.findIndex((id) => {
        const b = blocks[id];
        return b && isConfiguratorBlock(b, extensionId);
      });
      const templateBlockIndex = blockOrder.findIndex((id) => {
        const b = blocks[id];
        return b && isTemplateBlock(b);
      });

      const configuratorId = configuratorIndex >= 0 ? blockOrder[configuratorIndex] : null;
      const configuratorBlock = configuratorId ? blocks[configuratorId] : null;
      const embedTemplates = configuratorBlock?.settings?.embed_templates_block_below === true;

      let orderChanged = false;

      if (embedTemplates && configuratorIndex >= 0) {
        const insertAt = configuratorIndex + 1;
        if (templateBlockIndex === -1) {
          const newBlockId = generateBlockId();
          const configurator = configuratorBlock as { type?: string; app_block_id?: string; settings?: Record<string, unknown> };
          const templateBlockPayload: Record<string, unknown> = { settings: {} };
          if (configurator.app_block_id != null && configurator.app_block_id !== "") {
            templateBlockPayload.type = "@app";
            templateBlockPayload.app_block_id = `${extensionId}/all-signs-option-template`;
          } else {
            templateBlockPayload.type = `${extensionId}/all-signs-option-template`;
          }
          (blocks as Record<string, unknown>)[newBlockId] = templateBlockPayload;
          blockOrder.splice(insertAt, 0, newBlockId);
          orderChanged = true;
        } else {
          const templateId = blockOrder[templateBlockIndex];
          const desiredIdx = blockOrder.indexOf(configuratorId!) + 1;
          if (templateBlockIndex !== desiredIdx) {
            blockOrder.splice(templateBlockIndex, 1);
            const newConfiguratorIdx = blockOrder.indexOf(configuratorId!);
            blockOrder.splice(newConfiguratorIdx + 1, 0, templateId);
            orderChanged = true;
          }
        }
      } else {
        if (templateBlockIndex >= 0) {
          const templateId = blockOrder[templateBlockIndex];
          delete blocks[templateId];
          blockOrder.splice(templateBlockIndex, 1);
          orderChanged = true;
        }
      }

      if (orderChanged) {
        section.block_order = blockOrder;
        section.blocks = blocks;
        sectionsModified.push(sectionId);
      }
    }

    if (sectionsModified.length === 0) {
      return { ok: true, message: "No changes needed.", updated: false };
    }

    const newValue = JSON.stringify(json, null, 2);

    // 3. Écrire via GraphQL themeFilesUpsert (évite le 404 du REST PUT)
    const upsertMutation = `#graphql
      mutation themeFilesUpsert($themeId: ID!, $files: [OnlineStoreThemeFilesUpsertFileInput!]!) {
        themeFilesUpsert(themeId: $themeId, files: $files) {
          upsertedThemeFiles {
            filename
          }
          userErrors {
            field
            message
          }
        }
      }
    `;
    const upsertRes = await fetch(graphqlUrl, {
      method: "POST",
      headers,
      body: JSON.stringify({
        query: upsertMutation,
        variables: {
          themeId,
          files: [
            {
              filename: assetKey,
              body: {
                type: "JSON",
                value: newValue,
              },
            },
          ],
        },
      }),
    });
    if (!upsertRes.ok) {
      const errText = await upsertRes.text();
      return { ok: false, message: `Failed to update theme (GraphQL): ${upsertRes.status} ${errText}` };
    }
    const upsertData = await upsertRes.json();
    const userErrors = upsertData?.data?.themeFilesUpsert?.userErrors || [];
    if (userErrors.length > 0) {
      const msg = userErrors.map((e: { message: string }) => e.message).join("; ");
      return { ok: false, message: `Theme update errors: ${msg}` };
    }

    return {
      ok: true,
      message: `Theme updated (sections: ${sectionsModified.join(", ")}). If you don't see the Templates block in the editor, close the Customize window and reopen it, and make sure you're editing the published (current) theme.`,
      updated: true,
      sectionsModified,
    };
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    return { ok: false, message: `Theme sync error: ${message}` };
  }
}
