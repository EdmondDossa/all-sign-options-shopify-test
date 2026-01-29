/**
 * Service pour modifier le thème via l'API REST (assets).
 * Utilisé pour ajouter/supprimer le bloc "ASO Templates List" en dessous du bloc "All Signs Customizer"
 * selon le setting embed_templates_block_below.
 */

const REST_API_VERSION = "2024-01";

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
    const baseUrl = `https://${shop}/admin/api/${REST_API_VERSION}`;

    const themesRes = await fetch(`${baseUrl}/themes.json`, {
      headers: { "X-Shopify-Access-Token": accessToken },
    });
    if (!themesRes.ok) {
      return { ok: false, message: `Failed to list themes: ${themesRes.status}` };
    }
    const themesData = await themesRes.json();
    const themes = themesData.themes || [];
    const mainTheme = themes.find((t: { role: string }) => (t.role || "").toLowerCase() === "main");
    if (!mainTheme?.id) {
      return { ok: false, message: "No main (published) theme found." };
    }

    const themeId = mainTheme.id;
    const assetKey = "templates/product.json";

    const assetRes = await fetch(`${baseUrl}/themes/${themeId}/assets.json?asset[key]=${encodeURIComponent(assetKey)}`, {
      headers: { "X-Shopify-Access-Token": accessToken },
    });
    if (!assetRes.ok) {
      return { ok: false, message: `Failed to get ${assetKey}: ${assetRes.status}` };
    }
    const assetData = await assetRes.json();
    const asset = assetData.asset;
    if (!asset?.value) {
      return { ok: false, message: "product.json not found or empty." };
    }

    let json: { sections?: Record<string, { blocks?: Record<string, unknown>; block_order?: string[] }>; order?: string[] };
    try {
      json = JSON.parse(asset.value);
    } catch {
      return { ok: false, message: "product.json is not valid JSON." };
    }

    const sections = json.sections || {};
    const sectionIds = Object.keys(sections);
    const sectionsModified: string[] = [];

    for (const sectionId of sectionIds) {
      const section = sections[sectionId] as { blocks?: Record<string, { type?: string; app_block_id?: string; settings?: Record<string, unknown> }>; block_order?: string[] };
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
          (blocks as Record<string, unknown>)[newBlockId] = {
            type: "@app",
            app_block_id: `${extensionId}/all-signs-option-template`,
            settings: {},
          };
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
    const putRes = await fetch(`${baseUrl}/themes/${themeId}/assets.json`, {
      method: "PUT",
      headers: {
        "X-Shopify-Access-Token": accessToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ asset: { key: assetKey, value: newValue } }),
    });
    if (!putRes.ok) {
      const errText = await putRes.text();
      return { ok: false, message: `Failed to update theme asset: ${putRes.status} ${errText}` };
    }

    return {
      ok: true,
      message: `Theme updated. Sections modified: ${sectionsModified.join(", ")}`,
      updated: true,
      sectionsModified,
    };
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    return { ok: false, message: `Theme sync error: ${message}` };
  }
}
