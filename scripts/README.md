# Scripts d'export de templates

## Export des templates par catégorie

Ce script permet aux développeurs d'exporter tous les templates organisés par catégories dans un fichier ZIP.

### Utilisation

#### Lister toutes les sessions disponibles :

```bash
npm run export:templates -- --list
```

ou

```bash
npm run export:templates -- -l
```

Cela affichera toutes les sessions avec leur **Shop** et leur **Session ID**.

#### Exporter tous les templates de toutes les sessions :

```bash
npm run export:templates
```

#### Exporter les templates d'une session spécifique (par Session ID) :

```bash
npm run export:templates -- --session=VOTRE_SESSION_ID
```

#### Exporter les templates d'une session spécifique (par Shop Name) :

```bash
npm run export:templates -- --shop=example.myshopify.com
```

Ou directement avec Node.js :

```bash
# Lister les sessions
node scripts/export-templates-by-category.js --list

# Exporter toutes les sessions
node scripts/export-templates-by-category.js

# Exporter par session ID
node scripts/export-templates-by-category.js --session=VOTRE_SESSION_ID

# Exporter par shop name
node scripts/export-templates-by-category.js --shop=example.myshopify.com
```

### Comment trouver le Session ID ? 🔍

**Option 1 : Utiliser la commande `--list` (RECOMMANDÉ)**
```bash
npm run export:templates -- --list
```
Cette commande affichera un tableau avec toutes les sessions disponibles :
```
📋 Available sessions:
================================================================================
Shop                                      Session ID                            
================================================================================
example.myshopify.com                    abc123def456ghi789...
test-shop.myshopify.com                  xyz789abc123def456...
================================================================================

Total: 2 session(s)
```

**Option 2 : Utiliser le nom du shop directement**
Au lieu d'utiliser le Session ID, vous pouvez utiliser le nom du shop directement (plus simple !) :
```bash
npm run export:templates -- --shop=example.myshopify.com
```

**Option 3 : Via la base de données PostgreSQL**
Si vous avez accès direct à la base de données :
```sql
SELECT id, shop, email FROM "Session" ORDER BY shop;
```

### Fonctionnalités

- ✅ Export de tous les templates groupés par catégories
- ✅ Un fichier JSON par catégorie (ex: `noel.json`, `nouvel_an.json`)
- ✅ Tous les fichiers JSON sont regroupés dans un fichier ZIP
- ✅ Inclusion automatique des configurations, fonts et métadonnées nécessaires
- ✅ Support pour une ou plusieurs sessions

### Format de sortie

Le fichier ZIP contiendra :
- `noel.json` - Tous les templates de la catégorie "Noël"
- `nouvel_an.json` - Tous les templates de la catégorie "Nouvel an"
- etc.

Chaque fichier JSON contient :
- Les informations de la catégorie
- La configuration principale associée
- Tous les templates de cette catégorie
- Les fonts utilisées par ces templates
- Les métadonnées d'export (date, shop, etc.)

### Exemple de structure JSON exportée

```json
{
  "category": {
    "id": 1,
    "name": "Noël"
  },
  "configuration": {
    "id": 5,
    "name": "Wood Sign Customiser",
    "data": { ... },
    "product": { ... },
    "templates": [
      {
        "id": 10,
        "name": "Template Noël 1",
        "basePrice": 29.99,
        "prevImg": "...",
        "data": { ... }
      }
    ]
  },
  "fonts": [ ... ],
  "uploadsPrefix": "https://example.myshopify.com",
  "exportedAt": "2025-01-20T10:30:00.000Z",
  "sessionShop": "example.myshopify.com"
}
```

### Notes importantes

- Le script nécessite une connexion à la base de données (via `DATABASE_URL`)
- Les fichiers ZIP sont créés dans le dossier `scripts/`
- Le script nettoie automatiquement les fichiers temporaires après l'export
- Le nom des fichiers JSON est automatiquement nettoyé (caractères spéciaux remplacés par des underscores)

### Variables d'environnement

Assurez-vous que les variables suivantes sont définies :
- `DATABASE_URL` - URL de connexion à la base de données PostgreSQL
- `SHOPIFY_APP_URL` - URL de base de l'application (optionnel, utilisé pour les URLs d'export)

