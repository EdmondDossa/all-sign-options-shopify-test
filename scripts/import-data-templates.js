/**
 * Import des templates depuis public/Data_Template_JSON
 *
 * Chaque fichier JSON = 1 configuration (type de signe) + 0 à N templates (tableau "templates" à la racine).
 * Le script crée ou met à jour la Configuration puis importe TOUS les templates du tableau
 * Si le tableau est vide, un template placeholder est créé pour que la config apparaisse dans la liste.
 *
 * Mapping fichier → type (nom dans le JSON), nombre de templates :
 *   data.json (10), data (1).json (0), data (2).json (2), data (3).json (2),
 *   data (4).json (7), data (5).json (0), data (6).json (2), data (7).json (0).
 *
 * Usage:
 *   npm run import:data-templates
 *   SESSION_ID=xxx node scripts/import-data-templates.js   (Linux/macOS)
 *   $env:SESSION_ID = "xxx"; node scripts/import-data-templates.js   (Windows PowerShell)
 *
 * Sans SESSION_ID, utilise la première session trouvée en base (pratique en dev).
 */

import { PrismaClient } from "@prisma/client";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const prisma = new PrismaClient();

const DATA_TEMPLATE_JSON_DIR = path.join(__dirname, "..", "public", "Data_Template_JSON");

/**
 * Récupère le sessionId : env SESSION_ID ou première session en base
 */
async function getSessionId() {
  const fromEnv = process.env.SESSION_ID;
  if (fromEnv) return fromEnv;
  const session = await prisma.session.findFirst({ select: { id: true } });
  if (!session) {
    throw new Error(
      "Aucune session trouvée. Définissez SESSION_ID ou installez l'app une fois pour créer une session."
    );
  }
  return session.id;
}

/**
 * Liste les fichiers JSON dans Data_Template_JSON (ordre déterministe)
 */
function getJsonFiles() {
  if (!fs.existsSync(DATA_TEMPLATE_JSON_DIR)) {
    return [];
  }
  return fs
    .readdirSync(DATA_TEMPLATE_JSON_DIR)
    .filter((f) => f.endsWith(".json"))
    .sort((a, b) => {
      // data.json, data (1).json, data (2).json, ...
      if (a === "data.json") return -1;
      if (b === "data.json") return 1;
      const na = a.match(/data \((\d+)\)\.json/);
      const nb = b.match(/data \((\d+)\)\.json/);
      if (na && nb) return parseInt(na[1], 10) - parseInt(nb[1], 10);
      return String(a).localeCompare(b);
    });
}

/**
 * Normalise un objet template issu du JSON pour l'insertion en base (sans id, configurationId, sessionId).
 */
function normalizeTemplateForInsert(t) {
  const { id, configurationId, sessionId, categoryId, ...rest } = t;
  return {
    name: rest.name ?? "Sans nom",
    basePrice: typeof rest.basePrice === "number" ? rest.basePrice : 0,
    prevImg: rest.prevImg ?? "",
    enabledAddToCart: Boolean(rest.enabledAddToCart),
    data: rest.data ?? { templateData: [], cartData: [] },
    recaps: rest.recaps ?? null,
    categoryId: null, // ne pas importer : les categoryId du JSON référencent une autre base (violation FK)
    realImg: rest.realImg ?? null,
    enabledAutoImgUpdate: Boolean(rest.enabledAutoImgUpdate),
  };
}

/**
 * Crée ou met à jour une Configuration à partir du JSON, puis importe tous les templates
 * du tableau root "templates". Si le tableau est vide ou absent, crée un template placeholder.
 */
async function upsertConfigurationAndTemplates(sessionId, payload) {
  const name = payload.name || "Unnamed configuration";
  const description = payload.description ?? "";
  const icon = payload.icon ?? "";
  const popupImg = payload.popupImg ?? "";
  const data = payload.data ?? {};
  const materialType = payload.materialType ?? null;
  const productType = payload.productType ?? null;
  const product = [];

  const templatesFromFile = Array.isArray(payload.templates) ? payload.templates : [];

  let config = await prisma.configuration.findFirst({
    where: { sessionId, name },
    include: { templates: true },
  });

  if (config) {
    await prisma.configuration.update({
      where: { id: config.id, sessionId },
      data: {
        description,
        icon,
        popupImg,
        data,
        materialType,
        productType,
        product,
      },
    });
    console.log(`  ✓ Configuration mise à jour: "${name}" (id ${config.id})`);
  } else {
    config = await prisma.configuration.create({
      data: {
        sessionId,
        name,
        description,
        icon,
        popupImg,
        data,
        product,
        materialType,
        productType,
      },
    });
    console.log(`  ✓ Configuration créée: "${name}" (id ${config.id})`);
  }

  if (templatesFromFile.length > 0) {
    const toInsert = templatesFromFile.map(normalizeTemplateForInsert);
    await prisma.template.createMany({
      data: toInsert.map((t) => ({
        ...t,
        sessionId,
        configurationId: config.id,
      })),
    });
    console.log(`  ✓ ${templatesFromFile.length} template(s) importé(s) pour "${name}"`);
  } else {
    const existingCount = config.templates?.length ?? 0;
    if (existingCount === 0) {
      await prisma.template.create({
        data: {
          sessionId,
          configurationId: config.id,
          name: `Template ${name}`,
          basePrice: 0,
          prevImg: "",
          enabledAddToCart: false,
          data: { templateData: [], cartData: [] },
        },
      });
      console.log(`  ✓ 1 template placeholder créé pour "${name}" (aucun template dans le fichier)`);
    }
  }
}

async function run() {
  console.log("Import des templates depuis Data_Template_JSON\n");

  const sessionId = await getSessionId();
  console.log(`Session utilisée: ${sessionId}\n`);

  const files = getJsonFiles();
  if (files.length === 0) {
    console.log("Aucun fichier JSON trouvé dans public/Data_Template_JSON.");
    return;
  }

  console.log(`${files.length} fichier(s) à traiter:\n`);

  for (const file of files) {
    const filePath = path.join(DATA_TEMPLATE_JSON_DIR, file);
    try {
      const raw = fs.readFileSync(filePath, "utf8");
      const payload = JSON.parse(raw);
      // Retirer id et sessionId du payload pour ne pas écraser la session courante
      delete payload.id;
      delete payload.sessionId;
      const name = payload.name || file;
      const templateCount = Array.isArray(payload.templates) ? payload.templates.length : 0;
      console.log(`Fichier: ${file} → "${name}" (${templateCount} template(s))`);
      await upsertConfigurationAndTemplates(sessionId, payload);
      console.log("");
    } catch (err) {
      console.error(`  ✗ Erreur sur ${file}:`, err.message);
      console.log("");
    }
  }

  console.log("Import terminé.");
}

run()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
