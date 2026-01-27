# Scripts

## Scripts disponibles

### 0. Export App Installations (`export-app-installations.js`)

Exporte les informations des marchands qui ont installé l'app (email, nom, date d'installation) dans un fichier Markdown.

**Usage:**
```bash
# Sur Windows (PowerShell)
$env:PARTNER_API_TOKEN="votre_token_ici"
$env:ORGANIZATION_ID="votre_org_id"
node scripts/export-app-installations.js

# Sur Linux/Mac
export PARTNER_API_TOKEN="votre_token_ici"
export ORGANIZATION_ID="votre_org_id"
node scripts/export-app-installations.js
```

**Note importante:**
L'API Partner GraphQL peut avoir des limitations sur les données disponibles. Si l'email n'est pas disponible via l'API, vous pouvez:
1. Utiliser l'export CSV depuis le Partner Dashboard (Apps > Votre App > Export > Export Current Merchants)
2. Combiner les données CSV avec les données de l'API pour un rapport complet

**Prérequis:**
1. Générer un API token depuis le Partner Dashboard Shopify
   - Aller dans Settings > Partner API clients
   - Créer un nouveau client avec les permissions "Manage apps"
   - Copier le token généré
2. Récupérer votre Organization ID
   - L'ID se trouve dans l'URL de votre Partner Dashboard
   - Exemple: `https://partners.shopify.com/123456/apps` → Organization ID = `123456`
3. Définir les variables d'environnement:
   - `PARTNER_API_TOKEN`: Le token généré
   - `ORGANIZATION_ID`: Votre ID d'organisation
   - `APP_ID` (optionnel): Si différent du client_id dans `shopify.app.toml`

**Fonctionnalités:**
- Récupère toutes les installations de l'app via l'API Partner GraphQL
- Exporte les informations dans un fichier Markdown (.md)
- Inclut: email, nom du shop, domaine, date d'installation, statut
- Génère des statistiques (actives vs désinstallées)

**Fichier généré:**
- `app-installations-[timestamp].md` à la racine du projet

**Exemple de sortie:**
```markdown
# Rapport des Installations - All Signs Customizer

**Date de génération:** 26 janvier 2026, 14:30
**Nombre total d'installations:** 25

## Liste des Installations
| # | Email | Nom du Shop | Domaine | Date d'Installation | Statut |
|:-:|:-----|:------------|:--------|:-------------------|:-------|
| 1 | merchant@example.com | My Shop | my-shop.myshopify.com | 15 janvier 2026, 10:30 | ✅ Active |
...
```

### 1. Export Templates by Category (`export-templates-by-category.js`)

Exporte les templates organisés par catégories dans des fichiers JSON.

**Usage:**
```bash
npm run export:templates
npm run export:templates -- --session=YOUR_SESSION_ID
npm run export:templates -- --shop=example.myshopify.com
npm run export:templates -- --list
```

**Fonctionnalités:**
- Exporte les templates par catégorie
- Génère un fichier JSON par catégorie dans le dossier `scripts/`
- Crée un fichier ZIP avec tous les JSON
- Structure identique à l'export UI

**Fichiers générés:**
- `scripts/noel.json` (exemple)
- `scripts/new_year.json` (exemple)
- `scripts/templates_export_shop_1234567890.zip` (ZIP avec tous les JSON)

### 2. Import Template Packs (`import-template-packs.js`)

Importe les packs de templates depuis les fichiers JSON vers la base de données.

**Usage:**
```bash
npm run import:packs
```

**Fonctionnalités:**
- Lit tous les fichiers JSON du dossier `scripts/` (sauf `data.json`)
- Copie les fichiers vers `public/template-packs/json/`
- Crée les entrées `TemplatePack` en base de données
- Définit les prix et métadonnées automatiquement

**Prérequis:**
- Avoir exécuté `npm run export:templates` au préalable
- Les fichiers JSON doivent être dans le dossier `scripts/`

**Fichiers créés:**
- `public/template-packs/json/noel.json` (copie)
- `public/template-packs/json/new_year.json` (copie)
- Entrées dans la table `TemplatePack` en base de données

## Workflow complet

### Étape 1: Créer les templates
1. Créer des templates dans une boutique de développement
2. Les organiser par catégories (Noël, Nouvel An, etc.)

### Étape 2: Exporter les templates
```bash
npm run export:templates -- --shop=dev-shop.myshopify.com
```

Cela génère:
- `scripts/noel.json`
- `scripts/new_year.json`
- etc.
- Un fichier ZIP avec tous les JSON

### Étape 3: Importer les packs
```bash
npm run import:packs
```

Cela:
- Copie les JSON vers `public/template-packs/json/`
- Crée les packs en base de données
- Les rend disponibles dans l'interface

### Étape 4: Gérer les packs (admin)
- Accéder à `/app/admin/template-packs`
- Ajuster les prix si nécessaire
- Activer/désactiver les packs

## Structure des fichiers

```
scripts/
  ├── export-templates-by-category.js
  ├── import-template-packs.js
  ├── noel.json                    # Généré par export
  ├── new_year.json                # Généré par export
  └── ...

public/
  └── template-packs/
      ├── json/
      │   ├── noel.json            # Copié par import
      │   ├── new_year.json        # Copié par import
      │   └── ...
      └── previews/
          └── (images de preview)
```

## Dépannage

### Erreur: "No JSON files found"
- Vérifiez que vous avez exécuté `npm run export:templates` d'abord
- Vérifiez que les fichiers JSON sont dans le dossier `scripts/`

### Erreur: "Error reading pack file"
- Vérifiez que les fichiers existent dans `public/template-packs/json/`
- Vérifiez les permissions des fichiers

### Les packs n'apparaissent pas dans l'interface
- Vérifiez que les packs sont actifs (`isActive: true`)
- Vérifiez la migration Prisma: `npx prisma migrate dev`
- Régénérez Prisma: `npx prisma generate`

## Notes importantes

- Les fichiers JSON dans `scripts/` sont la source
- Les fichiers dans `public/template-packs/json/` sont utilisés par l'application
- Le script d'import copie automatiquement les fichiers
- Vous pouvez ré-exécuter l'import pour mettre à jour les packs existants